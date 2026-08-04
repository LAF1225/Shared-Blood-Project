import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/config';

/**
 * SEO metadata helper (foundation §18).
 * Builds a consistent per-page Metadata object. Structured data, sitemap,
 * and robots implementation land in later modules.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const desc = description ?? SITE_CONFIG.description;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? SITE_CONFIG.name,
      description: desc,
      url: path,
      type: 'website',
    },
  };
}
