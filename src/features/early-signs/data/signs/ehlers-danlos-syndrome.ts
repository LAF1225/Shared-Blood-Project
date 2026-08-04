import type { LocalizedText } from '@/types';
import type { EarlySignRecord } from '../../types';

/**
 * Ehlers-Danlos syndrome early-sign guidance (spec §47/§48).
 *
 * CRITICAL (spec §47): guidance is subtype-aware, and hypermobility ALONE is
 * never presented as evidence of EDS — `whatNotToAssume` is mandatory on the
 * joint-flexibility record. No home testing (spec §48): no Beighton scoring, no
 * skin-stretch tests, no joint-manipulation, no "test for EDS at home" content.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const EHLERS_DANLOS_SYNDROME_SIGNS: readonly EarlySignRecord[] = [
  {
    id: 'eds-flexible-joints',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Very flexible joints', 'بہت لچکدار جوڑ'),
    shortLabel: L('Very flexible joints', 'بہت لچکدار جوڑ'),
    description: L(
      'Joints that appear to move further than usual. Joint flexibility is common in children and is only one part of a much bigger clinical picture.',
      'ایسے جوڑ جو معمول سے زیادہ حرکت کرتے دکھائی دیں۔ جوڑوں کی لچک بچوں میں عام ہے اور یہ ایک بہت بڑی طبی تصویر کا صرف ایک حصہ ہے۔',
    ),
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    observationCategory: 'JOINTS',
    visibilityType: 'VISIBLE',
    patternType: 'SINGLE_OBSERVATION',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might simply notice that a child seems more flexible than others. Do not bend, stretch, or manipulate the child’s joints to test them, only observe everyday movement.',
      'آپ محض یہ محسوس کر سکتے ہیں کہ بچہ دوسروں سے زیادہ لچکدار لگتا ہے۔ جانچنے کے لیے بچے کے جوڑوں کو موڑیں، کھینچیں، یا حرکت نہ دیں، صرف روزمرہ کی حرکت کا مشاہدہ کریں۔',
    ),
    whatToNotice: L(
      'Whether flexibility appears together with other persistent concerns such as frequent joint slips, pain, or easy bruising, patterns matter more than flexibility alone.',
      'کیا لچک دیگر مسلسل خدشات جیسے بار بار جوڑ کھسکنے، درد، یا آسانی سے نیل پڑنے کے ساتھ ظاہر ہوتی ہے، صرف لچک سے زیادہ سلسلے اہم ہیں۔',
    ),
    whatNotToAssume: L(
      'Flexible joints alone do not mean a child has Ehlers-Danlos syndrome. Many healthy children are naturally very flexible. Only a qualified professional can assess EDS, and there is no home test for it.',
      'صرف لچکدار جوڑوں کا مطلب یہ نہیں کہ بچے کو ایہلرز-ڈانلوس سنڈروم ہے۔ بہت سے صحت مند بچے قدرتی طور پر بہت لچکدار ہوتے ہیں۔ صرف ایک مستند ماہر ہی EDS کا جائزہ لے سکتا ہے، اور اس کا کوئی گھریلو ٹیسٹ نہیں ہے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'MEDICAL_GENETICIST', 'PHYSIOTHERAPIST'],
    relatedDiseaseSectionId: 'about',
    referenceIds: ['eds-society-types', 'medlineplus-eds'],
    displayOrder: 1,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'eds-joint-instability',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Joints that repeatedly slip or feel unstable', 'ایسے جوڑ جو بار بار کھسکیں یا غیر مستحکم محسوس ہوں'),
    shortLabel: L('Repeated joint instability', 'بار بار جوڑ کی عدم استحکام'),
    description: L(
      'A pattern of joints partially slipping out of place or feeling unstable during ordinary activity.',
      'عام سرگرمی کے دوران جوڑوں کے جزوی طور پر اپنی جگہ سے کھسکنے یا غیر مستحکم محسوس ہونے کا ایک سلسلہ۔',
    ),
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    observationCategory: 'JOINTS',
    visibilityType: 'PATTERN_BASED',
    patternType: 'RECURRING',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice a repeating pattern of a joint giving way or slipping during everyday movement, rather than a single accident.',
      'آپ روزمرہ حرکت کے دوران کسی جوڑ کے بار بار جواب دینے یا کھسکنے کا ایک دہرا سلسلہ محسوس کر سکتے ہیں، نہ کہ کوئی ایک حادثہ۔',
    ),
    whatToNotice: L(
      'Whether instability recurs in a pattern and whether it appears with unusual flexibility or pain.',
      'کیا عدم استحکام ایک سلسلے میں دہرتا ہے اور کیا یہ غیر معمولی لچک یا درد کے ساتھ ظاہر ہوتا ہے۔',
    ),
    whatNotToAssume: L(
      'Occasional slips can happen for many reasons. A pattern is worth discussing, but it does not by itself establish a diagnosis of EDS.',
      'کبھی کبھار کھسکنا کئی وجوہات سے ہو سکتا ہے۔ ایک سلسلہ زیرِ بحث لانے کے قابل ہے، مگر یہ خود بخود EDS کی تشخیص ثابت نہیں کرتا۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'ORTHOPAEDIC_SPECIALIST', 'PHYSIOTHERAPIST'],
    referenceIds: ['eds-society-types', 'medlineplus-eds'],
    displayOrder: 2,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'eds-bruising',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Bruising more easily than expected', 'توقع سے زیادہ آسانی سے نیل پڑنا'),
    shortLabel: L('Easy bruising', 'آسانی سے نیل'),
    description: L(
      'A child who seems to bruise easily or more than expected for their level of activity, in some EDS subtypes.',
      'ایک بچہ جو اپنی سرگرمی کی سطح کے لحاظ سے آسانی سے یا توقع سے زیادہ نیل کا شکار لگے، کچھ EDS ذیلی اقسام میں۔',
    ),
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    observationCategory: 'BLEEDING_OR_BRUISING',
    visibilityType: 'VISIBLE',
    patternType: 'RECURRING',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice frequent bruises appearing from minor bumps, as a repeating pattern over time.',
      'آپ معمولی ٹکراؤ سے بار بار نیل پڑتے محسوس کر سکتے ہیں، وقت کے ساتھ ایک دہرے سلسلے کے طور پر۔',
    ),
    whatToNotice: L(
      'Whether easy bruising is a persistent pattern and whether it appears with unusual flexibility or skin changes.',
      'کیا آسانی سے نیل پڑنا ایک مسلسل سلسلہ ہے اور کیا یہ غیر معمولی لچک یا جلد کی تبدیلیوں کے ساتھ ظاہر ہوتا ہے۔',
    ),
    whatNotToAssume: L(
      'Children bruise easily for many reasons, and active children often have bruises. Bruising alone does not indicate EDS.',
      'بچے کئی وجوہات سے آسانی سے نیل کا شکار ہوتے ہیں، اور متحرک بچوں کو اکثر نیل پڑتے ہیں۔ صرف نیل EDS کی نشاندہی نہیں کرتے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'MEDICAL_GENETICIST'],
    referenceIds: ['medlineplus-eds', 'eds-society-types'],
    displayOrder: 3,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'eds-motor-development',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Motor-development or muscle-tone concerns in some subtypes', 'کچھ ذیلی اقسام میں حرکتی نشوونما یا پٹھوں کے تناؤ کے خدشات'),
    shortLabel: L('Motor / tone concerns', 'حرکتی / تناؤ کے خدشات'),
    description: L(
      'In some EDS subtypes, young children may show softer muscle tone or take longer with motor skills such as sitting or walking.',
      'کچھ EDS ذیلی اقسام میں، چھوٹے بچوں میں پٹھوں کا تناؤ کم ہو سکتا ہے یا وہ بیٹھنے یا چلنے جیسی حرکتی مہارتوں میں زیادہ وقت لے سکتے ہیں۔',
    ),
    ageContexts: ['INFANT', 'TODDLER'],
    observationCategory: 'MOVEMENT',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PERSISTENT',
    urgencyContext: 'ROUTINE_DISCUSSION',
    caregiverObservation: L(
      'You might notice a child feeling softer or floppier than expected, or taking longer with early movement skills, as a persistent pattern.',
      'آپ محسوس کر سکتے ہیں کہ بچہ توقع سے زیادہ نرم یا ڈھیلا محسوس ہو، یا ابتدائی حرکتی مہارتوں میں زیادہ وقت لے، ایک مسلسل انداز میں۔',
    ),
    whatToNotice: L(
      'Whether concerns are persistent and appear together with unusual flexibility. Subtypes differ, so context matters.',
      'کیا خدشات مسلسل ہیں اور غیر معمولی لچک کے ساتھ ظاہر ہوتے ہیں۔ ذیلی اقسام مختلف ہوتی ہیں، اس لیے سیاق و سباق اہم ہے۔',
    ),
    whatNotToAssume: L(
      'Variation in early movement is common and usually normal. It does not by itself indicate EDS, and it is not the same across subtypes.',
      'ابتدائی حرکت میں فرق عام اور عام طور پر معمول ہے۔ یہ خود بخود EDS کی نشاندہی نہیں کرتا، اور یہ تمام ذیلی اقسام میں یکساں نہیں ہوتا۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'PHYSIOTHERAPIST', 'OCCUPATIONAL_THERAPIST'],
    referenceIds: ['eds-society-types', 'medlineplus-eds'],
    displayOrder: 4,
    lastReviewed: '2026-06-20',
  },
];
