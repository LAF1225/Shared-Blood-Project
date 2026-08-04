import type { LocalizedText } from '@/types';
import type { GeneticTestingTopicRecord } from '../../types';

/**
 * General (non-disease-specific) testing-education topics (spec §12/§13).
 *
 * All content is educational and uses "may be discussed in situations where…"
 * framing — NEVER "you need this test" (spec §13). Nothing here infers personal
 * risk, carrier status, or a testing recommendation (spec §17). Screening is
 * kept distinct from diagnostic testing (spec §38), and population/newborn
 * screening never claims universal Pakistani implementation (spec §39/§40).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GENERAL_TESTING_TOPICS: readonly GeneticTestingTopicRecord[] = [
  {
    id: 'gt-carrier-testing',
    title: L('Understanding carrier testing', 'کیریئر ٹیسٹنگ کو سمجھنا'),
    shortDescription: L(
      'Carrier testing may be discussed when learning whether a person carries one altered copy of a gene linked to a recessive condition.',
      'کیریئر ٹیسٹنگ اُس وقت زیرِ بحث آ سکتی ہے جب یہ جاننا ہو کہ آیا کوئی شخص کسی ریسیسِو حالت سے منسلک جین کی ایک تبدیل شدہ نقل رکھتا ہے۔',
    ),
    testingCategory: 'CARRIER_TESTING',
    audienceContexts: ['GENERAL_PUBLIC', 'INDIVIDUAL', 'COUPLE', 'PROSPECTIVE_PARENT'],
    lifeStageContexts: ['GENERAL', 'BEFORE_MARRIAGE', 'BEFORE_PREGNANCY'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'A carrier usually has one altered copy of a gene associated with an autosomal recessive condition and one working copy. Carrier testing looks for whether a person carries such an altered copy.',
      'ایک کیریئر عام طور پر کسی آٹوسومل ریسیسِو حالت سے منسلک جین کی ایک تبدیل شدہ نقل اور ایک کام کرنے والی نقل رکھتا ہے۔ کیریئر ٹیسٹنگ یہ دیکھتی ہے کہ آیا کوئی شخص ایسی تبدیل شدہ نقل رکھتا ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed when there is a family history of a recessive condition, when partners share ancestry, or when a couple wishes to understand inheritance before or after marriage. It is a personal, voluntary choice.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جب کسی ریسیسِو حالت کی خاندانی تاریخ ہو، شراکت داروں کے اجداد مشترک ہوں، یا کوئی جوڑا شادی سے پہلے یا بعد میں وراثت کو سمجھنا چاہے۔ یہ ایک ذاتی، اختیاری انتخاب ہے۔',
    ),
    whatItCanTellYou: L(
      'It may indicate whether a person carries a particular altered copy that the test examined, which can be relevant to understanding inheritance within a family.',
      'یہ ظاہر کر سکتی ہے کہ آیا کوئی شخص کوئی خاص تبدیل شدہ نقل رکھتا ہے جسے ٹیسٹ نے دیکھا، جو خاندان میں وراثت کو سمجھنے کے لیے متعلقہ ہو سکتی ہے۔',
    ),
    whatItCannotTellYou: L(
      'A carrier result does not mean a person has the disorder, and being a carrier is not the same as being sick. A result only covers what the specific test examined; it cannot rule out every possible variant.',
      'کیریئر نتیجہ اس بات کا مطلب نہیں کہ شخص کو مرض ہے، اور کیریئر ہونا بیمار ہونے کے مترادف نہیں۔ نتیجہ صرف اُسی چیز کا احاطہ کرتا ہے جو مخصوص ٹیسٹ نے دیکھی، یہ ہر ممکنہ تبدیلی کو خارج نہیں کر سکتا۔',
    ),
    beforeTesting: L(
      'It can help to understand which condition or genes the test examines, why it is being considered, and that carrier information can sometimes be relevant to biological relatives.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ ٹیسٹ کون سی حالت یا جینز دیکھتا ہے، اسے کیوں زیرِ غور لایا جا رہا ہے، اور یہ کہ کیریئر معلومات کبھی کبھی حیاتیاتی رشتہ داروں کے لیے متعلقہ ہو سکتی ہے۔',
    ),
    afterTesting: L(
      'A genetics professional can explain what a result means in a person’s own context. Shared Blood does not interpret results.',
      'کوئی جینیٹکس پیشہ ور شخص کے اپنے سیاق و سباق میں نتیجے کا مطلب سمجھا سکتا ہے۔ شیئرڈ بلڈ نتائج کی تشریح نہیں کرتا۔',
    ),
    questionsToAsk: [
      L('What condition or genes is this test examining?', 'یہ ٹیسٹ کون سی حالت یا جینز دیکھ رہا ہے؟'),
      L('What could the result mean, and could it be uncertain?', 'نتیجہ کیا مطلب رکھ سکتا ہے، اور کیا یہ غیر یقینی ہو سکتا ہے؟'),
      L('Could the result be relevant to biological relatives?', 'کیا نتیجہ حیاتیاتی رشتہ داروں کے لیے متعلقہ ہو سکتا ہے؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['medlineplus-carrier-testing'],
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-diagnostic-testing',
    title: L('Understanding diagnostic genetic testing', 'تشخیصی جینیاتی ٹیسٹنگ کو سمجھنا'),
    shortDescription: L(
      'Diagnostic genetic testing is one possible part of a broader assessment, not a single conclusive answer.',
      'تشخیصی جینیاتی ٹیسٹنگ ایک وسیع تر جانچ کا ایک ممکنہ حصہ ہے، کوئی واحد قطعی جواب نہیں۔',
    ),
    testingCategory: 'DIAGNOSTIC_GENETIC_TESTING',
    audienceContexts: ['INDIVIDUAL', 'PARENT_OR_GUARDIAN', 'FAMILY_WITH_KNOWN_HISTORY'],
    lifeStageContexts: ['GENERAL', 'AFTER_CHILD_DIAGNOSIS', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE', 'AUTOSOMAL_DOMINANT', 'VARIES_BY_SUBTYPE'],
    whatItIs: L(
      'Diagnostic genetic testing looks for a specific genetic change in a person who may already have signs of a condition. It is usually one part of an assessment that can also involve history, examination, family history, laboratory tests, imaging, or specialist review.',
      'تشخیصی جینیاتی ٹیسٹنگ کسی ایسے شخص میں مخصوص جینیاتی تبدیلی تلاش کرتی ہے جس میں پہلے سے کسی حالت کی علامات ہو سکتی ہیں۔ یہ عام طور پر ایک جانچ کا ایک حصہ ہوتی ہے جس میں تاریخ، معائنہ، خاندانی تاریخ، لیبارٹری ٹیسٹ، امیجنگ، یا ماہرانہ جائزہ بھی شامل ہو سکتا ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed when a doctor is investigating a possible genetic condition and wants to confirm or clarify a diagnosis.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جب کوئی ڈاکٹر کسی ممکنہ جینیاتی حالت کی تحقیق کر رہا ہو اور تشخیص کی تصدیق یا وضاحت کرنا چاہے۔',
    ),
    whatItCanTellYou: L(
      'It may identify a specific genetic change that helps explain a condition, which can guide a care team’s understanding.',
      'یہ کوئی مخصوص جینیاتی تبدیلی شناخت کر سکتی ہے جو کسی حالت کی وضاحت میں مدد دے، اور نگہداشت ٹیم کی سمجھ کی رہنمائی کر سکتی ہے۔',
    ),
    whatItCannotTellYou: L(
      'Genetic testing is not universally conclusive. Not finding a change does not always rule out a condition, and the meaning of a result depends on the test, the condition, and current knowledge.',
      'جینیاتی ٹیسٹنگ عالمگیر طور پر قطعی نہیں ہوتی۔ کوئی تبدیلی نہ ملنا ہمیشہ کسی حالت کو خارج نہیں کرتا، اور نتیجے کا مطلب ٹیسٹ، حالت، اور موجودہ علم پر منحصر ہے۔',
    ),
    beforeTesting: L(
      'It can help to understand which condition is being investigated and what different results might mean.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ کس حالت کی تحقیق ہو رہی ہے اور مختلف نتائج کا کیا مطلب ہو سکتا ہے۔',
    ),
    afterTesting: L(
      'A genetics or specialist professional interprets a diagnostic result within the person’s full clinical picture.',
      'کوئی جینیٹکس یا ماہر پیشہ ور شخص کی مکمل طبی تصویر میں تشخیصی نتیجے کی تشریح کرتا ہے۔',
    ),
    questionsToAsk: [
      L('What condition is this test investigating?', 'یہ ٹیسٹ کس حالت کی تحقیق کر رہا ہے؟'),
      L('Does a result confirm or rule out a diagnosis, or is more assessment sometimes needed?', 'کیا نتیجہ تشخیص کی تصدیق یا نفی کرتا ہے، یا کبھی مزید جانچ درکار ہوتی ہے؟'),
    ],
    professionalTypeIds: ['MEDICAL_GENETICIST', 'GENETIC_COUNSELLOR', 'PAEDIATRICIAN'],
    referenceIds: ['medlineplus-genetic-testing', 'genereviews'],
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-family-variant-testing',
    title: L('Family variant and cascade testing', 'خاندانی ویریئنٹ اور کیسکیڈ ٹیسٹنگ'),
    shortDescription: L(
      'When a specific genetic change is already known in a family, relatives may sometimes discuss testing for that same change.',
      'جب کسی خاندان میں کوئی مخصوص جینیاتی تبدیلی پہلے سے معلوم ہو، تو رشتہ دار کبھی کبھی اسی تبدیلی کے لیے ٹیسٹنگ پر بات کر سکتے ہیں۔',
    ),
    testingCategory: 'FAMILY_VARIANT_TESTING',
    audienceContexts: ['FAMILY_WITH_KNOWN_HISTORY', 'INDIVIDUAL', 'COUPLE'],
    lifeStageContexts: ['GENERAL', 'AFTER_RELATIVE_DIAGNOSIS', 'AFTER_CHILD_DIAGNOSIS'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE', 'AUTOSOMAL_DOMINANT'],
    whatItIs: L(
      'Family variant testing looks for a particular genetic change that has already been identified in a relative. Cascade testing describes offering this to relatives step by step where relevant.',
      'خاندانی ویریئنٹ ٹیسٹنگ کوئی خاص جینیاتی تبدیلی تلاش کرتی ہے جو پہلے ہی کسی رشتہ دار میں شناخت ہو چکی ہو۔ کیسکیڈ ٹیسٹنگ اس بات کو بیان کرتی ہے کہ جہاں متعلقہ ہو، یہ رشتہ داروں کو قدم بہ قدم پیش کیا جائے۔',
    ),
    whyItMayBeDiscussed: L(
      'Because genetic variants may be shared between biological relatives, a finding in one person can sometimes be relevant to family members who choose to learn more.',
      'چونکہ جینیاتی تبدیلیاں حیاتیاتی رشتہ داروں میں مشترک ہو سکتی ہیں، ایک شخص میں کوئی نتیجہ کبھی کبھی اُن خاندان کے افراد کے لیے متعلقہ ہو سکتا ہے جو مزید جاننا چاہتے ہیں۔',
    ),
    whatItCanTellYou: L(
      'It may show whether a relative carries the same specific change already identified in the family.',
      'یہ ظاہر کر سکتی ہے کہ آیا کوئی رشتہ دار وہی مخصوص تبدیلی رکھتا ہے جو پہلے ہی خاندان میں شناخت ہو چکی ہے۔',
    ),
    whatItCannotTellYou: L(
      'It does not mean every relative requires testing. Whether to test is a personal choice, and Shared Blood does not generate a list of relatives to test.',
      'اس کا مطلب یہ نہیں کہ ہر رشتہ دار کو ٹیسٹنگ درکار ہے۔ ٹیسٹ کرانا یا نہ کرانا ایک ذاتی انتخاب ہے، اور شیئرڈ بلڈ ٹیسٹ کرانے والے رشتہ داروں کی فہرست نہیں بناتا۔',
    ),
    beforeTesting: L(
      'A genetics professional can explain who in a family the information might be relevant to, and how a relative may choose whether to learn it.',
      'کوئی جینیٹکس پیشہ ور سمجھا سکتا ہے کہ خاندان میں معلومات کس کے لیے متعلقہ ہو سکتی ہے، اور کوئی رشتہ دار اسے جاننے کا انتخاب کیسے کر سکتا ہے۔',
    ),
    afterTesting: L(
      'The meaning of a result for a relative is discussed individually with a professional, not assumed from another family member’s result.',
      'کسی رشتہ دار کے لیے نتیجے کا مطلب کسی پیشہ ور کے ساتھ انفرادی طور پر زیرِ بحث آتا ہے، کسی دوسرے خاندان کے فرد کے نتیجے سے فرض نہیں کیا جاتا۔',
    ),
    questionsToAsk: [
      L('Could this finding be relevant to biological relatives?', 'کیا یہ نتیجہ حیاتیاتی رشتہ داروں کے لیے متعلقہ ہو سکتا ہے؟'),
      L('How can a relative choose whether to learn this information?', 'کوئی رشتہ دار یہ معلومات جاننے کا انتخاب کیسے کر سکتا ہے؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['nhgri-genetic-testing-faq', 'medlineplus-genetic-testing'],
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-preconception',
    title: L('Preconception genetic education', 'حملِ سے قبل جینیاتی تعلیم'),
    shortDescription: L(
      'Some individuals or couples learn about carrier status and inheritance before pregnancy. This is high-level education, not a recommendation.',
      'کچھ افراد یا جوڑے حمل سے پہلے کیریئر اسٹیٹس اور وراثت کے بارے میں جانتے ہیں۔ یہ اعلیٰ سطحی تعلیم ہے، کوئی سفارش نہیں۔',
    ),
    testingCategory: 'PRECONCEPTION_TESTING',
    audienceContexts: ['COUPLE', 'PROSPECTIVE_PARENT', 'INDIVIDUAL'],
    lifeStageContexts: ['BEFORE_MARRIAGE', 'AFTER_MARRIAGE', 'BEFORE_PREGNANCY'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Preconception education covers understanding inheritance, family history, and the kinds of testing that some couples choose to learn about before planning a pregnancy.',
      'حملِ سے قبل تعلیم وراثت، خاندانی تاریخ، اور اُن اقسامِ ٹیسٹنگ کو سمجھنے کا احاطہ کرتی ہے جن کے بارے میں کچھ جوڑے حمل کی منصوبہ بندی سے پہلے جاننے کا انتخاب کرتے ہیں۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed when a couple wishes to understand inheritance in their own circumstances. Choices remain entirely personal.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جب کوئی جوڑا اپنے حالات میں وراثت کو سمجھنا چاہے۔ انتخاب مکمل طور پر ذاتی رہتے ہیں۔',
    ),
    whatItCanTellYou: L(
      'It can help a couple understand what questions to bring to a genetics professional and what options exist to learn more.',
      'یہ کسی جوڑے کو یہ سمجھنے میں مدد دے سکتی ہے کہ جینیٹکس پیشہ ور کے پاس کون سے سوالات لے جائیں اور مزید جاننے کے لیے کون سے اختیارات موجود ہیں۔',
    ),
    whatItCannotTellYou: L(
      'It does not decide whether a couple should marry or have children, and it never labels a couple as "compatible" or "incompatible".',
      'یہ فیصلہ نہیں کرتی کہ کسی جوڑے کو شادی کرنی چاہیے یا بچے پیدا کرنے چاہئیں، اور یہ کبھی کسی جوڑے کو ”ہم آہنگ“ یا ”غیر ہم آہنگ“ کا لیبل نہیں دیتی۔',
    ),
    beforeTesting: L(
      'Understanding one’s own family history and questions in advance can make a conversation with a professional more useful.',
      'اپنی خاندانی تاریخ اور سوالات پہلے سے سمجھنا کسی پیشہ ور سے گفتگو کو زیادہ مفید بنا سکتا ہے۔',
    ),
    afterTesting: L(
      'Any decisions belong to the individuals involved, supported by non-directive genetic counselling where available.',
      'کوئی بھی فیصلے متعلقہ افراد کے ہیں، جہاں دستیاب ہو غیر ہدایتی جینیاتی مشاورت کی معاونت کے ساتھ۔',
    ),
    questionsToAsk: [
      L('What options exist to understand inheritance in our situation?', 'ہماری صورتحال میں وراثت کو سمجھنے کے لیے کون سے اختیارات موجود ہیں؟'),
      L('Where is genetic counselling available to us?', 'ہمارے لیے جینیاتی مشاورت کہاں دستیاب ہے؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['who-community-genetics', 'medlineplus-carrier-testing'],
    contentNotice: L(
      'This is educational only. Shared Blood does not make marriage or reproductive decisions and never judges whether a couple should marry or have children.',
      'یہ صرف تعلیمی ہے۔ شیئرڈ بلڈ شادی یا تولیدی فیصلے نہیں کرتا اور کبھی فیصلہ نہیں کرتا کہ کسی جوڑے کو شادی کرنی چاہیے یا بچے پیدا کرنے چاہئیں۔',
    ),
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-prenatal-education',
    title: L('Prenatal testing education', 'حمل کے دوران ٹیسٹنگ کی تعلیم'),
    shortDescription: L(
      'A high-level explanation of prenatal testing, and how screening differs from diagnostic testing.',
      'حمل کے دوران ٹیسٹنگ کی اعلیٰ سطحی وضاحت، اور یہ کہ اسکریننگ تشخیصی ٹیسٹنگ سے کیسے مختلف ہے۔',
    ),
    testingCategory: 'PRENATAL_TESTING_EDUCATION',
    audienceContexts: ['COUPLE', 'PROSPECTIVE_PARENT'],
    lifeStageContexts: ['DURING_PREGNANCY', 'BEFORE_PREGNANCY'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Prenatal testing describes tests that may be discussed during pregnancy. Screening estimates whether there may be an increased chance of a condition, while diagnostic testing is used to determine whether a specific condition is present.',
      'حمل کے دوران ٹیسٹنگ اُن ٹیسٹوں کو بیان کرتی ہے جو حمل کے دوران زیرِ بحث آ سکتے ہیں۔ اسکریننگ اندازہ لگاتی ہے کہ آیا کسی حالت کے امکان میں اضافہ ہو سکتا ہے، جبکہ تشخیصی ٹیسٹنگ یہ طے کرنے کے لیے استعمال ہوتی ہے کہ آیا کوئی مخصوص حالت موجود ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed by a maternity or genetics team during pregnancy care. Whether to have any test is a personal decision.',
      'یہ حمل کی نگہداشت کے دوران زچگی یا جینیٹکس ٹیم کے ذریعے زیرِ بحث آ سکتی ہے۔ کوئی ٹیسٹ کرانا یا نہ کرانا ایک ذاتی فیصلہ ہے۔',
    ),
    whatItCanTellYou: L(
      'Depending on the specific test, it may give information about the chance of, or the presence of, a particular condition.',
      'مخصوص ٹیسٹ کے مطابق، یہ کسی خاص حالت کے امکان یا موجودگی کے بارے میں معلومات دے سکتی ہے۔',
    ),
    whatItCannotTellYou: L(
      'Shared Blood does not provide pregnancy diagnosis, fetal prognosis, personalized testing timing, or any recommendation to continue or end a pregnancy.',
      'شیئرڈ بلڈ حمل کی تشخیص، جنین کی پیش گوئی، ذاتی ٹیسٹنگ کے اوقات، یا حمل جاری رکھنے یا ختم کرنے کی کوئی سفارش فراہم نہیں کرتا۔',
    ),
    beforeTesting: L(
      'It can help to understand whether a test is a screening test or a diagnostic test, and what each may or may not tell you.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ کوئی ٹیسٹ اسکریننگ ٹیسٹ ہے یا تشخیصی ٹیسٹ، اور ہر ایک آپ کو کیا بتا سکتا یا نہیں بتا سکتا۔',
    ),
    afterTesting: L(
      'The meaning of a prenatal result is explained by the maternity or genetics team within the pregnancy’s own context.',
      'حمل کے دوران کسی نتیجے کا مطلب زچگی یا جینیٹکس ٹیم حمل کے اپنے سیاق و سباق میں سمجھاتی ہے۔',
    ),
    questionsToAsk: [
      L('Is this a screening test or a diagnostic test?', 'کیا یہ اسکریننگ ٹیسٹ ہے یا تشخیصی ٹیسٹ؟'),
      L('What could each result mean, and what are the options?', 'ہر نتیجہ کیا مطلب رکھ سکتا ہے، اور اختیارات کیا ہیں؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST', 'PAEDIATRICIAN'],
    referenceIds: ['nhs-screening-vs-diagnostic'],
    contentNotice: L(
      'Pregnancy content is educational only. Shared Blood never recommends continuing or ending a pregnancy, or any procedure.',
      'حمل سے متعلق مواد صرف تعلیمی ہے۔ شیئرڈ بلڈ کبھی حمل جاری رکھنے یا ختم کرنے، یا کسی طریقہ کار کی سفارش نہیں کرتا۔',
    ),
    displayOrder: 5,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-newborn-screening',
    title: L('Newborn screening education', 'نوزائیدہ اسکریننگ کی تعلیم'),
    shortDescription: L(
      'A conceptual explanation of newborn screening, what it generally is, not a claim about what every hospital offers.',
      'نوزائیدہ اسکریننگ کی تصوراتی وضاحت، یہ عمومی طور پر کیا ہے، اس کا دعویٰ نہیں کہ ہر ہسپتال کیا پیش کرتا ہے۔',
    ),
    testingCategory: 'NEWBORN_SCREENING_EDUCATION',
    audienceContexts: ['PARENT_OR_GUARDIAN', 'PROSPECTIVE_PARENT', 'GENERAL_PUBLIC'],
    lifeStageContexts: ['GENERAL', 'DURING_PREGNANCY'],
    relatedDiseaseIds: ['cystic-fibrosis'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Newborn screening is testing offered in some places soon after birth to check for certain conditions early, so that care can begin sooner if needed.',
      'نوزائیدہ اسکریننگ کچھ جگہوں پر پیدائش کے فوراً بعد پیش کی جانے والی جانچ ہے تاکہ بعض حالتوں کا جلد پتہ چلایا جا سکے، اور ضرورت پڑنے پر نگہداشت جلد شروع ہو سکے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed as part of general education about how some conditions can be identified early.',
      'یہ اس عمومی تعلیم کے حصے کے طور پر زیرِ بحث آ سکتی ہے کہ بعض حالتوں کا جلد پتہ کیسے چلایا جا سکتا ہے۔',
    ),
    whatItCanTellYou: L(
      'Where it is available, it may flag whether a baby should have further assessment for a particular condition.',
      'جہاں دستیاب ہو، یہ اشارہ دے سکتی ہے کہ آیا کسی بچے کی کسی خاص حالت کے لیے مزید جانچ ہونی چاہیے۔',
    ),
    whatItCannotTellYou: L(
      'Availability differs by place. Shared Blood does not claim that Pakistan has universal newborn screening for every condition, country-specific claims require current evidence.',
      'دستیابی جگہ کے مطابق مختلف ہوتی ہے۔ شیئرڈ بلڈ یہ دعویٰ نہیں کرتا کہ پاکستان میں ہر حالت کے لیے عالمگیر نوزائیدہ اسکریننگ موجود ہے، ملک کے مخصوص دعوے موجودہ شواہد کے متقاضی ہیں۔',
    ),
    beforeTesting: L(
      'Families can ask their maternity team what newborn testing, if any, is available where they give birth.',
      'خاندان اپنی زچگی ٹیم سے پوچھ سکتے ہیں کہ جہاں وہ بچے کی پیدائش کراتے ہیں وہاں کون سی نوزائیدہ جانچ، اگر کوئی ہے، دستیاب ہے۔',
    ),
    afterTesting: L(
      'Any screening result that needs follow-up is explained and managed by the care team.',
      'کوئی بھی اسکریننگ نتیجہ جس کے لیے فالو اپ درکار ہو، نگہداشت ٹیم اسے سمجھاتی اور سنبھالتی ہے۔',
    ),
    questionsToAsk: [
      L('What newborn testing, if any, is available where we give birth?', 'جہاں ہم بچے کی پیدائش کراتے ہیں وہاں کون سی نوزائیدہ جانچ، اگر کوئی ہے، دستیاب ہے؟'),
    ],
    professionalTypeIds: ['PAEDIATRICIAN', 'MEDICAL_GENETICIST'],
    referenceIds: ['nhs-genetic-testing', 'who-community-genetics'],
    displayOrder: 6,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-population-screening',
    title: L('Population screening education', 'آبادی کی اسکریننگ کی تعلیم'),
    shortDescription: L(
      'A general explanation of population screening, using beta thalassemia as one example where community programmes exist.',
      'آبادی کی اسکریننگ کی عمومی وضاحت، بیٹا تھیلیسیمیا کو ایک مثال کے طور پر جہاں کمیونٹی پروگرام موجود ہیں۔',
    ),
    testingCategory: 'POPULATION_SCREENING_EDUCATION',
    audienceContexts: ['GENERAL_PUBLIC', 'COUPLE', 'INDIVIDUAL'],
    lifeStageContexts: ['GENERAL', 'BEFORE_MARRIAGE'],
    relatedDiseaseIds: ['beta-thalassemia'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Population screening offers testing to a group of people, for example, to identify carriers of a common recessive condition in a community.',
      'آبادی کی اسکریننگ لوگوں کے ایک گروہ کو ٹیسٹنگ پیش کرتی ہے، مثال کے طور پر، کسی کمیونٹی میں کسی عام ریسیسِو حالت کے کیریئرز کی شناخت کے لیے۔',
    ),
    whyItMayBeDiscussed: L(
      'Beta thalassemia carrier screening has been part of community and premarital programmes in some settings, aiming to help people understand carrier status.',
      'بیٹا تھیلیسیمیا کیریئر اسکریننگ بعض جگہوں پر کمیونٹی اور شادی سے قبل کے پروگراموں کا حصہ رہی ہے، جس کا مقصد لوگوں کو کیریئر اسٹیٹس سمجھنے میں مدد دینا ہے۔',
    ),
    whatItCanTellYou: L(
      'It can help people in a community learn about carrier status so they can seek further information if they wish.',
      'یہ کسی کمیونٹی کے لوگوں کو کیریئر اسٹیٹس کے بارے میں جاننے میں مدد دے سکتی ہے تاکہ وہ چاہیں تو مزید معلومات حاصل کر سکیں۔',
    ),
    whatItCannotTellYou: L(
      'Shared Blood does not claim that any particular screening programme is universally implemented or enforced across Pakistan; such claims need current evidence.',
      'شیئرڈ بلڈ یہ دعویٰ نہیں کرتا کہ کوئی خاص اسکریننگ پروگرام پاکستان بھر میں عالمگیر طور پر نافذ ہے؛ ایسے دعوے موجودہ شواہد کے متقاضی ہیں۔',
    ),
    beforeTesting: L(
      'Understanding what a screening programme examines, and that participation is a personal choice, can help people decide.',
      'یہ سمجھنا کہ کوئی اسکریننگ پروگرام کیا دیکھتا ہے، اور شرکت ایک ذاتی انتخاب ہے، لوگوں کو فیصلہ کرنے میں مدد دے سکتا ہے۔',
    ),
    afterTesting: L(
      'A carrier result from screening can be discussed with a genetics professional to understand what it may mean.',
      'اسکریننگ سے کیریئر نتیجہ کسی جینیٹکس پیشہ ور کے ساتھ زیرِ بحث لایا جا سکتا ہے تاکہ سمجھا جا سکے کہ اس کا کیا مطلب ہو سکتا ہے۔',
    ),
    questionsToAsk: [
      L('What does this screening programme examine, and is taking part my choice?', 'یہ اسکریننگ پروگرام کیا دیکھتا ہے، اور کیا اس میں شامل ہونا میرا انتخاب ہے؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'HAEMATOLOGIST', 'MEDICAL_GENETICIST'],
    referenceIds: ['who-community-genetics', 'ahmed-thalassaemia-pakistan'],
    contentNotice: L(
      'Shared Blood does not state whether any premarital or thalassaemia testing law is currently mandatory or enforced in Pakistan. Ask a qualified source for current, local information.',
      'شیئرڈ بلڈ یہ نہیں بتاتا کہ آیا پاکستان میں شادی سے قبل یا تھیلیسیمیا ٹیسٹنگ کا کوئی قانون فی الحال لازمی یا نافذ ہے۔ موجودہ، مقامی معلومات کے لیے کسی مستند ذریعے سے پوچھیں۔',
    ),
    displayOrder: 7,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'gt-family-history-review',
    title: L('Reviewing your family history', 'اپنی خاندانی تاریخ کا جائزہ'),
    shortDescription: L(
      'Family history is educational context, the kinds of things a genetics professional may ask about. It is not used to calculate personal risk.',
      'خاندانی تاریخ ایک تعلیمی سیاق و سباق ہے، وہ باتیں جن کے بارے میں کوئی جینیٹکس پیشہ ور پوچھ سکتا ہے۔ اسے ذاتی خطرے کے حساب کے لیے استعمال نہیں کیا جاتا۔',
    ),
    testingCategory: 'FAMILY_HISTORY_REVIEW',
    audienceContexts: ['GENERAL_PUBLIC', 'INDIVIDUAL', 'COUPLE', 'FAMILY_WITH_KNOWN_HISTORY'],
    lifeStageContexts: ['GENERAL', 'BEFORE_MARRIAGE', 'BEFORE_PREGNANCY', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE', 'AUTOSOMAL_DOMINANT', 'VARIES_BY_SUBTYPE'],
    whatItIs: L(
      'Family history includes things like known genetic diagnoses, the same condition appearing more than once, known carrier status, and whether biological parents share ancestry.',
      'خاندانی تاریخ میں معلوم جینیاتی تشخیص، ایک ہی حالت کا ایک سے زیادہ بار ظاہر ہونا، معلوم کیریئر اسٹیٹس، اور یہ کہ آیا حیاتیاتی والدین کے اجداد مشترک ہیں، جیسی باتیں شامل ہیں۔',
    ),
    whyItMayBeDiscussed: L(
      'A genetics professional may ask about family history to understand context. Knowing this in advance can make a conversation more useful.',
      'کوئی جینیٹکس پیشہ ور سیاق و سباق سمجھنے کے لیے خاندانی تاریخ کے بارے میں پوچھ سکتا ہے۔ اسے پہلے سے جاننا گفتگو کو زیادہ مفید بنا سکتا ہے۔',
    ),
    whatItCanTellYou: L(
      'Reviewing family history can help a person prepare questions and share relevant background with a professional.',
      'خاندانی تاریخ کا جائزہ کسی شخص کو سوالات تیار کرنے اور کسی پیشہ ور کے ساتھ متعلقہ پس منظر بانٹنے میں مدد دے سکتا ہے۔',
    ),
    whatItCannotTellYou: L(
      'Shared Blood does not use family history to calculate a personal disease probability, and it never stores a family tree or any family details.',
      'شیئرڈ بلڈ خاندانی تاریخ کو ذاتی بیماری کے امکان کے حساب کے لیے استعمال نہیں کرتا، اور یہ کبھی کوئی خاندانی شجرہ یا خاندان کی تفصیلات محفوظ نہیں کرتا۔',
    ),
    beforeTesting: L(
      'A generic preparation checklist (below) can help gather this background privately, without submitting anything to Shared Blood.',
      'ایک عمومی تیاری کی چیک لسٹ (نیچے) یہ پس منظر نجی طور پر جمع کرنے میں مدد دے سکتی ہے، بغیر شیئرڈ بلڈ کو کچھ جمع کرائے۔',
    ),
    afterTesting: L(
      'Family-history information is best shared directly with a qualified professional who can discuss what it may mean.',
      'خاندانی تاریخ کی معلومات بہترین طور پر براہِ راست کسی مستند پیشہ ور کے ساتھ بانٹی جاتی ہیں جو یہ بات کر سکتا ہے کہ اس کا کیا مطلب ہو سکتا ہے۔',
    ),
    questionsToAsk: [
      L('Is there a known genetic condition or carrier status in our family?', 'کیا ہمارے خاندان میں کوئی معلوم جینیاتی حالت یا کیریئر اسٹیٹس ہے؟'),
      L('Do the biological parents share ancestry, and is that relevant to discuss?', 'کیا حیاتیاتی والدین کے اجداد مشترک ہیں، اور کیا یہ زیرِ بحث لانے کے قابل ہے؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['nhgri-genetic-testing-faq', 'medlineplus-genetic-testing'],
    displayOrder: 8,
    lastReviewed: '2026-07-01',
  },
];
