/**
 * Module 21 — Feature Audit, Redundancy Review & Scope Lock System.
 *
 * Structured, independently-reviewable audit records for the Shared Blood
 * platform after Modules 01–20 (spec §12–§16, §30, §43–§45, §52, §53–§55).
 *
 * DEV / BUILD-TIME ONLY. These records describe the application; they are NEVER
 * imported by any route, page, or client component, so they can never enter the
 * public client bundle (spec §62/§64). They exist to be type-checked (tsc),
 * self-consistency tested (vitest, spec §65), and read by reviewers alongside
 * `docs/audits/shared-blood-feature-audit-v1.md`.
 *
 * Module 21 is AUDIT-ONLY: these records recommend; they never approve, remove,
 * merge, or migrate anything (spec §4/§9/§55). Module 20 governance wins on any
 * conflict (spec §3).
 */

// ── Classification (spec §5) ────────────────────────────────────────────────
export type Classification =
  | 'KEEP'
  | 'MODIFY'
  | 'MERGE'
  | 'REMOVE'
  | 'MISSING'
  | 'BROKEN';

// ── Feature types (spec §12) ────────────────────────────────────────────────
export type FeatureType =
  | 'ROUTE'
  | 'PAGE'
  | 'SECTION'
  | 'COMPONENT'
  | 'INTERACTIVE_TOOL'
  | 'CALCULATOR'
  | 'AUDIO_FEATURE'
  | 'CONTENT_SYSTEM'
  | 'DATA_SYSTEM'
  | 'LOCALIZATION_FEATURE'
  | 'NAVIGATION_FEATURE'
  | 'RESEARCH_FEATURE'
  | 'FIELDWORK_FEATURE'
  | 'ADVOCACY_FEATURE'
  | 'DOWNLOAD_FEATURE'
  | 'REFERENCE_FEATURE'
  | 'ANALYTICS_FEATURE'
  | 'GOVERNANCE_FEATURE'
  | 'OTHER';

export type ImplementationStatus =
  | 'IMPLEMENTED'
  | 'PARTIALLY_IMPLEMENTED'
  | 'NOT_IMPLEMENTED'
  | 'IMPLEMENTED_BUT_NOT_CONNECTED'
  | 'UNKNOWN';

export type FunctionalStatus =
  | 'FUNCTIONAL'
  | 'PARTIALLY_FUNCTIONAL'
  | 'NON_FUNCTIONAL'
  | 'NOT_TESTABLE'
  | 'NOT_APPLICABLE';

export type RedundancyStatus =
  | 'NONE'
  | 'DUPLICATE'
  | 'PARTIAL_OVERLAP'
  | 'SUPERSEDED';

export type GovernanceStatus =
  | 'COMPLIANT'
  | 'NEEDS_REVIEW'
  | 'VIOLATION'
  | 'NOT_APPLICABLE';

export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type RecommendedModule =
  | 'MODULE_22'
  | 'MODULE_23'
  | 'MODULE_24'
  | 'MODULE_25';

// ── FeatureAuditRecord (spec §12–§16) ───────────────────────────────────────
export interface FeatureAuditRecord {
  id: string;
  featureName: string;
  featureType: FeatureType;
  classification: Classification;
  /** Which of Modules 01–20 specified or produced this feature. */
  sourceModules: string[];
  /** Route paths, if any (spec §56 evidence). */
  routes: string[];
  /** Component / file paths (spec §56 evidence). */
  components: string[];
  /** Data files / registries the feature reads (spec §56 evidence). */
  dataSources: string[];
  userPurpose: string;
  implementationStatus: ImplementationStatus;
  functionalStatus: FunctionalStatus;
  redundancyStatus: RedundancyStatus;
  governanceStatus: GovernanceStatus;
  performanceConcern: boolean;
  accessibilityConcern: boolean;
  localizationConcern: boolean;
  mobileConcern: boolean;
  notes: string;
  recommendation: string;
  priority: Priority;
  /** Where an approved follow-up would be executed (never in Module 21). */
  recommendedModule?: RecommendedModule;
}

// ── RedundancyRecord (spec §30) ─────────────────────────────────────────────
export type OverlapType =
  | 'CONTENT_DUPLICATION'
  | 'FUNCTION_DUPLICATION'
  | 'ROUTE_DUPLICATION'
  | 'COMPONENT_DUPLICATION'
  | 'NAVIGATION_DUPLICATION'
  | 'INTERACTION_DUPLICATION'
  | 'DATA_DUPLICATION'
  | 'CTA_DUPLICATION'
  | 'SYSTEM_DUPLICATION';

export type RedundancyAction =
  | 'KEEP_BOTH'
  | 'MERGE'
  | 'REMOVE_A'
  | 'REMOVE_B'
  | 'MODIFY_BOTH';

export interface RedundancyRecord {
  id: string;
  featureA: string;
  featureB: string;
  overlapType: OverlapType;
  overlapDescription: string;
  recommendedAction: RedundancyAction;
  reasoning: string;
}

// ── MissingFeatureRecord (spec §10 / §45) ───────────────────────────────────
export type MissingStatus =
  | 'NOT_IMPLEMENTED'
  | 'PARTIALLY_IMPLEMENTED'
  | 'IMPLEMENTED_BUT_NOT_CONNECTED';

export interface MissingFeatureRecord {
  id: string;
  featureName: string;
  sourceModule: string;
  expectedPurpose: string;
  evidenceOfSpecification: string;
  implementationStatus: MissingStatus;
  recommendedModule: RecommendedModule;
  priority: Priority;
}

// ── ModuleComparison (spec §43–§44) ─────────────────────────────────────────
export type CompletionEstimate =
  | 'COMPLETE'
  | 'MOSTLY_COMPLETE'
  | 'PARTIAL'
  | 'MINIMAL'
  | 'NOT_IMPLEMENTED'
  | 'BLOCKED';

export interface ModuleComparison {
  moduleId: string;
  moduleName: string;
  implementedFeatures: string[];
  missingFeatures: string[];
  partialFeatures: string[];
  brokenFeatures: string[];
  redundantFeatures: string[];
  conflicts: string[];
  completionEstimate: CompletionEstimate;
}

// ── Module 22–25 candidate registries (spec §46–§49) ────────────────────────
export interface ModuleCandidate {
  id: string;
  featureName: string;
  /** Why this belongs to the target module. */
  rationale: string;
  priority: Priority;
  /** Evidence: routes/components/data/deps. */
  evidence: string[];
}

// ── Human decisions (spec §52) ──────────────────────────────────────────────
export interface HumanDecision {
  decisionId: string;
  decisionTitle: string;
  affectedFeatures: string[];
  recommendedOption: string;
  alternativeOptions: string[];
  impact: string;
  reasonDecisionIsRequired: string;
}

// ── Scope lock (spec §53–§55) ───────────────────────────────────────────────
/**
 * The ScopeLockRecord must reflect EXPLICIT human decisions only. Module 21 must
 * never fabricate approvals (spec §55). Until a human review happens, every
 * approval array stays empty and `version` is null.
 */
export interface ScopeLockRecord {
  version: string | null;
  createdAt: string | null;
  approvedFeatures: string[];
  approvedModifications: string[];
  approvedMerges: string[];
  approvedRemovals: string[];
  approvedMissingFeatureImplementations: string[];
  deferredFeatures: string[];
  rejectedFeatures: string[];
  notes: string;
}
