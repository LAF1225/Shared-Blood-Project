import type { LocalizedText } from '@/types';
import type { CommunityActivityHighlight, CommunityPhoto } from '../types';

/**
 * Ongoing community work shown on the public Community page, with photos the
 * project owner confirmed the people pictured agreed to publish. Photos were
 * re-encoded without metadata (no camera, time or location data) before
 * being added to `public/community/`.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const COMMUNITY_ACTIVITIES: readonly CommunityActivityHighlight[] = [
  {
    id: 'oral-histories-sundas',
    title: L('Oral history interviews', 'زبانی تاریخ کے انٹرویوز'),
    place: L('Sundas Foundation thalassemia centre, Islamabad', 'سندس فاؤنڈیشن تھیلیسیمیا سینٹر، اسلام آباد'),
    summary: L(
      'Shared Blood records oral history interviews at the Sundas Foundation thalassemia centre, documenting first-hand experiences of living with thalassemia and of the care it needs.',
      'شیئرڈ بلڈ سندس فاؤنڈیشن کے تھیلیسیمیا سینٹر میں زبانی تاریخ کے انٹرویوز ریکارڈ کرتا ہے، جن میں تھیلیسیمیا کے ساتھ زندگی گزارنے اور اس کی نگہداشت کے براہِ راست تجربات محفوظ کیے جاتے ہیں۔',
    ),
    audience: L('People and families connected to thalassemia care', 'تھیلیسیمیا کی نگہداشت سے وابستہ افراد اور خاندان'),
  },
  {
    id: 'caretaker-workshops-aghosh',
    title: L('Caretaker workshops', 'نگہداشت کنندگان کے لیے ورکشاپس'),
    place: L('Aghosh orphanages run by Alkhidmat, Rawalpindi', 'الخدمت کے زیرِ انتظام آغوش یتیم خانے، راولپنڈی'),
    summary: L(
      'Shared Blood runs workshops for caretakers at Aghosh orphanages, introducing common inherited genetic disorders, the early warning signs to notice in children, and when medical attention may be needed. Every caretaker taking part receives a copy of Shared Blood’s learning booklet.',
      'شیئرڈ بلڈ آغوش یتیم خانوں میں نگہداشت کرنے والوں کے لیے ورکشاپس منعقد کرتا ہے، جن میں عام موروثی جینیاتی امراض، بچوں میں قابلِ توجہ ابتدائی علامات، اور طبی مدد کی ضرورت کب پڑ سکتی ہے، کا تعارف کرایا جاتا ہے۔ ورکشاپ میں شریک ہر نگہداشت کنندہ کو شیئرڈ بلڈ کا تعلیمی کتابچہ دیا جاتا ہے۔',
    ),
    audience: L('Orphanage caretakers and staff', 'یتیم خانوں کے نگہداشت کنندگان اور عملہ'),
    resourceSlug: 'caregiver-handbook',
  },
];

export const COMMUNITY_PHOTOS: readonly CommunityPhoto[] = [
  {
    src: '/community/oral-history-interview.jpg',
    width: 1290,
    height: 708,
    activityId: 'oral-histories-sundas',
    alt: L(
      'A man in white sits beside blue treatment chairs in a thalassemia centre ward, talking with an interviewer seated at a laptop.',
      'سفید لباس میں ایک شخص تھیلیسیمیا سینٹر کے وارڈ میں نیلی علاج والی کرسیوں کے پاس بیٹھا لیپ ٹاپ کے ساتھ بیٹھے انٹرویو کرنے والے سے بات کر رہا ہے۔',
    ),
    caption: L(
      'An oral history interview at the Sundas Foundation thalassemia centre, Islamabad.',
      'سندس فاؤنڈیشن تھیلیسیمیا سینٹر، اسلام آباد میں زبانی تاریخ کا ایک انٹرویو۔',
    ),
  },
  {
    src: '/community/caretaker-workshop-1.jpg',
    width: 1600,
    height: 1200,
    activityId: 'caretaker-workshops-aghosh',
    alt: L(
      'A Shared Blood speaker addresses seated caretakers in front of an Aghosh Alkhidmat Rawalpindi banner.',
      'شیئرڈ بلڈ کا ایک مقرر آغوش الخدمت راولپنڈی کے بینر کے سامنے بیٹھے نگہداشت کنندگان سے خطاب کر رہا ہے۔',
    ),
    caption: L(
      'A caretaker workshop at an Aghosh orphanage run by Alkhidmat, Rawalpindi.',
      'الخدمت کے زیرِ انتظام آغوش یتیم خانہ، راولپنڈی میں نگہداشت کنندگان کی ایک ورکشاپ۔',
    ),
  },
  {
    src: '/community/caretaker-workshop-2.jpg',
    width: 1600,
    height: 900,
    activityId: 'caretaker-workshops-aghosh',
    alt: L(
      'Wide view of the workshop room: the speaker stands at the front while caretakers listen from rows of blue chairs.',
      'ورکشاپ کے کمرے کا منظر: مقرر سامنے کھڑا ہے جبکہ نگہداشت کنندگان نیلی کرسیوں کی قطاروں میں بیٹھے سن رہے ہیں۔',
    ),
    caption: L(
      'Caretakers taking part in a Shared Blood workshop at Aghosh, Rawalpindi.',
      'آغوش، راولپنڈی میں شیئرڈ بلڈ کی ورکشاپ میں شریک نگہداشت کنندگان۔',
    ),
  },
];
