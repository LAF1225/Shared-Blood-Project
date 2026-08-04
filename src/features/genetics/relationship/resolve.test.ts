import { describe, it, expect } from 'vitest';
import {
  listRelationshipProfiles,
  getRelationshipProfile,
  getPopulationEvidence,
  getDiseaseContext,
  listDiseaseContexts,
} from './resolve';
import type { RelationshipId } from './types';

/** Expected simple-pedigree coefficients (spec §10). */
const EXPECTED_COEFFICIENTS: Record<RelationshipId, string | null> = {
  unrelated: null,
  'third-cousins': '1/256',
  'second-cousins': '1/64',
  'first-cousins-once-removed': '1/32',
  'first-cousins': '1/16',
  'double-first-cousins': '1/8',
};

describe('relationship profiles (spec §10/§42)', () => {
  it('configures all six relationship categories', () => {
    const ids = listRelationshipProfiles().map((profile) => profile.id);
    expect(new Set(ids)).toEqual(new Set(Object.keys(EXPECTED_COEFFICIENTS)));
  });

  for (const [id, fraction] of Object.entries(EXPECTED_COEFFICIENTS)) {
    it(`${id} resolves with the correct coefficient (${fraction ?? 'none'})`, () => {
      const profile = getRelationshipProfile(id);
      expect(profile).not.toBeNull();
      expect(profile!.coefficient?.fraction ?? null).toBe(fraction);
    });
  }

  it('every coefficient fraction is numerically consistent (spec §39)', () => {
    for (const profile of listRelationshipProfiles()) {
      if (!profile.coefficient) continue;
      const [num, den] = profile.coefficient.fraction.split('/').map(Number);
      expect(profile.coefficient.value).toBeCloseTo(num / den, 12);
    }
  });

  it('"Unrelated" has no simple-pedigree coefficient — F is not asserted as 0 (spec §10)', () => {
    expect(getRelationshipProfile('unrelated')!.coefficient).toBeNull();
  });
});

describe('scientific boundaries — no manufactured risk (spec §18/§42/§46)', () => {
  it('profiles expose no risk score, multiplier, or classification field', () => {
    const allowed = new Set([
      'id',
      'label',
      'description',
      'sharedAncestorContext',
      'pedigreeDefinition',
      'coefficient',
      'recessiveRiskExplanation',
      'references',
    ]);
    for (const profile of listRelationshipProfiles()) {
      for (const key of Object.keys(profile)) {
        expect(allowed.has(key)).toBe(true);
      }
      // The coefficient is only a fraction + its value — nothing risk-like.
      if (profile.coefficient) {
        expect(Object.keys(profile.coefficient).sort()).toEqual(['fraction', 'value']);
      }
    }
  });

  it('missing population evidence yields null — never a fabricated estimate (spec §17/§40)', () => {
    expect(getPopulationEvidence('first-cousins')).not.toBeNull();
    for (const id of [
      'unrelated',
      'third-cousins',
      'second-cousins',
      'first-cousins-once-removed',
      'double-first-cousins',
    ] as RelationshipId[]) {
      expect(getPopulationEvidence(id)).toBeNull();
    }
  });

  it('disease context is text-only and never a disease-specific percentage (spec §19/§42)', () => {
    for (const context of listDiseaseContexts()) {
      expect(Object.keys(context).sort()).toEqual(['context', 'id', 'pathway']);
      expect(context.context.en).not.toMatch(/%/);
      expect(context.context.en).not.toMatch(/\d+(\.\d+)?\s*(percent|%)/i);
    }
  });

  it('selecting a disease context cannot change the coefficient F (spec §19)', () => {
    // The coefficient comes from the relationship profile alone; the disease
    // resolver has no access to it and returns only educational text.
    const before = getRelationshipProfile('first-cousins')!.coefficient!.fraction;
    getDiseaseContext('beta-thalassemia');
    getDiseaseContext('lysosomal-storage-disorders');
    const after = getRelationshipProfile('first-cousins')!.coefficient!.fraction;
    expect(after).toBe(before);
    expect(after).toBe('1/16');
  });

  it('LSD and EDS contexts exist but carry no generic figure (spec §22/§23)', () => {
    for (const slug of ['lysosomal-storage-disorders', 'ehlers-danlos-syndrome']) {
      const context = getDiseaseContext(slug);
      expect(context).not.toBeNull();
      expect(context!.context.en).not.toMatch(/%/);
    }
  });
});
