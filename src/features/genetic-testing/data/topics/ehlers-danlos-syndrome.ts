import type { LocalizedText } from '@/types';
import type { GeneticTestingTopicRecord } from '../../types';

/**
 * Ehlers-Danlos syndrome testing education (spec §23).
 *
 * CRITICAL SCIENTIFIC REQUIREMENT: preserve EDS subtype distinctions. Do NOT
 * imply genetic testing confirms every EDS type. Hypermobile EDS (hEDS) must NOT
 * be presented as having a routine confirmatory molecular test where current
 * science does not support that claim (spec §23). Content is subtype-aware and
 * referenced. No personal risk inference (§17).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const EHLERS_DANLOS_SYNDROME_TESTING: readonly GeneticTestingTopicRecord[] = [
  {
    id: 'eds-testing-by-subtype',
    title: L('Ehlers-Danlos testing differs by subtype', 'ایہلرز-ڈانلوس ٹیسٹنگ ذیلی قسم کے مطابق مختلف'),
    shortDescription: L(
      'EDS is a group of subtypes, and whether a confirmatory genetic test exists depends on the specific subtype.',
      'EDS ذیلی اقسام کا ایک گروہ ہے، اور کیا کوئی تصدیقی جینیاتی ٹیسٹ موجود ہے یہ مخصوص ذیلی قسم پر منحصر ہے۔',
    ),
    testingCategory: 'DIAGNOSTIC_GENETIC_TESTING',
    audienceContexts: ['FAMILY_WITH_KNOWN_HISTORY', 'PARENT_OR_GUARDIAN', 'INDIVIDUAL'],
    lifeStageContexts: ['GENERAL', 'AFTER_CHILD_DIAGNOSIS', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['ehlers-danlos-syndrome'],
    relatedInheritancePatterns: ['VARIES_BY_SUBTYPE', 'AUTOSOMAL_DOMINANT'],
    whatItIs: L(
      'The Ehlers-Danlos syndromes are a group of subtypes. For several subtypes, a genetic change has been identified and molecular testing may be part of assessment; for others it may not be, so the approach depends on the subtype.',
      'ایہلرز-ڈانلوس سنڈرومز ذیلی اقسام کا ایک گروہ ہیں۔ کئی ذیلی اقسام کے لیے کوئی جینیاتی تبدیلی شناخت ہو چکی ہے اور مالیکیولر ٹیسٹنگ جانچ کا حصہ ہو سکتی ہے؛ دیگر کے لیے شاید نہ ہو، اس لیے طریقہ ذیلی قسم پر منحصر ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed when a specialist is assessing which EDS subtype fits a person’s clinical picture.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جب کوئی ماہر جانچ رہا ہو کہ کون سی EDS ذیلی قسم کسی شخص کی طبی تصویر سے مطابقت رکھتی ہے۔',
    ),
    whatItCanTellYou: L(
      'For subtypes with an identified genetic cause, testing may support a diagnosis alongside clinical assessment.',
      'شناخت شدہ جینیاتی وجہ والی ذیلی اقسام کے لیے، ٹیسٹنگ طبی جانچ کے ساتھ تشخیص میں معاونت کر سکتی ہے۔',
    ),
    whatItCannotTellYou: L(
      'Genetic testing does not confirm every EDS type. For some subtypes, diagnosis is based on clinical criteria rather than a molecular test, so a test does not apply in the same way across subtypes.',
      'جینیاتی ٹیسٹنگ ہر EDS قسم کی تصدیق نہیں کرتی۔ کچھ ذیلی اقسام کے لیے تشخیص کسی مالیکیولر ٹیسٹ کے بجائے طبی معیارات پر مبنی ہوتی ہے، اس لیے ٹیسٹ تمام ذیلی اقسام میں ایک جیسے طریقے سے لاگو نہیں ہوتا۔',
    ),
    beforeTesting: L(
      'It can help to ask which subtype is being considered and whether a genetic test applies to that subtype.',
      'یہ پوچھنا مددگار ہو سکتا ہے کہ کون سی ذیلی قسم زیرِ غور ہے اور کیا کوئی جینیاتی ٹیسٹ اُس ذیلی قسم پر لاگو ہوتا ہے۔',
    ),
    afterTesting: L(
      'A geneticist or specialist explains what a result means for the specific subtype in question.',
      'کوئی جینیٹسسٹ یا ماہر سمجھاتا ہے کہ نتیجہ زیرِ بحث مخصوص ذیلی قسم کے لیے کیا مطلب رکھتا ہے۔',
    ),
    questionsToAsk: [
      L('Which EDS subtype is being considered?', 'کون سی EDS ذیلی قسم زیرِ غور ہے؟'),
      L('Does a genetic test apply to this subtype, or is diagnosis clinical?', 'کیا کوئی جینیاتی ٹیسٹ اس ذیلی قسم پر لاگو ہوتا ہے، یا تشخیص طبی ہے؟'),
    ],
    professionalTypeIds: ['MEDICAL_GENETICIST', 'GENETIC_COUNSELLOR', 'ORTHOPAEDIC_SPECIALIST'],
    referenceIds: ['eds-society-types', 'medlineplus-eds'],
    contentNotice: L(
      'Testing is not the same across EDS subtypes. Genetic testing does not confirm every EDS type.',
      'تمام EDS ذیلی اقسام میں ٹیسٹنگ ایک جیسی نہیں۔ جینیاتی ٹیسٹنگ ہر EDS قسم کی تصدیق نہیں کرتی۔',
    ),
    displayOrder: 14,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'eds-hypermobile-testing',
    title: L('Hypermobile EDS and genetic testing', 'ہائپر موبائل EDS اور جینیاتی ٹیسٹنگ'),
    shortDescription: L(
      'For hypermobile EDS, current science does not support a routine confirmatory molecular test, diagnosis is clinical.',
      'ہائپر موبائل EDS کے لیے، موجودہ سائنس کسی معمول کے تصدیقی مالیکیولر ٹیسٹ کی حمایت نہیں کرتی، تشخیص طبی ہوتی ہے۔',
    ),
    testingCategory: 'DIAGNOSTIC_GENETIC_TESTING',
    audienceContexts: ['INDIVIDUAL', 'PARENT_OR_GUARDIAN', 'FAMILY_WITH_KNOWN_HISTORY'],
    lifeStageContexts: ['GENERAL', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['ehlers-danlos-syndrome'],
    diseaseSubtypeId: 'hypermobile-eds',
    relatedInheritancePatterns: ['OTHER'],
    whatItIs: L(
      'Hypermobile EDS (hEDS) is one EDS subtype. Unlike some other subtypes, it currently has no single confirmatory genetic (molecular) test, and diagnosis is based on clinical criteria assessed by a professional.',
      'ہائپر موبائل EDS (hEDS) ایک EDS ذیلی قسم ہے۔ کچھ دیگر ذیلی اقسام کے برعکس، فی الحال اس کا کوئی واحد تصدیقی جینیاتی (مالیکیولر) ٹیسٹ نہیں، اور تشخیص کسی پیشہ ور کے جانچے گئے طبی معیارات پر مبنی ہوتی ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed to explain why a person with suspected hEDS may not be offered a confirmatory genetic test in the way some other subtypes are.',
      'یہ اس بات کی وضاحت کے لیے زیرِ بحث آ سکتی ہے کہ مشتبہ hEDS والے شخص کو کسی تصدیقی جینیاتی ٹیسٹ کی پیشکش اُس طرح کیوں نہ ہو جیسے کچھ دیگر ذیلی اقسام کو ہوتی ہے۔',
    ),
    whatItCanTellYou: L(
      'Genetic testing may sometimes be used to help rule out other subtypes that do have identified genetic causes.',
      'جینیاتی ٹیسٹنگ کبھی کبھی اُن دیگر ذیلی اقسام کو خارج کرنے میں مدد کے لیے استعمال ہو سکتی ہے جن کی شناخت شدہ جینیاتی وجوہات ہیں۔',
    ),
    whatItCannotTellYou: L(
      'Shared Blood does not present hEDS as having a routine confirmatory molecular test, because current science does not support that. A negative genetic test does not rule out hEDS.',
      'شیئرڈ بلڈ hEDS کو کسی معمول کے تصدیقی مالیکیولر ٹیسٹ والا پیش نہیں کرتا، کیونکہ موجودہ سائنس اس کی حمایت نہیں کرتی۔ منفی جینیاتی ٹیسٹ hEDS کو خارج نہیں کرتا۔',
    ),
    beforeTesting: L(
      'It can help to understand that a clinical assessment, not a single gene test, is central to identifying hEDS.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ hEDS کی شناخت میں کسی واحد جین ٹیسٹ کے بجائے طبی جانچ مرکزی ہوتی ہے۔',
    ),
    afterTesting: L(
      'A geneticist or specialist explains how clinical criteria and any tests fit together for the individual.',
      'کوئی جینیٹسسٹ یا ماہر سمجھاتا ہے کہ فرد کے لیے طبی معیارات اور کوئی بھی ٹیسٹ کیسے ایک ساتھ آتے ہیں۔',
    ),
    questionsToAsk: [
      L('Is a genetic test used to confirm hypermobile EDS, or to look at other subtypes?', 'کیا جینیاتی ٹیسٹ ہائپر موبائل EDS کی تصدیق کے لیے استعمال ہوتا ہے، یا دیگر ذیلی اقسام دیکھنے کے لیے؟'),
    ],
    professionalTypeIds: ['MEDICAL_GENETICIST', 'GENETIC_COUNSELLOR', 'ORTHOPAEDIC_SPECIALIST'],
    referenceIds: ['eds-society-types', 'medlineplus-eds'],
    contentNotice: L(
      'Hypermobile EDS currently has no routine confirmatory genetic test; diagnosis is clinical. A negative genetic test does not rule it out.',
      'ہائپر موبائل EDS کا فی الحال کوئی معمول کا تصدیقی جینیاتی ٹیسٹ نہیں؛ تشخیص طبی ہوتی ہے۔ منفی جینیاتی ٹیسٹ اسے خارج نہیں کرتا۔',
    ),
    displayOrder: 15,
    lastReviewed: '2026-07-01',
  },
];
