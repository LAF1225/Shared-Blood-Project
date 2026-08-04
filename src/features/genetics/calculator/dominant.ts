import { buildGenotypeGrid, type Genotype } from './genotype';
import {
  STRATEGY_OUTCOME_ORDER,
  tallyOutcomes,
  type Calculation,
  type OutcomeKind,
  type VizCell,
} from './strategy';

/**
 * Simplified autosomal dominant strategy (Module 09 v2 §14–§16). A separate
 * engine — dominant logic is never forced into the recessive table (v2 §3/§39).
 *
 * Modeled genotypes: an Affected parent is heterozygous (Aa) carrying one
 * dominant variant allele "A"; an Unaffected parent has two typical alleles
 * (aa). Homozygous-affected is NOT assumed (v2 §14).
 *
 * Inputs are Affected / Unaffected only — no "Carrier" (v2 §15).
 */
export type DominantStatus = 'affected' | 'unaffected';

export const DOMINANT_STATUS_GENOTYPE: Record<DominantStatus, Genotype> = {
  affected: 'Aa', // heterozygous, one dominant variant allele
  unaffected: 'aa', // two typical alleles
};

/** Any copy of the dominant variant "A" ⇒ inherits variant / modeled affected. */
function classify(genotype: Genotype): OutcomeKind {
  return genotype.includes('A') ? 'inherits-variant' : 'not-inherited';
}

export function calculateAutosomalDominant(
  statusOne: DominantStatus,
  statusTwo: DominantStatus,
): Calculation {
  // Affected × Affected is deliberately not modeled by the simplified strategy:
  // do not fabricate a generic 75/25 result (v2 §16).
  if (statusOne === 'affected' && statusTwo === 'affected') {
    return {
      supported: false,
      strategy: 'autosomal-dominant',
      reason: 'combination-unsupported',
    };
  }

  const genotypeOne = DOMINANT_STATUS_GENOTYPE[statusOne];
  const genotypeTwo = DOMINANT_STATUS_GENOTYPE[statusTwo];
  const grid: VizCell[] = buildGenotypeGrid(genotypeOne, genotypeTwo).map((cell) => ({
    ...cell,
    outcome: classify(cell.genotype),
  }));
  const outcomes = tallyOutcomes(grid, STRATEGY_OUTCOME_ORDER['autosomal-dominant']!);
  return {
    supported: true,
    strategy: 'autosomal-dominant',
    genotypeOne,
    genotypeTwo,
    outcomes,
    grid,
  };
}
