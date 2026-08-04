import { describe, it, expect } from 'vitest';
import { SAMPLE_DATASET } from './preview/sampleDataset';
import { PUBLIC_DATASET } from './data/dataset';
import {
  getActivityErrors,
  getTrainingErrors,
  getEvidenceErrors,
  getDatasetErrors,
  isValidDataset,
  getRenderableDataset,
} from './validate';
import type { FieldActivityRecord, FieldEvidenceAsset, TrainingActivityMetric } from './types';

const activity = (over: Partial<FieldActivityRecord> = {}): FieldActivityRecord => ({
  ...SAMPLE_DATASET.activityRecords[0],
  ...over,
});

describe('community validation (spec §40)', () => {
  it('the sample dataset is valid', () => {
    expect(getDatasetErrors(SAMPLE_DATASET)).toEqual([]);
    expect(isValidDataset(SAMPLE_DATASET)).toBe(true);
  });

  it('rejects a negative participant count (never silently repaired, spec §40)', () => {
    expect(getActivityErrors(activity({ participantCount: -1 }))).toContain('participantCount must be >= 0');
  });

  it('requires an exact resource version for every referenced resource (spec §9)', () => {
    const bad = activity({ educationalResourceIds: ['resource-x'], resourceVersions: {} });
    expect(getActivityErrors(bad)).toContain('missing resourceVersion for resource-x');
  });

  it('rejects completedParticipantCount greater than participantCount (spec §40)', () => {
    const tr: TrainingActivityMetric = {
      ...SAMPLE_DATASET.trainingMetrics[0],
      participantCount: 10,
      completedParticipantCount: 12,
    };
    expect(getTrainingErrors(tr)).toContain('completedParticipantCount exceeds participantCount');
  });

  it('requires a completion definition for structured training (spec §17)', () => {
    const tr = { ...SAMPLE_DATASET.trainingMetrics[0], completionDefinition: { en: '', ur: '' } };
    expect(getTrainingErrors(tr)).toContain('missing completionDefinition');
  });

  it('blocks public display of an asset containing a minor (spec §30)', () => {
    const asset: FieldEvidenceAsset = {
      ...SAMPLE_DATASET.evidenceAssets[0],
      containsMinor: true,
      publicDisplayAllowed: true,
    };
    expect(getEvidenceErrors(asset)).toContain('minor asset must not be publicly displayable (spec §30)');
  });

  it('flags an impact summary that does not match the records (spec §27/§41)', () => {
    const tampered = {
      ...SAMPLE_DATASET,
      impactSummary: { ...SAMPLE_DATASET.impactSummary, recordedParticipantCount: 9999 },
    };
    expect(getDatasetErrors(tampered)).toContain('impactSummary does not match approved records');
    expect(isValidDataset(tampered)).toBe(false);
  });

  it('detects a duplicate activity id (spec §41)', () => {
    const dup = {
      ...SAMPLE_DATASET,
      activityRecords: [...SAMPLE_DATASET.activityRecords, SAMPLE_DATASET.activityRecords[0]],
    };
    expect(getDatasetErrors(dup).some((e) => e.startsWith('duplicate activityId'))).toBe(true);
  });

  it('getRenderableDataset returns null for the empty production dataset', () => {
    expect(getRenderableDataset(PUBLIC_DATASET)).toBeNull();
  });
});
