import type { LocalizedText } from '@/types';
import type { CareSupportRecord } from '../../types';

/**
 * Beta-thalassemia care & support records (spec §26/§27).
 *
 * BOUNDARIES: may discuss appointment coordination, transfusion-routine
 * awareness, record organisation, scheduled follow-up, energy needs, school
 * communication, and emotional support. It must NOT provide transfusion
 * thresholds, chelation doses, medication schedules, iron-management
 * prescriptions, or laboratory interpretation (spec §26). Iron supplements are
 * never casually recommended for tiredness or pallor (spec §27).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const BETA_THALASSEMIA_CARE: readonly CareSupportRecord[] = [
  {
    id: 'bt-appointment-coordination',
    diseaseId: 'beta-thalassemia',
    title: L('Coordinating regular appointments', 'باقاعدہ ملاقاتوں کو منظم کرنا'),
    shortDescription: L(
      'Care may involve regular, scheduled visits that families coordinate over time.',
      'نگہداشت میں باقاعدہ، طے شدہ ملاقاتیں شامل ہو سکتی ہیں جنہیں خاندان وقت کے ساتھ منظم کرتے ہیں۔',
    ),
    careDomain: 'APPOINTMENT_PREPARATION',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'MEDICAL_ROUTINE_SUPPORT',
    whyItMayMatter: L(
      'Ongoing care for beta-thalassemia is often organised around regular follow-up. Keeping track of dates and preparing for visits can make each appointment more useful.',
      'بیٹا تھیلیسیمیا کی مسلسل نگہداشت اکثر باقاعدہ فالو اپ کے گرد منظم ہوتی ہے۔ تاریخوں کا حساب رکھنا اور ملاقاتوں کی تیاری ہر ملاقات کو زیادہ مفید بنا سکتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Families may find themselves coordinating several visits and keeping a simple calendar of upcoming appointments.',
        'خاندان کئی ملاقاتوں کو منظم کرتے اور آنے والی ملاقاتوں کا ایک سادہ کیلنڈر رکھتے ہوئے پا سکتے ہیں۔',
      ),
      L(
        'Writing down changes and questions between visits helps make the most of limited time with the care team.',
        'ملاقاتوں کے درمیان تبدیلیاں اور سوالات لکھ لینا نگہداشت ٹیم کے محدود وقت سے زیادہ فائدہ اٹھانے میں مدد دیتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve travel, waiting time, and coordinating with more than one department or specialist.',
        'نگہداشت میں کبھی کبھی سفر، انتظار کا وقت، اور ایک سے زیادہ شعبے یا ماہر کے ساتھ ہم آہنگی شامل ہو سکتی ہے۔',
      ),
    ],
    questionsToAsk: [
      L('When is the next visit due, and what should we watch for before then?', 'اگلی ملاقات کب ہے، اور اس سے پہلے ہمیں کن باتوں پر نظر رکھنی چاہیے؟'),
      L('Which changes are worth reporting earlier than the scheduled visit?', 'کون سی تبدیلیاں طے شدہ ملاقات سے پہلے بتانے کے قابل ہیں؟'),
    ],
    suggestedProfessionalTypes: ['HAEMATOLOGIST', 'PAEDIATRICIAN'],
    supportItemIds: ['medical-document-folder'],
    referenceIds: ['tif-patient-guidelines', 'nhs-thalassaemia-living'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'bt-transfusion-routine-awareness',
    diseaseId: 'beta-thalassemia',
    title: L('Understanding a transfusion routine', 'ٹرانسفیوژن روٹین کو سمجھنا'),
    shortDescription: L(
      'Some children follow a regular transfusion routine set entirely by their care team.',
      'کچھ بچے ایک باقاعدہ ٹرانسفیوژن روٹین پر عمل کرتے ہیں جو مکمل طور پر ان کی نگہداشت ٹیم طے کرتی ہے۔',
    ),
    careDomain: 'MEDICAL_ROUTINE_AWARENESS',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'MEDICAL_ROUTINE_SUPPORT',
    whyItMayMatter: L(
      'Being familiar with the shape of a care routine (the appointments, the day itself, and recovery afterwards) can help caregivers support a child and prepare practically.',
      'نگہداشت کے معمول کی شکل سے واقفیت (ملاقاتیں، خود وہ دن، اور بعد کی بحالی) نگہداشت کرنے والوں کو بچے کی مدد اور عملی تیاری میں معاون ہو سکتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'A routine may mean planning around a regular hospital day, including rest, food, and school arrangements.',
        'ایک معمول کا مطلب باقاعدہ ہسپتال کے دن کے گرد منصوبہ بندی ہو سکتا ہے، بشمول آرام، خوراک اور اسکول کے انتظامات۔',
      ),
      L(
        'Follow only the specific instructions given by the treating team about the routine itself.',
        'معمول کے بارے میں صرف علاج کرنے والی ٹیم کی دی گئی مخصوص ہدایات پر عمل کریں۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve regular hospital days that become part of the family routine over time.',
        'نگہداشت میں کبھی کبھی باقاعدہ ہسپتال کے دن شامل ہو سکتے ہیں جو وقت کے ساتھ خاندانی معمول کا حصہ بن جاتے ہیں۔',
      ),
    ],
    questionsToAsk: [
      L('What can we do at home to help our child feel comfortable around the routine?', 'اپنے بچے کو اس معمول کے دوران آرام دہ محسوس کرانے کے لیے ہم گھر پر کیا کر سکتے ہیں؟'),
      L('What signs after a visit should prompt us to seek advice?', 'ملاقات کے بعد کن علامات پر ہمیں مشورہ لینا چاہیے؟'),
    ],
    suggestedProfessionalTypes: ['HAEMATOLOGIST', 'PAEDIATRICIAN'],
    supportItemIds: [],
    referenceIds: ['tif-patient-guidelines'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER'],
    contentNotice: L(
      'Shared Blood does not provide transfusion thresholds, chelation doses, medicine schedules, or test-result interpretation. These are decided only by the care team.',
      'شیئرڈ بلڈ ٹرانسفیوژن کی حدیں، چیلیشن کی خوراک، ادویات کے اوقات، یا ٹیسٹ کے نتائج کی تشریح فراہم نہیں کرتا۔ ان کا فیصلہ صرف نگہداشت ٹیم کرتی ہے۔',
    ),
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'bt-energy-and-rest',
    diseaseId: 'beta-thalassemia',
    title: L('Energy, tiredness, and rest', 'توانائی، تھکن اور آرام'),
    shortDescription: L(
      'Children may have variable energy; rest and pacing can help, but tiredness should be assessed rather than self-treated.',
      'بچوں کی توانائی مختلف ہو سکتی ہے؛ آرام اور توازن مدد دے سکتے ہیں، مگر تھکن کا خود علاج کرنے کے بجائے جائزہ لینا چاہیے۔',
    ),
    careDomain: 'ENERGY_MANAGEMENT',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'EVERYDAY_SUPPORT',
    whyItMayMatter: L(
      'Everyday routines can be adapted to a child’s energy, but changes in tiredness or paleness are things to discuss with a professional, not reasons to start supplements on your own.',
      'روزمرہ کے معمولات کو بچے کی توانائی کے مطابق ڈھالا جا سکتا ہے، مگر تھکن یا زردی میں تبدیلیاں کسی پیشہ ور سے بات کرنے کی چیزیں ہیں، خود سے سپلیمنٹ شروع کرنے کی وجہ نہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Some children benefit from pacing active play with rest, without being excluded from participation.',
        'کچھ بچے سرگرم کھیل کو آرام کے ساتھ متوازن رکھنے سے فائدہ اٹھاتے ہیں، شرکت سے محروم کیے بغیر۔',
      ),
      L(
        'A child appearing pale or tired is a reason to seek assessment, not a reason to start iron on your own, different causes of anaemia need different management.',
        'بچے کا زرد یا تھکا نظر آنا جائزے کی وجہ ہے، خود سے آئرن شروع کرنے کی نہیں، خون کی کمی کی مختلف وجوہات کے لیے مختلف انتظام درکار ہوتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve noticing and gently reporting changes in energy over weeks.',
        'نگہداشت میں کبھی کبھی ہفتوں کے دوران توانائی میں تبدیلیوں کو محسوس کرنا اور نرمی سے بتانا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Should any change in tiredness or paleness be reported, and how quickly?', 'کیا تھکن یا زردی میں کوئی تبدیلی بتانی چاہیے، اور کتنی جلدی؟'),
      L('Is any supplement appropriate for our child, or should nothing be started without assessment?', 'کیا کوئی سپلیمنٹ ہمارے بچے کے لیے مناسب ہے، یا جائزے کے بغیر کچھ شروع نہیں کرنا چاہیے؟'),
    ],
    suggestedProfessionalTypes: ['HAEMATOLOGIST', 'PAEDIATRICIAN', 'DIETITIAN'],
    supportItemIds: ['rest-and-comfort-aid'],
    referenceIds: ['medlineplus-iron-anaemia', 'nhs-thalassaemia-living'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER', 'GENERAL_CAREGIVER'],
    contentNotice: L(
      'Do not start iron or other supplements just because a child looks pale or tired. This needs medical assessment first.',
      'صرف اس لیے کہ بچہ زرد یا تھکا لگتا ہے، آئرن یا دیگر سپلیمنٹ شروع نہ کریں۔ اس کے لیے پہلے طبی جائزہ ضروری ہے۔',
    ),
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'bt-record-organization',
    diseaseId: 'beta-thalassemia',
    title: L('Organising medical information', 'طبی معلومات کو منظم کرنا'),
    shortDescription: L(
      'Keeping key documents together can make ongoing care smoother, especially across different visits.',
      'اہم دستاویزات کو اکٹھا رکھنا مسلسل نگہداشت کو آسان بنا سکتا ہے، خاص طور پر مختلف ملاقاتوں کے دوران۔',
    ),
    careDomain: 'CAREGIVER_PREPARATION',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'FAMILY_SUPPORT',
    whyItMayMatter: L(
      'Having diagnosis documents, recent results, a medicine list, and specialist contacts organised means important information can be shared quickly when needed.',
      'تشخیصی دستاویزات، حالیہ نتائج، ادویات کی فہرست اور ماہرین کے رابطے منظم رکھنے کا مطلب ہے کہ ضرورت پڑنے پر اہم معلومات جلدی بانٹی جا سکتی ہیں۔',
    ),
    practicalConsiderations: [
      L(
        'The principle is organised information, not a specific product. A folder, envelope, or notebook can all work.',
        'اصل بات منظم معلومات ہے، کوئی مخصوص پروڈکٹ نہیں۔ فولڈر، لفافہ یا نوٹ بک سب کام کر سکتے ہیں۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Families may find themselves becoming the keepers of a child’s health history across many appointments.',
        'خاندان کئی ملاقاتوں کے دوران بچے کی صحت کی تاریخ کے محافظ بنتے ہوئے پا سکتے ہیں۔',
      ),
    ],
    questionsToAsk: [
      L('Which documents are most useful to bring to each visit?', 'ہر ملاقات میں لانے کے لیے کون سی دستاویزات سب سے زیادہ مفید ہیں؟'),
    ],
    suggestedProfessionalTypes: ['HAEMATOLOGIST', 'PAEDIATRICIAN'],
    supportItemIds: ['medical-document-folder'],
    referenceIds: ['nhs-thalassaemia-living'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'bt-school-and-emotional',
    diseaseId: 'beta-thalassemia',
    title: L('School communication and emotional support', 'اسکول سے رابطہ اور جذباتی معاونت'),
    shortDescription: L(
      'Long routines and repeated appointments can be tiring; schools and families can help a child stay included.',
      'طویل معمولات اور بار بار ملاقاتیں تھکا دینے والی ہو سکتی ہیں؛ اسکول اور خاندان بچے کو شامل رکھنے میں مدد کر سکتے ہیں۔',
    ),
    careDomain: 'SCHOOL_SUPPORT',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'EDUCATION_SUPPORT',
    whyItMayMatter: L(
      'Missed school for appointments and periods of tiredness can affect learning and friendships. A little planning with the school, and space for the child’s feelings, can help.',
      'ملاقاتوں کے لیے اسکول کی چھٹی اور تھکن کے دورانیے سیکھنے اور دوستیوں کو متاثر کر سکتے ہیں۔ اسکول کے ساتھ تھوڑی منصوبہ بندی، اور بچے کے جذبات کے لیے گنجائش، مدد دے سکتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Families may choose to share only the care needs that are relevant with appropriate school staff; there is no need to tell the whole school.',
        'خاندان مناسب اسکول عملے کے ساتھ صرف متعلقہ نگہداشت ضروریات بانٹنے کا انتخاب کر سکتے ہیں، پورے اسکول کو بتانے کی ضرورت نہیں۔',
      ),
      L(
        'Repeated appointments can be emotionally tiring for children, parents, and siblings; acknowledging this is normal.',
        'بار بار ملاقاتیں بچوں، والدین اور بہن بھائیوں کے لیے جذباتی طور پر تھکا دینے والی ہو سکتی ہیں؛ اسے تسلیم کرنا معمول کی بات ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve communicating with a school about attendance, rest, and participation.',
        'نگہداشت میں کبھی کبھی اسکول سے حاضری، آرام اور شرکت کے بارے میں رابطہ شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('How can we plan for missed school around appointments?', 'ملاقاتوں کے باعث اسکول کی چھٹیوں کے لیے ہم کیسے منصوبہ بندی کر سکتے ہیں؟'),
      L('Is emotional or peer support available for our child and family?', 'کیا ہمارے بچے اور خاندان کے لیے جذباتی یا ہم عمر ساتھیوں کی معاونت دستیاب ہے؟'),
    ],
    suggestedProfessionalTypes: ['PAEDIATRICIAN', 'GENETIC_COUNSELLOR', 'OTHER'],
    supportItemIds: ['school-accessibility-adaptation'],
    referenceIds: ['nhs-thalassaemia-living', 'nhs-child-development'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'SCHOOL_CAREGIVER', 'FAMILY_CAREGIVER'],
    displayOrder: 5,
    lastReviewed: '2026-07-01',
  },
];
