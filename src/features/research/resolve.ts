import { findingRenders } from './validate';
import type {
  EvidenceType,
  ResearchDomain,
  ResearchFinding,
  ResearchFindingsDataset,
  ResearchLimitation,
  ResearchMethodology,
  ResearchProjectLearning,
  ResearchQuestion,
  ResearchReport,
  ResearchVisualization,
  ReportDownloadAsset,
  ReportType,
} from './types';

/**
 * Client-safe resolution of approved research data (spec §61/§106). Pure and
 * framework-free so report resolution and presentation selection are independently
 * testable (spec §114). It only selects/orders/shapes already-approved records —
 * it never computes findings from raw data (spec §105/§106). Only
 * APPROVED_FOR_PUBLICATION, publicly displayable, source-resolvable records reach
 * the client (spec §10/§61).
 */

const YEAR = (iso: string) => iso.slice(0, 4);

/** All renderable findings (spec §61), newest first. */
export function getRenderableFindings(dataset: ResearchFindingsDataset): ResearchFinding[] {
  return dataset.findings
    .filter((f) => findingRenders(f, dataset.sourceRegistry))
    .slice()
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

/** Featured findings (spec §70) — editorial, sorted by featuredOrder. Featured
 * status must not alter calculations, confidence, evidence type, or scope. */
export function getFeaturedFindings(dataset: ResearchFindingsDataset): ResearchFinding[] {
  return getRenderableFindings(dataset)
    .filter((f) => f.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export function getFindingById(
  dataset: ResearchFindingsDataset,
  id: string | null | undefined,
): ResearchFinding | null {
  if (!id) return null;
  const finding = dataset.findings.find((f) => f.id === id);
  if (!finding || !findingRenders(finding, dataset.sourceRegistry)) return null;
  return finding;
}

/**
 * Filter findings for the archive (spec §81) by research domain, evidence type,
 * and year. NEVER filters by individual genetic risk, family history, participant
 * identity, or individual survey response (spec §81) — those inputs do not exist.
 */
export function filterFindings(
  findings: readonly ResearchFinding[],
  filters: {
    domain?: ResearchDomain | 'all';
    evidenceType?: EvidenceType | 'all';
    year?: string | 'all';
  },
): ResearchFinding[] {
  return findings.filter((f) => {
    if (filters.domain && filters.domain !== 'all' && !f.researchDomainIds.includes(filters.domain))
      return false;
    if (filters.evidenceType && filters.evidenceType !== 'all' && f.evidenceType !== filters.evidenceType)
      return false;
    if (filters.year && filters.year !== 'all' && YEAR(f.updatedAt) !== filters.year) return false;
    return true;
  });
}

/** Related findings (spec §82) — must not imply causation (enforced in content). */
export function getRelatedFindings(
  dataset: ResearchFindingsDataset,
  finding: ResearchFinding,
): ResearchFinding[] {
  return finding.relatedFindingIds
    .map((id) => getFindingById(dataset, id))
    .filter((f): f is ResearchFinding => f !== null);
}

/**
 * Limitations that MUST render with a finding (spec §52): those the finding
 * declares, plus any limitation whose affectedFindingIds includes it. Approved
 * and (publicDisplayRequired OR generally displayable). Sorted by severity.
 */
export function getFindingLimitations(
  dataset: ResearchFindingsDataset,
  finding: ResearchFinding,
): ResearchLimitation[] {
  const severityRank = { HIGH: 0, MODERATE: 1, LOW: 2 } as const;
  return dataset.limitations
    .filter((l) => l.reviewStatus === 'APPROVED_FOR_PUBLICATION')
    .filter((l) => finding.limitationIds.includes(l.id) || l.affectedFindingIds.includes(finding.id))
    .slice()
    .sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
}

/** Visualizations for a finding (spec §78) — approved and publicly displayable. */
export function getFindingVisualizations(
  dataset: ResearchFindingsDataset,
  finding: ResearchFinding,
): ResearchVisualization[] {
  return dataset.visualizations.filter(
    (v) =>
      v.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
      v.publicDisplayAllowed &&
      (finding.visualizationIds.includes(v.id) || v.findingIds.includes(finding.id)),
  );
}

export function getFindingMethodology(
  dataset: ResearchFindingsDataset,
  finding: ResearchFinding,
): ResearchMethodology | null {
  // A finding's methodology is reached through its report or a shared domain.
  const report = finding.reportId ? getReportById(dataset, finding.reportId) : null;
  const methodId = report?.methodologyIds[0];
  const method = methodId ? dataset.methodologies.find((m) => m.id === methodId) : null;
  return method && method.reviewStatus === 'APPROVED_FOR_PUBLICATION' ? method : null;
}

/* -------------------- Reports (spec §53–§67) -------------------- */

export function getRenderableReports(dataset: ResearchFindingsDataset): ResearchReport[] {
  return dataset.reports
    .filter((r) => r.reviewStatus === 'APPROVED_FOR_PUBLICATION' && r.publicDisplayAllowed)
    .slice()
    .sort((a, b) => (a.publicationDate < b.publicationDate ? 1 : -1));
}

export function getFeaturedReports(dataset: ResearchFindingsDataset): ResearchReport[] {
  return getRenderableReports(dataset)
    .filter((r) => r.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export function getReportById(
  dataset: ResearchFindingsDataset,
  id: string | null | undefined,
): ResearchReport | null {
  if (!id) return null;
  const report = dataset.reports.find((r) => r.id === id);
  if (!report || report.reviewStatus !== 'APPROVED_FOR_PUBLICATION' || !report.publicDisplayAllowed)
    return null;
  return report;
}

export function filterReports(
  reports: readonly ResearchReport[],
  filters: {
    reportType?: ReportType | 'all';
    domain?: ResearchDomain | 'all';
    year?: string | 'all';
  },
): ResearchReport[] {
  return reports.filter((r) => {
    if (filters.reportType && filters.reportType !== 'all' && r.reportType !== filters.reportType)
      return false;
    if (filters.domain && filters.domain !== 'all' && !r.researchDomainIds.includes(filters.domain))
      return false;
    if (filters.year && filters.year !== 'all' && YEAR(r.publicationDate) !== filters.year) return false;
    return true;
  });
}

/** Findings referenced by a report that themselves render (spec §55/§56). */
export function getReportFindings(
  dataset: ResearchFindingsDataset,
  report: ResearchReport,
): ResearchFinding[] {
  return report.findingIds
    .map((id) => getFindingById(dataset, id))
    .filter((f): f is ResearchFinding => f !== null);
}

export function getReportLimitations(
  dataset: ResearchFindingsDataset,
  report: ResearchReport,
): ResearchLimitation[] {
  return dataset.limitations.filter(
    (l) => l.reviewStatus === 'APPROVED_FOR_PUBLICATION' && report.limitationIds.includes(l.id),
  );
}

export function getReportMethodologies(
  dataset: ResearchFindingsDataset,
  report: ResearchReport,
): ResearchMethodology[] {
  return dataset.methodologies.filter(
    (m) => m.reviewStatus === 'APPROVED_FOR_PUBLICATION' && report.methodologyIds.includes(m.id),
  );
}

/** Approved, publicly displayable downloads for the report's exact version
 * (spec §67). No raw private data is ever exposed here (spec §68). */
export function getReportDownloads(
  dataset: ResearchFindingsDataset,
  report: ResearchReport,
): ReportDownloadAsset[] {
  return dataset.downloadAssets.filter(
    (d) =>
      d.reportId === report.id &&
      d.reportVersion === report.reportVersion &&
      d.reviewStatus === 'APPROVED_FOR_PUBLICATION' &&
      d.publicDisplayAllowed,
  );
}

/* -------------------- Questions & learnings (spec §23/§60) -------------------- */

export function getRenderableQuestions(dataset: ResearchFindingsDataset): ResearchQuestion[] {
  return dataset.researchQuestions.filter((q) => q.publicDisplayAllowed);
}

export function getRenderableProjectLearnings(
  dataset: ResearchFindingsDataset,
): ResearchProjectLearning[] {
  return dataset.projectLearnings.filter(
    (l) => l.reviewStatus === 'APPROVED_FOR_PUBLICATION' && l.publicDisplayAllowed,
  );
}

/* -------------------- Archive filter options -------------------- */

export function availableDomains(findings: readonly ResearchFinding[]): ResearchDomain[] {
  return Array.from(new Set(findings.flatMap((f) => f.researchDomainIds)));
}

export function availableEvidenceTypes(findings: readonly ResearchFinding[]): EvidenceType[] {
  return Array.from(new Set(findings.map((f) => f.evidenceType)));
}

export function availableFindingYears(findings: readonly ResearchFinding[]): string[] {
  return Array.from(new Set(findings.map((f) => YEAR(f.updatedAt)))).sort().reverse();
}

export function availableReportTypes(reports: readonly ResearchReport[]): ReportType[] {
  return Array.from(new Set(reports.map((r) => r.reportType)));
}

/** Whether the public page has real, renderable research (spec §110). */
export function hasRenderableData(dataset: ResearchFindingsDataset | null): boolean {
  if (!dataset) return false;
  return getRenderableFindings(dataset).length > 0;
}
