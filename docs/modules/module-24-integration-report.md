# Module 24 — Cross-Module Wiring, Navigation Reconciliation & Public Experience Integration · Report

**Status: implemented.** Connect, don't rebuild. No second engines/registries; no genetics state transfer; Module 20 governance preserved. Deployment not started (Module 26).

1. **Post-Module-23 Baseline.** Family Tree retired; 5 active genetics tools; recharts/framer-motion removed; CSS Reveal server component; DISEASES + getDiseaseIdentity canonical; 442 tests / 45 files; tsc + ESLint clean; EN/UR 1434 = 1434.
2. **Integration Scope Executed.** OP01 homepage entry points · OP02 nav reconciliation · OP03 genetics tool cross-navigation · OP04 disease→tool wiring · OP05 public-data connection review · OP06 placeholder decisions.
3. **Homepage Discovery Audit.** Hero → `/diseases` (disease education) + `/genetics`; MapPreview → `/genetics/pakistan-map`; FeaturedDiseases → disease pages; GeneticsExplorerPreview → `/genetics`; CommunityImpact pillars → resources/community/survey. All three required pathways discoverable. One STALE CTA found and fixed (below).
4. **Homepage Entry Points Added or Reconciled.** The Community pillar CTA pointed to the (now coming-soon) `/hospitals`; **repointed to `/community`** (§24 STALE → REPOINT). No homepage redesign; CSS Reveal untouched.
5. **Homepage CTA Governance Review.** Educational verbs only (Explore/Learn/View evidence). No diagnosis/personal-risk/compatibility language. Verified via SSR: no rendered `/hospitals` or family-tree CTA remains.
6. **Global Navigation Audit.** Header (Navigation + SearchEntry), MobileNav, Footer, genetics tool pages, disease navigation. Dev-only inventory: `src/audit/navInventory.ts`.
7. **Mobile Navigation Reconciliation.** MobileNav is driven by the same `PRIMARY_NAV` config; the Hospitals removal applies to desktop and mobile identically. No new drawer/carousel added (§78).
8. **Footer Navigation Reconciliation.** Hospitals removed from `FOOTER_NAV`; Contact preserved (now a real page); governance links (privacy/ethics/governance) preserved.
9. **Locale Routing Validation.** All links use next-intl `Link`. Verified: `/ur` pages render `dir="rtl"`, disease genetics links resolve to `/ur/genetics/...`, and no hardcoded `/en/` appears on Urdu surfaces.
10. **Family Tree Public-Link Search.** `family-tree` / `familyTree` / `FamilyTree` searched: only audit/doc history + a tools.ts comment remain; no public navigation link. `/genetics/family-tree-explorer` 404s.
11. **Family Tree Redirect Decision.** `NO_REDIRECT_REQUIRED` (recorded in `navInventory.ts`). No verified navigational need; the 404 is intentional (§71). Never redirected to the calculator.
12. **Final Active Genetics Tool Registry.** inheritance-calculator, relationship-risk, pakistan-map, dna-explorer, punnett-square.
13. **Genetics Cross-Navigation Architecture.** Static curated data `genetics/data/connections.ts` (`TOOL_CONNECTIONS`) rendered by `EducationalNextSteps` inside `GeneticsToolPage` (covers all 5 tools). Never consulted by calculation/resolver logic; carries no genetics state.
14. **Genetics Tool Connections Added.** Calculator→Punnett/DNA; DNA→Calculator; Punnett→Calculator/Relationship; Relationship→Punnett/Calculator (with "genotype is separate from relationship"); Map→Diseases/Genetics. One primary + optional secondary each (§40).
15. **Cross-Navigation Component Reuse or Creation.** Created one lightweight `EducationalNextSteps` (semantic links, keyboard/focus, clear without arrows). Disease pages use a parallel `DiseaseGeneticsLinks`.
16. **Disease-to-DNA Wiring.** Disease page → `/genetics/dna-explorer?disease=<slug>` when `isDnaDiseaseSupported`. All 4 diseases supported.
17. **Disease-to-Inheritance Wiring.** Disease page → `/genetics/inheritance-calculator?disease=<slug>` when `calculator.enabled`. Parent statuses never transferred; disease change still clears results.
18. **EDS Subtype-Gate Protection.** EDS link uses the top-level id only; SSR-verified the DNA Explorer shows the subtype gate (no classical/vascular/classical-like/hypermobile preselected); hEDS → LIMITED_MECHANISM preserved.
19. **LSD Subtype-Gate Protection.** LSD link uses the top-level id only; DNA Explorer shows Tay-Sachs/Gaucher selection (SUBTYPE_REQUIRED); no universal LSD gene implied.
20. **Disease-to-Evidence Wiring.** Disease page → general Evidence Map (`ROUTES.map`). No second/disease-specific map built.
21. **DNA-to-Disease Wiring.** Handled inside the DNA tool's disease-connection step / the shared tool-page related-diseases (existing). Cross-nav from DNA also links to the Calculator (§39).
22. **Calculator-to-Disease Wiring.** The calculator's condition context already links to the selected disease page, independent of probability; CTA urgency does not vary by result.
23. **Relationship Explorer Educational Wiring.** Existing "genotype is separate from relationship" callout + Punnett scenarios preserved; cross-nav adds Relationship→Punnett/Calculator with the same framing. No marriage-safety/compatibility wording.
24. **Evidence Map Educational Wiring.** Map cross-nav → disease library + Genetics Explorer; never into a personal calculator result.
25. **Canonical Disease Identity Usage.** All connection/link data uses canonical disease ids; display labels resolve through localization; no canonical names duplicated in connection data.
26. **Context Transfer Architecture.** One allowlisted param, `?disease=<canonical-id>`, parsed by `parseDiseaseContext` (validates via `getDiseaseIdentity`). Read server-side in the two tool routes and passed as an initial prop; preselection is editable and clears appropriately.
27. **Context Parameters Accepted.** `disease` (canonical id only).
28. **Context Parameters Explicitly Rejected.** genotype, carrier, parent1/parent2, risk, probability, relationship — never read. Unknown/subtype/array values ignored safely (tested).
29. **Cross-Tool Persistence Status.** None. No GeneticsContextProvider, Zustand/Redux, localStorage, cookies, or global state. Normal semantic links; browser Back preserved.
30. **Disease Audio Regression Status.** Untouched: `diseaseId → audioRecordId → resolver`. No audio in navigation data; no preloading/persistence/autoplay. SSR-verified disease pages still render narrative + audio config without coupling to CTA state.
31. **Public Data Connection Review.** Ownership boundaries preserved (identity/narrative/DNA/inheritance/evidence/audio/registry). Connected through ids + resolvers only. Structural integrity tests added.
32. **About Route Decision.** ACTIVE_STATIC — real, truthful project info (mission, approach, "what it is not", not-medical-advice). No invented partnerships/affiliations. Kept in primary nav.
33. **Hospitals Route Decision.** INTENTIONAL_PLACEHOLDER — no finder built, no fabricated data. **Removed from primary + footer navigation**; route kept as an explicit "Coming soon" state.
34. **Contact Route Decision.** ACTIVE_STATIC — exposes the one real, already-public method (project email `sharedblood.org@gmail.com`). No invented phone/address/backend form. Kept in footer.
35. **Downloads Route Decision.** INTENTIONAL_PLACEHOLDER — no approved materials yet; explicit "Coming soon". Never exposes internal PRDs/audits/reports. Not in navigation.
36. **Search Route Decision.** PRESERVE — the SearchEntry dialog → `/search` honest "coming soon" results page. No full-site search built; no search dependency added.
37. **Placeholder Localization Impact.** Added `About`, `Contact`, `ComingSoon` namespaces (EN/UR). No orphan keys removed (Nav.hospitals label retained harmlessly). EN/UR parity preserved.
38. **Accessibility Integration Status.** New links are semantic anchors, keyboard operable, visibly focusable (`focus-visible` ring), and clear without arrow icons; headings labelled.
39. **RTL Integration Status.** All new UI RTL-aware; SSR-verified `dir="rtl"` on Urdu surfaces; no directional meaning reversed.
40. **Mobile Integration Status.** Responsive grids/stacks (`sm:grid-cols-2`); ≥44px targets; no horizontal carousels or heavy drawers added.
41. **Performance Impact.** No new libraries. Static connection data is tiny. Disease pages do not preload genetics bundles. First Load JS shared 102 kB (unchanged). The two tool routes read an optional `?disease=` at request time; static page count unchanged (91/91).
42. **Governance Validation.** All new public strings pass Module 20 `checkPublicClaim` (tested). No genetics state transfer; no per-disease browsing analytics or journey profiles; no recommendation engine. Module 20/22/23 tests pass.
43. **Tests Added.** `genetics/connections.test.ts` (8: connection targets are active tools / public surfaces, never Family Tree; ≤1 primary + ≤2 links; context parser accepts only canonical ids and rejects unknown/subtype/array/prohibited fields; EDS/LSD subtype gates preserved; hEDS limitation preserved). `audit/integration.test.ts` (6: every new public string passes Module 20 review; no assertive compatibility/eugenics wording; no nav targets Family Tree; Hospitals removed from nav; About/Contact retained; redirect decision = NO_REDIRECT_REQUIRED).
44. **Final Test Status.** 456 tests / 47 files pass (was 442/45; +14).
45. **TypeScript Status.** `tsc --noEmit` clean.
46. **ESLint Status.** Clean (0 errors, 0 warnings).
47. **Localization Parity Status.** EN 1480 = UR 1480 leaf keys; 28 namespaces.
48. **Production Build Status.** Succeeds.
49. **Generated Page Count.** 91/91 static pages — **unchanged** from Module 23. About/Contact/Hospitals/Downloads remain prerendered (now with real/coming-soon content); the two `?disease=` tool routes still prerender their base shells.
50. **First Load JS Status.** Shared 102 kB (unchanged). No new dependencies; recharts + framer-motion remain absent.
51. **Module 25 QA Handoff.** Homepage entry points; desktop/mobile/footer nav; EN/UR + RTL routing; Genetics landing; all 5 tools; tool cross-navigation; disease-page related learning + `?disease=` preselection; EDS/LSD subtype gates; Evidence Map disease links; disease audio; CSS Reveal; About/Contact/Hospitals/Downloads/Search placeholder states — for representative-device, browser, keyboard, focus-order, Urdu-overflow, slow-network QA.
52. **Module 26 Deployment Risks.** New internal destinations (About/Contact real pages; disease→tool + tool→tool links). No redirects added (Family Tree stays an intentional 404 — record in sitemap). Removed nav destination: Hospitals (route still resolves as coming-soon). New query handling: `?disease=` (allowlisted, safe on unknown). Static generation unchanged (91 pages). CSS Reveal retained. Module 23 lockfile baseline (no recharts/framer-motion) must hold on clean install.
