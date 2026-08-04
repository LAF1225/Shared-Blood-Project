import { calculate } from '../calculator/engine';
import type {
  InheritanceStrategyId,
  ParentStatus,
  SupportedCalculation,
} from '../calculator/strategy';

/**
 * Educational Punnett scenarios (Module 22 §33/§38).
 *
 * Explicit, hypothetical parent pairings that resolve THROUGH the canonical
 * inheritance engine — never a second probability engine (§22). Used by the
 * standalone Punnett route and the Relationship Explorer's educational
 * transition. Every scenario is clearly hypothetical and disease-agnostic; it
 * never infers genotype from a relationship (§34/§38).
 *
 * Deliberately no hypermobile-EDS scenario: hEDS has no modeled genotype, so it
 * must not produce a grid (§15/§32/§38).
 */
export type SupportedStrategy = Exclude<InheritanceStrategyId, 'unsupported'>;

export interface PunnettScenario {
  id: string;
  strategy: SupportedStrategy;
  statusOne: ParentStatus;
  statusTwo: ParentStatus;
  /** i18n key stem within the `PunnettSquare.scenarios` namespace. */
  labelKey: string;
}

/**
 * The approved educational scenarios (§38): at minimum one autosomal recessive
 * carrier × carrier and one supported autosomal dominant scenario.
 */
export const PUNNETT_SCENARIOS: readonly PunnettScenario[] = [
  {
    id: 'recessive-carrier-carrier',
    strategy: 'autosomal-recessive',
    statusOne: 'carrier',
    statusTwo: 'carrier',
    labelKey: 'recessiveCarrierCarrier',
  },
  {
    id: 'recessive-carrier-affected',
    strategy: 'autosomal-recessive',
    statusOne: 'carrier',
    statusTwo: 'affected',
    labelKey: 'recessiveCarrierAffected',
  },
  {
    id: 'dominant-affected-unaffected',
    strategy: 'autosomal-dominant',
    statusOne: 'affected',
    statusTwo: 'unaffected',
    labelKey: 'dominantAffectedUnaffected',
  },
];

export function getPunnettScenario(id: string | null): PunnettScenario | null {
  if (!id) return null;
  return PUNNETT_SCENARIOS.find((scenario) => scenario.id === id) ?? null;
}

export interface ResolvedScenario {
  scenario: PunnettScenario;
  calculation: SupportedCalculation;
}

/**
 * Resolve a scenario to its canonical inheritance result. Returns null for an
 * unknown id or the (unexpected) case where the canonical engine refuses the
 * pairing — callers then show an educational empty state rather than crash
 * (§51).
 */
export function resolvePunnettScenario(id: string | null): ResolvedScenario | null {
  const scenario = getPunnettScenario(id);
  if (!scenario) return null;
  const calculation = calculate(scenario.strategy, scenario.statusOne, scenario.statusTwo);
  if (!calculation.supported) return null;
  return { scenario, calculation };
}
