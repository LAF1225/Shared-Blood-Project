import type { StoryConsentRecord } from './consentTypes';
import type {
  PublicStory,
  PublicStoryIdentity,
  StoryDiseaseId,
  StoryPerspectiveGroup,
  StoryRecord,
  StoryType,
  SpeakerIdentityMode,
  PublicationStatus,
  AudioFormat,
  AudioLanguage,
} from './types';

/**
 * Story validation + sanitization (Module 12). Pure and framework-free so the
 * publication, consent, and identity rules are independently unit-testable from
 * React (spec §70). No React, no server data, no side effects.
 */

const DISEASE_IDS: readonly StoryDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

const STORY_TYPES: readonly StoryType[] = [
  'PATIENT_PERSPECTIVE',
  'PARENT_PERSPECTIVE',
  'CAREGIVER_PERSPECTIVE',
  'DOCTOR_PERSPECTIVE',
  'GENETIC_COUNSELLOR_PERSPECTIVE',
  'RESEARCHER_PERSPECTIVE',
  'CHILD_CARE_WORKER_PERSPECTIVE',
];

const IDENTITY_MODES: readonly SpeakerIdentityMode[] = [
  'NAMED',
  'FIRST_NAME_ONLY',
  'PSEUDONYM',
  'ANONYMOUS',
  'ROLE_ONLY',
];

const PUBLICATION_STATUSES: readonly PublicationStatus[] = [
  'DRAFT',
  'UNDER_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'ARCHIVED',
];

const AUDIO_FORMATS: readonly AudioFormat[] = ['mp3', 'm4a'];
const AUDIO_LANGUAGES: readonly AudioLanguage[] = ['en', 'ur', 'mixed'];

const PERSONAL_STORY_TYPES: readonly StoryType[] = [
  'PATIENT_PERSPECTIVE',
  'PARENT_PERSPECTIVE',
  'CAREGIVER_PERSPECTIVE',
];

/** Identity modes that publish a personal identifier (spec §8). */
const IDENTIFIABLE_MODES: readonly SpeakerIdentityMode[] = ['NAMED', 'FIRST_NAME_ONLY'];

/** Identity modes that publish a name value at all (spec §8). */
const NAME_BEARING_MODES: readonly SpeakerIdentityMode[] = [
  'NAMED',
  'FIRST_NAME_ONLY',
  'PSEUDONYM',
];

export function isProfessionalStory(type: StoryType): boolean {
  return !PERSONAL_STORY_TYPES.includes(type);
}

/**
 * Which stories need an associated consent record (spec §17): every patient,
 * parent, or caregiver story, and any *personally identifiable* professional
 * story. A ROLE_ONLY / ANONYMOUS professional reflection needs no personal
 * consent record.
 */
export function requiresConsent(story: Pick<StoryRecord, 'storyType' | 'speakerIdentityMode'>): boolean {
  if (PERSONAL_STORY_TYPES.includes(story.storyType)) return true;
  return isProfessionalStory(story.storyType) && IDENTIFIABLE_MODES.includes(story.speakerIdentityMode);
}

/**
 * Structural validation (spec §56). Returns the list of problems; empty = valid.
 * Invalid stories must not render (spec §56).
 */
export function getStoryErrors(story: StoryRecord): string[] {
  const errors: string[] = [];

  if (!story.id?.trim()) errors.push('missing id');
  if (!DISEASE_IDS.includes(story.diseaseId)) errors.push('invalid diseaseId');
  if (!STORY_TYPES.includes(story.storyType)) errors.push('invalid storyType');
  if (!IDENTITY_MODES.includes(story.speakerIdentityMode)) errors.push('invalid identityMode');
  if (!AUDIO_LANGUAGES.includes(story.language)) errors.push('invalid language');
  if (!PUBLICATION_STATUSES.includes(story.publicationStatus)) errors.push('invalid publicationStatus');
  if (typeof story.displayOrder !== 'number' || Number.isNaN(story.displayOrder))
    errors.push('invalid displayOrder');

  // Speaker display rules (spec §8/§9).
  if (NAME_BEARING_MODES.includes(story.speakerIdentityMode)) {
    if (!story.speakerDisplayName?.trim()) errors.push('identity mode requires speakerDisplayName');
  } else if (story.speakerDisplayName?.trim()) {
    // ANONYMOUS / ROLE_ONLY must not carry a display name (spec §9).
    errors.push('anonymous/role-only must not include speakerDisplayName');
  }

  // Audio asset + format (spec §21/§56).
  if (story.audioAsset) {
    if (!story.audioAsset.src?.trim()) errors.push('audioAsset missing src');
    if (!AUDIO_FORMATS.includes(story.audioAsset.format)) errors.push('unsupported audioFormat');
  }

  // Positive duration where provided (spec §56).
  if (story.durationSeconds != null && (!Number.isFinite(story.durationSeconds) || story.durationSeconds <= 0))
    errors.push('invalid durationSeconds');

  // Transcript required (spec §24).
  if (!story.transcript?.text?.trim()) errors.push('missing transcript');

  return errors;
}

export function isStructurallyValid(story: StoryRecord): boolean {
  return getStoryErrors(story).length === 0;
}

/**
 * Public resolvability (spec §57): PUBLISHED + valid audio + transcript, and —
 * where consent is required — CONFIRMED consent with audio & transcript
 * publication permission. A WITHDRAWN consent stops public resolution (§18/§58).
 */
export function isPubliclyResolvable(
  story: StoryRecord,
  consent: StoryConsentRecord | null,
): boolean {
  if (!isStructurallyValid(story)) return false;
  if (story.publicationStatus !== 'PUBLISHED') return false;
  // An audio story needs a valid audio asset and a transcript (spec §57).
  if (!story.audioAsset?.src?.trim()) return false;
  if (!story.transcript?.text?.trim()) return false;

  if (requiresConsent(story)) {
    if (!consent) return false;
    if (consent.consentStatus !== 'CONFIRMED') return false; // covers WITHDRAWN & PENDING (§18/§58)
    if (!consent.audioPublicationPermission) return false;
    if (!consent.transcriptPublicationPermission) return false;
  }
  return true;
}

/**
 * Featured-story conflicts (spec §41): at most one featured story per disease.
 * Returns the disease ids that have more than one featured (published) story.
 */
export function getFeaturedConflicts(stories: readonly StoryRecord[]): StoryDiseaseId[] {
  const counts = new Map<StoryDiseaseId, number>();
  for (const story of stories) {
    if (!story.isFeatured) continue;
    counts.set(story.diseaseId, (counts.get(story.diseaseId) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, n]) => n > 1).map(([id]) => id);
}

/**
 * Sanitize a story into its public projection (spec §8/§9/§63): apply the
 * identity mode and drop every private field. Returns null if there is no audio
 * asset (an audio story must have one to render, §54/§57).
 */
export function toPublicStory(story: StoryRecord): PublicStory | null {
  if (!story.audioAsset) return null;

  const identity: PublicStoryIdentity = {
    storyType: story.storyType,
    identityMode: story.speakerIdentityMode,
  };
  if (NAME_BEARING_MODES.includes(story.speakerIdentityMode) && story.speakerDisplayName) {
    identity.displayName = story.speakerDisplayName;
    identity.isPseudonym = story.speakerIdentityMode === 'PSEUDONYM';
  }
  if (story.speakerRole) identity.roleLabel = story.speakerRole;

  return {
    id: story.id,
    title: story.title,
    diseaseId: story.diseaseId,
    diseaseSubtypeId: story.diseaseSubtypeId ?? undefined,
    storyType: story.storyType,
    identity,
    context: story.speakerContext ?? undefined,
    audioLanguage: story.language,
    audio: {
      src: story.audioAsset.src,
      format: story.audioAsset.format,
      durationSeconds: story.durationSeconds ?? undefined,
    },
    transcript: story.transcript,
    translatedTranscript: story.translatedTranscript ?? undefined,
    summary: story.summary,
    contentNotices: story.contentNotices ?? [],
    memorialContext: story.memorialContext ?? false,
    isFeatured: story.isFeatured ?? false,
    displayOrder: story.displayOrder,
  };
}

/** Map a story type to its selector group (spec §42). */
export function perspectiveGroupOf(type: StoryType): Exclude<StoryPerspectiveGroup, 'all'> {
  if (type === 'PATIENT_PERSPECTIVE') return 'patients';
  if (type === 'PARENT_PERSPECTIVE' || type === 'CAREGIVER_PERSPECTIVE') return 'parents-caregivers';
  return 'professionals';
}

export function matchesPerspectiveGroup(type: StoryType, group: StoryPerspectiveGroup): boolean {
  return group === 'all' || perspectiveGroupOf(type) === group;
}
