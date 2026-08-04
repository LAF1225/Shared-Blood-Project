import { describe, it, expect } from 'vitest';
import {
  PUNNETT_SCENARIOS,
  resolvePunnettScenario,
  getPunnettScenario,
} from './scenarios';
import type { OutcomeKind } from '../calculator/strategy';

/**
 * Shared Punnett scenario tests (Module 22 §57/§58).
 * Verifies CANONICAL RESULT → GRID MODEL → CELL OUTCOMES → OUTCOME COUNTS →
 * CANONICAL PROBABILITY DISTRIBUTION, and the governance guard that no scenario
 * fabricates a hypermobile-EDS grid (§15/§32/§38).
 */

/** Grid outcome frequency, computed from the cells (each of 4 cells = 25%). */
function gridFrequency(cells: { outcome: OutcomeKind }[]): Map<OutcomeKind, number> {
  const share = 100 / cells.length;
  const freq = new Map<OutcomeKind, number>();
  for (const cell of cells) freq.set(cell.outcome, (freq.get(cell.outcome) ?? 0) + share);
  return freq;
}

describe('shared Punnett scenarios', () => {
  it('resolves every approved scenario through the canonical engine (§38)', () => {
    for (const scenario of PUNNETT_SCENARIOS) {
      const resolved = resolvePunnettScenario(scenario.id);
      expect(resolved, scenario.id).not.toBeNull();
      expect(resolved!.calculation.supported).toBe(true);
    }
  });

  it('grid cell frequency matches the canonical outcome distribution (§58)', () => {
    for (const scenario of PUNNETT_SCENARIOS) {
      const { calculation } = resolvePunnettScenario(scenario.id)!;
      const freq = gridFrequency(calculation.grid);
      // Every canonical outcome percent equals the grid-derived frequency —
      // the renderer can never diverge from the engine (§22/§25).
      for (const { kind, percent } of calculation.outcomes) {
        expect(freq.get(kind) ?? 0, `${scenario.id}:${kind}`).toBe(percent);
      }
      // Grid always has 4 equally-likely cells for a supported two-allele model.
      expect(calculation.grid).toHaveLength(4);
    }
  });

  it('carrier × carrier recessive is the canonical 25 / 50 / 25 (§30)', () => {
    const { calculation } = resolvePunnettScenario('recessive-carrier-carrier')!;
    const byKind = Object.fromEntries(calculation.outcomes.map((o) => [o.kind, o.percent]));
    expect(byKind.affected).toBe(25);
    expect(byKind.carrier).toBe(50);
    expect(byKind.unaffected).toBe(25);
  });

  it('dominant affected × unaffected is 50 / 50 (§31)', () => {
    const { calculation } = resolvePunnettScenario('dominant-affected-unaffected')!;
    const byKind = Object.fromEntries(calculation.outcomes.map((o) => [o.kind, o.percent]));
    expect(byKind['inherits-variant']).toBe(50);
    expect(byKind['not-inherited']).toBe(50);
  });

  it('never offers a hypermobile-EDS or unsupported scenario (§32/§38)', () => {
    for (const scenario of PUNNETT_SCENARIOS) {
      expect(scenario.strategy).not.toBe('unsupported');
      expect(scenario.id).not.toMatch(/hypermobile|heds/i);
    }
  });

  it('returns null for an unknown scenario id (§51)', () => {
    expect(getPunnettScenario('nope')).toBeNull();
    expect(resolvePunnettScenario('nope')).toBeNull();
    expect(resolvePunnettScenario(null)).toBeNull();
  });
});
