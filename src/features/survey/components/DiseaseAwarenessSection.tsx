import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import type { LocalizedText } from '@/types';
import type { SurveyAggregateDataset, SurveyDiseaseId } from '../types';
import { buildAwarenessComparisonChart } from '../resolve';
import { SurveyChart } from './SurveyChart';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Disease awareness comparison (spec §32/§49). Compares the four conditions on
 * the SAME self-reported awareness scale — self-reported recognition, never
 * "medical knowledge" (spec §14). Uses sample language throughout.
 */
export function DiseaseAwarenessSection({
  dataset,
  locale,
  t,
}: {
  dataset: SurveyAggregateDataset;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const dual = (s: string): LocalizedText => ({ en: s, ur: s });

  const diseaseLabels = {} as Record<SurveyDiseaseId, LocalizedText>;
  for (const agg of dataset.diseaseAwarenessAggregates) {
    diseaseLabels[agg.diseaseId] = getDiseaseBySlug(agg.diseaseId)?.name ?? dual(agg.diseaseId);
  }

  const chart = buildAwarenessComparisonChart(dataset.diseaseAwarenessAggregates, diseaseLabels, {
    title: dual(t('awareness.chartTitle')),
    description: dual(t('awareness.chartDescription')),
    unit: dual('%'),
    sourceLabel: dual(t('awareness.sourceLabel')),
  });

  return (
    <section id="disease-awareness" aria-labelledby="awareness-heading" className="space-y-4 scroll-mt-24">
      <div>
        <h2 id="awareness-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('awareness.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('awareness.intro')}</p>
      </div>

      <SurveyChart chart={chart} locale={locale} t={t} />

      <ul className="space-y-2">
        {dataset.diseaseAwarenessAggregates.map((agg) => (
          <li key={agg.diseaseId} className="rounded-xl border border-border bg-surface/60 p-4 text-sm text-foreground/90">
            {agg.publicFinding[l]}
          </li>
        ))}
      </ul>
    </section>
  );
}
