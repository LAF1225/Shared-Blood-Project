import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { DISEASES, getDiseaseBySlug } from '@/features/diseases';
import { getDiseaseContent, DiseasePage } from '@/features/diseases/content';
import { getStoriesByDisease } from '@/features/stories/server/resolver';
import { getCareSummary } from '@/features/care-support';
import { isDnaDiseaseSupported } from '@/features/genetics/dna';

/**
 * Module 25.8 §25/§27: the disease registry is fully enumerable, so an unlisted
 * slug is unknown by definition. See the genetics tool route for the full
 * rationale; in short this turns a cacheable soft-404 into a real 404.
 */
export const dynamicParams = false;

/** Pre-render every disease × locale at build time (spec: dynamic, scalable). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DISEASES.map((disease) => ({ locale, slug: disease.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const disease = getDiseaseBySlug(slug);
  if (!disease) return {};
  const l = locale === 'ur' ? 'ur' : 'en';
  return { title: disease.name[l], description: disease.summary[l] };
}

/**
 * Disease route — a single reusable page that renders any disease from
 * structured data (Module 05). Content comes from the registry (Module 06);
 * until then the page renders metadata-derived sections and hides the rest.
 */
export default async function DiseaseRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const disease = getDiseaseBySlug(slug);
  if (!disease) notFound();

  const t = await getTranslations({ locale, namespace: 'DiseasePage' });
  const cat = await getTranslations({ locale, namespace: 'DiseaseLibrary' });

  // Care & Support summary (Module 14 §4/§5) — resolved + localized here so the
  // section streams with the page (the DiseasePage engine is synchronous).
  const care = getCareSummary(slug);
  let careSummary = null;
  if (care) {
    const careT = await getTranslations({ locale, namespace: 'CareSupport' });
    careSummary = {
      title: careT('title'),
      intro: careT('summary.intro', { count: care.count }),
      domains: care.domains.map((domain) => careT(`domains.${domain}`)),
      ctaLabel: careT('summary.cta'),
      diseaseSlug: slug,
    };
  }

  return (
    <DiseasePage
      disease={disease}
      content={getDiseaseContent(slug)}
      order={[...DISEASES]}
      locale={locale}
      t={t}
      cat={cat}
      stories={getStoriesByDisease(slug)}
      careSummary={careSummary}
      dnaSupported={isDnaDiseaseSupported(slug)}
    />
  );
}
