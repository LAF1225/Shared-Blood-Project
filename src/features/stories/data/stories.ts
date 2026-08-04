import type { StoryRecord } from '../types';

/**
 * Production Stories & Perspectives dataset (Module 12).
 *
 * Intentionally EMPTY for Version 1. Real stories are collected OFFLINE and
 * curated through the content-review and consent workflow (spec §20/§65) — the
 * website never collects them (no uploads/recording, spec §20/§74). We do not
 * fabricate patient, family, or professional accounts or their audio; doing so
 * would violate the platform's scientific-accuracy and respect guardrails and
 * the "never fabricate a story" rule (spec §39).
 *
 * Until curated stories are added here, disease pages simply omit the Stories &
 * Perspectives section (the supported empty state, spec §39). The full system —
 * resolver, validation, consent, and the audio/transcript UI — is exercised by
 * the unit tests and the dev-only preview (`/diseases/stories-preview`).
 *
 * Adding a real story = append a validated `StoryRecord` here plus its private
 * consent record in `server/consent.ts`. No component changes are required.
 */
export const STORY_RECORDS: readonly StoryRecord[] = [];
