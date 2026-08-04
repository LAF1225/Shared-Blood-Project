import { resolveFindingSources } from './sources';
import { isStatisticConsistent } from './statistics';
import type {
  ComparisonFinding,
  ResearchFinding,
  ResearchFindingsDataset,
  ResearchLimitation,
  ResearchMethodology,
  ResearchReport,
  ResearchSourceRegistry,
} from './types';

/**
 * Client-safe validation of approved research records (spec §112). Pure and
 * framework-free so finding validation, report resolution, and statistical
 * consistency are independently testable from presentation (spec §114).
 * Validation only ever blocks — it never fabricates a substitute statistic
 * (spec §111). Invalid or unsourced findings never render (spec §10).
 */

function localizedOk(text: { en?: string; ur?: string } | null | undefined): boolean {
  return Boolean(text?.en?.trim() && text?.ur?.trim());
}

/** Collect the reasons a finding is invalid (spec §7/§9/§10/§26/§73). */
export function getFindingErrors(
  finding: ResearchFinding,
  registry: ResearchSourceRegistry,
): string[] {
  const errors: string[] = [];
  if (!finding.id?.trim()) errors.push('missing id');
  if (!localizedOk(finding.title)) errors.push('missing title');
  if (!localizedOk(finding.summary)) errors.push('missing summary');
  if (!finding.findingType) errors.push('missing findingType');
  if (!finding.evidenceType) errors.push('missing evidenceType');
  if (!localizedOk(finding.sampleContext)) errors.push('missing sampleContext');
  if (!localizedOk(finding.calculationMethod)) errors.push('missing calculationMethod');

  // Source traceability (spec §9/§10) — the finding must fully resolve.
  const resolution = resolveFindingSources(finding, registry);
  if (!resolution.ok) errors.push(...resolution.reasons);

  // Interpretation + the CORE "What This Does Not Show" boundary (spec §73).
  if (!localizedOk(finding.interpretation?.observedResult)) errors.push('missing observedResult');
  if (!localizedOk(finding.interpretation?.approvedInterpretation))
    errors.push('missing approvedInterpretation');
  if (!localizedOk(finding.interpretation?.doesNotShow)) errors.push('missing doesNotShow (spec §73)');

  // Structured statistic must be internally consistent (spec §26/§27).
  if (finding.statistic && !isStatisticConsistent(finding.statistic))
    errors.push('inconsistent statistic');

  // Time scope: cross-sectional data must not be flagged as a trend (spec §38/§39).
  if (finding.timeScope?.crossSectional && finding.findingType === 'TREND_FINDING')
    errors.push('cross-sectional data cannot be a TREND_FINDING (spec §38/§39)');

  if (finding.featured && typeof finding.featuredOrder !== 'number')
    errors.push('featured without featuredOrder');

  return errors;
}

export function isValidFinding(
  finding: ResearchFinding,
  registry: ResearchSourceRegistry,
): boolean {
  return getFindingErrors(finding, registry).length === 0;
}

/** A finding renders only when valid, approved, and publicly displayable
 * (spec §61). */
export function findingRenders(
  finding: ResearchFinding,
  registry: ResearchSourceRegistry,
): boolean {
  return (
    finding.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
    finding.publicDisplayAllowed &&
    isValidFinding(finding, registry)
  );
}

export function getComparisonErrors(c: ComparisonFinding): string[] {
  const errors: string[] = [];
  if (!c.id?.trim()) errors.push('missing id');
  if (!localizedOk(c.comparisonGroupA) || !localizedOk(c.comparisonGroupB))
    errors.push('missing comparison groups');
  if (Math.abs(c.groupAValue - c.groupBValue - c.absoluteDifference) > 0.001)
    errors.push('absoluteDifference inconsistent with group values');
  return errors;
}

export function getMethodologyErrors(m: ResearchMethodology): string[] {
  const errors: string[] = [];
  if (!m.id?.trim()) errors.push('missing id');
  if (!localizedOk(m.title)) errors.push('missing title');
  if (!m.methodType) errors.push('missing methodType');
  if (!m.samplingMethod) errors.push('missing samplingMethod');
  if (typeof m.version !== 'number' || m.version < 1) errors.push('methodology must be versioned');
  return errors;
}

export function getLimitationErrors(l: ResearchLimitation): string[] {
  const errors: string[] = [];
  if (!l.id?.trim()) errors.push('missing id');
  if (!localizedOk(l.title)) errors.push('missing title');
  if (!localizedOk(l.description)) errors.push('missing description');
  if (!l.limitationType) errors.push('missing limitationType');
  return errors;
}

/** Report validation (spec §53/§55/§56/§64/§65). */
export function getReportErrors(
  report: ResearchReport,
  findingIds: Set<string>,
): string[] {
  const errors: string[] = [];
  if (!report.id?.trim()) errors.push('missing id');
  if (!localizedOk(report.title)) errors.push('missing title');
  if (!report.reportVersion?.trim()) errors.push('missing reportVersion (spec §64)');
  if (!localizedOk(report.executiveSummary)) errors.push('missing executiveSummary');
  if (!localizedOk(report.conclusion)) errors.push('missing conclusion');
  if (report.methodologyIds.length === 0) errors.push('report must link methodology (spec §88)');
  if (report.findingIds.length === 0) errors.push('report must reference findings');
  for (const id of report.findingIds) {
    if (!findingIds.has(id)) errors.push(`report references unknown finding ${id}`);
  }
  // Exact dataset versions preserved (spec §65/§66).
  for (const ref of report.datasetReferences) {
    if (!ref.datasetVersion?.trim()) errors.push(`dataset reference ${ref.datasetId} missing version`);
  }
  return errors;
}

/** Collect every reason a dataset is invalid (spec §112); empty = valid. */
export function getDatasetErrors(dataset: ResearchFindingsDataset): string[] {
  const errors: string[] = [];
  if (!dataset.datasetId?.trim()) errors.push('missing datasetId');
  if (!dataset.datasetVersion?.trim()) errors.push('missing datasetVersion');
  if (!localizedOk(dataset.publicDisclaimer)) errors.push('missing publicDisclaimer');

  const findingIds = new Set(dataset.findings.map((f) => f.id));
  const limitationIds = new Set(dataset.limitations.map((l) => l.id));

  for (const f of dataset.findings) {
    if (getFindingErrors(f, dataset.sourceRegistry).length) errors.push(`bad finding ${f.id}`);
    // Every declared limitation id must resolve (spec §52).
    for (const lid of f.limitationIds) {
      if (!limitationIds.has(lid)) errors.push(`finding ${f.id} references unknown limitation ${lid}`);
    }
    // Related findings must resolve (spec §82).
    for (const rid of f.relatedFindingIds) {
      if (!findingIds.has(rid)) errors.push(`finding ${f.id} references unknown related finding ${rid}`);
    }
  }
  for (const c of dataset.comparisonFindings) {
    if (getComparisonErrors(c).length) errors.push(`bad comparison ${c.id}`);
  }
  for (const m of dataset.methodologies) {
    if (getMethodologyErrors(m).length) errors.push(`bad methodology ${m.id}`);
  }
  for (const l of dataset.limitations) {
    if (getLimitationErrors(l).length) errors.push(`bad limitation ${l.id}`);
  }
  for (const r of dataset.reports) {
    if (getReportErrors(r, findingIds).length) errors.push(`bad report ${r.id}`);
  }

  return errors;
}

export function isValidDataset(dataset: ResearchFindingsDataset): boolean {
  return getDatasetErrors(dataset).length === 0;
}

/** Return the dataset only if it validates; otherwise null (spec §111). */
export function getRenderableDataset(
  dataset: ResearchFindingsDataset | null,
): ResearchFindingsDataset | null {
  if (!dataset) return null;
  return isValidDataset(dataset) ? dataset : null;
}
