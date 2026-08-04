/**
 * Relationship & Recessive Risk Explorer (Module 10).
 * A scientifically-bounded educational tool explaining how shared ancestry can
 * raise the chance of shared recessive variants — never an individual risk
 * calculator. Pure resolvers are unit-tested independently of React (§42).
 */
export { RelationshipExplorer } from './components/RelationshipExplorer';
export {
  listRelationshipProfiles,
  getRelationshipProfile,
  getPopulationEvidence,
  getDiseaseContext,
} from './resolve';
export type { RelationshipProfile, RelationshipId } from './types';
