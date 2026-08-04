/**
 * Survey & Public Awareness Data System — "What Pakistan Knows" (Module 16).
 *
 * Aggregate-only public research on genetic literacy, disease awareness,
 * consanguinity attitudes, family influence, testing attitudes, and information
 * sources (spec §1/§2). The public app consumes APPROVED AGGREGATE data only —
 * never raw responses, live collection, respondent profiles, AI interpretation,
 * or fabricated statistics (spec §6/§8/§35/§45/§57/§70).
 *
 * The pure validation, aggregation, and resolution logic is framework-free and
 * unit-tested independently of React (spec §72).
 */
export { WhatPakistanKnows } from './components/WhatPakistanKnows';

export { PUBLIC_DATASET, PUBLIC_FINDINGS } from './data/dataset';
export { SURVEY_QUESTIONS, getSurveyQuestion } from './data/questions';
export { GENETIC_LITERACY_INDICATOR } from './data/indicator';

export {
  getDatasetErrors,
  isValidDataset,
  getRenderableDataset,
  getFindingErrors,
  isValidFinding,
  getQuestionAggregateErrors,
  getDiseaseAwarenessErrors,
  getAttitudeAggregateErrors,
} from './validate';
export {
  getRenderableFindings,
  hasRenderableData,
  findingsForDatasetVersion,
  buildAwarenessComparisonChart,
  buildDistributionChart,
  resolveCityAwareness,
} from './resolve';

export type {
  SurveyAggregateDataset,
  SurveyFindingRecord,
  SurveyQuestionRecord,
  SurveyQuestionAggregate,
  DiseaseAwarenessAggregate,
  AttitudeAggregate,
  CitySurveyAggregate,
  GeneticLiteracyIndicatorDefinition,
  ChartData,
  SurveyDiseaseId,
  SurveyCity,
  ResearchDomain,
  FindingType,
  ReviewStatus,
  Suppressible,
} from './types';
export { SUPPRESSED, MIN_PUBLIC_CELL_SIZE } from './types';
