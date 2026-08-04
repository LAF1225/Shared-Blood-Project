import { describe, it, expect } from 'vitest';
import {
  filterTopics,
  representedCategories,
  representedLifeStages,
  representedAudiences,
  representedDiseases,
  DEFAULT_TESTING_FILTERS,
} from './filter';
import { ALL_TESTING_TOPICS } from './data/topics';
import { getValidTopics } from './validate';

const TOPICS = getValidTopics(ALL_TESTING_TOPICS);

describe('Genetic-testing filter pipeline (spec §77)', () => {
  it('shows all valid topics by default (education library, not disease-gated)', () => {
    const result = filterTopics(TOPICS, DEFAULT_TESTING_FILTERS);
    expect(result.length).toBe(TOPICS.length);
    expect(result.length).toBeGreaterThan(0);
  });

  it('narrows by testing category', () => {
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, category: 'CARRIER_TESTING' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.testingCategory === 'CARRIER_TESTING')).toBe(true);
  });

  it('narrows by life-stage context', () => {
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, lifeStage: 'BEFORE_MARRIAGE' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.lifeStageContexts.includes('BEFORE_MARRIAGE'))).toBe(true);
  });

  it('narrows by audience context', () => {
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, audience: 'COUPLE' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.audienceContexts.includes('COUPLE'))).toBe(true);
  });

  it('narrows by disease association', () => {
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, disease: 'ehlers-danlos-syndrome' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.relatedDiseaseIds.includes('ehlers-danlos-syndrome'))).toBe(true);
  });

  it('search is a simple text match on title / short description / category (spec §67)', () => {
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, query: 'carrier' });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((t) =>
        `${t.title.en} ${t.shortDescription.en} ${t.testingCategory}`.toLowerCase().includes('carrier'),
      ),
    ).toBe(true);
  });

  it('a narrative query still returns curated records, never interpretation (spec §68)', () => {
    // "My sister has EDS should I get tested" → matches curated EDS records by text.
    const result = filterTopics(TOPICS, { ...DEFAULT_TESTING_FILTERS, query: 'eds' });
    expect(result.every((t) => TOPICS.includes(t))).toBe(true);
  });

  it('sorts by displayOrder', () => {
    const result = filterTopics(TOPICS, DEFAULT_TESTING_FILTERS);
    const orders = result.map((t) => t.displayOrder);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('represented* helpers reflect the actual dataset', () => {
    expect(representedCategories(TOPICS).length).toBeGreaterThan(1);
    expect(representedLifeStages(TOPICS)).toContain('BEFORE_MARRIAGE');
    expect(representedAudiences(TOPICS)).toContain('COUPLE');
    expect(representedDiseases(TOPICS).sort()).toEqual([
      'beta-thalassemia',
      'cystic-fibrosis',
      'ehlers-danlos-syndrome',
      'lysosomal-storage-disorders',
    ]);
  });
});
