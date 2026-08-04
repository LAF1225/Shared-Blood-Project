import type { LocalizedText } from '@/types';
import type {
  AccessPolicyRule,
  ConsentDefinition,
  DataFieldRule,
  DataPurposeDefinition,
  GovernancePrincipleDef,
  ProhibitedClaimRule,
  ResearchActivityRule,
  RetentionRule,
} from '../types';

/**
 * The governance configuration — Shared Blood's own, approved governance rules
 * (spec §4–§33). This is REAL configuration (the single source of truth for how
 * the platform governs itself), not fabricated evidence, so it ships populated.
 * The pure resolvers read from it; the public governance pages summarise it.
 */

const L = (en: string, ur: string): LocalizedText => ({ en, ur });

/** Governance principles (spec §4). */
export const GOVERNANCE_PRINCIPLES: readonly GovernancePrincipleDef[] = [
  { id: 'PURPOSE_LIMITATION', title: L('Purpose limitation', 'مقصد کی حد'), description: L('Every collection resolves to an approved purpose; no purpose means no collection.', 'ہر جمع آوری ایک منظور شدہ مقصد سے جُڑتی ہے؛ کوئی مقصد نہیں تو کوئی جمع آوری نہیں۔') },
  { id: 'DATA_MINIMIZATION', title: L('Data minimization', 'ڈیٹا کی کم سے کم آوری'), description: L('We collect the least data needed and prefer anonymous or aggregate records.', 'ہم صرف ضروری کم سے کم ڈیٹا جمع کرتے ہیں اور گمنام یا مجموعی ریکارڈز کو ترجیح دیتے ہیں۔') },
  { id: 'INFORMED_PARTICIPATION', title: L('Informed participation', 'باخبر شرکت'), description: L('Participants are told the purpose, what is collected, and how it is used.', 'شرکاء کو مقصد، کیا جمع کیا جاتا ہے، اور اس کا استعمال بتایا جاتا ہے۔') },
  { id: 'VOLUNTARY_PARTICIPATION', title: L('Voluntary participation', 'رضاکارانہ شرکت'), description: L('Participation is voluntary; recording and publication are never bundled into one required choice.', 'شرکت رضاکارانہ ہے؛ ریکارڈنگ اور اشاعت کبھی ایک لازمی انتخاب میں یکجا نہیں کی جاتیں۔') },
  { id: 'ACCESS_RESTRICTION', title: L('Access restriction', 'رسائی کی پابندی'), description: L('Access follows least privilege by role and data sensitivity.', 'رسائی کردار اور ڈیٹا کی حساسیت کے مطابق کم سے کم اختیار پر مبنی ہے۔') },
  { id: 'DATA_SEPARATION', title: L('Data separation', 'ڈیٹا کی علیحدگی'), description: L('Contact data is kept separate from research responses; email is never a participant ID.', 'رابطہ ڈیٹا تحقیقی جوابات سے الگ رکھا جاتا ہے؛ ای میل کبھی شریک شناخت نہیں۔') },
  { id: 'PUBLICATION_REVIEW', title: L('Publication review', 'اشاعت کا جائزہ'), description: L('Public display permission alone is not enough; required review gates must pass first.', 'صرف عوامی نمائش کی اجازت کافی نہیں؛ پہلے مطلوبہ جائزہ مراحل پاس ہونے چاہئیں۔') },
  { id: 'NON_STIGMATIZATION', title: L('Non-stigmatization', 'بدنامی سے گریز'), description: L('We never shame families or communities or use eugenic or genetic-purity language.', 'ہم کبھی خاندانوں یا برادریوں کو شرمندہ نہیں کرتے اور نہ ہی نسل پرستانہ زبان استعمال کرتے ہیں۔') },
  { id: 'VULNERABLE_POPULATION_PROTECTION', title: L('Vulnerable-population protection', 'کمزور آبادی کا تحفظ'), description: L('Children, infants, and orphanage activities receive heightened review.', 'بچے، شیرخوار، اور یتیم خانہ سرگرمیاں اضافی جائزہ حاصل کرتی ہیں۔') },
  { id: 'GENETIC_INFORMATION_CAUTION', title: L('Genetic-information caution', 'جینیاتی معلومات میں احتیاط'), description: L('Genetic information is highly sensitive; Version 1 does not collect genetic test data.', 'جینیاتی معلومات انتہائی حساس ہیں؛ ورژن 1 جینیاتی ٹیسٹ ڈیٹا جمع نہیں کرتا۔') },
  { id: 'RESEARCH_TRANSPARENCY', title: L('Research transparency', 'تحقیقی شفافیت'), description: L('We describe how findings are produced and reviewed.', 'ہم بیان کرتے ہیں کہ نتائج کیسے تیار اور جائزہ لیے جاتے ہیں۔') },
  { id: 'LIMITATION_DISCLOSURE', title: L('Limitation disclosure', 'حدود کا اظہار'), description: L('Findings are published with their limitations, never hidden.', 'نتائج اپنی حدود کے ساتھ شائع کیے جاتے ہیں، کبھی چھپائے نہیں جاتے۔') },
  { id: 'RETENTION_LIMITATION', title: L('Retention limitation', 'برقراری کی حد'), description: L('Data is kept only while a purpose justifies it; "may be useful later" is not a justification.', 'ڈیٹا صرف اُس وقت تک رکھا جاتا ہے جب تک کوئی مقصد اسے جواز دے؛ "شاید بعد میں مفید ہو" کوئی جواز نہیں۔') },
  { id: 'DELETION_GOVERNANCE', title: L('Deletion governance', 'حذف کی نگرانی'), description: L('Deletion is real and verifiable; hiding a UI row is not deletion.', 'حذف حقیقی اور قابلِ تصدیق ہے؛ UI قطار چھپانا حذف نہیں۔') },
  { id: 'INCIDENT_DOCUMENTATION', title: L('Incident documentation', 'واقعے کی دستاویز'), description: L('Governance incidents are documented, corrected, and reviewed.', 'نگرانی کے واقعات دستاویز، درست، اور جائزہ کیے جاتے ہیں۔') },
  { id: 'HUMAN_REVIEW', title: L('Human review', 'انسانی جائزہ'), description: L('Ethics and publication decisions require human review; nothing is auto-approved.', 'اخلاقیات اور اشاعت کے فیصلے انسانی جائزہ طلب کرتے ہیں؛ کچھ بھی خودکار منظور نہیں ہوتا۔') },
];

/** Approved data purposes (spec §5). No generic FUTURE_USE. */
export const DATA_PURPOSES: readonly DataPurposeDefinition[] = [
  { id: 'SURVEY_RESEARCH', title: L('Survey research', 'سروے تحقیق'), description: L('Anonymous public-awareness survey research.', 'گمنام عوامی آگاہی سروے تحقیق۔'), defaultSensitivity: 'SENSITIVE', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'FIELDWORK_DOCUMENTATION', title: L('Fieldwork documentation', 'فیلڈ ورک دستاویز'), description: L('Documentation of community education activities.', 'کمیونٹی تعلیمی سرگرمیوں کی دستاویز۔'), defaultSensitivity: 'SENSITIVE', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'TRAINING_ASSESSMENT', title: L('Training assessment', 'تربیتی تشخیص'), description: L('Anonymous aggregate pre/post awareness assessment.', 'گمنام مجموعی قبل/بعد آگاہی تشخیص۔'), defaultSensitivity: 'CONFIDENTIAL', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'AUDIO_STORY_PUBLICATION', title: L('Audio-story publication', 'آڈیو کہانی اشاعت'), description: L('Publication of consented audio perspectives; voice may be identifying.', 'رضامندی شدہ آڈیو تناظرات کی اشاعت؛ آواز شناخت کر سکتی ہے۔'), defaultSensitivity: 'HIGHLY_SENSITIVE', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'DOCTOR_PERSPECTIVE_PUBLICATION', title: L('Doctor-perspective publication', 'ڈاکٹر تناظر اشاعت'), description: L('Publication of consented professional perspectives.', 'رضامندی شدہ پیشہ ورانہ تناظرات کی اشاعت۔'), defaultSensitivity: 'CONFIDENTIAL', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'WEBSITE_FUNCTIONALITY', title: L('Website functionality', 'ویب سائٹ فعالیت'), description: L('Transient state needed for the website to work.', 'ویب سائٹ کے کام کے لیے درکار عارضی حالت۔'), defaultSensitivity: 'INTERNAL', requiresConsent: false, secondaryUseRequiresReview: false },
  { id: 'AGGREGATE_PRODUCT_ANALYTICS', title: L('Aggregate product analytics', 'مجموعی مصنوعہ تجزیات'), description: L('Privacy-minimized aggregate usage events.', 'رازداری کے لحاظ سے محدود مجموعی استعمال واقعات۔'), defaultSensitivity: 'INTERNAL', requiresConsent: false, secondaryUseRequiresReview: true },
  { id: 'CONTACT_RESPONSE', title: L('Contact response', 'رابطہ جواب'), description: L('Responding to a message a person chose to send.', 'کسی پیغام کا جواب جو کسی شخص نے بھیجنے کا انتخاب کیا۔'), defaultSensitivity: 'CONFIDENTIAL', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'INSTITUTIONAL_ENGAGEMENT', title: L('Institutional engagement', 'ادارہ جاتی روابط'), description: L('Coordinating with institutions about educational work.', 'تعلیمی کام کے بارے میں اداروں سے ہم آہنگی۔'), defaultSensitivity: 'CONFIDENTIAL', requiresConsent: true, secondaryUseRequiresReview: true },
  { id: 'RESEARCH_PUBLICATION', title: L('Research publication', 'تحقیقی اشاعت'), description: L('Publishing approved aggregate research findings.', 'منظور شدہ مجموعی تحقیقی نتائج شائع کرنا۔'), defaultSensitivity: 'PUBLIC', requiresConsent: false, secondaryUseRequiresReview: false },
  { id: 'POLICY_PUBLICATION', title: L('Policy publication', 'پالیسی اشاعت'), description: L('Publishing approved advocacy priorities and briefs.', 'منظور شدہ وکالت ترجیحات اور بریفس شائع کرنا۔'), defaultSensitivity: 'PUBLIC', requiresConsent: false, secondaryUseRequiresReview: false },
  { id: 'ACCESSIBILITY_PREFERENCE', title: L('Accessibility preference', 'رسائی ترجیح'), description: L('Non-sensitive interface accessibility preference.', 'غیر حساس انٹرفیس رسائی ترجیح۔'), defaultSensitivity: 'INTERNAL', requiresConsent: false, secondaryUseRequiresReview: false },
  { id: 'LOCALIZATION_PREFERENCE', title: L('Localization preference', 'مقامی کاری ترجیح'), description: L('Language preference (English or Urdu).', 'زبان کی ترجیح (انگریزی یا اردو)۔'), defaultSensitivity: 'INTERNAL', requiresConsent: false, secondaryUseRequiresReview: false },
];

/** Field minimization rules (spec §6/§7/§8/§18/§30). PROHIBITED fields are never
 * collected in Version 1. */
export const DATA_FIELD_RULES: readonly DataFieldRule[] = [
  { field: 'cnic', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('National identity data is not required for any Version 1 activity.', 'قومی شناختی ڈیٹا کسی ورژن 1 سرگرمی کے لیے درکار نہیں۔') },
  { field: 'b_form', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('National identity data is not required.', 'قومی شناختی ڈیٹا درکار نہیں۔') },
  { field: 'passport_number', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('National identity data is not required.', 'قومی شناختی ڈیٹا درکار نہیں۔') },
  { field: 'dna_sequence', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Version 1 does not collect DNA or raw genetic data.', 'ورژن 1 ڈی این اے یا خام جینیاتی ڈیٹا جمع نہیں کرتا۔') },
  { field: 'vcf_file', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Variant files are genetic information and are not collected.', 'ویریئنٹ فائلیں جینیاتی معلومات ہیں اور جمع نہیں کی جاتیں۔') },
  { field: 'genetic_test_report', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Genetic test reports are not collected.', 'جینیاتی ٹیسٹ رپورٹس جمع نہیں کی جاتیں۔') },
  { field: 'carrier_certificate', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Carrier certificates are genetic documents and are not collected.', 'کیریئر سرٹیفکیٹ جینیاتی دستاویزات ہیں اور جمع نہیں کیے جاتے۔') },
  { field: 'family_pedigree_file', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Family pedigree files are not collected.', 'خاندانی شجرہ فائلیں جمع نہیں کی جاتیں۔') },
  { field: 'individual_genetic_risk_profile', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Individual genetic-risk profiles are never created.', 'انفرادی جینیاتی خطرہ پروفائل کبھی نہیں بنائے جاتے۔') },
  { field: 'calculator_parent_carrier_status', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Calculator inputs are transient and never persisted for research (spec §7).', 'کیلکولیٹر ان پٹ عارضی ہیں اور کبھی تحقیق کے لیے محفوظ نہیں کیے جاتے۔') },
  { field: 'calculator_calculated_child_risk', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Calculated individual risk is transient and never stored (spec §7).', 'حساب شدہ انفرادی خطرہ عارضی ہے اور کبھی محفوظ نہیں کیا جاتا۔') },
  { field: 'calculator_carrier_probability', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Calculated carrier probability is transient and never stored (spec §7).', 'حساب شدہ کیریئر امکان عارضی ہے اور کبھی محفوظ نہیں کیا جاتا۔') },
  { field: 'child_health_record', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Child health profiles are never created (spec §15).', 'بچوں کے صحت پروفائل کبھی نہیں بنائے جاتے۔') },
  { field: 'infant_symptom_record', status: 'PROHIBITED', sensitivity: 'HIGHLY_SENSITIVE', reason: L('Infant symptom registries are never created (spec §15).', 'شیرخوار علامت رجسٹریاں کبھی نہیں بنائی جاتیں۔') },
  { field: 'full_ip_address', status: 'PROHIBITED', sensitivity: 'SENSITIVE', reason: L('Full IP addresses must not be research variables (spec §18).', 'مکمل IP پتے تحقیقی متغیرات نہیں ہو سکتے۔') },
  { field: 'exact_date_of_birth', status: 'NOT_NECESSARY', sensitivity: 'SENSITIVE', reason: L('An age range is sufficient (spec §18).', 'عمر کی حد کافی ہے۔'), lessSensitiveAlternative: L('Age range', 'عمر کی حد') },
  { field: 'home_address', status: 'NOT_NECESSARY', sensitivity: 'SENSITIVE', reason: L('Precise home addresses are not needed (spec §18).', 'درست گھر کے پتے درکار نہیں۔'), lessSensitiveAlternative: L('City', 'شہر') },
  { field: 'age_range', status: 'OPTIONAL_JUSTIFIED', sensitivity: 'INTERNAL', reason: L('An age range may support aggregate analysis with minimization review.', 'عمر کی حد کم آوری جائزے کے ساتھ مجموعی تجزیے میں مدد دے سکتی ہے۔') },
  { field: 'city', status: 'OPTIONAL_JUSTIFIED', sensitivity: 'INTERNAL', reason: L('City may support sample description with minimization review.', 'شہر کم آوری جائزے کے ساتھ نمونہ وضاحت میں مدد دے سکتا ہے۔') },
  { field: 'language_preference', status: 'REQUIRED', sensitivity: 'INTERNAL', reason: L('Needed to serve English or Urdu.', 'انگریزی یا اردو پیش کرنے کے لیے درکار۔') },
];

/** Prohibited public claims (spec §25/§26/§27/§83). Matched case-insensitively
 * against ASSERTIVE public text before publication. */
export const PROHIBITED_CLAIMS: readonly ProhibitedClaimRule[] = [
  { id: 'lives-saved', pattern: '\\b(saved|saving) (many |countless )?lives\\b|\\blives (were |have been )?saved\\b', category: 'UNSUPPORTED_IMPACT', reason: L('Shared Blood does not claim lives saved.', 'شیئرڈ بلڈ زندگیاں بچانے کا دعویٰ نہیں کرتا۔') },
  { id: 'misdiagnosis-prevented', pattern: '\\b(prevented|prevents|preventing) misdiagnos|misdiagnos\\w* (were |was |have been )?prevented\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No misdiagnosis-prevention claims without evidence.', 'شواہد کے بغیر غلط تشخیص روکنے کا دعویٰ نہیں۔') },
  { id: 'disease-burden', pattern: '\\breduced (the )?disease burden\\b|\\bdisease burden (was |has been )?reduced\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No disease-burden-reduction claims without evidence.', 'شواہد کے بغیر مرض کے بوجھ میں کمی کا دعویٰ نہیں۔') },
  { id: 'prevented-disorders', pattern: '\\bprevent(ed|s|ing)? genetic (disorders|disease)\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No genetic-disorder-prevention claims.', 'جینیاتی مرض روکنے کا دعویٰ نہیں۔') },
  { id: 'reduced-consanguinity', pattern: '\\breduced consanguinity\\b|\\bconsanguinity (was |has been )?reduced\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No consanguinity-reduction claims.', 'رشتہ داری میں کمی کا دعویٰ نہیں۔') },
  { id: 'national-awareness', pattern: '\\bimproved national awareness\\b|\\bnational awareness (was |has been )?improved\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No national-awareness-improvement claims from a convenience sample.', 'آسائشی نمونے سے قومی آگاہی بہتری کا دعویٰ نہیں۔') },
  { id: 'changed-policy', pattern: '\\bchanged government policy\\b|\\bgovernment policy (was |has been )?(changed|influenced)\\b', category: 'UNSUPPORTED_IMPACT', reason: L('No government-policy-change claims.', 'سرکاری پالیسی تبدیلی کا دعویٰ نہیں۔') },
  { id: 'diagnosed', pattern: '\\bwe diagnos(e|ed)\\b|\\bdiagnos(ed|es) (patients|individuals|children)\\b|this child has a genetic disorder', category: 'DIAGNOSIS', reason: L('Shared Blood does not diagnose individuals.', 'شیئرڈ بلڈ افراد کی تشخیص نہیں کرتا۔') },
  { id: 'hotspot', pattern: '\\b(disease|genetic[- ]risk|consanguinity) hotspot', category: 'PREVALENCE_OR_HOTSPOT', reason: L('No disease/genetic/consanguinity hotspots.', 'کوئی مرض/جینیاتی/رشتہ داری ہاٹ سپاٹ نہیں۔') },
  { id: 'genetic-risk-map', pattern: 'mapp(ed|ing) genetic risk across pakistan|genetic stigma map', category: 'PREVALENCE_OR_HOTSPOT', reason: L('No genetic-risk maps across Pakistan.', 'پاکستان بھر جینیاتی خطرہ نقشے نہیں۔') },
  { id: 'inferior', pattern: 'genetically (inferior|damaged)|genetic purity|\\beugenic', category: 'STIGMA_OR_EUGENICS', reason: L('No eugenic or genetic-purity language.', 'کوئی نسل پرستانہ یا جینیاتی خالصیت کی زبان نہیں۔') },
  { id: 'inbred', pattern: 'inbred communit|high-risk bloodline|disease-producing communit|defective bloodline', category: 'STIGMA_OR_EUGENICS', reason: L('No stigmatizing community/bloodline language.', 'کوئی بدنام کن برادری/نسل کی زبان نہیں۔') },
  { id: 'genetic-score', pattern: '(genetic health|family genetic quality|marriage safety|bloodline risk|genetic compatibility) score', category: 'GENETIC_SCORE', reason: L('No genetic/marriage/bloodline scores.', 'کوئی جینیاتی/شادی/نسل اسکور نہیں۔') },
  { id: 'reproductive-directive', pattern: '\\byou (should|must) not (marry|have children)\\b|\\bmust (undergo |get )?sterili[sz]|\\bmust end (the |your )?pregnancy\\b', category: 'REPRODUCTIVE_DIRECTIVE', reason: L('Shared Blood never directs reproductive or marriage decisions.', 'شیئرڈ بلڈ کبھی تولیدی یا شادی کے فیصلوں کی ہدایت نہیں دیتا۔') },
];

/** Access policy matrix (spec §20). Least privilege — a role may act only up to
 * its maximum sensitivity. Sensitivities not listed for a role/action are denied. */
export const ACCESS_POLICIES: readonly AccessPolicyRule[] = [
  { role: 'PUBLIC_USER', action: 'VIEW', maxSensitivity: 'PUBLIC' },
  { role: 'CONTENT_EDITOR', action: 'VIEW', maxSensitivity: 'INTERNAL' },
  { role: 'CONTENT_EDITOR', action: 'CREATE', maxSensitivity: 'INTERNAL' },
  { role: 'CONTENT_EDITOR', action: 'EDIT', maxSensitivity: 'INTERNAL' },
  { role: 'RESEARCH_EDITOR', action: 'VIEW', maxSensitivity: 'CONFIDENTIAL' },
  { role: 'RESEARCH_EDITOR', action: 'CREATE', maxSensitivity: 'CONFIDENTIAL' },
  { role: 'RESEARCH_EDITOR', action: 'EDIT', maxSensitivity: 'CONFIDENTIAL' },
  { role: 'RESEARCH_REVIEWER', action: 'VIEW', maxSensitivity: 'SENSITIVE' },
  { role: 'RESEARCH_REVIEWER', action: 'REVIEW', maxSensitivity: 'SENSITIVE' },
  { role: 'SCIENTIFIC_REVIEWER', action: 'VIEW', maxSensitivity: 'SENSITIVE' },
  { role: 'SCIENTIFIC_REVIEWER', action: 'REVIEW', maxSensitivity: 'SENSITIVE' },
  { role: 'ETHICS_REVIEWER', action: 'VIEW', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'ETHICS_REVIEWER', action: 'REVIEW', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'ETHICS_REVIEWER', action: 'APPROVE', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'VIEW', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'CREATE', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'EDIT', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'REVIEW', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'APPROVE', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'EXPORT', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'DELETE', maxSensitivity: 'HIGHLY_SENSITIVE' },
  { role: 'GOVERNANCE_ADMIN', action: 'ARCHIVE', maxSensitivity: 'HIGHLY_SENSITIVE' },
];

/** Versioned retention rules (spec §23). */
export const RETENTION_RULES: readonly RetentionRule[] = DATA_PURPOSES.map((p) => ({
  id: `retention-${p.id.toLowerCase()}`,
  purposeId: p.id,
  version: 1,
  retentionBasis: L(
    'Retained only while this purpose remains active; reviewed when the purpose ends.',
    'صرف اُس وقت تک رکھا جاتا ہے جب تک یہ مقصد فعال رہے؛ مقصد ختم ہونے پر جائزہ۔',
  ),
  reviewOnPurposeEnd: true,
}));

/** Research activities with ethical risk (spec §16). RESTRICTED = not implemented
 * in Version 1. */
export const RESEARCH_ACTIVITIES: readonly ResearchActivityRule[] = [
  { id: 'awareness-survey', title: L('Public-awareness survey', 'عوامی آگاہی سروے'), riskLevel: 'MODERATE', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
  { id: 'fieldwork-documentation', title: L('Community fieldwork documentation', 'کمیونٹی فیلڈ ورک دستاویز'), riskLevel: 'MODERATE', requiresEthicsReview: true, requiresScientificReview: false, vulnerablePopulation: false },
  { id: 'childcare-orphanage-activity', title: L('Childcare / orphanage activity', 'نگہداشتِ اطفال / یتیم خانہ سرگرمی'), riskLevel: 'HIGH', requiresEthicsReview: true, requiresScientificReview: false, vulnerablePopulation: true },
  { id: 'training-assessment', title: L('Aggregate training assessment', 'مجموعی تربیتی تشخیص'), riskLevel: 'MODERATE', requiresEthicsReview: true, requiresScientificReview: false, vulnerablePopulation: false },
  { id: 'audio-story', title: L('Audio-story recording & publication', 'آڈیو کہانی ریکارڈنگ اور اشاعت'), riskLevel: 'HIGH', requiresEthicsReview: true, requiresScientificReview: false, vulnerablePopulation: false },
  { id: 'dna-collection', title: L('DNA collection', 'ڈی این اے جمع آوری'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
  { id: 'genetic-report-upload', title: L('Genetic report upload', 'جینیاتی رپورٹ اپ لوڈ'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
  { id: 'child-genetic-registry', title: L('Identifiable child genetic registry', 'قابلِ شناخت بچہ جینیاتی رجسٹری'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: true },
  { id: 'family-pedigree-database', title: L('Family pedigree database', 'خاندانی شجرہ ڈیٹابیس'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
  { id: 'clinical-diagnosis-research', title: L('Clinical diagnosis research', 'طبی تشخیص تحقیق'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
  { id: 'reproductive-decision-tracking', title: L('Reproductive decision tracking', 'تولیدی فیصلہ ٹریکنگ'), riskLevel: 'RESTRICTED', requiresEthicsReview: true, requiresScientificReview: true, vulnerablePopulation: false },
];

/** Purpose-specific consent definitions (spec §10/§11). No universal checkbox. */
export const CONSENT_DEFINITIONS: readonly ConsentDefinition[] = [
  {
    id: 'consent-survey', purposeId: 'SURVEY_RESEARCH', version: 1, languages: ['en', 'ur'],
    title: L('Survey participation consent', 'سروے شرکت رضامندی'),
    explains: { purpose: true, participation: true, collectedInformation: true, recording: false, publication: true, use: true, retention: true, voluntariness: true, withdrawal: true, contactRoutes: false },
    separateDecisions: ['participation', 'research_follow_up'], bilingualReviewApproved: true,
  },
  {
    id: 'consent-audio', purposeId: 'AUDIO_STORY_PUBLICATION', version: 1, languages: ['en', 'ur'],
    title: L('Audio recording & publication consent', 'آڈیو ریکارڈنگ اور اشاعت رضامندی'),
    explains: { purpose: true, participation: true, collectedInformation: true, recording: true, publication: true, use: true, retention: true, voluntariness: true, withdrawal: true, contactRoutes: true },
    separateDecisions: ['interview', 'recording', 'public_audio_publication', 'transcript_publication', 'translation'], bilingualReviewApproved: true,
  },
  {
    id: 'consent-fieldwork', purposeId: 'FIELDWORK_DOCUMENTATION', version: 1, languages: ['en', 'ur'],
    title: L('Fieldwork participation consent', 'فیلڈ ورک شرکت رضامندی'),
    explains: { purpose: true, participation: true, collectedInformation: true, recording: false, publication: true, use: true, retention: true, voluntariness: true, withdrawal: true, contactRoutes: false },
    separateDecisions: ['participation', 'assessment'], bilingualReviewApproved: true,
  },
  {
    id: 'consent-contact', purposeId: 'CONTACT_RESPONSE', version: 1, languages: ['en', 'ur'],
    title: L('Contact response', 'رابطہ جواب'),
    explains: { purpose: true, participation: true, collectedInformation: true, recording: false, publication: false, use: true, retention: true, voluntariness: true, withdrawal: true, contactRoutes: true },
    separateDecisions: ['contact_response'], bilingualReviewApproved: true,
  },
];

/** The standing approved public notice (spec §32/§106). */
export const APPROVED_NOTICE: LocalizedText = L(
  'Shared Blood is an educational and research-focused genetic-health project designed to limit unnecessary data collection, protect sensitive information, and require human review before findings are published. Educational tools do not create patient records or individual genetic-risk profiles. Educational information is not a diagnosis or a substitute for professional medical care.',
  'شیئرڈ بلڈ ایک تعلیمی اور تحقیق پر مرکوز جینیاتی صحت کا منصوبہ ہے جو غیر ضروری ڈیٹا کی آوری کو محدود کرنے، حساس معلومات کے تحفظ، اور نتائج شائع کرنے سے پہلے انسانی جائزے کو لازمی بنانے کے لیے تیار کیا گیا ہے۔ تعلیمی آلات مریض کے ریکارڈ یا انفرادی جینیاتی خطرہ پروفائل نہیں بناتے۔ تعلیمی معلومات تشخیص یا پیشہ ورانہ طبی نگہداشت کا متبادل نہیں۔',
);

export const GOVERNANCE_VERSION = '1.0';
