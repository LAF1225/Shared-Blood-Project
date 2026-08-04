import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';
import { RelationshipExplorer } from '@/features/genetics/relationship';

const SLUG = 'relationship-risk';

/**
 * Relationship & Recessive Risk Explorer route (Module 10, spec §5). As a static
 * segment it takes precedence over `/genetics/[slug]`, and its client logic is
 * code-split into this route only — it never loads on the Explorer landing page
 * or the calculator route (spec §5/§34).
 *
 * It reuses the shared §8 tool-page framework so it stays structurally consistent
 * with the rest of the Explorer; the interactive tool fills the interactive slot.
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

export default async function RelationshipRiskRoute({
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
      interactive={<RelationshipExplorer />}
    />
  );
}
