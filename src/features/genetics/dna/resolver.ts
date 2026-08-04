import type { LocalizedText } from '@/types';
// Pure disease dataset (not the feature barrel) so the DNA route never bundles
// the Disease Library's client components (§49).
import { DISEASES } from '@/features/diseases/data/diseases';
import { DISEASE_MOLECULAR_RECORDS, getMolecularRecord } from './data/records';
import { resolveDnaReferences } from './data/references';
import type { DnaResolution } from './types';

/**
 * DNA Explorer resolver (Module 22 §9/§20/§51). Pure and framework-free.
 *
 * Maps an existing disease id (+ optional subtype) to a disease-specific
 * molecular resolution. Unknown ids and unknown subtypes resolve to safe
 * educational states — never a crash and never a fabricated mechanism
 * (§20/§51).
 */

export interface DnaDiseaseOption {
  id: string;
  name: LocalizedText;
}

/** The approved diseases that have a molecular record (§9), with display names. */
export function listDnaDiseases(): DnaDiseaseOption[] {
  const ids = new Set(DISEASE_MOLECULAR_RECORDS.map((r) => r.diseaseId));
  return DISEASES.filter((d) => ids.has(d.id)).map((d) => ({ id: d.slug, name: d.name }));
}

export function isDnaDiseaseSupported(diseaseId: string | null): boolean {
  return diseaseId != null && getMolecularRecord(diseaseId) != null;
}

/**
 * Resolve a disease (+ optional subtype) to a DNA education state.
 * - unknown disease → UNSUPPORTED
 * - subtype-driven with no/unknown subtype → SUBTYPE_REQUIRED
 * - hypermobile EDS (and any LIMITED mechanism) → LIMITED_MECHANISM (§15)
 * - otherwise → SUPPORTED with ordered steps + resolved references
 */
export function resolveDnaEducation(
  diseaseId: string | null,
  subtypeId: string | null,
): DnaResolution {
  const record = diseaseId ? getMolecularRecord(diseaseId) : null;
  if (!record) return { state: 'UNSUPPORTED' };

  if (record.requiresSubtype) {
    const subtypes = record.subtypes ?? [];
    const mechanism = subtypeId
      ? record.mechanisms.find((m) => m.subtypeId === subtypeId)
      : undefined;
    if (!mechanism) return { state: 'SUBTYPE_REQUIRED', record, subtypes };
    if (mechanism.supportState === 'LIMITED_MECHANISM') {
      return { state: 'LIMITED_MECHANISM', record, mechanism, limitation: mechanism.limitation! };
    }
    return {
      state: 'SUPPORTED',
      record,
      mechanism,
      steps: mechanism.steps,
      references: resolveDnaReferences(mechanism.references),
    };
  }

  const mechanism = record.mechanisms[0];
  if (mechanism.supportState === 'LIMITED_MECHANISM') {
    return { state: 'LIMITED_MECHANISM', record, mechanism, limitation: mechanism.limitation! };
  }
  return {
    state: 'SUPPORTED',
    record,
    mechanism,
    steps: mechanism.steps,
    references: resolveDnaReferences(mechanism.references),
  };
}
