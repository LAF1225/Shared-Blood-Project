import type { LocalizedText } from '@/types';
import type { GeneticTestingTopicRecord } from '../../types';

/**
 * Cystic fibrosis carrier-testing education (spec §21).
 *
 * BOUNDARIES: explain autosomal recessive inheritance, carrier status, two-
 * carrier relevance, family history, and disease-causing variants. Do NOT imply
 * a negative limited-panel result eliminates all possible CF-related genetic
 * risk (spec §21). No personal risk inference (§17); no result interpretation
 * (§28).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const CYSTIC_FIBROSIS_TESTING: readonly GeneticTestingTopicRecord[] = [
  {
    id: 'cf-carrier-education',
    title: L('Cystic fibrosis carrier education', 'سسٹک فائبروسس کیریئر کی تعلیم'),
    shortDescription: L(
      'What carrier testing for cystic fibrosis looks at, and why a limited panel does not check every possible variant.',
      'سسٹک فائبروسس کے لیے کیریئر ٹیسٹنگ کیا دیکھتی ہے، اور محدود پینل ہر ممکنہ ویریئنٹ کیوں نہیں دیکھتا۔',
    ),
    testingCategory: 'CARRIER_TESTING',
    audienceContexts: ['GENERAL_PUBLIC', 'INDIVIDUAL', 'COUPLE', 'PROSPECTIVE_PARENT', 'FAMILY_WITH_KNOWN_HISTORY'],
    lifeStageContexts: ['GENERAL', 'BEFORE_MARRIAGE', 'BEFORE_PREGNANCY', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['cystic-fibrosis'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'Cystic fibrosis is inherited in an autosomal recessive pattern. A carrier has one altered copy of the CFTR gene and usually does not have the condition, but can pass the altered copy to children.',
      'سسٹک فائبروسس آٹوسومل ریسیسِو طرز میں وراثت میں ملتی ہے۔ ایک کیریئر CFTR جین کی ایک تبدیل شدہ نقل رکھتا ہے اور عام طور پر اسے یہ حالت نہیں ہوتی، مگر وہ تبدیل شدہ نقل بچوں کو منتقل کر سکتا ہے۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed where there is a family history of CF, where partners share ancestry, or when a couple wishes to understand carrier status.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جہاں CF کی خاندانی تاریخ ہو، جہاں شراکت داروں کے اجداد مشترک ہوں، یا جب کوئی جوڑا کیریئر اسٹیٹس سمجھنا چاہے۔',
    ),
    whatItCanTellYou: L(
      'It may indicate whether a person carries one of the disease-causing variants that the specific test panel examined.',
      'یہ ظاہر کر سکتی ہے کہ آیا کوئی شخص اُن مرض پیدا کرنے والے ویریئنٹس میں سے کوئی رکھتا ہے جنہیں مخصوص ٹیسٹ پینل نے دیکھا۔',
    ),
    whatItCannotTellYou: L(
      'A negative result on a limited panel does not eliminate all possible CF-related genetic risk, because many different CFTR variants exist and a panel checks only some of them.',
      'محدود پینل پر منفی نتیجہ ہر ممکنہ CF سے متعلق جینیاتی خطرے کو ختم نہیں کرتا، کیونکہ CFTR کے بہت سے مختلف ویریئنٹس موجود ہیں اور پینل ان میں سے صرف کچھ کو دیکھتا ہے۔',
    ),
    beforeTesting: L(
      'It can help to ask which variants a panel examines and what a negative result would and would not mean for that particular test.',
      'یہ پوچھنا مددگار ہو سکتا ہے کہ کوئی پینل کون سے ویریئنٹس دیکھتا ہے اور اُس مخصوص ٹیسٹ کے لیے منفی نتیجہ کیا مطلب رکھے گا اور کیا نہیں۔',
    ),
    afterTesting: L(
      'A genetics professional can explain a CF carrier result in a person’s context, including the limits of the specific panel used.',
      'کوئی جینیٹکس پیشہ ور شخص کے سیاق و سباق میں CF کیریئر نتیجہ سمجھا سکتا ہے، بشمول استعمال شدہ مخصوص پینل کی حدود۔',
    ),
    questionsToAsk: [
      L('Which CFTR variants does this panel examine?', 'یہ پینل CFTR کے کون سے ویریئنٹس دیکھتا ہے؟'),
      L('What would a negative result mean, and what would it not rule out?', 'منفی نتیجہ کیا مطلب رکھے گا، اور یہ کس چیز کو خارج نہیں کرے گا؟'),
    ],
    professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST', 'PULMONOLOGIST'],
    referenceIds: ['medlineplus-cystic-fibrosis', 'cff-carrier-testing'],
    contentNotice: L(
      'A negative result on a limited carrier panel does not mean "no CF risk". Different tests examine different variants, a genetics professional can explain the limits.',
      'محدود کیریئر پینل پر منفی نتیجہ کا مطلب ”کوئی CF خطرہ نہیں“ نہیں۔ مختلف ٹیسٹ مختلف ویریئنٹس دیکھتے ہیں، کوئی جینیٹکس پیشہ ور حدود سمجھا سکتا ہے۔',
    ),
    displayOrder: 11,
    lastReviewed: '2026-07-01',
  },
];
