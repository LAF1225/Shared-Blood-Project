/**
 * Inheritance Probability Calculator (Module 09 v2).
 * A multi-strategy, client-side educational tool. Strategy is resolved from
 * structured disease metadata; each engine is pure and unit-tested independently
 * of React (v2 §3/§17/§38).
 */
export { InheritanceCalculator } from './components/InheritanceCalculator';
export { calculate, resolveInheritanceStrategy } from './engine';
export { calculateAutosomalRecessive } from './recessive';
export { calculateAutosomalDominant } from './dominant';
export { getCalculatorDiseases, resolveTarget } from './metadata';
export type { Calculation, InheritanceStrategyId, ParentStatus } from './strategy';
export type { CalculatorTarget, TargetResolution } from './metadata';
