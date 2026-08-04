import { describe, it, expect } from 'vitest';
import {
  computePercentage,
  roundTo,
  roundPercentage,
  roundMean,
  isStatisticConsistent,
  comparisonDifference,
  scoreChange,
} from './statistics';
import { SAMPLE_RESEARCH_DATASET } from './preview/sampleDataset';
import type { ResearchRoundingPolicy } from './types';

const policy: ResearchRoundingPolicy = {
  id: 'rp',
  wholePercentageDecimals: 0,
  precisionPercentageDecimals: 1,
  meanScoreDecimals: 1,
};

describe('research statistics (spec §27/§28/§31)', () => {
  it('computes a simple percentage over valid responses (spec §28)', () => {
    expect(computePercentage(180, 200)).toBe(90);
    expect(computePercentage(160, 200)).toBe(80);
  });

  it('throws on an invalid denominator instead of substituting (spec §111)', () => {
    expect(() => computePercentage(5, 0)).toThrow();
    expect(() => computePercentage(-1, 10)).toThrow();
  });

  it('rounds display values without a universal decimal count (spec §31)', () => {
    expect(roundTo(66.666, 1)).toBe(66.7);
    expect(roundPercentage(66.666, policy)).toBe(67); // whole
    expect(roundPercentage(66.666, policy, true)).toBe(66.7); // precision-relevant
    expect(roundMean(4.25, policy)).toBe(4.3);
  });

  it('validates statistic consistency against numerator/denominator (spec §26)', () => {
    const stat = SAMPLE_RESEARCH_DATASET.findings.find((f) => f.id === 'rf-awareness-gap')!.statistic!;
    expect(isStatisticConsistent(stat)).toBe(true);
    expect(isStatisticConsistent({ ...stat, value: 40 })).toBe(false); // 180/200 ≠ 40%
  });

  it('produces descriptive differences, never significance (spec §34/§40)', () => {
    expect(comparisonDifference(40, 52)).toEqual({ absoluteDifference: -12, percentagePointDifference: -12 });
    expect(scoreChange(4.2, 7.8)).toBe(3.6);
  });
});
