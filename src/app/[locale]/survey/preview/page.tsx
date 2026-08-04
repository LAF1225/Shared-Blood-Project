import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { WhatPakistanKnows } from '@/features/survey';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from '@/features/survey/preview/sampleDataset';

/**
 * DEV-ONLY preview of "What Pakistan Knows" driven by the CLEARLY-SYNTHETIC
 * sample dataset (`SAMPLE_DATASET` / `SAMPLE_FINDINGS`). It runs the sample data
 * through the SAME validation and resolution the production page uses, so the
 * full presentation (findings, charts, suppression, methodology) can be verified
 * without shipping fabricated statistics to the public page. Returns 404 in
 * production so synthetic numbers never appear publicly.
 */
export const dynamic = 'force-dynamic';

export default async function SurveyPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Survey' });

  return (
    <div>
      <p className="bg-accent/10 px-4 py-2 text-center text-sm font-medium text-accent-strong">
        Development preview, synthetic sample data only. Not real survey results.
      </p>
      <WhatPakistanKnows dataset={SAMPLE_DATASET} findings={SAMPLE_FINDINGS} locale={locale} t={t} />
    </div>
  );
}
