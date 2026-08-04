import type {
  AgeContext,
  EarlySignFilters,
  EarlySignRecord,
  ObservationCategory,
  ProfessionalType,
} from './types';

/**
 * The single early-signs filtering pipeline (spec §66):
 *
 *   Local structured guidance → Validation → Disease filter → Age filter →
 *   Observation-category filter → Search → Rendered guidance
 *
 * Pure and framework-free so filtering is independently testable from the
 * presentation (spec §74). It is DISEASE-FIRST (spec §19): with no disease
 * chosen it returns nothing — the system never infers a disease. Nothing here
 * scores, ranks, matches, or predicts (spec §2/§17); search is simple text
 * matching only, never natural-language interpretation (spec §58/§59).
 */

export const DEFAULT_FILTERS: EarlySignFilters = {
  disease: null,
  age: 'all',
  category: 'all',
  query: '',
};

/** Apply disease → age → category → search, in that fixed order (spec §66). */
export function filterSigns(
  signs: readonly EarlySignRecord[],
  filters: EarlySignFilters,
): EarlySignRecord[] {
  // Disease-first: no disease selected → no signs (spec §19).
  if (!filters.disease) return [];

  const query = filters.query.trim().toLowerCase();
  return signs
    .filter((sign) => {
      if (sign.diseaseId !== filters.disease) return false;
      if (filters.age !== 'all' && !sign.ageContexts.includes(filters.age)) return false;
      if (filters.category !== 'all' && sign.observationCategory !== filters.category) return false;
      if (query && !matchesQuery(sign, query)) return false;
      return true;
    })
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Observation categories represented in the disease + age scope (spec §22): the
 * category filter must not offer empty categories.
 */
export function representedCategories(
  signs: readonly EarlySignRecord[],
  filters: Pick<EarlySignFilters, 'disease' | 'age'>,
): ObservationCategory[] {
  if (!filters.disease) return [];
  const present = new Set<ObservationCategory>();
  for (const sign of signs) {
    if (sign.diseaseId !== filters.disease) continue;
    if (filters.age !== 'all' && !sign.ageContexts.includes(filters.age)) continue;
    present.add(sign.observationCategory);
  }
  return [...present];
}

/** Age contexts represented for a disease (spec §21) — for the age filter. */
export function representedAgeContexts(
  signs: readonly EarlySignRecord[],
  disease: string | null,
): AgeContext[] {
  if (!disease) return [];
  const present = new Set<AgeContext>();
  for (const sign of signs) {
    if (sign.diseaseId !== disease) continue;
    for (const age of sign.ageContexts) present.add(age);
  }
  return [...present];
}

/**
 * Professional types referenced by a set of signs (spec §23/§32) — so the care
 * section lists only relevant, curated professionals and never an empty set.
 */
export function representedProfessionalTypes(
  signs: readonly EarlySignRecord[],
): ProfessionalType[] {
  const present = new Set<ProfessionalType>();
  for (const sign of signs) {
    for (const type of sign.suggestedProfessionalTypes) present.add(type);
  }
  return [...present];
}

function matchesQuery(sign: EarlySignRecord, query: string): boolean {
  // Simple text match across sign title, category, and description only (spec §58).
  const haystack = [
    sign.title.en,
    sign.title.ur,
    sign.shortLabel?.en,
    sign.shortLabel?.ur,
    sign.description.en,
    sign.description.ur,
    sign.observationCategory,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}
