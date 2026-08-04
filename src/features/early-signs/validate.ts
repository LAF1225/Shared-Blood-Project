import type {
  AgeContext,
  EarlySignDiseaseId,
  EarlySignRecord,
  ObservationCategory,
  PatternType,
  ProfessionalType,
  UrgencyContext,
  VisibilityType,
} from './types';
import { getEarlySignReference } from './data/references';

/**
 * Early-sign content validation (spec §72). Pure and framework-free so the
 * medical-content rules are independently testable from React (spec §74).
 * Invalid medical records must NOT render (spec §72) — `getValidSigns` removes
 * them. Validation only ever removes bad records; it never generates content
 * (spec §57).
 */

const DISEASE_IDS: readonly EarlySignDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

const AGE_CONTEXTS: readonly AgeContext[] = [
  'NEWBORN',
  'INFANT',
  'TODDLER',
  'YOUNG_CHILD',
  'GENERAL_CHILDHOOD',
];

const OBSERVATION_CATEGORIES: readonly ObservationCategory[] = [
  'GROWTH',
  'FEEDING',
  'BREATHING',
  'DIGESTION',
  'MOVEMENT',
  'MUSCLE_TONE',
  'JOINTS',
  'SKIN',
  'ENERGY',
  'DEVELOPMENT',
  'PAIN_OR_DISCOMFORT',
  'INFECTION_PATTERN',
  'APPEARANCE',
  'BLEEDING_OR_BRUISING',
  'OTHER',
];

const VISIBILITY_TYPES: readonly VisibilityType[] = ['VISIBLE', 'LESS_VISIBLE', 'PATTERN_BASED'];

const PATTERN_TYPES: readonly PatternType[] = [
  'SINGLE_OBSERVATION',
  'PERSISTENT',
  'RECURRING',
  'PROGRESSIVE',
  'COMBINATION_PATTERN',
];

const URGENCY_CONTEXTS: readonly UrgencyContext[] = [
  'ROUTINE_DISCUSSION',
  'PROMPT_ASSESSMENT',
  'URGENT_MEDICAL_HELP',
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

/** Collect the reasons a record is invalid (spec §72); empty array means valid. */
export function getSignErrors(sign: EarlySignRecord): string[] {
  const errors: string[] = [];

  if (!sign.id?.trim()) errors.push('missing id');
  if (!DISEASE_IDS.includes(sign.diseaseId)) errors.push('invalid diseaseId');
  if (!sign.title?.en?.trim()) errors.push('missing title');
  if (!sign.description?.en?.trim()) errors.push('missing description');

  if (!Array.isArray(sign.ageContexts) || sign.ageContexts.length === 0)
    errors.push('missing ageContexts');
  else if (!sign.ageContexts.every((age) => AGE_CONTEXTS.includes(age)))
    errors.push('invalid ageContext');

  if (!OBSERVATION_CATEGORIES.includes(sign.observationCategory)) errors.push('invalid observationCategory');
  if (!VISIBILITY_TYPES.includes(sign.visibilityType)) errors.push('invalid visibilityType');
  if (!PATTERN_TYPES.includes(sign.patternType)) errors.push('invalid patternType');
  if (!URGENCY_CONTEXTS.includes(sign.urgencyContext)) errors.push('invalid urgencyContext');

  if (!sign.caregiverObservation?.en?.trim()) errors.push('missing caregiverObservation');
  if (!sign.whatToNotice?.en?.trim()) errors.push('missing whatToNotice');
  // whatNotToAssume is a core educational feature (spec §16/§47).
  if (!sign.whatNotToAssume?.en?.trim()) errors.push('missing whatNotToAssume');

  if (!Array.isArray(sign.suggestedProfessionalTypes) ||
    !sign.suggestedProfessionalTypes.every((type) => PROFESSIONAL_TYPES.includes(type)))
    errors.push('invalid suggestedProfessionalTypes');

  // At least one valid medical reference is required (spec §54).
  if (!Array.isArray(sign.referenceIds) || sign.referenceIds.length === 0)
    errors.push('missing reference');
  else if (!sign.referenceIds.every((id) => getEarlySignReference(id)))
    errors.push('unknown reference');

  if (typeof sign.displayOrder !== 'number' || Number.isNaN(sign.displayOrder))
    errors.push('invalid displayOrder');

  return errors;
}

export function isValidSign(sign: EarlySignRecord): boolean {
  return getSignErrors(sign).length === 0;
}

/** Return only valid records with unique ids (spec §72). */
export function getValidSigns(signs: readonly EarlySignRecord[]): EarlySignRecord[] {
  const seen = new Set<string>();
  const valid: EarlySignRecord[] = [];
  for (const sign of signs) {
    if (!isValidSign(sign)) continue;
    if (seen.has(sign.id)) continue;
    seen.add(sign.id);
    valid.push(sign);
  }
  return valid;
}
