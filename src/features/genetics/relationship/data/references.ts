import type { LocalizedText } from '@/types';
import type { RelationshipReference } from '../types';

/**
 * Structured references (spec §32/§33). Scientific claims in the Explorer must be
 * traceable to these; they are kept separate from relationship configuration.
 * Real clinical-genetics and public-health sources only — no fabricated DOIs.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const RELATIONSHIP_REFERENCES: readonly RelationshipReference[] = [
  {
    id: 'bennett-2002',
    title: L(
      'Genetic counseling and screening of consanguineous couples and their offspring: recommendations of the National Society of Genetic Counselors',
      'قرابتی جوڑوں اور ان کی اولاد کی جینیاتی مشاورت و اسکریننگ: نیشنل سوسائٹی آف جینیٹک کونسلرز کی سفارشات',
    ),
    publication: L('Journal of Genetic Counseling', 'جرنل آف جینیٹک کونسلنگ'),
    year: 2002,
    url: 'https://doi.org/10.1023/A:1014593404915',
  },
  {
    id: 'hamamy-2011',
    title: L(
      'Consanguineous marriages, pearls and perils: Geneva International Consanguinity Workshop report',
      'قرابتی شادیاں، فوائد اور خطرات: جنیوا انٹرنیشنل کنسینگوئنٹی ورکشاپ رپورٹ',
    ),
    publication: L('Genetics in Medicine', 'جینیٹکس اِن میڈیسن'),
    year: 2011,
    url: 'https://doi.org/10.1097/GIM.0b013e3182060bb3',
  },
  {
    id: 'bittles-black-2010',
    title: L(
      'Consanguinity, human evolution, and complex diseases',
      'قرابت داری، انسانی ارتقاء اور پیچیدہ امراض',
    ),
    publication: L(
      'Proceedings of the National Academy of Sciences',
      'پروسیڈنگز آف دی نیشنل اکیڈمی آف سائنسز',
    ),
    year: 2010,
    url: 'https://doi.org/10.1073/pnas.0906079106',
  },
];

export function getRelationshipReference(id: string): RelationshipReference | null {
  return RELATIONSHIP_REFERENCES.find((reference) => reference.id === id) ?? null;
}
