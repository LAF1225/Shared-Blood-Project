import type { LocalizedText } from '@/types';
import type { EarlySignRecord } from '../../types';

/**
 * Cystic fibrosis early-sign guidance (spec §43/§44).
 *
 * CRITICAL (spec §43): never instruct a caregiver to lick or taste a child's
 * skin as a home test. And repeated chest infections do NOT equal CF (spec §44)
 * — persistent/recurring patterns are simply worth discussing with a doctor.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const CYSTIC_FIBROSIS_SIGNS: readonly EarlySignRecord[] = [
  {
    id: 'cf-repeated-infections',
    diseaseId: 'cystic-fibrosis',
    title: L('Repeated chest infections', 'بار بار سینے کے انفیکشن'),
    shortLabel: L('Repeated chest infections', 'بار بار سینے کے انفیکشن'),
    description: L(
      'Chest infections that keep coming back or are slow to clear, more often than expected for the child’s age.',
      'سینے کے انفیکشن جو بار بار لوٹ آئیں یا آہستہ ٹھیک ہوں، بچے کی عمر کے لحاظ سے توقع سے زیادہ۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'GENERAL_CHILDHOOD'],
    observationCategory: 'INFECTION_PATTERN',
    visibilityType: 'PATTERN_BASED',
    patternType: 'RECURRING',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice a pattern of chest infections returning repeatedly, or a cough that lingers well after other symptoms settle.',
      'آپ ایک ایسا سلسلہ محسوس کر سکتے ہیں جس میں سینے کے انفیکشن بار بار لوٹ آئیں، یا کھانسی جو دیگر علامات ختم ہونے کے بعد بھی برقرار رہے۔',
    ),
    whatToNotice: L(
      'Whether infections recur in a pattern over time, and whether they appear together with poor weight gain or digestive changes.',
      'کیا انفیکشن وقت کے ساتھ ایک سلسلے میں لوٹتے ہیں، اور کیا یہ کمزور وزن یا ہاضمے کی تبدیلیوں کے ساتھ ظاہر ہوتے ہیں۔',
    ),
    whatNotToAssume: L(
      'Repeated chest infections alone do not mean cystic fibrosis. Frequent infections are very common in early childhood and usually have ordinary causes.',
      'صرف بار بار سینے کے انفیکشن کا مطلب سسٹک فائبروسس نہیں ہے۔ بار بار انفیکشن ابتدائی بچپن میں بہت عام ہیں اور عام طور پر ان کی عام وجوہات ہوتی ہیں۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'PULMONOLOGIST'],
    relatedDiseaseSectionId: 'about',
    referenceIds: ['medlineplus-cystic-fibrosis', 'cff-signs-symptoms', 'nhs-cystic-fibrosis'],
    displayOrder: 1,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'cf-persistent-cough',
    diseaseId: 'cystic-fibrosis',
    title: L('Persistent cough', 'مسلسل کھانسی'),
    shortLabel: L('Persistent cough', 'مسلسل کھانسی'),
    description: L(
      'A cough that continues for a long time or keeps returning, sometimes with mucus.',
      'ایک کھانسی جو طویل عرصے تک جاری رہے یا بار بار لوٹ آئے، کبھی کبھی بلغم کے ساتھ۔',
    ),
    ageContexts: ['INFANT', 'GENERAL_CHILDHOOD'],
    observationCategory: 'BREATHING',
    visibilityType: 'VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice a cough that does not fully settle between illnesses, or that is worse than other children’s ordinary coughs.',
      'آپ ایسی کھانسی محسوس کر سکتے ہیں جو بیماریوں کے درمیان مکمل طور پر ٹھیک نہ ہو، یا جو دیگر بچوں کی عام کھانسی سے زیادہ ہو۔',
    ),
    whatToNotice: L(
      'Whether the cough is persistent over weeks rather than a short illness, and whether it comes with breathing effort or poor growth.',
      'کیا کھانسی ہفتوں تک مسلسل ہے نہ کہ ایک مختصر بیماری، اور کیا یہ سانس کی مشقت یا سست نشوونما کے ساتھ آتی ہے۔',
    ),
    whatNotToAssume: L(
      'A long cough alone does not mean cystic fibrosis. Coughs are common and usually caused by ordinary infections or airway irritation.',
      'صرف طویل کھانسی کا مطلب سسٹک فائبروسس نہیں ہے۔ کھانسی عام ہے اور عام طور پر عام انفیکشن یا سانس کی نالی کی جلن سے ہوتی ہے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'PULMONOLOGIST'],
    referenceIds: ['nhs-cystic-fibrosis', 'cff-signs-symptoms'],
    displayOrder: 2,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'cf-weight-gain',
    diseaseId: 'cystic-fibrosis',
    title: L('Difficulty gaining weight despite a good appetite', 'اچھی بھوک کے باوجود وزن بڑھنے میں دشواری'),
    shortLabel: L('Poor weight gain', 'کمزور وزن'),
    description: L(
      'A child who eats reasonably well but still struggles to gain weight or grow, which can relate to difficulty absorbing nutrients.',
      'ایک بچہ جو کافی اچھا کھاتا ہے مگر پھر بھی وزن بڑھانے یا نشوونما میں دشواری کا شکار ہو، جو غذائیت جذب کرنے میں دشواری سے متعلق ہو سکتا ہے۔',
    ),
    ageContexts: ['NEWBORN', 'INFANT', 'TODDLER'],
    observationCategory: 'GROWTH',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'This is often noticed at routine growth checks, the child feeds well but weight does not keep up with the expected pattern.',
      'یہ اکثر معمول کی نشوونما کی جانچ میں محسوس ہوتا ہے، بچہ اچھا کھاتا ہے مگر وزن متوقع انداز کے ساتھ نہیں بڑھتا۔',
    ),
    whatToNotice: L(
      'Whether poor weight gain persists despite adequate feeding, and whether it appears with digestive changes or chest symptoms.',
      'کیا مناسب خوراک کے باوجود کمزور وزن برقرار رہتا ہے، اور کیا یہ ہاضمے کی تبدیلیوں یا سینے کی علامات کے ساتھ ظاہر ہوتا ہے۔',
    ),
    whatNotToAssume: L(
      'Difficulty gaining weight has many possible causes and does not by itself mean cystic fibrosis.',
      'وزن بڑھنے میں دشواری کی کئی ممکنہ وجوہات ہیں اور یہ خود بخود سسٹک فائبروسس کا مطلب نہیں رکھتی۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'GASTROENTEROLOGIST', 'DIETITIAN'],
    referenceIds: ['medlineplus-cystic-fibrosis', 'cff-signs-symptoms'],
    displayOrder: 3,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'cf-stools',
    diseaseId: 'cystic-fibrosis',
    title: L('Frequent bulky, greasy, or unusual stools', 'بار بار بھاری، چکنے، یا غیر معمولی پاخانے'),
    shortLabel: L('Unusual stools', 'غیر معمولی پاخانے'),
    description: L(
      'Stools that are unusually bulky, greasy, pale, or hard to flush over a sustained period, which can relate to difficulty digesting fats.',
      'پاخانے جو مسلسل عرصے تک غیر معمولی طور پر بھاری، چکنے، پیلے، یا فلش کرنے میں مشکل ہوں، جو چکنائی ہضم کرنے میں دشواری سے متعلق ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER'],
    observationCategory: 'DIGESTION',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice a persistent change in stools during nappy changes or toileting, different from the child’s usual pattern.',
      'آپ نیپی تبدیل کرتے یا بیت الخلا کے دوران پاخانوں میں مسلسل تبدیلی محسوس کر سکتے ہیں، جو بچے کے معمول سے مختلف ہو۔',
    ),
    whatToNotice: L(
      'Whether the change is persistent rather than a short tummy upset, and whether it appears with poor weight gain.',
      'کیا تبدیلی مسلسل ہے نہ کہ ایک مختصر پیٹ کی خرابی، اور کیا یہ کمزور وزن کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'Changes in stools are common in childhood and usually temporary. On their own they do not indicate cystic fibrosis.',
      'پاخانوں میں تبدیلیاں بچپن میں عام اور عام طور پر عارضی ہوتی ہیں۔ اکیلے یہ سسٹک فائبروسس کی نشاندہی نہیں کرتیں۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'GASTROENTEROLOGIST'],
    referenceIds: ['nhs-cystic-fibrosis', 'medlineplus-cystic-fibrosis'],
    displayOrder: 4,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'cf-salty-skin',
    diseaseId: 'cystic-fibrosis',
    title: L('Skin that can taste salty', 'جلد جس کا ذائقہ نمکین ہو سکتا ہے'),
    shortLabel: L('Salty-tasting skin', 'نمکین ذائقے والی جلد'),
    description: L(
      'Some parents notice that a child’s skin can taste salty, for example when kissing the child. This is shared as contextual information only.',
      'کچھ والدین محسوس کرتے ہیں کہ بچے کی جلد کا ذائقہ نمکین ہو سکتا ہے، مثلاً بچے کو بوسہ دیتے وقت۔ یہ صرف سیاق و سباق کی معلومات کے طور پر بتایا گیا ہے۔',
    ),
    ageContexts: ['INFANT', 'GENERAL_CHILDHOOD'],
    observationCategory: 'SKIN',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'SINGLE_OBSERVATION',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'This is something a parent might happen to notice incidentally. Do NOT lick or taste your child’s skin to test for anything; it is not a home test.',
      'یہ کچھ ایسا ہے جو والدین اتفاقاً محسوس کر سکتے ہیں۔ کسی بھی چیز کی جانچ کے لیے اپنے بچے کی جلد کو چاٹیں یا چکھیں مت، یہ کوئی گھریلو ٹیسٹ نہیں ہے۔',
    ),
    whatToNotice: L(
      'It is only meaningful as background context alongside other persistent patterns such as chest symptoms or poor growth, never on its own.',
      'یہ صرف دیگر مسلسل سلسلوں جیسے سینے کی علامات یا سست نشوونما کے ساتھ پس منظر کے طور پر بامعنی ہے، کبھی اکیلے نہیں۔',
    ),
    whatNotToAssume: L(
      'Salty-tasting skin on its own does not diagnose cystic fibrosis and is not something to test for at home. Only proper medical testing can assess CF.',
      'اکیلے نمکین ذائقے والی جلد سسٹک فائبروسس کی تشخیص نہیں کرتی اور یہ گھر پر جانچنے کی چیز نہیں ہے۔ صرف مناسب طبی جانچ ہی CF کا جائزہ لے سکتی ہے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN'],
    referenceIds: ['cff-signs-symptoms', 'medlineplus-cystic-fibrosis'],
    displayOrder: 5,
    lastReviewed: '2026-06-20',
  },
];
