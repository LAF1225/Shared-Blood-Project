/**
 * Consent record TYPES (Module 12 §17/§19). Types only — safe to import
 * anywhere. The actual consent DATA lives in `server/consent.ts` and must never
 * be bundled into the public client (spec §63/§64).
 */

/** Consent lifecycle (spec §18). */
export type ConsentStatus = 'PENDING' | 'CONFIRMED' | 'WITHDRAWN';

/**
 * Granular consent scope (spec §19). Permission to *record* never implies
 * permission to *publish* — each is tracked explicitly.
 */
export interface StoryConsentScope {
  audioPublication: boolean;
  transcriptPublication: boolean;
  translation: boolean;
  speakerName: boolean;
  firstName: boolean;
  professionalTitle: boolean;
  generalLocation: boolean;
  editedExcerpts: boolean;
}

/** A private consent record (spec §17). Never exposed publicly (§63/§64). */
export interface StoryConsentRecord {
  id: string;
  storyId: string;
  consentStatus: ConsentStatus;
  consentScope: StoryConsentScope;
  identityPermission: boolean;
  audioPublicationPermission: boolean;
  transcriptPublicationPermission: boolean;
  translationPermission: boolean;
  editingPermission: boolean;
  dateRecorded: string;
  lastVerified: string;
}
