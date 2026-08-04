import { describe, it, expect } from 'vitest';
import { PUBLIC_DATASET, PUBLIC_FINDINGS } from './data/dataset';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from './preview/sampleDataset';
import { getCommunityReference } from './data/references';
import { resolvePublicActivities, getRenderableFindings } from './resolve';
import { isValidDataset } from './validate';
import type { ImpactMetricCode } from './types';

/**
 * Fieldwork integrity + cross-module boundary tests (spec §49/§50). These encode
 * the guardrails that keep Module 17 community education documentation rather than
 * beneficiary surveillance, child/patient records, or unsupported impact claims.
 */
describe('community fieldwork boundaries (spec §49/§50)', () => {
  it('production public data is EMPTY — no fabricated proof of work (spec §48/§55)', () => {
    expect(PUBLIC_DATASET).toBeNull();
    expect(PUBLIC_FINDINGS).toHaveLength(0);
  });

  it('the sample dataset validates (internally consistent, spec §40)', () => {
    expect(isValidDataset(SAMPLE_DATASET)).toBe(true);
  });

  it('public activity records carry no participant/child/medical/internal fields (spec §35/§55)', () => {
    const forbidden = [
      'participantNames',
      'participants',
      'contacts',
      'medicalRecords',
      'childProfiles',
      'attendanceSheet',
      'activityMethod',
      'internalNotes',
      'assessmentAnswers',
    ];
    for (const rec of resolvePublicActivities(SAMPLE_DATASET)) {
      for (const key of forbidden) expect(rec).not.toHaveProperty(key);
    }
  });

  it('no "lives saved / diseases prevented / misdiagnoses prevented" metric exists (spec §26)', () => {
    const allowed: ImpactMetricCode[] = [
      'DOCUMENTED_ACTIVITIES',
      'RECORDED_PARTICIPANTS',
      'CHILDCARE_WORKERS_REACHED',
      'STRUCTURED_TRAINING_COMPLETIONS',
      'LEARNING_BOOKLETS_DISTRIBUTED',
      'EDUCATIONAL_RESOURCES_DISTRIBUTED',
      'CITIES_WITH_COMPLETED_ACTIVITIES',
      'PARTNER_SUPPORTED_ACTIVITIES',
      'PRE_POST_ASSESSMENT_ACTIVITIES',
      'IMMEDIATE_KNOWLEDGE_CHANGE',
    ];
    for (const def of SAMPLE_DATASET.impactMetricDefinitions) {
      expect(allowed).toContain(def.metricCode);
    }
    const text = SAMPLE_DATASET.impactMetricDefinitions
      .flatMap((d) => [d.title.en, d.description.en])
      .join(' ')
      .toLowerCase();
    expect(text).not.toMatch(/lives saved|lives changed|diseases? prevented|misdiagnos|families protected|future children/);
  });

  it('booklets distributed are never equated with people educated (spec §16/§42)', () => {
    const bookletFinding = SAMPLE_FINDINGS.find((f) => f.id === 'finding-booklet-distribution')!;
    expect(bookletFinding.limitationNote?.en.toLowerCase()).toMatch(/not represent people educated|resource count/);
  });

  it('participant metric is described as recorded, not "unique" without dedup (spec §15)', () => {
    const def = SAMPLE_DATASET.impactMetricDefinitions.find((d) => d.metricCode === 'RECORDED_PARTICIPANTS')!;
    // The metric explicitly disclaims the "unique" framing rather than claiming it.
    expect(def.description.en.toLowerCase()).toMatch(/not "unique people reached"|not unique/);
  });

  it('immediate knowledge change is not framed as long-term retention (spec §18)', () => {
    const cmp = SAMPLE_DATASET.learningComparisons[0];
    expect(cmp.limitationNote.en.toLowerCase()).toMatch(/immediate|not (evidence of )?long-term/);
    expect(cmp.comparisonMethod).toBe('UNPAIRED_AGGREGATE');
  });

  it('field observations stay contextual, not population claims (spec §22)', () => {
    const q = SAMPLE_FINDINGS.find((f) => f.id === 'finding-community-question')!;
    const text = `${q.findingText.en} ${q.interpretation?.en} ${q.limitationNote?.en}`.toLowerCase();
    expect(text).toMatch(/one (training )?session|contextual|not a (measurement|population)|single activity/);
    expect(text).not.toMatch(/pakistanis (think|know)|people across pakistan|most families in/);
  });

  it('fieldwork locations are never framed as disease epicentres (spec §34/§38)', () => {
    const haystack = [
      SAMPLE_DATASET.methodology.en,
      ...SAMPLE_DATASET.methodologyLimitations.map((l) => l.en),
    ].join(' ').toLowerCase();
    expect(haystack).not.toMatch(/epicent|high-risk (community|area)|hotspot/);
  });

  it('estimated attendance is displayed approximately (spec §14)', () => {
    const est = resolvePublicActivities(SAMPLE_DATASET).find((a) => a.id === 'activity-awareness-session-1')!;
    expect(est.participantCountDisplay.en).toMatch(/about/);
  });

  it('PRIDEA / partner activity is not automatically merged as a Shared Blood training (spec §33/§42)', () => {
    const dist = SAMPLE_DATASET.activityRecords.find((a) => a.id === 'activity-booklet-distribution-1')!;
    expect(dist.programAssociation?.en.toLowerCase()).toMatch(/did not deliver a training|provided the educational material/);
    // A pure distribution has no training completions attributed to it.
    const hasTraining = SAMPLE_DATASET.trainingMetrics.some((t) => t.fieldActivityId === dist.id);
    expect(hasTraining).toBe(false);
  });

  it('only approved findings are ever resolved for display (spec §44)', () => {
    expect(getRenderableFindings(SAMPLE_FINDINGS).every((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')).toBe(true);
  });

  it('educational resource references resolve to real sources (spec §45/§50)', () => {
    for (const r of SAMPLE_DATASET.resourceRecords) {
      for (const id of r.referenceIds) expect(getCommunityReference(id)).not.toBeNull();
    }
  });

  it('childcare education uses recognise/seek-evaluation, never diagnose (spec §7)', () => {
    const training = SAMPLE_DATASET.activityRecords.find((a) => a.id === 'activity-childcare-training-1')!;
    const text = training.activitySummary.en.toLowerCase();
    expect(text).toMatch(/recognise|seek .*medical evaluation/);
    expect(text).not.toMatch(/diagnose the (infant|child|disease)|confirm the disorder/);
  });
});
