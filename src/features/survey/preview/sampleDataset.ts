import type { LocalizedText } from '@/types';
import { SUPPRESSED } from '../types';
import type {
  AttitudeAggregate,
  DiseaseAwarenessAggregate,
  IndicatorAggregate,
  SurveyAggregateDataset,
  SurveyFindingRecord,
  SurveyQuestionAggregate,
} from '../types';

/**
 * CLEARLY-SYNTHETIC sample aggregate data (NOT real survey results).
 *
 * This exists ONLY to exercise the presentation, charts, validation, and
 * resolution in a dev-only preview route and in unit tests. It is never rendered
 * on the public page (see `../data/dataset`, which is intentionally empty until a
 * real survey is collected, cleaned offline, aggregated, and approved). The
 * numbers below are illustrative placeholders — they are internally consistent
 * (counts sum to valid n, percentages match) and include a suppressed small cell
 * to demonstrate spec §42, but they describe no real respondents.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });
const N = 200;

const questionAggregates: SurveyQuestionAggregate[] = [
  {
    questionId: 'q-genetic-literacy-self',
    validResponseCount: N,
    missingResponseCount: 6,
    responseCounts: { NONE: 30, A_LITTLE: 50, SOME: 60, GOOD: 40, VERY_GOOD: 20 },
    responsePercentages: { NONE: 15, A_LITTLE: 25, SOME: 30, GOOD: 20, VERY_GOOD: 10 },
    publicFinding: L(
      'Within the survey sample, most respondents described their understanding of inheritance as limited to moderate.',
      'سروے کے نمونے میں، زیادہ تر جواب دہندگان نے وراثت کے بارے میں اپنی سمجھ کو محدود سے درمیانی قرار دیا۔',
    ),
  },
  {
    questionId: 'q-testing-willingness',
    validResponseCount: N,
    missingResponseCount: 4,
    responseCounts: { STRONGLY_DISAGREE: 10, DISAGREE: 20, NEUTRAL: 40, AGREE: 80, STRONGLY_AGREE: 50 },
    responsePercentages: { STRONGLY_DISAGREE: 5, DISAGREE: 10, NEUTRAL: 20, AGREE: 40, STRONGLY_AGREE: 25 },
    publicFinding: L(
      'Among respondents surveyed, most stated a willingness to learn their carrier status if testing were available and affordable. Stated willingness is an intention, not testing behaviour.',
      'سروے کیے گئے جواب دہندگان میں، زیادہ تر نے، اگر ٹیسٹنگ دستیاب اور سستی ہو، اپنا کیریئر اسٹیٹس جاننے کی آمادگی ظاہر کی۔ ظاہر کردہ آمادگی ایک ارادہ ہے، ٹیسٹنگ کا عمل نہیں۔',
    ),
  },
  {
    questionId: 'q-information-source',
    validResponseCount: N,
    missingResponseCount: 2,
    isMultiResponse: true,
    responseCounts: {
      FAMILY: 150, DOCTOR: 90, SOCIAL_MEDIA: 110, SCHOOL: 40, INTERNET_SEARCH: 70,
      NEWS: 30, FRIENDS: 60, RELIGIOUS_OR_COMMUNITY_SOURCE: 35, HOSPITAL: 45, NGO: 10, UNIVERSITY: 20, OTHER: 5,
    },
    responsePercentages: {
      FAMILY: 75, DOCTOR: 45, SOCIAL_MEDIA: 55, SCHOOL: 20, INTERNET_SEARCH: 35,
      NEWS: 15, FRIENDS: 30, RELIGIOUS_OR_COMMUNITY_SOURCE: 17.5, HOSPITAL: 22.5, NGO: 5, UNIVERSITY: 10, OTHER: 2.5,
    },
    publicFinding: L(
      'Respondents in the survey most often named family and social media as where they had heard about inherited conditions. (Respondents could select more than one source.)',
      'سروے کے جواب دہندگان نے اکثر خاندان اور سوشل میڈیا کو وہ ذرائع بتایا جہاں سے انہوں نے موروثی حالتوں کے بارے میں سنا۔ (جواب دہندگان ایک سے زیادہ ذریعہ منتخب کر سکتے تھے۔)',
    ),
  },
];

const diseaseAwarenessAggregates: DiseaseAwarenessAggregate[] = [
  {
    diseaseId: 'beta-thalassemia',
    validResponseCount: N,
    awarenessLevelCounts: { NEVER_HEARD_OF_IT: 20, HEARD_THE_NAME: 40, KNOW_A_LITTLE: 60, KNOW_A_FAIR_AMOUNT: 50, KNOW_A_LOT: 30 },
    awarenessLevelPercentages: { NEVER_HEARD_OF_IT: 10, HEARD_THE_NAME: 20, KNOW_A_LITTLE: 30, KNOW_A_FAIR_AMOUNT: 25, KNOW_A_LOT: 15 },
    heardOfPercentage: 90,
    selfReportedFamiliarityPercentage: 70,
    cityBreakdown: { ISLAMABAD: 92, RAWALPINDI: 88, LAHORE: 91, KARACHI: 89, OTHER: SUPPRESSED },
    publicFinding: L(
      'Among respondents surveyed, beta thalassemia had the highest self-reported recognition of the four conditions.',
      'سروے کیے گئے جواب دہندگان میں، چاروں حالتوں میں سے بیٹا تھیلیسیمیا کی خود اطلاع کردہ شناخت سب سے زیادہ تھی۔',
    ),
  },
  {
    diseaseId: 'cystic-fibrosis',
    validResponseCount: N,
    awarenessLevelCounts: { NEVER_HEARD_OF_IT: 90, HEARD_THE_NAME: 50, KNOW_A_LITTLE: 30, KNOW_A_FAIR_AMOUNT: 20, KNOW_A_LOT: 10 },
    awarenessLevelPercentages: { NEVER_HEARD_OF_IT: 45, HEARD_THE_NAME: 25, KNOW_A_LITTLE: 15, KNOW_A_FAIR_AMOUNT: 10, KNOW_A_LOT: 5 },
    heardOfPercentage: 55,
    selfReportedFamiliarityPercentage: 30,
    publicFinding: L(
      'Self-reported recognition of cystic fibrosis was lower than for beta thalassemia within the survey sample.',
      'سروے کے نمونے میں سسٹک فائبروسس کی خود اطلاع کردہ شناخت بیٹا تھیلیسیمیا کے مقابلے میں کم تھی۔',
    ),
  },
  {
    diseaseId: 'lysosomal-storage-disorders',
    validResponseCount: N,
    awarenessLevelCounts: { NEVER_HEARD_OF_IT: 140, HEARD_THE_NAME: 30, KNOW_A_LITTLE: 15, KNOW_A_FAIR_AMOUNT: 8, KNOW_A_LOT: 7 },
    awarenessLevelPercentages: { NEVER_HEARD_OF_IT: 70, HEARD_THE_NAME: 15, KNOW_A_LITTLE: 7.5, KNOW_A_FAIR_AMOUNT: 4, KNOW_A_LOT: 3.5 },
    heardOfPercentage: 30,
    selfReportedFamiliarityPercentage: 15,
    publicFinding: L(
      'Lysosomal storage disorders were among the least recognised conditions among respondents surveyed.',
      'سروے کیے گئے جواب دہندگان میں لائسوسومل اسٹوریج ڈس آرڈرز سب سے کم شناخت شدہ حالتوں میں شامل تھے۔',
    ),
  },
  {
    diseaseId: 'ehlers-danlos-syndrome',
    validResponseCount: N,
    awarenessLevelCounts: { NEVER_HEARD_OF_IT: 150, HEARD_THE_NAME: 30, KNOW_A_LITTLE: 10, KNOW_A_FAIR_AMOUNT: 5, KNOW_A_LOT: 5 },
    awarenessLevelPercentages: { NEVER_HEARD_OF_IT: 75, HEARD_THE_NAME: 15, KNOW_A_LITTLE: 5, KNOW_A_FAIR_AMOUNT: 2.5, KNOW_A_LOT: 2.5 },
    heardOfPercentage: 25,
    selfReportedFamiliarityPercentage: 10,
    cityBreakdown: { ISLAMABAD: 28, RAWALPINDI: 22, LAHORE: 26, KARACHI: 24, OTHER: SUPPRESSED },
    publicFinding: L(
      'Ehlers-Danlos syndrome had the lowest self-reported recognition of the four conditions among respondents surveyed.',
      'سروے کیے گئے جواب دہندگان میں چاروں حالتوں میں سے ایہلرز-ڈانلوس سنڈروم کی خود اطلاع کردہ شناخت سب سے کم تھی۔',
    ),
  },
];

const attitudeAggregates: AttitudeAggregate[] = [
  {
    questionId: 'q-cm-social-acceptance',
    socialDimensionId: 'SOCIAL_ACCEPTANCE',
    validResponseCount: N,
    responseDistribution: { STRONGLY_DISAGREE: 15, DISAGREE: 25, NEUTRAL: 40, AGREE: 70, STRONGLY_AGREE: 50 },
    agreementPercentage: 60,
    neutralPercentage: 20,
    disagreementPercentage: 20,
    publicFinding: L(
      'Within the survey sample, most respondents reported that cousin marriage is generally socially accepted in their community. Social acceptance and support for testing can coexist.',
      'سروے کے نمونے میں، زیادہ تر جواب دہندگان نے بتایا کہ ان کی کمیونٹی میں کزن میرج عام طور پر سماجی طور پر قبول کی جاتی ہے۔ سماجی قبولیت اور ٹیسٹنگ کی حمایت ایک ساتھ موجود ہو سکتی ہیں۔',
    ),
  },
  {
    questionId: 'q-cm-testing-before-marriage',
    socialDimensionId: 'TESTING_BEFORE_MARRIAGE',
    validResponseCount: N,
    responseDistribution: { STRONGLY_DISAGREE: 5, DISAGREE: 10, NEUTRAL: 25, AGREE: 90, STRONGLY_AGREE: 70 },
    agreementPercentage: 80,
    neutralPercentage: 12.5,
    disagreementPercentage: 7.5,
    publicFinding: L(
      'Among respondents surveyed, a large majority agreed that couples should be able to learn about carrier testing before marriage if they wish.',
      'سروے کیے گئے جواب دہندگان میں، بڑی اکثریت نے اتفاق کیا کہ جوڑوں کو، اگر وہ چاہیں، شادی سے پہلے کیریئر ٹیسٹنگ کے بارے میں جاننے کے قابل ہونا چاہیے۔',
    ),
  },
  {
    questionId: 'q-family-influence',
    socialDimensionId: 'EXTENDED_FAMILY_INFLUENCE',
    validResponseCount: N,
    responseDistribution: { STRONGLY_DISAGREE: 10, DISAGREE: 20, NEUTRAL: 30, AGREE: 80, STRONGLY_AGREE: 60 },
    agreementPercentage: 70,
    neutralPercentage: 15,
    disagreementPercentage: 15,
    publicFinding: L(
      'Within the survey sample, many respondents reported that marriage decisions usually involve the wider family. Family involvement is described here as influence, not coercion.',
      'سروے کے نمونے میں، بہت سے جواب دہندگان نے بتایا کہ شادی کے فیصلوں میں عام طور پر وسیع خاندان شامل ہوتا ہے۔ یہاں خاندانی شمولیت کو اثر و رسوخ کے طور پر بیان کیا گیا ہے، جبر کے طور پر نہیں۔',
    ),
  },
];

const indicatorAggregates: IndicatorAggregate[] = [
  {
    indicatorId: 'genetic-literacy-indicator-v1',
    validResponseCount: N,
    meanScore: 48.5,
    bandDistribution: { lower: 90, mixed: 70, higher: 40 },
    publicFinding: L(
      'The aggregate Genetic Literacy Indicator for the survey sample fell in the mixed range. This summarises the sample and is not applied to any individual respondent.',
      'سروے کے نمونے کے لیے مجموعی جینیاتی خواندگی کا اشاریہ ملے جلے دائرے میں آیا۔ یہ نمونے کا خلاصہ ہے اور کسی انفرادی جواب دہندہ پر لاگو نہیں ہوتا۔',
    ),
  },
];

export const SAMPLE_DATASET: SurveyAggregateDataset = {
  datasetId: 'sample-what-pakistan-knows',
  surveyTitle: L('What Pakistan Knows (sample dataset', 'پاکستان کیا جانتا ہے) نمونہ ڈیٹا سیٹ'),
  surveyVersion: 'v1',
  datasetVersion: 'sample-v1',
  analysisVersion: 'sample-a1',
  collectionStartDate: '2026-01-01',
  collectionEndDate: '2026-03-31',
  cities: ['ISLAMABAD', 'RAWALPINDI', 'LAHORE', 'KARACHI', 'OTHER'],
  totalResponses: 214,
  validResponseTotal: N,
  missingResponseTotal: 14,
  methodologySummary: L(
    'Illustrative sample only. In a real dataset this would summarise the research objective, instrument, collection period, recruitment, cleaning, and analysis.',
    'صرف مثالی نمونہ۔ حقیقی ڈیٹا سیٹ میں یہ تحقیقی مقصد، آلہ، جمع کرنے کی مدت، بھرتی، صفائی، اور تجزیے کا خلاصہ بیان کرتا۔',
  ),
  limitations: [
    L(
      'These numbers are synthetic and describe no real respondents; they exist only to demonstrate the presentation.',
      'یہ اعداد مصنوعی ہیں اور کسی حقیقی جواب دہندہ کو بیان نہیں کرتے؛ یہ صرف پیشکش کے مظاہرے کے لیے موجود ہیں۔',
    ),
    L(
      'A survey sample is not a national population and should not be read as representing all people in Pakistan.',
      'سروے کا نمونہ قومی آبادی نہیں اور اسے پاکستان کے تمام لوگوں کی نمائندگی کے طور پر نہیں پڑھا جانا چاہیے۔',
    ),
  ],
  samplingMethod: L(
    'Illustrative convenience and online voluntary-response recruitment (sample only, not random sampling).',
    'مثالی سہولت پر مبنی اور آن لائن رضاکارانہ جواب پر مبنی بھرتی (صرف نمونہ، بے ترتیب نمونہ گیری نہیں)۔',
  ),
  privacyStatement: L(
    'Illustrative sample. Real survey privacy language would match the actual data process and be reviewed before publication.',
    'مثالی نمونہ۔ حقیقی سروے کی رازداری کی زبان اصل ڈیٹا کے عمل سے مطابقت رکھتی اور اشاعت سے پہلے جائزہ لی جاتی۔',
  ),
  questionAggregates,
  indicatorAggregates,
  cityAggregates: [
    { cityId: 'LAHORE', respondentCount: 110, questionAggregates: [], indicatorAggregates: [], diseaseAwarenessAggregates: [], attitudeAggregates: [] },
    { cityId: 'KARACHI', respondentCount: 90, questionAggregates: [], indicatorAggregates: [], diseaseAwarenessAggregates: [], attitudeAggregates: [] },
  ],
  diseaseAwarenessAggregates,
  attitudeAggregates,
  lastUpdated: '2026-04-15',
};

export const SAMPLE_FINDINGS: readonly SurveyFindingRecord[] = [
  {
    id: 'finding-awareness-gap',
    title: L('The Awareness Gap', 'آگاہی کا فرق'),
    findingText: L(
      'Among respondents surveyed, beta thalassemia was recognised far more often than Ehlers-Danlos syndrome.',
      'سروے کیے گئے جواب دہندگان میں، بیٹا تھیلیسیمیا کو ایہلرز-ڈانلوس سنڈروم سے کہیں زیادہ کثرت سے پہچانا گیا۔',
    ),
    findingType: 'KEY_FINDING',
    questionIds: ['q-awareness-disease'],
    indicatorIds: [],
    cityIds: [],
    diseaseIds: ['beta-thalassemia', 'ehlers-danlos-syndrome'],
    statistic: L(
      '90% had heard of beta thalassemia, compared with 25% for Ehlers-Danlos syndrome (survey sample; n=200).',
      '۹۰ فیصد نے بیٹا تھیلیسیمیا کے بارے میں سنا تھا، جبکہ ایہلرز-ڈانلوس سنڈروم کے لیے یہ ۲۵ فیصد تھا (سروے نمونہ؛ n=200)۔',
    ),
    validResponseCount: N,
    interpretation: L(
      'This may suggest that awareness of some conditions has spread further than others; it does not measure medical knowledge.',
      'یہ اشارہ دے سکتا ہے کہ کچھ حالتوں کی آگاہی دوسروں سے زیادہ پھیلی ہے، یہ طبی علم کی پیمائش نہیں کرتا۔',
    ),
    referenceToMethodology: 'methodology',
    displayOrder: 1,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    datasetVersion: 'sample-v1',
  },
  {
    id: 'finding-testing-openness',
    title: L('Openness to carrier testing', 'کیریئر ٹیسٹنگ کے لیے کھلا پن'),
    findingText: L(
      'A large majority of respondents surveyed agreed that couples should be able to learn about carrier testing if they wish.',
      'سروے کیے گئے جواب دہندگان کی بڑی اکثریت نے اتفاق کیا کہ جوڑوں کو، اگر وہ چاہیں، کیریئر ٹیسٹنگ کے بارے میں جاننے کے قابل ہونا چاہیے۔',
    ),
    findingType: 'TESTING_ATTITUDE_FINDING',
    questionIds: ['q-cm-testing-before-marriage'],
    indicatorIds: [],
    cityIds: [],
    diseaseIds: [],
    statistic: L('80% agreed or strongly agreed (survey sample; n=200).', '۸۰ فیصد نے اتفاق یا شدید اتفاق کیا (سروے نمونہ؛ n=200)۔'),
    validResponseCount: N,
    interpretation: L(
      'Stated willingness reflects intention within the sample, not testing uptake.',
      'ظاہر کردہ آمادگی نمونے کے اندر ارادے کو ظاہر کرتی ہے، ٹیسٹنگ کے حقیقی استعمال کو نہیں۔',
    ),
    referenceToMethodology: 'methodology',
    displayOrder: 2,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    datasetVersion: 'sample-v1',
  },
  {
    id: 'finding-city-context',
    title: L('Recognition across surveyed cities', 'سروے کیے گئے شہروں میں شناخت'),
    findingText: L(
      'Recognition of beta thalassemia was broadly similar among respondents surveyed across the participating cities.',
      'شریک شہروں میں سروے کیے گئے جواب دہندگان کے درمیان بیٹا تھیلیسیمیا کی شناخت وسیع طور پر ملتی جلتی تھی۔',
    ),
    findingType: 'CITY_COMPARISON',
    questionIds: ['q-awareness-disease'],
    indicatorIds: [],
    cityIds: ['ISLAMABAD', 'RAWALPINDI', 'LAHORE', 'KARACHI'],
    diseaseIds: ['beta-thalassemia'],
    statistic: L('Around 88–92% across surveyed city samples (survey sample).', 'سروے کیے گئے شہر کے نمونوں میں تقریباً ۸۸ تا ۹۲ فیصد (سروے نمونہ)۔'),
    validResponseCount: N,
    limitationNote: L(
      'These describe surveyed samples in each city, not the whole population of any city.',
      'یہ ہر شہر میں سروے کیے گئے نمونوں کو بیان کرتے ہیں، کسی شہر کی پوری آبادی کو نہیں۔',
    ),
    referenceToMethodology: 'methodology',
    displayOrder: 3,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    datasetVersion: 'sample-v1',
  },
  {
    id: 'finding-limitations',
    title: L('What this survey does not tell us', 'یہ سروے ہمیں کیا نہیں بتاتا'),
    findingText: L(
      'These findings describe the people who participated and should not be read as representing all of Pakistan or all residents of the surveyed cities.',
      'یہ نتائج شرکت کرنے والوں کو بیان کرتے ہیں اور انہیں پورے پاکستان یا سروے کیے گئے شہروں کے تمام رہائشیوں کی نمائندگی کے طور پر نہیں پڑھا جانا چاہیے۔',
    ),
    findingType: 'RESEARCH_LIMITATION',
    questionIds: [],
    indicatorIds: [],
    cityIds: [],
    diseaseIds: [],
    statistic: L(',', ','),
    validResponseCount: N,
    referenceToMethodology: 'methodology',
    displayOrder: 4,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    datasetVersion: 'sample-v1',
  },
  {
    // DRAFT — must NOT render (spec §44). Present to prove approval-gating.
    id: 'finding-draft-example',
    title: L('Draft interpretation (not approved)', 'مسودہ تشریح (منظور شدہ نہیں)'),
    findingText: L('An unreviewed draft interpretation that must never appear publicly.', 'ایک غیر جائزہ شدہ مسودہ تشریح جو کبھی عوامی طور پر ظاہر نہیں ہونی چاہیے۔'),
    findingType: 'SOCIAL_ATTITUDE_FINDING',
    questionIds: ['q-cm-social-acceptance'],
    indicatorIds: [],
    cityIds: [],
    diseaseIds: [],
    statistic: L('DRAFT (do not display', 'مسودہ) ظاہر نہ کریں'),
    validResponseCount: N,
    referenceToMethodology: 'methodology',
    displayOrder: 5,
    reviewStatus: 'DRAFT',
    datasetVersion: 'sample-v1',
  },
];
