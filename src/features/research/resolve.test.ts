import { describe, it, expect } from 'vitest';
import {
  getRenderableFindings,
  getFeaturedFindings,
  getFindingById,
  filterFindings,
  getRelatedFindings,
  getFindingLimitations,
  getFindingVisualizations,
  getRenderableReports,
  getReportById,
  getReportFindings,
  getReportDownloads,
  getRenderableProjectLearnings,
  getRenderableQuestions,
} from './resolve';
import { SAMPLE_RESEARCH_DATASET } from './preview/sampleDataset';

const ds = SAMPLE_RESEARCH_DATASET;
const find = (id: string) => ds.findings.find((f) => f.id === id)!;

describe('research resolution (spec §61/§106)', () => {
  it('renders only approved findings, excluding drafts (spec §61)', () => {
    const ids = getRenderableFindings(ds).map((f) => f.id);
    expect(ids).not.toContain('rf-draft');
    expect(ids).toContain('rf-awareness-gap');
    expect(getRenderableFindings(ds).every((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')).toBe(true);
  });

  it('orders featured findings by featuredOrder (spec §70)', () => {
    expect(getFeaturedFindings(ds).map((f) => f.id)).toEqual(['rf-awareness-gap', 'rf-testing-openness']);
  });

  it('never resolves a draft finding by id', () => {
    expect(getFindingById(ds, 'rf-draft')).toBeNull();
    expect(getFindingById(ds, 'rf-awareness-gap')?.id).toBe('rf-awareness-gap');
  });

  it('filters the archive by domain, evidence type, and year (spec §81)', () => {
    const all = getRenderableFindings(ds);
    expect(filterFindings(all, { evidenceType: 'LITERATURE_SOURCE' }).map((f) => f.id)).toEqual(['rf-literature-context']);
    expect(filterFindings(all, { domain: 'GENETIC_TESTING_AWARENESS' }).map((f) => f.id)).toEqual(['rf-testing-openness']);
    expect(filterFindings(all, { year: '2026' }).length).toBe(all.length);
    expect(filterFindings(all, { year: '2099' }).length).toBe(0);
  });

  it('resolves related findings (spec §82)', () => {
    const related = getRelatedFindings(ds, find('rf-awareness-gap')).map((f) => f.id);
    expect(related).toContain('rf-consanguinity-comparison');
    expect(related).toContain('rf-mixed');
  });

  it('surfaces required limitations with a finding (spec §52)', () => {
    const lims = getFindingLimitations(ds, find('rf-awareness-gap')).map((l) => l.id);
    expect(lims).toContain('lim-convenience');
    expect(lims).toContain('lim-self-report');
    // Highest severity first.
    expect(getFindingLimitations(ds, find('rf-awareness-gap'))[0].severity).toBe('HIGH');
  });

  it('resolves a finding visualization (spec §78)', () => {
    expect(getFindingVisualizations(ds, find('rf-awareness-gap')).map((v) => v.id)).toContain('viz-awareness-compare');
  });

  it('resolves reports, their findings, and version-matched downloads (spec §55/§67)', () => {
    const reports = getRenderableReports(ds).map((r) => r.id);
    expect(reports).toContain('report-survey-2026');
    const survey = getReportById(ds, 'report-survey-2026')!;
    expect(getReportFindings(ds, survey).map((f) => f.id)).toContain('rf-awareness-gap');
    expect(getReportDownloads(ds, survey).map((d) => d.id)).toEqual(['dl-survey-pdf']);
    // A version mismatch yields no downloads.
    expect(getReportDownloads(ds, { ...survey, reportVersion: '9.9' })).toHaveLength(0);
  });

  it('resolves approved project learnings and public questions', () => {
    expect(getRenderableProjectLearnings(ds).map((l) => l.id)).toContain('pl-urdu');
    expect(getRenderableQuestions(ds).map((q) => q.id)).toContain('rq-consanguinity');
  });
});
