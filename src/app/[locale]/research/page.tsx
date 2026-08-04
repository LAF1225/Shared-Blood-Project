import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResearchAndFindings, PUBLIC_RESEARCH_DATASET } from '@/features/research';
import type { EvidenceType, ResearchDomain } from '@/features/research';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Research' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * "Research & Findings" — public research findings & reports (Module 18). The
 * route resolves the translator and passes the PRODUCTION dataset to the
 * synchronous page component. The production dataset is empty until approved
 * findings are produced from approved Module 16/17 sources (spec §9/§110), so the
 * page currently renders the introduction, the §110 empty states, the disclaimer,
 * and the methodology framing — never fabricated findings.
 *
 * Server-side deep-links (spec §72/§55/§81): `?finding=` opens a finding detail
 * page, `?report=` opens a report page, and `?domain/evidence/year=` drive the
 * archive filters. All are validated.
 */
export default async function ResearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ finding?: string; report?: string; domain?: string; evidence?: string; year?: string }>;
}) {
  const { locale } = await params;
  const { finding, report, domain, evidence, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Research' });

  return (
    <ResearchAndFindings
      dataset={PUBLIC_RESEARCH_DATASET}
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
  );
}
