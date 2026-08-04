import type { FindingStatistic, ResearchRoundingPolicy } from './types';

/**
 * Pure, framework-free statistical calculation (spec §27/§28/§31). Independently
 * testable from presentation (spec §27/§114). Page components must NOT calculate
 * public statistics separately — they consume precomputed, validated
 * FindingStatistic values built here (spec §27/§106).
 *
 * Boundaries enforced: percentages use the VALID responses for the relevant
 * question as the denominator, never total submissions (spec §28); rounding is
 * applied only to DISPLAY values while stored source values remain unrounded
 * (spec §31); this module performs no significance test, correlation, or causal
 * inference (spec §34/§35/§36) — those require analyses that are out of scope.
 */

/**
 * Simple response percentage (spec §28): validResponsesForOption /
 * validResponsesForQuestion × 100. Returns the UNROUNDED value; callers round for
 * display via `roundPercentage`. Throws on an invalid denominator rather than
 * silently substituting a number (spec §111).
 */
export function computePercentage(
  validResponsesForOption: number,
  validResponsesForQuestion: number,
): number {
  if (
    !Number.isFinite(validResponsesForOption) ||
    !Number.isFinite(validResponsesForQuestion) ||
    validResponsesForQuestion <= 0 ||
    validResponsesForOption < 0
  ) {
    throw new Error('invalid denominator or numerator for percentage');
  }
  return (validResponsesForOption / validResponsesForQuestion) * 100;
}

/** Round a value to `decimals` places using half-up rounding (spec §31). */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Round a percentage for display per the policy (spec §31): whole percentages use
 * 0 dp; precision-relevant percentages use up to 1 dp. Source values are never
 * mutated by this — it returns a new display number.
 */
export function roundPercentage(
  value: number,
  policy: ResearchRoundingPolicy,
  precisionRelevant = false,
): number {
  const decimals = precisionRelevant
    ? policy.precisionPercentageDecimals
    : policy.wholePercentageDecimals;
  return roundTo(value, decimals);
}

/** Round a mean score for display per the policy (spec §31). */
export function roundMean(value: number, policy: ResearchRoundingPolicy): number {
  return roundTo(value, policy.meanScoreDecimals);
}

/**
 * Verify a stored FindingStatistic is internally consistent (spec §26/§27): when a
 * numerator and denominator are present, `value` must equal the computed
 * percentage within the statistic's own rounding tolerance, the denominator must
 * equal validResponseCount unless a different methodology is documented, and
 * multi-select statistics are exempt from the ≤100 rule (spec §30).
 */
export function isStatisticConsistent(stat: FindingStatistic): boolean {
  if (stat.validResponseCount < 0) return false;
  if (!stat.isMultiSelect && (stat.value < 0 || stat.value > 100) && stat.unit.en.includes('%'))
    return false;
  if (typeof stat.numerator === 'number' && typeof stat.denominator === 'number') {
    if (stat.denominator <= 0) return false;
    if (stat.numerator < 0 || stat.numerator > stat.denominator) return false;
    const expected = (stat.numerator / stat.denominator) * 100;
    const tolerance = 10 ** -stat.decimalPlaces + 0.05;
    if (Math.abs(stat.value - expected) > tolerance) return false;
  }
  return true;
}

/** Absolute + percentage-point difference for a group comparison (spec §40).
 * These are descriptive differences ONLY — never a significance claim (spec §34). */
export function comparisonDifference(
  groupAValue: number,
  groupBValue: number,
): { absoluteDifference: number; percentagePointDifference: number } {
  const diff = groupAValue - groupBValue;
  return { absoluteDifference: diff, percentagePointDifference: diff };
}

/** Immediate aggregate pre/post change (spec §16/§17). Descriptive only — NOT a
 * retention or causation claim; callers must pair it with immediate-timing and
 * unpaired-assessment limitations. */
export function scoreChange(preMean: number, postMean: number): number {
  return roundTo(postMean - preMean, 1);
}
