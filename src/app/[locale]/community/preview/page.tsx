import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SharedBloodInCommunity } from '@/features/community';
import type { ActivityType, FieldworkCity } from '@/features/community';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from '@/features/community/preview/sampleDataset';

/**
 * DEV-ONLY preview of "Shared Blood in the Community" driven by the CLEARLY-
 * SYNTHETIC sample dataset. It runs the sample through the SAME validation,
 * impact calculation, and public-record resolution the production page uses, so
 * the full presentation (impact cards, featured activities, archive filters,
 * public activity pages, evidence privacy gating, field learnings) can be verified
 * without shipping fabricated proof of work. Returns 404 in production so
 * synthetic activities never appear publicly.
 */
export const dynamic = 'force-dynamic';

export default async function CommunityPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ activity?: string; type?: string; city?: string; year?: string }>;
}) {
  if (process.env.NODE_ENV === 'production') notFound();

  const { locale } = await params;
  const { activity, type, city, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Community' });

  return (
    <div>
      <p className="bg-accent/10 px-4 py-2 text-center text-sm font-medium text-accent-strong">
        Development preview, synthetic sample data only. Not real fieldwork results.
      </p>
      <SharedBloodInCommunity
        dataset={SAMPLE_DATASET}
        findings={SAMPLE_FINDINGS}
        locale={locale}
        t={t}
        selectedActivityId={activity ?? null}
        filters={{
          type: (type as ActivityType) ?? 'all',
          city: (city as FieldworkCity) ?? 'all',
          year: year ?? 'all',
        }}
      />
    </div>
  );
}
