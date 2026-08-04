import type { LocalizedText } from '@/types';

/**
 * References for scored knowledge-check questions (spec §15). Every correct
 * answer to a KNOWLEDGE_CHECK question must be scientifically referenced through
 * the Module 07 reference architecture, or the question fails validation
 * (spec §15/§62). Real organisation pages only.
 */
export interface SurveyReference {
  id: string;
  title: string;
  publication: string;
  url?: string;
}

export const SURVEY_REFERENCES: readonly SurveyReference[] = [
  {
    id: 'medlineplus-inheritance',
    title: 'What are the different ways a genetic condition can be inherited?',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/',
  },
  {
    id: 'medlineplus-carrier',
    title: 'What is carrier testing? (definition of a genetic carrier)',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/understanding/testing/carriertesting/',
  },
  {
    id: 'medlineplus-beta-thalassemia',
    title: 'Beta thalassemia',
    publication: 'MedlinePlus Genetics (U.S. National Library of Medicine)',
    url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
  },
  {
    id: 'who-genes-health',
    title: 'Genes and human disease, recessive inheritance and consanguinity',
    publication: 'World Health Organization',
    url: 'https://www.who.int/health-topics/genetics',
  },
];

export function getSurveyReference(id: string): SurveyReference | null {
  return SURVEY_REFERENCES.find((r) => r.id === id) ?? null;
}

/** A small helper for knowledge-check explanations kept beside the references. */
export const KNOWLEDGE_EXPLANATIONS: Record<string, LocalizedText> = {
  'carrier-definition': {
    en: 'A carrier usually has one altered copy of a gene for a recessive condition and one working copy, and typically does not have the condition but can pass the altered copy on.',
    ur: 'ایک کیریئر عام طور پر کسی ریسیسِو حالت کے جین کی ایک تبدیل شدہ نقل اور ایک کام کرنے والی نقل رکھتا ہے، اور عموماً اسے وہ حالت نہیں ہوتی مگر وہ تبدیل شدہ نقل آگے منتقل کر سکتا ہے۔',
  },
  'two-carriers': {
    en: 'For an autosomal recessive condition, a child can be affected when both biological parents pass on an altered copy, one from each parent.',
    ur: 'کسی آٹوسومل ریسیسِو حالت کے لیے، بچہ اُس وقت متاثر ہو سکتا ہے جب دونوں حیاتیاتی والدین ایک تبدیل شدہ نقل منتقل کریں، ہر والدین سے ایک۔',
  },
};
