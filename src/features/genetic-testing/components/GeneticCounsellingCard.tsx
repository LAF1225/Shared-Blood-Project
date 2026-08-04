'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MessagesSquare, Check, X, Stethoscope } from 'lucide-react';
import { getProfessionalTypeRecord } from '@/features/early-signs/data/professionalTypes';
import { GENETIC_COUNSELLING } from '../data/counselling';
import { TestingReferences } from './TestingReferences';

type Locale = 'en' | 'ur';

/**
 * Genetic-counselling education card (spec §66). States plainly that counselling
 * supports understanding and is NON-DIRECTIVE — it does not make marriage or
 * reproductive decisions and never approves/rejects couples (spec §32/§66). The
 * "what it does not do" list is shown as prominently as "what it is".
 */
export function GeneticCounsellingCard() {
  const t = useTranslations('GeneticTesting');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const professionals = GENETIC_COUNSELLING.professionalTypeIds
    .map((id) => getProfessionalTypeRecord(id))
    .filter((r): r is NonNullable<typeof r> => r != null);

  return (
    <section aria-label={t('counselling.title')} className="space-y-5 rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <div>
        <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
          <MessagesSquare className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('counselling.title')}
        </h2>
        <p className="mt-2 leading-relaxed text-foreground/90">{GENETIC_COUNSELLING.whatItIs[l]}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary/25 bg-surface p-4">
          <p className="text-sm font-semibold text-foreground">{t('counselling.whatMayBeDiscussed')}</p>
          <ul className="mt-2 space-y-1.5">
            {GENETIC_COUNSELLING.whatMayBeDiscussed.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <span>{item[l]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-accent-strong/25 bg-surface p-4">
          <p className="text-sm font-semibold text-foreground">{t('counselling.whatItDoesNotDo')}</p>
          <ul className="mt-2 space-y-1.5">
            {GENETIC_COUNSELLING.whatItDoesNotDo.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
                <span>{item[l]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {professionals.length > 0 && (
        <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-foreground">{t('card.relevantProfessionals')}:</span>{' '}
          {professionals.map((p) => p.label[l]).join('، ')}
        </p>
      )}

      <TestingReferences ids={GENETIC_COUNSELLING.referenceIds} />
    </section>
  );
}
