import { describe, it, expect } from 'vitest';
import {
  resolveDnaEducation,
  listDnaDiseases,
  isDnaDiseaseSupported,
} from './resolver';
import { DISEASE_MOLECULAR_RECORDS } from './data/records';

/**
 * DNA resolver tests (Module 22 §57). Verifies approved diseases, subtype
 * requirements, safe unknown ids, ordered mechanism steps, references, and
 * non-fabricated limitation states.
 */
const STEP_ORDER = [
  'GENE_CONTEXT',
  'GENETIC_CHANGE',
  'FUNCTION_EFFECT',
  'BIOLOGICAL_CONSEQUENCE',
  'DISEASE_CONNECTION',
];

describe('DNA education resolver', () => {
  it('lists exactly the four approved diseases (§9)', () => {
    const ids = listDnaDiseases().map((d) => d.id).sort();
    expect(ids).toEqual(
      ['beta-thalassemia', 'cystic-fibrosis', 'ehlers-danlos-syndrome', 'lysosomal-storage-disorders'].sort(),
    );
  });

  it('resolves beta-thalassemia to a supported HBB mechanism with ordered steps (§12)', () => {
    const res = resolveDnaEducation('beta-thalassemia', null);
    expect(res.state).toBe('SUPPORTED');
    if (res.state !== 'SUPPORTED') return;
    expect(res.mechanism.geneSymbol).toBe('HBB');
    expect(res.steps.map((s) => s.id)).toEqual(STEP_ORDER);
    expect(res.references.length).toBeGreaterThan(0);
  });

  it('resolves cystic fibrosis to a supported CFTR mechanism (§13)', () => {
    const res = resolveDnaEducation('cystic-fibrosis', null);
    expect(res.state).toBe('SUPPORTED');
    if (res.state !== 'SUPPORTED') return;
    expect(res.mechanism.geneSymbol).toBe('CFTR');
  });

  it('requires a subtype for LSD, then resolves the chosen example (§14)', () => {
    const gate = resolveDnaEducation('lysosomal-storage-disorders', null);
    expect(gate.state).toBe('SUBTYPE_REQUIRED');
    if (gate.state === 'SUBTYPE_REQUIRED') {
      expect(gate.subtypes.map((s) => s.id)).toEqual(['tay-sachs', 'gaucher']);
    }
    const tay = resolveDnaEducation('lysosomal-storage-disorders', 'tay-sachs');
    expect(tay.state).toBe('SUPPORTED');
    if (tay.state === 'SUPPORTED') expect(tay.mechanism.geneSymbol).toBe('HEXA');
    const gaucher = resolveDnaEducation('lysosomal-storage-disorders', 'gaucher');
    if (gaucher.state === 'SUPPORTED') expect(gaucher.mechanism.geneSymbol).toBe('GBA');
  });

  it('is subtype-aware for EDS: gene-defined subtypes are SUPPORTED (§15)', () => {
    for (const [subtype, gene] of [
      ['classical', 'COL5A1'],
      ['vascular', 'COL3A1'],
      ['classical-like', 'TNXB'],
    ] as const) {
      const res = resolveDnaEducation('ehlers-danlos-syndrome', subtype);
      expect(res.state, subtype).toBe('SUPPORTED');
      if (res.state === 'SUPPORTED') expect(res.mechanism.geneSymbol).toBe(gene);
    }
  });

  it('resolves hypermobile EDS to a LIMITED_MECHANISM, never a fabricated mechanism (§15)', () => {
    const res = resolveDnaEducation('ehlers-danlos-syndrome', 'hypermobile');
    expect(res.state).toBe('LIMITED_MECHANISM');
    if (res.state === 'LIMITED_MECHANISM') {
      expect(res.limitation.title.en).toMatch(/limited/i);
      expect(res.mechanism.steps).toHaveLength(0);
      expect(res.mechanism.geneSymbol).toBeUndefined();
    }
  });

  it('safely handles unknown disease and unknown subtype ids (§51)', () => {
    expect(resolveDnaEducation('not-a-disease', null).state).toBe('UNSUPPORTED');
    expect(resolveDnaEducation(null, null).state).toBe('UNSUPPORTED');
    expect(isDnaDiseaseSupported('not-a-disease')).toBe(false);
    // unknown subtype falls back to the subtype gate, not a crash
    expect(resolveDnaEducation('ehlers-danlos-syndrome', 'nope').state).toBe('SUBTYPE_REQUIRED');
  });

  it('cites references for every supported mechanism and none are fabricated (§21)', () => {
    for (const record of DISEASE_MOLECULAR_RECORDS) {
      for (const mechanism of record.mechanisms) {
        if (mechanism.supportState === 'SUPPORTED') {
          expect(mechanism.references.length, mechanism.id).toBeGreaterThan(0);
          expect(mechanism.steps.map((s) => s.id)).toEqual(STEP_ORDER);
        }
      }
    }
  });
});
