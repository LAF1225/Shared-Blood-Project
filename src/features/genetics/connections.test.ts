import { describe, it, expect } from 'vitest';
import { TOOL_CONNECTIONS, getToolConnections } from './data/connections';
import { getActiveTools } from './data/tools';
import { parseDiseaseContext } from './context';
import { resolveDnaEducation, isDnaDiseaseSupported } from './dna';
import { getDiseaseIdentity } from '@/features/diseases/data/diseases';

/**
 * Module 24 genetics cross-navigation + context tests (§13/§85/§86/§87).
 */
const ACTIVE_SLUGS = getActiveTools().map((t) => t.slug);
const PUBLIC_SURFACES = ['diseases', 'genetics'];

describe('genetics tool cross-navigation (§7/§39/§85)', () => {
  it('only connects FROM active tools', () => {
    for (const from of Object.keys(TOOL_CONNECTIONS)) {
      expect(ACTIVE_SLUGS, from).toContain(from);
    }
  });

  it('only connects TO active tools or approved public surfaces — never Family Tree (§121)', () => {
    for (const [from, connections] of Object.entries(TOOL_CONNECTIONS)) {
      for (const c of connections) {
        expect([...ACTIVE_SLUGS, ...PUBLIC_SURFACES], `${from}→${c.to}`).toContain(c.to);
        expect(c.to).not.toMatch(/family|tree/i);
        expect(c.href).not.toMatch(/family-tree/);
      }
    }
  });

  it('has at most one primary action per tool and a small number of links (§40)', () => {
    for (const connections of Object.values(TOOL_CONNECTIONS)) {
      expect(connections.filter((c) => c.primary).length).toBeLessThanOrEqual(1);
      expect(connections.length).toBeLessThanOrEqual(2);
    }
  });

  it('does not auto-infer reverse connections (curated, not symmetric)', () => {
    // DNA → Calculator exists; the reverse is a separate, explicit entry, and DNA
    // does not automatically link back from everything that links to it.
    expect(getToolConnections('dna-explorer').map((c) => c.to)).toEqual(['inheritance-calculator']);
  });
});

describe('educational disease-context parser (§72/§73/§87)', () => {
  it('accepts only a valid canonical disease id', () => {
    expect(parseDiseaseContext('beta-thalassemia')).toBe('beta-thalassemia');
    expect(parseDiseaseContext('ehlers-danlos-syndrome')).toBe('ehlers-danlos-syndrome');
  });

  it('ignores unknown values, subtype ids, arrays, and undefined safely', () => {
    expect(parseDiseaseContext('not-a-disease')).toBeUndefined();
    expect(parseDiseaseContext('tay-sachs')).toBeUndefined(); // subtype, not top-level
    expect(parseDiseaseContext('classical')).toBeUndefined();
    expect(parseDiseaseContext(undefined)).toBeUndefined();
    expect(parseDiseaseContext(['beta-thalassemia', 'x'])).toBeUndefined();
    // never interprets prohibited transfer fields — it only ever reads `disease`.
    expect(parseDiseaseContext('carrier')).toBeUndefined();
  });
});

describe('disease → tool wiring preserves feature gates (§8/§45/§86)', () => {
  it('every DNA-linked disease is actually DNA-supported and resolves canonically', () => {
    for (const id of ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome']) {
      expect(isDnaDiseaseSupported(id), id).toBe(true);
      expect(getDiseaseIdentity(id), id).toBeDefined();
    }
  });

  it('EDS/LSD top-level preselection never bypasses the subtype gate (§47/§48)', () => {
    // A disease-page link passes only the top-level id; the tool still gates.
    expect(resolveDnaEducation('ehlers-danlos-syndrome', null).state).toBe('SUBTYPE_REQUIRED');
    expect(resolveDnaEducation('lysosomal-storage-disorders', null).state).toBe('SUBTYPE_REQUIRED');
    // hEDS still resolves to the limitation state, never a fabricated mechanism.
    expect(resolveDnaEducation('ehlers-danlos-syndrome', 'hypermobile').state).toBe('LIMITED_MECHANISM');
  });
});
