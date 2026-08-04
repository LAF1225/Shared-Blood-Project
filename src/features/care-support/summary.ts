import type { CareDiseaseId, CareDomain } from './types';
import { CARE_RECORDS_BY_DISEASE } from './data/careRecords';
import { getValidCareRecords } from './validate';
import { representedCareDomains } from './filter';

/**
 * Disease-page Care & Support summary resolver (spec §4/§5). Returns a small,
 * plain-data summary of the valid care records for a disease so the Disease Page
 * can show a summarised section and link to the full Module 14 view. Pure and
 * framework-free — no presentation, no persistence. Returns null when a disease
 * has no valid care records (the summary section is then hidden).
 */
export interface CareSummaryData {
  count: number;
  /** A few representative care domains, in display order (spec §6/§74). */
  domains: CareDomain[];
}

const SUPPORTED = new Set<CareDiseaseId>([
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
]);

export function getCareSummary(diseaseSlug: string): CareSummaryData | null {
  if (!SUPPORTED.has(diseaseSlug as CareDiseaseId)) return null;
  const disease = diseaseSlug as CareDiseaseId;
  const records = getValidCareRecords(CARE_RECORDS_BY_DISEASE[disease] ?? []);
  if (records.length === 0) return null;
  return {
    count: records.length,
    domains: representedCareDomains(records, disease).slice(0, 4),
  };
}
