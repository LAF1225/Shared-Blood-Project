import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageContainer } from '@/components/layout';
import { CareSupportExplorer } from '@/features/care-support';
import type { CareDiseaseId } from '@/features/care-support';

const SUPPORTED: CareDiseaseId[] = [
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
  const t = await getTranslations({ locale, namespace: 'CareSupport' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * Care & Support Resources route (Module 14). Disease-first, category-based
 * practical-care education (spec §59). Supports an optional `?disease=` deep-link
 * so a disease page's Care & Support summary — and a future printable Care Card's
 * QR code — can open the matching disease view (spec §4). The value is validated
 * against the supported set.
 */
export default async function CareSupportRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ disease?: string }>;
}) {
  const { locale } = await params;
  const { disease } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'CareSupport' });
  const initialDisease =
    disease && (SUPPORTED as string[]).includes(disease) ? (disease as CareDiseaseId) : null;

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </header>

        <CareSupportExplorer initialDisease={initialDisease} />
      </PageContainer>
    </div>
  );
}
