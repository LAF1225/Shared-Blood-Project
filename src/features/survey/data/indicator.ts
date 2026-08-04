import type { LocalizedText } from '@/types';
import type { GeneticLiteracyIndicatorDefinition } from '../types';

/**
 * Genetic Literacy Indicator definition (spec §16/§17).
 *
 * CRITICAL (spec §17): this is an AGGREGATE research summary metric only. It is
 * NEVER used to label an individual respondent as having low or high genetic
 * literacy, and it is never called a "Genetic IQ", "Intelligence Score", or
 * "Genetic Competence". The scoring is documented explicitly here, built only
 * from referenced KNOWLEDGE_CHECK questions.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GENETIC_LITERACY_INDICATOR: GeneticLiteracyIndicatorDefinition = {
  id: 'genetic-literacy-indicator-v1',
  title: L('Genetic Literacy Indicator', 'جینیاتی خواندگی کا اشاریہ'),
  description: L(
    'An aggregate research summary of how the surveyed sample answered a small set of referenced knowledge-check questions about inheritance and carrier status. It summarises the sample, never an individual.',
    'اس بات کا مجموعی تحقیقی خلاصہ کہ سروے کیے گئے نمونے نے وراثت اور کیریئر اسٹیٹس کے بارے میں حوالہ شدہ نالج-چیک سوالات کے چھوٹے سیٹ کے کیا جوابات دیے۔ یہ نمونے کا خلاصہ ہے، کبھی کسی فرد کا نہیں۔',
  ),
  includedQuestionIds: ['q-know-carrier', 'q-know-two-carriers'],
  scoringMethod: 'PERCENT_CORRECT',
  minimumScore: 0,
  maximumScore: 100,
  interpretationBands: [
    { id: 'lower', label: L('Lower shared awareness', 'کم مشترکہ آگاہی'), minScore: 0, maxScore: 33 },
    { id: 'mixed', label: L('Mixed shared awareness', 'ملی جلی مشترکہ آگاہی'), minScore: 34, maxScore: 66 },
    { id: 'higher', label: L('Higher shared awareness', 'زیادہ مشترکہ آگاہی'), minScore: 67, maxScore: 100 },
  ],
  referenceVersion: 'module-07-v1',
  methodologyNote: L(
    'Score = percentage of included knowledge-check questions answered correctly, aggregated across valid responses. Bands describe the sample as a whole and are not applied to any individual respondent. “Prefer not to say” and missing answers are excluded from the denominator, not counted as incorrect.',
    'اسکور = شامل نالج-چیک سوالات میں درست جواب دینے کا فیصد، درست جوابات پر مجموعی طور پر۔ بینڈز پورے نمونے کو بیان کرتے ہیں اور کسی انفرادی جواب دہندہ پر لاگو نہیں ہوتے۔ ”بتانا نہیں چاہتے“ اور غائب جوابات کو غلط شمار کرنے کے بجائے مخرج سے خارج کیا جاتا ہے۔',
  ),
};
