import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getGeneticsToolBySlug, GeneticsToolPage } from '@/features/genetics';
import { PunnettExplorer } from '@/features/genetics/punnett';

const SLUG = 'punnett-square';

/**
 * Dedicated Punnett Square route (Module 22 §33/§53). An educational entry point
 * that reuses the shared Punnett renderer and canonical inheritance strategies —
 * it has NO independent calculation logic (§33). Static segment: it shadows the
 * generic `/genetics/[slug]` tool page and code-splits its client bundle here.
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

export default async function PunnettSquareRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tool = getGeneticsToolBySlug(SLUG);
  if (!tool) notFound();

  const t = await getTranslations({ locale, namespace: 'Genetics' });

  return <GeneticsToolPage tool={tool} locale={locale} t={t} interactive={<PunnettExplorer />} />;
}
