import { describe, it, expect } from 'vitest';
import {
  checkPublicClaim,
  isClaimAllowed,
  canPublish,
  missingGates,
  isServableToPublicClient,
  filterForPublicClient,
  urlParamsAreSafe,
} from './publication';
import type { PublicationGovernanceReview } from './types';

describe('publication gate & public-claim checker (spec §21/§25/§82)', () => {
  it('detects prohibited impact / diagnosis / stigma / score claims (spec §25/§26/§83)', () => {
    const bad = [
      'Shared Blood saved lives across Pakistan',
      'This work prevented misdiagnosis in thousands',
      'Our programme changed government policy',
      'We diagnosed patients in the community',
      'This map shows the disease hotspot',
      'These are genetically inferior communities',
      'A marriage safety score for each couple',
      'You must not marry your cousin',
    ];
    for (const t of bad) {
      expect(checkPublicClaim(t).status).toBe('PROHIBITED');
      expect(isClaimAllowed(t)).toBe(false);
    }
  });

  it('allows bounded, non-claiming educational text', () => {
    const ok = [
      'Among respondents surveyed, 90% had heard of beta thalassemia.',
      'Shared Blood advocates for clearer, voluntary carrier education.',
      'This finding describes the survey sample and its limitations.',
    ];
    for (const t of ok) expect(isClaimAllowed(t)).toBe(true);
  });

  it('categorises a prohibited claim', () => {
    expect(checkPublicClaim('we saved lives').matches[0].category).toBe('UNSUPPORTED_IMPACT');
    expect(checkPublicClaim('this is a genetic compatibility score').matches[0].category).toBe('GENETIC_SCORE');
  });

  it('publishes only when publicDisplayAllowed AND all required gates pass (spec §82)', () => {
    const base: PublicationGovernanceReview = {
      resourceId: 'r',
      requiredGates: ['EVIDENCE_REVIEW', 'PUBLIC_CLAIM_REVIEW', 'PRIVACY_REVIEW'],
      satisfiedGates: ['EVIDENCE_REVIEW', 'PUBLIC_CLAIM_REVIEW', 'PRIVACY_REVIEW'],
      publicDisplayAllowed: true,
    };
    expect(canPublish(base)).toBe(true);
    // publicDisplayAllowed alone is not enough.
    expect(canPublish({ ...base, satisfiedGates: ['EVIDENCE_REVIEW'] })).toBe(false);
    expect(missingGates({ ...base, satisfiedGates: ['EVIDENCE_REVIEW'] })).toEqual(['PUBLIC_CLAIM_REVIEW', 'PRIVACY_REVIEW']);
    // all gates but not display-approved.
    expect(canPublish({ ...base, publicDisplayAllowed: false })).toBe(false);
  });

  it('only serves PUBLIC-class data to the public client (spec §21/§69)', () => {
    expect(isServableToPublicClient('PUBLIC')).toBe(true);
    expect(isServableToPublicClient('CONFIDENTIAL')).toBe(false);
    const filtered = filterForPublicClient([
      { id: 'a', sensitivity: 'PUBLIC' as const },
      { id: 'b', sensitivity: 'SENSITIVE' as const },
      { id: 'c', sensitivity: 'PUBLIC' as const },
    ]);
    expect(filtered.map((r) => r.id)).toEqual(['a', 'c']);
  });

  it('keeps sensitive values out of URLs (spec §31)', () => {
    expect(urlParamsAreSafe({ disease: 'beta-thalassemia', locale: 'en' })).toBe(true);
    expect(urlParamsAreSafe({ carrier_status: 'carrier' })).toBe(false);
    expect(urlParamsAreSafe({ child_risk: '25' })).toBe(false);
  });
});
