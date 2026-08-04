import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PolicyAndAdvocacy } from '@/features/policy';
import type { AdvocacyPriorityType, PolicyDomain } from '@/features/policy';
import { SAMPLE_POLICY_DATASET } from '@/features/policy/preview/sampleDataset';

/**
 * DEV-ONLY preview of "Policy & Advocacy" driven by the CLEARLY-SYNTHETIC sample
 * dataset (built from the Module 18 SAMPLE findings). It runs the sample through
 * the SAME evidence resolution, validation, and brief resolution the production
 * page uses, so the full presentation (priorities, "What This Advocacy Does Not
 * Claim", evidence boundaries, recommendations, briefs, timeline, limitations)
 * can be verified without shipping fabricated advocacy. Returns 404 in production.
 */
export const dynamic = 'force-dynamic';

export default async function PolicyPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ priority?: string; brief?: string; domain?: string; type?: string; year?: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  const { priority, brief, domain, type, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Policy' });

  return (
    <div>
      <p className="bg-accent/10 px-4 py-2 text-center text-sm font-medium text-accent-strong">
        Development preview, synthetic sample data only. Not real advocacy positions.
      </p>
      <PolicyAndAdvocacy
        dataset={SAMPLE_POLICY_DATASET}
        locale={locale}
        t={t}
        selectedPriorityId={priority ?? null}
        selectedBriefId={brief ?? null}
        filters={{
          domain: (domain as PolicyDomain) ?? 'all',
          priorityType: (type as AdvocacyPriorityType) ?? 'all',
          year: year ?? 'all',
        }}
      />
    </div>
  );
}
