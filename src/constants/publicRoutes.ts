import { ROUTES } from './routes';

/**
 * The canonical list of publicly indexable, statically known paths
 * (Module 26 §27).
 *
 * Derived from ROUTES so a future route cannot appear in navigation while
 * silently missing from the sitemap. Two categories are deliberately excluded:
 *
 *  - `/preview` routes, which 404 in production and must never be advertised.
 *  - Dynamic slugs, which are appended from their registries by the sitemap so
 *    that adding a disease or resource needs no change here.
 *
 * `changeFrequency` and `priority` are hints, not promises. They are set from
 * how often the content genuinely changes: the homepage and disease library
 * move most, static policy pages barely at all.
 */
export interface PublicRoute {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const PUBLIC_ROUTES: readonly PublicRoute[] = [
  { path: ROUTES.home, priority: 1.0, changeFrequency: 'weekly' },

  // Core educational content: the reason the site exists.
  { path: ROUTES.diseases, priority: 0.9, changeFrequency: 'weekly' },
  { path: ROUTES.genetics, priority: 0.9, changeFrequency: 'monthly' },
  { path: ROUTES.resources, priority: 0.8, changeFrequency: 'monthly' },

  // Interactive tools.
  { path: ROUTES.inheritanceCalculator, priority: 0.8, changeFrequency: 'monthly' },
  { path: ROUTES.dnaExplorer, priority: 0.7, changeFrequency: 'monthly' },
  { path: ROUTES.punnettSquare, priority: 0.7, changeFrequency: 'monthly' },
  { path: ROUTES.relationshipRisk, priority: 0.7, changeFrequency: 'monthly' },
  { path: ROUTES.map, priority: 0.8, changeFrequency: 'monthly' },

  // Guidance and support.
  { path: ROUTES.earlySigns, priority: 0.8, changeFrequency: 'monthly' },
  { path: ROUTES.careSupport, priority: 0.8, changeFrequency: 'monthly' },
  { path: ROUTES.geneticTesting, priority: 0.8, changeFrequency: 'monthly' },

  // Evidence and advocacy. /research is unlisted: it is no longer linked from
  // the About menu or footer.
  { path: ROUTES.policy, priority: 0.6, changeFrequency: 'monthly' },
  { path: ROUTES.community, priority: 0.6, changeFrequency: 'monthly' },
  { path: ROUTES.survey, priority: 0.5, changeFrequency: 'monthly' },

  // Organisational and governance.
  { path: ROUTES.about, priority: 0.6, changeFrequency: 'yearly' },
  { path: ROUTES.contact, priority: 0.5, changeFrequency: 'yearly' },
  { path: ROUTES.privacy, priority: 0.4, changeFrequency: 'yearly' },
  { path: ROUTES.researchEthics, priority: 0.4, changeFrequency: 'yearly' },
  { path: ROUTES.researchGovernance, priority: 0.4, changeFrequency: 'yearly' },
  { path: ROUTES.hospitals, priority: 0.4, changeFrequency: 'monthly' },
  { path: ROUTES.downloads, priority: 0.4, changeFrequency: 'monthly' },
] as const;

/**
 * Paths crawlers should not index. `/search` is a thin placeholder with no real
 * results yet, and preview routes 404 in production but are listed so that a
 * misconfigured deployment still does not get them indexed.
 */
export const DISALLOWED_PATHS: readonly string[] = [
  '/*/search',
  '/*/diseases/preview',
  '/*/diseases/stories-preview',
  '/*/community/preview',
  '/*/policy/preview',
  '/*/research/preview',
  '/*/survey/preview',
] as const;
