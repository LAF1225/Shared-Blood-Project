import type { StoryConsentRecord, StoryConsentScope } from '../consentTypes';
import type { ConsentLookup } from '../resolve';
import type { StoryRecord } from '../types';

/**
 * SAMPLE stories for the dev-only preview and the unit tests (Module 12).
 *
 * These are clearly-fictional illustrations used to exercise the system — they
 * are NOT production content and are never rendered on real disease pages (the
 * production dataset in `data/stories.ts` is empty). Audio points at the shared
 * placeholder tone, not a real recording.
 *
 * The set deliberately covers: multiple perspectives per disease, identity
 * modes (first-name / role-only / anonymous / pseudonym), original + translated
 * transcripts, content notices, a featured story, and records that must NOT
 * resolve (a DRAFT and a WITHDRAWN-consent story).
 */
const PLACEHOLDER_AUDIO = { src: '/media/sample-story.wav', format: 'mp3' as const };

const fullScope = (overrides: Partial<StoryConsentScope> = {}): StoryConsentScope => ({
  audioPublication: true,
  transcriptPublication: true,
  translation: true,
  speakerName: false,
  firstName: false,
  professionalTitle: false,
  generalLocation: false,
  editedExcerpts: true,
  ...overrides,
});

const confirmedConsent = (
  id: string,
  storyId: string,
  scope: StoryConsentScope,
): StoryConsentRecord => ({
  id,
  storyId,
  consentStatus: 'CONFIRMED',
  consentScope: scope,
  identityPermission: scope.speakerName || scope.firstName,
  audioPublicationPermission: scope.audioPublication,
  transcriptPublicationPermission: scope.transcriptPublication,
  translationPermission: scope.translation,
  editingPermission: scope.editedExcerpts,
  dateRecorded: '2026-05-01',
  lastVerified: '2026-06-15',
});

export const SAMPLE_STORY_RECORDS: readonly StoryRecord[] = [
  // Beta thalassemia — parent, first-name only, featured, translated transcript.
  {
    id: 'sample-bt-parent-001',
    title: {
      en: 'Learning what "carrier" meant for our family',
      ur: 'یہ سمجھنا کہ "کیریئر" ہونا ہمارے خاندان کے لیے کیا معنی رکھتا ہے',
    },
    diseaseId: 'beta-thalassemia',
    storyType: 'PARENT_PERSPECTIVE',
    speakerDisplayName: 'Ayesha',
    speakerIdentityMode: 'FIRST_NAME_ONLY',
    speakerContext: {
      en: 'A parent of a child with beta thalassemia major.',
      ur: 'بیٹا تھیلیسیمیا میجر کے ایک بچے کی والدہ۔',
    },
    language: 'mixed',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: {
      language: 'en',
      text: 'When our son was diagnosed, nobody in our family had heard the word "carrier". This is a placeholder transcript used only to demonstrate the system.',
    },
    translatedTranscript: {
      language: 'ur',
      text: 'جب ہمارے بیٹے کی تشخیص ہوئی تو ہمارے خاندان میں کسی نے لفظ "کیریئر" نہیں سنا تھا۔ یہ صرف نظام کو دکھانے کے لیے ایک نمونہ نقل ہے۔',
    },
    summary: {
      en: 'In this story, one parent describes the months between first symptoms and a diagnosis.',
      ur: 'اس کہانی میں، ایک والدہ پہلی علامات اور تشخیص کے درمیان کے مہینوں کو بیان کرتی ہیں۔',
    },
    contentNotices: ['hospitalization', 'diagnostic-delay'],
    consentRecordId: 'consent-bt-parent-001',
    publicationStatus: 'PUBLISHED',
    publishedAt: '2026-06-01',
    displayOrder: 1,
    isFeatured: true,
  },
  // Beta thalassemia — doctor, role only (no personal consent needed).
  {
    id: 'sample-bt-doctor-001',
    title: {
      en: 'Signs families often notice first',
      ur: 'وہ علامات جو خاندان اکثر پہلے محسوس کرتے ہیں',
    },
    diseaseId: 'beta-thalassemia',
    storyType: 'DOCTOR_PERSPECTIVE',
    speakerIdentityMode: 'ROLE_ONLY',
    speakerRole: { en: 'Paediatric haematologist', ur: 'ماہرِ امراضِ خون اطفال' },
    speakerContext: {
      en: 'A professional reflection on early referral.',
      ur: 'جلد ریفرل پر ایک پیشہ ورانہ غور و فکر۔',
    },
    language: 'en',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: {
      language: 'en',
      text: 'Placeholder professional reflection. A perspective like this is one clinician\'s experience and is not a clinical guideline.',
    },
    summary: {
      en: 'In this reflection, one clinician describes patterns they have seen in referrals.',
      ur: 'اس غور و فکر میں، ایک معالج ریفرلز میں دیکھے گئے نمونے بیان کرتا ہے۔',
    },
    publicationStatus: 'PUBLISHED',
    publishedAt: '2026-06-02',
    displayOrder: 2,
  },
  // Beta thalassemia — patient, anonymous (consent still required), Urdu original.
  {
    id: 'sample-bt-patient-anon-001',
    title: { en: 'Everyday life with regular transfusions', ur: 'باقاعدہ انتقالِ خون کے ساتھ روزمرہ زندگی' },
    diseaseId: 'beta-thalassemia',
    storyType: 'PATIENT_PERSPECTIVE',
    speakerIdentityMode: 'ANONYMOUS',
    language: 'ur',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: {
      language: 'ur',
      text: 'یہ صرف نظام کو دکھانے کے لیے ایک نمونہ اردو نقل ہے۔ یہ ایک فرد کا ذاتی تجربہ ہے۔',
    },
    translatedTranscript: {
      language: 'en',
      text: 'This is a placeholder Urdu transcript used only to demonstrate the system. It is one individual\'s personal experience.',
    },
    summary: {
      en: 'In this story, one patient describes their routine around transfusions.',
      ur: 'اس کہانی میں، ایک مریض انتقالِ خون کے گرد اپنے معمول کو بیان کرتا ہے۔',
    },
    contentNotices: ['family-stress'],
    consentRecordId: 'consent-bt-patient-anon-001',
    publicationStatus: 'PUBLISHED',
    publishedAt: '2026-06-03',
    displayOrder: 3,
  },
  // Cystic fibrosis — parent, pseudonym; only one CF story → no selector.
  {
    id: 'sample-cf-parent-001',
    title: { en: 'Daily physiotherapy and school', ur: 'روزانہ فزیوتھراپی اور اسکول' },
    diseaseId: 'cystic-fibrosis',
    storyType: 'PARENT_PERSPECTIVE',
    speakerDisplayName: 'Bilal',
    speakerIdentityMode: 'PSEUDONYM',
    speakerContext: { en: 'A parent of a child with cystic fibrosis.', ur: 'سسٹک فائبروسس کے ایک بچے کے والد۔' },
    language: 'en',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: {
      language: 'en',
      text: 'Placeholder transcript. A pseudonym is used at the speaker\'s request; this is one family\'s experience.',
    },
    summary: {
      en: 'In this story, one parent describes fitting daily care around school.',
      ur: 'اس کہانی میں، ایک والد اسکول کے ساتھ روزانہ نگہداشت کو ترتیب دینے کو بیان کرتے ہیں۔',
    },
    consentRecordId: 'consent-cf-parent-001',
    publicationStatus: 'PUBLISHED',
    publishedAt: '2026-06-04',
    displayOrder: 1,
  },
  // NON-RESOLVING: draft (never public, spec §16/§57).
  {
    id: 'sample-bt-draft-001',
    title: { en: 'A story still under review', ur: 'ایک کہانی جو ابھی زیرِ جائزہ ہے' },
    diseaseId: 'beta-thalassemia',
    storyType: 'PARENT_PERSPECTIVE',
    speakerDisplayName: 'Sara',
    speakerIdentityMode: 'FIRST_NAME_ONLY',
    language: 'en',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: { language: 'en', text: 'Draft transcript that must never render publicly.' },
    summary: { en: 'A draft.', ur: 'ایک مسودہ۔' },
    consentRecordId: 'consent-bt-draft-001',
    publicationStatus: 'DRAFT',
    displayOrder: 4,
  },
  // NON-RESOLVING: published but consent WITHDRAWN (spec §18/§58).
  {
    id: 'sample-bt-withdrawn-001',
    title: { en: 'A withdrawn story', ur: 'واپس لی گئی کہانی' },
    diseaseId: 'beta-thalassemia',
    storyType: 'PATIENT_PERSPECTIVE',
    speakerDisplayName: 'Imran',
    speakerIdentityMode: 'FIRST_NAME_ONLY',
    language: 'en',
    audioAsset: PLACEHOLDER_AUDIO,
    durationSeconds: 3,
    transcript: { language: 'en', text: 'Transcript for a story whose consent was later withdrawn.' },
    summary: { en: 'Consent withdrawn.', ur: 'رضامندی واپس لے لی گئی۔' },
    consentRecordId: 'consent-bt-withdrawn-001',
    publicationStatus: 'PUBLISHED',
    publishedAt: '2026-06-05',
    displayOrder: 5,
  },
];

const SAMPLE_CONSENT_RECORDS: readonly StoryConsentRecord[] = [
  confirmedConsent('consent-bt-parent-001', 'sample-bt-parent-001', fullScope({ firstName: true })),
  confirmedConsent('consent-bt-patient-anon-001', 'sample-bt-patient-anon-001', fullScope()),
  confirmedConsent('consent-cf-parent-001', 'sample-cf-parent-001', fullScope()),
  confirmedConsent('consent-bt-draft-001', 'sample-bt-draft-001', fullScope({ firstName: true })),
  {
    id: 'consent-bt-withdrawn-001',
    storyId: 'sample-bt-withdrawn-001',
    consentStatus: 'WITHDRAWN',
    consentScope: fullScope({ firstName: true }),
    identityPermission: true,
    audioPublicationPermission: true,
    transcriptPublicationPermission: true,
    translationPermission: true,
    editingPermission: true,
    dateRecorded: '2026-05-01',
    lastVerified: '2026-06-20',
  },
];

export const getSampleConsent: ConsentLookup = (storyId) =>
  SAMPLE_CONSENT_RECORDS.find((record) => record.storyId === storyId) ?? null;
