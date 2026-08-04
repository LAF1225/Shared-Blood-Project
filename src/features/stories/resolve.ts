import type { StoryConsentRecord } from './consentTypes';
import type { PublicStory, StoryDiseaseId, StoryRecord } from './types';
import { isPubliclyResolvable, toPublicStory } from './validation';

/**
 * Pure story resolution pipeline (Module 12 §15). Framework-free and
 * source-injectable so the resolver's rules can be unit-tested without React or
 * the server-only production data (spec §70). The server binding lives in
 * `server/resolver.ts`.
 *
 * Only publicly valid stories are ever returned (spec §15/§16/§57): PUBLISHED,
 * with valid audio + transcript, and CONFIRMED consent where required. A
 * WITHDRAWN consent removes the story on the next request (spec §58).
 */

/** Looks up the private consent record for a story id (server-provided). */
export type ConsentLookup = (storyId: string) => StoryConsentRecord | null;

/** Stable ordering: manual displayOrder, then publishedAt as a fallback (§40). */
function compareStories(a: StoryRecord, b: StoryRecord): number {
  if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
  const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
  const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
  return at - bt;
}

/** Resolve every publicly valid story, sanitized and ordered (spec §40). */
export function resolvePublicStories(
  records: readonly StoryRecord[],
  getConsent: ConsentLookup,
): PublicStory[] {
  return records
    .filter((story) => isPubliclyResolvable(story, getConsent(story.id)))
    .slice()
    .sort(compareStories)
    .map(toPublicStory)
    .filter((story): story is PublicStory => story !== null);
}

/** getStoriesByDisease (spec §15). */
export function resolveByDisease(
  records: readonly StoryRecord[],
  getConsent: ConsentLookup,
  diseaseId: string,
): PublicStory[] {
  return resolvePublicStories(
    records.filter((story) => story.diseaseId === diseaseId),
    getConsent,
  );
}

/** getStoriesByDiseaseAndSubtype (spec §15). */
export function resolveByDiseaseAndSubtype(
  records: readonly StoryRecord[],
  getConsent: ConsentLookup,
  diseaseId: string,
  diseaseSubtypeId: string,
): PublicStory[] {
  return resolveByDisease(records, getConsent, diseaseId).filter(
    (story) => story.diseaseSubtypeId === diseaseSubtypeId,
  );
}

/** getStoryById (spec §15) — only if it resolves publicly. */
export function resolveById(
  records: readonly StoryRecord[],
  getConsent: ConsentLookup,
  storyId: string,
): PublicStory | null {
  const story = records.find((record) => record.id === storyId);
  if (!story || !isPubliclyResolvable(story, getConsent(story.id))) return null;
  return toPublicStory(story);
}

/** Diseases that currently have at least one publicly resolvable story. */
export function diseasesWithStories(
  records: readonly StoryRecord[],
  getConsent: ConsentLookup,
): Set<StoryDiseaseId> {
  const set = new Set<StoryDiseaseId>();
  for (const story of records) {
    if (isPubliclyResolvable(story, getConsent(story.id))) set.add(story.diseaseId);
  }
  return set;
}
