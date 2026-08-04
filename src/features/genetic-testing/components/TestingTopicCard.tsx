'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, HelpCircle, Stethoscope, Info } from 'lucide-react';
import { getProfessionalTypeRecord } from '@/features/early-signs/data/professionalTypes';
import type { GeneticTestingTopicRecord } from '../types';
import { TestingReferences } from './TestingReferences';

type Locale = 'en' | 'ur';

/**
 * A single testing-education topic card (spec §65). Presents balanced education —
 * what a kind of testing IS, why it MAY be discussed, and crucially what it CAN
 * and CANNOT tell you (spec §65) — plus questions and relevant professional
 * types. It carries NO personalized recommendation (spec §13/§65) and never
 * infers a user's risk or carrier status (spec §17).
 */
export function TestingTopicCard({ topic }: { topic: GeneticTestingTopicRecord }) {
  const t = useTranslations('GeneticTesting');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  const professionals = topic.professionalTypeIds
    .map((id) => getProfessionalTypeRecord(id))
    .filter((r): r is NonNullable<typeof r> => r != null);

  return (
    <article className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {t(`categories.${topic.testingCategory}`)}
          </span>
          {topic.lifeStageContexts.map((stage) => (
            <span key={stage} className="inline-flex rounded-full bg-muted/50 px-2 py-0.5 font-medium text-muted-foreground">
              {t(`lifeStages.${stage}`)}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">{topic.title[l]}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{topic.shortDescription[l]}</p>
      </header>

      {topic.contentNotice && (
        <p className="flex items-start gap-1.5 rounded-xl border border-accent-strong/25 bg-accent/5 p-3 text-sm text-foreground/90">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
          {topic.contentNotice[l]}
        </p>
      )}

      <div className="space-y-3">
        <Field label={t('card.whatItIs')}>{topic.whatItIs[l]}</Field>
        <Field label={t('card.whyItMayBeDiscussed')}>{topic.whyItMayBeDiscussed[l]}</Field>
      </div>

      {/* The core balanced pair: can tell / cannot tell (spec §65). */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary/25 bg-secondary/5 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
            {t('card.whatItCanTellYou')}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/85">{topic.whatItCanTellYou[l]}</p>
        </div>
        <div className="rounded-xl border border-accent-strong/25 bg-accent/5 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <XCircle className="h-4 w-4 text-accent-strong" aria-hidden="true" />
            {t('card.whatItCannotTellYou')}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/85">{topic.whatItCannotTellYou[l]}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t('card.beforeTesting')}>{topic.beforeTesting[l]}</Field>
        <Field label={t('card.afterTesting')}>{topic.afterTesting[l]}</Field>
      </div>

      {topic.questionsToAsk.length > 0 && (
        <div>
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('card.questionsToAsk')}
          </p>
          <ul className="mt-1.5 space-y-1.5">
            {topic.questionsToAsk.map((q, index) => (
              <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                <span>{q[l]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {professionals.length > 0 && (
        <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-foreground">{t('card.relevantProfessionals')}:</span>{' '}
          {professionals.map((p) => p.label[l]).join('، ')}
        </p>
      )}

      <TestingReferences ids={topic.referenceIds} />
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
