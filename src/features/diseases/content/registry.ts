import type { DiseaseContent } from './types';
import { betaThalassemiaContent } from './diseases/beta-thalassemia';
import { cysticFibrosisContent } from './diseases/cystic-fibrosis';
import { lysosomalStorageDisordersContent } from './diseases/lysosomal-storage-disorders';
import { ehlersDanlosSyndromeContent } from './diseases/ehlers-danlos-syndrome';

/**
 * Disease content registry.
 *
 * Maps a disease slug → its structured educational content (Module 06). The
 * rendering engine (Module 05) is content-agnostic: adding a new disease
 * requires only a new content file and one entry here — no changes to the
 * rendering logic (§10). A slug with no entry falls back to a metadata-only
 * page with all content sections hidden.
 */
export const DISEASE_CONTENT: Record<string, DiseaseContent> = {
  'beta-thalassemia': betaThalassemiaContent,
  'cystic-fibrosis': cysticFibrosisContent,
  'lysosomal-storage-disorders': lysosomalStorageDisordersContent,
  'ehlers-danlos-syndrome': ehlersDanlosSyndromeContent,
};

/** Look up structured content for a disease slug (null when not yet authored). */
export function getDiseaseContent(slug: string): DiseaseContent | null {
  return DISEASE_CONTENT[slug] ?? null;
}
