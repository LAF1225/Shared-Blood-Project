/**
 * Shared Punnett Square visualization (Module 22 §22).
 *
 * A renderer of canonical inheritance results — NOT a probability engine. Every
 * Punnett surface (calculator, relationship scenarios, standalone route) uses
 * this one module, and all probabilities come from the canonical engine in
 * `../calculator` (§22 "one inheritance truth source").
 */
export { PunnettGrid } from './PunnettGrid';
export { PunnettSquare } from './PunnettSquare';
export { PunnettExplorer } from './components/PunnettExplorer';
export { PunnettScenarioExplorer } from './components/PunnettScenarioExplorer';
export { OUTCOME_TONE } from './presentation';
export {
  PUNNETT_SCENARIOS,
  getPunnettScenario,
  resolvePunnettScenario,
} from './scenarios';
export type { PunnettScenario, ResolvedScenario, SupportedStrategy } from './scenarios';
