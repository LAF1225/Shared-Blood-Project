import {
  calculateAutosomalRecessive,
  type RecessiveStatus,
} from './recessive';
import {
  calculateAutosomalDominant,
  type DominantStatus,
} from './dominant';
import type {
  Calculation,
  InheritanceStrategyId,
  ParentStatus,
} from './strategy';

/**
 * Strategy resolver + dispatcher (Module 09 v2 §17). Reads the strategy from
 * structured metadata (never disease-name string matching) and routes to the
 * matching engine. Adding a new strategy = add a case here plus its engine — no
 * existing engine is rewritten (v2 §6/§39).
 */
export function resolveInheritanceStrategy(
  condition: { strategy: InheritanceStrategyId } | null,
): InheritanceStrategyId {
  return condition?.strategy ?? 'unsupported';
}

/**
 * Run the strategy-appropriate engine. Callers validate that the statuses belong
 * to the strategy first (see `validation.ts`); the casts are safe under that
 * contract. `unsupported` conditions never reach a genotype model (v2 §9/§27).
 */
export function calculate(
  strategy: InheritanceStrategyId,
  statusOne: ParentStatus,
  statusTwo: ParentStatus,
): Calculation {
  switch (strategy) {
    case 'autosomal-recessive':
      return calculateAutosomalRecessive(
        statusOne as RecessiveStatus,
        statusTwo as RecessiveStatus,
      );
    case 'autosomal-dominant':
      return calculateAutosomalDominant(
        statusOne as DominantStatus,
        statusTwo as DominantStatus,
      );
    case 'unsupported':
      return { supported: false, strategy: 'unsupported', reason: 'strategy-unsupported' };
  }
}
