import type { LocalizedText } from '@/types';
import type { GeneticsReference } from '../../types';

/**
 * DNA Explorer reference registry (Module 22 §21).
 *
 * Real, citable gene/condition pages (MedlinePlus Genetics). These are NEW
 * gene-level citations, distinct from the inheritance/consanguinity references
 * used by the calculator and relationship tools — we do not duplicate canonical
 * reference metadata (§21). Every molecular mechanism cites at least one entry
 * here; mechanism content is never uncited (§21).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const DNA_REFERENCES: readonly GeneticsReference[] = [
  {
    id: 'medlineplus-hbb',
    title: L('HBB gene', 'ایچ بی بی جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/hbb/',
  },
  {
    id: 'medlineplus-beta-thalassemia',
    title: L('Beta thalassemia', 'بیٹا تھیلیسیمیا'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/condition/beta-thalassemia/',
  },
  {
    id: 'medlineplus-cftr',
    title: L('CFTR gene', 'سی ایف ٹی آر جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/cftr/',
  },
  {
    id: 'medlineplus-cystic-fibrosis',
    title: L('Cystic fibrosis', 'سسٹک فائبروسس'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/condition/cystic-fibrosis/',
  },
  {
    id: 'medlineplus-hexa',
    title: L('HEXA gene', 'ایچ ای ایکس اے جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/hexa/',
  },
  {
    id: 'medlineplus-gba',
    title: L('GBA gene', 'جی بی اے جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/gba/',
  },
  {
    id: 'medlineplus-col5a1',
    title: L('COL5A1 gene', 'سی او ایل 5 اے 1 جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/col5a1/',
  },
  {
    id: 'medlineplus-col3a1',
    title: L('COL3A1 gene', 'سی او ایل 3 اے 1 جین'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/gene/col3a1/',
  },
  {
    id: 'medlineplus-eds',
    title: L('Ehlers-Danlos syndrome', 'ایہلرز-ڈانلوس سنڈروم'),
    publication: L('MedlinePlus Genetics', 'میڈ لائن پلس جینیٹکس'),
    url: 'https://medlineplus.gov/genetics/condition/ehlers-danlos-syndrome/',
  },
];

/**
 * Resolve reference ids → reference records, preserving order and dropping
 * unknown ids (never fabricating a citation, §21/§51).
 */
export function resolveDnaReferences(ids: readonly string[]): GeneticsReference[] {
  const seen = new Set<string>();
  const out: GeneticsReference[] = [];
  for (const id of ids) {
    if (seen.has(id)) continue;
    const ref = DNA_REFERENCES.find((r) => r.id === id);
    if (ref) {
      out.push(ref);
      seen.add(id);
    }
  }
  return out;
}
