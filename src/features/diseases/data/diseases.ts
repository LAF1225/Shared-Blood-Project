import type { Disease, DiseaseInheritanceClass, LocalizedText } from '@/types';
import type { CategoryFilterId } from './categories';

/**
 * Disease Library dataset (spec §4, §11). The single source of truth for the
 * disease *index* across the platform. Content here is limited to neutral,
 * well-established classification (category, primary body system, inheritance
 * pattern) and a one-line plain-language summary. Symptoms, treatment, and
 * guidance are deliberately excluded (spec §19) — they belong to Modules 05–09.
 *
 * Adding a disorder = append an entry. No component or logic changes required
 * (spec §17).
 */
export const DISEASES: readonly Disease[] = [
  {
    id: 'beta-thalassemia',
    slug: 'beta-thalassemia',
    name: { en: 'Beta Thalassemia', ur: 'بیٹا تھیلیسیمیا' },
    summary: {
      en: 'An inherited blood disorder that affects how the body produces hemoglobin, the protein red blood cells use to carry oxygen.',
      ur: 'ایک موروثی خونی مرض جو اس بات کو متاثر کرتا ہے کہ جسم ہیموگلوبن کیسے بناتا ہے، وہ پروٹین جو خون کے سرخ خلیے آکسیجن لے جانے کے لیے استعمال کرتے ہیں۔',
    },
    categories: ['blood', 'inherited'],
    bodySystem: { en: 'Blood', ur: 'خون' },
    inheritancePattern: { en: 'Autosomal recessive', ur: 'آٹوسومل ریسیسِو' },
    inheritanceClassification: 'AUTOSOMAL_RECESSIVE',
    featured: true,
    searchKeywords: [
      'beta thalassemia',
      'beta thalassaemia',
      'thalassemia',
      'thalassaemia',
      'thalasemia',
      'anemia',
      'anaemia',
      'blood disorder',
      'تھیلیسیمیا',
      'بیٹا تھیلیسیمیا',
    ],
    related: ['cystic-fibrosis', 'lysosomal-storage-disorders'],
    calculator: {
      enabled: true,
      strategy: 'autosomal-recessive',
      context: {
        en: 'Beta thalassemia is commonly inherited in an autosomal recessive pattern.',
        ur: 'بیٹا تھیلیسیمیا عام طور پر آٹوسومل ریسیسِو طرز میں وراثت میں ملتا ہے۔',
      },
    },
  },
  {
    id: 'cystic-fibrosis',
    slug: 'cystic-fibrosis',
    name: { en: 'Cystic Fibrosis', ur: 'سسٹک فائبروسس' },
    summary: {
      en: 'An inherited condition that mainly affects the lungs and digestive system by changing how the body manages mucus and salt.',
      ur: 'ایک موروثی حالت جو بنیادی طور پر پھیپھڑوں اور نظامِ ہاضمہ کو متاثر کرتی ہے، اس بات کو بدل کر کہ جسم بلغم اور نمک کو کیسے سنبھالتا ہے۔',
    },
    categories: ['respiratory', 'inherited'],
    bodySystem: {
      en: 'Lungs & digestive system',
      ur: 'پھیپھڑے اور نظامِ ہاضمہ',
    },
    inheritancePattern: { en: 'Autosomal recessive', ur: 'آٹوسومل ریسیسِو' },
    inheritanceClassification: 'AUTOSOMAL_RECESSIVE',
    featured: true,
    searchKeywords: [
      'cystic fibrosis',
      'cf',
      'fibrosis',
      'cystic',
      'mucoviscidosis',
      'lungs',
      'respiratory',
      'سسٹک فائبروسس',
      'فائبروسس',
    ],
    related: ['beta-thalassemia', 'lysosomal-storage-disorders'],
    calculator: {
      enabled: true,
      strategy: 'autosomal-recessive',
      context: {
        en: 'Cystic fibrosis is caused by disease-causing variants in the CFTR gene and is inherited in an autosomal recessive pattern.',
        ur: 'سسٹک فائبروسس CFTR جین میں مرض پیدا کرنے والے ویریئنٹس کی وجہ سے ہوتا ہے اور آٹوسومل ریسیسِو طرز میں وراثت میں ملتا ہے۔',
      },
    },
  },
  {
    id: 'lysosomal-storage-disorders',
    slug: 'lysosomal-storage-disorders',
    name: {
      en: 'Lysosomal Storage Disorders',
      ur: 'لائسوسومل اسٹوریج ڈس آرڈرز',
    },
    summary: {
      en: "A group of rare inherited conditions in which the body's cells cannot break down certain substances, allowing them to build up over time.",
      ur: 'نایاب موروثی حالتوں کا ایک گروہ جن میں جسم کے خلیے بعض مادوں کو توڑ نہیں پاتے، جس سے وہ وقت کے ساتھ جمع ہوتے رہتے ہیں۔',
    },
    categories: ['metabolic', 'rare', 'inherited'],
    bodySystem: {
      en: 'Metabolism (multiple systems)',
      ur: 'میٹابولزم (متعدد نظام)',
    },
    inheritancePattern: {
      en: 'Usually autosomal recessive',
      ur: 'عموماً آٹوسومل ریسیسِو',
    },
    // A disease group — not a single universal pattern (§62).
    inheritanceClassification: 'SUBTYPE_DEPENDENT',
    featured: true,
    searchKeywords: [
      'lysosomal storage disorders',
      'lysosomal',
      'storage disorder',
      'lsd',
      'gaucher',
      'pompe',
      'fabry',
      'tay-sachs',
      'hurler',
      'metabolic',
      'لائسوسومل',
      'اسٹوریج ڈس آرڈرز',
    ],
    related: ['beta-thalassemia', 'cystic-fibrosis'],
    calculator: {
      enabled: true,
      requiresSubtype: true,
      context: {
        en: 'Lysosomal storage disorders are a group of conditions. Most (but not all) follow autosomal recessive inheritance, so a specific disorder must be chosen.',
        ur: 'لائسوسومل اسٹوریج ڈس آرڈرز حالتوں کا ایک گروہ ہیں۔ زیادہ تر (مگر تمام نہیں) آٹوسومل ریسیسِو وراثت رکھتے ہیں، اس لیے کسی مخصوص مرض کا انتخاب ضروری ہے۔',
      },
      limitations: {
        en: 'The general category cannot be modeled as a single condition. Choose a supported disorder to see a simplified inheritance estimate.',
        ur: 'عمومی زمرے کو ایک واحد حالت کے طور پر ماڈل نہیں کیا جا سکتا۔ سادہ وراثتی تخمینہ دیکھنے کے لیے کوئی معاون مرض منتخب کریں۔',
      },
      subtypes: [
        {
          id: 'tay-sachs',
          name: { en: 'Tay-Sachs disease', ur: 'ٹے-سیکس بیماری' },
          strategy: 'autosomal-recessive',
          context: {
            en: 'Tay-Sachs disease is inherited in an autosomal recessive pattern.',
            ur: 'ٹے-سیکس بیماری آٹوسومل ریسیسِو طرز میں وراثت میں ملتی ہے۔',
          },
        },
        {
          id: 'gaucher',
          name: { en: 'Gaucher disease', ur: 'گوشے بیماری' },
          strategy: 'autosomal-recessive',
          context: {
            en: 'Gaucher disease is inherited in an autosomal recessive pattern.',
            ur: 'گوشے بیماری آٹوسومل ریسیسِو طرز میں وراثت میں ملتی ہے۔',
          },
        },
      ],
    },
  },
  {
    id: 'ehlers-danlos-syndrome',
    slug: 'ehlers-danlos-syndrome',
    name: { en: 'Ehlers-Danlos Syndrome', ur: 'ایہلرز-ڈانلوس سنڈروم' },
    summary: {
      en: 'A group of inherited conditions that affect connective tissue, the material that gives structure and support to skin, joints, and blood vessels.',
      ur: 'موروثی حالتوں کا ایک گروہ جو مربوط بافت کو متاثر کرتا ہے، وہ مادہ جو جلد، جوڑوں اور خون کی نالیوں کو ساخت اور سہارا دیتا ہے۔',
    },
    categories: ['connective-tissue', 'rare', 'inherited'],
    bodySystem: { en: 'Connective tissue', ur: 'مربوط بافت' },
    inheritancePattern: {
      en: 'Varies by type (often autosomal dominant)',
      ur: 'قسم کے مطابق مختلف (اکثر آٹوسومل ڈومیننٹ)',
    },
    // Inheritance depends on the subtype; hEDS is unresolved (§61).
    inheritanceClassification: 'SUBTYPE_DEPENDENT',
    featured: true,
    searchKeywords: [
      'ehlers-danlos syndrome',
      'ehlers danlos',
      'ehler danlos',
      'eds',
      'ehlers',
      'danlos',
      'connective tissue',
      'hypermobility',
      'ایہلرز',
      'ڈانلوس',
      'سنڈروم',
    ],
    related: ['lysosomal-storage-disorders', 'cystic-fibrosis'],
    calculator: {
      enabled: true,
      requiresSubtype: true,
      context: {
        en: 'Ehlers-Danlos syndrome is not a single condition. Its inheritance depends on the specific subtype, so a subtype must be chosen.',
        ur: 'ایہلرز-ڈانلوس سنڈروم ایک واحد حالت نہیں ہے۔ اس کی وراثت مخصوص ذیلی قسم پر منحصر ہے، اس لیے ذیلی قسم کا انتخاب ضروری ہے۔',
      },
      subtypes: [
        {
          id: 'classical',
          name: { en: 'Classical EDS', ur: 'کلاسیکل ای ڈی ایس' },
          strategy: 'autosomal-dominant',
          context: {
            en: 'Classical EDS is typically inherited in an autosomal dominant pattern.',
            ur: 'کلاسیکل ای ڈی ایس عام طور پر آٹوسومل ڈومیننٹ طرز میں وراثت میں ملتا ہے۔',
          },
        },
        {
          id: 'vascular',
          name: { en: 'Vascular EDS', ur: 'ویسکولر ای ڈی ایس' },
          strategy: 'autosomal-dominant',
          context: {
            en: 'Vascular EDS is typically inherited in an autosomal dominant pattern.',
            ur: 'ویسکولر ای ڈی ایس عام طور پر آٹوسومل ڈومیننٹ طرز میں وراثت میں ملتا ہے۔',
          },
        },
        {
          id: 'classical-like',
          name: { en: 'Classical-like EDS', ur: 'کلاسیکل-نما ای ڈی ایس' },
          strategy: 'autosomal-recessive',
          context: {
            en: 'Classical-like EDS is inherited in an autosomal recessive pattern.',
            ur: 'کلاسیکل-نما ای ڈی ایس آٹوسومل ریسیسِو طرز میں وراثت میں ملتا ہے۔',
          },
        },
        {
          id: 'hypermobile',
          name: { en: 'Hypermobile EDS', ur: 'ہائپرموبائل ای ڈی ایس' },
          strategy: 'unsupported',
          context: {
            en: 'The genetic cause of hypermobile EDS has not yet been identified, so a genotype-based inheritance probability cannot be modeled.',
            ur: 'ہائپرموبائل ای ڈی ایس کی جینیاتی وجہ ابھی تک شناخت نہیں ہوئی، اس لیے جینوٹائپ پر مبنی وراثتی امکان کا ماڈل نہیں بنایا جا سکتا۔',
          },
          limitations: {
            en: 'Discuss family-specific questions about hypermobile EDS with a healthcare professional or genetic counselor.',
            ur: 'ہائپرموبائل ای ڈی ایس کے بارے میں خاندان سے متعلق سوالات کسی طبی ماہر یا جینیاتی مشیر سے بات کریں۔',
          },
        },
      ],
    },
  },
];

/** All featured diseases (spec §8). */
export function getFeaturedDiseases(): Disease[] {
  return DISEASES.filter((disease) => disease.featured);
}

/** Look up a single disease by its URL slug. */
export function getDiseaseBySlug(slug: string): Disease | null {
  return DISEASES.find((disease) => disease.slug === slug) ?? null;
}

/**
 * Canonical disease IDENTITY (Module 23 §54/§70). The single source of truth for
 * a disease's id, localized name, and disease-level inheritance metadata. Feature
 * layers (disease-page narrative, DNA molecular education, calculator strategy,
 * Punnett presentation, Evidence Map) reference a disease by id and resolve
 * identity here rather than re-declaring it.
 */
export interface DiseaseIdentity {
  id: string;
  slug: string;
  name: LocalizedText;
  /** Localized display string. */
  inheritancePattern: LocalizedText;
  /** Machine-readable disease-level classification (§60). */
  inheritanceClassification: DiseaseInheritanceClass;
}

/**
 * Resolve canonical disease identity by id. Returns `undefined` for unknown ids
 * so user-derived route parameters fail safely (§89) — no non-null assertions.
 */
export function getDiseaseIdentity(id: string): DiseaseIdentity | undefined {
  const disease = DISEASES.find((entry) => entry.id === id);
  if (!disease) return undefined;
  return {
    id: disease.id,
    slug: disease.slug,
    name: disease.name,
    inheritancePattern: disease.inheritancePattern,
    inheritanceClassification: disease.inheritanceClassification,
  };
}

/** Resolve a disease's related disorders to full records (spec §12). */
export function getRelatedDiseases(slug: string): Disease[] {
  const disease = getDiseaseBySlug(slug);
  if (!disease) return [];
  return disease.related
    .map((relatedSlug) => getDiseaseBySlug(relatedSlug))
    .filter((related): related is Disease => related !== null);
}

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

/**
 * Dynamic, reload-free name search (spec §9). Matches the query against the
 * localized names plus the curated keyword list (which carries common
 * misspellings and synonyms), using partial (substring) matching.
 */
export function matchesQuery(disease: Disease, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const haystack = [disease.name.en, disease.name.ur, ...disease.searchKeywords];
  return haystack.some((term) => normalize(term).includes(q));
}

/** Category filter (spec §10). `all` matches everything. */
export function matchesCategory(
  disease: Disease,
  category: CategoryFilterId,
): boolean {
  return category === 'all' || disease.categories.includes(category);
}

/** Combined discovery query: category filter + text search. */
export function queryDiseases(
  category: CategoryFilterId,
  query: string,
): Disease[] {
  return DISEASES.filter(
    (disease) =>
      matchesCategory(disease, category) && matchesQuery(disease, query),
  );
}
