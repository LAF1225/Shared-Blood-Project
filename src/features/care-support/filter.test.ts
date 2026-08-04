import { describe, it, expect } from 'vitest';
import {
  filterCareRecords,
  representedCareDomains,
  representedAgeContexts,
  representedAudiences,
  representedProfessionalTypes,
  resolveSupportItems,
  DEFAULT_CARE_FILTERS,
} from './filter';
import { ALL_CARE_RECORDS } from './data/careRecords';
import { getValidCareRecords } from './validate';

const RECORDS = getValidCareRecords(ALL_CARE_RECORDS);

describe('Care & Support filter pipeline (spec §71)', () => {
  it('is disease-first: default filters return nothing (spec §58/§59)', () => {
    expect(filterCareRecords(RECORDS, DEFAULT_CARE_FILTERS)).toHaveLength(0);
  });

  it('returns only the chosen disease’s records', () => {
    const result = filterCareRecords(RECORDS, { ...DEFAULT_CARE_FILTERS, disease: 'beta-thalassemia' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.diseaseId === 'beta-thalassemia')).toBe(true);
  });

  it('narrows by care domain', () => {
    const disease = 'beta-thalassemia';
    const domain = representedCareDomains(RECORDS, disease)[0];
    const result = filterCareRecords(RECORDS, { ...DEFAULT_CARE_FILTERS, disease, domain });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.careDomain === domain)).toBe(true);
  });

  it('narrows by age context', () => {
    const result = filterCareRecords(RECORDS, {
      ...DEFAULT_CARE_FILTERS,
      disease: 'cystic-fibrosis',
      age: 'INFANT',
    });
    expect(result.every((r) => r.ageContexts.includes('INFANT'))).toBe(true);
  });

  it('narrows by caregiver audience', () => {
    const result = filterCareRecords(RECORDS, {
      ...DEFAULT_CARE_FILTERS,
      disease: 'ehlers-danlos-syndrome',
      audience: 'SCHOOL_CAREGIVER',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.caregiverAudiences.includes('SCHOOL_CAREGIVER'))).toBe(true);
  });

  it('search is a simple text match on title / short description (spec §57)', () => {
    const result = filterCareRecords(RECORDS, {
      ...DEFAULT_CARE_FILTERS,
      disease: 'beta-thalassemia',
      query: 'appointment',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((r) =>
        `${r.title.en} ${r.shortDescription.en} ${r.careDomain}`.toLowerCase().includes('appointment'),
      ),
    ).toBe(true);
  });

  it('sorts by displayOrder', () => {
    const result = filterCareRecords(RECORDS, { ...DEFAULT_CARE_FILTERS, disease: 'lysosomal-storage-disorders' });
    const orders = result.map((r) => r.displayOrder);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('represented* helpers return nothing without a disease', () => {
    expect(representedCareDomains(RECORDS, null)).toHaveLength(0);
    expect(representedAgeContexts(RECORDS, null)).toHaveLength(0);
    expect(representedAudiences(RECORDS, null)).toHaveLength(0);
  });

  it('representedCareDomains only lists domains that are actually present', () => {
    const disease = 'cystic-fibrosis';
    const domains = representedCareDomains(RECORDS, disease);
    const actual = new Set(
      RECORDS.filter((r) => r.diseaseId === disease).map((r) => r.careDomain),
    );
    expect(new Set(domains)).toEqual(actual);
  });

  it('representedProfessionalTypes are curated and non-empty for a disease', () => {
    const scoped = filterCareRecords(RECORDS, { ...DEFAULT_CARE_FILTERS, disease: 'ehlers-danlos-syndrome' });
    expect(representedProfessionalTypes(scoped).length).toBeGreaterThan(0);
  });

  it('resolveSupportItems resolves valid items and drops unknown ids (spec §71)', () => {
    const resolved = resolveSupportItems(['medical-document-folder', 'not-a-real-item']);
    expect(resolved.map((i) => i.id)).toEqual(['medical-document-folder']);
  });
});
