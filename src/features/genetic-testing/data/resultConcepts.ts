import type { LocalizedText } from '@/types';
import type { ResultConceptRecord } from '../types';

/**
 * Educational result-concept records (spec §25–§28).
 *
 * CRITICAL: these explain what a KIND of result may and may not mean — the
 * module NEVER interprets an individual's actual report (spec §28), reduces
 * results to "positive = has disease / negative = no disease" (spec §26), or
 * classifies a variant of uncertain significance (spec §27). No result upload
 * or variant input exists anywhere (spec §29/§30).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const RESULT_CONCEPTS: readonly ResultConceptRecord[] = [
  {
    id: 'POSITIVE_OR_PATHOGENIC_FINDING',
    label: L('Positive / pathogenic finding', 'مثبت / پیتھوجینک نتیجہ'),
    whatItMeans: L(
      'A change was found that is currently understood to be linked to a condition. What it means for a person depends on the test, the gene, the condition, and their clinical context.',
      'کوئی تبدیلی ملی جو فی الحال کسی حالت سے منسلک سمجھی جاتی ہے۔ اس کا کسی شخص کے لیے مطلب ٹیسٹ، جین، حالت، اور ان کے طبی سیاق و سباق پر منحصر ہے۔',
    ),
    whatItDoesNotMean: L(
      'It does not automatically mean "has the disease" in every case, and it does not tell a person how a condition will affect them. Only a professional can explain a finding in context.',
      'اس کا خودبخود مطلب ہر معاملے میں ”مرض ہے“ نہیں، اور یہ کسی شخص کو نہیں بتاتا کہ کوئی حالت اسے کیسے متاثر کرے گی۔ صرف کوئی پیشہ ور سیاق و سباق میں کسی نتیجے کی وضاحت کر سکتا ہے۔',
    ),
    referenceIds: ['medlineplus-genetic-testing', 'genereviews'],
    displayOrder: 1,
  },
  {
    id: 'NEGATIVE_RESULT',
    label: L('Negative result', 'منفی نتیجہ'),
    whatItMeans: L(
      'The specific change or changes the test looked for were not found. Its meaning depends on what was tested and why.',
      'ٹیسٹ نے جو مخصوص تبدیلی یا تبدیلیاں تلاش کیں وہ نہیں ملیں۔ اس کا مطلب اس بات پر منحصر ہے کہ کیا ٹیسٹ کیا گیا اور کیوں۔',
    ),
    whatItDoesNotMean: L(
      'A negative result does not mean "genetically clear" or "no risk". A test only covers what it examined, and other variants it did not check may still exist.',
      'منفی نتیجہ کا مطلب ”جینیاتی طور پر صاف“ یا ”کوئی خطرہ نہیں“ نہیں۔ کوئی ٹیسٹ صرف اُسی کا احاطہ کرتا ہے جو اس نے دیکھا، اور دیگر ویریئنٹس جو اس نے نہ دیکھے، اب بھی موجود ہو سکتے ہیں۔',
    ),
    referenceIds: ['medlineplus-genetic-testing', 'nhs-genetic-testing'],
    displayOrder: 2,
  },
  {
    id: 'CARRIER_FINDING',
    label: L('Carrier finding', 'کیریئر نتیجہ'),
    whatItMeans: L(
      'A person carries one altered copy of a gene associated with a recessive condition. This information can be relevant to understanding inheritance in a family.',
      'کوئی شخص کسی ریسیسِو حالت سے منسلک جین کی ایک تبدیل شدہ نقل رکھتا ہے۔ یہ معلومات خاندان میں وراثت کو سمجھنے کے لیے متعلقہ ہو سکتی ہیں۔',
    ),
    whatItDoesNotMean: L(
      'Being a carrier does not mean a person is sick, and it does not, on its own, determine what will happen in a future pregnancy. A genetics professional can explain the context.',
      'کیریئر ہونے کا مطلب یہ نہیں کہ شخص بیمار ہے، اور یہ خود بخود طے نہیں کرتا کہ مستقبل کے کسی حمل میں کیا ہوگا۔ کوئی جینیٹکس پیشہ ور سیاق و سباق سمجھا سکتا ہے۔',
    ),
    referenceIds: ['medlineplus-carrier-testing'],
    displayOrder: 3,
  },
  {
    id: 'VARIANT_OF_UNCERTAIN_SIGNIFICANCE',
    label: L('Variant of uncertain significance (VUS)', 'غیر یقینی اہمیت کا ویریئنٹ (VUS)'),
    whatItMeans: L(
      'A DNA change was found whose connection to a condition is not yet clear based on current knowledge. Understanding of a VUS can change over time as more is learned.',
      'کوئی ڈی این اے تبدیلی ملی جس کا کسی حالت سے تعلق موجودہ علم کی بنیاد پر ابھی واضح نہیں۔ VUS کے بارے میں سمجھ وقت کے ساتھ بدل سکتی ہے جیسے جیسے مزید معلوم ہوتا ہے۔',
    ),
    whatItDoesNotMean: L(
      'A VUS is not confirmation of a disorder. Shared Blood does not classify a VUS or judge whether it is harmful, only appropriate clinical experts assess this over time.',
      'VUS کسی عارضے کی تصدیق نہیں۔ شیئرڈ بلڈ کسی VUS کی درجہ بندی نہیں کرتا اور نہ فیصلہ کرتا ہے کہ یہ نقصان دہ ہے، صرف موزوں طبی ماہرین وقت کے ساتھ اس کا جائزہ لیتے ہیں۔',
    ),
    referenceIds: ['medlineplus-vus'],
    displayOrder: 4,
  },
  {
    id: 'INCONCLUSIVE_RESULT',
    label: L('Inconclusive result', 'غیر نتیجہ خیز نتیجہ'),
    whatItMeans: L(
      'A test did not give a clear answer. Sometimes further assessment or different tests are considered by the care team.',
      'کسی ٹیسٹ نے واضح جواب نہیں دیا۔ کبھی کبھی نگہداشت ٹیم مزید جانچ یا مختلف ٹیسٹوں پر غور کرتی ہے۔',
    ),
    whatItDoesNotMean: L(
      'An inconclusive result does not confirm or rule out a condition on its own. A professional explains what, if anything, is considered next.',
      'غیر نتیجہ خیز نتیجہ خود بخود کسی حالت کی تصدیق یا نفی نہیں کرتا۔ کوئی پیشہ ور سمجھاتا ہے کہ اگلا مرحلہ، اگر کوئی ہے، کیا ہے۔',
    ),
    referenceIds: ['medlineplus-genetic-testing', 'nhs-genetic-testing'],
    displayOrder: 5,
  },
];

export function getResultConcept(id: string): ResultConceptRecord | null {
  return RESULT_CONCEPTS.find((concept) => concept.id === id) ?? null;
}
