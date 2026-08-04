# Module 25 — Full QA, Accessibility Verification & Release-Readiness · Report

**Final release status: `READY_FOR_MODULE_26`.** No open S0/S1; no S2 (none found); zero reproducible defects. Full suite, typecheck, ESLint, localization parity, production build, and clean install all pass. Two residual items are **environment/tooling limitations** (cross-engine + true-zoom manual verification), not defects, and are handed to Module 26. Module 25 does not deploy.

> Honesty note (§93/§128): only tooling actually available was used — headless Chromium (the preview), server-side rendering / curl, and static analysis. WebKit/Gecko browser automation, true browser zoom, and physical devices were **not available**; those checks are recorded as limitations and handed off, never claimed as performed.

## Baseline (§4)
Reproduced exactly, **no drift**: tsc clean · ESLint 0/0 · **456 tests / 47 files** · EN 1480 = UR 1480 · 28 namespaces · 91/91 static pages · 102 kB shared First Load JS · recharts absent · framer-motion absent.

## Scope & QA Matrix
Dev-only QA matrix + defect register: `src/audit/qa.ts` (`QA_MATRIX`, `DEFECT_REGISTER`, `RELEASE_READINESS`). Full public surface swept (not only Module 24 routes).

## Routes, Locales, Viewports, Engines actually used
- **Routes/locales:** 28 production routes × EN + UR = **56 combos**, SSR-swept.
- **Viewports:** headless Chromium at 320×568 (mandatory), plus 375/mobile presets; emulation only.
- **Engines:** headless Chromium only (see limitations).

## Physical devices / automated environments used; Limitations
- Used: headless Chromium (preview), Node SSR/curl, tsc/eslint/vitest/next build/npm ci.
- **Not available (documented, not claimed):** WebKit (Safari) and Gecko (Firefox) automation; true browser 200% zoom; physical devices; literal tab-by-tab keyboard traversal (semantic structure was inspected instead).

## Homepage / Desktop / Mobile / Footer QA (§7)
All PASS. Hero → `/diseases` + `/genetics`; MapPreview → `/genetics/pakistan-map`; Community pillar → `/community`; no Hospitals or Family Tree CTA (SSR-verified); footer governance links active; Contact active; **Hospitals absent from primary + footer nav**. Mobile nav is driven by the same `PRIMARY_NAV` config (Hospitals removed on both). Search entry → honest coming-soon.

## About / Hospitals / Contact / Downloads / Search (§8)
- **About** — ACTIVE_STATIC, real project info (mission/approach/"what it is not"/not-medical-advice); no invented partnerships or medical-validation claims.
- **Hospitals** — INTENTIONAL_PLACEHOLDER; route works, explicit "Coming soon"; no finder/fabricated data; absent from nav.
- **Contact** — ACTIVE_STATIC; uses only the existing public project email; no invented phone/address/backend.
- **Downloads** — INTENTIONAL_PLACEHOLDER; no internal PRDs/audits/reports exposed.
- **Search** — honest coming-soon; no fake results; no search dependency.

## Family Tree retirement (§8)
`family-tree` searched across source: no public discovery link or cross-navigation target. `/[locale]/genetics/family-tree-explorer` → intentional 404 (SSR-verified). Decision preserved (`NO_REDIRECT_REQUIRED`).

## Responsive: 320px / tablet / desktop / zoom / text scaling (§9)
**320px (mandatory): PASS** — 0 horizontal overflow on homepage, disease library, calculator, Pakistan map, and Punnett (grid rendered). Punnett table = 247px (fits 320px viewport), retains tabular meaning. Design uses Tailwind responsive grids + `max-w` + relative units throughout. True 200% browser zoom / larger-text-size and additional physical widths → Module 26 manual QA (limitation).

## Keyboard / Focus / Skip-link / Headings / Forms / Live regions (§10)
Structural verification (semantic elements, not a literal manual traversal): every page has an `<h1>`; tools use native radios in `fieldset`/`legend`; controls are real `<button>`/`<a>` (keyboard-operable); `focus-visible` rings present; `aria-live` on DNA step content + calculator results; `aria-current="step"` on the DNA stepper. A literal tab-by-tab keyboard walkthrough is a Module 26 manual item.

## Punnett / DNA / Relationship / Audio accessibility (§11)
- **Punnett:** real `<table>` with `scope` parent headers, text per cell, screen-reader equivalent ("Possible combinations: AA Unaffected, Aa Carrier…"), non-visual outcome summary — not colour-only.
- **DNA:** radios + fieldset/legend, step buttons with `aria-current`, previous/next/restart, `aria-live`, decorative SVG `aria-hidden`; HBB verbatim; hEDS limitation reachable.
- **Relationship:** genotype-separation callout + pedigree text equivalent + hypothetical scenarios preserved (regression-tested).
- **Audio:** production stories are empty → disease pages render the approved empty state (no player), so there is no autoplay and nothing to mis-map; the swap architecture and native-audio approach are intact.

## Urdu / RTL / mixed-script / localization (§12)
All 28 `/ur` routes render `dir="rtl"` (SSR-swept). Disease genetics links resolve to `/ur/genetics/...` with **no hardcoded `/en/`**. EN 1480 = UR 1480, 28 namespaces (no orphan/rendered-key/empty-string issues). Gene symbols (HBB/CFTR/HEXA/GBA/COL5A1/COL3A1/TNXB) remain verbatim. Deeper per-width Urdu overflow inspection at 320/375/768 is a Module 26 manual item beyond the structural 320px overflow pass.

## Calculator / stale state / context (§13)
Canonical engine expectations covered by the recessive/dominant/engine/validation tests. `?disease=` provides editable preselection; disease/subtype/parent changes clear results (existing `clearResult` logic); unknown/subtype/array/prohibited context fields ignored (parser tests). No stale or cross-disease result.

## DNA / context / hEDS (§14)
beta-thalassemia→HBB, cystic-fibrosis→CFTR (SSR-verified stepper); LSD SUBTYPE_REQUIRED (Tay-Sachs→HEXA, Gaucher→GBA); EDS SUBTYPE_REQUIRED (Classical→COL5A1, Vascular→COL3A1, Classical-like→TNXB); **hEDS→LIMITED_MECHANISM, no gene/grid** (SSR + resolver + boundary tests). Top-level disease context never preselects a subtype.

## Punnett / Relationship / Evidence Map / cross-navigation / state isolation (§15)
Punnett grid frequency == canonical outcome distribution (scenario tests); renderer computes no probability. Relationship keeps "relationship alone does not tell us genotype"; no compatibility/marriage-safety/individual-risk score. Evidence Map frames documented evidence, not personal/geographic risk. Every `EducationalNextSteps` link targets an active tool/public surface, never Family Tree, and transfers no genetics result (connection tests). Cross-tool state isolation verified (no parent/genotype/probability/relationship transfer).

## Disease pages / identity / audio / references / public data (§16)
All four disease pages render (EN/UR titles, narrative, references, genetics links). Canonical identity resolves for all four; EDS = SUBTYPE_DEPENDENT; LSD = disease group with no universal mechanism (identity + cross-feature integrity tests). Disease/DNA/calculator/evidence IDs resolve canonically; connection IDs resolve to active tools.

## Network / JS dependency / unknown parameter / unknown route (§17)
Server-rendered static content (homepage text, disease narrative, About, Contact, coming-soon) is present in SSR HTML without client JS. CSS Reveal content is visible by default (pure CSS, never JS-intersection-hidden — verified in Module 23). `?disease=` unknown/empty/subtype/array values ignored safely; unknown routes and Family Tree → safe 404 with no stack trace.

## Chromium / WebKit / Gecko / CSS Reveal / audio (§18)
- **Chromium (headless):** all interactive checks above PASS; no console errors/warnings/hydration mismatches.
- **CSS Reveal:** pure-CSS keyframe gated behind `motion-safe`; content visible by default; no framer-motion.
- **WebKit / Gecko:** not available — **documented limitation**, handed to Module 26. Risk is low (engine-agnostic standard HTML/CSS/React, native audio controls).

## Production build / clean install / environment / console (§18)
- **Build:** 91/91 static pages; 102 kB shared First Load JS (unchanged).
- **Clean install (§98):** `rm -rf node_modules` → `npm ci` → tsc → ESLint → vitest → next build **all PASS**. Lockfile resolves; recharts/framer-motion absent; no local-only dependency; no required untracked generated file.
- **Environment:** `NO_REQUIRED_RUNTIME_SECRET` — only `NEXT_PUBLIC_SITE_URL` (public, has fallback) + `NODE_ENV`. `.env.example` is a safe template.
- **Console:** clean (no errors, unhandled rejections, hydration or missing-key warnings).

## Defects by severity / fixed / verified / deferred / escalations (§19)
**Zero reproducible defects.** No S0/S1/S2/S3/S4. No fixes required, so no new regression tests were added (the 456-test suite is the regression baseline). No `ARCHITECTURE_ESCALATION_REQUIRED`.

## Regression status (§20) — Modules 20/22/23/24
All pass within the 456-test suite: canonical inheritance/recessive/dominant, calculator, Punnett scenario+presentation, DNA resolver/reference, Relationship, Evidence Map, connections, context parser, canonical disease identity + cross-feature integrity, Module 20 governance (checkPublicClaim on all public strings), Module 22 boundaries (hEDS/subtype/Punnett-canonical/relationship-genotype), Module 23 (Family Tree absent, 5 active tools, deps absent), Module 24 (nav/connections/context). recharts/framer-motion: absent (searched).

## Final counts
Tests **456 / 47 files** · TypeScript clean · ESLint 0/0 · EN 1480 = UR 1480 (28 namespaces) · **91/91** static pages · **102 kB** shared First Load JS. No page-count or JS change from the Module 24 baseline.

## Release-Readiness Decision (§21)
**`READY_FOR_MODULE_26`.** No open S0/S1; no unjustified S2; full suite / typecheck / ESLint / localization / build / clean-install pass.

## Module 26 Handoff (§23)
- Tests 456/47; EN 1480 = UR 1480; 28 namespaces; 91 static pages; 102 kB shared JS.
- Build: `npm run build` (next build). Package manager: **npm** (lockfile committed). Clean install: **PASS**.
- Node: use the project's configured/CI Node (no version pin file present — recommend pinning in Module 26).
- Secrets: **NO_REQUIRED_RUNTIME_SECRET** (`NEXT_PUBLIC_SITE_URL` optional with fallback).
- Public contact: `sharedblood.org@gmail.com` (mailto only).
- Audio/public data: production STORY_RECORDS + Survey/Community/Research/Policy datasets are intentionally empty (approved empty states).
- Intentional 404: `/genetics/family-tree-explorer` (no redirect).
- Placeholder routes: `/hospitals`, `/downloads` = coming-soon (not in nav); `/search` = honest coming-soon.
- Query policy: `?disease=<canonical-id>` allowlist only; unknown ignored safely. No other cross-tool params.
- Redirects: `/map` → `/genetics/pakistan-map` (existing legacy redirect).
- Sitemap/canonical: keep the intentional 404 out of the sitemap; canonical URLs are locale-prefixed.
- Deferred defects: none.

## Deployment Risks for Module 26
1. **Cross-browser (WebKit/Gecko) not verified here** — run a manual Safari/Firefox pass pre-launch (low risk: engine-agnostic code).
2. **True 200% zoom / physical-device pass** not performed here — quick manual check pre-launch (structural 320px overflow already clean).
3. Clean-install baseline (no recharts/framer-motion; npm lockfile) must hold on the deploy runner.
4. Pin a Node version for the deploy environment.
5. CSS `reveal` keyframe must be present in the production CSS build (verified locally).

## Post-deployment Monitoring (approved, §124)
404 rate (watch the intentional Family Tree 404), client runtime errors, failed audio/static-asset loads, build/deploy errors, Core Web Vitals, route availability. **Not** recommended: per-disease profiling, genetics journey tracking, calculator/relationship-result analytics, audio-listening profiles.
