import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';
import { parseDiseaseContext } from '@/features/genetics/context';
import { InheritanceCalculator } from '@/features/genetics/calculator';

const SLUG = 'inheritance-calculator';

/**
 * Dedicated calculator route (Module 09, spec §4). Because this is a static
 * segment it takes precedence over the generic `/genetics/[slug]` tool page, and
 * the calculator's client logic is code-split into this route only — it never
 * loads on the Genetics Explorer landing page (spec §4/§24).
 *
 * The page still reuses the shared §8 tool-page framework (overview, purpose,
 * educational explanation, limitations, related resources/diseases, references)
 * so it stays structurally consistent with the rest of the Explorer; the live
 * calculator simply fills the interactive slot.
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

export default async function InheritanceCalculatorRoute({
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

  // Optional educational disease preselection (Module 24 §46/§72). Validated to
  // a canonical id; parent statuses are never transferred.
  const initialDiseaseSlug = parseDiseaseContext(disease);
  const t = await getTranslations({ locale, namespace: 'Genetics' });

  return (
    <GeneticsToolPage
      tool={tool}
      locale={locale}
      t={t}
      interactive={<InheritanceCalculator initialDiseaseSlug={initialDiseaseSlug} />}
    />
  );
}
