import type { LocalizedText } from '@/types';
import type { ProfessionalType } from '@/features/early-signs';

/**
 * Genetic Testing & Counselling Education System — content model (Module 15).
 *
 * CORE PRINCIPLE (spec §2): this system provides genetic-testing education,
 * carrier awareness, screening education, genetic-counselling education, family-
 * history awareness, appointment preparation, and informed-decision support. It
 * does NOT provide genetic diagnosis, result interpretation, reproductive
 * instructions, marriage approval/rejection, pregnancy/abortion/IVF/embryo
 * recommendations, personal counselling, carrier inference, or clinical risk
 * assessment (spec §2/§17/§86). It never tells a user not to marry, not to have
 * children, or that a couple is "genetically incompatible" (spec §2/§32/§34).
 *
 * There is NO genetic-report upload, NO variant/rsID input, NO VUS
 * classification, NO pedigree builder, NO persistent family history, NO lab
 * ranking, NO testing marketplace, and NO runtime AI genetic guidance
 * (spec §29/§30/§42/§43/§53/§58/§69/§70). All content is curated, referenced,
 * structured records — never runtime-generated.
 *
 * Navigation is context- and category-based (spec §16/§77); selecting a context
 * NEVER infers personal risk (spec §17). The professional-type taxonomy is
 * REUSED from Module 13 (spec §89) — not duplicated.
 */

/** Diseases supported in V1 (Disease Library slugs, spec §88). */
export type GeneticTestingDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

export type { ProfessionalType };

/** Testing-education categories (spec §12). Organize education; never recommend a
 * test to an individual (spec §13). Public labels localized. */
export type TestingCategory =
  | 'CARRIER_TESTING'
  | 'DIAGNOSTIC_GENETIC_TESTING'
  | 'FAMILY_VARIANT_TESTING'
  | 'PRECONCEPTION_TESTING'
  | 'PRENATAL_TESTING_EDUCATION'
  | 'NEWBORN_SCREENING_EDUCATION'
  | 'POPULATION_SCREENING_EDUCATION'
  | 'GENETIC_COUNSELLING'
  | 'FAMILY_HISTORY_REVIEW'
  | 'OTHER';

/** Audience contexts (spec §14). Filter content; do NOT create medical profiles. */
export type AudienceContext =
  | 'GENERAL_PUBLIC'
  | 'INDIVIDUAL'
  | 'COUPLE'
  | 'PARENT_OR_GUARDIAN'
  | 'PROSPECTIVE_PARENT'
  | 'FAMILY_WITH_KNOWN_HISTORY'
  | 'CAREGIVER'
  | 'CHILD_CARE_WORKER';

/** Life-stage contexts (spec §15). Organize education; imply NO universal testing
 * requirement (spec §15). */
export type LifeStageContext =
  | 'GENERAL'
  | 'BEFORE_MARRIAGE'
  | 'AFTER_MARRIAGE'
  | 'BEFORE_PREGNANCY'
  | 'DURING_PREGNANCY'
  | 'AFTER_CHILD_DIAGNOSIS'
  | 'AFTER_RELATIVE_DIAGNOSIS';

/**
 * Educational result concepts (spec §25). The module explains these concepts —
 * it NEVER interprets an individual's actual result (spec §26/§28), and NEVER
 * classifies a VUS (spec §27).
 */
export type TestResultConcept =
  | 'POSITIVE_OR_PATHOGENIC_FINDING'
  | 'NEGATIVE_RESULT'
  | 'VARIANT_OF_UNCERTAIN_SIGNIFICANCE'
  | 'CARRIER_FINDING'
  | 'INCONCLUSIVE_RESULT';

/** Inheritance-pattern tags a topic may relate to (spec §6/§11/§18). Educational
 * associations only — never used to compute a personal probability (spec §17/§41). */
export type InheritancePatternTag =
  | 'AUTOSOMAL_RECESSIVE'
  | 'AUTOSOMAL_DOMINANT'
  | 'VARIES_BY_SUBTYPE'
  | 'OTHER';

/** A curated genetics / testing reference (spec §71/§72 — Module 07 architecture). */
export interface TestingReference {
  id: string;
  title: string;
  publication: string;
  year?: number;
  url?: string;
}

/**
 * A structured genetic-testing education record (spec §11/§65). Every record
 * making a medical or genetic claim MUST carry at least one valid reference or
 * it fails validation (spec §71/§85). Content uses qualified, educational
 * language ("may be discussed in situations where…") and never a personalized
 * recommendation (spec §13/§65).
 */
export interface GeneticTestingTopicRecord {
  id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  testingCategory: TestingCategory;
  audienceContexts: AudienceContext[];
  lifeStageContexts: LifeStageContext[];
  relatedDiseaseIds: GeneticTestingDiseaseId[];
  /** Optional subtype where testing is subtype-specific (spec §22/§23). */
  diseaseSubtypeId?: string | null;
  relatedInheritancePatterns: InheritancePatternTag[];
  whatItIs: LocalizedText;
  whyItMayBeDiscussed: LocalizedText;
  whatItCanTellYou: LocalizedText;
  whatItCannotTellYou: LocalizedText;
  beforeTesting: LocalizedText;
  afterTesting: LocalizedText;
  questionsToAsk: LocalizedText[];
  professionalTypeIds: ProfessionalType[];
  referenceIds: string[];
  contentNotice?: LocalizedText | null;
  displayOrder: number;
  lastReviewed?: string | null;
}

/**
 * An educational result-concept record (spec §25/§26). Explains what a KIND of
 * result may and may not mean — never interprets an actual report (spec §28).
 */
export interface ResultConceptRecord {
  id: TestResultConcept;
  label: LocalizedText;
  whatItMeans: LocalizedText;
  whatItDoesNotMean: LocalizedText;
  referenceIds: string[];
  displayOrder: number;
}

/**
 * Genetic-counselling education content (spec §66). A single curated,
 * non-directive record — it explicitly states what counselling does NOT do
 * (spec §32/§66): it does not make marriage or reproductive decisions.
 */
export interface CounsellingContent {
  whatItIs: LocalizedText;
  whatMayBeDiscussed: LocalizedText[];
  whatItDoesNotDo: LocalizedText[];
  professionalTypeIds: ProfessionalType[];
  referenceIds: string[];
}

/** Local, non-persisted filter state (spec §78/§79). */
export interface GeneticTestingFilters {
  lifeStage: LifeStageContext | 'all';
  audience: AudienceContext | 'all';
  category: TestingCategory | 'all';
  disease: GeneticTestingDiseaseId | 'all';
  query: string;
}
