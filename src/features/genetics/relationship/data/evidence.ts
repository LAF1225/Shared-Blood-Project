import type { LocalizedText } from '@/types';
import type { PopulationEvidence } from '../types';

/**
 * Population-level evidence (spec §16/§17/§32). Stored separately from pedigree
 * coefficients and rendered ONLY when configured. Evidence is never scaled from
 * one relationship to another, and never converted into a personalized absolute
 * risk (spec §17/§32). Where no reliable configured evidence exists, the
 * resolver returns nothing and the UI shows the "not provided" message (spec §40).
 *
 * Only first cousins carry a configured, sourced estimate — the well-established
 * counselling figure of roughly 1.7–2.8 percentage points of excess risk above a
 * ~2–3% population baseline for significant congenital disorders (spec §16).
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const POPULATION_EVIDENCE: readonly PopulationEvidence[] = [
  {
    id: 'first-cousins-excess-risk',
    relationshipId: 'first-cousins',
    claim: L(
      'Genetic-counselling literature describes a modest average increase in the risk of significant congenital or genetic disorders for the children of first cousins, compared with the general population.',
      'جینیاتی مشاورت کے ادب میں بیان کیا گیا ہے کہ پہلے درجے کے کزن کے بچوں میں عام آبادی کے مقابلے میں اہم پیدائشی یا جینیاتی امراض کے خطرے میں معمولی اوسط اضافہ ہوتا ہے۔',
    ),
    population: L(
      'First-cousin couples, as summarised in genetic-counselling guidance.',
      'پہلے درجے کے کزن جوڑے، جیسا کہ جینیاتی مشاورت کی رہنمائی میں خلاصہ کیا گیا ہے۔',
    ),
    outcomeMeasured: L(
      'Significant congenital and genetic disorders in offspring.',
      'اولاد میں اہم پیدائشی اور جینیاتی امراض۔',
    ),
    estimate: L(
      'About 1.7–2.8 percentage points above a baseline population risk of roughly 2–3%.',
      'تقریباً 2–3% کی بنیادی آبادی کے خطرے سے تقریباً 1.7–2.8 فیصدی پوائنٹس زیادہ۔',
    ),
    estimateType: L(
      'Average excess risk at the population level, not a prediction for any individual couple or disease.',
      'آبادی کی سطح پر اوسط اضافی خطرہ، کسی انفرادی جوڑے یا مرض کے لیے پیش گوئی نہیں۔',
    ),
    limitations: L(
      'This is a population average across many conditions. It does not predict any specific disorder, does not apply to a particular couple, and varies with family history, ancestry, and screening.',
      'یہ بہت سی حالتوں کی آبادی کی اوسط ہے۔ یہ کسی مخصوص مرض کی پیش گوئی نہیں کرتی، کسی خاص جوڑے پر لاگو نہیں ہوتی، اور خاندانی تاریخ، نسب اور اسکریننگ کے ساتھ بدلتی ہے۔',
    ),
    reference: 'bennett-2002',
    lastReviewed: '2026-07-01',
  },
];
