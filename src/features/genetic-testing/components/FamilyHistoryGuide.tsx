'use client';

import { useTranslations } from 'next-intl';
import { Printer, ClipboardList } from 'lucide-react';

/**
 * Generic printable Family History Preparation Guide (spec §44/§45).
 *
 * CRITICAL: this is a GENERIC template with blank prompts. It must NOT
 * automatically include calculator results, relationship selections, disease
 * selections, identity, or genetic status (spec §45). Nothing is submitted to or
 * stored by Shared Blood, and there is NO pedigree builder (spec §42/§43) — the
 * user completes it privately and offline. The prompts are static educational
 * headings only.
 */
export function FamilyHistoryGuide() {
  const t = useTranslations('GeneticTesting');

  const prompts: string[] = [
    t('familyGuide.diagnosed'),
    t('familyGuide.carrierStatus'),
    t('familyGuide.repeatedConcerns'),
    t('familyGuide.sharedAncestry'),
    t('familyGuide.previousReports'),
    t('familyGuide.questions'),
  ];

  return (
    <section aria-label={t('familyGuide.title')} className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
            <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
            {t('familyGuide.title')}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('familyGuide.intro')}</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 print:hidden"
        >
          <Printer className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('familyGuide.print')}
        </button>
      </div>

      <p className="mt-3 rounded-lg border border-dashed border-border bg-background/60 p-3 text-xs text-muted-foreground">
        {t('familyGuide.privacyNote')}
      </p>

      <ol className="mt-5 space-y-5">
        {prompts.map((prompt, index) => (
          <li key={index}>
            <p className="text-sm font-medium text-foreground">
              {index + 1}. {prompt}
            </p>
            <div className="mt-2 space-y-3" aria-hidden="true">
              <div className="h-px w-full bg-border" />
              <div className="h-px w-full bg-border" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
