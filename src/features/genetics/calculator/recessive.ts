import { buildGenotypeGrid, type Genotype } from './genotype';
import {
  STRATEGY_OUTCOME_ORDER,
  tallyOutcomes,
  type OutcomeKind,
  type SupportedCalculation,
  type VizCell,
} from './strategy';

/**
 * Autosomal recessive strategy (Module 09 v2 §11–§13). This is the Version 1
 * engine, preserved and isolated as one strategy (v2 §13/§42) — the maths is
 * unchanged and pinned by the unit tests to the authoritative probability table.
 *
 * Modeled genotypes (v2 §11): Affected = aa, Carrier = Aa, Tested Negative = AA.
 */
export type RecessiveStatus = 'affected' | 'carrier' | 'tested-negative';

export const RECESSIVE_STATUS_GENOTYPE: Record<RecessiveStatus, Genotype> = {
  affected: 'aa',
  carrier: 'Aa',
  'tested-negative': 'AA',
};

/** aa → affected, Aa → carrier, AA → unaffected (v2 §11/§22). */
function classify(genotype: Genotype): OutcomeKind {
  if (genotype === 'aa') return 'affected';
  if (genotype === 'Aa') return 'carrier';
  return 'unaffected';
}

export function calculateAutosomalRecessive(
  statusOne: RecessiveStatus,
  statusTwo: RecessiveStatus,
): SupportedCalculation {
  const genotypeOne = RECESSIVE_STATUS_GENOTYPE[statusOne];
  const genotypeTwo = RECESSIVE_STATUS_GENOTYPE[statusTwo];
  const grid: VizCell[] = buildGenotypeGrid(genotypeOne, genotypeTwo).map((cell) => ({
    ...cell,
    outcome: classify(cell.genotype),
  }));
  const outcomes = tallyOutcomes(grid, STRATEGY_OUTCOME_ORDER['autosomal-recessive']!);
  return {
    supported: true,
    strategy: 'autosomal-recessive',
    genotypeOne,
    genotypeTwo,
    outcomes,
    grid,
  };
}
