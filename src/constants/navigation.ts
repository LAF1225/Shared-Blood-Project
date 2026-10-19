import { ROUTES } from './routes';

/**
 * Navigation identifiers and their target routes (Module 03 — Navigation System).
 * Labels are resolved via the `Nav` translation namespace at render time so the
 * same config drives the header, mobile menu, footer, and breadcrumbs.
 *
 * Adding a destination = add one entry here. No component restructuring is
 * required when future modules introduce new sections (spec §19).
 */
export const NAV_IDS = [
  'home',
  'diseases',
  'early-signs',
  'care-support',
  'genetics',
  'genetic-testing',
  'inheritance-calculator',
  'dna-explorer',
  'punnett-square',
  'relationship-explorer',
  'map',
  'resources',
  'survey',
  'community',
  'research',
  'policy',
  'hospitals',
  'downloads',
  'about',
  'contact',
] as const;

export type NavId = (typeof NAV_IDS)[number];

export interface NavItem {
  id: NavId;
  href: string;
  /** i18n key (within the `Nav` namespace) resolved at render time. */
  labelKey: string;
}

/** Group identifiers for the six primary header entries (Module 25.6 §2). */
export const NAV_ENTRY_IDS = [
  'home',
  'learn',
  'genetics',
  'map',
  'resources',
  'about',
] as const;

export type NavEntryId = (typeof NAV_ENTRY_IDS)[number];

/**
 * A primary header entry. Either a direct destination (`href`) or a group that
 * opens a dropdown / accordion of `children`. Never both.
 */
export interface NavEntry {
  id: NavEntryId;
  /** i18n key (within the `Nav` namespace) for the entry label / group trigger. */
  labelKey: string;
  /** Direct destination (Home, Pakistan Map). */
  href?: string;
  /** Grouped destinations (Learn, Genetics, Resources, About). */
  children?: readonly NavItem[];
}

/**
 * CANONICAL PRIMARY NAVIGATION (Module 25.6 §2/§4).
 *
 * This is the single source of truth for the header: desktop dropdowns, the
 * mobile accordion, localized labels, and the route-integrity tests all derive
 * from it. Do not maintain a second desktop/mobile/locale structure.
 *
 * Exactly six entry points (§3, non-negotiable):
 *   Home | Learn | Genetics | Pakistan Map | Resources | About
 * Search and language switching are utility controls rendered separately.
 *
 * Grouping is a NAVIGATION concern only. Routes are unchanged (§14): Pakistan
 * Map still lives at /genetics/pakistan-map even though it is a top-level entry,
 * and no page was moved to match a menu label.
 */
export const PRIMARY_NAV: readonly NavEntry[] = [
  { id: 'home', labelKey: 'home', href: ROUTES.home },
  {
    id: 'learn',
    labelKey: 'groupLearn',
    children: [
      { id: 'diseases', href: ROUTES.diseases, labelKey: 'diseases' },
      { id: 'early-signs', href: ROUTES.earlySigns, labelKey: 'earlySigns' },
      { id: 'care-support', href: ROUTES.careSupport, labelKey: 'careSupport' },
      { id: 'genetic-testing', href: ROUTES.geneticTesting, labelKey: 'geneticTesting' },
    ],
  },
  {
    id: 'genetics',
    labelKey: 'groupGenetics',
    children: [
      { id: 'genetics', href: ROUTES.genetics, labelKey: 'genetics' },
      { id: 'inheritance-calculator', href: ROUTES.inheritanceCalculator, labelKey: 'inheritanceCalculator' },
      { id: 'dna-explorer', href: ROUTES.dnaExplorer, labelKey: 'dnaExplorer' },
      { id: 'punnett-square', href: ROUTES.punnettSquare, labelKey: 'punnettSquare' },
      { id: 'relationship-explorer', href: ROUTES.relationshipRisk, labelKey: 'relationshipExplorer' },
    ],
  },
  // Pakistan Map stays a direct top-level destination (§2) and keeps its
  // existing /genetics/pakistan-map route (§14).
  { id: 'map', labelKey: 'map', href: ROUTES.map },
  {
    id: 'resources',
    labelKey: 'resources',
    children: [
      { id: 'resources', href: ROUTES.resources, labelKey: 'resources' },
      { id: 'survey', href: ROUTES.survey, labelKey: 'survey' },
    ],
  },
  {
    id: 'about',
    labelKey: 'about',
    children: [
      { id: 'about', href: ROUTES.about, labelKey: 'aboutSharedBlood' },
      { id: 'community', href: ROUTES.community, labelKey: 'community' },
      { id: 'policy', href: ROUTES.policy, labelKey: 'policy' },
    ],
  },
];

/**
 * Every destination reachable from the primary header, flattened. Desktop and
 * mobile both render from `PRIMARY_NAV`, so this is the shared destination set
 * used by the route-integrity tests (§15) and by any check that needs "all
 * public nav targets" without walking the tree.
 */
export const PRIMARY_DESTINATIONS: readonly NavItem[] = PRIMARY_NAV.flatMap(
  (entry) =>
    entry.children
      ? [...entry.children]
      : entry.href
        ? [{ id: entry.id as NavId, href: entry.href, labelKey: entry.labelKey }]
        : [],
);

/**
 * Footer secondary navigation (spec §7):
 * Home · Disease Library · Genetics Explorer · Resources · Survey · Hospitals ·
 * Contact. Identical on every page (rendered from the shared layout).
 */
export const FOOTER_NAV: readonly NavItem[] = [
  { id: 'home', href: ROUTES.home, labelKey: 'home' },
  { id: 'diseases', href: ROUTES.diseases, labelKey: 'diseases' },
  { id: 'early-signs', href: ROUTES.earlySigns, labelKey: 'earlySigns' },
  { id: 'care-support', href: ROUTES.careSupport, labelKey: 'careSupport' },
  { id: 'genetics', href: ROUTES.genetics, labelKey: 'genetics' },
  { id: 'genetic-testing', href: ROUTES.geneticTesting, labelKey: 'geneticTesting' },
  { id: 'resources', href: ROUTES.resources, labelKey: 'resources' },
  { id: 'survey', href: ROUTES.survey, labelKey: 'survey' },
  { id: 'community', href: ROUTES.community, labelKey: 'community' },
  { id: 'policy', href: ROUTES.policy, labelKey: 'policy' },
  // Hospitals removed from the footer too (Module 24 §63). Contact is a real
  // page (project email), so it stays.
  { id: 'contact', href: ROUTES.contact, labelKey: 'contact' },
];

/**
 * Legal links reserved for future modules (spec §7 — "Privacy Policy (future)",
 * "Terms of Use (future)"). Rendered as non-interactive until their pages exist,
 * so the footer architecture already accounts for them.
 */
export interface FutureLink {
  id: string;
  /** i18n key within the `Footer` namespace. */
  labelKey: string;
}

export const FOOTER_FUTURE_LINKS: readonly FutureLink[] = [
  { id: 'terms', labelKey: 'terms' },
];

/**
 * Governance pages (Module 20 — Privacy, Ethics & Research Governance). Real,
 * interactive footer links to the approved public governance pages. `labelKey`
 * resolves within the `Footer` namespace.
 */
export const FOOTER_GOVERNANCE_LINKS: readonly NavItem[] = [
  { id: 'privacy' as NavId, href: ROUTES.privacy, labelKey: 'privacy' },
  { id: 'ethics' as NavId, href: ROUTES.researchEthics, labelKey: 'ethics' },
  { id: 'governance' as NavId, href: ROUTES.researchGovernance, labelKey: 'governance' },
];

export { ROUTES };
