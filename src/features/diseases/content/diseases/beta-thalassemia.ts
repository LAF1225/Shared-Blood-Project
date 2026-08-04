import type { LocalizedText } from '@/types';
import type { DiseaseContent } from '../types';

/**
 * Beta Thalassemia — structured educational content (Module 06).
 * Content only; the Disease Page System (Module 05) renders it. Written for a
 * general audience in plain language, scientifically accurate, and framed to
 * encourage timely medical consultation rather than fear.
 *
 * Stories & Perspectives (audio) are intentionally omitted until real, consented
 * recordings exist — the page system omits the section automatically.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const betaThalassemiaContent: DiseaseContent = {
  slug: 'beta-thalassemia',
  lastUpdated: '2026-07-01',

  quickFacts: [
    {
      label: L('Also known as', 'دیگر نام'),
      value: L("Cooley's anemia (severe form)", 'کولیز انیمیا (شدید صورت)'),
    },
    {
      label: L('Gene involved', 'متعلقہ جین'),
      value: L('HBB (beta-globin)', 'HBB (بیٹا گلوبن)'),
    },
    {
      labelKey: 'prevalence',
      value: L(
        'About 5–8% of people in Pakistan carry the trait',
        'پاکستان میں تقریباً 5–8٪ افراد اس کے حامل ہیں',
      ),
    },
    {
      label: L('Screening', 'اسکریننگ'),
      value: L(
        'A simple blood test can identify carriers',
        'ایک سادہ خون کا ٹیسٹ حاملین کی نشاندہی کر سکتا ہے',
      ),
    },
  ],

  about: {
    paragraphs: [
      L(
        'Beta thalassemia is an inherited blood condition that affects how the body makes hemoglobin, the protein inside red blood cells that carries oxygen around the body. In beta thalassemia, the body produces less beta-globin, one of the building blocks of hemoglobin, so there is not enough healthy hemoglobin. This leads to a shortage of red blood cells, known as anemia.',
        'بیٹا تھیلیسیمیا ایک موروثی خونی حالت ہے جو اس بات کو متاثر کرتی ہے کہ جسم ہیموگلوبن کیسے بناتا ہے، وہ پروٹین جو خون کے سرخ خلیوں میں آکسیجن کو جسم بھر میں پہنچاتا ہے۔ بیٹا تھیلیسیمیا میں جسم بیٹا گلوبن کم بناتا ہے، جو ہیموگلوبن کے بنیادی اجزا میں سے ایک ہے، اس لیے صحت مند ہیموگلوبن کافی نہیں ہوتا۔ اس سے خون کے سرخ خلیوں کی کمی ہو جاتی ہے جسے انیمیا (خون کی کمی) کہتے ہیں۔',
      ),
      L(
        'The condition ranges from mild to severe. People who inherit one changed gene usually have "thalassemia trait" (also called minor) and are healthy carriers. People who inherit a changed gene from both parents may have thalassemia major, which needs regular medical care. Beta thalassemia is common across Pakistan, the Mediterranean, the Middle East, and South Asia.',
        'یہ حالت ہلکی سے شدید تک ہو سکتی ہے۔ جو لوگ ایک تبدیل شدہ جین وراثت میں پاتے ہیں ان میں عموماً "تھیلیسیمیا ٹریٹ" (مائنر) ہوتا ہے اور وہ صحت مند حامل ہوتے ہیں۔ جو بچے دونوں والدین سے تبدیل شدہ جین پاتے ہیں ان میں تھیلیسیمیا میجر ہو سکتا ہے، جس کے لیے باقاعدہ طبی نگہداشت درکار ہوتی ہے۔ بیٹا تھیلیسیمیا پاکستان، بحیرۂ روم، مشرقِ وسطیٰ اور جنوبی ایشیا میں عام ہے۔',
      ),
    ],
  },

  earlySymptoms: [
    {
      text: L('Paleness of the skin, lips, or nail beds', 'جلد، ہونٹوں یا ناخنوں کی رنگت کا پیلا پن'),
      note: L('A common early sign of anemia', 'انیمیا کی ایک عام ابتدائی علامت'),
    },
    { text: L('Tiredness, weakness, or low energy', 'تھکن، کمزوری یا توانائی کی کمی') },
    { text: L('Poor appetite and slow growth in babies', 'بچوں میں بھوک کی کمی اور نشوونما کا سست ہونا') },
    { text: L('Irritability or fussiness in young children', 'چھوٹے بچوں میں چڑچڑاپن یا بے چینی') },
    {
      text: L('Yellowing of the skin or eyes (jaundice)', 'جلد یا آنکھوں کا پیلا ہونا (یرقان)'),
    },
    {
      text: L('Swelling of the tummy from an enlarged spleen', 'تلی بڑھنے سے پیٹ کا پھولنا'),
    },
  ],

  hiddenSymptoms: [
    {
      text: L(
        'Carriers (thalassemia trait) often have no symptoms at all',
        'حامل افراد (تھیلیسیمیا ٹریٹ) میں اکثر کوئی علامت نہیں ہوتی',
      ),
      note: L(
        'Their mild anemia is sometimes mistaken for iron deficiency',
        'ان کی معمولی خون کی کمی کو بعض اوقات فولاد کی کمی سمجھ لیا جاتا ہے',
      ),
    },
    {
      text: L('Mild tiredness that is easy to overlook', 'ہلکی تھکن جسے آسانی سے نظر انداز کر دیا جاتا ہے'),
    },
    {
      text: L(
        'Slightly delayed growth that may not seem obvious at first',
        'نشوونما میں ہلکی تاخیر جو ابتدا میں واضح نہ ہو',
      ),
    },
  ],

  emergencySymptoms: [
    {
      text: L(
        'Sudden severe paleness, breathlessness, or a fast heartbeat',
        'اچانک شدید پیلا پن، سانس کی تنگی، یا دل کی تیز دھڑکن',
      ),
    },
    {
      text: L(
        'High fever, especially in a child whose spleen has been removed',
        'تیز بخار، خاص طور پر اُس بچے میں جس کی تلی نکالی جا چکی ہو',
      ),
      note: L('This can be a sign of serious infection', 'یہ سنگین انفیکشن کی علامت ہو سکتی ہے'),
    },
  ],

  inheritance: {
    paragraphs: [
      L(
        'Beta thalassemia is passed down in an "autosomal recessive" pattern. This means a child develops thalassemia major only when they inherit a changed beta-globin gene from both parents. A person with only one changed gene is a healthy carrier (has the trait).',
        'بیٹا تھیلیسیمیا "آٹوسومل ریسیسِو" طریقے سے منتقل ہوتا ہے۔ اس کا مطلب ہے کہ بچے میں تھیلیسیمیا میجر صرف اُس وقت ہوتا ہے جب وہ دونوں والدین سے تبدیل شدہ بیٹا گلوبن جین وراثت میں پائے۔ صرف ایک تبدیل شدہ جین رکھنے والا فرد صحت مند حامل ہوتا ہے (ٹریٹ رکھتا ہے)۔',
      ),
      L(
        'When both parents are carriers, in each pregnancy there is a 25% chance the child will have thalassemia major, a 50% chance the child will be a carrier, and a 25% chance the child will not inherit the changed gene at all. Because carriers usually feel healthy, many families only find out through a blood test.',
        'جب دونوں والدین حامل ہوں تو ہر حمل میں 25٪ امکان ہوتا ہے کہ بچے کو تھیلیسیمیا میجر ہو، 50٪ امکان کہ بچہ حامل ہو، اور 25٪ امکان کہ بچہ تبدیل شدہ جین بالکل نہ پائے۔ چونکہ حامل افراد عموماً صحت مند محسوس کرتے ہیں، بہت سے خاندانوں کو یہ صرف خون کے ٹیسٹ سے معلوم ہوتا ہے۔',
      ),
    ],
    points: [
      L(
        'A simple blood test before marriage or pregnancy can show if someone is a carrier',
        'شادی یا حمل سے پہلے ایک سادہ خون کا ٹیسٹ بتا سکتا ہے کہ کوئی حامل ہے یا نہیں',
      ),
      L(
        'Genetic counseling helps families understand their options with respect and privacy',
        'جینیاتی مشاورت خاندانوں کو احترام اور رازداری کے ساتھ اپنے اختیارات سمجھنے میں مدد دیتی ہے',
      ),
    ],
  },

  diagnosis: {
    paragraphs: [
      L(
        'Beta thalassemia is diagnosed with blood tests. A complete blood count (CBC) shows anemia and unusually small red blood cells. A test called hemoglobin electrophoresis measures the different types of hemoglobin and can confirm the diagnosis. Genetic testing can identify the exact change in the beta-globin gene and is useful for family planning.',
        'بیٹا تھیلیسیمیا کی تشخیص خون کے ٹیسٹوں سے ہوتی ہے۔ مکمل خون کی گنتی (CBC) انیمیا اور غیر معمولی طور پر چھوٹے سرخ خلیے دکھاتی ہے۔ ہیموگلوبن الیکٹروفوریسس نامی ٹیسٹ مختلف اقسام کے ہیموگلوبن کی پیمائش کرتا ہے اور تشخیص کی تصدیق کر سکتا ہے۔ جینیاتی ٹیسٹ بیٹا گلوبن جین میں درست تبدیلی کی نشاندہی کر سکتا ہے اور خاندانی منصوبہ بندی کے لیے مفید ہے۔',
      ),
    ],
  },

  treatment: {
    paragraphs: [
      L(
        'Treatment depends on how severe the condition is. Carriers usually need no treatment. Children with thalassemia major are cared for by a blood specialist and often need regular blood transfusions to keep their hemoglobin at a healthy level.',
        'علاج کا انحصار حالت کی شدت پر ہوتا ہے۔ حامل افراد کو عموماً علاج کی ضرورت نہیں ہوتی۔ تھیلیسیمیا میجر والے بچوں کی نگہداشت خون کے ماہر کے زیرِ نگرانی ہوتی ہے اور اکثر ہیموگلوبن کو صحت مند سطح پر رکھنے کے لیے باقاعدہ خون کی منتقلی درکار ہوتی ہے۔',
      ),
    ],
    points: [
      L('Regular blood transfusions for thalassemia major', 'تھیلیسیمیا میجر کے لیے باقاعدہ خون کی منتقلی'),
      L(
        'Iron-removal (chelation) therapy, because repeated transfusions can cause iron to build up',
        'فولاد نکالنے (کیلیشن) کا علاج، کیونکہ بار بار منتقلی سے فولاد جمع ہو سکتا ہے',
      ),
      L('Folic acid to support the making of red blood cells', 'سرخ خلیوں کی تیاری میں مدد کے لیے فولک ایسڈ'),
      L(
        'A bone marrow (stem cell) transplant can cure some children when a matching donor is available',
        'موزوں ڈونر دستیاب ہونے پر بون میرو (اسٹیم سیل) ٹرانسپلانٹ بعض بچوں کا علاج کر سکتا ہے',
      ),
    ],
  },

  livingWith: {
    paragraphs: [
      L(
        'With regular care, many people with beta thalassemia lead full and active lives. A steady routine of transfusions and iron-removal therapy, along with regular check-ups, helps keep the body healthy and prevents complications.',
        'باقاعدہ نگہداشت کے ساتھ، بیٹا تھیلیسیمیا کے بہت سے افراد بھرپور اور فعال زندگی گزارتے ہیں۔ منتقلی اور فولاد نکالنے کے علاج کا مستقل معمول، باقاعدہ معائنوں کے ساتھ، جسم کو صحت مند رکھنے اور پیچیدگیوں سے بچنے میں مدد دیتا ہے۔',
      ),
    ],
    points: [
      L('Keep to the transfusion and chelation schedule', 'منتقلی اور کیلیشن کے شیڈول کی پابندی کریں'),
      L(
        'Eat a balanced diet, and avoid iron supplements unless a doctor prescribes them',
        'متوازن غذا کھائیں، اور ڈاکٹر کے تجویز کیے بغیر فولاد کے سپلیمنٹ نہ لیں',
      ),
      L('Stay up to date with vaccinations', 'ویکسینیشن کو تازہ رکھیں'),
      L(
        'Ask the care team about emotional and community support',
        'نگہداشت کی ٹیم سے جذباتی اور کمیونٹی سپورٹ کے بارے میں پوچھیں',
      ),
    ],
  },

  parentGuidance: {
    paragraphs: [
      L(
        'Caring for a child with thalassemia can feel demanding at first, but a clear routine makes a big difference. Working closely with the treatment team, keeping appointments, and giving medicines on time all help your child grow and thrive.',
        'تھیلیسیمیا والے بچے کی دیکھ بھال ابتدا میں مشکل لگ سکتی ہے، لیکن واضح معمول بڑا فرق ڈالتا ہے۔ علاج کی ٹیم کے ساتھ قریبی تعاون، اپائنٹمنٹس کی پابندی، اور دوائیں بروقت دینا سب آپ کے بچے کی نشوونما میں مدد دیتے ہیں۔',
      ),
    ],
    points: [
      L('Keep a simple record of transfusions and medicines', 'منتقلی اور دواؤں کا سادہ ریکارڈ رکھیں'),
      L('Watch for fever and seek care early if it appears', 'بخار پر نظر رکھیں اور ظاہر ہونے پر جلد رجوع کریں'),
      L('Support healthy eating and regular school attendance', 'صحت مند خوراک اور باقاعدہ اسکول حاضری میں مدد دیں'),
      L('Look after your own wellbeing as a caregiver, too', 'ایک نگہداشت کنندہ کے طور پر اپنی صحت کا بھی خیال رکھیں'),
    ],
  },

  growthOutlook: {
    paragraphs: [
      L(
        'Thanks to modern treatment, children with thalassemia major today can look forward to growing up, studying, working, and having families of their own. Regular monitoring helps manage growth and puberty, which can sometimes be affected by iron build-up. Newer treatments, including gene therapy, are expanding what is possible.',
        'جدید علاج کی بدولت، آج تھیلیسیمیا میجر والے بچے بڑے ہونے، تعلیم حاصل کرنے، کام کرنے اور اپنے خاندان بنانے کی توقع رکھ سکتے ہیں۔ باقاعدہ نگرانی نشوونما اور بلوغت کو سنبھالنے میں مدد دیتی ہے، جو بعض اوقات فولاد جمع ہونے سے متاثر ہو سکتی ہیں۔ نئے علاج، بشمول جین تھراپی، امکانات کو وسیع کر رہے ہیں۔',
      ),
    ],
  },

  specialists: [
    {
      id: 'hematologist',
      role: L('Hematologist', 'ہیماٹولوجسٹ (خون کے ماہر)'),
      description: L(
        'A doctor who specialises in blood conditions and guides transfusion and iron-removal care',
        'خون کی حالتوں کے ماہر ڈاکٹر جو منتقلی اور فولاد نکالنے کی نگہداشت کی رہنمائی کرتے ہیں',
      ),
    },
    {
      id: 'pediatrician',
      role: L('Pediatrician', 'ماہرِ اطفال'),
      description: L(
        "A children's doctor who oversees overall growth, vaccines, and day-to-day health",
        'بچوں کے ڈاکٹر جو مجموعی نشوونما، ویکسین اور روزمرہ صحت کی نگرانی کرتے ہیں',
      ),
    },
    {
      id: 'genetic-counselor',
      role: L('Genetic counselor', 'جینیاتی مشیر'),
      description: L(
        'A professional who explains inheritance and carrier testing to families',
        'ایک ماہر جو خاندانوں کو وراثت اور حامل ٹیسٹنگ سمجھاتے ہیں',
      ),
    },
  ],

  faq: [
    {
      id: 'contagious',
      question: L('Is thalassemia contagious?', 'کیا تھیلیسیمیا متعدی ہے؟'),
      answer: L(
        'No. Thalassemia cannot be caught or passed on through contact. It is inherited through genes from parents.',
        'نہیں۔ تھیلیسیمیا رابطے سے نہیں لگتا اور نہ پھیلتا ہے۔ یہ والدین کے جینز کے ذریعے وراثت میں ملتا ہے۔',
      ),
    },
    {
      id: 'carrier-children',
      question: L(
        'Can carriers have healthy children?',
        'کیا حامل افراد صحت مند بچے پیدا کر سکتے ہیں؟',
      ),
      answer: L(
        'Yes. Carriers are healthy. Knowing the carrier status of both partners, ideally before marriage or pregnancy, allows families to plan with the help of genetic counseling.',
        'ہاں۔ حامل افراد صحت مند ہوتے ہیں۔ دونوں ساتھیوں کی حامل حیثیت جاننا، بہتر ہے کہ شادی یا حمل سے پہلے، خاندانوں کو جینیاتی مشاورت کی مدد سے منصوبہ بندی کا موقع دیتا ہے۔',
      ),
    },
    {
      id: 'prevent',
      question: L('Can it be prevented?', 'کیا اس سے بچا جا سکتا ہے؟'),
      answer: L(
        'Carrier screening before marriage or pregnancy is the most effective way to understand the chances for future children. Screening is simple, private, and widely available.',
        'شادی یا حمل سے پہلے حامل اسکریننگ مستقبل کے بچوں کے امکانات سمجھنے کا سب سے مؤثر طریقہ ہے۔ اسکریننگ سادہ، نجی اور بڑے پیمانے پر دستیاب ہے۔',
      ),
    },
    {
      id: 'cure',
      question: L('Is there a cure?', 'کیا اس کا علاج ممکن ہے؟'),
      answer: L(
        'A bone marrow (stem cell) transplant can cure some children when a suitable donor is available. Gene therapy is a newer option being introduced in some centres. Most people are managed very well with regular transfusion and iron-removal care.',
        'موزوں ڈونر دستیاب ہونے پر بون میرو (اسٹیم سیل) ٹرانسپلانٹ بعض بچوں کا علاج کر سکتا ہے۔ جین تھراپی ایک نیا اختیار ہے جو بعض مراکز میں متعارف ہو رہا ہے۔ زیادہ تر افراد باقاعدہ منتقلی اور فولاد نکالنے کی نگہداشت سے بہت اچھی طرح سنبھالے جاتے ہیں۔',
      ),
    },
  ],

  references: [
    {
      id: 'who',
      title: 'Thalassaemia and other haemoglobinopathies',
      authors: 'World Health Organization',
      publication: 'WHO',
      date: '2023',
      url: 'https://www.who.int/health-topics/thalassaemia',
    },
    {
      id: 'medlineplus',
      title: 'Beta thalassemia',
      authors: 'MedlinePlus Genetics',
      publication: 'U.S. National Library of Medicine',
      date: '2022',
      url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
    },
    {
      id: 'tif',
      title: 'Guidelines for the Management of Transfusion Dependent Thalassaemia',
      authors: 'Thalassaemia International Federation',
      publication: 'TIF',
      date: '2021',
      url: 'https://thalassaemia.org.cy/',
    },
  ],
};
