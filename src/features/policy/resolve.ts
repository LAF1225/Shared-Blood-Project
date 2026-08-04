import { resolveEvidenceLink, getResearchBoundary } from './evidence';
import { priorityRenders, recommendationRenders } from './validate';
import type {
  AdvocacyOutcome,
  AdvocacyPriority,
  AdvocacyPriorityType,
  AdvocacyTimelineEvent,
  AdvocacyTrace,
  EvidenceSourceType,
  PolicyAdvocacyDataset,
  PolicyBrief,
  PolicyBriefDownloadAsset,
  PolicyDomain,
  PolicyEvidenceLink,
  PolicyIssue,
  PolicyLimitation,
  PolicyRecommendation,
  PolicyStakeholder,
} from './types';
import type { LocalizedText } from '@/types';

/**
 * Client-safe resolution of approved policy & advocacy data (spec §88/§107). Pure
 * and framework-free so brief resolution and presentation selection are
 * independently testable (spec §116). It only selects/orders/shapes already-
 * approved records — it never infers policy gaps from raw data (spec §106/§107).
 * Only APPROVED_FOR_PUBLICATION, publicly displayable, evidence-resolved records
 * reach the client (spec §16/§88).
 */

const YEAR = (iso: string) => iso.slice(0, 4);

/* -------------------- Priorities (spec §18/§70) -------------------- */

export function getRenderablePriorities(dataset: PolicyAdvocacyDataset): AdvocacyPriority[] {
  return dataset.advocacyPriorities
    .filter((p) => priorityRenders(p, dataset))
    .slice()
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getFeaturedPriorities(dataset: PolicyAdvocacyDataset): AdvocacyPriority[] {
  return getRenderablePriorities(dataset)
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export function getPriorityById(
  dataset: PolicyAdvocacyDataset,
  id: string | null | undefined,
): AdvocacyPriority | null {
  if (!id) return null;
  const p = dataset.advocacyPriorities.find((x) => x.id === id);
  if (!p || !priorityRenders(p, dataset)) return null;
  return p;
}

/** Filter priorities for the archive (spec §108) by domain, priority type, year.
 * NEVER filters by political position, marriage position, or genetic-risk group
 * (spec §82/§108); those inputs do not exist. */
export function filterPriorities(
  priorities: readonly AdvocacyPriority[],
  filters: {
    domain?: PolicyDomain | 'all';
    priorityType?: AdvocacyPriorityType | 'all';
    year?: string | 'all';
  },
): AdvocacyPriority[] {
  return priorities.filter((p) => {
    if (filters.domain && filters.domain !== 'all' && !p.policyDomainIds.includes(filters.domain))
      return false;
    if (filters.priorityType && filters.priorityType !== 'all' && p.priorityType !== filters.priorityType)
      return false;
    if (filters.year && filters.year !== 'all' && YEAR(p.updatedAt) !== filters.year) return false;
    return true;
  });
}

export function getPriorityIssues(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): PolicyIssue[] {
  return priority.policyIssueIds
    .map((id) => dataset.policyIssues.find((i) => i.id === id))
    .filter((i): i is PolicyIssue => i !== undefined && i.reviewStatus === 'APPROVED_FOR_PUBLICATION');
}

export function getPriorityRecommendations(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): PolicyRecommendation[] {
  return dataset.recommendations.filter(
    (r) => r.advocacyPriorityId === priority.id && recommendationRenders(r, dataset),
  );
}

/** Resolved evidence links for a priority (spec §16/§73), keeping evidence role
 * and scope. Only links that resolve are returned. */
export function getPriorityEvidenceLinks(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): PolicyEvidenceLink[] {
  return priority.evidenceLinkIds
    .map((id) => dataset.evidenceLinks.find((l) => l.id === id))
    .filter((l): l is PolicyEvidenceLink => l !== undefined && resolveEvidenceLink(l, dataset.evidenceRegistry).ok);
}

/** Inherited research boundaries for a priority (spec §12/§99) — the "What This
 * Does Not Show" text of every cited research finding. */
export function getInheritedResearchBoundaries(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): { findingId: string; doesNotShow: LocalizedText }[] {
  const out: { findingId: string; doesNotShow: LocalizedText }[] = [];
  for (const link of getPriorityEvidenceLinks(dataset, priority)) {
    if (link.sourceType === 'RESEARCH_FINDING') {
      const boundary = getResearchBoundary(dataset.evidenceRegistry, link.sourceId);
      if (boundary) out.push({ findingId: link.sourceId, doesNotShow: boundary.doesNotShow });
    }
  }
  return out;
}

export function getPriorityStakeholders(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): PolicyStakeholder[] {
  return priority.stakeholderIds
    .map((id) => dataset.stakeholders.find((s) => s.id === id))
    .filter(
      (s): s is PolicyStakeholder =>
        s !== undefined && s.reviewStatus === 'APPROVED_FOR_PUBLICATION' && s.publicDisplayAllowed,
    );
}

/** Limitations that MUST render with a priority (spec §77): declared plus any
 * limitation whose affectedPriorityIds includes it. Severity-sorted. */
export function getPriorityLimitations(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): PolicyLimitation[] {
  const rank = { HIGH: 0, MODERATE: 1, LOW: 2 } as const;
  return dataset.limitations
    .filter((l) => l.reviewStatus === 'APPROVED_FOR_PUBLICATION')
    .filter((l) => priority.limitationIds.includes(l.id) || l.affectedPriorityIds.includes(priority.id))
    .slice()
    .sort((a, b) => rank[a.severity] - rank[b.severity]);
}

export function getPriorityTrace(
  dataset: PolicyAdvocacyDataset,
  priority: AdvocacyPriority,
): AdvocacyTrace | null {
  return dataset.traces.find((t) => t.advocacyPriorityId === priority.id) ?? null;
}

/* -------------------- Briefs (spec §47/§83) -------------------- */

export function getRenderableBriefs(dataset: PolicyAdvocacyDataset): PolicyBrief[] {
  return dataset.briefs
    .filter((b) => b.reviewStatus === 'APPROVED_FOR_PUBLICATION' && b.publicDisplayAllowed)
    .slice()
    .sort((a, b) => (a.publicationDate < b.publicationDate ? 1 : -1));
}

export function getBriefById(
  dataset: PolicyAdvocacyDataset,
  id: string | null | undefined,
): PolicyBrief | null {
  if (!id) return null;
  const b = dataset.briefs.find((x) => x.id === id);
  if (!b || b.reviewStatus !== 'APPROVED_FOR_PUBLICATION' || !b.publicDisplayAllowed) return null;
  return b;
}

export function getBriefPriorities(
  dataset: PolicyAdvocacyDataset,
  brief: PolicyBrief,
): AdvocacyPriority[] {
  return brief.advocacyPriorityIds
    .map((id) => getPriorityById(dataset, id))
    .filter((p): p is AdvocacyPriority => p !== null);
}

export function getBriefLimitations(
  dataset: PolicyAdvocacyDataset,
  brief: PolicyBrief,
): PolicyLimitation[] {
  return dataset.limitations.filter(
    (l) => l.reviewStatus === 'APPROVED_FOR_PUBLICATION' && brief.limitationIds.includes(l.id),
  );
}

/** Approved, version-matched brief downloads (spec §83). No private data (§84). */
export function getBriefDownloads(
  dataset: PolicyAdvocacyDataset,
  brief: PolicyBrief,
): PolicyBriefDownloadAsset[] {
  return dataset.downloadAssets.filter(
    (d) =>
      d.briefId === brief.id &&
      d.briefVersion === brief.version &&
      d.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
      d.publicDisplayAllowed,
  );
}

/* -------------------- Timeline, outcomes, stakeholders (spec §60/§66) --------- */

export function getRenderableTimeline(dataset: PolicyAdvocacyDataset): AdvocacyTimelineEvent[] {
  return dataset.timeline
    .filter((e) => e.publicDisplayAllowed)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRenderableOutcomes(dataset: PolicyAdvocacyDataset): AdvocacyOutcome[] {
  return dataset.outcomes.filter(
    (o) => o.reviewStatus === 'APPROVED_FOR_PUBLICATION' && o.publicDisplayAllowed,
  );
}

export function getRenderableStakeholders(dataset: PolicyAdvocacyDataset): PolicyStakeholder[] {
  return dataset.stakeholders.filter(
    (s) => s.reviewStatus === 'APPROVED_FOR_PUBLICATION' && s.publicDisplayAllowed,
  );
}

/* -------------------- Evidence Behind Our Advocacy (spec §73) -------------------- */

/** Distinct evidence source types actually used by approved priorities (spec §73).
 * Each retains its Module 18 interpretation boundary at render time. */
export function getEvidenceTypesInUse(dataset: PolicyAdvocacyDataset): EvidenceSourceType[] {
  const types = new Set<EvidenceSourceType>();
  for (const p of getRenderablePriorities(dataset)) {
    for (const link of getPriorityEvidenceLinks(dataset, p)) types.add(link.sourceType);
  }
  return Array.from(types);
}

/* -------------------- Archive filter options -------------------- */

export function availableDomains(priorities: readonly AdvocacyPriority[]): PolicyDomain[] {
  return Array.from(new Set(priorities.flatMap((p) => p.policyDomainIds)));
}

export function availablePriorityTypes(
  priorities: readonly AdvocacyPriority[],
): AdvocacyPriorityType[] {
  return Array.from(new Set(priorities.map((p) => p.priorityType)));
}

export function availableYears(priorities: readonly AdvocacyPriority[]): string[] {
  return Array.from(new Set(priorities.map((p) => YEAR(p.updatedAt)))).sort().reverse();
}

/** Whether the public page has real, renderable advocacy (spec §112). */
export function hasRenderableData(dataset: PolicyAdvocacyDataset | null): boolean {
  if (!dataset) return false;
  return getRenderablePriorities(dataset).length > 0;
}
