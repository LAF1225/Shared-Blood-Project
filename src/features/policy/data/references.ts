/**
 * Reference resolution for policy & advocacy (spec §15/§93). Module 07 remains the
 * canonical external citation system — Module 19 does NOT create a parallel
 * PolicyReferenceDatabase (spec §93). All literature-supported policy context
 * resolves through the same references the research module uses.
 */
export { getResearchReference as getPolicyReference, resolveReferences, RESEARCH_REFERENCES as POLICY_REFERENCES } from '@/features/research/data/references';
export type { ResearchReference as PolicyReference } from '@/features/research/data/references';
