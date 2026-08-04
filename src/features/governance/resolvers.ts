import {
  ACCESS_POLICIES,
  CONSENT_DEFINITIONS,
  DATA_FIELD_RULES,
  DATA_PURPOSES,
  RESEARCH_ACTIVITIES,
  RETENTION_RULES,
} from './data/config';
import type {
  AccessAction,
  AccessRole,
  ConsentDefinition,
  DataFieldRule,
  DataPurposeDefinition,
  DatasetGovernanceMeta,
  DataSensitivity,
  ResearchActivityRule,
  RetentionRule,
} from './types';

/**
 * Pure, framework-free governance resolvers (spec §36). Independently testable
 * from any UI. These encode the invariants: No Approved Purpose = Do Not Collect
 * (spec §5/§134); least-privilege access (spec §20); human ethics review is never
 * automated (spec §17/§56); retention needs a live purpose (spec §23).
 */

/** Sensitivity ordering, low → high (spec §6). */
const SENSITIVITY_ORDER: DataSensitivity[] = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'SENSITIVE', 'HIGHLY_SENSITIVE'];
export function sensitivityRank(s: DataSensitivity): number {
  return SENSITIVITY_ORDER.indexOf(s);
}

/* -------------------- Data purpose (spec §5) -------------------- */

/** Resolve an approved data purpose. Returns null for any unknown id — there is
 * no generic FUTURE_USE purpose, so no purpose ⇒ do not collect (spec §5). */
export function resolvePurpose(id: string): DataPurposeDefinition | null {
  return DATA_PURPOSES.find((p) => p.id === id) ?? null;
}

/** No Approved Purpose = Do Not Collect (spec §134). */
export function collectionAllowed(purposeId: string): boolean {
  return resolvePurpose(purposeId) !== null;
}

export function purposeRequiresConsent(purposeId: string): boolean {
  return resolvePurpose(purposeId)?.requiresConsent ?? false;
}

/* -------------------- Data minimization (spec §8) -------------------- */

export function fieldRule(field: string): DataFieldRule | null {
  return DATA_FIELD_RULES.find((f) => f.field === field) ?? null;
}

/** A field is collectable only if it is REQUIRED or OPTIONAL_JUSTIFIED; NOT_NECESSARY
 * and PROHIBITED (and unknown fields, which lack a necessity justification) are not
 * collected (spec §8). */
export function isFieldCollectable(field: string): boolean {
  const rule = fieldRule(field);
  return rule !== null && (rule.status === 'REQUIRED' || rule.status === 'OPTIONAL_JUSTIFIED');
}

/** A field explicitly prohibited from collection (spec §6/§7/§8/§30). */
export function isFieldProhibited(field: string): boolean {
  return fieldRule(field)?.status === 'PROHIBITED';
}

/* -------------------- Consent (spec §10/§11) -------------------- */

/** The consent definition governing a purpose (spec §10). Null if that purpose
 * needs consent but none is defined — which must block the activity. */
export function resolveConsentDefinition(purposeId: string): ConsentDefinition | null {
  return CONSENT_DEFINITIONS.find((c) => c.purposeId === purposeId) ?? null;
}

/** True when a consent-requiring purpose has an approved, bilingual, purpose-
 * specific definition that does not bundle separate decisions (spec §10/§11). */
export function consentGovernanceSatisfied(purposeId: string): boolean {
  const purpose = resolvePurpose(purposeId);
  if (!purpose) return false;
  if (!purpose.requiresConsent) return true;
  const def = resolveConsentDefinition(purposeId);
  return def !== null && def.bilingualReviewApproved && def.explains.purpose && def.explains.voluntariness && def.explains.withdrawal;
}

/* -------------------- Access control (spec §20) -------------------- */

/** Least-privilege access resolution (spec §20). A role may perform an action
 * only up to its maximum sensitivity; anything unlisted is denied. */
export function canPerform(role: AccessRole, action: AccessAction, sensitivity: DataSensitivity): boolean {
  const rule = ACCESS_POLICIES.find((r) => r.role === role && r.action === action);
  if (!rule) return false;
  return sensitivityRank(sensitivity) <= sensitivityRank(rule.maxSensitivity);
}

/** The public user may only ever VIEW PUBLIC data (spec §20/§21). */
export function publicUserCanAccess(sensitivity: DataSensitivity): boolean {
  return canPerform('PUBLIC_USER', 'VIEW', sensitivity);
}

/* -------------------- Retention (spec §23) -------------------- */

export function retentionRuleFor(purposeId: string): RetentionRule | null {
  return RETENTION_RULES.find((r) => r.purposeId === purposeId) ?? null;
}

/**
 * Retention decision (spec §23): a live purpose justifies retention; when the
 * purpose ends, retention is reviewed; with no continuing justification, data is
 * deleted or anonymized. "May be useful later" is never a justification.
 */
export function retentionDecision(purposeActive: boolean): 'RETAIN' | 'REVIEW_THEN_DELETE_OR_ANONYMIZE' {
  return purposeActive ? 'RETAIN' : 'REVIEW_THEN_DELETE_OR_ANONYMIZE';
}

/* -------------------- Ethics & research activity (spec §16/§17) -------------------- */

export function resolveResearchActivity(id: string): ResearchActivityRule | null {
  return RESEARCH_ACTIVITIES.find((a) => a.id === id) ?? null;
}

/** RESTRICTED activities must not be implemented in Version 1 (spec §16). */
export function isRestrictedActivity(id: string): boolean {
  return resolveResearchActivity(id)?.riskLevel === 'RESTRICTED';
}

/** Whether an activity may proceed at all in Version 1 (spec §16). RESTRICTED and
 * unknown activities may not. */
export function activityAllowedInV1(id: string): boolean {
  const a = resolveResearchActivity(id);
  return a !== null && a.riskLevel !== 'RESTRICTED';
}

/**
 * Ethics approval always requires human review — the codebase must NEVER decide an
 * activity is ethically approved, safe to publish, legally sufficient, or
 * compliant (spec §17/§56). This returns true for every activity by design.
 */
export function ethicsRequiresHumanReview(_id: string): boolean {
  return true;
}

/* -------------------- Dataset governance (spec §20/§66) -------------------- */

/** Incomplete governance metadata blocks public research publication (spec §66). */
export function datasetGovernanceComplete(meta: DatasetGovernanceMeta): boolean {
  return (
    meta.purposeId !== null &&
    resolvePurpose(meta.purposeId) !== null &&
    meta.consentDefined &&
    meta.retentionDefined &&
    meta.accessDefined &&
    meta.deidentificationReviewed &&
    meta.smallGroupReviewed &&
    meta.publicationPlanApproved
  );
}
