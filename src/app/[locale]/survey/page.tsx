import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WhatPakistanKnows, PUBLIC_DATASET, PUBLIC_FINDINGS, SURVEY_FORM } from '@/features/survey';

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
 * "What Pakistan Knows" — the public survey (Module 16). Invites people to the
 * live Google Form, then shows aggregate findings. The production dataset is
 * empty until responses have been aggregated and approved (spec §44/§69), so
 * the page shows the invitation, the "findings being prepared" state and the
 * methodology — never fabricated statistics.
 */
export default async function SurveyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Survey' });

  return (
    <WhatPakistanKnows
      dataset={PUBLIC_DATASET}
      findings={PUBLIC_FINDINGS}
      form={SURVEY_FORM}
      locale={locale}
      t={t}
    />
  );
}
