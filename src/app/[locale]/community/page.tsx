import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SharedBloodInCommunity, PUBLIC_DATASET, PUBLIC_FINDINGS } from '@/features/community';
import type { ActivityType, FieldworkCity } from '@/features/community';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Community' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * "Shared Blood in the Community" — public community impact & fieldwork page
 * (Module 17). The route resolves the translator and passes the PRODUCTION public
 * data to the synchronous page component. The production dataset is empty until
 * real fieldwork has been documented, impact-verified, privacy-reviewed, and
 * approved (spec §40/§48), so the page currently renders the overview, the §48
 * "being documented" state, and the methodology framing — never fabricated
 * activities or impact.
 *
 * Server-side deep-links (spec §35/§37/§47): `?activity=` opens a public activity
 * page; `?type/city/year=` drive the archive filters. All are validated.
 */
export default async function CommunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ activity?: string; type?: string; city?: string; year?: string }>;
}) {
  const { locale } = await params;
  const { activity, type, city, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Community' });

  return (
    <SharedBloodInCommunity
      dataset={PUBLIC_DATASET}
      findings={PUBLIC_FINDINGS}
      locale={locale}
      t={t}
      selectedActivityId={activity ?? null}
      filters={{
        type: (type as ActivityType) ?? 'all',
        city: (city as FieldworkCity) ?? 'all',
        year: year ?? 'all',
      }}
    />
  );
}
