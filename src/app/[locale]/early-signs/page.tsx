import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageContainer } from '@/components/layout';
import { EarlySignsExplorer } from '@/features/early-signs';
import type { EarlySignDiseaseId } from '@/features/early-signs';

const SUPPORTED: EarlySignDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'EarlySigns' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * Early Signs & Care Guidance route (Module 13). Disease-first educational
 * guidance (spec §19). Supports an optional `?disease=` deep-link so the physical
 * orphanage booklet's QR codes can open the matching disease view (spec §76,
 * project suggestion) — the value is validated against the supported set.
 */
export default async function EarlySignsRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ disease?: string }>;
}) {
  const { locale } = await params;
  const { disease } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'EarlySigns' });
  const initialDisease =
    disease && (SUPPORTED as string[]).includes(disease) ? (disease as EarlySignDiseaseId) : null;

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </header>

        <EarlySignsExplorer initialDisease={initialDisease} />
      </PageContainer>
    </div>
  );
}
