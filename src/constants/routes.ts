/**
 * Centralized route definitions (locale-agnostic paths).
 * Locale prefixes are applied by next-intl navigation helpers.
 */
export const ROUTES = {
  home: '/',
  about: '/about',
  diseases: '/diseases',
  disease: (slug: string) => `/diseases/${slug}`,
  genetics: '/genetics',
  /** Pakistan Genetic Disorder Evidence Map (Module 11) lives under Genetics. */
  map: '/genetics/pakistan-map',
  /**
   * Genetics tool routes (unchanged URLs). Named here so the canonical
   * navigation config and its route-integrity tests reference one source
   * instead of hardcoding paths (Module 25.6 §4/§15).
   */
  inheritanceCalculator: '/genetics/inheritance-calculator',
  dnaExplorer: '/genetics/dna-explorer',
  punnettSquare: '/genetics/punnett-square',
  relationshipRisk: '/genetics/relationship-risk',
  /** Early Signs & Care Guidance (Module 13). */
  earlySigns: '/early-signs',
  /** Care & Support Resources (Module 14). */
  careSupport: '/care-support',
  /** Genetic Testing & Counselling Education (Module 15). */
  geneticTesting: '/genetic-testing',
  survey: '/survey',
  /** Community Impact & Fieldwork — "Shared Blood in the Community" (Module 17). */
  community: '/community',
  /** Research Findings & Reports — "Research & Findings" (Module 18). */
  research: '/research',
  /** Policy & Advocacy — evidence-to-advocacy priorities (Module 19). */
  policy: '/policy',
  /** Privacy, Ethics & Research Governance public pages (Module 20). */
  privacy: '/privacy',
  researchEthics: '/ethics',
  researchGovernance: '/governance',
  resources: '/resources',
  resource: (slug: string) => `/resources/${slug}`,
  downloads: '/downloads',
  hospitals: '/hospitals',
  contact: '/contact',
  search: '/search',
} as const;

export type RouteKey = keyof typeof ROUTES;
