/**
 * Disease Page System (Module 05) — public surface.
 * The rendering engine + content schema + registry. Disease *content* is added
 * in Module 06 by populating the registry.
 */
export { DiseasePage } from './components/DiseasePage';
export { getDiseaseContent, DISEASE_CONTENT } from './registry';
export type {
  DiseaseContent,
  InfoSection,
  SymptomItem,
  Reference,
  FaqItem,
  Specialist,
  ResourceLink,
  ResearchUpdate,
  QuickFact,
} from './types';
