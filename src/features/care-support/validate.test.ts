import { describe, it, expect } from 'vitest';
import {
  getCareRecordErrors,
  isValidCareRecord,
  getValidCareRecords,
  getSupportItemErrors,
  isValidSupportItem,
  getValidSupportItems,
} from './validate';
import { ALL_CARE_RECORDS } from './data/careRecords';
import { SUPPORT_ITEMS } from './data/supportItems';
import type { CareSupportRecord, SupportItemRecord } from './types';

const baseRecord: CareSupportRecord = ALL_CARE_RECORDS[0];
const baseItem: SupportItemRecord = SUPPORT_ITEMS.find((i) => i.medicalDeviceStatus !== 'NON_MEDICAL_SUPPORT_ITEM')!;
const nonMedicalItem: SupportItemRecord = SUPPORT_ITEMS.find((i) => i.medicalDeviceStatus === 'NON_MEDICAL_SUPPORT_ITEM')!;

describe('Care record validation (spec §76)', () => {
  it('every shipped care record is valid', () => {
    for (const record of ALL_CARE_RECORDS) {
      expect(getCareRecordErrors(record)).toEqual([]);
    }
  });

  it('a record with no reference fails (spec §64)', () => {
    expect(isValidCareRecord({ ...baseRecord, referenceIds: [] })).toBe(false);
  });

  it('a record with an unknown reference fails', () => {
    expect(getCareRecordErrors({ ...baseRecord, referenceIds: ['nope'] })).toContain('unknown reference');
  });

  it('a record with an unknown support-item id fails (spec §71)', () => {
    expect(getCareRecordErrors({ ...baseRecord, supportItemIds: ['ghost-item'] })).toContain('unknown supportItemId');
  });

  it('a record with no caregiver audiences fails (spec §36)', () => {
    expect(getCareRecordErrors({ ...baseRecord, caregiverAudiences: [] })).toContain('missing caregiverAudiences');
  });

  it('getValidCareRecords removes invalid and de-duplicates', () => {
    const dupe = { ...baseRecord };
    const broken = { ...baseRecord, id: 'broken', referenceIds: [] };
    const valid = getValidCareRecords([baseRecord, dupe, broken]);
    expect(valid).toHaveLength(1);
  });
});

describe('Support item validation (spec §76)', () => {
  it('every shipped support item is valid', () => {
    for (const item of SUPPORT_ITEMS) {
      expect(getSupportItemErrors(item)).toEqual([]);
    }
  });

  it('a support item without a safety notice fails (spec §70)', () => {
    expect(getSupportItemErrors({ ...baseItem, safetyNotice: { en: '', ur: '' } })).toContain('missing safetyNotice');
  });

  it('a medical/therapeutic item with no reference fails (spec §64/§65)', () => {
    expect(getSupportItemErrors({ ...baseItem, referenceIds: [] })).toContain('missing reference for medical use');
  });

  it('a non-medical item may have no reference', () => {
    expect(isValidSupportItem(nonMedicalItem)).toBe(true);
    expect(nonMedicalItem.referenceIds).toEqual([]);
  });

  it('an item with an unknown reference fails', () => {
    expect(getSupportItemErrors({ ...baseItem, referenceIds: ['nope'] })).toContain('unknown reference');
  });

  it('getValidSupportItems removes invalid and de-duplicates', () => {
    const broken = { ...baseItem, id: 'broken', safetyNotice: { en: '', ur: '' } };
    const valid = getValidSupportItems([baseItem, { ...baseItem }, broken]);
    expect(valid).toHaveLength(1);
  });
});
