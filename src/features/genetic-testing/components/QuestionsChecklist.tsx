'use client';

import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';

/**
 * Questions checklists (spec §47/§48/§54): questions before testing, after
 * testing, and to ask a testing provider. These are conversation prompts to take
 * to a professional — Shared Blood does not answer them for the user (spec §48),
 * and never evaluates a specific laboratory (spec §54).
 */
export function QuestionsChecklist() {
  const t = useTranslations('GeneticTesting');

  const groups: { key: string; items: string[] }[] = [
    {
      key: 'before',
      items: ['q1', 'q2', 'q3', 'q4', 'q5'].map((q) => t(`questions.before.${q}`)),
    },
    {
      key: 'after',
      items: ['q1', 'q2', 'q3', 'q4'].map((q) => t(`questions.after.${q}`)),
    },
    {
      key: 'provider',
      items: ['q1', 'q2', 'q3', 'q4', 'q5'].map((q) => t(`questions.provider.${q}`)),
    },
  ];

  return (
    <section aria-label={t('questions.title')} className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
        <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        {t('questions.title')}
      </h2>
      <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('questions.intro')}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.key} className="rounded-xl border border-border bg-background/60 p-4">
            <p className="text-sm font-semibold text-foreground">{t(`questions.${group.key}Title`)}</p>
            <ul className="mt-2 space-y-1.5">
              {group.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
