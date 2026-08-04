import { describe, it, expect } from 'vitest';
import { SAMPLE_DATASET } from './preview/sampleDataset';
import {
  calculateImpactSummary,
  impactSummaryMatches,
  eligibleActivities,
  isCompletedApproved,
} from './impact';
import type { CommunityFieldworkDataset } from './types';

/**
 * Impact calculation tests (spec §27/§41/§42). Impact is derived only from
 * approved COMPLETED records, deduplicated by id, with booklets kept separate
 * from people. Independently testable from presentation (spec §51).
 */
describe('community impact calculation', () => {
  it('only counts approved + completed activities (spec §27/§48)', () => {
    const eligible = eligibleActivities(SAMPLE_DATASET);
    const ids = eligible.map((a) => a.id);
    expect(ids).toContain('activity-childcare-training-1');
    expect(ids).toContain('activity-awareness-session-1');
    expect(ids).toContain('activity-booklet-distribution-1');
    // Planned and not-yet-approved activities are excluded.
    expect(ids).not.toContain('activity-planned-workshop');
    expect(ids).not.toContain('activity-under-review');
    expect(eligible).toHaveLength(3);
  });

  it('derives the documented totals correctly', () => {
    const s = calculateImpactSummary(SAMPLE_DATASET);
    expect(s.documentedActivityCount).toBe(3);
    expect(s.recordedParticipantCount).toBe(64); // 24 + 40 + 0
    expect(s.childcareWorkerCount).toBe(24);
    expect(s.structuredTrainingCompletionCount).toBe(22);
    expect(s.cityCount).toBe(3);
    expect(s.partnerSupportedActivityCount).toBe(2);
    expect(s.assessmentActivityCount).toBe(1);
  });

  it('keeps booklets distributed separate from participants reached (spec §16/§42)', () => {
    const s = calculateImpactSummary(SAMPLE_DATASET);
    // material-1 (24) + material-3 (60) are booklets; material-2 (30) is a guide.
    expect(s.learningBookletsDistributed).toBe(84);
    expect(s.educationalResourcesDistributed).toBe(114); // 24 + 30 + 60
    // Booklets must not be conflated with the 64 recorded participants.
    expect(s.learningBookletsDistributed).not.toBe(s.recordedParticipantCount);
  });

  it('does not double-count a duplicated activity id (spec §41)', () => {
    const dup: CommunityFieldworkDataset = {
      ...SAMPLE_DATASET,
      activityRecords: [...SAMPLE_DATASET.activityRecords, SAMPLE_DATASET.activityRecords[0]],
    };
    expect(calculateImpactSummary(dup).documentedActivityCount).toBe(3);
  });

  it('the stored sample summary matches the recomputed totals (spec §27)', () => {
    expect(impactSummaryMatches(SAMPLE_DATASET)).toBe(true);
  });

  it('isCompletedApproved requires both COMPLETED and APPROVED', () => {
    const planned = SAMPLE_DATASET.activityRecords.find((a) => a.id === 'activity-planned-workshop')!;
    const review = SAMPLE_DATASET.activityRecords.find((a) => a.id === 'activity-under-review')!;
    expect(isCompletedApproved(planned)).toBe(false);
    expect(isCompletedApproved(review)).toBe(false);
  });
});
