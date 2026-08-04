import type { LocalizedText } from '@/types';
import type { DiseaseContent } from '../types';

/**
 * Ehlers-Danlos Syndrome — structured educational content (Module 06).
 * Plain-language, scientifically accurate content for a group of connective
 * tissue disorders. Spec §11 emphasises overview, quick facts, symptoms, hidden
 * symptoms, diagnosis, living with, parent guidance, FAQ, references, related.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const ehlersDanlosSyndromeContent: DiseaseContent = {
  slug: 'ehlers-danlos-syndrome',
  lastUpdated: '2026-07-01',

  quickFacts: [
    {
      label: L('Type', 'قسم'),
      value: L('A group of 13 connective tissue disorders', 'مربوط بافت کے 13 امراض کا گروہ'),
    },
    {
      label: L('Most common form', 'سب سے عام قسم'),
      value: L('Hypermobile EDS', 'ہائپرموبائل EDS'),
    },
    {
      label: L('Affects', 'متاثر کرتا ہے'),
      value: L('Skin, joints, and blood vessels', 'جلد، جوڑ اور خون کی نالیاں'),
    },
  ],

  about: {
    paragraphs: [
      L(
        'Ehlers-Danlos syndromes (EDS) are a group of inherited conditions that affect connective tissue, the material that gives strength and support to the skin, joints, blood vessels, and many other parts of the body. Connective tissue is a bit like the glue and scaffolding that holds the body together. In EDS, it is more fragile or stretchy than usual.',
        'ایہلرز-ڈانلوس سنڈرومز (EDS) موروثی حالتوں کا ایک گروہ ہیں جو مربوط بافت کو متاثر کرتے ہیں، وہ مادہ جو جلد، جوڑوں، خون کی نالیوں اور جسم کے کئی حصوں کو طاقت اور سہارا دیتا ہے۔ مربوط بافت کچھ اُس گوند اور ڈھانچے کی طرح ہے جو جسم کو جوڑے رکھتی ہے۔ EDS میں یہ معمول سے زیادہ نازک یا لچکدار ہوتی ہے۔',
      ),
      L(
        'There are several types. The most common is hypermobile EDS, which mainly causes very flexible joints and joint pain. Other types are rarer. One type, vascular EDS, affects blood vessels and needs specialist care, so an accurate diagnosis is important.',
        'اس کی کئی اقسام ہیں۔ سب سے عام ہائپرموبائل EDS ہے، جو بنیادی طور پر بہت لچکدار جوڑوں اور جوڑوں کے درد کا سبب بنتی ہے۔ دیگر اقسام نایاب ہیں۔ ایک قسم، ویسکولر EDS، خون کی نالیوں کو متاثر کرتی ہے اور ماہر نگہداشت درکار ہوتی ہے، اس لیے درست تشخیص اہم ہے۔',
      ),
    ],
  },

  earlySymptoms: [
    {
      text: L('Joints that move further than usual (very flexible or "double-jointed")', 'جوڑ جو معمول سے زیادہ حرکت کریں (بہت لچکدار)'),
    },
    { text: L('Soft, stretchy skin', 'نرم، لچکدار جلد') },
    { text: L('Easy bruising', 'آسانی سے نیل پڑنا') },
    { text: L('Joint pain and frequent sprains or dislocations', 'جوڑوں کا درد اور بار بار موچ یا جوڑ اُترنا') },
    { text: L('Wounds that heal slowly or leave thin scars', 'زخم جو آہستہ بھریں یا پتلے نشان چھوڑیں') },
  ],

  hiddenSymptoms: [
    {
      text: L('Long-lasting tiredness and widespread pain', 'دیرپا تھکن اور جسم بھر میں درد'),
      note: L('Sometimes dismissed as "growing pains"', 'بعض اوقات اسے "نشوونما کے درد" کہہ کر نظر انداز کر دیا جاتا ہے'),
    },
    {
      text: L('Dizziness or a racing heart when standing up', 'کھڑے ہونے پر چکر آنا یا دل کی تیز دھڑکن'),
    },
    {
      text: L('Digestive discomfort, such as bloating or constipation', 'ہاضمے کی تکلیف، جیسے پیٹ پھولنا یا قبض'),
    },
    {
      text: L('Anxiety, which can accompany chronic pain conditions', 'اضطراب، جو دائمی درد کی حالتوں کے ساتھ ہو سکتا ہے'),
    },
  ],

  diagnosis: {
    paragraphs: [
      L(
        'EDS is usually diagnosed by a doctor who examines the joints, skin, and medical and family history. A simple scoring method (the Beighton score) helps measure joint flexibility. For most types other than hypermobile EDS, a genetic test can confirm the diagnosis. Genetic testing is especially important if vascular EDS is suspected.',
        'EDS کی تشخیص عام طور پر ڈاکٹر کرتے ہیں جو جوڑوں، جلد، اور طبی و خاندانی تاریخ کا جائزہ لیتے ہیں۔ ایک سادہ اسکورنگ طریقہ (بائٹن اسکور) جوڑوں کی لچک ماپنے میں مدد دیتا ہے۔ ہائپرموبائل EDS کے علاوہ زیادہ تر اقسام کے لیے جینیاتی ٹیسٹ تشخیص کی تصدیق کر سکتا ہے۔ جینیاتی ٹیسٹ خاص طور پر اہم ہے اگر ویسکولر EDS کا شبہ ہو۔',
      ),
    ],
  },

  livingWith: {
    paragraphs: [
      L(
        'Many people with EDS manage well by protecting their joints, staying gently active, and pacing their activities. Physiotherapy to strengthen the muscles around joints is often the most helpful step. Managing pain and fatigue, and caring for the skin, are also part of everyday life with EDS.',
        'EDS کے بہت سے افراد اپنے جوڑوں کی حفاظت، نرم فعالیت، اور سرگرمیوں کو متوازن رکھ کر اچھی طرح سنبھال لیتے ہیں۔ جوڑوں کے ارد گرد پٹھوں کو مضبوط کرنے کے لیے فزیوتھراپی اکثر سب سے مددگار قدم ہوتا ہے۔ درد اور تھکن سنبھالنا، اور جلد کی دیکھ بھال بھی EDS کے ساتھ روزمرہ زندگی کا حصہ ہیں۔',
      ),
    ],
    points: [
      L('Gentle, low-impact exercise to strengthen muscles and support joints', 'پٹھوں کو مضبوط کرنے اور جوڑوں کو سہارا دینے کے لیے نرم، کم اثر والی ورزش'),
      L('Protect joints during daily activities and avoid overextending them', 'روزمرہ سرگرمیوں میں جوڑوں کی حفاظت کریں اور انہیں حد سے زیادہ نہ کھینچیں'),
      L('Careful skin and wound care, since skin can be fragile', 'جلد اور زخم کی محتاط دیکھ بھال، کیونکہ جلد نازک ہو سکتی ہے'),
      L('A pain-management plan agreed with the care team', 'نگہداشت ٹیم کے ساتھ طے شدہ درد سنبھالنے کا منصوبہ'),
    ],
  },

  parentGuidance: {
    paragraphs: [
      L(
        'For children with EDS, gentle movement, joint protection, and understanding at school make a big difference. Encourage low-impact activities they enjoy, be careful with cuts and grazes, and share information with teachers so your child gets the support they need.',
        'EDS والے بچوں کے لیے نرم حرکت، جوڑوں کی حفاظت، اور اسکول میں سمجھ بوجھ بڑا فرق ڈالتی ہے۔ انہیں پسندیدہ کم اثر والی سرگرمیوں کی حوصلہ افزائی کریں، کٹ اور خراش میں احتیاط کریں، اور اساتذہ کو معلومات دیں تاکہ آپ کے بچے کو مطلوبہ مدد ملے۔',
      ),
    ],
    points: [
      L('Encourage swimming or other gentle activities they enjoy', 'تیراکی یا دیگر نرم پسندیدہ سرگرمیوں کی حوصلہ افزائی کریں'),
      L('Work with school on practical adjustments when needed', 'ضرورت پڑنے پر اسکول کے ساتھ عملی سہولتوں پر کام کریں'),
      L('If vascular EDS runs in the family, follow specialist advice closely', 'اگر خاندان میں ویسکولر EDS ہو تو ماہر کے مشورے پر عمل کریں'),
    ],
  },

  specialists: [
    {
      id: 'rheumatologist',
      role: L('Rheumatologist', 'ریمیٹولوجسٹ'),
      description: L(
        'A joint and connective tissue specialist who guides diagnosis and care',
        'جوڑوں اور مربوط بافت کے ماہر جو تشخیص اور نگہداشت کی رہنمائی کرتے ہیں',
      ),
    },
    {
      id: 'physiotherapist',
      role: L('Physiotherapist', 'فزیوتھراپسٹ'),
      description: L(
        'Designs safe exercises to strengthen and stabilise joints',
        'جوڑوں کو مضبوط اور مستحکم کرنے کے لیے محفوظ ورزشیں بناتے ہیں',
      ),
    },
    {
      id: 'geneticist',
      role: L('Clinical geneticist', 'کلینیکل جینیٹسٹ'),
      description: L(
        'Confirms the EDS type and advises the family',
        'EDS کی قسم کی تصدیق کرتے اور خاندان کو مشورہ دیتے ہیں',
      ),
    },
  ],

  faq: [
    {
      id: 'exercise',
      question: L('Can people with EDS exercise?', 'کیا EDS والے افراد ورزش کر سکتے ہیں؟'),
      answer: L(
        'Yes, and gentle exercise is usually encouraged. Low-impact activities that strengthen the muscles around the joints (guided by a physiotherapist) help protect the joints. High-impact or contact activities may need to be adjusted depending on the type of EDS.',
        'ہاں، اور نرم ورزش کی عموماً حوصلہ افزائی کی جاتی ہے۔ جوڑوں کے ارد گرد پٹھوں کو مضبوط کرنے والی کم اثر والی سرگرمیاں (فزیوتھراپسٹ کی رہنمائی میں) جوڑوں کی حفاظت میں مدد دیتی ہیں۔ زیادہ اثر یا ٹکراؤ والی سرگرمیوں کو EDS کی قسم کے مطابق ایڈجسٹ کرنا پڑ سکتا ہے۔',
      ),
    },
    {
      id: 'progressive',
      question: L('Does EDS get worse over time?', 'کیا EDS وقت کے ساتھ بگڑتا ہے؟'),
      answer: L(
        'This varies by type and by person. Many people manage their symptoms well with the right exercises, joint protection, and support. A care team can help create a plan that fits each person.',
        'یہ قسم اور شخص کے مطابق مختلف ہوتا ہے۔ بہت سے افراد درست ورزشوں، جوڑوں کی حفاظت اور مدد سے اپنی علامات اچھی طرح سنبھال لیتے ہیں۔ نگہداشت کی ٹیم ہر فرد کے مطابق منصوبہ بنانے میں مدد کر سکتی ہے۔',
      ),
    },
    {
      id: 'inherited',
      question: L('Is EDS inherited?', 'کیا EDS وراثتی ہے؟'),
      answer: L(
        'Yes. EDS is genetic and often runs in families. Most types follow an autosomal dominant pattern, where a single changed gene can cause the condition, though this depends on the type. A clinical geneticist can explain the pattern for a specific family.',
        'ہاں۔ EDS جینیاتی ہے اور اکثر خاندانوں میں چلتا ہے۔ زیادہ تر اقسام آٹوسومل ڈومیننٹ طریقے سے چلتی ہیں، جہاں ایک تبدیل شدہ جین بھی حالت پیدا کر سکتا ہے، اگرچہ یہ قسم پر منحصر ہے۔ کلینیکل جینیٹسٹ کسی مخصوص خاندان کے لیے یہ طریقہ سمجھا سکتے ہیں۔',
      ),
    },
  ],

  references: [
    {
      id: 'medlineplus',
      title: 'Ehlers-Danlos syndrome',
      authors: 'MedlinePlus Genetics',
      publication: 'U.S. National Library of Medicine',
      date: '2023',
      url: 'https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/',
    },
    {
      id: 'ehlers-danlos-society',
      title: 'What are the Ehlers-Danlos syndromes?',
      authors: 'The Ehlers-Danlos Society',
      publication: 'The Ehlers-Danlos Society',
      date: '2023',
      url: 'https://www.ehlers-danlos.com/',
    },
    {
      id: 'nhs',
      title: 'Ehlers-Danlos syndromes, overview',
      authors: 'National Health Service (UK)',
      publication: 'NHS',
      date: '2022',
      url: 'https://www.nhs.uk/conditions/ehlers-danlos-syndromes/',
    },
  ],
};
