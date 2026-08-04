import { describe, it, expect } from 'vitest';
import {
  requiresConsent,
  getStoryErrors,
  isStructurallyValid,
  isPubliclyResolvable,
  getFeaturedConflicts,
  toPublicStory,
  perspectiveGroupOf,
  matchesPerspectiveGroup,
} from './validation';
import type { StoryConsentRecord } from './consentTypes';
import type { StoryRecord } from './types';

const baseStory = (over: Partial<StoryRecord> = {}): StoryRecord => ({
  id: 'test-1',
  title: { en: 'A story', ur: 'ایک کہانی' },
  diseaseId: 'beta-thalassemia',
  storyType: 'PARENT_PERSPECTIVE',
  speakerDisplayName: 'Ayesha',
  speakerIdentityMode: 'FIRST_NAME_ONLY',
  language: 'en',
  audioAsset: { src: '/media/x.mp3', format: 'mp3' },
  durationSeconds: 120,
  transcript: { language: 'en', text: 'A transcript.' },
  summary: { en: 'In this story…', ur: 'اس کہانی میں…' },
  publicationStatus: 'PUBLISHED',
  displayOrder: 1,
  ...over,
});

const confirmed = (over: Partial<StoryConsentRecord> = {}): StoryConsentRecord => ({
  id: 'c1',
  storyId: 'test-1',
  consentStatus: 'CONFIRMED',
  consentScope: {
    audioPublication: true,
    transcriptPublication: true,
    translation: true,
    speakerName: false,
    firstName: true,
    professionalTitle: false,
    generalLocation: false,
    editedExcerpts: true,
  },
  identityPermission: true,
  audioPublicationPermission: true,
  transcriptPublicationPermission: true,
  translationPermission: true,
  editingPermission: true,
  dateRecorded: '2026-01-01',
  lastVerified: '2026-02-01',
  ...over,
});

describe('requiresConsent (spec §17)', () => {
  it('always requires consent for patient / parent / caregiver stories', () => {
    for (const storyType of ['PATIENT_PERSPECTIVE', 'PARENT_PERSPECTIVE', 'CAREGIVER_PERSPECTIVE'] as const) {
      expect(requiresConsent({ storyType, speakerIdentityMode: 'ANONYMOUS' })).toBe(true);
    }
  });

  it('requires consent for an identifiable professional story', () => {
    expect(requiresConsent({ storyType: 'DOCTOR_PERSPECTIVE', speakerIdentityMode: 'NAMED' })).toBe(true);
  });

  it('does not require a personal consent record for a role-only professional', () => {
    expect(requiresConsent({ storyType: 'DOCTOR_PERSPECTIVE', speakerIdentityMode: 'ROLE_ONLY' })).toBe(false);
  });
});

describe('getStoryErrors (spec §56)', () => {
  it('accepts a well-formed story', () => {
    expect(getStoryErrors(baseStory())).toEqual([]);
    expect(isStructurallyValid(baseStory())).toBe(true);
  });

  it('rejects an invalid disease id', () => {
    expect(getStoryErrors(baseStory({ diseaseId: 'nope' as never }))).toContain('invalid diseaseId');
  });

  it('rejects an anonymous story that carries a display name (spec §9)', () => {
    const story = baseStory({ speakerIdentityMode: 'ANONYMOUS', speakerDisplayName: 'Real Name' });
    expect(getStoryErrors(story)).toContain('anonymous/role-only must not include speakerDisplayName');
  });

  it('rejects a named story with no display name', () => {
    const story = baseStory({ speakerIdentityMode: 'NAMED', speakerDisplayName: '' });
    expect(getStoryErrors(story)).toContain('identity mode requires speakerDisplayName');
  });

  it('rejects a missing transcript (spec §24)', () => {
    expect(getStoryErrors(baseStory({ transcript: { language: 'en', text: '' } }))).toContain('missing transcript');
  });

  it('rejects an unsupported audio format and non-positive duration', () => {
    expect(getStoryErrors(baseStory({ audioAsset: { src: '/a.wav', format: 'wav' as never } }))).toContain('unsupported audioFormat');
    expect(getStoryErrors(baseStory({ durationSeconds: 0 }))).toContain('invalid durationSeconds');
  });
});

describe('isPubliclyResolvable (spec §57/§18/§58)', () => {
  it('resolves a PUBLISHED story with CONFIRMED consent', () => {
    expect(isPubliclyResolvable(baseStory(), confirmed())).toBe(true);
  });

  it('does not resolve a DRAFT story', () => {
    expect(isPubliclyResolvable(baseStory({ publicationStatus: 'DRAFT' }), confirmed())).toBe(false);
  });

  it('stops resolving when consent is WITHDRAWN (spec §58)', () => {
    expect(isPubliclyResolvable(baseStory(), confirmed({ consentStatus: 'WITHDRAWN' }))).toBe(false);
  });

  it('does not resolve with PENDING consent', () => {
    expect(isPubliclyResolvable(baseStory(), confirmed({ consentStatus: 'PENDING' }))).toBe(false);
  });

  it('does not resolve a consent-required story with no consent record', () => {
    expect(isPubliclyResolvable(baseStory(), null)).toBe(false);
  });

  it('does not resolve without audio or transcript publication permission', () => {
    expect(isPubliclyResolvable(baseStory(), confirmed({ audioPublicationPermission: false }))).toBe(false);
    expect(isPubliclyResolvable(baseStory(), confirmed({ transcriptPublicationPermission: false }))).toBe(false);
  });

  it('resolves a role-only professional story without any consent record', () => {
    const story = baseStory({
      storyType: 'DOCTOR_PERSPECTIVE',
      speakerIdentityMode: 'ROLE_ONLY',
      speakerDisplayName: null,
      speakerRole: { en: 'Haematologist', ur: 'ماہرِ خون' },
    });
    expect(isPubliclyResolvable(story, null)).toBe(true);
  });

  it('does not resolve a published story missing its audio asset (spec §57)', () => {
    expect(isPubliclyResolvable(baseStory({ audioAsset: null }), confirmed())).toBe(false);
  });
});

describe('getFeaturedConflicts (spec §41)', () => {
  it('flags a disease with two featured stories', () => {
    const conflicts = getFeaturedConflicts([
      baseStory({ id: 'a', isFeatured: true }),
      baseStory({ id: 'b', isFeatured: true }),
      baseStory({ id: 'c', diseaseId: 'cystic-fibrosis', isFeatured: true }),
    ]);
    expect(conflicts).toContain('beta-thalassemia');
    expect(conflicts).not.toContain('cystic-fibrosis');
  });
});

describe('toPublicStory sanitization (spec §8/§9/§63)', () => {
  it('never exposes consent or publication fields', () => {
    const pub = toPublicStory(baseStory({ consentRecordId: 'secret' }));
    expect(pub).not.toBeNull();
    expect(pub).not.toHaveProperty('consentRecordId');
    expect(pub).not.toHaveProperty('publicationStatus');
    expect(pub).not.toHaveProperty('speakerDisplayName');
  });

  it('omits the name for anonymous speakers', () => {
    const pub = toPublicStory(baseStory({ speakerIdentityMode: 'ANONYMOUS', speakerDisplayName: null }));
    expect(pub?.identity.displayName).toBeUndefined();
  });

  it('keeps the name for a first-name story and flags a pseudonym', () => {
    expect(toPublicStory(baseStory())?.identity.displayName).toBe('Ayesha');
    const pseudo = toPublicStory(baseStory({ speakerIdentityMode: 'PSEUDONYM', speakerDisplayName: 'Bilal' }));
    expect(pseudo?.identity.isPseudonym).toBe(true);
  });

  it('returns null when there is no audio asset', () => {
    expect(toPublicStory(baseStory({ audioAsset: null }))).toBeNull();
  });

  it('never carries geographic coordinates — stories are not map markers (spec §50/§51)', () => {
    const pub = toPublicStory(baseStory());
    expect(pub).not.toHaveProperty('latitude');
    expect(pub).not.toHaveProperty('longitude');
  });
});

describe('perspective grouping (spec §42)', () => {
  it('maps types to selector groups', () => {
    expect(perspectiveGroupOf('PATIENT_PERSPECTIVE')).toBe('patients');
    expect(perspectiveGroupOf('CAREGIVER_PERSPECTIVE')).toBe('parents-caregivers');
    expect(perspectiveGroupOf('RESEARCHER_PERSPECTIVE')).toBe('professionals');
  });

  it('matches the "all" group for every type', () => {
    expect(matchesPerspectiveGroup('DOCTOR_PERSPECTIVE', 'all')).toBe(true);
    expect(matchesPerspectiveGroup('DOCTOR_PERSPECTIVE', 'patients')).toBe(false);
  });
});
