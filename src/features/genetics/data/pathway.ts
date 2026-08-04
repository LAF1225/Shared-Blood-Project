import type { LocalizedText } from '@/types';
import type { PathwayStep } from '../types';
import { ROUTES } from '@/constants/routes';

/**
 * Suggested learning path (spec §7): Introduction → How Genetics Works →
 * Inheritance Calculator → Population Risk Explorer → Disease Library → Parent
 * Resources. The path is a recommendation, not a gate — every step links
 * somewhere and users may explore in any order (spec §7 "remain flexible").
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const LEARNING_PATHWAY: readonly PathwayStep[] = [
  {
    id: 'introduction',
    label: L('Introduction', 'تعارف'),
    description: L(
      'Start with the genetics basics, DNA, genes, inheritance, and carriers.',
      'جینیات کی بنیادی باتوں سے آغاز کریں، ڈی این اے، جینز، وراثت اور حاملین۔',
    ),
    href: `${ROUTES.genetics}#intro`,
  },
  {
    id: 'how-genetics-works',
    label: L('How genetics works', 'جینیات کیسے کام کرتی ہے'),
    description: L(
      'See how inherited conditions are passed down through families.',
      'دیکھیں کہ موروثی حالتیں خاندانوں میں کیسے منتقل ہوتی ہیں۔',
    ),
    href: `${ROUTES.genetics}#tools`,
  },
  {
    id: 'inheritance-calculator',
    label: L('Inheritance Calculator', 'وراثت کیلکولیٹر'),
    description: L(
      'Explore how a condition may pass from parents to children.',
      'دریافت کریں کہ کوئی حالت والدین سے بچوں کو کیسے منتقل ہو سکتی ہے۔',
    ),
    href: ROUTES.genetics + '/inheritance-calculator',
  },
  {
    id: 'relationship-risk',
    label: L('Relationship & Recessive Risk Explorer', 'رشتہ اور ریسیسِو خطرہ ایکسپلورر'),
    description: L(
      'Understand how shared ancestry relates to recessive inheritance.',
      'سمجھیں کہ مشترکہ نسب مغلوب وراثت سے کیسے متعلق ہے۔',
    ),
    href: ROUTES.genetics + '/relationship-risk',
  },
  {
    id: 'disease-library',
    label: L('Disease Library', 'امراض لائبریری'),
    description: L(
      'Read about specific inherited conditions covered on Shared Blood.',
      'شیئرڈ بلڈ پر شامل مخصوص موروثی حالتوں کے بارے میں پڑھیں۔',
    ),
    href: ROUTES.diseases,
  },
  {
    id: 'parent-resources',
    label: L('Parent Resources', 'والدین کے وسائل'),
    description: L(
      'Find practical guidance for families and caregivers.',
      'خاندانوں اور نگہداشت کنندگان کے لیے عملی رہنمائی حاصل کریں۔',
    ),
    href: ROUTES.resources,
  },
];
