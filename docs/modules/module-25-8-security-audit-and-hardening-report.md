# Module 25.8, Security Audit, Vulnerability Testing and Pre-Deployment Hardening

**Final status: `SECURITY_READY_WITH_DOCUMENTED_LOW_RISK_ITEMS`**

No open S0, S1 or S2 findings. Three S3 findings were found and fixed. Four S4 items were fixed and five remain open with documented reasoning. Full regression passes and the production build is clean.

This project was reviewed against selected applicable controls from the OWASP Top 10, OWASP ASVS and OWASP WSTG. **This is not a formal certification and no certification is claimed.** A qualified independent assessor would be required for that.

---

## 1. Scope and authorization

Testing was confined to systems owned by the project, as required by §4:

| Target | Authorized | Used |
|---|---|---|
| Local development environment | Yes | Yes |
| Local production build (`next build` + `next start` on `localhost:3000`) | Yes | Yes, primary dynamic target |
| Purpose-built cross-origin test server (`localhost:3100`) | Yes, created for this audit | Yes, for the §10 framing test |
| Project-owned staging deployment | Yes | Does not exist yet |
| Production domain | Requires explicit authorization | Not deployed, not tested |

No third-party site, hospital, reference source, email provider, external API or hosting provider was scanned. No denial-of-service testing, no credential stuffing, no destructive file manipulation, no high-volume scanning was performed. All dynamic requests were single, hand-issued, safe payloads.

## 2. Architecture reviewed

Next.js 15.5.22 App Router, React 19, TypeScript strict, Tailwind, next-intl 3.26.5 with `localePrefix: 'always'`.

The single most important architectural fact for this audit:

> **Shared Blood is a read-only, statically prerendered educational website with no server mutation surface whatsoever.**

Verified by inventory, not assumed:

- **91 statically prerendered pages**, 2 locales, 26 route families.
- **0** API routes, **0** route handlers (`route.ts`), **0** server actions (`'use server'`).
- **0** forms that submit; the only `<form>` is the search box, which performs a client-side `router.push` to a GET route.
- **0** database connections, **0** persistence, **0** user accounts, **0** authentication.
- **0** outbound `fetch`/XHR calls from application code. All content is compiled in at build time.
- **1** middleware (`src/middleware.ts`), handling locale routing and now HTTP method filtering.
- **7** runtime dependencies: `next`, `react`, `react-dom`, `next-intl`, `clsx`, `tailwind-merge`, `lucide-react`.
- **4** files under `public/`: two logo PNGs, one sample audio file, one `.gitkeep`.

## 3. Threat model summary

Full document: `docs/security/shared-blood-threat-model.md` (created by this module).

The residual risk profile is unusual and worth stating plainly: the application tier is close to inert, so **the dominant risk is not the website, it is the accounts that can publish to it.** Deployment account, hosting account and domain registrar compromise are the realistic routes to the only outcome that causes real-world harm, which is altered medical or genetics content. Those controls live outside the repository and are listed in §26 below as owner confirmations.

## 4. Assets and trust boundaries

Assets, ranked by consequence: medical and genetics content; calculator integrity; deployment credentials; domain and DNS control; source and build pipeline; Evidence Map records; audio assets and patient stories; localization catalogs; availability; project email.

Trust boundaries: browser to website; website to shared cache; middleware; **build time versus request time** (the critical one, since content trust is established at build time from version-controlled files); local environment to deployment (currently the widest, because it is entirely procedural).

## 5. AI-generated-code risk audit (§6)

Every pattern from §6 was searched across `src/`, `messages/` and `scripts/`, and each occurrence was classified by reading the surrounding data flow rather than by keyword.

| Pattern | Count | Classification |
|---|---|---|
| `dangerouslySetInnerHTML` | **0** | Not applicable |
| `eval(`, `new Function(` | **0** | Not applicable |
| `document.write(` | **0** | Not applicable |
| `innerHTML =`, `outerHTML =` | **0** | Not applicable |
| `javascript:`, `data:text/html` | **0** | Not applicable |
| `fetch(`, `axios` | **0** | Not applicable, and the reason SSRF is out of scope |
| `child_process`, `exec(`, `spawn(` | **0** | Not applicable |
| `fs.` in application code | **0** | Only in the dev-only em-dash script and test helpers |
| `localStorage`, `sessionStorage` | **0** in shipped code | 1 match was prose inside a dev-only audit record. **False positive** |
| `postMessage` | **0** | Not applicable |
| `Object.assign`, `deepMerge`, `merge(`, `__proto__`, `constructor.prototype` | **0** | §19 prototype pollution not applicable |
| `window.location` | 2 | **Safe and justified.** `window.location.search` read inside the locale-switch handler; the second is a comment |
| `router.push(` | 1 | **Safe.** Constant route + `encodeURIComponent(query)` |
| `router.replace(` | 1 | **Safe.** Path from `usePathname()`, query rebuilt from a one-key allowlist |
| `redirect(` | 1 | **Safe.** `/${locale === 'ur' ? 'ur' : 'en'}/genetics/pakistan-map`, a hardcoded ternary |
| `process.env` | 8 | **Safe.** Only `NODE_ENV` (6 preview-route guards) and `NEXT_PUBLIC_SITE_URL` |
| `NEXT_PUBLIC_` | 2 | **Safe.** Public site URL only |
| `target="_blank"` | 9 | 7 safe; **2 patched** (S4-01) |

## 6. OWASP Top 10 applicability

| Category | Applicable | Assessment |
|---|---|---|
| A01 Broken Access Control | Partially | No authenticated resources exist. Access control reduces to route allowlists, which were tested. Dev-only preview routes are guarded by `NODE_ENV` and 404 in production |
| A02 Cryptographic Failures | Partially | No data at rest, no secrets. Reduces to transport security: HSTS added, HTTPS is a Module 26 deployment action |
| A03 Injection | Yes | XSS is the only injection class with a surface. No sink exists; verified escaping empirically. No SQL, no OS command, no LDAP |
| A04 Insecure Design | Yes | Addressed by the threat model and the standing genetics-privacy constraints |
| A05 Security Misconfiguration | **Yes, primary finding area** | All three S3 findings sit here: missing headers, cacheable soft-404, framework disclosure. All fixed |
| A06 Vulnerable and Outdated Components | Yes | Full audit in §11 below. `next` patched, remainder assessed as unreachable |
| A07 Identification and Authentication Failures | No | No authentication exists. Becomes applicable the moment accounts are added |
| A08 Software and Data Integrity Failures | Yes | Lockfile committed, `npm ci` verified, content version-controlled, calculator integrity tests in the gate |
| A09 Security Logging and Monitoring Failures | Partially | No logging infrastructure yet; recommendations in §29 |
| A10 Server-Side Request Forgery | No | Zero outbound requests from application code. Documented as `NO_USER_CONTROLLED_SERVER_SIDE_FETCH` |

## 7. ASVS controls selected

Level 1 controls applicable to a static, unauthenticated public site:

- **V5 Validation, Sanitization and Encoding**: V5.1.x input validation (locale, disease, tool, resource allowlists), V5.2.x sanitization, V5.3.x output encoding (verified: React text escaping).
- **V12 Files and Resources**: V12.1 no unrestricted upload (none exists), V12.4 file storage, V12.5 download of unintended content.
- **V13 API and Web Service**: not applicable, no API.
- **V14 Configuration**: V14.2 dependency management, V14.3 no debug or stack-trace disclosure, V14.4 HTTP security headers, V14.5 HTTP method validation.

Not selected, and why: V2 Authentication, V3 Session Management, V4 Access Control, V6 Stored Cryptography, V7 Error Handling and Logging beyond disclosure, V8 Data Protection at rest, V9 Communications beyond TLS headers, V10 Malicious Code, V11 Business Logic. Each requires a feature Shared Blood does not have.

## 8. WSTG tests selected

Executed against the local production build:

- WSTG-CONF-02 application platform configuration, WSTG-CONF-06 HTTP methods, WSTG-CONF-07 HSTS, WSTG-CONF-08 cross-domain policy.
- WSTG-INFO-02 fingerprint web server, WSTG-INFO-08 framework fingerprinting.
- WSTG-INPV-01 reflected XSS, WSTG-INPV-11 code injection.
- WSTG-CLNT-04 open redirect, WSTG-CLNT-09 clickjacking.
- WSTG-ERRH-01 error-code disclosure, WSTG-ERRH-02 stack traces.

## 9. Source-code scanning tool and version (§16)

| Tool | Version | Scope |
|---|---|---|
| `eslint-plugin-security` | latest, via ESLint 9.39.5 | `src/`, `scripts/`, `next.config.mjs` |
| `eslint-plugin-no-unsanitized` (Mozilla) | latest, via ESLint 9.39.5 | Same |
| TypeScript compiler, `strict: true` | 5.9.3 | Whole project |
| `eslint-config-next` | 15.5.x | Whole project |
| Manual pattern sweep (§6 list) | ripgrep | `src/`, `messages/`, `scripts/` |

The SAST tooling was installed **outside the repository** and run against the project, so no security-scanner dependency was added to `package.json` (§33: do not add a heavy security package when platform controls are sufficient).

**Result: 3 errors, 396 warnings.** Triaged:

- **2 errors were configuration artifacts**, not findings: `react-hooks/exhaustive-deps` and `@next/next/no-img-element` reported "definition for rule not found" because existing inline `eslint-disable` comments reference rules the temporary scan config does not load. **False positives.**
- **1 genuine error**: `no-unsanitized/method` on a dynamic `import()` with an interpolated path in `src/i18n/request.ts`. Analysed and **fixed** (S4-04 below).
- **396 warnings**: 393 were `security/detect-object-injection`, which flags every `obj[variable]` access. In a TypeScript codebase where the key is a union type such as `'en' | 'ur'`, this is a false positive by construction; the rule is routinely disabled in TypeScript projects for this reason. The remaining 3 were `security/detect-non-literal-fs-filename` in the dev-only em-dash script and test helpers, which walk the repository by design and never see attacker input. **All false positives.**

GitHub CodeQL was not run because no Git repository or GitHub remote exists yet. It is listed as a Module 26 CI action in §27.

## 10. Dependency audit tool and version (§11)

`npm audit` / `npm outdated` on npm 11.16.0, Node 22.x.

**Incoming: 10 vulnerabilities (4 moderate, 5 high, 1 critical). Outgoing: 9 (4 moderate, 4 high, 1 critical).**

Patched with `npm audit fix` (no `--force`, per §11 and §38):

| Package | Before | After | Advisories cleared |
|---|---|---|---|
| `next` | 15.5.19 | **15.5.22** | 8 advisories including SSRF in rewrites (GHSA-p9j2-gv94-2wf4), SSRF in Server Actions, two cache-confusion issues, unbounded Server Action payload, image-optimization DoS via SVG, unauthenticated disclosure of internal Server Function endpoints |
| `postcss` (top level) | 8.5.16 | **8.5.25** | XSS via unescaped `</style>`, three sourceMappingURL path-traversal issues |
| `brace-expansion` | vulnerable | patched | Four ReDoS / OOM advisories |

Remaining 9, every one assessed for reachability rather than dismissed:

| Package | Severity | Reachable? | Reasoning |
|---|---|---|---|
| `vitest` | **critical** | **No** | GHSA-5xrq-8626-4rwp requires the **Vitest UI server to be listening**. The project script is `vitest run`, headless, no server. devDependency, never shipped |
| `vite`, `vite-node`, `@vitest/mocker`, `esbuild` | high / moderate | **No** | All require a running Vite dev server. Next uses its own bundler; Vite exists only underneath Vitest. devDependencies, never shipped |
| `next-intl` 3.26.5 | moderate | **No, verified empirically** | Open redirect (GHSA-8f24-v5vv-gm5j) requires `localePrefix: 'as-needed'`; this project uses `'always'`. Prototype pollution (GHSA-4c35-wcg5-mm9h) requires `experimental.messages.precompile`, which does not exist in v3 and is not used. Confirmed by test: `//malicious.example` produced `Location: /malicious.example`, a same-origin path, not an external redirect |
| `postcss` (nested under `next`) | high | **No** | Build-time CSS processing of the project's own Tailwind output. No attacker-controlled CSS is ever processed. Fixing requires `next@16`, a major upgrade |
| `sharp` 0.34.5 | high | **No** | libvips CVEs require attacker-supplied image input. `images.remotePatterns` is empty, so the optimizer can only process the two version-controlled PNGs under `public/`. `dangerouslyAllowSVG: false`. Fixing requires `next@16` |

**A vitest 4 upgrade was attempted and reverted.** It broke 3 test files (511 passing versus 599). Per §33, a forced upgrade was not applied to resolve a dev-only, unreachable advisory at the cost of destabilizing the release gate. Recommended as a dedicated future module.

Supply-chain hygiene: lockfile committed; `npm ci` clean install verified (414 packages); no typosquats found (all 7 runtime dependencies are the canonical packages); 3 packages have install scripts (`esbuild`, `sharp`, `unrs-resolver`), all standard native-binary fetchers from known publishers; no unused runtime dependency identified.

## 11. Secret-scanning method (§12)

Method: pattern scan of the full working tree and of the built output (`.next/static`, `.next/server`) for private-key blocks, AWS access key IDs, GitHub tokens (classic and fine-grained), Slack tokens, Google API keys, Stripe keys and JWTs; plus a review of every `.env` file.

**Result: no secret exists in this project.**

- `.env.local` contains four variables. Three (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are **empty**. The only populated value is `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- `.env.example` is a safe template: variable names only, no filled-in secret values.
- `.gitignore` excludes `.env` and `.env.*` while allowing `!.env.example`.
- Zero matches for every secret pattern in `src/` and in the built browser bundles.
- **Nothing to rotate**, because nothing was ever exposed.

**Git history was not scanned because no Git repository exists.** `git rev-parse` confirms "not a git repository". This means §12's history review, §14's repository access review and §15's CI/CD review are not yet applicable; they become Module 26 prerequisites the moment a repository is created. Push protection and secret scanning must be enabled at that point, before the first push.

## 12. Dynamic-testing method (§29)

Manual, non-destructive, single-request probes against `next start` on `localhost:3000`, plus a purpose-built cross-origin page on `localhost:3100` for the framing test, plus browser-based CSP and console inspection. No active attack mode, no automated scanner, no load generation.

OWASP ZAP was not run: it is not installed in this environment and installing an active scanner was judged unnecessary given that every check it would perform at baseline (headers, cookies, framing, disclosure, methods) was performed directly and is recorded below. A ZAP baseline scan against staging is recommended in §27.

## 13. Security-header results (§9)

Headers are defined once in `src/constants/securityHeaders.mjs` and applied in `next.config.mjs` to `/:path*`, so the test suite asserts exactly the values that are served.

Verified present on **52 route × locale combinations** (26 routes × EN/UR), with **exactly one distinct CSP value across both locales**, satisfying §30.19:

| Header | Value |
|---|---|
| `Content-Security-Policy` | See §14 |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()` |
| `X-Frame-Options` | `DENY` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `X-DNS-Prefetch-Control` | `off` |
| `x-powered-by` | **absent** |

## 14. CSP configuration (§9)

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self'; media-src 'self'; connect-src 'self';
worker-src 'self' blob:; manifest-src 'self'; frame-src 'none'; child-src 'none';
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
upgrade-insecure-requests
```

Built from actual resource requirements, not from a template:

- **Every fetch directive is `'self'`.** No third-party origin is needed because `next/font/google` downloads Newsreader, Source Sans 3 and Noto Nastaliq Urdu **at build time** and serves them from `/_next/static/media`. Verified in-browser: 22 font faces loaded with `font-src 'self'`.
- `'unsafe-inline'` in `script-src` is **required and documented**: the App Router streams its RSC payload through inline `<script>self.__next_f.push(...)</script>` tags. The alternative, a per-request nonce, forces every route to render dynamically and would destroy all 91 prerendered pages, which is an architectural change this module is not permitted to make.
  - The risk is bounded because `'unsafe-inline'` only matters if an attacker can inject markup, and this audit found **zero HTML injection sinks**. `object-src 'none'`, `base-uri 'self'` and `frame-ancestors 'none'` block the usual escalations regardless.
- `'unsafe-eval'` is **development only** (React Refresh) and asserted absent from production by test.
- `'unsafe-inline'` in `style-src` is required by `next/font`'s inline `@font-face` block.

Report-only mode was not needed: the policy was derived from the inventory first, and a live browser load of the production build produced **zero console messages and zero CSP violations**, so it was enforced directly.

## 15. HTTPS and HSTS status (§9)

HSTS is set to `max-age=31536000; includeSubDomains`, deliberately **without `preload`**. §9 requires that aggressive preloading wait until HTTPS is proven across every intended subdomain, and preload entries are slow and painful to reverse. `upgrade-insecure-requests` is in the production CSP.

HTTPS itself **cannot be verified from this environment** because the site is not deployed. Enforcing HTTPS, the HTTP-to-HTTPS redirect, and the decision on `preload` are Module 26 actions (see §26).

## 16. Clickjacking status (§10)

`frame-ancestors 'none'` plus `X-Frame-Options: DENY`.

**Controlled framing test executed.** A page served from `http://localhost:3100` (a genuinely different origin) attempted to embed Shared Blood:

| Frame target | Result |
|---|---|
| Control: `localhost:3100` (same origin as the attacker page) | `DOCUMENT-ACCESSIBLE (857 bytes)` |
| `localhost:3000/en` | **BLOCKED** |
| `localhost:3000/ur` | **BLOCKED** |
| `localhost:3000/en/genetics/inheritance-calculator` | **BLOCKED** |

The control frame proves the probe detects a successful embed, so the three blocked results are not false positives. The browser refused to render Shared Blood in an unauthorized frame, which is exactly the §10 expectation.

## 17. XSS review (§7)

No `dangerouslySetInnerHTML`, no Markdown or rich-text renderer, no raw-HTML injection anywhere. Translated strings are rendered as React text. No inline SVG from untrusted markup; in fact `public/` contains **no SVG at all** (icons are `lucide-react` React components). Audio metadata is static and version-controlled.

Live payload tests against the production build:

| Payload | Location | Result |
|---|---|---|
| `<script>window.__xss_test__ = true</script>` | `?q=` on `/en/search` | Rendered as escaped text `&lt;script&gt;...`; raw tag absent; `window.__xss_test__` is `undefined` in the browser |
| `<img src=x onerror=alert(1)>` | `?disease=` on the calculator | Raw tag absent. The only `onerror=` in the document is our payload **inside the RSC JSON payload with `<` encoded as `\u003c`**, which is React's standard escaping and cannot break out of the script context. **False positive on a naive grep** |

## 18. Redirect and URL review (§8)

| Test | Expected | Result |
|---|---|---|
| `?next=https://malicious.example` | ignored | 200, no `Location` |
| `?redirect=javascript:alert(1)` | ignored | 200, no `Location` |
| `?disease=<script>` | fails safe | 200, escaped, tool renders its default state |
| `/../../etc/passwd` | no traversal | 307 to `/en/etc/passwd`, then 404 content, stays on origin |
| `//malicious.example` | no external redirect | 308 to `/malicious.example`, a **same-origin path**. Confirms the next-intl advisory is not exploitable here |
| `/xx` (unknown locale) | fails safe | 307 to `/en/xx`, then not-found content |

Every internal destination is a constant or an allowlisted path. No user-controlled value reaches a navigation target anywhere in the codebase.

## 19. Input-validation review (§18)

| Input | Allowlist | Behaviour on hostile input |
|---|---|---|
| `locale` | `{en, ur}` via `isValidLocale` | Layout calls `notFound()` |
| `diseaseId` | canonical registry slugs | `getDiseaseBySlug` returns null, route 404s |
| `toolId` | active tool registry | `getGeneticsToolBySlug` returns null, route 404s |
| resource slug | resource catalogue | 404 |
| `?disease=` context | canonical ids only, via `parseDiseaseContext` | Ignored, tool renders default |
| `?q=` search | free text, **bounded to 120 code points** (new) | Escaped and truncated |

All four allowlists were tested against `<script>`, `../../etc/passwd`, `javascript:alert(1)`, `//malicious.example`, `%2e%2e%2f`, a null byte, a 5000-character string, empty string and whitespace, plus arrays, objects, `null`, `undefined`, `0` and `true`. None threw; all returned falsy. `Array.from` is used for the search truncation so a multi-byte or malformed surrogate cannot be cut in half.

## 20. Server-route inventory (§17)

**There are no server mutation endpoints.** Zero route handlers, zero API routes, zero server actions, zero form posts, zero filesystem access from application code, zero privileged environment access.

Per §17, no generic authentication or CSRF infrastructure was added, because there is no authenticated state-changing action to protect. Adding CSRF tokens to a site with no state change would be security theatre.

The only server-side code paths are: the middleware (locale + method filter), and React Server Components that read compiled-in data.

## 21. SSRF review (§20)

**`NO_USER_CONTROLLED_SERVER_SIDE_FETCH`.**

Zero `fetch`, `XMLHttpRequest`, `axios`, `node-fetch` or `got` calls exist in application code, and this is enforced by an automated test. There is no image proxy, metadata fetcher or document fetcher. `images.remotePatterns` is empty, so even the Next image optimizer cannot be pointed at a remote host. Protocol allowlists, private-range blocking and metadata-endpoint blocking are therefore not applicable; they become required the moment any outbound request is introduced.

## 22. File and SVG review (§21)

`public/` contains exactly four files: `logo.png`, `logo-mark.png`, `media/sample-story.wav`, `assets/.gitkeep`.

- No secrets, `.env`, keys, archives, database dumps, source maps or backups under `public/` (asserted by test).
- **No SVG anywhere**, so inline-script-in-SVG is not a vector (asserted by test). `dangerouslyAllowSVG: false` is set explicitly so enabling it becomes a deliberate act.
- MIME types are served by the platform from real file extensions.
- Audio metadata contains no private information; production `STORY_RECORDS` is intentionally empty, so no patient audio ships.
- Filenames expose no identities.
- `productionBrowserSourceMaps: false`, so no browser source maps are published.

One observation, not a defect: `/images/community/*.jpg` and `/media/x.mp3` appear in the codebase but do not exist in `public/`. All of them are confined to **preview datasets and test fixtures**. The preview routes call `notFound()` when `NODE_ENV === 'production'`, so none of these paths is reachable in a production build.

## 23. Environment-variable review (§13)

**`NO_REQUIRED_RUNTIME_SECRET`.** The site serves correctly with no secret configured.

| Variable | Purpose | Exposure | Secret | Required | Failure behaviour |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `metadataBase` for canonical and Open Graph URLs | **Browser + server** | No | No | Falls back to `http://localhost:3000`. See S4-09 |
| `NODE_ENV` | Guards 6 dev-only preview routes into 404 | Server | No | Set by tooling | Preview routes become reachable if not `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | Reserved, Module 20 | Browser | No | No | Unused, empty |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Reserved, Module 20 | Browser | **No, public by design** (protected by row-level security, not concealment) | No | Unused, empty |
| `SUPABASE_SERVICE_ROLE_KEY` | Reserved, Module 20 | **Server only, never `NEXT_PUBLIC_`** | **Yes** | No | Unused, empty |

An automated test asserts that the application reads **only** `NEXT_PUBLIC_SITE_URL` and `NODE_ENV`, and that no variable matching `SECRET|SERVICE_ROLE|PRIVATE|PASSWORD|TOKEN|CREDENTIAL` ever carries a `NEXT_PUBLIC_` prefix.

Browser bundles were searched for secret values: **zero matches**, and in fact no `NEXT_PUBLIC_` variable name appears in the client bundles at all.

## 24. Repository access review (§14)

**Not applicable yet, and this is itself the finding.** There is no Git repository, no remote, and therefore no branch protection, no collaborators, no deploy keys and no push protection. Everything in §14 becomes a Module 26 prerequisite. See §26.

## 25. CI/CD review (§15)

**Not applicable yet.** No workflow files, no third-party actions, no pipeline secrets. §15 becomes applicable when CI is created; the required gate commands are specified in §27.

## 26. Analytics and third-party scripts (§23)

**Inventory: empty.** No analytics provider, no pixel, no widget, no embed, no external font origin, no media host, no `next/script`, no `<script src="https://...">`. Enforced by automated test.

Consequently there is no genetics analytics payload, no calculator-selection tracking and no disease-interest profiling, because there is no analytics at all.

## 27. Personal and medical data boundary (§22)

Verified that Shared Blood does not collect or persist genotype, disease status, carrier status, calculated probability, relationship details, patient audio identity, identifiable search history, disease-interest profiles or location-linked health interests.

- **No `localStorage`, no `sessionStorage`, no `indexedDB`, no `document.cookie` writes.** Enforced by test.
- The only cookie is `NEXT_LOCALE`, set by next-intl to remember language. It contains `en` or `ur` and nothing else.
- Genetics results live in transient React component state and disappear on navigation.
- The only value that travels between tools is `?disease=<canonical-id>`, an explicit one-key allowlist. Genotype, parent status, probability and relationship results are never placed in a URL.
- No server logs contain user input beyond ordinary request paths.
- Family Tree remains retired: no tool slug, no route, no nav entry. Enforced by test.

## 28. Error-disclosure review (§24)

Invalid routes, invalid IDs, invalid parameters and missing assets were tested. Responses contain **no stack traces, no filesystem paths, no environment values, no secret values, no source excerpts, no debug details and no deployment identifiers.** Asserted both dynamically and by regression test (`at fn (`, `node_modules`, `ENOENT`, `webpack-internal`, `.tsx:<line>`, `C:\Users`, `/home/` all absent).

`poweredByHeader: false` and `productionBrowserSourceMaps: false` are set and asserted by test.

## 29. Cache-security review (§25)

| Requirement | Status |
|---|---|
| No user-specific data cached publicly | Pass. There is no user-specific data |
| No sensitive response in shared CDN cache | Pass. All responses are public educational content |
| Locale variants do not leak across users | Pass. `/en/*` and `/ur/*` are distinct URLs, and `Vary` includes the RSC negotiation headers |
| Query parameters cannot poison cached pages | Pass. Prerendered pages are keyed by path; query-bearing routes are `private, no-cache, no-store` |
| Security headers appear on cached responses | Pass. Verified on `x-nextjs-cache: HIT` responses |
| Module 25.7 locale fix does not create cache confusion | Pass. Locale switching verified end to end under the new headers: URL, `lang`, `dir=rtl` and title all switch correctly |

**One real finding here, fixed: S3-02 below.**

## 30. HTTP-method review (§26)

| Method | Before | After |
|---|---|---|
| GET, HEAD | 200 | 200 |
| POST | 200 (page HTML, no action performed) | 200 (unchanged; left open because Next reserves POST for server actions) |
| PUT, PATCH, DELETE | **200 (page HTML)** | **405 with `Allow: GET, HEAD, OPTIONS`** |
| OPTIONS | 400 | 400 (left to the platform so CORS preflight behaviour is unchanged) |

No route intentionally supports state changes, because none exists.

## 31. Resource-abuse review (§27)

No destructive load testing was performed. Reviewed by inspection:

- No unbounded loops or recursion over user input.
- No JSON parsing of request bodies (no endpoint accepts one).
- No unrestricted server fetches.
- Image transformation: limited to two local PNGs; no remote source can be supplied.
- Search: no index and no server-side search execution yet; the query is now length-bounded.
- Regular expressions: none applied to unbounded user input in application code.
- Locale refresh loops: the Module 25.7 switch performs one `replace` plus one `refresh` and returns `false` when the locale is unchanged, so it cannot loop.
- No upload handling.

Exposure is materially reduced by having no custom APIs and no compute-heavy server actions. The cacheable-soft-404 issue (S3-02) was the one genuine resource-abuse vector found, and it is fixed.

## 32. Content integrity (§28)

- Disease records, genetics mappings, audio mappings and references are all version-controlled TypeScript, modifiable only through the repository.
- References cannot be modified through public input; there is no public input that reaches content.
- Evidence Map counts are computed from compiled-in data and cannot be changed from the browser.
- Deployment requires authorized hosting access.
- **The release gate fails if canonical inheritance or disease-integrity tests fail**: `npm test` runs all 599 tests including the canonical engine, Punnett scenarios, disease validation, audio mappings and Module 20 governance, and any failure exits non-zero.

## 33. Findings by severity (§32)

**S0: none. S1: none. S2: none.**

### S3 (moderate), all fixed

| ID | Finding | Root cause | Fix |
|---|---|---|---|
| **S3-01** | **No security response headers at all.** The site shipped with no CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or framing protection | `next.config.mjs` defined no `headers()` | Added `src/constants/securityHeaders.mjs` and wired it to `/:path*`. Verified on 52 route × locale combinations |
| **S3-02** | **Not-found responses were cached for one year at attacker-chosen URLs.** Any unknown slug under `/diseases/`, `/resources/` or `/genetics/` returned a soft-404 stored with `Cache-Control: s-maxage=31536000`, letting an attacker fill a shared CDN cache with year-long entries at arbitrary URLs | `dynamicParams` defaults to `true`, so Next treated every unknown slug as an ISR candidate and cached the render | Added `export const dynamicParams = false` to the three slug routes, whose params are fully enumerable. Unlisted params are now rejected at the routing layer. `Cache-Control` became `private, no-cache, no-store, must-revalidate`. Verified that all real routes still resolve |
| **S3-03** | **Framework disclosure via `x-powered-by`** | Next's default | `poweredByHeader: false`; header confirmed absent on all 52 combinations |

### S4 (low), fixed

| ID | Finding | Fix |
|---|---|---|
| **S4-01** | Two external links used `rel="noreferrer"` without explicit `noopener` (`policy/components/shared.tsx`, `research/components/ReferencesList.tsx`). Modern browsers imply `noopener` from `noreferrer`, so exposure was minimal | Added explicit `noopener`. All 9 `target="_blank"` links now enforced by test |
| **S4-02** | The search query was echoed back unbounded, so a crafted link could render an arbitrarily long heading | Bounded to 120 code points using `Array.from` so multi-byte input cannot be split |
| **S4-03** | `PUT`, `PATCH` and `DELETE` were answered with page HTML and 200 | Middleware now returns 405 with `Allow` |
| **S4-04** | Dynamic `import()` interpolated the locale into a module path. Safe in practice, because `isValidLocale` narrows to two literals first, but the safety depended on a reader noticing the validation | Replaced with an explicit static catalog map, making the guarantee structural rather than validator-dependent. Verified both locales still load with no `MISSING_MESSAGE` |

### S4 (low), open and documented

| ID | Finding | Why it is accepted |
|---|---|---|
| **S4-05** | **Unknown locale-prefixed routes return HTTP 200 instead of 404.** Correct not-found content is served, but with a 200 status | Root cause identified: `notFound()` behind a next-intl middleware rewrite loses its status. Confirmed by contrast, `/nothing.txt`, which bypasses the middleware matcher, correctly returns 404. This is an SEO and correctness defect rather than a security one: no stack trace, no disclosure, and the caching consequence is already fixed by S3-02. Fixing it requires a next-intl v4 major upgrade, which is not a change to make during a security freeze |
| **S4-06** | Dev-only dependency advisories (`vitest` critical, `vite` high, `esbuild` moderate) | Not reachable: each requires a dev or UI server this project never starts. Never shipped to production. Upgrade attempted and reverted because it broke 3 test files |
| **S4-07** | `next-intl` 3.26.5 open-redirect and prototype-pollution advisories | Neither precondition is met, and the open redirect was empirically disproved. Fix requires a major upgrade |
| **S4-08** | `postcss` and `sharp` transitive under `next` | Build-time only, or no attacker-controlled input. Fix requires `next@16` |
| **S4-09** | `NEXT_PUBLIC_SITE_URL` silently falls back to `http://localhost:3000` | Not a vulnerability, but if unset in production the site will publish `localhost` canonical and Open Graph URLs. **Module 26 must set it.** |

## 34. Patches applied

| File | Change |
|---|---|
| `src/constants/securityHeaders.mjs` | **New.** Single source for CSP and all security headers |
| `next.config.mjs` | Applies headers to `/:path*`; `poweredByHeader: false`; `productionBrowserSourceMaps: false`; `dangerouslyAllowSVG: false` |
| `src/middleware.ts` | Method allowlist, 405 on mutation verbs |
| `src/app/[locale]/{diseases,resources,genetics}/[slug]/page.tsx` | `export const dynamicParams = false` |
| `src/app/[locale]/search/page.tsx` | `MAX_QUERY_LENGTH = 120`, code-point-safe truncation |
| `src/i18n/request.ts` | Static catalog map replaces interpolated dynamic import |
| `src/features/policy/components/shared.tsx` | `rel="noopener noreferrer"` |
| `src/features/research/components/ReferencesList.tsx` | `rel="noopener noreferrer"` |
| `package.json` / `package-lock.json` | `next` 15.5.22, `postcss` 8.5.25, `brace-expansion` patched |
| `src/audit/security.test.ts` | **New.** 72 security regression tests |
| `docs/security/shared-blood-threat-model.md` | **New.** |

## 35. Regression tests added (§30)

`src/audit/security.test.ts`, **72 tests**, mapped to the §30 checklist:

| §30 requirement | Covered by |
|---|---|
| 1. No raw secret values in source or bundles | 8 secret-shape patterns over `src/`; bundle scan performed dynamically |
| 2. No forbidden public environment variables | `NEXT_PUBLIC_` classification test; exact env-usage assertion |
| 3. No critical reachable dependency vulnerability | §10 reachability analysis (documented, not automatable) |
| 4. Required security headers exist | Header definition tests + 52-combination dynamic sweep |
| 5. CSP parses and appears on HTML responses | Directive parser test + dynamic sweep |
| 6. Site cannot be framed | `frame-ancestors 'none'` test + live cross-origin framing test |
| 7. Invalid disease parameters fail safely | 9 hostile inputs × disease and tool allowlists |
| 8. Invalid locale parameters fail safely | 9 hostile inputs × `isValidLocale` |
| 9. Redirect parameters cannot leave the origin | Source assertion + live payload tests |
| 10. `javascript:` URLs rejected | Scheme allowlist over all shipped source |
| 11. User-controlled values do not execute | Dangerous-API absence tests + live XSS payloads |
| 12. Unknown routes do not expose stack traces | Live probe assertions |
| 13. Static routes reject mutation | Middleware method-allowlist tests + live 405 verification |
| 14. Genetics results remain transient | Storage and cookie absence tests |
| 15. No sensitive genetics analytics | Analytics and third-party script absence tests |
| 16. Family Tree not reintroduced | Registry and route tests |
| 17. Assets resolve only through expected files | `public/` content tests |
| 18. No `x-powered-by` | Config test + dynamic sweep |
| 19. EN and UR receive equivalent headers | Dynamic sweep: exactly 1 distinct CSP across 52 combinations |
| 20. Direct and client-side routes equivalent | Dynamic sweep covers direct loads; locale switching verified in-browser |

## 36. False positives and rationale

| Reported | Verdict |
|---|---|
| 393 × `security/detect-object-injection` | **False positive.** Flags every `obj[variable]`; keys here are TypeScript union types |
| 3 × `security/detect-non-literal-fs-filename` | **False positive.** Dev-only repo-walking scripts, never see attacker input |
| 2 × ESLint "rule definition not found" | **False positive.** Artifact of the temporary scan config, not a code issue |
| `onerror=` present in rendered HTML | **False positive.** Our own payload inside the RSC JSON with `<` encoded as `\u003c` |
| `localStorage` grep hit | **False positive.** Prose inside a dev-only audit record |
| `vitest` critical advisory | **Not reachable.** Requires the Vitest UI server, never started |
| `redirect(` occurrence | **Safe.** Hardcoded ternary, no user input |

## 37. Deferred S3 and S4 items

All S3 items were fixed; none deferred. Open S4 items: **S4-05** (soft-404 status), **S4-06** (dev-only advisories), **S4-07** (next-intl advisories), **S4-08** (postcss/sharp under next), **S4-09** (site URL environment variable, a Module 26 action).

Recommended follow-up module: a dedicated dependency-modernization pass covering `next` 16, `next-intl` 4 and `vitest` 4 together, with full regression. That single upgrade would clear S4-05 through S4-08 at once, and it should be its own module precisely because it is a breaking change set that deserves its own verification budget.

## 38. Project-owner confirmations required (§31)

These **cannot be verified from this environment** and are genuine blockers for a confident production launch:

| # | Item | Status |
|---|---|---|
| 1 | GitHub account MFA enabled | **Owner must confirm** |
| 2 | Hosting-provider account MFA enabled | **Owner must confirm** |
| 3 | Domain registrar MFA enabled | **Owner must confirm** |
| 4 | Recovery codes stored outside the repository | **Owner must confirm** |
| 5 | HTTPS works on the production domain, with HTTP-to-HTTPS redirect | Not testable until deployed |
| 6 | `NEXT_PUBLIC_SITE_URL` set to the real production URL | **Required, see S4-09** |
| 7 | Branch protection and restricted direct pushes | Not applicable until a repository exists |
| 8 | Deploy tokens scoped to minimum permissions | Not applicable until deployment is configured |
| 9 | Preview deployments do not receive production credentials | Not applicable, no credentials exist |
| 10 | Secret scanning and push protection enabled **before the first push** | **Required at repository creation** |

Legend: automatically verified items are covered in §35; manually verified items are in §12 to §32; items 1 to 4 and 7 to 10 require owner confirmation; item 5 is not testable in the available environment.

## 39. Gate results

| Gate | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | **Clean**, 0 errors |
| ESLint (`next lint`) | **0 errors, 0 warnings** |
| Em-dash check | **Pass** |
| Test suite | **599 passed / 52 files** (baseline 527 / 51; +72 security tests) |
| Clean dependency install (`npm ci`) | **Pass**, 414 packages |
| Production build | **Pass**, 91/91 static pages |
| Shared First Load JS | **103 kB** (baseline 102 kB; +1 kB from the `next` security patch) |
| Middleware size | 52.2 kB |
| Dynamic verification | **15/15 checks pass** |
| Route sweep | **52/52 combinations**, 0 problems, 1 distinct CSP |

## 40. Final security-readiness decision

### `SECURITY_READY_WITH_DOCUMENTED_LOW_RISK_ITEMS`

Justification against §34:

- No open S0, S1 or S2 findings.
- All three S3 findings fixed and regression-tested.
- No exposed secrets; none exist to expose.
- No critical **reachable** dependency vulnerability; the one critical advisory is dev-only and requires a server this project never starts.
- Security headers implemented and verified on every route in both locales.
- SAST, dependency audit, secret scan and authorized dynamic testing all completed.
- Full regression and production build pass.

`SECURITY_READY_FOR_MODULE_26` was **not** assigned, for one honest reason: that status requires a verified HTTPS plan, and HTTPS cannot be verified until the site is actually deployed, nor can the account-security items in §38. Those are Module 26 activities. The five open S4 items are all documented, all low risk, and none is a deployment blocker.

## 41. Module 26 security handoff (§36)

| Item | Value |
|---|---|
| **Approved deployment branch** | To be created. No Git repository exists yet; create one, enable secret scanning and push protection **before** the first push |
| **Package manager / clean install** | npm, `npm ci` (lockfile committed, verified) |
| **Node version** | 22.x (build and test verified) |
| **Environment variables** | `NEXT_PUBLIC_SITE_URL` **must** be set to the real production URL. No secret is required. Do not create any `NEXT_PUBLIC_` variable holding a secret |
| **Required response headers** | Applied automatically by `next.config.mjs`. If the host adds its own headers, verify they do not override or duplicate the CSP |
| **CSP** | See §14. If any third-party origin is ever added, it must be added to the policy explicitly |
| **HTTPS and HSTS** | HTTPS required. HSTS ships as `max-age=31536000; includeSubDomains`. **Do not add `preload`** until HTTPS is confirmed working on every intended subdomain |
| **Allowed third-party origins** | **None.** Fonts are self-hosted at build time |
| **Source-map policy** | Production browser source maps disabled |
| **Error-reporting configuration** | None configured. If one is added, ensure payloads exclude genetics selections |
| **Dependency and scan results** | §10, §11, §9 above |
| **Intentional public assets** | `logo.png`, `logo-mark.png`, `media/sample-story.wav` |
| **Placeholder routes** | Six `/preview` routes are dev-only and 404 in production via `NODE_ENV`. **Verify this after the first deploy** |
| **Intentional Family Tree 404** | `/genetics/family-tree-explorer` serves not-found content. Note S4-05: the status is currently 200 rather than 404 |
| **Rate-limiting needs** | None at the application layer; no endpoint accepts input. Platform-level rate limiting is still advisable against scanner noise |
| **Log-retention guidance** | Retain access logs briefly for abuse investigation. Never log query strings containing genetics context beyond `disease` |
| **Incident-contact process** | Establish a security contact address and a documented rotation procedure before launch |
| **Post-deployment smoke tests** | Headers on a real HTTPS response; CSP violation count zero; framing refused; `x-powered-by` absent; all five genetics tools functional in a real browser; locale switching in both directions; `/preview` routes 404 |

## 42. Post-deployment monitoring recommendations (§37)

**Approved:** site availability; unexpected 404 increases; client runtime errors; CSP violation reports; failed asset loads; unusual request volume; deployment failures; dependency advisories; secret-scanning alerts; domain and certificate expiry; unauthorized repository or deployment changes.

**Prohibited, and this is a hard project constraint:** calculator result tracking; genotype or carrier-status tracking; relationship-result tracking; disease-interest profiles; user-level genetics journeys; patient-audio listening profiles.

## 43. Known limitations of this audit

Stated plainly so the gate result is not over-read:

1. **HTTPS, HSTS behaviour and the production domain were not tested**, because the site is not deployed.
2. **No Git history scan was possible**, because no repository exists.
3. **GitHub CodeQL was not run**, for the same reason. Add it to CI in Module 26.
4. **No OWASP ZAP baseline scan** was run; equivalent checks were performed manually. A ZAP baseline against staging is still recommended.
5. **The five genetics tools were not fully exercised interactively.** This preview harness parks client components behind Suspense in a hidden container, a limitation carried over from Module 25.7. Page content, hydration, zero CSP violations and correct locale switching were all confirmed, but a **real-browser smoke test of all five tools against `next start` remains an outstanding pre-deployment recommendation**.
6. **Account security (MFA, branch protection, deploy-token scope) is unverified** and depends entirely on owner confirmation, per §38.
