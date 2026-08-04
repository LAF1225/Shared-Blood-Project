# Pakistan Evidence Map — Kashmir Boundary Update · Sourcing Status

**Status: BLOCKED ON SOURCE DATA. Implementation deliberately not started.**

This is not a completion report. The PRD's §2 is marked [CRITICAL] and §19 is non-negotiable: the boundary geometry must come from a documented Pakistan-recognized cartographic reference, and political boundaries must not be freehanded. That requirement could not be satisfied with the sources available, so per §77 ("Then stop and report the exact cartographic source used and any limitations before deployment") the geometry work was stopped and escalated.

**Decision taken (project owner):** procure official Survey of Pakistan data first. No disputed-territory geometry will be authored until that data is supplied.

## 1. Previous / current map implementation

- Geometry lives in `src/features/genetics/pakistan-map/data/geography.ts` as manually defined `[lng, lat]` vertices, projected through a shared equirectangular `projectPoint()` into a 776 x 756 SVG viewBox.
- Rendered as a single closed SVG `<path>` by `PakistanMap.tsx` (full map) and `EvidenceMapPreview.tsx` (homepage preview), both from the same constant.
- A prior amendment retraced the outline from 24 to 152 vertices and added `vector-effect="non-scaling-stroke"`, deliberately **preserving the existing territorial extent** because extent is a political question and that amendment was scoped to visual quality only.
- No mapping library, no GeoJSON/TopoJSON pipeline, no raster tiles.

## 2. Sourcing investigation

### 2a. Government of Pakistan authority (the PRD's preferred source)

**Survey of Pakistan** (surveyofpakistan.gov.pk) is the national survey and mapping organisation. Its public site advertises mapping services, "conventional and digital cartography", geospatial data services, and printed map products. It does **not** publish a downloadable open vector or GIS boundary dataset. Obtaining official geometry therefore requires a direct request and almost certainly a licence.

### 2b. Best available open vector dataset (evaluated, NOT adopted)

| Field | Value |
|---|---|
| Dataset | Pakistan - Subnational Administrative Boundaries (COD-AB), version 01 |
| Publisher | OCHA Field Information Services Section (FISS) |
| Stated source | World Food Programme SDI |
| Licence | Creative Commons Attribution for Intergovernmental Organisations (CC BY-IGO) |
| Dates | boundaries created 02 Sep 2022; valid for humanitarian use 09 Sep 2022; reviewed 27 Sep 2024 |
| Formats | GeoJSON, SHP, Geodatabase, XLSX |
| Structure | ADM1 = 7 provinces/territories (includes Azad Jammu and Kashmir and Gilgit-Baltistan); ADM-lines carry a "Line of Control" classification |
| Location | https://data.humdata.org/dataset/cod-ab-pak |

**Why it was not adopted:** it is a United Nations dataset (OCHA / WFP lineage), not a Government of Pakistan product, and it represents Jammu and Kashmir using UN cartographic convention. Presenting it as a "Pakistan-recognized cartographic reference" would be inaccurate and would breach §4 ("Accurately identify the source and representation used") and §19. It remains a viable fallback **only** if the project owner amends §19 and accepts UN attribution wording.

Other third-party options (geoBoundaries, GADM, Natural Earth) were rejected for the same provenance reason, with the additional problems that GADM restricts redistribution and Natural Earth encodes de-facto rather than Pakistan-recognized boundaries.

## 3. Correction to a PRD premise

§1 states the map "does not visually represent the Kashmir region". That is only partly accurate:

- `azad-jammu-and-kashmir` and `gilgit-baltistan` are already first-class values of the `ProvinceOrTerritory` type.
- Both already have label anchors in `PROVINCE_ANCHORS` and render as on-map labels.
- Both already fall inside the current national outline extent.

What is genuinely absent is (a) the **disputed, Indian-administered Jammu and Kashmir territory** east of the Line of Control, and (b) **differentiated boundary styling** (dashed/dotted) for disputed lines. Those are the only items actually blocked on source data.

## 4. What is blocked vs unblocked

**Blocked (needs sourced geometry):** disputed J&K territory geometry, boundary-type classification, and any change to the national outline in the north-east.

**Not blocked (can proceed once authorised):** differentiated stroke styling support, label placement review including an accurate Urdu AJK label, accessibility/map-description updates, the neutral cartographic source note, and the §14 test suite.

## 5. Procurement specification for Survey of Pakistan

To satisfy §2 and produce the provenance table the report requires, the supplied data should include:

1. **Vector** boundary data (Shapefile `.shp` or GeoJSON). A raster or PDF map does **not** satisfy §2, which forbids tracing a raster by eye.
2. National boundary (ADM0) and provincial/territorial boundaries (ADM1) **including AJK and Gilgit-Baltistan**.
3. A **boundary-type attribute** distinguishing international boundary, Line of Control, working boundary, and disputed boundary, so §3's dashed/differentiated styling can follow the source rather than be invented.
4. Coordinate reference system, ideally **WGS84 / EPSG:4326** (lng/lat), which the existing projection consumes directly.
5. **Edition/version number and publication date** (required for the report's provenance record).
6. **Written permission to reproduce and publish the derived boundary on a public website**, including the right to simplify the geometry for web delivery. This is the item most likely to block deployment and is worth confirming before any technical work begins.

## 6. Evidence data integrity (unchanged)

No evidence record, marker, count, city association, or disease association was modified. Per §8, adding territory to a future map must not imply evidence coverage: no marker will be fabricated for AJK or disputed territory, and geographic representation stays separate from evidence availability.

## 7. Current repository state

No code changes were made under this PRD. The map remains at the previously verified state: tsc clean, ESLint 0/0, 527 tests / 51 files passing, production build 91/91 static pages, 102 kB shared First Load JS, no new dependencies.

## 8. Known limitations

- Survey of Pakistan publishes no open vector dataset, so the PRD's preferred source cannot be obtained programmatically.
- Every openly licensed alternative is third-party and encodes non-Pakistani boundary conventions for Jammu and Kashmir.
- Consequently the only route to the requested geometry without procurement would be to author disputed political boundaries by hand, which §2 and §19 expressly prohibit and which was therefore refused.
