import type { CareDiseaseId, CareSupportRecord } from '../../types';
import { BETA_THALASSEMIA_CARE } from './beta-thalassemia';
import { CYSTIC_FIBROSIS_CARE } from './cystic-fibrosis';
import { LYSOSOMAL_STORAGE_DISORDERS_CARE } from './lysosomal-storage-disorders';
import { EHLERS_DANLOS_SYNDROME_CARE } from './ehlers-danlos-syndrome';

/** Per-disease care datasets — separately reviewed content (spec §68). */
export const CARE_RECORDS_BY_DISEASE: Record<CareDiseaseId, readonly CareSupportRecord[]> = {
  'beta-thalassemia': BETA_THALASSEMIA_CARE,
  'cystic-fibrosis': CYSTIC_FIBROSIS_CARE,
  'lysosomal-storage-disorders': LYSOSOMAL_STORAGE_DISORDERS_CARE,
  'ehlers-danlos-syndrome': EHLERS_DANLOS_SYNDROME_CARE,
};

/** Flat list of every care-support record. */
export const ALL_CARE_RECORDS: readonly CareSupportRecord[] = [
  ...BETA_THALASSEMIA_CARE,
  ...CYSTIC_FIBROSIS_CARE,
  ...LYSOSOMAL_STORAGE_DISORDERS_CARE,
  ...EHLERS_DANLOS_SYNDROME_CARE,
];

/** The four supported diseases, in display order (spec §4). */
export const CARE_DISEASE_IDS: readonly CareDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

export function getCareRecordById(id: string): CareSupportRecord | null {
  return ALL_CARE_RECORDS.find((record) => record.id === id) ?? null;
}
