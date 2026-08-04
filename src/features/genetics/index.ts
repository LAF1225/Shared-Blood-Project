/**
 * Feature module: Genetics Explorer (Module 08).
 * The central interactive learning environment for genetics — a framework that
 * organises educational tools, a concept introduction, and a suggested learning
 * path. Calculation logic for the current tools arrives in Modules 09/10.
 */
export { GeneticsExplorer } from './components/GeneticsExplorer';
export { GeneticsToolPage } from './components/GeneticsToolPage';
export {
  GENETICS_TOOLS,
  getGeneticsTools,
  getGeneticsToolBySlug,
} from './data/tools';
export { GENETICS_CONCEPTS } from './data/concepts';
export { LEARNING_PATHWAY } from './data/pathway';
export type { GeneticsTool, GeneticsConcept, PathwayStep } from './types';
