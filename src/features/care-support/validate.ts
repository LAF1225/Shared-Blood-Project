import type {
  AgeContext,
  CareContext,
  CareDiseaseId,
  CareDomain,
  CareSupportRecord,
  CaregiverAudience,
  MedicalDeviceStatus,
  ProfessionalType,
  SupportItemCategory,
  SupportItemRecord,
} from './types';
import { getCareReference } from './data/references';
import { getSupportItem } from './data/supportItems';

/**
 * Care & Support content validation (spec §76). Pure and framework-free so the
 * medical-content rules are independently testable from React (spec §78).
 * Invalid records must NOT render (spec §64/§76) — `getValidCareRecords` and
 * `getValidSupportItems` remove them. Validation only ever removes bad records;
 * it never generates content (spec §67).
 */

const DISEASE_IDS: readonly CareDiseaseId[] = [
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

const CARE_DOMAINS: readonly CareDomain[] = [
  'DAILY_ROUTINE',
  'NUTRITION_AWARENESS',
  'FEEDING_SUPPORT',
  'MOVEMENT_SUPPORT',
  'JOINT_SUPPORT',
  'MUSCLE_SUPPORT',
  'RESPIRATORY_SUPPORT',
  'DEVELOPMENT_SUPPORT',
  'LEARNING_SUPPORT',
  'ENERGY_MANAGEMENT',
  'PAIN_AWARENESS',
  'SKIN_SUPPORT',
  'SLEEP_SUPPORT',
  'INFECTION_AWARENESS',
  'EMOTIONAL_SUPPORT',
  'SOCIAL_SUPPORT',
  'SCHOOL_SUPPORT',
  'APPOINTMENT_PREPARATION',
  'MEDICAL_ROUTINE_AWARENESS',
  'CAREGIVER_PREPARATION',
  'ACCESSIBILITY',
  'OTHER',
];

const CARE_CONTEXTS: readonly CareContext[] = [
  'EVERYDAY_SUPPORT',
  'DEVELOPMENT_SUPPORT',
  'MEDICAL_ROUTINE_SUPPORT',
  'EDUCATION_SUPPORT',
  'MOBILITY_SUPPORT',
  'COMMUNICATION_SUPPORT',
  'FAMILY_SUPPORT',
  'ENVIRONMENTAL_SUPPORT',
];

const CAREGIVER_AUDIENCES: readonly CaregiverAudience[] = [
  'PARENT_OR_GUARDIAN',
  'CHILD_CARE_WORKER',
  'FAMILY_CAREGIVER',
  'SCHOOL_CAREGIVER',
  'GENERAL_CAREGIVER',
];

const SUPPORT_CATEGORIES: readonly SupportItemCategory[] = [
  'MOBILITY',
  'POSITIONING',
  'FEEDING',
  'RESPIRATORY',
  'JOINT_SUPPORT',
  'COMFORT',
  'SCHOOL_ADAPTATION',
  'DAILY_LIVING',
  'ORGANIZATION',
  'ACCESSIBILITY',
  'OTHER',
];

const DEVICE_STATUSES: readonly MedicalDeviceStatus[] = [
  'NON_MEDICAL_SUPPORT_ITEM',
  'PROFESSIONAL_GUIDANCE_RECOMMENDED',
  'PROFESSIONAL_ASSESSMENT_REQUIRED',
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

function hasLocalized(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

function hasLocalizedList(list: readonly { en?: string; ur?: string }[] | undefined): boolean {
  return Array.isArray(list) && list.length > 0 && list.every(hasLocalized);
}

/** Collect the reasons a care record is invalid (spec §76); empty = valid. */
export function getCareRecordErrors(record: CareSupportRecord): string[] {
  const errors: string[] = [];

  if (!record.id?.trim()) errors.push('missing id');
  if (!DISEASE_IDS.includes(record.diseaseId)) errors.push('invalid diseaseId');
  if (!hasLocalized(record.title)) errors.push('missing title');
  if (!hasLocalized(record.shortDescription)) errors.push('missing shortDescription');
  if (!CARE_DOMAINS.includes(record.careDomain)) errors.push('invalid careDomain');
  if (!CARE_CONTEXTS.includes(record.careContext)) errors.push('invalid careContext');

  if (!Array.isArray(record.ageContexts) || record.ageContexts.length === 0)
    errors.push('missing ageContexts');
  else if (!record.ageContexts.every((age) => AGE_CONTEXTS.includes(age)))
    errors.push('invalid ageContext');

  if (!hasLocalized(record.whyItMayMatter)) errors.push('missing whyItMayMatter');
  if (!hasLocalizedList(record.practicalConsiderations)) errors.push('missing practicalConsiderations');
  if (!hasLocalizedList(record.caregiverExpectations)) errors.push('missing caregiverExpectations');
  if (!hasLocalizedList(record.questionsToAsk)) errors.push('missing questionsToAsk');

  if (!Array.isArray(record.suggestedProfessionalTypes) ||
    !record.suggestedProfessionalTypes.every((type) => PROFESSIONAL_TYPES.includes(type)))
    errors.push('invalid suggestedProfessionalTypes');

  if (!Array.isArray(record.caregiverAudiences) || record.caregiverAudiences.length === 0)
    errors.push('missing caregiverAudiences');
  else if (!record.caregiverAudiences.every((audience) => CAREGIVER_AUDIENCES.includes(audience)))
    errors.push('invalid caregiverAudience');

  // Support-item references must resolve to real items (spec §71).
  if (!Array.isArray(record.supportItemIds)) errors.push('invalid supportItemIds');
  else if (!record.supportItemIds.every((id) => getSupportItem(id)))
    errors.push('unknown supportItemId');

  // Every care record carries at least one valid medical/care reference (spec §64).
  if (!Array.isArray(record.referenceIds) || record.referenceIds.length === 0)
    errors.push('missing reference');
  else if (!record.referenceIds.every((id) => getCareReference(id)))
    errors.push('unknown reference');

  if (typeof record.displayOrder !== 'number' || Number.isNaN(record.displayOrder))
    errors.push('invalid displayOrder');

  return errors;
}

export function isValidCareRecord(record: CareSupportRecord): boolean {
  return getCareRecordErrors(record).length === 0;
}

/** Return only valid care records with unique ids (spec §76). */
export function getValidCareRecords(records: readonly CareSupportRecord[]): CareSupportRecord[] {
  const seen = new Set<string>();
  const valid: CareSupportRecord[] = [];
  for (const record of records) {
    if (!isValidCareRecord(record)) continue;
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    valid.push(record);
  }
  return valid;
}

/** An item involves medical/therapeutic use if it is not a plain non-medical item. */
function involvesMedicalUse(item: SupportItemRecord): boolean {
  return item.medicalDeviceStatus !== 'NON_MEDICAL_SUPPORT_ITEM' || item.professionalGuidanceRequired;
}

/** Collect the reasons a support item is invalid (spec §76); empty = valid. */
export function getSupportItemErrors(item: SupportItemRecord): string[] {
  const errors: string[] = [];

  if (!item.id?.trim()) errors.push('missing id');
  if (!hasLocalized(item.name)) errors.push('missing name');
  if (!hasLocalized(item.genericName)) errors.push('missing genericName');
  if (!hasLocalized(item.description)) errors.push('missing description');
  if (!SUPPORT_CATEGORIES.includes(item.supportCategory)) errors.push('invalid supportCategory');

  if (!Array.isArray(item.relatedDiseaseIds) || item.relatedDiseaseIds.length === 0)
    errors.push('missing relatedDiseaseIds');
  else if (!item.relatedDiseaseIds.every((id) => DISEASE_IDS.includes(id)))
    errors.push('invalid relatedDiseaseId');

  if (!Array.isArray(item.relatedCareDomains) || item.relatedCareDomains.length === 0)
    errors.push('missing relatedCareDomains');
  else if (!item.relatedCareDomains.every((domain) => CARE_DOMAINS.includes(domain)))
    errors.push('invalid relatedCareDomain');

  if (!Array.isArray(item.ageContexts) || item.ageContexts.length === 0)
    errors.push('missing ageContexts');
  else if (!item.ageContexts.every((age) => AGE_CONTEXTS.includes(age)))
    errors.push('invalid ageContext');

  if (!hasLocalized(item.potentialUse)) errors.push('missing potentialUse');
  if (typeof item.professionalGuidanceRequired !== 'boolean')
    errors.push('invalid professionalGuidanceRequired');
  if (!DEVICE_STATUSES.includes(item.medicalDeviceStatus)) errors.push('invalid medicalDeviceStatus');

  // A text-based safety notice is required for every support item (spec §70/§76).
  if (!hasLocalized(item.safetyNotice)) errors.push('missing safetyNotice');

  // References must resolve; items with medical/therapeutic use require ≥1 (spec §64/§65).
  if (!Array.isArray(item.referenceIds)) errors.push('invalid referenceIds');
  else if (!item.referenceIds.every((id) => getCareReference(id))) errors.push('unknown reference');
  else if (involvesMedicalUse(item) && item.referenceIds.length === 0)
    errors.push('missing reference for medical use');

  if (typeof item.displayOrder !== 'number' || Number.isNaN(item.displayOrder))
    errors.push('invalid displayOrder');

  return errors;
}

export function isValidSupportItem(item: SupportItemRecord): boolean {
  return getSupportItemErrors(item).length === 0;
}

/** Return only valid support items with unique ids (spec §76). */
export function getValidSupportItems(items: readonly SupportItemRecord[]): SupportItemRecord[] {
  const seen = new Set<string>();
  const valid: SupportItemRecord[] = [];
  for (const item of items) {
    if (!isValidSupportItem(item)) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    valid.push(item);
  }
  return valid;
}
