/**
 * Community Impact & Fieldwork System — "Shared Blood in the Community" (Module 17).
 *
 * Documents Shared Blood's real community education and fieldwork, aggregate
 * impact, contextual field observations, and the project changes they produced
 * (spec §1/§2). The public app consumes only APPROVED, PRIVACY-RESOLVED, AGGREGATE
 * public records (spec §39) — never internal notes, participant/child/medical
 * records, raw attendance, unapproved photos, or fabricated proof of work
 * (spec §12/§35/§48/§55).
 *
 * The pure impact calculation, validation, and public-record resolution are
 * framework-free and unit-tested independently of React (spec §51).
 */
export { SharedBloodInCommunity } from './components/SharedBloodInCommunity';

export { PUBLIC_DATASET, PUBLIC_FINDINGS } from './data/dataset';
export { COMMUNITY_REFERENCES, getCommunityReference } from './data/references';

export {
  calculateImpactSummary,
  impactSummaryMatches,
  isCompletedApproved,
  eligibleActivities,
} from './impact';

export {
  getActivityErrors,
  getMaterialErrors,
  getTrainingErrors,
  getResourceErrors,
  getComparisonErrors,
  getEvidenceErrors,
  getFindingErrors,
  isValidFinding,
  getDatasetErrors,
  isValidDataset,
  getRenderableDataset,
} from './validate';

export {
  resolvePublicActivity,
  resolvePublicActivities,
  getPublicActivityById,
  getFeaturedActivities,
  filterActivities,
  availableActivityTypes,
  availableCities,
  availableYears,
  getRenderableFindings,
  getRenderableFieldLearnings,
  getPublicEvidenceAssets,
  getPublicObservations,
  getActivityFieldLearnings,
  getActivityResources,
  getPublicPartners,
  getPartnerById,
  hasRenderableData,
} from './resolve';

export type {
  CommunityFieldworkDataset,
  CommunityImpactFinding,
  CommunityImpactSummary,
  FieldActivityRecord,
  PublicFieldActivityRecord,
  EducationalResourceRecord,
  MaterialDistributionRecord,
  TrainingActivityMetric,
  FieldObservationRecord,
  FieldLearningRecord,
  FieldEvidenceAsset,
  CommunityPartnerRecord,
  ImpactMetricDefinition,
  ActivityType,
  ActivityStatus,
  AudienceType,
  FieldworkCity,
  FieldworkDiseaseId,
  LocationType,
  ReviewStatus,
  VerificationStatus,
} from './types';
