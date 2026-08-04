/**
 * Privacy, Ethics & Research Governance System (Module 20).
 *
 * The top-level governance layer for Shared Blood (spec §3): where a Module 20
 * requirement conflicts with Modules 01–19, the stricter Module 20 requirement
 * wins. It ships PURE, INDEPENDENTLY-TESTABLE resolvers (data-purpose, consent,
 * access, retention, ethics, dataset governance), a PublicationGate + public-claim
 * checker + public-client filter, and real approved public governance pages —
 * never an automated AI ethics/consent/publication engine (spec §17/§35).
 *
 * Invariants: No Approved Purpose = Do Not Collect · No Required Governance Review
 * = Do Not Publish · Module Conflict = Module 20 Governance Requirement Wins.
 */
export { GovernancePage } from './components/GovernancePage';

export {
  GOVERNANCE_PRINCIPLES,
  DATA_PURPOSES,
  DATA_FIELD_RULES,
  PROHIBITED_CLAIMS,
  ACCESS_POLICIES,
  RETENTION_RULES,
  RESEARCH_ACTIVITIES,
  CONSENT_DEFINITIONS,
  APPROVED_NOTICE,
  GOVERNANCE_VERSION,
} from './data/config';
export { GOVERNANCE_PAGES, getGovernancePage } from './data/pages';

export {
  sensitivityRank,
  resolvePurpose,
  collectionAllowed,
  purposeRequiresConsent,
  fieldRule,
  isFieldCollectable,
  isFieldProhibited,
  resolveConsentDefinition,
  consentGovernanceSatisfied,
  canPerform,
  publicUserCanAccess,
  retentionRuleFor,
  retentionDecision,
  resolveResearchActivity,
  isRestrictedActivity,
  activityAllowedInV1,
  ethicsRequiresHumanReview,
  datasetGovernanceComplete,
} from './resolvers';

export {
  checkPublicClaim,
  isClaimAllowed,
  missingGates,
  canPublish,
  isServableToPublicClient,
  filterForPublicClient,
  urlParamsAreSafe,
} from './publication';
export type { ClaimCheckResult } from './publication';

export type {
  GovernanceConfig,
  GovernancePageContent,
  DataPurposeDefinition,
  DataFieldRule,
  ProhibitedClaimRule,
  ConsentDefinition,
  AccessPolicyRule,
  RetentionRule,
  ResearchActivityRule,
  DatasetGovernanceMeta,
  PublicationGovernanceReview,
  DataSensitivity,
  AccessRole,
  AccessAction,
  EthicalRiskLevel,
  PublicationGateId,
} from './types';
