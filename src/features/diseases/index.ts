/**
 * Feature module: Disease Library & pages (Modules 04–09).
 * Module 04 delivers the discovery/index system; per-disease content arrives
 * in Modules 05–09.
 */
export { DiseaseLibrary, DISEASE_COUNT } from './components/DiseaseLibrary';
export {
  DISEASES,
  getFeaturedDiseases,
  getDiseaseBySlug,
  getRelatedDiseases,
  queryDiseases,
} from './data/diseases';
export { DISEASE_CATEGORIES } from './data/categories';
export type { CategoryFilterId } from './data/categories';
