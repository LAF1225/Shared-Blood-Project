import { describe, it, expect } from 'vitest';
import { checkPublicClaim } from '@/features/governance/publication';
import { DISEASE_MOLECULAR_RECORDS } from './dna/data/records';
import { resolveDnaEducation } from './dna/resolver';
import { PUNNETT_SCENARIOS, resolvePunnettScenario } from './punnett/scenarios';

/**
 * Module 22 governance & relationship boundary tests (§57/§64).
 *
 * Proves the new interactive tools respect Module 20 (governance wins, §3):
 * all DNA + Punnett public text passes the Module 20 public-claim checker (no
 * impact/diagnosis/stigma/genetic-score/reproductive-directive claims); no
 * hypermobile-EDS mechanism or grid is ever fabricated; and relationship
 * scenarios never auto-produce a result or infer genotype.
 */

/** Every assertive public string the DNA Explorer can render. */
const dnaText: string[] = [];
for (const record of DISEASE_MOLECULAR_RECORDS) {
  dnaText.push(record.overview.en);
  if (record.limitations) dnaText.push(record.limitations.en);
  for (const mechanism of record.mechanisms) {
    dnaText.push(mechanism.label.en);
    if (mechanism.limitation) {
      dnaText.push(mechanism.limitation.title.en, mechanism.limitation.explanation.en);
    }
    for (const step of mechanism.steps) {
      dnaText.push(step.title.en, step.explanation.en);
      if (step.callout) dnaText.push(step.callout.en);
    }
  }
}

const punnettText = PUNNETT_SCENARIOS.map((s) => s.id);

describe('Module 22 governance boundaries (§64)', () => {
  it('all DNA Explorer public text passes the Module 20 public-claim review (§3/§64)', () => {
    for (const text of dnaText) {
      expect(checkPublicClaim(text).status, text.slice(0, 40)).toBe('ALLOWED');
    }
  });

  it('no DNA text asserts diagnosis, prediction, stigma, or a genetic score (§7/§64)', () => {
    const banned = /\b(diagnos|marriage safety|compatibility score|genetically inferior|must not marry|should not have children)\b/i;
    for (const text of dnaText) expect(text).not.toMatch(banned);
  });

  it('never builds a mechanism or grid for hypermobile EDS (§15/§32)', () => {
    const heds = resolveDnaEducation('ehlers-danlos-syndrome', 'hypermobile');
    expect(heds.state).toBe('LIMITED_MECHANISM');
    // and there is no hypermobile Punnett scenario at all
    expect(PUNNETT_SCENARIOS.some((s) => /hypermobile|heds/i.test(s.id))).toBe(false);
  });

  it('Punnett scenarios are explicit hypotheticals resolved by the canonical engine (§38/§57)', () => {
    // No relationship or disease drives them: they are fixed, disease-agnostic
    // pairings, and nothing resolves without an explicit scenario id.
    expect(resolvePunnettScenario(null)).toBeNull();
    for (const scenario of PUNNETT_SCENARIOS) {
      const resolved = resolvePunnettScenario(scenario.id);
      expect(resolved?.calculation.supported).toBe(true);
    }
  });

  it('no scenario id implies a compatibility / marriage-safety score (§34/§64)', () => {
    for (const id of punnettText) {
      expect(checkPublicClaim(id).status).toBe('ALLOWED');
      expect(id).not.toMatch(/compatib|marriage|safety|risk-score/i);
    }
  });
});
