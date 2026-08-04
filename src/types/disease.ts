import type { LocalizedText } from './common';

/**
 * Disease Library metadata model (Module 04).
 * This is the structured *index* record — discovery/classification only.
 * Medical content (symptoms, treatment, guidance) is explicitly out of scope
 * here and is delivered by the Disease Page Template (Module 05) and the
 * per-disease modules (06–09).
 */

/** Disease category identifiers (spec §5). Extendable without logic changes. */
export type DiseaseCategoryId =
  | 'blood'
  | 'respiratory'
  | 'connective-tissue'
  | 'metabolic'
  | 'rare'
  | 'inherited';

export interface DiseaseCategory {
  id: DiseaseCategoryId;
  /** i18n key within the `DiseaseLibrary.categories` namespace. */
  labelKey: string;
}

/**
 * Inheritance strategy the calculator can model (Module 09 v2 §6). New strategies
 * (X-linked, mitochondrial, …) are added here without rewriting existing engines.
 */
export type InheritanceStrategyId =
  | 'autosomal-recessive'
  | 'autosomal-dominant'
  | 'unsupported';

/**
 * Canonical, disease-LEVEL inheritance classification (Module 23 §60).
 *
 * This is human-readable disease *identity* metadata — deliberately distinct
 * from the executable calculator `InheritanceStrategyId` (which is per-subtype
 * and drives probability, §59) and from the localized display string
 * `inheritancePattern`. EDS and the LSD group are SUBTYPE_DEPENDENT and are
 * never forced into a single universal pattern (§61/§62).
 */
export type DiseaseInheritanceClass =
  | 'AUTOSOMAL_RECESSIVE'
  | 'AUTOSOMAL_DOMINANT'
  | 'SUBTYPE_DEPENDENT'
  | 'COMPLEX_OR_UNRESOLVED';

/**
 * A calculator-supported subtype of a disease (Module 09 v2 §8/§10). Inheritance
 * for conditions like Ehlers-Danlos depends on the subtype, so the strategy is
 * read from the chosen subtype rather than the parent disease.
 */
export interface CalculatorSubtype {
  id: string;
  name: LocalizedText;
  strategy: InheritanceStrategyId;
  /** Short inheritance explanation shown with results (v2 §23). */
  context: LocalizedText;
  /** Optional calculator-specific limitation note (v2 §23). */
  limitations?: LocalizedText;
}

/**
 * Calculator metadata (Module 09 v2 §7/§37). Determines whether a disease appears
 * in the Inheritance Probability Calculator and which strategy models it. This
 * lives in structured metadata — never string-matched by name in components
 * (v2 §17). Subtype-driven conditions set `requiresSubtype` and enumerate
 * `subtypes`; the strategy is then taken from the chosen subtype.
 */
export interface DiseaseCalculatorConfig {
  /** `calculatorEnabled` — appears in the calculator's condition list. */
  enabled: boolean;
  /** Single strategy for uniformly-modeled diseases (omit when subtype-driven). */
  strategy?: InheritanceStrategyId;
  /** Optional label override for the calculator (defaults to the disease name). */
  label?: LocalizedText;
  /** Short inheritance explanation shown with results (v2 §23). */
  context?: LocalizedText;
  /** Calculator-specific limitations (v2 §23). */
  limitations?: LocalizedText;
  /** When true the user must choose a subtype before calculating (EDS, generic LSD). */
  requiresSubtype?: boolean;
  subtypes?: CalculatorSubtype[];
}

/** Structured disease metadata (spec §11). */
export interface Disease {
  /** Stable identifier (spec: "Disease ID"). */
  id: string;
  /** URL slug used by routing (`/diseases/{slug}`). */
  slug: string;
  name: LocalizedText;
  /** Short, plain-language educational overview — no medical detail. */
  summary: LocalizedText;
  /** One or more categories (spec §5). */
  categories: DiseaseCategoryId[];
  /** Primary body system affected (classification, not medical advice). */
  bodySystem: LocalizedText;
  /** Inheritance pattern — localized display string (well-established classification). */
  inheritancePattern: LocalizedText;
  /**
   * Canonical, machine-readable disease-level inheritance classification
   * (Module 23 §60). One owner for disease identity; consumers that need a
   * typed value read this rather than parsing the display string.
   */
  inheritanceClassification: DiseaseInheritanceClass;
  /** Highlighted in the Featured section (spec §8). */
  featured: boolean;
  /** Name variants, common misspellings, and synonyms for search (spec §9). */
  searchKeywords: string[];
  /** Slugs of related disorders (spec §12 framework). */
  related: string[];
  /** ISO date the record was last reviewed (Module 05 §6 metadata). Optional. */
  lastUpdated?: string;
  /** Inheritance-calculator metadata (Module 09 v2). Absent = not calculable. */
  calculator?: DiseaseCalculatorConfig;
}
