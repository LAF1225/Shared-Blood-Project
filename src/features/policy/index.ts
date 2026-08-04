/**
 * Policy & Advocacy System — "Policy & Advocacy" (Module 19).
 *
 * Converts APPROVED Module 18 research findings (plus fieldwork and Module 07
 * literature) into structured, EVIDENCE-TRACEABLE, LIMITATION-BOUNDED advocacy
 * priorities (spec §1/§2). Every priority resolves supporting evidence (spec §16),
 * inherits Module 18's "What This Does Not Show" boundary (spec §99), and carries
 * the central "What This Advocacy Does Not Claim" safeguard (spec §25/§72). The
 * public app consumes only APPROVED, precomputed policy JSON — never raw data,
 * runtime policy inference, or AI-generated advocacy (spec §106/§107).
 *
 * The pure evidence resolution, advocacy validation, recommendation traceability,
 * and brief resolution are framework-free and unit-tested independently of React
 * (spec §116).
 */
export { PolicyAndAdvocacy } from './components/PolicyAndAdvocacy';

export { PUBLIC_POLICY_DATASET } from './data/dataset';
export { getPolicyReference, resolveReferences } from './data/references';

export { resolveEvidenceLink, linkResolves, getResearchBoundary } from './evidence';

export {
  getIssueErrors,
  getPriorityErrors,
  getRecommendationErrors,
  getStakeholderErrors,
  getLimitationErrors,
  getBriefErrors,
  getDatasetErrors,
  isValidDataset,
  priorityRenders,
  recommendationRenders,
  getRenderableDataset,
} from './validate';

export {
  getRenderablePriorities,
  getFeaturedPriorities,
  getPriorityById,
  filterPriorities,
  getPriorityIssues,
  getPriorityRecommendations,
  getPriorityEvidenceLinks,
  getInheritedResearchBoundaries,
  getPriorityStakeholders,
  getPriorityLimitations,
  getPriorityTrace,
  getRenderableBriefs,
  getBriefById,
  getBriefPriorities,
  getBriefDownloads,
  getRenderableTimeline,
  getRenderableOutcomes,
  getRenderableStakeholders,
  getEvidenceTypesInUse,
  availableDomains,
  availablePriorityTypes,
  availableYears,
  hasRenderableData,
} from './resolve';

export type {
  PolicyAdvocacyDataset,
  PolicyIssue,
  PolicyEvidenceLink,
  AdvocacyPriority,
  PolicyRecommendation,
  PolicyStakeholder,
  PolicyBrief,
  PolicyContext,
  PolicyGap,
  AdvocacyOutcome,
  InstitutionalEngagement,
  AdvocacyTimelineEvent,
  AdvocacyTrace,
  PolicyLimitation,
  PolicyEvidenceRegistry,
  PolicyDomain,
  AdvocacyPriorityType,
  EvidenceSourceType,
  ScopeCompatibility,
} from './types';
