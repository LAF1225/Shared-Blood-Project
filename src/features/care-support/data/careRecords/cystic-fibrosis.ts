import type { LocalizedText } from '@/types';
import type { CareSupportRecord } from '../../types';

/**
 * Cystic fibrosis care & support records (spec §25).
 *
 * BOUNDARIES: the module may explain that respiratory care can involve
 * specialised equipment, but must NOT provide airway-clearance prescriptions,
 * device settings, nebuliser medication instructions, universal cleaning
 * protocols, or treatment frequencies (spec §25). Nutrition is discussed only at
 * a general educational level — no disease-specific meal plans (spec §50/§51).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const CYSTIC_FIBROSIS_CARE: readonly CareSupportRecord[] = [
  {
    id: 'cf-daily-care-routine',
    diseaseId: 'cystic-fibrosis',
    title: L('Supporting a daily care routine', 'روزمرہ نگہداشت کے معمول میں معاونت'),
    shortDescription: L(
      'Care can involve a regular routine, sometimes with specialised equipment, that the care team sets and teaches.',
      'نگہداشت میں ایک باقاعدہ معمول شامل ہو سکتا ہے، کبھی کبھی مخصوص سامان کے ساتھ، جسے نگہداشت ٹیم طے اور سکھاتی ہے۔',
    ),
    careDomain: 'MEDICAL_ROUTINE_AWARENESS',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'MEDICAL_ROUTINE_SUPPORT',
    whyItMayMatter: L(
      'A daily routine can take time and consistency. Understanding that a routine exists, and building it into everyday life, helps caregivers support the child, while the details always come from the care team.',
      'روزمرہ معمول میں وقت اور تسلسل درکار ہو سکتا ہے۔ یہ سمجھنا کہ ایک معمول موجود ہے، اور اسے روزمرہ زندگی میں شامل کرنا، نگہداشت کرنے والوں کو بچے کی مدد میں معاون ہوتا ہے، جبکہ تفصیلات ہمیشہ نگہداشت ٹیم سے آتی ہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Respiratory care can involve specialised equipment for some children; how it is used, its settings, and cleaning are taught only by the care team.',
        'کچھ بچوں کی تنفسی نگہداشت میں مخصوص سامان شامل ہو سکتا ہے؛ اسے کیسے استعمال کرنا ہے، اس کی سیٹنگز اور صفائی صرف نگہداشت ٹیم سکھاتی ہے۔',
      ),
      L(
        'Building a routine into a predictable part of the day can make it easier for children to accept.',
        'معمول کو دن کے ایک متوقع حصے میں شامل کرنا بچوں کے لیے اسے قبول کرنا آسان بنا سکتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve a regular daily routine and periodic reviews with the care team.',
        'نگہداشت میں کبھی کبھی روزمرہ کا باقاعدہ معمول اور نگہداشت ٹیم کے ساتھ وقتاً فوقتاً جائزے شامل ہو سکتے ہیں۔',
      ),
    ],
    questionsToAsk: [
      L('Can the care team show us how to support the daily routine at home?', 'کیا نگہداشت ٹیم ہمیں دکھا سکتی ہے کہ گھر پر روزمرہ معمول میں کیسے مدد کریں؟'),
      L('What changes in breathing or coughing should we report, and how quickly?', 'سانس یا کھانسی میں کن تبدیلیوں کو ہمیں بتانا چاہیے، اور کتنی جلدی؟'),
    ],
    suggestedProfessionalTypes: ['PULMONOLOGIST', 'PAEDIATRICIAN', 'PHYSIOTHERAPIST'],
    supportItemIds: ['respiratory-support-equipment'],
    referenceIds: ['cff-daily-care', 'nhs-cystic-fibrosis-living'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    contentNotice: L(
      'Shared Blood does not provide airway-clearance instructions, device settings, medication amounts, cleaning protocols, or treatment frequencies. These come only from the care team.',
      'شیئرڈ بلڈ ہوا کی نالی صاف کرنے کی ہدایات، آلے کی سیٹنگز، ادویات کی مقدار، صفائی کے طریقے، یا علاج کی تعداد فراہم نہیں کرتا۔ یہ صرف نگہداشت ٹیم سے آتے ہیں۔',
    ),
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'cf-nutrition-and-growth',
    diseaseId: 'cystic-fibrosis',
    title: L('Nutrition and growth awareness', 'غذائیت اور نشوونما سے آگاہی'),
    shortDescription: L(
      'Some children have different nutritional needs; a dietitian and care team guide what is right for the individual child.',
      'کچھ بچوں کی غذائی ضروریات مختلف ہوتی ہیں؛ ماہرِ غذائیت اور نگہداشت ٹیم رہنمائی کرتی ہے کہ انفرادی بچے کے لیے کیا درست ہے۔',
    ),
    careDomain: 'NUTRITION_AWARENESS',
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'EVERYDAY_SUPPORT',
    whyItMayMatter: L(
      'Growth and nutrition can be an important part of care for some children. General awareness helps caregivers work with a dietitian; this is not a diet plan.',
      'کچھ بچوں کی نگہداشت میں نشوونما اور غذائیت اہم حصہ ہو سکتی ہے۔ عمومی آگاہی نگہداشت کرنے والوں کو ماہرِ غذائیت کے ساتھ کام کرنے میں مدد دیتی ہے، یہ کوئی غذائی منصوبہ نہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Feeding needs vary between children; significant feeding difficulty or poor weight gain should be professionally assessed.',
        'بچوں کے درمیان خوراک کی ضروریات مختلف ہوتی ہیں؛ کھانے کی نمایاں دشواری یا وزن کا کم بڑھنا کسی پیشہ ور سے جانچنا چاہیے۔',
      ),
      L(
        'Any specific dietary needs or supplements come from the care team, not from a general website.',
        'کوئی بھی مخصوص غذائی ضروریات یا سپلیمنٹ نگہداشت ٹیم سے آتے ہیں، کسی عمومی ویب سائٹ سے نہیں۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve monitoring growth and working with a dietitian over time.',
        'نگہداشت میں کبھی کبھی نشوونما کی نگرانی اور وقت کے ساتھ ماہرِ غذائیت کے ساتھ کام شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Are there feeding or nutrition needs specific to our child we should know about?', 'کیا ہمارے بچے کی کوئی مخصوص خوراک یا غذائی ضروریات ہیں جن کے بارے میں ہمیں جاننا چاہیے؟'),
      L('When should we return if feeding or weight gain becomes a concern?', 'اگر کھانا یا وزن بڑھنا تشویش بن جائے تو ہمیں کب واپس آنا چاہیے؟'),
    ],
    suggestedProfessionalTypes: ['DIETITIAN', 'GASTROENTEROLOGIST', 'PAEDIATRICIAN'],
    supportItemIds: ['feeding-support-equipment'],
    referenceIds: ['cff-nutrition'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'cf-infection-awareness',
    diseaseId: 'cystic-fibrosis',
    title: L('Everyday infection awareness', 'روزمرہ انفیکشن سے آگاہی'),
    shortDescription: L(
      'General hygiene and knowing when to seek advice can be part of supporting some children.',
      'عمومی صفائی اور یہ جاننا کہ کب مشورہ لینا ہے، کچھ بچوں کی مدد کا حصہ ہو سکتا ہے۔',
    ),
    careDomain: 'INFECTION_AWARENESS',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'EVERYDAY_SUPPORT',
    whyItMayMatter: L(
      'For some children, everyday illnesses may need earlier attention. Knowing the care team’s advice about when to seek help supports timely care.',
      'کچھ بچوں کے لیے روزمرہ کی بیماریوں پر جلد توجہ درکار ہو سکتی ہے۔ نگہداشت ٹیم کا یہ مشورہ جاننا کہ مدد کب لینی ہے، بروقت نگہداشت میں معاون ہوتا ہے۔',
    ),
    practicalConsiderations: [
      L(
        'General hand hygiene and avoiding close contact with people who are unwell are ordinary, low-cost measures.',
        'عمومی ہاتھ کی صفائی اور بیمار افراد سے قریبی رابطے سے پرہیز عام اور کم لاگت اقدامات ہیں۔',
      ),
      L(
        'Ask the care team which signs of a chest infection should prompt an earlier review for the individual child.',
        'نگہداشت ٹیم سے پوچھیں کہ انفرادی بچے کے لیے سینے کے انفیکشن کی کن علامات پر جلد جائزہ لینا چاہیے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve watching for early signs of illness and seeking advice sooner than usual.',
        'نگہداشت میں کبھی کبھی بیماری کی ابتدائی علامات پر نظر رکھنا اور معمول سے جلد مشورہ لینا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Which signs of illness should we act on earlier for our child?', 'ہمارے بچے کے لیے بیماری کی کن علامات پر ہمیں جلد عمل کرنا چاہیے؟'),
    ],
    suggestedProfessionalTypes: ['PULMONOLOGIST', 'PAEDIATRICIAN', 'GENERAL_PHYSICIAN'],
    supportItemIds: [],
    referenceIds: ['nhs-cystic-fibrosis-living', 'who-child-danger-signs'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'SCHOOL_CAREGIVER', 'GENERAL_CAREGIVER'],
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'cf-appointment-and-records',
    diseaseId: 'cystic-fibrosis',
    title: L('Appointments and organised records', 'ملاقاتیں اور منظم ریکارڈ'),
    shortDescription: L(
      'Care often involves a multi-specialist team; organised information helps coordination.',
      'نگہداشت میں اکثر متعدد ماہرین کی ٹیم شامل ہوتی ہے؛ منظم معلومات ہم آہنگی میں مدد دیتی ہیں۔',
    ),
    careDomain: 'APPOINTMENT_PREPARATION',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'MEDICAL_ROUTINE_SUPPORT',
    whyItMayMatter: L(
      'When several professionals are involved, keeping a clear record of medicines, results, and questions helps each appointment go further.',
      'جب کئی پیشہ ور شامل ہوں تو ادویات، نتائج اور سوالات کا واضح ریکارڈ رکھنا ہر ملاقات کو زیادہ مفید بناتا ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Families may find themselves coordinating between clinics and keeping everyone’s advice in one place.',
        'خاندان کلینکس کے درمیان ہم آہنگی کرتے اور سب کے مشورے ایک جگہ رکھتے ہوئے پا سکتے ہیں۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve coordinating several specialists and organising records for visits.',
        'نگہداشت میں کبھی کبھی کئی ماہرین کے درمیان ہم آہنگی اور ملاقاتوں کے لیے ریکارڈ منظم کرنا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Who coordinates our child’s overall care, and how do we reach them?', 'ہمارے بچے کی مجموعی نگہداشت کون منظم کرتا ہے، اور ہم ان تک کیسے پہنچیں؟'),
    ],
    suggestedProfessionalTypes: ['PULMONOLOGIST', 'DIETITIAN', 'PAEDIATRICIAN'],
    supportItemIds: ['medical-document-folder'],
    referenceIds: ['cff-daily-care'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER'],
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
];
