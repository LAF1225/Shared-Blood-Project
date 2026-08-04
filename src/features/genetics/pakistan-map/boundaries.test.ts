import { describe, it, expect } from 'vitest';
import {
  ALL_MAP_EVIDENCE,
  MAP_EVIDENCE_BY_DISEASE,
  DISEASE_COVERAGE,
} from './data/evidence';
import { projectPoint, MAP_VIEWBOX, isWithinPakistanBounds } from './data/geography';
import { getValidEvidence } from './validate';
import { clusterEvidence, filterEvidence, DEFAULT_FILTERS } from './filter';

const VALID = getValidEvidence(ALL_MAP_EVIDENCE);

/**
 * Scientific-boundary tests (spec §58). These encode the guardrails that keep
 * the map an *evidence visualisation* rather than a prevalence/epicenter map.
 */
describe('Evidence-map scientific boundaries (spec §58)', () => {
  it('no record labels any location an epicenter, hotspot, or danger/hot zone (spec §5)', () => {
    const banned = /epicenter|epicentre|hotspot|hot zone|hot-zone|danger zone|high-risk bloodline/i;
    for (const record of ALL_MAP_EVIDENCE) {
      const text = [
        record.title.en,
        record.title.ur,
        record.evidenceSummary.en,
        record.evidenceSummary.ur,
        record.canTellUs.en,
        record.cannotTellUs.en,
      ].join(' ');
      expect(text).not.toMatch(banned);
    }
  });

  it('every record carries a "what this cannot tell us" limitation — never a bare number (spec §14/§24)', () => {
    for (const record of VALID) {
      expect(record.cannotTellUs.en.trim().length).toBeGreaterThan(0);
      expect(record.cannotTellUs.ur.trim().length).toBeGreaterThan(0);
    }
  });

  it('no record exposes a risk-score / prevalence / patient-count field (spec §20/§62)', () => {
    const forbidden = ['riskScore', 'prevalence', 'patientCount', 'affectedCount', 'multiplier'];
    for (const record of VALID) {
      for (const key of forbidden) {
        expect(record).not.toHaveProperty(key);
      }
    }
  });

  it('coverage is configured manually, not derived from marker count (spec §31)', () => {
    // EDS has zero records yet its coverage is a configured label, not "none".
    expect(MAP_EVIDENCE_BY_DISEASE['ehlers-danlos-syndrome']).toHaveLength(0);
    expect(DISEASE_COVERAGE['ehlers-danlos-syndrome']).toBe('LIMITED');
    // Beta-thal has the most records but is NOT auto-promoted to EXPANDED.
    const counts = Object.entries(MAP_EVIDENCE_BY_DISEASE).map(([d, r]) => [d, r.length] as const);
    const mostRecords = counts.sort((a, b) => b[1] - a[1])[0][0];
    expect(mostRecords).toBe('beta-thalassemia');
    expect(DISEASE_COVERAGE['beta-thalassemia']).not.toBe('EXPANDED');
  });

  it('the EDS layer is empty — absence of evidence, not evidence of absence (spec §28/§29)', () => {
    const eds = filterEvidence(VALID, { ...DEFAULT_FILTERS, disease: 'ehlers-danlos-syndrome' });
    expect(eds).toHaveLength(0);
  });

  it('LSD evidence stays per-record and is never merged into one group prevalence (spec §27)', () => {
    const lsd = filterEvidence(VALID, { ...DEFAULT_FILTERS, disease: 'lysosomal-storage-disorders' });
    expect(lsd.length).toBeGreaterThan(1);
    // A subtype-specific record keeps its own subtype id (not folded into the group).
    expect(lsd.some((r) => r.diseaseSubtypeId === 'gaucher-disease')).toBe(true);
    // Clustering never sums them into a single aggregate estimate — it only counts records.
    const clusters = clusterEvidence(lsd);
    const total = clusters.reduce((s, c) => s + c.records.length, 0);
    expect(total).toBe(lsd.length);
  });

  it('CF evidence never claims a national incidence (spec §26)', () => {
    const cf = filterEvidence(VALID, { ...DEFAULT_FILTERS, disease: 'cystic-fibrosis' });
    expect(cf.length).toBeGreaterThan(0);
    for (const record of cf) {
      expect(record.cannotTellUs.en.toLowerCase()).toMatch(
        /national|underdiagn|population|prevalence|incidence|how many/,
      );
    }
    expect(DISEASE_COVERAGE['cystic-fibrosis']).not.toBe('EXPANDED');
  });
});

describe('Geography projection (spec §44/§46)', () => {
  it('projects every marker inside the map viewBox', () => {
    for (const record of VALID) {
      const { x, y } = projectPoint(record.longitude, record.latitude);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(MAP_VIEWBOX.width);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(MAP_VIEWBOX.height);
    }
  });

  it('accepts in-country coordinates and rejects far-away ones', () => {
    expect(isWithinPakistanBounds(67.01, 24.86)).toBe(true); // Karachi
    expect(isWithinPakistanBounds(-0.12, 51.5)).toBe(false); // London
  });
});
