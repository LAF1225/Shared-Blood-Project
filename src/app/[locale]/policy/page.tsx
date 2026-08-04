import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PolicyAndAdvocacy, PUBLIC_POLICY_DATASET } from '@/features/policy';
import type { AdvocacyPriorityType, PolicyDomain } from '@/features/policy';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Policy' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * "Policy & Advocacy" — public policy & advocacy priorities (Module 19). The route
 * resolves the translator and passes the PRODUCTION dataset to the synchronous
 * page component. The production dataset is empty until approved advocacy is
 * produced from approved Module 18 evidence (spec §16/§112), so the page currently
 * renders the introduction, the §112 empty states, the disclaimer, and the scope
 * framing — never fabricated advocacy.
 *
 * Server-side deep-links (spec §71/§49/§108): `?priority=` opens a priority detail
 * page, `?brief=` opens a brief page, and `?domain/type/year=` drive the archive.
 */
export default async function PolicyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ priority?: string; brief?: string; domain?: string; type?: string; year?: string }>;
}) {
  const { locale } = await params;
  const { priority, brief, domain, type, year } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Policy' });

  return (
    <PolicyAndAdvocacy
      dataset={PUBLIC_POLICY_DATASET}
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
  );
}
