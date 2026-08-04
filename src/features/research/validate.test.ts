import { describe, it, expect } from 'vitest';
import {
  getFindingErrors,
  isValidDataset,
  getDatasetErrors,
  findingRenders,
  getReportErrors,
  getRenderableDataset,
} from './validate';
import { SAMPLE_RESEARCH_DATASET } from './preview/sampleDataset';
import { PUBLIC_RESEARCH_DATASET } from './data/dataset';

const registry = SAMPLE_RESEARCH_DATASET.sourceRegistry;
const find = (id: string) => SAMPLE_RESEARCH_DATASET.findings.find((f) => f.id === id)!;

describe('research validation (spec §112)', () => {
  it('the sample dataset is valid', () => {
    expect(getDatasetErrors(SAMPLE_RESEARCH_DATASET)).toEqual([]);
    expect(isValidDataset(SAMPLE_RESEARCH_DATASET)).toBe(true);
  });

  it('requires a "What This Does Not Show" boundary (spec §73)', () => {
    const f = { ...find('rf-awareness-gap'), interpretation: { ...find('rf-awareness-gap').interpretation, doesNotShow: { en: '', ur: '' } } };
    expect(getFindingErrors(f, registry)).toContain('missing doesNotShow (spec §73)');
  });

  it('rejects an inconsistent statistic (spec §26/§27)', () => {
    const base = find('rf-awareness-gap');
    const f = { ...base, statistic: { ...base.statistic!, value: 42 } };
    expect(getFindingErrors(f, registry)).toContain('inconsistent statistic');
  });

  it('rejects a cross-sectional TREND_FINDING (spec §38/§39)', () => {
    const f = { ...find('rf-awareness-gap'), findingType: 'TREND_FINDING' as const };
    expect(getFindingErrors(f, registry)).toContain('cross-sectional data cannot be a TREND_FINDING (spec §38/§39)');
  });

  it('requires a report version and linked methodology (spec §64/§88)', () => {
    const report = SAMPLE_RESEARCH_DATASET.reports[0];
    const findingIds = new Set(SAMPLE_RESEARCH_DATASET.findings.map((f) => f.id));
    expect(getReportErrors({ ...report, reportVersion: '' }, findingIds)).toContain('missing reportVersion (spec §64)');
    expect(getReportErrors({ ...report, methodologyIds: [] }, findingIds)).toContain('report must link methodology (spec §88)');
  });

  it('a draft finding never renders (spec §61)', () => {
    expect(findingRenders(find('rf-draft'), registry)).toBe(false);
    expect(findingRenders(find('rf-awareness-gap'), registry)).toBe(true);
  });

  it('getRenderableDataset returns null for the empty production dataset', () => {
    expect(getRenderableDataset(PUBLIC_RESEARCH_DATASET)).toBeNull();
  });
});
