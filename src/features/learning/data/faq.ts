import type { LocalizedText } from '@/types';
import type { LearningFaqItem } from '../types';

const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/**
 * Centralized Parent Learning Centre FAQ (spec §11). Plain-language answers for
 * caregivers. Supports future expansion — add entries without any code change.
 */
export const LEARNING_FAQ: LearningFaqItem[] = [
  {
    id: 'genetic-counseling',
    question: L('What is genetic counseling?', 'جینیاتی مشاورت کیا ہے؟'),
    answer: L(
      'Genetic counseling is a supportive conversation with a trained professional who helps families understand inherited conditions, how they are passed on, and the options available. It is private, respectful, and there to answer your questions; it does not make decisions for you.',
      'جینیاتی مشاورت ایک تربیت یافتہ ماہر کے ساتھ معاون گفتگو ہے جو خاندانوں کو موروثی حالتوں، ان کے منتقل ہونے کے طریقے، اور دستیاب اختیارات سمجھنے میں مدد دیتی ہے۔ یہ نجی، محترم اور آپ کے سوالات کے جواب کے لیے ہوتی ہے، یہ آپ کے لیے فیصلے نہیں کرتی۔',
    ),
  },
  {
    id: 'seek-advice',
    question: L('When should I seek medical advice?', 'مجھے طبی مشورہ کب لینا چاہیے؟'),
    answer: L(
      'Speak to a doctor if your child has ongoing tiredness or paleness, poor growth or feeding, repeated infections, delays in reaching milestones, or any symptom that worries you. Seeking advice early gives your child the best support; it is always okay to ask.',
      'اگر آپ کے بچے میں مسلسل تھکن یا پیلا پن، کمزور نشوونما یا خوراک، بار بار انفیکشن، سنگِ میل تک پہنچنے میں تاخیر، یا کوئی بھی پریشان کن علامت ہو تو ڈاکٹر سے بات کریں۔ جلد مشورہ لینا آپ کے بچے کو بہترین مدد دیتا ہے، پوچھنا ہمیشہ ٹھیک ہے۔',
    ),
  },
  {
    id: 'diagnosed',
    question: L('How are inherited disorders diagnosed?', 'موروثی امراض کی تشخیص کیسے ہوتی ہے؟'),
    answer: L(
      'Diagnosis usually begins with a doctor reviewing symptoms and family history, followed by blood tests. Some conditions are confirmed with specialised tests, such as hemoglobin studies or genetic testing. A specialist can explain which tests are helpful for your situation.',
      'تشخیص عام طور پر ڈاکٹر کے علامات اور خاندانی تاریخ کے جائزے سے شروع ہوتی ہے، پھر خون کے ٹیسٹ ہوتے ہیں۔ کچھ حالتوں کی تصدیق خاص ٹیسٹوں سے ہوتی ہے، جیسے ہیموگلوبن مطالعہ یا جینیاتی ٹیسٹ۔ ماہر بتا سکتے ہیں کہ آپ کی صورتحال کے لیے کون سے ٹیسٹ مفید ہیں۔',
    ),
  },
  {
    id: 'emotional-support',
    question: L('How can I support my child emotionally?', 'میں اپنے بچے کی جذباتی مدد کیسے کر سکتا ہوں؟'),
    answer: L(
      'Listen openly, answer questions in simple words suited to their age, and reassure them that they are loved and not alone. Keeping routines, celebrating small wins, and connecting with other families can all help. Looking after your own wellbeing matters too.',
      'کھل کر سنیں، ان کی عمر کے مطابق سادہ الفاظ میں سوالات کے جواب دیں، اور انہیں یقین دلائیں کہ وہ محبوب ہیں اور اکیلے نہیں۔ معمولات برقرار رکھنا، چھوٹی کامیابیوں کا جشن منانا، اور دیگر خاندانوں سے رابطہ سب مددگار ہیں۔ اپنی صحت کا خیال رکھنا بھی اہم ہے۔',
    ),
  },
  {
    id: 'specialists',
    question: L('What specialists may be involved in care?', 'نگہداشت میں کون سے ماہرین شامل ہو سکتے ہیں؟'),
    answer: L(
      'Depending on the condition, your child may see a pediatrician, a blood specialist (hematologist), a genetic counselor, and therapists such as physiotherapists. These professionals work together as a team, with you at the centre, to plan the best care.',
      'حالت کے مطابق، آپ کا بچہ ماہرِ اطفال، خون کے ماہر (ہیماٹولوجسٹ)، جینیاتی مشیر، اور فزیوتھراپسٹ جیسے معالجین سے مل سکتا ہے۔ یہ ماہرین ایک ٹیم کے طور پر، آپ کو مرکز میں رکھتے ہوئے، بہترین نگہداشت کی منصوبہ بندی کرتے ہیں۔',
    ),
  },
  {
    id: 'carrier-testing',
    question: L('What is carrier testing?', 'حامل ٹیسٹنگ کیا ہے؟'),
    answer: L(
      'Carrier testing is a simple blood test that shows whether a healthy person carries a gene for an inherited condition. Knowing this (ideally before marriage or pregnancy) helps families understand the chances for future children and plan with support.',
      'حامل ٹیسٹنگ ایک سادہ خون کا ٹیسٹ ہے جو بتاتا ہے کہ آیا ایک صحت مند شخص کسی موروثی حالت کا جین رکھتا ہے۔ یہ جاننا (بہتر ہے کہ شادی یا حمل سے پہلے) خاندانوں کو مستقبل کے بچوں کے امکانات سمجھنے اور مدد کے ساتھ منصوبہ بندی میں مدد دیتا ہے۔',
    ),
  },
];
