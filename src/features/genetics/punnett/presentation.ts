import type { OutcomeKind } from '../calculator/strategy';

/**
 * Shared visual presentation for inheritance outcomes (Module 22 §46/§48).
 *
 * ONE tone map, imported by every Punnett surface (calculator, relationship
 * scenario, standalone route) so the visualization stays consistent and colour
 * is never the only signal — each outcome also carries a text label and, in the
 * grid, its genotype and a screen-reader summary.
 */
export const OUTCOME_TONE: Record<OutcomeKind, { tone: string; bar: string }> = {
  affected: { tone: 'border-danger/30 bg-danger/5', bar: 'bg-danger' },
  carrier: { tone: 'border-accent-strong/30 bg-accent/10', bar: 'bg-accent-strong' },
  unaffected: { tone: 'border-secondary/30 bg-secondary/5', bar: 'bg-secondary' },
  'inherits-variant': { tone: 'border-danger/30 bg-danger/5', bar: 'bg-danger' },
  'not-inherited': { tone: 'border-secondary/30 bg-secondary/5', bar: 'bg-secondary' },
};
