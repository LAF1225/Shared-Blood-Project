import type { MapEvidenceRecord } from '../../types';

/**
 * Ehlers-Danlos syndrome evidence records (spec §28).
 *
 * Location-based Pakistani evidence for EDS is currently insufficient to place
 * markers responsibly. Per spec §28, we KEEP the disease filter, show whatever
 * is configured (here, none yet), and let the empty-layer state explain the
 * dataset limitation (spec §29) — we do NOT fabricate points.
 *
 * When evidence is added, it must be subtype-aware (`diseaseSubtypeId`, e.g.
 * 'vascular') and different EDS subtypes must never be merged into one
 * prevalence value (spec §28/§58).
 */
export const EHLERS_DANLOS_SYNDROME_EVIDENCE: readonly MapEvidenceRecord[] = [];
