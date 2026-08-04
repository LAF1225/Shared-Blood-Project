import type { LocalizedText } from '@/types';
import type { DiseaseContent } from '../types';

/**
 * Lysosomal Storage Disorders — structured educational content (Module 06).
 * Plain-language, scientifically accurate overview of a GROUP of related
 * disorders. Spec §11 emphasises overview, quick facts, early symptoms,
 * diagnosis, treatment, living with, parent guidance, FAQ, references, related.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const lysosomalStorageDisordersContent: DiseaseContent = {
  slug: 'lysosomal-storage-disorders',
  lastUpdated: '2026-07-01',

  quickFacts: [
    {
      label: L('Type', 'قسم'),
      value: L('A group of 50+ rare metabolic disorders', '50 سے زائد نایاب میٹابولک امراض کا گروہ'),
    },
    {
      label: L('Examples', 'مثالیں'),
      value: L('Gaucher, Pompe, Fabry, Tay-Sachs, MPS', 'گاؤچر، پومپے، فیبری، ٹے-سیکس، MPS'),
    },
    {
      label: L('Treatment for some', 'بعض کا علاج'),
      value: L('Enzyme replacement therapy (ERT)', 'انزائم ریپلیسمنٹ تھراپی (ERT)'),
    },
  ],

  about: {
    paragraphs: [
      L(
        'Lysosomal storage disorders (LSDs) are a group of more than fifty rare inherited conditions. Inside our cells are tiny recycling centres called lysosomes, which use special proteins (enzymes) to break down and clear away waste substances. In an LSD, one of these enzymes is missing or does not work properly, so waste builds up inside the cells over time and can affect how organs work.',
        'لائسوسومل اسٹوریج ڈس آرڈرز (LSDs) پچاس سے زائد نایاب موروثی حالتوں کا ایک گروہ ہیں۔ ہمارے خلیوں کے اندر چھوٹے ری سائیکلنگ مراکز ہوتے ہیں جنہیں لائسوسومز کہتے ہیں، جو خاص پروٹینز (انزائمز) کے ذریعے فضلہ توڑ کر صاف کرتے ہیں۔ LSD میں ان میں سے کوئی انزائم غائب ہوتا ہے یا ٹھیک کام نہیں کرتا، اس لیے فضلہ وقت کے ساتھ خلیوں میں جمع ہوتا رہتا ہے اور اعضا کے کام کو متاثر کر سکتا ہے۔',
      ),
      L(
        'Because there are many types, the effects vary widely, some are mild, while others are more serious and appear in infancy. Well-known examples include Gaucher, Pompe, Fabry, Tay-Sachs, and the mucopolysaccharidoses (MPS). Early diagnosis matters because some types can be treated.',
        'چونکہ کئی اقسام ہیں، اثرات بہت مختلف ہوتے ہیں، کچھ ہلکے ہوتے ہیں جبکہ کچھ زیادہ سنگین اور بچپن میں ظاہر ہوتے ہیں۔ معروف مثالوں میں گاؤچر، پومپے، فیبری، ٹے-سیکس اور میوکوپولی سیکرائیڈوسز (MPS) شامل ہیں۔ جلد تشخیص اہم ہے کیونکہ بعض اقسام کا علاج ممکن ہے۔',
      ),
    ],
  },

  earlySymptoms: [
    {
      text: L('Delays in reaching milestones, or loss of skills already learned', 'سنگِ میل تک پہنچنے میں تاخیر، یا پہلے سیکھی ہوئی مہارتوں کا کھو جانا'),
    },
    { text: L('An enlarged tummy from a bigger liver or spleen', 'جگر یا تلی بڑھنے سے پیٹ کا پھولنا') },
    { text: L('Poor growth or feeding difficulties', 'کمزور نشوونما یا کھانے میں دشواری') },
    { text: L('Muscle weakness or unusual tiredness', 'پٹھوں کی کمزوری یا غیر معمولی تھکن') },
    { text: L('Bone, joint, or movement problems', 'ہڈیوں، جوڑوں یا حرکت کے مسائل') },
  ],

  diagnosis: {
    paragraphs: [
      L(
        'Because these disorders are rare and varied, diagnosis is made by specialists in metabolic conditions. The main test measures the activity of the specific enzyme in a blood sample. Genetic testing confirms the exact type. Identifying the precise disorder is important because it guides which treatments and support may help.',
        'چونکہ یہ امراض نایاب اور مختلف ہیں، تشخیص میٹابولک حالتوں کے ماہرین کرتے ہیں۔ بنیادی ٹیسٹ خون کے نمونے میں مخصوص انزائم کی سرگرمی ماپتا ہے۔ جینیاتی ٹیسٹ درست قسم کی تصدیق کرتا ہے۔ درست مرض کی نشاندہی اہم ہے کیونکہ یہ بتاتی ہے کہ کون سے علاج اور مدد فائدہ مند ہو سکتے ہیں۔',
      ),
    ],
  },

  treatment: {
    paragraphs: [
      L(
        'Treatment depends on the specific disorder. For several LSDs, enzyme replacement therapy (ERT) supplies the missing enzyme through regular infusions. Other approaches include medicines that reduce the build-up of waste, and, for some conditions, a stem cell transplant. Alongside these, supportive care from different specialists helps manage symptoms and maintain quality of life.',
        'علاج مخصوص مرض پر منحصر ہے۔ کئی LSDs کے لیے انزائم ریپلیسمنٹ تھراپی (ERT) باقاعدہ انفیوژن کے ذریعے غائب انزائم فراہم کرتی ہے۔ دیگر طریقوں میں فضلہ جمع ہونے کو کم کرنے والی دوائیں، اور بعض حالتوں کے لیے اسٹیم سیل ٹرانسپلانٹ شامل ہیں۔ ان کے ساتھ مختلف ماہرین کی معاون نگہداشت علامات سنبھالنے اور معیارِ زندگی برقرار رکھنے میں مدد دیتی ہے۔',
      ),
    ],
    points: [
      L('Enzyme replacement therapy (ERT) for suitable types', 'موزوں اقسام کے لیے انزائم ریپلیسمنٹ تھراپی (ERT)'),
      L('Medicines that slow the build-up of waste substances', 'فضلہ مادوں کے جمع ہونے کو سست کرنے والی دوائیں'),
      L('Supportive therapies such as physiotherapy and nutrition support', 'معاون علاج جیسے فزیوتھراپی اور غذائی مدد'),
      L('Regular monitoring by a specialist metabolic team', 'ماہر میٹابولک ٹیم کی باقاعدہ نگرانی'),
    ],
  },

  livingWith: {
    paragraphs: [
      L(
        'Living well with an LSD usually means working with a team of specialists over time. Regular monitoring, therapies, and support at home and school help children and adults take part in daily life as fully as possible. The right combination of care depends on the specific disorder and its effects.',
        'LSD کے ساتھ اچھی زندگی گزارنے کا مطلب عموماً وقت کے ساتھ ماہرین کی ٹیم کے ساتھ کام کرنا ہے۔ باقاعدہ نگرانی، علاج، اور گھر و اسکول میں مدد بچوں اور بڑوں کو روزمرہ زندگی میں ممکنہ حد تک شرکت میں مدد دیتی ہے۔ نگہداشت کا درست امتزاج مخصوص مرض اور اس کے اثرات پر منحصر ہے۔',
      ),
    ],
  },

  parentGuidance: {
    paragraphs: [
      L(
        'For parents, early support makes a real difference. Keeping to treatment schedules such as ERT infusions, arranging therapies, and staying connected with a specialist centre all help your child do their best. Support groups can also connect families facing similar journeys.',
        'والدین کے لیے جلد مدد حقیقی فرق ڈالتی ہے۔ ERT انفیوژن جیسے علاج کے شیڈول کی پابندی، علاج کا انتظام، اور کسی ماہر مرکز سے رابطہ رکھنا سب آپ کے بچے کو بہترین کارکردگی میں مدد دیتے ہیں۔ سپورٹ گروپس بھی ایسے خاندانوں کو جوڑ سکتے ہیں جو ملتے جلتے سفر سے گزر رہے ہوں۔',
      ),
    ],
    points: [
      L('Start therapies and early intervention as soon as advised', 'مشورے کے مطابق جلد از جلد علاج اور ابتدائی مداخلت شروع کریں'),
      L('Keep to infusion and medicine schedules', 'انفیوژن اور دواؤں کے شیڈول کی پابندی کریں'),
      L('Ask about genetic counseling for the wider family', 'وسیع خاندان کے لیے جینیاتی مشاورت کے بارے میں پوچھیں'),
    ],
  },

  specialists: [
    {
      id: 'metabolic',
      role: L('Metabolic / genetic specialist', 'میٹابولک / جینیاتی ماہر'),
      description: L(
        'Leads diagnosis and the overall treatment plan',
        'تشخیص اور مجموعی علاج کے منصوبے کی قیادت کرتے ہیں',
      ),
    },
    {
      id: 'pediatric-neuro',
      role: L('Pediatric neurologist', 'ماہرِ اعصاب اطفال'),
      description: L(
        'Supports children whose nervous system is affected',
        'ایسے بچوں کی مدد کرتے ہیں جن کا اعصابی نظام متاثر ہو',
      ),
    },
    {
      id: 'physiotherapist',
      role: L('Physiotherapist / occupational therapist', 'فزیوتھراپسٹ / آکوپیشنل تھراپسٹ'),
      description: L(
        'Helps with movement, strength, and daily activities',
        'حرکت، طاقت اور روزمرہ سرگرمیوں میں مدد دیتے ہیں',
      ),
    },
  ],

  faq: [
    {
      id: 'one-disease',
      question: L('Are all lysosomal storage disorders the same?', 'کیا تمام لائسوسومل اسٹوریج ڈس آرڈرز ایک جیسے ہیں؟'),
      answer: L(
        'No. This is a large group of over fifty different disorders. They share a similar underlying cause (a build-up of waste inside cells) but they vary a great deal in which enzyme is affected, which parts of the body are involved, and how severe they are.',
        'نہیں۔ یہ پچاس سے زائد مختلف امراض کا بڑا گروہ ہے۔ ان میں بنیادی وجہ ملتی جلتی ہوتی ہے (خلیوں میں فضلہ جمع ہونا) لیکن یہ اس میں بہت مختلف ہوتے ہیں کہ کون سا انزائم متاثر ہے، جسم کے کون سے حصے شامل ہیں، اور شدت کتنی ہے۔',
      ),
    },
    {
      id: 'treatable',
      question: L('Can they be treated?', 'کیا ان کا علاج ہو سکتا ہے؟'),
      answer: L(
        'Some can. Several types are treated with enzyme replacement therapy or other medicines, and supportive care helps with symptoms. Early diagnosis gives the best chance to benefit from available treatments.',
        'کچھ کا ہو سکتا ہے۔ کئی اقسام کا علاج انزائم ریپلیسمنٹ تھراپی یا دیگر دواؤں سے ہوتا ہے، اور معاون نگہداشت علامات میں مدد دیتی ہے۔ جلد تشخیص دستیاب علاج سے فائدہ اٹھانے کا بہترین موقع دیتی ہے۔',
      ),
    },
    {
      id: 'inherited',
      question: L('How are they inherited?', 'یہ کیسے وراثت میں ملتے ہیں؟'),
      answer: L(
        'Most LSDs are autosomal recessive, meaning a child inherits a changed gene from both parents. A few types, such as Fabry and Hunter disease, follow an X-linked pattern. Genetic counseling can explain the pattern for a specific disorder.',
        'زیادہ تر LSDs آٹوسومل ریسیسِو ہوتے ہیں، یعنی بچہ دونوں والدین سے تبدیل شدہ جین پاتا ہے۔ چند اقسام، جیسے فیبری اور ہنٹر بیماری، X-لنکڈ طریقے سے چلتی ہیں۔ جینیاتی مشاورت کسی مخصوص مرض کے لیے یہ طریقہ سمجھا سکتی ہے۔',
      ),
    },
  ],

  references: [
    {
      id: 'medlineplus',
      title: 'Lysosomal storage disorders, overview',
      authors: 'MedlinePlus',
      publication: 'U.S. National Library of Medicine',
      date: '2023',
      url: 'https://medlineplus.gov/',
    },
    {
      id: 'nord',
      title: 'Rare Disease Database, Lysosomal Storage Disorders',
      authors: 'National Organization for Rare Disorders',
      publication: 'NORD',
      date: '2023',
      url: 'https://rarediseases.org/',
    },
    {
      id: 'gard',
      title: 'Genetic and Rare Diseases Information Center',
      authors: 'GARD',
      publication: 'U.S. National Institutes of Health',
      date: '2023',
      url: 'https://rarediseases.info.nih.gov/',
    },
  ],
};
