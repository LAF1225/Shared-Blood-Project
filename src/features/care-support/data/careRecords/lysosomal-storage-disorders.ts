import type { LocalizedText } from '@/types';
import type { CareSupportRecord } from '../../types';

/**
 * Lysosomal storage disorder care & support records (spec §28).
 *
 * CRITICAL: LSDs are a broad disease GROUP. There is NO universal care plan
 * (spec §28). Group-level content uses cautious "some / depending / varies"
 * qualifiers and may discuss multidisciplinary care, development, mobility,
 * feeding, communication, and care coordination. Subtype-aware records are used
 * where care needs are specific (spec §28). No enzyme-replacement dosing or any
 * treatment regimen (spec §29).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LYSOSOMAL_STORAGE_DISORDERS_CARE: readonly CareSupportRecord[] = [
  {
    id: 'lsd-multidisciplinary-coordination',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Coordinating multidisciplinary care', 'متعدد شعبہ جاتی نگہداشت کو منظم کرنا'),
    shortDescription: L(
      'Depending on the specific disorder, several different professionals may be involved in a child’s care.',
      'مخصوص عارضے کے مطابق، بچے کی نگہداشت میں کئی مختلف پیشہ ور شامل ہو سکتے ہیں۔',
    ),
    careDomain: 'CAREGIVER_PREPARATION',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'FAMILY_SUPPORT',
    whyItMayMatter: L(
      'Because these disorders vary so much, care needs differ from child to child. For some children, care may involve coordinating between several specialists over time.',
      'چونکہ یہ عارضے بہت مختلف ہوتے ہیں، نگہداشت کی ضروریات بچے سے بچے میں فرق رکھتی ہیں۔ کچھ بچوں کے لیے، نگہداشت میں وقت کے ساتھ کئی ماہرین کے درمیان ہم آہنگی شامل ہو سکتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Not all children need the same professionals; which specialists are involved depends on the individual child and the specific disorder.',
        'تمام بچوں کو ایک جیسے پیشہ ور درکار نہیں ہوتے؛ کون سے ماہرین شامل ہوں یہ انفرادی بچے اور مخصوص عارضے پر منحصر ہے۔',
      ),
      L(
        'Keeping one organised record of who is involved and their advice helps families coordinate.',
        'کون شامل ہے اور ان کے مشورے کا ایک منظم ریکارڈ رکھنا خاندانوں کو ہم آہنگی میں مدد دیتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Families may find themselves coordinating appointments across more than one specialty.',
        'خاندان ایک سے زیادہ شعبوں میں ملاقاتوں کو منظم کرتے ہوئے پا سکتے ہیں۔',
      ),
    ],
    questionsToAsk: [
      L('Which specialists are relevant for our child’s specific disorder?', 'ہمارے بچے کے مخصوص عارضے کے لیے کون سے ماہرین متعلقہ ہیں؟'),
      L('Who can help us coordinate between different teams?', 'مختلف ٹیموں کے درمیان ہم آہنگی میں ہماری مدد کون کر سکتا ہے؟'),
    ],
    suggestedProfessionalTypes: ['METABOLIC_SPECIALIST', 'PAEDIATRICIAN', 'GENETIC_COUNSELLOR'],
    supportItemIds: ['medical-document-folder'],
    referenceIds: ['nord-lysosomal', 'gard-rare-disease'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    contentNotice: L(
      'Lysosomal storage disorders are a broad group; care needs vary widely and there is no single care plan that fits every child.',
      'لائسوسومل اسٹوریج ڈس آرڈرز ایک وسیع گروہ ہیں؛ نگہداشت کی ضروریات بہت مختلف ہوتی ہیں اور کوئی واحد نگہداشت منصوبہ ہر بچے پر پورا نہیں اترتا۔',
    ),
    displayOrder: 1,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'lsd-development-support',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Supporting development and participation', 'نشوونما اور شرکت میں معاونت'),
    shortDescription: L(
      'Some children may benefit from support that encourages participation and helps build skills.',
      'کچھ بچے ایسی معاونت سے فائدہ اٹھا سکتے ہیں جو شرکت کی حوصلہ افزائی اور مہارتیں بنانے میں مدد دے۔',
    ),
    careDomain: 'DEVELOPMENT_SUPPORT',
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    careContext: 'DEVELOPMENT_SUPPORT',
    whyItMayMatter: L(
      'For some children, development support focuses on encouraging participation and adapting activities to the individual child, not on making a child “normal”.',
      'کچھ بچوں کے لیے، نشوونما کی معاونت شرکت کی حوصلہ افزائی اور سرگرمیوں کو انفرادی بچے کے مطابق ڈھالنے پر مرکوز ہوتی ہے، بچے کو ”نارمل“ بنانے پر نہیں۔',
    ),
    practicalConsiderations: [
      L(
        'Depending on the child, professionals such as a physiotherapist or occupational therapist may suggest adapted play and activities.',
        'بچے کے مطابق، فزیوتھراپسٹ یا آکوپیشنل تھراپسٹ جیسے پیشہ ور موافق کھیل اور سرگرمیاں تجویز کر سکتے ہیں۔',
      ),
      L(
        'Adapting activities to a child’s abilities supports participation rather than excluding the child.',
        'سرگرمیوں کو بچے کی صلاحیتوں کے مطابق ڈھالنا بچے کو خارج کرنے کے بجائے شرکت میں معاونت کرتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve working alongside developmental professionals and celebrating individual progress.',
        'نگہداشت میں کبھی کبھی نشوونما کے پیشہ وروں کے ساتھ کام کرنا اور انفرادی پیش رفت کو سراہنا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Which activities can our child take part in, and how might we adapt them?', 'ہمارا بچہ کن سرگرمیوں میں حصہ لے سکتا ہے، اور ہم انہیں کیسے ڈھال سکتے ہیں؟'),
      L('Would developmental support such as physiotherapy be appropriate?', 'کیا فزیوتھراپی جیسی نشوونما کی معاونت مناسب ہوگی؟'),
    ],
    suggestedProfessionalTypes: ['PHYSIOTHERAPIST', 'OCCUPATIONAL_THERAPIST', 'NEUROLOGIST'],
    supportItemIds: ['communication-support-aid', 'supportive-seating'],
    referenceIds: ['nord-lysosomal', 'nhs-child-development'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    displayOrder: 2,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'lsd-mobility-and-movement',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Mobility and movement support', 'نقل و حرکت میں معاونت'),
    shortDescription: L(
      'Depending on the specific disorder, some children may have changing movement needs over time.',
      'مخصوص عارضے کے مطابق، کچھ بچوں کی حرکت کی ضروریات وقت کے ساتھ بدل سکتی ہیں۔',
    ),
    careDomain: 'MOVEMENT_SUPPORT',
    ageContexts: ['YOUNG_CHILD', 'GENERAL_CHILDHOOD'],
    careContext: 'MOBILITY_SUPPORT',
    whyItMayMatter: L(
      'For some children, movement needs may change, and a professional can assess whether any support could help the individual child stay comfortable and included.',
      'کچھ بچوں کے لیے حرکت کی ضروریات بدل سکتی ہیں، اور کوئی پیشہ ور جانچ سکتا ہے کہ آیا کوئی معاونت انفرادی بچے کو آرام دہ اور شامل رکھنے میں مدد دے سکتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'Any mobility equipment is selected after individual assessment; it is never based on the diagnosis alone.',
        'کوئی بھی معاون آلہ انفرادی جائزے کے بعد منتخب ہوتا ہے؛ یہ کبھی صرف تشخیص کی بنیاد پر نہیں ہوتا۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve reviews of movement and mobility as a child grows and needs change.',
        'نگہداشت میں کبھی کبھی بچے کے بڑھنے اور ضروریات بدلنے کے ساتھ حرکت اور نقل و حرکت کے جائزے شامل ہو سکتے ہیں۔',
      ),
    ],
    questionsToAsk: [
      L('Would an assessment of movement or mobility support be helpful for our child?', 'کیا ہمارے بچے کے لیے حرکت یا نقل و حرکت کی معاونت کا جائزہ مفید ہوگا؟'),
    ],
    suggestedProfessionalTypes: ['PHYSIOTHERAPIST', 'ORTHOPAEDIC_SPECIALIST', 'METABOLIC_SPECIALIST'],
    supportItemIds: ['mobility-aid', 'supportive-seating'],
    referenceIds: ['nord-lysosomal', 'who-assistive-technology'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER'],
    displayOrder: 3,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'lsd-gaucher-care-coordination',
    diseaseId: 'lysosomal-storage-disorders',
    diseaseSubtypeId: 'gaucher-disease',
    title: L('Gaucher disease: coordinated follow-up', 'گاؤچر بیماری: مربوط فالو اپ'),
    shortDescription: L(
      'For this specific disorder, care often involves regular specialist follow-up, depending on the individual child.',
      'اس مخصوص عارضے کے لیے، نگہداشت میں اکثر باقاعدہ ماہرانہ فالو اپ شامل ہوتا ہے، جو انفرادی بچے پر منحصر ہے۔',
    ),
    careDomain: 'MEDICAL_ROUTINE_AWARENESS',
    ageContexts: ['GENERAL_CHILDHOOD'],
    careContext: 'MEDICAL_ROUTINE_SUPPORT',
    whyItMayMatter: L(
      'Some children with this specific disorder have regular monitoring arranged by a metabolic specialist. Understanding that follow-up is part of care helps families plan, the medical details are set by the care team.',
      'اس مخصوص عارضے والے کچھ بچوں کی باقاعدہ نگرانی میٹابولک ماہر کے ذریعے مقرر ہوتی ہے۔ یہ سمجھنا کہ فالو اپ نگہداشت کا حصہ ہے، خاندانوں کو منصوبہ بندی میں مدد دیتا ہے، طبی تفصیلات نگہداشت ٹیم طے کرتی ہے۔',
    ),
    practicalConsiderations: [
      L(
        'This guidance is specific to one disorder within the group and does not apply to every lysosomal storage disorder.',
        'یہ رہنمائی گروہ کے اندر ایک عارضے کے لیے مخصوص ہے اور ہر لائسوسومل اسٹوریج ڈس آرڈر پر لاگو نہیں ہوتی۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve regular reviews and keeping track of a longer-term follow-up schedule.',
        'نگہداشت میں کبھی کبھی باقاعدہ جائزے اور طویل مدتی فالو اپ شیڈول کا حساب رکھنا شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('What does regular follow-up involve for our child, and how often?', 'ہمارے بچے کے لیے باقاعدہ فالو اپ میں کیا شامل ہے، اور کتنی بار؟'),
    ],
    suggestedProfessionalTypes: ['METABOLIC_SPECIALIST', 'PAEDIATRICIAN'],
    supportItemIds: ['medical-document-folder'],
    referenceIds: ['gard-rare-disease', 'nord-lysosomal'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'FAMILY_CAREGIVER'],
    contentNotice: L(
      'This applies to one specific disorder within the group. Shared Blood does not provide enzyme-replacement dosing or any treatment schedule.',
      'یہ گروہ کے اندر ایک مخصوص عارضے پر لاگو ہوتا ہے۔ شیئرڈ بلڈ اینزائم ریپلیسمنٹ کی خوراک یا کوئی علاج شیڈول فراہم نہیں کرتا۔',
    ),
    displayOrder: 4,
    lastReviewed: '2026-07-01',
  },
  {
    id: 'lsd-feeding-and-communication',
    diseaseId: 'lysosomal-storage-disorders',
    title: L('Feeding and communication support', 'کھانے اور رابطے میں معاونت'),
    shortDescription: L(
      'Some children may need support with feeding or communication, depending on the specific disorder.',
      'مخصوص عارضے کے مطابق، کچھ بچوں کو کھانے یا رابطے میں معاونت درکار ہو سکتی ہے۔',
    ),
    careDomain: 'FEEDING_SUPPORT',
    ageContexts: ['INFANT', 'TODDLER', 'YOUNG_CHILD'],
    careContext: 'COMMUNICATION_SUPPORT',
    whyItMayMatter: L(
      'For some children, feeding or communication may become areas where a professional’s support helps. Needs differ, and any significant feeding difficulty should be assessed.',
      'کچھ بچوں کے لیے، کھانا یا رابطہ ایسے شعبے بن سکتے ہیں جہاں کسی پیشہ ور کی معاونت مدد دے۔ ضروریات مختلف ہوتی ہیں، اور کھانے کی کوئی نمایاں دشواری جانچنی چاہیے۔',
    ),
    practicalConsiderations: [
      L(
        'Depending on the child, adapted equipment or communication supports may be suggested by the relevant professional.',
        'بچے کے مطابق، متعلقہ پیشہ ور موافق سامان یا رابطے کے معاون آلات تجویز کر سکتا ہے۔',
      ),
    ],
    caregiverExpectations: [
      L(
        'Care may sometimes involve working with professionals on feeding, speech, or communication over time.',
        'نگہداشت میں کبھی کبھی وقت کے ساتھ کھانے، گفتار یا رابطے پر پیشہ وروں کے ساتھ کام شامل ہو سکتا ہے۔',
      ),
    ],
    questionsToAsk: [
      L('Would support for feeding or communication help our child?', 'کیا کھانے یا رابطے کی معاونت ہمارے بچے کی مدد کرے گی؟'),
    ],
    suggestedProfessionalTypes: ['OCCUPATIONAL_THERAPIST', 'DIETITIAN', 'PAEDIATRICIAN'],
    supportItemIds: ['feeding-support-equipment', 'communication-support-aid'],
    referenceIds: ['nord-lysosomal', 'mps-society-support'],
    caregiverAudiences: ['PARENT_OR_GUARDIAN', 'CHILD_CARE_WORKER', 'FAMILY_CAREGIVER'],
    displayOrder: 5,
    lastReviewed: '2026-07-01',
  },
];
