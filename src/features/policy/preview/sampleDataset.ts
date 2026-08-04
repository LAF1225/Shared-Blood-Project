import type { LocalizedText } from '@/types';
import { SAMPLE_RESEARCH_DATASET } from '@/features/research/preview/sampleDataset';
import { SAMPLE_DATASET as FIELD_SAMPLE } from '@/features/community/preview/sampleDataset';
import { RESEARCH_REFERENCES } from '@/features/research/data/references';
import type { PolicyAdvocacyDataset, PolicyEvidenceRegistry } from '../types';

/**
 * CLEARLY-SYNTHETIC policy & advocacy dataset for development + tests (spec §112 /
 * §114). FABRICATED FOR DEVELOPMENT ONLY — never imported by the public page
 * (which ships the empty production dataset and renders the §112 empty states).
 *
 * It is built on the Module 18 SAMPLE research findings so evidence traceability is
 * REAL: every advocacy priority cites approved sample ResearchFindings (plus a
 * field observation, a fieldwork metric, a training assessment, and a Module 07
 * reference) that exist in the registry below, and each priority INHERITS the
 * research finding's "What This Does Not Show" boundary (spec §12/§99). It exercises
 * the seven Version-1 advocacy priorities, evidence roles, scope compatibility,
 * recommendations, stakeholders, policy briefs, contexts, gaps (with preserved
 * uncertainty), timeline, non-inflated outcomes, traceability, required
 * limitations, and the CORE "What This Advocacy Does Not Claim" boundary — plus a
 * DRAFT priority that must NOT render.
 */

const L = (en: string, ur: string): LocalizedText => ({ en, ur });
const APPROVED = 'APPROVED_FOR_PUBLICATION';

/** Approved-only evidence registry, built from Module 18/17/07 sample data
 * (spec §16/§107). Research boundaries are preserved for inheritance (spec §99). */
const approvedFindings = SAMPLE_RESEARCH_DATASET.findings.filter((f) => f.reviewStatus === APPROVED);
const evidenceRegistry: PolicyEvidenceRegistry = {
  researchFindingIds: approvedFindings.map((f) => f.id),
  surveyFindingIds: SAMPLE_RESEARCH_DATASET.internalSources.map((s) => s.datasetId),
  fieldworkMetricIds: FIELD_SAMPLE.activityRecords.filter((a) => a.reviewStatus === APPROVED).map((a) => a.id),
  fieldObservationIds: FIELD_SAMPLE.fieldObservations.filter((o) => o.reviewStatus === APPROVED).map((o) => o.id),
  trainingAssessmentIds: Array.from(new Set(FIELD_SAMPLE.assessmentAggregates.map((a) => a.assessmentId))),
  literatureReferenceIds: RESEARCH_REFERENCES.map((r) => r.id),
  projectOperationalDataIds: [],
  researchFindingBoundaries: Object.fromEntries(
    approvedFindings.map((f) => [
      f.id,
      { scope: f.geographicScope, evidenceType: f.evidenceType, doesNotShow: f.interpretation.doesNotShow },
    ]),
  ),
};

const now = { createdAt: '2026-04-16', updatedAt: '2026-04-20' };
const timeScope = { startDate: '2026-01-05', endDate: '2026-03-15', label: L('January–March 2026', 'جنوری–مارچ ۲۰۲۶') };

export const SAMPLE_POLICY_DATASET: PolicyAdvocacyDataset = {
  datasetId: 'policy-sample',
  datasetVersion: 'sample-2026.1',
  lastUpdated: '2026-04-20',
  evidenceRegistry,
  publicDisclaimer: L(
    "Shared Blood's advocacy work focuses on genetic-health education, awareness, and public-health communication. Recommendations are based on the evidence and limitations identified in each priority and do not represent government policy or individual medical advice. Shared Blood supports voluntary, informed access to genetic-health information and does not use educational tools to diagnose individuals.",
    'شیئرڈ بلڈ کا وکالت کا کام جینیاتی صحت کی تعلیم، آگاہی اور صحتِ عامہ کے ابلاغ پر مرکوز ہے۔ سفارشات ہر ترجیح میں شناخت شدہ شواہد اور حدود پر مبنی ہیں اور سرکاری پالیسی یا انفرادی طبی مشورے کی نمائندگی نہیں کرتیں۔ شیئرڈ بلڈ جینیاتی صحت کی معلومات تک رضاکارانہ، باخبر رسائی کی حمایت کرتا ہے اور تعلیمی آلات کو افراد کی تشخیص کے لیے استعمال نہیں کرتا۔',
  ),

  policyIssues: [
    issue('pi-carrier-gap', 'CARRIER_AWARENESS_GAP', ['CARRIER_AWARENESS'],
      L('Carrier status is often misunderstood', 'کیریئر حیثیت کو اکثر غلط سمجھا جاتا ہے'),
      L('Survey evidence suggests carrier concepts may benefit from clearer public education.', 'سروے شواہد بتاتے ہیں کہ کیریئر تصورات واضح تر عوامی تعلیم سے فائدہ اٹھا سکتے ہیں۔'),
      ['rf-awareness-gap', 'rf-mixed'], 'MULTI_CITY', ['pl-convenience', 'pl-no-outcome']),
    issue('pi-testing-gap', 'TESTING_INFORMATION_GAP', ['GENETIC_TESTING_EDUCATION'],
      L('Public information on genetic testing could be clearer', 'جینیاتی جانچ پر عوامی معلومات واضح تر ہو سکتی ہیں'),
      L('Most surveyed respondents were open to carrier-testing information, suggesting demand for clear education.', 'زیادہ تر سروے کیے گئے جواب دہندگان کیریئر-ٹیسٹنگ معلومات کے لیے کھلے تھے، جو واضح تعلیم کی طلب کو ظاہر کرتا ہے۔'),
      ['rf-testing-openness'], 'MULTI_CITY', ['pl-convenience', 'pl-no-outcome']),
    issue('pi-counselling-gap', 'COUNSELLING_AWARENESS_GAP', ['GENETIC_COUNSELLING_AWARENESS'],
      L('Awareness of genetic counselling could grow', 'جینیاتی مشاورت کی آگاہی بڑھ سکتی ہے'),
      L('Testing openness plus literature context suggest room to explain what genetic counselling offers.', 'ٹیسٹنگ کے لیے کھلا پن اور ادبی سیاق بتاتے ہیں کہ جینیاتی مشاورت کیا پیش کرتی ہے، اسے سمجھانے کی گنجائش ہے۔'),
      ['rf-testing-openness'], 'MULTI_CITY', ['pl-convenience', 'pl-no-outcome']),
    issue('pi-childcare-gap', 'CHILDCARE_TRAINING_GAP', ['CHILDCARE_WORKER_TRAINING'],
      L('Childcare workers could use practical genetic-health resources', 'نگہداشتِ اطفال کارکن عملی جینیاتی صحت وسائل استعمال کر سکتے ہیں'),
      L('A documented training showed an immediate awareness increase, suggesting practical resources are useful.', 'ایک دستاویزی تربیت نے فوری آگاہی میں اضافہ دکھایا، جو بتاتا ہے کہ عملی وسائل مفید ہیں۔'),
      ['rf-training-immediate', 'rf-fieldwork-reach'], 'ACTIVITY_LOCATION', ['pl-intervention', 'pl-field-context']),
    issue('pi-symptom-gap', 'EARLY_SYMPTOM_RECOGNITION_GAP', ['EARLY_SYMPTOM_EDUCATION'],
      L('Caregivers ask how to recognise concerning signs', 'نگہداشت کنندگان پوچھتے ہیں کہ تشویشناک علامات کیسے پہچانیں'),
      L('A recurring session question suggests clearer recognise-not-diagnose materials may help caregivers.', 'ایک بار بار آنے والا نشست سوال بتاتا ہے کہ واضح تر پہچانیں-تشخیص-نہ-کریں مواد نگہداشت کنندگان کی مدد کر سکتا ہے۔'),
      ['rf-community-question'], 'ACTIVITY_LOCATION', ['pl-field-context', 'pl-intervention']),
    issue('pi-language-gap', 'LANGUAGE_ACCESS_GAP', ['LANGUAGE_ACCESSIBILITY'],
      L('Genetic-health education should be accessible in Urdu', 'جینیاتی صحت کی تعلیم اردو میں قابلِ رسائی ہونی چاہیے'),
      L('Fieldwork and survey experience point to value in clear bilingual genetic-health resources.', 'فیلڈ ورک اور سروے کا تجربہ واضح دو لسانی جینیاتی صحت وسائل میں قدر کی طرف اشارہ کرتا ہے۔'),
      ['rf-awareness-gap', 'rf-mixed'], 'PROJECT_SAMPLE', ['pl-convenience', 'pl-no-outcome']),
    issue('pi-community-gap', 'COMMUNITY_EDUCATION_GAP', ['COMMUNITY_HEALTH_EDUCATION', 'CONSANGUINITY_RISK_COMMUNICATION'],
      L('Communities may benefit from non-stigmatizing genetic-health education', 'کمیونٹیز غیر بدنام کن جینیاتی صحت تعلیم سے فائدہ اٹھا سکتی ہیں'),
      L('Documented community activities and an inconclusive subgroup comparison suggest continued respectful education.', 'دستاویزی کمیونٹی سرگرمیاں اور ایک غیر نتیجہ خیز ذیلی گروہ موازنہ مسلسل بامروت تعلیم کی تجویز دیتے ہیں۔'),
      ['rf-fieldwork-reach', 'rf-consanguinity-comparison'], 'MULTI_CITY', ['pl-convenience', 'pl-field-context']),
  ],

  evidenceLinks: [
    link('el-carrier-primary', 'pi-carrier-gap', 'RESEARCH_FINDING', 'rf-awareness-gap', 'PRIMARY_SUPPORT', 'DIRECT', ['pl-convenience']),
    link('el-carrier-context', 'pi-carrier-gap', 'RESEARCH_FINDING', 'rf-mixed', 'CONTEXTUAL_SUPPORT', 'CONTEXTUAL', []),
    link('el-testing-primary', 'pi-testing-gap', 'RESEARCH_FINDING', 'rf-testing-openness', 'PRIMARY_SUPPORT', 'DIRECT', ['pl-convenience']),
    link('el-counselling-context', 'pi-counselling-gap', 'RESEARCH_FINDING', 'rf-testing-openness', 'CONTEXTUAL_SUPPORT', 'CONTEXTUAL', []),
    link('el-counselling-lit', 'pi-counselling-gap', 'LITERATURE_SOURCE', 'who-genetics', 'LITERATURE_CONTEXT', 'CONTEXTUAL', []),
    link('el-childcare-primary', 'pi-childcare-gap', 'RESEARCH_FINDING', 'rf-training-immediate', 'PRIMARY_SUPPORT', 'DIRECT', ['pl-intervention']),
    link('el-childcare-field', 'pi-childcare-gap', 'RESEARCH_FINDING', 'rf-fieldwork-reach', 'FIELDWORK_CONTEXT', 'CONTEXTUAL', []),
    link('el-childcare-assess', 'pi-childcare-gap', 'TRAINING_ASSESSMENT', 'assess-post', 'IMPLEMENTATION_CONTEXT', 'CONTEXTUAL', []),
    link('el-symptom-primary', 'pi-symptom-gap', 'RESEARCH_FINDING', 'rf-community-question', 'PRIMARY_SUPPORT', 'LIMITED', ['pl-field-context']),
    link('el-symptom-obs', 'pi-symptom-gap', 'FIELD_OBSERVATION', 'obs-1', 'FIELDWORK_CONTEXT', 'CONTEXTUAL', []),
    link('el-language-context', 'pi-language-gap', 'RESEARCH_FINDING', 'rf-awareness-gap', 'CONTEXTUAL_SUPPORT', 'CONTEXTUAL', []),
    link('el-language-mixed', 'pi-language-gap', 'RESEARCH_FINDING', 'rf-mixed', 'CONTEXTUAL_SUPPORT', 'CONTEXTUAL', []),
    link('el-community-field', 'pi-community-gap', 'FIELDWORK_METRIC', 'activity-childcare-training-1', 'IMPLEMENTATION_CONTEXT', 'CONTEXTUAL', []),
    link('el-community-research', 'pi-community-gap', 'RESEARCH_FINDING', 'rf-consanguinity-comparison', 'PRIMARY_SUPPORT', 'LIMITED', ['pl-convenience']),
  ],

  advocacyPriorities: [
    priority('ap-carrier-awareness', 'CARRIER_AWARENESS', ['pi-carrier-gap'], ['CARRIER_AWARENESS', 'GENETIC_HEALTH_EDUCATION'],
      ['el-carrier-primary', 'el-carrier-context'],
      L('Clearer carrier-status education', 'واضح تر کیریئر-حیثیت تعلیم'),
      L('Shared Blood advocates for clearer, accessible education explaining genetic carrier status and autosomal recessive inheritance.', 'شیئرڈ بلڈ جینیاتی کیریئر حیثیت اور آٹوسومل ریسیسِو وراثت کی وضاحت کرنے والی واضح تر، قابلِ رسائی تعلیم کی وکالت کرتا ہے۔'),
      L('Shared Blood advocates for simple carrier-status explanations, Urdu carrier terminology, and links to testing and counselling information.', 'شیئرڈ بلڈ سادہ کیریئر-حیثیت وضاحتوں، اردو کیریئر اصطلاحات، اور ٹیسٹنگ و مشاورت معلومات کے روابط کی وکالت کرتا ہے۔'),
      L('The survey does not estimate carrier-status knowledge across Pakistan; carrier status is not a disease; and Shared Blood has not proven that educational materials change long-term health outcomes. This is not a recommendation for testing based on calculator output.', 'سروے پاکستان بھر میں کیریئر-حیثیت کے علم کا تخمینہ نہیں لگاتا؛ کیریئر ہونا کوئی بیماری نہیں؛ اور شیئرڈ بلڈ نے یہ ثابت نہیں کیا کہ تعلیمی مواد طویل مدتی صحت کے نتائج کو بدلتا ہے۔ یہ کیلکولیٹر آؤٹ پٹ کی بنیاد پر ٹیسٹنگ کی سفارش نہیں۔'),
      'PUBLIC_HEALTH_COMMUNICATION', ['sh-health-educator', 'sh-public-health-comm'], ['pl-convenience', 'pl-no-outcome'], true, 1),
    priority('ap-testing-education', 'GENETIC_TESTING_EDUCATION', ['pi-testing-gap'], ['GENETIC_TESTING_EDUCATION'],
      ['el-testing-primary'],
      L('Clearer genetic-testing education', 'واضح تر جینیاتی-جانچ تعلیم'),
      L('Shared Blood advocates for clearer public education about what genetic testing can and cannot determine.', 'شیئرڈ بلڈ اس بارے میں واضح تر عوامی تعلیم کی وکالت کرتا ہے کہ جینیاتی جانچ کیا طے کر سکتی ہے اور کیا نہیں۔'),
      L('Educational programmes may benefit from test-type explanations, carrier-screening education, and result-interpretation guidance.', 'تعلیمی پروگرام ٹیسٹ کی اقسام کی وضاحت، کیریئر-اسکریننگ تعلیم، اور نتیجہ کی تعبیر کی رہنمائی سے فائدہ اٹھا سکتے ہیں۔'),
      L('Stated openness reflects intention within the sample, not testing uptake or a national need. Shared Blood does not advocate for mandatory testing and does not provide individual testing decisions.', 'ظاہر کردہ کھلا پن نمونے کے اندر ارادے کو ظاہر کرتا ہے، ٹیسٹنگ کے استعمال یا قومی ضرورت کو نہیں۔ شیئرڈ بلڈ لازمی ٹیسٹنگ کی وکالت نہیں کرتا اور انفرادی ٹیسٹنگ فیصلے فراہم نہیں کرتا۔'),
      'PUBLIC_HEALTH_COMMUNICATION', ['sh-health-educator', 'sh-genetic-counselling'], ['pl-convenience', 'pl-no-outcome'], true, 2),
    priority('ap-counselling-awareness', 'GENETIC_COUNSELLING_AWARENESS', ['pi-counselling-gap'], ['GENETIC_COUNSELLING_AWARENESS'],
      ['el-counselling-context', 'el-counselling-lit'],
      L('Greater awareness of genetic counselling', 'جینیاتی مشاورت کی زیادہ آگاہی'),
      L('Shared Blood advocates for greater public awareness of genetic counselling in understanding inherited conditions and testing information.', 'شیئرڈ بلڈ موروثی حالتوں اور ٹیسٹنگ معلومات کو سمجھنے میں جینیاتی مشاورت کی زیادہ عوامی آگاہی کی وکالت کرتا ہے۔'),
      L('Educational materials could explain what counsellors support and outline referral pathways.', 'تعلیمی مواد بیان کر سکتا ہے کہ مشیر کس میں مدد کرتے ہیں اور ریفرل راستوں کا خاکہ پیش کر سکتا ہے۔'),
      L('Counselling is not described as mandatory. This priority does not measure counselling outcomes and does not represent a national assessment of counselling services.', 'مشاورت کو لازمی نہیں بتایا گیا۔ یہ ترجیح مشاورت کے نتائج کی پیمائش نہیں کرتی اور مشاورتی خدمات کے قومی جائزے کی نمائندگی نہیں کرتی۔'),
      'PUBLIC_HEALTH_COMMUNICATION', ['sh-genetic-counselling', 'sh-health-educator'], ['pl-convenience'], false),
    priority('ap-childcare-training', 'CHILDCARE_WORKER_TRAINING', ['pi-childcare-gap'], ['CHILDCARE_WORKER_TRAINING'],
      ['el-childcare-primary', 'el-childcare-field', 'el-childcare-assess'],
      L('Practical genetic-health resources for childcare workers', 'نگہداشتِ اطفال کارکنوں کے لیے عملی جینیاتی صحت وسائل'),
      L('Shared Blood advocates for practical genetic-health and early-symptom awareness resources for childcare workers responsible for infants and young children.', 'شیئرڈ بلڈ شیرخوار اور چھوٹے بچوں کے ذمہ دار نگہداشتِ اطفال کارکنوں کے لیے عملی جینیاتی صحت اور ابتدائی علامت آگاہی وسائل کی وکالت کرتا ہے۔'),
      L('Institutions could consider short learning booklets, symptom-awareness guides, escalation guidance, and bilingual resources.', 'ادارے مختصر تعلیمی کتابچے، علامت-آگاہی رہنما، ایسکلیشن رہنمائی، اور دو لسانی وسائل پر غور کر سکتے ہیں۔'),
      L('Childcare workers are not diagnosticians, genetic counsellors, or doctors (the purpose is to notice concerning signs and escalate. The immediate post-session change measured does not show long-term retention, and the booklet does not prevent misdiagnosis.', 'نگہداشتِ اطفال کارکن تشخیص کار، جینیاتی مشیر یا ڈاکٹر نہیں) مقصد تشویشناک علامات کو محسوس کرنا اور آگے بڑھانا ہے۔ ماپی گئی فوری بعدِ نشست تبدیلی طویل مدتی برقراری ظاہر نہیں کرتی، اور کتابچہ غلط تشخیص کو نہیں روکتا۔'),
      'INSTITUTION', ['sh-childcare-org', 'sh-health-educator'], ['pl-intervention', 'pl-field-context'], true, 3),
    priority('ap-early-symptom', 'EARLY_SYMPTOM_EDUCATION', ['pi-symptom-gap'], ['EARLY_SYMPTOM_EDUCATION'],
      ['el-symptom-primary', 'el-symptom-obs'],
      L('Accessible early-symptom awareness resources', 'قابلِ رسائی ابتدائی علامت آگاہی وسائل'),
      L('Shared Blood advocates for accessible resources that help caregivers recognise concerning symptoms and understand when medical assessment may be appropriate.', 'شیئرڈ بلڈ ایسے قابلِ رسائی وسائل کی وکالت کرتا ہے جو نگہداشت کنندگان کی مدد کریں کہ تشویشناک علامات پہچانیں اور سمجھیں کہ طبی معائنہ کب مناسب ہو سکتا ہے۔'),
      L('A practical response may include symptom-awareness guides framed around "medical assessment may be appropriate".', 'ایک عملی جواب میں "طبی معائنہ مناسب ہو سکتا ہے" کے گرد ترتیب دیے گئے علامت-آگاہی رہنما شامل ہو سکتے ہیں۔'),
      L('This is symptom awareness, not community diagnosis. It does not guarantee early diagnosis, and a recurring question in one session does not show national knowledge levels.', 'یہ علامت آگاہی ہے، کمیونٹی تشخیص نہیں۔ یہ جلد تشخیص کی ضمانت نہیں دیتی، اور ایک نشست میں بار بار آنے والا سوال قومی علم کی سطح ظاہر نہیں کرتا۔'),
      'COMMUNITY', ['sh-childcare-org', 'sh-community-org'], ['pl-field-context', 'pl-intervention'], false),
    priority('ap-urdu-resources', 'LANGUAGE_ACCESS', ['pi-language-gap'], ['LANGUAGE_ACCESSIBILITY'],
      ['el-language-context', 'el-language-mixed'],
      L('Genetic-health education in English and Urdu', 'انگریزی اور اردو میں جینیاتی صحت تعلیم'),
      L('Shared Blood advocates for genetic-health education accessible in English and Urdu.', 'شیئرڈ بلڈ انگریزی اور اردو میں قابلِ رسائی جینیاتی صحت تعلیم کی وکالت کرتا ہے۔'),
      L('A practical response may include Urdu genetic terminology, Urdu inheritance and testing explanations, and bilingual learning materials.', 'ایک عملی جواب میں اردو جینیاتی اصطلاحات، اردو وراثت و ٹیسٹنگ وضاحتیں، اور دو لسانی تعلیمی مواد شامل ہو سکتے ہیں۔'),
      L('Language access is an educational accessibility issue. Urdu resources alone do not resolve healthcare access barriers and are not claimed to be the primary cause of genetic-health outcomes.', 'زبان تک رسائی ایک تعلیمی رسائی کا مسئلہ ہے۔ صرف اردو وسائل صحت تک رسائی کی رکاوٹیں حل نہیں کرتے اور انہیں جینیاتی صحت کے نتائج کا بنیادی سبب نہیں کہا جاتا۔'),
      'PUBLIC_HEALTH_COMMUNICATION', ['sh-educational-inst', 'sh-public-health-comm'], ['pl-convenience', 'pl-no-outcome'], false),
    priority('ap-community-education', 'COMMUNITY_OUTREACH', ['pi-community-gap'], ['COMMUNITY_HEALTH_EDUCATION', 'CONSANGUINITY_RISK_COMMUNICATION'],
      ['el-community-field', 'el-community-research'],
      L('Non-stigmatizing community genetic-health education', 'غیر بدنام کن کمیونٹی جینیاتی صحت تعلیم'),
      L('Shared Blood advocates for non-stigmatizing community education about inheritance, carrier status, genetic testing, and genetic counselling.', 'شیئرڈ بلڈ وراثت، کیریئر حیثیت، جینیاتی جانچ، اور جینیاتی مشاورت کے بارے میں غیر بدنام کن کمیونٹی تعلیم کی وکالت کرتا ہے۔'),
      L('Formats may include awareness sessions, learning booklets, community discussions, and bilingual resources, before and after marriage, focused on voluntary informed decision-making.', 'طریقوں میں آگاہی نشستیں، تعلیمی کتابچے، کمیونٹی مباحثے، اور دو لسانی وسائل شامل ہو سکتے ہیں، شادی سے پہلے اور بعد، رضاکارانہ باخبر فیصلہ سازی پر مرکوز۔'),
      L('This is not anti-marriage, anti-culture, or anti-family advocacy. Shared Blood does not advocate banning cousin marriage or any reproductive restriction. The subgroup comparison is inconclusive and shows association, not causation, and does not make a national claim.', 'یہ شادی مخالف، ثقافت مخالف، یا خاندان مخالف وکالت نہیں۔ شیئرڈ بلڈ کزن میرج پر پابندی یا کسی تولیدی پابندی کی وکالت نہیں کرتا۔ ذیلی گروہ موازنہ غیر نتیجہ خیز ہے اور تعلق ظاہر کرتا ہے، سببیت نہیں، اور کوئی قومی دعویٰ نہیں کرتا۔'),
      'COMMUNITY', ['sh-community-org', 'sh-health-educator'], ['pl-convenience', 'pl-field-context'], true, 4),
    // MUST NOT RENDER — draft priority (structurally valid + sourced, not approved).
    {
      id: 'ap-draft',
      title: L('Draft advocacy priority (illustrative)', 'مسودہ وکالت ترجیح (نمونہ)'),
      summary: L('A draft priority that has not completed review.', 'ایک مسودہ ترجیح جس نے جائزہ مکمل نہیں کیا۔'),
      policyIssueIds: ['pi-carrier-gap'],
      policyDomainIds: ['GENETIC_HEALTH_EDUCATION'],
      evidenceLinkIds: ['el-carrier-primary'],
      priorityType: 'PUBLIC_EDUCATION',
      recommendedAction: L('Draft.', 'مسودہ۔'),
      actionLevel: 'PROJECT',
      stakeholderIds: [],
      rationale: L('Draft.', 'مسودہ۔'),
      educationalPurpose: L('Draft.', 'مسودہ۔'),
      implementationConsiderations: L('Draft.', 'مسودہ۔'),
      ethicalConsiderations: L('Draft.', 'مسودہ۔'),
      limitationIds: [],
      doesNotClaim: L('Draft.', 'مسودہ۔'),
      reviewStatus: 'DRAFT',
      translationStatus: 'TRANSLATION_PENDING',
      publicDisplayAllowed: false,
      featured: false,
      ...now,
    },
  ],

  recommendations: [
    rec('rec-carrier', 'ap-carrier-awareness', 'CREATE_EDUCATIONAL_RESOURCE', ['el-carrier-primary'],
      L('Create a plain-language carrier-status explainer', 'سادہ زبان میں کیریئر-حیثیت وضاحت نامہ بنائیں'),
      L('Shared Blood could create a bilingual carrier-status explainer clarifying that a carrier is usually healthy.', 'شیئرڈ بلڈ ایک دو لسانی کیریئر-حیثیت وضاحت نامہ بنا سکتا ہے جو واضح کرے کہ کیریئر عام طور پر صحت مند ہوتا ہے۔'),
      'SHARED_BLOOD', 'LOW_RESOURCE', 'NOT_EVALUATED', 'PROJECT_SUPPORTED'),
    rec('rec-testing', 'ap-testing-education', 'PROVIDE_TESTING_INFORMATION', ['el-testing-primary'],
      L('Provide neutral genetic-testing information', 'غیر جانبدار جینیاتی-جانچ معلومات فراہم کریں'),
      L('Educational programmes may benefit from neutral, voluntary testing information and result-interpretation education.', 'تعلیمی پروگرام غیر جانبدار، رضاکارانہ ٹیسٹنگ معلومات اور نتیجہ کی تعبیر کی تعلیم سے فائدہ اٹھا سکتے ہیں۔'),
      'HEALTHCARE_EDUCATION', 'MODERATE_RESOURCE', 'NOT_EVALUATED', 'PROJECT_SUPPORTED'),
    rec('rec-counselling', 'ap-counselling-awareness', 'PROVIDE_COUNSELLING_INFORMATION', ['el-counselling-context', 'el-counselling-lit'],
      L('Explain genetic counselling in resources', 'وسائل میں جینیاتی مشاورت کی وضاحت کریں'),
      L('Genetic-health materials could include a short, non-directive explanation of what genetic counselling offers.', 'جینیاتی صحت مواد میں اس کی مختصر، غیر ہدایتی وضاحت شامل ہو سکتی ہے کہ جینیاتی مشاورت کیا پیش کرتی ہے۔'),
      'HEALTHCARE_EDUCATION', 'LOW_RESOURCE', 'THEORETICALLY_RELEVANT', 'LITERATURE_SUPPORTED'),
    rec('rec-childcare', 'ap-childcare-training', 'INTEGRATE_TRAINING_CONTENT', ['el-childcare-primary', 'el-childcare-assess'],
      L('Offer a short childcare-worker learning booklet', 'ایک مختصر نگہداشتِ اطفال کارکن تعلیمی کتابچہ پیش کریں'),
      L('Childcare institutions could consider integrating a short bilingual booklet on recognising signs and escalating concerns.', 'نگہداشتِ اطفال ادارے علامات پہچاننے اور خدشات آگے بڑھانے پر ایک مختصر دو لسانی کتابچہ شامل کرنے پر غور کر سکتے ہیں۔'),
      'CHILDCARE_INSTITUTION', 'MODERATE_RESOURCE', 'PROJECT_PILOT_SUPPORTED', 'PROJECT_SUPPORTED'),
    rec('rec-symptom', 'ap-early-symptom', 'CREATE_EDUCATIONAL_RESOURCE', ['el-symptom-primary'],
      L('Create a recognise-not-diagnose symptom guide', 'پہچانیں-تشخیص-نہ-کریں علامت رہنما بنائیں'),
      L('A practical response may include a caregiver guide framed around when medical assessment may be appropriate.', 'ایک عملی جواب میں ایک نگہداشت کنندہ رہنما شامل ہو سکتا ہے جو اس کے گرد ترتیب دیا گیا ہو کہ طبی معائنہ کب مناسب ہو سکتا ہے۔'),
      'COMMUNITY_PROGRAMME', 'LOW_RESOURCE', 'NOT_EVALUATED', 'EXPLORATORY'),
    rec('rec-urdu', 'ap-urdu-resources', 'EXPAND_LANGUAGE_ACCESS', ['el-language-context'],
      L('Expand Urdu genetic-health materials', 'اردو جینیاتی صحت مواد کو بڑھائیں'),
      L('Educational institutions may benefit from expanding Urdu inheritance, carrier, and testing explanations.', 'تعلیمی ادارے اردو وراثت، کیریئر، اور ٹیسٹنگ وضاحتوں کو بڑھانے سے فائدہ اٹھا سکتے ہیں۔'),
      'EDUCATIONAL_INSTITUTION', 'MODERATE_RESOURCE', 'THEORETICALLY_RELEVANT', 'PROJECT_SUPPORTED'),
    rec('rec-community', 'ap-community-education', 'SUPPORT_COMMUNITY_EDUCATION', ['el-community-field', 'el-community-research'],
      L('Support respectful community awareness sessions', 'بامروت کمیونٹی آگاہی نشستوں کی حمایت کریں'),
      L('Community organisations could host non-stigmatizing, voluntary awareness sessions on inheritance and carrier awareness.', 'کمیونٹی تنظیمیں وراثت اور کیریئر آگاہی پر غیر بدنام کن، رضاکارانہ آگاہی نشستیں منعقد کر سکتی ہیں۔'),
      'COMMUNITY_PROGRAMME', 'MODERATE_RESOURCE', 'PROJECT_PILOT_SUPPORTED', 'MULTI_SOURCE_SUPPORTED'),
  ],

  stakeholders: [
    stakeholder('sh-health-educator', 'HEALTH_EDUCATOR', L('Health educators', 'صحت معلمین'),
      L('Health educators who could use or adapt clear genetic-health education materials.', 'صحت معلمین جو واضح جینیاتی صحت تعلیمی مواد استعمال یا ڈھال سکتے ہیں۔')),
    stakeholder('sh-public-health-comm', 'PUBLIC_HEALTH_COMMUNICATOR', L('Public-health communicators', 'صحتِ عامہ مبلغین'),
      L('Public-health communicators who could share accessible genetic-health information.', 'صحتِ عامہ مبلغین جو قابلِ رسائی جینیاتی صحت معلومات شیئر کر سکتے ہیں۔')),
    stakeholder('sh-childcare-org', 'CHILDCARE_ORGANIZATION', L('Childcare organisations', 'نگہداشتِ اطفال تنظیمیں'),
      L('Childcare organisations that may find practical awareness resources useful for their staff.', 'نگہداشتِ اطفال تنظیمیں جنہیں اپنے عملے کے لیے عملی آگاہی وسائل مفید لگ سکتے ہیں۔')),
    stakeholder('sh-genetic-counselling', 'GENETIC_COUNSELLING_SERVICE', L('Genetic counselling services', 'جینیاتی مشاورت خدمات'),
      L('Genetic counselling services that provide professional support referral pathways connect to.', 'جینیاتی مشاورت خدمات جو پیشہ ورانہ مدد فراہم کرتی ہیں اور جن سے ریفرل راستے جڑتے ہیں۔')),
    stakeholder('sh-educational-inst', 'EDUCATIONAL_INSTITUTION', L('Educational institutions', 'تعلیمی ادارے'),
      L('Educational institutions that may adopt or adapt bilingual genetic-health materials.', 'تعلیمی ادارے جو دو لسانی جینیاتی صحت مواد اپنا یا ڈھال سکتے ہیں۔')),
    stakeholder('sh-community-org', 'COMMUNITY_ORGANIZATION', L('Community organisations', 'کمیونٹی تنظیمیں'),
      L('Community organisations that could host respectful, voluntary awareness activities.', 'کمیونٹی تنظیمیں جو بامروت، رضاکارانہ آگاہی سرگرمیاں منعقد کر سکتی ہیں۔')),
  ],

  policyContexts: [
    {
      id: 'pc-genetic-education',
      title: L('Genetic-health education context', 'جینیاتی صحت تعلیم کا سیاق'),
      summary: L('Genetic-health education in Pakistan involves many institutions; Shared Blood contributes accessible educational materials.', 'پاکستان میں جینیاتی صحت کی تعلیم میں کئی ادارے شامل ہیں؛ شیئرڈ بلڈ قابلِ رسائی تعلیمی مواد میں حصہ ڈالتا ہے۔'),
      policyDomainIds: ['GENETIC_HEALTH_EDUCATION'],
      geographicScope: 'PROJECT_SAMPLE',
      institutionalContext: L('Multiple public-health, educational, and community institutions engage with genetic health.', 'متعدد صحتِ عامہ، تعلیمی، اور کمیونٹی ادارے جینیاتی صحت سے منسلک ہیں۔'),
      existingContextDescription: L('Shared Blood has not conducted a formal national policy review; this describes the context Shared Blood works within, not a complete national policy assessment.', 'شیئرڈ بلڈ نے کوئی باضابطہ قومی پالیسی جائزہ نہیں لیا؛ یہ اُس سیاق کو بیان کرتا ہے جس میں شیئرڈ بلڈ کام کرتا ہے، مکمل قومی پالیسی جائزہ نہیں۔'),
      referenceIds: ['who-genetics'],
      researchFindingIds: [],
      limitationIds: ['pl-legal', 'pl-policy-incomplete'],
      reviewStatus: 'APPROVED_FOR_PUBLICATION',
      publicDisplayAllowed: true,
    },
  ],

  policyGaps: [
    gap('pg-carrier', 'EVIDENCE_SUGGESTED_GAP', L('Carrier education may need strengthening', 'کیریئر تعلیم کو مضبوط کرنے کی ضرورت ہو سکتی ہے'),
      L('Survey evidence suggests, but does not confirm, that carrier education could be clearer.', 'سروے شواہد تجویز کرتے ہیں، مگر تصدیق نہیں کرتے، کہ کیریئر تعلیم واضح تر ہو سکتی ہے۔'),
      ['el-carrier-primary'], 'MULTI_CITY', 'UNVERIFIED', ['pl-convenience']),
    gap('pg-childcare', 'PROJECT_OBSERVED_GAP', L('Observed demand for childcare-worker resources', 'نگہداشتِ اطفال کارکن وسائل کی مشاہدہ شدہ طلب'),
      L('In documented Shared Blood activities, childcare workers valued practical resources. This is a project observation, not a national policy failure.', 'دستاویزی شیئرڈ بلڈ سرگرمیوں میں، نگہداشتِ اطفال کارکنوں نے عملی وسائل کو سراہا۔ یہ ایک منصوبہ مشاہدہ ہے، قومی پالیسی ناکامی نہیں۔'),
      ['el-childcare-primary'], 'ACTIVITY_LOCATION', 'DOCUMENTED', ['pl-field-context']),
    gap('pg-retention', 'RESEARCH_QUESTION', L('Does training produce lasting knowledge?', 'کیا تربیت دیرپا علم پیدا کرتی ہے؟'),
      L('Whether educational sessions produce lasting knowledge change remains an open research question, not a confirmed gap.', 'آیا تعلیمی نشستیں دیرپا علمی تبدیلی پیدا کرتی ہیں، یہ ایک کھلا تحقیقی سوال ہے، تصدیق شدہ خلا نہیں۔'),
      ['el-childcare-assess'], 'ACTIVITY_LOCATION', 'UNVERIFIED', ['pl-intervention']),
  ],

  outcomes: [
    outcome('ao-brief-shared', 'ap-carrier-awareness', 'BRIEF_SHARED',
      L('A carrier-awareness advocacy brief was shared with a health-education contact.', 'ایک کیریئر-آگاہی وکالت بریف صحت-تعلیم رابطے کے ساتھ شیئر کیا گیا۔')),
    outcome('ao-resource-adopted', 'ap-urdu-resources', 'RESOURCE_ADOPTED',
      L('An Urdu genetic-health explainer was adopted for a Shared Blood educational activity.', 'ایک اردو جینیاتی صحت وضاحت نامہ شیئرڈ بلڈ تعلیمی سرگرمی کے لیے اپنایا گیا۔')),
  ],

  engagements: [
    {
      id: 'ie-brief-sharing',
      stakeholderId: 'sh-health-educator',
      engagementType: 'BRIEF_SHARING',
      date: '2026-04-18',
      purpose: L('Share the carrier-awareness advocacy brief for feedback.', 'رائے کے لیے کیریئر-آگاہی وکالت بریف شیئر کرنا۔'),
      relatedPriorityIds: ['ap-carrier-awareness'],
      relatedBriefIds: ['brief-carrier'],
      outcomeIds: ['ao-brief-shared'],
      publicSummary: L('Shared Blood shared its carrier-awareness brief with a health educator and invited feedback.', 'شیئرڈ بلڈ نے اپنا کیریئر-آگاہی بریف ایک صحت معلم کے ساتھ شیئر کیا اور رائے طلب کی۔'),
      evidenceReference: L('Advocacy brief brief-carrier v1.0.', 'وکالت بریف brief-carrier v1.0۔'),
      reviewStatus: 'APPROVED_FOR_PUBLICATION',
      publicDisplayAllowed: true,
    },
  ],

  timeline: [
    timelineEvent('te-finding', 'RESEARCH_FINDING_PUBLISHED', '2026-04-12', L('Survey findings published', 'سروے نتائج شائع'),
      L('Shared Blood published reviewed awareness survey findings.', 'شیئرڈ بلڈ نے جائزہ شدہ آگاہی سروے نتائج شائع کیے۔'), []),
    timelineEvent('te-priority', 'PRIORITY_ADDED', '2026-04-16', L('Carrier-awareness priority added', 'کیریئر-آگاہی ترجیح شامل'),
      L('Shared Blood added a carrier-awareness advocacy priority.', 'شیئرڈ بلڈ نے ایک کیریئر-آگاہی وکالت ترجیح شامل کی۔'), ['ap-carrier-awareness']),
    timelineEvent('te-brief', 'BRIEF_PUBLISHED', '2026-04-19', L('Carrier-awareness brief published', 'کیریئر-آگاہی بریف شائع'),
      L('Shared Blood published a carrier-awareness advocacy brief.', 'شیئرڈ بلڈ نے ایک کیریئر-آگاہی وکالت بریف شائع کیا۔'), ['ap-carrier-awareness']),
  ],

  traces: [
    trace('ap-carrier-awareness', ['pi-carrier-gap'], ['rf-awareness-gap', 'rf-mixed'], ['el-carrier-primary', 'el-carrier-context'], ['rec-carrier'], ['brief-carrier']),
    trace('ap-testing-education', ['pi-testing-gap'], ['rf-testing-openness'], ['el-testing-primary'], ['rec-testing'], ['brief-carrier']),
    trace('ap-childcare-training', ['pi-childcare-gap'], ['rf-training-immediate', 'rf-fieldwork-reach'], ['el-childcare-primary', 'el-childcare-field'], ['rec-childcare'], ['brief-childcare']),
    trace('ap-community-education', ['pi-community-gap'], ['rf-fieldwork-reach', 'rf-consanguinity-comparison'], ['el-community-field', 'el-community-research'], ['rec-community'], []),
  ],

  limitations: [
    limitation('pl-convenience', 'NON_REPRESENTATIVE_SAMPLE', L('Non-representative survey sample', 'غیر نمائندہ سروے نمونہ'),
      L('The survey used a convenience sample and does not represent Pakistan or any city.', 'سروے نے آسائشی نمونہ استعمال کیا اور پاکستان یا کسی شہر کی نمائندگی نہیں کرتا۔'),
      'HIGH', ['ap-carrier-awareness', 'ap-testing-education', 'ap-urdu-resources', 'ap-community-education']),
    limitation('pl-no-outcome', 'NO_OUTCOME_EVALUATION', L('No outcome evaluation', 'کوئی نتیجہ جائزہ نہیں'),
      L('Shared Blood has not evaluated long-term health or knowledge outcomes of these educational recommendations.', 'شیئرڈ بلڈ نے اِن تعلیمی سفارشات کے طویل مدتی صحت یا علم کے نتائج کا جائزہ نہیں لیا۔'),
      'HIGH', ['ap-carrier-awareness', 'ap-testing-education', 'ap-urdu-resources']),
    limitation('pl-intervention', 'LIMITED_INTERVENTION_EVIDENCE', L('Limited intervention evidence', 'محدود مداخلت شواہد'),
      L('Evidence of a problem is not evidence that a specific educational intervention is effective.', 'کسی مسئلے کے شواہد اس بات کے شواہد نہیں کہ کوئی مخصوص تعلیمی مداخلت مؤثر ہے۔'),
      'HIGH', ['ap-childcare-training', 'ap-early-symptom']),
    limitation('pl-field-context', 'FIELDWORK_CONTEXT', L('Fieldwork context', 'فیلڈ ورک سیاق'),
      L('Field observations are specific to the sessions where they were made and are not national measures.', 'میدانی مشاہدات اُن نشستوں کے لیے مخصوص ہیں جہاں کیے گئے اور قومی پیمائشیں نہیں۔'),
      'MODERATE', ['ap-childcare-training', 'ap-early-symptom', 'ap-community-education']),
    limitation('pl-legal', 'LEGAL_CONTEXT_NOT_REVIEWED', L('Legal context not reviewed', 'قانونی سیاق کا جائزہ نہیں لیا گیا'),
      L('Shared Blood has not conducted legal research; nothing here states what is legally required or prohibited.', 'شیئرڈ بلڈ نے کوئی قانونی تحقیق نہیں کی؛ یہاں کچھ بھی یہ نہیں بتاتا کہ قانوناً کیا ضروری یا ممنوع ہے۔'),
      'MODERATE', []),
    limitation('pl-policy-incomplete', 'POLICY_CONTEXT_INCOMPLETE', L('Policy context incomplete', 'پالیسی سیاق نامکمل'),
      L('Shared Blood has not completed a national policy landscape review.', 'شیئرڈ بلڈ نے کوئی قومی پالیسی منظرنامہ جائزہ مکمل نہیں کیا۔'),
      'MODERATE', []),
  ],

  briefs: [
    {
      id: 'brief-carrier',
      title: L('Shared Blood Advocacy Brief: Carrier & Testing Education', 'شیئرڈ بلڈ وکالت بریف: کیریئر و ٹیسٹنگ تعلیم'),
      subtitle: L('Clearer, voluntary genetic-health education based on survey evidence', 'سروے شواہد پر مبنی واضح تر، رضاکارانہ جینیاتی صحت تعلیم'),
      briefType: 'ADVOCACY_BRIEF',
      publicationDate: '2026-04-19',
      version: '1.0',
      policyIssueIds: ['pi-carrier-gap', 'pi-testing-gap'],
      advocacyPriorityIds: ['ap-carrier-awareness', 'ap-testing-education'],
      recommendationIds: ['rec-carrier', 'rec-testing'],
      stakeholderIds: ['sh-health-educator', 'sh-genetic-counselling'],
      evidenceLinkIds: ['el-carrier-primary', 'el-testing-primary'],
      limitationIds: ['pl-convenience', 'pl-no-outcome'],
      executiveSummary: L('Based on a convenience survey, Shared Blood advocates for clearer, voluntary carrier and testing education. This brief describes educational priorities, not national policy.', 'ایک آسائشی سروے کی بنیاد پر، شیئرڈ بلڈ واضح تر، رضاکارانہ کیریئر اور ٹیسٹنگ تعلیم کی وکالت کرتا ہے۔ یہ بریف تعلیمی ترجیحات بیان کرتا ہے، قومی پالیسی نہیں۔'),
      issueOverview: L('Survey respondents often misunderstood carrier status and were open to testing information.', 'سروے جواب دہندگان اکثر کیریئر حیثیت کو غلط سمجھتے تھے اور ٹیسٹنگ معلومات کے لیے کھلے تھے۔'),
      evidenceSummary: L('Two reviewed research findings from a convenience awareness survey support discussing clearer education.', 'ایک آسائشی آگاہی سروے سے دو جائزہ شدہ تحقیقی نتائج واضح تر تعلیم پر بحث کی حمایت کرتے ہیں۔'),
      policyContext: L('Shared Blood contributes educational materials within a broader genetic-health context.', 'شیئرڈ بلڈ ایک وسیع تر جینیاتی صحت سیاق میں تعلیمی مواد میں حصہ ڈالتا ہے۔'),
      recommendationsSummary: L('Create a plain-language carrier explainer and provide neutral, voluntary testing information.', 'سادہ زبان میں کیریئر وضاحت نامہ بنائیں اور غیر جانبدار، رضاکارانہ ٹیسٹنگ معلومات فراہم کریں۔'),
      implementationConsiderations: L('These are low-to-moderate resource educational actions requiring medical review of content.', 'یہ کم-تا-معتدل وسائل کے تعلیمی اقدامات ہیں جن کے مواد کے طبی جائزے کی ضرورت ہے۔'),
      ethicalConsiderations: L('Education remains voluntary and non-coercive; carrier status is not framed as disease.', 'تعلیم رضاکارانہ اور غیر جبری رہتی ہے؛ کیریئر حیثیت کو بیماری کے طور پر پیش نہیں کیا جاتا۔'),
      limitationsSummary: L('The survey is not nationally representative and no long-term outcomes were measured.', 'سروے قومی سطح پر نمائندہ نہیں اور کوئی طویل مدتی نتائج نہیں ماپے گئے۔'),
      conclusion: L('Shared Blood advocates for clearer, voluntary carrier and testing education, bounded by the survey\'s limitations.', 'شیئرڈ بلڈ واضح تر، رضاکارانہ کیریئر اور ٹیسٹنگ تعلیم کی وکالت کرتا ہے، سروے کی حدود سے محدود۔'),
      referenceIds: ['medlineplus-carrier', 'who-consanguinity'],
      downloadAssetIds: ['dl-carrier-pdf'],
      evidenceReferences: [
        { briefId: 'brief-carrier', briefVersion: '1.0', sourceId: 'rf-awareness-gap', sourceType: 'RESEARCH_FINDING', sourceVersion: 'sample-2026.1', dateReviewed: '2026-04-18' },
        { briefId: 'brief-carrier', briefVersion: '1.0', sourceId: 'rf-testing-openness', sourceType: 'RESEARCH_FINDING', sourceVersion: 'sample-2026.1', dateReviewed: '2026-04-18' },
      ],
      translationStatus: 'BILINGUAL_APPROVED',
      reviewStatus: 'APPROVED_FOR_PUBLICATION',
      publicDisplayAllowed: true,
      featured: true,
      featuredOrder: 1,
    },
    {
      id: 'brief-childcare',
      title: L('Shared Blood Education Priority Brief: Childcare-Worker Resources', 'شیئرڈ بلڈ تعلیمی ترجیح بریف: نگہداشتِ اطفال کارکن وسائل'),
      subtitle: L('Practical, bounded early-symptom awareness for childcare workers', 'نگہداشتِ اطفال کارکنوں کے لیے عملی، محدود ابتدائی علامت آگاہی'),
      briefType: 'EDUCATION_PRIORITY_BRIEF',
      publicationDate: '2026-04-20',
      version: '1.0',
      policyIssueIds: ['pi-childcare-gap', 'pi-symptom-gap'],
      advocacyPriorityIds: ['ap-childcare-training', 'ap-early-symptom'],
      recommendationIds: ['rec-childcare', 'rec-symptom'],
      stakeholderIds: ['sh-childcare-org'],
      evidenceLinkIds: ['el-childcare-primary'],
      limitationIds: ['pl-intervention', 'pl-field-context'],
      executiveSummary: L('Shared Blood advocates for practical, clearly-bounded genetic-health and symptom-awareness resources for childcare workers, who are not diagnosticians.', 'شیئرڈ بلڈ نگہداشتِ اطفال کارکنوں کے لیے عملی، واضح طور پر محدود جینیاتی صحت اور علامت-آگاہی وسائل کی وکالت کرتا ہے، جو تشخیص کار نہیں ہیں۔'),
      issueOverview: L('A documented training showed immediate awareness gains; caregivers asked how to recognise concerning signs.', 'ایک دستاویزی تربیت نے فوری آگاہی میں اضافہ دکھایا؛ نگہداشت کنندگان نے پوچھا کہ تشویشناک علامات کیسے پہچانیں۔'),
      evidenceSummary: L('A training-assessment finding and a contextual field observation support discussing practical resources.', 'ایک تربیتی-تشخیص نتیجہ اور ایک سیاق و سباق کا میدانی مشاہدہ عملی وسائل پر بحث کی حمایت کرتے ہیں۔'),
      policyContext: L('Childcare institutions may adopt practical awareness content within their own governance.', 'نگہداشتِ اطفال ادارے اپنی حکمرانی کے اندر عملی آگاہی مواد اپنا سکتے ہیں۔'),
      recommendationsSummary: L('Offer a short bilingual booklet on recognising signs and escalating concerns.', 'علامات پہچاننے اور خدشات آگے بڑھانے پر ایک مختصر دو لسانی کتابچہ پیش کریں۔'),
      implementationConsiderations: L('Requires medical review, bilingual production, and simple escalation guidance.', 'طبی جائزہ، دو لسانی تیاری، اور سادہ ایسکلیشن رہنمائی درکار۔'),
      ethicalConsiderations: L('Workers notice and escalate; they do not diagnose. Materials avoid alarming language.', 'کارکن محسوس کرتے اور آگے بڑھاتے ہیں؛ تشخیص نہیں کرتے۔ مواد خوفناک زبان سے گریز کرتا ہے۔'),
      limitationsSummary: L('Intervention effectiveness is not established, and observations are contextual to specific sessions.', 'مداخلت کی تاثیر قائم نہیں، اور مشاہدات مخصوص نشستوں کے سیاق میں ہیں۔'),
      conclusion: L('Practical childcare-worker resources are a reasonable, clearly-bounded educational priority.', 'عملی نگہداشتِ اطفال کارکن وسائل ایک معقول، واضح طور پر محدود تعلیمی ترجیح ہیں۔'),
      referenceIds: ['medlineplus-inheritance'],
      downloadAssetIds: [],
      evidenceReferences: [
        { briefId: 'brief-childcare', briefVersion: '1.0', sourceId: 'rf-training-immediate', sourceType: 'RESEARCH_FINDING', sourceVersion: 'sample-2026.1', dateReviewed: '2026-04-19' },
      ],
      translationStatus: 'BILINGUAL_APPROVED',
      reviewStatus: 'APPROVED_FOR_PUBLICATION',
      publicDisplayAllowed: true,
      featured: false,
    },
  ],

  downloadAssets: [
    {
      id: 'dl-carrier-pdf',
      briefId: 'brief-carrier',
      briefVersion: '1.0',
      assetType: 'PDF',
      language: 'en',
      fileReference: '/briefs/sample-carrier-advocacy-brief.pdf',
      fileSize: 320000,
      publicationDate: '2026-04-19',
      reviewStatus: 'APPROVED_FOR_PUBLICATION',
      publicDisplayAllowed: true,
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Factory helpers (keep the dataset above readable)
 * ------------------------------------------------------------------ */

function issue(
  id: string,
  issueType: PolicyAdvocacyDataset['policyIssues'][number]['issueType'],
  policyDomainIds: PolicyAdvocacyDataset['policyIssues'][number]['policyDomainIds'],
  title: LocalizedText,
  summary: LocalizedText,
  researchFindingIds: string[],
  geographicScope: PolicyAdvocacyDataset['policyIssues'][number]['geographicScope'],
  limitationIds: string[],
): PolicyAdvocacyDataset['policyIssues'][number] {
  return {
    id,
    title,
    summary,
    issueType,
    policyDomainIds,
    researchFindingIds,
    referenceIds: [],
    fieldworkFindingIds: [],
    surveyFindingIds: [],
    problemStatement: summary,
    publicHealthContext: L(
      'This is an educational and public-health communication issue, framed as a proposed educational response rather than a proven national diagnosis.',
      'یہ ایک تعلیمی اور صحتِ عامہ ابلاغ کا مسئلہ ہے، جسے ثابت شدہ قومی تشخیص کے بجائے تجویز کردہ تعلیمی جواب کے طور پر پیش کیا گیا ہے۔',
    ),
    affectedEducationalContext: L(
      'Relevant to Shared Blood genetic-health education audiences.',
      'شیئرڈ بلڈ جینیاتی صحت تعلیم کے سامعین سے متعلق۔',
    ),
    geographicScope,
    timeScope,
    evidenceStrength: 'SUGGESTIVE',
    limitationIds,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    translationStatus: 'BILINGUAL_APPROVED',
    publicDisplayAllowed: true,
    ...now,
  };
}

function link(
  id: string,
  policyIssueId: string,
  sourceType: PolicyAdvocacyDataset['evidenceLinks'][number]['sourceType'],
  sourceId: string,
  evidenceRole: PolicyAdvocacyDataset['evidenceLinks'][number]['evidenceRole'],
  scopeCompatibility: PolicyAdvocacyDataset['evidenceLinks'][number]['scopeCompatibility'],
  limitationIds: string[],
): PolicyAdvocacyDataset['evidenceLinks'][number] {
  return { id, policyIssueId, sourceType, sourceId, evidenceRole, scopeCompatibility, limitationIds, reviewStatus: 'APPROVED_FOR_PUBLICATION' };
}

function priority(
  id: string,
  priorityType: PolicyAdvocacyDataset['advocacyPriorities'][number]['priorityType'],
  policyIssueIds: string[],
  policyDomainIds: PolicyAdvocacyDataset['advocacyPriorities'][number]['policyDomainIds'],
  evidenceLinkIds: string[],
  title: LocalizedText,
  summary: LocalizedText,
  recommendedAction: LocalizedText,
  doesNotClaim: LocalizedText,
  actionLevel: PolicyAdvocacyDataset['advocacyPriorities'][number]['actionLevel'],
  stakeholderIds: string[],
  limitationIds: string[],
  featured: boolean,
  featuredOrder?: number,
): PolicyAdvocacyDataset['advocacyPriorities'][number] {
  return {
    id,
    title,
    summary,
    policyIssueIds,
    policyDomainIds,
    evidenceLinkIds,
    priorityType,
    recommendedAction,
    actionLevel,
    stakeholderIds,
    rationale: summary,
    educationalPurpose: L(
      'The purpose is genetic-health education, awareness, and informed voluntary decision-making.',
      'مقصد جینیاتی صحت کی تعلیم، آگاہی، اور باخبر رضاکارانہ فیصلہ سازی ہے۔',
    ),
    implementationConsiderations: L(
      'Implementation requires medical review of content, bilingual production, and appropriate accessibility.',
      'نفاذ کے لیے مواد کا طبی جائزہ، دو لسانی تیاری، اور مناسب رسائی درکار ہے۔',
    ),
    ethicalConsiderations: L(
      'Advocacy remains voluntary, non-coercive, non-stigmatizing, and politically neutral.',
      'وکالت رضاکارانہ، غیر جبری، غیر بدنام کن، اور سیاسی طور پر غیر جانبدار رہتی ہے۔',
    ),
    limitationIds,
    doesNotClaim,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    translationStatus: 'BILINGUAL_APPROVED',
    publicDisplayAllowed: true,
    featured,
    featuredOrder,
    ...now,
  };
}

function rec(
  id: string,
  advocacyPriorityId: string,
  actionType: PolicyAdvocacyDataset['recommendations'][number]['actionType'],
  evidenceLinkIds: string[],
  title: LocalizedText,
  actionStatement: LocalizedText,
  implementationLevel: PolicyAdvocacyDataset['recommendations'][number]['implementationLevel'],
  resourceConsiderations: PolicyAdvocacyDataset['recommendations'][number]['resourceConsiderations'],
  interventionEvidenceStatus: PolicyAdvocacyDataset['recommendations'][number]['interventionEvidenceStatus'],
  recommendationStrength: PolicyAdvocacyDataset['recommendations'][number]['recommendationStrength'],
): PolicyAdvocacyDataset['recommendations'][number] {
  return {
    id,
    advocacyPriorityId,
    title,
    actionStatement,
    actionType,
    targetStakeholderIds: [],
    evidenceLinkIds,
    implementationLevel,
    implementationComplexity: resourceConsiderations,
    resourceConsiderations,
    interventionEvidenceStatus,
    recommendationStrength,
    ethicalConsiderations: L('Voluntary and educational; requires content review.', 'رضاکارانہ اور تعلیمی؛ مواد کے جائزے کی ضرورت۔'),
    limitationIds: [],
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    publicDisplayAllowed: true,
  };
}

function stakeholder(
  id: string,
  stakeholderType: PolicyAdvocacyDataset['stakeholders'][number]['stakeholderType'],
  name: LocalizedText,
  recommendedRole: LocalizedText,
): PolicyAdvocacyDataset['stakeholders'][number] {
  return {
    id,
    name,
    stakeholderType,
    description: recommendedRole,
    jurisdiction: L('Institutional role; jurisdiction not assessed.', 'ادارہ جاتی کردار؛ دائرہ اختیار کا جائزہ نہیں لیا گیا۔'),
    recommendedRole,
    contactDisplayAllowed: false,
    externalReferenceIds: [],
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    publicDisplayAllowed: true,
  };
}

function gap(
  id: string,
  gapType: PolicyAdvocacyDataset['policyGaps'][number]['gapType'],
  title: LocalizedText,
  description: LocalizedText,
  evidenceLinkIds: string[],
  scope: PolicyAdvocacyDataset['policyGaps'][number]['scope'],
  verificationStatus: PolicyAdvocacyDataset['policyGaps'][number]['verificationStatus'],
  limitationIds: string[],
): PolicyAdvocacyDataset['policyGaps'][number] {
  return {
    id,
    title,
    gapType,
    description,
    policyContextIds: ['pc-genetic-education'],
    evidenceLinkIds,
    scope,
    verificationStatus,
    limitationIds,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    publicDisplayAllowed: true,
  };
}

function outcome(
  id: string,
  advocacyPriorityId: string,
  outcomeType: PolicyAdvocacyDataset['outcomes'][number]['outcomeType'],
  description: LocalizedText,
): PolicyAdvocacyDataset['outcomes'][number] {
  return {
    id,
    advocacyPriorityId,
    outcomeType,
    description,
    evidenceSourceIds: [],
    date: '2026-04-18',
    institutionIds: [],
    verificationStatus: 'DOCUMENTED',
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
    publicDisplayAllowed: true,
  };
}

function timelineEvent(
  id: string,
  eventType: PolicyAdvocacyDataset['timeline'][number]['eventType'],
  date: string,
  title: LocalizedText,
  description: LocalizedText,
  relatedPriorityIds: string[],
): PolicyAdvocacyDataset['timeline'][number] {
  return { id, eventType, date, title, description, relatedPriorityIds, relatedBriefIds: [], publicDisplayAllowed: true };
}

function trace(
  advocacyPriorityId: string,
  policyIssueIds: string[],
  researchFindingIds: string[],
  evidenceLinkIds: string[],
  recommendationIds: string[],
  briefIds: string[],
): PolicyAdvocacyDataset['traces'][number] {
  return { advocacyPriorityId, policyIssueIds, researchFindingIds, evidenceLinkIds, recommendationIds, briefIds };
}

function limitation(
  id: string,
  limitationType: PolicyAdvocacyDataset['limitations'][number]['limitationType'],
  title: LocalizedText,
  description: LocalizedText,
  severity: PolicyAdvocacyDataset['limitations'][number]['severity'],
  affectedPriorityIds: string[],
): PolicyAdvocacyDataset['limitations'][number] {
  return {
    id,
    title,
    description,
    limitationType,
    affectedPolicyIssueIds: [],
    affectedPriorityIds,
    affectedRecommendationIds: [],
    affectedBriefIds: [],
    severity,
    publicDisplayRequired: true,
    reviewStatus: 'APPROVED_FOR_PUBLICATION',
  };
}

export const SAMPLE_POLICY_PRIORITIES = SAMPLE_POLICY_DATASET.advocacyPriorities;
