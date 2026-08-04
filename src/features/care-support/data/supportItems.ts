import type { LocalizedText } from '@/types';
import type { SupportItemRecord } from '../types';

/**
 * Generic support items / helpful adaptations (spec §17–§24).
 *
 * CRITICAL (spec §20): GENERIC item types only — no brand names, retailer or
 * affiliate links, prices, ratings, or product listings. Shared Blood is not a
 * medical-product marketplace (spec §20/§53/§63). The module explains that such
 * supports EXIST; it never prescribes a device or implies universal benefit
 * (spec §23/§24). Every item involving a medical or therapeutic use carries a
 * valid reference (spec §64) and a required, text-based safety notice (spec §70).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const SUPPORT_ITEMS: readonly SupportItemRecord[] = [
  {
    id: 'medical-document-folder',
    name: L('Medical document folder', 'طبی دستاویزات کا فولڈر'),
    genericName: L('Document organiser', 'دستاویز منظم کرنے والا فولڈر'),
    description: L(
      'A simple folder, file, or notebook used to keep a child’s health documents together in one place.',
      'ایک سادہ فولڈر، فائل یا نوٹ بک جو بچے کی صحت کی دستاویزات کو ایک جگہ اکٹھا رکھنے کے لیے استعمال ہوتی ہے۔',
    ),
    supportCategory: 'ORGANIZATION',
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['CAREGIVER_PREPARATION', 'APPOINTMENT_PREPARATION', 'MEDICAL_ROUTINE_AWARENESS'],
    ageContexts: ['GENERAL_CHILDHOOD'],
    potentialUse: L(
      'May help keep diagnosis letters, test reports, medicine lists, and appointment notes organised and easy to bring to visits. Any secure system (a folder, envelope, or notebook) can achieve this.',
      'تشخیصی خطوط، ٹیسٹ رپورٹس، ادویات کی فہرست اور ملاقات کے نوٹس کو منظم رکھنے اور ملاقاتوں میں لانے میں مدد دے سکتا ہے۔ کوئی بھی محفوظ نظام (فولڈر، لفافہ یا نوٹ بک) یہ کام کر سکتا ہے۔',
    ),
    professionalGuidanceRequired: false,
    medicalDeviceStatus: 'NON_MEDICAL_SUPPORT_ITEM',
    purchaseGuidance: L(
      'No special purchase is needed. Any low-cost folder or notebook already at home is enough.',
      'کسی خاص خریداری کی ضرورت نہیں۔ گھر میں موجود کوئی بھی کم قیمت فولڈر یا نوٹ بک کافی ہے۔',
    ),
    safetyNotice: L(
      'Keep health documents in a safe, private place. Shared Blood does not store or upload any documents.',
      'صحت کی دستاویزات کو محفوظ اور نجی جگہ پر رکھیں۔ شیئرڈ بلڈ کوئی دستاویز محفوظ یا اپ لوڈ نہیں کرتا۔',
    ),
    referenceIds: [],
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'medication-organizer',
    name: L('Medication organiser', 'ادویات منظم کرنے والا ڈبہ'),
    genericName: L('Pill / medicine organiser', 'گولیوں / دواؤں کا آرگنائزر'),
    description: L(
      'A box or container with sections used to help keep track of routine medicines.',
      'خانوں والا ایک ڈبہ یا کنٹینر جو روزمرہ کی ادویات کا حساب رکھنے میں مدد کے لیے استعمال ہوتا ہے۔',
    ),
    supportCategory: 'ORGANIZATION',
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['MEDICAL_ROUTINE_AWARENESS', 'CAREGIVER_PREPARATION', 'DAILY_ROUTINE'],
    ageContexts: ['GENERAL_CHILDHOOD'],
    potentialUse: L(
      'May help some families keep track of a routine that has been prescribed by a doctor. It is general organisational support only.',
      'کچھ خاندانوں کو ڈاکٹر کی تجویز کردہ روٹین کا حساب رکھنے میں مدد دے سکتا ہے۔ یہ صرف عمومی تنظیمی معاونت ہے۔',
    ),
    professionalGuidanceRequired: false,
    medicalDeviceStatus: 'NON_MEDICAL_SUPPORT_ITEM',
    purchaseGuidance: L(
      'A simple labelled box can serve the same purpose. No specific product is required.',
      'ایک سادہ لیبل والا ڈبہ بھی یہی مقصد پورا کر سکتا ہے۔ کسی مخصوص پروڈکٹ کی ضرورت نہیں۔',
    ),
    safetyNotice: L(
      'Not every medicine belongs in an organiser, some require specific storage. Always follow each medicine’s own instructions, keep medicines out of children’s reach, and never change doses or timing without a doctor.',
      'ہر دوا آرگنائزر کے لیے موزوں نہیں، کچھ کو مخصوص طریقے سے رکھنا ضروری ہے۔ ہمیشہ ہر دوا کی اپنی ہدایات پر عمل کریں، ادویات بچوں کی پہنچ سے دور رکھیں، اور ڈاکٹر کے بغیر خوراک یا وقت کبھی تبدیل نہ کریں۔',
    ),
    referenceIds: [],
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'mobility-aid',
    name: L('Mobility aid', 'حرکت میں معاون آلہ'),
    genericName: L('Mobility support equipment', 'نقل و حرکت کے معاون آلات'),
    description: L(
      'A general category of equipment (such as a walking aid or wheelchair) that some people use to move around more comfortably.',
      'آلات کی ایک عمومی قسم (جیسے چلنے میں معاون آلہ یا وہیل چیئر) جسے کچھ افراد زیادہ آرام سے حرکت کے لیے استعمال کرتے ہیں۔',
    ),
    supportCategory: 'MOBILITY',
    relatedDiseaseIds: ['lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['MOVEMENT_SUPPORT', 'ACCESSIBILITY', 'DAILY_ROUTINE'],
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    potentialUse: L(
      'Some children with significant mobility difficulty may benefit from a mobility aid following individual assessment. Needs vary widely and change over time; this is never automatic.',
      'حرکت میں نمایاں دشواری والے کچھ بچے انفرادی جائزے کے بعد کسی معاون آلے سے فائدہ اٹھا سکتے ہیں۔ ضروریات بہت مختلف ہوتی اور وقت کے ساتھ بدلتی ہیں؛ یہ کبھی خودکار نہیں ہوتا۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_ASSESSMENT_REQUIRED',
    purchaseGuidance: L(
      'If a mobility aid has been recommended, ask the relevant professional about the right type, size, and fit for the individual child.',
      'اگر کوئی معاون آلہ تجویز کیا گیا ہو تو متعلقہ پیشہ ور سے انفرادی بچے کے لیے درست قسم، سائز اور فٹنگ کے بارے میں پوچھیں۔',
    ),
    safetyNotice: L(
      'The right equipment, size, and fitting are decided by a qualified professional, not by a disease label. The wrong aid can cause harm.',
      'درست آلہ، سائز اور فٹنگ کا فیصلہ کسی مستند پیشہ ور کے ذریعے ہوتا ہے، بیماری کے لیبل سے نہیں۔ غلط آلہ نقصان پہنچا سکتا ہے۔',
    ),
    referenceIds: ['who-assistive-technology'],
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'joint-support-device',
    name: L('Joint support device', 'جوڑوں کے لیے معاون آلہ'),
    genericName: L('Brace / splint / supportive garment', 'بریس / سپلنٹ / معاون لباس'),
    description: L(
      'A general category of supports (such as a brace, splint, or supportive garment) sometimes used for joint instability.',
      'معاون آلات کی ایک عمومی قسم (جیسے بریس، سپلنٹ یا معاون لباس) جو کبھی کبھی جوڑوں کی عدم استحکام کے لیے استعمال ہوتی ہے۔',
    ),
    supportCategory: 'JOINT_SUPPORT',
    relatedDiseaseIds: ['ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['JOINT_SUPPORT', 'MOVEMENT_SUPPORT'],
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    potentialUse: L(
      'Some people with joint instability may use supportive equipment following an individual assessment. This is not automatically helpful for everyone with a joint-hypermobility label, and is not needed by every child.',
      'جوڑوں کی عدم استحکام والے کچھ افراد انفرادی جائزے کے بعد معاون آلہ استعمال کر سکتے ہیں۔ یہ جوڑوں کی لچک کے لیبل والے ہر فرد کے لیے خودبخود مفید نہیں، اور ہر بچے کو اس کی ضرورت نہیں۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_ASSESSMENT_REQUIRED',
    purchaseGuidance: L(
      'If a support has been recommended, ask the treating professional about type, fit, and how and when to use it.',
      'اگر کوئی معاون آلہ تجویز کیا گیا ہو تو علاج کرنے والے پیشہ ور سے قسم، فٹنگ، اور اسے کیسے اور کب استعمال کرنا ہے، پوچھیں۔',
    ),
    safetyNotice: L(
      'Braces and splints are not automatically recommended based on a diagnosis. Using the wrong support, or using it incorrectly, can weaken joints or cause harm. Selection is a professional decision.',
      'بریس اور سپلنٹ کسی تشخیص کی بنیاد پر خودبخود تجویز نہیں کیے جاتے۔ غلط معاون آلہ، یا اسے غلط طریقے سے استعمال کرنا، جوڑوں کو کمزور یا نقصان پہنچا سکتا ہے۔ انتخاب ایک پیشہ ورانہ فیصلہ ہے۔',
    ),
    referenceIds: ['eds-society-management'],
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'supportive-seating',
    name: L('Supportive seating', 'معاون نشست'),
    genericName: L('Postural / supportive seating', 'جسمانی وضع کے لیے معاون نشست'),
    description: L(
      'A general category of seating designed to give a child extra support while sitting.',
      'نشستوں کی ایک عمومی قسم جو بچے کو بیٹھتے وقت اضافی سہارا دینے کے لیے بنائی جاتی ہے۔',
    ),
    supportCategory: 'POSITIONING',
    relatedDiseaseIds: ['lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['MOVEMENT_SUPPORT', 'DEVELOPMENT_SUPPORT', 'ACCESSIBILITY'],
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    potentialUse: L(
      'Some children who find sitting difficult may benefit from supportive seating following assessment, which may help with comfort, feeding, or play.',
      'بیٹھنے میں دشواری محسوس کرنے والے کچھ بچے جائزے کے بعد معاون نشست سے فائدہ اٹھا سکتے ہیں، جو آرام، کھانے یا کھیل میں مدد دے سکتی ہے۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_GUIDANCE_RECOMMENDED',
    purchaseGuidance: L(
      'If seating support has been suggested, ask the relevant professional about the type and adjustments suited to the individual child.',
      'اگر معاون نشست تجویز کی گئی ہو تو متعلقہ پیشہ ور سے انفرادی بچے کے لیے موزوں قسم اور تبدیلیوں کے بارے میں پوچھیں۔',
    ),
    safetyNotice: L(
      'Positioning support should be selected with guidance from an appropriate professional. Never leave a young child unsupervised in specialised seating.',
      'وضع سے متعلق معاونت کا انتخاب کسی مناسب پیشہ ور کی رہنمائی میں ہونا چاہیے۔ چھوٹے بچے کو مخصوص نشست میں کبھی بغیر نگرانی نہ چھوڑیں۔',
    ),
    referenceIds: ['who-assistive-technology'],
    displayOrder: 5,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'feeding-support-equipment',
    name: L('Feeding support equipment', 'کھانے میں معاون سامان'),
    genericName: L('Adaptive feeding equipment', 'موافق کھانے کا سامان'),
    description: L(
      'A general category of adapted cups, utensils, or feeding equipment sometimes used to make feeding easier.',
      'موافق کپ، برتن یا کھانے کے سامان کی ایک عمومی قسم جو کبھی کبھی کھانا آسان بنانے کے لیے استعمال ہوتی ہے۔',
    ),
    supportCategory: 'FEEDING',
    relatedDiseaseIds: ['cystic-fibrosis', 'lysosomal-storage-disorders'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['FEEDING_SUPPORT', 'NUTRITION_AWARENESS', 'DAILY_ROUTINE'],
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    potentialUse: L(
      'Some children with feeding difficulty may benefit from adapted feeding equipment. Significant feeding difficulty should always be assessed by a professional.',
      'کھانے میں دشواری والے کچھ بچے موافق سامان سے فائدہ اٹھا سکتے ہیں۔ کھانے کی نمایاں دشواری کا ہمیشہ کسی پیشہ ور سے جائزہ لینا چاہیے۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_GUIDANCE_RECOMMENDED',
    purchaseGuidance: L(
      'If feeding equipment has been suggested, ask a dietitian or the care team about suitable options for the individual child.',
      'اگر کھانے کا سامان تجویز کیا گیا ہو تو کسی ماہرِ غذائیت یا نگہداشت ٹیم سے انفرادی بچے کے لیے موزوں اختیارات کے بارے میں پوچھیں۔',
    ),
    safetyNotice: L(
      'This equipment does not replace medical advice about feeding. Choking and feeding difficulties need professional assessment; follow any feeding plan given by the care team.',
      'یہ سامان کھانے سے متعلق طبی مشورے کا متبادل نہیں۔ گلے میں پھنسنے اور کھانے کی دشواریوں کا پیشہ ورانہ جائزہ ضروری ہے؛ نگہداشت ٹیم کے دیے گئے کسی بھی فیڈنگ پلان پر عمل کریں۔',
    ),
    referenceIds: ['cff-nutrition'],
    displayOrder: 6,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'respiratory-support-equipment',
    name: L('Respiratory support equipment', 'تنفسی معاونت کا سامان'),
    genericName: L('Airway / breathing support equipment', 'ہوا کی نالی / سانس کی معاونت کا سامان'),
    description: L(
      'A general category of equipment used in some respiratory care routines. It exists, but its selection, settings, and use are entirely clinical matters.',
      'کچھ تنفسی نگہداشت کے معمولات میں استعمال ہونے والے سامان کی ایک عمومی قسم۔ یہ موجود ہے، مگر اس کا انتخاب، سیٹنگز اور استعمال مکمل طور پر طبی معاملات ہیں۔',
    ),
    supportCategory: 'RESPIRATORY',
    relatedDiseaseIds: ['cystic-fibrosis'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['RESPIRATORY_SUPPORT', 'MEDICAL_ROUTINE_AWARENESS'],
    ageContexts: ['GENERAL_CHILDHOOD'],
    potentialUse: L(
      'Respiratory care can involve specialised equipment for some children. Any device, its settings, cleaning, and how often it is used are decided and taught by the care team, not by this website.',
      'کچھ بچوں کی تنفسی نگہداشت میں مخصوص سامان شامل ہو سکتا ہے۔ کوئی بھی آلہ، اس کی سیٹنگز، صفائی، اور اسے کتنی بار استعمال کرنا ہے، اس کا فیصلہ اور تربیت نگہداشت ٹیم دیتی ہے، یہ ویب سائٹ نہیں۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_ASSESSMENT_REQUIRED',
    purchaseGuidance: L(
      'Do not buy or set up respiratory equipment on your own. Follow the specific instructions and training provided by the treating team.',
      'تنفسی سامان خود مت خریدیں یا نہ لگائیں۔ علاج کرنے والی ٹیم کی دی گئی مخصوص ہدایات اور تربیت پر عمل کریں۔',
    ),
    safetyNotice: L(
      'Shared Blood does not provide device settings, medication instructions, cleaning protocols, or treatment frequencies. These are prescribed and taught only by the care team.',
      'شیئرڈ بلڈ آلے کی سیٹنگز، ادویات کی ہدایات، صفائی کے طریقے، یا علاج کی تعداد فراہم نہیں کرتا۔ یہ صرف نگہداشت ٹیم تجویز اور سکھاتی ہے۔',
    ),
    referenceIds: ['cff-daily-care'],
    displayOrder: 7,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'communication-support-aid',
    name: L('Communication support aid', 'رابطے میں معاون آلہ'),
    genericName: L('Communication / learning aid', 'رابطہ / سیکھنے کا معاون آلہ'),
    description: L(
      'A general category of picture boards, simple devices, or other tools that some children use to help with communication.',
      'تصویری بورڈز، سادہ آلات، یا دیگر اوزاروں کی ایک عمومی قسم جسے کچھ بچے رابطے میں مدد کے لیے استعمال کرتے ہیں۔',
    ),
    supportCategory: 'ACCESSIBILITY',
    relatedDiseaseIds: ['lysosomal-storage-disorders'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['DEVELOPMENT_SUPPORT', 'LEARNING_SUPPORT', 'SOCIAL_SUPPORT'],
    ageContexts: ['TODDLER', 'YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    potentialUse: L(
      'Some children who find communication difficult may benefit from communication supports, chosen with a relevant professional to match the individual child.',
      'رابطے میں دشواری محسوس کرنے والے کچھ بچے رابطے کے معاون آلات سے فائدہ اٹھا سکتے ہیں، جو انفرادی بچے کے مطابق کسی متعلقہ پیشہ ور کے ساتھ منتخب کیے جائیں۔',
    ),
    professionalGuidanceRequired: true,
    medicalDeviceStatus: 'PROFESSIONAL_GUIDANCE_RECOMMENDED',
    purchaseGuidance: L(
      'Ask the relevant professional which approach suits the individual child before investing in any particular tool.',
      'کسی خاص آلے پر خرچ کرنے سے پہلے متعلقہ پیشہ ور سے پوچھیں کہ انفرادی بچے کے لیے کون سا طریقہ موزوں ہے۔',
    ),
    safetyNotice: L(
      'Communication support should be selected with guidance from an appropriate professional so it matches the child’s needs.',
      'رابطے کی معاونت کا انتخاب کسی مناسب پیشہ ور کی رہنمائی میں ہونا چاہیے تاکہ یہ بچے کی ضروریات سے مطابقت رکھے۔',
    ),
    referenceIds: ['who-assistive-technology'],
    displayOrder: 8,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'school-accessibility-adaptation',
    name: L('School accessibility adaptation', 'اسکول میں رسائی کی سہولت'),
    genericName: L('School environment adaptation', 'اسکول کے ماحول میں تبدیلی'),
    description: L(
      'General, low-cost adjustments a school may make (such as rest breaks, a seat near the front, or extra time) to help a child take part.',
      'عمومی، کم لاگت تبدیلیاں جو اسکول کر سکتا ہے (جیسے آرام کے وقفے، آگے کی نشست، یا اضافی وقت) تاکہ بچہ شرکت کر سکے۔',
    ),
    supportCategory: 'SCHOOL_ADAPTATION',
    relatedDiseaseIds: ['beta-thalassemia', 'cystic-fibrosis', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['SCHOOL_SUPPORT', 'ACCESSIBILITY', 'ENERGY_MANAGEMENT'],
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    potentialUse: L(
      'May help a child stay included at school around fatigue, appointments, or movement needs. Families share only the information they choose, according to circumstances.',
      'تھکن، ملاقاتوں یا حرکت کی ضروریات کے باوجود بچے کو اسکول میں شامل رکھنے میں مدد دے سکتی ہے۔ خاندان حالات کے مطابق صرف وہی معلومات بانٹتے ہیں جو وہ چاہیں۔',
    ),
    professionalGuidanceRequired: false,
    medicalDeviceStatus: 'NON_MEDICAL_SUPPORT_ITEM',
    purchaseGuidance: L(
      'Most adaptations cost little or nothing and are arranged in conversation with the school.',
      'زیادہ تر سہولتوں پر بہت کم یا کوئی خرچ نہیں آتا اور یہ اسکول سے بات چیت میں طے ہوتی ہیں۔',
    ),
    safetyNotice: L(
      'Share only the care information you choose with appropriate school staff. There is no need to disclose a child’s diagnosis to the whole school.',
      'مناسب اسکول عملے کے ساتھ صرف وہی نگہداشت معلومات بانٹیں جو آپ چاہیں۔ بچے کی تشخیص پورے اسکول کو بتانے کی ضرورت نہیں۔',
    ),
    referenceIds: [],
    displayOrder: 9,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'rest-and-comfort-aid',
    name: L('Rest and comfort aid', 'آرام اور سکون کا معاون سامان'),
    genericName: L('Comfort / rest support', 'سکون / آرام کی معاونت'),
    description: L(
      'Everyday items (such as cushions or a comfortable resting setup) that may help a child rest during a tiring routine.',
      'روزمرہ کی اشیاء (جیسے کشن یا آرام دہ جگہ) جو تھکا دینے والے معمول کے دوران بچے کو آرام میں مدد دے سکتی ہیں۔',
    ),
    supportCategory: 'COMFORT',
    relatedDiseaseIds: ['beta-thalassemia', 'lysosomal-storage-disorders', 'ehlers-danlos-syndrome'],
    relatedDiseaseSubtypeIds: [],
    relatedCareDomains: ['ENERGY_MANAGEMENT', 'SLEEP_SUPPORT', 'DAILY_ROUTINE'],
    ageContexts: ['GENERAL_CHILDHOOD'],
    potentialUse: L(
      'May help some children rest and pace their energy across the day. Ordinary household items usually work well.',
      'کچھ بچوں کو دن بھر آرام کرنے اور اپنی توانائی کو متوازن رکھنے میں مدد دے سکتی ہیں۔ عام گھریلو اشیاء عموماً اچھی طرح کام کرتی ہیں۔',
    ),
    professionalGuidanceRequired: false,
    medicalDeviceStatus: 'NON_MEDICAL_SUPPORT_ITEM',
    purchaseGuidance: L(
      'No special purchase is needed; items already at home are usually enough.',
      'کسی خاص خریداری کی ضرورت نہیں؛ گھر میں موجود اشیاء عموماً کافی ہوتی ہیں۔',
    ),
    safetyNotice: L(
      'Persistent tiredness that worries you should be discussed with a healthcare professional rather than managed with rest alone.',
      'مسلسل تھکن جو آپ کو پریشان کرے، اسے صرف آرام سے سنبھالنے کے بجائے کسی صحت کے پیشہ ور سے بات کرنی چاہیے۔',
    ),
    referenceIds: [],
    displayOrder: 10,
    lastReviewed: '2026-07-01',
  },
];

export function getSupportItem(id: string): SupportItemRecord | null {
  return SUPPORT_ITEMS.find((item) => item.id === id) ?? null;
}
