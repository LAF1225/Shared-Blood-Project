/**
 * Early Signs & Care Guidance System (Module 13).
 *
 * A structured, referenced, educational system that helps caregivers answer
 * "What should I notice, and when should I seek professional assessment?" — never
 * "What disease does this child have?" (spec §1). Disease-first navigation; no
 * diagnosis, matching, scoring, or symptom-input inference (spec §2/§17/§18).
 *
 * The pure filter + validation logic is framework-free and unit-tested
 * independently of React (spec §74).
 */
export { EarlySignsExplorer } from './components/EarlySignsExplorer';

export { ALL_EARLY_SIGNS, EARLY_SIGNS_BY_DISEASE, EARLY_SIGN_DISEASE_IDS, EMERGENCY_SIGNS } from './data/signs';
export { filterSigns, representedCategories, representedAgeContexts, representedProfessionalTypes, DEFAULT_FILTERS } from './filter';
export { getValidSigns, isValidSign, getSignErrors } from './validate';

export type {
  EarlySignRecord,
  EarlySignDiseaseId,
  AgeContext,
  ObservationCategory,
  VisibilityType,
  PatternType,
  UrgencyContext,
  ProfessionalType,
  EarlySignFilters,
} from './types';
