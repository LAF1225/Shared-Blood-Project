import './serverOnly';
import { STORY_RECORDS } from '../data/stories';
import { getConsentForStory } from './consent';
import {
  resolveByDisease,
  resolveByDiseaseAndSubtype,
  resolveById,
  diseasesWithStories,
} from '../resolve';
import type { PublicStory, StoryDiseaseId } from '../types';

/**
 * Server-side Story Resolver binding (Module 12 §15/§52). Binds the pure
 * resolution pipeline to the production dataset and the PRIVATE consent store.
 *
 * This module is server-only (spec §63): it must be called from server
 * components (e.g. the disease route) and never imported by a client component.
 * It returns already-sanitized `PublicStory` objects — no consent, no
 * publication status, no private identity data crosses to the client.
 */

/** getStoriesByDisease(diseaseId) — only PUBLISHED, consent-cleared stories. */
export function getStoriesByDisease(diseaseId: string): PublicStory[] {
  return resolveByDisease(STORY_RECORDS, getConsentForStory, diseaseId);
}

/** getStoriesByDiseaseAndSubtype(diseaseId, diseaseSubtypeId). */
export function getStoriesByDiseaseAndSubtype(
  diseaseId: string,
  diseaseSubtypeId: string,
): PublicStory[] {
  return resolveByDiseaseAndSubtype(STORY_RECORDS, getConsentForStory, diseaseId, diseaseSubtypeId);
}

/** getStoryById(storyId). */
export function getStoryById(storyId: string): PublicStory | null {
  return resolveById(STORY_RECORDS, getConsentForStory, storyId);
}

/** Set of diseases that currently have any publicly resolvable story. */
export function getDiseasesWithStories(): Set<StoryDiseaseId> {
  return diseasesWithStories(STORY_RECORDS, getConsentForStory);
}
