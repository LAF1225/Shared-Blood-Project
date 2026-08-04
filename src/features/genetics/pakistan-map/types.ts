import type { LocalizedText } from '@/types';

/**
 * Pakistan Genetic Disorder Evidence Map — content model (Module 11).
 *
 * CORE PRINCIPLE (spec §2): this is an *Evidence Visualization*, NOT a disease
 * prevalence map. A marker means "documented evidence is associated with this
 * location" — never "people here have this prevalence" (spec §9). Every field
 * is structured configuration so new evidence is added by appending a record,
 * with no component changes (spec §7/§36). The data layer must never compute a
 * prevalence, a province risk score, or a patient count (spec §20/§62).
 */

/** Provinces and territories supported by the map (spec §13). */
export type ProvinceOrTerritory =
  | 'punjab'
  | 'sindh'
  | 'khyber-pakhtunkhwa'
  | 'balochistan'
  | 'islamabad-capital-territory'
  | 'gilgit-baltistan'
  | 'azad-jammu-and-kashmir';

/**
 * How precisely a record is geographically located (spec §8). Positioning a
 * record at a city/district does NOT license interpreting it as that place's
 * population prevalence (spec §9) — the original study population is preserved.
 */
export type GeographicPrecision =
  | 'EXACT_INSTITUTION'
  | 'CITY'
  | 'DISTRICT'
  | 'PROVINCE'
  | 'NATIONAL';

/**
 * Evidence type (spec §10). Determines interpretation, not quality — no type is
 * "good" or "bad" (spec §11). Labels are localized in messages, not here.
 */
export type EvidenceType =
  | 'POPULATION_STUDY'
  | 'SCREENING_STUDY'
  | 'HOSPITAL_COHORT'
  | 'PATIENT_COHORT'
  | 'GENETIC_STUDY'
  | 'MUTATION_STUDY'
  | 'REGISTRY'
  | 'CASE_SERIES'
  | 'INSTITUTIONAL_DATA';

/** Disease identity, derived from the Disease Library slugs (spec §6). */
export type MapDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/**
 * Dataset coverage for a disease layer (spec §31). Describes how complete the
 * Shared Blood evidence dataset is — NOT disease severity, risk, or prevalence.
 * Configured manually after dataset review; never derived from marker count.
 */
export type EvidenceCoverage = 'LIMITED' | 'DEVELOPING' | 'EXPANDED';

/**
 * A single structured evidence record (spec §7). Every marker on the map
 * corresponds to one of these — there are no decorative markers. Optional fields
 * may be null/omitted and are simply hidden in the UI (spec §22 "omit missing
 * fields rather than displaying N/A").
 */
export interface MapEvidenceRecord {
  /** Unique id (spec §37). */
  id: string;
  /** Disease Library slug (spec §6/§27/§28). */
  diseaseId: MapDiseaseId;
  /**
   * Optional supported subtype (spec §27/§28), e.g. 'gaucher-disease'. Subtype
   * evidence must never be aggregated into a single group prevalence.
   */
  diseaseSubtypeId?: string | null;
  /** Evidence title (spec §22). */
  title: LocalizedText;
  /** Human-readable location (spec §8/§14). */
  locationName: LocalizedText;
  district?: LocalizedText | null;
  provinceOrTerritory: ProvinceOrTerritory;
  /** Coordinates for marker placement (spec §8). Never translated (spec §43). */
  latitude: number;
  longitude: number;
  geographicPrecision: GeographicPrecision;
  evidenceType: EvidenceType;
  /** The population actually studied — preserved verbatim (spec §8/§25). */
  studyPopulation: LocalizedText;
  /** Sample size where reported; positive integer or omitted (spec §37). */
  sampleSize?: number | null;
  studyPeriod?: LocalizedText | null;
  /** Neutral summary of the evidence (spec §14/§22). */
  evidenceSummary: LocalizedText;
  /** "What was measured?" (spec §22). */
  measuredOutcome: LocalizedText;
  /** "What was reported?" — never shown as a bare number (spec §14/§22). */
  reportedEstimate?: LocalizedText | null;
  /** The kind of estimate, e.g. "carrier frequency in the sample" (spec §8). */
  estimateType?: LocalizedText | null;
  institution?: LocalizedText | null;
  /** Publication title may remain in its official language (spec §43). */
  publicationTitle?: string | null;
  publicationYear?: number | null;
  /**
   * Reference id into MAP_REFERENCES. Required for published records — a
   * published record without a reference fails validation (spec §37/§38).
   */
  referenceId: string;
  /** Record-specific "what this evidence CAN tell us" (spec §23). */
  canTellUs: LocalizedText;
  /** Record-specific "what this evidence CANNOT tell us" (spec §24). */
  cannotTellUs: LocalizedText;
  dataLimitations?: LocalizedText | null;
  /**
   * ISO date Shared Blood last reviewed the entry (spec §39). NOT the
   * publication date; need not be prominently displayed.
   */
  lastReviewed: string;
}

/** A structured, citable scientific source (spec §38). */
export interface MapReference {
  id: string;
  /** Full citation title (may remain in official language, spec §43). */
  title: string;
  publication: string;
  year: number;
  url?: string;
}

/**
 * A cluster of nearby evidence records (spec §15). The count is the NUMBER OF
 * EVIDENCE RECORDS — never a patient count, disease severity, or prevalence.
 */
export interface EvidenceCluster {
  /** Stable id derived from the rounded location. */
  id: string;
  latitude: number;
  longitude: number;
  locationName: LocalizedText;
  records: MapEvidenceRecord[];
}

/** The active filter selection (spec §48). All local; never persisted (§49). */
export interface MapFilters {
  disease: MapDiseaseId | 'all';
  evidenceType: EvidenceType | 'all';
  province: ProvinceOrTerritory | 'all';
  query: string;
}

/** A province/territory entry for the filter and map (spec §13). */
export interface ProvinceOption {
  id: ProvinceOrTerritory;
  name: LocalizedText;
}
