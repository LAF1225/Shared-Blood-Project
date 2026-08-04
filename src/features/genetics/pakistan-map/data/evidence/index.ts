import type { LocalizedText } from '@/types';
import type {
  EvidenceCoverage,
  MapDiseaseId,
  MapEvidenceRecord,
  ProvinceOption,
} from '../../types';
import { BETA_THALASSEMIA_EVIDENCE } from './beta-thalassemia';
import { CYSTIC_FIBROSIS_EVIDENCE } from './cystic-fibrosis';
import { LYSOSOMAL_STORAGE_DISORDERS_EVIDENCE } from './lysosomal-storage-disorders';
import { EHLERS_DANLOS_SYNDROME_EVIDENCE } from './ehlers-danlos-syndrome';

const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/**
 * The complete Evidence Map dataset (spec §36) — one local source of truth for
 * both the full map and the homepage preview (spec §3 "do not maintain two
 * separate map datasets"). Grouped by disease so per-layer coverage is explicit.
 */
export const MAP_EVIDENCE_BY_DISEASE: Record<MapDiseaseId, readonly MapEvidenceRecord[]> = {
  'beta-thalassemia': BETA_THALASSEMIA_EVIDENCE,
  'cystic-fibrosis': CYSTIC_FIBROSIS_EVIDENCE,
  'lysosomal-storage-disorders': LYSOSOMAL_STORAGE_DISORDERS_EVIDENCE,
  'ehlers-danlos-syndrome': EHLERS_DANLOS_SYNDROME_EVIDENCE,
};

/** Flat list of every configured evidence record. */
export const ALL_MAP_EVIDENCE: readonly MapEvidenceRecord[] = [
  ...BETA_THALASSEMIA_EVIDENCE,
  ...CYSTIC_FIBROSIS_EVIDENCE,
  ...LYSOSOMAL_STORAGE_DISORDERS_EVIDENCE,
  ...EHLERS_DANLOS_SYNDROME_EVIDENCE,
];

/**
 * Dataset coverage per disease (spec §31). Configured MANUALLY after dataset
 * review — describes how complete the Shared Blood evidence is, NOT disease
 * severity, risk, or prevalence, and NOT derived from marker count.
 */
export const DISEASE_COVERAGE: Record<MapDiseaseId, EvidenceCoverage> = {
  'beta-thalassemia': 'DEVELOPING',
  'cystic-fibrosis': 'LIMITED',
  'lysosomal-storage-disorders': 'LIMITED',
  'ehlers-danlos-syndrome': 'LIMITED',
};

/**
 * Supported provinces and territories (spec §13), in a stable display order.
 * These are the only options offered by the province filter (spec §20).
 */
export const PROVINCE_OPTIONS: readonly ProvinceOption[] = [
  { id: 'punjab', name: L('Punjab', 'پنجاب') },
  { id: 'sindh', name: L('Sindh', 'سندھ') },
  { id: 'khyber-pakhtunkhwa', name: L('Khyber Pakhtunkhwa', 'خیبر پختونخوا') },
  { id: 'balochistan', name: L('Balochistan', 'بلوچستان') },
  { id: 'islamabad-capital-territory', name: L('Islamabad Capital Territory', 'اسلام آباد وفاقی دارالحکومت') },
  { id: 'gilgit-baltistan', name: L('Gilgit-Baltistan', 'گلگت-بلتستان') },
  { id: 'azad-jammu-and-kashmir', name: L('Azad Jammu and Kashmir', 'آزاد جموں و کشمیر') },
];
