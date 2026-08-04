import { describe, it, expect } from 'vitest';
import { DISEASES, getDiseaseIdentity } from './data/diseases';
import { DISEASE_CONTENT } from './content/registry';
import { DISEASE_MOLECULAR_RECORDS } from '@/features/genetics/dna';
import { getCalculatorDiseases } from '@/features/genetics/calculator';
import { MAP_EVIDENCE_BY_DISEASE } from '@/features/genetics/pakistan-map/data/evidence';

/**
 * Canonical disease identity + cross-feature integrity (Module 23 §51/§76/§97/§98).
 *
 * One canonical owner (DISEASES) provides id, English/Urdu name, and disease-level
 * inheritance classification. Feature layers reference a disease by id and resolve
 * identity here. These tests assert the canonical contract and that every
 * TOP-LEVEL disease id used across features resolves to canonical identity —
 * without treating subtype ids (Tay-Sachs, Gaucher, classical/vascular EDS) as
 * top-level (§98).
 */
const APPROVED_IDS = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

describe('canonical disease identity', () => {
  it('resolves canonical identity for every approved disease (§78)', () => {
    for (const id of APPROVED_IDS) {
      const identity = getDiseaseIdentity(id);
      expect(identity, id).toBeDefined();
      expect(identity!.name.en.length).toBeGreaterThan(0);
      expect(identity!.name.ur.length).toBeGreaterThan(0);
      expect(identity!.inheritanceClassification).toBeTruthy();
    }
  });

  it('classifies inheritance at disease level; EDS/LSD stay subtype-dependent (§60/§61/§62)', () => {
    expect(getDiseaseIdentity('beta-thalassemia')!.inheritanceClassification).toBe('AUTOSOMAL_RECESSIVE');
    expect(getDiseaseIdentity('cystic-fibrosis')!.inheritanceClassification).toBe('AUTOSOMAL_RECESSIVE');
    expect(getDiseaseIdentity('lysosomal-storage-disorders')!.inheritanceClassification).toBe('SUBTYPE_DEPENDENT');
    expect(getDiseaseIdentity('ehlers-danlos-syndrome')!.inheritanceClassification).toBe('SUBTYPE_DEPENDENT');
  });

  it('has unique canonical ids (§97)', () => {
    const ids = DISEASES.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('fails safely for unknown ids — undefined, no throw (§89)', () => {
    expect(getDiseaseIdentity('not-a-disease')).toBeUndefined();
    expect(getDiseaseIdentity('')).toBeUndefined();
    // A subtype id is NOT a top-level disease identity.
    expect(getDiseaseIdentity('tay-sachs')).toBeUndefined();
    expect(getDiseaseIdentity('classical')).toBeUndefined();
  });
});

describe('cross-feature disease-id integrity (§98)', () => {
  it('disease content ids resolve to canonical identity (§97)', () => {
    for (const slug of Object.keys(DISEASE_CONTENT)) {
      expect(getDiseaseIdentity(slug), slug).toBeDefined();
    }
  });

  it('DNA education top-level disease ids resolve to canonical identity (§58/§98)', () => {
    for (const record of DISEASE_MOLECULAR_RECORDS) {
      expect(getDiseaseIdentity(record.diseaseId), record.diseaseId).toBeDefined();
    }
  });

  it('calculator disease ids resolve to canonical identity', () => {
    for (const disease of getCalculatorDiseases()) {
      expect(getDiseaseIdentity(disease.id), disease.id).toBeDefined();
    }
  });

  it('Evidence Map disease ids resolve to canonical identity (§68)', () => {
    for (const id of Object.keys(MAP_EVIDENCE_BY_DISEASE)) {
      expect(getDiseaseIdentity(id), id).toBeDefined();
    }
  });
});
