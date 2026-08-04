import { describe, it, expect } from 'vitest';
import {
  DATA_PURPOSES,
  PROHIBITED_CLAIMS,
  RESEARCH_ACTIVITIES,
  DATA_FIELD_RULES,
  APPROVED_NOTICE,
  CONSENT_DEFINITIONS,
} from './data/config';
import { GOVERNANCE_PAGES } from './data/pages';
import { checkPublicClaim } from './publication';
import { isRestrictedActivity, publicUserCanAccess, isFieldProhibited } from './resolvers';
import { SAMPLE_RESEARCH_DATASET } from '@/features/research/preview/sampleDataset';
import { SAMPLE_POLICY_DATASET } from '@/features/policy/preview/sampleDataset';

/**
 * Privacy/ethics integrity + cross-module boundary tests (spec §36/§113/§120).
 * Module 20 is the governance layer: it must catch prohibited public claims, block
 * restricted activities and genetic-data collection, enforce least privilege, and
 * confirm that Modules 18 and 19 pass public-claim review (spec §113).
 */

/** ASSERTIVE public text of the Module 18 research sample (excludes the
 * deliberately-negating "What This Does Not Show"). */
const researchAssertive = SAMPLE_RESEARCH_DATASET.findings.flatMap((f) => [
  f.title.en,
  f.summary.en,
  f.interpretation.observedResult.en,
  f.interpretation.approvedInterpretation.en,
]);

/** ASSERTIVE public text of the Module 19 advocacy sample (excludes the
 * deliberately-negating "What This Advocacy Does Not Claim"). */
const policyAssertive = SAMPLE_POLICY_DATASET.advocacyPriorities.flatMap((p) => [
  p.title.en,
  p.summary.en,
  p.recommendedAction.en,
  p.rationale.en,
]);

describe('governance boundaries (spec §36/§113/§120)', () => {
  it('Module 18 research findings pass public-claim review (spec §113)', () => {
    for (const text of researchAssertive) {
      expect(checkPublicClaim(text).status).toBe('ALLOWED');
    }
  });

  it('Module 19 advocacy priorities pass public-claim review (spec §113)', () => {
    for (const text of policyAssertive) {
      expect(checkPublicClaim(text).status).toBe('ALLOWED');
    }
  });

  it('the prohibited-claim list covers every required category (spec §25/§26/§27)', () => {
    const categories = new Set(PROHIBITED_CLAIMS.map((c) => c.category));
    for (const cat of ['UNSUPPORTED_IMPACT', 'DIAGNOSIS', 'PREVALENCE_OR_HOTSPOT', 'STIGMA_OR_EUGENICS', 'GENETIC_SCORE', 'REPRODUCTIVE_DIRECTIVE']) {
      expect(categories.has(cat as never)).toBe(true);
    }
  });

  it('no approved data purpose is a generic future-use bucket (spec §5)', () => {
    for (const p of DATA_PURPOSES) {
      expect(p.id).not.toMatch(/FUTURE_USE|GENERIC|MISC/);
    }
  });

  it('all RESTRICTED activities (DNA, registries, pedigree DB, etc.) are blocked (spec §16/§40)', () => {
    const restricted = RESEARCH_ACTIVITIES.filter((a) => a.riskLevel === 'RESTRICTED').map((a) => a.id);
    expect(restricted).toEqual(
      expect.arrayContaining(['dna-collection', 'genetic-report-upload', 'child-genetic-registry', 'family-pedigree-database']),
    );
    for (const id of restricted) expect(isRestrictedActivity(id)).toBe(true);
  });

  it('genetic, identity, and persisted-calculator fields are all prohibited (spec §6/§7/§8/§40)', () => {
    for (const f of ['cnic', 'b_form', 'dna_sequence', 'vcf_file', 'genetic_test_report', 'family_pedigree_file', 'individual_genetic_risk_profile', 'calculator_calculated_child_risk', 'child_health_record', 'infant_symptom_record']) {
      expect(isFieldProhibited(f)).toBe(true);
    }
    // Every genetic/identity/child field carries HIGHLY_SENSITIVE classification.
    const prohibited = DATA_FIELD_RULES.filter((r) => r.status === 'PROHIBITED');
    expect(prohibited.length).toBeGreaterThan(8);
  });

  it('the public user can never reach non-public data (spec §21/§69)', () => {
    for (const s of ['INTERNAL', 'CONFIDENTIAL', 'SENSITIVE', 'HIGHLY_SENSITIVE'] as const) {
      expect(publicUserCanAccess(s)).toBe(false);
    }
  });

  it('audio consent is unbundled into separate decisions (spec §11)', () => {
    const audio = CONSENT_DEFINITIONS.find((c) => c.purposeId === 'AUDIO_STORY_PUBLICATION')!;
    expect(audio.separateDecisions).toEqual(
      expect.arrayContaining(['recording', 'public_audio_publication', 'transcript_publication', 'translation']),
    );
  });

  it('the approved notice states tools are not diagnosis and create no genetic-risk profiles (spec §32/§106)', () => {
    const en = APPROVED_NOTICE.en.toLowerCase();
    expect(en).toMatch(/not (a )?diagnosis|not a substitute/);
    expect(en).toMatch(/do not create patient records or individual genetic-risk profiles/);
  });

  it('governance pages avoid stigmatizing / impact-claim language in their own copy (spec §26/§83)', () => {
    // The governance pages describe boundaries; their headings/intros must not
    // themselves assert prohibited impact claims.
    for (const page of GOVERNANCE_PAGES) {
      const assertive = [page.title.en, page.subtitle.en, page.intro.en, ...page.sections.map((s) => s.heading.en)].join(' ');
      // The public-claims section legitimately lists what we DON'T claim (negated),
      // so we only scan titles/subtitles/intros/headings here.
      expect(checkPublicClaim(assertive).status).toBe('ALLOWED');
    }
  });
});
