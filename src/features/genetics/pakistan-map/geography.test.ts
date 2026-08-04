import { describe, it, expect } from 'vitest';
import {
  PAKISTAN_OUTLINE_PATH,
  MAP_VIEWBOX,
  projectPoint,
} from './data/geography';

/**
 * Pakistan map border-quality guards.
 *
 * The silhouette was previously a 24-vertex polygon for the whole country, which
 * rendered as a coarse shape with long straight runs and hard corners. These
 * tests pin the refined tracing so a future simplification cannot quietly
 * regress the border, and so the outline can never drift away from the marker
 * projection they both share.
 */

interface Point {
  x: number;
  y: number;
}

const VERTICES: Point[] = PAKISTAN_OUTLINE_PATH.replace(/ Z$/, '')
  .split(' ')
  .map((token) => {
    const [x, y] = token.slice(1).split(',').map(Number);
    return { x, y };
  });

function segmentLengths(points: Point[]): number[] {
  return points.map((p, i) => {
    const q = points[(i + 1) % points.length];
    return Math.hypot(q.x - p.x, q.y - p.y);
  });
}

function crossProduct(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

function segmentsCross(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
  const d1 = crossProduct(p3, p4, p1);
  const d2 = crossProduct(p3, p4, p2);
  const d3 = crossProduct(p1, p2, p3);
  const d4 = crossProduct(p1, p2, p4);
  return (
    ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
    ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
  );
}

/** Ray-casting point-in-polygon test. */
function isInsideSilhouette(x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = VERTICES.length - 1; i < VERTICES.length; j = i++) {
    const a = VERTICES[i];
    const b = VERTICES[j];
    if (
      a.y > y !== b.y > y &&
      x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x
    ) {
      inside = !inside;
    }
  }
  return inside;
}

describe('Pakistan outline path quality', () => {
  it('is a closed SVG path', () => {
    expect(PAKISTAN_OUTLINE_PATH.startsWith('M')).toBe(true);
    expect(PAKISTAN_OUTLINE_PATH.trim().endsWith('Z')).toBe(true);
  });

  it('keeps enough vertices to render a smooth border', () => {
    // Guards against re-simplification: the old coarse asset had 24.
    expect(VERTICES.length).toBeGreaterThanOrEqual(100);
  });

  it('has no excessively long straight runs', () => {
    // A long segment is what made the previous silhouette read as a polygon.
    expect(Math.max(...segmentLengths(VERTICES))).toBeLessThan(40);
  });

  it('turns gently at almost every vertex', () => {
    const turns = VERTICES.map((p, i) => {
      const prev = VERTICES[(i - 1 + VERTICES.length) % VERTICES.length];
      const next = VERTICES[(i + 1) % VERTICES.length];
      const inbound = Math.atan2(p.y - prev.y, p.x - prev.x);
      const outbound = Math.atan2(next.y - p.y, next.x - p.x);
      let delta = Math.abs(((outbound - inbound) * 180) / Math.PI);
      if (delta > 180) delta = 360 - delta;
      return delta;
    });
    const mean = turns.reduce((a, b) => a + b, 0) / turns.length;
    expect(mean).toBeLessThan(30);
    // A national border legitimately has a couple of genuine corners.
    expect(turns.filter((t) => t > 100).length).toBeLessThanOrEqual(3);
  });

  it('never self-intersects, so the fill renders as one clean region', () => {
    const n = VERTICES.length;
    let crossings = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 2; j < n; j++) {
        if (i === 0 && j === n - 1) continue;
        if (
          segmentsCross(
            VERTICES[i],
            VERTICES[(i + 1) % n],
            VERTICES[j],
            VERTICES[(j + 1) % n],
          )
        ) {
          crossings++;
        }
      }
    }
    expect(crossings).toBe(0);
  });

  it('stays inside the map viewBox', () => {
    for (const { x, y } of VERTICES) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(MAP_VIEWBOX.width);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(MAP_VIEWBOX.height);
    }
  });
});

describe('Outline and evidence markers share one projection', () => {
  // If the outline is ever redrawn against a different projection or bounding
  // box, these cities stop landing inside the silhouette.
  const CITIES: Array<[string, number, number]> = [
    ['Karachi', 67.0, 24.86],
    ['Lahore', 74.35, 31.52],
    ['Islamabad', 73.09, 33.69],
    ['Quetta', 67.0, 30.18],
    ['Peshawar', 71.58, 34.02],
    ['Multan', 71.52, 30.2],
    ['Sukkur', 68.86, 27.7],
    ['Gilgit', 74.31, 35.92],
  ];

  for (const [name, lng, lat] of CITIES) {
    it(`${name} projects inside the silhouette`, () => {
      const { x, y } = projectPoint(lng, lat);
      expect(isInsideSilhouette(x, y)).toBe(true);
    });
  }
});

describe('Projection is direction-agnostic (RTL must not mirror geography)', () => {
  it('maps increasing longitude to increasing x', () => {
    const west = projectPoint(62, 30);
    const east = projectPoint(74, 30);
    expect(east.x).toBeGreaterThan(west.x);
  });

  it('maps increasing latitude to decreasing y (north is up)', () => {
    const south = projectPoint(69, 25);
    const north = projectPoint(69, 35);
    expect(north.y).toBeLessThan(south.y);
  });
});
