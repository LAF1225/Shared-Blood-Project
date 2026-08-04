import type { LocalizedText } from '@/types';
import type { GeneticTestingTopicRecord } from '../../types';

/**
 * Beta-thalassemia carrier-testing education (spec §20).
 *
 * BOUNDARIES: explain carrier status, the beta-thalassemia trait, why two
 * carrier parents matter, and the distinction between trait and beta-thalassemia
 * major. NEVER describe a carrier as having beta-thalassemia major or as
 * inevitably becoming severely ill (spec §20). No personal risk inference (§17).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const BETA_THALASSEMIA_TESTING: readonly GeneticTestingTopicRecord[] = [
  {
    id: 'bt-carrier-education',
    title: L('Beta thalassemia carrier (trait) education', 'بیٹا تھیلیسیمیا کیریئر (ٹریٹ) کی تعلیم'),
    shortDescription: L(
      'What it means to carry the beta thalassemia trait, and why two carrier parents is the context that matters.',
      'بیٹا تھیلیسیمیا ٹریٹ رکھنے کا کیا مطلب ہے، اور دو کیریئر والدین وہ سیاق و سباق کیوں ہے جو اہمیت رکھتا ہے۔',
    ),
    testingCategory: 'CARRIER_TESTING',
    audienceContexts: ['GENERAL_PUBLIC', 'INDIVIDUAL', 'COUPLE', 'PROSPECTIVE_PARENT', 'FAMILY_WITH_KNOWN_HISTORY'],
    lifeStageContexts: ['GENERAL', 'BEFORE_MARRIAGE', 'BEFORE_PREGNANCY', 'AFTER_RELATIVE_DIAGNOSIS'],
    relatedDiseaseIds: ['beta-thalassemia'],
    relatedInheritancePatterns: ['AUTOSOMAL_RECESSIVE'],
    whatItIs: L(
      'A person with the beta thalassemia trait (a carrier) has one altered copy of the beta-globin gene and one working copy. This is different from beta thalassemia major, which involves alterations in both copies.',
      'بیٹا تھیلیسیمیا ٹریٹ (کیریئر) رکھنے والا شخص بیٹا-گلوبن جین کی ایک تبدیل شدہ نقل اور ایک کام کرنے والی نقل رکھتا ہے۔ یہ بیٹا تھیلیسیمیا میجر سے مختلف ہے، جس میں دونوں نقلوں میں تبدیلیاں شامل ہوتی ہیں۔',
    ),
    whyItMayBeDiscussed: L(
      'It may be discussed where there is a family history, where a couple shares ancestry, or as part of community and premarital education about carrier status.',
      'یہ اُس وقت زیرِ بحث آ سکتی ہے جہاں خاندانی تاریخ ہو، جہاں کسی جوڑے کے اجداد مشترک ہوں، یا کیریئر اسٹیٹس کے بارے میں کمیونٹی اور شادی سے قبل کی تعلیم کے حصے کے طور پر۔',
    ),
    whatItCanTellYou: L(
      'Carrier testing may indicate whether a person carries the trait. When two partners are both carriers, a genetics professional can explain how inheritance works for their situation.',
      'کیریئر ٹیسٹنگ ظاہر کر سکتی ہے کہ آیا کوئی شخص ٹریٹ رکھتا ہے۔ جب دونوں شراکت دار کیریئر ہوں، تو کوئی جینیٹکس پیشہ ور سمجھا سکتا ہے کہ ان کی صورتحال کے لیے وراثت کیسے کام کرتی ہے۔',
    ),
    whatItCannotTellYou: L(
      'Being a carrier does not mean a person has beta thalassemia major or will become severely ill. A carrier result about one person does not by itself determine what will happen in a future pregnancy.',
      'کیریئر ہونے کا مطلب یہ نہیں کہ شخص کو بیٹا تھیلیسیمیا میجر ہے یا وہ شدید بیمار ہو جائے گا۔ ایک شخص کے بارے میں کیریئر نتیجہ خود بخود یہ طے نہیں کرتا کہ مستقبل کے کسی حمل میں کیا ہوگا۔',
    ),
    beforeTesting: L(
      'It can help to understand that carrier testing looks at carrier status, and that a result may be relevant to biological relatives.',
      'یہ سمجھنا مددگار ہو سکتا ہے کہ کیریئر ٹیسٹنگ کیریئر اسٹیٹس کو دیکھتی ہے، اور یہ کہ نتیجہ حیاتیاتی رشتہ داروں کے لیے متعلقہ ہو سکتا ہے۔',
    ),
    afterTesting: L(
      'A haematologist or genetics professional can explain what a carrier result means for a person and, if relevant, for a couple. Shared Blood does not interpret the result.',
      'کوئی ہیماٹولوجسٹ یا جینیٹکس پیشہ ور سمجھا سکتا ہے کہ کیریئر نتیجہ کسی شخص کے لیے اور، اگر متعلقہ ہو، کسی جوڑے کے لیے کیا مطلب رکھتا ہے۔ شیئرڈ بلڈ نتیجے کی تشریح نہیں کرتا۔',
    ),
    questionsToAsk: [
      L('Does this test look at carrier status or at beta thalassemia major?', 'کیا یہ ٹیسٹ کیریئر اسٹیٹس کو دیکھتا ہے یا بیٹا تھیلیسیمیا میجر کو؟'),
      L('If both partners are carriers, who can explain what that means for us?', 'اگر دونوں شراکت دار کیریئر ہوں، تو کون سمجھا سکتا ہے کہ اس کا ہمارے لیے کیا مطلب ہے؟'),
    ],
    professionalTypeIds: ['HAEMATOLOGIST', 'GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
    referenceIds: ['medlineplus-beta-thalassemia', 'tif-carrier'],
    contentNotice: L(
      'Carrying the beta thalassemia trait is not the same as having beta thalassemia major. Shared Blood does not tell couples whether to marry or have children.',
      'بیٹا تھیلیسیمیا ٹریٹ رکھنا بیٹا تھیلیسیمیا میجر ہونے کے مترادف نہیں۔ شیئرڈ بلڈ جوڑوں کو نہیں بتاتا کہ شادی کریں یا بچے پیدا کریں۔',
    ),
    displayOrder: 10,
    lastReviewed: '2026-07-01',
  },
];
