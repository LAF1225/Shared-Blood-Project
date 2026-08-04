import { impactSummaryMatches } from './impact';
import type {
  CommunityFieldworkDataset,
  CommunityImpactFinding,
  EducationalResourceRecord,
  FieldActivityRecord,
  FieldEvidenceAsset,
  FieldLearningComparison,
  MaterialDistributionRecord,
  TrainingActivityMetric,
} from './types';

/**
 * Client-safe validation of community fieldwork records (spec §40). Pure and
 * framework-free so validation is independently testable from presentation
 * (spec §51). Validation ONLY ever removes/blocks — it NEVER silently repairs an
 * invalid value (spec §40). Invalid data must not render: `getRenderableDataset`
 * returns null for a bad dataset.
 */

function localizedOk(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;

/** Collect the reasons a field activity is invalid (spec §40); empty = valid. */
export function getActivityErrors(a: FieldActivityRecord): string[] {
  const errors: string[] = [];
  if (!a.id?.trim()) errors.push('missing id');
  if (!a.activityType) errors.push('missing activityType');
  if (!a.activityStatus) errors.push('missing activityStatus');
  if (!a.activityDate || !ISO_DATE.test(a.activityDate)) errors.push('invalid activityDate');
  if (!a.cityId) errors.push('missing cityId');
  if (!a.locationType) errors.push('missing locationType');
  if (!a.participantCountMethod) errors.push('missing participantCountMethod');
  if (typeof a.participantCount !== 'number' || a.participantCount < 0)
    errors.push('participantCount must be >= 0');
  if (typeof a.staffOrVolunteerCount !== 'number' || a.staffOrVolunteerCount < 0)
    errors.push('staffOrVolunteerCount must be >= 0');
  if (typeof a.materialsDistributed !== 'number' || a.materialsDistributed < 0)
    errors.push('materialsDistributed must be >= 0');
  if (!localizedOk(a.activityTitle)) errors.push('missing activityTitle');
  if (!localizedOk(a.activitySummary)) errors.push('missing activitySummary');
  // Every referenced resource must carry an exact version (spec §9).
  for (const rid of a.educationalResourceIds) {
    if (typeof a.resourceVersions[rid] !== 'number')
      errors.push(`missing resourceVersion for ${rid}`);
  }
  if (!a.reviewStatus) errors.push('missing reviewStatus');
  if (a.featured && typeof a.featuredOrder !== 'number') errors.push('featured without featuredOrder');
  return errors;
}

/** Material distribution validation (spec §40/§41). Unique id, one activity,
 * non-negative quantity (spec §16/§41). */
export function getMaterialErrors(m: MaterialDistributionRecord): string[] {
  const errors: string[] = [];
  if (!m.id?.trim()) errors.push('missing id');
  if (!m.fieldActivityId?.trim()) errors.push('missing fieldActivityId');
  if (!m.educationalResourceId?.trim()) errors.push('missing educationalResourceId');
  if (typeof m.resourceVersion !== 'number') errors.push('missing resourceVersion');
  if (typeof m.quantityDistributed !== 'number' || m.quantityDistributed < 0)
    errors.push('quantityDistributed must be >= 0');
  if (!m.distributionMethod) errors.push('missing distributionMethod');
  return errors;
}

/** Training metric validation (spec §17/§40). Completion must be defined and
 * completedParticipantCount ≤ participantCount. */
export function getTrainingErrors(tr: TrainingActivityMetric): string[] {
  const errors: string[] = [];
  if (!tr.fieldActivityId?.trim()) errors.push('missing fieldActivityId');
  if (!localizedOk(tr.completionDefinition)) errors.push('missing completionDefinition');
  if (typeof tr.participantCount !== 'number' || tr.participantCount < 0)
    errors.push('participantCount must be >= 0');
  if (typeof tr.completedParticipantCount !== 'number' || tr.completedParticipantCount < 0)
    errors.push('completedParticipantCount must be >= 0');
  if (tr.completedParticipantCount > tr.participantCount)
    errors.push('completedParticipantCount exceeds participantCount');
  return errors;
}

/** Educational resource validation (spec §8/§9). Must be versioned. */
export function getResourceErrors(r: EducationalResourceRecord): string[] {
  const errors: string[] = [];
  if (!r.id?.trim()) errors.push('missing id');
  if (!r.resourceType) errors.push('missing resourceType');
  if (!localizedOk(r.title)) errors.push('missing title');
  if (typeof r.version !== 'number' || r.version < 1) errors.push('resource must be versioned');
  if (!r.publicationDate || !ISO_DATE.test(r.publicationDate)) errors.push('invalid publicationDate');
  return errors;
}

/** Pre/post comparison validation (spec §20). Unpaired anonymous comparisons must
 * be labelled aggregate; only comparable questions are compared. */
export function getComparisonErrors(c: FieldLearningComparison): string[] {
  const errors: string[] = [];
  if (!c.fieldActivityId?.trim()) errors.push('missing fieldActivityId');
  if (!c.preAssessmentAggregateId?.trim()) errors.push('missing preAssessmentAggregateId');
  if (!c.postAssessmentAggregateId?.trim()) errors.push('missing postAssessmentAggregateId');
  if (!c.comparisonMethod) errors.push('missing comparisonMethod');
  if (!Array.isArray(c.comparableQuestionIds) || c.comparableQuestionIds.length === 0)
    errors.push('no comparable questions');
  if (Math.abs(c.postMean - c.preMean - c.absoluteChange) > 0.001)
    errors.push('absoluteChange inconsistent with means');
  if (!localizedOk(c.limitationNote)) errors.push('missing limitationNote');
  return errors;
}

/**
 * Evidence asset validation + privacy gate (spec §29/§30). An asset that contains
 * a minor or an identifiable person may NOT be publicly displayed until Module 20
 * governs identification — such an asset must have publicDisplayAllowed === false
 * (spec §30). Consent must be obtained for a publicly displayed asset.
 */
export function getEvidenceErrors(e: FieldEvidenceAsset): string[] {
  const errors: string[] = [];
  if (!e.id?.trim()) errors.push('missing id');
  if (!e.fieldActivityId?.trim()) errors.push('missing fieldActivityId');
  if (!e.assetType) errors.push('missing assetType');
  if (!localizedOk(e.altText)) errors.push('missing altText');
  if (e.publicDisplayAllowed) {
    if (e.containsMinor) errors.push('minor asset must not be publicly displayable (spec §30)');
    if (e.containsIdentifiablePerson)
      errors.push('identifiable-person asset must not be publicly displayable (spec §30)');
    if (e.consentStatus !== 'CONSENT_OBTAINED' && e.consentStatus !== 'NOT_REQUIRED')
      errors.push('public asset requires consent (spec §30)');
  }
  return errors;
}

/** Community impact finding validation (spec §43). */
export function getFindingErrors(f: CommunityImpactFinding): string[] {
  const errors: string[] = [];
  if (!f.id?.trim()) errors.push('missing id');
  if (!localizedOk(f.title)) errors.push('missing title');
  if (!localizedOk(f.findingText)) errors.push('missing findingText');
  if (!localizedOk(f.statistic)) errors.push('missing statistic');
  if (!f.findingType) errors.push('missing findingType');
  return errors;
}

export function isValidFinding(f: CommunityImpactFinding): boolean {
  return getFindingErrors(f).length === 0;
}

/** Collect every reason a dataset is invalid (spec §40); empty = valid. */
export function getDatasetErrors(dataset: CommunityFieldworkDataset): string[] {
  const errors: string[] = [];
  if (!dataset.datasetId?.trim()) errors.push('missing datasetId');
  if (!dataset.datasetVersion?.trim()) errors.push('missing datasetVersion');
  if (!localizedOk(dataset.methodology)) errors.push('missing methodology');

  // Canonical activityId uniqueness — the anchor against double counting (§41).
  const activityIds = new Set<string>();
  for (const a of dataset.activityRecords) {
    if (activityIds.has(a.id)) errors.push(`duplicate activityId ${a.id}`);
    activityIds.add(a.id);
    if (getActivityErrors(a).length) errors.push(`bad activity ${a.id}`);
  }

  // Material distribution records need unique IDs and exactly one activity (§41).
  const materialIds = new Set<string>();
  for (const m of dataset.materialDistributionRecords) {
    if (materialIds.has(m.id)) errors.push(`duplicate materialId ${m.id}`);
    materialIds.add(m.id);
    if (getMaterialErrors(m).length) errors.push(`bad material ${m.id}`);
    if (!activityIds.has(m.fieldActivityId)) errors.push(`material ${m.id} references unknown activity`);
  }

  for (const tr of dataset.trainingMetrics) {
    if (getTrainingErrors(tr).length) errors.push(`bad training ${tr.fieldActivityId}`);
  }
  for (const r of dataset.resourceRecords) {
    if (getResourceErrors(r).length) errors.push(`bad resource ${r.id}`);
  }
  for (const c of dataset.learningComparisons) {
    if (getComparisonErrors(c).length) errors.push(`bad comparison ${c.fieldActivityId}`);
  }
  for (const e of dataset.evidenceAssets) {
    if (getEvidenceErrors(e).length) errors.push(`bad evidence ${e.id}`);
  }
  for (const f of dataset.impactMetricDefinitions) {
    // No hypothetical metric may be defined (spec §26) — the type forbids it, but
    // guard defensively against a hand-edited JSON payload.
    const forbidden = ['LIVES_SAVED', 'LIVES_CHANGED', 'DISEASES_PREVENTED', 'MISDIAGNOSES_PREVENTED'];
    if (forbidden.includes(f.metricCode as unknown as string))
      errors.push(`forbidden metric ${f.metricCode}`);
  }

  // Impact summary must be derivable from the records, not hand-typed (§27/§41).
  if (!impactSummaryMatches(dataset)) errors.push('impactSummary does not match approved records');

  return errors;
}

export function isValidDataset(dataset: CommunityFieldworkDataset): boolean {
  return getDatasetErrors(dataset).length === 0;
}

/** Return the dataset only if it validates; otherwise null (spec §39/§40). */
export function getRenderableDataset(
  dataset: CommunityFieldworkDataset | null,
): CommunityFieldworkDataset | null {
  if (!dataset) return null;
  return isValidDataset(dataset) ? dataset : null;
}
