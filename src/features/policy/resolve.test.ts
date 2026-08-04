import { describe, it, expect } from 'vitest';
import {
  getRenderablePriorities,
  getFeaturedPriorities,
  getPriorityById,
  filterPriorities,
  getPriorityIssues,
  getPriorityRecommendations,
  getPriorityEvidenceLinks,
  getInheritedResearchBoundaries,
  getPriorityLimitations,
  getPriorityTrace,
  getRenderableBriefs,
  getBriefById,
  getBriefDownloads,
  getEvidenceTypesInUse,
} from './resolve';
import { SAMPLE_POLICY_DATASET } from './preview/sampleDataset';

const ds = SAMPLE_POLICY_DATASET;
const priorityOf = (id: string) => ds.advocacyPriorities.find((p) => p.id === id)!;

describe('policy resolution (spec §88/§107)', () => {
  it('renders only approved priorities, excluding drafts (spec §88)', () => {
    const ids = getRenderablePriorities(ds).map((p) => p.id);
    expect(ids).not.toContain('ap-draft');
    expect(ids).toContain('ap-carrier-awareness');
    expect(getRenderablePriorities(ds).length).toBe(7);
  });

  it('orders featured priorities by featuredOrder (spec §70)', () => {
    expect(getFeaturedPriorities(ds).map((p) => p.id)).toEqual([
      'ap-carrier-awareness',
      'ap-testing-education',
      'ap-childcare-training',
      'ap-community-education',
    ]);
  });

  it('never resolves a draft priority by id', () => {
    expect(getPriorityById(ds, 'ap-draft')).toBeNull();
    expect(getPriorityById(ds, 'ap-carrier-awareness')?.id).toBe('ap-carrier-awareness');
  });

  it('filters by domain, priority type, and year (spec §108)', () => {
    const all = getRenderablePriorities(ds);
    expect(filterPriorities(all, { priorityType: 'CARRIER_AWARENESS' }).map((p) => p.id)).toEqual(['ap-carrier-awareness']);
    expect(filterPriorities(all, { domain: 'LANGUAGE_ACCESSIBILITY' }).map((p) => p.id)).toEqual(['ap-urdu-resources']);
    expect(filterPriorities(all, { year: '2099' }).length).toBe(0);
  });

  it('resolves a priority\'s issues, recommendations, and evidence links', () => {
    const p = priorityOf('ap-carrier-awareness');
    expect(getPriorityIssues(ds, p).map((i) => i.id)).toContain('pi-carrier-gap');
    expect(getPriorityRecommendations(ds, p).map((r) => r.id)).toContain('rec-carrier');
    expect(getPriorityEvidenceLinks(ds, p).map((l) => l.id)).toContain('el-carrier-primary');
  });

  it('inherits the Module 18 research boundary for a cited finding (spec §99)', () => {
    const boundaries = getInheritedResearchBoundaries(ds, priorityOf('ap-carrier-awareness'));
    expect(boundaries.map((b) => b.findingId)).toContain('rf-awareness-gap');
    expect(boundaries.map((b) => b.doesNotShow.en).join(' ').toLowerCase())
      .toMatch(/does not estimate awareness across the pakistani population/);
  });

  it('surfaces required limitations with a priority, severity-sorted (spec §77)', () => {
    const lims = getPriorityLimitations(ds, priorityOf('ap-carrier-awareness'));
    expect(lims.map((l) => l.id)).toContain('pl-convenience');
    expect(lims[0].severity).toBe('HIGH');
  });

  it('provides backward traceability to research findings and briefs (spec §74)', () => {
    const trace = getPriorityTrace(ds, priorityOf('ap-carrier-awareness'))!;
    expect(trace.researchFindingIds).toContain('rf-awareness-gap');
    expect(trace.briefIds).toContain('brief-carrier');
  });

  it('resolves briefs and their version-matched downloads (spec §83)', () => {
    expect(getRenderableBriefs(ds).map((b) => b.id)).toContain('brief-carrier');
    const brief = getBriefById(ds, 'brief-carrier')!;
    expect(getBriefDownloads(ds, brief).map((d) => d.id)).toEqual(['dl-carrier-pdf']);
    expect(getBriefDownloads(ds, { ...brief, version: '9.9' })).toHaveLength(0);
  });

  it('reports the evidence types in use for "Evidence Behind Our Advocacy" (spec §73)', () => {
    const types = getEvidenceTypesInUse(ds);
    expect(types).toContain('RESEARCH_FINDING');
    expect(types).toContain('LITERATURE_SOURCE');
    expect(types).toContain('FIELD_OBSERVATION');
    expect(types).toContain('FIELDWORK_METRIC');
    expect(types).toContain('TRAINING_ASSESSMENT');
  });
});
