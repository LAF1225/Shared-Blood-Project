import type { LocalizedText } from '@/types';

/**
 * Disease Page System — structured content schema (Module 05 §5).
 *
 * This is the *shape* the reusable rendering engine consumes. It contains NO
 * disease-specific content (that is Module 06). Every field is optional except
 * the slug: the template renders whatever exists and hides the rest (§9).
 * New fields can be added here without touching the rendering logic (§5).
 */

/**
 * NOTE: Stories & Perspectives moved to its own system in Module 12
 * (`src/features/stories/`). Stories are no longer embedded in disease content
 * (spec 12 §4) — the resolver supplies them to the Disease Page separately.
 */

/** A generic prose section: intro paragraphs plus an optional bullet list. */
export interface InfoSection {
  paragraphs?: LocalizedText[];
  points?: LocalizedText[];
}

/** A single symptom / sign entry. */
export interface SymptomItem {
  text: LocalizedText;
  note?: LocalizedText;
}

/** A key/value fact shown in the Quick Facts card (spec §7). */
export interface QuickFact {
  /** i18n key within `DiseasePage.quickFacts`, OR provide `label` directly. */
  labelKey?: string;
  label?: LocalizedText;
  value: LocalizedText;
}

/** A scientific reference (spec §15). */
export interface Reference {
  id: string;
  title: string;
  authors?: string;
  publication?: string;
  date?: string;
  /** DOI or URL, if available. */
  url?: string;
}

/** A frequently-asked question (spec §16). */
export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

/** A specialist / healthcare role relevant to the condition (spec §7). */
export interface Specialist {
  id: string;
  role: LocalizedText;
  description?: LocalizedText;
}

/** A resource link (Pakistan resources, organisations, etc.). */
export interface ResourceLink {
  id: string;
  label: LocalizedText;
  description?: LocalizedText;
  href: string;
  external?: boolean;
}

/** A research update entry (spec §7 Research Updates). */
export interface ResearchUpdate {
  id: string;
  title: LocalizedText;
  summary?: LocalizedText;
  date?: string;
  url?: string;
}

/**
 * The full structured content for one disease (spec §5, §7). All optional so
 * the same engine renders a fully-detailed disease and a sparse one identically.
 * `related` disorders are resolved from the Module 04 metadata (`Disease.related`).
 */
export interface DiseaseContent {
  /** Links this content record to a `Disease` metadata record by slug. */
  slug: string;
  lastUpdated?: string;

  quickFacts?: QuickFact[];
  about?: InfoSection;
  earlySymptoms?: SymptomItem[];
  /** Rendered inside an Emergency Alert Box (spec §8). */
  emergencySymptoms?: SymptomItem[];
  /** "Symptoms Families Often Miss" (spec §7). */
  hiddenSymptoms?: SymptomItem[];
  inheritance?: InfoSection;
  diagnosis?: InfoSection;
  treatment?: InfoSection;
  livingWith?: InfoSection;
  /** "Caring for Your Child" (spec §7). */
  parentGuidance?: InfoSection;
  /** "Growing Up & Looking Ahead" (spec §7). */
  growthOutlook?: InfoSection;
  specialists?: Specialist[];
  /** "Specialists & Healthcare Resources" / Pakistan resources (spec §7). */
  resources?: ResourceLink[];
  faq?: FaqItem[];
  researchUpdates?: ResearchUpdate[];
  references?: Reference[];
}
