import type { LocalizedText } from '@/types';
import type { DiseaseContext } from '../types';

/**
 * Optional disease educational contexts (spec §19–§23). Selecting a disease
 * changes the *explanation only* — it never changes the coefficient F and never
 * produces a disease-specific probability (spec §19). LSD and EDS deliberately
 * avoid any single generic figure (spec §22/§23).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const DISEASE_CONTEXTS: readonly DiseaseContext[] = [
  {
    id: 'beta-thalassemia',
    context: L(
      'Beta thalassemia is commonly autosomal recessive. When a disease-causing variant is present in a family or ancestral line, relatives may be more likely to share it, but relationship alone cannot determine whether either partner is a carrier.',
      'بیٹا تھیلیسیمیا عام طور پر آٹوسومل ریسیسِو ہے۔ جب کوئی مرض پیدا کرنے والا ویریئنٹ کسی خاندان یا نسبی شاخ میں موجود ہو تو رشتہ دار اُسے مشترک رکھنے کا زیادہ امکان رکھ سکتے ہیں، مگر رشتہ اکیلا یہ طے نہیں کر سکتا کہ آیا کوئی فریق حامل ہے۔',
    ),
    pathway: L(
      'Carrier screening → known parent status → the Inheritance Probability Calculator (Module 09).',
      'حاملیت اسکریننگ ← والدین کی معلوم حیثیت ← وراثت امکان کیلکولیٹر (ماڈیول 09)۔',
    ),
  },
  {
    id: 'cystic-fibrosis',
    context: L(
      'Cystic fibrosis is autosomal recessive. The chance that two people share the same CFTR variant depends on variant frequencies, ancestry, family history, and genetic testing, relationship category alone cannot produce an individual cystic fibrosis probability.',
      'سسٹک فائبروسس آٹوسومل ریسیسِو ہے۔ دو افراد کے ایک ہی CFTR ویریئنٹ کو مشترک رکھنے کا امکان ویریئنٹ کی تعدد، نسب، خاندانی تاریخ اور جینیاتی جانچ پر منحصر ہے، رشتے کا زمرہ اکیلا سسٹک فائبروسس کا انفرادی امکان پیدا نہیں کر سکتا۔',
    ),
    pathway: L(
      'Carrier screening → known parent status → the Inheritance Probability Calculator (Module 09).',
      'حاملیت اسکریننگ ← والدین کی معلوم حیثیت ← وراثت امکان کیلکولیٹر (ماڈیول 09)۔',
    ),
  },
  {
    id: 'lysosomal-storage-disorders',
    context: L(
      'Lysosomal storage disorders are a group of many different conditions. Many are autosomal recessive, but they do not all share one inheritance pattern or one carrier frequency, so no single general figure applies. A supported individual disorder is needed before inheritance can be modelled.',
      'لائسوسومل اسٹوریج ڈس آرڈرز بہت سی مختلف حالتوں کا ایک گروہ ہیں۔ بہت سے آٹوسومل ریسیسِو ہیں، مگر وہ سب ایک ہی وراثتی طرز یا ایک ہی حاملیت کی شرح نہیں رکھتے، اس لیے کوئی واحد عمومی عدد لاگو نہیں ہوتا۔ وراثت کا ماڈل بنانے سے پہلے کسی معاون انفرادی مرض کی ضرورت ہے۔',
    ),
    pathway: L(
      'Read the educational content, then use the Inheritance Probability Calculator (Module 09) for a supported individual disorder.',
      'تعلیمی مواد پڑھیں، پھر کسی معاون انفرادی مرض کے لیے وراثت امکان کیلکولیٹر (ماڈیول 09) استعمال کریں۔',
    ),
  },
  {
    id: 'ehlers-danlos-syndrome',
    context: L(
      'Ehlers-Danlos syndrome is not a single condition. Its subtypes have different inheritance patterns (some rare subtypes are recessive while others are dominant) so relationship category cannot produce one general Ehlers-Danlos risk figure.',
      'ایہلرز-ڈانلوس سنڈروم ایک واحد حالت نہیں ہے۔ اس کی ذیلی اقسام مختلف وراثتی طرز رکھتی ہیں (بعض نایاب ذیلی اقسام ریسیسِو ہیں جبکہ دیگر ڈومیننٹ) اس لیے رشتے کا زمرہ کوئی ایک عمومی ایہلرز-ڈانلوس خطرہ عدد پیدا نہیں کر سکتا۔',
    ),
    pathway: L(
      'Read the EDS content, then use the subtype-aware Inheritance Probability Calculator (Module 09).',
      'ای ڈی ایس مواد پڑھیں، پھر ذیلی قسم سے آگاہ وراثت امکان کیلکولیٹر (ماڈیول 09) استعمال کریں۔',
    ),
  },
];
