import type {
  CommunityFieldworkDataset,
  CommunityImpactSummary,
  FieldActivityRecord,
  MaterialDistributionRecord,
  TrainingActivityMetric,
} from './types';

/**
 * Pure, framework-free impact calculation (spec §27/§41/§42). Independently
 * testable from presentation (spec §51). Totals derive ONLY from APPROVED
 * COMPLETED activity records — never manually typed (spec §27), never affected by
 * presentation placement (spec §41). Every input is deduplicated by its canonical
 * id so the same activity, booklet batch, or training is never counted twice
 * (spec §41). Booklets distributed stay SEPARATE from participants reached
 * (spec §16/§42).
 *
 * There is deliberately NO "lives saved / diseases prevented / misdiagnoses
 * prevented" calculation — the metric set does not include them (spec §26), and
 * the type system forbids them.
 */

/** An activity counts toward COMPLETED impact only when approved AND completed
 * (spec §27/§40). */
export function isCompletedApproved(activity: FieldActivityRecord): boolean {
  return (
    activity.activityStatus === 'COMPLETED' &&
    activity.reviewStatus === 'APPROVED_FOR_PUBLICATION'
  );
}

/** Unique-by-id helper — the guard against double counting (spec §41). */
function uniqueById<T extends { id: string }>(records: readonly T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const r of records) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    out.push(r);
  }
  return out;
}

/** The approved, completed, de-duplicated activities that feed every total. */
export function eligibleActivities(dataset: CommunityFieldworkDataset): FieldActivityRecord[] {
  return uniqueById(dataset.activityRecords).filter(isCompletedApproved);
}

/** Material records belonging to eligible activities and approved themselves. */
function eligibleMaterials(
  dataset: CommunityFieldworkDataset,
  eligibleIds: Set<string>,
): MaterialDistributionRecord[] {
  return uniqueById(dataset.materialDistributionRecords).filter(
    (m) =>
      eligibleIds.has(m.fieldActivityId) &&
      m.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
      m.quantityDistributed >= 0,
  );
}

/** Training metrics belonging to eligible activities and approved themselves. */
function eligibleTraining(
  dataset: CommunityFieldworkDataset,
  eligibleIds: Set<string>,
): TrainingActivityMetric[] {
  // TrainingActivityMetric is keyed by fieldActivityId (one per activity).
  const seen = new Set<string>();
  return dataset.trainingMetrics.filter((tr) => {
    if (seen.has(tr.fieldActivityId)) return false;
    seen.add(tr.fieldActivityId);
    return eligibleIds.has(tr.fieldActivityId) && tr.reviewStatus === 'APPROVED_FOR_PUBLICATION';
  });
}

/**
 * Compute the aggregate impact summary from a dataset (spec §27). The result is
 * what the public page should show; a stored `impactSummary` must equal this
 * (validated in validate.ts) so totals can never drift from the records.
 */
export function calculateImpactSummary(dataset: CommunityFieldworkDataset): CommunityImpactSummary {
  const activities = eligibleActivities(dataset);
  const eligibleIds = new Set(activities.map((a) => a.id));
  const materials = eligibleMaterials(dataset, eligibleIds);
  const training = eligibleTraining(dataset, eligibleIds);

  const documentedActivityCount = activities.length;

  // Recorded participants — NOT "unique people reached" (spec §15); repeat
  // attendance across activities is not deduplicated at the person level.
  const recordedParticipantCount = activities.reduce((sum, a) => sum + a.participantCount, 0);

  // Childcare workers reached: participants of activities aimed at childcare
  // workers (spec §25). Sums participant counts of those activities only.
  const childcareWorkerCount = activities
    .filter((a) => a.targetAudienceIds.includes('CHILDCARE_WORKER'))
    .reduce((sum, a) => sum + a.participantCount, 0);

  // Structured training completions — from defined completion criteria (§17).
  const structuredTrainingCompletionCount = training.reduce(
    (sum, tr) => sum + tr.completedParticipantCount,
    0,
  );

  // Learning booklets distributed — booklet resources only, kept separate from
  // people educated (spec §16/§42).
  const bookletResourceIds = new Set(
    dataset.resourceRecords.filter((r) => r.resourceType === 'LEARNING_BOOKLET').map((r) => r.id),
  );
  const learningBookletsDistributed = materials
    .filter((m) => bookletResourceIds.has(m.educationalResourceId))
    .reduce((sum, m) => sum + m.quantityDistributed, 0);

  // All educational resources distributed (spec §25/§42).
  const educationalResourcesDistributed = materials.reduce(
    (sum, m) => sum + m.quantityDistributed,
    0,
  );

  const cityCount = new Set(activities.map((a) => a.cityId)).size;

  const partnerSupportedActivityCount = activities.filter(
    (a) => a.partnerOrganizationIds.length > 0,
  ).length;

  // Activities with a valid pre/post comparison (spec §25 PRE_POST_ASSESSMENT).
  const comparisonActivityIds = new Set(
    dataset.learningComparisons
      .filter((c) => c.reviewStatus === 'APPROVED_FOR_PUBLICATION')
      .map((c) => c.fieldActivityId),
  );
  const assessmentActivityCount = activities.filter((a) => comparisonActivityIds.has(a.id)).length;

  return {
    datasetVersion: dataset.datasetVersion,
    calculationDate: dataset.lastUpdated,
    documentedActivityCount,
    recordedParticipantCount,
    childcareWorkerCount,
    structuredTrainingCompletionCount,
    learningBookletsDistributed,
    educationalResourcesDistributed,
    cityCount,
    partnerSupportedActivityCount,
    assessmentActivityCount,
    approvedHighlightIds: dataset.impactSummary.approvedHighlightIds,
  };
}

/** True when the stored summary matches the summary re-computed from records
 * (spec §27/§41) — the guard that totals were not hand-typed or double-counted. */
export function impactSummaryMatches(dataset: CommunityFieldworkDataset): boolean {
  const computed = calculateImpactSummary(dataset);
  const stored = dataset.impactSummary;
  return (
    computed.documentedActivityCount === stored.documentedActivityCount &&
    computed.recordedParticipantCount === stored.recordedParticipantCount &&
    computed.childcareWorkerCount === stored.childcareWorkerCount &&
    computed.structuredTrainingCompletionCount === stored.structuredTrainingCompletionCount &&
    computed.learningBookletsDistributed === stored.learningBookletsDistributed &&
    computed.educationalResourcesDistributed === stored.educationalResourcesDistributed &&
    computed.cityCount === stored.cityCount &&
    computed.partnerSupportedActivityCount === stored.partnerSupportedActivityCount &&
    computed.assessmentActivityCount === stored.assessmentActivityCount
  );
}
