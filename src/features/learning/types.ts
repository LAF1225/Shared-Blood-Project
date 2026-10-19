import type { LocalizedText } from '@/types';

/**
 * Parent Learning Centre — content model (Module 07).
 * Structured educational resources for parents, caregivers, teachers, NGOs, and
 * community health workers. Content only; presentation is handled by the
 * Learning Centre components. New resources are added by appending data — no
 * structural changes required (spec §19).
 */

/** Resource categories (spec §5). Extendable without logic changes. */
export type ResourceCategoryId =
  | 'understanding-genetics'
  | 'early-symptoms'
  | 'caring-for-child'
  | 'child-development'
  | 'medical-appointments'
  | 'school-education'
  | 'emotional-support';

export interface ResourceCategory {
  id: ResourceCategoryId;
  /** i18n key within `Learning.categories`. */
  labelKey: string;
  /** lucide icon name resolved in the component. */
  icon: string;
}

/** The kind of resource (drives homepage grouping, spec §6/§9/§10). */
export type ResourceType = 'booklet' | 'guide' | 'development';

/** Downloadable file formats (spec §14). Files themselves come from Module 15. */
export type DownloadFormat = 'pdf' | 'infographic' | 'checklist' | 'poster';

/** Languages printed in a downloadable file: both side by side, or English only. */
export type DownloadLanguages = 'bilingual' | 'en';

export interface ResourceDownload {
  format: DownloadFormat;
  /**
   * Public path of the file under `public/` (e.g. `/resources/<slug>.pdf`).
   * Undefined = prepared/pending. Existence and size are checked by
   * `downloads.test.ts`.
   */
  fileUrl?: string;
  sizeLabel?: string;
  languages?: DownloadLanguages;
}

/** A prose block within a resource's educational content (spec §7). */
export interface ResourceSection {
  heading?: LocalizedText;
  paragraphs?: LocalizedText[];
  points?: LocalizedText[];
}

/**
 * A single educational resource (spec §7 page structure + §8 booklet metadata).
 * All content fields are optional so the page template renders what exists and
 * hides the rest.
 */
export interface LearningResource {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: ResourceCategoryId;
  type: ResourceType;
  featured?: boolean;
  /** Name variants + synonyms for search (spec §12). */
  keywords: string[];

  // §8 booklet metadata
  version?: string;
  publicationDate?: string;

  // §7 educational resource page content
  content?: ResourceSection[];
  practicalGuidance?: LocalizedText[];
  keyTakeaways?: LocalizedText[];
  relatedResources?: string[];
  relatedDiseases?: string[];

  // §14 downloads (prepared; files in Module 15)
  download?: ResourceDownload;
}

/** A centralized FAQ entry (spec §11). */
export interface LearningFaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

/** Category filter identifier: a real category or the "all" pseudo-filter. */
export type ResourceCategoryFilterId = ResourceCategoryId | 'all';
