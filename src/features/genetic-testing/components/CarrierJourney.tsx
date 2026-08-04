'use client';

import { useTranslations } from 'next-intl';
import { Route } from 'lucide-react';

/**
 * The carrier-testing learning journey (spec §46):
 * What Is a Carrier? → How Autosomal Recessive Inheritance Works → Why Two
 * Carrier Parents Matter → What Carrier Testing May Examine → What a Result May
 * and May Not Mean → Questions to Ask Before Testing → Genetic Counselling.
 *
 * A flexible educational path — not a gated flow and not a personal assessment.
 */
export function CarrierJourney() {
  const t = useTranslations('GeneticTesting');
  const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'] as const;

  return (
    <section aria-label={t('journey.title')} className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
        <Route className="h-5 w-5 text-primary" aria-hidden="true" />
        {t('journey.title')}
      </h2>
      <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('journey.intro')}</p>
      <ol className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3 rounded-lg border border-border bg-background/60 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{t(`journey.${step}`)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
