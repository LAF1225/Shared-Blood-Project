import type { LocalizedText } from '@/types';
import type { CounsellingContent } from '../types';

/**
 * Genetic-counselling education content (spec §31/§66).
 *
 * CORE ETHICAL REQUIREMENT (spec §32): counselling is framed as NON-DIRECTIVE
 * decision support based on a person's own circumstances and values. It is NEVER
 * framed as preventing marriages, preventing affected people from having
 * children, or approving "genetically safe" couples. The `whatItDoesNotDo` list
 * makes the boundary explicit, and no eugenic or compatibility language is used
 * anywhere (spec §32/§33).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GENETIC_COUNSELLING: CounsellingContent = {
  whatItIs: L(
    'Genetic counselling helps individuals and families understand inherited conditions, family history, testing options, and the possible meanings of genetic information. It is supportive and non-directive: it helps a person think through their own circumstances and values, and it does not make decisions for them.',
    'جینیاتی مشاورت افراد اور خاندانوں کو موروثی حالتیں، خاندانی تاریخ، ٹیسٹنگ کے اختیارات، اور جینیاتی معلومات کے ممکنہ معانی سمجھنے میں مدد دیتی ہے۔ یہ معاون اور غیر ہدایتی ہے: یہ کسی شخص کو اپنے حالات اور اقدار پر سوچنے میں مدد دیتی ہے، اور ان کے لیے فیصلے نہیں کرتی۔',
  ),
  whatMayBeDiscussed: [
    L('Family history and how a condition is inherited', 'خاندانی تاریخ اور کوئی حالت کیسے وراثت میں ملتی ہے'),
    L('What testing options exist and what results may or may not mean', 'کون سے ٹیسٹنگ اختیارات موجود ہیں اور نتائج کیا مطلب رکھ سکتے یا نہیں'),
    L('Questions, concerns, and a person’s own values and priorities', 'سوالات، خدشات، اور شخص کی اپنی اقدار اور ترجیحات'),
    L('Where testing and support may be available', 'ٹیسٹنگ اور معاونت کہاں دستیاب ہو سکتی ہے'),
  ],
  whatItDoesNotDo: [
    L('It does not tell a couple whether to marry or not to marry', 'یہ کسی جوڑے کو نہیں بتاتی کہ شادی کرے یا نہ کرے'),
    L('It does not tell people whether to have children or end a pregnancy', 'یہ لوگوں کو نہیں بتاتی کہ بچے پیدا کریں یا حمل ختم کریں'),
    L('It does not approve or reject couples as "compatible" or "incompatible"', 'یہ جوڑوں کو ”ہم آہنگ“ یا ”غیر ہم آہنگ“ کے طور پر منظور یا مسترد نہیں کرتی'),
    L('It does not make personal or reproductive decisions for anyone', 'یہ کسی کے لیے ذاتی یا تولیدی فیصلے نہیں کرتی'),
  ],
  professionalTypeIds: ['GENETIC_COUNSELLOR', 'MEDICAL_GENETICIST'],
  referenceIds: ['nsgc-what-is-gc', 'who-community-genetics'],
};
