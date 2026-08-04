import { MIN_PUBLIC_CELL_SIZE, SUPPRESSED, type Suppressible } from './types';

/**
 * Pure aggregation helpers (spec §35/§39/§42). Used by the OFFLINE cleaning /
 * aggregation pipeline (`scripts/survey/`) and by unit tests — NEVER imported by
 * client components, which only consume already-approved aggregate data
 * (spec §35: "Do not calculate research findings from raw responses in the
 * browser"). Framework-free so the aggregation rules are independently testable
 * from presentation (spec §72).
 */

export { MIN_PUBLIC_CELL_SIZE, SUPPRESSED };

/** Round to a fixed number of decimals (default 1, spec §39). */
export function roundTo(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Percentage of valid responses (spec §39): count / validResponseCount × 100,
 * rounded to one decimal by default. Returns 0 when there are no valid responses
 * (never divides by zero).
 */
export function percentage(count: number, validResponseCount: number, decimals = 1): number {
  if (validResponseCount <= 0) return 0;
  return roundTo((count / validResponseCount) * 100, decimals);
}

/** Compute a percentage map from a count map over the same denominator. */
export function computePercentages(
  counts: Record<string, number>,
  validResponseCount: number,
  decimals = 1,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [key, count] of Object.entries(counts)) {
    out[key] = percentage(count, validResponseCount, decimals);
  }
  return out;
}

/**
 * Small-cell suppression (spec §42). Replaces any NON-ZERO count below
 * MIN_PUBLIC_CELL_SIZE with the SUPPRESSED sentinel so the real number never
 * reaches the client. A zero cell is kept (it identifies no one); a cell at or
 * above the threshold is kept. Suppression happens during offline generation,
 * so suppressed numbers are never present in the shipped JSON.
 */
export function applySuppression(
  counts: Record<string, number>,
  min: number = MIN_PUBLIC_CELL_SIZE,
): Record<string, Suppressible> {
  const out: Record<string, Suppressible> = {};
  for (const [key, count] of Object.entries(counts)) {
    out[key] = count > 0 && count < min ? SUPPRESSED : count;
  }
  return out;
}

/**
 * Full pre-suppression consistency check (spec §63): the response counts must
 * sum to validResponseCount, and (where provided) valid + missing must equal the
 * eligible count. Runs offline on complete numeric data before suppression.
 */
export function isConsistent(
  counts: Record<string, number>,
  validResponseCount: number,
  missingResponseCount?: number,
  eligibleResponseCount?: number,
): boolean {
  const sum = Object.values(counts).reduce((a, b) => a + b, 0);
  if (sum !== validResponseCount) return false;
  if (
    typeof missingResponseCount === 'number' &&
    typeof eligibleResponseCount === 'number' &&
    validResponseCount + missingResponseCount !== eligibleResponseCount
  ) {
    return false;
  }
  return true;
}

/** Sum only the visible (non-suppressed) numeric values of a public map. */
export function sumVisible(values: Record<string, Suppressible>): number {
  return Object.values(values).reduce<number>((a, v) => (v === SUPPRESSED ? a : a + v), 0);
}

/** Whether any value in a public map was suppressed. */
export function hasSuppression(values: Record<string, Suppressible>): boolean {
  return Object.values(values).some((v) => v === SUPPRESSED);
}
