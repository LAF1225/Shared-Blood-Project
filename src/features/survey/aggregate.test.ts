import { describe, it, expect } from 'vitest';
import {
  percentage,
  computePercentages,
  applySuppression,
  isConsistent,
  sumVisible,
  hasSuppression,
  roundTo,
  MIN_PUBLIC_CELL_SIZE,
  SUPPRESSED,
} from './aggregate';

describe('Offline aggregation helpers (spec §39/§42/§63)', () => {
  it('computes percentages as count / valid × 100 to one decimal (spec §39)', () => {
    expect(percentage(60, 200)).toBe(30);
    expect(percentage(35, 200)).toBe(17.5);
    expect(percentage(1, 3)).toBe(33.3);
  });

  it('never divides by zero', () => {
    expect(percentage(5, 0)).toBe(0);
  });

  it('rounds consistently', () => {
    expect(roundTo(17.54, 1)).toBe(17.5);
    expect(roundTo(17.55, 1)).toBe(17.6);
  });

  it('computePercentages maps a count record', () => {
    expect(computePercentages({ A: 50, B: 150 }, 200)).toEqual({ A: 25, B: 75 });
  });

  it('suppresses non-zero cells below MIN_PUBLIC_CELL_SIZE, keeps zero and large (spec §42)', () => {
    const out = applySuppression({ big: 50, small: 3, zero: 0, edge: MIN_PUBLIC_CELL_SIZE });
    expect(out.big).toBe(50);
    expect(out.small).toBe(SUPPRESSED);
    expect(out.zero).toBe(0);
    expect(out.edge).toBe(MIN_PUBLIC_CELL_SIZE);
  });

  it('checks full pre-suppression consistency (spec §63)', () => {
    expect(isConsistent({ A: 60, B: 140 }, 200)).toBe(true);
    expect(isConsistent({ A: 60, B: 139 }, 200)).toBe(false);
    expect(isConsistent({ A: 60, B: 140 }, 200, 14, 214)).toBe(true);
    expect(isConsistent({ A: 60, B: 140 }, 200, 14, 999)).toBe(false);
  });

  it('sumVisible and hasSuppression ignore / detect the sentinel', () => {
    const map = { A: 50, B: SUPPRESSED, C: 30 } as const;
    expect(sumVisible(map)).toBe(80);
    expect(hasSuppression(map)).toBe(true);
    expect(hasSuppression({ A: 50, C: 30 })).toBe(false);
  });
});
