import { redirect } from 'next/navigation';

/**
 * Legacy `/map` route. The Pakistan map became the Module 11 Evidence Map under
 * `/genetics/pakistan-map`; this redirect keeps any old links working and avoids
 * maintaining two separate map surfaces (spec §3 "do not maintain two datasets").
 *
 * Rendered on demand (not prerendered) so the redirect resolves at request time.
 * The path is locale-prefixed explicitly (routing uses `localePrefix: 'always'`).
 */
export const dynamic = 'force-dynamic';

export default async function MapRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale === 'ur' ? 'ur' : 'en';
  redirect(`/${safeLocale}/genetics/pakistan-map`);
}
