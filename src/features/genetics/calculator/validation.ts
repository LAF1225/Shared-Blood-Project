import type { ParentStatus } from './strategy';
import type { TargetResolution } from './metadata';

/**
 * Input validation for the calculator (Module 09 v2 §26/§28). Pure and
 * framework-free so it can be unit-tested and reused; the UI maps each code to a
 * localized, actionable message and never exposes internal detail (v2 §28).
 *
 * Note: `unsupported` conditions do not flow through here — they hide inputs and
 * present an educational state instead (v2 §27). The `combination-unsupported`
 * case (e.g. dominant Affected × Affected) is reported by the engine, not here.
 */
export type ValidationCode =
  | 'condition-missing'
  | 'subtype-required'
  | 'parent-one-missing'
  | 'parent-two-missing';

export interface CalculatorSelections {
  resolution: TargetResolution;
  statusOne: ParentStatus | null;
  statusTwo: ParentStatus | null;
  /** Statuses valid for the resolved strategy (from STRATEGY_STATUS_OPTIONS). */
  strategyStatuses: ParentStatus[];
}

/**
 * Return the first failing validation code, or `null` when the selection is
 * complete and calculable. Order mirrors the spec's error examples: condition →
 * subtype → each parent (v2 §28). Calculation must not proceed while this
 * returns a code (v2 §18/§26).
 */
export function validateSelections(
  selections: CalculatorSelections,
): ValidationCode | null {
  const { resolution, statusOne, statusTwo, strategyStatuses } = selections;

  if (resolution.kind === 'not-calculable') return 'condition-missing';
  if (resolution.kind === 'needs-subtype') return 'subtype-required';

  // A resolved-but-unsupported strategy exposes no statuses, so validation of
  // parent inputs only applies to strategies that actually take them.
  if (!statusOne || !strategyStatuses.includes(statusOne)) return 'parent-one-missing';
  if (!statusTwo || !strategyStatuses.includes(statusTwo)) return 'parent-two-missing';
  return null;
}
