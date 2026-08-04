import { describe, it, expect } from 'vitest';
import {
  getPriorityErrors,
  getRecommendationErrors,
  getBriefErrors,
  getDatasetErrors,
  isValidDataset,
  priorityRenders,
  getRenderableDataset,
} from './validate';
import { SAMPLE_POLICY_DATASET } from './preview/sampleDataset';
import { PUBLIC_POLICY_DATASET } from './data/dataset';

const ds = SAMPLE_POLICY_DATASET;
const priorityOf = (id: string) => ds.advocacyPriorities.find((p) => p.id === id)!;
const recOf = (id: string) => ds.recommendations.find((r) => r.id === id)!;

describe('policy validation (spec §114)', () => {
  it('the sample dataset is valid', () => {
    expect(getDatasetErrors(ds)).toEqual([]);
    expect(isValidDataset(ds)).toBe(true);
  });

  it('requires the "What This Advocacy Does Not Claim" boundary (spec §25/§72)', () => {
    const p = { ...priorityOf('ap-carrier-awareness'), doesNotClaim: { en: '', ur: '' } };
    expect(getPriorityErrors(p, ds)).toContain('missing doesNotClaim (spec §25/§72)');
  });

  it('rejects a priority that cites no evidence (spec §18)', () => {
    const p = { ...priorityOf('ap-carrier-awareness'), evidenceLinkIds: [] };
    expect(getPriorityErrors(p, ds)).toContain('priority cites no evidence (spec §18)');
  });

  it('blocks a source-free recommendation (spec §75)', () => {
    const r = { ...recOf('rec-carrier'), evidenceLinkIds: [] };
    expect(getRecommendationErrors(r, ds)).toContain('source-free recommendation (spec §75)');
  });

  it('rejects a priority whose evidence does not resolve (spec §16)', () => {
    const p = { ...priorityOf('ap-carrier-awareness'), evidenceLinkIds: ['el-nonexistent'] };
    expect(getPriorityErrors(p, ds)).toContain('priority evidence does not resolve (spec §16)');
  });

  it('requires a brief version (spec §85)', () => {
    const priorityIds = new Set(ds.advocacyPriorities.map((p) => p.id));
    const b = { ...ds.briefs[0], version: '' };
    expect(getBriefErrors(b, priorityIds)).toContain('missing version (spec §85)');
  });

  it('a draft priority never renders (spec §88)', () => {
    expect(priorityRenders(priorityOf('ap-draft'), ds)).toBe(false);
    expect(priorityRenders(priorityOf('ap-carrier-awareness'), ds)).toBe(true);
  });

  it('getRenderableDataset returns null for the empty production dataset', () => {
    expect(getRenderableDataset(PUBLIC_POLICY_DATASET)).toBeNull();
  });
});
