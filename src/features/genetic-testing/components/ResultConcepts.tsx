'use client';

import { useLocale, useTranslations } from 'next-intl';
import { FileSearch } from 'lucide-react';
import { RESULT_CONCEPTS } from '../data/resultConcepts';
import { getValidResultConcepts } from '../validate';
import { TestingReferences } from './TestingReferences';

type Locale = 'en' | 'ur';

/**
 * Understanding result concepts (spec §25–§28). Explains what a KIND of result
 * may and may not mean. It NEVER interprets an individual's actual report
 * (spec §28), reduces results to "positive = disease / negative = clear"
 * (spec §26), or classifies a variant of uncertain significance (spec §27).
 */
export function ResultConcepts() {
  const t = useTranslations('GeneticTesting');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const concepts = getValidResultConcepts(RESULT_CONCEPTS).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section aria-label={t('results.title')} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div>
        <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
          <FileSearch className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('results.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('results.intro')}</p>
      </div>

      <ul className="space-y-3">
        {concepts.map((concept) => (
          <li key={concept.id} className="rounded-xl border border-border bg-background/60 p-4">
            <p className="font-medium text-foreground">{concept.label[l]}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <p className="text-sm text-foreground/90">
                <span className="font-medium text-secondary">{t('results.mayMean')}:</span> {concept.whatItMeans[l]}
              </p>
              <p className="text-sm text-foreground/90">
                <span className="font-medium text-accent-strong">{t('results.doesNotMean')}:</span> {concept.whatItDoesNotMean[l]}
              </p>
            </div>
            <div className="mt-2">
              <TestingReferences ids={concept.referenceIds} />
            </div>
          </li>
        ))}
      </ul>

      <p className="rounded-lg border border-dashed border-border bg-background/60 p-3 text-xs text-muted-foreground">
        {t('results.disclaimer')}
      </p>
    </section>
  );
}
