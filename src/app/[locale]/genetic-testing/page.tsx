import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageContainer } from '@/components/layout';
import { GeneticTestingExplorer } from '@/features/genetic-testing';
import type {
  GeneticTestingDiseaseId,
  LifeStageContext,
  TestingCategory,
} from '@/features/genetic-testing';

const SUPPORTED_DISEASES: GeneticTestingDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

const LIFE_STAGES: LifeStageContext[] = [
  'GENERAL',
  'BEFORE_MARRIAGE',
  'AFTER_MARRIAGE',
  'BEFORE_PREGNANCY',
  'DURING_PREGNANCY',
  'AFTER_CHILD_DIAGNOSIS',
  'AFTER_RELATIVE_DIAGNOSIS',
];

const CATEGORIES: TestingCategory[] = [
  'CARRIER_TESTING',
  'DIAGNOSTIC_GENETIC_TESTING',
  'FAMILY_VARIANT_TESTING',
  'PRECONCEPTION_TESTING',
  'PRENATAL_TESTING_EDUCATION',
  'NEWBORN_SCREENING_EDUCATION',
  'POPULATION_SCREENING_EDUCATION',
  'GENETIC_COUNSELLING',
  'FAMILY_HISTORY_REVIEW',
  'OTHER',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GeneticTesting' });
  return { title: t('title'), description: t('subtitle') };
}

/**
 * Genetic Testing & Counselling Education route (Module 15). Context- and
 * category-based education (spec §16). Supports optional `?context=`, `?disease=`,
 * and `?category=` deep-links (e.g. for a future "Before the Test" awareness card
 * QR code, project suggestion) — each validated against the supported set. A
 * deep-link only pre-selects a filter; it never infers personal risk (spec §17).
 */
export default async function GeneticTestingRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ context?: string; disease?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { context, disease, category } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'GeneticTesting' });

  const initialContext =
    context && (LIFE_STAGES as string[]).includes(context) ? (context as LifeStageContext) : null;
  const initialDisease =
    disease && (SUPPORTED_DISEASES as string[]).includes(disease)
      ? (disease as GeneticTestingDiseaseId)
      : null;
  const initialCategory =
    category && (CATEGORIES as string[]).includes(category) ? (category as TestingCategory) : null;

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </header>

        <GeneticTestingExplorer
          initialContext={initialContext}
          initialDisease={initialDisease}
          initialCategory={initialCategory}
        />
      </PageContainer>
    </div>
  );
}
