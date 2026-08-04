# Shared Blood — Feature Audit, Redundancy Review & Scope Lock (v1)

**Module 21 · Audit-only · Non-destructive**
Generated after Modules 01–20, before further interactive development, simplification, integration, QA, or deployment.

> **AUDIT_ONLY_MODE (spec §4).** This report *inspects, classifies, and recommends*. It changes no product behaviour. Nothing here is approved. No routes, pages, components, disease content, audio, or calculators were deleted, merged, renamed, or restructured. Module 20 governance wins on any conflict (spec §3). Recommendation ≠ approval (spec §52/§55).
>
> **Machine-readable companion:** structured records live in `src/audit/` (`FEATURE_AUDIT_RECORDS`, `REDUNDANCY_RECORDS`, `MISSING_FEATURE_RECORDS`, `MODULE_COMPARISONS`, `MODULE_2x_CANDIDATES`, `HUMAN_DECISIONS_REQUIRED`, `SCOPE_LOCK`). They are dev/build-time only and are never imported by the app, so they never enter the public client bundle (spec §62/§64). Self-consistency is enforced by `src/audit/audit.test.ts`.

---

## 1. Executive Summary (spec §51)

Shared Blood is, structurally, a **mature and coherent bilingual education platform**. The Modules 01–20 systems exist, type-check, test green, and follow a consistent, config/data-driven, governance-first architecture. The dominant gaps are (a) **one expected interactive feature is missing — the disease-linked DNA tool**, (b) **a handful of navigation destinations are still placeholder stubs**, and (c) **minor dead code / one unused dependency**. There are **no confirmed governance violations** and **no BROKEN features** in this audit.

**Overall application state:** builds clean, `tsc` clean, **398/398 feature tests pass** (39 files) + **13/13 audit self-consistency tests**. 33 page routes present.

**Does it behave as one coherent product?** *Mostly.* The shell, localization, disease system, genetics tools, education sections, and governance pages interlock well. Coherence is undercut in two places: **primary/footer nav links to placeholder pages** (About, Hospitals, Contact), and the **homepage omits entry points** for several built sections (Research, Policy, Genetic Testing, Early Signs, Care & Support).

**Counts:**
- **Routes:** 33 page routes (incl. 6 dev-only `/preview` routes and 1 legacy redirect).
- **Audited features:** 36 records → **22 KEEP · 5 MODIFY · 0 MERGE · 2 REMOVE · 7 MISSING · 0 BROKEN**.

**Major missing / broken:** Disease-linked **DNA interactive tool** (MISSING, HIGH → Module 22). About / Hospitals / Contact / Downloads pages are **placeholder stubs** (MISSING). Global search is **partial** ("coming soon", deferred from Module 03). No BROKEN features found.

**Major redundancy:** 5 empty scaffold feature directories (superseded dead shells); disease name/inheritance data duplicated across the library index and content files (canonical-source cleanup).

**Governance (Module 20):** **Compliant.** The §42 checklist found no persisted calculator data, no individual genetic-risk profiles, no genetic/CNIC/B-Form/child-symptom collection, and no raw participant data or private audio in public bundles (server-only stories resolver + `null` production datasets). The map avoids hotspot claims; the relationship tool avoids compatibility/marriage-safety scores.

**Performance:** minor only — `recharts` is an **unused** dependency; `framer-motion` is a heavy client library used by a single reveal wrapper.

**DNA interactive tool status:** **MISSING** (only a coming-soon placeholder exists) → **Module 22, HIGH** (spec §27/§60).

**Integration readiness:** *Near.* Wiring is sound; the main integration work is reconciling nav→placeholder pages, adding homepage entry points, and connecting approved data to the four intentionally-empty public sections (Survey, Community, Research, Policy).

**Deployment readiness:** **Not yet — and not claimed** (spec §51/§61). Deployment begins only at Module 26, after Modules 22–25. Blockers are the missing DNA tool, placeholder nav destinations, and content/data decisions below.

---

## 2. Current Application Inventory (spec §17)

Derived from the actual codebase.

- **Framework:** Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind, next-intl v3. Locale-prefixed `[locale]` routing, `localePrefix: 'always'`.
- **Feature systems (`src/features/`, real):** diseases (library + shared content pages), genetics (explorer, calculator, relationship, pakistan-map), stories (audio), early-signs, care-support, genetic-testing, survey, community, research, policy, governance, learning, homepage.
- **Empty scaffold feature dirs:** calculators, downloads, hospital, map, resources (`export {}` + `.gitkeep`).
- **Shared components:** brand, feedback, layout (Header/Footer/Nav/Mobile/Breadcrumbs/Placeholder/containers), motion (Reveal), search, ui.
- **Constants/wiring:** `routes.ts`, `navigation.ts`, `diseases.ts` (4 disease ids), `provinces.ts`, `languages.ts`, `config.ts`.
- **Localization:** `messages/en.json` + `messages/ur.json` — **1381 leaf keys each, 23 namespaces, perfect parity**.
- **Assets:** `public/logo.png`, `public/logo-mark.png`, `public/media/sample-story.wav` (dev sample). No oversized/broken assets found.
- **Dependencies:** next, react, next-intl, clsx, tailwind-merge, lucide-react (used); framer-motion (single use); **recharts (unused)**.

---

## 3. Route Audit (spec §18) — *no routes removed*

| Route | Status | Class | Note |
|---|---|---|---|
| `/[locale]` (home) | Implemented | MODIFY | Missing entry points to several sections |
| `/diseases`, `/diseases/[slug]` | Implemented | KEEP | Library + shared disease page |
| `/diseases/preview`, `/diseases/stories-preview` | Dev-only | KEEP | force-dynamic, 404 in prod |
| `/genetics`, `/genetics/[slug]` | Implemented | KEEP | Explorer + reusable tool page |
| `/genetics/inheritance-calculator` | Implemented | KEEP | Code-split calculator |
| `/genetics/relationship-risk` | Implemented | KEEP | Relationship explorer + pedigree |
| `/genetics/pakistan-map` | Implemented | KEEP | Evidence map |
| `/map` | Redirect | KEEP | → `/genetics/pakistan-map` (superseded, handled) |
| `/early-signs`, `/care-support`, `/genetic-testing` | Implemented | KEEP | Education explorers |
| `/survey` (+`/preview`) | Implemented | KEEP | Empty in prod (approved empty state) |
| `/community` (+`/preview`) | Implemented | KEEP | Empty in prod |
| `/research` (+`/preview`) | Implemented | KEEP | Empty in prod |
| `/policy` (+`/preview`) | Implemented | KEEP | Empty in prod |
| `/privacy`, `/ethics`, `/governance` | Implemented | KEEP | Module 20 pages, live |
| `/resources`, `/resources/[slug]` | Implemented | KEEP | Learning centre + resource template |
| `/about` | **Placeholder** | MISSING | In primary nav |
| `/hospitals` | **Placeholder** | MISSING | In primary + footer nav |
| `/contact` | **Placeholder** | MISSING | In footer nav |
| `/downloads` | **Placeholder** | MISSING | NavId declared but unsurfaced |
| `/search` | Partial | MODIFY | "coming soon" (deferred in Module 03) |
| `/[...rest]` | Implemented | KEEP | Localized 404 |

**Dead/orphan/placeholder routes:** About, Hospitals, Contact, Downloads render `PlaceholderPage`. `/map` is an intentional redirect (not an orphan). Preview routes are intentional dev-only.

---

## 4. Navigation Audit (spec §19)

- **Architecture:** excellent — one config (`navigation.ts` + `routes.ts`) drives header, mobile, footer, breadcrumbs. Adding a destination is a one-line change.
- **Findings:**
  - **Nav promises placeholder destinations:** About + Hospitals (primary), Contact (footer) resolve to stubs. This is the biggest "feels like modules, not one product" signal (spec §19).
  - **Declared-but-unsurfaced:** `NAV_IDS` includes `downloads`, but it is rendered in neither `PRIMARY_NAV` nor `FOOTER_NAV`.
  - No dead links among real destinations, no loops, no conflicting terminology detected; primary nav breadth (13 items) is on the higher side but not excessive.

---

## 5. Page Purpose Audit (spec §20)

Every major page has a clear, single answer to "what should the user do here?" — diseases (learn/browse), genetics tools (understand a concept), map (see documented evidence), education sections (guidance), governance (commitments). **Exceptions:** the four placeholder pages have no fulfilled purpose yet; the homepage does slightly too much introduction relative to onward routing for some sections while omitting others.

---

## 6. Homepage Audit (spec §21) — *not restructured*

Renders (in order): Hero → Project Introduction → Featured Diseases → Genetics Explorer preview → Map preview → Awareness Statistics → Community Impact → Parent Resources → Survey Invitation.

- **Missing core entry points:** Research, Policy, Genetic Testing, Early Signs, Care & Support are not linked from the homepage.
- **Placeholder data:** the homepage module still notes "placeholder data where future modules are pending" — verify `homepageData.ts` is current.
- No competing-CTA or duplicated-disease-content problems severe enough to flag beyond the above. **Recommendation:** add entry points in Module 24; do not restructure here (spec §21).

---

## 7. Disease System Audit (spec §22–§23, §58)

- **Locked swap architecture confirmed:** `slug → DISEASE_CONTENT registry → structured content → rendered shared DiseasePage`. No hardcoded per-disease layouts; unauthored slug → metadata-only fallback (supported empty state). **KEEP; protect (spec §58).**
- **Disease content completeness:** all 4 approved disorders (beta-thalassemia, cystic-fibrosis, lysosomal-storage-disorders, ehlers-danlos-syndrome) have authored content files with name/Urdu name/intro/inheritance/symptoms/testing/management/references. A strict field-by-field completeness pass is deferred to Module 25 (do not invent missing medical content, spec §23).
- **Data duplication:** disease display name / Urdu name / inheritance pattern appear in both the library index and the content files → recommend a canonical source (Module 23), do not migrate now (spec §34).

---

## 8. Audio System Audit (spec §24, §59)

- **Swap architecture confirmed:** disease record → `audioRecordId` → server-only approved-audio resolver → player or approved empty state. Audio is **not** globally bundled (spec §59).
- **Governance separation:** the feature barrel exports only public-safe UI/types; the resolver + consent live under `server/` and are never re-exported → cannot reach the client bundle.
- **Production audio is intentionally empty** (`STORY_RECORDS = []`) → disease pages omit the Stories section (supported empty state). Full player/transcript/consent/identity/disclaimer UI exists and is exercised by tests + the dev preview. One sample `.wav` exists for dev. **KEEP.**

---

## 9. Calculator Audit (spec §25)

- One general, educational **Inheritance Probability Calculator**, code-split into its own route (never loads on the Explorer landing).
- **Disease compatibility is respected:** per-disease/subtype strategy config — beta-thal & CF → autosomal-recessive; LSD subtypes (Tay-Sachs, Gaucher) → autosomal-recessive; **EDS subtypes** map classical/vascular → autosomal-dominant, classical-like → autosomal-recessive, **hypermobile → `unsupported`** (no calculator forced where inheritance is unclear). This satisfies "do not add a calculator simply because a disease exists" (spec §25).
- Output wording is explicitly non-diagnostic; state is transient (no persistence) → Module 20-compliant. **KEEP.**

---

## 10. Interactive Experience Audit (spec §26)

Built & functional: Inheritance Calculator, Relationship Explorer (+pedigree), Evidence Map, Stories audio player. **Not satisfied by static content:** the **disease-linked DNA tool** (see §11). Coming-soon placeholders: Family Tree Explorer, Punnett Square, DNA Explorer.

---

## 11. DNA Interactive Tool Status (spec §27/§60) — **MISSING · HIGH · → Module 22**

The disease-linked DNA interactive tool **does not exist**. The only DNA artefact is the `dna-explorer` registry entry with `status: 'coming-soon'` and a single overview sentence framed as a generic "structure of DNA" viewer — no interaction, no disease selection, no gene→function→manifestation mapping. A grep for DNA/helix components found only text mentions, no interactive component. A decorative animation or static helix would not satisfy the requirement (spec §27).

Expected flow (spec §27): **Select disease → gene/DNA context → genetic change → biological instruction/function affected → disease manifestation**, kept disease-specific.

**Classification:** MISSING → **Module 22, HIGH**. Module 21 must not build it (spec §60). Reusable inputs for Module 22: per-disease data (`diseases.ts` + content files), the shared tool-page framework, and existing localization scaffolding.

---

## 12. Interactive Slide Status (spec §28–§29)

No fully-built multi-step interactive slide/stepper sequences were found beyond the tool interactions above; the coming-soon placeholders are the candidate slots. No dead controls or broken steppers detected (nothing to break). Where future interaction is built, apply the §29 test: interaction must materially improve understanding.

---

## 13. Redundancy Findings (spec §30–§34)

| Pair | Type | Action | Note |
|---|---|---|---|
| `/map` vs `/genetics/pakistan-map` | ROUTE | KEEP_BOTH | Redirect, not a duplicate |
| Empty scaffolds vs real features | SYSTEM | REMOVE_A | Dead shells (Module 23) |
| Disease name/inheritance: index vs content | DATA | MODIFY_BOTH | Canonical source (Module 23) |
| Family Tree placeholder vs Relationship pedigree | INTERACTION | MODIFY_BOTH | Human decision |
| Punnett placeholder vs Inheritance Calculator | INTERACTION | MODIFY_BOTH | Human decision |

**Note (spec §57):** similarity ≠ redundancy. EN/UR are not duplicates; disease summaries vs full explanations, and governance-required repeated disclaimers, are intentional and were **not** flagged.

---

## 14. Duplicate Component / Data Findings

- **Components:** no functionally-duplicate components found (the shared DiseasePage, tool page, and explorer patterns are deliberately reused, not duplicated).
- **Data:** the disease name/Urdu name/inheritance duplication (index ↔ content) is the one substantive item → canonical-source recommendation.

---

## 15. Dependency Findings (spec §35)

| Dependency | Use | Recommendation |
|---|---|---|
| next, react, next-intl, clsx, tailwind-merge, lucide-react | Used | KEEP |
| **recharts** | **0 src imports** | **REMOVE (Module 23)** — charts are CSS-based |
| **framer-motion** | 1 importer (`Reveal.tsx`) | **MODIFY/review (Module 23)** — heavy dep for a trivial fade; consider CSS replacement |

*Dependencies were not removed (spec §35).*

---

## 16. Asset Findings (spec §36)

Logo + logo-mark present (the approved identity — must remain, spec §36). One dev sample `.wav`. `public/assets/.gitkeep` empty. No unused/oversized/broken assets detected.

---

## 17. Performance Concerns (spec §37)

Minor: unused `recharts` in the tree; `framer-motion` for a single reveal effect. No globally-loaded disease data/audio (audio is resolver-driven), no oversized images, no excessive animation systems. `performanceConcern: true` set on the two dependency records. Optimization deferred (later module).

---

## 18. Localization Findings (spec §38)

**Strongest system in the codebase.** 1381 EN keys == 1381 UR keys, 23 namespaces, zero orphaned keys either direction. Disease/calculator/interaction/research/advocacy/governance copy is bilingual in data. No machine-translation performed (spec §38). No hardcoded-English leakage found in the audited surfaces.

---

## 19. RTL Findings (spec §39)

RTL is applied via `dir="rtl"` on the Urdu locale; governance pages, disease pages, and tools were built RTL-aware. No structural RTL failures observed in inspection; a representative RTL sweep across steppers/slides is a Module 25 QA item once new interactions (DNA tool) are built.

---

## 20. Mobile Findings (spec §40)

No mobile-blocking issues found in inspection. Representative-width verification for new interactive experiences (DNA tool) belongs to Module 22/25. Recorded as QA sweep items, not blockers.

---

## 21. Accessibility Findings (spec §41)

Semantic containers, labelled controls, transcript-backed audio, and table alternatives for charts are present. A full structural a11y sweep (heading hierarchy, focus, keyboard for any new interactions) is a Module 25 item. No major (MODIFY/BROKEN-level) a11y failure identified in the current build.

---

## 22. Governance Boundary Findings (spec §42) — **Compliant**

Checklist result: **no violations.**
- No persistent calculator inputs/outputs (transient state).
- No individual genetic-risk profiles; no genetic/CNIC/B-Form/child-symptom collection.
- No raw participant data or private audio in public bundles (server-only stories resolver; `null` production datasets for survey/community/research/policy).
- Map avoids prevalence/hotspot claims; relationship tool avoids compatibility/marriage-safety scores; research/policy assertive text passes the Module 20 public-claim checker (spec §113).

No sensitive records are reproduced in this report (spec §42/§64).

---

## 23. Module 01–20 Implementation Comparison (spec §43–§44)

Categorical estimates only (no fabricated percentages, spec §44). Full detail in `MODULE_COMPARISONS`.

| Module | Estimate | Watch items |
|---|---|---|
| 01 Foundation | COMPLETE | 5 dead scaffolds |
| 02 Homepage | MOSTLY_COMPLETE | missing entry points |
| 03 Nav & Search | MOSTLY_COMPLETE | nav→placeholders; search deferred |
| 04 Disease Library | COMPLETE | name/data duplication |
| 05 Shared disease page | COMPLETE | — |
| 06 Disease content | COMPLETE | QA field completeness |
| 08 Genetics Explorer | MOSTLY_COMPLETE | DNA tool missing; 3 placeholders |
| 09 Inheritance Calculator | COMPLETE | — |
| 10 Relationship Explorer | COMPLETE | — |
| 11 Evidence Map | COMPLETE | — |
| 12 Stories/Audio | COMPLETE | prod stories empty (by design) |
| 13 Early Signs | COMPLETE | no homepage entry |
| 14 Care & Support | COMPLETE | no homepage entry |
| 15 Genetic Testing | COMPLETE | no homepage entry |
| 16 Survey | COMPLETE | prod dataset empty |
| 16b Learning Centre | COMPLETE | — |
| 17 Community | COMPLETE | prod dataset empty |
| 18 Research | COMPLETE | prod dataset empty |
| 19 Policy | COMPLETE | prod dataset empty |
| 20 Governance | COMPLETE | do not weaken |

---

## 24. Classification Registries (spec §5)

**KEEP (22):** home-catchall 404, navigation architecture*, localization, brand/logo, disease library, shared disease-page architecture, disease content (4), genetics explorer, inheritance calculator, relationship explorer, evidence map, legacy `/map` redirect, learning centre, early signs, care & support, genetic testing, stories/audio, survey, community, research, policy, governance pages, governance posture. *(nav architecture is KEEP; its placeholder targets are the MODIFY.)*

**MODIFY (5):** homepage (entry points), navigation (placeholder targets), search (deferred), framer-motion (single-use), dna-explorer placeholder entry (fold into Module 22).

**MERGE (0):** none. (Two interaction overlaps are recorded as redundancy human-decisions, not forced merges.)

**REMOVE (2):** 5 empty scaffold feature dirs (one record), unused `recharts` dependency. *Recommended for removal pending approval — not removed (spec §9).*

**MISSING (7):** disease-linked DNA tool (HIGH), About, Hospitals, Contact, Downloads, Family Tree Explorer, Punnett Square.

**BROKEN (0):** none found.

---

## 25. Module 22–25 Candidates (spec §46–§49)

- **Module 22 (missing interactive/educational):** disease-linked **DNA tool (HIGH)**; Family Tree Explorer (decision); Punnett Square (decision).
- **Module 23 (simplification/removal):** remove 5 scaffold dirs; remove `recharts`; reconsider `framer-motion`; canonical source for disease fields.
- **Module 24 (integration/wiring):** reconcile nav→placeholder pages; homepage entry points; connect approved data to empty sections; reconcile `downloads` NavId.
- **Module 25 (QA):** disease field completeness; empty-state consistency (EN/UR); search state polish; a11y/RTL/mobile sweep for new interactions.

---

## 26. Critical Blockers

**None at CRITICAL priority.** No governance violations, no BROKEN core functionality. The highest-priority items are **HIGH**, not CRITICAL: the missing DNA tool and the placeholder pages sitting in primary/footer navigation.

---

## 27. Human Decisions Required (spec §52)

Recommendation ≠ approval. Full detail in `HUMAN_DECISIONS_REQUIRED`.

- **HD-01 — Placeholder pages in nav (About/Hospitals/Contact).** *Recommend:* implement About + governance-safe Contact for v1; decide Hospitals scope; defer anything not shipping out of nav.
- **HD-02 — Disease-linked DNA tool.** *Recommend:* approve for Module 22 (HIGH); repurpose the coming-soon `dna-explorer` entry.
- **HD-03 — Remove dead scaffolds + `recharts`.** *Recommend:* approve for Module 23.
- **HD-04 — Coming-soon tools (Family Tree, Punnett).** *Recommend:* build only if distinct from existing tools; else retire the placeholders.
- **HD-05 — Empty public sections (Survey/Community/Research/Policy).** *Recommend:* keep built + in nav; connect approved data when it exists.
- **HD-06 — Homepage entry points.** *Recommend:* add in Module 24; no homepage restructure in Module 21.

---

## 28. Recommended Final Scope (spec §53–§55) — *unapproved*

**Core (keep):** shell, localization, disease library + shared disease pages (4 disorders), genetics explorer, inheritance calculator, relationship explorer, evidence map, education sections (early-signs, care-support, genetic-testing, learning/resources), stories/audio, survey, community, research, policy, governance pages.

**Approved interactive candidates (pending):** DNA tool (Module 22); Family Tree / Punnett only if distinct.

**Removal candidates (pending):** 5 scaffold dirs, `recharts`, possibly `framer-motion`.

**Merge candidates:** none forced; two interaction overlaps for human decision.

> **Scope Lock (spec §55):** **NOT LOCKED.** `SCOPE_LOCK.version = null`; all approval arrays empty. Module 21 must not fabricate approvals. Required flow: **Audit → Classification → Recommendation → Human Review → Scope Decision → Scope Lock → Module 22/23 execution.**

---

## 29. Integration & Deployment Readiness

- **Integration readiness:** near. Wiring is correct; remaining work is nav/homepage/data connection (Module 24).
- **Deployment readiness:** **not ready, not claimed** (spec §51/§61). Deployment starts at Module 26 after Modules 22–25.

**Pipeline:** 21 (this) → 22 (DNA/interactive) → 23 (simplification) → 24 (integration) → 25 (QA) → 26 (deploy) → 27 (launch). Do not skip to deployment (spec §61).

---

## 30. Evidence & Method (spec §56/§65)

Findings cite real routes, file paths, data files, dependencies, and message-key counts (above and in `src/audit/`). Build health at audit time: `tsc` clean, **398/398** feature tests (39 files) + **13/13** audit tests, prior build **93/93 pages**. No sensitive participant/consent/audio/genetic/child data was copied into this report (spec §64).

*End of Module 21 audit v1. Module 21 stops here and awaits human scope decisions (spec §68).*
