# Module 25.7 — Client-Side Locale Switching Fix & Localization Integrity · Report

**Status: fixed and verified.** A language switch now completes the whole transition (URL, locale, `dir`, metadata, navigation, and page body) with **no manual reload**, in both directions, verified on a **production build served by `next start`**. Two defects were found and fixed. Deployment not started (§26).

## 1. Reproduction

On any page, activating the other language updated the URL, `lang`, `dir`, `<title>` and all navigation labels, but the **page body stayed in the previous language** until a manual refresh. Reproduced deterministically on `/en/about` → `/ur/about` (heading remained "About Shared Blood") in **both dev and a production build**, so it was never a dev-only artifact.

## 2. Root-cause investigation (§3)

The architecture was traced before any change was attempted: `LanguageSwitcher`, `src/i18n/routing.ts` (`localePrefix: 'always'`), `src/i18n/navigation.ts` (`createNavigation`), `src/i18n/request.ts` (`getRequestConfig` + `requestLocale`), `src/middleware.ts` (`createMiddleware`), `src/app/[locale]/layout.tsx` (`setRequestLocale`, `getMessages`, `NextIntlClientProvider`, `<html lang dir>`), the page Server Components, provider boundaries, and `next.config.mjs`.

**The server was never at fault.** Probing the running server directly proved it returns correct per-locale content:

| Request | Contains Urdu identity | Contains English identity |
|---|---|---|
| `/ur/about` (document) | yes | no |
| `/ur/about?_rsc=…` (**RSC payload**) | **yes** | **no** |
| `/en/about?_rsc=…` (RSC payload) | no | yes |

The page code is also correct: pages call `setRequestLocale(locale)` and pass the explicit `locale` to `getTranslations`. During a switch an RSC request for the destination *was* issued, `lang`/`dir` flipped, and the client provider's messages updated (which is why navigation relocalized).

**Confirmed root cause:** Next's **client Router Cache** replayed the previously rendered **page segment** for the same logical route. Layout-level output (`lang`, `dir`, metadata, provider messages) was re-rendered, while the cached page segment was reused, so only the body appeared stale. With Next 15 defaults (`staleTimes.static = 300`) and 91 statically generated pages, cached segments are reused for five minutes. The stale layer was the client cache and nothing else.

## 3. Fix selection and justification (§4)

Three candidates were implemented and measured rather than assumed:

| Option | Result | Verdict |
|---|---|---|
| **A. Scoped cache invalidation** in the switcher | Correct body in both directions; **1 extra RSC request only when the user changes language**; ordinary navigation keeps the Router Cache | **Selected** |
| B. `experimental.staleTimes: {static: 0}` globally | Also correct (1 RSC request per switch), but disables cached-segment reuse for **every** navigation site-wide | Rejected: penalises all navigation for a rare action (§22) |
| C. Locale-keyed remount | Cannot help: the stale content is a cached **server** payload, not client state | Rejected on analysis |

Selected fix = **A**, the smallest change with the smallest blast radius: one deliberate user action invalidates the cache; all other navigation is untouched. `next.config.mjs` is unchanged.

**`router.refresh()` verification (§4/§19):** no infinite loop, no refresh accumulation (exactly one navigation + one invalidation per switch, asserted in tests and observed across five consecutive switches), no hydration error, no console error, no production-only regression. **No forced full browser reload was used.**

A note on an early false alarm: after the fix the DOM briefly shows the outgoing tree parked in a hidden container (`div[hidden]`, React's streaming/transition staging area). This was investigated rather than dismissed: these containers exist on a plain page load **before any switch**, stay **bounded at 2** across repeated switches, contain no visible content, are excluded from the accessibility tree, and create **no duplicate `main` and no duplicate element IDs** (`getElementById('main-content')` resolves to the visible `main`, so the skip link still works). It is normal React machinery, not a double render of the page.

## 4. Second defect found and fixed: dropped disease context (§14)

Verification of the DNA Explorer exposed a separate bug: `usePathname()` from next-intl excludes the query string, so switching language **silently dropped an active `?disease=` context** (`/en/genetics/dna-explorer?disease=ehlers-danlos-syndrome` → `/ur/genetics/dna-explorer`, subtype preselection lost).

Fixed with an explicit allowlist in `buildLocaleSwitchPath`: **only `disease` survives**. Genotype, carrier status, parent status, probability, relationship result and any other derived or personal genetics state are dropped, matching the Module 24 context allowlist. The destination route still re-validates `disease` and ignores unknown values.

`window.location.search` is read inside the click handler rather than via `useSearchParams()` **on purpose**: the switcher lives in the global header, and subscribing to search params at render time would opt all 91 statically generated pages out of static rendering. Static page count is unchanged at 91/91, confirming this.

## 5. Files investigated / changed

- **Investigated:** `LanguageSwitcher.tsx`, `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts`, `middleware.ts`, `app/[locale]/layout.tsx`, `app/[locale]/about/page.tsx`, `providers/`, `next.config.mjs`.
- **New:** `src/lib/localeSwitch.ts` (`performLocaleSwitch`, `buildLocaleSwitchPath`, `PRESERVED_QUERY_PARAMS`), `src/lib/localeSwitch.test.ts`.
- **Changed:** `src/components/ui/LanguageSwitcher.tsx` (delegates to the tested transition).
- **Unchanged:** `next.config.mjs`, routing, middleware, layout, all page components, all genetics logic.

## 6. Regression test (§8/§23)

The transition was extracted into a pure function so its contract is unit-tested without adding a browser-automation dependency (§26 forbids a new heavy dependency). `src/lib/localeSwitch.test.ts` — **14 tests** covering: no-op on same locale, equivalent-route preservation EN→UR and UR→EN, **cache invalidation present**, invalidation ordered *after* navigation, deep genetics/disease route preservation, no scroll-to-top, repeated bidirectional switching without accumulation, `?disease=` preservation, and rejection of every sensitive parameter.

**Proven to fail if the bug returns:** temporarily removing the cache invalidation made exactly the three guarding tests fail (5 passed, 3 failed), and the file was restored immediately afterwards.

## 7. Bidirectional results (§7)

Acceptance chain per §2 — URL → locale → RTL → navigation → body → interactive UI, no reload:

| Surface | EN→UR | UR→EN | Notes |
|---|---|---|---|
| About (Server Component) | pass | pass | **production build**; stale identity absent both ways |
| Homepage | pass | pass | 5 consecutive switches, no degradation |
| Care & Support (mobile 320px) | pass | pass | switcher reachable in the menu, 0 overflow |
| DNA Explorer (+ `?disease=`) | pass | pass | context preserved, subtype re-selected |
| Punnett Square | pass | pass | see §8 |
| Disease Library, Genetics tools, editorial pages | pass | pass | via shared switcher + verified server payloads |

Stale-identity assertions were made against **visible** content (`main.innerText`), which is the user-facing truth, not raw `innerHTML` (which includes React's hidden staging container).

## 8. Genetics results (§9–§12)

- **Canonical probabilities unchanged.** Punnett scenario `recessive-carrier-carrier` in English produced **25% / 50% / 25%** with genotypes `AA, Aa, Aa, aa`. After switching to Urdu and re-selecting the same scenario: **identical 25% / 50% / 25%**, identical genotype tokens, same 6-cell grid. Genotype symbols remain **verbatim Latin**, not transliterated.
- **Transient state resets cleanly** (explicitly permitted by §10): after a switch the scenario selection resets to the initial choice state — 3 scenarios offered, none checked, **no stale grid and no partial result**. No persistence was added for locale switching.
- **hEDS remains `LIMITED_MECHANISM`:** across EN, UR and back, the Ehlers-Danlos context showed **no Punnett grid (0 tables)** and **no fabricated gene** for hypermobile EDS.
- **No cross-tool genetics state** was introduced; the only value that crosses a locale switch is the educational `disease` id.

## 9. Navigation regression (Module 25.6, §15)

Six primary entries preserved (Home, Learn, Genetics, Pakistan Map, Resources, About), localized dropdowns and mobile accordion, locale-preserving child links, correct active parent groups, Search and language reachable, Family Tree retirement intact. No second navigation configuration was created. All 39 route-integrity tests still pass.

## 10. History, repeated switching, mobile (§16/§17)

Five consecutive switches (EN→UR→EN→UR→EN) produced correct locale every time with **no accumulating refreshes, no duplicate navigation, no refresh loop, and hidden containers bounded at 2**. Mobile verified at 320px: correct destination, `dir="rtl"`, localized body, **0 horizontal overflow** in both directions. Client-switched destinations agree with direct loads except for intentionally transient tool state.

## 11. Runtime and localization integrity (§19)

No uncaught exceptions, unhandled rejections, hydration mismatches, or navigation errors. One `MISSING_MESSAGE` seen earlier in the session was traced to a **stale dev-server message cache** (keys added while the server was running); it does not reproduce after a restart and is absent from the production build. Localization parity preserved: **EN 1497 = UR 1497**, 28 namespaces, Nav keys identical.

## 12. Final gate (§24)

| Gate | Result |
|---|---|
| Em-dash check | passes (catalogs + `src`) |
| TypeScript | clean |
| ESLint | **0 errors, 0 warnings** |
| Test suite | **511 passed / 50 files** (was 497/49; +14 locale tests) |
| Localization parity | EN 1497 = UR 1497, 28 namespaces |
| Production build | succeeds, **91/91** static pages |
| Shared First Load JS | **102 kB (unchanged)** |
| New dependencies | **none** |

## 13. Performance (§22)

No change to shared First Load JS (102 kB), no change to static page count (91/91), no new dependency. The only added work is **one RSC request per deliberate language change**; ordinary navigation still benefits from the Router Cache because the global `staleTimes` default was intentionally left untouched.

## 14. Known limitations

1. **Production verification in this harness is partial for code-split interactive routes.** In the production build, routes whose content sits behind a Suspense boundary with a code-split client component (e.g. `/diseases`, `/genetics/inheritance-calculator`) never complete React's inline streaming swap **inside this preview harness**: the boundary stays pending and the content remains in the hidden staging container. Evidence this is a harness limitation and not an application defect: the production **server HTML is complete and correct** (heading and all four radio inputs present when fetched directly), **all 29 JS chunks load** with non-zero size, `readyState` is `complete`, there are **no console errors**, and the same routes render normally in dev and as server-rendered pages in production. Consequently the interactive genetics verification above was performed in dev, while production acceptance was proven on server-rendered routes. **Recommendation: a short real-browser smoke test of the interactive tools against `next start` before deployment.**
2. Screenshots remain uncapturable in this harness; evidence is DOM/RSC/computed-state based.
3. WebKit/Gecko and physical-device passes remain on the Module 26 pre-launch list.

## 15. Deployment-readiness recommendation

The reported defect is fixed at its root, a second (query-context) defect was found and fixed, and the full regression gate is green with no dependency or bundle cost. **Recommended: ready to proceed to Module 26**, conditional on the short real-browser production smoke test of the interactive genetics tools noted in §14.1.

**Deployment has not begun and Module 26 was not started automatically** (§26).
