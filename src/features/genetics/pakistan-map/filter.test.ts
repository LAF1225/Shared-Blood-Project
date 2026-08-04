import { describe, it, expect } from 'vitest';
import {
  filterEvidence,
  representedEvidenceTypes,
  clusterEvidence,
  evidenceRecordCount,
  DEFAULT_FILTERS,
} from './filter';
import { getValidEvidence } from './validate';
import { ALL_MAP_EVIDENCE, MAP_EVIDENCE_BY_DISEASE } from './data/evidence';
import type { MapFilters } from './types';

const VALID = getValidEvidence(ALL_MAP_EVIDENCE);

const withFilters = (partial: Partial<MapFilters>): MapFilters => ({
  ...DEFAULT_FILTERS,
  ...partial,
});

describe('filterEvidence — the single map/list pipeline (spec §35)', () => {
  it('returns all valid records under the default (All Evidence) filter', () => {
    expect(filterEvidence(VALID, DEFAULT_FILTERS)).toHaveLength(VALID.length);
  });

  it('filters to a single disease layer', () => {
    const result = filterEvidence(VALID, withFilters({ disease: 'beta-thalassemia' }));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.diseaseId === 'beta-thalassemia')).toBe(true);
  });

  it('returns an empty collection for a disease with no configured evidence (EDS)', () => {
    const result = filterEvidence(VALID, withFilters({ disease: 'ehlers-danlos-syndrome' }));
    expect(result).toHaveLength(0);
  });

  it('filters by evidence type', () => {
    const result = filterEvidence(VALID, withFilters({ evidenceType: 'REGISTRY' }));
    expect(result.every((r) => r.evidenceType === 'REGISTRY')).toBe(true);
  });

  it('filters by province/territory', () => {
    const result = filterEvidence(VALID, withFilters({ province: 'sindh' }));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.provinceOrTerritory === 'sindh')).toBe(true);
  });

  it('combines disease + province + type filters', () => {
    const result = filterEvidence(
      VALID,
      withFilters({ disease: 'beta-thalassemia', province: 'punjab' }),
    );
    expect(
      result.every((r) => r.diseaseId === 'beta-thalassemia' && r.provinceOrTerritory === 'punjab'),
    ).toBe(true);
  });

  it('searches location, institution and title text', () => {
    const byCity = filterEvidence(VALID, withFilters({ query: 'karachi' }));
    expect(byCity.length).toBeGreaterThan(0);
    expect(
      byCity.every(
        (r) => `${r.locationName.en} ${r.district?.en ?? ''}`.toLowerCase().includes('karachi'),
      ),
    ).toBe(true);
  });

  it('returns nothing for a search with no matches', () => {
    expect(filterEvidence(VALID, withFilters({ query: 'zzz-nowhere' }))).toHaveLength(0);
  });

  it('reset (DEFAULT_FILTERS) restores the full collection', () => {
    const filtered = filterEvidence(VALID, withFilters({ disease: 'cystic-fibrosis' }));
    expect(filtered.length).toBeLessThan(VALID.length);
    expect(filterEvidence(VALID, DEFAULT_FILTERS)).toHaveLength(VALID.length);
  });
});

describe('representedEvidenceTypes — no empty categories (spec §19)', () => {
  it('only lists types present in the disease-scoped set', () => {
    const types = representedEvidenceTypes(VALID, { disease: 'cystic-fibrosis', province: 'all' });
    const actual = new Set(MAP_EVIDENCE_BY_DISEASE['cystic-fibrosis'].map((r) => r.evidenceType));
    expect(new Set(types)).toEqual(actual);
  });

  it('returns no types for a disease layer with no evidence (EDS)', () => {
    expect(
      representedEvidenceTypes(VALID, { disease: 'ehlers-danlos-syndrome', province: 'all' }),
    ).toHaveLength(0);
  });
});

describe('clusterEvidence — count is evidence records, not patients (spec §15)', () => {
  it('groups records at the same city and preserves total record count', () => {
    const clusters = clusterEvidence(VALID);
    const totalInClusters = clusters.reduce((sum, c) => sum + c.records.length, 0);
    expect(totalInClusters).toBe(VALID.length);
  });

  it('a Karachi cluster counts the number of records there (not a patient count)', () => {
    const karachi = filterEvidence(VALID, withFilters({ query: 'karachi' }));
    const clusters = clusterEvidence(karachi);
    const totalRecords = clusters.reduce((sum, c) => sum + c.records.length, 0);
    expect(totalRecords).toBe(evidenceRecordCount(karachi));
  });
});
