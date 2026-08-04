import { describe, it, expect } from 'vitest';
import {
  filterSigns,
  representedCategories,
  representedAgeContexts,
  representedProfessionalTypes,
  DEFAULT_FILTERS,
} from './filter';
import { getValidSigns } from './validate';
import { ALL_EARLY_SIGNS, EARLY_SIGNS_BY_DISEASE } from './data/signs';
import type { EarlySignFilters } from './types';

const VALID = getValidSigns(ALL_EARLY_SIGNS);
const withFilters = (p: Partial<EarlySignFilters>): EarlySignFilters => ({ ...DEFAULT_FILTERS, ...p });

describe('filterSigns — disease-first pipeline (spec §19/§66)', () => {
  it('returns nothing when no disease is selected (disease-first)', () => {
    expect(filterSigns(VALID, DEFAULT_FILTERS)).toHaveLength(0);
    expect(filterSigns(VALID, withFilters({ age: 'INFANT', query: 'tired' }))).toHaveLength(0);
  });

  it('returns a disease’s signs, sorted by displayOrder', () => {
    const signs = filterSigns(VALID, withFilters({ disease: 'beta-thalassemia' }));
    expect(signs.length).toBe(EARLY_SIGNS_BY_DISEASE['beta-thalassemia'].length);
    expect(signs.every((s) => s.diseaseId === 'beta-thalassemia')).toBe(true);
    const orders = signs.map((s) => s.displayOrder);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('filters by age context', () => {
    const signs = filterSigns(VALID, withFilters({ disease: 'cystic-fibrosis', age: 'NEWBORN' }));
    expect(signs.length).toBeGreaterThan(0);
    expect(signs.every((s) => s.ageContexts.includes('NEWBORN'))).toBe(true);
  });

  it('filters by observation category', () => {
    const signs = filterSigns(VALID, withFilters({ disease: 'ehlers-danlos-syndrome', category: 'JOINTS' }));
    expect(signs.length).toBeGreaterThan(0);
    expect(signs.every((s) => s.observationCategory === 'JOINTS')).toBe(true);
  });

  it('supports simple text search across title and description', () => {
    const signs = filterSigns(VALID, withFilters({ disease: 'beta-thalassemia', query: 'tired' }));
    expect(signs.length).toBeGreaterThan(0);
    expect(signs.every((s) => `${s.title.en} ${s.description.en}`.toLowerCase().includes('tired'))).toBe(true);
  });

  it('returns nothing for a non-matching search (no NLP interpretation)', () => {
    expect(filterSigns(VALID, withFilters({ disease: 'beta-thalassemia', query: 'my child is pale and tired zzz' }))).toHaveLength(0);
  });

  it('reset (DEFAULT_FILTERS) returns to the disease-first empty state', () => {
    expect(filterSigns(VALID, DEFAULT_FILTERS)).toHaveLength(0);
  });
});

describe('represented filter options (spec §21/§22)', () => {
  it('lists only categories present in the disease + age scope', () => {
    const cats = representedCategories(VALID, { disease: 'cystic-fibrosis', age: 'all' });
    const actual = new Set(EARLY_SIGNS_BY_DISEASE['cystic-fibrosis'].map((s) => s.observationCategory));
    expect(new Set(cats)).toEqual(actual);
  });

  it('returns no options when no disease is selected', () => {
    expect(representedCategories(VALID, { disease: null, age: 'all' })).toHaveLength(0);
    expect(representedAgeContexts(VALID, null)).toHaveLength(0);
  });

  it('lists age contexts represented for a disease', () => {
    const ages = representedAgeContexts(VALID, 'beta-thalassemia');
    expect(ages).toContain('INFANT');
  });

  it('lists professional types referenced by a set of signs', () => {
    const signs = filterSigns(VALID, withFilters({ disease: 'cystic-fibrosis' }));
    const pros = representedProfessionalTypes(signs);
    expect(pros).toContain('PULMONOLOGIST');
    expect(pros.length).toBeGreaterThan(0);
  });
});
