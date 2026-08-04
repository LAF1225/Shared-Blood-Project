import type { LocalizedText } from '@/types';
import {
  SUPPRESSED,
  type ChartData,
  type DiseaseAwarenessAggregate,
  type SurveyAggregateDataset,
  type SurveyCity,
  type SurveyDiseaseId,
  type SurveyFindingRecord,
  type SurveyQuestionAggregate,
  type Suppressible,
} from './types';
import { isValidFinding, isValidDataset } from './validate';

/**
 * Client-safe resolution of approved survey data (spec §44/§66). Pure and
 * framework-free so finding/chart resolution is independently testable from
 * presentation (spec §72). It never computes findings from raw data (spec §35);
 * it only selects, orders, and shapes already-approved aggregates for rendering.
 */

/**
 * Only findings that are VALID and APPROVED_FOR_PUBLICATION render (spec §44),
 * sorted by displayOrder. Draft / data-verified / interpretation-reviewed
 * findings are never shown.
 */
export function getRenderableFindings(
  findings: readonly SurveyFindingRecord[],
): SurveyFindingRecord[] {
  return findings
    .filter((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION' && isValidFinding(f))
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Whether the public page has real, renderable data. When false, the page shows
 * the §69 "findings are being prepared" state instead of any statistics.
 */
export function hasRenderableData(
  dataset: SurveyAggregateDataset | null,
  findings: readonly SurveyFindingRecord[],
): boolean {
  if (!dataset || !isValidDataset(dataset)) return false;
  return getRenderableFindings(findings).length > 0;
}

/** Findings whose datasetVersion matches the dataset (version traceability §59). */
export function findingsForDatasetVersion(
  findings: readonly SurveyFindingRecord[],
  dataset: SurveyAggregateDataset,
): SurveyFindingRecord[] {
  return getRenderableFindings(findings).filter((f) => f.datasetVersion === dataset.datasetVersion);
}

/**
 * Build an accessible "heard of" comparison chart across diseases (spec §32/§46/
 * §47). Suppressed values pass through as SUPPRESSED and are surfaced as
 * "unavailable" by the chart, never as a number.
 */
export function buildAwarenessComparisonChart(
  aggregates: readonly DiseaseAwarenessAggregate[],
  diseaseLabels: Record<SurveyDiseaseId, LocalizedText>,
  labels: {
    title: LocalizedText;
    description: LocalizedText;
    unit: LocalizedText;
    sourceLabel: LocalizedText;
  },
): ChartData {
  return {
    chartType: 'HORIZONTAL_BAR',
    title: labels.title,
    description: labels.description,
    data: aggregates
      .slice()
      .sort((a, b) => visibleValue(b.heardOfPercentage) - visibleValue(a.heardOfPercentage))
      .map((agg) => ({ label: diseaseLabels[agg.diseaseId], value: agg.heardOfPercentage })),
    validResponseCount: aggregates[0]?.validResponseCount ?? 0,
    unit: labels.unit,
    sourceLabel: labels.sourceLabel,
    methodologyReference: 'methodology',
  };
}

/**
 * Build a 100% stacked distribution chart from a single question aggregate
 * (spec §46/§47), preserving suppressed cells.
 */
export function buildDistributionChart(
  aggregate: SurveyQuestionAggregate,
  optionLabels: Record<string, LocalizedText>,
  labels: {
    title: LocalizedText;
    description: LocalizedText;
    unit: LocalizedText;
    sourceLabel: LocalizedText;
  },
): ChartData {
  return {
    chartType: 'STACKED_100',
    title: labels.title,
    description: labels.description,
    data: Object.entries(aggregate.responsePercentages).map(([key, value]) => ({
      label: optionLabels[key] ?? { en: key, ur: key },
      value,
    })),
    validResponseCount: aggregate.validResponseCount,
    unit: labels.unit,
    sourceLabel: labels.sourceLabel,
    methodologyReference: 'methodology',
  };
}

/**
 * Per-city "heard of" values for one disease (spec §26/§34). Suppressed city
 * cells stay suppressed. Returns sample-scoped values only — never a claim about
 * a whole city population.
 */
export function resolveCityAwareness(
  aggregate: DiseaseAwarenessAggregate,
): { city: SurveyCity; value: Suppressible }[] {
  const breakdown = aggregate.cityBreakdown;
  if (!breakdown) return [];
  return (Object.keys(breakdown) as SurveyCity[]).map((city) => ({ city, value: breakdown[city]! }));
}

function visibleValue(value: Suppressible): number {
  return value === SUPPRESSED ? -1 : value;
}
