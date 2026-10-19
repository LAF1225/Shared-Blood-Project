import type { LocalizedText } from '@/types';
import type { PolicyBrief } from '../types';

/**
 * Shared Blood NTSPR Policy Brief: the National Thalassemia Screening and
 * Prevention Registry. English follows the published brief; Urdu is a
 * translation for the website (the brief itself is English only).
 *
 * The brief gives "almost 9,000 children born annually" and "17 a day"; those
 * disagree (9,000 / 365 is about 25), so the page uses 9,000 a year, about 25 a
 * day, as agreed with the project owner.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/** Official law titles are shown in English in both locales. */
const SAME = (text: string): LocalizedText => ({ en: text, ur: text });

export const NTSPR_BRIEF: PolicyBrief = {
  code: 'NTSPR',
  summary: [
    L(
      'Thousands of children in Pakistan are born with thalassemia each year, despite existing provincial laws that promote genetic screening and counselling. These policies remain largely fragmented, with inadequate monitoring, limited digital infrastructure and poor interoperability.',
      'پاکستان میں ہر سال ہزاروں بچے تھیلیسیمیا کے ساتھ پیدا ہوتے ہیں، حالانکہ صوبائی سطح پر جینیاتی اسکریننگ اور مشاورت کو فروغ دینے والے قوانین موجود ہیں۔ یہ پالیسیاں بڑی حد تک بکھری ہوئی ہیں، ان کی نگرانی ناکافی ہے، ڈیجیٹل ڈھانچہ محدود ہے، اور مختلف نظام ایک دوسرے سے منسلک نہیں۔',
    ),
    L(
      'To address these shortcomings, Shared Blood proposes the National Thalassemia Screening and Prevention Registry (NTSPR): a federally coordinated digital framework connecting accredited screening facilities with existing marriage-registration systems. Through targeted legislative amendments, registrars could verify screening compliance using authenticated digital certificates, without accessing confidential genetic information.',
      'ان خامیوں کو دور کرنے کے لیے شیئرڈ بلڈ قومی تھیلیسیمیا اسکریننگ اور روک تھام رجسٹری (NTSPR) تجویز کرتا ہے: ایک وفاقی سطح پر مربوط ڈیجیٹل نظام جو منظور شدہ اسکریننگ مراکز کو نکاح کی رجسٹریشن کے موجودہ نظاموں سے جوڑے۔ قوانین میں مخصوص ترامیم کے ذریعے رجسٹرار مستند ڈیجیٹل سرٹیفکیٹ کی مدد سے اسکریننگ کی تکمیل کی تصدیق کر سکیں گے، خفیہ جینیاتی معلومات تک رسائی کے بغیر۔',
    ),
    L(
      'Supported by accessible genetic counselling, data protection safeguards and nationwide awareness campaigns, the NTSPR would strengthen enforcement of existing legislation, promote informed reproductive decisions, and help reduce future cases of severe thalassemia.',
      'قابلِ رسائی جینیاتی مشاورت، ڈیٹا کے تحفظ کے انتظامات اور ملک گیر آگاہی مہمات کے ساتھ، NTSPR موجودہ قوانین پر عمل درآمد کو مضبوط بنائے گی، تولیدی معاملات میں باخبر فیصلوں کو فروغ دے گی، اور مستقبل میں شدید تھیلیسیمیا کے کیسز کم کرنے میں مدد دے گی۔',
    ),
  ],
  figuresIntro: L(
    'Thalassemia is a serious inherited blood disorder that often requires lifelong treatment, usually blood transfusions and iron chelation therapy. After generations of consanguineous marriage, even couples with no shared immediate family can be at risk. To limit its spread, couples need to be tested and given proper genetic counselling before marriage.',
    'تھیلیسیمیا ایک سنگین موروثی خونی مرض ہے جس میں اکثر زندگی بھر علاج درکار ہوتا ہے، عموماً خون کی منتقلی اور جسم سے فالتو آئرن نکالنے والی (chelation) دواؤں کے ذریعے۔ کئی نسلوں سے خاندان کے اندر شادیوں کی وجہ سے ایسے جوڑے بھی خطرے میں ہو سکتے ہیں جن کا آپس میں کوئی قریبی خاندانی رشتہ نہ ہو۔ اس مرض کے پھیلاؤ کو محدود کرنے کے لیے ضروری ہے کہ جوڑوں کا شادی سے پہلے ٹیسٹ ہو اور انہیں مناسب جینیاتی مشاورت فراہم کی جائے۔',
  ),
  figures: [
    {
      value: L('5–8%', '5 تا 8 فیصد'),
      label: L('of the population carries the beta-thalassemia gene', 'آبادی بیٹا تھیلیسیمیا جین کی حامل ہے'),
    },
    {
      value: L('~10 million', 'تقریباً 1 کروڑ'),
      label: L('Pakistanis are carriers', 'پاکستانی اس جین کے کیریئر ہیں'),
    },
    {
      value: L('~9,000', 'تقریباً 9,000'),
      label: L(
        'children are born with thalassemia each year, about 25 a day',
        'بچے ہر سال تھیلیسیمیا کے ساتھ پیدا ہوتے ہیں، یعنی روزانہ تقریباً 25',
      ),
    },
    {
      value: L('50,000+', '50,000 سے زائد'),
      label: L('patients are registered with thalassemia organisations', 'مریض تھیلیسیمیا تنظیموں کے ساتھ رجسٹرڈ ہیں'),
    },
  ],
  figuresNote: L(
    'Many more cases go undocumented, and most patients receive transfusions only infrequently.',
    'بہت سے کیسز کا کوئی ریکارڈ موجود نہیں، اور زیادہ تر مریضوں کو خون کی منتقلی کبھی کبھار ہی مل پاتی ہے۔',
  ),
  lawsIntro: L(
    'Provincial authorities have tried to limit the spread of thalassemia in different ways, but most efforts have fallen short for one main reason: there is no unified registry that Union Council registrar offices can access.',
    'صوبائی حکومتوں نے مختلف طریقوں سے تھیلیسیمیا کے پھیلاؤ کو روکنے کی کوشش کی ہے، لیکن زیادہ تر کوششیں ایک بنیادی وجہ سے کامیاب نہیں ہو سکیں: کوئی ایسی متحد رجسٹری موجود نہیں جس تک یونین کونسل کے رجسٹرار دفاتر کی رسائی ہو۔',
  ),
  laws: [
    {
      region: L('Punjab', 'پنجاب'),
      name: SAME('Thalassemia Prevention Act 2025'),
      summary: L(
        'Introduces genetic screening requirements linked to admission to educational institutions, to create a genetic registry. The system is not connected to any Union Council registrar office.',
        'تعلیمی اداروں میں داخلے سے منسلک جینیاتی اسکریننگ کی شرائط متعارف کراتا ہے تاکہ ایک جینیاتی رجسٹری بنائی جا سکے۔ تاہم یہ نظام کسی یونین کونسل رجسٹرار دفتر سے منسلک نہیں۔',
      ),
    },
    {
      region: L('Islamabad Capital Territory', 'اسلام آباد کیپیٹل ٹیریٹری'),
      name: SAME('Compulsory Thalassemia Screening Bill 2026'),
      summary: L(
        'Passed by both houses of Parliament, proposing premarital screening requirements for the federal capital. Its operational implementation and final enactment status still require confirmation.',
        'پارلیمنٹ کے دونوں ایوانوں نے یہ بل منظور کیا، جس میں وفاقی دارالحکومت کے لیے شادی سے پہلے اسکریننگ کی شرائط تجویز کی گئیں۔ تاہم اس پر عملی عمل درآمد اور حتمی نفاذ کی حیثیت کی ابھی تصدیق ہونا باقی ہے۔',
      ),
    },
    {
      region: L('Khyber Pakhtunkhwa', 'خیبر پختونخوا'),
      name: SAME('Preventive Health Act 2009'),
      summary: L(
        'Required Nikah registrars to obtain premarital screening for thalassemia and hepatitis C, but was largely unimplemented or bypassed through fake certificates.',
        'اس قانون کے تحت نکاح رجسٹراروں پر تھیلیسیمیا اور ہیپاٹائٹس سی کی قبل از شادی اسکریننگ حاصل کرنا لازم تھا، لیکن اس پر بڑی حد تک عمل نہیں ہوا یا جعلی سرٹیفکیٹس کے ذریعے اسے نظرانداز کیا گیا۔',
      ),
    },
    {
      region: L('Sindh', 'سندھ'),
      name: SAME('Prevention and Control of Thalassemia Act 2013'),
      summary: L(
        'Required genetic information to be entered into a data bank, but was not implemented. In January 2026 the Sindh Assembly passed a resolution recognising the Act’s failure and calling for its proper implementation.',
        'اس قانون کے تحت جینیاتی معلومات ایک ڈیٹا بینک میں درج کرنا لازم تھا، لیکن اس پر عمل درآمد نہیں ہوا۔ جنوری 2026 میں سندھ اسمبلی نے ایک قرارداد منظور کی جس میں اس قانون کی ناکامی کو تسلیم کرتے ہوئے اس پر درست عمل درآمد کا مطالبہ کیا گیا۔',
      ),
    },
  ],
  gaps: [
    {
      title: L('Monitoring', 'نگرانی'),
      body: L(
        'Even when legislation passes, implementation goes unmonitored and initiatives stall.',
        'قانون منظور ہونے کے بعد بھی اس پر عمل درآمد کی نگرانی نہیں ہوتی، اور اقدامات رک جاتے ہیں۔',
      ),
    },
    {
      title: L('Digitisation', 'ڈیجیٹائزیشن'),
      body: L(
        'Legislation that is monitored but not digitised is easily bypassed with fake certificates.',
        'جس قانون کی نگرانی تو ہو مگر نظام ڈیجیٹل نہ ہو، اسے جعلی سرٹیفکیٹس کے ذریعے آسانی سے نظرانداز کیا جا سکتا ہے۔',
      ),
    },
    {
      title: L('Interoperability', 'باہمی ربط'),
      body: L(
        'Even where screening is monitored and recorded in a digital registry, offices such as the Union Council registrar have no central system to check it before issuing a marriage certificate.',
        'جہاں اسکریننگ کی نگرانی بھی ہو اور وہ ڈیجیٹل رجسٹری میں درج بھی ہو، وہاں بھی یونین کونسل رجسٹرار جیسے دفاتر کے پاس کوئی مرکزی نظام نہیں جس کے ذریعے وہ نکاح نامہ جاری کرنے سے پہلے اسے جانچ سکیں۔',
      ),
    },
  ],
  gapsConclusion: L(
    'This is why the Sindh Act of 2013 failed, and why the Punjab Act of 2025 is not enough on its own.',
    'یہی وجہ ہے کہ سندھ کا 2013 کا قانون ناکام رہا، اور پنجاب کا 2025 کا قانون اکیلے کافی نہیں۔',
  ),
  proposalIntro: L(
    'Shared Blood proposes the NTSPR as a federal-provincial collaboration, supported by targeted amendments to existing thalassemia legislation and the relevant marriage-registration rules.',
    'شیئرڈ بلڈ NTSPR کو وفاق اور صوبوں کے باہمی تعاون کے طور پر تجویز کرتا ہے، جس کے ساتھ تھیلیسیمیا کے موجودہ قوانین اور نکاح کی رجسٹریشن کے متعلقہ قواعد میں مخصوص ترامیم کی جائیں۔',
  ),
  measures: [
    {
      title: L('National digital registry', 'قومی ڈیجیٹل رجسٹری'),
      body: L(
        'A secure, interoperable platform run by participating health authorities. Accredited laboratories would electronically register authenticated test results against verified identities, using NADRA identity verification, without adding genetic information to the national identity database.',
        'شریک صحت حکام کے زیرِ انتظام ایک محفوظ اور باہم مربوط پلیٹ فارم۔ منظور شدہ لیبارٹریاں نادرا کی شناختی تصدیق کے ذریعے تصدیق شدہ شناخت کے ساتھ مستند ٹیسٹ نتائج الیکٹرانک طور پر درج کریں گی، لیکن جینیاتی معلومات قومی شناختی ڈیٹا بیس کا حصہ نہیں بنیں گی۔',
      ),
    },
    {
      title: L('Mandatory certificate verification', 'سرٹیفکیٹ کی لازمی تصدیق'),
      body: L(
        'Authorised Union Council and Nikah registrars would verify a digitally signed screening certificate through existing civil-registration systems. The check would confirm identities, that the certificate is genuine, and that required screening and counselling were completed, without showing carrier status or clinical reports.',
        'مجاز یونین کونسل اور نکاح رجسٹرار شہری رجسٹریشن کے موجودہ نظام کے ذریعے ڈیجیٹل دستخط شدہ اسکریننگ سرٹیفکیٹ کی تصدیق کریں گے۔ اس سے شناخت، سرٹیفکیٹ کے اصل ہونے، اور مطلوبہ اسکریننگ و مشاورت کی تکمیل کی تصدیق ہوگی، لیکن کیریئر حیثیت یا طبی رپورٹس ظاہر نہیں ہوں گی۔',
      ),
    },
    {
      title: L('Genetic counselling and informed choice', 'جینیاتی مشاورت اور باخبر انتخاب'),
      body: L(
        'Couples identified as having a higher reproductive risk would receive confidential counselling explaining inheritance chances, reproductive options and available medical support. A positive carrier result would not prohibit marriage.',
        'جن جوڑوں میں تولیدی خطرہ زیادہ پایا جائے انہیں خفیہ مشاورت فراہم کی جائے گی، جس میں وراثت کے امکانات، تولیدی اختیارات اور دستیاب طبی مدد کی وضاحت ہوگی۔ کیریئر ہونے کا مثبت نتیجہ شادی میں رکاوٹ نہیں بنے گا۔',
      ),
    },
    {
      title: L('Legislative harmonisation', 'قوانین میں ہم آہنگی'),
      body: L(
        'Provincial governments would amend screening laws and registration rules to recognise NTSPR certificates, define registrars’ responsibilities, set penalties for fraudulent certification, and provide independent appeals and lawful exemptions. Federal legislation would govern the framework in Islamabad Capital Territory.',
        'صوبائی حکومتیں اسکریننگ کے متعلقہ قوانین اور رجسٹریشن کے قواعد میں ترمیم کریں گی تاکہ NTSPR سرٹیفکیٹس کو تسلیم کیا جائے، رجسٹراروں کی ذمہ داریاں طے ہوں، جعلی سرٹیفکیٹس پر سزائیں مقرر ہوں، اور آزادانہ اپیل اور قانونی استثنا کی گنجائش ہو۔ اسلام آباد کیپیٹل ٹیریٹری میں یہ نظام وفاقی قانون کے تحت چلے گا۔',
      ),
    },
    {
      title: L('Accessibility and data protection', 'رسائی اور ڈیٹا کا تحفظ'),
      body: L(
        'Participating governments would provide free or subsidised screening and counselling, prioritising underserved districts. The registry would use informed consent, restricted access, encryption, audit logs, independent oversight and safeguards against genetic discrimination. Offline verification and assisted registration would serve areas with unreliable connectivity.',
        'شریک حکومتیں مفت یا رعایتی اسکریننگ اور مشاورت فراہم کریں گی، اور پسماندہ اضلاع کو ترجیح دی جائے گی۔ رجسٹری میں باخبر رضامندی، محدود رسائی، انکرپشن، آڈٹ لاگز، آزادانہ نگرانی اور جینیاتی امتیاز کے خلاف تحفظات شامل ہوں گے۔ کمزور انٹرنیٹ والے علاقوں کے لیے آف لائن تصدیق اور معاونت کے ساتھ رجسٹریشن کی سہولت ہوگی۔',
      ),
    },
    {
      title: L('Phased national implementation', 'مرحلہ وار قومی نفاذ'),
      body: L(
        'A federal-provincial steering committee, including health authorities, NADRA and local-government representatives, would oversee a 12-month pilot followed by an evaluated expansion. Indicators would include verified screening coverage, counselling completion, detection of certificate fraud, district-level access to services, and long-term changes in affected births.',
        'صحت حکام، نادرا اور مقامی حکومتوں کے نمائندوں پر مشتمل ایک وفاقی و صوبائی اسٹیئرنگ کمیٹی 12 ماہ کے پائلٹ منصوبے کی نگرانی کرے گی، جس کے بعد جائزے کی بنیاد پر اسے وسعت دی جائے گی۔ کارکردگی کے اشاریوں میں تصدیق شدہ اسکریننگ کوریج، مشاورت کی تکمیل، جعلی سرٹیفکیٹس کی نشاندہی، اضلاع کی سطح پر خدمات تک رسائی، اور طویل مدت میں متاثرہ پیدائشوں میں تبدیلی شامل ہوں گی۔',
      ),
    },
    {
      title: L('Grassroots awareness', 'نچلی سطح پر آگاہی'),
      body: L(
        'A public awareness campaign, similar to existing polio campaigns, would launch alongside the legislation. Provincial governments would set up camps in underserved communities, working with local religious leaders so that the new marriage-registration process is welcomed, and a national campaign would run public service announcements across broadcast media.',
        'قانون سازی کے ساتھ ہی پولیو مہمات کی طرز پر ایک عوامی آگاہی مہم شروع کی جائے گی۔ صوبائی حکومتیں مقامی مذہبی رہنماؤں کے تعاون سے پسماندہ علاقوں میں کیمپ لگائیں گی تاکہ نکاح کی رجسٹریشن کے نئے طریقۂ کار کو قبولیت ملے، اور ملک گیر مہم کے تحت مختلف نشریاتی ذرائع پر عوامی خدمت کے پیغامات چلائے جائیں گے۔',
      ),
    },
  ],
  safeguards: [
    L('A positive carrier result would not prevent anyone from marrying.', 'کیریئر ہونے کا مثبت نتیجہ کسی کو شادی سے نہیں روکے گا۔'),
    L(
      'Registrars would see only whether screening and counselling were completed, never carrier status or clinical reports.',
      'رجسٹرار صرف یہ دیکھ سکیں گے کہ اسکریننگ اور مشاورت مکمل ہوئی یا نہیں، کیریئر حیثیت یا طبی رپورٹس کبھی نہیں۔',
    ),
    L(
      'Genetic information would not be added to the national identity database.',
      'جینیاتی معلومات قومی شناختی ڈیٹا بیس میں شامل نہیں کی جائیں گی۔',
    ),
    L(
      'Counselling would be confidential, and screening free or subsidised.',
      'مشاورت خفیہ ہوگی، اور اسکریننگ مفت یا رعایتی ہوگی۔',
    ),
    L(
      'Fraudulent certificates would be penalised, with independent appeals and lawful exemptions available.',
      'جعلی سرٹیفکیٹس پر سزا ہوگی، اور آزادانہ اپیل اور قانونی استثنا کی سہولت موجود ہوگی۔',
    ),
  ],
};
