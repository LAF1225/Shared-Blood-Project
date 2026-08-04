import type { LocalizedText } from '@/types';
import type { AgeContext, ProfessionalType } from '@/features/early-signs';

/**
 * Care & Support Resources System — content model (Module 14).
 *
 * CORE PRINCIPLE (spec §2): this system provides care education, practical
 * support awareness, daily-life guidance, caregiver preparation, development
 * awareness, and accessibility awareness. It does NOT prescribe treatment,
 * medication, devices, diets, supplements, rehabilitation plans, or activity
 * clearance (spec §2/§23/§33/§39/§51). It never states that a particular child
 * needs a specific device, treatment, professional, or exercise (spec §11/§16).
 * All content is curated, referenced, structured records — never runtime-
 * generated (spec §67). There is NO free-text care-recommendation engine and NO
 * natural-language care inference anywhere in Module 14 (spec §58).
 *
 * Navigation is DISEASE-FIRST and category-based (spec §58/§59): the caregiver
 * chooses a disease and a care area; the system never infers care from a
 * narrative.
 *
 * Age contexts and the professional-type taxonomy are REUSED from Module 13
 * (spec §10/§15) — Module 14 does not duplicate them.
 */

/** Diseases supported in V1 (Disease Library slugs, spec §4). */
export type CareDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

export type { AgeContext, ProfessionalType };

/**
 * Care domains (spec §6). Organizational categories only — they must NOT imply a
 * universal support need for any disease (spec §7). Public labels are localized
 * and the enum value is never shown (spec §6).
 */
export type CareDomain =
  | 'DAILY_ROUTINE'
  | 'NUTRITION_AWARENESS'
  | 'FEEDING_SUPPORT'
  | 'MOVEMENT_SUPPORT'
  | 'JOINT_SUPPORT'
  | 'MUSCLE_SUPPORT'
  | 'RESPIRATORY_SUPPORT'
  | 'DEVELOPMENT_SUPPORT'
  | 'LEARNING_SUPPORT'
  | 'ENERGY_MANAGEMENT'
  | 'PAIN_AWARENESS'
  | 'SKIN_SUPPORT'
  | 'SLEEP_SUPPORT'
  | 'INFECTION_AWARENESS'
  | 'EMOTIONAL_SUPPORT'
  | 'SOCIAL_SUPPORT'
  | 'SCHOOL_SUPPORT'
  | 'APPOINTMENT_PREPARATION'
  | 'MEDICAL_ROUTINE_AWARENESS'
  | 'CAREGIVER_PREPARATION'
  | 'ACCESSIBILITY'
  | 'OTHER';

/**
 * Care contexts (spec §9). Organizes information — it must NOT create a severity
 * hierarchy (spec §9).
 */
export type CareContext =
  | 'EVERYDAY_SUPPORT'
  | 'DEVELOPMENT_SUPPORT'
  | 'MEDICAL_ROUTINE_SUPPORT'
  | 'EDUCATION_SUPPORT'
  | 'MOBILITY_SUPPORT'
  | 'COMMUNICATION_SUPPORT'
  | 'FAMILY_SUPPORT'
  | 'ENVIRONMENTAL_SUPPORT';

/** Caregiver audiences (spec §36). A record may support multiple audiences. */
export type CaregiverAudience =
  | 'PARENT_OR_GUARDIAN'
  | 'CHILD_CARE_WORKER'
  | 'FAMILY_CAREGIVER'
  | 'SCHOOL_CAREGIVER'
  | 'GENERAL_CAREGIVER';

/** Support-item categories (spec §19). Public labels localized. */
export type SupportItemCategory =
  | 'MOBILITY'
  | 'POSITIONING'
  | 'FEEDING'
  | 'RESPIRATORY'
  | 'JOINT_SUPPORT'
  | 'COMFORT'
  | 'SCHOOL_ADAPTATION'
  | 'DAILY_LIVING'
  | 'ORGANIZATION'
  | 'ACCESSIBILITY'
  | 'OTHER';

/**
 * Medical-device boundary status (spec §21). Governs how strongly the item must
 * be framed as a professional decision. NON_MEDICAL_SUPPORT_ITEM (e.g., a
 * document folder) needs no clinical involvement; PROFESSIONAL_ASSESSMENT_REQUIRED
 * (e.g., a wheelchair) must never be presented as a self-selected purchase.
 */
export type MedicalDeviceStatus =
  | 'NON_MEDICAL_SUPPORT_ITEM'
  | 'PROFESSIONAL_GUIDANCE_RECOMMENDED'
  | 'PROFESSIONAL_ASSESSMENT_REQUIRED';

/** A curated care / scientific reference (spec §64 — Module 07 architecture). */
export interface CareReference {
  id: string;
  title: string;
  publication: string;
  year?: number;
  url?: string;
}

/**
 * A structured care-support record (spec §8). Every record making a care or
 * medical claim MUST carry at least one valid reference or it fails validation
 * (spec §64/§76). Content uses qualified, individual-needs language throughout
 * (spec §2/§7) and never becomes an individualized care plan (spec §11/§60).
 */
export interface CareSupportRecord {
  id: string;
  diseaseId: CareDiseaseId;
  /** Optional subtype where care needs are subtype-specific (spec §28). */
  diseaseSubtypeId?: string | null;
  title: LocalizedText;
  shortDescription: LocalizedText;
  careDomain: CareDomain;
  ageContexts: AgeContext[];
  careContext: CareContext;
  /** Why this area of care may matter, in educational language (spec §60). */
  whyItMayMatter: LocalizedText;
  /** Everyday considerations — NOT an individualized care plan (spec §11). */
  practicalConsiderations: LocalizedText[];
  /** What may be expected beyond routine child care (spec §12). Never framed
   * as the child being a burden (spec §13). */
  caregiverExpectations: LocalizedText[];
  /** Conversation prompts for a care team — NOT clinical recommendations (§14). */
  questionsToAsk: LocalizedText[];
  /** Curated associations to Module 13 professional types (spec §15/§16). */
  suggestedProfessionalTypes: ProfessionalType[];
  /** Resolved by id to SupportItemRecords (spec §71). */
  supportItemIds: string[];
  /** At least one required (spec §64). */
  referenceIds: string[];
  /** Which caregivers this record is written for (spec §36). */
  caregiverAudiences: CaregiverAudience[];
  /** Optional cautionary notice shown with the card (spec §8/§60). */
  contentNotice?: LocalizedText | null;
  displayOrder: number;
  lastReviewed?: string | null;
}

/**
 * A generic support item / helpful adaptation (spec §17/§18). GENERIC item types
 * only (spec §20): no brand names, retailers, prices, affiliate links, or product
 * listings (spec §20/§53/§61/§63). The module explains that such supports exist —
 * selection and fitting remain professional decisions (spec §23).
 */
export interface SupportItemRecord {
  id: string;
  /** Public display name — a generic item type (spec §20). */
  name: LocalizedText;
  /** Generic category name of the item (spec §18/§20). */
  genericName: LocalizedText;
  description: LocalizedText;
  supportCategory: SupportItemCategory;
  relatedDiseaseIds: CareDiseaseId[];
  relatedDiseaseSubtypeIds: string[];
  relatedCareDomains: CareDomain[];
  ageContexts: AgeContext[];
  /** What the item may be used for, in cautious language (spec §61/§66). */
  potentialUse: LocalizedText;
  professionalGuidanceRequired: boolean;
  medicalDeviceStatus: MedicalDeviceStatus;
  /** General, non-commercial purchase guidance (spec §62). Optional. */
  purchaseGuidance?: LocalizedText | null;
  /** Required, text-based safety notice (spec §70/§76). */
  safetyNotice: LocalizedText;
  /** Required where the item involves medical/therapeutic use (spec §64/§65). */
  referenceIds: string[];
  displayOrder: number;
  lastReviewed?: string | null;
}

/** Local, non-persisted filter state (spec §72/§73). */
export interface CareSupportFilters {
  /** Disease-first: null until the caregiver chooses a disease (spec §58/§59). */
  disease: CareDiseaseId | null;
  domain: CareDomain | 'all';
  age: AgeContext | 'all';
  audience: CaregiverAudience | 'all';
  query: string;
}
