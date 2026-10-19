import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NTSPR_BRIEF, PolicyAgendaPage } from '@/features/policy';

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
 * Policy page: Shared Blood's current public policy agenda, the National
 * Thalassemia Screening and Prevention Registry (NTSPR) brief. Fully static.
 */
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Policy' });

  return <PolicyAgendaPage brief={NTSPR_BRIEF} locale={locale} t={t} />;
}
