import type { LocalizedText } from '@/types';
import { SUPPRESSED, type AttitudeAggregate, type SurveyAggregateDataset, type Suppressible } from '../types';
import { buildDistributionChart } from '../resolve';
import { SurveyChart } from './SurveyChart';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Social attitudes, family influence, testing attitudes, and information sources
 * (spec §18/§19/§20/§21/§22/§23). Attitudes are shown multidimensionally as
 * agreement / neutral / disagreement — respondents are NEVER reduced to pro/anti
 * categories (spec §19). Sample language throughout; each finding is pre-reviewed.
 */
export function AttitudesSection({
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

  const infoSourceAgg = dataset.questionAggregates.find((q) => q.questionId === 'q-information-source');
  const infoSourceLabels: Record<string, LocalizedText> = {};
  if (infoSourceAgg) {
    for (const key of Object.keys(infoSourceAgg.responsePercentages)) {
      infoSourceLabels[key] = dual(t(`informationSources.${key}`));
    }
  }

  return (
    <section id="attitudes" aria-labelledby="attitudes-heading" className="space-y-5 scroll-mt-24">
      <div>
        <h2 id="attitudes-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('attitudes.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('attitudes.intro')}</p>
      </div>

      <ul className="space-y-4">
        {dataset.attitudeAggregates.map((agg) => (
          <li key={agg.questionId}>
            <AttitudeBar agg={agg} locale={locale} t={t} />
          </li>
        ))}
      </ul>

      {infoSourceAgg && (
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">{t('attitudes.sourcesTitle')}</h3>
          <SurveyChart
            chart={buildDistributionChart(infoSourceAgg, infoSourceLabels, {
              title: dual(t('attitudes.sourcesChartTitle')),
              description: dual(t('attitudes.sourcesChartDescription')),
              unit: dual('%'),
              sourceLabel: dual(t('awareness.sourceLabel')),
            })}
            locale={locale}
            t={t}
          />
          <p className="text-sm text-foreground/90">{infoSourceAgg.publicFinding[l]}</p>
        </div>
      )}
    </section>
  );
}

function AttitudeBar({ agg, locale, t }: { agg: AttitudeAggregate; locale: string; t: Translator }) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const fmt = (v: Suppressible) => (v === SUPPRESSED ? t('chart.suppressed') : `${v}%`);

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <Segment label={t('attitudes.agree')} value={fmt(agg.agreementPercentage)} tone="bg-secondary/15 text-foreground" />
        <Segment label={t('attitudes.neutral')} value={fmt(agg.neutralPercentage)} tone="bg-muted/40 text-muted-foreground" />
        <Segment label={t('attitudes.disagree')} value={fmt(agg.disagreementPercentage)} tone="bg-accent/10 text-foreground" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{agg.publicFinding[l]}</p>
    </div>
  );
}

function Segment({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-lg p-3 ${tone}`}>
      <p className="font-heading text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}
