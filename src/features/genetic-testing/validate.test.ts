import { describe, it, expect } from 'vitest';
import {
  getTopicErrors,
  isValidTopic,
  getValidTopics,
  getResultConceptErrors,
  getValidResultConcepts,
} from './validate';
import { ALL_TESTING_TOPICS } from './data/topics';
import { RESULT_CONCEPTS } from './data/resultConcepts';
import type { GeneticTestingTopicRecord } from './types';

const base: GeneticTestingTopicRecord = ALL_TESTING_TOPICS[0];

describe('Topic validation (spec §85)', () => {
  it('every shipped topic is valid', () => {
    for (const topic of ALL_TESTING_TOPICS) {
      expect(getTopicErrors(topic)).toEqual([]);
    }
  });

  it('a topic with no reference fails (spec §71)', () => {
    expect(isValidTopic({ ...base, referenceIds: [] })).toBe(false);
  });

  it('a topic with an unknown reference fails', () => {
    expect(getTopicErrors({ ...base, referenceIds: ['nope'] })).toContain('unknown reference');
  });

  it('a topic missing a required educational field fails', () => {
    expect(getTopicErrors({ ...base, whatItCannotTellYou: { en: '', ur: '' } })).toContain('missing whatItCannotTellYou');
  });

  it('getValidTopics removes invalid and de-duplicates', () => {
    const broken = { ...base, id: 'broken', referenceIds: [] };
    const valid = getValidTopics([base, { ...base }, broken]);
    expect(valid).toHaveLength(1);
  });
});

describe('Result-concept validation (spec §85)', () => {
  it('every shipped result concept is valid', () => {
    for (const concept of RESULT_CONCEPTS) {
      expect(getResultConceptErrors(concept)).toEqual([]);
    }
  });

  it('a result concept with no reference fails', () => {
    const concept = RESULT_CONCEPTS[0];
    expect(getResultConceptErrors({ ...concept, referenceIds: [] })).toContain('missing reference');
  });

  it('getValidResultConcepts keeps all valid concepts', () => {
    expect(getValidResultConcepts(RESULT_CONCEPTS)).toHaveLength(RESULT_CONCEPTS.length);
  });
});
