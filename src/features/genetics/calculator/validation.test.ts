import { describe, it, expect } from 'vitest';
import { validateSelections } from './validation';
import { resolveTarget } from './metadata';
import { STRATEGY_STATUS_OPTIONS, type ParentStatus } from './strategy';

const recessiveStatuses = STRATEGY_STATUS_OPTIONS['autosomal-recessive'];

function selections(
  diseaseSlug: string | null,
  subtypeId: string | null,
  statusOne: ParentStatus | null,
  statusTwo: ParentStatus | null,
) {
  const resolution = resolveTarget(diseaseSlug, subtypeId);
  const strategyStatuses =
    resolution.kind === 'ok' ? STRATEGY_STATUS_OPTIONS[resolution.target.strategy] : [];
  return { resolution, statusOne, statusTwo, strategyStatuses };
}

describe('validateSelections (v2 §26/§28)', () => {
  it('flags a missing condition first', () => {
    expect(validateSelections(selections(null, null, null, null))).toBe('condition-missing');
  });

  it('flags a required-but-missing subtype (generic EDS)', () => {
    expect(
      validateSelections(selections('ehlers-danlos-syndrome', null, null, null)),
    ).toBe('subtype-required');
  });

  it('flags a missing Parent One status', () => {
    expect(
      validateSelections(selections('beta-thalassemia', null, null, 'carrier')),
    ).toBe('parent-one-missing');
  });

  it('flags a missing Parent Two status', () => {
    expect(
      validateSelections(selections('beta-thalassemia', null, 'carrier', null)),
    ).toBe('parent-two-missing');
  });

  it('rejects a status that is invalid for the resolved strategy', () => {
    // "carrier" is not a valid autosomal-dominant status (v2 §15).
    expect(
      validateSelections(selections('ehlers-danlos-syndrome', 'classical', 'carrier', 'unaffected')),
    ).toBe('parent-one-missing');
  });

  it('returns null when a recessive selection is complete', () => {
    expect(
      validateSelections(selections('beta-thalassemia', null, 'affected', 'tested-negative')),
    ).toBeNull();
    expect(recessiveStatuses).toContain('carrier');
  });

  it('returns null when a dominant selection is complete', () => {
    expect(
      validateSelections(selections('ehlers-danlos-syndrome', 'classical', 'affected', 'unaffected')),
    ).toBeNull();
  });
});
