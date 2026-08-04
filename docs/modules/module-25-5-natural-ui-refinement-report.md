# Module 25.5 — Natural UI Refinement & Full-System Integrity Pass · Report

**Status: implemented.** Refinement, not redesign. Information architecture, navigation, genetics governance, performance envelope, and completed functionality are all preserved. Deployment not started (Module 26). The ui-ux-pro-max skill was invoked as the review framework **before** any UI change (§2, §22).

> Honesty note (consistent with Module 25): only the tooling actually available was used — the headless-Chromium preview, server-side rendering / `fetch`, static analysis, and the automated gates (tsc / ESLint / vitest / next build). Screenshots could not be captured (the preview screenshot call times out in this harness), so before/after evidence is recorded as SSR/DOM structure and computed styles rather than images. WebKit/Gecko and physical-device passes remain a Module 26 pre-launch item.

## 1. ui-ux-pro-max audit (actual application, not the screenshot)

Ran `--design-system` and audited the real source. Key finding: the design **tokens** are already editorial and specific (serif `Newsreader` headings, fluid `display` size, `tracking-kicker`, teal-tinted `shadow-card`, `max-w-prose`, tabular figures, RTL-aware Urdu line-heights). The template feeling was **not** in the tokens; it was in **composition** — one grammar repeated across the site:

> `SectionContainer → SectionHeading (kicker + h2 + subtitle) → grid of Card { pale rounded icon-square + h3 + paragraph + ghost "Learn more →" }`

Concrete repetitions identified:
- The pale rounded **icon-square** (`h-11/12 w-11/12 rounded-xl bg-*/10 ring`) in 7 components: `DiseaseCard`, `ToolCard`, `ResourceCard`, `FeaturedDiseases`, `SurveyInvitation`, `CommunityImpact`, search empty-state.
- The **same `Droplet` icon on every disease** (homepage + library) — decorative, no semantic value (§7).
- The **Disease Library as a product-card grid**; disease names only `text-xl`, so they never anchored the page (§6).
- Section headings almost all at one scale (`text-2xl/3xl`), weak display-vs-section-vs-item differentiation (§8).

The skill's generic auto-recommendation (cyan palette, Lora/Raleway, "exaggerated minimalism") was **deliberately not adopted** — §3 forbids swapping the cream/teal identity or fonts. Only the editorial/typographic-hierarchy direction was taken.

## 2. Visual patterns removed / reduced

- **Per-disease `Droplet` icon-square** — removed from `DiseaseCard` and homepage `FeaturedDiseases`. Typography now leads.
- **Disease Library card grid** — replaced by an editorial condition directory (below).
- **Redundant icon-square in `ResourceCard`** — removed; the category is already carried by its text badge (§7 "remove when typography communicates it").

## 3. Components retained vs redesigned (with reasons)

| Component | Decision | Reason |
|---|---|---|
| Disease Library grid → `DiseaseDirectoryItem` (new) | **Redesigned** | §6 flagship — editorial directory |
| Homepage `FeaturedDiseases` | **Redesigned** | de-carded, editorial index, name-anchored |
| `DiseaseCard` (disease-page "Related") | **Kept, de-iconed** | containment justified for a small related set (§4); Droplet removed |
| `ResourceCard` | **Kept, de-iconed** | icon redundant with category badge |
| genetics `ToolCard` | **Kept as card** | tools are distinct applications; containment communicates that (§4) |
| `ConceptGrid` | **Kept** | genetics primer; distinct icons aid orientation, icon-left layout differs from disease cards |
| `CommunityImpact` (3 pillars) | **Kept** | three *distinct* semantic icons aid recognition (§7 "keep when they aid recognition") |
| `SurveyInvitation` | **Kept** | single CTA icon in a feature banner, not a repeated grid |

Icons were reduced where decorative/duplicated, **kept where they aid recognition or navigation** (§7) — not replaced with new illustrations.

## 4. Disease Library redesign (§6, flagship)

New `src/features/diseases/components/DiseaseDirectoryItem.tsx` renders an **editorial condition directory**:
- The **disease name is the anchor and the link** — serif `Newsreader`, `text-2xl → text-[1.7rem]` (~27px, up from ~20px `text-xl`).
- Rows separated by **hairline dividers** (`divide-y divide-border/70`), no boxes.
- **Asymmetric two-column** composition on desktop: name + summary (left), quiet metadata — category, body system, related conditions — in a bordered second column (`md:grid-cols-[minmax(0,1fr)_15rem]`, `md:border-s`).
- **Featured** entries carry a small accent "Featured" kicker label, not a boxed card.
- No decorative icon container.

Accessibility of the row: the name is a real `<a>` with `py-2` padding (a comfortably large, ≥44px-class tap target); the related-condition links remain **separate, independently focusable** links (an earlier stretched-`::after` overlay was removed precisely because it would sit over those nested links and confuse keyboard/pointer order). `DiseaseLibrary` keeps its client-side search/filter, featured-in-browse-only logic, empty state, and disclaimer unchanged.

Verified (SSR + DOM): 8 directory rows; serif name at 27.2px in Newsreader; no Droplet; dividers present; "Body system" metadata present; `?disease=` behaviour and related-links unaffected.

## 5. Homepage changes

- `FeaturedDiseases` rebuilt as a distinct **editorial index** (name-left / summary-right rows with dividers), different from the library's layout so the two surfaces don't read identically (§10). Droplet removed; each condition name is the link.
- No homepage redesign, no hero change, no reordering, CSS `Reveal` untouched. Other sections (`ProjectIntroduction` drop-cap + asymmetric two-column, etc.) already had editorial variety and were left as-is.

## 6. Navigation

**No navigation changes.** All primary + footer destinations preserved (Home, Disease Library, Early Signs, Care & Support, Genetics Explorer, Genetic Testing, Pakistan Map, Resources, Survey, Community, Research, Policy, About, Search, language switch). Nothing hidden to "look minimal" (§9). Verified via SSR nav inventory.

## 7. Page-specific composition (§10)

Research / Policy / Community / Survey already use bespoke, non-card-grid presentations (charts, archives, timelines, methodology blocks) that satisfy their "document/evidence-oriented" and "geographic" directions, so they were audited and intentionally left unchanged. The refinement concentrated on the highest-repetition surfaces the module named (Disease Library, homepage, disease/tool cards).

## 8. Mobile-first results

Checked at 320px (mandatory) and across the responsive range. **0 horizontal overflow** on homepage, Disease Library (EN + UR), and Resources at 320px. The directory collapses to a single readable column on mobile (name → summary → metadata) rather than a stacked desktop grid. Touch target on the name link raised to `py-2` (≥44px class).

## 9. Urdu / RTL results

`/ur/diseases` renders `dir="rtl"`, `lang="ur"`, Urdu disease-name anchors, **0 overflow at 320px**, no em dash in rendered text. Logical properties (`border-s`, `ps-*`, `rtl:rotate-180` / `rtl:group-hover:-translate-x-1`) adapt direction correctly; scientific meaning is not reversed. Gene symbols (HBB, CFTR, HEXA, GBA, COL5A1, COL3A1, TNXB) remain verbatim and were never touched.

## 10. Accessibility results

Semantic headings preserved (`h1` page title, `h2` sections, `h3` disease names); name and related links are real anchors, keyboard-focusable, with the global high-contrast `:focus-visible` ring; `aria-live` search region intact; no color-only meaning introduced; no overlay traps (stretched-link overlay deliberately removed). Icon reductions do not remove any information (icons were decorative or duplicated a text label).

## 11. Feature regression (§13)

No functionality changed. Verified: all nav destinations; EN/UR + RTL; Disease Library search/filter/empty-state; disease→tool `?disease=` preselection (`inheritance-calculator?disease=cystic-fibrosis` → CF radio checked); placeholders and intentional Family Tree 404 unaffected. No route added or removed (91/91 pages unchanged).

## 12. Genetics governance regression (§14)

**No genetics logic touched.** Canonical engine remains the only probability source; Punnett stays a presentation layer; DNA mappings (beta-thalassemia→HBB, CF→CFTR, LSD→subtype, Tay-Sachs→HEXA, Gaucher→GBA, EDS→subtype, Classical→COL5A1, Vascular→COL3A1, Classical-like→TNXB) unchanged; hEDS remains `LIMITED_MECHANISM` (no fabricated gene/grid); no compatibility/marriage/individual-risk scoring; no cross-tool genetics state introduced by the redesign. All Module 20/22 boundary + connection + calculator tests pass.

## 13. Em dash removal & prevention (§19, non-negotiable)

Public copy lives in **two** places: the message catalogs *and* content-data / JSX literals under `src/`. Both were swept.

- **Message catalogs**: 50 English + 54 Urdu occurrences removed. English received **individually-tailored, varied** punctuation (comma / colon / semicolon / parentheses) chosen per grammatical context; Urdu received the natural Urdu clause separator «،» and parentheses for parenthetical inserts.
- **Source content** (`src/features/**`, JSX literals): **395 occurrences across 79 files** removed by a **context-rule transformer** — paired inserts → parentheses; English single dashes → semicolon before an independent clause (pronoun subject) else comma; Urdu single dashes → «،». This is replacement *by grammatical context*, not one uniform mark (§19).
- **Out of scope** (§19 / §78, internal/non-public): developer comment lines, test files, and the dev-only implementation records under `src/audit/` (which retain their em dashes).
- Smart-quoted terms (e.g. "risky"/"bad", "for"/"against") and scientific meaning preserved; gene symbols untouched.

**Automated prevention added:**
- `scripts/check/no-em-dash.mjs` + `npm run check:emdash` — scans the message catalogs (all leaves) **and** public-facing `src/` content (non-comment lines, excluding tests + `src/audit/`), lists any offender, exits non-zero.
- `src/audit/emDash.test.ts` — the same guard inside the vitest suite, so `npm test` fails on any new public-facing em dash in either language.

**Result: zero em dashes remain in active public-facing copy** (catalogs + source). Check and test both green.

## 14. Tests / TypeScript / ESLint / build

- **TypeScript**: `tsc --noEmit` clean.
- **ESLint**: 0 errors, 0 warnings.
- **Tests**: **458 passed / 48 files** (Module 25 baseline 456/47; +2 tests in the new `emDash.test.ts`). All prior content/governance tests pass unchanged after the copy edits.
- **Production build**: succeeds, **91/91 static pages** (unchanged).
- **Localization parity**: EN == UR leaf strings (parity holds; only values changed, no keys added/removed). Namespaces: 28.

## 15. Performance comparison (§17)

- **Shared First Load JS: 102 kB — unchanged.**
- Static page count: **91/91 — unchanged.**
- `/diseases` route: ~1.76 kB / 152 kB First Load (the directory removed a card component and two lucide icon imports from that path).
- **No new dependencies.** framer-motion and recharts remain absent. No images, no client-rendering, no animation framework added. Refinement was achieved through composition, typography, spacing, borders, and existing tokens (§11).

## 16. Dependencies

None added or removed. `package.json` gained only a `check:emdash` script.

## 17. Known visual limitations

- Screenshots could not be captured in this harness (preview screenshot times out); evidence is SSR/DOM/computed-style based.
- WebKit/Gecko rendering, true 200% browser zoom, and physical-device passes were not available here (engine-agnostic standard HTML/CSS; low risk) — carried to Module 26 pre-launch, consistent with the Module 25 handoff.
- The English single-dash → comma/semicolon heuristic in content data favours grammatical safety; a small number of clauses could alternatively read as colons, but all are meaning-preserving and within §19's allowed punctuation set.

## 18. Testing environments actually used

Headless Chromium preview (320 / 1280 px, EN + UR), Node `fetch` SSR inspection, and the automated gates (`tsc`, `next lint`, `vitest run`, `next build`, `check:emdash`) on the local Windows environment.

## 19. Files changed (summary)

- New: `src/features/diseases/components/DiseaseDirectoryItem.tsx`, `scripts/check/no-em-dash.mjs`, `src/audit/emDash.test.ts`.
- Redesigned: `DiseaseLibrary.tsx`, `FeaturedDiseases.tsx`; de-iconed `DiseaseCard.tsx`, `ResourceCard.tsx`.
- Copy: `messages/en.json`, `messages/ur.json`, and 79 public `src/**` content files (em-dash removal only).
- `package.json`: added `check:emdash` script.

## 20. Status

Module 25.5 is implemented and fully verified against the Module 25 baseline. **Deployment is not started; Module 26 is not begun automatically** (§21). Awaiting review or the next module spec.
