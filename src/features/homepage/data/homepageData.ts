import type { LocalizedText } from '@/types';
import { ROUTES } from '@/constants/routes';
import { getFeaturedDiseases } from '@/features/diseases/data/diseases';

/**
 * Homepage placeholder data (Module 02).
 * These datasets are intentionally placeholder and will be replaced by their
 * dedicated modules (statistics/resources → later).
 * Disease *names* are shown; medical/scientific summaries are NOT invented here.
 */

export interface FeaturedDiseaseCard {
  id: string;
  slug: string;
  name: LocalizedText;
}

/**
 * Featured disease names for the homepage. Derived from the Disease Library
 * (Module 04) so the homepage and library never drift apart.
 */
export const featuredDiseases: FeaturedDiseaseCard[] = getFeaturedDiseases().map(
  (disease) => ({ id: disease.id, slug: disease.slug, name: disease.name }),
);

/** Parent resource categories — all link to the Parent Learning Centre. */
export interface ResourceCategory {
  id: string;
  label: LocalizedText;
  href: string;
}

export const parentResourceCategories: ResourceCategory[] = [
  {
    id: 'booklets',
    label: { en: 'Learning Booklets', ur: 'تعلیمی کتابچے' },
    href: ROUTES.resources,
  },
  {
    id: 'symptoms',
    label: { en: 'Symptom Guides', ur: 'علامات کے رہنما' },
    href: ROUTES.resources,
  },
  {
    id: 'growth',
    label: { en: 'Growth Information', ur: 'نشوونما کی معلومات' },
    href: ROUTES.resources,
  },
  {
    id: 'caregiver',
    label: { en: 'Caregiver Resources', ur: 'نگہداشت کنندگان کے وسائل' },
    href: ROUTES.resources,
  },
];
