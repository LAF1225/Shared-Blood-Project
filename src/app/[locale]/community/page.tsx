import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CommunityPage, COMMUNITY_ACTIVITIES, COMMUNITY_PHOTOS } from '@/features/community';

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
 * "Shared Blood in the Community": Shared Blood's ongoing community activities
 * and their photos. Fully static.
 */
export default async function CommunityRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Community' });

  return <CommunityPage activities={COMMUNITY_ACTIVITIES} photos={COMMUNITY_PHOTOS} locale={locale} t={t} />;
}
