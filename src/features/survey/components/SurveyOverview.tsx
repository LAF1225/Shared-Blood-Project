import { Info } from 'lucide-react';
import type { SurveyAggregateDataset } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Survey overview (spec §51) + representativeness disclaimer (spec §28/§60).
 * Shows purpose, and — when a dataset exists — the collection period, cities, and
 * total responses. The disclaimer makes clear that findings describe the people
 * who participated, not all of Pakistan or all residents of the surveyed cities.
 */
export function SurveyOverview({
  dataset,
  locale,
  t,
}: {
  dataset: SurveyAggregateDataset | null;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  return (
    <section aria-labelledby="overview-heading" id="overview" className="space-y-4 scroll-mt-24">
      <h2 id="overview-heading" className="font-heading text-2xl font-semibold text-foreground">
        {t('overview.title')}
      </h2>
      <p className="max-w-prose leading-relaxed text-foreground/90">{t('overview.purpose')}</p>

      {dataset && (
        <dl className="grid gap-4 rounded-2xl border border-border bg-surface/60 p-5 sm:grid-cols-3">
          <Stat label={t('overview.period')} value={`${dataset.collectionStartDate} – ${dataset.collectionEndDate}`} />
          <Stat label={t('overview.cities')} value={String(dataset.cities.length)} />
          <Stat label={t('overview.totalResponses')} value={String(dataset.totalResponses)} />
        </dl>
      )}

      {/* Representativeness disclaimer (spec §28/§60), always shown. */}
      <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-foreground/80">{t('overview.disclaimer')}</p>
      </div>

      {dataset && (
        <p className="text-sm text-muted-foreground">
          {t('overview.methodologySummary')}: {dataset.methodologySummary[l]}
        </p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-heading text-xl font-semibold text-foreground">{value}</dd>
    </div>
  );
}
