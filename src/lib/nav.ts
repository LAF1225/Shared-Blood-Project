import { DISEASE_IDS } from '@/constants/diseases';
import type { NavEntry, NavEntryId } from '@/constants/navigation';

/**
 * Navigation logic shared across the header, mobile menu, and breadcrumbs
 * (Module 03 — Navigation System). Pure functions only, so they are trivial to
 * unit-test and identical everywhere. Paths are locale-stripped (as returned by
 * next-intl's `usePathname`).
 */

/**
 * Active-state test that also matches nested pages (spec §9): a parent link
 * stays active while the user is on a child route — e.g. "Disease Library"
 * remains active on `/diseases/beta-thalassemia`. Matches on segment
 * boundaries so `/genetics` never falsely activates a hypothetical
 * `/genetics-lab`.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Resolves which of the six primary entries is active for a route
 * (Module 25.6 §8). A child page activates its parent group: `/diseases/...`
 * activates Learn, every `/genetics/...` tool activates Genetics.
 *
 * Matching is longest-href-wins so a nested direct entry beats a shallower
 * group: `/genetics/pakistan-map` activates **Pakistan Map**, not Genetics,
 * even though both match on segment boundaries.
 *
 * Pure and config-driven: pass the canonical `PRIMARY_NAV` so desktop, mobile,
 * and the tests can never disagree.
 */
export function resolveActiveEntryId(
  pathname: string,
  entries: readonly NavEntry[],
): NavEntryId | undefined {
  let bestId: NavEntryId | undefined;
  let bestLength = -1;

  for (const entry of entries) {
    const targets = entry.children
      ? entry.children.map((child) => child.href)
      : entry.href
        ? [entry.href]
        : [];

    for (const href of targets) {
      if (isActivePath(pathname, href) && href.length > bestLength) {
        bestId = entry.id;
        bestLength = href.length;
      }
    }
  }

  return bestId;
}

/**
 * Picks the single most specific destination for a route from a list of hrefs
 * (Module 25.6 §8). Used inside a group so exactly one child is highlighted:
 * on `/genetics/punnett-square` the Punnett Square item wins over the shallower
 * Genetics Explorer item, instead of both appearing active.
 */
export function resolveActiveHref(
  pathname: string,
  hrefs: readonly string[],
): string | undefined {
  let best: string | undefined;
  let bestLength = -1;
  for (const href of hrefs) {
    if (isActivePath(pathname, href) && href.length > bestLength) {
      best = href;
      bestLength = href.length;
    }
  }
  return best;
}

/**
 * True only when this href *is* the page being viewed. `aria-current="page"`
 * must mark the current page and nothing else, so an ancestor section link
 * (Disease Library while on a disease detail page) is highlighted visually but
 * never announced as the current page.
 */
export function isCurrentPage(pathname: string, href: string): boolean {
  return pathname === href;
}

const DISEASE_SLUGS = new Set<string>(DISEASE_IDS);

/**
 * Maps a top-level route segment to its label key. Keeps breadcrumb labels in
 * sync with the same translations the nav uses. Unknown segments fall back to a
 * prettified version of the slug.
 */
const SEGMENT_LABEL_KEY: Record<string, string> = {
  about: 'Nav.about',
  diseases: 'Nav.diseases',
  genetics: 'Nav.genetics',
  map: 'Nav.map',
  resources: 'Nav.resources',
  survey: 'Nav.survey',
  hospitals: 'Nav.hospitals',
  downloads: 'Nav.downloads',
  contact: 'Nav.contact',
  search: 'Search.title',
  'early-signs': 'Nav.earlySigns',
  'care-support': 'Nav.careSupport',
  'genetic-testing': 'Nav.geneticTesting',
  community: 'Nav.community',
  research: 'Nav.research',
  policy: 'Nav.policy',
  'inheritance-calculator': 'Nav.inheritanceCalculator',
  'dna-explorer': 'Nav.dnaExplorer',
  'punnett-square': 'Nav.punnettSquare',
  'relationship-risk': 'Nav.relationshipExplorer',
  'pakistan-map': 'Nav.map',
  privacy: 'Footer.privacy',
  ethics: 'Footer.ethics',
  governance: 'Footer.governance',
};

export interface Crumb {
  href: string;
  /** Full dotted i18n key, or `null` when only the prettified fallback applies. */
  labelKey: string | null;
  /** Prettified slug used when the key is missing from the message catalogue. */
  fallback: string;
  /** True for the final crumb (the current page). */
  current: boolean;
}

/** Title-case a URL slug: `beta-thalassemia` → `Beta Thalassemia`. */
function prettify(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Builds the breadcrumb trail from a route (spec §8). Always begins at Home and
 * ends at the current page. Returns an empty array for the homepage so the
 * breadcrumb bar can hide itself there.
 */
export function buildCrumbs(pathname: string): Crumb[] {
  const clean = pathname.replace(/\/+$/, '');
  if (clean === '' || clean === '/') return [];

  const segments = clean.split('/').filter(Boolean);
  const crumbs: Crumb[] = [
    { href: '/', labelKey: 'Nav.home', fallback: 'Home', current: false },
  ];

  let href = '';
  segments.forEach((segment, index) => {
    href += `/${segment}`;
    const parent = index > 0 ? segments[index - 1] : '';

    let labelKey: string | null = null;
    if (parent === 'diseases' && DISEASE_SLUGS.has(segment)) {
      labelKey = `Diseases.${segment}`;
    } else if (parent === 'resources') {
      // Missing keys fall back to the prettified slug in the Breadcrumbs component.
      labelKey = `Learning.resourceTitles.${segment}`;
    } else if (SEGMENT_LABEL_KEY[segment]) {
      labelKey = SEGMENT_LABEL_KEY[segment];
    }

    crumbs.push({
      href,
      labelKey,
      fallback: prettify(segment),
      current: index === segments.length - 1,
    });
  });

  return crumbs;
}
