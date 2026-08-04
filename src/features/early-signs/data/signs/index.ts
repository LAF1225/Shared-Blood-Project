import type { LocalizedText } from '@/types';
import type { EarlySignDiseaseId, EarlySignRecord, EmergencySign } from '../../types';
import { BETA_THALASSEMIA_SIGNS } from './beta-thalassemia';
import { CYSTIC_FIBROSIS_SIGNS } from './cystic-fibrosis';
import { LYSOSOMAL_STORAGE_DISORDERS_SIGNS } from './lysosomal-storage-disorders';
import { EHLERS_DANLOS_SYNDROME_SIGNS } from './ehlers-danlos-syndrome';

const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/** Per-disease early-sign datasets — separately reviewed content (spec §40). */
export const EARLY_SIGNS_BY_DISEASE: Record<EarlySignDiseaseId, readonly EarlySignRecord[]> = {
  'beta-thalassemia': BETA_THALASSEMIA_SIGNS,
  'cystic-fibrosis': CYSTIC_FIBROSIS_SIGNS,
  'lysosomal-storage-disorders': LYSOSOMAL_STORAGE_DISORDERS_SIGNS,
  'ehlers-danlos-syndrome': EHLERS_DANLOS_SYNDROME_SIGNS,
};

/** Flat list of every early-sign record. */
export const ALL_EARLY_SIGNS: readonly EarlySignRecord[] = [
  ...BETA_THALASSEMIA_SIGNS,
  ...CYSTIC_FIBROSIS_SIGNS,
  ...LYSOSOMAL_STORAGE_DISORDERS_SIGNS,
  ...EHLERS_DANLOS_SYNDROME_SIGNS,
];

/** The four supported diseases, in display order (spec §20). */
export const EARLY_SIGN_DISEASE_IDS: readonly EarlySignDiseaseId[] = [
  'beta-thalassemia',
  'cystic-fibrosis',
  'lysosomal-storage-disorders',
  'ehlers-danlos-syndrome',
];

/**
 * Shared emergency safety layer (spec §28/§29). These urgent signs each
 * independently warrant urgent care and are NOT tied to any genetic disorder —
 * urgent guidance is based on the urgent sign itself, never a suspected disease
 * (spec §28). This layer is shown once, shared across all diseases (spec §29).
 */
export const EMERGENCY_SIGNS: readonly EmergencySign[] = [
  {
    id: 'severe-breathing',
    label: L('Severe difficulty breathing', 'سانس لینے میں شدید دشواری'),
    description: L(
      'Fast, laboured, or struggling breathing; grunting; the skin between the ribs pulling in; or blue-tinged lips.',
      'تیز، مشکل، یا جدوجہد بھری سانس؛ کراہنا؛ پسلیوں کے درمیان جلد کا اندر کھنچنا؛ یا نیلگوں ہونٹ۔',
    ),
  },
  {
    id: 'unresponsive',
    label: L('Unresponsiveness or very hard to wake', 'بے ہوشی یا جگانے میں شدید دشواری'),
    description: L(
      'A child who is unusually drowsy, floppy, or cannot be woken or kept awake.',
      'ایک بچہ جو غیر معمولی طور پر غنودہ، ڈھیلا ہو، یا جسے جگایا یا جاگتا نہ رکھا جا سکے۔',
    ),
  },
  {
    id: 'seizure',
    label: L('A seizure or fit', 'دورہ یا مرگی کا دورہ'),
    description: L(
      'Sudden shaking, stiffening, or loss of awareness, especially if it is the first time or lasts more than a few minutes.',
      'اچانک کپکپاہٹ، اکڑاؤ، یا ہوش کا کھو جانا، خاص طور پر اگر یہ پہلی بار ہو یا چند منٹ سے زیادہ رہے۔',
    ),
  },
  {
    id: 'severe-dehydration',
    label: L('Signs of severe dehydration', 'شدید پانی کی کمی کی علامات'),
    description: L(
      'No wet nappies for many hours, a very dry mouth, no tears when crying, or a sunken appearance.',
      'کئی گھنٹوں تک گیلی نیپی نہ ہونا، منہ کا بہت خشک ہونا، روتے وقت آنسو نہ آنا، یا دھنسا ہوا ظاہر ہونا۔',
    ),
  },
  {
    id: 'sudden-deterioration',
    label: L('Sudden major deterioration', 'اچانک بڑی خرابی'),
    description: L(
      'A child who becomes rapidly and seriously more unwell, or any sudden change that alarms you.',
      'ایک بچہ جو تیزی سے اور سنجیدگی سے زیادہ بیمار ہو جائے، یا کوئی بھی اچانک تبدیلی جو آپ کو پریشان کرے۔',
    ),
  },
];

export function getEarlySignById(id: string): EarlySignRecord | null {
  return ALL_EARLY_SIGNS.find((sign) => sign.id === id) ?? null;
}
