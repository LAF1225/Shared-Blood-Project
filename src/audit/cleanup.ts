/**
 * Module 23 — Website Simplification, Redundancy Removal & Canonical Data
 * Cleanup registry (spec §5/§25/§26).
 *
 * DEV / BUILD-TIME ONLY. Reuses the Module 21 audit-metadata architecture. Not
 * imported by any route/component (never in the client bundle). Tracks each
 * verified cleanup target through VERIFY → CONFIRM → REMOVE/MIGRATE → VALIDATE
 * (spec §4). An old Module 21 audit finding is a starting inventory, not delete
 * permission — each record records the post-Module-22 recheck outcome (spec §3/§18).
 */

export type CleanupCategory = 'PLACEHOLDER' | 'SCAFFOLD' | 'DEPENDENCY' | 'DATA_DUPLICATION';

export type CleanupStatus =
  | 'PENDING_VERIFICATION'
  | 'VERIFIED_DEAD'
  | 'VERIFIED_REDUNDANT'
  | 'MIGRATION_REQUIRED'
  | 'REMOVED'
  | 'PRESERVED_AFTER_RECHECK'
  | 'BLOCKED';

export interface CleanupRecord {
  id: string;
  category: CleanupCategory;
  originalAuditFinding: string;
  currentStatus: CleanupStatus;
  consumersFound: string;
  actionTaken: string;
  replacementSource: string | null;
  validation: string;
}

export const CLEANUP_RECORDS: readonly CleanupRecord[] = [
  {
    id: 'op01-family-tree',
    category: 'PLACEHOLDER',
    originalAuditFinding:
      'Module 21: family-tree-explorer coming-soon placeholder overlaps the Relationship Explorer pedigree. Module 22: APPROVED RETIREMENT CANDIDATE (§39).',
    currentStatus: 'REMOVED',
    consumersFound:
      'Only the registry entry in genetics/data/tools.ts; cards/coming-soon lists/[slug] params are all registry-derived; no localization keys (tool content is data, not messages); no navigation entry.',
    actionTaken:
      'Removed the family-tree-explorer entry from GENETICS_TOOLS. /genetics/family-tree-explorer now falls through existing unknown-tool behaviour → notFound (no dedicated deletion route, no redirect added). Relationship Explorer + pedigree + Punnett scenarios untouched.',
    replacementSource: 'Relationship & Recessive Risk Explorer (existing pedigree)',
    validation: 'family-tree.test.ts; grep family-tree/familyTree → only audit/doc history; tsc + genetics tests green.',
  },
  {
    id: 'op02-scaffolds',
    category: 'SCAFFOLD',
    originalAuditFinding:
      'Module 21: 5 empty scaffold feature dirs (calculators, downloads, hospital, map, resources) — export {} + .gitkeep, superseded.',
    currentStatus: 'REMOVED',
    consumersFound:
      'Zero runtime/dynamic imports, no path-alias targets, no tests, no config consumers (only audit doc strings + build cache). Classified EMPTY.',
    actionTaken:
      'Removed all 5 directories. No barrel (no src/features/index.ts) referenced them, so no stale exports. Protected genetics/dna and genetics/punnett; preserved /[locale]/genetics/[slug].',
    replacementSource: 'Real features: genetics/calculator, genetics/pakistan-map, learning (downloads/hospital were never built).',
    validation: 'tsc + full suite; grep features/{calculators,downloads,hospital,map,resources} → none.',
  },
  {
    id: 'op03-recharts',
    category: 'DEPENDENCY',
    originalAuditFinding: 'Module 21: recharts unused (0 src imports).',
    currentStatus: 'REMOVED',
    consumersFound: 'Zero imports/requires/dynamic imports/scripts/mocks/config. Charts are CSS-based.',
    actionTaken: 'Removed via `npm uninstall recharts` (package.json + lockfile updated by the package manager).',
    replacementSource: null,
    validation: 'grep recharts → none in src; tsc + build green.',
  },
  {
    id: 'op03-framer-motion',
    category: 'DEPENDENCY',
    originalAuditFinding: 'Module 21: framer-motion SINGLE_TRIVIAL_USE (only components/motion/Reveal.tsx).',
    currentStatus: 'REMOVED',
    consumersFound:
      'Exactly one importer: components/motion/Reveal.tsx (scroll fade+rise on the homepage). Classified SINGLE_TRIVIAL_USE.',
    actionTaken:
      'Replaced Reveal with a pure-CSS entrance animation (Tailwind `reveal` keyframe, gated behind motion-safe). No animation library and no client JS — Reveal is now a Server Component; content is visible by default (fills at opacity 1) so it can never be left hidden, and reduced-motion users see it immediately. Then removed framer-motion via `npm uninstall`. Module 22 motion (inline SVG/CSS) untouched; no new animation library.',
    replacementSource: 'CSS `reveal` keyframe (tailwind.config.ts) + motion-safe class in components/motion/Reveal.tsx.',
    validation: 'grep framer-motion → none in src; browser-verified 8/8 homepage sections at opacity 1; reduced-motion preserved; tsc + build green.',
  },
  {
    id: 'op04-disease-identity',
    category: 'DATA_DUPLICATION',
    originalAuditFinding:
      'Module 21: disease name / Urdu name / inheritance pattern duplicated between the disease library index and per-disease content files.',
    currentStatus: 'PRESERVED_AFTER_RECHECK',
    consumersFound:
      'Rechecked post-Module-22: DiseaseContent has NO name/nameUr/inheritancePattern fields; the disease page reads identity from the index (Disease); the Evidence Map resolves names via getDiseaseBySlug(id); genetics tools use disease slugs; content/fixtures.ts is a test-only Disease builder. No production identity duplication exists.',
    actionTaken:
      'No duplicate fields to remove (the hypothesised duplication was not present in structured form). Formalized the canonical contract: DISEASES (diseases/data/diseases.ts) is the single identity owner; added a typed inheritanceClassification + a pure getDiseaseIdentity(id) resolver + canonical & cross-feature integrity tests. DiseaseContent already carries diseaseId (slug) + narrative only (§74 already satisfied).',
    replacementSource: 'diseases/data/diseases.ts (DISEASES) + getDiseaseIdentity resolver.',
    validation: 'identity.test.ts (canonical + cross-feature integrity); Module 22 regression + audio + map + localization parity green.',
  },
];
