import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WhatPakistanKnows, PUBLIC_DATASET, PUBLIC_FINDINGS } from '@/features/survey';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Survey' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * "What Pakistan Knows" — public survey findings (Module 16). The route resolves
 * the translator and passes the PRODUCTION aggregate data to the synchronous
 * page component. The production dataset is empty until a real survey has been
 * collected, cleaned offline, aggregated, and approved (spec §44/§69), so the
 * page currently renders the overview, the "findings being prepared" state, and
 * the methodology framing — never fabricated statistics.
 */
export default async function SurveyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Survey' });

  return <WhatPakistanKnows dataset={PUBLIC_DATASET} findings={PUBLIC_FINDINGS} locale={locale} t={t} />;
}
