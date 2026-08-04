import { describe, it, expect } from 'vitest';
import {
  getDatasetErrors,
  isValidDataset,
  getRenderableDataset,
  getQuestionAggregateErrors,
  getFindingErrors,
  isValidFinding,
} from './validate';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from './preview/sampleDataset';
import { SUPPRESSED, type SurveyQuestionAggregate } from './types';

describe('Aggregate validation (spec §62/§63)', () => {
  it('the synthetic sample dataset is internally consistent and valid', () => {
    expect(getDatasetErrors(SAMPLE_DATASET)).toEqual([]);
    expect(isValidDataset(SAMPLE_DATASET)).toBe(true);
  });

  it('getRenderableDataset returns null for a null dataset', () => {
    expect(getRenderableDataset(null)).toBeNull();
  });

  it('a single-response aggregate whose counts do not sum to n is invalid (spec §63)', () => {
    const bad: SurveyQuestionAggregate = {
      questionId: 'x',
      validResponseCount: 200,
      missingResponseCount: 0,
      responseCounts: { A: 60, B: 100 }, // sums to 160, not 200
      responsePercentages: { A: 30, B: 50 },
      publicFinding: { en: 'x', ur: 'x' },
    };
    expect(getQuestionAggregateErrors(bad)).toContain('counts do not sum to validResponseCount');
  });

  it('a multi-response aggregate is exempt from the exact-sum rule (spec §10)', () => {
    const multi: SurveyQuestionAggregate = {
      questionId: 'x',
      validResponseCount: 200,
      missingResponseCount: 0,
      isMultiResponse: true,
      responseCounts: { A: 150, B: 110, C: 90 }, // sums to 350 > 200, allowed
      responsePercentages: { A: 75, B: 55, C: 45 },
      publicFinding: { en: 'x', ur: 'x' },
    };
    expect(getQuestionAggregateErrors(multi)).toEqual([]);
  });

  it('a percentage that does not match its count is invalid (spec §63)', () => {
    const bad: SurveyQuestionAggregate = {
      questionId: 'x',
      validResponseCount: 200,
      missingResponseCount: 0,
      responseCounts: { A: 60, B: 140 },
      responsePercentages: { A: 99, B: 70 }, // A should be 30
      publicFinding: { en: 'x', ur: 'x' },
    };
    expect(getQuestionAggregateErrors(bad)).toContain('percentages inconsistent');
  });

  it('suppression must align across counts and percentages (spec §42)', () => {
    const leaky: SurveyQuestionAggregate = {
      questionId: 'x',
      validResponseCount: 200,
      missingResponseCount: 0,
      responseCounts: { A: 197, B: SUPPRESSED }, // B suppressed in counts…
      responsePercentages: { A: 98.5, B: 1.5 }, // …but visible in percentages → leak
      publicFinding: { en: 'x', ur: 'x' },
    };
    expect(getQuestionAggregateErrors(leaky)).toContain('suppression misaligned');
  });

  it('a finding missing its methodology reference is invalid (spec §45)', () => {
    const good = SAMPLE_FINDINGS[0];
    expect(isValidFinding(good)).toBe(true);
    expect(getFindingErrors({ ...good, referenceToMethodology: '' })).toContain('missing methodology reference');
  });
});
