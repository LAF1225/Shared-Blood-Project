import type { LocalizedText } from '@/types';
import type { MapEvidenceRecord } from '../../types';

/**
 * Lysosomal storage disorder evidence records (spec §27). Kept as a GROUP unless
 * a record is tied to a supported individual disorder, in which case an optional
 * `diseaseSubtypeId` (e.g. 'gaucher-disease') is set. CRITICAL: never aggregate
 * all LSD records into one prevalence estimate — different disorders in this
 * group are distinct conditions (spec §27/§58).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LYSOSOMAL_STORAGE_DISORDERS_EVIDENCE: readonly MapEvidenceRecord[] = [
  {
    id: 'lsd-punjab-lahore-genetic',
    diseaseId: 'lysosomal-storage-disorders',
    diseaseSubtypeId: null,
    title: L(
      'Molecular diagnosis of lysosomal storage disorders, Lahore',
      'لائسوسومل اسٹوریج ڈس آرڈرز کی مالیکیولر تشخیص، لاہور',
    ),
    locationName: L('Lahore', 'لاہور'),
    district: L('Lahore', 'لاہور'),
    provinceOrTerritory: 'punjab',
    latitude: 31.55,
    longitude: 74.34,
    geographicPrecision: 'EXACT_INSTITUTION',
    evidenceType: 'GENETIC_STUDY',
    studyPopulation: L(
      'Children with suspected lysosomal storage disorders referred to a genetic-diagnosis laboratory for enzyme and molecular testing.',
      'مشتبہ لائسوسومل اسٹوریج ڈس آرڈرز والے بچے جنہیں اینزائم اور مالیکیولر جانچ کے لیے جینیاتی تشخیصی لیبارٹری بھیجا گیا۔',
    ),
    evidenceSummary: L(
      'A laboratory study describing which specific lysosomal storage disorders were confirmed among referred patients, reported separately by disorder, not combined.',
      'ایک لیبارٹری مطالعہ جو بیان کرتا ہے کہ بھیجے گئے مریضوں میں کون سے مخصوص لائسوسومل اسٹوریج ڈس آرڈرز کی تصدیق ہوئی، ہر مرض کی الگ الگ رپورٹنگ، ملا کر نہیں۔',
    ),
    measuredOutcome: L(
      'The specific disorders confirmed by enzyme and molecular testing.',
      'اینزائم اور مالیکیولر جانچ سے تصدیق شدہ مخصوص امراض۔',
    ),
    estimateType: L('Confirmed diagnoses among referred patients', 'بھیجے گئے مریضوں میں تصدیق شدہ تشخیصات'),
    institution: L('Genetic-diagnosis laboratory, Lahore', 'جینیاتی تشخیصی لیبارٹری، لاہور'),
    publicationTitle:
      'Molecular diagnosis of lysosomal storage disorders in a cohort of Pakistani patients',
    publicationYear: 2018,
    referenceId: 'lsd-genetic-study',
    canTellUs: L(
      'This confirms that several distinct lysosomal storage disorders are diagnosed in Pakistan and that molecular testing is available to identify the specific disorder.',
      'یہ اس بات کی تصدیق کرتا ہے کہ پاکستان میں کئی الگ الگ لائسوسومل اسٹوریج ڈس آرڈرز کی تشخیص ہوتی ہے اور مخصوص مرض کی شناخت کے لیے مالیکیولر جانچ دستیاب ہے۔',
    ),
    cannotTellUs: L(
      'The disorders in this group are different conditions and must not be added together into one “LSD prevalence”; referred patients are not a population sample.',
      'اس گروہ کے امراض مختلف حالتیں ہیں اور انہیں ایک واحد "ایل ایس ڈی شرح" میں جمع نہیں کیا جانا چاہیے؛ بھیجے گئے مریض آبادی کا نمونہ نہیں ہیں۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'lsd-sindh-karachi-gaucher',
    diseaseId: 'lysosomal-storage-disorders',
    diseaseSubtypeId: 'gaucher-disease',
    title: L(
      'Gaucher disease documented case series, Karachi',
      'گوشے بیماری دستاویز شدہ کیس سیریز، کراچی',
    ),
    locationName: L('Karachi', 'کراچی'),
    district: L('Karachi', 'کراچی'),
    provinceOrTerritory: 'sindh',
    latitude: 24.86,
    longitude: 67.01,
    geographicPrecision: 'CITY',
    evidenceType: 'CASE_SERIES',
    studyPopulation: L(
      'A documented series of patients diagnosed specifically with Gaucher disease at a Karachi centre.',
      'کراچی کے ایک مرکز میں خاص طور پر گوشے بیماری کی تشخیص شدہ مریضوں کی ایک دستاویز شدہ سیریز۔',
    ),
    evidenceSummary: L(
      'A clinical and molecular description of a selected group of Gaucher disease patients, one specific disorder within the lysosomal storage group.',
      'گوشے بیماری کے منتخب مریضوں کے ایک گروہ کی طبی اور مالیکیولر وضاحت، لائسوسومل اسٹوریج گروہ کے اندر ایک مخصوص مرض۔',
    ),
    measuredOutcome: L(
      'The clinical and molecular features of the documented Gaucher patients.',
      'دستاویز شدہ گوشے مریضوں کی طبی اور مالیکیولر خصوصیات۔',
    ),
    estimateType: L('Description of a selected case series', 'ایک منتخب کیس سیریز کی وضاحت'),
    institution: L('Genetic medicine centre, Karachi', 'جینیاتی طب مرکز، کراچی'),
    publicationYear: 2017,
    referenceId: 'gaucher-case-series',
    canTellUs: L(
      'This documents that Gaucher disease specifically is diagnosed in Pakistan and describes how these patients presented.',
      'یہ اس بات کی دستاویز ہے کہ خاص طور پر گوشے بیماری کی پاکستان میں تشخیص ہوتی ہے اور بیان کرتا ہے کہ یہ مریض کیسے آئے۔',
    ),
    cannotTellUs: L(
      'A selected case series is not a population count, and Gaucher evidence must not be merged with other lysosomal disorders or read as a group prevalence.',
      'ایک منتخب کیس سیریز آبادی کی گنتی نہیں ہے، اور گوشے کے شواہد کو دیگر لائسوسومل امراض کے ساتھ ملایا یا گروہ کی شرح کے طور پر نہیں پڑھا جانا چاہیے۔',
    ),
    lastReviewed: '2026-06-01',
  },
];
