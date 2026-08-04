import type { LocalizedText } from '@/types';

/**
 * Privacy, Ethics & Research Governance System (Module 20).
 *
 * CORE PRINCIPLE (spec §2/§13): the governance layer for privacy, data
 * minimization, consent, research ethics, genetic-information safeguarding,
 * vulnerable-population protection, publication review, public claims, retention,
 * deletion, and access control. "Collect Less → Define Purpose → Protect What Is
 * Collected → Restrict Use → Review Before Publication → Delete When No Longer
 * Required."
 *
 * It is NOT a medical-record/patient/genetic/family/child registry, national
 * identity or biometric database, disease-surveillance/HIS/clinical-trial system,
 * genetic-risk-profiling engine, AI ethics/consent decision maker, automated
 * ethics board, or legal-compliance guarantee (spec §2/§40).
 *
 * GOVERNANCE PRECEDENCE (spec §3): where a Module 20 requirement conflicts with
 * Modules 01–19, the stricter Module 20 requirement wins. Three invariants:
 * No Approved Purpose = Do Not Collect · No Required Governance Review = Do Not
 * Publish · Module Conflict = Module 20 Governance Requirement Wins (spec §134-136).
 *
 * This module ships PURE, INDEPENDENTLY-TESTABLE resolvers (GovernanceResolver,
 * PublicationGate, and purpose/consent/access/retention resolvers) plus real,
 * approved public governance pages — never an automated AI ethics/consent engine
 * (spec §35/§117).
 */

/** Governance principles (spec §4). */
export type GovernancePrinciple =
  | 'PURPOSE_LIMITATION'
  | 'DATA_MINIMIZATION'
  | 'INFORMED_PARTICIPATION'
  | 'VOLUNTARY_PARTICIPATION'
  | 'ACCESS_RESTRICTION'
  | 'DATA_SEPARATION'
  | 'PUBLICATION_REVIEW'
  | 'NON_STIGMATIZATION'
  | 'VULNERABLE_POPULATION_PROTECTION'
  | 'GENETIC_INFORMATION_CAUTION'
  | 'RESEARCH_TRANSPARENCY'
  | 'LIMITATION_DISCLOSURE'
  | 'RETENTION_LIMITATION'
  | 'DELETION_GOVERNANCE'
  | 'INCIDENT_DOCUMENTATION'
  | 'HUMAN_REVIEW';

/** Approved data purposes (spec §5). There is deliberately NO generic FUTURE_USE
 * purpose — if no valid purpose exists, do not collect. */
export type DataPurposeId =
  | 'SURVEY_RESEARCH'
  | 'FIELDWORK_DOCUMENTATION'
  | 'TRAINING_ASSESSMENT'
  | 'AUDIO_STORY_PUBLICATION'
  | 'DOCTOR_PERSPECTIVE_PUBLICATION'
  | 'WEBSITE_FUNCTIONALITY'
  | 'AGGREGATE_PRODUCT_ANALYTICS'
  | 'CONTACT_RESPONSE'
  | 'INSTITUTIONAL_ENGAGEMENT'
  | 'RESEARCH_PUBLICATION'
  | 'POLICY_PUBLICATION'
  | 'ACCESSIBILITY_PREFERENCE'
  | 'LOCALIZATION_PREFERENCE';

/** Data sensitivity levels (spec §6). GENETIC_INFORMATION is HIGHLY_SENSITIVE. */
export type DataSensitivity = 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SENSITIVE' | 'HIGHLY_SENSITIVE';

/** Data-minimization status for a proposed field (spec §8). */
export type MinimizationStatus = 'REQUIRED' | 'OPTIONAL_JUSTIFIED' | 'NOT_NECESSARY' | 'PROHIBITED';

/** Ethical risk level of a research activity (spec §16). RESTRICTED = do not
 * implement in Version 1 unless later governance explicitly authorizes it. */
export type EthicalRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'RESTRICTED';

/** Human ethics-review decision (spec §17). Never decided automatically. */
export type EthicsDecision =
  | 'APPROVED'
  | 'APPROVED_WITH_CONDITIONS'
  | 'REVISION_REQUIRED'
  | 'REJECTED'
  | 'RESTRICTED';

/** Access actions (spec §20). */
export type AccessAction = 'VIEW' | 'CREATE' | 'EDIT' | 'REVIEW' | 'APPROVE' | 'EXPORT' | 'DELETE' | 'ARCHIVE';

/** Access roles (spec §20). Least privilege enforced. */
export type AccessRole =
  | 'PUBLIC_USER'
  | 'CONTENT_EDITOR'
  | 'RESEARCH_EDITOR'
  | 'RESEARCH_REVIEWER'
  | 'SCIENTIFIC_REVIEWER'
  | 'ETHICS_REVIEWER'
  | 'GOVERNANCE_ADMIN';

/** Deletion states (spec §23). Hiding a UI row is NOT deletion. */
export type DeletionState = 'PENDING' | 'COMPLETED' | 'VERIFIED' | 'PARTIAL' | 'FAILED';

/** Governance incident types (spec §24). */
export type IncidentType =
  | 'UNAUTHORIZED_ACCESS'
  | 'INCORRECT_PUBLICATION'
  | 'CONSENT_SCOPE_ERROR'
  | 'MINIMIZATION_FAILURE'
  | 'RETENTION_FAILURE'
  | 'DELETION_FAILURE'
  | 'INCORRECT_CLASSIFICATION'
  | 'THIRD_PARTY_DISCLOSURE'
  | 'VULNERABLE_POPULATION_RISK'
  | 'GENETIC_INFORMATION_EXPOSURE'
  | 'RESEARCH_CLAIM_ERROR'
  | 'ADVOCACY_CLAIM_ERROR';

/** Governance change classification (spec §33). */
export type GovernanceChangeType =
  | 'MINOR_CLARIFICATION'
  | 'OPERATIONAL_CHANGE'
  | 'DATA_USE_CHANGE'
  | 'CONSENT_CHANGE'
  | 'RETENTION_CHANGE'
  | 'PUBLICATION_CHANGE'
  | 'HIGH_RISK_GOVERNANCE_CHANGE';

/**
 * Publication review gates (spec §25/§82). `publicDisplayAllowed` alone is NOT
 * sufficient to publish — every required gate must be satisfied before client
 * serialization.
 */
export type PublicationGateId =
  | 'EVIDENCE_REVIEW'
  | 'METHODOLOGY_REVIEW'
  | 'LIMITATION_REVIEW'
  | 'ETHICS_REVIEW'
  | 'SCIENTIFIC_REVIEW'
  | 'PUBLIC_CLAIM_REVIEW'
  | 'PRIVACY_REVIEW'
  | 'DEIDENTIFICATION_REVIEW';

/** Category of a prohibited public claim (spec §25/§26/§27/§83). */
export type ProhibitedClaimCategory =
  | 'UNSUPPORTED_IMPACT'
  | 'DIAGNOSIS'
  | 'PREVALENCE_OR_HOTSPOT'
  | 'STIGMA_OR_EUGENICS'
  | 'GENETIC_SCORE'
  | 'REPRODUCTIVE_DIRECTIVE';

/** Result of a public-claim check (spec §25). */
export type ClaimStatus = 'ALLOWED' | 'PROHIBITED';

/* ------------------------------------------------------------------ *
 * Configuration records (the governance single source of truth)
 * ------------------------------------------------------------------ */

/** An approved data purpose (spec §5). */
export interface DataPurposeDefinition {
  id: DataPurposeId;
  title: LocalizedText;
  description: LocalizedText;
  defaultSensitivity: DataSensitivity;
  requiresConsent: boolean;
  /** Materially different secondary use requires SecondaryUseReview (spec §5). */
  secondaryUseRequiresReview: boolean;
}

/** A minimization rule for a proposed data field (spec §8). Prohibited fields
 * (CNIC, DNA, VCF, persisted calculator risk, etc.) are never collected. */
export interface DataFieldRule {
  field: string;
  status: MinimizationStatus;
  sensitivity: DataSensitivity;
  reason: LocalizedText;
  lessSensitiveAlternative?: LocalizedText | null;
}

/** A prohibited public claim pattern (spec §25/§83). `pattern` is a regex source
 * matched case-insensitively against ASSERTIVE public text. */
export interface ProhibitedClaimRule {
  id: string;
  pattern: string;
  category: ProhibitedClaimCategory;
  reason: LocalizedText;
}

/**
 * A purpose-specific consent definition (spec §10/§11). No universal consent
 * checkbox — participation, recording, publication, and follow-up are NOT bundled.
 * Historical records must not be overwritten when wording changes (spec §10).
 */
export interface ConsentDefinition {
  id: string;
  purposeId: DataPurposeId;
  version: number;
  languages: ('en' | 'ur')[];
  title: LocalizedText;
  explains: {
    purpose: boolean;
    participation: boolean;
    collectedInformation: boolean;
    recording: boolean;
    publication: boolean;
    use: boolean;
    retention: boolean;
    voluntariness: boolean;
    withdrawal: boolean;
    contactRoutes: boolean;
  };
  /** Separate consent decisions this definition must NOT bundle together (spec §11). */
  separateDecisions: string[];
  bilingualReviewApproved: boolean;
}

/** A consent record (spec §10) — described here for validation; never overwritten. */
export interface ConsentRecordMeta {
  consentDefinitionId: string;
  version: number;
  language: 'en' | 'ur';
  date: string;
}

/** An access-policy rule (spec §20). A role may perform an action only up to the
 * listed maximum sensitivity. */
export interface AccessPolicyRule {
  role: AccessRole;
  action: AccessAction;
  maxSensitivity: DataSensitivity;
}

/** A versioned retention rule (spec §23). "May be useful later" is not a
 * justification. */
export interface RetentionRule {
  id: string;
  purposeId: DataPurposeId;
  version: number;
  retentionBasis: LocalizedText;
  reviewOnPurposeEnd: boolean;
}

/** A research activity with its ethical risk level (spec §16). */
export interface ResearchActivityRule {
  id: string;
  title: LocalizedText;
  riskLevel: EthicalRiskLevel;
  requiresEthicsReview: boolean;
  requiresScientificReview: boolean;
  vulnerablePopulation: boolean;
}

/** Governance completeness for a research dataset (spec §20/§66). Incomplete
 * metadata blocks public research publication. */
export interface DatasetGovernanceMeta {
  datasetId: string;
  purposeId: DataPurposeId | null;
  consentDefined: boolean;
  retentionDefined: boolean;
  accessDefined: boolean;
  deidentificationReviewed: boolean;
  smallGroupReviewed: boolean;
  publicationPlanApproved: boolean;
}

/** A publication governance review record (spec §25/§82). */
export interface PublicationGovernanceReview {
  resourceId: string;
  requiredGates: PublicationGateId[];
  satisfiedGates: PublicationGateId[];
  publicDisplayAllowed: boolean;
}

/** A governance principle definition for the public pages (spec §4/§32). */
export interface GovernancePrincipleDef {
  id: GovernancePrinciple;
  title: LocalizedText;
  description: LocalizedText;
}

/* ------------------------------------------------------------------ *
 * Public governance page content (spec §32)
 * ------------------------------------------------------------------ */

export interface GovernancePageSection {
  id: string;
  heading: LocalizedText;
  body: LocalizedText[];
}

export interface GovernancePageContent {
  id: 'privacy' | 'research-ethics' | 'research-governance';
  kicker: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  intro: LocalizedText;
  sections: GovernancePageSection[];
  showNotice: boolean;
  showPrinciples: boolean;
}

/** The complete governance configuration (single source of truth). */
export interface GovernanceConfig {
  version: string;
  principles: GovernancePrincipleDef[];
  purposes: DataPurposeDefinition[];
  fieldRules: DataFieldRule[];
  prohibitedClaims: ProhibitedClaimRule[];
  consentDefinitions: ConsentDefinition[];
  accessPolicies: AccessPolicyRule[];
  retentionRules: RetentionRule[];
  researchActivities: ResearchActivityRule[];
  approvedNotice: LocalizedText;
}
