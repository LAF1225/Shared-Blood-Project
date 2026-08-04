import type { LocalizedText } from '@/types';
import type { GeneticsConcept } from '../types';

/**
 * Educational introduction concepts (spec §5). A concise, accessible primer that
 * prepares users before they open the interactive tools. Deliberately short —
 * one plain-language sentence each. Adding a concept is a one-line append.
 */
const L = (en: string, ur: string): LocalizedText => ({ en, ur });

export const GENETICS_CONCEPTS: readonly GeneticsConcept[] = [
  {
    id: 'dna',
    icon: 'Dna',
    term: L('DNA', 'ڈی این اے'),
    definition: L(
      'DNA is the set of instructions inside every cell that tells the body how to grow and work.',
      'ڈی این اے ہر خلیے کے اندر موجود ہدایات کا مجموعہ ہے جو جسم کو بتاتا ہے کہ کیسے بڑھنا اور کام کرنا ہے۔',
    ),
  },
  {
    id: 'genes',
    icon: 'Blocks',
    term: L('Genes', 'جینز'),
    definition: L(
      'Genes are short sections of DNA. Each gene carries the instructions for one particular trait or task.',
      'جینز ڈی این اے کے چھوٹے حصے ہیں۔ ہر جین ایک خاص خصوصیت یا کام کی ہدایات رکھتا ہے۔',
    ),
  },
  {
    id: 'chromosomes',
    icon: 'Layers',
    term: L('Chromosomes', 'کروموسومز'),
    definition: L(
      'Chromosomes are tightly packed bundles of DNA. Most people have 23 pairs, one of each pair from each parent.',
      'کروموسومز ڈی این اے کے مضبوطی سے لپٹے ہوئے مجموعے ہیں۔ زیادہ تر لوگوں میں 23 جوڑے ہوتے ہیں، ہر جوڑے کا ایک حصہ ہر والدین سے۔',
    ),
  },
  {
    id: 'inheritance',
    icon: 'GitBranch',
    term: L('Inheritance', 'وراثت'),
    definition: L(
      'Inheritance is how genes pass from parents to children, which is why traits and some conditions run in families.',
      'وراثت وہ عمل ہے جس سے جینز والدین سے بچوں کو منتقل ہوتے ہیں، اسی لیے خصوصیات اور بعض حالتیں خاندانوں میں چلتی ہیں۔',
    ),
  },
  {
    id: 'dominant',
    icon: 'Crown',
    term: L('Dominant genes', 'غالب جینز'),
    definition: L(
      'A dominant gene shows its effect even when only one copy is inherited, from just one parent.',
      'غالب جین اپنا اثر تب بھی ظاہر کرتا ہے جب اس کی صرف ایک نقل، صرف ایک والدین سے، وراثت میں ملے۔',
    ),
  },
  {
    id: 'recessive',
    icon: 'Moon',
    term: L('Recessive genes', 'مغلوب جینز'),
    definition: L(
      'A recessive gene usually shows its effect only when two copies are inherited, one from each parent.',
      'مغلوب جین عموماً اپنا اثر تب ظاہر کرتا ہے جب اس کی دو نقول وراثت میں ملیں، ہر والدین سے ایک۔',
    ),
  },
  {
    id: 'carriers',
    icon: 'Users',
    term: L('Carriers', 'حاملین'),
    definition: L(
      'A carrier has one copy of a recessive gene but no symptoms. Carriers can still pass the gene to their children.',
      'حامل میں مغلوب جین کی ایک نقل ہوتی ہے مگر کوئی علامات نہیں ہوتیں۔ حاملین پھر بھی یہ جین اپنے بچوں کو منتقل کر سکتے ہیں۔',
    ),
  },
];
