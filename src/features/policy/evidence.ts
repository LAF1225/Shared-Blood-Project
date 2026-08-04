import type {
  EvidenceSourceType,
  GeographicScope,
  PolicyEvidenceLink,
  PolicyEvidenceRegistry,
} from './types';
import type { LocalizedText } from '@/types';

/**
 * PolicyEvidenceResolver (spec §16). Pure and framework-free so policy evidence
 * resolution is independently testable (spec §116). It validates an evidence
 * link's source id against the APPROVED registry, resolves its source type, and
 * enforces scope compatibility (spec §17): INCOMPATIBLE evidence can never support
 * publication. If a required evidence source fails resolution, public advocacy
 * output is blocked (spec §16/§75).
 */

/** Which registry set backs each evidence source type (spec §10). */
const REGISTRY_KEY: Record<EvidenceSourceType, keyof PolicyEvidenceRegistry> = {
  RESEARCH_FINDING: 'researchFindingIds',
  SURVEY_FINDING: 'surveyFindingIds',
  FIELDWORK_METRIC: 'fieldworkMetricIds',
  FIELD_OBSERVATION: 'fieldObservationIds',
  TRAINING_ASSESSMENT: 'trainingAssessmentIds',
  LITERATURE_SOURCE: 'literatureReferenceIds',
  PROJECT_OPERATIONAL_DATA: 'projectOperationalDataIds',
};

export interface EvidenceResolution {
  ok: boolean;
  reasons: string[];
}

/**
 * Resolve one evidence link against the approved registry (spec §16). Returns
 * ok=false when the source id is unknown/unapproved, the link itself is not
 * approved, or the scope is INCOMPATIBLE with the proposed interpretation (§17).
 */
export function resolveEvidenceLink(
  link: PolicyEvidenceLink,
  registry: PolicyEvidenceRegistry,
): EvidenceResolution {
  const reasons: string[] = [];

  if (!link.sourceId?.trim()) reasons.push('missing sourceId');
  if (!link.policyIssueId?.trim()) reasons.push('missing policyIssueId');

  const key = REGISTRY_KEY[link.sourceType];
  const pool = (registry[key] as string[]) ?? [];
  if (link.sourceId && !pool.includes(link.sourceId))
    reasons.push(`unresolved ${link.sourceType} source: ${link.sourceId}`);

  if (link.scopeCompatibility === 'INCOMPATIBLE')
    reasons.push('INCOMPATIBLE evidence cannot support publication (spec §17)');

  if (link.reviewStatus !== 'APPROVED_FOR_PUBLICATION')
    reasons.push('evidence link not approved');

  return { ok: reasons.length === 0, reasons };
}

/** Whether an evidence link fully resolves (spec §16). */
export function linkResolves(link: PolicyEvidenceLink, registry: PolicyEvidenceRegistry): boolean {
  return resolveEvidenceLink(link, registry).ok;
}

/**
 * The preserved research boundary for a cited finding (spec §12/§99). Advocacy
 * INHERITS the research finding's scope and "What This Does Not Show" — it must
 * not be stripped when creating advocacy content.
 */
export function getResearchBoundary(
  registry: PolicyEvidenceRegistry,
  findingId: string,
): { scope: GeographicScope; evidenceType: string; doesNotShow: LocalizedText } | null {
  return registry.researchFindingBoundaries[findingId] ?? null;
}
