import type { CommunityImpactSummary } from '../types';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Approved aggregate impact cards (spec §27/§36/§91). Every value is DERIVED from
 * approved completed records (the summary is validated against the records in
 * validate.ts) — never hand-typed. The card set deliberately excludes any
 * hypothetical "lives saved / diseases prevented" figure (spec §26). Recorded
 * participants are labelled as recorded (not "unique"), and booklets are shown as
 * a separate resource count from people reached (spec §15/§16).
 */
export function ImpactSummaryCards({
  summary,
  t,
}: {
  summary: CommunityImpactSummary;
  t: Translator;
}) {
  const cards: { value: number; label: string; note?: string }[] = [
    { value: summary.documentedActivityCount, label: t('metrics.documentedActivities') },
    {
      value: summary.recordedParticipantCount,
      label: t('metrics.recordedParticipants'),
      note: t('metrics.recordedNote'),
    },
    { value: summary.childcareWorkerCount, label: t('metrics.childcareWorkers') },
    { value: summary.structuredTrainingCompletionCount, label: t('metrics.trainingCompletions') },
    {
      value: summary.learningBookletsDistributed,
      label: t('metrics.learningBooklets'),
      note: t('metrics.bookletNote'),
    },
    { value: summary.cityCount, label: t('metrics.cities') },
  ];

  return (
    <section aria-labelledby="impact-heading" id="impact" className="space-y-4 scroll-mt-24">
      <div>
        <h2 id="impact-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('impact.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('impact.subtitle')}</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-surface p-5">
            <dd className="font-heading text-3xl font-semibold tracking-tight text-primary tabular-nums">
              {card.value}
            </dd>
            <dt className="mt-1 text-sm font-medium text-foreground">{card.label}</dt>
            {card.note && <p className="mt-1 text-xs text-muted-foreground">{card.note}</p>}
          </div>
        ))}
      </dl>
    </section>
  );
}
