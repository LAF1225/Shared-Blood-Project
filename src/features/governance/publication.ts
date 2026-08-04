import { PROHIBITED_CLAIMS } from './data/config';
import { sensitivityRank } from './resolvers';
import type {
  DataSensitivity,
  ProhibitedClaimRule,
  PublicationGateId,
  PublicationGovernanceReview,
} from './types';

/**
 * PublicationGate + GovernanceResolver + public-client filtering (spec §21/§25/§82).
 * Pure and framework-free so publication gating and public-client filtering are
 * independently testable (spec §36). Invariant: No Required Governance Review = Do
 * Not Publish (spec §135). `publicDisplayAllowed` alone is NOT sufficient — every
 * required gate must be satisfied before client serialization (spec §82).
 */

export interface ClaimCheckResult {
  status: 'ALLOWED' | 'PROHIBITED';
  matches: { id: string; category: ProhibitedClaimRule['category']; reason: string }[];
}

/**
 * Scan ASSERTIVE public text for prohibited claims (spec §25/§26/§27/§83): no
 * unsupported impact (lives saved, policy changed), diagnosis, prevalence/hotspot,
 * stigma/eugenics, genetic scores, or reproductive directives. Apply to positive
 * claims — NOT to boundary text that explicitly disclaims these (e.g. Module 18's
 * "What This Does Not Show" or Module 19's "What This Advocacy Does Not Claim").
 */
export function checkPublicClaim(text: string, locale: 'en' | 'ur' = 'en'): ClaimCheckResult {
  const haystack = text.toLowerCase();
  const matches: ClaimCheckResult['matches'] = [];
  for (const rule of PROHIBITED_CLAIMS) {
    const re = new RegExp(rule.pattern, 'i');
    if (re.test(haystack)) {
      matches.push({ id: rule.id, category: rule.category, reason: rule.reason[locale] });
    }
  }
  return { status: matches.length > 0 ? 'PROHIBITED' : 'ALLOWED', matches };
}

/** True when a public claim contains no prohibited language (spec §25). */
export function isClaimAllowed(text: string): boolean {
  return checkPublicClaim(text).status === 'ALLOWED';
}

/* -------------------- Publication gate (spec §82) -------------------- */

/** The gates a review still needs (spec §82). */
export function missingGates(review: PublicationGovernanceReview): PublicationGateId[] {
  const satisfied = new Set(review.satisfiedGates);
  return review.requiredGates.filter((g) => !satisfied.has(g));
}

/**
 * A record may be published only when it is marked publicDisplayAllowed AND every
 * required review gate is satisfied (spec §82). publicDisplayAllowed alone is not
 * enough.
 */
export function canPublish(review: PublicationGovernanceReview): boolean {
  return review.publicDisplayAllowed && missingGates(review).length === 0;
}

/* -------------------- Public-client filtering (spec §21/§69) -------------------- */

/**
 * Only PUBLIC-class data may reach a public client bundle (spec §21). Private data
 * is never delivered to the browser and hidden with CSS (spec §69).
 */
export function isServableToPublicClient(sensitivity: DataSensitivity): boolean {
  return sensitivityRank(sensitivity) === sensitivityRank('PUBLIC');
}

/** Keep only records that are safe to serialize to a public client (spec §21). */
export function filterForPublicClient<T extends { sensitivity: DataSensitivity }>(
  records: readonly T[],
): T[] {
  return records.filter((r) => isServableToPublicClient(r.sensitivity));
}

/** Sensitive data must never appear in URLs/query params (spec §31) — carrier
 * status, disease risk, family history, consanguinity values, or persisted
 * calculator values. */
const URL_FORBIDDEN = [
  'carrier_status',
  'carrierstatus',
  'disease_risk',
  'diseaserisk',
  'family_history',
  'familyhistory',
  'consanguinity',
  'child_risk',
  'childrisk',
  'carrier_probability',
];
export function urlParamsAreSafe(params: Record<string, unknown>): boolean {
  return !Object.keys(params).some((k) => URL_FORBIDDEN.includes(k.toLowerCase()));
}
