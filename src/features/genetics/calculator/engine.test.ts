import { describe, it, expect } from 'vitest';
import { resolveTarget } from './metadata';
import { resolveInheritanceStrategy, calculate } from './engine';

/**
 * Metadata-driven strategy resolution (Module 09 v2 §7/§8/§10/§17/§38). Verifies
 * that strategy comes from structured metadata and that subtype-aware conditions
 * behave per spec — without any disease-name string matching.
 */
describe('resolveTarget — metadata-driven resolution', () => {
  it('Beta Thalassemia → autosomal recessive (v2 §12)', () => {
    const resolution = resolveTarget('beta-thalassemia', null);
    expect(resolution.kind).toBe('ok');
    if (resolution.kind !== 'ok') return;
    expect(resolution.target.strategy).toBe('autosomal-recessive');
  });

  it('Cystic Fibrosis → autosomal recessive', () => {
    const resolution = resolveTarget('cystic-fibrosis', null);
    expect(resolution.kind === 'ok' && resolution.target.strategy).toBe('autosomal-recessive');
  });

  it('generic Ehlers-Danlos requires a subtype — never a generic calculation (v2 §8/§23)', () => {
    expect(resolveTarget('ehlers-danlos-syndrome', null).kind).toBe('needs-subtype');
  });

  it('Classical EDS → autosomal dominant, retaining the subtype label (v2 §8/§23)', () => {
    const resolution = resolveTarget('ehlers-danlos-syndrome', 'classical');
    expect(resolution.kind).toBe('ok');
    if (resolution.kind !== 'ok') return;
    expect(resolution.target.strategy).toBe('autosomal-dominant');
    expect(resolution.target.subtypeId).toBe('classical');
    expect(resolution.target.label.en).toMatch(/Classical/);
  });

  it('Hypermobile EDS → unsupported (no genotype probability, v2 §9)', () => {
    const resolution = resolveTarget('ehlers-danlos-syndrome', 'hypermobile');
    expect(resolution.kind === 'ok' && resolution.target.strategy).toBe('unsupported');
  });

  it('generic Lysosomal Storage Disorders requires a subtype — no generic calc (v2 §10)', () => {
    expect(resolveTarget('lysosomal-storage-disorders', null).kind).toBe('needs-subtype');
  });

  it('a supported LSD subtype → autosomal recessive (v2 §10)', () => {
    const resolution = resolveTarget('lysosomal-storage-disorders', 'tay-sachs');
    expect(resolution.kind === 'ok' && resolution.target.strategy).toBe('autosomal-recessive');
  });

  it('unknown condition → not calculable', () => {
    expect(resolveTarget('does-not-exist', null).kind).toBe('not-calculable');
    expect(resolveTarget(null, null).kind).toBe('not-calculable');
  });
});

describe('resolveInheritanceStrategy + calculate dispatcher (v2 §17)', () => {
  it('reads the strategy from the resolved target', () => {
    const resolution = resolveTarget('beta-thalassemia', null);
    const target = resolution.kind === 'ok' ? resolution.target : null;
    expect(resolveInheritanceStrategy(target)).toBe('autosomal-recessive');
    expect(resolveInheritanceStrategy(null)).toBe('unsupported');
  });

  it('dispatches recessive conditions to the recessive engine', () => {
    const result = calculate('autosomal-recessive', 'carrier', 'carrier');
    expect(result.supported && result.strategy).toBe('autosomal-recessive');
  });

  it('dispatches dominant conditions to the dominant engine', () => {
    const result = calculate('autosomal-dominant', 'affected', 'unaffected');
    expect(result.supported && result.strategy).toBe('autosomal-dominant');
  });

  it('an unsupported strategy never produces a genotype probability (v2 §9/§27)', () => {
    const result = calculate('unsupported', 'affected', 'unaffected');
    expect(result.supported).toBe(false);
    if (result.supported) return;
    expect(result.reason).toBe('strategy-unsupported');
  });
});
