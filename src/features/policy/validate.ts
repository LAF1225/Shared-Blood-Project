import { resolveEvidenceLink } from './evidence';
import type {
  AdvocacyPriority,
  PolicyAdvocacyDataset,
  PolicyBrief,
  PolicyEvidenceLink,
  PolicyEvidenceRegistry,
  PolicyIssue,
  PolicyLimitation,
  PolicyRecommendation,
  PolicyStakeholder,
} from './types';

/**
 * Client-safe validation of approved policy & advocacy records (spec §114). Pure
 * and framework-free so policy evidence resolution, advocacy validation,
 * recommendation traceability, and brief resolution are independently testable
 * (spec §116/§257). Validation only ever blocks — it never fabricates a substitute
 * recommendation (spec §113). Source-free or unresolvable advocacy never renders
 * (spec §16/§75).
 */

function localizedOk(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

/** The evidence links that belong to an issue and fully resolve (spec §16). */
function resolvingLinksForIssue(dataset: PolicyAdvocacyDataset, issueId: string): PolicyEvidenceLink[] {
  return dataset.evidenceLinks.filter(
    (l) => l.policyIssueId === issueId && resolveEvidenceLink(l, dataset.evidenceRegistry).ok,
  );
}

/** Whether every named evidence link exists and resolves (spec §16/§75). */
function linksResolve(
  ids: readonly string[],
  dataset: PolicyAdvocacyDataset,
  registry: PolicyEvidenceRegistry,
): boolean {
  return ids.every((id) => {
    const link = dataset.evidenceLinks.find((l) => l.id === id);
    return link !== undefined && resolveEvidenceLink(link, registry).ok;
  });
}

export function getIssueErrors(issue: PolicyIssue): string[] {
  const errors: string[] = [];
  if (!issue.id?.trim()) errors.push('missing id');
  if (!localizedOk(issue.title)) errors.push('missing title');
  if (!localizedOk(issue.summary)) errors.push('missing summary');
  if (!localizedOk(issue.problemStatement)) errors.push('missing problemStatement');
  if (!issue.issueType) errors.push('missing issueType');
  return errors;
}

/** A priority must link ≥1 issue, carry doesNotClaim, and cite ≥1 evidence link
 * (spec §18/§25/§72). */
export function getPriorityErrors(
  priority: AdvocacyPriority,
  dataset: PolicyAdvocacyDataset,
): string[] {
  const errors: string[] = [];
  if (!priority.id?.trim()) errors.push('missing id');
  if (!localizedOk(priority.title)) errors.push('missing title');
  if (!localizedOk(priority.summary)) errors.push('missing summary');
  if (!localizedOk(priority.recommendedAction)) errors.push('missing recommendedAction');
  if (!localizedOk(priority.doesNotClaim)) errors.push('missing doesNotClaim (spec §25/§72)');
  if (priority.policyIssueIds.length === 0) errors.push('priority links no policy issue (spec §18)');
  for (const iid of priority.policyIssueIds) {
    if (!dataset.policyIssues.some((i) => i.id === iid)) errors.push(`unknown policy issue ${iid}`);
  }
  if (priority.evidenceLinkIds.length === 0) errors.push('priority cites no evidence (spec §18)');
  if (!linksResolve(priority.evidenceLinkIds, dataset, dataset.evidenceRegistry))
    errors.push('priority evidence does not resolve (spec §16)');
  if (priority.featured && typeof priority.featuredOrder !== 'number')
    errors.push('featured without featuredOrder');
  return errors;
}

/** A recommendation must cite ≥1 resolving evidence link — a source-free
 * recommendation is invalid and cannot publish (spec §75). */
export function getRecommendationErrors(
  rec: PolicyRecommendation,
  dataset: PolicyAdvocacyDataset,
): string[] {
  const errors: string[] = [];
  if (!rec.id?.trim()) errors.push('missing id');
  if (!localizedOk(rec.title)) errors.push('missing title');
  if (!localizedOk(rec.actionStatement)) errors.push('missing actionStatement');
  if (!rec.actionType) errors.push('missing actionType');
  if (!dataset.advocacyPriorities.some((p) => p.id === rec.advocacyPriorityId))
    errors.push(`recommendation references unknown priority ${rec.advocacyPriorityId}`);
  if (rec.evidenceLinkIds.length === 0) errors.push('source-free recommendation (spec §75)');
  if (!linksResolve(rec.evidenceLinkIds, dataset, dataset.evidenceRegistry))
    errors.push('recommendation evidence does not resolve (spec §16/§75)');
  return errors;
}

export function getStakeholderErrors(s: PolicyStakeholder): string[] {
  const errors: string[] = [];
  if (!s.id?.trim()) errors.push('missing id');
  if (!localizedOk(s.name)) errors.push('missing name');
  if (!s.stakeholderType) errors.push('missing stakeholderType');
  if (!localizedOk(s.recommendedRole)) errors.push('missing recommendedRole');
  return errors;
}

export function getLimitationErrors(l: PolicyLimitation): string[] {
  const errors: string[] = [];
  if (!l.id?.trim()) errors.push('missing id');
  if (!localizedOk(l.title)) errors.push('missing title');
  if (!localizedOk(l.description)) errors.push('missing description');
  if (!l.limitationType) errors.push('missing limitationType');
  return errors;
}

/** Brief validation (spec §47/§85). Version required; must reference priorities;
 * every referenced priority must exist. */
export function getBriefErrors(brief: PolicyBrief, priorityIds: Set<string>): string[] {
  const errors: string[] = [];
  if (!brief.id?.trim()) errors.push('missing id');
  if (!localizedOk(brief.title)) errors.push('missing title');
  if (!brief.version?.trim()) errors.push('missing version (spec §85)');
  if (!localizedOk(brief.executiveSummary)) errors.push('missing executiveSummary');
  if (!localizedOk(brief.conclusion)) errors.push('missing conclusion');
  if (brief.advocacyPriorityIds.length === 0) errors.push('brief references no priority');
  for (const pid of brief.advocacyPriorityIds) {
    if (!priorityIds.has(pid)) errors.push(`brief references unknown priority ${pid}`);
  }
  for (const ref of brief.evidenceReferences) {
    if (!ref.sourceVersion?.trim()) errors.push(`brief evidence ref ${ref.sourceId} missing version`);
  }
  return errors;
}

/** Collect every reason a dataset is invalid (spec §114); empty = valid. */
export function getDatasetErrors(dataset: PolicyAdvocacyDataset): string[] {
  const errors: string[] = [];
  if (!dataset.datasetId?.trim()) errors.push('missing datasetId');
  if (!localizedOk(dataset.publicDisclaimer)) errors.push('missing publicDisclaimer');

  const priorityIds = new Set(dataset.advocacyPriorities.map((p) => p.id));
  const limitationIds = new Set(dataset.limitations.map((l) => l.id));

  for (const issue of dataset.policyIssues) {
    if (getIssueErrors(issue).length) errors.push(`bad issue ${issue.id}`);
    // A public policy issue must resolve at least one evidence source (spec §7).
    if (issue.publicDisplayAllowed && resolvingLinksForIssue(dataset, issue.id).length === 0)
      errors.push(`issue ${issue.id} has no resolving evidence (spec §7)`);
  }
  for (const p of dataset.advocacyPriorities) {
    if (getPriorityErrors(p, dataset).length) errors.push(`bad priority ${p.id}`);
    for (const lid of p.limitationIds) {
      if (!limitationIds.has(lid)) errors.push(`priority ${p.id} references unknown limitation ${lid}`);
    }
  }
  for (const r of dataset.recommendations) {
    if (getRecommendationErrors(r, dataset).length) errors.push(`bad recommendation ${r.id}`);
  }
  for (const s of dataset.stakeholders) {
    if (getStakeholderErrors(s).length) errors.push(`bad stakeholder ${s.id}`);
  }
  for (const l of dataset.limitations) {
    if (getLimitationErrors(l).length) errors.push(`bad limitation ${l.id}`);
  }
  for (const b of dataset.briefs) {
    if (getBriefErrors(b, priorityIds).length) errors.push(`bad brief ${b.id}`);
  }
  return errors;
}

export function isValidDataset(dataset: PolicyAdvocacyDataset): boolean {
  return getDatasetErrors(dataset).length === 0;
}

/** A priority renders only when approved, publicly displayable, valid, and fully
 * evidence-resolved (spec §16/§88). */
export function priorityRenders(
  priority: AdvocacyPriority,
  dataset: PolicyAdvocacyDataset,
): boolean {
  return (
    priority.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
    priority.publicDisplayAllowed &&
    getPriorityErrors(priority, dataset).length === 0
  );
}

/** A recommendation renders only when approved, displayable, and evidence-linked
 * (spec §75). */
export function recommendationRenders(
  rec: PolicyRecommendation,
  dataset: PolicyAdvocacyDataset,
): boolean {
  return (
    rec.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
    rec.publicDisplayAllowed &&
    getRecommendationErrors(rec, dataset).length === 0
  );
}

/** Return the dataset only if it validates; otherwise null (spec §113). */
export function getRenderableDataset(
  dataset: PolicyAdvocacyDataset | null,
): PolicyAdvocacyDataset | null {
  if (!dataset) return null;
  return isValidDataset(dataset) ? dataset : null;
}
