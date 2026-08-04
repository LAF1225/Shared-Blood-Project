import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionContainer } from '@/components/layout';
import { EducationalCallout } from '@/features/diseases/content/components/Section';

/**
 * About Shared Blood (Module 24 §62 — ACTIVE_STATIC).
 *
 * Substantive, truthful project information only: what Shared Blood is, its
 * educational mission, its approach, and what it is NOT. It invents no
 * partnerships, endorsements, medical validation, or research affiliations
 * (§62), and reaffirms the not-medical-advice boundary (Module 20).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('title'), description: t('intro') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });

  const sections = ['mission', 'approach', 'notWhat'] as const;

  return (
    <SectionContainer>
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="space-y-3">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('intro')}</p>
        </header>

        {sections.map((id) => (
          <section key={id} className="space-y-2">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {t(`${id}.heading`)}
            </h2>
            <p className="leading-relaxed text-foreground/90">{t(`${id}.body`)}</p>
          </section>
        ))}

        <EducationalCallout title={t('disclaimer.heading')}>
          {t('disclaimer.body')}
        </EducationalCallout>
      </div>
    </SectionContainer>
  );
}
