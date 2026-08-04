import type { LocalizedText } from '@/types';

/**
 * Stories & Perspectives Audio System — content model (Module 12).
 *
 * CORE PRINCIPLE (spec §2): stories are lived and professional *experiences* —
 * NOT medical evidence, clinical guidelines, diagnostic criteria, treatment
 * recommendations, or population statistics. Story metadata is kept technically
 * separate from disease content (§4/§7) and from the Evidence Map (§50/§51).
 *
 * This file holds only PUBLIC-safe types. Private consent administration lives
 * in `server/` and must never enter the client bundle (§63).
 */

/** Diseases a story may associate with (Disease Library slugs, spec §5). */
export type StoryDiseaseId =
  | 'beta-thalassemia'
  | 'cystic-fibrosis'
  | 'lysosomal-storage-disorders'
  | 'ehlers-danlos-syndrome';

/** Story perspective type (spec §6). Internal enum values are never displayed. */
export type StoryType =
  | 'PATIENT_PERSPECTIVE'
  | 'PARENT_PERSPECTIVE'
  | 'CAREGIVER_PERSPECTIVE'
  | 'DOCTOR_PERSPECTIVE'
  | 'GENETIC_COUNSELLOR_PERSPECTIVE'
  | 'RESEARCHER_PERSPECTIVE'
  | 'CHILD_CARE_WORKER_PERSPECTIVE';

/** How much speaker identity is published (spec §8). */
export type SpeakerIdentityMode =
  | 'NAMED'
  | 'FIRST_NAME_ONLY'
  | 'PSEUDONYM'
  | 'ANONYMOUS'
  | 'ROLE_ONLY';

/** Editorial lifecycle (spec §16). Only PUBLISHED resolves publicly (§57). */
export type PublicationStatus =
  | 'DRAFT'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED';

/** Recommended public audio formats (spec §21). */
export type AudioFormat = 'mp3' | 'm4a';

/** Original audio language (spec §27) — independent of interface language (§28). */
export type AudioLanguage = 'en' | 'ur' | 'mixed';

/** Neutral content notices (spec §37) — avoid sensational warnings. */
export type StoryContentNoticeId =
  | 'infant-illness'
  | 'hospitalization'
  | 'bereavement'
  | 'diagnostic-delay'
  | 'family-stress';

/** A web-optimized, approved publication audio asset (spec §21/§22). */
export interface StoryAudioAsset {
  /** Approved publication asset URL. Never an original interview file (§22). */
  src: string;
  format: AudioFormat;
}

/** A transcript in one language (spec §29). */
export interface TranscriptContent {
  language: 'en' | 'ur';
  /** Human-reviewed text (spec §26). Rendered as text, never an image (§25). */
  text: string;
}

/**
 * A curated story record (spec §7). Metadata lives separately from disease
 * content (§4). `consentRecordId` only *references* the private consent record;
 * the consent record itself is never bundled publicly (§63).
 */
export interface StoryRecord {
  id: string;
  title: LocalizedText;
  diseaseId: StoryDiseaseId;
  /** Optional subtype — do not force every story into a subtype (spec §5). */
  diseaseSubtypeId?: string | null;
  storyType: StoryType;
  /** Shown only when the identity mode permits it (spec §8). */
  speakerDisplayName?: string | null;
  speakerIdentityMode: SpeakerIdentityMode;
  /** Verified professional role, published only when approved (spec §33/§68). */
  speakerRole?: LocalizedText | null;
  /** Minimal, relevant context — no unnecessary biography (spec §32). */
  speakerContext?: LocalizedText | null;
  /** Original recorded audio language (spec §27). */
  language: AudioLanguage;
  audioAsset?: StoryAudioAsset | null;
  durationSeconds?: number | null;
  /** Original transcript — required for publication (spec §24). */
  transcript: TranscriptContent;
  /** Optional translated transcript (spec §29). */
  translatedTranscript?: TranscriptContent | null;
  /** Individualized framing — "In this story, one parent…" (spec §31). */
  summary: LocalizedText;
  contentNotices?: StoryContentNoticeId[] | null;
  /** Respectful memorial framing for deceased patients (spec §38). */
  memorialContext?: boolean;
  /** Reference into the PRIVATE consent store (spec §17) — never public (§63). */
  consentRecordId?: string | null;
  publicationStatus: PublicationStatus;
  recordedAt?: string | null;
  publishedAt?: string | null;
  lastReviewed?: string | null;
  /** Stable manual ordering (spec §40) — never by severity/intensity. */
  displayOrder: number;
  /** At most one featured story per disease (spec §41). */
  isFeatured?: boolean;
}

/**
 * The sanitized, public-safe projection of a story handed to client components.
 * It deliberately omits consent, publication status, and any identity detail the
 * identity mode does not permit (spec §8/§9/§63).
 */
export interface PublicStoryIdentity {
  storyType: StoryType;
  identityMode: SpeakerIdentityMode;
  /** Present only for NAMED / FIRST_NAME_ONLY / PSEUDONYM (spec §8/§9). */
  displayName?: string;
  isPseudonym?: boolean;
  /** Professional or role label, where published (spec §33). */
  roleLabel?: LocalizedText;
}

export interface PublicStory {
  id: string;
  title: LocalizedText;
  diseaseId: StoryDiseaseId;
  diseaseSubtypeId?: string;
  storyType: StoryType;
  identity: PublicStoryIdentity;
  context?: LocalizedText;
  /** Original audio language (spec §27) — shown so listeners know what to expect. */
  audioLanguage: AudioLanguage;
  audio: { src: string; format: AudioFormat; durationSeconds?: number };
  transcript: TranscriptContent;
  translatedTranscript?: TranscriptContent;
  summary: LocalizedText;
  contentNotices: StoryContentNoticeId[];
  memorialContext: boolean;
  isFeatured: boolean;
  displayOrder: number;
}

/** Perspective grouping for the lightweight selector (spec §42). */
export type StoryPerspectiveGroup =
  | 'all'
  | 'patients'
  | 'parents-caregivers'
  | 'professionals';
