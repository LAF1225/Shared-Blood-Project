import type {
  AgeContext,
  CareContext,
  CareDomain,
  CareSupportFilters,
  CareSupportRecord,
  CaregiverAudience,
  ProfessionalType,
  SupportItemRecord,
} from './types';
import { getSupportItem } from './data/supportItems';
import { getValidSupportItems } from './validate';

/**
 * The single care-support filtering pipeline (spec §71):
 *
 *   Local care records → Validation → Disease filter → Care-domain filter →
 *   Age filter → Audience filter → Search → Rendered care guidance
 *
 * Pure and framework-free so filtering is independently testable from the
 * presentation (spec §78). It is DISEASE-FIRST and category-based (spec §58/§59):
 * with no disease chosen it returns nothing — the system never infers care from
 * a narrative. Nothing here scores, ranks, matches, or recommends (spec §2/§58);
 * search is simple text matching only (spec §57).
 */

export const DEFAULT_CARE_FILTERS: CareSupportFilters = {
  disease: null,
  domain: 'all',
  age: 'all',
  audience: 'all',
  query: '',
};

/** Apply disease → domain → age → audience → search, in that fixed order (§71). */
export function filterCareRecords(
  records: readonly CareSupportRecord[],
  filters: CareSupportFilters,
): CareSupportRecord[] {
  // Disease-first: no disease selected → no records (spec §58/§59).
  if (!filters.disease) return [];

  const query = filters.query.trim().toLowerCase();
  return records
    .filter((record) => {
      if (record.diseaseId !== filters.disease) return false;
      if (filters.domain !== 'all' && record.careDomain !== filters.domain) return false;
      if (filters.age !== 'all' && !record.ageContexts.includes(filters.age)) return false;
      if (filters.audience !== 'all' && !record.caregiverAudiences.includes(filters.audience))
        return false;
      if (query && !matchesQuery(record, query)) return false;
      return true;
    })
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Care domains represented within the disease scope (spec §74): the domain
 * filter must not offer empty categories.
 */
export function representedCareDomains(
  records: readonly CareSupportRecord[],
  disease: string | null,
): CareDomain[] {
  if (!disease) return [];
  const present = new Set<CareDomain>();
  for (const record of records) {
    if (record.diseaseId !== disease) continue;
    present.add(record.careDomain);
  }
  return [...present];
}

/** Age contexts represented for a disease (spec §10) — for the age filter. */
export function representedAgeContexts(
  records: readonly CareSupportRecord[],
  disease: string | null,
): AgeContext[] {
  if (!disease) return [];
  const present = new Set<AgeContext>();
  for (const record of records) {
    if (record.diseaseId !== disease) continue;
    for (const age of record.ageContexts) present.add(age);
  }
  return [...present];
}

/** Caregiver audiences represented for a disease (spec §36) — for the filter. */
export function representedAudiences(
  records: readonly CareSupportRecord[],
  disease: string | null,
): CaregiverAudience[] {
  if (!disease) return [];
  const present = new Set<CaregiverAudience>();
  for (const record of records) {
    if (record.diseaseId !== disease) continue;
    for (const audience of record.caregiverAudiences) present.add(audience);
  }
  return [...present];
}

/** Care contexts represented across a set of records (spec §9). */
export function representedCareContexts(
  records: readonly CareSupportRecord[],
): CareContext[] {
  const present = new Set<CareContext>();
  for (const record of records) present.add(record.careContext);
  return [...present];
}

/** Professional types referenced by a set of records (spec §15/§16). */
export function representedProfessionalTypes(
  records: readonly CareSupportRecord[],
): ProfessionalType[] {
  const present = new Set<ProfessionalType>();
  for (const record of records) {
    for (const type of record.suggestedProfessionalTypes) present.add(type);
  }
  return [...present];
}

/**
 * Resolve a record's support-item ids to VALID support items (spec §71/§76).
 * Invalid or unknown items are dropped so a broken item never renders.
 */
export function resolveSupportItems(ids: readonly string[]): SupportItemRecord[] {
  const resolved: SupportItemRecord[] = [];
  for (const id of ids) {
    const item = getSupportItem(id);
    if (item) resolved.push(item);
  }
  return getValidSupportItems(resolved).sort((a, b) => a.displayOrder - b.displayOrder);
}

function matchesQuery(record: CareSupportRecord, query: string): boolean {
  // Simple text match across title, short description, and care domain (spec §57).
  const haystack = [
    record.title.en,
    record.title.ur,
    record.shortDescription.en,
    record.shortDescription.ur,
    record.careDomain,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}
