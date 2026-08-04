'use client';

import { useTranslations } from 'next-intl';
import { Printer, ClipboardList } from 'lucide-react';

/**
 * Generic printable appointment-preparation guide (spec §43/§44/§45).
 *
 * CRITICAL: this is a GENERIC template. It must NOT automatically contain a
 * child's name, diagnosis, genetic status, calculator results, or family
 * relationship data (spec §44). Nothing is persisted or generated server-side
 * (spec §45/§73) — the caregiver completes it offline. The prompts are static,
 * localized educational headings only.
 */
export function AppointmentGuide() {
  const t = useTranslations('CareSupport');

  const prompts: string[] = [
    t('appointment.changes'),
    t('appointment.questions'),
    t('appointment.medicines'),
    t('appointment.recentVisits'),
    t('appointment.observations'),
    t('appointment.nextSteps'),
  ];

  return (
    <section aria-label={t('appointment.title')} className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
            <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
            {t('appointment.title')}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('appointment.intro')}</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 print:hidden"
        >
          <Printer className="h-4 w-4 text-primary" aria-hidden="true" />
          {t('appointment.print')}
        </button>
      </div>

      <p className="mt-3 rounded-lg border border-dashed border-border bg-background/60 p-3 text-xs text-muted-foreground">
        {t('appointment.privacyNote')}
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
