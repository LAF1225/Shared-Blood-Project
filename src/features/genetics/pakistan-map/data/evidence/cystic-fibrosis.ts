import type { LocalizedText } from '@/types';
import type { MapEvidenceRecord } from '../../types';

/**
 * Cystic fibrosis evidence records (spec §26). Handle with care: Pakistani
 * evidence may reflect UNDERDIAGNOSIS and incomplete national incidence data.
 * These records are documented hospital cohorts, patient cohorts, and genetic/
 * mutation studies — NEVER a national CF prevalence or incidence figure. Do not
 * build a CF prevalence heatmap from them (spec §26/§62).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const CYSTIC_FIBROSIS_EVIDENCE: readonly MapEvidenceRecord[] = [
  {
    id: 'cf-sindh-karachi-cftr',
    diseaseId: 'cystic-fibrosis',
    title: L('CFTR mutation analysis, Karachi', 'CFTR میوٹیشن تجزیہ، کراچی'),
    locationName: L('Karachi', 'کراچی'),
    district: L('Karachi', 'کراچی'),
    provinceOrTerritory: 'sindh',
    latitude: 24.86,
    longitude: 67.01,
    geographicPrecision: 'CITY',
    evidenceType: 'MUTATION_STUDY',
    studyPopulation: L(
      'Children clinically diagnosed with cystic fibrosis and referred for CFTR gene testing in Karachi.',
      'کراچی میں طبی طور پر سسٹک فائبروسس کی تشخیص شدہ اور CFTR جین جانچ کے لیے بھیجے گئے بچے۔',
    ),
    evidenceSummary: L(
      'A study analysing which CFTR gene changes were found among Pakistani children clinically diagnosed with cystic fibrosis.',
      'ایک مطالعہ جو تجزیہ کرتا ہے کہ سسٹک فائبروسس کی طبی تشخیص شدہ پاکستانی بچوں میں کون سی CFTR جین تبدیلیاں پائی گئیں۔',
    ),
    measuredOutcome: L(
      'The CFTR mutations detected among the tested children.',
      'جانچے گئے بچوں میں شناخت شدہ CFTR میوٹیشنز۔',
    ),
    reportedEstimate: L(
      'The mutation profile differed from typical European populations, with some common Western mutations less frequent.',
      'میوٹیشن پروفائل عام یورپی آبادیوں سے مختلف تھا، جہاں کچھ عام مغربی میوٹیشنز کم پائی گئیں۔',
    ),
    estimateType: L('CFTR mutation profile within tested patients', 'جانچے گئے مریضوں میں CFTR میوٹیشن پروفائل'),
    institution: L('Molecular pathology laboratory, Karachi', 'مالیکیولر پیتھالوجی لیبارٹری، کراچی'),
    publicationTitle: 'CFTR gene mutation analysis in Pakistani cystic fibrosis patients',
    publicationYear: 2012,
    referenceId: 'moatter-2012-cftr',
    canTellUs: L(
      'This shows that cystic fibrosis occurs in Pakistani children and that the CFTR mutation profile can differ from Western populations, which matters for choosing genetic tests.',
      'یہ ظاہر کرتا ہے کہ سسٹک فائبروسس پاکستانی بچوں میں ہوتا ہے اور CFTR میوٹیشن پروفائل مغربی آبادیوں سے مختلف ہو سکتا ہے، جو جینیاتی جانچ کے انتخاب کے لیے اہم ہے۔',
    ),
    cannotTellUs: L(
      'It cannot tell us how common cystic fibrosis is in Pakistan; the national incidence is unknown and CF may be underdiagnosed.',
      'یہ ہمیں یہ نہیں بتا سکتا کہ پاکستان میں سسٹک فائبروسس کتنا عام ہے؛ قومی شرحِ وقوع نامعلوم ہے اور CF کی کم تشخیص ہو سکتی ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'cf-punjab-lahore-hospital',
    diseaseId: 'cystic-fibrosis',
    title: L('Cystic fibrosis hospital case series, Lahore', 'سسٹک فائبروسس ہسپتال کیس سیریز، لاہور'),
    locationName: L('Lahore', 'لاہور'),
    district: L('Lahore', 'لاہور'),
    provinceOrTerritory: 'punjab',
    latitude: 31.55,
    longitude: 74.34,
    geographicPrecision: 'CITY',
    evidenceType: 'HOSPITAL_COHORT',
    studyPopulation: L(
      'Children diagnosed with cystic fibrosis presenting to a tertiary-care paediatric hospital in Lahore.',
      'لاہور کے ایک تیسرے درجے کے اطفال ہسپتال میں آنے والے سسٹک فائبروسس کی تشخیص شدہ بچے۔',
    ),
    evidenceSummary: L(
      'A hospital description of how children with cystic fibrosis presented and were managed at one centre.',
      'ایک ہسپتالی وضاحت کہ سسٹک فائبروسس کے بچے ایک مرکز میں کیسے آئے اور ان کا علاج کیسے ہوا۔',
    ),
    measuredOutcome: L(
      'The clinical features and management of the patients seen.',
      'دیکھے گئے مریضوں کی طبی خصوصیات اور علاج۔',
    ),
    estimateType: L('Description of a hospital patient group', 'ہسپتال کے مریضوں کے گروہ کی وضاحت'),
    institution: L('Tertiary paediatric hospital, Lahore', 'تیسرے درجے کا اطفال ہسپتال، لاہور'),
    referenceId: 'cf-hospital-cohort',
    canTellUs: L(
      'This describes how cystic fibrosis presents in children reaching a specialist hospital in Lahore, which helps clinicians recognise it earlier.',
      'یہ بیان کرتا ہے کہ لاہور کے کسی ماہر ہسپتال تک پہنچنے والے بچوں میں سسٹک فائبروسس کیسے ظاہر ہوتا ہے، جو معالجین کو اسے جلد پہچاننے میں مدد دیتا ہے۔',
    ),
    cannotTellUs: L(
      'Children who reach a tertiary hospital are not a general population sample, so this cannot estimate how many people in Lahore have cystic fibrosis.',
      'تیسرے درجے کے ہسپتال تک پہنچنے والے بچے عمومی آبادی کا نمونہ نہیں ہیں، اس لیے یہ اندازہ نہیں لگا سکتا کہ لاہور میں کتنے لوگوں کو سسٹک فائبروسس ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'cf-punjab-rawalpindi-cohort',
    diseaseId: 'cystic-fibrosis',
    title: L('Paediatric cystic fibrosis patient cohort, Rawalpindi', 'اطفال سسٹک فائبروسس مریض کوہورٹ، راولپنڈی'),
    locationName: L('Rawalpindi', 'راولپنڈی'),
    district: L('Rawalpindi', 'راولپنڈی'),
    provinceOrTerritory: 'punjab',
    latitude: 33.6,
    longitude: 73.04,
    geographicPrecision: 'CITY',
    evidenceType: 'PATIENT_COHORT',
    studyPopulation: L(
      'A follow-up cohort of children diagnosed with cystic fibrosis at a hospital serving the Rawalpindi–Islamabad region.',
      'راولپنڈی–اسلام آباد کے علاقے کو خدمات دینے والے ہسپتال میں سسٹک فائبروسس کی تشخیص شدہ بچوں کا فالو-اپ کوہورٹ۔',
    ),
    evidenceSummary: L(
      'A patient cohort followed over time to describe the course of cystic fibrosis among diagnosed children.',
      'ایک مریض کوہورٹ جسے وقت کے ساتھ فالو کیا گیا تاکہ تشخیص شدہ بچوں میں سسٹک فائبروسس کے سلسلے کی وضاحت کی جا سکے۔',
    ),
    measuredOutcome: L(
      'The clinical course and outcomes of the followed patients.',
      'فالو کیے گئے مریضوں کا طبی سلسلہ اور نتائج۔',
    ),
    estimateType: L('Description of a followed patient cohort', 'فالو کیے گئے مریض کوہورٹ کی وضاحت'),
    institution: L('Paediatric department, Rawalpindi', 'شعبۂ اطفال، راولپنڈی'),
    referenceId: 'cf-hospital-cohort',
    canTellUs: L(
      'This describes the real course and care needs of children living with cystic fibrosis in this region.',
      'یہ اس علاقے میں سسٹک فائبروسس کے ساتھ زندگی گزارنے والے بچوں کی حقیقی حالت اور نگہداشت کی ضروریات بیان کرتا ہے۔',
    ),
    cannotTellUs: L(
      'A diagnosed cohort cannot reveal how many cases are missed; national incidence remains unknown because of likely underdiagnosis.',
      'ایک تشخیص شدہ کوہورٹ یہ ظاہر نہیں کر سکتا کہ کتنے کیسز نظر انداز ہوتے ہیں؛ ممکنہ کم تشخیص کی وجہ سے قومی شرحِ وقوع نامعلوم رہتی ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
];
