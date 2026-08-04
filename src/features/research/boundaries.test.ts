import { describe, it, expect } from 'vitest';
import { PUBLIC_RESEARCH_DATASET } from './data/dataset';
import { SAMPLE_RESEARCH_DATASET } from './preview/sampleDataset';
import { getResearchReference } from './data/references';
import { getRenderableFindings } from './resolve';
import { areSourcesResolvable } from './sources';
import { isStatisticConsistent } from './statistics';
import { isValidDataset } from './validate';

const ds = SAMPLE_RESEARCH_DATASET;
const find = (id: string) => ds.findings.find((f) => f.id === id)!;

/** All public-facing text of a finding (for language boundary scans). */
function findingText(id: string): string {
  const f = find(id);
  return [
    f.title.en,
    f.summary.en,
    f.interpretation.observedResult.en,
    f.interpretation.approvedInterpretation.en,
    f.interpretation.doesNotShow.en,
    f.interpretation.possibleExplanation?.en ?? '',
  ]
    .join(' ')
    .toLowerCase();
}
const allText = ds.findings.map((f) => findingText(f.id)).join(' ');
/** Only the ASSERTIVE fields (not the deliberately-negating doesNotShow). */
const assertiveText = ds.findings
  .map((f) => `${f.interpretation.observedResult.en} ${f.interpretation.approvedInterpretation.en}`.toLowerCase())
  .join(' ');

/**
 * Research integrity + cross-module boundary tests (spec §112/§113). These encode
 * the guardrails that keep Module 18 a sourced, bounded research-publication system
 * rather than a claim generator.
 */
describe('research boundaries (spec §112/§113)', () => {
  it('production public data is EMPTY — no fabricated findings (spec §110)', () => {
    expect(PUBLIC_RESEARCH_DATASET).toBeNull();
  });

  it('the sample dataset validates end-to-end (spec §112)', () => {
    expect(isValidDataset(ds)).toBe(true);
  });

  it('every rendered finding has a traceable source and a "does not show" boundary (spec §9/§73)', () => {
    for (const f of getRenderableFindings(ds)) {
      expect(areSourcesResolvable(f, ds.sourceRegistry)).toBe(true);
      expect(f.interpretation.doesNotShow.en.trim().length).toBeGreaterThan(0);
    }
  });

  it('convenience survey findings are never nationally generalized (spec §12/§50)', () => {
    const survey = ds.findings.filter((f) => f.evidenceType === 'SURVEY_DATA');
    for (const f of survey) expect(f.geographicScope).not.toBe('NATIONAL');
    expect(assertiveText).not.toMatch(/pakistanis (believe|think|know)|people in pakistan|families in pakistan (think|believe)|across pakistan/);
  });

  it('does not assert statistical significance, causation, or correlation (spec §34/§35/§36)', () => {
    expect(assertiveText).not.toMatch(/statistically significant|proves that|correlat|causes lower|causes higher/);
  });

  it('immediate training change is not framed as long-term retention (spec §17)', () => {
    const t = findingText('rf-training-immediate');
    expect(t).toMatch(/immediate/);
    expect(t).toMatch(/not (show )?long-term|does not show long-term/);
  });

  it('literature is attributed as external, not "Shared Blood found" (spec §19)', () => {
    const lit = find('rf-literature-context');
    expect(lit.evidenceType).toBe('LITERATURE_SOURCE');
    expect(lit.interpretation.doesNotShow.en.toLowerCase()).toMatch(/external published literature|not a shared blood original/);
    for (const id of lit.referenceIds) expect(getResearchReference(id)).not.toBeNull();
  });

  it('mixed evidence keeps ≥2 sources and makes no national crisis claim (spec §20/§21)', () => {
    const m = find('rf-mixed');
    const categories = [m.sourceSurveyFindingIds, m.sourceFieldObservationIds].filter((a) => a.length > 0);
    expect(categories.length).toBeGreaterThanOrEqual(2);
    // Scan only the ASSERTIVE fields — the doesNotShow deliberately disclaims a
    // "national crisis" claim, which must not trip this boundary check.
    const assertive = `${m.interpretation.observedResult.en} ${m.interpretation.approvedInterpretation.en} ${m.summary.en}`.toLowerCase();
    expect(assertive).not.toMatch(/crisis|national emergency|epidemic/);
  });

  it('supports an INCONCLUSIVE outcome (spec §25)', () => {
    expect(find('rf-consanguinity-comparison').conclusionStatus).toBe('INCONCLUSIVE');
    expect(find('rf-consanguinity-comparison').interpretation.approvedInterpretation.en.toLowerCase())
      .toMatch(/insufficient|not .*clear conclusion/);
  });

  it('statistics preserve structured values with valid denominators (spec §26/§28)', () => {
    for (const f of ds.findings) {
      if (f.statistic) {
        expect(isStatisticConsistent(f.statistic)).toBe(true);
        if (typeof f.statistic.numerator === 'number') {
          expect(f.statistic.denominator).toBeGreaterThan(0);
        }
      }
    }
  });

  it('uses non-stigmatizing consanguinity language (spec §42)', () => {
    const banned = /bad marriages|dangerous families|genetically damaged|inbred|backward practice|defective bloodline/;
    const groups = ds.comparisonFindings
      .flatMap((c) => [c.comparisonGroupA.en, c.comparisonGroupB.en])
      .join(' ')
      .toLowerCase();
    expect(allText).not.toMatch(banned);
    expect(groups).not.toMatch(banned);
    expect(groups).toMatch(/reporting parental consanguinity/);
  });

  it('does not infer disease prevalence from awareness or fieldwork (spec §43/§77)', () => {
    const surveyOrField = ds.findings.filter((f) =>
      ['SURVEY_DATA', 'FIELDWORK_METRIC', 'FIELD_OBSERVATION'].includes(f.evidenceType),
    );
    for (const f of surveyOrField) {
      expect(`${f.summary.en} ${f.interpretation.approvedInterpretation.en}`.toLowerCase()).not.toMatch(/prevalence|how common the (disease|condition) is/);
    }
  });

  it('uses no inaccurate peer-reviewed / clinical / national publication labels (spec §84)', () => {
    const labels = ds.reports.map((r) => `${r.title.en} ${r.subtitle.en}`).join(' ').toLowerCase();
    expect(labels).not.toMatch(/peer[- ]reviewed|clinical study|national study|scientific publication/);
  });

  it('keeps internal Shared Blood sources distinct from external literature (spec §87)', () => {
    for (const s of ds.internalSources) {
      expect(s.moduleId).toBeTruthy();
      expect(s.datasetVersion).toBeTruthy();
      // An internal source id is never one of the external reference ids.
      expect(getResearchReference(s.datasetId)).toBeNull();
    }
  });

  it('preserves Module 16/17 evidence classification distinctly (spec §13/§97/§113)', () => {
    expect(find('rf-fieldwork-reach').evidenceType).toBe('FIELDWORK_METRIC');
    expect(find('rf-community-question').evidenceType).toBe('FIELD_OBSERVATION');
    // A fieldwork metric describes project activity, not the population (spec §14).
    expect(find('rf-fieldwork-reach').interpretation.doesNotShow.en.toLowerCase())
      .toMatch(/documented shared blood activities|not describe the general population/);
  });
});
