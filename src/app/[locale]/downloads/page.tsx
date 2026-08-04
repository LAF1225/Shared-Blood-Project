import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ComingSoonPage } from '@/components/layout';

/**
 * Downloads (Module 24 §65 — INTENTIONAL_PLACEHOLDER, not navigated).
 *
 * No approved public downloadable materials exist yet, and Module 24 must never
 * expose internal PRDs, audits, implementation reports, or Claude Code
 * instructions as public downloads (§65/§110). Kept as an explicit "coming soon"
 * state; it is not linked from primary/footer navigation.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  return { title: t('downloads.title') };
}

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ComingSoon' });
  return (
    <ComingSoonPage title={t('downloads.title')} body={t('downloads.body')} badge={t('badge')} />
  );
}
