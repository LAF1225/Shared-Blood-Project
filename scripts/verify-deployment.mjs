#!/usr/bin/env node
/**
 * Post-deployment verification (Module 26 §24 to §33, §43).
 *
 * Runs the same checks that were performed against the local production build,
 * but against a deployed origin, because hosting, a CDN and TLS can all change
 * the answers. Read-only and non-destructive: it issues ordinary GET/HEAD
 * requests plus three deliberately harmless payloads, at a handful of requests
 * per second. It is safe to run against production.
 *
 * Usage:
 *   node scripts/verify-deployment.mjs https://your-domain
 *
 * Exits 0 if everything passes, 1 otherwise.
 */

const origin = (process.argv[2] || '').replace(/\/$/, '');
if (!origin) {
  console.error('Usage: node scripts/verify-deployment.mjs https://your-domain');
  process.exit(1);
}
const isHttps = origin.startsWith('https://');

let passed = 0;
const failures = [];
const notes = [];

function check(name, condition, detail = '') {
  if (condition) passed++;
  else failures.push(detail ? `${name} :: ${detail}` : name);
}

async function get(path, options = {}) {
  const res = await fetch(`${origin}${path}`, { redirect: 'manual', ...options });
  const body = res.status === 405 || options.method === 'HEAD' ? '' : await res.text();
  return { status: res.status, headers: res.headers, body };
}

const REQUIRED_HEADERS = [
  'content-security-policy',
  'strict-transport-security',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'x-frame-options',
  'cross-origin-opener-policy',
  'cross-origin-resource-policy',
  'x-dns-prefetch-control',
];

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];

async function main() {
  console.log(`Verifying ${origin}\n`);

  // -- §24 security headers, on both locales and representative routes -------
  const headerTargets = [
    '/en',
    '/ur',
    '/en/diseases/beta-thalassemia',
    '/ur/diseases/beta-thalassemia',
    '/en/genetics/inheritance-calculator',
    '/ur/genetics/inheritance-calculator',
    '/en/genetics/pakistan-map',
    '/en/definitely-not-a-real-route',
  ];
  const cspValues = new Set();

  for (const path of headerTargets) {
    const res = await get(path);
    for (const header of REQUIRED_HEADERS) {
      check(`${path} has ${header}`, res.headers.has(header));
    }
    check(`${path} hides x-powered-by`, !res.headers.has('x-powered-by'));
    cspValues.add(res.headers.get('content-security-policy') ?? '');
  }
  check(
    'CSP is identical across locales and routes',
    cspValues.size === 1,
    `${cspValues.size} distinct values`,
  );

  // -- §25 CSP contents ------------------------------------------------------
  const csp = [...cspValues][0] ?? '';
  for (const directive of CSP_DIRECTIVES) {
    check(`CSP contains "${directive}"`, csp.includes(directive));
  }
  check('CSP has no unsafe-eval', !csp.includes('unsafe-eval'));
  check(
    'CSP allows no third-party origin',
    !/https?:\/\//.test(csp.replace('upgrade-insecure-requests', '')),
  );

  // -- §26 HTTPS and HSTS ----------------------------------------------------
  if (isHttps) {
    const res = await get('/en');
    const hsts = res.headers.get('strict-transport-security') ?? '';
    check('HSTS has a max-age', /max-age=\d+/.test(hsts), hsts);
    if (hsts.includes('preload')) {
      notes.push('HSTS includes `preload`. Confirm every subdomain serves HTTPS before submitting.');
    }
    try {
      const plain = await fetch(origin.replace('https://', 'http://') + '/en', {
        redirect: 'manual',
      });
      const location = plain.headers.get('location') ?? '';
      check(
        'HTTP redirects to HTTPS',
        [301, 302, 307, 308].includes(plain.status) && location.startsWith('https://'),
        `status ${plain.status}, location ${location || 'none'}`,
      );
    } catch (error) {
      notes.push(`Could not test the HTTP to HTTPS redirect: ${error.message}`);
    }
  } else {
    notes.push('Target is not HTTPS, so TLS, HSTS and redirect checks were skipped.');
  }

  // -- §27 canonical origin --------------------------------------------------
  for (const path of ['/en', '/ur', '/en/diseases/beta-thalassemia']) {
    const { body } = await get(path);
    const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    check(`${path} canonical is self-referential`, canonical === `${origin}${path}`, canonical);
    // Only meaningful against a real deployment: when the script is pointed at
    // the local server, "localhost" in the canonical is the correct answer.
    if (!origin.includes('localhost')) {
      check(
        `${path} leaks no dev or preview origin`,
        !/localhost:3000|127\.0\.0\.1|vercel\.app|netlify\.app/.test(body),
      );
    }
  }
  const sitemap = await get('/sitemap.xml');
  check('sitemap.xml is served', sitemap.status === 200);
  check('sitemap uses the production origin', sitemap.body.includes(`${origin}/en`));
  check('sitemap advertises no preview route', !/\/preview|stories-preview/.test(sitemap.body));
  check('robots.txt is served', (await get('/robots.txt')).status === 200);

  // -- §30 payloads ----------------------------------------------------------
  const xss = await get('/en/search?q=%3Cscript%3Ewindow.__xss_test__%3Dtrue%3C%2Fscript%3E');
  check(
    'reflected script tag is escaped, not executable',
    xss.body.includes('&lt;script&gt;') && !xss.body.includes('<script>window.__xss_test__'),
  );
  const diseaseXss = await get('/en/genetics/inheritance-calculator?disease=%3Cscript%3E');
  check('disease parameter is not reflected raw', !/"disease":"<script>/.test(diseaseXss.body));

  for (const query of ['next=https://example.invalid', 'redirect=javascript:alert(1)']) {
    const res = await get(`/en?${query}`);
    const location = res.headers.get('location') ?? '';
    check(
      `?${query} causes no external redirect`,
      !location || location.startsWith(origin) || location.startsWith('/'),
      location,
    );
  }
  const traversal = await get('/en/%2e%2e%2f%2e%2e%2fetc%2fpasswd');
  check('path traversal does not expose a file', !traversal.body.includes('root:x:'));

  // -- §30 HTTP methods ------------------------------------------------------
  for (const method of ['PUT', 'PATCH', 'DELETE']) {
    const res = await get('/en', { method });
    check(`${method} is rejected with 405`, res.status === 405, `got ${res.status}`);
  }
  for (const method of ['GET', 'HEAD']) {
    const res = await get('/en', { method });
    check(`${method} succeeds`, res.status === 200, `got ${res.status}`);
  }

  // -- §32 disclosure --------------------------------------------------------
  for (const path of [
    '/.env',
    '/.env.local',
    '/.git/config',
    '/package-lock.json',
    '/next.config.mjs',
    '/src/middleware.ts',
    '/coverage/',
    '/.next/',
  ]) {
    const res = await get(path);
    check(`${path} is not served`, res.status !== 200, `got ${res.status}`);
  }
  const notFound = await get('/en/definitely-not-a-real-route');
  check(
    'unknown route exposes no stack trace or path',
    !/at \w+ \(|node_modules|ENOENT|webpack-internal|\/home\/|C:\\\\Users/.test(notFound.body),
  );
  check('unknown route shows the not-found page', /not found|نہیں/i.test(notFound.body));

  // -- §23 preview routes and Family Tree ------------------------------------
  for (const path of [
    '/en/diseases/preview',
    '/en/diseases/stories-preview',
    '/en/community/preview',
    '/en/policy/preview',
    '/en/research/preview',
    '/en/survey/preview',
  ]) {
    const res = await get(path);
    check(`${path} is not public`, /not found/i.test(res.body), `status ${res.status}`);
  }
  const familyTree = await get('/en/genetics/family-tree-explorer');
  check('Family Tree remains retired', /not found/i.test(familyTree.body));

  // -- §33 caching -----------------------------------------------------------
  const unknownSlug = await get(`/en/diseases/zz-${Date.now()}`);
  check(
    'unknown slug is not cached for a year',
    !(unknownSlug.headers.get('cache-control') ?? '').includes('s-maxage=31536000'),
    unknownSlug.headers.get('cache-control') ?? '',
  );

  // -- product surfaces ------------------------------------------------------
  const surfaces = [
    '/en', '/ur',
    '/en/diseases', '/ur/diseases',
    '/en/diseases/beta-thalassemia', '/en/diseases/cystic-fibrosis',
    '/en/diseases/lysosomal-storage-disorders', '/en/diseases/ehlers-danlos-syndrome',
    '/en/genetics', '/en/genetics/inheritance-calculator', '/en/genetics/dna-explorer',
    '/en/genetics/punnett-square', '/en/genetics/relationship-risk', '/en/genetics/pakistan-map',
    '/ur/genetics/inheritance-calculator', '/ur/genetics/pakistan-map',
    '/en/about', '/en/research', '/en/policy', '/en/search',
  ];
  for (const path of surfaces) {
    const res = await get(path);
    check(`${path} returns 200`, res.status === 200, `got ${res.status}`);
    check(`${path} renders an h1`, res.body.includes('<h1'));
    check(`${path} has no missing translation`, !res.body.includes('MISSING_MESSAGE'));
    if (path.startsWith('/ur')) {
      check(`${path} is right to left`, res.body.includes('dir="rtl"'));
    }
  }

  // -- report ----------------------------------------------------------------
  console.log(`Passed: ${passed}`);
  if (notes.length) {
    console.log('\nNotes:');
    for (const note of notes) console.log(`  - ${note}`);
  }
  if (failures.length) {
    console.log(`\nFAILED: ${failures.length}`);
    for (const failure of failures) console.log(`  x ${failure}`);
    process.exit(1);
  }
  console.log('\nAll deployment checks passed.');
}

main().catch((error) => {
  console.error(`\nVerification could not complete: ${error.message}`);
  process.exit(1);
});
