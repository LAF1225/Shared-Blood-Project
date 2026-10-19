import type { LocalizedText } from '@/types';

/**
 * Community Impact & Fieldwork System — "Shared Blood in the Community" (Module 17).
 *
 * CORE PRINCIPLE (spec §2): this documents what Shared Blood did OUTSIDE the
 * website — community education, childcare-worker training, learning-booklet
 * distribution, awareness sessions — plus AGGREGATE impact, contextual field
 * observations, and the project changes those observations produced. It is NOT
 * NGO-management software, beneficiary surveillance, orphanage/child tracking,
 * patient or medical-record storage, case management, donor/fundraising software,
 * live staff/location tracking, or community-member profiling (spec §2/§12/§55).
 * It must NEVER create databases of vulnerable individuals.
 *
 * The public application receives APPROVED, PRIVACY-RESOLVED, AGGREGATE public
 * records only (spec §39) — never internal notes, raw attendance sheets,
 * participant contacts, private correspondence, unapproved photos, or any
 * individual participant / child / patient / assessment record (spec §35/§49/§55).
 *
 * Language rules are baked into the CONTENT, not the types: recognize possible
 * warning signs ≠ diagnose (spec §7); booklets distributed ≠ people educated
 * (spec §16); recorded participants ≠ "unique people reached" without dedup
 * (spec §15); estimated attendance is approximate, not a verified count (spec §14);
 * immediate post-session knowledge change ≠ long-term retention (spec §18);
 * contextual field observations ≠ national population claims (spec §22); and NO
 * "lives saved / diseases prevented / misdiagnoses prevented" metrics ever exist
 * (spec §26).
 */

/** Cities with recorded fieldwork (spec §34). Sample descriptors — NEVER framed
 * as genetic-disorder epicenters or high-risk communities (spec §34). */
export type FieldworkCity = 'ISLAMABAD' | 'RAWALPINDI' | 'LAHORE' | 'KARACHI' | 'OTHER';

/** Diseases fieldwork education may cover (spec §7). Matches the disease library. */
export type FieldworkDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/** Initial fieldwork scope (spec §6). NOT hardcoded around orphanages. */
export type FieldworkScope =
  | 'CHILDCARE_WORKER_EDUCATION'
  | 'ORPHANAGE_OUTREACH'
  | 'LEARNING_BOOKLET_DISTRIBUTION'
  | 'GENETIC_AWARENESS_SESSION'
  | 'INHERITANCE_EDUCATION'
  | 'CARRIER_AWARENESS_SESSION'
  | 'GENETIC_TESTING_AWARENESS'
  | 'COMMUNITY_INFORMATION_CAMPAIGN'
  | 'PARTNER_SUPPORTED_OUTREACH';

/** Activity types (spec §11). */
export type ActivityType =
  | 'TRAINING_SESSION'
  | 'AWARENESS_SESSION'
  | 'BOOKLET_DISTRIBUTION'
  | 'COMMUNITY_WORKSHOP'
  | 'INFORMATION_CAMPAIGN'
  | 'FIELD_VISIT'
  | 'PARTNER_ACTIVITY'
  | 'EDUCATIONAL_INTERVIEW'
  | 'PILOT_SESSION';

/** Activity lifecycle status (spec §11). Only approved COMPLETED activities
 * normally render publicly or contribute to completed impact totals. */
export type ActivityStatus =
  | 'PLANNED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'UNDER_REVIEW'
  | 'ARCHIVED';

/** Activity audience types (spec §13). Labels must not create participant
 * profiles — they describe who an activity was FOR, never named individuals. */
export type AudienceType =
  | 'CHILDCARE_WORKER'
  | 'ORPHANAGE_CARE_STAFF'
  | 'COMMUNITY_MEMBER'
  | 'PARENT_OR_GUARDIAN'
  | 'STUDENT'
  | 'HEALTHCARE_WORKER'
  | 'VOLUNTEER'
  | 'EDUCATOR'
  | 'GENERAL_PUBLIC'
  | 'OTHER';

/** How a participant count was obtained (spec §14). ESTIMATED_ATTENDANCE must be
 * displayed approximately and never as an exact verified training count. */
export type ParticipantCountMethod =
  | 'SIGN_IN_COUNT'
  | 'MANUAL_HEADCOUNT'
  | 'REGISTRATION_COUNT'
  | 'PARTNER_REPORTED_COUNT'
  | 'ESTIMATED_ATTENDANCE';

/** Educational resource types (spec §8). LEARNING_BOOKLET is the recommended
 * Version 1 type. */
export type ResourceType =
  | 'LEARNING_BOOKLET'
  | 'INFORMATION_SHEET'
  | 'POSTER'
  | 'PRESENTATION'
  | 'CAREGIVER_GUIDE'
  | 'OTHER';

/** Material distribution methods (spec §16). */
export type DistributionMethod =
  | 'DIRECT_HANDOUT'
  | 'STAFF_RESOURCE'
  | 'PARTNER_DISTRIBUTION'
  | 'SESSION_MATERIAL'
  | 'COMMUNITY_DISPLAY';

/** Field assessment types (spec §19). */
export type AssessmentType = 'PRE_SESSION' | 'POST_SESSION' | 'FOLLOW_UP';

/** Assessment scoring method (spec §19). Documented, never decorative. */
export type ScoringMethod = 'SUM_CORRECT' | 'PERCENT_CORRECT' | 'WEIGHTED';

/** Field observation types (spec §21). Observations are CONTEXTUAL, never
 * automatically research findings or population claims (spec §22). */
export type ObservationType =
  | 'EDUCATIONAL_CONFUSION'
  | 'COMMON_QUESTION'
  | 'CONTENT_GAP'
  | 'LANGUAGE_BARRIER'
  | 'ACCESSIBILITY_BARRIER'
  | 'HEALTHCARE_ACCESS_CONCERN'
  | 'TESTING_ACCESS_CONCERN'
  | 'SOCIAL_ATTITUDE_OBSERVATION'
  | 'FAMILY_CONTEXT_OBSERVATION'
  | 'RESOURCE_FEEDBACK'
  | 'FIELD_LOGISTICS'
  | 'PROJECT_IMPROVEMENT';

/** Project areas a field learning may affect (spec §23). */
export type ProjectArea =
  | 'DISEASE_CONTENT'
  | 'URDU_TRANSLATION'
  | 'LEARNING_BOOKLET'
  | 'CALCULATOR_EXPLANATION'
  | 'GENETIC_TESTING_EDUCATION'
  | 'CARRIER_EDUCATION'
  | 'FIELDWORK_METHOD'
  | 'SURVEY_DESIGN'
  | 'ACCESSIBILITY'
  | 'WEBSITE_NAVIGATION'
  | 'OTHER';

/** Whether an approved field learning has been implemented into the product. */
export type ImplementationStatus =
  | 'PROPOSED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'IMPLEMENTED'
  | 'DEFERRED';

/**
 * Impact metric codes (spec §25). Note the DELIBERATE ABSENCE of any hypothetical
 * metric — there is NO "Lives Changed / Lives Saved / Families Protected /
 * Diseases Prevented / Misdiagnoses Prevented / Genetic Disorders Prevented /
 * Future Children Saved" code (spec §26). The type system itself forbids them.
 */
export type ImpactMetricCode =
  | 'DOCUMENTED_ACTIVITIES'
  | 'RECORDED_PARTICIPANTS'
  | 'CHILDCARE_WORKERS_REACHED'
  | 'STRUCTURED_TRAINING_COMPLETIONS'
  | 'LEARNING_BOOKLETS_DISTRIBUTED'
  | 'EDUCATIONAL_RESOURCES_DISTRIBUTED'
  | 'CITIES_WITH_COMPLETED_ACTIVITIES'
  | 'PARTNER_SUPPORTED_ACTIVITIES'
  | 'PRE_POST_ASSESSMENT_ACTIVITIES'
  | 'IMMEDIATE_KNOWLEDGE_CHANGE';

/** Impact verification status (spec §28). VERIFIED has a defined internal meaning
 * (independently confirmed by document or partner) — it is not decorative. */
export type VerificationStatus =
  | 'INTERNAL_RECORD'
  | 'PARTNER_CONFIRMED'
  | 'DOCUMENT_SUPPORTED'
  | 'ESTIMATED'
  | 'VERIFIED';

/** Evidence asset types (spec §29). No child galleries or medical timelines. */
export type EvidenceAssetType =
  | 'ACTIVITY_PHOTO'
  | 'RESOURCE_PHOTO'
  | 'DISTRIBUTION_PHOTO'
  | 'VENUE_PHOTO'
  | 'SESSION_MATERIAL'
  | 'ANONYMIZED_ATTENDANCE_SUMMARY'
  | 'PARTNER_CONFIRMATION'
  | 'FIELD_NOTE_EXCERPT'
  | 'ASSESSMENT_SUMMARY';

/** Consent state for an activity or evidence asset (governed by Module 20, §30/§45). */
export type ConsentStatus =
  | 'NOT_REQUIRED'
  | 'CONSENT_PENDING'
  | 'CONSENT_OBTAINED'
  | 'CONSENT_DECLINED';

/** Partner organisation types (spec §32). */
export type PartnerOrgType =
  | 'ORPHANAGE'
  | 'NGO'
  | 'COMMUNITY_ORGANIZATION'
  | 'EDUCATIONAL_INSTITUTION'
  | 'HEALTH_ORGANIZATION'
  | 'FOUNDATION'
  | 'OTHER';

/** Partnership relationship types (spec §32). */
export type PartnershipType =
  | 'HOST_PARTNER'
  | 'OUTREACH_PARTNER'
  | 'EDUCATION_PARTNER'
  | 'DISTRIBUTION_PARTNER'
  | 'RESEARCH_SUPPORT_PARTNER'
  | 'LOGISTICS_PARTNER';

/** Fieldwork location types (spec §34). Precise sensitive locations are never
 * published (spec §34) — only the location TYPE and city reach the public. */
export type LocationType =
  | 'ORPHANAGE'
  | 'COMMUNITY_CENTER'
  | 'SCHOOL'
  | 'UNIVERSITY'
  | 'HEALTH_FACILITY'
  | 'PARTNER_OFFICE'
  | 'PUBLIC_EVENT'
  | 'RURAL_COMMUNITY'
  | 'URBAN_COMMUNITY'
  | 'OTHER';

/** Community impact finding types (spec §43). */
export type CommunityFindingType =
  | 'ACTIVITY_HIGHLIGHT'
  | 'TRAINING_FINDING'
  | 'RESOURCE_DISTRIBUTION_FINDING'
  | 'FIELD_LEARNING'
  | 'PROJECT_CHANGE'
  | 'COMMUNITY_QUESTION'
  | 'ASSESSMENT_FINDING'
  | 'PARTNER_ACTIVITY_FINDING';

/**
 * Review workflow (spec §40). Only APPROVED_FOR_PUBLICATION may render publicly.
 * Ordering documents the pipeline: draft → documented → impact-verified →
 * privacy-reviewed → approved.
 */
export type ReviewStatus =
  | 'DRAFT'
  | 'DOCUMENTED'
  | 'IMPACT_VERIFIED'
  | 'PRIVACY_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION'
  | 'ARCHIVED';

/** Translation status (spec §46). Machine-generated medical fieldwork
 * translations are NEVER treated as approved without review. */
export type TranslationStatus =
  | 'ENGLISH_ONLY'
  | 'URDU_ONLY'
  | 'TRANSLATION_PENDING'
  | 'BILINGUAL_APPROVED';

/** Comparison method for a pre/post learning comparison (spec §20). */
export type ComparisonMethod = 'PAIRED' | 'UNPAIRED_AGGREGATE';

/* ------------------------------------------------------------------ *
 * Educational resources (spec §8/§9)
 * ------------------------------------------------------------------ */

/** A distributed educational resource (spec §8). Every resource is VERSIONED
 * (spec §9); fieldwork records must reference the exact resourceId + version. */
export interface EducationalResourceRecord {
  id: string;
  resourceType: ResourceType;
  title: LocalizedText;
  description: LocalizedText;
  languageIds: ('en' | 'ur')[];
  targetAudienceIds: AudienceType[];
  diseaseIds: FieldworkDiseaseId[];
  version: number;
  publicationDate: string;
  referenceIds: string[];
  downloadable: boolean;
  publicDisplayAllowed: boolean;
  translationStatus: TranslationStatus;
}

/* ------------------------------------------------------------------ *
 * Field activities (spec §10/§12)
 * ------------------------------------------------------------------ */

/**
 * The internal field activity record (spec §10). Contains internal-only fields
 * (activityMethod, internal note references) that must NEVER reach the client
 * automatically (spec §12/§39). It carries NO participant names (spec §10).
 */
export interface FieldActivityRecord {
  id: string;
  activityTitle: LocalizedText;
  activityType: ActivityType;
  activityStatus: ActivityStatus;
  activityDate: string;
  cityId: FieldworkCity;
  locationType: LocationType;
  partnerOrganizationIds: string[];
  targetAudienceIds: AudienceType[];
  educationalResourceIds: string[];
  /** Exact resource versions used, keyed by resourceId (spec §9). */
  resourceVersions: Record<string, number>;
  diseaseIds: FieldworkDiseaseId[];
  researchDomainIds: string[];
  participantCount: number;
  participantCountMethod: ParticipantCountMethod;
  staffOrVolunteerCount: number;
  materialsDistributed: number;
  activitySummary: LocalizedText;
  activityObjectives: LocalizedText[];
  /** Internal — how the activity was run. NOT auto-exposed (spec §12). */
  activityMethod: LocalizedText;
  /** Short public-facing method summary derived for the public record (spec §12). */
  activityMethodSummary: LocalizedText;
  impactMetricIds: string[];
  fieldObservationIds: string[];
  evidenceAssetIds: string[];
  publicFindingIds: string[];
  consentStatus: ConsentStatus;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
  /** Editorial featuring (spec §37) — must NOT affect impact calculations. */
  featured: boolean;
  featuredOrder?: number;
  verificationStatus: VerificationStatus;
  /** Program association (spec §33) — e.g. PRIDEA. Attribution stays accurate. */
  programAssociation?: LocalizedText | null;
  translationStatus: TranslationStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * The PUBLIC activity record (spec §12), DERIVED from an internal record after
 * validation + privacy review (spec §39). Internal notes are never present here.
 */
export interface PublicFieldActivityRecord {
  id: string;
  activityTitle: LocalizedText;
  activityType: ActivityType;
  activityDate: string;
  cityId: FieldworkCity;
  locationType: LocationType;
  partnerOrganizationIds: string[];
  targetAudienceLabels: AudienceType[];
  educationalResourceIds: string[];
  diseaseIds: FieldworkDiseaseId[];
  /** Display string — exact for verified counts, approximate for estimates (§14). */
  participantCountDisplay: LocalizedText;
  materialsDistributedDisplay: LocalizedText;
  activitySummary: LocalizedText;
  activityObjectives: LocalizedText[];
  activityMethodSummary: LocalizedText;
  approvedImpactMetrics: ImpactMetricValue[];
  approvedFieldLearnings: string[];
  approvedEvidenceAssets: string[];
  reviewStatus: ReviewStatus;
  featured: boolean;
  featuredOrder?: number;
  verificationStatus: VerificationStatus;
  programAssociation?: LocalizedText | null;
}

/* ------------------------------------------------------------------ *
 * Materials, training, assessments (spec §16–§20)
 * ------------------------------------------------------------------ */

/** A material-distribution record (spec §16). Booklets distributed remain
 * SEPARATE from participants reached — a booklet is not a person educated. */
export interface MaterialDistributionRecord {
  id: string;
  fieldActivityId: string;
  educationalResourceId: string;
  resourceVersion: number;
  quantityDistributed: number;
  distributionMethod: DistributionMethod;
  countMethod: ParticipantCountMethod;
  notes?: LocalizedText | null;
  reviewStatus: ReviewStatus;
}

/** Structured training metric (spec §17). Every structured training defines
 * completionDefinition; informal booklet handout is never called "trained". */
export interface TrainingActivityMetric {
  fieldActivityId: string;
  participantCount: number;
  completionDefinition: LocalizedText;
  completedParticipantCount: number;
  trainingDurationMinutes: number;
  resourceIds: string[];
  learningObjectiveIds: string[];
  assessmentMethod: LocalizedText;
  preAssessmentId?: string | null;
  postAssessmentId?: string | null;
  reviewStatus: ReviewStatus;
}

/** Field assessment definition (spec §19). */
export interface FieldAssessmentDefinition {
  id: string;
  title: LocalizedText;
  assessmentType: AssessmentType;
  questionIds: string[];
  scoringMethod: ScoringMethod;
  maximumScore: number;
  languageIds: ('en' | 'ur')[];
  targetAudienceIds: AudienceType[];
  version: number;
  referenceIds: string[];
  methodologyNote: LocalizedText;
}

/** Aggregate assessment result (spec §19). Never publishes individual answers. */
export interface FieldAssessmentAggregate {
  assessmentId: string;
  fieldActivityId: string;
  validResponseCount: number;
  meanScore: number;
  medianScore: number;
  questionAggregates: { questionId: string; correctPercentage: number }[];
  scoreDistribution: Record<string, number>;
  publicFindingIds: string[];
}

/**
 * Pre/post learning comparison (spec §20). Anonymous unpaired assessments MUST be
 * described as aggregate comparisons (comparisonMethod UNPAIRED_AGGREGATE), and
 * only comparable questions/scoring are compared. Measures IMMEDIATE knowledge
 * change — never framed as permanent/long-term retention (spec §18).
 */
export interface FieldLearningComparison {
  fieldActivityId: string;
  preAssessmentAggregateId: string;
  postAssessmentAggregateId: string;
  comparisonMethod: ComparisonMethod;
  comparableQuestionIds: string[];
  preMean: number;
  postMean: number;
  absoluteChange: number;
  percentagePointChange: number;
  interpretation: LocalizedText;
  limitationNote: LocalizedText;
  reviewStatus: ReviewStatus;
}

/* ------------------------------------------------------------------ *
 * Field observations & learnings (spec §21–§24)
 * ------------------------------------------------------------------ */

/** A contextual field observation (spec §21). NOT automatically a research
 * finding (spec §22) — a recurring question during ONE activity is reported as
 * exactly that, never as a national population claim. */
export interface FieldObservationRecord {
  id: string;
  fieldActivityId: string;
  observationType: ObservationType;
  observationSummary: LocalizedText;
  researchDomainIds: string[];
  diseaseIds: FieldworkDiseaseId[];
  sourceType: LocalizedText;
  observedByRole: LocalizedText;
  containsSensitiveInformation: boolean;
  requiresEthicsReview: boolean;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
  createdAt: string;
}

/** A field learning (spec §23). Feeds the product-feedback loop (spec §24):
 * Observation → Review → Scientific Review (if medical) → Approved Learning →
 * Manual Product Change. Content NEVER changes the website automatically. */
export interface FieldLearningRecord {
  id: string;
  title: LocalizedText;
  learningSummary: LocalizedText;
  /** "What we noticed" (spec §44). */
  whatWeNoticed: LocalizedText;
  /** "Why it mattered" (spec §44). */
  whyItMattered: LocalizedText;
  /** "What we changed" (spec §44). */
  whatWeChanged: LocalizedText;
  sourceFieldActivityIds: string[];
  sourceObservationIds: string[];
  projectAreaAffected: ProjectArea;
  recommendedProjectChange: LocalizedText;
  implementationStatus: ImplementationStatus;
  implementedModuleIds: string[];
  /** True once a scientific review has cleared any medical-content change (§24). */
  scientificReviewCompleted: boolean;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
  displayOrder: number;
}

/* ------------------------------------------------------------------ *
 * Impact metrics & summary (spec §25–§28)
 * ------------------------------------------------------------------ */

/** An impact metric DEFINITION (spec §25). Documents exactly what a metric counts,
 * which activity types it includes, exclusion rules, and deduplication. */
export interface ImpactMetricDefinition {
  id: string;
  metricCode: ImpactMetricCode;
  title: LocalizedText;
  description: LocalizedText;
  unit: LocalizedText;
  calculationMethod: LocalizedText;
  includedActivityTypes: ActivityType[];
  exclusionRules: LocalizedText[];
  deduplicationMethod: LocalizedText;
  publicDisplayAllowed: boolean;
  methodologyNote: LocalizedText;
  version: number;
}

/** A resolved metric value attached to a public activity (spec §12). */
export interface ImpactMetricValue {
  metricCode: ImpactMetricCode;
  value: number;
  verificationStatus: VerificationStatus;
  isApproximate: boolean;
}

/**
 * The aggregate community impact summary (spec §27). DERIVED from approved
 * completed activity records — never manually typed (spec §27/§69). Contains no
 * hypothetical "lives saved" style figures (spec §26).
 */
export interface CommunityImpactSummary {
  datasetVersion: string;
  calculationDate: string;
  documentedActivityCount: number;
  recordedParticipantCount: number;
  childcareWorkerCount: number;
  structuredTrainingCompletionCount: number;
  learningBookletsDistributed: number;
  educationalResourcesDistributed: number;
  cityCount: number;
  partnerSupportedActivityCount: number;
  assessmentActivityCount: number;
  approvedHighlightIds: string[];
}

/* ------------------------------------------------------------------ *
 * Evidence, partners, findings (spec §29–§43)
 * ------------------------------------------------------------------ */

/**
 * A field evidence asset (spec §29). Subject to the photo/minor process (spec §30):
 * only assets with publicDisplayAllowed AND an approved review render, and until
 * Module 20 is implemented minors are never publicly identified — an asset with
 * containsMinor or containsIdentifiablePerson defaults to NOT public.
 */
export interface FieldEvidenceAsset {
  id: string;
  fieldActivityId: string;
  assetType: EvidenceAssetType;
  assetReference: string;
  caption: LocalizedText;
  captureDate: string;
  consentStatus: ConsentStatus;
  containsMinor: boolean;
  containsIdentifiablePerson: boolean;
  publicDisplayAllowed: boolean;
  reviewStatus: ReviewStatus;
  altText: LocalizedText;
  displayOrder: number;
}

/** A community partner organisation (spec §32). Names, logos, and descriptions
 * require public-display approval before rendering (spec §32). */
export interface CommunityPartnerRecord {
  id: string;
  organizationName: LocalizedText;
  organizationType: PartnerOrgType;
  cityId: FieldworkCity;
  publicDescription: LocalizedText;
  partnershipType: PartnershipType;
  publicDisplayAllowed: boolean;
  logoAssetId?: string | null;
  websiteReference?: string | null;
  reviewStatus: ReviewStatus;
}

/** A curated community impact finding (spec §43). Only APPROVED_FOR_PUBLICATION
 * renders. Separates the statistic from optional interpretation — the two are
 * never merged, and promotional interpretations are never auto-generated. */
export interface CommunityImpactFinding {
  id: string;
  title: LocalizedText;
  findingText: LocalizedText;
  findingType: CommunityFindingType;
  activityIds: string[];
  impactMetricIds: string[];
  fieldLearningIds: string[];
  statistic: LocalizedText;
  interpretation?: LocalizedText | null;
  limitationNote?: LocalizedText | null;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
  displayOrder: number;
}

/* ------------------------------------------------------------------ *
 * The dataset (spec §39)
 * ------------------------------------------------------------------ */

/**
 * The complete community fieldwork dataset (spec §39). Internal fieldwork records
 * → validation → privacy review → public record resolution → approved public JSON
 * → website. Private records are NEVER shipped to the browser and hidden with CSS
 * or UI logic (spec §39).
 */
export interface CommunityFieldworkDataset {
  datasetId: string;
  datasetVersion: string;
  activityRecords: FieldActivityRecord[];
  resourceRecords: EducationalResourceRecord[];
  materialDistributionRecords: MaterialDistributionRecord[];
  trainingMetrics: TrainingActivityMetric[];
  assessmentDefinitions: FieldAssessmentDefinition[];
  assessmentAggregates: FieldAssessmentAggregate[];
  learningComparisons: FieldLearningComparison[];
  fieldObservations: FieldObservationRecord[];
  fieldLearnings: FieldLearningRecord[];
  impactMetricDefinitions: ImpactMetricDefinition[];
  impactSummary: CommunityImpactSummary;
  partnerRecords: CommunityPartnerRecord[];
  evidenceAssets: FieldEvidenceAsset[];
  methodology: LocalizedText;
  methodologyLimitations: LocalizedText[];
  lastUpdated: string;
}

/** Local, non-persisted UI state (spec §47). No selectedParticipant /
 * selectedChild / selectedMedicalCase state ever exists. */
export interface CommunityViewState {
  selectedActivityType: ActivityType | 'all';
  selectedCity: FieldworkCity | 'all';
  selectedYear: string | 'all';
  selectedActivityId: string | null;
}

/* ------------------------------------------------------------------ *
 * Ongoing activity highlights + photos (public page, outside §39 dataset)
 * ------------------------------------------------------------------ */

/**
 * A short, qualitative description of ongoing community work. Deliberately
 * carries no dates, counts or impact figures: those belong to the reviewed
 * fieldwork dataset above, which stays empty until approved (spec §48).
 */
export interface CommunityActivityHighlight {
  id: string;
  title: LocalizedText;
  /** Where the work happens: organisation and city. Never a precise address. */
  place: LocalizedText;
  summary: LocalizedText;
  audience: LocalizedText;
  /** Learning Centre resource used in this activity, linked from its card. */
  resourceSlug?: string;
}

/** A consented photo of community work, served from `public/community/`. */
export interface CommunityPhoto {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
  activityId: string;
}
