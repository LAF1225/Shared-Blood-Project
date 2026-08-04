import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GovernancePage, getGovernancePage } from '@/features/governance';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getGovernancePage('research-ethics');
  const l = locale === 'ur' ? 'ur' : 'en';
  return { title: page?.title[l], description: page?.subtitle[l] };
}

/**
 * Research Ethics page (Module 20, spec §32). Renders the approved public research-
 * ethics content through the synchronous GovernancePage server component.
 */
export default async function EthicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = getGovernancePage('research-ethics');
  if (!page) notFound();
  const t = await getTranslations({ locale, namespace: 'Governance' });
  return <GovernancePage page={page} locale={locale} t={t} />;
}
