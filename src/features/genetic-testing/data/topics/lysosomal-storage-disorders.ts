import type { LocalizedText } from '@/types';
import type { GeneticTestingTopicRecord } from '../../types';

/**
 * Lysosomal storage disorder testing education (spec §22).
 *
 * CRITICAL: there is NO single "LSD genetic test" — testing differs between
 * disorders in the group. Group-level education may discuss genetic, biochemical,
 * enzymatic, or other clinical approaches WITHOUT instructing users to select a
 * test (spec §22). Subtype-specific content uses diseaseSubtypeId. No personal
 * risk inference (§17).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LYSOSOMAL_STORAGE_DISORDERS_TESTING: readonly GeneticTestingTopicRecord[] = [
  {
    id: 'lsd-testing-overview',
    title: L('Testing across the lysosomal storage disorders', 'لائسوسومل اسٹوریج ڈس آرڈرز میں ٹیسٹنگ'),
    shortDescription: L(
      'Lysosomal storage disorders are a broad group, and testing differs between them; there is no single "LSD test".',
      'لائسوسومل اسٹوریج ڈس آرڈرز ایک وسیع گروہ ہیں، اور ان کے درمیان ٹیسٹنگ مختلف ہوتی ہے، کوئی واحد ”ایل ایس ڈی ٹیسٹ“ نہیں۔',
    ),
    testingCategory: 'DIAGNOSTIC_GENETIC_TESTING',
    audienceContexts: ['FAMILY_WITH_KNOWN_HISTORY', 'PARENT_OR_GUARDIAN', 'INDIVIDUAL'],
    lifeStageContexts: ['GENERAL', 'AFTER_CHILD_DIAGNOSIS', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['lysosomal-storage-disorders'],
    relatedInheritancePatterns: ['VARIES_BY_SUBTYPE', 'AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Because this is a group of different disorders, the way each one is investigated varies. Approaches can include genetic, biochemical, enzyme-activity, or other clinical assessments, depending on the specific disorder.',
      'چونکہ یہ مختلف عوارض کا ایک گروہ ہے، ہر ایک کی جانچ کا طریقہ مختلف ہوتا ہے۔ طریقے میں مخصوص عارضے کے مطابق جینیاتی، بایوکیمیکل، اینزائم-سرگرمی، یا دیگر طبی جانچ شامل ہو سکتی ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed when a doctor is investigating a possible disorder in this group, or after a diagnosis in a relative.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جب کوئی ڈاکٹر اس گروہ میں کسی ممکنہ عارضے کی تحقیق کر رہا ہو، یا کسی رشتہ دار میں تشخیص کے بعد۔',
    ),
    whatItCanTellYou: L(
      'Depending on the specific disorder, an appropriate test may help a specialist understand or confirm what is happening.',
      'مخصوص عارضے کے مطابق، ایک موزوں ٹیسٹ کسی ماہر کو سمجھنے یا تصدیق کرنے میں مدد دے سکتا ہے کہ کیا ہو رہا ہے۔',
    ),
    whatItCannotTellYou: L(
      'There is no single genetic test that covers all lysosomal storage disorders. Shared Blood does not tell a user which test to select, a metabolic specialist decides what is appropriate.',
      'کوئی واحد جینیاتی ٹیسٹ نہیں جو تمام لائسوسومل اسٹوریج ڈس آرڈرز کا احاطہ کرے۔ شیئرڈ بلڈ صارف کو نہیں بتاتا کہ کون سا ٹیسٹ منتخب کرے، کوئی میٹابولک ماہر طے کرتا ہے کہ کیا موزوں ہے۔',
    ),
    beforeTesting: L(
      'It can help to understand that the right approach depends on the specific disorder being considered, guided by a specialist.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ درست طریقہ زیرِ غور مخصوص عارضے پر منحصر ہے، جس کی رہنمائی کوئی ماہر کرتا ہے۔',
    ),
    afterTesting: L(
      'A metabolic specialist or geneticist explains what a result means for the specific disorder in question.',
      'کوئی میٹابولک ماہر یا جینیٹسسٹ سمجھاتا ہے کہ نتیجہ زیرِ بحث مخصوص عارضے کے لیے کیا مطلب رکھتا ہے۔',
    ),
    questionsToAsk: [
      L('Which specific disorder is being investigated, and what approach fits it?', 'کس مخصوص عارضے کی تحقیق ہو رہی ہے، اور اس کے لیے کون سا طریقہ موزوں ہے؟'),
      L('Who coordinates testing for this group of disorders?', 'اس گروہ کے عوارض کے لیے ٹیسٹنگ کون منظم کرتا ہے؟'),
    ],
    professionalTypeIds: ['METABOLIC_SPECIALIST', 'MEDICAL_GENETICIST', 'GENETIC_COUNSELLOR'],
    referenceIds: ['nord-lysosomal', 'gard-rare-disease'],
    contentNotice: L(
      'There is no single "LSD genetic test". Testing differs between disorders, and the right approach is decided by a specialist for the specific disorder.',
      'کوئی واحد ”ایل ایس ڈی جینیاتی ٹیسٹ“ نہیں۔ عوارض کے درمیان ٹیسٹنگ مختلف ہوتی ہے، اور درست طریقہ کسی ماہر کے ذریعے مخصوص عارضے کے لیے طے ہوتا ہے۔',
    ),
    displayOrder: 12,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'lsd-gaucher-family-testing',
    title: L('Gaucher disease: family and carrier context', 'گاؤچر بیماری: خاندانی اور کیریئر سیاق و سباق'),
    shortDescription: L(
      'For this specific disorder, family variant or carrier information may sometimes be discussed; this does not apply to every disorder in the group.',
      'اس مخصوص عارضے کے لیے، خاندانی ویریئنٹ یا کیریئر معلومات کبھی کبھی زیرِ بحث آ سکتی ہیں، یہ گروہ کے ہر عارضے پر لاگو نہیں ہوتا۔',
    ),
    testingCategory: 'FAMILY_VARIANT_TESTING',
    audienceContexts: ['FAMILY_WITH_KNOWN_HISTORY', 'INDIVIDUAL', 'COUPLE'],
    lifeStageContexts: ['GENERAL', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['lysosomal-storage-disorders'],
    diseaseSubtypeId: 'gaucher-disease',
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Gaucher disease is one specific disorder within the group. Where a particular variant is already known in a family, relatives may sometimes discuss carrier or family variant testing with a specialist.',
      'گاؤچر بیماری گروہ کے اندر ایک مخصوص عارضہ ہے۔ جہاں کسی خاندان میں کوئی خاص ویریئنٹ پہلے سے معلوم ہو، رشتہ دار کبھی کبھی کسی ماہر کے ساتھ کیریئر یا خاندانی ویریئنٹ ٹیسٹنگ پر بات کر سکتے ہیں۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed after a diagnosis in a relative, to understand inheritance within that specific family.',
      'یہ کسی رشتہ دار میں تشخیص کے بعد زیرِ بحث آ سکتی ہے، تاکہ اُس مخصوص خاندان میں وراثت کو سمجھا جا سکے۔',
    ),
    whatItCanTellYou: L(
      'It may show whether a relative carries the same specific change already identified in the family.',
      'یہ ظاہر کر سکتی ہے کہ آیا کوئی رشتہ دار وہی مخصوص تبدیلی رکھتا ہے جو پہلے ہی خاندان میں شناخت ہو چکی ہے۔',
    ),
    whatItCannotTellYou: L(
      'This guidance is specific to one disorder and does not apply to every lysosomal storage disorder. It does not mean every relative requires testing.',
      'یہ رہنمائی ایک عارضے کے لیے مخصوص ہے اور ہر لائسوسومل اسٹوریج ڈس آرڈر پر لاگو نہیں ہوتی۔ اس کا مطلب یہ نہیں کہ ہر رشتہ دار کو ٹیسٹنگ درکار ہے۔',
    ),
    beforeTesting: L(
      'A metabolic specialist or genetics professional can explain who the information might be relevant to within one family.',
      'کوئی میٹابولک ماہر یا جینیٹکس پیشہ ور سمجھا سکتا ہے کہ ایک خاندان میں معلومات کس کے لیے متعلقہ ہو سکتی ہے۔',
    ),
    afterTesting: L(
      'The meaning of a result is discussed individually with a specialist, not assumed from a relative’s result.',
      'نتیجے کا مطلب کسی ماہر کے ساتھ انفرادی طور پر زیرِ بحث آتا ہے، کسی رشتہ دار کے نتیجے سے فرض نہیں کیا جاتا۔',
    ),
    questionsToAsk: [
      L('Is this information specific to our family’s particular disorder?', 'کیا یہ معلومات ہمارے خاندان کے مخصوص عارضے کے لیے مخصوص ہیں؟'),
      L('Who can explain what a result would mean for a relative?', 'کون سمجھا سکتا ہے کہ نتیجہ کسی رشتہ دار کے لیے کیا مطلب رکھے گا؟'),
    ],
    professionalTypeIds: ['METABOLIC_SPECIALIST', 'GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['gard-rare-disease', 'nord-lysosomal'],
    contentNotice: L(
      'This applies to one specific disorder within the group, not to all lysosomal storage disorders.',
      'یہ گروہ کے اندر ایک مخصوص عارضے پر لاگو ہوتا ہے، تمام لائسوسومل اسٹوریج ڈس آرڈرز پر نہیں۔',
    ),
    displayOrder: 13,
    lastReviewed: '2026-07-01',
  },
];
