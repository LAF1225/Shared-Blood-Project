/**
 * Feature module: Parent Learning Centre (Module 07).
 * Educational resource hub for parents, caregivers, teachers, NGOs, and health
 * workers. Owns its own data, components, and types.
 */
export { LearningCentre } from './components/LearningCentre';
export { ResourcePage } from './components/ResourcePage';
export { ResourceCard } from './components/ResourceCard';
export {
  LEARNING_RESOURCES,
  getResourceBySlug,
  getFeaturedResources,
} from './data/resources';
export { RESOURCE_CATEGORIES } from './data/categories';
export type { LearningResource, ResourceCategoryId } from './types';
