import type { LocalizedText } from '@/types';
import { EXTERNAL_LINKS } from '@/constants/config';

/**
 * The live public survey ("Project Shared Blood Public Survey" on Google
 * Forms). Everything here describes the form as published: 14 questions in
 * English, no name or contact details, an age group rather than a date of
 * birth, and the province a family belongs to rather than an address.
 * Update this file whenever the form's questions change.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export interface SurveyFormInfo {
  url: string;
  questionCount: number;
  /** Languages the form itself is written in. */
  languages: readonly ('en' | 'ur')[];
  topics: readonly { title: LocalizedText; detail: LocalizedText }[];
}

export const SURVEY_FORM: SurveyFormInfo = {
  url: EXTERNAL_LINKS.awarenessSurvey,
  questionCount: 14,
  languages: ['en'],
  topics: [
    {
      title: L('About you', 'آپ کے بارے میں'),
      detail: L(
        'Your age group, sex, highest level of education, and the province your family belongs to.',
        'آپ کی عمر کا گروپ، جنس، تعلیم کی اعلیٰ ترین سطح، اور وہ صوبہ جس سے آپ کا خاندان تعلق رکھتا ہے۔',
      ),
    },
    {
      title: L('Cousin marriage', 'کزن میرج'),
      detail: L(
        'How many cousin marriages you know of in your social circle, whether you see them as an important tradition, and whether you have heard they can raise the risk of genetic disorders.',
        'آپ کے حلقۂ احباب میں آپ کتنی کزن میرجز کے بارے میں جانتے ہیں، کیا آپ انہیں ایک اہم روایت سمجھتے ہیں، اور کیا آپ نے سنا ہے کہ ان سے جینیاتی امراض کا خطرہ بڑھ سکتا ہے۔',
      ),
    },
    {
      title: L('Awareness of genetic disorders', 'جینیاتی امراض سے آگاہی'),
      detail: L(
        'Which of beta thalassemia, cystic fibrosis, lysosomal storage disorders and Ehlers-Danlos syndrome you have heard of.',
        'بیٹا تھیلیسیمیا، سسٹک فائبروسس، لائسوسومل اسٹوریج ڈس آرڈرز اور ایہلرز ڈینلوس سنڈروم میں سے آپ نے کن کے بارے میں سنا ہے۔',
      ),
    },
    {
      title: L('Premarital screening', 'شادی سے پہلے اسکریننگ'),
      detail: L(
        'Whether you are married and, if so, whether you had premarital screening for beta thalassemia.',
        'کیا آپ شادی شدہ ہیں، اور اگر ہیں تو کیا آپ نے شادی سے پہلے بیٹا تھیلیسیمیا کی اسکریننگ کروائی تھی۔',
      ),
    },
    {
      title: L('Your views', 'آپ کی رائے'),
      detail: L(
        'Whether there should be a national genetic registry, whether discussing genetic disorders before marriage is taboo, whether Pakistan needs more awareness, and whether traditions should change when health risks are involved.',
        'کیا ایک قومی جینیاتی رجسٹری ہونی چاہیے، کیا شادی سے پہلے جینیاتی امراض پر بات کرنا معیوب سمجھا جاتا ہے، کیا پاکستان میں مزید آگاہی کی ضرورت ہے، اور کیا صحت کو خطرہ ہو تو روایات بدلنی چاہییں۔',
      ),
    },
  ],
};
