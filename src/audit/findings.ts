import type {
  RedundancyRecord,
  MissingFeatureRecord,
  ModuleComparison,
  ModuleCandidate,
  HumanDecision,
  ScopeLockRecord,
} from './types';

/**
 * Redundancy, missing-feature, module-comparison, Module 22–25 candidate,
 * human-decision, and scope-lock registries (spec §30, §43–§55).
 * AUDIT-ONLY. Nothing here is approved, merged, or removed by Module 21.
 */

// ── Redundancy registry (spec §30–§34) ──────────────────────────────────────
export const REDUNDANCY_RECORDS: readonly RedundancyRecord[] = [
  {
    id: 'red-map-surfaces',
    featureA: '/map',
    featureB: '/genetics/pakistan-map',
    overlapType: 'ROUTE_DUPLICATION',
    overlapDescription:
      'Two paths could address "the map". /map is a locale-aware redirect to /genetics/pakistan-map, which is the single real surface.',
    recommendedAction: 'KEEP_BOTH',
    reasoning:
      'Not true redundancy — /map is a redirect that preserves old links, not a second implementation. No duplicate dataset or UI. Keep both.',
  },
  {
    id: 'red-scaffold-vs-real',
    featureA: 'Empty scaffold feature dirs (calculators, downloads, hospital, map, resources)',
    featureB: 'Real implementations (genetics/calculator, genetics/pakistan-map, learning, …)',
    overlapType: 'SYSTEM_DUPLICATION',
    overlapDescription:
      'Five empty scaffold feature directories name systems that were actually built elsewhere (or not at all).',
    recommendedAction: 'REMOVE_A',
    reasoning:
      'The scaffolds are superseded dead shells. Remove the empty scaffolds; keep the real features. Execute in Module 23 after approval.',
  },
  {
    id: 'red-disease-name-data',
    featureA: 'src/features/diseases/data/diseases.ts (index names/inheritance)',
    featureB: 'src/features/diseases/content/diseases/*.ts (content names/inheritance)',
    overlapType: 'DATA_DUPLICATION',
    overlapDescription:
      'Disease display name, Urdu name and inheritance pattern are expressed in both the library index and the per-disease content files.',
    recommendedAction: 'MODIFY_BOTH',
    reasoning:
      'A legitimate index-vs-content split, but the shared fields (name/urduName/inheritance) should resolve from one canonical source to prevent drift. Recommend a canonical source; do not migrate in Module 21 (spec §34).',
  },
  {
    id: 'red-family-tree-vs-relationship',
    featureA: 'Family Tree Explorer (coming-soon placeholder)',
    featureB: 'Relationship & Recessive Risk Explorer (+ pedigree)',
    overlapType: 'INTERACTION_DUPLICATION',
    overlapDescription:
      'The unbuilt Family Tree Explorer and the built Relationship Explorer both center on pedigree/family-diagram interaction.',
    recommendedAction: 'MODIFY_BOTH',
    reasoning:
      'Potential future overlap. Decide whether Family Tree is a distinct tool or should be retired before it is built (Module 22/23 + human decision).',
  },
  {
    id: 'red-punnett-vs-calculator',
    featureA: 'Punnett Square Visualizer (coming-soon placeholder)',
    featureB: 'Inheritance Probability Calculator',
    overlapType: 'INTERACTION_DUPLICATION',
    overlapDescription:
      'A Punnett square and the inheritance calculator both express 1:2:1 recessive combinations.',
    recommendedAction: 'MODIFY_BOTH',
    reasoning:
      'The calculator already visualizes recessive outcomes. Confirm the Punnett square adds distinct educational value before building (Module 22 + human decision).',
  },
];

// ── Missing feature registry (spec §45) ─────────────────────────────────────
export const MISSING_FEATURE_RECORDS: readonly MissingFeatureRecord[] = [
  {
    id: 'miss-dna-tool',
    featureName: 'Disease-linked DNA interactive educational tool',
    sourceModule: 'Module 21 §27/§60 (expected Shared Blood feature) → Module 22',
    expectedPurpose:
      'Select disease → gene/DNA context → genetic change → biological instruction/function → disease manifestation, disease-specifically.',
    evidenceOfSpecification:
      'Module 21 §27/§60 names it an expected feature and locks it to Module 22; only a coming-soon placeholder tool entry exists.',
    implementationStatus: 'NOT_IMPLEMENTED',
    recommendedModule: 'MODULE_22',
    priority: 'HIGH',
  },
  {
    id: 'miss-about',
    featureName: 'About page content',
    sourceModule: 'Module 01/03 (nav destination)',
    expectedPurpose: 'Introduce the project/mission; a primary-nav destination.',
    evidenceOfSpecification: 'Present in PRIMARY_NAV; route renders PlaceholderPage.',
    implementationStatus: 'NOT_IMPLEMENTED',
    recommendedModule: 'MODULE_24',
    priority: 'HIGH',
  },
  {
    id: 'miss-hospitals',
    featureName: 'Hospitals / clinics directory',
    sourceModule: 'Early scaffold (features/hospital) / nav destination',
    expectedPurpose: 'Directory of services for testing and care.',
    evidenceOfSpecification: 'Present in PRIMARY_NAV + FOOTER_NAV; route renders PlaceholderPage; empty feature scaffold.',
    implementationStatus: 'NOT_IMPLEMENTED',
    recommendedModule: 'MODULE_24',
    priority: 'HIGH',
  },
  {
    id: 'miss-contact',
    featureName: 'Contact page',
    sourceModule: 'Module 01/03 (footer destination)',
    expectedPurpose: 'How to reach the project (governance-compliant, no sensitive-data collection).',
    evidenceOfSpecification: 'Present in FOOTER_NAV; route renders PlaceholderPage.',
    implementationStatus: 'NOT_IMPLEMENTED',
    recommendedModule: 'MODULE_24',
    priority: 'MEDIUM',
  },
  {
    id: 'miss-downloads',
    featureName: 'Downloads centre',
    sourceModule: 'Early scaffold (features/downloads)',
    expectedPurpose: 'Approved public downloadable resources/reports.',
    evidenceOfSpecification: 'ROUTES.downloads + NAV_IDS declare it; route renders PlaceholderPage; unsurfaced in nav.',
    implementationStatus: 'NOT_IMPLEMENTED',
    recommendedModule: 'MODULE_24',
    priority: 'LOW',
  },
  {
    id: 'miss-search',
    featureName: 'Global search (indexing + real results)',
    sourceModule: 'Module 03 (explicitly deferred)',
    expectedPurpose: 'Find content across the site.',
    evidenceOfSpecification: 'Search route exists and echoes the query with a "coming soon" notice; indexing was excluded from Module 03.',
    implementationStatus: 'PARTIALLY_IMPLEMENTED',
    recommendedModule: 'MODULE_24',
    priority: 'MEDIUM',
  },
];

// ── Module 01–20 comparison (spec §43–§44; no fabricated percentages, §44) ──
export const MODULE_COMPARISONS: readonly ModuleComparison[] = [
  {
    moduleId: '01', moduleName: 'Foundation / shell / i18n scaffold',
    implementedFeatures: ['App shell', 'locale routing', 'PlaceholderPage', 'brand'],
    missingFeatures: [], partialFeatures: [],
    brokenFeatures: [],
    redundantFeatures: ['5 empty scaffold feature dirs'],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '02', moduleName: 'Homepage',
    implementedFeatures: ['8 preview sections', 'hero', 'Reveal motion'],
    missingFeatures: [],
    partialFeatures: ['entry points for Research/Policy/Testing/Early-Signs/Care'],
    brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'MOSTLY_COMPLETE',
  },
  {
    moduleId: '03', moduleName: 'Navigation & search',
    implementedFeatures: ['config-driven nav', 'header/mobile/footer/breadcrumbs'],
    missingFeatures: ['real search'],
    partialFeatures: ['search route (coming-soon)'],
    brokenFeatures: [],
    redundantFeatures: ['nav links to placeholder pages (About/Hospitals/Contact)'],
    conflicts: [], completionEstimate: 'MOSTLY_COMPLETE',
  },
  {
    moduleId: '04', moduleName: 'Disease Library',
    implementedFeatures: ['index', 'cards', 'filter', 'search-within', '4 disorders'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [],
    redundantFeatures: ['name/inheritance data duplicated with content files'],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '05', moduleName: 'Shared disease-page rendering',
    implementedFeatures: ['data-swapped DiseasePage', 'section components', 'metadata-only fallback'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '06', moduleName: 'Disease content',
    implementedFeatures: ['4 authored content files'],
    missingFeatures: [], partialFeatures: ['field-by-field completeness to confirm in QA'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '08', moduleName: 'Genetics Explorer',
    implementedFeatures: ['tool registry', 'shared tool page', '3 active tools'],
    missingFeatures: ['DNA interactive tool'],
    partialFeatures: ['3 coming-soon placeholders'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'MOSTLY_COMPLETE',
  },
  {
    moduleId: '09', moduleName: 'Inheritance Calculator',
    implementedFeatures: ['multi-strategy calculator', 'subtype-aware', 'EDS unsupported handling', 'code-split route'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '10', moduleName: 'Relationship & Recessive Risk Explorer',
    implementedFeatures: ['explorer', 'pedigree', 'neutral framing'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '11', moduleName: 'Pakistan Evidence Map',
    implementedFeatures: ['evidence map explorer', 'per-disease evidence datasets', 'no-hotspot framing', 'legacy redirect'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '12', moduleName: 'Stories & Perspectives audio',
    implementedFeatures: ['player/transcript/consent/identity UI', 'server-only resolver', 'disease-linked audio', 'empty state'],
    missingFeatures: [], partialFeatures: ['production stories intentionally empty (offline curation)'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '13', moduleName: 'Early Signs & Care Guidance',
    implementedFeatures: ['explorer', 'datasets', 'filter/validate/tests'],
    missingFeatures: [], partialFeatures: ['no homepage entry point'], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '14', moduleName: 'Care & Support Resources',
    implementedFeatures: ['explorer', 'per-disease care records', 'support items'],
    missingFeatures: [], partialFeatures: ['no homepage entry point'], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '15', moduleName: 'Genetic Testing & Counselling',
    implementedFeatures: ['explorer', 'topics/results/counselling data', 'boundary tests'],
    missingFeatures: [], partialFeatures: ['no homepage entry point'], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '16', moduleName: 'Awareness Survey',
    implementedFeatures: ['survey system', 'aggregation', 'validation', 'dev preview'],
    missingFeatures: [], partialFeatures: ['production dataset empty (awaiting approved aggregates)'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '16b', moduleName: 'Parent Learning Centre & Resources',
    implementedFeatures: ['learning centre', 'resource template', 'resource data'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '17', moduleName: 'Community Impact & Fieldwork',
    implementedFeatures: ['public activity system', 'impact resolver', 'dev preview'],
    missingFeatures: [], partialFeatures: ['production dataset empty (awaiting approved data)'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '18', moduleName: 'Research & Findings',
    implementedFeatures: ['findings/reports system', 'boundary framing', 'statistic checks', 'passes public-claim review'],
    missingFeatures: [], partialFeatures: ['production dataset empty (awaiting approved findings)'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '19', moduleName: 'Policy & Advocacy',
    implementedFeatures: ['advocacy priorities', 'evidence links', 'inherited research boundaries', 'passes public-claim review'],
    missingFeatures: [], partialFeatures: ['production dataset empty (awaiting approved priorities)'],
    brokenFeatures: [], redundantFeatures: [], conflicts: [], completionEstimate: 'COMPLETE',
  },
  {
    moduleId: '20', moduleName: 'Privacy, Ethics & Research Governance',
    implementedFeatures: ['3 public pages', 'governance config', 'prohibited-claim + publication enforcement', 'least-privilege matrix', 'live footer links'],
    missingFeatures: [], partialFeatures: [], brokenFeatures: [], redundantFeatures: [],
    conflicts: [], completionEstimate: 'COMPLETE',
  },
];

// ── Module 22–25 candidate registries (spec §46–§49) ────────────────────────
export const MODULE_22_CANDIDATES: readonly ModuleCandidate[] = [
  {
    id: 'm22-dna-tool',
    featureName: 'Disease-linked DNA interactive educational tool',
    rationale: 'Expected feature; only a coming-soon placeholder exists. Locked to Module 22 (spec §60).',
    priority: 'HIGH',
    evidence: ['genetics/data/tools.ts (dna-explorer, coming-soon)', '/genetics/dna-explorer placeholder route'],
  },
  {
    id: 'm22-family-tree',
    featureName: 'Family Tree Explorer',
    rationale: 'Coming-soon placeholder; decide distinct-vs-redundant with the Relationship pedigree before building.',
    priority: 'MEDIUM',
    evidence: ['genetics/data/tools.ts (family-tree-explorer, coming-soon)'],
  },
  {
    id: 'm22-punnett',
    featureName: 'Punnett Square Visualizer',
    rationale: 'Coming-soon placeholder; confirm distinct educational value vs the inheritance calculator.',
    priority: 'LOW',
    evidence: ['genetics/data/tools.ts (punnett-square, coming-soon)'],
  },
];

export const MODULE_23_CANDIDATES: readonly ModuleCandidate[] = [
  {
    id: 'm23-scaffolds',
    featureName: 'Remove 5 empty scaffold feature directories',
    rationale: 'Dead, superseded shells imported by nothing.',
    priority: 'LOW',
    evidence: ['features/calculators', 'features/downloads', 'features/hospital', 'features/map', 'features/resources'],
  },
  {
    id: 'm23-recharts',
    featureName: 'Remove unused recharts dependency',
    rationale: 'Zero src imports; charts are CSS-based.',
    priority: 'LOW',
    evidence: ['package.json recharts', 'no src import (grep)'],
  },
  {
    id: 'm23-framer',
    featureName: 'Reconsider framer-motion (single trivial use)',
    rationale: 'Heavy client dep imported only by Reveal for a fade/slide; a CSS utility may replace it.',
    priority: 'LOW',
    evidence: ['components/motion/Reveal.tsx', 'app/[locale]/page.tsx'],
  },
  {
    id: 'm23-disease-data-canonical',
    featureName: 'Single canonical source for shared disease fields',
    rationale: 'name/urduName/inheritance duplicated across index and content files.',
    priority: 'MEDIUM',
    evidence: ['diseases/data/diseases.ts', 'diseases/content/diseases/*.ts'],
  },
];

export const MODULE_24_CANDIDATES: readonly ModuleCandidate[] = [
  {
    id: 'm24-nav-placeholders',
    featureName: 'Reconcile nav links that point to placeholder pages',
    rationale: 'About/Hospitals in primary nav and Contact in footer resolve to PlaceholderPage — implement or defer from nav.',
    priority: 'HIGH',
    evidence: ['constants/navigation.ts', 'app/[locale]/{about,hospitals,contact}/page.tsx'],
  },
  {
    id: 'm24-homepage-entrypoints',
    featureName: 'Add homepage entry points for major sections',
    rationale: 'Research/Policy/Genetic-Testing/Early-Signs/Care are unreachable from the homepage.',
    priority: 'MEDIUM',
    evidence: ['app/[locale]/page.tsx'],
  },
  {
    id: 'm24-connect-approved-data',
    featureName: 'Connect approved data to empty public sections',
    rationale: 'Survey/Community/Research/Policy render empty states in production pending approved datasets.',
    priority: 'MEDIUM',
    evidence: ['features/{survey,community,research,policy}/data/dataset.ts (= null)'],
  },
  {
    id: 'm24-downloads-navid',
    featureName: 'Reconcile the declared-but-unsurfaced "downloads" NavId',
    rationale: 'NAV_IDS + ROUTES declare downloads but no nav list renders it.',
    priority: 'LOW',
    evidence: ['constants/navigation.ts NAV_IDS', 'constants/routes.ts'],
  },
];

export const MODULE_25_CANDIDATES: readonly ModuleCandidate[] = [
  {
    id: 'm25-disease-field-completeness',
    featureName: 'Confirm per-field disease content completeness',
    rationale: 'Verify every approved disease has all required content fields (do not invent medical content).',
    priority: 'MEDIUM',
    evidence: ['diseases/content/diseases/*.ts'],
  },
  {
    id: 'm25-empty-state-consistency',
    featureName: 'Verify empty-state consistency across data sections',
    rationale: 'Survey/Community/Research/Policy/Stories empty states should read consistently in EN + Urdu.',
    priority: 'LOW',
    evidence: ['features/{survey,community,research,policy,stories}'],
  },
  {
    id: 'm25-search-state',
    featureName: 'Polish the honest search "coming soon" state',
    rationale: 'Ensure the deferred-search state is clear and localized until real search lands.',
    priority: 'LOW',
    evidence: ['app/[locale]/search/page.tsx'],
  },
];

// ── Human decisions required (spec §52) ─────────────────────────────────────
export const HUMAN_DECISIONS_REQUIRED: readonly HumanDecision[] = [
  {
    decisionId: 'HD-01',
    decisionTitle: 'Placeholder pages in navigation (About, Hospitals, Contact)',
    affectedFeatures: ['route-about', 'route-hospitals', 'route-contact', 'nav-system'],
    recommendedOption: 'Implement About + a governance-safe Contact for Version 1; decide Hospitals scope; defer any that will not ship out of nav.',
    alternativeOptions: [
      'Build all three now',
      'Remove all three from nav until authored',
      'Keep placeholders visible (not recommended — reads as unfinished)',
    ],
    impact: 'Determines whether primary/footer nav promises real destinations — central to "one coherent product" (spec §19).',
    reasonDecisionIsRequired: 'Content/scope choice; Module 21 must not build or remove (spec §4/§52).',
  },
  {
    decisionId: 'HD-02',
    decisionTitle: 'Disease-linked DNA interactive tool',
    affectedFeatures: ['dna-interactive-tool', 'tool-dna-explorer-placeholder'],
    recommendedOption: 'Approve for Module 22 as a HIGH-priority disease-specific interaction; repurpose the coming-soon dna-explorer entry.',
    alternativeOptions: ['Defer to a later version', 'Descope the DNA tool entirely'],
    impact: 'A named expected Shared Blood feature (spec §27); its absence is the single biggest interactive gap.',
    reasonDecisionIsRequired: 'Scope + prioritization; the build belongs to Module 22, not Module 21 (spec §60).',
  },
  {
    decisionId: 'HD-03',
    decisionTitle: 'Remove dead scaffolds and unused dependency',
    affectedFeatures: ['dead-scaffold-features', 'dep-recharts'],
    recommendedOption: 'Approve removal of the 5 empty scaffold dirs and recharts in Module 23.',
    alternativeOptions: ['Keep scaffolds as placeholders for future features', 'Keep recharts for planned charts'],
    impact: 'Removes dead code/weight; low user impact.',
    reasonDecisionIsRequired: 'Removal requires approval; Module 21 must not delete (spec §9/§35).',
  },
  {
    decisionId: 'HD-04',
    decisionTitle: 'Coming-soon tool placeholders (Family Tree, Punnett Square)',
    affectedFeatures: ['tool-family-tree-explorer', 'tool-punnett-square'],
    recommendedOption: 'Decide per tool: build in Module 22 only if it adds educational value distinct from Relationship Explorer / Inheritance Calculator; otherwise retire the placeholder in Module 23.',
    alternativeOptions: ['Build both', 'Retire both'],
    impact: 'Avoids interaction redundancy and unfinished-looking "coming soon" entries.',
    reasonDecisionIsRequired: 'Redundancy judgment + scope; not a Module 21 action.',
  },
  {
    decisionId: 'HD-05',
    decisionTitle: 'Empty public sections while unpopulated (Survey, Community, Research, Policy)',
    affectedFeatures: ['survey', 'community', 'research', 'policy'],
    recommendedOption: 'Keep the sections built and in nav; connect approved data when it exists (empty states are honest and governance-safe).',
    alternativeOptions: ['Move empty sections deeper until data exists', 'Hide until populated'],
    impact: 'Affects how "finished" the site feels in production before real data lands.',
    reasonDecisionIsRequired: 'Editorial/governance decision about publishing approved data (Module 20 gates + Module 24 wiring).',
  },
  {
    decisionId: 'HD-06',
    decisionTitle: 'Homepage entry points for major sections',
    affectedFeatures: ['route-home'],
    recommendedOption: 'Add homepage entry points for Research/Policy/Genetic-Testing/Early-Signs/Care in Module 24 (no homepage restructure in Module 21, spec §21).',
    alternativeOptions: ['Leave homepage as-is', 'Full homepage redesign (later)'],
    impact: 'Improves discoverability and product coherence.',
    reasonDecisionIsRequired: 'Homepage restructuring is out of Module 21 scope (spec §21).',
  },
];

// ── Scope lock (spec §53–§55) — UNAPPROVED SHELL, reflects no decisions yet ──
export const SCOPE_LOCK: ScopeLockRecord = {
  version: null,
  createdAt: null,
  approvedFeatures: [],
  approvedModifications: [],
  approvedMerges: [],
  approvedRemovals: [],
  approvedMissingFeatureImplementations: [],
  deferredFeatures: [],
  rejectedFeatures: [],
  notes:
    'NOT YET LOCKED. Module 21 must not fabricate approvals (spec §55). This record stays empty until a human reviews the audit and records explicit scope decisions. Required flow: Audit → Classification → Recommendation → Human Review → Scope Decision → Scope Lock → Module 22/23 execution.',
};
