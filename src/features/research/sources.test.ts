import { describe, it, expect } from 'vitest';
import { resolveFindingSources, areSourcesResolvable, datasetVersionFor } from './sources';
import { SAMPLE_RESEARCH_DATASET } from './preview/sampleDataset';
import type { ResearchFinding } from './types';

const registry = SAMPLE_RESEARCH_DATASET.sourceRegistry;
const find = (id: string) => SAMPLE_RESEARCH_DATASET.findings.find((f) => f.id === id)!;

/** Build a bare finding for negative tests. */
function bareFinding(over: Partial<ResearchFinding>): ResearchFinding {
  return { ...find('rf-awareness-gap'), ...over } as ResearchFinding;
}

describe('FindingSourceResolver (spec §9/§10)', () => {
  it('resolves every sample finding against the approved registry', () => {
    for (const f of SAMPLE_RESEARCH_DATASET.findings) {
      expect(resolveFindingSources(f, registry).ok).toBe(true);
    }
  });

  it('rejects a source-free finding (spec §9)', () => {
    const f = bareFinding({
      sourceDatasetIds: [],
      sourceSurveyFindingIds: [],
      sourceFieldActivityIds: [],
      sourceFieldObservationIds: [],
      sourceAssessmentAggregateIds: [],
      sourceCommunityFindingIds: [],
      referenceIds: [],
    });
    const res = resolveFindingSources(f, registry);
    expect(res.ok).toBe(false);
    expect(res.reasons).toContain('source-free finding');
  });

  it('rejects a finding referencing an unresolved source id (spec §10)', () => {
    const f = bareFinding({ sourceSurveyFindingIds: ['finding-does-not-exist'], sourceDatasetIds: [] });
    const res = resolveFindingSources(f, registry);
    expect(res.ok).toBe(false);
    expect(res.missing).toContain('finding-does-not-exist');
  });

  it('requires an evidence-consistent source (a SURVEY_DATA finding needs a survey source, spec §6)', () => {
    const f = bareFinding({
      evidenceType: 'SURVEY_DATA',
      sourceDatasetIds: [],
      sourceSurveyFindingIds: [],
      sourceFieldActivityIds: ['activity-childcare-training-1'],
    });
    expect(resolveFindingSources(f, registry).ok).toBe(false);
  });

  it('requires MIXED_EVIDENCE to retain at least two source categories (spec §20)', () => {
    const oneCategory = bareFinding({
      evidenceType: 'MIXED_EVIDENCE',
      sourceDatasetIds: [],
      sourceSurveyFindingIds: ['finding-awareness-gap'],
      sourceFieldActivityIds: [],
      sourceFieldObservationIds: [],
      sourceAssessmentAggregateIds: [],
      sourceCommunityFindingIds: [],
      referenceIds: [],
    });
    expect(resolveFindingSources(oneCategory, registry).ok).toBe(false);
    // The real mixed finding keeps two distinct categories.
    expect(areSourcesResolvable(find('rf-mixed'), registry)).toBe(true);
  });

  it('requires a literature finding to cite a Module 07 reference (spec §18)', () => {
    const f = bareFinding({ evidenceType: 'LITERATURE_SOURCE', referenceIds: [], sourceDatasetIds: ['sample-what-pakistan-knows'], sourceSurveyFindingIds: [] });
    expect(resolveFindingSources(f, registry).ok).toBe(false);
    expect(areSourcesResolvable(find('rf-literature-context'), registry)).toBe(true);
  });

  it('exposes the exact approved dataset version (spec §65)', () => {
    expect(datasetVersionFor(registry, 'sample-what-pakistan-knows')).toBe('sample-v1');
    expect(datasetVersionFor(registry, 'community-sample')).toBe('sample-2026.1');
    expect(datasetVersionFor(registry, 'unknown')).toBeNull();
  });
});
