import type { LocalizedText } from '@/types';

/**
 * Research Findings & Reports System — "Research & Findings" (Module 18).
 *
 * CORE PRINCIPLE (spec §2): this converts APPROVED survey findings (Module 16),
 * fieldwork evidence (Module 17), training assessments, and literature-supported
 * context into structured, SOURCED, REVIEWED public research outputs. It publishes
 * reviewed Shared Blood findings and their evidence boundaries — it does NOT
 * automatically turn project data into scientific claims (spec §2/§14).
 *
 * It is NOT a journal, peer-review platform, clinical research database, patient
 * registry, statistical laboratory, AI researcher/writer, citation generator,
 * disease-surveillance system, or epidemiological registry (spec §2/§118).
 *
 * Hard boundaries baked into CONTENT + validation, not just types: every finding
 * has a traceable approved source (spec §9); evidence type constrains permitted
 * language (spec §5/§6); a convenience survey is not a national claim (spec §12/
 * §50); immediate post-session change ≠ long-term retention (spec §17); no
 * causation/correlation/significance without the actual analysis (spec §34/§35/
 * §36); no prevalence from awareness/calculator/fieldwork/anecdote (spec §43/§44/
 * §45/§46); non-stigmatizing consanguinity language only (spec §42); and the
 * "What This Does Not Show" architecture is a core requirement (spec §73).
 */

/** Diseases in scope for Version 1 findings (spec §43). */
export type ResearchDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/**
 * Evidence hierarchy (spec §5/§6). Evidence types are NOT equivalent —
 * classification constrains the interpretation language a finding may use.
 */
export type EvidenceType =
  | 'SURVEY_DATA'
  | 'FIELDWORK_METRIC'
  | 'FIELD_OBSERVATION'
  | 'TRAINING_ASSESSMENT'
  | 'LITERATURE_SOURCE'
  | 'PROJECT_ANALYTICS'
  | 'PROJECT_OPERATIONAL_DATA'
  | 'MIXED_EVIDENCE';

/** Finding types (spec §8). No disease-prevalence type — prevalence is not
 * inferred from awareness/fieldwork/calculators/anecdotes (spec §31/§43). */
export type FindingType =
  | 'AWARENESS_FINDING'
  | 'KNOWLEDGE_FINDING'
  | 'GENETIC_INHERITANCE_FINDING'
  | 'CARRIER_AWARENESS_FINDING'
  | 'GENETIC_TESTING_FINDING'
  | 'HEALTHCARE_ACCESS_FINDING'
  | 'EDUCATIONAL_FINDING'
  | 'FIELDWORK_FINDING'
  | 'TRAINING_FINDING'
  | 'RESOURCE_FINDING'
  | 'COMMUNITY_QUESTION_FINDING'
  | 'PROJECT_LEARNING_FINDING'
  | 'LITERATURE_CONTEXT_FINDING'
  | 'TREND_FINDING'
  | 'COMPARISON_FINDING';

/** Research domains (spec §22). */
export type ResearchDomain =
  | 'GENETIC_HEALTH_AWARENESS'
  | 'INHERITANCE_UNDERSTANDING'
  | 'CARRIER_STATUS_AWARENESS'
  | 'GENETIC_TESTING_AWARENESS'
  | 'CONSANGUINITY_AWARENESS'
  | 'HEALTHCARE_ACCESS'
  | 'GENETIC_COUNSELLING_AWARENESS'
  | 'CHILDCARE_WORKER_EDUCATION'
  | 'EARLY_SYMPTOM_AWARENESS'
  | 'PUBLIC_HEALTH_COMMUNICATION'
  | 'EDUCATIONAL_RESOURCE_EFFECTIVENESS'
  | 'COMMUNITY_HEALTH_EDUCATION';

/** Whether the evidence supported the research question (spec §25). The system
 * MUST allow publishing an approved "data was insufficient" statement. */
export type ConclusionStatus =
  | 'SUPPORTED'
  | 'PARTIALLY_SUPPORTED'
  | 'INCONCLUSIVE'
  | 'CONTRADICTORY';

/**
 * Communication confidence classification (spec §33). This is NOT a statistical
 * confidence interval or p-value (spec §33) — it must never be used decoratively
 * without a defined methodology.
 */
export type ConfidenceClassification =
  | 'DESCRIPTIVE'
  | 'EXPLORATORY'
  | 'MODERATE_SUPPORT'
  | 'STRONG_SUPPORT';

/** Geographic scope (spec §37). NATIONAL only when sampling supports it — living
 * in Pakistan does not make a dataset nationally representative (spec §37/§50). */
export type GeographicScope =
  | 'PROJECT_SAMPLE'
  | 'ACTIVITY_LOCATION'
  | 'CITY_LEVEL'
  | 'MULTI_CITY'
  | 'PROVINCE_LEVEL'
  | 'NATIONAL'
  | 'LITERATURE_DEFINED';

/** Research method types (spec §48). CLINICAL_STUDY is deliberately absent. */
export type MethodType =
  | 'DESCRIPTIVE_SURVEY'
  | 'CROSS_SECTIONAL_SURVEY'
  | 'FIELDWORK_DOCUMENTATION'
  | 'PRE_POST_EDUCATIONAL_ASSESSMENT'
  | 'AGGREGATE_ACTIVITY_ANALYSIS'
  | 'QUALITATIVE_FIELD_OBSERVATION'
  | 'LITERATURE_SYNTHESIS'
  | 'MIXED_METHODS';

/** Sampling method (spec §49). */
export type SamplingMethod =
  | 'CONVENIENCE_SAMPLE'
  | 'VOLUNTARY_RESPONSE'
  | 'PURPOSIVE_SAMPLE'
  | 'ACTIVITY_PARTICIPANT_SAMPLE'
  | 'CENSUS_OF_DOCUMENTED_ACTIVITIES'
  | 'LITERATURE_DEFINED'
  | 'OTHER';

/** Limitation types (spec §51). */
export type LimitationType =
  | 'SAMPLE_SIZE'
  | 'SAMPLING_BIAS'
  | 'VOLUNTARY_RESPONSE_BIAS'
  | 'GEOGRAPHIC_LIMITATION'
  | 'DEMOGRAPHIC_LIMITATION'
  | 'SELF_REPORT'
  | 'MISSING_DATA'
  | 'UNPAIRED_ASSESSMENT'
  | 'SHORT_TERM_MEASUREMENT'
  | 'FIELD_OBSERVATION_CONTEXT'
  | 'NO_DEDUPLICATION'
  | 'MEASUREMENT_LIMITATION'
  | 'TRANSLATION_LIMITATION'
  | 'OTHER';

/** Report types (spec §54). */
export type ReportType =
  | 'SURVEY_REPORT'
  | 'FIELDWORK_REPORT'
  | 'TRAINING_IMPACT_REPORT'
  | 'RESEARCH_BRIEF'
  | 'COMMUNITY_FINDINGS_REPORT'
  | 'ANNUAL_RESEARCH_SUMMARY'
  | 'MIXED_METHODS_REPORT';

/** Research question status (spec §23). A question does not imply an answer (§24). */
export type ResearchQuestionStatus =
  | 'PROPOSED'
  | 'ACTIVE'
  | 'ANALYSIS'
  | 'ANSWERED'
  | 'INCONCLUSIVE'
  | 'ARCHIVED';

/** Project learning status (spec §60). */
export type ProjectLearningStatus =
  | 'PROPOSED'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'IMPLEMENTED'
  | 'REJECTED'
  | 'ARCHIVED';

/**
 * Finding review workflow (spec §61). Only APPROVED_FOR_PUBLICATION renders.
 * SCIENTIFIC_REVIEWED is required for medical interpretation (spec §62).
 */
export type FindingReviewStatus =
  | 'DRAFT'
  | 'SOURCE_VALIDATED'
  | 'METHODOLOGY_REVIEWED'
  | 'INTERPRETATION_REVIEWED'
  | 'LIMITATION_REVIEWED'
  | 'SCIENTIFIC_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION';

/** Report review workflow (spec §63). */
export type ReportReviewStatus =
  | 'DRAFT'
  | 'FINDINGS_VALIDATED'
  | 'METHODOLOGY_VALIDATED'
  | 'LIMITATIONS_VALIDATED'
  | 'REFERENCES_VALIDATED'
  | 'SCIENTIFIC_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION'
  | 'ARCHIVED';

/** Generic review status for methodology/limitation/visualization/learning. */
export type ReviewStatus = 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED_FOR_PUBLICATION' | 'ARCHIVED';

/** Translation status (spec §101). Machine translations never auto-approve. */
export type TranslationStatus =
  | 'ENGLISH_ONLY'
  | 'URDU_ONLY'
  | 'TRANSLATION_PENDING'
  | 'BILINGUAL_APPROVED';

/** Lightweight visualization types (spec §75). No heavy dashboard engines. */
export type VisualizationType =
  | 'BAR_CHART'
  | 'HORIZONTAL_BAR_CHART'
  | 'DONUT_CHART'
  | 'LINE_CHART'
  | 'COMPARISON_BAR'
  | 'SCORE_CHANGE';

/** Report download asset types (spec §67). PDF is the Version 1 priority. */
export type DownloadAssetType = 'PDF' | 'CSV_AGGREGATE' | 'METHODOLOGY_DOC' | 'APPENDIX';

/* ------------------------------------------------------------------ *
 * Statistics (spec §26–§31)
 * ------------------------------------------------------------------ */

/** Rounding policy (spec §31). Stored source values remain UNROUNDED. */
export interface ResearchRoundingPolicy {
  id: string;
  wholePercentageDecimals: number;
  precisionPercentageDecimals: number;
  meanScoreDecimals: number;
}

/**
 * A structured finding statistic (spec §26). Structured values (numerator,
 * denominator, validResponseCount) are stored — NOT only a display string like
 * "72%" (spec §26). Source values remain unrounded (spec §31).
 */
export interface FindingStatistic {
  value: number;
  displayValue: LocalizedText;
  unit: LocalizedText;
  numerator?: number | null;
  denominator?: number | null;
  validResponseCount: number;
  calculationMethod: LocalizedText;
  roundingMethod: string;
  decimalPlaces: number;
  sourceVariableIds: string[];
  /** Multi-select options may sum above 100% (spec §30). */
  isMultiSelect?: boolean;
}

/* ------------------------------------------------------------------ *
 * Time scope (spec §38)
 * ------------------------------------------------------------------ */

export interface TimeScope {
  startDate: string;
  endDate: string;
  collectionPeriodLabel: LocalizedText;
  crossSectional: boolean;
  longitudinal: boolean;
}

/* ------------------------------------------------------------------ *
 * Source traceability (spec §9/§10/§86)
 * ------------------------------------------------------------------ */

/**
 * The precomputed registry of APPROVED sources a finding may reference (spec §106).
 * Built by controlled analysis from Module 16/17 approved data — the browser never
 * sees raw source records, only these approved ids and dataset versions. The
 * FindingSourceResolver validates finding source ids against this (spec §10).
 */
export interface ResearchSourceRegistry {
  /** datasetId → exact approved dataset version (spec §65). */
  datasetVersions: Record<string, string>;
  surveyFindingIds: string[];
  fieldActivityIds: string[];
  fieldObservationIds: string[];
  assessmentAggregateIds: string[];
  communityFindingIds: string[];
  /** Module 07 reference ids (spec §85/§92). */
  referenceIds: string[];
}

/**
 * A Shared Blood ORIGINAL research source citation (spec §86). This is NOT
 * peer-reviewed external literature (spec §87) — the two are structurally distinct.
 */
export interface InternalResearchSourceReference {
  sourceTitle: LocalizedText;
  datasetId: string;
  datasetVersion: string;
  collectionPeriod: LocalizedText;
  moduleId: string;
}

/* ------------------------------------------------------------------ *
 * Findings (spec §7/§74)
 * ------------------------------------------------------------------ */

/**
 * A research finding (spec §7). MUST reference at least one valid, approved source
 * (spec §9/§28) — a source-free finding is invalid and never renders. Evidence
 * type constrains language (spec §5/§6); scope must be evidence-based (spec §37).
 */
export interface ResearchFinding {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  findingType: FindingType;
  evidenceType: EvidenceType;
  researchDomainIds: ResearchDomain[];
  diseaseIds: ResearchDiseaseId[];
  /** Source ids by category — validated against the registry (spec §9/§10). */
  sourceDatasetIds: string[];
  sourceSurveyFindingIds: string[];
  sourceFieldActivityIds: string[];
  sourceFieldObservationIds: string[];
  sourceAssessmentAggregateIds: string[];
  sourceCommunityFindingIds: string[];
  referenceIds: string[];
  statistic?: FindingStatistic | null;
  calculationMethod: LocalizedText;
  sampleContext: LocalizedText;
  geographicScope: GeographicScope;
  timeScope: TimeScope;
  conclusionStatus: ConclusionStatus;
  confidenceClassification: ConfidenceClassification;
  interpretation: FindingInterpretation;
  limitationIds: string[];
  projectLearningIds: string[];
  relatedFindingIds: string[];
  visualizationIds: string[];
  reportId?: string | null;
  reviewStatus: FindingReviewStatus;
  translationStatus: TranslationStatus;
  publicDisplayAllowed: boolean;
  featured: boolean;
  featuredOrder?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Structured finding interpretation (spec §74). Keeps the observed result separate
 * from the approved interpretation and the optional possible-explanation, and
 * carries the mandatory "What This Does Not Show" boundary (spec §57/§73).
 */
export interface FindingInterpretation {
  observedResult: LocalizedText;
  approvedInterpretation: LocalizedText;
  /** CORE (spec §73): the boundaries a finding does NOT establish. */
  doesNotShow: LocalizedText;
  possibleExplanation?: LocalizedText | null;
  projectImplication?: LocalizedText | null;
  reviewStatus: ReviewStatus;
}

/**
 * A group comparison finding (spec §40). Uses accurate, non-stigmatizing group
 * definitions (spec §41/§42). statisticalTestId is null unless a real test ran
 * (spec §34).
 */
export interface ComparisonFinding {
  id: string;
  comparisonGroupA: LocalizedText;
  comparisonGroupB: LocalizedText;
  comparisonVariable: LocalizedText;
  comparisonMethod: LocalizedText;
  groupAValue: number;
  groupBValue: number;
  absoluteDifference: number;
  percentagePointDifference: number;
  statisticalTestId?: string | null;
  interpretation: LocalizedText;
  limitationNote: LocalizedText;
}

/* ------------------------------------------------------------------ *
 * Research questions, methodology, limitations (spec §23/§47/§51)
 * ------------------------------------------------------------------ */

export interface ResearchQuestion {
  id: string;
  question: LocalizedText;
  researchDomainIds: ResearchDomain[];
  sourceModuleIds: string[];
  methodologyIds: string[];
  relatedFindingIds: string[];
  status: ResearchQuestionStatus;
  publicDisplayAllowed: boolean;
}

export interface ResearchMethodology {
  id: string;
  title: LocalizedText;
  researchQuestionIds: string[];
  researchDomainIds: ResearchDomain[];
  methodType: MethodType;
  sourceModuleIds: string[];
  datasetIds: string[];
  populationDescription: LocalizedText;
  sampleDescription: LocalizedText;
  samplingMethod: SamplingMethod;
  collectionMethod: LocalizedText;
  collectionPeriod: LocalizedText;
  inclusionCriteria: LocalizedText;
  exclusionCriteria: LocalizedText;
  analysisMethod: LocalizedText;
  missingDataTreatment: LocalizedText;
  roundingPolicyId: string;
  smallSamplePolicy: LocalizedText;
  ethicalConsiderations: LocalizedText;
  limitations: LocalizedText[];
  referenceIds: string[];
  version: number;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/**
 * A research limitation (spec §51). Required limitations MUST render with their
 * affected findings/reports (spec §52) — never hidden on a separate page while
 * broad conclusions display elsewhere.
 */
export interface ResearchLimitation {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  limitationType: LimitationType;
  affectedFindingIds: string[];
  affectedMethodologyIds: string[];
  severity: 'LOW' | 'MODERATE' | 'HIGH';
  publicDisplayRequired: boolean;
  reviewStatus: ReviewStatus;
}

/* ------------------------------------------------------------------ *
 * Reports, learnings, visualizations, downloads (spec §53/§60/§78/§67)
 * ------------------------------------------------------------------ */

export interface ResearchReport {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  reportType: ReportType;
  publicationDate: string;
  reportVersion: string;
  researchQuestionIds: string[];
  researchDomainIds: ResearchDomain[];
  methodologyIds: string[];
  findingIds: string[];
  limitationIds: string[];
  referenceIds: string[];
  projectLearningIds: string[];
  executiveSummary: LocalizedText;
  background: LocalizedText;
  objectives: LocalizedText[];
  methodsSummary: LocalizedText;
  findingsSummary: LocalizedText;
  discussion: LocalizedText;
  limitationsSummary: LocalizedText;
  projectImplications: LocalizedText;
  conclusion: LocalizedText;
  downloadAssetIds: string[];
  /** Exact dataset versions used (spec §65/§66). */
  datasetReferences: ReportDatasetReference[];
  translationStatus: TranslationStatus;
  reviewStatus: ReportReviewStatus;
  publicDisplayAllowed: boolean;
  featured: boolean;
  featuredOrder?: number;
}

export interface ReportDatasetReference {
  reportId: string;
  datasetId: string;
  datasetVersion: string;
  analysisDate: string;
  findingIds: string[];
}

export interface ResearchProjectLearning {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  sourceFindingIds: string[];
  sourceReportIds: string[];
  affectedModuleIds: string[];
  recommendedChange: LocalizedText;
  implementationStatus: ProjectLearningStatus;
  implementedVersionIds: string[];
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** A lightweight, accessible visualization derived from approved findings
 * (spec §78/§79). displayValues are rounded; sourceValues remain unrounded. */
export interface ResearchVisualization {
  id: string;
  title: LocalizedText;
  visualizationType: VisualizationType;
  findingIds: string[];
  datasetIds: string[];
  xAxisDefinition: LocalizedText;
  yAxisDefinition: LocalizedText;
  seriesDefinitions: { label: LocalizedText; values: number[] }[];
  categories: LocalizedText[];
  displayValues: number[];
  sourceValues: number[];
  unit: LocalizedText;
  methodologyNote: LocalizedText;
  limitationNote?: LocalizedText | null;
  altText: LocalizedText;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

export interface ReportDownloadAsset {
  id: string;
  reportId: string;
  reportVersion: string;
  assetType: DownloadAssetType;
  language: 'en' | 'ur';
  fileReference: string;
  fileSize: number;
  publicationDate: string;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/* ------------------------------------------------------------------ *
 * The dataset (spec §106)
 * ------------------------------------------------------------------ */

/**
 * The approved research dataset (spec §106). Internal approved sources → controlled
 * analysis → validated finding/visualization JSON → website. The browser presents
 * approved findings and NEVER discovers findings from raw data (spec §105/§106).
 */
export interface ResearchFindingsDataset {
  datasetId: string;
  datasetVersion: string;
  researchQuestions: ResearchQuestion[];
  findings: ResearchFinding[];
  comparisonFindings: ComparisonFinding[];
  methodologies: ResearchMethodology[];
  limitations: ResearchLimitation[];
  reports: ResearchReport[];
  projectLearnings: ResearchProjectLearning[];
  visualizations: ResearchVisualization[];
  downloadAssets: ReportDownloadAsset[];
  roundingPolicies: ResearchRoundingPolicy[];
  internalSources: InternalResearchSourceReference[];
  sourceRegistry: ResearchSourceRegistry;
  publicDisclaimer: LocalizedText;
  lastUpdated: string;
}

/** Local, non-persisted UI state (spec §107). No respondent/participant/patient
 * state ever exists. */
export interface ResearchViewState {
  selectedResearchDomain: ResearchDomain | 'all';
  selectedEvidenceType: EvidenceType | 'all';
  selectedReportType: ReportType | 'all';
  selectedYear: string | 'all';
  selectedFindingId: string | null;
  selectedReportId: string | null;
}
