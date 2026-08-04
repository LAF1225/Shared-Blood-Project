import { describe, it, expect } from 'vitest';
import { PUBLIC_POLICY_DATASET } from './data/dataset';
import { SAMPLE_POLICY_DATASET } from './preview/sampleDataset';
import { getRenderablePriorities, getInheritedResearchBoundaries } from './resolve';
import { isValidDataset } from './validate';
import { SAMPLE_RESEARCH_DATASET } from '@/features/research/preview/sampleDataset';

const ds = SAMPLE_POLICY_DATASET;
const priorityOf = (id: string) => ds.advocacyPriorities.find((p) => p.id === id)!;

/** ASSERTIVE (non-negating) text of a priority — excludes doesNotClaim/ethics,
 * which deliberately disclaim coercive/impact language. */
function assertive(id: string): string {
  const p = priorityOf(id);
  return [p.title.en, p.summary.en, p.recommendedAction.en, p.rationale.en, p.educationalPurpose.en]
    .join(' ')
    .toLowerCase();
}
const allAssertive = ds.advocacyPriorities.map((p) => assertive(p.id)).join(' ');
const recAssertive = ds.recommendations
  .map((r) => `${r.title.en} ${r.actionStatement.en}`)
  .join(' ')
  .toLowerCase();

/**
 * Advocacy integrity + cross-module boundary tests (spec §114/§115). These encode
 * the guardrails that keep Module 19 education-focused, voluntary, non-coercive,
 * non-stigmatizing, evidence-bounded, and politically neutral.
 */
describe('policy & advocacy boundaries (spec §114/§115)', () => {
  it('production public data is EMPTY — no fabricated advocacy (spec §112)', () => {
    expect(PUBLIC_POLICY_DATASET).toBeNull();
  });

  it('the sample dataset validates end-to-end (spec §114)', () => {
    expect(isValidDataset(ds)).toBe(true);
  });

  it('every priority has doesNotClaim and inherits its research boundary (spec §72/§99)', () => {
    for (const p of getRenderablePriorities(ds)) {
      expect(p.doesNotClaim.en.trim().length).toBeGreaterThan(0);
      const citesResearch = p.evidenceLinkIds.some((id) => {
        const link = ds.evidenceLinks.find((l) => l.id === id);
        return link?.sourceType === 'RESEARCH_FINDING';
      });
      if (citesResearch) expect(getInheritedResearchBoundaries(ds, p).length).toBeGreaterThan(0);
    }
  });

  it('advocates no coercive genetic-health policy (spec §6/§33/§44)', () => {
    const banned = /ban(ning)? cousin marriage|criminali[sz]e|mandatory (genetic )?testing|compulsory (carrier )?screening|forced (carrier )?disclosure|sterili[sz]ation|reproductive restriction|marriage licens|genetic regist/;
    expect(allAssertive).not.toMatch(banned);
    expect(recAssertive).not.toMatch(banned);
  });

  it('makes no unsupported impact claims (spec §62)', () => {
    const banned = /lives saved|policy changed|government policy influenced|disease burden reduced|misdiagnosis prevented|national awareness improved|healthcare outcomes improved/;
    expect(allAssertive).not.toMatch(banned);
    expect(recAssertive).not.toMatch(banned);
  });

  it('invents no partnerships or endorsements (spec §65)', () => {
    const corpus = [
      allAssertive,
      ds.stakeholders.map((s) => `${s.name.en} ${s.recommendedRole.en}`).join(' '),
      ds.engagements.map((e) => e.publicSummary.en).join(' '),
    ].join(' ').toLowerCase();
    expect(corpus).not.toMatch(/in partnership with|endorsed by|supported by [a-z]|working with the government/);
  });

  it('remains politically neutral (spec §79)', () => {
    const corpus = ds.advocacyPriorities.map((p) => `${p.summary.en} ${p.rationale.en}`).join(' ').toLowerCase();
    expect(corpus).not.toMatch(/political party|vote for|candidate|election campaign|partisan/);
  });

  it('makes no legal claims without review (spec §78)', () => {
    // Assertive fields must not assert legal status; the LEGAL_CONTEXT_NOT_REVIEWED
    // limitation legitimately says legal context was not reviewed.
    expect(allAssertive).not.toMatch(/legally required|legally prohibited|constitutionally required|is illegal/);
    const legalLim = ds.limitations.find((l) => l.limitationType === 'LEGAL_CONTEXT_NOT_REVIEWED');
    expect(legalLim).toBeDefined();
  });

  it('keeps carrier distinct from affected, and childcare workers as non-diagnosticians (spec §31/§36)', () => {
    expect(priorityOf('ap-carrier-awareness').doesNotClaim.en.toLowerCase()).toMatch(/carrier status is not a disease/);
    expect(priorityOf('ap-childcare-training').doesNotClaim.en.toLowerCase()).toMatch(/not diagnosticians/);
  });

  it('frames consanguinity education as non-anti-marriage (spec §43/§44)', () => {
    const dnc = priorityOf('ap-community-education').doesNotClaim.en.toLowerCase();
    expect(dnc).toMatch(/not anti-marriage|does not advocate banning cousin marriage/);
    // The assertive framing itself uses respectful, voluntary language.
    expect(assertive('ap-community-education')).toMatch(/non-stigmatizing|voluntary/);
  });

  it('does not nationally generalize convenience-sample or field evidence (spec §13/§37/§50)', () => {
    for (const issue of ds.policyIssues) expect(issue.geographicScope).not.toBe('NATIONAL');
    expect(allAssertive).not.toMatch(/pakistan has failed to educate|nationally representative|across pakistan the/);
  });

  it('does not call a NOT_EVALUATED recommendation proven effective (spec §24)', () => {
    for (const r of ds.recommendations) {
      if (r.interventionEvidenceStatus === 'NOT_EVALUATED') {
        expect(`${r.title.en} ${r.actionStatement.en}`.toLowerCase()).not.toMatch(/proven effective|proven to work|guaranteed/);
      }
    }
  });

  it('outcomes reflect documented events, not inflated impact (spec §61/§62)', () => {
    for (const o of ds.outcomes) {
      expect(o.description.en.toLowerCase()).not.toMatch(/policy was adopted|policy changed|recommendation adopted as policy/);
    }
    // A brief being shared is recorded as BRIEF_SHARED, not as adoption.
    expect(ds.outcomes.some((o) => o.outcomeType === 'BRIEF_SHARED')).toBe(true);
  });

  it('preserves Module 18 as the evidence source of record (spec §12/§99)', () => {
    const approvedResearch = SAMPLE_RESEARCH_DATASET.findings
      .filter((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')
      .map((f) => f.id);
    for (const id of ds.evidenceRegistry.researchFindingIds) {
      expect(approvedResearch).toContain(id);
    }
  });
});
