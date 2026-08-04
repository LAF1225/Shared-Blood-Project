import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_CONFIG } from '@/constants/config';
import { PUBLIC_ROUTES } from '@/constants/publicRoutes';
import { DISEASES } from '@/features/diseases';
import { LEARNING_RESOURCES } from '@/features/learning';

/**
 * XML sitemap (Module 26 §27).
 *
 * Every entry is emitted once per locale with `alternates.languages`, so a
 * crawler is told explicitly that `/en/diseases` and `/ur/diseases` are the same
 * document in two languages rather than duplicate content. This matters more
 * than usual here: the whole point of the platform is reach, and Urdu is the
 * language most of the intended audience reads.
 *
 * Absolute URLs come from SITE_CONFIG.url, i.e. NEXT_PUBLIC_SITE_URL. If that
 * variable is wrong in production, every URL in this file is wrong, which is
 * why §9 makes setting it a launch blocker.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const lastModified = new Date();

  const paths = [
    ...PUBLIC_ROUTES,
    ...DISEASES.map((disease) => ({
      path: `/diseases/${disease.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    ...LEARNING_RESOURCES.map((resource) => ({
      path: `/resources/${resource.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];

  /** `/` must not become `/en/`, so normalise the trailing slash away. */
  const url = (locale: string, path: string) =>
    `${base}/${locale}${path === '/' ? '' : path}`;

  return paths.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [alt, url(alt, path)]),
        ),
      },
    })),
  );
}
