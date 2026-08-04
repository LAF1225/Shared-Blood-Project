import type { InheritanceStrategyId } from '@/types';
import type { Allele, Genotype } from './genotype';

/**
 * Strategy-layer types shared by every inheritance engine (Module 09 v2 §6/§20).
 * Each engine returns the same `Calculation` shape so the UI renders any strategy
 * uniformly while the maths stays isolated per strategy (v2 §3).
 */
export type { InheritanceStrategyId };

/** Outcome kinds across all strategies. Labels are resolved per strategy in i18n. */
export type OutcomeKind =
  // autosomal recessive (v2 §11/§20)
  | 'affected'
  | 'carrier'
  | 'unaffected'
  // autosomal dominant (v2 §14/§20)
  | 'inherits-variant'
  | 'not-inherited';

/** One outcome's share of the probability. */
export interface OutcomeShare {
  kind: OutcomeKind;
  percent: number;
}

/** A visualization cell tagged with its strategy-specific outcome (v2 §22). */
export interface VizCell {
  fromParentOne: Allele;
  fromParentTwo: Allele;
  genotype: Genotype;
  outcome: OutcomeKind;
}

export interface SupportedCalculation {
  supported: true;
  strategy: InheritanceStrategyId;
  genotypeOne: Genotype;
  genotypeTwo: Genotype;
  /** Ordered, strategy-specific outcomes (v2 §20). */
  outcomes: OutcomeShare[];
  grid: VizCell[];
}

/**
 * Why a calculation was refused. `strategy-unsupported` = the condition/subtype
 * maps to no genotype model (e.g. hEDS, v2 §9). `combination-unsupported` = the
 * strategy exists but this parental pairing isn't modeled (e.g. dominant
 * Affected × Affected, v2 §16).
 */
export type UnsupportedReason = 'strategy-unsupported' | 'combination-unsupported';

export interface UnsupportedCalculation {
  supported: false;
  strategy: InheritanceStrategyId;
  reason: UnsupportedReason;
}

export type Calculation = SupportedCalculation | UnsupportedCalculation;

/** Thrown only if an engine's outcomes fail to total 100 (v2 §12/§26 guard). */
export class InheritanceError extends Error {}

/** Parent status keys presented per strategy (v2 §11/§15/§19). */
export type ParentStatus =
  | 'affected'
  | 'carrier'
  | 'tested-negative'
  | 'unaffected';

/**
 * Which parent-status options each strategy exposes. Recessive uses three;
 * dominant uses two (no "carrier", v2 §15); unsupported hides inputs entirely
 * (v2 §27). Inputs must change with the resolved strategy (v2 §19).
 */
export const STRATEGY_STATUS_OPTIONS: Record<InheritanceStrategyId, ParentStatus[]> = {
  'autosomal-recessive': ['affected', 'carrier', 'tested-negative'],
  'autosomal-dominant': ['affected', 'unaffected'],
  unsupported: [],
};

/** Ordered outcome kinds per strategy, for stable result rendering (v2 §20). */
export const STRATEGY_OUTCOME_ORDER: Partial<Record<InheritanceStrategyId, OutcomeKind[]>> = {
  'autosomal-recessive': ['affected', 'carrier', 'unaffected'],
  'autosomal-dominant': ['inherits-variant', 'not-inherited'],
};

/** Shared tally + 100% invariant guard used by the supported strategies. */
export function tallyOutcomes(
  cells: VizCell[],
  order: OutcomeKind[],
): OutcomeShare[] {
  const share = 100 / cells.length;
  const totals = new Map<OutcomeKind, number>();
  for (const cell of cells) {
    totals.set(cell.outcome, (totals.get(cell.outcome) ?? 0) + share);
  }
  const outcomes = order.map((kind) => ({ kind, percent: totals.get(kind) ?? 0 }));
  const total = outcomes.reduce((sum, outcome) => sum + outcome.percent, 0);
  if (total !== 100) {
    throw new InheritanceError(`Probabilities total ${total}, expected 100.`);
  }
  return outcomes;
}
