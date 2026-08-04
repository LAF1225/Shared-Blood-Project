import type { LocalizedText } from '@/types';
import type { CareSupportRecord } from '../../types';

/**
 * Ehlers-Danlos syndrome care & support records (spec §24/§32/§33).
 *
 * BOUNDARIES: do NOT automatically recommend braces, splints, compression
 * garments, or mobility aids based only on an EDS label — some people with joint
 * instability may use supportive equipment following individual assessment, with
 * no implied universal benefit (spec §24). Play and participation are supported
 * with pacing rather than disease-wide activity bans, and the module never clears
 * or bans a child for activity (spec §32/§33).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const EHLERS_DANLOS_SYNDROME_CARE: readonly CareSupportRecord[] = [
  {
    id: 'eds-joint-support-awareness',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Joint support awareness', 'جوڑوں کی معاونت سے آگاہی'),
    shortDescription: L(
      'Some people with joint instability may use supportive equipment following individual assessment; it is not automatic.',
      'جوڑوں کی عدم استحکام والے کچھ افراد انفرادی جائزے کے بعد معاون آلہ استعمال کر سکتے ہیں، یہ خودبخود نہیں ہوتا۔',
    ),
    careDomain: 'JOINT_SUPPORT',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'EVERYDAY_SUPPORT',
    whyItMayMatter: L(
      'Joint support is highly individual. Some children benefit from certain supports after assessment, while many need none. A diagnosis alone does not mean a child needs a brace or device.',
      'جوڑوں کی معاونت انتہائی انفرادی ہوتی ہے۔ کچھ بچے جائزے کے بعد بعض معاون آلات سے فائدہ اٹھاتے ہیں، جبکہ بہت سوں کو کسی کی ضرورت نہیں ہوتی۔ صرف تشخیص کا مطلب یہ نہیں کہ بچے کو بریس یا آلے کی ضرورت ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Supports such as braces, splints, or compression garments are never recommended on the basis of an EDS label alone; they are chosen only after individual assessment.',
        'بریس، سپلنٹ یا کمپریشن لباس جیسی معاونتیں کبھی صرف EDS کے لیبل کی بنیاد پر تجویز نہیں کی جاتیں؛ یہ صرف انفرادی جائزے کے بعد منتخب ہوتی ہیں۔',
      ),
      L(
        'Using the wrong support, or using one that is not needed, can do more harm than good.',
        'غلط معاون آلہ، یا ایسا آلہ جس کی ضرورت نہیں، فائدے سے زیادہ نقصان کر سکتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve discussing whether any joint support is appropriate for the individual child.',
        'نگہداشت میں کبھی کبھی یہ بات چیت شامل ہو سکتی ہے کہ آیا انفرادی بچے کے لیے کوئی جوڑوں کی معاونت مناسب ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Is any joint support appropriate for our child, or is it not needed right now?', 'کیا ہمارے بچے کے لیے کوئی جوڑوں کی معاونت مناسب ہے، یا ابھی اس کی ضرورت نہیں؟'),
      L('If a support is recommended, how and when should it be used?', 'اگر کوئی معاونت تجویز کی جائے تو اسے کیسے اور کب استعمال کرنا چاہیے؟'),
    ],
    suggestedProfessionalTypes: ['PHYSIOTHERAPIST', 'ORTHOPAEDIC_SPECIALIST', 'PAEDIATRICIAN'],
    supportItemIds: ['joint-support-device'],
    referenceIds: ['eds-society-management', 'medlineplus-eds'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER'],
    contentNotice: L(
      'Braces, splints, compression garments, and mobility aids are never recommended based on the diagnosis alone, only after individual professional assessment.',
      'بریس، سپلنٹ، کمپریشن لباس اور معاون آلات کبھی صرف تشخیص کی بنیاد پر تجویز نہیں کیے جاتے، صرف انفرادی پیشہ ورانہ جائزے کے بعد۔',
    ),
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'eds-activity-and-participation',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Activity and safe participation', 'سرگرمی اور محفوظ شرکت'),
    shortDescription: L(
      'Many children can take part in activities with individual guidance; the aim is safe participation, not automatic exclusion.',
      'بہت سے بچے انفرادی رہنمائی کے ساتھ سرگرمیوں میں حصہ لے سکتے ہیں؛ مقصد محفوظ شرکت ہے، خودبخود اخراج نہیں۔',
    ),
    careDomain: 'SOCIAL_SUPPORT',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'DEVELOPMENT_SUPPORT',
    whyItMayMatter: L(
      'Whether and how a child takes part in an activity depends on the individual child and professional advice, not on a general list of allowed or banned activities.',
      'کوئی بچہ کسی سرگرمی میں کیسے اور آیا حصہ لے، یہ انفرادی بچے اور پیشہ ورانہ مشورے پر منحصر ہے، اجازت یافتہ یا ممنوع سرگرمیوں کی عمومی فہرست پر نہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Individual guidance may depend on the subtype and other factors, so activity decisions are made with a professional who knows the child.',
        'انفرادی رہنمائی ذیلی قسم اور دیگر عوامل پر منحصر ہو سکتی ہے، اس لیے سرگرمی کے فیصلے اس پیشہ ور کے ساتھ ہوتے ہیں جو بچے کو جانتا ہو۔',
      ),
      L(
        'Adapting how an activity is done, and pacing it around fatigue, can support participation.',
        'کسی سرگرمی کو کرنے کے طریقے کو ڈھالنا، اور اسے تھکن کے گرد متوازن رکھنا، شرکت میں معاونت کر سکتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve adapting activities rather than stopping them, based on individual advice.',
        'نگہداشت میں کبھی کبھی انفرادی مشورے کی بنیاد پر سرگرمیوں کو روکنے کے بجائے انہیں ڈھالنا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Should any activities be approached differently for our child?', 'کیا ہمارے بچے کے لیے کسی سرگرمی کو مختلف انداز میں کرنا چاہیے؟'),
      L('How can we help our child stay active safely?', 'ہم اپنے بچے کو محفوظ طریقے سے متحرک رکھنے میں کیسے مدد کر سکتے ہیں؟'),
    ],
    suggestedProfessionalTypes: ['PHYSIOTHERAPIST', 'PAEDIATRICIAN', 'OCCUPATIONAL_THERAPIST'],
    supportItemIds: ['school-accessibility-adaptation'],
    referenceIds: ['eds-society-management'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'SCHOOL_CAREGIVER', 'CHILD_CARE_WORKER', 'GENERAL_CAREGIVER'],
    contentNotice: L(
      'Shared Blood does not clear a child for activity or provide disease-wide lists of allowed or banned activities. Individual guidance comes from a professional who knows the child.',
      'شیئرڈ بلڈ کسی بچے کو سرگرمی کے لیے کلیئر نہیں کرتا اور نہ اجازت یافتہ یا ممنوع سرگرمیوں کی بیماری بھر فہرست دیتا ہے۔ انفرادی رہنمائی اس پیشہ ور سے آتی ہے جو بچے کو جانتا ہو۔',
    ),
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'eds-pain-and-fatigue-awareness',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('Pain and fatigue awareness', 'درد اور تھکن سے آگاہی'),
    shortDescription: L(
      'Some children experience pain or tiredness; noticing patterns and discussing them with a professional can help.',
      'کچھ بچے درد یا تھکن محسوس کرتے ہیں؛ سلسلوں کو محسوس کرنا اور کسی پیشہ ور سے ان پر بات کرنا مدد دے سکتا ہے۔',
    ),
    careDomain: 'PAIN_AWARENESS',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'EVERYDAY_SUPPORT',
    whyItMayMatter: L(
      'For some children, pain or fatigue may affect daily life. Observing when it happens and sharing this with a professional supports better individual care, without self-medicating.',
      'کچھ بچوں کے لیے درد یا تھکن روزمرہ زندگی کو متاثر کر سکتی ہے۔ یہ مشاہدہ کرنا کہ یہ کب ہوتا ہے اور کسی پیشہ ور کے ساتھ بانٹنا بہتر انفرادی نگہداشت میں معاون ہوتا ہے، خود سے دوا لیے بغیر۔',
    ),
    practicalConsiderations: [
      L(
        'Keeping a simple note of when discomfort or tiredness occurs can help a professional understand the pattern.',
        'تکلیف یا تھکن کب ہوتی ہے، اس کا ایک سادہ نوٹ رکھنا کسی پیشہ ور کو سلسلہ سمجھنے میں مدد دے سکتا ہے۔',
      ),
      L(
        'Any pain relief or treatment is decided by a professional, not started at home.',
        'کوئی بھی درد کی دوا یا علاج کسی پیشہ ور کے ذریعے طے ہوتا ہے، گھر پر شروع نہیں کیا جاتا۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve recurring observations of comfort, pain, or energy to discuss at reviews.',
        'نگہداشت میں کبھی کبھی آرام، درد یا توانائی کے بار بار مشاہدے شامل ہو سکتے ہیں تاکہ جائزوں میں بات کی جا سکے۔',
      ),
    ],
    questionsToAsk: [
      L('Which changes in pain or tiredness should we report, and when?', 'درد یا تھکن میں کن تبدیلیوں کو ہمیں بتانا چاہیے، اور کب؟'),
    ],
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'PHYSIOTHERAPIST', 'GENERAL_PHYSICIAN'],
    supportItemIds: ['rest-and-comfort-aid'],
    referenceIds: ['eds-society-management', 'medlineplus-eds'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER', 'CHILD_CARE_WORKER'],
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'eds-school-and-daily-life',
    diseaseId: 'ehlers-danlos-syndrome',
    title: L('School and daily-life adaptation', 'اسکول اور روزمرہ زندگی میں تبدیلی'),
    shortDescription: L(
      'Small adjustments at school and home may help some children take part more comfortably.',
      'اسکول اور گھر میں چھوٹی تبدیلیاں کچھ بچوں کو زیادہ آرام سے شرکت میں مدد دے سکتی ہیں۔',
    ),
    careDomain: 'SCHOOL_SUPPORT',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'EDUCATION_SUPPORT',
    whyItMayMatter: L(
      'For some children, simple accommodations (such as rest breaks or help carrying heavy bags) can support participation and reduce strain, depending on individual needs.',
      'کچھ بچوں کے لیے، سادہ سہولتیں (جیسے آرام کے وقفے یا بھاری بستے اٹھانے میں مدد) انفرادی ضروریات کے مطابق شرکت میں معاونت اور تناؤ کم کر سکتی ہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Families share only the care information they choose with appropriate school staff, according to circumstances.',
        'خاندان حالات کے مطابق مناسب اسکول عملے کے ساتھ صرف وہی نگہداشت معلومات بانٹتے ہیں جو وہ چاہیں۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve communicating practical needs to a school and reviewing them as the child grows.',
        'نگہداشت میں کبھی کبھی اسکول کو عملی ضروریات بتانا اور بچے کے بڑھنے کے ساتھ ان کا جائزہ لینا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('What simple adjustments could help our child take part more comfortably?', 'کون سی سادہ تبدیلیاں ہمارے بچے کو زیادہ آرام سے شرکت میں مدد دے سکتی ہیں؟'),
    ],
    suggestedProfessionalTypes: ['OCCUPATIONAL_THERAPIST', 'PHYSIOTHERAPIST', 'PAEDIATRICIAN'],
    supportItemIds: ['school-accessibility-adaptation'],
    referenceIds: ['eds-society-management'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'SCHOOL_CAREGIVER', 'CHILD_CARE_WORKER'],
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
];
