/**
 * Care & Support Resources System (Module 14).
 *
 * A structured, referenced, disease-first educational system for practical care,
 * daily-life support, caregiver preparation, development awareness, and
 * accessibility awareness (spec §1/§2). It is NOT a treatment planner, care-plan
 * generator, product marketplace, or free-text recommendation engine (spec
 * §2/§3/§58/§82). Age contexts and the professional-type taxonomy are reused
 * from Module 13 (spec §10/§15).
 *
 * The pure filter + validation + summary logic is framework-free and unit-tested
 * independently of React (spec §78).
 */
export { CareSupportExplorer } from './components/CareSupportExplorer';
export { CareSummary } from './components/CareSummary';

export { ALL_CARE_RECORDS, CARE_RECORDS_BY_DISEASE, CARE_DISEASE_IDS, getCareRecordById } from './data/careRecords';
export { SUPPORT_ITEMS, getSupportItem } from './data/supportItems';
export { CARE_REFERENCES, getCareReference } from './data/references';
export {
  filterCareRecords,
  representedCareDomains,
  representedAgeContexts,
  representedAudiences,
  representedCareContexts,
  representedProfessionalTypes,
  resolveSupportItems,
  DEFAULT_CARE_FILTERS,
} from './filter';
export {
  getValidCareRecords,
  isValidCareRecord,
  getCareRecordErrors,
  getValidSupportItems,
  isValidSupportItem,
  getSupportItemErrors,
} from './validate';
export { getCareSummary, type CareSummaryData } from './summary';

export type {
  CareSupportRecord,
  SupportItemRecord,
  CareReference,
  CareDiseaseId,
  CareDomain,
  CareContext,
  CaregiverAudience,
  SupportItemCategory,
  MedicalDeviceStatus,
  CareSupportFilters,
  AgeContext,
  ProfessionalType,
} from './types';
