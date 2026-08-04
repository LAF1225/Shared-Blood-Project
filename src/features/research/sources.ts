import type { EvidenceType, ResearchFinding, ResearchSourceRegistry } from './types';

/**
 * FindingSourceResolver (spec §9/§10). Pure and framework-free so source
 * resolution is independently testable (spec §114). It is the traceability gate:
 * a ResearchFinding must NOT render publicly if a required source cannot be
 * resolved (spec §10), and a source-free finding is never allowed (spec §9/§28).
 *
 * Beyond existence, it enforces EVIDENCE-TYPE CONSISTENCY (spec §5/§6/§19/§20):
 * a SURVEY_DATA finding must cite a survey source; a LITERATURE finding must cite
 * Module 07 references; MIXED_EVIDENCE must retain ≥2 distinct source categories.
 * This keeps literature statistics from being labelled "Shared Blood found"
 * (spec §19) and stops mixed evidence collapsing into one unsupported number
 * (spec §20).
 */

export interface SourceResolution {
  ok: boolean;
  /** Referenced source ids that are not present/approved in the registry. */
  missing: string[];
  /** Which source categories the finding actually draws on. */
  categoriesPresent: SourceCategory[];
  /** Reasons the finding failed resolution (for validation messages). */
  reasons: string[];
}

export type SourceCategory =
  | 'dataset'
  | 'surveyFinding'
  | 'fieldActivity'
  | 'fieldObservation'
  | 'assessmentAggregate'
  | 'communityFinding'
  | 'reference';

function refs(finding: ResearchFinding): Record<SourceCategory, { ids: string[]; pool: keyof RegistrySets }> {
  return {
    dataset: { ids: finding.sourceDatasetIds, pool: 'datasetIds' },
    surveyFinding: { ids: finding.sourceSurveyFindingIds, pool: 'surveyFindingIds' },
    fieldActivity: { ids: finding.sourceFieldActivityIds, pool: 'fieldActivityIds' },
    fieldObservation: { ids: finding.sourceFieldObservationIds, pool: 'fieldObservationIds' },
    assessmentAggregate: { ids: finding.sourceAssessmentAggregateIds, pool: 'assessmentAggregateIds' },
    communityFinding: { ids: finding.sourceCommunityFindingIds, pool: 'communityFindingIds' },
    reference: { ids: finding.referenceIds, pool: 'referenceIds' },
  };
}

interface RegistrySets {
  datasetIds: Set<string>;
  surveyFindingIds: Set<string>;
  fieldActivityIds: Set<string>;
  fieldObservationIds: Set<string>;
  assessmentAggregateIds: Set<string>;
  communityFindingIds: Set<string>;
  referenceIds: Set<string>;
}

function buildSets(registry: ResearchSourceRegistry): RegistrySets {
  return {
    datasetIds: new Set(Object.keys(registry.datasetVersions)),
    surveyFindingIds: new Set(registry.surveyFindingIds),
    fieldActivityIds: new Set(registry.fieldActivityIds),
    fieldObservationIds: new Set(registry.fieldObservationIds),
    assessmentAggregateIds: new Set(registry.assessmentAggregateIds),
    communityFindingIds: new Set(registry.communityFindingIds),
    referenceIds: new Set(registry.referenceIds),
  };
}

/** The source categories that satisfy a given evidence type (spec §6). */
const EVIDENCE_REQUIREMENTS: Record<EvidenceType, SourceCategory[]> = {
  SURVEY_DATA: ['surveyFinding', 'dataset'],
  FIELDWORK_METRIC: ['fieldActivity'],
  FIELD_OBSERVATION: ['fieldObservation'],
  TRAINING_ASSESSMENT: ['assessmentAggregate'],
  LITERATURE_SOURCE: ['reference'],
  PROJECT_ANALYTICS: ['dataset'],
  PROJECT_OPERATIONAL_DATA: ['dataset', 'fieldActivity'],
  MIXED_EVIDENCE: [], // handled specially: needs ≥2 distinct categories
};

/**
 * Resolve a finding's sources against the approved registry (spec §10). Returns
 * ok=false with reasons when the finding is source-free, references an
 * unresolvable id, or its evidence type is not supported by the cited sources.
 */
export function resolveFindingSources(
  finding: ResearchFinding,
  registry: ResearchSourceRegistry,
): SourceResolution {
  const sets = buildSets(registry);
  const map = refs(finding);
  const missing: string[] = [];
  const reasons: string[] = [];
  const categoriesPresent: SourceCategory[] = [];

  for (const category of Object.keys(map) as SourceCategory[]) {
    const { ids, pool } = map[category];
    if (ids.length > 0) categoriesPresent.push(category);
    for (const id of ids) {
      if (!sets[pool].has(id)) missing.push(id);
    }
  }

  if (categoriesPresent.length === 0) reasons.push('source-free finding');
  if (missing.length > 0) reasons.push(`unresolved sources: ${missing.join(', ')}`);

  // Evidence-type consistency (spec §5/§6/§19/§20).
  if (finding.evidenceType === 'MIXED_EVIDENCE') {
    if (categoriesPresent.length < 2)
      reasons.push('MIXED_EVIDENCE requires at least two distinct source categories');
  } else {
    const required = EVIDENCE_REQUIREMENTS[finding.evidenceType];
    const satisfied = required.some((cat) => categoriesPresent.includes(cat));
    if (!satisfied) reasons.push(`evidence type ${finding.evidenceType} not supported by cited sources`);
  }

  return {
    ok: reasons.length === 0,
    missing,
    categoriesPresent,
    reasons,
  };
}

/** Whether a finding's sources fully resolve (spec §10). */
export function areSourcesResolvable(
  finding: ResearchFinding,
  registry: ResearchSourceRegistry,
): boolean {
  return resolveFindingSources(finding, registry).ok;
}

/** The exact approved dataset version for a referenced dataset (spec §65).
 * Returns null if the dataset is not in the approved registry. */
export function datasetVersionFor(
  registry: ResearchSourceRegistry,
  datasetId: string,
): string | null {
  return registry.datasetVersions[datasetId] ?? null;
}
