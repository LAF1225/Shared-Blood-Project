import type { Disease, InheritanceStrategyId, LocalizedText } from '@/types';
// Import the pure dataset directly (not the feature barrel) so the calculator
// route never bundles the Disease Library's client components (v2 §33).
import { DISEASES, getDiseaseBySlug } from '@/features/diseases/data/diseases';

/**
 * Calculator condition metadata resolution (Module 09 v2 §7/§17). The calculator
 * is driven entirely by structured disease metadata — the strategy is read from
 * `calculator.inheritanceStrategy` (directly or via a chosen subtype), never
 * matched by disease name (v2 §17).
 */

/** Diseases available in the calculator (`calculatorEnabled`, v2 §7). */
export function getCalculatorDiseases(): Disease[] {
  return DISEASES.filter((disease) => disease.calculator?.enabled);
}

/** A fully resolved condition ready to calculate. */
export interface CalculatorTarget {
  diseaseSlug: string;
  subtypeId?: string;
  /** Localized label — retains the subtype identity for EDS (v2 §23). */
  label: LocalizedText;
  strategy: InheritanceStrategyId;
  /** Short inheritance explanation (v2 §23). */
  context: LocalizedText;
  limitations?: LocalizedText;
}

export type TargetResolution =
  | { kind: 'ok'; target: CalculatorTarget }
  | { kind: 'needs-subtype'; disease: Disease }
  | { kind: 'not-calculable' };

/**
 * Resolve a disease (+ optional subtype) selection into a calculable target.
 * Subtype-driven conditions (EDS, generic LSD) must have a subtype chosen before
 * they resolve; otherwise the caller shows the "choose a subtype" state
 * (v2 §8/§10). Unknown/disabled conditions are `not-calculable`.
 */
export function resolveTarget(
  diseaseSlug: string | null,
  subtypeId: string | null,
): TargetResolution {
  if (!diseaseSlug) return { kind: 'not-calculable' };

  const disease = getDiseaseBySlug(diseaseSlug);
  const config = disease?.calculator;
  if (!disease || !config?.enabled) return { kind: 'not-calculable' };

  if (config.requiresSubtype) {
    const subtype = subtypeId
      ? config.subtypes?.find((candidate) => candidate.id === subtypeId)
      : undefined;
    if (!subtype) return { kind: 'needs-subtype', disease };
    return {
      kind: 'ok',
      target: {
        diseaseSlug,
        subtypeId: subtype.id,
        label: subtype.name, // retain subtype label, never generic (v2 §23)
        strategy: subtype.strategy,
        context: subtype.context,
        limitations: subtype.limitations ?? config.limitations,
      },
    };
  }

  return {
    kind: 'ok',
    target: {
      diseaseSlug,
      label: config.label ?? disease.name,
      strategy: config.strategy ?? 'unsupported',
      context: config.context ?? disease.inheritancePattern,
      limitations: config.limitations,
    },
  };
}
