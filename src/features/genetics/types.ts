import type { LocalizedText } from '@/types';

/**
 * Genetics Explorer — content model (Module 08).
 *
 * The Explorer is a *framework*: it organises educational genetics tools, an
 * introduction to core concepts, and a suggested learning path. This module
 * deliberately implements NO calculation logic — the interactive maths for the
 * current tools arrives in Modules 09 and 10 (spec §18). Everything here is
 * data-driven so new tools integrate by appending an entry, with no structural
 * changes (spec §14/§16).
 */

/**
 * Tool availability.
 * - `active`     — a current tool (spec §6). Its full §8 page framework is
 *                  built; only the interactive calculation is pending its
 *                  dedicated module.
 * - `coming-soon` — a future placeholder (spec §6/§16). Already has a dedicated
 *                  page, proving new tools slot in without restructuring.
 */
export type GeneticsToolStatus = 'active' | 'coming-soon';

/** A prose block: paragraphs + an optional bullet list. */
export interface GeneticsBlock {
  heading?: LocalizedText;
  paragraphs?: LocalizedText[];
  points?: LocalizedText[];
}

/**
 * Educational callout (spec §9). Every tool explains what it demonstrates, what
 * its results mean, and — crucially — what they do NOT mean.
 */
export interface ResultInterpretation {
  demonstrates: LocalizedText;
  resultsMean: LocalizedText;
  resultsDoNotMean: LocalizedText;
}

/** A citable reference (spec §11 shared components). */
export interface GeneticsReference {
  id: string;
  title: LocalizedText;
  publication?: LocalizedText;
  url?: string;
}

/**
 * A genetics educational tool (spec §6/§8). Content fields are all optional so
 * the page template renders what exists and hides the rest.
 */
export interface GeneticsTool {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  /** lucide icon name, resolved in components/icons. */
  icon: string;
  status: GeneticsToolStatus;
  /** Display + learning-path ordering. */
  order: number;
  /**
   * For `active` tools: the module that delivers the interactive calculation
   * (e.g. "09"). The Explorer only builds the surrounding framework (spec §18).
   */
  interactiveModule?: string;

  // §8 tool architecture (Overview → Purpose → [Interactive] → Explanation →
  // Limitations → Related Resources → Related Diseases) + §11 References.
  overview?: LocalizedText[];
  purpose?: LocalizedText[];
  educationalExplanation?: GeneticsBlock[];
  interpretation?: ResultInterpretation;
  limitations?: LocalizedText[];
  /** Parent Learning Centre resource slugs (Module 07). */
  relatedResources?: string[];
  /** Disease slugs (Module 04). */
  relatedDiseases?: string[];
  references?: GeneticsReference[];
}

/** A core concept for the educational introduction (spec §5). */
export interface GeneticsConcept {
  id: string;
  term: LocalizedText;
  definition: LocalizedText;
  /** lucide icon name, resolved in components/icons. */
  icon: string;
}

/**
 * A step in the suggested learning path (spec §7). The path is a recommendation,
 * not a gate — every step links somewhere and users may jump around freely.
 */
export interface PathwayStep {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  /** Destination: an internal route (may include a hash anchor). */
  href: string;
}
