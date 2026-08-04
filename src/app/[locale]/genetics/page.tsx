import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GeneticsExplorer } from '@/features/genetics';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Genetics' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function GeneticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GeneticsExplorer />;
}
