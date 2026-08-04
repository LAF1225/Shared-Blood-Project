'use client';

import { useTranslations } from 'next-intl';
import { Scale } from 'lucide-react';
import { TestingReferences } from './TestingReferences';

/**
 * Screening vs diagnostic testing (spec §37/§38) — a core educational feature.
 * Explains that screening estimates whether there MAY be an increased chance of
 * a condition, while diagnostic testing is used to determine whether a specific
 * condition is present. Exact meaning varies by test (spec §38). Referenced.
 */
export function ScreeningVsDiagnostic() {
  const t = useTranslations('GeneticTesting');

  return (
    <section aria-label={t('screening.title')} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div>
        <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
          <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('screening.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('screening.intro')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="font-heading font-semibold text-foreground">{t('screening.screeningTitle')}</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t('screening.screeningBody')}</p>
        </div>
        <div className="rounded-xl border border-secondary/25 bg-secondary/5 p-4">
          <p className="font-heading font-semibold text-foreground">{t('screening.diagnosticTitle')}</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t('screening.diagnosticBody')}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{t('screening.note')}</p>
      <TestingReferences ids={['nhs-screening-vs-diagnostic', 'medlineplus-genetic-testing']} />
    </section>
  );
}
