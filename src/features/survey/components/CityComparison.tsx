import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import type { LocalizedText } from '@/types';
import { SUPPRESSED, type SurveyAggregateDataset } from '../types';
import { resolveCityAwareness } from '../resolve';
import { SurveyChart } from './SurveyChart';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * City comparison (spec §26/§34). Compares SURVEYED SAMPLES across cities using
 * sample language ("Among respondents surveyed in Lahore…") — it never ranks
 * cities as ignorant or least educated, and never claims anything about a whole
 * city population (spec §26). Suppressed small-sample city cells show as "not
 * shown" (spec §42). City comparison does not dominate the page (spec §48).
 */
export function CityComparison({
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

  // Use the first disease that carries a city breakdown as the illustrative view.
  const withBreakdown = dataset.diseaseAwarenessAggregates.find((a) => a.cityBreakdown);
  if (!withBreakdown) return null;

  const rows = resolveCityAwareness(withBreakdown);
  const diseaseName = getDiseaseBySlug(withBreakdown.diseaseId)?.name[l] ?? withBreakdown.diseaseId;

  const chart = {
    chartType: 'HORIZONTAL_BAR' as const,
    title: dual(t('city.chartTitle', { disease: diseaseName })),
    description: dual(t('city.chartDescription')),
    data: rows.map((r) => ({ label: dual(t(`cities.${r.city}`)), value: r.value })),
    validResponseCount: withBreakdown.validResponseCount,
    unit: dual('%'),
    sourceLabel: dual(t('awareness.sourceLabel')),
    methodologyReference: 'methodology',
    limitationNote: dual(t('city.limitation')),
  };

  return (
    <section id="city-comparison" aria-labelledby="city-heading" className="space-y-4 scroll-mt-24">
      <div>
        <h2 id="city-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('city.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('city.intro')}</p>
      </div>
      <SurveyChart chart={chart} locale={locale} t={t} />
      {rows.some((r) => r.value === SUPPRESSED) && (
        <p className="text-xs text-muted-foreground">{t('city.suppressionNote')}</p>
      )}
    </section>
  );
}
