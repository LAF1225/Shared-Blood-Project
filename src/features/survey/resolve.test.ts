import { describe, it, expect } from 'vitest';
import {
  getRenderableFindings,
  hasRenderableData,
  findingsForDatasetVersion,
  buildAwarenessComparisonChart,
  resolveCityAwareness,
} from './resolve';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from './preview/sampleDataset';
import { PUBLIC_DATASET, PUBLIC_FINDINGS } from './data/dataset';
import { SUPPRESSED, type SurveyDiseaseId } from './types';

const DISEASE_LABELS: Record<SurveyDiseaseId, { en: string; ur: string }> = {
  'beta-thalassemia': { en: 'Beta thalassemia', ur: 'بیٹا' },
  'cystic-fibrosis': { en: 'Cystic fibrosis', ur: 'سسٹک' },
  'lysosomal-storage-disorders': { en: 'LSDs', ur: 'ایل ایس ڈی' },
  'ehlers-danlos-syndrome': { en: 'EDS', ur: 'ای ڈی ایس' },
};

describe('Survey finding resolution (spec §44)', () => {
  it('only APPROVED_FOR_PUBLICATION findings render, sorted by displayOrder', () => {
    const rendered = getRenderableFindings(SAMPLE_FINDINGS);
    expect(rendered.every((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')).toBe(true);
    expect(rendered.some((f) => f.id === 'finding-draft-example')).toBe(false);
    const orders = rendered.map((f) => f.displayOrder);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('PRODUCTION data is empty → the public page has no renderable data (spec §69)', () => {
    expect(hasRenderableData(PUBLIC_DATASET, PUBLIC_FINDINGS)).toBe(false);
  });

  it('the synthetic sample has renderable data', () => {
    expect(hasRenderableData(SAMPLE_DATASET, SAMPLE_FINDINGS)).toBe(true);
  });

  it('findings are matched to their dataset version (spec §59)', () => {
    const matched = findingsForDatasetVersion(SAMPLE_FINDINGS, SAMPLE_DATASET);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.every((f) => f.datasetVersion === SAMPLE_DATASET.datasetVersion)).toBe(true);
  });

  it('the awareness comparison chart is ordered by "heard of" and keeps n', () => {
    const chart = buildAwarenessComparisonChart(
      SAMPLE_DATASET.diseaseAwarenessAggregates,
      DISEASE_LABELS,
      { title: { en: 't', ur: 't' }, description: { en: 'd', ur: 'd' }, unit: { en: '%', ur: '%' }, sourceLabel: { en: 's', ur: 's' } },
    );
    expect(chart.data[0].label.en).toBe('Beta thalassemia'); // highest heardOf
    expect(chart.data.at(-1)?.label.en).toBe('EDS'); // lowest heardOf
    expect(chart.validResponseCount).toBe(200);
  });

  it('a suppressed city cell stays suppressed and is never a number (spec §42)', () => {
    const beta = SAMPLE_DATASET.diseaseAwarenessAggregates.find((a) => a.diseaseId === 'beta-thalassemia')!;
    const cities = resolveCityAwareness(beta);
    const other = cities.find((c) => c.city === 'OTHER');
    expect(other?.value).toBe(SUPPRESSED);
    expect(typeof other?.value).toBe('string');
  });
});
