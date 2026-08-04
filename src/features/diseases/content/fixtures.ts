import type { Disease } from '@/types';
import type { DiseaseContent } from './types';

/**
 * Rendering-engine fixtures (Module 05 §25). Three SYNTHETIC, clearly-fictional
 * sample disorders that exercise different combinations of present/absent
 * fields — used only by the dev-only preview route to verify conditional
 * rendering, multimedia, references, and related diseases. These are NOT real
 * diseases and never appear in the public Disease Library.
 */

export interface DiseaseFixture {
  disease: Disease;
  content: DiseaseContent;
}

function meta(
  id: string,
  name: string,
  nameUr: string,
  extra: Partial<Disease> = {},
): Disease {
  return {
    id,
    slug: id,
    name: { en: name, ur: nameUr },
    summary: {
      en: 'A fictional sample disorder used to demonstrate the disease page rendering engine.',
      ur: 'ایک فرضی نمونہ مرض جو ڈیزیز پیج رینڈرنگ انجن کو ظاہر کرنے کے لیے استعمال ہوتا ہے۔',
    },
    categories: ['inherited'],
    bodySystem: { en: 'Sample system', ur: 'نمونہ نظام' },
    inheritancePattern: { en: 'Autosomal recessive', ur: 'آٹوسومل ریسیسِو' },
    inheritanceClassification: 'AUTOSOMAL_RECESSIVE',
    featured: false,
    searchKeywords: [id],
    related: ['beta-thalassemia', 'cystic-fibrosis'],
    lastUpdated: '2026-06-15',
    ...extra,
  };
}

const p = (en: string, ur: string) => ({ en, ur });

/** "Full" — every disease-content section populated (stories are separate). */
const full: DiseaseFixture = {
  disease: meta('sample-full', 'Sample Disorder A (Full)', 'نمونہ مرض A (مکمل)', {
    categories: ['inherited', 'rare'],
  }),
  content: {
    slug: 'sample-full',
    lastUpdated: '2026-06-20',
    quickFacts: [
      { labelKey: 'prevalence', value: p('~1 in 100,000 (sample)', '~1 فی 100,000 (نمونہ)') },
    ],
    about: {
      paragraphs: [
        p(
          'This is placeholder text describing the sample disorder in plain language. It exists only to show how the About section renders.',
          'یہ نمونہ مرض کو سادہ زبان میں بیان کرنے والا عارضی متن ہے۔ یہ صرف یہ دکھانے کے لیے ہے کہ About سیکشن کیسے رینڈر ہوتا ہے۔',
        ),
      ],
      points: [
        p('An illustrative bullet point.', 'ایک وضاحتی نکتہ۔'),
        p('Another illustrative point.', 'ایک اور وضاحتی نکتہ۔'),
      ],
    },
    emergencySymptoms: [
      { text: p('Sample emergency sign (seek care immediately.', 'نمونہ ہنگامی علامت) فوراً رجوع کریں۔') },
    ],
    earlySymptoms: [
      { text: p('Sample early sign one.', 'نمونہ ابتدائی علامت ایک۔'), note: p('With a short note.', 'مختصر نوٹ کے ساتھ۔') },
      { text: p('Sample early sign two.', 'نمونہ ابتدائی علامت دو۔') },
    ],
    hiddenSymptoms: [
      { text: p('A sign families often overlook.', 'ایک علامت جسے خاندان اکثر نظر انداز کرتے ہیں۔') },
    ],
    inheritance: {
      paragraphs: [p('Placeholder explanation of how this sample condition is inherited.', 'اس نمونہ حالت کے وراثت میں منتقل ہونے کی عارضی وضاحت۔')],
    },
    diagnosis: { paragraphs: [p('Placeholder diagnosis information.', 'عارضی تشخیصی معلومات۔')] },
    treatment: { paragraphs: [p('Placeholder treatment & management information.', 'عارضی علاج و انتظام کی معلومات۔')] },
    livingWith: { paragraphs: [p('Placeholder guidance on living with the condition.', 'حالت کے ساتھ زندگی گزارنے کی عارضی رہنمائی۔')] },
    parentGuidance: { paragraphs: [p('Placeholder guidance for caring for your child.', 'اپنے بچے کی دیکھ بھال کی عارضی رہنمائی۔')] },
    growthOutlook: { paragraphs: [p('Placeholder growing up & looking ahead information.', 'بڑے ہونے اور آگے دیکھنے کی عارضی معلومات۔')] },
    specialists: [
      { id: 's1', role: p('Sample Specialist', 'نمونہ ماہر'), description: p('What this specialist helps with.', 'یہ ماہر کس چیز میں مدد کرتا ہے۔') },
    ],
    resources: [
      { id: 'r1', label: p('Sample Support Organisation', 'نمونہ معاون تنظیم'), description: p('A placeholder resource.', 'ایک عارضی وسیلہ۔'), href: '/resources' },
    ],
    faq: [
      { id: 'q1', question: p('Is this a real disease?', 'کیا یہ ایک حقیقی مرض ہے؟'), answer: p('No (it is sample data for the rendering engine.', 'نہیں) یہ رینڈرنگ انجن کے لیے نمونہ ڈیٹا ہے۔') },
      { id: 'q2', question: p('Can content be added later?', 'کیا مواد بعد میں شامل کیا جا سکتا ہے؟'), answer: p('Yes, without changing the template.', 'ہاں، ٹیمپلیٹ کو تبدیل کیے بغیر۔') },
    ],
    researchUpdates: [
      { id: 'u1', title: p('Sample research highlight.', 'نمونہ تحقیقی جھلک۔'), summary: p('A placeholder summary.', 'ایک عارضی خلاصہ۔'), date: '2026' },
    ],
    references: [
      { id: 'ref1', title: 'A Sample Reference Title', authors: 'Author A, Author B', publication: 'Journal of Samples', date: '2025', url: 'https://example.org' },
      { id: 'ref2', title: 'Another Sample Reference', authors: 'Author C', publication: 'Sample Reports', date: '2024' },
    ],
  },
};

/** "Minimal" — only About, Inheritance, FAQ. Everything else must be hidden. */
const minimal: DiseaseFixture = {
  disease: meta('sample-minimal', 'Sample Disorder B (Minimal)', 'نمونہ مرض B (کم سے کم)'),
  content: {
    slug: 'sample-minimal',
    about: { paragraphs: [p('Only three sections are present on this sample.', 'اس نمونے پر صرف تین سیکشن موجود ہیں۔')] },
    inheritance: { paragraphs: [p('Placeholder inheritance text.', 'عارضی وراثتی متن۔')] },
    faq: [{ id: 'q1', question: p('Are other sections hidden?', 'کیا دیگر سیکشن چھپے ہوئے ہیں؟'), answer: p('Yes (missing sections do not render.', 'ہاں) غائب سیکشن رینڈر نہیں ہوتے۔') }],
  },
};

/** "Media" — About plus references. (Stories moved to Module 12's own preview.) */
const media: DiseaseFixture = {
  disease: meta('sample-media', 'Sample Disorder C (Media)', 'نمونہ مرض C (میڈیا)'),
  content: {
    slug: 'sample-media',
    about: { paragraphs: [p('This sample focuses on multimedia rendering.', 'یہ نمونہ ملٹی میڈیا رینڈرنگ پر مرکوز ہے۔')] },
    references: [
      { id: 'ref1', title: 'Media Sample Reference', publication: 'Sample Media Journal', date: '2026', url: 'https://example.org' },
    ],
  },
};

export const DISEASE_FIXTURES: Record<string, DiseaseFixture> = {
  full,
  minimal,
  media,
};

export const FIXTURE_IDS = Object.keys(DISEASE_FIXTURES);

/** Ordered fixture diseases — used for prev/next navigation in the preview. */
export const FIXTURE_ORDER: Disease[] = Object.values(DISEASE_FIXTURES).map(
  (fixture) => fixture.disease,
);
