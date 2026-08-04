import type { LocalizedText } from '@/types';
import type { GovernancePageContent } from '../types';

/**
 * Public governance page content (spec §32) — Privacy, Research Ethics, and
 * Research Governance. Approved, plain-language content in English and Urdu. This
 * is Shared Blood's own governance policy (not fabricated evidence), so it ships
 * populated. Understandable without hover, colour, audio, or animation (spec §35).
 */

const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GOVERNANCE_PAGES: readonly GovernancePageContent[] = [
  {
    id: 'privacy',
    kicker: L('Privacy', 'رازداری'),
    title: L('Privacy at Shared Blood', 'شیئرڈ بلڈ میں رازداری'),
    subtitle: L('How we limit, protect, and govern the little data we handle.', 'ہم اپنے پاس موجود تھوڑے سے ڈیٹا کو کیسے محدود، محفوظ، اور نگران کرتے ہیں۔'),
    intro: L(
      'Shared Blood is designed to collect as little data as possible. We define a clear purpose before collecting anything, protect what we hold, restrict who can use it, review before we publish, and delete it when it is no longer needed.',
      'شیئرڈ بلڈ کو اس طرح بنایا گیا ہے کہ کم سے کم ڈیٹا جمع ہو۔ ہم کچھ بھی جمع کرنے سے پہلے واضح مقصد متعین کرتے ہیں، جو ہمارے پاس ہو اسے محفوظ کرتے ہیں، اس کے استعمال کو محدود کرتے ہیں، اشاعت سے پہلے جائزہ لیتے ہیں، اور ضرورت ختم ہونے پر حذف کرتے ہیں۔',
    ),
    showNotice: true,
    showPrinciples: true,
    sections: [
      { id: 'collection', heading: L('What we collect', 'ہم کیا جمع کرتے ہیں'), body: [
        L('Every collection has an approved purpose. If there is no valid purpose, we do not collect. We prefer anonymous and aggregate records and never require national identity data such as CNIC or B-Form.', 'ہر جمع آوری کا ایک منظور شدہ مقصد ہوتا ہے۔ اگر کوئی درست مقصد نہ ہو تو ہم جمع نہیں کرتے۔ ہم گمنام اور مجموعی ریکارڈز کو ترجیح دیتے ہیں اور کبھی CNIC یا B-Form جیسے قومی شناختی ڈیٹا کا تقاضا نہیں کرتے۔'),
      ] },
      { id: 'calculator', heading: L('Calculator privacy', 'کیلکولیٹر رازداری'), body: [
        L('The genetic calculators are educational and transient. Your inputs and results are not saved, not used for research, and never become a medical or genetic record. We do not store parent status, family relationship, or calculated risk.', 'جینیاتی کیلکولیٹر تعلیمی اور عارضی ہیں۔ آپ کے ان پٹ اور نتائج محفوظ نہیں کیے جاتے، تحقیق کے لیے استعمال نہیں ہوتے، اور کبھی طبی یا جینیاتی ریکارڈ نہیں بنتے۔ ہم والدین کی حالت، خاندانی رشتہ، یا حساب شدہ خطرہ محفوظ نہیں کرتے۔'),
      ] },
      { id: 'survey', heading: L('Survey privacy', 'سروے رازداری'), body: [
        L('Survey research is anonymous and aggregate. We prefer age ranges over exact dates of birth, avoid precise addresses, and never use full IP addresses as research variables or secretly fingerprint participants.', 'سروے تحقیق گمنام اور مجموعی ہے۔ ہم پیدائش کی درست تاریخوں کے بجائے عمر کی حدود کو ترجیح دیتے ہیں، درست پتوں سے گریز کرتے ہیں، اور کبھی مکمل IP پتے تحقیقی متغیر کے طور پر استعمال نہیں کرتے یا خفیہ طور پر شرکاء کی شناخت نہیں کرتے۔'),
      ] },
      { id: 'fieldwork', heading: L('Fieldwork & assessment data', 'فیلڈ ورک اور تشخیص ڈیٹا'), body: [
        L('Attendance is kept separate from assessments and sensitive data. Training assessments are anonymous and aggregate; where a before/after comparison is needed we use pseudonymous codes that carry no personal information.', 'حاضری کو تشخیص اور حساس ڈیٹا سے الگ رکھا جاتا ہے۔ تربیتی تشخیص گمنام اور مجموعی ہیں؛ جہاں قبل/بعد موازنہ درکار ہو وہاں ہم فرضی کوڈ استعمال کرتے ہیں جو کوئی ذاتی معلومات نہیں رکھتے۔'),
      ] },
      { id: 'audio', heading: L('Audio stories', 'آڈیو کہانیاں'), body: [
        L('Audio perspectives are published only with specific consent. Taking part in an interview does not by itself authorise recording, voice publication, name publication, transcript publication, or translation (each is a separate choice.', 'آڈیو تناظرات صرف مخصوص رضامندی کے ساتھ شائع کیے جاتے ہیں۔ انٹرویو میں شرکت خود بخود ریکارڈنگ، آواز کی اشاعت، نام کی اشاعت، ٹرانسکرپٹ کی اشاعت، یا ترجمے کی اجازت نہیں دیتی) ہر ایک الگ انتخاب ہے۔'),
      ] },
      { id: 'analytics', heading: L('Analytics', 'تجزیات'), body: [
        L('Analytics are aggregate and privacy-minimized (for example, that a page or calculator was opened. We never infer disease status, carrier status, genetic risk, pregnancy status, or political or advocacy beliefs from your use of the site.', 'تجزیات مجموعی اور رازداری کے لحاظ سے محدود ہیں) مثلاً یہ کہ کوئی صفحہ یا کیلکولیٹر کھولا گیا۔ ہم آپ کے سائٹ کے استعمال سے کبھی مرض کی حالت، کیریئر حیثیت، جینیاتی خطرہ، حمل کی حالت، یا سیاسی و وکالت کے عقائد کا اندازہ نہیں لگاتے۔'),
      ] },
      { id: 'retention', heading: L('Retention & deletion', 'برقراری اور حذف'), body: [
        L('We keep data only while its purpose is active. When the purpose ends, retention is reviewed and data is deleted or anonymized. "May be useful later" is not a reason to keep data, and hiding a row is not deletion.', 'ہم ڈیٹا صرف اُس وقت تک رکھتے ہیں جب تک اس کا مقصد فعال ہو۔ مقصد ختم ہونے پر برقراری کا جائزہ لیا جاتا ہے اور ڈیٹا حذف یا گمنام کیا جاتا ہے۔ "شاید بعد میں مفید ہو" ڈیٹا رکھنے کی وجہ نہیں، اور قطار چھپانا حذف نہیں۔'),
      ] },
    ],
  },
  {
    id: 'research-ethics',
    kicker: L('Research ethics', 'تحقیقی اخلاقیات'),
    title: L('Research ethics', 'تحقیقی اخلاقیات'),
    subtitle: L('Consent, voluntary participation, and protecting people who take part.', 'رضامندی، رضاکارانہ شرکت، اور شریک ہونے والوں کا تحفظ۔'),
    intro: L(
      'Taking part in Shared Blood research is always voluntary and informed. Consent is specific to each purpose, vulnerable people receive extra protection, and no activity is treated as ethically approved without human review.',
      'شیئرڈ بلڈ تحقیق میں شرکت ہمیشہ رضاکارانہ اور باخبر ہوتی ہے۔ رضامندی ہر مقصد کے لیے مخصوص ہوتی ہے، کمزور افراد کو اضافی تحفظ ملتا ہے، اور کوئی سرگرمی انسانی جائزے کے بغیر اخلاقی طور پر منظور شدہ نہیں سمجھی جاتی۔',
    ),
    showNotice: true,
    showPrinciples: false,
    sections: [
      { id: 'consent', heading: L('Consent', 'رضامندی'), body: [
        L('We use purpose-specific consent, not one universal checkbox. Consent explains the purpose, what is collected, any recording, how information is used and published, retention, that participation is voluntary, and how to withdraw. Historical consent records are never overwritten when wording changes.', 'ہم مقصد کے لیے مخصوص رضامندی استعمال کرتے ہیں، کوئی ایک عالمگیر چیک باکس نہیں۔ رضامندی مقصد، کیا جمع کیا جاتا ہے، کوئی ریکارڈنگ، معلومات کا استعمال اور اشاعت، برقراری، شرکت کی رضاکارانہ نوعیت، اور دستبرداری کا طریقہ بیان کرتی ہے۔ الفاظ بدلنے پر تاریخی رضامندی ریکارڈز کبھی حذف نہیں کیے جاتے۔'),
      ] },
      { id: 'voluntary', heading: L('Voluntary participation', 'رضاکارانہ شرکت'), body: [
        L('Participation, recording, public publication, and research follow-up are separate choices (they are never bundled into a single required decision.', 'شرکت، ریکارڈنگ، عوامی اشاعت، اور تحقیقی فالو اپ الگ الگ انتخاب ہیں) انہیں کبھی ایک لازمی فیصلے میں یکجا نہیں کیا جاتا۔'),
      ] },
      { id: 'withdrawal', heading: L('Withdrawal', 'دستبرداری'), body: [
        L('You can withdraw identifiable data. We explain clearly that information already combined into an anonymous published statistic may not be individually removable, and we never promise removal where that is not technically possible.', 'آپ قابلِ شناخت ڈیٹا واپس لے سکتے ہیں۔ ہم واضح طور پر بتاتے ہیں کہ جو معلومات پہلے ہی کسی گمنام شائع شدہ اعداد و شمار میں شامل ہو چکی ہوں وہ انفرادی طور پر نکالی نہیں جا سکتیں، اور ہم کبھی ایسا وعدہ نہیں کرتے جو تکنیکی طور پر ممکن نہ ہو۔'),
      ] },
      { id: 'vulnerable', heading: L('Children & vulnerable populations', 'بچے اور کمزور آبادیاں'), body: [
        L('Children and infants are vulnerable and receive heightened review. Our learning booklet educates childcare workers about signs to notice and escalate (it never creates child health profiles, infant risk records, or orphanage child databases. Institutional permission does not replace ethical review.', 'بچے اور شیرخوار کمزور ہیں اور اضافی جائزہ حاصل کرتے ہیں۔ ہمارا تعلیمی کتابچہ نگہداشتِ اطفال کارکنوں کو ایسی علامات کے بارے میں تعلیم دیتا ہے جنہیں محسوس کر کے آگے بڑھایا جائے) یہ کبھی بچوں کے صحت پروفائل، شیرخوار خطرہ ریکارڈ، یا یتیم خانہ بچہ ڈیٹابیس نہیں بناتا۔ ادارہ جاتی اجازت اخلاقی جائزے کا متبادل نہیں۔'),
      ] },
      { id: 'third-party', heading: L('Third-party information', 'فریقِ ثالث معلومات'), body: [
        L('A speaker\'s consent does not authorise publishing identifiable information about family members, patients, children, colleagues, or institutions. Patient anecdotes are personal perspectives, not clinical records, diagnoses, or prevalence evidence.', 'کسی مقرر کی رضامندی خاندان کے افراد، مریضوں، بچوں، ساتھیوں، یا اداروں کے بارے میں قابلِ شناخت معلومات شائع کرنے کی اجازت نہیں دیتی۔ مریضوں کے تجربات ذاتی تناظرات ہیں، طبی ریکارڈ، تشخیص، یا پھیلاؤ کے شواہد نہیں۔'),
      ] },
      { id: 'human-review', heading: L('Human review', 'انسانی جائزہ'), body: [
        L('Ethics decisions are made by people, not by software. The website never automatically decides that an activity is ethically approved, safe to publish, or legally sufficient. Scientific review and ethics review are separate.', 'اخلاقی فیصلے لوگ کرتے ہیں، سافٹ ویئر نہیں۔ ویب سائٹ کبھی خود بخود یہ فیصلہ نہیں کرتی کہ کوئی سرگرمی اخلاقی طور پر منظور، اشاعت کے لیے محفوظ، یا قانونی طور پر کافی ہے۔ سائنسی جائزہ اور اخلاقی جائزہ الگ ہیں۔'),
      ] },
    ],
  },
  {
    id: 'research-governance',
    kicker: L('Research governance', 'تحقیقی نگرانی'),
    title: L('Research governance', 'تحقیقی نگرانی'),
    subtitle: L('How findings are reviewed before publication, and what we will not claim.', 'اشاعت سے پہلے نتائج کا جائزہ کیسے لیا جاتا ہے، اور ہم کیا دعویٰ نہیں کریں گے۔'),
    intro: L(
      'Before any research finding or advocacy position is published, it passes required review gates. Permission to display is never enough on its own, and we do not publish unsupported claims about lives, disease, or policy.',
      'کسی بھی تحقیقی نتیجے یا وکالت مؤقف کی اشاعت سے پہلے، یہ مطلوبہ جائزہ مراحل سے گزرتا ہے۔ صرف نمائش کی اجازت بذاتِ خود کبھی کافی نہیں، اور ہم زندگی، مرض، یا پالیسی کے بارے میں غیر تائید یافتہ دعوے شائع نہیں کرتے۔',
    ),
    showNotice: true,
    showPrinciples: false,
    sections: [
      { id: 'publication-review', heading: L('Publication review', 'اشاعت جائزہ'), body: [
        L('Public findings pass evidence, methodology, limitation, ethics, and public-claim review before they can be served to your browser. Being marked "displayable" is not sufficient (every required gate must be satisfied first.', 'عوامی نتائج آپ کے براؤزر تک پہنچنے سے پہلے شواہد، طریقہ کار، حدود، اخلاقیات، اور عوامی دعوے کے جائزے سے گزرتے ہیں۔ صرف "قابلِ نمائش" ہونا کافی نہیں) پہلے ہر مطلوبہ مرحلہ پورا ہونا چاہیے۔'),
      ] },
      { id: 'public-claims', heading: L('Public claims', 'عوامی دعوے'), body: [
        L('We do not claim that Shared Blood saved lives, prevented misdiagnosis, reduced disease burden, prevented genetic disorders, reduced consanguinity, improved national awareness, changed government policy, diagnosed patients, or mapped genetic risk across Pakistan.', 'ہم یہ دعویٰ نہیں کرتے کہ شیئرڈ بلڈ نے زندگیاں بچائیں، غلط تشخیص روکی، مرض کا بوجھ کم کیا، جینیاتی امراض روکے، رشتہ داری کم کی، قومی آگاہی بہتر کی، سرکاری پالیسی بدلی، مریضوں کی تشخیص کی، یا پاکستان بھر جینیاتی خطرے کا نقشہ بنایا۔'),
      ] },
      { id: 'non-stigmatization', heading: L('No stigma or genetic scoring', 'کوئی بدنامی یا جینیاتی اسکورنگ نہیں'), body: [
        L('We never describe people as genetically inferior, promote genetic purity or eugenics, blame families or culture for disease, or build genetic scores or stigma maps. We do not tell anyone whether or whom to marry, or whether to have children.', 'ہم کبھی لوگوں کو جینیاتی طور پر کمتر نہیں کہتے، جینیاتی خالصیت یا نسل پرستی کو فروغ نہیں دیتے، مرض کے لیے خاندانوں یا ثقافت کو مورد الزام نہیں ٹھہراتے، اور نہ ہی جینیاتی اسکور یا بدنامی کے نقشے بناتے ہیں۔ ہم کسی کو نہیں بتاتے کہ شادی کرے یا کس سے، یا بچے پیدا کرے یا نہیں۔'),
      ] },
      { id: 'access', heading: L('Access control', 'رسائی کنٹرول'), body: [
        L('Access follows least privilege: each role can only see and act on data up to a defined sensitivity. Only approved public records reach the public website; private data is never sent to the browser and hidden.', 'رسائی کم سے کم اختیار پر مبنی ہے: ہر کردار صرف متعینہ حساسیت تک ڈیٹا دیکھ اور اس پر عمل کر سکتا ہے۔ صرف منظور شدہ عوامی ریکارڈز عوامی ویب سائٹ تک پہنچتے ہیں؛ نجی ڈیٹا کبھی براؤزر کو بھیج کر چھپایا نہیں جاتا۔'),
      ] },
      { id: 'incidents', heading: L('Incidents & change', 'واقعات اور تبدیلی'), body: [
        L('If a governance issue occurs, we restrict access, assess scope, stop affected publication if needed, document it, correct it, and review what failed. Governance is versioned; material changes to purpose, data use, consent, or publication are recorded and may require re-consent.', 'اگر کوئی نگرانی کا مسئلہ پیش آئے، ہم رسائی محدود کرتے ہیں، دائرہ جانچتے ہیں، ضرورت پر متاثرہ اشاعت روکتے ہیں، اسے دستاویز کرتے ہیں، درست کرتے ہیں، اور ناکامی کا جائزہ لیتے ہیں۔ نگرانی ورژن شدہ ہے؛ مقصد، ڈیٹا کے استعمال، رضامندی، یا اشاعت میں اہم تبدیلیاں ریکارڈ کی جاتی ہیں اور دوبارہ رضامندی طلب کر سکتی ہیں۔'),
      ] },
    ],
  },
];

export function getGovernancePage(id: string): GovernancePageContent | null {
  return GOVERNANCE_PAGES.find((p) => p.id === id) ?? null;
}
