import { describe, it, expect } from 'vitest';
import { resolveEvidenceLink, linkResolves, getResearchBoundary } from './evidence';
import { SAMPLE_POLICY_DATASET } from './preview/sampleDataset';
import type { PolicyEvidenceLink } from './types';

const registry = SAMPLE_POLICY_DATASET.evidenceRegistry;
const linkOf = (id: string) => SAMPLE_POLICY_DATASET.evidenceLinks.find((l) => l.id === id)!;

describe('PolicyEvidenceResolver (spec §16/§17)', () => {
  it('resolves every sample evidence link against the approved registry', () => {
    for (const link of SAMPLE_POLICY_DATASET.evidenceLinks) {
      expect(resolveEvidenceLink(link, registry).ok).toBe(true);
    }
  });

  it('rejects a link whose source id is not in the approved registry (spec §16)', () => {
    const bad: PolicyEvidenceLink = { ...linkOf('el-carrier-primary'), sourceId: 'rf-does-not-exist' };
    const res = resolveEvidenceLink(bad, registry);
    expect(res.ok).toBe(false);
    expect(res.reasons.some((r) => r.includes('unresolved'))).toBe(true);
  });

  it('never lets INCOMPATIBLE evidence support publication (spec §17)', () => {
    const bad: PolicyEvidenceLink = { ...linkOf('el-carrier-primary'), scopeCompatibility: 'INCOMPATIBLE' };
    expect(linkResolves(bad, registry)).toBe(false);
  });

  it('rejects an unapproved evidence link', () => {
    const bad: PolicyEvidenceLink = { ...linkOf('el-carrier-primary'), reviewStatus: 'DRAFT' };
    expect(linkResolves(bad, registry)).toBe(false);
  });

  it('preserves the research finding boundary for inheritance (spec §12/§99)', () => {
    const boundary = getResearchBoundary(registry, 'rf-awareness-gap');
    expect(boundary).not.toBeNull();
    expect(boundary!.doesNotShow.en.toLowerCase()).toMatch(/does not estimate awareness across the pakistani population/);
    expect(getResearchBoundary(registry, 'rf-does-not-exist')).toBeNull();
  });
});
