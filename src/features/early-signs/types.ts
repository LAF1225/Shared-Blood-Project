import type { LocalizedText } from '@/types';

/**
 * Early Signs & Care Guidance System — content model (Module 13).
 *
 * CORE PRINCIPLE (spec §2): this system teaches recognition, context,
 * observation, care awareness, and referral awareness. It does NOT diagnose,
 * predict disease, score symptoms, classify risk, triage, or prescribe. There is
 * NO symptom-to-disease probability engine and NO symptom-input inference
 * anywhere in Module 13 (spec §2/§17/§18). All content is curated, referenced,
 * structured records — never runtime-generated (spec §57).
 *
 * Navigation is DISEASE-FIRST (spec §19): the user chooses a disease to learn
 * about; the system never identifies a disease from observations.
 */

/** Diseases supported in V1 (Disease Library slugs, spec §4/§20). */
export type EarlySignDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/**
 * Age contexts (spec §6). Educational grouping only — NOT diagnostic onset
 * windows unless a source specifically supports it (spec §6/§7).
 */
export type AgeContext = 'NEWBORN' | 'INFANT' | 'TODDLER' | 'YOUNG_CHILD' | 'GENERAL_CHILDHOOD';

/** Observation categories (spec §9). Public labels localized; enums never shown. */
export type ObservationCategory =
  | 'GROWTH'
  | 'FEEDING'
  | 'BREATHING'
  | 'DIGESTION'
  | 'MOVEMENT'
  | 'MUSCLE_TONE'
  | 'JOINTS'
  | 'SKIN'
  | 'ENERGY'
  | 'DEVELOPMENT'
  | 'PAIN_OR_DISCOMFORT'
  | 'INFECTION_PATTERN'
  | 'APPEARANCE'
  | 'BLEEDING_OR_BRUISING'
  | 'OTHER';

/** How directly a sign may be noticed (spec §10). Educational — NOT severity. */
export type VisibilityType = 'VISIBLE' | 'LESS_VISIBLE' | 'PATTERN_BASED';

/** Educational framing of a sign's pattern (spec §11). Never a scoring input. */
export type PatternType =
  | 'SINGLE_OBSERVATION'
  | 'PERSISTENT'
  | 'RECURRING'
  | 'PROGRESSIVE'
  | 'COMBINATION_PATTERN';

/**
 * Timing of seeking care (spec §25). Describes WHEN to seek professional care —
 * NOT disease severity, and NOT a triage score. Urgent guidance is based on the
 * urgent sign itself, never a suspected genetic disorder (spec §28).
 */
export type UrgencyContext = 'ROUTINE_DISCUSSION' | 'PROMPT_ASSESSMENT' | 'URGENT_MEDICAL_HELP';

/** Professional types (spec §31). Educational — NOT a directory (spec §32). */
export type ProfessionalType =
  | 'PAEDIATRICIAN'
  | 'GENERAL_PHYSICIAN'
  | 'HAEMATOLOGIST'
  | 'PULMONOLOGIST'
  | 'GASTROENTEROLOGIST'
  | 'MEDICAL_GENETICIST'
  | 'GENETIC_COUNSELLOR'
  | 'METABOLIC_SPECIALIST'
  | 'NEUROLOGIST'
  | 'CARDIOLOGIST'
  | 'ORTHOPAEDIC_SPECIALIST'
  | 'PHYSIOTHERAPIST'
  | 'OCCUPATIONAL_THERAPIST'
  | 'DIETITIAN'
  | 'OTHER';

/** A curated clinical/scientific reference (spec §54/§56). */
export interface EarlySignReference {
  id: string;
  title: string;
  publication: string;
  year?: number;
  url?: string;
}

/**
 * A structured early-sign observation record (spec §8). Every medical record
 * MUST carry at least one reference or it fails validation (spec §54/§72).
 * `whatNotToAssume` is a core educational feature (spec §16) and is mandatory
 * for joint-flexibility records (spec §47).
 */
export interface EarlySignRecord {
  id: string;
  diseaseId: EarlySignDiseaseId;
  /** Optional subtype for subtype-specific observations (spec §45/§47). */
  diseaseSubtypeId?: string | null;
  title: LocalizedText;
  shortLabel?: LocalizedText | null;
  /** Plain-language description a non-specialist can understand (spec §12). */
  description: LocalizedText;
  ageContexts: AgeContext[];
  observationCategory: ObservationCategory;
  visibilityType: VisibilityType;
  patternType: PatternType;
  urgencyContext: UrgencyContext;
  /** How a sign might be noticed in everyday life — NOT an exam (spec §13/§14). */
  caregiverObservation: LocalizedText;
  /** Secondary clinical terminology, where useful (spec §12). */
  clinicalContext?: LocalizedText | null;
  /** Pattern/context to notice (spec §15). */
  whatToNotice: LocalizedText;
  /** What a sign does NOT establish on its own (spec §16) — core feature. */
  whatNotToAssume: LocalizedText;
  suggestedProfessionalTypes: ProfessionalType[];
  /** Optional anchor into the full disease page (spec §23). */
  relatedDiseaseSectionId?: string | null;
  /** At least one required for medical records (spec §54). */
  referenceIds: string[];
  displayOrder: number;
  lastReviewed?: string | null;
}

/** A professional-type educational record (spec §34). NOT a directory (spec §32). */
export interface ProfessionalTypeRecord {
  id: ProfessionalType;
  label: LocalizedText;
  /** General educational explanation of what this professional does (spec §33). */
  description: LocalizedText;
  relatedDiseaseIds: EarlySignDiseaseId[];
  relatedObservationCategories: ObservationCategory[];
  referenceIds?: string[];
  displayOrder: number;
}

/**
 * A general urgent sign (spec §28/§29). Part of a SHARED safety layer — urgent
 * guidance is based on the urgent sign itself, independent of any genetic
 * disorder. Not tied to a diseaseId.
 */
export interface EmergencySign {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
}

/** Local, non-persisted filter state (spec §67/§68). */
export interface EarlySignFilters {
  /** Disease-first: null until the user chooses a disease (spec §19). */
  disease: EarlySignDiseaseId | null;
  age: AgeContext | 'all';
  category: ObservationCategory | 'all';
  query: string;
}
