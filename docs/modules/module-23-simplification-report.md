# Module 23 — Website Simplification, Redundancy Removal & Canonical Data Cleanup · Report

**Status: implemented.** Controlled, verified cleanup only. No redesign, no feature work, no deployment. Every target followed VERIFY → CONFIRM → REMOVE/MIGRATE → VALIDATE, one category at a time (§4). Machine-readable registry: `src/audit/cleanup.ts`.

---

## 1. Post-Module-22 Baseline
DNA Explorer + shared Punnett implemented; Punnett integrated with the calculator and Relationship Explorer; Family Tree retired as a build candidate; canonical inheritance engine + pedigree preserved; 430 tests / 43 files; tsc + ESLint clean.

## 2. Cleanup Scope Executed
OP01 Family Tree placeholder retirement · OP02 dead scaffold removal · OP03 dependency cleanup (recharts, framer-motion) · OP04 canonical disease identity consolidation. Protected systems untouched (§14).

## 3. Family Tree Retirement
Verified the only real consumer was the registry entry in `genetics/data/tools.ts` (cards, coming-soon list, and `[slug]` params are all registry-derived). Removed the entry. `/[locale]/genetics/family-tree-explorer` now falls through existing unknown-tool behaviour → `notFound` (no deletion route, no redirect added, §31). Relationship Explorer, pedigree, and Punnett scenarios preserved.

## 4. Family Tree Registry Changes
`GENETICS_TOOLS` no longer contains `family-tree-explorer`. No retired-status flag was added (§29). Active tools unchanged: inheritance-calculator, relationship-risk, pakistan-map, dna-explorer, punnett-square.

## 5. Family Tree Localization Cleanup
None required: Family Tree title/summary lived in the tool data (`tools.ts`), not in `messages/*`. No FAMILY_TREE_ONLY message keys existed, so no keys were removed. EN/UR parity unchanged (1434 = 1434).

## 6. Scaffold Candidates Rechecked
`features/{calculators, downloads, hospital, map, resources}` re-verified post-Module-22: zero runtime/dynamic imports, no path-alias targets, no tests, no config/script consumers (only audit doc strings + build cache). Classified **EMPTY**. `genetics/dna` and `genetics/punnett` protected.

## 7. Scaffolds Removed
All 5 empty directories removed. No `src/features/index.ts` barrel existed, so there were no stale exports to clean. `/[locale]/genetics/[slug]` dynamic routing preserved (§40). Incidental: removed one verified-dead `cn` import in `pakistan-map/EvidenceMapExplorer.tsx` (ESLint now fully clean, 0 warnings).

## 8. Scaffold Candidates Preserved
None preserved — all 5 were empty. (The `/map` redirect route and `ROUTES.map` are unrelated to the removed empty `features/map` scaffold and remain.)

## 9. Recharts Verification
Repository-wide search: zero imports/requires/dynamic imports/scripts/mocks/config. Charts are CSS-based. Confirmed unused.

## 10. Recharts Final Decision
**Removed** via `npm uninstall recharts` (package.json + lockfile updated by the package manager, §44). No source references remain.

## 11. Framer Motion Verification
Exactly one importer: `components/motion/Reveal.tsx` (homepage scroll fade+rise). Classified **SINGLE_TRIVIAL_USE**.

## 12. Framer Motion Final Decision
**Removed** via `npm uninstall framer-motion` after replacing the single use natively.

## 13. Native Motion Replacement
`Reveal` rewritten as a **pure-CSS entrance animation** (Tailwind `reveal` keyframe gated behind `motion-safe`). No animation library, **no client JS — `Reveal` is now a Server Component**. Content is visible by default (the animation fills at opacity 1), so it can never be left hidden; `prefers-reduced-motion` users see content immediately with no transform. Browser-verified: 8/8 homepage sections render at opacity 1. Module 22 motion (inline SVG/CSS) untouched; no new animation library or shared motion abstraction added (§46/§47).

## 14. Canonical Disease Identity Source
`DISEASES` in `src/features/diseases/data/diseases.ts` is designated the single canonical owner of disease identity (id, localized name, disease-level inheritance). A pure resolver `getDiseaseIdentity(id)` was added (returns `undefined` for unknown ids, §70/§89).

## 15. Canonical Disease Identity Type
Added `DiseaseInheritanceClass` (`AUTOSOMAL_RECESSIVE | AUTOSOMAL_DOMINANT | SUBTYPE_DEPENDENT | COMPLEX_OR_UNRESOLVED`) and a required `inheritanceClassification` field on `Disease` (§60). Distinct from the executable calculator `InheritanceStrategyId` (§59) and the localized display string. `DiseaseIdentity` interface returned by the resolver.

## 16. Disease Fields Consolidated
**Recheck outcome: no production duplication existed to remove.** `DiseaseContent` carries only `slug` + narrative (no name/nameUr/inheritancePattern); the disease page reads identity from the index (`Disease`); the Evidence Map resolves names via `getDiseaseBySlug(id)`; genetics tools use disease slugs. The Module 21 "index vs content identity duplication" finding did not hold post-verification → status **PRESERVED_AFTER_RECHECK** (documented, §3/§18/§71). Value added: the canonical owner is now formalized with a typed classification + resolver to prevent future drift, enforced by tests.

## 17. Disease Content Migration
None needed — `DiseaseContent` already carried `diseaseId` (slug) + narrative only, satisfying §74 (no name/inheritance convenience fields to remove).

## 18. DNA Education Layer Protection
`src/features/genetics/dna/` untouched. HBB, CFTR, HEXA, GBA, COL5A1, COL3A1, TNXB, genetic-change/function/consequence/connection education, hEDS LIMITED_MECHANISM, and DNA references remain feature-specific; `diseaseId` remains a foreign reference to canonical identity (§58). Verified by `dna/resolver.test.ts` (unchanged, passing).

## 19. Inheritance Engine Protection
Canonical engine untouched — single probability truth source. EDS subtype strategy unchanged (classical/vascular → dominant; classical-like → recessive; hEDS → unsupported, §59/§61). Punnett remains presentation-only.

## 20. Evidence Map Migration Impact
None — the map already resolves display names by id via `getDiseaseBySlug` (no embedded disease names). Integrity asserted by `identity.test.ts` (all map disease ids resolve to canonical identity). No geographic evidence moved into the registry (§68).

## 21. Audio System Migration Impact
None — audio swapping (`diseaseId → audioRecordId → resolver`) untouched; no audio moved into the identity registry (§67). Disease pages still resolve their audio configuration.

## 22. Localization Status
EN/UR parity preserved: **1434 = 1434 leaf keys, 25 namespaces.** No keys removed (no Family-Tree-only keys existed). `DnaExplorer`, `PunnettSquare`, `RelationshipExplorer.scenario` protected (§81).

## 23. Performance Impact
Improved: removed 2 dependencies (recharts unused; framer-motion) and made `Reveal` a Server Component (less client JS on the homepage). Shared First Load JS 102 kB; build 91/91 pages (down from 93 — Family Tree's two locale pages no longer generated). Genetics landing lazy-loading + DNA/Punnett route code-splitting + audio loading unchanged.

## 24. Governance Validation
Module 20 preserved. No user disease/genetic-interest/relationship profiles, no calculated-risk history, no persisted genotype state introduced. Canonical disease registry is public application content, not a user data store (§87). No analytics added (§88). Module 20 governance tests pass; Module 22 governance boundary tests pass.

## 25. Tests Added
- `genetics/registry.test.ts` (4): Family Tree absent from registry/coming-soon; Module 22 tools active; Punnett scenarios preserved.
- `diseases/identity.test.ts` (8): canonical identity for all 4 diseases; EDS/LSD stay subtype-dependent; unique ids; unknown/subtype ids fail safely; cross-feature integrity (content, DNA, calculator, Evidence Map ids all resolve to canonical identity, subtype ids excluded).

## 26. Tests Removed and Why
None. No Family-Tree-placeholder-exclusive tests existed. No test was deleted for changing file locations (§94/§103).

## 27. Final Test Status
**442 tests / 45 files pass** (was 430/43; +12 from the two new files). All Module 20 governance and Module 22 regression tests pass.

## 28. TypeScript Status
`tsc --noEmit` clean.

## 29. ESLint Status
Clean — 0 errors, **0 warnings** (the one pre-existing unused-import warning was removed).

## 30. Remaining Known Duplication
None material. Test fixtures (`content/fixtures.ts`) build synthetic `Disease` objects for the preview route — a legitimate test helper, not a second canonical identity source.

## 31. Blocked Cleanup Items
None.

## 32. Module 24 Handoff Items
- Final active genetics tool registry: inheritance-calculator, relationship-risk, pakistan-map, dna-explorer, punnett-square (Family Tree removed).
- Canonical disease identity source: `getDiseaseIdentity` / `DISEASES`.
- Dependency status: recharts + framer-motion removed.
- Removed public placeholder route: `/genetics/family-tree-explorer` (now 404). **No redirect added** — Module 24 owns the redirect decision if a navigational need arises (redirect only to Relationship Explorer, never the calculator, §31).
- Still Module 24's remit: homepage entry points, navigation reconciliation, remaining placeholder-route decisions (about/hospitals/contact/downloads/search), public-data connections, genetics-tool cross-navigation.

## 33. Module 25 QA Items
Disease-page identity display; Urdu disease names; inheritance labels; Evidence Map labels; DNA/calculator disease selection; disease audio swapping; Relationship Explorer after Family Tree retirement; native CSS reveal motion (reduced-motion + cross-browser).

## 34. Module 26 Deployment Risks
- Removed dependencies (recharts, framer-motion) + lockfile change — clean install must be re-verified in the deploy pipeline.
- Removed public placeholder route `/genetics/family-tree-explorer` (now 404) — update any external links/sitemaps.
- New Tailwind `reveal` keyframe — ensure production CSS build includes it.
- No canonical-data import-path or build-time data-resolution changes that affect deployment beyond the above.
