/**
 * Module 21 — Feature Audit, Redundancy Review & Scope Lock System.
 *
 * DEV / BUILD-TIME ONLY barrel. NEVER import this from a route, page, layout, or
 * client component — the audit registry must not enter the public client bundle
 * (spec §62/§64). It exists for type-checking, the self-consistency test, and
 * reviewer tooling that reads the records alongside
 * `docs/audits/shared-blood-feature-audit-v1.md`.
 */
export * from './types';
export {
  FEATURE_AUDIT_RECORDS,
  byClassification,
  byPriority,
  governanceViolations,
  classificationCounts,
} from './featureAudit';
export {
  REDUNDANCY_RECORDS,
  MISSING_FEATURE_RECORDS,
  MODULE_COMPARISONS,
  MODULE_22_CANDIDATES,
  MODULE_23_CANDIDATES,
  MODULE_24_CANDIDATES,
  MODULE_25_CANDIDATES,
  HUMAN_DECISIONS_REQUIRED,
  SCOPE_LOCK,
} from './findings';
