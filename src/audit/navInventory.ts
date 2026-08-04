/**
 * Module 24 — development-only navigation inventory (§6/§31).
 *
 * DEV / BUILD-TIME ONLY. Not imported by any route/component (never in the
 * client bundle). Records every navigation surface with its destination status
 * and the reconciliation action taken. This is not a universal site registry
 * (§31); it is a documentation aid for the navigation reconciliation pass.
 */
export type DestinationStatus = 'ACTIVE' | 'ACTIVE_STATIC' | 'PLACEHOLDER' | 'RETIRED' | 'UNKNOWN';
export type NavAction = 'PRESERVE' | 'RENAME' | 'REMOVE' | 'REPOINT' | 'REVIEW';

export interface NavInventoryEntry {
  source: 'PRIMARY_NAV' | 'FOOTER_NAV' | 'FOOTER_GOVERNANCE' | 'HEADER' | 'DISEASE_NAV' | 'GENETICS_TOOL_PAGE' | 'HOMEPAGE';
  label: string;
  destination: string;
  localeAware: boolean;
  status: DestinationStatus;
  action: NavAction;
  note?: string;
}

export const NAV_INVENTORY: readonly NavInventoryEntry[] = [
  // Primary + footer major sections — all active, locale-aware via next-intl Link.
  { source: 'PRIMARY_NAV', label: 'Home / Diseases / Early Signs / Care / Genetics / Genetic Testing / Map / Resources / Survey / Community / Research / Policy', destination: 'section routes', localeAware: true, status: 'ACTIVE', action: 'PRESERVE' },
  { source: 'PRIMARY_NAV', label: 'About', destination: '/about', localeAware: true, status: 'ACTIVE_STATIC', action: 'PRESERVE', note: 'Now a real About page (Module 24 §62).' },
  { source: 'PRIMARY_NAV', label: 'Hospitals', destination: '/hospitals', localeAware: true, status: 'PLACEHOLDER', action: 'REMOVE', note: 'Removed from primary nav; route kept as explicit coming-soon (§63).' },
  { source: 'FOOTER_NAV', label: 'Contact', destination: '/contact', localeAware: true, status: 'ACTIVE_STATIC', action: 'PRESERVE', note: 'Now a real page with the project email (§64).' },
  { source: 'FOOTER_NAV', label: 'Hospitals', destination: '/hospitals', localeAware: true, status: 'PLACEHOLDER', action: 'REMOVE', note: 'Removed from footer nav (§63).' },
  { source: 'FOOTER_GOVERNANCE', label: 'Privacy / Ethics / Governance', destination: '/privacy, /ethics, /governance', localeAware: true, status: 'ACTIVE', action: 'PRESERVE' },
  { source: 'HEADER', label: 'Search', destination: '/search (dialog → results)', localeAware: true, status: 'PLACEHOLDER', action: 'PRESERVE', note: 'Explicit honest "coming soon" results page; no full-site search built (§66).' },
  { source: 'GENETICS_TOOL_PAGE', label: 'Continue learning (tool cross-nav)', destination: '5 active tools + disease library + Genetics Explorer', localeAware: true, status: 'ACTIVE', action: 'PRESERVE', note: 'Curated educational connections (§7/§39). No Family Tree target.' },
  { source: 'DISEASE_NAV', label: 'Explore the genetics of this condition', destination: 'DNA Explorer / Calculator (?disease=) / Evidence Map', localeAware: true, status: 'ACTIVE', action: 'PRESERVE', note: 'Canonical-id context only (§8/§72).' },
  { source: 'HOMEPAGE', label: 'Hero / previews', destination: '/diseases, /genetics, /genetics/pakistan-map', localeAware: true, status: 'ACTIVE', action: 'PRESERVE', note: 'Three required pathways discoverable (§25).' },
  // Retired.
  { source: 'GENETICS_TOOL_PAGE', label: 'Family Tree Explorer', destination: '/genetics/family-tree-explorer', localeAware: true, status: 'RETIRED', action: 'REMOVE', note: 'Retired in Module 23; NO public nav links; route 404s. FAMILY_TREE_REDIRECT_DECISION = NO_REDIRECT_REQUIRED (§71).' },
];

/** Locked decision (Module 24 §11/§71). */
export const FAMILY_TREE_REDIRECT_DECISION = 'NO_REDIRECT_REQUIRED' as const;
