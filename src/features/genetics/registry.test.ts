import { describe, it, expect } from 'vitest';
import {
  GENETICS_TOOLS,
  getGeneticsToolBySlug,
  getActiveTools,
  getComingSoonTools,
} from './data/tools';
import { PUNNETT_SCENARIOS } from './punnett/scenarios';

/**
 * Family Tree retirement + genetics registry tests (Module 23 §34/§95).
 * The retired standalone Family Tree placeholder must be absent from the
 * registry, the public tool list, and the coming-soon list — while the
 * Relationship Explorer, its pedigree, and the Punnett scenarios remain.
 */
describe('genetics tool registry after Family Tree retirement', () => {
  it('has no Family Tree entry anywhere in the registry (§6/§29)', () => {
    expect(getGeneticsToolBySlug('family-tree-explorer')).toBeNull();
    expect(GENETICS_TOOLS.some((t) => t.id === 'family-tree-explorer')).toBe(false);
    expect(GENETICS_TOOLS.some((t) => t.slug === 'family-tree-explorer')).toBe(false);
  });

  it('excludes Family Tree from the coming-soon list (§34)', () => {
    expect(getComingSoonTools().some((t) => t.slug === 'family-tree-explorer')).toBe(false);
  });

  it('keeps the Module 22 interactive tools active (§6/§22 preserved)', () => {
    const active = getActiveTools().map((t) => t.slug);
    expect(active).toEqual(
      expect.arrayContaining([
        'inheritance-calculator',
        'relationship-risk',
        'pakistan-map',
        'dna-explorer',
        'punnett-square',
      ]),
    );
  });

  it('preserves the Punnett educational scenarios (§30/§128)', () => {
    expect(PUNNETT_SCENARIOS.length).toBeGreaterThan(0);
    // No scenario was a Family Tree artefact.
    expect(PUNNETT_SCENARIOS.every((s) => !/family|tree/i.test(s.id))).toBe(true);
  });
});
