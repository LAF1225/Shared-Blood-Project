# Module 25.6 — Navigation Architecture Consolidation & Route Integrity · Report

**Status: implemented.** The public header is consolidated from 13 top-level items to the locked six entry points, with accessible desktop dropdowns and a mobile accordion driven by one canonical configuration. **No route was changed, renamed, moved, or redirected** (§14). Deployment not started (§28).

> Verification environments actually used: headless-Chromium preview (1280px and 320px, EN + UR), Node `fetch` direct-load sweep, a **production build served by `next start`**, and the automated gates (tsc, ESLint, vitest, next build, em-dash check). Screenshots remain uncapturable in this harness (the screenshot call times out), so evidence is DOM/SSR/computed-style based.

## 1. Old vs final navigation structure

**Before (13 primary entries):** Home · Disease Library · Early Signs · Care & Support · Genetics Explorer · Genetic Testing · Pakistan Map · Resources · Survey · Community · Research · Policy · About

**After (6 primary entries, §2/§3):**

| Entry | Type | Contents |
|---|---|---|
| Home | direct | `/` |
| Learn | group | Disease Library, Early Signs, Care & Support, Genetic Testing |
| Genetics | group | Genetics Explorer, Inheritance Calculator, DNA Explorer, Punnett Square, Relationship Explorer |
| Pakistan Map | direct | `/genetics/pakistan-map` |
| Resources | group | Resources, Survey |
| About | group | About Shared Blood, Community, Research, Policy |

Search and language switching remain **utility controls**, visually and structurally separate from the six entries (§12, verified in the DOM). **No public feature was hidden**: every previously reachable destination is still reachable, and the Genetics group actually *increased* discoverability by surfacing all five tools that previously required a visit to the Explorer landing page. Hospitals and Downloads were **not** added (§22).

## 2. Canonical navigation source (§4)

`src/constants/navigation.ts` is the single source of truth:
- `PRIMARY_NAV: readonly NavEntry[]` — the six entries; each is *either* a direct `href` *or* a `children` group, never both.
- `PRIMARY_DESTINATIONS` — the flattened destination set, derived from the tree.
- `NAV_ENTRY_IDS` / `NavEntryId` — group identifiers.

Desktop (`Navigation.tsx`), mobile (`MobileNav.tsx`), the localized labels, and every route-integrity test read from this one config, so desktop and mobile cannot drift apart. Genetics tool paths were added to `ROUTES` (`inheritanceCalculator`, `dnaExplorer`, `punnettSquare`, `relationshipRisk`) pointing at the **existing, unchanged URLs**, so nothing hardcodes a path.

## 3. Desktop dropdown implementation (§5/§7)

`src/components/layout/NavDropdown.tsx`, hand-rolled with local state only (no menu library, no global state, §24):
- **Hover is an enhancement, never the only mechanism.** Click and keyboard activation both open the menu.
- **No premature closing:** a 150 ms close delay plus a contiguous hover area (the offset is padding on the panel wrapper, not margin) means moving the pointer from trigger to menu never closes it. Measured gap: **0 px**.
- Outside pointer press closes; Escape closes and restores focus to the trigger; choosing a destination navigates and closes.
- Visual treatment follows Module 25.5: restrained border, `shadow-card`, existing radii and tokens, one chevron, no oversized floating panel and no card-per-link.

**Measured state machine** (single-execution test, Genetics group):
`initial closed → click → open → Escape → closed + focus restored → click → open → click → closed → click → open → outside press → closed`. All correct.

**Hover test** (Learn group): hover in → open; leave → **still open during the grace window**; re-enter → still open; leave + delay elapsed → closed.

## 4. Mobile implementation (§9/§10)

`MobileNav.tsx` renders the same canonical hierarchy as tap-to-expand accordion groups (no hover). Home and Pakistan Map stay direct links. Verified at **320 px**:
- 6 top-level items; 4 groups; every group trigger and every child link measured at **44 px** height.
- `aria-expanded` + `aria-controls` on each group; panels use the `hidden` attribute so collapsed items leave the tab order and the accessibility tree.
- The group containing the current page **starts expanded**, so the active destination is never hidden behind a collapsed section.
- Tap expands, tap again collapses. **0 horizontal overflow** before and after expanding, in both locales.
- Depth never exceeds primary group → destination. Search and language remain available below the groups.

## 5. Keyboard and accessibility (§6)

- Menu-only triggers are semantic `<button>`s; every destination is a semantic `<Link>`, so Tab order is natural and all child routes are keyboard reachable. The disclosure-navigation pattern was chosen over `role="menu"`, which would impose arrow-key-only semantics on ordinary page links.
- `aria-expanded`, `aria-controls`, `aria-haspopup` present on all four desktop triggers and all four mobile group triggers (verified in the DOM).
- Escape closes and **restores focus to the trigger** (verified: `document.activeElement === trigger`).
- Closed panels are `hidden`, so there is no focus trap and no hidden tab stop (confirmed: closed dropdown links are absent from the interactive accessibility tree).
- Global `:focus-visible` ring retained.

**Defect found and fixed during this module:** on `/genetics/punnett-square`, *two* links carried `aria-current="page"` (the ancestor "Genetics Explorer" and the actual page), which misreports the current location to screen readers. Fixed by splitting the two concerns in `src/lib/nav.ts`:
- `resolveActiveHref()` — longest match, so exactly **one** item is visually highlighted in a group.
- `isCurrentPage()` — exact match, so `aria-current="page"` marks **only** the page being viewed; ancestor section links are highlighted but never announced as current.

Verified live: exactly 1 `aria-current` in the header on a tool page. Regression-tested (3 new cases, including "never more than one current page across all destinations").

## 6. Active states (§8)

`resolveActiveEntryId(pathname, PRIMARY_NAV)` resolves the parent group by longest-href match, so a nested direct entry beats a shallower group. Active treatment uses **background + font weight**, not colour alone.

All 19 active-state cases are unit-tested, including the critical one:

| Route | Active entry |
|---|---|
| `/diseases/beta-thalassemia` | Learn |
| `/genetics/relationship-risk` | Genetics |
| **`/genetics/pakistan-map`** | **Pakistan Map** (not Genetics) |
| `/survey` | Resources |
| `/community`, `/research`, `/policy` | About |

## 7. Route integrity results (§15)

`src/audit/routeIntegrity.test.ts` — **39 tests, all passing**, every expectation derived from `PRIMARY_NAV` so they cannot silently drift:
- exactly six entries in the locked order; each entry is direct XOR group.
- no empty, `undefined`, `#`, or non-absolute href.
- **every destination resolves to a real App Router `page.tsx`** (this also proves direct loadability, §17).
- no destination points at the retired Family Tree; the `family-tree-explorer` directory does not exist.
- no unintended placeholder linked (`/hospitals`, `/downloads` absent).
- no duplicate destinations; flattened set matches the tree.
- every pre-existing section still present (13-route coverage assertion).
- all five genetics tools present under Genetics.
- every label key resolves in **both** locales, and no navigation string contains an em dash (§25).

## 8. Click-through, direct-load, Back/Forward (§16/§17/§18)

- **Direct-load sweep:** **44 route × locale combinations** (17 nav destinations + 5 utility routes × EN/UR) fetched directly. All returned **200**, each had an `<h1>`, every `/ur` route rendered `dir="rtl"`, none referenced Family Tree, none contained a runtime-error marker, none contained an em dash. Page identities matched expectations (e.g. `/en/genetics/punnett-square` → "Punnett Square Visualizer").
- **Click-through:** OPEN NAVIGATION → ACTIVATE DESTINATION → ROUTE CHANGES → PAGE LOADS → IDENTITY APPEARS → NO ERROR, verified via the Genetics menu to Punnett Square using stable identifiers (path + `h1`), not fragile visual selectors.
- **Back/Forward:** Home → child → Back → Home → Forward → child. Correct path, correct `h1`, correct active state, and **no stale open dropdown** at any step (`openMenus: 0` throughout).

## 9. Urdu and RTL results (§11)

Tested independently at desktop and 320 px:
- Six entries render correctly: ہوم · سیکھیں · جینیات · پاکستان نقشہ · وسائل · تعارف.
- All five Genetics children render in Urdu with **locale-preserved** hrefs (`/ur/genetics/...`).
- Dropdown panel is correctly **right-aligned to the trigger in RTL** (logical `start-0`) and stays inside the viewport.
- Mobile accordion: `dir="rtl"`, 44 px targets, long Urdu labels such as "شیئرڈ بلڈ کا تعارف" wrap inside the viewport, **0 overflow**.
- Exactly one `aria-current` on the Urdu current page. Directional chevrons adapt; information hierarchy and scientific meaning are unchanged.

## 10. Genetics route verification (§21)

All five tools opened from the Genetics menu and loaded directly, EN + UR, desktop + mobile: Genetics Explorer, Inheritance Calculator, DNA Explorer, Punnett Square, Relationship Explorer. Each returned 200 with its expected heading and no runtime error. **No genetics behaviour, logic, or state was modified**; no cross-tool genetics state was introduced. The full genetics suite (engine, subtype gates, hEDS `LIMITED_MECHANISM`, connections, Punnett scenarios) passes unchanged.

## 11. Dead navigation audit (§23)

No stale links, no empty or `undefined` hrefs, no `#` placeholders, no Family Tree references, no duplicate nav routes, no links to removed pages. Enforced by tests, not just inspection.

## 12. Runtime error detection (§20)

Console inspected across the click-through, dropdown, mobile, locale and Back/Forward flows. One error surfaced during the session: `MISSING_MESSAGE: Could not resolve Nav.dnaExplorer for locale en`. **Root cause: a stale dev-server message-module cache** — the new keys were added while the dev server was already running. After restarting the server the error does not reproduce, all labels resolve, and the production build is clean. Not a code defect; recorded here for transparency rather than omitted.

## 13. Search and language switching (§12)

Search is untouched and still reaches its honest coming-soon state; no new search system was built. Language switching preserves the equivalent route (`/ur/genetics/dna-explorer` → `/en/genetics/dna-explorer`), flips `dir`, and correctly relocalizes the header, page `<title>`, and all navigation labels. See the known limitation below.

## 14. Performance (§24)

- **Shared First Load JS: 102 kB — unchanged.** Static pages: **91/91 — unchanged.**
- No menu dependency, no new global state library, no animation framework, no genetics feature imports pulled into the header. `NavDropdown` is local `useState` plus two document listeners; the only new import is one `ChevronDown` icon from the icon set already in use.
- Nothing heavy is preloaded: the dropdown renders plain links, so genetics tools are still only fetched on navigation.

## 15. Em dash policy (§25)

Module 25.5 policy remains active. No em dash was introduced into navigation labels, ARIA labels, dropdown text, or any public string. `npm run check:emdash` **passes** (catalogs + `src`), and the route-integrity suite independently asserts no em dash in any navigation label in either locale.

## 16. Final regression results (§26)

| Gate | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | clean |
| ESLint | **0 errors, 0 warnings** |
| Test suite | **497 passed / 49 files** (was 458/48; +39 route-integrity tests) |
| Localization parity | **EN 1497 = UR 1497**, 28 namespaces, Nav keys identical in both |
| Production build | succeeds, **91/91** static pages |
| Shared First Load JS | **102 kB** (unchanged) |
| Em-dash check | passes |

All previously passing tests still pass. `integration.test.ts` was updated to read `PRIMARY_DESTINATIONS` (the flattened canonical set) instead of the old flat `PRIMARY_NAV`; its assertions are unchanged in intent.

## 17. Known limitations

1. **Pre-existing: client-side locale switching does not relocalize page body content.** Switching language updates the route, `dir`, `<title>`, and every navigation label correctly, but the page body keeps the previous locale until a reload (`/ur/about` still showing "About Shared Blood"). **Reproduces in the production build**, so it is not a dev artifact. It affects pages site-wide and is **not introduced by this module** — the navigation this module owns relocalizes correctly, and neither `LanguageSwitcher` nor any page component was modified here. Likely cause: `router.replace(pathname, { locale })` performs a client navigation that is served from Next's client Router Cache, so the previously rendered Server Component payload for that path is reused. Typical remedies are a `router.refresh()` after the locale change or a `staleTimes` configuration. **Deliberately not fixed here** (out of this module's navigation-architecture scope); recommended as a small dedicated follow-up before deployment.
2. Screenshots could not be captured (harness limitation); evidence is DOM/SSR based.
3. WebKit/Gecko and physical-device passes remain unavailable here and stay on the Module 26 pre-launch list.

## 18. Files changed

- **New:** `src/components/layout/NavDropdown.tsx`, `src/audit/routeIntegrity.test.ts`.
- **Rewritten:** `src/constants/navigation.ts` (canonical six-entry config + flattened destinations), `src/components/layout/Navigation.tsx`, `src/components/layout/MobileNav.tsx`.
- **Extended:** `src/constants/routes.ts` (named constants for existing genetics tool URLs), `src/lib/nav.ts` (`resolveActiveEntryId`, `resolveActiveHref`, `isCurrentPage`).
- **Updated:** `src/audit/integration.test.ts` (uses `PRIMARY_DESTINATIONS`), `messages/en.json` + `messages/ur.json` (7 new Nav labels each, parity preserved).

## 19. Status

Module 25.6 is implemented and verified. **Deployment has not begun and Module 26 was not started automatically** (§28). Awaiting review or the next module spec.
