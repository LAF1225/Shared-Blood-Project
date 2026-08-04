import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';
import { EvidenceMapExplorer } from '@/features/genetics/pakistan-map';

const SLUG = 'pakistan-map';

/**
 * Pakistan Genetic Disorder Evidence Map route (Module 11, spec §3). As a static
 * segment it takes precedence over `/genetics/[slug]`, and the interactive map's
 * client code is code-split into this route only — the full map loads on its own
 * route, never on the Explorer landing page or the homepage (spec §4/§46).
 *
 * It reuses the shared §8 tool-page framework (Overview → Purpose → Interactive →
 * Interpretation → Limitations → References) so it stays structurally consistent
 * with the other Explorer tools; the map itself fills the interactive slot.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tool = getGeneticsToolBySlug(SLUG);
  if (!tool) return {};
  const l = locale === 'ur' ? 'ur' : 'en';
  return { title: tool.title[l], description: tool.summary[l] };
}

export default async function PakistanMapRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tool = getGeneticsToolBySlug(SLUG);
  if (!tool) notFound();

  const t = await getTranslations({ locale, namespace: 'Genetics' });

  return (
    <GeneticsToolPage
      tool={tool}
      locale={locale}
      t={t}
      interactive={<EvidenceMapExplorer />}
    />
  );
}
