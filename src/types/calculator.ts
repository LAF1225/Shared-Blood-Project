/**
 * Calculator domain types (placeholder shapes).
 * Business logic is defined in Module 11 (Inheritance Probability) and
 * Module 12 (Educational Population Risk) — not here.
 */
export type GeneticStatus = 'unaffected' | 'carrier' | 'affected';

export interface InheritanceInput {
  parentOne: GeneticStatus;
  parentTwo: GeneticStatus;
}

export interface InheritanceOutcome {
  affected: number;
  carrier: number;
  unaffected: number;
  explanation?: string;
}

export interface PopulationRiskInput {
  diseaseId: string;
  relationship: string;
}

export interface PopulationRiskOutcome {
  carrierProbability: number;
  affectedProbability: number;
  explanation?: string;
}
