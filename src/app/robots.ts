import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants/config';
import { DISALLOWED_PATHS } from '@/constants/publicRoutes';

/**
 * robots.txt (Module 26 §27).
 *
 * Shared Blood is public educational material and wants to be indexed, so the
 * default is allow. The exclusions are the thin search placeholder and the
 * dev-only preview routes: those already 404 in production, but listing them
 * means a misconfigured deployment still does not get them into an index.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOWED_PATHS],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
