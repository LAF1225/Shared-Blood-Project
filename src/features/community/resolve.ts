import type { LocalizedText } from '@/types';
import { isCompletedApproved } from './impact';
import { isValidFinding } from './validate';
import type {
  ActivityType,
  CommunityFieldworkDataset,
  CommunityImpactFinding,
  CommunityPartnerRecord,
  FieldActivityRecord,
  FieldEvidenceAsset,
  FieldLearningRecord,
  FieldworkCity,
  ImpactMetricValue,
  PublicFieldActivityRecord,
} from './types';

/**
 * Client-safe PUBLIC RECORD RESOLUTION (spec §12/§39). Pure and framework-free so
 * resolution is independently testable from presentation (spec §51). This is the
 * privacy boundary: internal records → validation (elsewhere) → PRIVACY REVIEW →
 * public records. Only APPROVED_FOR_PUBLICATION records with publicDisplayAllowed
 * are ever resolved; internal notes (activityMethod, raw counts, private
 * correspondence) are NEVER copied into the public shape (spec §35/§39). Private
 * records are dropped here — never shipped to the browser and hidden with CSS.
 */

/** True only for records that may reach the public (spec §40). */
function isPublic(reviewStatus: string, publicDisplayAllowed: boolean): boolean {
  return reviewStatus === 'APPROVED_FOR_PUBLICATION' && publicDisplayAllowed;
}

function num(n: number): LocalizedText {
  return { en: String(n), ur: String(n) };
}

/** Approximate display for estimated attendance (spec §14) — never an exact
 * verified count. */
function approxNumber(n: number): LocalizedText {
  return { en: `about ${n}`, ur: `تقریباً ${n}` };
}

/** Per-activity impact metric values for the public activity page (spec §12). */
function resolveActivityMetrics(
  activity: FieldActivityRecord,
  dataset: CommunityFieldworkDataset,
): ImpactMetricValue[] {
  const metrics: ImpactMetricValue[] = [];
  const isEstimated = activity.participantCountMethod === 'ESTIMATED_ATTENDANCE';

  metrics.push({
    metricCode: 'RECORDED_PARTICIPANTS',
    value: activity.participantCount,
    verificationStatus: activity.verificationStatus,
    isApproximate: isEstimated,
  });

  const bookletResourceIds = new Set(
    dataset.resourceRecords.filter((r) => r.resourceType === 'LEARNING_BOOKLET').map((r) => r.id),
  );
  const booklets = dataset.materialDistributionRecords
    .filter(
      (m) =>
        m.fieldActivityId === activity.id &&
        m.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
        bookletResourceIds.has(m.educationalResourceId),
    )
    .reduce((sum, m) => sum + m.quantityDistributed, 0);
  if (booklets > 0) {
    metrics.push({
      metricCode: 'LEARNING_BOOKLETS_DISTRIBUTED',
      value: booklets,
      verificationStatus: activity.verificationStatus,
      isApproximate: false,
    });
  }

  const training = dataset.trainingMetrics.find(
    (tr) => tr.fieldActivityId === activity.id && tr.reviewStatus === 'APPROVED_FOR_PUBLICATION',
  );
  if (training) {
    metrics.push({
      metricCode: 'STRUCTURED_TRAINING_COMPLETIONS',
      value: training.completedParticipantCount,
      verificationStatus: activity.verificationStatus,
      isApproximate: false,
    });
  }

  return metrics;
}

/**
 * Resolve ONE internal activity into its public record (spec §12). Returns null
 * unless the activity is approved AND publicly displayable. The internal
 * `activityMethod` is dropped — only the pre-approved `activityMethodSummary`
 * reaches the public. Evidence and field learnings are filtered to approved,
 * privacy-cleared ids.
 */
export function resolvePublicActivity(
  activity: FieldActivityRecord,
  dataset: CommunityFieldworkDataset,
): PublicFieldActivityRecord | null {
  if (!isPublic(activity.reviewStatus, activity.publicDisplayAllowed)) return null;

  const isEstimated = activity.participantCountMethod === 'ESTIMATED_ATTENDANCE';

  const approvedEvidence = getPublicEvidenceAssets(dataset, activity.id).map((e) => e.id);
  const approvedLearnings = activity.publicFindingIds; // learning ids are filtered at render

  return {
    id: activity.id,
    activityTitle: activity.activityTitle,
    activityType: activity.activityType,
    activityDate: activity.activityDate,
    cityId: activity.cityId,
    locationType: activity.locationType,
    partnerOrganizationIds: activity.partnerOrganizationIds,
    targetAudienceLabels: activity.targetAudienceIds,
    educationalResourceIds: activity.educationalResourceIds,
    diseaseIds: activity.diseaseIds,
    participantCountDisplay: isEstimated
      ? approxNumber(activity.participantCount)
      : num(activity.participantCount),
    materialsDistributedDisplay: num(activity.materialsDistributed),
    activitySummary: activity.activitySummary,
    activityObjectives: activity.activityObjectives,
    activityMethodSummary: activity.activityMethodSummary,
    approvedImpactMetrics: resolveActivityMetrics(activity, dataset),
    approvedFieldLearnings: approvedLearnings,
    approvedEvidenceAssets: approvedEvidence,
    reviewStatus: activity.reviewStatus,
    featured: activity.featured,
    featuredOrder: activity.featuredOrder,
    verificationStatus: activity.verificationStatus,
    programAssociation: activity.programAssociation ?? null,
  };
}

/** All public activity records (spec §39), newest first. */
export function resolvePublicActivities(
  dataset: CommunityFieldworkDataset,
): PublicFieldActivityRecord[] {
  return dataset.activityRecords
    .map((a) => resolvePublicActivity(a, dataset))
    .filter((a): a is PublicFieldActivityRecord => a !== null)
    .sort((a, b) => (a.activityDate < b.activityDate ? 1 : -1));
}

/** Look up a single public activity by id (spec §35/§47). */
export function getPublicActivityById(
  dataset: CommunityFieldworkDataset,
  id: string | null | undefined,
): PublicFieldActivityRecord | null {
  if (!id) return null;
  const activity = dataset.activityRecords.find((a) => a.id === id);
  if (!activity) return null;
  return resolvePublicActivity(activity, dataset);
}

/** Featured activities (spec §37) — editorial, sorted by featuredOrder. Featured
 * status is presentation only and never affects impact totals (spec §37). */
export function getFeaturedActivities(
  activities: readonly PublicFieldActivityRecord[],
): PublicFieldActivityRecord[] {
  return activities
    .filter((a) => a.featured)
    .slice()
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

/**
 * Filter public activities by type / city / year / audience (spec §37). NEVER
 * filters by participant medical condition, marriage history, genetic risk, or
 * individual knowledge score (spec §37) — those inputs do not exist.
 */
export function filterActivities(
  activities: readonly PublicFieldActivityRecord[],
  filters: {
    type?: ActivityType | 'all';
    city?: FieldworkCity | 'all';
    year?: string | 'all';
  },
): PublicFieldActivityRecord[] {
  return activities.filter((a) => {
    if (filters.type && filters.type !== 'all' && a.activityType !== filters.type) return false;
    if (filters.city && filters.city !== 'all' && a.cityId !== filters.city) return false;
    if (filters.year && filters.year !== 'all' && a.activityDate.slice(0, 4) !== filters.year)
      return false;
    return true;
  });
}

/** Distinct activity types present in the public set (for filter options). */
export function availableActivityTypes(
  activities: readonly PublicFieldActivityRecord[],
): ActivityType[] {
  return Array.from(new Set(activities.map((a) => a.activityType)));
}

export function availableCities(
  activities: readonly PublicFieldActivityRecord[],
): FieldworkCity[] {
  return Array.from(new Set(activities.map((a) => a.cityId)));
}

export function availableYears(activities: readonly PublicFieldActivityRecord[]): string[] {
  return Array.from(new Set(activities.map((a) => a.activityDate.slice(0, 4)))).sort().reverse();
}

/**
 * Approved community impact findings (spec §43/§44), sorted by displayOrder. Only
 * APPROVED_FOR_PUBLICATION + valid findings render; drafts never appear.
 */
export function getRenderableFindings(
  findings: readonly CommunityImpactFinding[],
): CommunityImpactFinding[] {
  return findings
    .filter((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION' && f.publicDisplayAllowed && isValidFinding(f))
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Approved field learnings for "What We Learned in the Field" (spec §44). Only
 * approved, publicly displayable learnings render. Learnings that changed MEDICAL
 * content must have passed scientific review first (spec §24) — otherwise the
 * learning is withheld.
 */
export function getRenderableFieldLearnings(
  dataset: CommunityFieldworkDataset,
): FieldLearningRecord[] {
  const medicalAreas = new Set(['DISEASE_CONTENT', 'GENETIC_TESTING_EDUCATION', 'CARRIER_EDUCATION']);
  return dataset.fieldLearnings
    .filter((l) => isPublic(l.reviewStatus, l.publicDisplayAllowed))
    .filter((l) => !medicalAreas.has(l.projectAreaAffected) || l.scientificReviewCompleted)
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Approved, privacy-cleared evidence assets for an activity (spec §29/§30). Drops
 * any asset that is not approved, not publicly displayable, or that contains a
 * minor / identifiable person — until Module 20 governs identification, such
 * assets are never public (spec §30). Sorted by displayOrder.
 */
export function getPublicEvidenceAssets(
  dataset: CommunityFieldworkDataset,
  activityId: string,
): FieldEvidenceAsset[] {
  return dataset.evidenceAssets
    .filter((e) => e.fieldActivityId === activityId)
    .filter((e) => isPublic(e.reviewStatus, e.publicDisplayAllowed))
    .filter((e) => !e.containsMinor && !e.containsIdentifiablePerson)
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Approved, publicly displayable field observations for an activity (spec §21/
 * §22). Observations stay contextual to their activity — never population claims. */
export function getPublicObservations(
  dataset: CommunityFieldworkDataset,
  activityId: string,
) {
  return dataset.fieldObservations
    .filter((o) => o.fieldActivityId === activityId)
    .filter((o) => isPublic(o.reviewStatus, o.publicDisplayAllowed));
}

/** Approved field learnings sourced from a given activity (spec §44). */
export function getActivityFieldLearnings(
  dataset: CommunityFieldworkDataset,
  activityId: string,
): FieldLearningRecord[] {
  return getRenderableFieldLearnings(dataset).filter((l) =>
    l.sourceFieldActivityIds.includes(activityId),
  );
}

/** Resolve the educational resources used in an activity (spec §12/§35). */
export function getActivityResources(
  dataset: CommunityFieldworkDataset,
  activity: PublicFieldActivityRecord,
) {
  return activity.educationalResourceIds
    .map((id) => dataset.resourceRecords.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => r !== undefined && r.publicDisplayAllowed);
}

/** Approved partner records (spec §32). Names/logos/descriptions require
 * public-display approval, enforced here. */
export function getPublicPartners(
  dataset: CommunityFieldworkDataset,
): CommunityPartnerRecord[] {
  return dataset.partnerRecords.filter((p) => isPublic(p.reviewStatus, p.publicDisplayAllowed));
}

export function getPartnerById(
  dataset: CommunityFieldworkDataset,
  id: string,
): CommunityPartnerRecord | null {
  const partner = dataset.partnerRecords.find((p) => p.id === id);
  if (!partner) return null;
  return isPublic(partner.reviewStatus, partner.publicDisplayAllowed) ? partner : null;
}

/** Whether the public page has real, renderable community work (spec §48). When
 * false the page shows the "being documented" empty state. */
export function hasRenderableData(
  dataset: CommunityFieldworkDataset | null,
): boolean {
  if (!dataset) return false;
  return resolvePublicActivities(dataset).some(
    (a) => dataset.activityRecords.find((r) => r.id === a.id && isCompletedApproved(r)) !== undefined,
  );
}
