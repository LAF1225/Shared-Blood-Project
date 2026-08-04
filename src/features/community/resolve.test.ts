import { describe, it, expect } from 'vitest';
import { SAMPLE_DATASET, SAMPLE_FINDINGS } from './preview/sampleDataset';
import {
  resolvePublicActivities,
  resolvePublicActivity,
  getPublicActivityById,
  getFeaturedActivities,
  filterActivities,
  getRenderableFindings,
  getRenderableFieldLearnings,
  getPublicEvidenceAssets,
  getPublicPartners,
} from './resolve';

describe('community public-record resolution (spec §12/§39)', () => {
  it('resolves only approved, publicly displayable activities', () => {
    const ids = resolvePublicActivities(SAMPLE_DATASET).map((a) => a.id);
    expect(ids).toContain('activity-childcare-training-1');
    expect(ids).not.toContain('activity-planned-workshop');
    expect(ids).not.toContain('activity-under-review');
  });

  it('never copies internal notes into the public record (spec §35/§39)', () => {
    const pub = getPublicActivityById(SAMPLE_DATASET, 'activity-childcare-training-1')!;
    expect(pub).not.toHaveProperty('activityMethod');
    expect(pub).not.toHaveProperty('createdAt');
    expect(pub).not.toHaveProperty('fieldObservationIds');
    // The approved public method summary IS present.
    expect(pub.activityMethodSummary.en).toBeTruthy();
  });

  it('shows estimated attendance approximately, exact counts exactly (spec §14)', () => {
    const est = getPublicActivityById(SAMPLE_DATASET, 'activity-awareness-session-1')!; // ESTIMATED
    const exact = getPublicActivityById(SAMPLE_DATASET, 'activity-childcare-training-1')!; // SIGN_IN
    expect(est.participantCountDisplay.en).toMatch(/about 40/);
    expect(exact.participantCountDisplay.en).toBe('24');
  });

  it('returns null when resolving a non-approved activity', () => {
    const planned = SAMPLE_DATASET.activityRecords.find((a) => a.id === 'activity-planned-workshop')!;
    expect(resolvePublicActivity(planned, SAMPLE_DATASET)).toBeNull();
  });

  it('orders featured activities by featuredOrder (spec §37)', () => {
    const featured = getFeaturedActivities(resolvePublicActivities(SAMPLE_DATASET));
    expect(featured.map((a) => a.id)).toEqual([
      'activity-childcare-training-1',
      'activity-awareness-session-1',
    ]);
  });

  it('filters by type / city / year (spec §37)', () => {
    const all = resolvePublicActivities(SAMPLE_DATASET);
    expect(filterActivities(all, { city: 'KARACHI' }).map((a) => a.id)).toEqual([
      'activity-booklet-distribution-1',
    ]);
    expect(filterActivities(all, { type: 'TRAINING_SESSION' }).map((a) => a.id)).toEqual([
      'activity-childcare-training-1',
    ]);
    expect(filterActivities(all, { year: '2026' })).toHaveLength(3);
  });

  it('renders only approved findings, sorted by displayOrder (spec §44)', () => {
    const rendered = getRenderableFindings(SAMPLE_FINDINGS);
    expect(rendered.every((f) => f.reviewStatus === 'APPROVED_FOR_PUBLICATION')).toBe(true);
    expect(rendered.map((f) => f.id)).not.toContain('finding-draft-example');
    expect(rendered.map((f) => f.displayOrder)).toEqual([...rendered.map((f) => f.displayOrder)].sort((a, b) => a - b));
  });

  it('withholds a medical field learning that has not passed scientific review (spec §24)', () => {
    const learnings = getRenderableFieldLearnings(SAMPLE_DATASET).map((l) => l.id);
    expect(learnings).toContain('learning-urdu-booklet');
    expect(learnings).toContain('learning-booklet-symptoms'); // medical, but reviewed
    expect(learnings).not.toContain('learning-medical-unreviewed'); // medical, unreviewed
    expect(learnings).not.toContain('learning-draft');
  });

  it('drops evidence assets containing a minor / identifiable person (spec §30)', () => {
    const evidence = getPublicEvidenceAssets(SAMPLE_DATASET, 'activity-childcare-training-1').map((e) => e.id);
    expect(evidence).toContain('evidence-1');
    expect(evidence).not.toContain('evidence-2'); // contains a minor
  });

  it('shows only partners approved for public display (spec §32)', () => {
    const partners = getPublicPartners(SAMPLE_DATASET).map((p) => p.id);
    expect(partners).toContain('partner-sample-1');
    expect(partners).not.toContain('partner-sample-2'); // awaiting approval
  });
});
