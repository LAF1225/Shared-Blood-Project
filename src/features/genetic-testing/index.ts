/**
 * Genetic Testing & Counselling Education System (Module 15).
 *
 * A structured, referenced, context-based educational system covering genetic
 * testing, carrier awareness, screening, genetic counselling, family history,
 * and questions for professionals (spec §1). It is NOT a diagnosis, compatibility,
 * marriage-decision, reproductive-decision, or AI-guidance system (spec §2/§69/
 * §70/§92). The professional-type taxonomy is reused from Module 13 (spec §89).
 *
 * The pure filter + validation logic is framework-free and unit-tested
 * independently of React (spec §88).
 */
export { GeneticTestingExplorer } from './components/GeneticTestingExplorer';

export {
  ALL_TESTING_TOPICS,
  TESTING_TOPICS_BY_DISEASE,
  TESTING_DISEASE_IDS,
  getTestingTopicById,
} from './data/topics';
export { RESULT_CONCEPTS, getResultConcept } from './data/resultConcepts';
export { GENETIC_COUNSELLING } from './data/counselling';
export { TESTING_REFERENCES, getTestingReference } from './data/references';
export {
  filterTopics,
  representedCategories,
  representedLifeStages,
  representedAudiences,
  representedDiseases,
  DEFAULT_TESTING_FILTERS,
} from './filter';
export {
  getValidTopics,
  isValidTopic,
  getTopicErrors,
  getValidResultConcepts,
  getResultConceptErrors,
} from './validate';

export type {
  GeneticTestingTopicRecord,
  ResultConceptRecord,
  CounsellingContent,
  TestingReference,
  GeneticTestingDiseaseId,
  TestingCategory,
  AudienceContext,
  LifeStageContext,
  TestResultConcept,
  InheritancePatternTag,
  GeneticTestingFilters,
  ProfessionalType,
} from './types';
