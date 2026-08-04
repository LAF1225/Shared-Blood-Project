import type { LocalizedText } from '@/types';
import type { ProfessionalTypeRecord } from '../types';

/**
 * Professional-type educational records (spec §31/§33/§34). These explain what
 * a kind of professional generally does — they are NOT a hospital or specialist
 * directory (spec §32) and never claim a particular professional will diagnose
 * the condition. Associations are curated, not inferred (spec §34).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const PROFESSIONAL_TYPE_RECORDS: readonly ProfessionalTypeRecord[] = [
  {
    id: 'PAEDIATRICIAN',
    label: L('Paediatrician', 'ماہرِ اطفال (پیڈیاٹریشن)'),
    description: L(
      'A doctor who specialises in the health of babies and children and is often the first specialist a family sees about a child’s health concern.',
      'ایک ڈاکٹر جو بچوں کی صحت میں مہارت رکھتا ہے اور اکثر بچے کی صحت کے بارے میں خاندان سے ملنے والا پہلا ماہر ہوتا ہے۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedObservationCategories: ['GROWTH', 'FEEDING', 'DEVELOPMENT', 'ENERGY', 'INFECTION_PATTERN'],
    displayOrder: 1,
  },
  {
    id: 'GENERAL_PHYSICIAN',
    label: L('General physician / family doctor', 'جنرل فزیشن / فیملی ڈاکٹر'),
    description: L(
      'A doctor who assesses general health concerns and can arrange further tests or refer to a specialist when needed.',
      'ایک ڈاکٹر جو عمومی صحت کے مسائل کا جائزہ لیتا ہے اور ضرورت پڑنے پر مزید ٹیسٹ یا کسی ماہر کے پاس بھیج سکتا ہے۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedObservationCategories: ['ENERGY', 'INFECTION_PATTERN', 'PAIN_OR_DISCOMFORT', 'OTHER'],
    displayOrder: 2,
  },
  {
    id: 'HAEMATOLOGIST',
    label: L('Haematologist', 'ماہرِ امراضِ خون (ہیماٹولوجسٹ)'),
    description: L(
      'A doctor who focuses on blood and blood-forming organs, including inherited conditions that affect red blood cells.',
      'ایک ڈاکٹر جو خون اور خون بنانے والے اعضاء پر توجہ دیتا ہے، بشمول وہ موروثی حالتیں جو خون کے سرخ خلیوں کو متاثر کرتی ہیں۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia'],
    relatedObservationCategories: ['ENERGY', 'APPEARANCE', 'GROWTH'],
    displayOrder: 3,
  },
  {
    id: 'PULMONOLOGIST',
    label: L('Pulmonologist (lung specialist)', 'ماہرِ امراضِ پھیپھڑے (پلمونولوجسٹ)'),
    description: L(
      'A doctor who focuses on the lungs and breathing, including long-term and recurring respiratory conditions.',
      'ایک ڈاکٹر جو پھیپھڑوں اور سانس پر توجہ دیتا ہے، بشمول دیرینہ اور بار بار ہونے والی تنفسی حالتیں۔',
    ),
    relatedDiseaseIds: ['cystic-fibrosis'],
    relatedObservationCategories: ['BREATHING', 'INFECTION_PATTERN'],
    displayOrder: 4,
  },
  {
    id: 'GASTROENTEROLOGIST',
    label: L('Gastroenterologist (digestive specialist)', 'ماہرِ امراضِ ہاضمہ (گیسٹرو اینٹرولوجسٹ)'),
    description: L(
      'A doctor who focuses on digestion and the gut, including problems with absorbing nutrients from food.',
      'ایک ڈاکٹر جو ہاضمے اور آنتوں پر توجہ دیتا ہے، بشمول کھانے سے غذائیت جذب کرنے کے مسائل۔',
    ),
    relatedDiseaseIds: ['cystic-fibrosis'],
    relatedObservationCategories: ['DIGESTION', 'GROWTH', 'FEEDING'],
    displayOrder: 5,
  },
  {
    id: 'MEDICAL_GENETICIST',
    label: L('Medical geneticist', 'میڈیکل جینیٹسسٹ'),
    description: L(
      'A doctor with special training in inherited conditions who can help confirm a diagnosis and explain what it means for the family.',
      'ایک ڈاکٹر جو موروثی حالتوں میں خصوصی تربیت رکھتا ہے اور تشخیص کی تصدیق اور خاندان کے لیے اس کے معنی سمجھانے میں مدد کر سکتا ہے۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedObservationCategories: ['DEVELOPMENT', 'GROWTH', 'JOINTS', 'OTHER'],
    displayOrder: 6,
  },
  {
    id: 'GENETIC_COUNSELLOR',
    label: L('Genetic counsellor', 'جینیاتی مشیر (جینیٹک کونسلر)'),
    description: L(
      'A professional who helps families understand inherited conditions, testing options, and what results may mean, in supportive, non-judgemental terms.',
      'ایک پیشہ ور جو خاندانوں کو موروثی حالتیں، جانچ کے اختیارات اور نتائج کے ممکنہ معنی سمجھنے میں مدد دیتا ہے، معاون اور غیر جانبدار انداز میں۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedObservationCategories: ['DEVELOPMENT', 'OTHER'],
    displayOrder: 7,
  },
  {
    id: 'METABOLIC_SPECIALIST',
    label: L('Metabolic specialist', 'میٹابولک ماہر'),
    description: L(
      'A doctor who focuses on conditions that affect how the body breaks down and stores substances, including many lysosomal storage disorders.',
      'ایک ڈاکٹر جو ان حالتوں پر توجہ دیتا ہے جو اس بات کو متاثر کرتی ہیں کہ جسم مادوں کو کیسے توڑتا اور محفوظ کرتا ہے، بشمول کئی لائسوسومل اسٹوریج ڈس آرڈرز۔',
    ),
    relatedDiseaseIds: ['lysosomal-storage-disorders'],
    relatedObservationCategories: ['DEVELOPMENT', 'MOVEMENT', 'APPEARANCE'],
    displayOrder: 8,
  },
  {
    id: 'NEUROLOGIST',
    label: L('Neurologist', 'ماہرِ اعصاب (نیورولوجسٹ)'),
    description: L(
      'A doctor who focuses on the brain, nerves, and movement, including changes in development or previously acquired abilities.',
      'ایک ڈاکٹر جو دماغ، اعصاب اور حرکت پر توجہ دیتا ہے، بشمول نشوونما یا پہلے سے حاصل کردہ صلاحیتوں میں تبدیلیاں۔',
    ),
    relatedDiseaseIds: ['lysosomal-storage-disorders'],
    relatedObservationCategories: ['DEVELOPMENT', 'MOVEMENT', 'MUSCLE_TONE'],
    displayOrder: 9,
  },
  {
    id: 'CARDIOLOGIST',
    label: L('Cardiologist (heart specialist)', 'ماہرِ امراضِ قلب (کارڈیولوجسٹ)'),
    description: L(
      'A doctor who focuses on the heart and blood vessels.',
      'ایک ڈاکٹر جو دل اور خون کی نالیوں پر توجہ دیتا ہے۔',
    ),
    relatedDiseaseIds: ['ehlers-danlos-syndrome'],
    relatedObservationCategories: ['OTHER'],
    displayOrder: 10,
  },
  {
    id: 'ORTHOPAEDIC_SPECIALIST',
    label: L('Orthopaedic specialist', 'ماہرِ ہڈی و جوڑ (آرتھوپیڈک)'),
    description: L(
      'A doctor who focuses on bones, joints, and muscles, including joint instability.',
      'ایک ڈاکٹر جو ہڈیوں، جوڑوں اور پٹھوں پر توجہ دیتا ہے، بشمول جوڑوں کی عدم استحکام۔',
    ),
    relatedDiseaseIds: ['ehlers-danlos-syndrome'],
    relatedObservationCategories: ['JOINTS', 'MOVEMENT'],
    displayOrder: 11,
  },
  {
    id: 'PHYSIOTHERAPIST',
    label: L('Physiotherapist', 'فزیوتھراپسٹ'),
    description: L(
      'A professional who helps with movement, strength, and joint support through exercises and practical guidance.',
      'ایک پیشہ ور جو ورزشوں اور عملی رہنمائی کے ذریعے حرکت، طاقت اور جوڑوں کی مدد میں معاونت کرتا ہے۔',
    ),
    relatedDiseaseIds: ['ehlers-danlos-syndrome', 'lysosomal-storage-disorders'],
    relatedObservationCategories: ['JOINTS', 'MOVEMENT', 'MUSCLE_TONE'],
    displayOrder: 12,
  },
  {
    id: 'OCCUPATIONAL_THERAPIST',
    label: L('Occupational therapist', 'آکوپیشنل تھراپسٹ'),
    description: L(
      'A professional who helps a child manage everyday activities and build practical skills.',
      'ایک پیشہ ور جو بچے کو روزمرہ کے کاموں میں مدد اور عملی مہارتیں بنانے میں معاونت کرتا ہے۔',
    ),
    relatedDiseaseIds: ['ehlers-danlos-syndrome', 'lysosomal-storage-disorders'],
    relatedObservationCategories: ['MOVEMENT', 'DEVELOPMENT'],
    displayOrder: 13,
  },
  {
    id: 'DIETITIAN',
    label: L('Dietitian', 'ماہرِ غذائیت (ڈائٹیشن)'),
    description: L(
      'A professional who gives practical guidance about nutrition, feeding, and healthy growth.',
      'ایک پیشہ ور جو غذائیت، خوراک اور صحت مند نشوونما کے بارے میں عملی رہنمائی دیتا ہے۔',
    ),
    relatedDiseaseIds: ['cystic-fibrosis', 'beta-thalassemia'],
    relatedObservationCategories: ['FEEDING', 'GROWTH', 'DIGESTION'],
    displayOrder: 14,
  },
  {
    id: 'OTHER',
    label: L('Other healthcare professional', 'دیگر صحت کا پیشہ ور'),
    description: L(
      'Depending on the concern, other trained healthcare professionals may also be involved in a child’s care.',
      'مسئلے کے مطابق، بچے کی نگہداشت میں دیگر تربیت یافتہ صحت کے پیشہ ور بھی شامل ہو سکتے ہیں۔',
    ),
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedObservationCategories: ['OTHER'],
    displayOrder: 15,
  },
];

export function getProfessionalTypeRecord(id: string): ProfessionalTypeRecord | null {
  return PROFESSIONAL_TYPE_RECORDS.find((record) => record.id === id) ?? null;
}
