/**
 * Module 25 — development-only QA matrix, defect register & release-readiness
 * decision (§20/§102/§113).
 *
 * DEV / BUILD-TIME ONLY. Not imported by any route/component (never in the
 * client bundle). Records what was tested, with which tooling, what was found,
 * and the final release decision. Honesty rule (§93/§128): only tooling actually
 * available was used — headless Chromium (the preview), SSR/curl, and static
 * analysis. WebKit/Gecko automation, true browser zoom, and physical devices
 * were NOT available and are recorded as limitations, never claimed as tested.
 */

export type Severity = 'S0' | 'S1' | 'S2' | 'S3' | 'S4';
export type CaseStatus = 'PASS' | 'FAIL' | 'NOT_TESTABLE_HERE';

export interface QaCase {
  id: string;
  area: string;
  detail: string;
  tooling: string;
  status: CaseStatus;
}

export interface DefectRecord {
  id: string;
  title: string;
  severity: Severity;
  area: string;
  reproduction: string;
  rootCause: string;
  fix: string;
  regressionTest: string;
  status: 'OPEN' | 'FIXED' | 'VERIFIED' | 'DEFERRED';
}

/** Representative QA matrix (the full public surface was swept, §20/§21). */
export const QA_MATRIX: readonly QaCase[] = [
  { id: 'QA-BASE', area: 'Baseline', detail: 'tsc clean · ESLint 0/0 · 456 tests/47 files · EN 1480 = UR 1480 · 28 namespaces · 91/91 pages · 102 kB shared · recharts/framer-motion absent — reproduced with no drift', tooling: 'tsc/eslint/vitest/next build', status: 'PASS' },
  { id: 'QA-ROUTES', area: 'Public routes + nav + locale', detail: '28 production routes × EN/UR = 56 combos: HTTP 200, no runtime error, /ur dir=rtl, has h1, no Hospitals CTA, no family-tree reference', tooling: 'SSR sweep (urllib)', status: 'PASS' },
  { id: 'QA-HOME', area: 'Homepage', detail: 'Hero → /diseases + /genetics; MapPreview → /genetics/pakistan-map; Community pillar → /community (repointed in M24); no Hospitals/Family Tree CTA; CSS Reveal content visible', tooling: 'SSR + browser', status: 'PASS' },
  { id: 'QA-PLACEHOLDER', area: 'Placeholders', detail: 'About real static; Contact real email; Hospitals/Downloads explicit coming-soon (not in nav); Search honest coming-soon; Family Tree intentional 404', tooling: 'SSR', status: 'PASS' },
  { id: 'QA-RESP-320', area: 'Responsive 320px', detail: '0 horizontal overflow on homepage, disease library, calculator, Pakistan map, Punnett (grid open); Punnett table 247px fits 320px viewport', tooling: 'headless Chromium @320×568', status: 'PASS' },
  { id: 'QA-A11Y-PUNNETT', area: 'Punnett a11y', detail: 'Real <table>, scope=col/rowgroup parent headers, text per cell, sr-only "Possible combinations: AA Unaffected, Aa Carrier…" equivalent (not colour-only)', tooling: 'DOM inspection', status: 'PASS' },
  { id: 'QA-A11Y-DNA', area: 'DNA a11y', detail: 'fieldset/legend, aria-current="step", aria-live step content, decorative SVG aria-hidden, Previous/Next/Start-over buttons, HBB verbatim', tooling: 'DOM inspection', status: 'PASS' },
  { id: 'QA-CONSOLE', area: 'Console / hydration', detail: 'No console errors, warnings, hydration mismatches, or missing-key warnings across homepage/diseases/calculator/map/punnett/dna', tooling: 'headless Chromium console', status: 'PASS' },
  { id: 'QA-CTX', area: 'Disease context ?disease=', detail: 'beta-thalassemia → HBB stepper preselected; cystic-fibrosis → calculator CF checked; EDS → subtype gate (hypermobile NOT preselected); unknown/subtype/array/prohibited fields ignored safely', tooling: 'SSR curl + connections.test', status: 'PASS' },
  { id: 'QA-HEDS', area: 'hEDS LIMITED_MECHANISM', detail: 'Hypermobile EDS resolves LIMITED_MECHANISM — no gene/mutation, no Punnett grid, no universal EDS claim; EDS/LSD subtype gates preserved', tooling: 'dna resolver + module22 boundary tests', status: 'PASS' },
  { id: 'QA-ISOLATION', area: 'Cross-tool state isolation', detail: 'No parent/genotype/probability/relationship transfer between tools; connections carry no genetics state; no localStorage/global state', tooling: 'connections.test + context parser tests', status: 'PASS' },
  { id: 'QA-GOV', area: 'Module 20 governance', detail: 'All public strings (connections, disease links, About, Contact, ComingSoon) pass checkPublicClaim; no compatibility/marriage-safety/eugenics wording', tooling: 'integration.test (checkPublicClaim)', status: 'PASS' },
  { id: 'QA-AUDIO', area: 'Disease audio swapping', detail: 'Production STORY_RECORDS empty → all 4 disease pages render the approved empty state (no stories section) without crash; swap architecture (diseaseId→audioRecordId→resolver) intact; no autoplay/preload', tooling: 'SSR + stories tests', status: 'PASS' },
  { id: 'QA-CLEANINSTALL', area: 'Clean install (§98)', detail: 'rm -rf node_modules → npm ci → tsc → eslint → vitest → next build all PASS; lockfile resolves; recharts/framer-motion absent; no local-only dependency', tooling: 'npm ci + full pipeline', status: 'PASS' },
  { id: 'QA-SECRETS', area: 'Environment / secrets', detail: 'Only process.env uses: NODE_ENV (preview→404) + NEXT_PUBLIC_SITE_URL (public, localhost fallback). No runtime secret required → NO_REQUIRED_RUNTIME_SECRET. .env.example is a safe template', tooling: 'grep + manual audit', status: 'PASS' },
  { id: 'QA-XBROWSER', area: 'Cross-browser WebKit/Gecko', detail: 'NOT available in this environment — only headless Chromium. Code is engine-agnostic (standard HTML/CSS/React, pure-CSS Reveal, native audio, no framer-motion). Manual WebKit/Gecko verification handed to Module 26 pre-launch', tooling: '(none available)', status: 'NOT_TESTABLE_HERE' },
  { id: 'QA-ZOOM', area: '200% zoom / physical devices', detail: 'Emulated viewports down to 320px verified (relative units, wrapping, no overflow). True browser 200% zoom and physical devices not available here; handed to Module 26 pre-launch manual QA', tooling: 'viewport emulation only', status: 'NOT_TESTABLE_HERE' },
];

/** No reproducible defects were found. */
export const DEFECT_REGISTER: readonly DefectRecord[] = [];

/**
 * Release-readiness decision (§113–§117).
 * No open S0/S1; no S2 (none found); full suite, typecheck, ESLint, localization
 * parity, production build, and clean install all pass. The only residual items
 * are documented environment/tooling limitations (cross-engine + true-zoom manual
 * verification), handed to Module 26 — not open defects.
 */
export const RELEASE_READINESS = 'READY_FOR_MODULE_26' as const;
