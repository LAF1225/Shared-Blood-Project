import type { ResourceCategory, ResourceCategoryId } from '../types';

/**
 * Resource categories (spec §5). Labels resolve from the `Learning.categories`
 * namespace; icons are lucide names mapped in the component. Adding a category
 * is a one-line change here plus its label (spec §5 "easily added").
 */
export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = [
  { id: 'understanding-genetics', labelKey: 'understandingGenetics', icon: 'Dna' },
  { id: 'early-symptoms', labelKey: 'earlySymptoms', icon: 'Stethoscope' },
  { id: 'caring-for-child', labelKey: 'caringForChild', icon: 'HeartHandshake' },
  { id: 'child-development', labelKey: 'childDevelopment', icon: 'Baby' },
  { id: 'medical-appointments', labelKey: 'medicalAppointments', icon: 'CalendarCheck' },
  { id: 'school-education', labelKey: 'schoolEducation', icon: 'GraduationCap' },
  { id: 'emotional-support', labelKey: 'emotionalSupport', icon: 'Heart' },
];

export const CATEGORY_LABEL_KEY: Record<ResourceCategoryId, string> =
  Object.fromEntries(
    RESOURCE_CATEGORIES.map((category) => [category.id, category.labelKey]),
  ) as Record<ResourceCategoryId, string>;

export const CATEGORY_ICON: Record<ResourceCategoryId, string> =
  Object.fromEntries(
    RESOURCE_CATEGORIES.map((category) => [category.id, category.icon]),
  ) as Record<ResourceCategoryId, string>;
