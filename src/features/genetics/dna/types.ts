import type { LocalizedText } from '@/types';
import type { GeneticsReference } from '../types';

/**
 * Disease-Linked DNA Explorer — data model (Module 22 §10/§11/§16–§21).
 *
 * A dedicated molecular-education layer. It answers, per disease: how can a
 * change connected to a gene affect biological function and contribute to a
 * genetic disorder (§7)? It is NOT diagnostic, NOT a mutation/variant predictor,
 * and it never implies one identical variant causes every case (§12/§13).
 *
 * The mechanism is disease-specific by construction — there is no universal
 * "DNA → broken protein → disease" template (§11). LSD is subtype-specific
 * (§14); EDS is subtype-aware and hypermobile EDS resolves to a limitation
 * state, never a fabricated mechanism (§15).
 */

/** Resolution support states (§20). */
export type DnaSupportState =
  | 'SUPPORTED' // a disease-specific mechanism is available
  | 'SUBTYPE_REQUIRED' // a subtype/example must be chosen first
  | 'LIMITED_MECHANISM' // current genetic understanding is limited (e.g. hEDS)
  | 'UNSUPPORTED'; // unknown disease / no molecular record

/** Visual layer kinds (§21). Each maps to a lightweight SVG scene. */
export type DnaVisualType =
  | 'GENE_CONTEXT'
  | 'GENETIC_CHANGE'
  | 'FUNCTION'
  | 'CELLULAR_CONSEQUENCE'
  | 'DISEASE_CONNECTION'
  | 'LIMITATION';

/**
 * Ordered educational steps of a mechanism (§8). SELECT_DISEASE is a UI step
 * handled by the component; the content steps below come from the data.
 */
export type DnaStepId =
  | 'GENE_CONTEXT'
  | 'GENETIC_CHANGE'
  | 'FUNCTION_EFFECT'
  | 'BIOLOGICAL_CONSEQUENCE'
  | 'DISEASE_CONNECTION';

/** Interaction modes (§8). Guided by default; step navigation is optional. */
export type DnaMode = 'GUIDED' | 'STEP_NAVIGATION';

/** One content step: localized title + explanation, a visual type, optional callout (§21). */
export interface DnaMechanismStep {
  id: DnaStepId;
  title: LocalizedText;
  explanation: LocalizedText;
  visualType: DnaVisualType;
  /** Optional educational callout (e.g. "this is one example variant", §12). */
  callout?: LocalizedText;
}

/** Educational limitation state (§15/§20) — used instead of an invented mechanism. */
export interface DnaLimitation {
  title: LocalizedText;
  explanation: LocalizedText;
}

/**
 * A single molecular mechanism (one gene context). For subtype-driven diseases
 * there is one per approved subtype; hypermobile EDS carries a `limitation`
 * instead of `steps` (§15).
 */
export interface MolecularMechanism {
  id: string;
  /** Present for subtype-driven diseases (LSD, EDS); matches the disease subtype id. */
  subtypeId?: string;
  /** SUPPORTED = has steps; LIMITED_MECHANISM = has a limitation state (§20). */
  supportState: 'SUPPORTED' | 'LIMITED_MECHANISM';
  /** Localized context label (subtype/example name or gene context). */
  label: LocalizedText;
  /** Standardized gene symbol, preserved verbatim — never transliterated (§43). */
  geneSymbol?: string;
  geneName?: LocalizedText;
  /** Ordered content steps (present when SUPPORTED). */
  steps: DnaMechanismStep[];
  /** Educational limitation state (present when LIMITED_MECHANISM). */
  limitation?: DnaLimitation;
  /** Reference ids resolved via the DNA reference registry (§21). */
  references: string[];
}

/** A selectable subtype/example option for the selector UI (§9/§14/§15). */
export interface DnaSubtypeOption {
  id: string;
  name: LocalizedText;
}

/** Per-disease molecular education record (§10). */
export interface DiseaseMolecularRecord {
  /** Existing disease id (§9/§50) — never a new disease registry. */
  diseaseId: string;
  supportState: 'SUPPORTED' | 'SUBTYPE_REQUIRED';
  overview: LocalizedText;
  limitations?: LocalizedText;
  requiresSubtype: boolean;
  /** Selectable subtypes/examples (present when `requiresSubtype`). */
  subtypes?: DnaSubtypeOption[];
  /** One mechanism (non-subtype diseases) or one per subtype (subtype diseases). */
  mechanisms: MolecularMechanism[];
}

// ── Resolution result (§20/§51) ─────────────────────────────────────────────
export type DnaResolution =
  | { state: 'UNSUPPORTED' }
  | { state: 'SUBTYPE_REQUIRED'; record: DiseaseMolecularRecord; subtypes: DnaSubtypeOption[] }
  | {
      state: 'LIMITED_MECHANISM';
      record: DiseaseMolecularRecord;
      mechanism: MolecularMechanism;
      limitation: DnaLimitation;
    }
  | {
      state: 'SUPPORTED';
      record: DiseaseMolecularRecord;
      mechanism: MolecularMechanism;
      steps: DnaMechanismStep[];
      references: GeneticsReference[];
    };
