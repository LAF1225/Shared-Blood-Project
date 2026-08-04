/**
 * Research Findings & Reports System — "Research & Findings" (Module 18).
 *
 * Converts APPROVED Module 16 (survey) and Module 17 (fieldwork) evidence into
 * structured, SOURCED, REVIEWED public research findings and reports (spec §1/§2).
 * Every finding is traceable to an approved source (spec §9/§10), classified by
 * evidence type (spec §5/§6), scoped, and carries a "What This Does Not Show"
 * boundary (spec §73). The public app consumes only APPROVED, precomputed research
 * JSON — never raw data, runtime statistics, or AI-generated findings (spec §105/
 * §106).
 *
 * The pure statistics, source resolution, finding validation, and report
 * resolution are framework-free and unit-tested independently of React (spec §114).
 */
export { ResearchAndFindings } from './components/ResearchAndFindings';

export { PUBLIC_RESEARCH_DATASET } from './data/dataset';
export { RESEARCH_REFERENCES, getResearchReference, resolveReferences } from './data/references';

export {
  computePercentage,
  roundTo,
  roundPercentage,
  roundMean,
  isStatisticConsistent,
  comparisonDifference,
  scoreChange,
} from './statistics';

export {
  resolveFindingSources,
  areSourcesResolvable,
  datasetVersionFor,
} from './sources';

export {
  getFindingErrors,
  isValidFinding,
  findingRenders,
  getComparisonErrors,
  getMethodologyErrors,
  getLimitationErrors,
  getReportErrors,
  getDatasetErrors,
  isValidDataset,
  getRenderableDataset,
} from './validate';

export {
  getRenderableFindings,
  getFeaturedFindings,
  getFindingById,
  filterFindings,
  getRelatedFindings,
  getFindingLimitations,
  getFindingVisualizations,
  getRenderableReports,
  getReportById,
  filterReports,
  getReportFindings,
  getReportDownloads,
  getRenderableQuestions,
  getRenderableProjectLearnings,
  availableDomains,
  availableEvidenceTypes,
  availableFindingYears,
  availableReportTypes,
  hasRenderableData,
} from './resolve';

export type {
  ResearchFindingsDataset,
  ResearchFinding,
  ResearchReport,
  ResearchMethodology,
  ResearchLimitation,
  ResearchVisualization,
  ResearchProjectLearning,
  ResearchQuestion,
  ComparisonFinding,
  FindingStatistic,
  FindingInterpretation,
  ResearchSourceRegistry,
  EvidenceType,
  FindingType,
  ResearchDomain,
  ConclusionStatus,
  ConfidenceClassification,
  GeographicScope,
  ReportType,
} from './types';
