import type { LocalizedText } from '@/types';

/**
 * Relationship & Recessive Risk Explorer — content model (Module 10).
 *
 * This is an *educational* explorer, NOT a risk calculator. It explains why
 * shared ancestry can raise the chance that both parents carry the same
 * recessive variant. It must never produce an individualized disease-risk
 * percentage, infer genotype, or apply a relationship multiplier (spec §1/§46).
 *
 * All content is structured configuration so new relationship categories or
 * disease contexts are added by appending data — no component changes (spec §8).
 */

/** Biological relationship categories (spec §7). */
export type RelationshipId =
  | 'unrelated'
  | 'third-cousins'
  | 'second-cousins'
  | 'first-cousins-once-removed'
  | 'first-cousins'
  | 'double-first-cousins';

/**
 * Expected offspring inbreeding coefficient F for a *simple* pedigree (spec §10).
 * Stored as an exact fraction plus its numeric value (for display consistency
 * checks only — never used in any risk arithmetic). `null` for "Unrelated",
 * where F must not be asserted as an absolute 0 (spec §10).
 */
export interface InbreedingCoefficient {
  /** Scientific display, kept consistent across locales (spec §36). e.g. "1/16". */
  fraction: string;
  /** Numeric value of the fraction (verification only). */
  value: number;
}

/**
 * A structured relationship profile (spec §8). Educational text is localized;
 * generic explanations (what F means, the complex-pedigree caveat) live in i18n.
 */
export interface RelationshipProfile {
  id: RelationshipId;
  label: LocalizedText;
  /** How the two people are related (spec §15). */
  description: LocalizedText;
  /** Shared-ancestry context (spec §15). */
  sharedAncestorContext: LocalizedText;
  /** Genealogical definition — also the pedigree's text equivalent (spec §13/§35). */
  pedigreeDefinition: LocalizedText;
  /** Simple-pedigree coefficient, or null for "Unrelated" (spec §10). */
  coefficient: InbreedingCoefficient | null;
  /** How recessive variants can be shared for this relationship (spec §12/§15). */
  recessiveRiskExplanation: LocalizedText;
  /** Reference ids backing any factual claim (spec §33). */
  references: string[];
}

/**
 * Population-level evidence, stored SEPARATELY from pedigree coefficients
 * (spec §17/§32). Rendered only when configured; never scaled between
 * relationships or converted into a personalized absolute risk.
 */
export interface PopulationEvidence {
  id: string;
  relationshipId: RelationshipId;
  /** The evidence claim, framed as population-level (spec §16). */
  claim: LocalizedText;
  population: LocalizedText;
  outcomeMeasured: LocalizedText;
  /** The estimate as descriptive text, e.g. "≈1.7–2.8 percentage points". */
  estimate: LocalizedText;
  /** e.g. "excess risk above a population baseline (population average)". */
  estimateType: LocalizedText;
  limitations: LocalizedText;
  /** Reference id (spec §32/§33). */
  reference: string;
  /** ISO date the evidence was last reviewed (spec §32). */
  lastReviewed: string;
}

/**
 * Optional disease educational context (spec §19). Selecting a disease changes
 * the *explanation only* — it must never change F or produce a probability.
 */
export interface DiseaseContext {
  /** Disease slug (resolves the name/links from the Disease Library). */
  id: string;
  context: LocalizedText;
  /** Optional educational pathway note (e.g. screening → known status → Module 09). */
  pathway?: LocalizedText;
}

/** A structured, citable reference (spec §32/§33). */
export interface RelationshipReference {
  id: string;
  title: LocalizedText;
  publication: LocalizedText;
  year: number;
  url?: string;
}
