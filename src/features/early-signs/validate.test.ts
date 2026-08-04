import { describe, it, expect } from 'vitest';
import { getSignErrors, isValidSign, getValidSigns } from './validate';
import { ALL_EARLY_SIGNS } from './data/signs';
import type { EarlySignRecord } from './types';

const base = (over: Partial<EarlySignRecord> = {}): EarlySignRecord => ({
  id: 'test-1',
  diseaseId: 'beta-thalassemia',
  title: { en: 'A sign', ur: 'ایک علامت' },
  description: { en: 'A description.', ur: 'ایک وضاحت۔' },
  ageContexts: ['INFANT'],
  observationCategory: 'ENERGY',
  visibilityType: 'VISIBLE',
  patternType: 'PERSISTENT',
  urgencyContext: 'ROUTINE_DISCUSSION',
  caregiverObservation: { en: 'What you might see.', ur: 'جو آپ دیکھ سکتے ہیں۔' },
  whatToNotice: { en: 'The pattern.', ur: 'سلسلہ۔' },
  whatNotToAssume: { en: 'Not a diagnosis.', ur: 'تشخیص نہیں۔' },
  suggestedProfessionalTypes: ['PAEDIATRICIAN'],
  referenceIds: ['medlineplus-beta-thalassemia'],
  displayOrder: 1,
  ...over,
});

describe('getSignErrors (spec §72)', () => {
  it('accepts a well-formed record', () => {
    expect(getSignErrors(base())).toEqual([]);
    expect(isValidSign(base())).toBe(true);
  });

  it('rejects a record with no reference (spec §54)', () => {
    expect(getSignErrors(base({ referenceIds: [] }))).toContain('missing reference');
    expect(isValidSign(base({ referenceIds: [] }))).toBe(false);
  });

  it('rejects a record whose reference id does not resolve', () => {
    expect(getSignErrors(base({ referenceIds: ['not-a-real-source'] }))).toContain('unknown reference');
  });

  it('rejects a record missing whatNotToAssume (spec §16)', () => {
    expect(getSignErrors(base({ whatNotToAssume: { en: '', ur: '' } }))).toContain('missing whatNotToAssume');
  });

  it('rejects invalid enums and empty age contexts', () => {
    expect(getSignErrors(base({ diseaseId: 'nope' as never }))).toContain('invalid diseaseId');
    expect(getSignErrors(base({ observationCategory: 'MAGIC' as never }))).toContain('invalid observationCategory');
    expect(getSignErrors(base({ ageContexts: [] }))).toContain('missing ageContexts');
    expect(getSignErrors(base({ suggestedProfessionalTypes: ['WITCH_DOCTOR' as never] }))).toContain('invalid suggestedProfessionalTypes');
  });
});

describe('getValidSigns', () => {
  it('drops invalid records and de-duplicates ids', () => {
    const good = base();
    const dup = base({ title: { en: 'Dup', ur: 'ڈپ' } });
    const bad = base({ id: 'bad', referenceIds: [] });
    const result = getValidSigns([good, dup, bad]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('test-1');
  });

  it('every shipped early-sign record is valid and referenced', () => {
    const invalid = ALL_EARLY_SIGNS.filter((s) => !isValidSign(s));
    expect(invalid.map((s) => s.id)).toEqual([]);
  });
});
