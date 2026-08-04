import { describe, it, expect } from 'vitest';
import { SURVEY_QUESTIONS } from './data/questions';
import { GENETIC_LITERACY_INDICATOR } from './data/indicator';
import { getSurveyReference } from './data/references';
import { PUBLIC_DATASET, PUBLIC_FINDINGS } from './data/dataset';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from './preview/sampleDataset';
import { getRenderableFindings } from './resolve';
import { isValidDataset } from './validate';
import { SUPPRESSED } from './types';

function findingsText(): string {
  return SAMPLE_FINDINGS.flatMap((f) => [
    f.title.en, f.findingText.en, f.statistic.en, f.interpretation?.en ?? '', f.limitationNote?.en ?? '',
  ]).join(' ').toLowerCase();
}
function awarenessText(): string {
  return SAMPLE_DATASET.diseaseAwarenessAggregates.map((a) => a.publicFinding.en).join(' ').toLowerCase();
}

/**
 * Scientific / research & cross-module boundary tests (spec §70/§71). These
 * encode the guardrails that keep Module 16 aggregate public-awareness research
 * rather than individual profiling, ranking, or causal claim-making.
 */
describe('Survey research boundaries (spec §70/§71)', () => {
  it('production public data is EMPTY — no fabricated public statistics (spec §38/§45/§69)', () => {
    expect(PUBLIC_DATASET).toBeNull();
    expect(PUBLIC_FINDINGS).toHaveLength(0);
  });

  it('survey question records describe the instrument, never respondent answers (spec §9)', () => {
    const forbidden = ['answers', 'responses', 'respondentId', 'respondents', 'rawRows'];
    for (const q of SURVEY_QUESTIONS) {
      for (const key of forbidden) expect(q).not.toHaveProperty(key);
    }
  });

  it('no record carries AI / profiling / sentiment fields (spec §57)', () => {
    const forbidden = ['sentiment', 'ideology', 'profile', 'psychProfile', 'aiScore'];
    for (const rec of [...SURVEY_QUESTIONS, ...SAMPLE_FINDINGS]) {
      for (const key of forbidden) expect(rec).not.toHaveProperty(key);
    }
  });

  it('public findings use sample language, never whole-population claims (spec §27)', () => {
    const banned = /pakistanis think|pakistan believes|people in pakistan know|lahore thinks|karachi supports/;
    const text = findingsText();
    expect(text).not.toMatch(banned);
    expect(text).toMatch(/respondents surveyed|survey sample|among respondents|within the survey/);
  });

  it('uses no ranking / eugenic / "genetic IQ" language (spec §3/§17/§26)', () => {
    const banned = /genetic iq|intelligence score|city ignorance|least educated|genetic competence|genetically irresponsible/;
    const haystack = [findingsText(), GENETIC_LITERACY_INDICATOR.title.en, GENETIC_LITERACY_INDICATOR.description.en].join(' ').toLowerCase();
    expect(haystack).not.toMatch(banned);
  });

  it('the literacy indicator is aggregate-only, never an individual label (spec §17)', () => {
    const note = GENETIC_LITERACY_INDICATOR.methodologyNote.en.toLowerCase();
    expect(note).toMatch(/not applied to any individual|describe the sample|sample as a whole/);
  });

  it('self-reported awareness is not framed as medical knowledge (spec §14)', () => {
    const text = awarenessText();
    expect(text).not.toContain('medical knowledge level');
    expect(text).toMatch(/self-reported|recognition|heard|awareness/);
  });

  it('intention is kept distinct from behaviour (spec §22)', () => {
    const testing = SAMPLE_FINDINGS.find((f) => f.id === 'finding-testing-openness')!;
    expect(`${testing.findingText.en} ${testing.interpretation?.en}`.toLowerCase())
      .toMatch(/intention|not testing (uptake|behaviour)/);
  });

  it('family influence is kept distinct from coercion (spec §21)', () => {
    const fam = SAMPLE_DATASET.attitudeAggregates.find((a) => a.questionId === 'q-family-influence')!;
    expect(fam.publicFinding.en.toLowerCase()).toMatch(/influence, not coercion|not coercion/);
  });

  it('never claims low awareness CAUSES cousin-marriage support (spec §40)', () => {
    const causal = /(low )?(genetic )?awareness (causes|leads to|results in|drives)/;
    expect(findingsText()).not.toMatch(causal);
    expect(findingsText()).not.toContain('proves that');
  });

  it('every scored knowledge-check question is scientifically referenced (spec §15)', () => {
    const checks = SURVEY_QUESTIONS.filter((q) => q.questionType === 'KNOWLEDGE_CHECK');
    expect(checks.length).toBeGreaterThan(0);
    for (const q of checks) {
      expect(q.correctResponse?.trim()).toBeTruthy();
      expect(q.scientificExplanation?.en?.trim()).toBeTruthy();
      expect(Array.isArray(q.referenceIds) && q.referenceIds.length > 0).toBe(true);
      expect(q.referenceIds!.every((id) => getSurveyReference(id))).toBe(true);
    }
  });

  it('open-text / optional-comment questions are not publicly displayed by default (spec §55/§56)', () => {
    for (const q of SURVEY_QUESTIONS) {
      if (q.questionType === 'SHORT_TEXT' || q.questionType === 'OPTIONAL_COMMENT') {
        expect(q.publicDisplayAllowed).toBe(false);
      }
    }
  });

  it('PREFER_NOT_TO_SAY is offered as its own distinct option (spec §29)', () => {
    const demo = SURVEY_QUESTIONS.filter((q) => q.isDemographic);
    expect(demo.length).toBeGreaterThan(0);
    for (const q of demo) expect(q.allowedResponseValues).toContain('PREFER_NOT_TO_SAY');
  });

  it('small cells are suppressed and never recoverable (spec §42)', () => {
    // The sample includes at least one suppressed cell…
    const anySuppressed = SAMPLE_DATASET.diseaseAwarenessAggregates.some(
      (a) => a.cityBreakdown && Object.values(a.cityBreakdown).some((v) => v === SUPPRESSED),
    );
    expect(anySuppressed).toBe(true);
    // …and the dataset still validates (suppression aligned, nothing leaks).
    expect(isValidDataset(SAMPLE_DATASET)).toBe(true);
  });

  it('only approved findings are ever resolved for display (spec §44)', () => {
    const rendered = getRenderableFindings(SAMPLE_FINDINGS);
    expect(rendered.every((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')).toBe(true);
  });
});
