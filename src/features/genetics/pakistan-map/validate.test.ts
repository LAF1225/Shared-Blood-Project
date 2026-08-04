import { describe, it, expect } from 'vitest';
import { getRecordErrors, isValidRecord, getValidEvidence } from './validate';
import { ALL_MAP_EVIDENCE } from './data/evidence';
import type { MapEvidenceRecord } from './types';

const baseRecord = (): MapEvidenceRecord => ({
  id: 'test-1',
  diseaseId: 'beta-thalassemia',
  title: { en: 'Test', ur: 'ٹیسٹ' },
  locationName: { en: 'Karachi', ur: 'کراچی' },
  provinceOrTerritory: 'sindh',
  latitude: 24.86,
  longitude: 67.01,
  geographicPrecision: 'CITY',
  evidenceType: 'HOSPITAL_COHORT',
  studyPopulation: { en: 'Patients', ur: 'مریض' },
  evidenceSummary: { en: 'A study.', ur: 'ایک مطالعہ۔' },
  measuredOutcome: { en: 'Something', ur: 'کچھ' },
  referenceId: 'ansari-2012-thal',
  canTellUs: { en: 'Can', ur: 'کر سکتا' },
  cannotTellUs: { en: 'Cannot infer prevalence.', ur: 'شرح کا اندازہ نہیں لگا سکتا۔' },
  lastReviewed: '2026-06-01',
});

describe('getRecordErrors (spec §37/§38)', () => {
  it('accepts a well-formed record', () => {
    expect(getRecordErrors(baseRecord())).toEqual([]);
    expect(isValidRecord(baseRecord())).toBe(true);
  });

  it('rejects a published record without a resolvable reference (spec §38)', () => {
    const record = { ...baseRecord(), referenceId: 'source-internet' };
    expect(getRecordErrors(record)).toContain('missing or unknown referenceId');
    expect(isValidRecord(record)).toBe(false);
  });

  it('rejects coordinates outside Pakistan bounds', () => {
    const record = { ...baseRecord(), latitude: 51.5, longitude: -0.12 };
    expect(getRecordErrors(record)).toContain('coordinates outside Pakistan bounds');
  });

  it('rejects an unsupported evidence type', () => {
    const record = { ...baseRecord(), evidenceType: 'RUMOUR' as never };
    expect(getRecordErrors(record)).toContain('unsupported evidenceType');
  });

  it('rejects a record missing the required cannot-tell-us limitation (spec §24)', () => {
    const record = { ...baseRecord(), cannotTellUs: { en: '', ur: '' } };
    expect(getRecordErrors(record)).toContain('missing cannotTellUs limitation');
  });

  it('rejects a non-positive sample size', () => {
    const record = { ...baseRecord(), sampleSize: 0 };
    expect(getRecordErrors(record)).toContain('invalid sampleSize');
  });

  it('rejects an out-of-range publication year', () => {
    const record = { ...baseRecord(), publicationYear: 1200 };
    expect(getRecordErrors(record)).toContain('invalid publicationYear');
  });
});

describe('getValidEvidence', () => {
  it('drops invalid records and de-duplicates ids', () => {
    const good = baseRecord();
    const dup = { ...baseRecord(), locationName: { en: 'Lahore', ur: 'لاہور' } };
    const bad = { ...baseRecord(), id: 'bad', referenceId: 'nope' };
    const result = getValidEvidence([good, dup, bad]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('test-1');
  });

  it('every shipped evidence record is valid', () => {
    const invalid = ALL_MAP_EVIDENCE.filter((r) => !isValidRecord(r));
    expect(invalid.map((r) => r.id)).toEqual([]);
  });
});
