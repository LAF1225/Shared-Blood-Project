import type {
  AudienceContext,
  GeneticTestingDiseaseId,
  GeneticTestingFilters,
  GeneticTestingTopicRecord,
  LifeStageContext,
  TestingCategory,
} from './types';

/**
 * The single genetic-testing education pipeline (spec §77):
 *
 *   Local records → Validation → Context filter (life stage + audience) →
 *   Testing-category filter → Disease-association filter → Local search →
 *   Rendered education
 *
 * Pure and framework-free so filtering is independently testable from the
 * presentation (spec §88). Unlike the disease-first tools (Modules 13/14), this
 * is an education library: with no filters it shows ALL valid topics. Selecting a
 * context NEVER infers personal risk (spec §17) — it only narrows which curated
 * records are shown. Nothing here scores, ranks, matches, or recommends
 * (spec §2/§13/§70); search is simple text matching only (spec §67/§68).
 */

export const DEFAULT_TESTING_FILTERS: GeneticTestingFilters = {
  lifeStage: 'all',
  audience: 'all',
  category: 'all',
  disease: 'all',
  query: '',
};

/** Apply context → category → disease → search, in that fixed order (spec §77). */
export function filterTopics(
  topics: readonly GeneticTestingTopicRecord[],
  filters: GeneticTestingFilters,
): GeneticTestingTopicRecord[] {
  const query = filters.query.trim().toLowerCase();
  return topics
    .filter((topic) => {
      if (filters.lifeStage !== 'all' && !topic.lifeStageContexts.includes(filters.lifeStage))
        return false;
      if (filters.audience !== 'all' && !topic.audienceContexts.includes(filters.audience))
        return false;
      if (filters.category !== 'all' && topic.testingCategory !== filters.category) return false;
      if (filters.disease !== 'all' && !topic.relatedDiseaseIds.includes(filters.disease)) return false;
      if (query && !matchesQuery(topic, query)) return false;
      return true;
    })
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Testing categories represented across a set of topics (spec §82 — no empty options). */
export function representedCategories(
  topics: readonly GeneticTestingTopicRecord[],
): TestingCategory[] {
  const present = new Set<TestingCategory>();
  for (const topic of topics) present.add(topic.testingCategory);
  return [...present];
}

/** Life stages represented across a set of topics (spec §15). */
export function representedLifeStages(
  topics: readonly GeneticTestingTopicRecord[],
): LifeStageContext[] {
  const present = new Set<LifeStageContext>();
  for (const topic of topics) for (const stage of topic.lifeStageContexts) present.add(stage);
  return [...present];
}

/** Audience contexts represented across a set of topics (spec §14). */
export function representedAudiences(
  topics: readonly GeneticTestingTopicRecord[],
): AudienceContext[] {
  const present = new Set<AudienceContext>();
  for (const topic of topics) for (const audience of topic.audienceContexts) present.add(audience);
  return [...present];
}

/** Diseases represented across a set of topics (spec §88). */
export function representedDiseases(
  topics: readonly GeneticTestingTopicRecord[],
): GeneticTestingDiseaseId[] {
  const present = new Set<GeneticTestingDiseaseId>();
  for (const topic of topics) for (const disease of topic.relatedDiseaseIds) present.add(disease);
  return [...present];
}

function matchesQuery(topic: GeneticTestingTopicRecord, query: string): boolean {
  // Simple text match across title, short description, and category (spec §67).
  // A narrative query returns curated records — it is never interpreted (spec §68).
  const haystack = [
    topic.title.en,
    topic.title.ur,
    topic.shortDescription.en,
    topic.shortDescription.ur,
    topic.testingCategory,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}
