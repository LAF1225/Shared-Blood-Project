import type { LocalizedText } from '@/types';
import type { EarlySignRecord } from '../../types';

/**
 * Beta thalassemia early-sign guidance (spec §41/§42).
 *
 * CRITICAL (spec §42): NO early-sign cards for the beta-thalassemia *carrier*
 * state — carriers are not severely symptomatic children; carrier education
 * lives in the inheritance/disease content, not here. These records describe
 * observations that may be seen in significant (transfusion-relevant) disease
 * and never imply all forms present identically (spec §41).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const BETA_THALASSEMIA_SIGNS: readonly EarlySignRecord[] = [
  {
    id: 'bt-tiredness',
    diseaseId: 'beta-thalassemia',
    title: L('Unusual tiredness or low energy', 'غیر معمولی تھکن یا کم توانائی'),
    shortLabel: L('Unusual tiredness', 'غیر معمولی تھکن'),
    description: L(
      'A baby or young child who seems persistently tired, less active, or harder to settle than usual, which can be associated with anaemia.',
      'ایک شیرخوار یا چھوٹا بچہ جو مسلسل تھکا ہوا، کم متحرک، یا معمول سے زیادہ بے چین لگے، جو خون کی کمی سے وابستہ ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'GENERAL_CHILDHOOD'],
    observationCategory: 'ENERGY',
    visibilityType: 'VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice the child tires quickly during play or feeding, or is less alert than other children of a similar age over time.',
      'آپ محسوس کر سکتے ہیں کہ بچہ کھیل یا دودھ پینے کے دوران جلد تھک جاتا ہے، یا وقت کے ساتھ اسی عمر کے دیگر بچوں کی نسبت کم چوکنا رہتا ہے۔',
    ),
    clinicalContext: L('This may relate to anaemia (a low level of healthy red blood cells).', 'اس کا تعلق خون کی کمی (صحت مند سرخ خلیوں کی کم مقدار) سے ہو سکتا ہے۔'),
    whatToNotice: L(
      'Whether the tiredness is persistent rather than an occasional off-day, and whether it appears alongside paleness or slow growth.',
      'کیا تھکن مسلسل ہے نہ کہ کبھی کبھار کا معاملہ، اور کیا یہ پیلاہٹ یا سست نشوونما کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'Tiredness alone does not mean a child has beta thalassemia. Many common and temporary things (including everyday infections, poor sleep, or low iron) can cause tiredness.',
      'صرف تھکن کا مطلب یہ نہیں کہ بچے کو بیٹا تھیلیسیمیا ہے۔ بہت سی عام اور عارضی چیزیں (بشمول روزمرہ کے انفیکشن، نیند کی کمی، یا آئرن کی کمی) تھکن کا سبب بن سکتی ہیں۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'HAEMATOLOGIST'],
    relatedDiseaseSectionId: 'about',
    referenceIds: ['medlineplus-beta-thalassemia', 'nhs-thalassaemia'],
    displayOrder: 1,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'bt-pallor',
    diseaseId: 'beta-thalassemia',
    title: L('Persistent paleness', 'مسلسل پیلاہٹ'),
    shortLabel: L('Paleness', 'پیلاہٹ'),
    description: L(
      'Skin, lips, or the inside of the eyelids that look persistently pale, which can be associated with anaemia.',
      'جلد، ہونٹ، یا پلکوں کا اندرونی حصہ جو مسلسل پیلا نظر آئے، جو خون کی کمی سے وابستہ ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'GENERAL_CHILDHOOD'],
    observationCategory: 'APPEARANCE',
    visibilityType: 'VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice paleness that does not come and go with temperature or activity, especially compared with the child’s usual colour.',
      'آپ ایسی پیلاہٹ محسوس کر سکتے ہیں جو درجہ حرارت یا سرگرمی کے ساتھ کم زیادہ نہ ہو، خاص طور پر بچے کے معمول کے رنگ کے مقابلے میں۔',
    ),
    whatToNotice: L(
      'Whether paleness is persistent and appears together with tiredness, poor feeding, or slow growth over weeks.',
      'کیا پیلاہٹ مسلسل ہے اور ہفتوں کے دوران تھکن، کم خوراک، یا سست نشوونما کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'Pallor alone does not mean beta thalassemia. Paleness is common and can have many causes, including ordinary iron deficiency.',
      'صرف پیلاہٹ کا مطلب بیٹا تھیلیسیمیا نہیں ہے۔ پیلاہٹ عام ہے اور اس کی کئی وجوہات ہو سکتی ہیں، بشمول عام آئرن کی کمی۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'HAEMATOLOGIST'],
    referenceIds: ['medlineplus-beta-thalassemia', 'nhs-thalassaemia'],
    displayOrder: 2,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'bt-growth',
    diseaseId: 'beta-thalassemia',
    title: L('Difficulty gaining weight or slow growth', 'وزن بڑھنے میں دشواری یا سست نشوونما'),
    shortLabel: L('Slow growth', 'سست نشوونما'),
    description: L(
      'A child who is not gaining weight or growing as expected over time, which some children with significant anaemia may experience.',
      'ایک بچہ جو وقت کے ساتھ متوقع طور پر وزن یا نشوونما حاصل نہ کر رہا ہو، جو نمایاں خون کی کمی والے کچھ بچوں میں ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER'],
    observationCategory: 'GROWTH',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'This is often noticed through routine growth monitoring rather than by looking, for example when weight is not tracking along the expected curve.',
      'یہ اکثر معمول کی نشوونما کی نگرانی سے محسوس ہوتا ہے نہ کہ دیکھنے سے، مثلاً جب وزن متوقع منحنی خط کے ساتھ نہ بڑھ رہا ہو۔',
    ),
    whatToNotice: L(
      'Whether slow growth is persistent across several check-ups and appears alongside tiredness or paleness.',
      'کیا سست نشوونما کئی معائنوں میں مسلسل ہے اور تھکن یا پیلاہٹ کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'Slow growth alone does not identify a specific disorder. Growth varies between children and has many possible explanations.',
      'صرف سست نشوونما کسی مخصوص مرض کی نشاندہی نہیں کرتی۔ نشوونما بچوں میں مختلف ہوتی ہے اور اس کی کئی ممکنہ وجوہات ہیں۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'HAEMATOLOGIST', 'DIETITIAN'],
    referenceIds: ['medlineplus-beta-thalassemia', 'tif-guidelines'],
    displayOrder: 3,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'bt-feeding',
    diseaseId: 'beta-thalassemia',
    title: L('Persistent feeding difficulty', 'مسلسل دودھ پلانے میں دشواری'),
    shortLabel: L('Feeding difficulty', 'خوراک میں دشواری'),
    description: L(
      'A baby who feeds poorly or tires during feeding over a sustained period, which can accompany anaemia in some children.',
      'ایک شیرخوار جو کمزور طریقے سے دودھ پیے یا مسلسل عرصے تک دودھ پیتے ہوئے تھک جائے، جو کچھ بچوں میں خون کی کمی کے ساتھ ہو سکتا ہے۔',
    ),
    ageContexts: ['NEWBORN', 'INFANT'],
    observationCategory: 'FEEDING',
    visibilityType: 'VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice the baby needing frequent rests during feeds or taking much longer than usual to finish feeding.',
      'آپ محسوس کر سکتے ہیں کہ شیرخوار دودھ پیتے ہوئے بار بار آرام کرے یا دودھ ختم کرنے میں معمول سے کہیں زیادہ وقت لے۔',
    ),
    whatToNotice: L(
      'Whether feeding difficulty is persistent and whether it affects the baby’s growth or energy.',
      'کیا دودھ پلانے کی دشواری مسلسل ہے اور کیا یہ شیرخوار کی نشوونما یا توانائی کو متاثر کرتی ہے۔',
    ),
    whatNotToAssume: L(
      'Feeding difficulty is common in babies for many reasons and does not by itself point to beta thalassemia.',
      'دودھ پلانے کی دشواری کئی وجوہات سے شیرخواروں میں عام ہے اور یہ خود بخود بیٹا تھیلیسیمیا کی طرف اشارہ نہیں کرتی۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'DIETITIAN'],
    referenceIds: ['nhs-thalassaemia', 'medlineplus-beta-thalassemia'],
    displayOrder: 4,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'bt-abdominal-enlargement',
    diseaseId: 'beta-thalassemia',
    title: L('Tummy that looks enlarged or swollen', 'پیٹ جو بڑا یا سوجا ہوا نظر آئے'),
    shortLabel: L('Enlarged tummy', 'بڑا پیٹ'),
    description: L(
      'A tummy that appears increasingly enlarged over time, which in some children with significant disease can relate to enlargement of organs such as the spleen.',
      'ایک پیٹ جو وقت کے ساتھ بڑھتا ہوا نظر آئے، جو نمایاں مرض والے کچھ بچوں میں تلی جیسے اعضاء کے بڑھنے سے متعلق ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    observationCategory: 'APPEARANCE',
    visibilityType: 'VISIBLE',
    patternType: 'PROGRESSIVE',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice the tummy gradually looking fuller or firmer than before. Simply observe and describe it, do not press or feel for internal organs.',
      'آپ محسوس کر سکتے ہیں کہ پیٹ آہستہ آہستہ پہلے سے زیادہ بھرا یا سخت نظر آ رہا ہے۔ صرف مشاہدہ کریں اور بیان کریں، اندرونی اعضاء کو دبانے یا محسوس کرنے کی کوشش نہ کریں۔',
    ),
    whatToNotice: L(
      'Whether the change is gradual and persistent, and whether it appears with paleness, tiredness, or poor growth.',
      'کیا تبدیلی بتدریج اور مسلسل ہے، اور کیا یہ پیلاہٹ، تھکن، یا سست نشوونما کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'A rounded tummy is normal in many healthy babies and toddlers. Appearance alone does not establish organ enlargement or any specific disorder, only a clinician can assess this.',
      'گول پیٹ بہت سے صحت مند شیرخواروں اور چھوٹے بچوں میں معمول ہے۔ صرف ظاہری شکل عضو کے بڑھنے یا کسی مخصوص مرض کو ثابت نہیں کرتی، صرف ایک معالج ہی اس کا جائزہ لے سکتا ہے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'HAEMATOLOGIST'],
    referenceIds: ['medlineplus-beta-thalassemia', 'tif-guidelines'],
    displayOrder: 5,
    lastReviewed: '2026-06-20',
  },
];
