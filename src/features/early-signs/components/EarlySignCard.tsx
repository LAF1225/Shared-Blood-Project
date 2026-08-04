'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Eye, AlertTriangle } from 'lucide-react';
import type { EarlySignRecord } from '../types';
import { getProfessionalTypeRecord } from '../data/professionalTypes';
import { UrgencyBadge } from './UrgencyBadge';

type Locale = 'en' | 'ur';

/**
 * A single early-sign card (spec §23). Uses understandable observation language
 * (spec §12/§24) and pairs "What you may notice" with the core "What not to
 * assume" field (spec §16). It is educational only — it never matches a disease,
 * scores, or diagnoses (spec §2/§17), and it does not repeat the full disease
 * write-up (spec §23).
 */
export function EarlySignCard({ sign }: { sign: EarlySignRecord }) {
  const t = useTranslations('EarlySigns');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <article className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">{sign.title[l]}</h3>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
              {t(`categories.${sign.observationCategory}`)}
            </span>
            {sign.ageContexts.map((age) => (
              <span key={age} className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
                {t(`ages.${age}`)}
              </span>
            ))}
            <span className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
              {t(`patterns.${sign.patternType}`)}
            </span>
          </div>
        </div>
        <UrgencyBadge urgency={sign.urgencyContext} />
      </div>

      <p className="leading-relaxed text-foreground/90">{sign.description[l]}</p>

      <div className="rounded-xl border border-border bg-background p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('card.whatYouMayNotice')}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/85">{sign.caregiverObservation[l]}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sign.whatToNotice[l]}</p>
      </div>

      {/* Core educational feature (spec §16). */}
      <div className="rounded-xl border border-accent-strong/25 bg-accent/5 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4 text-accent-strong" aria-hidden="true" />
          {t('card.whatNotToAssume')}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground/85">{sign.whatNotToAssume[l]}</p>
      </div>

      {sign.clinicalContext && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">{t('card.clinicalContext')}:</span> {sign.clinicalContext[l]}
        </p>
      )}

      {sign.suggestedProfessionalTypes.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{t('card.whoMayHelp')}:</span>{' '}
          {sign.suggestedProfessionalTypes
            .map((type) => getProfessionalTypeRecord(type)?.label[l] ?? type)
            .join('، ')}
        </p>
      )}
    </article>
  );
}
