/**
 * Shared genotype algebra (Module 09 v2). Pure allele-combination helpers used
 * by every inheritance strategy, so each strategy's numbers and its 2×2
 * visualization derive from one source (v2 §22 "do not maintain a separate
 * hardcoded visual probability system").
 *
 * Scientific notation only — never localized (v2 §35).
 */
export type Allele = 'A' | 'a';
export type Genotype = 'AA' | 'Aa' | 'aa';

/** The two alleles a parent of each genotype can pass on. */
const GENOTYPE_ALLELES: Record<Genotype, readonly [Allele, Allele]> = {
  AA: ['A', 'A'],
  Aa: ['A', 'a'],
  aa: ['a', 'a'],
};

/** Combine one allele from each parent into a canonical genotype (A before a). */
export function combineAlleles(one: Allele, two: Allele): Genotype {
  if (one === 'A' && two === 'A') return 'AA';
  if (one === 'a' && two === 'a') return 'aa';
  return 'Aa';
}

/** A raw child genotype cell, before any strategy classifies its outcome. */
export interface GenotypeCell {
  fromParentOne: Allele;
  fromParentTwo: Allele;
  genotype: Genotype;
}

/**
 * Build the 2×2 grid of possible child genotypes. Order is
 * [oneA×twoA, oneA×twoB, oneB×twoA, oneB×twoB] — four equally-likely outcomes.
 */
export function buildGenotypeGrid(
  genotypeOne: Genotype,
  genotypeTwo: Genotype,
): GenotypeCell[] {
  const [oneA, oneB] = GENOTYPE_ALLELES[genotypeOne];
  const [twoA, twoB] = GENOTYPE_ALLELES[genotypeTwo];
  const cells: GenotypeCell[] = [];
  for (const fromParentOne of [oneA, oneB]) {
    for (const fromParentTwo of [twoA, twoB]) {
      cells.push({
        fromParentOne,
        fromParentTwo,
        genotype: combineAlleles(fromParentOne, fromParentTwo),
      });
    }
  }
  return cells;
}
