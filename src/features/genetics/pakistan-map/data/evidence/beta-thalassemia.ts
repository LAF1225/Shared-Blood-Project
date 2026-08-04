import type { LocalizedText } from '@/types';
import type { MapEvidenceRecord } from '../../types';

/**
 * Beta thalassemia evidence records (spec §25). This layer intentionally has the
 * strongest geographic coverage. CRITICAL: regional estimates come from
 * different samples and methods and must NOT be compared as if from one national
 * surveillance system (spec §25). Each record preserves its own study design,
 * population, geographic scope, measured outcome, source, and limitations.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const BETA_THALASSEMIA_EVIDENCE: readonly MapEvidenceRecord[] = [
  {
    id: 'bt-punjab-faisalabad-mutation',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Beta-globin mutation spectrum, central Punjab',
      'بیٹا-گلوبن میوٹیشن اسپیکٹرم، وسطی پنجاب',
    ),
    locationName: L('Faisalabad', 'فیصل آباد'),
    district: L('Faisalabad', 'فیصل آباد'),
    provinceOrTerritory: 'punjab',
    latitude: 31.42,
    longitude: 73.08,
    geographicPrecision: 'CITY',
    evidenceType: 'MUTATION_STUDY',
    studyPopulation: L(
      'Beta-thalassaemia patients and families referred for molecular diagnosis in central Punjab.',
      'وسطی پنجاب میں مالیکیولر تشخیص کے لیے بھیجے گئے بیٹا-تھیلیسیمیا کے مریض اور خاندان۔',
    ),
    studyPeriod: L('Documented in the 2000s', '2000 کی دہائی میں دستاویز شدہ'),
    evidenceSummary: L(
      'A molecular study characterising which beta-globin gene mutations were most frequently found among the patients studied in this region.',
      'ایک مالیکیولر مطالعہ جس نے یہ بیان کیا کہ اس خطے میں مطالعہ شدہ مریضوں میں کون سی بیٹا-گلوبن جین میوٹیشنز سب سے زیادہ پائی گئیں۔',
    ),
    measuredOutcome: L(
      'The distribution of specific beta-globin mutations among the participants.',
      'شرکاء میں مخصوص بیٹا-گلوبن میوٹیشنز کی تقسیم۔',
    ),
    reportedEstimate: L(
      'A small number of mutations accounted for most cases in the sample, supporting local prenatal-diagnosis programmes.',
      'نمونے میں زیادہ تر کیسز چند میوٹیشنز کی وجہ سے تھے، جو مقامی قبل از پیدائش تشخیصی پروگراموں کی حمایت کرتا ہے۔',
    ),
    estimateType: L('Mutation frequencies within the studied patients', 'مطالعہ شدہ مریضوں میں میوٹیشن فریکوئنسی'),
    institution: L('University genetics laboratory, Punjab', 'یونیورسٹی جینیٹکس لیبارٹری، پنجاب'),
    publicationTitle:
      'Spectrum of β-thalassemia mutations in various regions of Punjab and Islamabad, Pakistan',
    publicationYear: 2006,
    referenceId: 'baig-2006-annhematol',
    canTellUs: L(
      'This study describes which beta-thalassaemia mutations were common among the patients tested in central Punjab, which helps design local carrier testing and prenatal diagnosis.',
      'یہ مطالعہ بتاتا ہے کہ وسطی پنجاب میں جانچے گئے مریضوں میں کون سی بیٹا-تھیلیسیمیا میوٹیشنز عام تھیں، جو مقامی حامل جانچ اور قبل از پیدائش تشخیص کی منصوبہ بندی میں مدد دیتا ہے۔',
    ),
    cannotTellUs: L(
      'It does not establish how common beta thalassaemia is across all of Punjab, and mutation frequencies in tested patients are not a population prevalence.',
      'یہ یہ طے نہیں کرتا کہ پورے پنجاب میں بیٹا تھیلیسیمیا کتنا عام ہے، اور جانچے گئے مریضوں میں میوٹیشن فریکوئنسی کوئی آبادی کی وسیع شرح نہیں ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-sindh-karachi-cohort',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Hospital-based beta-thalassaemia patient records, Karachi',
      'کراچی میں ہسپتال پر مبنی بیٹا-تھیلیسیمیا مریض ریکارڈ',
    ),
    locationName: L('Karachi', 'کراچی'),
    district: L('Karachi', 'کراچی'),
    provinceOrTerritory: 'sindh',
    latitude: 24.86,
    longitude: 67.01,
    geographicPrecision: 'CITY',
    evidenceType: 'HOSPITAL_COHORT',
    studyPopulation: L(
      'Transfusion-dependent beta-thalassaemia patients managed at a Karachi blood-disease centre.',
      'کراچی کے ایک خونی امراض کے مرکز میں زیرِ علاج انتقالِ خون پر منحصر بیٹا-تھیلیسیمیا مریض۔',
    ),
    evidenceSummary: L(
      'A description of beta-thalassaemia patients receiving care at one institution, including how their condition was managed.',
      'ایک ادارے میں دیکھ بھال حاصل کرنے والے بیٹا-تھیلیسیمیا مریضوں کی وضاحت، بشمول ان کی حالت کیسے سنبھالی گئی۔',
    ),
    measuredOutcome: L(
      'Characteristics of patients managed at the centre.',
      'مرکز میں زیرِ علاج مریضوں کی خصوصیات۔',
    ),
    estimateType: L('Description of a hospital patient group', 'ہسپتال کے مریضوں کے گروہ کی وضاحت'),
    institution: L('Blood-disease centre, Karachi', 'خونی امراض مرکز، کراچی'),
    referenceId: 'ansari-2012-thal',
    canTellUs: L(
      'This evidence shows that beta thalassaemia is actively diagnosed and managed in Karachi and describes the patients treated there.',
      'یہ شواہد ظاہر کرتے ہیں کہ کراچی میں بیٹا تھیلیسیمیا کی فعال تشخیص اور علاج ہوتا ہے اور وہاں زیرِ علاج مریضوں کی وضاحت کرتے ہیں۔',
    ),
    cannotTellUs: L(
      'Patients treated at one hospital may not represent the general population of Karachi, and this cohort cannot be read as the city’s prevalence.',
      'ایک ہسپتال میں زیرِ علاج مریض کراچی کی عمومی آبادی کی نمائندگی نہیں کر سکتے، اور اس گروہ کو شہر کی وسیع شرح کے طور پر نہیں پڑھا جا سکتا۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-sindh-hyderabad-screening',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Carrier screening among families, lower Sindh',
      'زیریں سندھ میں خاندانوں کے درمیان حامل اسکریننگ',
    ),
    locationName: L('Hyderabad', 'حیدرآباد'),
    district: L('Hyderabad', 'حیدرآباد'),
    provinceOrTerritory: 'sindh',
    latitude: 25.4,
    longitude: 68.37,
    geographicPrecision: 'DISTRICT',
    evidenceType: 'SCREENING_STUDY',
    studyPopulation: L(
      'Family members screened for beta-thalassaemia carrier status after an affected child was identified.',
      'ایک متاثرہ بچے کی نشاندہی کے بعد بیٹا-تھیلیسیمیا حامل حیثیت کے لیے اسکرین کیے گئے خاندان کے افراد۔',
    ),
    evidenceSummary: L(
      'A screening study testing relatives of affected children to identify carriers within extended families.',
      'ایک اسکریننگ مطالعہ جو متاثرہ بچوں کے رشتہ داروں کی جانچ کر کے وسیع خاندانوں میں حاملین کی نشاندہی کرتا ہے۔',
    ),
    measuredOutcome: L(
      'The proportion of screened relatives found to be carriers.',
      'اسکرین کیے گئے رشتہ داروں کا وہ تناسب جو حامل پائے گئے۔',
    ),
    reportedEstimate: L(
      'Extended-family screening identified many additional carriers among close relatives of affected children.',
      'وسیع خاندانی اسکریننگ نے متاثرہ بچوں کے قریبی رشتہ داروں میں کئی اضافی حاملین کی نشاندہی کی۔',
    ),
    estimateType: L('Carrier proportion among screened relatives', 'اسکرین کیے گئے رشتہ داروں میں حامل تناسب'),
    referenceId: 'ahmed-2002-nejm',
    canTellUs: L(
      'This shows that screening the relatives of an affected child is an effective way to find carriers, because carriers cluster within families that already have a case.',
      'یہ ظاہر کرتا ہے کہ کسی متاثرہ بچے کے رشتہ داروں کی اسکریننگ حاملین تلاش کرنے کا مؤثر طریقہ ہے، کیونکہ حاملین ان خاندانوں میں مرتکز ہوتے ہیں جن میں پہلے ہی کوئی کیس موجود ہو۔',
    ),
    cannotTellUs: L(
      'Carrier rates within families that already have an affected child are higher than in the general population and must not be read as the district’s carrier rate.',
      'ان خاندانوں میں حامل شرح جن میں پہلے سے کوئی متاثرہ بچہ ہو، عمومی آبادی سے زیادہ ہوتی ہے اور اسے ضلع کی حامل شرح کے طور پر نہیں پڑھا جانا چاہیے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-kp-peshawar-mutation',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Beta-thalassaemia mutations, Khyber Pakhtunkhwa',
      'بیٹا-تھیلیسیمیا میوٹیشنز، خیبر پختونخوا',
    ),
    locationName: L('Peshawar', 'پشاور'),
    district: L('Peshawar', 'پشاور'),
    provinceOrTerritory: 'khyber-pakhtunkhwa',
    latitude: 34.01,
    longitude: 71.58,
    geographicPrecision: 'CITY',
    evidenceType: 'GENETIC_STUDY',
    studyPopulation: L(
      'Beta-thalassaemia patients from Khyber Pakhtunkhwa referred for genetic analysis.',
      'خیبر پختونخوا سے جینیاتی تجزیے کے لیے بھیجے گئے بیٹا-تھیلیسیمیا مریض۔',
    ),
    evidenceSummary: L(
      'A genetic study describing the molecular changes found among beta-thalassaemia patients in this province.',
      'ایک جینیاتی مطالعہ جو اس صوبے میں بیٹا-تھیلیسیمیا مریضوں میں پائی جانے والی مالیکیولر تبدیلیوں کی وضاحت کرتا ہے۔',
    ),
    measuredOutcome: L(
      'The molecular characteristics of the studied patients.',
      'مطالعہ شدہ مریضوں کی مالیکیولر خصوصیات۔',
    ),
    estimateType: L('Molecular findings among studied participants', 'مطالعہ شدہ شرکاء میں مالیکیولر نتائج'),
    referenceId: 'black-2010-jcg',
    canTellUs: L(
      'This describes the molecular profile of beta thalassaemia among patients studied in Khyber Pakhtunkhwa, which informs local diagnosis.',
      'یہ خیبر پختونخوا میں مطالعہ شدہ مریضوں میں بیٹا تھیلیسیمیا کے مالیکیولر پروفائل کی وضاحت کرتا ہے، جو مقامی تشخیص میں معاون ہے۔',
    ),
    cannotTellUs: L(
      'It does not measure how many people in the province carry or are affected by beta thalassaemia.',
      'یہ اس بات کی پیمائش نہیں کرتا کہ صوبے میں کتنے لوگ بیٹا تھیلیسیمیا کے حامل یا متاثر ہیں۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-gb-northern-areas-screening',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Heterozygous beta-thalassaemia in the northern areas',
      'شمالی علاقہ جات میں ہیٹروزائیگس بیٹا-تھیلیسیمیا',
    ),
    locationName: L('Gilgit', 'گلگت'),
    provinceOrTerritory: 'gilgit-baltistan',
    latitude: 35.92,
    longitude: 74.31,
    geographicPrecision: 'PROVINCE',
    evidenceType: 'POPULATION_STUDY',
    studyPopulation: L(
      'A community sample from the northern areas tested for beta-thalassaemia carrier status.',
      'شمالی علاقہ جات سے ایک کمیونٹی نمونہ جسے بیٹا-تھیلیسیمیا حامل حیثیت کے لیے جانچا گیا۔',
    ),
    evidenceSummary: L(
      'An earlier study estimating how common the beta-thalassaemia carrier trait was in a sampled community of the northern areas.',
      'ایک قدیم مطالعہ جو اندازہ لگاتا ہے کہ شمالی علاقہ جات کی ایک نمونہ شدہ کمیونٹی میں بیٹا-تھیلیسیمیا حامل خصوصیت کتنی عام تھی۔',
    ),
    measuredOutcome: L(
      'The proportion of the sampled community carrying the beta-thalassaemia trait.',
      'نمونہ شدہ کمیونٹی کا وہ تناسب جو بیٹا-تھیلیسیمیا خصوصیت رکھتا ہے۔',
    ),
    reportedEstimate: L(
      'The study reported a measurable carrier proportion in the community it sampled.',
      'مطالعے نے اپنی نمونہ شدہ کمیونٹی میں ایک قابلِ پیمائش حامل تناسب رپورٹ کیا۔',
    ),
    estimateType: L('Carrier proportion in a community sample', 'کمیونٹی نمونے میں حامل تناسب'),
    publicationYear: 1992,
    referenceId: 'khattak-1992-jpma',
    canTellUs: L(
      'This gives an early population-level estimate of the beta-thalassaemia carrier trait in the specific community that was sampled.',
      'یہ اس مخصوص کمیونٹی میں بیٹا-تھیلیسیمیا حامل خصوصیت کا ابتدائی آبادی سطح کا اندازہ دیتا ہے جسے نمونہ بنایا گیا تھا۔',
    ),
    cannotTellUs: L(
      'A single community sample from decades ago cannot represent all of Gilgit-Baltistan today, and methods differ from other regional studies.',
      'دہائیوں پرانا ایک واحد کمیونٹی نمونہ آج کے پورے گلگت-بلتستان کی نمائندگی نہیں کر سکتا، اور اس کے طریقے دیگر علاقائی مطالعات سے مختلف ہیں۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-balochistan-quetta-cohort',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Beta-thalassaemia patient cohort, Quetta',
      'بیٹا-تھیلیسیمیا مریض کوہورٹ، کوئٹہ',
    ),
    locationName: L('Quetta', 'کوئٹہ'),
    district: L('Quetta', 'کوئٹہ'),
    provinceOrTerritory: 'balochistan',
    latitude: 30.18,
    longitude: 66.99,
    geographicPrecision: 'CITY',
    evidenceType: 'PATIENT_COHORT',
    studyPopulation: L(
      'Registered beta-thalassaemia patients attending a thalassaemia care centre in Quetta.',
      'کوئٹہ میں ایک تھیلیسیمیا نگہداشت مرکز میں آنے والے رجسٹرڈ بیٹا-تھیلیسیمیا مریض۔',
    ),
    evidenceSummary: L(
      'A description of registered patients receiving ongoing care at a thalassaemia centre in Balochistan.',
      'بلوچستان میں ایک تھیلیسیمیا مرکز میں مسلسل نگہداشت حاصل کرنے والے رجسٹرڈ مریضوں کی وضاحت۔',
    ),
    measuredOutcome: L(
      'Characteristics of the registered patient group.',
      'رجسٹرڈ مریضوں کے گروہ کی خصوصیات۔',
    ),
    estimateType: L('Description of a registered patient group', 'رجسٹرڈ مریضوں کے گروہ کی وضاحت'),
    institution: L('Thalassaemia care centre, Quetta', 'تھیلیسیمیا نگہداشت مرکز، کوئٹہ'),
    referenceId: 'ansari-2012-thal',
    canTellUs: L(
      'This confirms that beta thalassaemia patients are registered and cared for in Quetta and describes that patient group.',
      'یہ اس بات کی تصدیق کرتا ہے کہ کوئٹہ میں بیٹا تھیلیسیمیا کے مریض رجسٹرڈ اور زیرِ نگہداشت ہیں اور اس مریض گروہ کی وضاحت کرتا ہے۔',
    ),
    cannotTellUs: L(
      'A care-centre cohort reflects who reaches that centre, not how common the condition is across Balochistan.',
      'ایک نگہداشت مرکز کا گروہ یہ ظاہر کرتا ہے کہ اس مرکز تک کون پہنچتا ہے، نہ کہ یہ حالت پورے بلوچستان میں کتنی عام ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-ict-islamabad-prenatal',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Prenatal diagnosis service records, Islamabad',
      'قبل از پیدائش تشخیصی خدمات ریکارڈ، اسلام آباد',
    ),
    locationName: L('Islamabad', 'اسلام آباد'),
    provinceOrTerritory: 'islamabad-capital-territory',
    latitude: 33.68,
    longitude: 73.05,
    geographicPrecision: 'EXACT_INSTITUTION',
    evidenceType: 'INSTITUTIONAL_DATA',
    studyPopulation: L(
      'Families using a prenatal-diagnosis service for at-risk pregnancies referred from several regions.',
      'کئی خطوں سے بھیجے گئے خطرے سے دوچار حملوں کے لیے قبل از پیدائش تشخیصی خدمت استعمال کرنے والے خاندان۔',
    ),
    evidenceSummary: L(
      'Institutional service data describing families who used prenatal diagnosis for pregnancies at risk of beta thalassaemia.',
      'ادارہ جاتی خدمت کا ڈیٹا جو ان خاندانوں کی وضاحت کرتا ہے جنہوں نے بیٹا تھیلیسیمیا کے خطرے والے حملوں کے لیے قبل از پیدائش تشخیص استعمال کی۔',
    ),
    measuredOutcome: L(
      'The uptake and outcomes of a prenatal-diagnosis service.',
      'ایک قبل از پیدائش تشخیصی خدمت کا استعمال اور نتائج۔',
    ),
    estimateType: L('Institutional service data', 'ادارہ جاتی خدمت کا ڈیٹا'),
    institution: L('Genetic diagnosis centre, Islamabad', 'جینیاتی تشخیصی مرکز، اسلام آباد'),
    referenceId: 'ahmed-1996-bjh',
    canTellUs: L(
      'This shows that prenatal diagnosis for beta thalassaemia is available and used by at-risk families, many referred from outside Islamabad.',
      'یہ ظاہر کرتا ہے کہ بیٹا تھیلیسیمیا کے لیے قبل از پیدائش تشخیص دستیاب ہے اور خطرے سے دوچار خاندان اسے استعمال کرتے ہیں، جن میں سے کئی اسلام آباد سے باہر سے بھیجے جاتے ہیں۔',
    ),
    cannotTellUs: L(
      'Service records reflect referral patterns to one centre and do not describe prevalence in Islamabad or in the families’ home regions.',
      'خدمت کے ریکارڈ ایک مرکز کی طرف ریفرل کے انداز کو ظاہر کرتے ہیں اور اسلام آباد یا خاندانوں کے آبائی خطوں میں شرح کی وضاحت نہیں کرتے۔',
    ),
    lastReviewed: '2026-06-01',
  },
  {
    id: 'bt-punjab-lahore-registry',
    diseaseId: 'beta-thalassemia',
    title: L(
      'Thalassaemia prevention programme registry, Lahore',
      'تھیلیسیمیا بچاؤ پروگرام رجسٹری، لاہور',
    ),
    locationName: L('Lahore', 'لاہور'),
    district: L('Lahore', 'لاہور'),
    provinceOrTerritory: 'punjab',
    latitude: 31.55,
    longitude: 74.34,
    geographicPrecision: 'CITY',
    evidenceType: 'REGISTRY',
    studyPopulation: L(
      'Cases captured by a thalassaemia prevention and registration programme in Lahore.',
      'لاہور میں ایک تھیلیسیمیا بچاؤ اور اندراج پروگرام کے ذریعے درج کیے گئے کیسز۔',
    ),
    evidenceSummary: L(
      'A registry recording beta-thalassaemia cases and carriers identified through a prevention programme.',
      'ایک رجسٹری جو بچاؤ پروگرام کے ذریعے شناخت شدہ بیٹا-تھیلیسیمیا کیسز اور حاملین درج کرتی ہے۔',
    ),
    measuredOutcome: L(
      'The number and characteristics of cases captured by the registry.',
      'رجسٹری کے ذریعے درج کیسز کی تعداد اور خصوصیات۔',
    ),
    estimateType: L('Cases captured by a registry', 'رجسٹری کے ذریعے درج کیسز'),
    institution: L('Thalassaemia prevention programme, Lahore', 'تھیلیسیمیا بچاؤ پروگرام، لاہور'),
    referenceId: 'ansari-2012-thal',
    canTellUs: L(
      'A registry shows how many cases a programme has recorded and helps organise prevention and family testing.',
      'ایک رجسٹری ظاہر کرتی ہے کہ کسی پروگرام نے کتنے کیسز درج کیے ہیں اور بچاؤ اور خاندانی جانچ کو منظم کرنے میں مدد دیتی ہے۔',
    ),
    cannotTellUs: L(
      'A registry counts cases known to the programme, not everyone affected, so it is not a complete prevalence figure for Lahore.',
      'ایک رجسٹری صرف پروگرام کو معلوم کیسز شمار کرتی ہے، ہر متاثرہ فرد کو نہیں، اس لیے یہ لاہور کے لیے مکمل شرح کا اعداد نہیں ہے۔',
    ),
    lastReviewed: '2026-06-01',
  },
];
