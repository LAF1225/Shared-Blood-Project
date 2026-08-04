import type { DiseaseCategory, DiseaseCategoryId } from '@/types';

/**
 * Disease categories (spec §5). Labels resolve from the
 * `DiseaseLibrary.categories` translation namespace. Adding a category is a
 * one-line change here plus its label — no Disease Library logic changes
 * (spec §17).
 */
export const DISEASE_CATEGORIES: readonly DiseaseCategory[] = [
  { id: 'blood', labelKey: 'blood' },
  { id: 'respiratory', labelKey: 'respiratory' },
  { id: 'connective-tissue', labelKey: 'connectiveTissue' },
  { id: 'metabolic', labelKey: 'metabolic' },
  { id: 'rare', labelKey: 'rare' },
  { id: 'inherited', labelKey: 'inherited' },
];

/** Quick id → label-key lookup for rendering category badges. */
export const CATEGORY_LABEL_KEY: Record<DiseaseCategoryId, string> =
  Object.fromEntries(
    DISEASE_CATEGORIES.map((category) => [category.id, category.labelKey]),
  ) as Record<DiseaseCategoryId, string>;

/** Filter option identifier: a real category or the "all" pseudo-filter. */
export type CategoryFilterId = DiseaseCategoryId | 'all';
