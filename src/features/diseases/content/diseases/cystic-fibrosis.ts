import type { LocalizedText } from '@/types';
import type { DiseaseContent } from '../types';

/**
 * Cystic Fibrosis — structured educational content (Module 06).
 * Plain-language, scientifically accurate, general-audience content. Spec §11
 * emphasises overview, quick facts, early & hidden symptoms, diagnosis,
 * treatment, parent guidance, FAQ, references, related.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const cysticFibrosisContent: DiseaseContent = {
  slug: 'cystic-fibrosis',
  lastUpdated: '2026-07-01',

  quickFacts: [
    {
      label: L('Gene involved', 'متعلقہ جین'),
      value: L('CFTR', 'CFTR'),
    },
    {
      label: L('Mainly affects', 'بنیادی طور پر متاثر کرتا ہے'),
      value: L('Lungs and digestive system', 'پھیپھڑے اور نظامِ ہاضمہ'),
    },
    {
      label: L('Key test', 'اہم ٹیسٹ'),
      value: L('Sweat chloride test', 'پسینے میں کلورائیڈ کا ٹیسٹ'),
    },
  ],

  about: {
    paragraphs: [
      L(
        'Cystic fibrosis (CF) is an inherited condition that affects the cells which make mucus, sweat, and digestive juices. Normally these fluids are thin and slippery. In CF, a change in the CFTR gene makes them thick and sticky, so they clog the tubes and passages in the body, especially in the lungs and the pancreas (part of the digestive system).',
        'سسٹک فائبروسس (CF) ایک موروثی حالت ہے جو اُن خلیوں کو متاثر کرتی ہے جو بلغم، پسینہ اور ہاضمے کے رطوبات بناتے ہیں۔ عام طور پر یہ رطوبات پتلے اور پھسلنے والے ہوتے ہیں۔ CF میں CFTR جین میں تبدیلی انہیں گاڑھا اور چپچپا بنا دیتی ہے، جس سے جسم کی نالیاں بند ہو جاتی ہیں، خاص طور پر پھیپھڑوں اور لبلبے (نظامِ ہاضمہ کا حصہ) میں۔',
      ),
      L(
        'This can lead to repeated chest infections and difficulty absorbing nutrients from food. Cystic fibrosis is less common in South Asia than in Europe, and it may be under-recognised, so awareness helps families and doctors consider it when symptoms fit.',
        'اس سے بار بار سینے کے انفیکشن اور کھانے سے غذائیت جذب کرنے میں دشواری ہو سکتی ہے۔ سسٹک فائبروسس جنوبی ایشیا میں یورپ کی نسبت کم عام ہے، اور اس کی تشخیص کم ہو سکتی ہے، اس لیے آگاہی خاندانوں اور ڈاکٹروں کو علامات ملنے پر اس پر غور کرنے میں مدد دیتی ہے۔',
      ),
    ],
  },

  earlySymptoms: [
    {
      text: L('Skin that tastes salty when kissed', 'جلد جو بوسہ لینے پر نمکین محسوس ہو'),
      note: L('A classic and often-noticed early clue', 'ایک نمایاں اور اکثر محسوس ہونے والی ابتدائی علامت'),
    },
    { text: L('A persistent cough that brings up thick mucus', 'مسلسل کھانسی جس میں گاڑھا بلغم آئے') },
    { text: L('Repeated chest, lung, or sinus infections', 'بار بار سینے، پھیپھڑوں یا سائنس کے انفیکشن') },
    {
      text: L('Poor weight gain despite a good appetite', 'اچھی بھوک کے باوجود وزن کا نہ بڑھنا'),
    },
    {
      text: L('Bulky, greasy, or foul-smelling stools', 'بھاری، چکنے یا بدبودار فضلہ'),
    },
  ],

  hiddenSymptoms: [
    {
      text: L(
        'Frequent sinus trouble or small growths in the nose (nasal polyps)',
        'بار بار سائنس کی تکلیف یا ناک میں چھوٹے اُبھار (ناک کے پولپس)',
      ),
    },
    {
      text: L(
        'Widening or rounding of the fingertips over time (clubbing)',
        'وقت کے ساتھ انگلیوں کے سروں کا چوڑا یا گول ہونا (کلبنگ)',
      ),
    },
    {
      text: L(
        'Symptoms sometimes mistaken for ordinary asthma or repeated colds',
        'علامات جنہیں بعض اوقات عام دمہ یا بار بار زکام سمجھ لیا جاتا ہے',
      ),
      note: L('Which can delay the right diagnosis', 'جس سے درست تشخیص میں تاخیر ہو سکتی ہے'),
    },
  ],

  diagnosis: {
    paragraphs: [
      L(
        'Cystic fibrosis is usually diagnosed with a sweat test, which measures the amount of salt (chloride) in sweat; it is higher than normal in CF. The test is simple and painless. Genetic testing can confirm the diagnosis by identifying changes in the CFTR gene. In some countries, newborn screening detects CF early, before symptoms appear.',
        'سسٹک فائبروسس کی تشخیص عام طور پر پسینے کے ٹیسٹ سے ہوتی ہے، جو پسینے میں نمک (کلورائیڈ) کی مقدار ماپتا ہے، CF میں یہ معمول سے زیادہ ہوتی ہے۔ ٹیسٹ سادہ اور بغیر تکلیف کے ہوتا ہے۔ جینیاتی ٹیسٹ CFTR جین میں تبدیلیوں کی نشاندہی کر کے تشخیص کی تصدیق کر سکتا ہے۔ کچھ ممالک میں نوزائیدہ اسکریننگ علامات ظاہر ہونے سے پہلے ہی CF کا پتا لگا لیتی ہے۔',
      ),
    ],
  },

  treatment: {
    paragraphs: [
      L(
        'There is no cure yet, but treatment has improved greatly and helps people stay well and active. Care focuses on keeping the airways clear, preventing and treating infections, and making sure the body gets enough nutrition. A team of specialists usually works together on a personalised plan.',
        'ابھی تک کوئی حتمی علاج نہیں، لیکن علاج میں بہت بہتری آئی ہے اور یہ لوگوں کو صحت مند اور فعال رہنے میں مدد دیتا ہے۔ نگہداشت کا مرکز سانس کی نالیوں کو صاف رکھنا، انفیکشن سے بچاؤ اور علاج، اور جسم کو کافی غذائیت فراہم کرنا ہے۔ ماہرین کی ایک ٹیم عموماً مل کر ذاتی منصوبہ بناتی ہے۔',
      ),
    ],
    points: [
      L('Airway clearance, such as chest physiotherapy and breathing techniques', 'سانس کی صفائی، جیسے چیسٹ فزیوتھراپی اور سانس کی مشقیں'),
      L('Inhaled medicines to loosen mucus and open the airways', 'بلغم ڈھیلا کرنے اور نالیاں کھولنے کے لیے سانس کے ذریعے دوائیں'),
      L('Antibiotics to prevent and treat chest infections', 'سینے کے انفیکشن سے بچاؤ اور علاج کے لیے اینٹی بایوٹکس'),
      L(
        'Pancreatic enzyme capsules with meals, plus a high-energy diet and vitamins',
        'کھانے کے ساتھ لبلبے کے انزائم کیپسول، نیز زیادہ توانائی والی غذا اور وٹامنز',
      ),
      L(
        'Newer CFTR modulator medicines that help the faulty protein work better, for suitable patients',
        'موزوں مریضوں کے لیے نئی CFTR موڈیولیٹر دوائیں جو خراب پروٹین کو بہتر کام کرنے میں مدد دیتی ہیں',
      ),
    ],
  },

  parentGuidance: {
    paragraphs: [
      L(
        'A daily routine is the heart of caring for a child with CF. Airway clearance, enzymes with every meal, and good hygiene to avoid infections become part of family life. With support, children with CF go to school, play, and take part in everyday activities.',
        'روزانہ کا معمول CF والے بچے کی دیکھ بھال کا مرکز ہے۔ سانس کی صفائی، ہر کھانے کے ساتھ انزائم، اور انفیکشن سے بچنے کے لیے اچھی صفائی خاندانی زندگی کا حصہ بن جاتے ہیں۔ مدد کے ساتھ، CF والے بچے اسکول جاتے ہیں، کھیلتے ہیں اور روزمرہ سرگرمیوں میں حصہ لیتے ہیں۔',
      ),
    ],
    points: [
      L('Do airway clearance every day, even when your child feels well', 'روزانہ سانس کی صفائی کریں، چاہے بچہ ٹھیک محسوس کرے'),
      L('Give pancreatic enzymes with all meals and snacks', 'تمام کھانوں اور اسنیکس کے ساتھ لبلبے کے انزائم دیں'),
      L(
        'Practise good hand hygiene and avoid close contact with others who have CF',
        'ہاتھ کی اچھی صفائی رکھیں اور CF والے دیگر افراد سے قریبی رابطے سے بچیں',
      ),
      L('Keep regular clinic visits so the plan can be adjusted as your child grows', 'باقاعدہ کلینک وزٹ رکھیں تاکہ بچے کی نشوونما کے ساتھ منصوبہ ایڈجسٹ ہو سکے'),
    ],
  },

  specialists: [
    {
      id: 'pulmonologist',
      role: L('Pulmonologist', 'پلمونولوجسٹ (پھیپھڑوں کے ماہر)'),
      description: L(
        'A lung specialist who manages breathing and chest health',
        'پھیپھڑوں کے ماہر جو سانس اور سینے کی صحت سنبھالتے ہیں',
      ),
    },
    {
      id: 'gastroenterologist',
      role: L('Gastroenterologist / dietitian', 'معدے کے ماہر / غذائی ماہر'),
      description: L(
        'Helps with digestion, enzymes, and nutrition',
        'ہاضمہ، انزائم اور غذائیت میں مدد دیتے ہیں',
      ),
    },
    {
      id: 'physiotherapist',
      role: L('Physiotherapist', 'فزیوتھراپسٹ'),
      description: L(
        'Teaches airway clearance and breathing techniques',
        'سانس کی صفائی اور سانس کی تکنیک سکھاتے ہیں',
      ),
    },
  ],

  faq: [
    {
      id: 'contagious',
      question: L('Is cystic fibrosis contagious?', 'کیا سسٹک فائبروسس متعدی ہے؟'),
      answer: L(
        'No. CF is inherited through genes and cannot be passed from person to person. However, people with CF are advised to avoid close contact with each other to reduce the risk of sharing chest infections.',
        'نہیں۔ CF جینز کے ذریعے وراثت میں ملتا ہے اور ایک شخص سے دوسرے کو نہیں لگتا۔ البتہ CF والے افراد کو ایک دوسرے سے قریبی رابطے سے بچنے کا مشورہ دیا جاتا ہے تاکہ سینے کے انفیکشن پھیلنے کا خطرہ کم ہو۔',
      ),
    },
    {
      id: 'inherited',
      question: L('How is it inherited?', 'یہ کیسے وراثت میں ملتا ہے؟'),
      answer: L(
        'CF is autosomal recessive, meaning a child develops it only when they inherit a changed CFTR gene from both parents. Parents who are carriers are usually healthy. Carrier testing and genetic counseling can help families understand their chances.',
        'CF آٹوسومل ریسیسِو ہے، یعنی بچے میں یہ صرف اُس وقت ہوتا ہے جب وہ دونوں والدین سے تبدیل شدہ CFTR جین پائے۔ حامل والدین عموماً صحت مند ہوتے ہیں۔ حامل ٹیسٹنگ اور جینیاتی مشاورت خاندانوں کو اپنے امکانات سمجھنے میں مدد دے سکتی ہے۔',
      ),
    },
    {
      id: 'cure',
      question: L('Can it be cured?', 'کیا اس کا علاج ممکن ہے؟'),
      answer: L(
        'There is no cure yet, but treatments have improved dramatically. Airway clearance, nutrition support, and newer modulator medicines help many people with CF live longer, healthier lives.',
        'ابھی کوئی حتمی علاج نہیں، لیکن علاج میں نمایاں بہتری آئی ہے۔ سانس کی صفائی، غذائی مدد اور نئی موڈیولیٹر دوائیں CF والے بہت سے افراد کو لمبی اور صحت مند زندگی گزارنے میں مدد دیتی ہیں۔',
      ),
    },
  ],

  references: [
    {
      id: 'medlineplus',
      title: 'Cystic fibrosis',
      authors: 'MedlinePlus Genetics',
      publication: 'U.S. National Library of Medicine',
      date: '2023',
      url: 'https://medlineplus.gov/genetics/condition/cystic-fibrosis/',
    },
    {
      id: 'nhs',
      title: 'Cystic fibrosis, overview',
      authors: 'National Health Service (UK)',
      publication: 'NHS',
      date: '2023',
      url: 'https://www.nhs.uk/conditions/cystic-fibrosis/',
    },
    {
      id: 'cff',
      title: 'About Cystic Fibrosis',
      authors: 'Cystic Fibrosis Foundation',
      publication: 'CFF',
      date: '2023',
      url: 'https://www.cff.org/intro-cf/about-cystic-fibrosis',
    },
  ],
};
