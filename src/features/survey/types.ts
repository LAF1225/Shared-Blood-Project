import type { LocalizedText } from '@/types';

/**
 * Survey & Public Awareness Data System — "What Pakistan Knows" (Module 16).
 *
 * CORE PRINCIPLE (spec §2): this is aggregate public-awareness RESEARCH — social-
 * attitude and health-literacy findings about a surveyed sample. It is NOT
 * individual profiling, genetic risk assessment, marriage-compatibility analysis,
 * medical diagnosis, an individual-response browser, or a respondent database
 * (spec §2/§57/§76). The public application receives APPROVED AGGREGATE DATA
 * ONLY — never raw responses (spec §8). No live collection, Google Forms/Sheets
 * runtime, respondent accounts, or runtime AI interpretation exist (spec §6/§7/
 * §57/§66). All records describe the instrument or aggregate findings — never a
 * respondent's answer (spec §9).
 *
 * Language rules are baked into the content, not the types: sample language
 * ("Among respondents surveyed in…") over population claims (spec §27); self-
 * reported awareness ≠ knowledge (spec §14); intention ≠ behaviour (spec §22);
 * influence ≠ coercion (spec §21); association ≠ causation (spec §40).
 */

/** Diseases compared in the awareness research (spec §13/§49). */
export type SurveyDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/** Instrument question types (spec §10). SHORT_TEXT/OPTIONAL_COMMENT need
 * separate qualitative review before any public use (spec §10/§55). */
export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'LIKERT_SCALE'
  | 'YES_NO'
  | 'AWARENESS_SCALE'
  | 'KNOWLEDGE_CHECK'
  | 'SHORT_TEXT'
  | 'OPTIONAL_COMMENT'
  | 'DEMOGRAPHIC';

/** Broad data shape of a question's responses. */
export type ResponseType = 'CATEGORICAL' | 'ORDINAL_SCALE' | 'BOOLEAN' | 'TEXT' | 'NUMERIC';

/** Research domains (spec §11). Public labels localized. */
export type ResearchDomain =
  | 'GENETIC_LITERACY'
  | 'INHERITANCE_AWARENESS'
  | 'DISEASE_AWARENESS'
  | 'CARRIER_AWARENESS'
  | 'CONSANGUINITY_AWARENESS'
  | 'COUSIN_MARRIAGE_ATTITUDE'
  | 'FAMILY_INFLUENCE'
  | 'GENETIC_TESTING_AWARENESS'
  | 'GENETIC_TESTING_ATTITUDE'
  | 'INFORMATION_SOURCE'
  | 'SOCIAL_CONTEXT'
  | 'DEMOGRAPHIC_CONTEXT';

/** Self-reported awareness scale (spec §13). NOT medical knowledge (spec §14). */
export type DiseaseAwarenessLevel =
  | 'NEVER_HEARD_OF_IT'
  | 'HEARD_THE_NAME'
  | 'KNOW_A_LITTLE'
  | 'KNOW_A_FAIR_AMOUNT'
  | 'KNOW_A_LOT';

/** Likert levels, used consistently (spec §20). */
export type LikertLevel =
  | 'STRONGLY_DISAGREE'
  | 'DISAGREE'
  | 'NEUTRAL'
  | 'AGREE'
  | 'STRONGLY_AGREE';

/** Cousin-marriage attitude dimensions (spec §18). Multidimensional — never
 * reduced to pro/anti categories (spec §19). */
export type CousinMarriageDimension =
  | 'SOCIAL_ACCEPTANCE'
  | 'PERSONAL_ACCEPTANCE'
  | 'FAMILY_ACCEPTANCE'
  | 'PERCEIVED_GENETIC_RISK'
  | 'PERCEIVED_SOCIAL_BENEFIT'
  | 'FAMILY_EXPECTATION'
  | 'WILLINGNESS_TO_RECONSIDER'
  | 'TESTING_BEFORE_MARRIAGE'
  | 'INFORMATION_SEEKING';

/** Family-influence dimensions (spec §21). Influence ≠ coercion (spec §21). */
export type FamilyInfluenceDimension =
  | 'PARENTAL_INFLUENCE'
  | 'EXTENDED_FAMILY_INFLUENCE'
  | 'PERSONAL_CHOICE'
  | 'FAMILY_EXPECTATION'
  | 'FAMILY_APPROVAL'
  | 'KINSHIP_PREFERENCE';

/** Information sources (spec §23). Never labelled good/bad without a framework. */
export type InformationSource =
  | 'DOCTOR'
  | 'HOSPITAL'
  | 'SCHOOL'
  | 'UNIVERSITY'
  | 'FAMILY'
  | 'FRIENDS'
  | 'SOCIAL_MEDIA'
  | 'NEWS'
  | 'RELIGIOUS_OR_COMMUNITY_SOURCE'
  | 'INTERNET_SEARCH'
  | 'NGO'
  | 'OTHER';

/** Surveyed cities (spec §25). Sample descriptors, NOT risk classifications. */
export type SurveyCity = 'ISLAMABAD' | 'RAWALPINDI' | 'LAHORE' | 'KARACHI' | 'OTHER';

/** Age bands (spec §24) — bands, never exact ages. */
export type AgeBand = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

/** Education bands (spec §24) — only where in the approved instrument. */
export type EducationBand =
  | 'NO_FORMAL'
  | 'PRIMARY'
  | 'SECONDARY'
  | 'HIGHER_SECONDARY'
  | 'UNDERGRADUATE'
  | 'POSTGRADUATE'
  | 'OTHER';

/** Missing-data categories (spec §29). PREFER_NOT_TO_SAY is NEVER treated as
 * NO/NONE/NEGATIVE/DISAGREE (spec §29). */
export type MissingDataCategory =
  | 'NO_RESPONSE'
  | 'PREFER_NOT_TO_SAY'
  | 'INVALID_RESPONSE'
  | 'EXCLUDED_DURING_CLEANING';

/** Finding types (spec §44). */
export type FindingType =
  | 'KEY_FINDING'
  | 'AWARENESS_FINDING'
  | 'DISEASE_FINDING'
  | 'SOCIAL_ATTITUDE_FINDING'
  | 'CITY_COMPARISON'
  | 'TESTING_ATTITUDE_FINDING'
  | 'INFORMATION_SOURCE_FINDING'
  | 'RESEARCH_LIMITATION';

/** Finding review workflow (spec §44). Only APPROVED_FOR_PUBLICATION renders. */
export type ReviewStatus =
  | 'DRAFT'
  | 'DATA_VERIFIED'
  | 'INTERPRETATION_REVIEWED'
  | 'APPROVED_FOR_PUBLICATION';

/** Lightweight chart types (spec §46). No 3D / animated / geographic engines. */
export type ChartType = 'HORIZONTAL_BAR' | 'VERTICAL_BAR' | 'STACKED_100' | 'COMPARISON';

/** Indicator scoring method (spec §16). Documented explicitly. */
export type ScoringMethod = 'SUM_CORRECT' | 'PERCENT_CORRECT' | 'WEIGHTED';

/**
 * Small-cell suppression sentinel (spec §42). A subgroup value below
 * MIN_PUBLIC_CELL_SIZE is replaced with this BEFORE the aggregate reaches the
 * client — the real number must never appear in JSON, tooltips, source, a11y
 * labels, chart metadata, or downloads (spec §42). It carries no recoverable
 * numeric information.
 */
export const SUPPRESSED = 'SUPPRESSED' as const;
export type Suppressed = typeof SUPPRESSED;
/** A public numeric value that may have been suppressed for privacy. */
export type Suppressible = number | Suppressed;

export const MIN_PUBLIC_CELL_SIZE = 5;

/**
 * A survey instrument question (spec §9). Describes the instrument only — it
 * NEVER contains a respondent's answer.
 */
export interface SurveyQuestionRecord {
  id: string;
  questionCode: string;
  questionText: LocalizedText;
  questionType: QuestionType;
  researchDomain: ResearchDomain;
  responseType: ResponseType;
  allowedResponseValues: string[];
  diseaseIds: SurveyDiseaseId[];
  socialDimensionIds: (CousinMarriageDimension | FamilyInfluenceDimension)[];
  isDemographic: boolean;
  isSensitive: boolean;
  publicDisplayAllowed: boolean;
  displayOrder: number;
  version: number;
  /** For KNOWLEDGE_CHECK questions only (spec §15): scored answers must be
   * scientifically referenced through Module 07. */
  correctResponse?: string | null;
  scientificExplanation?: LocalizedText | null;
  referenceIds?: string[];
  /** Translation versioning (spec §64). */
  translationVersion: number;
}

/** Interpretation band for the aggregate literacy indicator (spec §16). */
export interface IndicatorBand {
  id: string;
  label: LocalizedText;
  minScore: number;
  maxScore: number;
}

/**
 * Genetic Literacy Indicator definition (spec §16). An AGGREGATE research summary
 * metric — never an individual label (spec §17). Scoring is documented.
 */
export interface GeneticLiteracyIndicatorDefinition {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  includedQuestionIds: string[];
  scoringMethod: ScoringMethod;
  minimumScore: number;
  maximumScore: number;
  interpretationBands: IndicatorBand[];
  referenceVersion: string;
  methodologyNote: LocalizedText;
}

/** Aggregate for a single question (spec §31). No respondent rows. */
export interface SurveyQuestionAggregate {
  questionId: string;
  validResponseCount: number;
  missingResponseCount: number;
  /** Keyed by allowed response value; small cells suppressed (spec §42). */
  responseCounts: Record<string, Suppressible>;
  responsePercentages: Record<string, Suppressible>;
  /** MULTIPLE_CHOICE questions let a respondent pick several options, so their
   * counts need not sum to validResponseCount (spec §10). */
  isMultiResponse?: boolean;
  /** Optional — never average nominal categories (spec §31). */
  meanValue?: number | null;
  medianValue?: number | null;
  publicFinding: LocalizedText;
  methodologyNote?: LocalizedText | null;
}

/** Aggregate for disease self-reported awareness (spec §32). */
export interface DiseaseAwarenessAggregate {
  diseaseId: SurveyDiseaseId;
  validResponseCount: number;
  awarenessLevelCounts: Record<DiseaseAwarenessLevel, Suppressible>;
  awarenessLevelPercentages: Record<DiseaseAwarenessLevel, Suppressible>;
  /** Defined consistently across diseases (spec §32). */
  heardOfPercentage: Suppressible;
  selfReportedFamiliarityPercentage: Suppressible;
  cityBreakdown?: Partial<Record<SurveyCity, Suppressible>>;
  publicFinding: LocalizedText;
}

/** Aggregate for an attitude question (spec §33). Requires manual review. */
export interface AttitudeAggregate {
  questionId: string;
  socialDimensionId: CousinMarriageDimension | FamilyInfluenceDimension;
  validResponseCount: number;
  responseDistribution: Record<LikertLevel, Suppressible>;
  agreementPercentage: Suppressible;
  neutralPercentage: Suppressible;
  disagreementPercentage: Suppressible;
  cityBreakdown?: Partial<Record<SurveyCity, Suppressible>>;
  publicFinding: LocalizedText;
}

/** Indicator aggregate value (spec §30/§34). Aggregate summary only (spec §17). */
export interface IndicatorAggregate {
  indicatorId: string;
  validResponseCount: number;
  meanScore: Suppressible;
  bandDistribution: Record<string, Suppressible>;
  publicFinding: LocalizedText;
}

/** Per-city aggregate (spec §34) — surveyed sample, not total population. */
export interface CitySurveyAggregate {
  cityId: SurveyCity;
  respondentCount: number;
  questionAggregates: SurveyQuestionAggregate[];
  indicatorAggregates: IndicatorAggregate[];
  diseaseAwarenessAggregates: DiseaseAwarenessAggregate[];
  attitudeAggregates: AttitudeAggregate[];
}

/** The approved aggregate dataset (spec §30). No respondent-level rows. */
export interface SurveyAggregateDataset {
  datasetId: string;
  surveyTitle: LocalizedText;
  surveyVersion: string;
  datasetVersion: string;
  analysisVersion: string;
  collectionStartDate: string;
  collectionEndDate: string;
  cities: SurveyCity[];
  totalResponses: number;
  validResponseTotal: number;
  missingResponseTotal: number;
  methodologySummary: LocalizedText;
  limitations: LocalizedText[];
  /** How the sample was actually recruited (spec §52). Never "random" unless true. */
  samplingMethod: LocalizedText;
  /** Anonymous vs confidential terminology matching the real process (spec §54). */
  privacyStatement: LocalizedText;
  questionAggregates: SurveyQuestionAggregate[];
  indicatorAggregates: IndicatorAggregate[];
  cityAggregates: CitySurveyAggregate[];
  diseaseAwarenessAggregates: DiseaseAwarenessAggregate[];
  attitudeAggregates: AttitudeAggregate[];
  lastUpdated: string;
}

/**
 * A curated public finding (spec §43). Only records with reviewStatus
 * APPROVED_FOR_PUBLICATION render (spec §44). Separates the observed statistic
 * ("What the Survey Found") from optional interpretation ("What This May
 * Suggest") — the two are never merged (spec §45).
 */
export interface SurveyFindingRecord {
  id: string;
  title: LocalizedText;
  /** One-sentence finding — "What the Survey Found" (spec §45). */
  findingText: LocalizedText;
  findingType: FindingType;
  questionIds: string[];
  indicatorIds: string[];
  cityIds: SurveyCity[];
  diseaseIds: SurveyDiseaseId[];
  /** The exact statistic as published — must match the aggregate (spec §45). */
  statistic: LocalizedText;
  validResponseCount: number;
  /** Optional "What This May Suggest" — kept separate from the finding (spec §45). */
  interpretation?: LocalizedText | null;
  limitationNote?: LocalizedText | null;
  referenceToMethodology: string;
  displayOrder: number;
  reviewStatus: ReviewStatus;
  datasetVersion: string;
}

/** Offline cleaning log (spec §36). Produced by the offline script, never in the
 * browser; surfaced here for provenance/validation. */
export interface SurveyCleaningLog {
  datasetVersion: string;
  originalResponseCount: number;
  finalResponseCount: number;
  excludedResponseCount: number;
  exclusionReasons: { reason: string; count: number }[];
  questionMappingWarnings: string[];
  invalidValueWarnings: string[];
  generatedAt: string;
}

/** Qualitative theme from reviewed open text (spec §55). Manual review required;
 * quotes are never auto-published (spec §56). */
export interface QualitativeThemeRecord {
  id: string;
  themeTitle: LocalizedText;
  description: LocalizedText;
  sourceQuestionIds: string[];
  responseCount: number;
  codingMethod: LocalizedText;
  reviewStatus: ReviewStatus;
  publicDisplayAllowed: boolean;
}

/** Accessible chart payload (spec §47). */
export interface ChartData {
  chartType: ChartType;
  title: LocalizedText;
  description: LocalizedText;
  /** Each series item; value may be suppressed (spec §42). */
  data: { label: LocalizedText; value: Suppressible }[];
  validResponseCount: number;
  unit: LocalizedText;
  sourceLabel: LocalizedText;
  methodologyReference: string;
  limitationNote?: LocalizedText | null;
}

/** Local, non-persisted UI state (spec §67). No respondent state. */
export interface SurveyViewState {
  selectedResearchSection: ResearchDomain | 'all';
  selectedCityComparison: SurveyCity | 'all';
  selectedDiseaseAwarenessView: SurveyDiseaseId | 'all';
  selectedFindingId: string | null;
}
