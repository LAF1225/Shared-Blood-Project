import type { EvidenceType, MapDiseaseId, MapEvidenceRecord } from './types';
import { getMapReference } from './data/references';
import { isWithinPakistanBounds } from './data/geography';

/**
 * Evidence-record validation (spec §37/§38). Framework-free so it can be unit-
 * tested independently of the renderer (spec §58). Invalid records must NOT
 * render (spec §37) — `getValidEvidence` filters them out.
 *
 * A record is never *invented* to fill a gap; validation only ever removes bad
 * records, it does not synthesise data (spec §56 "never invent a marker").
 */

const DISEASE_IDS: readonly MapDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

const EVIDENCE_TYPES: readonly EvidenceType[] = [
  'POPULATION_STUDY',
  'SCREENING_STUDY',
  'HOSPITAL_COHORT',
  'PATIENT_COHORT',
  'GENETIC_STUDY',
  'MUTATION_STUDY',
  'REGISTRY',
  'CASE_SERIES',
  'INSTITUTIONAL_DATA',
];

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 1;

/** Collect the reasons a record is invalid; empty array means valid. */
export function getRecordErrors(record: MapEvidenceRecord): string[] {
  const errors: string[] = [];

  if (!record.id || !record.id.trim()) errors.push('missing id');
  if (!DISEASE_IDS.includes(record.diseaseId)) errors.push('invalid diseaseId');

  if (typeof record.latitude !== 'number' || Number.isNaN(record.latitude))
    errors.push('invalid latitude');
  if (typeof record.longitude !== 'number' || Number.isNaN(record.longitude))
    errors.push('invalid longitude');
  if (
    typeof record.latitude === 'number' &&
    typeof record.longitude === 'number' &&
    !isWithinPakistanBounds(record.longitude, record.latitude)
  )
    errors.push('coordinates outside Pakistan bounds');

  if (!EVIDENCE_TYPES.includes(record.evidenceType)) errors.push('unsupported evidenceType');

  // Published records must reference a configured scientific source (spec §38).
  if (!record.referenceId || !getMapReference(record.referenceId))
    errors.push('missing or unknown referenceId');

  if (!record.evidenceSummary?.en?.trim()) errors.push('missing evidenceSummary');
  // A scientifically required limitation must be present (spec §24/§37).
  if (!record.cannotTellUs?.en?.trim()) errors.push('missing cannotTellUs limitation');

  if (
    record.publicationYear != null &&
    (record.publicationYear < MIN_YEAR || record.publicationYear > MAX_YEAR)
  )
    errors.push('invalid publicationYear');

  if (
    record.sampleSize != null &&
    (!Number.isFinite(record.sampleSize) || record.sampleSize <= 0)
  )
    errors.push('invalid sampleSize');

  return errors;
}

export function isValidRecord(record: MapEvidenceRecord): boolean {
  return getRecordErrors(record).length === 0;
}

/**
 * Return only valid records with unique ids (spec §37). Duplicate ids are
 * dropped (first occurrence wins) so a mis-entered duplicate cannot render.
 */
export function getValidEvidence(records: readonly MapEvidenceRecord[]): MapEvidenceRecord[] {
  const seen = new Set<string>();
  const valid: MapEvidenceRecord[] = [];
  for (const record of records) {
    if (!isValidRecord(record)) continue;
    if (seen.has(record.id)) continue;
    seen.add(record.id);
    valid.push(record);
  }
  return valid;
}
