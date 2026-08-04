import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
  PERMISSIONS_POLICY,
  STRICT_TRANSPORT_SECURITY,
} from '../constants/securityHeaders.mjs';
import { isValidLocale } from '../i18n/routing';
import { getDiseaseBySlug } from '../features/diseases';
import { getGeneticsToolBySlug } from '../features/genetics';

/**
 * Module 25.8 §30 — required automated security tests.
 *
 * These are the checks that must keep passing for the release gate to stay
 * green. They deliberately assert against SOURCE and CONFIGURATION rather than
 * a live server, so they run in the normal `npm test` gate with no network and
 * no build step. The complementary HTTP-level evidence (real response headers,
 * framing refusal, payload behaviour against `next start`) is recorded in
 * docs/modules/module-25-8-security-audit-and-hardening-report.md, because a
 * unit-test runner cannot serve a production build.
 *
 * Several checks are phrased as "this dangerous thing is absent". That is
 * intentional: Shared Blood's security posture rests largely on the fact that
 * it has no server mutation surface, no third-party scripts and no persistence,
 * and those properties are only worth anything if something fails loudly when a
 * future module quietly introduces one.
 */

const ROOT = join(__dirname, '..', '..');
const SRC = join(ROOT, 'src');

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const posix = (p: string) => p.split('\\').join('/');

/** Every shipped .ts/.tsx file: excludes tests and the dev-only audit records. */
function shippedSources(): Array<{ rel: string; text: string }> {
  return walk(SRC)
    .map((file) => ({ rel: posix(relative(ROOT, file)), file }))
    .filter(({ rel }) => /\.(ts|tsx|mjs)$/.test(rel))
    .filter(({ rel }) => !rel.endsWith('.test.ts') && !rel.endsWith('.test.tsx'))
    .filter(({ rel }) => !rel.includes('/audit/'))
    .map(({ rel, file }) => ({ rel, text: readFileSync(file, 'utf8') }));
}

function isCommentLine(line: string): boolean {
  const s = line.trimStart();
  return s.startsWith('//') || s.startsWith('*') || s.startsWith('/*') || s.startsWith('{/*');
}

/** Matches `pattern` in shipped source, ignoring comment lines. */
function findInSource(pattern: RegExp): string[] {
  const hits: string[] = [];
  for (const { rel, text } of shippedSources()) {
    text.split('\n').forEach((line, i) => {
      if (!isCommentLine(line) && pattern.test(line)) hits.push(`${rel}:${i + 1}`);
    });
  }
  return hits;
}

// ---------------------------------------------------------------------------
// §30.4, §30.5 — security headers and CSP
// ---------------------------------------------------------------------------

describe('§9/§30 security headers', () => {
  const headers = buildSecurityHeaders(false);
  const byKey = new Map(headers.map((h) => [h.key, h.value]));

  it('defines every header the module requires', () => {
    for (const key of [
      'Content-Security-Policy',
      'Strict-Transport-Security',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy',
      'X-Frame-Options',
    ]) {
      expect(byKey.has(key), `missing ${key}`).toBe(true);
    }
  });

  it('uses the required header values', () => {
    expect(byKey.get('X-Content-Type-Options')).toBe('nosniff');
    expect(byKey.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(byKey.get('X-Frame-Options')).toBe('DENY');
  });

  it('disables unused browser capabilities (§9)', () => {
    for (const capability of [
      'camera',
      'microphone',
      'geolocation',
      'payment',
      'usb',
      'magnetometer',
      'gyroscope',
    ]) {
      expect(PERMISSIONS_POLICY).toContain(`${capability}=()`);
    }
  });

  it('sets HSTS without preload until HTTPS is proven across subdomains (§9)', () => {
    expect(STRICT_TRANSPORT_SECURITY).toMatch(/max-age=\d+/);
    expect(STRICT_TRANSPORT_SECURITY).not.toContain('preload');
  });
});

describe('§9/§30 content security policy', () => {
  const csp = buildContentSecurityPolicy(false);

  /** Parses "a 'self'; b 'none'" into a directive map. */
  const directives = new Map(
    csp.split(';').map((part) => {
      const [name, ...values] = part.trim().split(/\s+/);
      return [name, values];
    }),
  );

  it('parses into well-formed directives', () => {
    expect(directives.size).toBeGreaterThan(10);
    for (const [name] of directives) expect(name).toMatch(/^[a-z-]+$/);
  });

  it('locks down the directives that contain an XSS blast radius', () => {
    expect(directives.get('default-src')).toEqual(["'self'"]);
    expect(directives.get('object-src')).toEqual(["'none'"]);
    expect(directives.get('base-uri')).toEqual(["'self'"]);
    expect(directives.get('form-action')).toEqual(["'self'"]);
  });

  it('forbids framing by any origin (§10 clickjacking)', () => {
    expect(directives.get('frame-ancestors')).toEqual(["'none'"]);
  });

  it('never ships unsafe-eval or a wildcard script source in production (§9)', () => {
    const scriptSrc = directives.get('script-src') ?? [];
    expect(scriptSrc).not.toContain("'unsafe-eval'");
    expect(scriptSrc).not.toContain('*');
    // `'unsafe-inline'` IS present and documented: the App Router streams its
    // RSC payload through inline scripts. Guard the rest of the policy instead.
    expect(scriptSrc).toContain("'self'");
  });

  it('allows unsafe-eval only in development, where React Refresh needs it', () => {
    expect(buildContentSecurityPolicy(true)).toContain("'unsafe-eval'");
    expect(buildContentSecurityPolicy(false)).not.toContain("'unsafe-eval'");
  });

  it('keeps every fetch directive on the same origin (no third-party origins)', () => {
    for (const name of ['connect-src', 'font-src', 'media-src', 'manifest-src']) {
      expect(directives.get(name)).toEqual(["'self'"]);
    }
  });

  it('upgrades insecure requests in production only', () => {
    expect(buildContentSecurityPolicy(false)).toContain('upgrade-insecure-requests');
    expect(buildContentSecurityPolicy(true)).not.toContain('upgrade-insecure-requests');
  });
});

describe('§30 next.config wiring', () => {
  const config = readFileSync(join(ROOT, 'next.config.mjs'), 'utf8');

  it('applies the shared header set to every path', () => {
    expect(config).toContain('buildSecurityHeaders');
    expect(config).toContain('/:path*');
  });

  it('does not expose x-powered-by (§24, §30.18)', () => {
    expect(config).toMatch(/poweredByHeader:\s*false/);
  });

  it('keeps production browser source maps off (§24)', () => {
    expect(config).toMatch(/productionBrowserSourceMaps:\s*false/);
  });

  it('never allows the image optimizer to render SVG (§21)', () => {
    expect(config).toMatch(/dangerouslyAllowSVG:\s*false/);
  });
});

// ---------------------------------------------------------------------------
// §30.1, §30.2 — secrets and environment variables
// ---------------------------------------------------------------------------

describe('§12/§13/§30 secrets and environment variables', () => {
  const SECRET_SHAPES: Array<[string, RegExp]> = [
    ['private key block', /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/],
    ['AWS access key id', /\bAKIA[0-9A-Z]{16}\b/],
    ['GitHub token', /\b(?:ghp|gho|ghs|ghr)_[A-Za-z0-9]{20,}\b/],
    ['GitHub fine-grained token', /\bgithub_pat_[A-Za-z0-9_]{20,}\b/],
    ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
    ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
    ['Stripe key', /\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/],
    ['JWT', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./],
  ];

  it('contains no secret-shaped literal anywhere in src/', () => {
    const offenders: string[] = [];
    for (const { rel, text } of shippedSources()) {
      for (const [label, pattern] of SECRET_SHAPES) {
        if (pattern.test(text)) offenders.push(`${rel}: ${label}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('keeps .env.example a template with no filled-in secret values', () => {
    const example = readFileSync(join(ROOT, '.env.example'), 'utf8');
    const secretAssignments = example
      .split('\n')
      .filter((line) => /^[A-Z_]+=/.test(line))
      .filter((line) => /(SECRET|SERVICE_ROLE|PRIVATE|PASSWORD|TOKEN)/.test(line))
      .filter((line) => line.split('=').slice(1).join('=').trim().length > 0);
    expect(secretAssignments).toEqual([]);
  });

  it('never exposes a secret through a NEXT_PUBLIC_ variable (§13, §30.2)', () => {
    // `NEXT_PUBLIC_` is compiled into the browser bundle, so a secret behind
    // that prefix is a published secret. The Supabase ANON key is public by
    // design (it is protected by row-level security, not by concealment).
    const INTENTIONALLY_PUBLIC = new Set(['NEXT_PUBLIC_SUPABASE_ANON_KEY']);
    const names = new Set<string>();
    for (const { text } of shippedSources()) {
      for (const m of text.matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) names.add(m[0]);
    }
    for (const m of readFileSync(join(ROOT, '.env.example'), 'utf8').matchAll(
      /NEXT_PUBLIC_[A-Z0-9_]+/g,
    )) {
      names.add(m[0]);
    }
    const forbidden = [...names]
      .filter((n) => !INTENTIONALLY_PUBLIC.has(n))
      .filter((n) => /(SECRET|SERVICE_ROLE|PRIVATE|PASSWORD|TOKEN|CREDENTIAL)/.test(n));
    expect(forbidden).toEqual([]);
  });

  it('git-ignores every real env file while tracking the template', () => {
    const ignore = readFileSync(join(ROOT, '.gitignore'), 'utf8');
    expect(ignore).toMatch(/^\.env\.\*$/m);
    expect(ignore).toMatch(/^!\.env\.example$/m);
  });

  it('reads no environment variable other than the two documented ones', () => {
    const used = new Set<string>();
    for (const { text } of shippedSources()) {
      for (const m of text.matchAll(/process\.env\.([A-Z0-9_]+)/g)) used.add(m[1]);
    }
    expect([...used].sort()).toEqual(['NEXT_PUBLIC_SITE_URL', 'NODE_ENV']);
  });
});

// ---------------------------------------------------------------------------
// §30.11, §30.10 — rendering and URL safety
// ---------------------------------------------------------------------------

describe('§6/§7/§30 dangerous rendering APIs are absent', () => {
  it.each([
    ['dangerouslySetInnerHTML', /dangerouslySetInnerHTML/],
    ['innerHTML assignment', /\.(inner|outer)HTML\s*=/],
    ['document.write', /document\.write\s*\(/],
    ['eval', /(?<![A-Za-z0-9_.])eval\s*\(/],
    ['new Function', /new\s+Function\s*\(/],
    ['child_process', /child_process/],
    ['server action directive', /^\s*['"]use server['"]/],
  ])('never uses %s', (_label, pattern) => {
    expect(findInSource(pattern)).toEqual([]);
  });

  it('has no route handlers or API routes (§17)', () => {
    const handlers = walk(SRC)
      .map((f) => posix(relative(ROOT, f)))
      .filter((f) => /\/(route|middleware\.api)\.(ts|tsx|js)$/.test(f));
    expect(handlers).toEqual([]);
  });
});

describe('§8/§30 URL and redirect safety', () => {
  it('ships no javascript: or data:text/html URL (§30.10)', () => {
    expect(findInSource(/javascript:/i)).toEqual([]);
    expect(findInSource(/data:text\/html/i)).toEqual([]);
  });

  it('uses only approved schemes for outbound content links', () => {
    const offenders: string[] = [];
    for (const { rel, text } of shippedSources()) {
      for (const m of text.matchAll(/['"`]([a-zA-Z][a-zA-Z0-9+.-]{1,20}):\/\//g)) {
        const scheme = m[1].toLowerCase();
        // `http` is permitted for exactly one value: the localhost fallback
        // used when NEXT_PUBLIC_SITE_URL is unset in local development.
        const isLocalhostFallback = scheme === 'http' && text.includes('http://localhost:3000');
        if (scheme !== 'https' && !isLocalhostFallback) offenders.push(`${rel}: ${scheme}:`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('never builds an href or a redirect target out of a query parameter', () => {
    // An open redirect needs user input to reach a navigation target. The
    // locale switch is the only navigation that touches the query string, and
    // it rebuilds the path from `usePathname()` plus an explicit allowlist.
    expect(findInSource(/(?:href|redirect\()\s*=?\s*\{?\s*(?:searchParams|q)\b/)).toEqual([]);
  });

  it('opens every new tab with opener protection (§8)', () => {
    const offenders: string[] = [];
    for (const { rel, text } of shippedSources()) {
      // Anchors are formatted across lines, so inspect each tag as a whole.
      for (const tag of text.matchAll(/<a\b[\s\S]*?>/g)) {
        if (!tag[0].includes('target="_blank"')) continue;
        if (!/rel="[^"]*noopener/.test(tag[0])) offenders.push(`${rel}: ${tag[0].slice(0, 60)}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// §30.7, §30.8 — input allowlists fail safely
// ---------------------------------------------------------------------------

describe('§18/§30 invalid parameters fail safely', () => {
  const HOSTILE = [
    '<script>',
    '../../etc/passwd',
    'javascript:alert(1)',
    '//malicious.example',
    '%2e%2e%2f',
    'beta-thalassemia\u0000',
    'x'.repeat(5000),
    '',
    ' ',
  ];

  it.each(HOSTILE)('rejects locale %j', (value) => {
    expect(isValidLocale(value)).toBe(false);
  });

  it('accepts only the two supported locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('ur')).toBe(true);
    expect(isValidLocale('EN')).toBe(false);
    expect(isValidLocale(undefined)).toBe(false);
  });

  it.each(HOSTILE)('returns no disease for %j', (value) => {
    expect(getDiseaseBySlug(value)).toBeFalsy();
  });

  it.each(HOSTILE)('returns no genetics tool for %j', (value) => {
    expect(getGeneticsToolBySlug(value)).toBeFalsy();
  });

  it('rejects unexpected non-string shapes without throwing', () => {
    for (const value of [[], {}, null, undefined, 0, true] as unknown[]) {
      expect(() => getDiseaseBySlug(value as string)).not.toThrow();
      expect(() => getGeneticsToolBySlug(value as string)).not.toThrow();
      expect(getDiseaseBySlug(value as string)).toBeFalsy();
    }
  });

  it('bounds the echoed search query (§18)', () => {
    const page = readFileSync(join(ROOT, 'src/app/[locale]/search/page.tsx'), 'utf8');
    expect(page).toMatch(/MAX_QUERY_LENGTH\s*=\s*\d+/);
    expect(page).toContain('slice(0, MAX_QUERY_LENGTH)');
  });
});

// ---------------------------------------------------------------------------
// §30.13 — static routes reject mutation
// ---------------------------------------------------------------------------

describe('§26/§30 HTTP methods', () => {
  const middleware = readFileSync(join(SRC, 'middleware.ts'), 'utf8');

  it('answers mutation verbs with 405 rather than rendering a page', () => {
    expect(middleware).toContain('ALLOWED_METHODS');
    expect(middleware).toMatch(/status:\s*405/);
  });

  it('permits only the verbs a read-only site needs', () => {
    const set = middleware.match(/ALLOWED_METHODS\s*=\s*new Set\(\[([^\]]*)\]/)?.[1] ?? '';
    const methods = [...set.matchAll(/'([A-Z]+)'/g)].map((m) => m[1]).sort();
    expect(methods).toEqual(['GET', 'HEAD', 'OPTIONS', 'POST']);
  });
});

// ---------------------------------------------------------------------------
// §22, §23, §30.14-16 — privacy, analytics and retired surfaces
// ---------------------------------------------------------------------------

describe('§22/§30 genetics results stay transient', () => {
  it('persists nothing to browser storage or cookies', () => {
    expect(findInSource(/\b(?:localStorage|sessionStorage|indexedDB)\b/)).toEqual([]);
    expect(findInSource(/document\.cookie/)).toEqual([]);
  });

  it('ships no analytics, pixel or third-party script (§23)', () => {
    expect(findInSource(/gtag\(|dataLayer|googletagmanager|analytics\.|mixpanel|posthog|segment\.com|hotjar|fbq\(/i)).toEqual([]);
    expect(findInSource(/<script\s[^>]*src=["']https?:/i)).toEqual([]);
    expect(findInSource(/next\/script/)).toEqual([]);
  });

  it('makes no outbound network request from application code (§20 SSRF)', () => {
    // No fetch/XHR anywhere means there is no user-controlled server-side
    // fetch to allowlist, which is what makes SSRF non-applicable here.
    expect(findInSource(/(?<![A-Za-z0-9_.])fetch\s*\(/)).toEqual([]);
    expect(findInSource(/XMLHttpRequest|axios|node-fetch|got\(/)).toEqual([]);
  });
});

describe('§30.16 Family Tree remains retired', () => {
  it('exposes no family-tree tool slug or route', () => {
    expect(getGeneticsToolBySlug('family-tree')).toBeFalsy();
    expect(getGeneticsToolBySlug('family-tree-explorer')).toBeFalsy();
  });

  it('has no family-tree page route on disk', () => {
    const routes = walk(join(SRC, 'app'))
      .map((f) => posix(relative(ROOT, f)))
      .filter((f) => /family-?tree/i.test(f));
    expect(routes).toEqual([]);
  });
});

describe('§21/§30.17 assets resolve only through expected files', () => {
  const PUBLIC = join(ROOT, 'public');

  it('publishes no env file, key, archive or source map under public/', () => {
    const offenders = walk(PUBLIC)
      .map((f) => posix(relative(ROOT, f)))
      .filter((f) => /\.(env|pem|key|p12|pfx|zip|tar|gz|sql|map|bak)$/i.test(f));
    expect(offenders).toEqual([]);
  });

  it('ships no SVG, so no inline script can arrive through one (§21)', () => {
    const svgs = walk(PUBLIC).map((f) => posix(relative(ROOT, f))).filter((f) => f.endsWith('.svg'));
    expect(svgs).toEqual([]);
  });

  it('resolves the production audio asset that content references', () => {
    // Preview-only and test-fixture media live behind NODE_ENV guards and are
    // deliberately excluded; only assets reachable in production count here.
    expect(existsSync(join(PUBLIC, 'media', 'sample-story.wav'))).toBe(true);
  });
});
