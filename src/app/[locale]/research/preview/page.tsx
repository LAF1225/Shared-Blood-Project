import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResearchAndFindings } from '@/features/research';
import type { EvidenceType, ResearchDomain } from '@/features/research';
import { SAMPLE_RESEARCH_DATASET } from '@/features/research/preview/sampleDataset';

/**
 * DEV-ONLY preview of "Research & Findings" driven by the CLEARLY-SYNTHETIC sample
 * dataset (built from the Module 16/17 SAMPLE data). It runs the sample through
 * the SAME source resolution, validation, statistics, and report resolution the
 * production page uses, so the full presentation (findings, "What This Does Not
 * Show", charts, reports, methodology, limitations) can be verified without
 * shipping fabricated findings. Returns 404 in production.
 */
export const dynamic = 'force-dynamic';

export default async function ResearchPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ finding?: string; report?: string; domain?: string; evidence?: string; year?: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  const { finding, report, domain, evidence, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Research' });

  return (
    <div>
      <p className="bg-accent/10 px-4 py-2 text-center text-sm font-medium text-accent-strong">
        Development preview, synthetic sample data only. Not real research findings.
      </p>
      <ResearchAndFindings
        dataset={SAMPLE_RESEARCH_DATASET}
        locale={locale}
        t={t}
        selectedFindingId={finding ?? null}
        selectedReportId={report ?? null}
        filters={{
          domain: (domain as ResearchDomain) ?? 'all',
          evidenceType: (evidence as EvidenceType) ?? 'all',
          year: year ?? 'all',
        }}
      />
    </div>
  );
}
