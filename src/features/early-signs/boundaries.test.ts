import { describe, it, expect } from 'vitest';
import {
  ALL_EARLY_SIGNS,
  EARLY_SIGNS_BY_DISEASE,
  EMERGENCY_SIGNS,
  getEarlySignById,
} from './data/signs';
import { getValidSigns } from './validate';
import { filterSigns, DEFAULT_FILTERS } from './filter';

const VALID = getValidSigns(ALL_EARLY_SIGNS);

/**
 * Scientific-boundary tests (spec §73). These encode the guardrails that keep
 * Module 13 an observation-education system rather than a diagnostic engine.
 */
describe('Early-signs scientific boundaries (spec §73)', () => {
  it('no record carries a score / probability / ranking / match field (spec §2/§17)', () => {
    const forbidden = ['score', 'probability', 'confidence', 'ranking', 'match', 'likelihood', 'severity'];
    for (const sign of VALID) {
      for (const key of forbidden) expect(sign).not.toHaveProperty(key);
    }
  });

  it('is disease-first: no signs resolve without a chosen disease (spec §19)', () => {
    expect(filterSigns(VALID, DEFAULT_FILTERS)).toHaveLength(0);
  });

  it('every sign carries whatNotToAssume, and joint-flexibility says flexibility ≠ EDS (spec §16/§47)', () => {
    for (const sign of VALID) {
      expect(sign.whatNotToAssume.en.trim().length).toBeGreaterThan(0);
      expect(sign.whatNotToAssume.ur.trim().length).toBeGreaterThan(0);
    }
    const flex = getEarlySignById('eds-flexible-joints');
    expect(flex?.whatNotToAssume.en.toLowerCase()).toContain('do not mean');
    expect(flex?.whatNotToAssume.en.toLowerCase()).toMatch(/ehlers-danlos|eds/);
  });

  it('no beta-thalassemia carrier symptom cards exist (spec §42)', () => {
    for (const sign of EARLY_SIGNS_BY_DISEASE['beta-thalassemia']) {
      expect(sign.diseaseSubtypeId ?? '').not.toMatch(/carrier/i);
      expect(sign.id).not.toMatch(/carrier/i);
      expect(sign.title.en.toLowerCase()).not.toContain('carrier');
    }
  });

  it('LSD guidance uses group/subtype qualifiers, never a universal LSD claim (spec §45/§46)', () => {
    for (const sign of EARLY_SIGNS_BY_DISEASE['lysosomal-storage-disorders']) {
      const text = `${sign.description.en} ${sign.whatNotToAssume.en}`.toLowerCase();
      expect(text).toMatch(/some|depending|not all|specific disorder/);
    }
  });

  it('urgent care lives in the shared, disease-independent emergency layer (spec §28/§29)', () => {
    // No per-disease sign is marked URGENT_MEDICAL_HELP — urgent guidance is
    // based on the urgent sign itself, not a suspected genetic disorder.
    for (const sign of VALID) expect(sign.urgencyContext).not.toBe('URGENT_MEDICAL_HELP');
    // Emergency signs are general and never tied to a diseaseId.
    expect(EMERGENCY_SIGNS.length).toBeGreaterThan(0);
    for (const emergency of EMERGENCY_SIGNS) expect(emergency).not.toHaveProperty('diseaseId');
  });

  it('teaches observation, not home clinical examination (spec §14/§43/§48)', () => {
    // Instruction verbs for home clinical exams. (Tasting is handled separately
    // below — the salty-skin record legitimately warns AGAINST it.)
    const bannedInstruction = /palpate|beighton|stretch the skin|dislocat.* to test|press on the (liver|spleen)/i;
    for (const sign of VALID) {
      const text = [
        sign.caregiverObservation.en,
        sign.whatToNotice.en,
        sign.description.en,
      ].join(' ');
      expect(text).not.toMatch(bannedInstruction);
    }
    // The salty-skin record explicitly warns against tasting as a test (spec §43).
    const salty = getEarlySignById('cf-salty-skin');
    expect(salty?.caregiverObservation.en.toLowerCase()).toContain('do not lick');
  });

  it('every medical record has at least one reference (spec §54)', () => {
    for (const sign of VALID) expect(sign.referenceIds.length).toBeGreaterThan(0);
  });
});
