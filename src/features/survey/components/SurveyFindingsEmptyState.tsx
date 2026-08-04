import { ClipboardCheck } from 'lucide-react';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Empty state shown when no APPROVED findings exist (spec §69). It explains that
 * findings are being prepared and reviewed before aggregate publication — it
 * NEVER renders draft statistics or invents replacement numbers (spec §69). This
 * is the correct, honest public output until a real survey has been collected,
 * cleaned offline, aggregated, and approved.
 */
export function SurveyFindingsEmptyState({ t }: { t: Translator }) {
  return (
    <section aria-labelledby="findings-pending-heading" className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center">
      <ClipboardCheck className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
      <h2 id="findings-pending-heading" className="mt-3 font-heading text-xl font-semibold text-foreground">
        {t('empty.title')}
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{t('empty.body')}</p>
    </section>
  );
}
