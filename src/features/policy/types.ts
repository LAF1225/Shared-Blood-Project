import type { LocalizedText } from '@/types';

/**
 * Policy & Advocacy System — "Policy & Advocacy" (Module 19).
 *
 * CORE PRINCIPLE (spec §2): this converts APPROVED research findings (Module 18),
 * documented fieldwork (Module 17), and published literature (Module 07) into
 * structured, EVIDENCE-TRACEABLE, LIMITATION-BOUNDED public-health policy analysis
 * and advocacy priorities. It publishes reviewed Shared Blood advocacy positions
 * supported by traceable evidence — it does NOT automatically convert research
 * findings into policy demands (spec §15).
 *
 * It is NOT a government/political/party/lobbying/election/petition platform, a
 * legislative-drafting or legal-advice system, an automated/AI policy generator,
 * a national health authority, or a disease-surveillance system (spec §2/§120).
 *
 * Hard boundaries baked into CONTENT + validation, not just types: no coercive
 * policy — no marriage bans, mandatory testing, registries, or reproductive
 * restrictions (spec §6/§33/§44); the central safeguard is "What This Advocacy
 * Does Not Claim" (`doesNotClaim`, spec §25/§72), the policy equivalent of Module
 * 18's "What This Does Not Show", inherited/addressed and never stripped (spec
 * §99); evidence of a problem ≠ evidence of intervention effectiveness (spec §24);
 * no unsupported impact claims (lives saved, policy changed, spec §62); no invented
 * partnerships/endorsements (spec §65); politically neutral (spec §79); no legal
 * claims without review (spec §78); no user political/genetic profiling (spec §82).
 */

/** Diseases in scope for Version 1 advocacy (spec §45). */
export type PolicyDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/** Policy issue types (spec §8). No DISEASE_PREVALENCE_CRISIS — prevalence is not
 * inferred from awareness data (spec §8/§45). */
export type PolicyIssueType =
  | 'AWARENESS_GAP'
  | 'EDUCATION_GAP'
  | 'INHERITANCE_KNOWLEDGE_GAP'
  | 'CARRIER_AWARENESS_GAP'
  | 'TESTING_INFORMATION_GAP'
  | 'COUNSELLING_AWARENESS_GAP'
  | 'EARLY_SYMPTOM_RECOGNITION_GAP'
  | 'CHILDCARE_TRAINING_GAP'
  | 'LANGUAGE_ACCESS_GAP'
  | 'RESOURCE_ACCESS_GAP'
  | 'PUBLIC_HEALTH_COMMUNICATION_GAP'
  | 'COMMUNITY_EDUCATION_GAP'
  | 'INSTITUTIONAL_EDUCATION_GAP';

/** Policy domains (spec §9). Organize priorities; imply no government
 * jurisdiction. */
export type PolicyDomain =
  | 'GENETIC_HEALTH_EDUCATION'
  | 'PUBLIC_HEALTH_COMMUNICATION'
  | 'CARRIER_AWARENESS'
  | 'GENETIC_TESTING_EDUCATION'
  | 'GENETIC_COUNSELLING_AWARENESS'
  | 'CONSANGUINITY_RISK_COMMUNICATION'
  | 'CHILDCARE_WORKER_TRAINING'
  | 'EARLY_SYMPTOM_EDUCATION'
  | 'LANGUAGE_ACCESSIBILITY'
  | 'COMMUNITY_HEALTH_EDUCATION'
  | 'INSTITUTIONAL_HEALTH_EDUCATION'
  | 'EDUCATIONAL_RESOURCE_ACCESS';

/** Evidence source types a policy issue may cite (spec §10). RESEARCH_FINDING
 * (Module 18) is the preferred source (spec §12/§97). */
export type EvidenceSourceType =
  | 'RESEARCH_FINDING'
  | 'SURVEY_FINDING'
  | 'FIELDWORK_METRIC'
  | 'FIELD_OBSERVATION'
  | 'TRAINING_ASSESSMENT'
  | 'LITERATURE_SOURCE'
  | 'PROJECT_OPERATIONAL_DATA';

/** Role a piece of evidence plays (spec §11). Not all evidence is primary. */
export type EvidenceRole =
  | 'PRIMARY_SUPPORT'
  | 'CONTEXTUAL_SUPPORT'
  | 'LITERATURE_CONTEXT'
  | 'FIELDWORK_CONTEXT'
  | 'IMPLEMENTATION_CONTEXT'
  | 'LIMITATION_CONTEXT';

/** How well the evidence scope supports the issue (spec §17). INCOMPATIBLE
 * evidence must never support publication. */
export type ScopeCompatibility = 'DIRECT' | 'CONTEXTUAL' | 'LIMITED' | 'INCOMPATIBLE';

/** Advocacy priority types (spec §19). Version 1 is education-focused. */
export type AdvocacyPriorityType =
  | 'PUBLIC_EDUCATION'
  | 'PROFESSIONAL_EDUCATION'
  | 'CHILDCARE_WORKER_TRAINING'
  | 'CARRIER_AWARENESS'
  | 'GENETIC_TESTING_EDUCATION'
  | 'GENETIC_COUNSELLING_AWARENESS'
  | 'EARLY_SYMPTOM_EDUCATION'
  | 'LANGUAGE_ACCESS'
  | 'EDUCATIONAL_RESOURCE_DISTRIBUTION'
  | 'COMMUNITY_OUTREACH'
  | 'INSTITUTIONAL_EDUCATION';

/** Recommended action types (spec §21). No coercive intervention types. */
export type ActionType =
  | 'CREATE_EDUCATIONAL_RESOURCE'
  | 'EXPAND_LANGUAGE_ACCESS'
  | 'INTRODUCE_AWARENESS_SESSION'
  | 'INTEGRATE_TRAINING_CONTENT'
  | 'PROVIDE_CARRIER_EDUCATION'
  | 'PROVIDE_TESTING_INFORMATION'
  | 'PROVIDE_COUNSELLING_INFORMATION'
  | 'IMPROVE_REFERRAL_INFORMATION'
  | 'DISTRIBUTE_LEARNING_MATERIAL'
  | 'SUPPORT_COMMUNITY_EDUCATION'
  | 'CONDUCT_FURTHER_RESEARCH';

/** Action level (spec §22). NATIONAL_POLICY is deliberately absent as a default. */
export type ActionLevel =
  | 'PROJECT'
  | 'ORGANIZATION'
  | 'INSTITUTION'
  | 'COMMUNITY'
  | 'HEALTH_EDUCATION_SYSTEM'
  | 'PUBLIC_HEALTH_COMMUNICATION';

/** Whether an intervention's effectiveness has been evaluated (spec §24).
 * A recommendation is never "proven effective" when status is NOT_EVALUATED. */
export type InterventionEvidenceStatus =
  | 'NOT_EVALUATED'
  | 'THEORETICALLY_RELEVANT'
  | 'LITERATURE_SUPPORTED'
  | 'PROJECT_PILOT_SUPPORTED'
  | 'STRONGLY_SUPPORTED';

/** Stakeholder types (spec §27). Defined by institutional role. */
export type StakeholderType =
  | 'PUBLIC_HEALTH_INSTITUTION'
  | 'HEALTHCARE_INSTITUTION'
  | 'EDUCATIONAL_INSTITUTION'
  | 'CHILDCARE_ORGANIZATION'
  | 'ORPHANAGE'
  | 'COMMUNITY_ORGANIZATION'
  | 'NONPROFIT_ORGANIZATION'
  | 'PROFESSIONAL_ASSOCIATION'
  | 'RESEARCH_INSTITUTION'
  | 'GENETIC_COUNSELLING_SERVICE'
  | 'HEALTH_EDUCATOR'
  | 'HEALTHCARE_PROFESSIONAL'
  | 'POLICYMAKER'
  | 'PUBLIC_HEALTH_COMMUNICATOR';

/** Brief types (spec §48). Never "GOVERNMENT POLICY" unless official (spec §48). */
export type BriefType =
  | 'POLICY_BRIEF'
  | 'ADVOCACY_BRIEF'
  | 'EDUCATION_PRIORITY_BRIEF'
  | 'INSTITUTIONAL_BRIEF'
  | 'STAKEHOLDER_BRIEF'
  | 'RESEARCH_TO_ACTION_BRIEF';

/** Policy gap types (spec §53). Uncertainty is preserved (spec §54). */
export type PolicyGapType =
  | 'DOCUMENTED_GAP'
  | 'EVIDENCE_SUGGESTED_GAP'
  | 'PROJECT_OBSERVED_GAP'
  | 'RESEARCH_QUESTION';

/** Recommendation strength (spec §55). MANDATORY is deliberately absent. */
export type RecommendationStrength =
  | 'EXPLORATORY'
  | 'PROJECT_SUPPORTED'
  | 'LITERATURE_SUPPORTED'
  | 'MULTI_SOURCE_SUPPORTED';

/** Implementation level (spec §57). */
export type ImplementationLevel =
  | 'SHARED_BLOOD'
  | 'LOCAL_ORGANIZATION'
  | 'CHILDCARE_INSTITUTION'
  | 'EDUCATIONAL_INSTITUTION'
  | 'HEALTHCARE_EDUCATION'
  | 'COMMUNITY_PROGRAMME'
  | 'PUBLIC_HEALTH_COMMUNICATION';

/** Broad resource-planning classification (spec §59). Not an economic analysis. */
export type ResourceConsideration = 'LOW_RESOURCE' | 'MODERATE_RESOURCE' | 'HIGH_RESOURCE' | 'NOT_ASSESSED';

/** Documented advocacy outcome types (spec §60). Must reflect real events (§61). */
export type AdvocacyOutcomeType =
  | 'RESOURCE_ADOPTED'
  | 'TRAINING_REQUESTED'
  | 'MEETING_COMPLETED'
  | 'BRIEF_SHARED'
  | 'EDUCATIONAL_SESSION_REQUESTED'
  | 'PARTNERSHIP_DISCUSSION'
  | 'RECOMMENDATION_ACKNOWLEDGED'
  | 'OTHER';

/** Institutional engagement types (spec §63). */
export type EngagementType =
  | 'EMAIL_OUTREACH'
  | 'BRIEF_SHARING'
  | 'MEETING'
  | 'PRESENTATION'
  | 'TRAINING_DISCUSSION'
  | 'RESOURCE_DISCUSSION'
  | 'PARTNERSHIP_DISCUSSION';

/** Timeline event types (spec §66). Describes Shared Blood activity, not proof of
 * policy influence (spec §67). */
export type TimelineEventType =
  | 'BRIEF_PUBLISHED'
  | 'PRIORITY_ADDED'
  | 'INSTITUTIONAL_MEETING'
  | 'RESOURCE_ADOPTED'
  | 'TRAINING_REQUESTED'
  | 'RESEARCH_FINDING_PUBLISHED';

/** Policy limitation types (spec §76). */
export type PolicyLimitationType =
  | 'LIMITED_SAMPLE'
  | 'NON_REPRESENTATIVE_SAMPLE'
  | 'GEOGRAPHIC_LIMITATION'
  | 'FIELDWORK_CONTEXT'
  | 'LIMITED_INTERVENTION_EVIDENCE'
  | 'NO_OUTCOME_EVALUATION'
  | 'IMPLEMENTATION_UNCERTAINTY'
  | 'RESOURCE_UNCERTAINTY'
  | 'LEGAL_CONTEXT_NOT_REVIEWED'
  | 'POLICY_CONTEXT_INCOMPLETE'
  | 'LITERATURE_LIMITATION'
  | 'OTHER';

/** Advocacy review workflow (spec §88). Only APPROVED_FOR_PUBLICATION renders. */
export type AdvocacyReviewStatus =
  | 'DRAFT'
  | 'EVIDENCE_VALIDATED'
  | 'SCOPE_REVIEWED'
  | 'RECOMMENDATION_REVIEWED'
  | 'ETHICS_REVIEWED'
  | 'LIMITATION_REVIEWED'
  | 'SCIENTIFIC_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION';

/** Policy brief review workflow (spec §89). */
export type BriefReviewStatus =
  | 'DRAFT'
  | 'EVIDENCE_VALIDATED'
  | 'POLICY_CONTEXT_REVIEWED'
  | 'RECOMMENDATIONS_REVIEWED'
  | 'ETHICS_REVIEWED'
  | 'LIMITATIONS_VALIDATED'
  | 'REFERENCES_VALIDATED'
  | 'SCIENTIFIC_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION'
  | 'ARCHIVED';

/** Generic review status for context/gap/stakeholder/limitation/outcome records. */
export type ReviewStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED_FOR_PUBLICATION' | 'ARCHIVED';

/** Verification status for outcomes/engagements (spec §60). */
export type VerificationStatus = 'DOCUMENTED' | 'PARTNER_CONFIRMED' | 'VERIFIED' | 'UNVERIFIED';

/** Translation status (spec §102). Machine translation never auto-approves. */
export type TranslationStatus =
  | 'ENGLISH_ONLY'
  | 'URDU_ONLY'
  | 'TRANSLATION_PENDING'
  | 'BILINGUAL_APPROVED';

/** Geographic scope inherited from research evidence (spec §12/§37). NATIONAL only
 * where evidence supports it. */
export type GeographicScope =
  | 'PROJECT_SAMPLE'
  | 'ACTIVITY_LOCATION'
  | 'CITY_LEVEL'
  | 'MULTI_CITY'
  | 'PROVINCE_LEVEL'
  | 'NATIONAL'
  | 'LITERATURE_DEFINED';

export interface TimeScope {
  startDate: string;
  endDate: string;
  label: LocalizedText;
}

/** Broad evidence-strength descriptor for a policy issue (spec §7). */
export type EvidenceStrength = 'EXPLORATORY' | 'SUGGESTIVE' | 'MODERATE' | 'WELL_SUPPORTED';

/* ------------------------------------------------------------------ *
 * Evidence traceability (spec §10/§16/§107)
 * ------------------------------------------------------------------ */

/**
 * Precomputed registry of APPROVED evidence a policy issue may cite (spec §107).
 * Built by controlled policy review from approved Module 18/17/07 sources — the
 * browser never sees raw source records, only these approved ids. The
 * PolicyEvidenceResolver validates evidence links against it (spec §16).
 *
 * `researchFindingBoundaries` preserves each research finding's scope and "What
 * This Does Not Show" so advocacy can INHERIT that boundary rather than strip it
 * (spec §12/§99).
 */
export interface PolicyEvidenceRegistry {
  researchFindingIds: string[];
  surveyFindingIds: string[];
  fieldworkMetricIds: string[];
  fieldObservationIds: string[];
  trainingAssessmentIds: string[];
  literatureReferenceIds: string[];
  projectOperationalDataIds: string[];
  researchFindingBoundaries: Record<
    string,
    { scope: GeographicScope; evidenceType: string; doesNotShow: LocalizedText }
  >;
}

/**
 * A link from a policy issue to one evidence source (spec §10). The resolver
 * checks the source resolves + is approved, and that scopeCompatibility is not
 * INCOMPATIBLE (spec §17).
 */
export interface PolicyEvidenceLink {
  id: string;
  policyIssueId: string;
  sourceType: EvidenceSourceType;
  sourceId: string;
  evidenceRole: EvidenceRole;
  scopeCompatibility: ScopeCompatibility;
  limitationIds: string[];
  reviewStatus: ReviewStatus;
}

/* ------------------------------------------------------------------ *
 * Policy issues, context, gaps (spec §7/§51/§53)
 * ------------------------------------------------------------------ */

/** A public-health / educational issue (spec §7). Never public without an
 * evidence source (spec §7/§30). */
export interface PolicyIssue {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  issueType: PolicyIssueType;
  policyDomainIds: PolicyDomain[];
  researchFindingIds: string[];
  referenceIds: string[];
  fieldworkFindingIds: string[];
  surveyFindingIds: string[];
  problemStatement: LocalizedText;
  publicHealthContext: LocalizedText;
  affectedEducationalContext: LocalizedText;
  geographicScope: GeographicScope;
  timeScope: TimeScope;
  evidenceStrength: EvidenceStrength;
  limitationIds: string[];
  reviewStatus: AdvocacyReviewStatus;
  translationStatus: TranslationStatus;
  publicDisplayAllowed: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Existing policy/institutional context (spec §51). Absence of evidence in
 * Shared Blood's review is NOT evidence of national absence (spec §52). */
export interface PolicyContext {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  policyDomainIds: PolicyDomain[];
  geographicScope: GeographicScope;
  institutionalContext: LocalizedText;
  existingContextDescription: LocalizedText;
  referenceIds: string[];
  researchFindingIds: string[];
  limitationIds: string[];
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** A policy gap (spec §53). PROJECT_OBSERVED_GAP must not display as national
 * failure; RESEARCH_QUESTION must not be a confirmed gap (spec §54). */
export interface PolicyGap {
  id: string;
  title: LocalizedText;
  gapType: PolicyGapType;
  description: LocalizedText;
  policyContextIds: string[];
  evidenceLinkIds: string[];
  scope: GeographicScope;
  verificationStatus: VerificationStatus;
  limitationIds: string[];
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/* ------------------------------------------------------------------ *
 * Advocacy priorities & recommendations (spec §18/§20)
 * ------------------------------------------------------------------ */

/**
 * An advocacy priority (spec §18). Links to ≥1 approved PolicyIssue and carries
 * the mandatory `doesNotClaim` boundary (spec §25/§72). Education-focused,
 * non-coercive.
 */
export interface AdvocacyPriority {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  policyIssueIds: string[];
  policyDomainIds: PolicyDomain[];
  evidenceLinkIds: string[];
  priorityType: AdvocacyPriorityType;
  recommendedAction: LocalizedText;
  actionLevel: ActionLevel;
  stakeholderIds: string[];
  rationale: LocalizedText;
  educationalPurpose: LocalizedText;
  implementationConsiderations: LocalizedText;
  ethicalConsiderations: LocalizedText;
  limitationIds: string[];
  /** CORE (spec §25/§72): what this advocacy explicitly does NOT claim. */
  doesNotClaim: LocalizedText;
  reviewStatus: AdvocacyReviewStatus;
  translationStatus: TranslationStatus;
  publicDisplayAllowed: boolean;
  featured: boolean;
  featuredOrder?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * A concrete recommended action (spec §20). Describes a POSSIBLE action and never
 * implies Shared Blood can mandate it (spec §20/§23). Must link ≥1 evidence link —
 * a source-free recommendation stays DRAFT/REJECTED (spec §75).
 */
export interface PolicyRecommendation {
  id: string;
  advocacyPriorityId: string;
  title: LocalizedText;
  actionStatement: LocalizedText;
  actionType: ActionType;
  targetStakeholderIds: string[];
  evidenceLinkIds: string[];
  implementationLevel: ImplementationLevel;
  implementationComplexity: ResourceConsideration;
  resourceConsiderations: ResourceConsideration;
  interventionEvidenceStatus: InterventionEvidenceStatus;
  recommendationStrength: RecommendationStrength;
  ethicalConsiderations: LocalizedText;
  limitationIds: string[];
  reviewStatus: AdvocacyReviewStatus;
  publicDisplayAllowed: boolean;
}

/* ------------------------------------------------------------------ *
 * Stakeholders, outcomes, engagement, timeline (spec §26/§60/§63/§66)
 * ------------------------------------------------------------------ */

/** A stakeholder defined by institutional role (spec §26). A named institution
 * may be a potential audience without implying negligence or endorsement
 * (spec §28/§29/§65). */
export interface PolicyStakeholder {
  id: string;
  name: LocalizedText;
  stakeholderType: StakeholderType;
  description: LocalizedText;
  jurisdiction: LocalizedText;
  recommendedRole: LocalizedText;
  contactDisplayAllowed: boolean;
  externalReferenceIds: string[];
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** A documented advocacy outcome (spec §60). Reflects a real event; a brief being
 * shared is not "recommendation adopted" (spec §61/§62). */
export interface AdvocacyOutcome {
  id: string;
  advocacyPriorityId: string;
  outcomeType: AdvocacyOutcomeType;
  description: LocalizedText;
  evidenceSourceIds: string[];
  date: string;
  institutionIds: string[];
  verificationStatus: VerificationStatus;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** Institutional engagement (spec §63). Public summaries only — never private
 * emails, phone numbers, or meeting notes (spec §64). */
export interface InstitutionalEngagement {
  id: string;
  stakeholderId: string;
  engagementType: EngagementType;
  date: string;
  purpose: LocalizedText;
  relatedPriorityIds: string[];
  relatedBriefIds: string[];
  outcomeIds: string[];
  publicSummary: LocalizedText;
  evidenceReference: LocalizedText;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** A lightweight advocacy timeline event (spec §66). Shared Blood activity — not
 * proof of policy influence (spec §67). */
export interface AdvocacyTimelineEvent {
  id: string;
  eventType: TimelineEventType;
  date: string;
  title: LocalizedText;
  description: LocalizedText;
  relatedPriorityIds: string[];
  relatedBriefIds: string[];
  publicDisplayAllowed: boolean;
}

/** Backward traceability of a public recommendation (spec §74):
 * ResearchFinding → PolicyIssue → AdvocacyPriority → PolicyRecommendation →
 * PolicyBrief. */
export interface AdvocacyTrace {
  advocacyPriorityId: string;
  policyIssueIds: string[];
  researchFindingIds: string[];
  evidenceLinkIds: string[];
  recommendationIds: string[];
  briefIds: string[];
}

/** A policy limitation (spec §76). Required limitations MUST render with their
 * affected advocacy outputs (spec §77). */
export interface PolicyLimitation {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  limitationType: PolicyLimitationType;
  affectedPolicyIssueIds: string[];
  affectedPriorityIds: string[];
  affectedRecommendationIds: string[];
  affectedBriefIds: string[];
  severity: 'LOW' | 'MODERATE' | 'HIGH';
  publicDisplayRequired: boolean;
  reviewStatus: ReviewStatus;
}

/* ------------------------------------------------------------------ *
 * Briefs & downloads (spec §47/§83/§86)
 * ------------------------------------------------------------------ */

export interface PolicyBrief {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  briefType: BriefType;
  publicationDate: string;
  version: string;
  policyIssueIds: string[];
  advocacyPriorityIds: string[];
  recommendationIds: string[];
  stakeholderIds: string[];
  evidenceLinkIds: string[];
  limitationIds: string[];
  executiveSummary: LocalizedText;
  issueOverview: LocalizedText;
  evidenceSummary: LocalizedText;
  policyContext: LocalizedText;
  recommendationsSummary: LocalizedText;
  implementationConsiderations: LocalizedText;
  ethicalConsiderations: LocalizedText;
  limitationsSummary: LocalizedText;
  conclusion: LocalizedText;
  referenceIds: string[];
  downloadAssetIds: string[];
  /** Exact source versions used (spec §86/§87). */
  evidenceReferences: PolicyBriefEvidenceReference[];
  translationStatus: TranslationStatus;
  reviewStatus: BriefReviewStatus;
  publicDisplayAllowed: boolean;
  featured: boolean;
  featuredOrder?: number;
}

export interface PolicyBriefEvidenceReference {
  briefId: string;
  briefVersion: string;
  sourceId: string;
  sourceType: EvidenceSourceType;
  sourceVersion: string;
  dateReviewed: string;
}

export interface PolicyBriefDownloadAsset {
  id: string;
  briefId: string;
  briefVersion: string;
  assetType: 'PDF';
  language: 'en' | 'ur';
  fileReference: string;
  fileSize: number;
  publicationDate: string;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/* ------------------------------------------------------------------ *
 * The dataset (spec §107)
 * ------------------------------------------------------------------ */

/**
 * The approved policy & advocacy dataset (spec §107). Approved research evidence →
 * controlled policy review → validated PolicyIssue/AdvocacyPriority/
 * PolicyRecommendation JSON → website. The browser presents approved content and
 * NEVER infers policy gaps from raw data (spec §106/§107).
 */
export interface PolicyAdvocacyDataset {
  datasetId: string;
  datasetVersion: string;
  policyIssues: PolicyIssue[];
  evidenceLinks: PolicyEvidenceLink[];
  advocacyPriorities: AdvocacyPriority[];
  recommendations: PolicyRecommendation[];
  stakeholders: PolicyStakeholder[];
  briefs: PolicyBrief[];
  policyContexts: PolicyContext[];
  policyGaps: PolicyGap[];
  outcomes: AdvocacyOutcome[];
  engagements: InstitutionalEngagement[];
  timeline: AdvocacyTimelineEvent[];
  traces: AdvocacyTrace[];
  limitations: PolicyLimitation[];
  downloadAssets: PolicyBriefDownloadAsset[];
  evidenceRegistry: PolicyEvidenceRegistry;
  publicDisclaimer: LocalizedText;
  lastUpdated: string;
}

/** Local, non-persisted UI state (spec §108). No political/marriage/genetic-risk
 * state ever exists. */
export interface PolicyViewState {
  selectedPolicyDomain: PolicyDomain | 'all';
  selectedPriorityType: AdvocacyPriorityType | 'all';
  selectedStakeholderType: StakeholderType | 'all';
  selectedBriefType: BriefType | 'all';
  selectedPriorityId: string | null;
  selectedBriefId: string | null;
}
