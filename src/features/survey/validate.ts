import {
  SUPPRESSED,
  type AttitudeAggregate,
  type DiseaseAwarenessAggregate,
  type SurveyAggregateDataset,
  type SurveyFindingRecord,
  type SurveyQuestionAggregate,
  type Suppressible,
} from './types';

/**
 * Client-safe validation of APPROVED aggregate data (spec §62/§63). Pure and
 * framework-free so validation is independently testable from presentation
 * (spec §72). Invalid data must NOT render (spec §62) — `getRenderableDataset`
 * returns null for a bad dataset, and `getRenderableFindings` drops bad or
 * unapproved findings. Validation only ever removes/blocks; it never estimates
 * or repairs missing values (spec §63).
 *
 * Suppression integrity (spec §42): a suppressed cell must carry the SUPPRESSED
 * sentinel in BOTH its count and its percentage, so no real number is
 * recoverable from the client payload.
 */

/** Tolerance for percentage-vs-count rounding checks (1 dp, spec §39). */
const PCT_TOLERANCE = 0.2;

function isSuppressed(value: Suppressible): value is typeof SUPPRESSED {
  return value === SUPPRESSED;
}

function sumVisible(values: Record<string, Suppressible>): number {
  return Object.values(values).reduce<number>((a, v) => (isSuppressed(v) ? a : a + v), 0);
}

/**
 * A count map and its percentage map must agree on WHICH keys are suppressed
 * (spec §42) — otherwise a suppressed count could be reconstructed from a visible
 * percentage.
 */
function suppressionAligned(
  counts: Record<string, Suppressible>,
  pcts: Record<string, Suppressible>,
): boolean {
  const keys = new Set([...Object.keys(counts), ...Object.keys(pcts)]);
  for (const key of keys) {
    if (isSuppressed(counts[key]) !== isSuppressed(pcts[key])) return false;
  }
  return true;
}

/** Visible percentages must be within [0, 100] and match visible counts (§63). */
function percentagesConsistent(agg: SurveyQuestionAggregate): boolean {
  for (const [key, count] of Object.entries(agg.responseCounts)) {
    if (isSuppressed(count)) continue;
    const pct = agg.responsePercentages[key];
    if (isSuppressed(pct)) return false; // count visible but pct hidden → misaligned
    if (pct < 0 || pct > 100) return false;
    if (agg.validResponseCount > 0) {
      const expected = (count / agg.validResponseCount) * 100;
      if (Math.abs(pct - expected) > PCT_TOLERANCE) return false;
    }
  }
  return true;
}

export function getQuestionAggregateErrors(agg: SurveyQuestionAggregate): string[] {
  const errors: string[] = [];
  if (!agg.questionId?.trim()) errors.push('missing questionId');
  if (typeof agg.validResponseCount !== 'number' || agg.validResponseCount < 0)
    errors.push('invalid validResponseCount');
  if (typeof agg.missingResponseCount !== 'number' || agg.missingResponseCount < 0)
    errors.push('invalid missingResponseCount');
  if (!suppressionAligned(agg.responseCounts, agg.responsePercentages))
    errors.push('suppression misaligned');
  if (!percentagesConsistent(agg)) errors.push('percentages inconsistent');

  // Single-response questions: visible counts must not exceed valid n, and with
  // no suppression they must sum exactly to it (spec §63). Multi-response
  // questions are exempt from the sum rule (a respondent may pick several).
  if (!agg.isMultiResponse) {
    const visible = sumVisible(agg.responseCounts);
    const anySuppressed = Object.values(agg.responseCounts).some(isSuppressed);
    if (visible > agg.validResponseCount) errors.push('counts exceed validResponseCount');
    if (!anySuppressed && visible !== agg.validResponseCount)
      errors.push('counts do not sum to validResponseCount');
  }
  return errors;
}

function localizedOk(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

export function getDiseaseAwarenessErrors(agg: DiseaseAwarenessAggregate): string[] {
  const errors: string[] = [];
  if (!agg.diseaseId) errors.push('missing diseaseId');
  if (typeof agg.validResponseCount !== 'number' || agg.validResponseCount < 0)
    errors.push('invalid validResponseCount');
  if (!suppressionAligned(
    agg.awarenessLevelCounts as Record<string, Suppressible>,
    agg.awarenessLevelPercentages as Record<string, Suppressible>,
  )) errors.push('suppression misaligned');
  const visible = sumVisible(agg.awarenessLevelCounts as Record<string, Suppressible>);
  const anySuppressed = Object.values(agg.awarenessLevelCounts).some(isSuppressed);
  if (visible > agg.validResponseCount) errors.push('counts exceed validResponseCount');
  if (!anySuppressed && visible !== agg.validResponseCount)
    errors.push('counts do not sum to validResponseCount');
  if (!localizedOk(agg.publicFinding)) errors.push('missing publicFinding');
  return errors;
}

export function getAttitudeAggregateErrors(agg: AttitudeAggregate): string[] {
  const errors: string[] = [];
  if (!agg.questionId?.trim()) errors.push('missing questionId');
  if (!agg.socialDimensionId) errors.push('missing socialDimensionId');
  if (typeof agg.validResponseCount !== 'number' || agg.validResponseCount < 0)
    errors.push('invalid validResponseCount');
  const visible = sumVisible(agg.responseDistribution as Record<string, Suppressible>);
  const anySuppressed = Object.values(agg.responseDistribution).some(isSuppressed);
  if (visible > agg.validResponseCount) errors.push('distribution exceeds validResponseCount');
  if (!anySuppressed && visible !== agg.validResponseCount)
    errors.push('distribution does not sum to validResponseCount');
  if (!localizedOk(agg.publicFinding)) errors.push('missing publicFinding');
  return errors;
}

/** Collect the reasons a dataset is invalid (spec §62); empty = valid. */
export function getDatasetErrors(dataset: SurveyAggregateDataset): string[] {
  const errors: string[] = [];
  if (!dataset.datasetId?.trim()) errors.push('missing datasetId');
  if (!dataset.surveyVersion?.trim()) errors.push('missing surveyVersion');
  if (!dataset.datasetVersion?.trim()) errors.push('missing datasetVersion');
  if (!dataset.collectionStartDate || !dataset.collectionEndDate) errors.push('missing collection dates');
  if (typeof dataset.totalResponses !== 'number' || dataset.totalResponses < 0)
    errors.push('invalid totalResponses');
  if (dataset.validResponseTotal + dataset.missingResponseTotal !== dataset.totalResponses)
    errors.push('valid + missing != total');
  if (!Array.isArray(dataset.cities) || dataset.cities.length === 0) errors.push('missing cities');

  for (const agg of dataset.questionAggregates) {
    if (getQuestionAggregateErrors(agg).length) errors.push(`bad questionAggregate ${agg.questionId}`);
  }
  for (const agg of dataset.diseaseAwarenessAggregates) {
    if (getDiseaseAwarenessErrors(agg).length) errors.push(`bad diseaseAwareness ${agg.diseaseId}`);
  }
  for (const agg of dataset.attitudeAggregates) {
    if (getAttitudeAggregateErrors(agg).length) errors.push(`bad attitudeAggregate ${agg.questionId}`);
  }
  return errors;
}

export function isValidDataset(dataset: SurveyAggregateDataset): boolean {
  return getDatasetErrors(dataset).length === 0;
}

/** Return the dataset only if it validates; otherwise null (spec §62/§63). */
export function getRenderableDataset(
  dataset: SurveyAggregateDataset | null,
): SurveyAggregateDataset | null {
  if (!dataset) return null;
  return isValidDataset(dataset) ? dataset : null;
}

/** Collect the reasons a finding is invalid (spec §62); empty = valid. */
export function getFindingErrors(finding: SurveyFindingRecord): string[] {
  const errors: string[] = [];
  if (!finding.id?.trim()) errors.push('missing id');
  if (!localizedOk(finding.title)) errors.push('missing title');
  if (!localizedOk(finding.findingText)) errors.push('missing findingText');
  if (!localizedOk(finding.statistic)) errors.push('missing statistic');
  if (!finding.referenceToMethodology?.trim()) errors.push('missing methodology reference');
  if (!finding.datasetVersion?.trim()) errors.push('missing datasetVersion');
  if (typeof finding.validResponseCount !== 'number' || finding.validResponseCount < 0)
    errors.push('invalid validResponseCount');
  return errors;
}

export function isValidFinding(finding: SurveyFindingRecord): boolean {
  return getFindingErrors(finding).length === 0;
}
