import type { LocalizedText } from '@/types';
import type { EarlySignRecord } from '../../types';

/**
 * Lysosomal storage disorder early-sign guidance (spec §45/§46).
 *
 * CRITICAL (spec §45): LSDs are a disease GROUP — this is not one universal LSD
 * symptom list, and no record implies every LSD presents identically. Every
 * record uses qualifying language ("Some lysosomal storage disorders may…",
 * "Depending on the specific disorder…") and one is subtype-scoped. Delayed
 * development and LOSS of previously acquired abilities are kept distinct (§51).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LYSOSOMAL_STORAGE_DISORDERS_SIGNS: readonly EarlySignRecord[] = [
  {
    id: 'lsd-development',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Not meeting developmental milestones as expected', 'نشوونما کے مراحل متوقع طور پر پورے نہ ہونا'),
    shortLabel: L('Developmental concerns', 'نشوونما کے خدشات'),
    description: L(
      'Depending on the specific disorder, some lysosomal storage disorders may be associated with a child taking longer than expected to reach developmental milestones.',
      'مخصوص مرض کے مطابق، کچھ لائسوسومل اسٹوریج ڈس آرڈرز کا تعلق اس سے ہو سکتا ہے کہ بچہ نشوونما کے مراحل تک پہنچنے میں متوقع سے زیادہ وقت لے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    observationCategory: 'DEVELOPMENT',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PROGRESSIVE',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice a child taking noticeably longer than peers to sit, crawl, walk, or begin using words, especially as a persistent pattern.',
      'آپ محسوس کر سکتے ہیں کہ بچہ بیٹھنے، رینگنے، چلنے، یا الفاظ استعمال کرنے میں ہم عمروں سے نمایاں طور پر زیادہ وقت لے رہا ہے، خاص طور پر ایک مسلسل انداز میں۔',
    ),
    whatToNotice: L(
      'Whether concerns are persistent across several areas of development rather than a single slightly late skill.',
      'کیا خدشات نشوونما کے کئی شعبوں میں مسلسل ہیں نہ کہ کوئی ایک ذرا دیر سے آنے والی مہارت۔',
    ),
    whatNotToAssume: L(
      'Children reach milestones at different times, and being a little late with one skill is usually normal. A single difference does not indicate a lysosomal storage disorder.',
      'بچے مختلف اوقات میں مراحل تک پہنچتے ہیں، اور کسی ایک مہارت میں تھوڑی دیر عام طور پر معمول ہے۔ کوئی ایک فرق کسی لائسوسومل اسٹوریج ڈس آرڈر کی نشاندہی نہیں کرتا۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'METABOLIC_SPECIALIST', 'MEDICAL_GENETICIST'],
    relatedDiseaseSectionId: 'about',
    referenceIds: ['nord-lysosomal', 'gard-rare-disease', 'nhs-child-development'],
    displayOrder: 1,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'lsd-regression',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Losing skills the child previously had', 'بچے کا پہلے سے حاصل مہارتیں کھو دینا'),
    shortLabel: L('Loss of acquired skills', 'حاصل مہارتوں کا نقصان'),
    description: L(
      'Depending on the specific disorder, some lysosomal storage disorders may involve a child gradually losing abilities they had previously gained, for example movement, speech, or play skills.',
      'مخصوص مرض کے مطابق، کچھ لائسوسومل اسٹوریج ڈس آرڈرز میں بچہ آہستہ آہستہ وہ صلاحیتیں کھو سکتا ہے جو اس نے پہلے حاصل کی تھیں، مثلاً حرکت، بولنا، یا کھیل کی مہارتیں۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    observationCategory: 'DEVELOPMENT',
    visibilityType: 'PATTERN_BASED',
    patternType: 'PROGRESSIVE',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice the child stopping doing something they used to do; this loss of a previously acquired ability is different from simply being slow to learn a new skill.',
      'آپ محسوس کر سکتے ہیں کہ بچہ کوئی ایسا کام کرنا چھوڑ رہا ہے جو وہ پہلے کرتا تھا، پہلے سے حاصل صلاحیت کا یہ نقصان محض کوئی نئی مہارت سیکھنے میں سست ہونے سے مختلف ہے۔',
    ),
    whatToNotice: L(
      'Whether the child is losing an ability they clearly had before, rather than just being slow to gain a new one. Loss of skills is worth discussing promptly.',
      'کیا بچہ کوئی ایسی صلاحیت کھو رہا ہے جو اس کے پاس واضح طور پر پہلے تھی، بجائے اس کے کہ محض کوئی نئی صلاحیت حاصل کرنے میں سست ہو۔ مہارتوں کا نقصان فوری طور پر زیرِ بحث لانے کے قابل ہے۔',
    ),
    whatNotToAssume: L(
      'Loss of skills can have several causes and does not by itself identify a specific disorder, but because it is different from ordinary delay, it should be reviewed by a professional.',
      'مہارتوں کے نقصان کی کئی وجوہات ہو سکتی ہیں اور یہ خود بخود کسی مخصوص مرض کی نشاندہی نہیں کرتا، مگر چونکہ یہ عام تاخیر سے مختلف ہے، اسے کسی پیشہ ور سے دیکھوانا چاہیے۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'NEUROLOGIST', 'METABOLIC_SPECIALIST'],
    referenceIds: ['nord-lysosomal', 'gard-rare-disease'],
    displayOrder: 2,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'lsd-abdominal',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Tummy that looks enlarged in some disorders', 'کچھ امراض میں پیٹ کا بڑا نظر آنا'),
    shortLabel: L('Enlarged tummy (some disorders)', 'بڑا پیٹ (کچھ امراض)'),
    description: L(
      'In some (not all) lysosomal storage disorders, a tummy that looks increasingly enlarged over time can relate to organ enlargement.',
      'کچھ (تمام نہیں) لائسوسومل اسٹوریج ڈس آرڈرز میں، وقت کے ساتھ بڑھتا ہوا پیٹ اعضاء کے بڑھنے سے متعلق ہو سکتا ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    observationCategory: 'APPEARANCE',
    visibilityType: 'VISIBLE',
    patternType: 'PROGRESSIVE',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice the tummy gradually looking fuller over time. Simply observe it, do not press or feel for internal organs.',
      'آپ محسوس کر سکتے ہیں کہ پیٹ وقت کے ساتھ آہستہ آہستہ زیادہ بھرا نظر آ رہا ہے۔ صرف مشاہدہ کریں، اندرونی اعضاء کو دبانے یا محسوس کرنے کی کوشش نہ کریں۔',
    ),
    whatToNotice: L(
      'Whether the change is gradual and persistent and appears alongside developmental concerns.',
      'کیا تبدیلی بتدریج اور مسلسل ہے اور نشوونما کے خدشات کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'A rounded tummy is normal in many healthy young children. Appearance alone does not establish organ enlargement or any specific disorder.',
      'گول پیٹ بہت سے صحت مند چھوٹے بچوں میں معمول ہے۔ صرف ظاہری شکل عضو کے بڑھنے یا کسی مخصوص مرض کو ثابت نہیں کرتی۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'METABOLIC_SPECIALIST'],
    referenceIds: ['nord-lysosomal', 'medlineplus-lysosomal'],
    displayOrder: 3,
    lastReviewed: '2026-06-20',
  },
  {
    id: 'lsd-movement-tone',
    diseaseId: 'lysosomal-storage-disorders',
    diseaseSubtypeId: 'gaucher-disease',
    title: L('Movement or muscle-tone concerns in some disorders', 'کچھ امراض میں حرکت یا پٹھوں کے تناؤ کے خدشات'),
    shortLabel: L('Movement / tone concerns', 'حرکت / تناؤ کے خدشات'),
    description: L(
      'Depending on the specific disorder, some children may show changes in movement or muscle tone. This record relates to disorders such as Gaucher disease within the group.',
      'مخصوص مرض کے مطابق، کچھ بچوں میں حرکت یا پٹھوں کے تناؤ میں تبدیلیاں ظاہر ہو سکتی ہیں۔ یہ ریکارڈ گروہ کے اندر گوشے بیماری جیسے امراض سے متعلق ہے۔',
    ),
    ageContexts: ['INFANT', 'TODDLER'],
    observationCategory: 'MUSCLE_TONE',
    visibilityType: 'LESS_VISIBLE',
    patternType: 'PROGRESSIVE',
    urgencyContext: 'PROMPT_ASSESSMENT',
    caregiverObservation: L(
      'You might notice a child feeling unusually floppy or stiff, or moving differently over time, as a persistent change.',
      'آپ محسوس کر سکتے ہیں کہ بچہ غیر معمولی طور پر ڈھیلا یا اکڑا ہوا محسوس ہو، یا وقت کے ساتھ مختلف انداز میں حرکت کرے، ایک مسلسل تبدیلی کے طور پر۔',
    ),
    whatToNotice: L(
      'Whether the change is persistent and progressive, and whether it appears with developmental concerns.',
      'کیا تبدیلی مسلسل اور بڑھتی ہوئی ہے، اور کیا یہ نشوونما کے خدشات کے ساتھ ظاہر ہوتی ہے۔',
    ),
    whatNotToAssume: L(
      'Differences in movement or tone have many causes. On their own they do not identify a specific disorder, and they vary between the disorders in this group.',
      'حرکت یا تناؤ میں فرق کی کئی وجوہات ہیں۔ اکیلے یہ کسی مخصوص مرض کی نشاندہی نہیں کرتے، اور یہ اس گروہ کے امراض کے درمیان مختلف ہوتے ہیں۔',
    ),
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'NEUROLOGIST', 'PHYSIOTHERAPIST'],
    referenceIds: ['nord-lysosomal', 'gard-rare-disease'],
    displayOrder: 4,
    lastReviewed: '2026-06-20',
  },
];
