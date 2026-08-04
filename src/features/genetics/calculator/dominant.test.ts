import { describe, it, expect } from 'vitest';
import { calculateAutosomalDominant, DOMINANT_STATUS_GENOTYPE } from './dominant';
import type { OutcomeKind } from './strategy';

const asMap = (outcomes: { kind: OutcomeKind; percent: number }[]) =>
  Object.fromEntries(outcomes.map((o) => [o.kind, o.percent]));

describe('calculateAutosomalDominant (v2 §14–§16/§38)', () => {
  it('models Affected as heterozygous Aa and Unaffected as aa (v2 §14)', () => {
    expect(DOMINANT_STATUS_GENOTYPE.affected).toBe('Aa');
    expect(DOMINANT_STATUS_GENOTYPE.unaffected).toBe('aa');
  });

  it('Affected × Unaffected → 50% inherits variant, 50% does not', () => {
    const result = calculateAutosomalDominant('affected', 'unaffected');
    expect(result.supported).toBe(true);
    if (!result.supported) return;
    const p = asMap(result.outcomes);
    expect(result.strategy).toBe('autosomal-dominant');
    expect(p['inherits-variant']).toBe(50);
    expect(p['not-inherited']).toBe(50);
    expect(p['inherits-variant'] + p['not-inherited']).toBe(100);
  });

  it('Unaffected × Affected → 50% / 50% (order-independent)', () => {
    const result = calculateAutosomalDominant('unaffected', 'affected');
    if (!result.supported) throw new Error('expected supported');
    const p = asMap(result.outcomes);
    expect(p['inherits-variant']).toBe(50);
    expect(p['not-inherited']).toBe(50);
  });

  it('Unaffected × Unaffected → 0% inherits variant, 100% does not', () => {
    const result = calculateAutosomalDominant('unaffected', 'unaffected');
    if (!result.supported) throw new Error('expected supported');
    const p = asMap(result.outcomes);
    expect(p['inherits-variant']).toBe(0);
    expect(p['not-inherited']).toBe(100);
  });

  it('Affected × Affected is NOT modeled — no generic 75/25 (v2 §16)', () => {
    const result = calculateAutosomalDominant('affected', 'affected');
    expect(result.supported).toBe(false);
    if (result.supported) return;
    expect(result.reason).toBe('combination-unsupported');
  });
});
