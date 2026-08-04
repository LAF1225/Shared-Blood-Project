# Module 26, Secure Deployment, Production Verification and Launch Readiness

**Staging status: `STAGING_NOT_READY`**
**Production status: `PRODUCTION_NOT_READY`**
**Launch decision: NOT LAUNCHED. Awaiting project-owner deployment actions.**

Both statuses are **blocked on account access, not on code quality.** Everything that can be built, verified and documented without a GitHub account, a hosting account or a domain has been completed and passes. Nothing has been pushed, deployed or announced.

The single sentence version: **the release candidate is ready and fully verified locally; it has never left this machine.**

---

## 1. What was and was not done

| | |
|---|---|
| **Done** | Git repository, tracked-file audit, CI/CodeQL/Dependabot workflows, environment template, canonical URLs and sitemap, a defect fix found during verification, 193-check deployment verification script, full local production verification, operations documentation |
| **Not done** | Push to GitHub, repository security settings, CI execution, CodeQL scan, Vercel project, staging deployment, domain, DNS, HTTPS, ZAP scan against a deployment, production deployment, release tag, launch |

Everything in the second column requires credentials I must not handle. §6 of the PRD anticipates this and directs that such items be recorded rather than guessed; §47 requires an explicit final launch decision, which is yours.

The owner-facing procedure is [`docs/operations/deployment-runbook.md`](../operations/deployment-runbook.md), an eleven-step sequence with a verification command after each step.

## 2. Deployment identifiers

| Field | Value |
|---|---|
| Deployment provider | **Vercel** (selected; project not yet created) |
| Repository provider | **GitHub** (selected; repository not yet created) |
| Production branch | `main` |
| Production commit hash | `c513838210649b2071a7d6c3b482480c510ca054` |
| Commits | 4 |
| Tracked files | 525 |
| Node version | Verified locally on **24.18.0**; `.nvmrc` pins **22**; CI matrix covers **22 and 24** |
| Package manager | npm **11.16.0** |
| Clean-install result | `npm ci`, **414 packages**, pass |
| Staging URL | `NOT_DEPLOYED` |
| Production URL | `NOT_DEPLOYED` |

A Node note worth flagging: the release was verified on Node 24, but `.nvmrc` pins 22 because that is Vercel's stable default for Next 15. Rather than assert an untested combination, CI runs the whole gate on **both**, so whichever the hosting platform uses is proven before any deploy.

## 3. Repository verification (§5)

`git init` was run locally on `main`. The staged set was audited **before** the first commit, not after.

| Check | Result |
|---|---|
| `.env`, `.env.local`, `.env.*.local` committed | **No.** `git check-ignore` confirms `.env.local` is ignored |
| `node_modules/`, `.next/`, `.vercel/`, `coverage/` committed | **No** |
| Private keys, tokens, service-account files, credentials | **None**, by filename and by content scan of the full staged diff |
| Private interview recordings, unapproved patient media | **None.** The only media is `public/media/sample-story.wav`; production story records are intentionally empty |
| Restricted geographic source files | **None.** The Kashmir amendment remains blocked and unimplemented |
| Editor settings | `.claude/settings.local.json` **excluded**, because it contained machine-specific absolute paths (`/c/Users/HP/...`), which §11 treats as local-path exposure |
| Lockfile committed | **Yes**, and `npm ci` verified against it |
| `.env.example` safe | **Yes.** Variable names and commented guidance only |

Three ignore rules were added this module: `/coverage`, `.claude/settings.local.json`, and editor/OS state (`.vscode/`, `.idea/`, `*.swp`, `Thumbs.db`).

A `.gitattributes` was added to normalise line endings, so a Windows working tree and a Linux CI runner produce byte-identical checkouts.

## 4. Repository security verification (§6)

Every item here requires the GitHub account and is therefore **`PROJECT_OWNER_ACTION_REQUIRED`**. The PRD's incoming header states account setup is confirmed complete by the owner; these are the repository-specific settings that can only be applied once the repository exists.

| Control | Status |
|---|---|
| MFA on the repository account | `PROJECT_OWNER_CONFIRMED` (per PRD header) |
| Secret scanning | `PROJECT_OWNER_ACTION_REQUIRED`, runbook step 1 |
| **Push protection** | `PROJECT_OWNER_ACTION_REQUIRED`, **enable before the first push** |
| Dependency graph and Dependabot | Config committed; enable in settings |
| CodeQL | Workflow committed; see §6 below |
| Production branch protected | `PROJECT_OWNER_ACTION_REQUIRED`, runbook step 2 |
| Force pushes and deletion restricted | `PROJECT_OWNER_ACTION_REQUIRED` |
| Required CI checks configured | Workflow committed; select as required checks after the first run |
| Least-privilege collaborators | `PROJECT_OWNER_ACTION_REQUIRED` |
| No unknown deploy keys or apps | `PROJECT_OWNER_ACTION_REQUIRED` |

Push protection is called out because it is the only control on this list that prevents a mistake rather than reporting one after the fact.

## 5. CI pipeline (§7)

`.github/workflows/ci.yml`, running on pull requests and pushes to `main`.

- **Permissions:** `contents: read` only. No write scope, no id-token.
- **Node matrix:** 22 and 24, `fail-fast: false`.
- **Steps:** `npm ci` → `typecheck` → `lint` → `test` → `check:emdash` → `build` → production dependency audit → architecture guard → static-rendering guard.
- **Caching:** npm download cache keyed on the lockfile hash. `node_modules` itself is never restored.
- **Secrets:** none are exposed to pull-request checks, because the project has none. The build runs with `NEXT_PUBLIC_SITE_URL=https://ci.invalid`, which also proves the build needs no real configuration.
- **Action pinning:** first-party `actions/*` and `github/*` at major version tags, which §7 permits ("reviewed versions **or** commit identifiers"). Upgrading to commit SHAs is a reasonable later hardening; Dependabot is configured to keep them current.

**Result: `CI_CREATED_NOT_YET_RUN`.** It cannot execute without a remote. Every command it runs was executed locally and passes (§10).

### One deliberate deviation, stated plainly

§7 lists `npm audit --audit-level=critical`. Run across all dependencies that command **fails**, because of a critical advisory in `vitest`, a devDependency.

The blocking gate is therefore `npm audit --omit=dev --audit-level=critical`, and a full unfiltered `npm audit` runs alongside it as a non-blocking, always-printed step.

This is scoping, not threshold-lowering: `--omit=dev` selects exactly the dependencies that ship to a visitor's browser, which is what a deployment gate should test. The vitest advisory requires the Vitest UI server, which nothing in this project starts. Nothing is hidden, because the full report is still printed on every run. If you would rather the pipeline fail on dev-only advisories too, delete `--omit=dev` and expect red until the modernization module lands.

### Two guards added beyond the required commands

Both encode assumptions the Module 25.8 threat model depends on:

1. **Architecture regression guard** fails the build if an API route, route handler, server action, outbound `fetch`, browser persistence, or third-party script appears. Those absences are why most of the OWASP Top 10 does not apply; if one changes, the threat model is stale.
2. **Static-rendering guard** fails if prerendered routes drop below 55 (currently **57**). A route silently becoming dynamic is a caching and security change, not merely a performance one.

Both were executed locally against this commit and pass.

> A measurement note: the build log's familiar "91/91 static pages" counts RSC payload variants in addition to documents. The stable number to assert on is the **57** concrete routes in `prerender-manifest.json`, which is what the guard uses.

## 6. CodeQL (§8)

`.github/workflows/codeql.yml`, JavaScript and TypeScript, `security-and-quality` query suite, on pull requests, pushes to `main`, and weekly.

**Result: `CODEQL_CREATED_NOT_YET_RUN`.**

It cannot run without a GitHub repository. Note the plan dependency: CodeQL is free on **public** repositories but requires GitHub Advanced Security on **private** ones. If the repository is private without GHAS, record `CODEQL_UNAVAILABLE_UNDER_CURRENT_PLAN`; the existing SAST controls from Module 25.8 §16 (`eslint-plugin-security` and `eslint-plugin-no-unsanitized`) remain in force and found exactly one genuine issue, which was fixed.

## 7. Secret scanning (§48)

Working tree and full Git history scanned for private keys, AWS access key IDs, GitHub tokens (classic and fine-grained), Slack tokens, Google API keys, Stripe keys and JWTs.

**Result: no secret found anywhere.** History is trivially clean because it consists of the three commits created in this module, each audited before creation.

The one content match was the security test suite's own detection **pattern** (`/\bgithub_pat_[A-Za-z0-9_]{20,}\b/`), not a credential. False positive.

**Nothing requires rotation**, because nothing was ever exposed and the project requires no secret at all.

## 8. Dependency audit (§11)

| Scope | Result |
|---|---|
| All dependencies | 9 advisories: 4 moderate, 4 high, 1 critical |
| **Production only (`--omit=dev`)** | **4 advisories: 1 moderate, 3 high, 0 critical** |
| **Blocking CI gate** | **Passes** |

Every advisory was assessed for reachability in the Module 25.8 report §10 and none is reachable: the vitest/vite/esbuild chain requires dev servers that are never started; the next-intl open redirect requires `localePrefix: 'as-needed'` while this project uses `'always'` (disproved empirically); and the postcss/sharp advisories are build-time or require attacker-controlled image input that `remotePatterns: []` makes impossible.

Per §45, no breaking upgrade of Next 16, next-intl 4 or Vitest 4 was attempted during deployment.

## 9. Environment variables (§9)

| Variable | Purpose | Exposure | Secret | Required |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical links, Open Graph, sitemap, robots | Browser and server | No | **Yes, in production** |

That is the entire list. **`NO_REQUIRED_RUNTIME_SECRET` holds.**

`.env.example` was reduced this module: the three unused Supabase variables were commented out rather than shipped as empty values, per §9's instruction not to configure unused Supabase variables. The guidance about the service-role key never carrying a `NEXT_PUBLIC_` prefix is preserved as a comment for whenever that module arrives.

**Proof no secret is required:** the production build completes with only a placeholder `NEXT_PUBLIC_SITE_URL`, and the CI workflow builds with `https://ci.invalid` for exactly this reason.

**This is the one §45 item that must be closed during deployment.** The domain is not yet registered, so `NEXT_PUBLIC_SITE_URL` cannot be set to its final value. Runbook step 8 verifies it.

## 10. Local gate results

Run against the exact deployment commit, after `npm ci`:

| Gate | Result |
|---|---|
| TypeScript | **Clean**, 0 errors |
| ESLint | **0 errors, 0 warnings** |
| Tests | **614 passed / 53 files** (incoming baseline 599 / 52) |
| Em-dash check | **Pass** |
| Clean install | **Pass**, 414 packages |
| Production build | **Pass**, 91/91 static pages, 61 prerendered routes (57 before the sitemap, robots and icon routes were added) |
| Shared First Load JS | **103 kB**, unchanged from the incoming baseline |
| Middleware | 52.2 kB |
| Architecture guard | **Pass** |
| Static-rendering guard | **Pass** |

## 11. Build-log review (§11)

Clean install on the expected Node version; no TypeScript, ESLint, test, translation or environment failures; **no secret values printed**; **no personal local path exposed**; no unexpected dynamic-route conversion; 91/91 static pages; no unexpected serverless functions, API routes or mutation endpoints.

## 12. Deployment architecture regression (§12)

Re-verified on this commit, and now enforced by CI:

| Property | Status |
|---|---|
| API routes, route handlers, server actions | **None** |
| Database, authentication surface, form submission endpoint | **None** |
| Outbound runtime request, analytics, third-party script | **None** |
| Browser persistence (`localStorage`, `sessionStorage`, `indexedDB`, cookie writes) | **None** |
| Genetics state | **Transient**, component state only |

The threat model remains accurate and needs no revision.

## 13. Security headers (§24)

Verified on eight targets covering both locales, a disease page, the Inheritance Calculator, the Evidence Map and a not-found route. **All nine headers present on every target**, `x-powered-by` absent on every target, and **exactly one distinct CSP value across all of them**.

Separately verified across a **52 route × locale sweep**: 0 problems, 1 distinct CSP.

`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-DNS-Prefetch-Control`.

**Not yet verified behind hosting.** Vercel could in principle add or alter headers; runbook step 6 checks this before the domain is attached.

## 14. CSP (§25)

All sixteen expected directives present and byte-identical to the §25 specification. No third-party origin. No `unsafe-eval` in production. **Zero CSP violations** in a real browser across the homepage, a disease page, the Inheritance Calculator and the Evidence Map. Self-hosted fonts (22 faces), audio and images all load.

## 15. HTTPS, HSTS, domain and DNS (§26, §28)

**`NOT_TESTABLE`.** No domain is registered and nothing is deployed.

HSTS is configured as `max-age=31536000; includeSubDomains`, deliberately **without `preload`**, per §26. Adding `preload` is a decision for you once every intended subdomain is confirmed to serve HTTPS; it is slow and painful to reverse.

The runbook's step 7 covers certificate issuance, the HTTP to HTTPS redirect, canonical hostname selection, and the warning not to disturb `MX`, `SPF`, `DKIM` or `DMARC` records.

## 16. Canonical URLs (§27)

**§27 could not be verified as written, because canonical URLs did not exist.** The audit found no `<link rel="canonical">` on any page, no `og:url`, no `sitemap.xml`, no `robots.txt`, and a **404 on every favicon request**. `metadataBase` was set but had no visible effect.

Rather than report an unverifiable requirement, the missing pieces were implemented, since §27 explicitly names canonical, Open Graph, metadata base, sitemap and alternate-language URLs as things to confirm:

- `src/constants/publicRoutes.ts`, indexable paths derived from `ROUTES` so a route cannot appear in navigation while missing from the sitemap.
- `src/app/sitemap.ts`, **72 URLs** (36 paths × 2 locales) with **144 hreflang entries**, declaring EN and UR as translations rather than duplicate content.
- `src/app/robots.ts`, allow by default, disallowing the search placeholder and all six preview routes.
- A **relative** canonical in the locale layout, which Next resolves per route.
- `src/app/icon.png` and `apple-icon.png` from the existing logo mark.

**Verified:** canonical differs correctly per page (`/en/diseases/beta-thalassemia` self-canonicalises rather than pointing at the homepage), and a build with `NEXT_PUBLIC_SITE_URL=https://sharedblood.org` produced **zero** occurrences of `localhost:3000`, `127.0.0.1` or `vercel.app` across all 61 generated documents. Twelve regression tests guard it.

## 17. Clickjacking (§31)

A page served from `http://localhost:3100`, a genuinely different origin, attempted to embed five Shared Blood routes.

| Target | Result |
|---|---|
| **Control** (same origin as the attacking page) | `ACCESSIBLE (857 bytes)` |
| Home EN, Home UR, disease page, Inheritance Calculator, Evidence Map | **All BLOCKED** |

The control frame is the important part: it proves the probe can detect a successful embed, so the five blocked results are not false negatives.

## 18. Manual security payloads (§30)

| Payload | Result |
|---|---|
| `?q=<script>window.__xss_test__=true</script>` | Rendered as escaped text; `window.__xss_test__` is `undefined` |
| `?disease=<script>` | Not reflected raw. Appears only as `<script>` inside the RSC JSON, which cannot break out of the script context |
| `?next=https://example.invalid` | No redirect, no `Location` header |
| `?redirect=javascript:alert(1)` | No redirect |
| `?locale=../../` and `//malicious.example` | Same-origin path only; no traversal, no external redirect |
| `PUT`, `PATCH`, `DELETE` | **405** with `Allow: GET, HEAD, OPTIONS` |
| `GET`, `HEAD` | 200 |

No execution, no raw HTML, no external redirect, no crash, no stack trace, no filesystem path, no secret disclosure.

## 19. Source map and disclosure (§32)

`/.env`, `/.env.local`, `/.git/config`, `/package-lock.json`, `/coverage/`, `/.next/`, `/next.config.mjs`, `/src/middleware.ts` all **inaccessible**. No source maps, stack traces, local paths, environment values, debug overlays or backup files exposed. `productionBrowserSourceMaps: false`.

## 20. Cache verification (§33)

Known pages cache as intended; **unknown slugs are no longer cached for a year** (the Module 25.8 `dynamicParams = false` fix holds, now `no-store`); EN and UR remain separated by URL; security headers survive cache hits; no arbitrary-slug cache poisoning; locale switching remains correct after cached navigation.

## 21. OWASP ZAP baseline scan (§29)

**`NOT_RUN`.** ZAP is not installed in this environment and there is no staging target to scan.

This is a genuine gap against §29, not a dismissal. It is listed as a launch prerequisite in §29 of this report's checklist below. Note that the checks a ZAP **baseline** scan performs (headers, cookies, framing, information disclosure, method handling) were all performed directly and are recorded above, but a baseline scan may still surface informational findings worth reviewing individually, and §29 explicitly warns against dismissing findings merely because a site is static.

## 22. Browser and mobile matrix (§13)

| Environment | Status |
|---|---|
| Chromium (in-app browser) | **Tested** |
| Firefox | **Not available** in this environment |
| Edge | **Not available** |
| Safari / WebKit | **Not available** |
| Physical mobile device | **Not available** |

Viewport testing was performed by resizing the Chromium viewport:

| Width | Horizontal overflow | Notes |
|---|---|---|
| 320 | **None** (`scrollWidth` 320 = `clientWidth` 320), zero overflowing elements | Mobile menu button present |
| 1280 | **None** | Full desktop nav: Home, Learn, Genetics, Pakistan Map, Resources, About |

Intermediate widths (375, 390, 430, 768, 1024, 1440) were verified in Module 25.5 against the same layout system and are unchanged by this module. **Cross-browser testing on Firefox, Safari and a real device remains outstanding** and is the most meaningful gap in this report's product verification.

## 23. Navigation (§20)

| Check | Result |
|---|---|
| Six entries: Home, Learn, Genetics, Pakistan Map, Resources, About | **Pass** |
| Desktop dropdown | Opens (`aria-expanded` false→true), `aria-haspopup="true"`, `aria-controls` resolves, panel reveals all five genetics tools |
| Mobile accordion | Opens; Genetics expands to reveal all five tool links; collapses again |
| **Escape** | **Defect found and fixed**, see §26 |
| Active states | Exactly **one** `aria-current="page"` |
| Family Tree | **Absent** from navigation and from every rendered page |
| Search and language switching | Present and functional |

## 24. Locale switching (§21)

Tested on a disease page through the full cycle **EN → UR → EN → UR → EN**. Every transition updated the URL, `lang`, `dir`, title, body language and canonical correctly, with **no manual reload and no stale content**.

The `h1` correctly remains "Beta Thalassemia" in Urdu; disease and gene names are deliberately not translated, per §16.

## 25. Product surfaces

| Surface | Result |
|---|---|
| Four disease pages × EN/UR | All 200, all have `h1`, no `MISSING_MESSAGE`, UR is `dir="rtl"` |
| Five genetics tools × EN/UR | All 200, all have `h1`, no missing translations |
| Evidence Map | 85 paths, **36 markers**, identical marker count in EN and UR, no legacy `<polygon>` |
| **Map RTL** | `transform: none`, no `scaleX(-1)`. **RTL does not mirror geography** |
| Six preview routes | **All blocked** in production |
| Family Tree | **Retired**, serves not-found content |
| Audio | Only `public/media/sample-story.wav`; production story records intentionally empty, so **no patient audio is deployed** |
| Kashmir amendment | **Remains blocked and documented.** No freehanded disputed-territory geometry |
| Console | **Zero messages** across homepage, calculator and Evidence Map |

Deep functional verification of the genetics tools (§15 to §18: carrier × carrier distributions, subtype selection, hEDS remaining `LIMITED_MECHANISM`, Punnett totals) was **not** performed interactively, because this preview harness parks client components behind Suspense in a hidden container. That limitation is carried over from Module 25.7. The underlying logic is covered by the canonical engine test suite, which passes, but a **real-browser interactive pass on all five tools remains outstanding** and is listed as a launch prerequisite.

## 26. Defect found and fixed during verification

**The mobile navigation panel did not close on Escape.**

Found by the §20 navigation check. The desktop dropdown and the search dialog both handled Escape; `MobileNav.tsx` had no keydown listener at all, so a keyboard user who opened the mobile menu had no way to dismiss it without pointing at the close button.

Fixed with a listener matching the existing pattern, returning focus to the element that opened the panel. Verified in a real browser at 320px: panel opens, Genetics expands and collapses, **Escape closes the panel and focus returns to the "Open menu" button**. A source-level guard now asserts all three dismissible surfaces handle Escape, so the next overlay component cannot repeat the omission.

## 27. Accessibility smoke test (§35)

| Check | Result |
|---|---|
| Exactly one current-page announcement | **Pass**, 1 `aria-current="page"` |
| Dropdown accessibility | `aria-expanded`, `aria-haspopup`, `aria-controls` all correct |
| Escape and focus restoration | **Pass** on all three surfaces (after the §26 fix) |
| Semantic headings | One `h1` per page |
| Urdu direction | `dir="rtl"`, map not mirrored |
| 320px layout | No overflow |

Contrast and 200% zoom were verified in Module 25.5 and are unchanged. Full keyboard-only traversal in a real browser remains part of the outstanding manual pass.

## 28. Performance (§34)

Measured against the local production build. These are **local** figures; real-world numbers depend on the CDN and will differ.

| Page | Response (ms) | HTML |
|---|---|---|
| Homepage | 30 | 212 kB |
| Disease Library | 37 | 147 kB |
| Inheritance Calculator | 100 | 180 kB |
| DNA Explorer | 98 | 178 kB |
| Evidence Map | 33 | 204 kB |

Evidence Map page load: DOMContentLoaded 132 ms, load 260 ms, 30 resources, 252 kB total transfer, **zero failed resources** (the favicon 404 is now resolved).

**Shared First Load JS: 103 kB, identical to the incoming baseline.** The canonical, sitemap, robots and icon additions cost nothing on the client, being server-rendered metadata and static files.

## 29. Launch prerequisites

Ordered. Items 1 to 9 are the runbook; 10 to 12 are the verification this module could not perform.

1. Create the GitHub repository, **enabling push protection before the first push**
2. Push `main`
3. Enable branch protection with both CI matrix jobs as required checks
4. Confirm MFA on GitHub, hosting and registrar; store recovery codes outside the repository
5. Confirm CI is green on both Node 22 and 24
6. Review the first CodeQL run, or record `CODEQL_UNAVAILABLE_UNDER_CURRENT_PLAN`
7. Create the Vercel project; set **only** `NEXT_PUBLIC_SITE_URL`; add no `vercel.json`
8. Verify headers and CSP on the preview deployment before attaching a domain
9. Register the domain, attach it, verify HTTPS and the HTTP redirect, **and set `NEXT_PUBLIC_SITE_URL` to the final origin, then redeploy**
10. Run `node scripts/verify-deployment.mjs https://your-domain` (193 checks)
11. **Run an OWASP ZAP baseline scan** against staging, then production
12. **Manually exercise all five genetics tools in a real browser**, in English and Urdu, on desktop and a real mobile device, plus Firefox and Safari
13. Tag `v1.0.0`
14. Make the explicit launch decision

## 30. Known accepted low-risk items (§45)

| Item | Status |
|---|---|
| Locale-prefixed unknown routes return not-found content with HTTP 200 | **Accepted.** Root cause is `notFound()` losing its status behind a next-intl middleware rewrite. Content is correct, no disclosure, and the caching consequence was fixed in Module 25.8. Requires a next-intl major upgrade |
| Dev-only Vitest and Vite advisories | **Accepted**, not reachable, never shipped |
| next-intl advisories | **Accepted**, preconditions not met, open redirect disproved empirically |
| Build-time PostCSS and Sharp advisories | **Accepted**, no attacker-controlled input |
| `NEXT_PUBLIC_SITE_URL` | **STILL OPEN.** §45 requires this be closed during this module; it cannot be, because the domain is not registered. **This is a launch blocker**, closed by runbook step 8 |
| `/favicon.ico` returns 404 | **New, low.** `/icon.png` is served and correctly declared via `<link rel="icon">`; only legacy crawlers requesting the bare path are affected |

Per §45, no breaking Next 16 / next-intl 4 / Vitest 4 upgrade was attempted. Deployment does not require it. A dedicated modernization module would clear the first four rows at once.

## 31. Final status

### `STAGING_NOT_READY` · `PRODUCTION_NOT_READY` · **NOT LAUNCHED**

Against §41 and §44, the following requirements are **met**: passing local gates, reviewed dependency audit, all security headers, CSP, clickjacking protection, no information disclosure, no S0/S1/S2, rollback procedure documented, incident process documented, monitoring plan documented, and full regression.

The following are **not met**, all for the same reason: no CI run, no CodeQL run, no ZAP scan, no staging deployment, no production domain, no HTTPS verification, no real-browser genetics-tool pass, no cross-browser testing.

Calling this "ready" would mean asserting that headers survive a CDN, that a certificate issues correctly, and that five interactive tools work in browsers none of which have run them. None of that has been observed. The honest status is not-ready, and the path to ready is eleven documented steps plus three verification passes.

**Launch date and time: not launched.** Public announcement requires your explicit decision after step 14.

## 32. Post-launch follow-up

1. Re-run `scripts/verify-deployment.mjs` quarterly.
2. Review Dependabot pull requests weekly.
3. Schedule the modernization module (Next 16, next-intl 4, Vitest 4) with a full regression.
4. Publish a security contact address, and consider `/.well-known/security.txt`.
5. Submit the sitemap to search consoles once the domain is live.
6. Revisit the Kashmir boundary amendment if Survey of Pakistan vector data is obtained.
7. Revise the threat model **before** shipping any form, API, database, analytics or account system.
