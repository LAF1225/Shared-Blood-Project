import type { ProvinceOrTerritory } from '../types';

/**
 * Pakistan geographic asset + projection (spec §46/§47).
 *
 * This is a deliberately *simplified* SVG silhouette — no mapping library, no
 * satellite/street/terrain layers (spec §46). The national outline and every
 * marker are projected through the SAME equirectangular projection, so markers
 * always land consistently inside the silhouette.
 *
 * IMPORTANT (spec §44): Urdu (RTL) must NOT mirror the geography. Coordinates
 * are never flipped; only text/controls flow RTL. This module is direction-
 * agnostic — it only produces geometry.
 */

/** Geographic bounding box for Pakistan, lightly padded. */
const BOUNDS = {
  minLng: 60.5,
  maxLng: 77.3,
  minLat: 23.2,
  maxLat: 37.3,
} as const;

/** Longitude degrees are compressed by cos(latitude); use the mid-latitude. */
const MID_LAT = (BOUNDS.minLat + BOUNDS.maxLat) / 2;
const LNG_SCALE = Math.cos((MID_LAT * Math.PI) / 180);

/** Inner drawing width in SVG units; height derived to preserve aspect ratio. */
const INNER_W = 720;
const PAD = 28;

const GEO_W = (BOUNDS.maxLng - BOUNDS.minLng) * LNG_SCALE;
const GEO_H = BOUNDS.maxLat - BOUNDS.minLat;
const UNIT = INNER_W / GEO_W;
const INNER_H = GEO_H * UNIT;

/** Full SVG canvas size (including padding). */
export const MAP_VIEWBOX = {
  width: Math.round(INNER_W + PAD * 2),
  height: Math.round(INNER_H + PAD * 2),
} as const;

export interface ProjectedPoint {
  x: number;
  y: number;
}

/**
 * Project geographic coordinates to SVG space. Pure and deterministic — the
 * same function drives the outline and every marker (spec §35 "one pipeline").
 */
export function projectPoint(longitude: number, latitude: number): ProjectedPoint {
  const x = (longitude - BOUNDS.minLng) * LNG_SCALE * UNIT + PAD;
  const y = (BOUNDS.maxLat - latitude) * UNIT + PAD;
  return { x: round(x), y: round(y) };
}

/** True when coordinates fall inside the supported bounding box (spec §37). */
export function isWithinPakistanBounds(longitude: number, latitude: number): boolean {
  return (
    longitude >= BOUNDS.minLng &&
    longitude <= BOUNDS.maxLng &&
    latitude >= BOUNDS.minLat &&
    latitude <= BOUNDS.maxLat
  );
}

/**
 * National outline as ordered [lng, lat] vertices tracing the border clockwise
 * from the far north.
 *
 * Educational silhouette only — an approximate cartographic tracing, NOT a
 * survey-grade or authoritative boundary, and deliberately free of any political
 * boundary interaction (§13). The territorial extent is unchanged from the
 * original asset; only the density of the tracing was increased so curves and
 * directional changes render cleanly.
 *
 * Detail level: the earlier asset used 24 vertices for the whole country, which
 * read as a coarse polygon with long straight runs and hard corners at typical
 * render sizes. This tracing follows the same route at roughly six times the
 * vertex density, so the coastline and mountain borders resolve smoothly instead
 * of being faked with a thicker stroke.
 *
 * Every vertex stays inside BOUNDS, so the projected path never escapes the
 * padded viewBox.
 */
const OUTLINE_LNGLAT: ReadonlyArray<readonly [number, number]> = [
  // Northern frontier: Wakhan corridor east along the Karakoram.
  [74.6, 37.03],
  [74.9, 36.95],
  [75.2, 36.92],
  [75.45, 36.72],
  [75.75, 36.7],
  [76.05, 36.42],
  [76.25, 36.1],
  [76.55, 35.92],
  [76.85, 35.66],
  [77.05, 35.5],
  // East: Siachen and the Kashmir line, running south-west.
  [76.9, 35.25],
  [76.6, 35.05],
  [76.25, 34.9],
  [75.9, 34.75],
  [75.55, 34.62],
  [75.2, 34.55],
  [74.85, 34.5],
  [74.55, 34.42],
  [74.35, 34.15],
  [74.25, 33.85],
  [74.15, 33.55],
  [74.05, 33.25],
  [74.2, 33.0],
  [74.35, 32.78],
  [74.6, 32.55],
  // Punjab: the eastern plains border down to Cholistan.
  [74.75, 32.3],
  [74.6, 32.05],
  [74.55, 31.8],
  [74.65, 31.55],
  [74.8, 31.25],
  [74.9, 31.0],
  [74.7, 30.75],
  [74.45, 30.55],
  [74.15, 30.3],
  [73.9, 30.05],
  [73.6, 29.85],
  [73.3, 29.65],
  [73.0, 29.35],
  [72.75, 29.05],
  [72.5, 28.75],
  [72.3, 28.45],
  [72.1, 28.15],
  [71.85, 27.95],
  [71.5, 27.85],
  [71.1, 27.85],
  [70.75, 27.8],
  // Sindh: the eastern desert border down through Tharparkar.
  [70.55, 27.55],
  [70.3, 27.25],
  [70.1, 26.95],
  [69.95, 26.65],
  [70.05, 26.35],
  [70.25, 26.05],
  [70.45, 25.75],
  [70.65, 25.45],
  [70.85, 25.15],
  [71.05, 24.85],
  [71.1, 24.55],
  [70.85, 24.35],
  [70.55, 24.25],
  [70.2, 24.2],
  [69.85, 24.25],
  [69.5, 24.3],
  [69.15, 24.25],
  [68.85, 24.05],
  [68.75, 23.85],
  // South coast: Indus delta, Karachi, then west along Makran.
  [68.45, 23.95],
  [68.2, 24.15],
  [67.9, 24.2],
  [67.6, 24.3],
  [67.35, 24.45],
  [67.15, 24.65],
  [66.95, 24.85],
  [66.7, 24.9],
  [66.4, 25.1],
  [66.1, 25.2],
  [65.75, 25.25],
  [65.4, 25.15],
  [65.05, 25.2],
  [64.7, 25.25],
  [64.35, 25.2],
  [64.0, 25.15],
  [63.65, 25.25],
  [63.3, 25.2],
  [62.95, 25.2],
  [62.6, 25.15],
  [62.3, 25.1],
  [62.0, 25.05],
  [61.75, 24.95],
  [61.6, 25.05],
  // West: the Iran border running north to the tri-point.
  [61.65, 25.35],
  [61.8, 25.7],
  [61.85, 26.05],
  [61.75, 26.4],
  [61.65, 26.75],
  [61.75, 27.1],
  [61.9, 27.45],
  [62.0, 27.8],
  [61.9, 28.15],
  [61.7, 28.5],
  [61.55, 28.8],
  [61.3, 29.15],
  [61.1, 29.45],
  [60.95, 29.68],
  [60.87, 29.86],
  // North-west: the Afghan border east across Balochistan, then north.
  [61.15, 29.78],
  [61.5, 29.68],
  [61.9, 29.58],
  [62.2, 29.45],
  [62.65, 29.45],
  [63.1, 29.4],
  [63.55, 29.45],
  [64.0, 29.5],
  [64.45, 29.55],
  [64.9, 29.6],
  [65.3, 29.65],
  [65.7, 29.75],
  [66.1, 29.85],
  [66.3, 30.15],
  [66.4, 30.5],
  [66.45, 30.9],
  [66.75, 31.05],
  [67.1, 31.15],
  [67.45, 31.2],
  [67.8, 31.3],
  [68.15, 31.45],
  [68.5, 31.6],
  [68.85, 31.75],
  [69.2, 31.85],
  [69.45, 32.1],
  [69.55, 32.45],
  [69.5, 32.8],
  [69.75, 33.1],
  [70.05, 33.35],
  [70.2, 33.65],
  [70.1, 33.95],
  [69.95, 34.2],
  [70.25, 34.4],
  [70.6, 34.55],
  [70.95, 34.7],
  [71.2, 34.95],
  [71.45, 35.2],
  [71.65, 35.45],
  [71.55, 35.75],
  [71.35, 36.0],
  [71.5, 36.25],
  [71.7, 36.5],
  // Closing run east along the Wakhan back to the northern tip.
  [72.1, 36.65],
  [72.55, 36.75],
  [73.0, 36.85],
  [73.45, 36.9],
  [73.9, 36.95],
  [74.25, 37.0],
];

/**
 * Projected outline as an SVG path `d` string (closed with `Z`).
 *
 * A `<path>` is used instead of a `<polygon>` so the rendered border can opt into
 * `vector-effect="non-scaling-stroke"`, which keeps the stroke the same visual
 * weight at every responsive width instead of thinning out on small screens.
 */
export const PAKISTAN_OUTLINE_PATH: string = `${OUTLINE_LNGLAT.map(
  ([lng, lat], index) => {
    const p = projectPoint(lng, lat);
    return `${index === 0 ? 'M' : 'L'}${p.x},${p.y}`;
  },
).join(' ')} Z`;

/**
 * Approximate label anchors for each province/territory (spec §13). Used only to
 * place a small, non-interactive text label — the map does not hit-test regions,
 * so province filtering is driven by each record's `provinceOrTerritory` field.
 */
export const PROVINCE_ANCHORS: Record<ProvinceOrTerritory, ProjectedPoint> = {
  punjab: projectPoint(72.6, 31.2),
  sindh: projectPoint(68.6, 26.2),
  'khyber-pakhtunkhwa': projectPoint(71.4, 33.9),
  balochistan: projectPoint(65.5, 28.4),
  'islamabad-capital-territory': projectPoint(73.1, 33.7),
  'gilgit-baltistan': projectPoint(75.0, 35.9),
  'azad-jammu-and-kashmir': projectPoint(73.9, 34.2),
};

/**
 * Two decimal places: at the widest layouts a single SVG unit is under two CSS
 * pixels, so this keeps projected vertices comfortably sub-pixel even on
 * high-DPI displays and avoids visible quantisation along the denser border.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
