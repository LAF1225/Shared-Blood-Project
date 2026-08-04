import { describe, it, expect } from 'vitest';
import {
  resolvePurpose,
  collectionAllowed,
  purposeRequiresConsent,
  isFieldCollectable,
  isFieldProhibited,
  resolveConsentDefinition,
  consentGovernanceSatisfied,
  canPerform,
  publicUserCanAccess,
  retentionDecision,
  isRestrictedActivity,
  activityAllowedInV1,
  ethicsRequiresHumanReview,
  datasetGovernanceComplete,
} from './resolvers';
import type { DatasetGovernanceMeta } from './types';

describe('governance resolvers (spec §5/§8/§16/§17/§20/§23)', () => {
  it('resolves approved purposes and rejects a generic FUTURE_USE (spec §5)', () => {
    expect(resolvePurpose('SURVEY_RESEARCH')).not.toBeNull();
    expect(resolvePurpose('FUTURE_USE')).toBeNull();
    expect(collectionAllowed('FUTURE_USE')).toBe(false);
    expect(collectionAllowed('SURVEY_RESEARCH')).toBe(true);
  });

  it('knows which purposes require consent (spec §10)', () => {
    expect(purposeRequiresConsent('AUDIO_STORY_PUBLICATION')).toBe(true);
    expect(purposeRequiresConsent('LOCALIZATION_PREFERENCE')).toBe(false);
  });

  it('prohibits genetic, identity, and persisted-calculator fields (spec §6/§7/§8)', () => {
    for (const f of ['cnic', 'dna_sequence', 'vcf_file', 'genetic_test_report', 'calculator_calculated_child_risk', 'child_health_record']) {
      expect(isFieldProhibited(f)).toBe(true);
      expect(isFieldCollectable(f)).toBe(false);
    }
    expect(isFieldCollectable('age_range')).toBe(true); // OPTIONAL_JUSTIFIED
    expect(isFieldCollectable('exact_date_of_birth')).toBe(false); // NOT_NECESSARY
    expect(isFieldCollectable('unknown_field')).toBe(false); // no necessity justification
  });

  it('requires an approved, bilingual, purpose-specific consent definition (spec §10/§11)', () => {
    expect(resolveConsentDefinition('AUDIO_STORY_PUBLICATION')?.separateDecisions.length).toBeGreaterThan(1);
    expect(consentGovernanceSatisfied('SURVEY_RESEARCH')).toBe(true);
    expect(consentGovernanceSatisfied('AUDIO_STORY_PUBLICATION')).toBe(true);
    // A consent-requiring purpose with no defined consent is not satisfied.
    expect(consentGovernanceSatisfied('INSTITUTIONAL_ENGAGEMENT')).toBe(false);
  });

  it('enforces least-privilege access (spec §20)', () => {
    expect(publicUserCanAccess('PUBLIC')).toBe(true);
    expect(publicUserCanAccess('INTERNAL')).toBe(false);
    expect(canPerform('CONTENT_EDITOR', 'EDIT', 'INTERNAL')).toBe(true);
    expect(canPerform('CONTENT_EDITOR', 'EDIT', 'SENSITIVE')).toBe(false);
    expect(canPerform('CONTENT_EDITOR', 'DELETE', 'INTERNAL')).toBe(false); // no delete right
    expect(canPerform('ETHICS_REVIEWER', 'APPROVE', 'HIGHLY_SENSITIVE')).toBe(true);
    expect(canPerform('GOVERNANCE_ADMIN', 'EXPORT', 'HIGHLY_SENSITIVE')).toBe(true);
    expect(canPerform('RESEARCH_EDITOR', 'APPROVE', 'CONFIDENTIAL')).toBe(false); // editors don't approve
  });

  it('retains only with a live purpose (spec §23)', () => {
    expect(retentionDecision(true)).toBe('RETAIN');
    expect(retentionDecision(false)).toBe('REVIEW_THEN_DELETE_OR_ANONYMIZE');
  });

  it('blocks RESTRICTED research activities in Version 1 (spec §16)', () => {
    for (const a of ['dna-collection', 'genetic-report-upload', 'child-genetic-registry', 'family-pedigree-database', 'clinical-diagnosis-research', 'reproductive-decision-tracking']) {
      expect(isRestrictedActivity(a)).toBe(true);
      expect(activityAllowedInV1(a)).toBe(false);
    }
    expect(activityAllowedInV1('awareness-survey')).toBe(true);
    expect(activityAllowedInV1('unknown-activity')).toBe(false);
  });

  it('always requires human ethics review — never auto-approves (spec §17)', () => {
    expect(ethicsRequiresHumanReview('awareness-survey')).toBe(true);
    expect(ethicsRequiresHumanReview('anything')).toBe(true);
  });

  it('blocks publication when dataset governance metadata is incomplete (spec §66)', () => {
    const complete: DatasetGovernanceMeta = {
      datasetId: 'd', purposeId: 'SURVEY_RESEARCH', consentDefined: true, retentionDefined: true,
      accessDefined: true, deidentificationReviewed: true, smallGroupReviewed: true, publicationPlanApproved: true,
    };
    expect(datasetGovernanceComplete(complete)).toBe(true);
    expect(datasetGovernanceComplete({ ...complete, deidentificationReviewed: false })).toBe(false);
    expect(datasetGovernanceComplete({ ...complete, purposeId: null })).toBe(false);
  });
});
