import type {
  AudienceContext,
  GeneticTestingDiseaseId,
  GeneticTestingTopicRecord,
  InheritancePatternTag,
  LifeStageContext,
  ProfessionalType,
  ResultConceptRecord,
  TestingCategory,
  TestResultConcept,
} from './types';
import { getTestingReference } from './data/references';

/**
 * Genetic-testing content validation (spec §85). Pure and framework-free so the
 * medical-content rules are independently testable from React (spec §88).
 * Invalid medical records must NOT render (spec §85) — `getValidTopics` and
 * `getValidResultConcepts` remove them. Validation only ever removes bad records;
 * it never generates content (spec §70).
 */

const DISEASE_IDS: readonly GeneticTestingDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

const TESTING_CATEGORIES: readonly TestingCategory[] = [
  'CARRIER_TESTING',
  'DIAGNOSTIC_GENETIC_TESTING',
  'FAMILY_VARIANT_TESTING',
  'PRECONCEPTION_TESTING',
  'PRENATAL_TESTING_EDUCATION',
  'NEWBORN_SCREENING_EDUCATION',
  'POPULATION_SCREENING_EDUCATION',
  'GENETIC_COUNSELLING',
  'FAMILY_HISTORY_REVIEW',
  'OTHER',
];

const AUDIENCE_CONTEXTS: readonly AudienceContext[] = [
  'GENERAL_PUBLIC',
  'INDIVIDUAL',
  'COUPLE',
  'PARENT_OR_GUARDIAN',
  'PROSPECTIVE_PARENT',
  'FAMILY_WITH_KNOWN_HISTORY',
  'CAREGIVER',
  'CHILD_CARE_WORKER',
];

const LIFE_STAGE_CONTEXTS: readonly LifeStageContext[] = [
  'GENERAL',
  'BEFORE_MARRIAGE',
  'AFTER_MARRIAGE',
  'BEFORE_PREGNANCY',
  'DURING_PREGNANCY',
  'AFTER_CHILD_DIAGNOSIS',
  'AFTER_RELATIVE_DIAGNOSIS',
];

const INHERITANCE_TAGS: readonly InheritancePatternTag[] = [
  'AUTOSOMAL_RECESSIVE',
  'AUTOSOMAL_DOMINANT',
  'VARIES_BY_SUBTYPE',
  'OTHER',
];

const PROFESSIONAL_TYPES: readonly ProfessionalType[] = [
  'PAEDIATRICIAN',
  'GENERAL_PHYSICIAN',
  'HAEMATOLOGIST',
  'PULMONOLOGIST',
  'GASTROENTEROLOGIST',
  'MEDICAL_GENETICIST',
  'GENETIC_COUNSELLOR',
  'METABOLIC_SPECIALIST',
  'NEUROLOGIST',
  'CARDIOLOGIST',
  'ORTHOPAEDIC_SPECIALIST',
  'PHYSIOTHERAPIST',
  'OCCUPATIONAL_THERAPIST',
  'DIETITIAN',
  'OTHER',
];

const RESULT_CONCEPT_IDS: readonly TestResultConcept[] = [
  'POSITIVE_OR_PATHOGENIC_FINDING',
  'NEGATIVE_RESULT',
  'VARIANT_OF_UNCERTAIN_SIGNIFICANCE',
  'CARRIER_FINDING',
  'INCONCLUSIVE_RESULT',
];

function hasLocalized(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

function hasLocalizedList(list: readonly { en?: string; ur?: string }[] | undefined): boolean {
  return Array.isArray(list) && list.length > 0 && list.every(hasLocalized);
}

/** Collect the reasons a topic record is invalid (spec §85); empty = valid. */
export function getTopicErrors(topic: GeneticTestingTopicRecord): string[] {
  const errors: string[] = [];

  if (!topic.id?.trim()) errors.push('missing id');
  if (!hasLocalized(topic.title)) errors.push('missing title');
  if (!hasLocalized(topic.shortDescription)) errors.push('missing shortDescription');
  if (!TESTING_CATEGORIES.includes(topic.testingCategory)) errors.push('invalid testingCategory');

  if (!Array.isArray(topic.audienceContexts) || topic.audienceContexts.length === 0)
    errors.push('missing audienceContexts');
  else if (!topic.audienceContexts.every((a) => AUDIENCE_CONTEXTS.includes(a)))
    errors.push('invalid audienceContext');

  if (!Array.isArray(topic.lifeStageContexts) || topic.lifeStageContexts.length === 0)
    errors.push('missing lifeStageContexts');
  else if (!topic.lifeStageContexts.every((s) => LIFE_STAGE_CONTEXTS.includes(s)))
    errors.push('invalid lifeStageContext');

  if (!Array.isArray(topic.relatedDiseaseIds) || !topic.relatedDiseaseIds.every((d) => DISEASE_IDS.includes(d)))
    errors.push('invalid relatedDiseaseIds');

  if (!Array.isArray(topic.relatedInheritancePatterns) ||
    !topic.relatedInheritancePatterns.every((p) => INHERITANCE_TAGS.includes(p)))
    errors.push('invalid relatedInheritancePatterns');

  if (!hasLocalized(topic.whatItIs)) errors.push('missing whatItIs');
  if (!hasLocalized(topic.whyItMayBeDiscussed)) errors.push('missing whyItMayBeDiscussed');
  if (!hasLocalized(topic.whatItCanTellYou)) errors.push('missing whatItCanTellYou');
  if (!hasLocalized(topic.whatItCannotTellYou)) errors.push('missing whatItCannotTellYou');
  if (!hasLocalized(topic.beforeTesting)) errors.push('missing beforeTesting');
  if (!hasLocalized(topic.afterTesting)) errors.push('missing afterTesting');
  if (!hasLocalizedList(topic.questionsToAsk)) errors.push('missing questionsToAsk');

  if (!Array.isArray(topic.professionalTypeIds) ||
    !topic.professionalTypeIds.every((t) => PROFESSIONAL_TYPES.includes(t)))
    errors.push('invalid professionalTypeIds');

  // Every topic making a genetic/medical claim needs at least one valid reference (§71).
  if (!Array.isArray(topic.referenceIds) || topic.referenceIds.length === 0)
    errors.push('missing reference');
  else if (!topic.referenceIds.every((id) => getTestingReference(id)))
    errors.push('unknown reference');

  if (typeof topic.displayOrder !== 'number' || Number.isNaN(topic.displayOrder))
    errors.push('invalid displayOrder');

  return errors;
}

export function isValidTopic(topic: GeneticTestingTopicRecord): boolean {
  return getTopicErrors(topic).length === 0;
}

/** Return only valid topic records with unique ids (spec §85). */
export function getValidTopics(topics: readonly GeneticTestingTopicRecord[]): GeneticTestingTopicRecord[] {
  const seen = new Set<string>();
  const valid: GeneticTestingTopicRecord[] = [];
  for (const topic of topics) {
    if (!isValidTopic(topic)) continue;
    if (seen.has(topic.id)) continue;
    seen.add(topic.id);
    valid.push(topic);
  }
  return valid;
}

/** Collect the reasons a result-concept record is invalid; empty = valid. */
export function getResultConceptErrors(concept: ResultConceptRecord): string[] {
  const errors: string[] = [];
  if (!RESULT_CONCEPT_IDS.includes(concept.id)) errors.push('invalid id');
  if (!hasLocalized(concept.label)) errors.push('missing label');
  if (!hasLocalized(concept.whatItMeans)) errors.push('missing whatItMeans');
  if (!hasLocalized(concept.whatItDoesNotMean)) errors.push('missing whatItDoesNotMean');
  if (!Array.isArray(concept.referenceIds) || concept.referenceIds.length === 0)
    errors.push('missing reference');
  else if (!concept.referenceIds.every((id) => getTestingReference(id)))
    errors.push('unknown reference');
  return errors;
}

export function getValidResultConcepts(concepts: readonly ResultConceptRecord[]): ResultConceptRecord[] {
  return concepts.filter((concept) => getResultConceptErrors(concept).length === 0);
}
