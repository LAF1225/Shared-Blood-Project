import './serverOnly';
import type { StoryConsentRecord } from '../consentTypes';

/**
 * PRIVATE consent administration (Module 12 §17/§63/§64).
 *
 * These records are the private governance side of the system and must never be
 * exposed through the public client bundle — this module is server-only. Public
 * story metadata (`data/stories.ts`) and this private consent store are
 * conceptually separate (spec §63). Consent forms, signatures, and contact
 * details are never modeled here or shipped (spec §64).
 *
 * Empty for Version 1: production stories are curated offline (see
 * `data/stories.ts`). Each published story that requires consent (spec §17)
 * gets a CONFIRMED record here with explicit publication permissions.
 */
const STORY_CONSENT_RECORDS: readonly StoryConsentRecord[] = [];

export function getConsentForStory(storyId: string): StoryConsentRecord | null {
  return STORY_CONSENT_RECORDS.find((record) => record.storyId === storyId) ?? null;
}
