# Module 22 — Missing Interactive Experiences & Educational Tools · Implementation Report

**Status: implemented.** Extends the existing genetics architecture; no functioning tool was rebuilt. Module 20 governance preserved (§3). Deployment not started (Module 26).

---

## Scope Implemented (§2)
- **BUILT — Disease-Linked DNA Explorer** (repurposed the existing `dna-explorer` entry; no competing DNA route).
- **BUILT — Shared Punnett Square visualization** over the canonical inheritance engine (no second engine).
- **INTEGRATED — Punnett → Inheritance Calculator** (the calculator now renders the shared renderer).
- **INTEGRATED — Punnett educational scenarios → Relationship Explorer.**
- **RETIRED as a build candidate — standalone Family Tree Explorer** (§39); the Relationship Explorer pedigree is preserved.
- **PRESERVED —** canonical inheritance engine, Relationship Explorer pedigree; **PROHIBITED —** any second inheritance/pedigree engine.

## DNA Explorer Architecture (§6–§21)
- Data: `src/features/genetics/dna/` — `types.ts`, `data/records.ts`, `data/references.ts`, pure `resolver.ts`, `components/DnaExplorer.tsx` (client stepper) + `components/DnaVisual.tsx` (lightweight inline SVG).
- Flow (§7): **select disease → gene context → genetic change → function effect → biological consequence → disease connection.** Local transient state only (`selectedDiseaseId`, `selectedSubtypeId`, `activeStep`); guided stepping with clickable completed-step navigation; no quizzes to progress (§8).
- Route: dedicated `/[locale]/genetics/dna-explorer` (code-split; not loaded on the Explorer landing, §49).

## DNA Disease Coverage (§9/§12/§13)
- **Beta-thalassemia → HBB**: reduced/absent beta-globin → globin-chain imbalance → red-cell damage → anaemia.
- **Cystic fibrosis → CFTR**: altered chloride/ion transport → changed salt/water movement → thicker secretions → respiratory/digestive features.
- Specific variants are always labelled as examples — never "the" mutation (§12/§13).

## DNA Subtype Handling (§14/§15)
- **LSD → subtype-specific** (no universal LSD mechanism): Tay-Sachs (HEXA), Gaucher (GBA).
- **EDS → subtype-aware**: Classical (COL5A1) & Vascular (COL3A1) → autosomal-dominant context; Classical-like (TNXB) → autosomal-recessive context.

## DNA Limitation States (§15/§20)
- **Hypermobile EDS → LIMITED_MECHANISM**: an explicit educational limitation state ("current genetic understanding is limited"), **no fabricated mechanism, no gene symbol, no Punnett grid.**
- Resolver states: `SUPPORTED`, `SUBTYPE_REQUIRED`, `LIMITED_MECHANISM`, `UNSUPPORTED` (unknown ids resolve safely — no crash, §51).

## DNA Reference Integration (§21)
- New gene/condition citations (MedlinePlus Genetics: HBB, CFTR, HEXA, GBA, COL5A1, COL3A1, EDS, beta-thalassemia, cystic-fibrosis) in `dna/data/references.ts`, resolved by id. Every supported mechanism cites ≥1 reference; unknown ids are dropped, never fabricated. No canonical reference metadata duplicated.

## Punnett Shared Architecture (§22–§26)
- `src/features/genetics/punnett/`: `PunnettGrid.tsx` (the single grid table, relocated from the calculator), `PunnettSquare.tsx` (shared renderer: outcome summary + grid from a canonical result), `presentation.ts` (one tone map), `scenarios.ts` (pure), `components/PunnettScenarioExplorer.tsx`, `components/PunnettExplorer.tsx`.
- The renderer consumes a canonical `SupportedCalculation` and **never calculates probability itself**; grid cells carry the engine's `outcomeId`. Verified by test: grid cell frequency == canonical outcome distribution.

## Canonical Inheritance Engine Integration (§22)
- One truth source: `calculator/engine.ts` (`calculate()`) + `recessive.ts` / `dominant.ts`. The Punnett scenarios and both integration contexts resolve through it. No second probability engine exists.

## Inheritance Calculator Integration (§27–§29)
- The calculator now renders the shared `PunnettSquare` (summary off — its own probability cards are the "probability display"). Punnett appears only after a supported result (hidden before), and any change to disease/subtype/parent status clears the result (stale invalidation, §29). Unsupported strategies (hEDS) render no grid.

## Relationship Explorer Integration (§34–§38)
- Added an educational transition inside the profile view: a governance callout — **"Relationship alone does not tell us genotype"** — then explicit hypothetical scenarios resolved by the canonical engine and rendered with the shared `PunnettSquare`. No genotype is inferred from relationship; no compatibility/marriage-safety/individual-risk score; no automatic result; no hypermobile scenario.

## Family Tree Retirement Decision (§39)
- **LOCKED:** the standalone Family Tree Explorer is retired as a build candidate. No new family-tree route, second pedigree, or ancestry graph was built. The registry schema supports only `active`/`coming-soon`, so the entry stays `coming-soon` (now directing users to the Relationship Explorer) and its retirement is recorded in dev-only audit metadata (`src/audit`) as an **approved Module 23 retirement candidate**.

## Localization Status (§42–§43)
- New namespaces `DnaExplorer` and `PunnettSquare` + `RelationshipExplorer.scenario.*`, EN + UR. **Full key parity: 1434 == 1434 leaf keys, 25 namespaces.** Gene symbols (HBB, CFTR, COL5A1, …) preserved verbatim, never transliterated.

## RTL Status (§44)
- All new UI is RTL-aware (directional icons flip via `rtl:` utilities; the DNA connection arrow flips; the Punnett grid's parent labels already handle RTL). Biological/genotype meaning is not reversed by RTL.

## Mobile Status (§45)
- Selectors, stepper, controls, and the Punnett grid use responsive grids and ≥44px tap targets; no hover-only controls; long Urdu content wraps. The DNA visual is a fixed-aspect SVG that scales to width.

## Accessibility Status (§46)
- Native radios with fieldset/legend; keyboard-operable step buttons (`aria-current="step"`), prev/next/restart; `aria-live` step content; the Punnett grid is a real table with parent header cells, a text label per cell (never colour alone), and a screen-reader text equivalent + a non-visual outcome summary from the same canonical result. The DNA SVG is decorative (`aria-hidden`) — the text carries meaning.

## Performance Impact (§49)
- DNA Explorer and Punnett client bundles are code-split into their own routes; neither loads on the Explorer landing. No heavy visual dependency added (inline SVG/CSS only — no WebGL/Three.js/animation library). Mechanism data is scoped per disease. `framer-motion`/`recharts` untouched (Module 23 items).

## Governance Validation (§40/§64)
- Transient state only; nothing persisted; no genetic-interest profile; no relationship-to-genotype inference; no compatibility/marriage-safety/individual-risk score; no fabricated hEDS mechanism/grid; no sensitive analytics payload. **Cross-module test:** every DNA + Punnett public string passes the Module 20 `checkPublicClaim` review. All Module 20 tests still pass.

## Tests Added (§57–§64)
- `punnett/scenarios.test.ts` (6): canonical result → grid → cell frequency == distribution; carrier×carrier 25/50/25; dominant 50/50; no hEDS/unsupported scenario; safe unknown id.
- `dna/resolver.test.ts` (8): 4 approved diseases; HBB/CFTR; LSD subtype gate + HEXA/GBA; EDS subtype-aware (COL5A1/COL3A1/TNXB); hEDS LIMITED_MECHANISM; safe unknown disease/subtype; references cited + ordered steps.
- `module22.boundaries.test.ts` (5): DNA + Punnett public text passes Module 20 review; no diagnosis/score wording; no hEDS mechanism/grid; explicit-hypothetical scenarios via the canonical engine; no compatibility/marriage-safety implication.
- Full suite: **430 tests / 43 files pass** (was 411); tsc + eslint clean.

## Existing Systems Preserved (§56)
- Inheritance Calculator, Relationship Explorer + pedigree, Evidence Map, disease pages, disease audio swapping, localization, and governance pages all unchanged in behaviour. The calculator was re-pointed to the shared renderer (its engine/tests unchanged).

## Known Limitations
- DNA content uses simplified, example-level explanations by design (not variant-level). Classical-like EDS (TNXB) cites the EDS condition page (no gene-specific MedlinePlus entry used). Family Tree entry remains visible as `coming-soon` until Module 23 removes it (schema constraint).

## Module 23 Handoff Items (§67)
- Retire the Family Tree placeholder from the registry/navigation; plus the existing Module 23 backlog (empty scaffold removal, `recharts` removal, single-use `framer-motion` review, canonical disease-data cleanup).

## Module 24 Handoff Items (§68)
- Homepage entry points, navigation reconciliation, placeholder-route decisions, approved public-data connections, and final genetics-tool cross-navigation. (Module 22 already wired Punnett into its two approved contexts — part of the feature.)

## Module 25 QA Items (§69)
- Representative-device / keyboard / focus-order / RTL / Urdu-overflow / slow-network / cross-browser sweep for the DNA stepper and Punnett grid; disease-content completeness pass.
