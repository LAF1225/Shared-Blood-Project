import { describe, it, expect } from 'vitest';
import {
  calculateAutosomalRecessive,
  RECESSIVE_STATUS_GENOTYPE,
  type RecessiveStatus,
} from './recessive';
import { tallyOutcomes } from './strategy';
import type { OutcomeKind } from './strategy';
import type { Genotype } from './genotype';

/**
 * Authoritative oracle — the exact probability table supplied in Module 09 v2 §12
 * (identical to v1). The refactor to a strategy engine must not change the maths
 * (v2 §12/§42), so every combination is pinned here.
 */
const SPEC_TABLE: Record<string, { affected: number; carrier: number; unaffected: number }> = {
  'AA-AA': { affected: 0, carrier: 0, unaffected: 100 },
  'AA-Aa': { affected: 0, carrier: 50, unaffected: 50 },
  'Aa-AA': { affected: 0, carrier: 50, unaffected: 50 },
  'Aa-Aa': { affected: 25, carrier: 50, unaffected: 25 },
  'aa-AA': { affected: 0, carrier: 100, unaffected: 0 },
  'AA-aa': { affected: 0, carrier: 100, unaffected: 0 },
  'aa-Aa': { affected: 50, carrier: 50, unaffected: 0 },
  'Aa-aa': { affected: 50, carrier: 50, unaffected: 0 },
  'aa-aa': { affected: 100, carrier: 0, unaffected: 0 },
};

const GENOTYPE_STATUS: Record<Genotype, RecessiveStatus> = {
  aa: 'affected',
  Aa: 'carrier',
  AA: 'tested-negative',
};

const asMap = (outcomes: { kind: OutcomeKind; percent: number }[]) =>
  Object.fromEntries(outcomes.map((o) => [o.kind, o.percent]));

describe('calculateAutosomalRecessive — all nine combinations (v2 §12/§38)', () => {
  for (const [key, expected] of Object.entries(SPEC_TABLE)) {
    it(`${key} matches the authoritative table and totals 100`, () => {
      const [g1, g2] = key.split('-') as [Genotype, Genotype];
      const result = calculateAutosomalRecessive(GENOTYPE_STATUS[g1], GENOTYPE_STATUS[g2]);
      const p = asMap(result.outcomes);

      expect(result.strategy).toBe('autosomal-recessive');
      expect(p.affected).toBe(expected.affected);
      expect(p.carrier).toBe(expected.carrier);
      expect(p.unaffected).toBe(expected.unaffected);
      expect(p.affected + p.carrier + p.unaffected).toBe(100);
    });
  }
});

describe('recessive status → genotype (v2 §11)', () => {
  it('models Affected=aa, Carrier=Aa, Tested Negative=AA', () => {
    expect(RECESSIVE_STATUS_GENOTYPE.affected).toBe('aa');
    expect(RECESSIVE_STATUS_GENOTYPE.carrier).toBe('Aa');
    expect(RECESSIVE_STATUS_GENOTYPE['tested-negative']).toBe('AA');
  });
});

describe('visualization shares the engine logic (v2 §22)', () => {
  it('grid tally reproduces the probabilities exactly', () => {
    const result = calculateAutosomalRecessive('carrier', 'carrier');
    expect(result.grid).toHaveLength(4);
    expect(tallyOutcomes(result.grid, ['affected', 'carrier', 'unaffected'])).toEqual(
      result.outcomes,
    );
    expect(result.grid.map((cell) => cell.genotype)).toEqual(['AA', 'Aa', 'Aa', 'aa']);
  });
});

describe('symmetry — parent order does not change outcomes (v2 §11)', () => {
  const statuses: RecessiveStatus[] = ['affected', 'carrier', 'tested-negative'];
  for (const a of statuses) {
    for (const b of statuses) {
      it(`${a} × ${b} equals ${b} × ${a}`, () => {
        expect(asMap(calculateAutosomalRecessive(a, b).outcomes)).toEqual(
          asMap(calculateAutosomalRecessive(b, a).outcomes),
        );
      });
    }
  }
});
