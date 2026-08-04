import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ComingSoonPage } from '@/components/layout';

/**
 * Hospitals (Module 24 §63 — INTENTIONAL_PLACEHOLDER, removed from navigation).
 *
 * There is no verified public hospital dataset, and Module 24 must not build a
 * hospital finder or fabricate treatment-center claims (§63/§110). The route is
 * kept as an explicit, honest "coming soon" state and is no longer linked from
 * primary/footer navigation.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  return { title: t('hospitals.title') };
}

export default async function HospitalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  return (
    <ComingSoonPage title={t('hospitals.title')} body={t('hospitals.body')} badge={t('badge')} />
  );
}
