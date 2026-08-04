import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';
import { parseDiseaseContext } from '@/features/genetics/context';
import { DnaExplorer } from '@/features/genetics/dna';

const SLUG = 'dna-explorer';

/**
 * Dedicated Disease-Linked DNA Explorer route (Module 22 §53). A static segment,
 * so it takes precedence over the generic `/genetics/[slug]` tool page and the
 * interactive client bundle is code-split into this route only — it never loads
 * on the Genetics Explorer landing page (§49).
 *
 * It reuses the shared §8 tool-page framework (overview, purpose, educational
 * explanation, limitations, related resources/diseases, references); the live
 * DNA Explorer fills the interactive slot.
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

export default async function DnaExplorerRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ disease?: string }>;
}) {
  const { locale } = await params;
  const { disease } = await searchParams;
  setRequestLocale(locale);

  const tool = getGeneticsToolBySlug(SLUG);
  if (!tool) notFound();

  // Optional educational disease preselection (Module 24 §72). Validated to a
  // canonical id; anything else is ignored. Subtype is never preselected.
  const initialDiseaseId = parseDiseaseContext(disease);
  const t = await getTranslations({ locale, namespace: 'Genetics' });

  return (
    <GeneticsToolPage
      tool={tool}
      locale={locale}
      t={t}
      interactive={<DnaExplorer initialDiseaseId={initialDiseaseId} />}
    />
  );
}
