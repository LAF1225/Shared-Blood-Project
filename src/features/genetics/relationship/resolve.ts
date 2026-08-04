import { RELATIONSHIP_PROFILES } from './data/profiles';
import { POPULATION_EVIDENCE } from './data/evidence';
import { DISEASE_CONTEXTS } from './data/diseaseContext';
import { getRelationshipReference } from './data/references';
import type {
  DiseaseContext,
  PopulationEvidence,
  RelationshipId,
  RelationshipProfile,
  RelationshipReference,
} from './types';

/**
 * Pure resolvers for the Relationship & Recessive Risk Explorer (Module 10).
 * Framework-free so the scientific boundaries can be unit-tested independently
 * of React (spec §42). These functions ONLY read structured configuration — they
 * never compute a disease risk, infer a genotype, or scale evidence (spec §46).
 */

/** All relationship profiles, in configured (increasing-relatedness) order. */
export function listRelationshipProfiles(): readonly RelationshipProfile[] {
  return RELATIONSHIP_PROFILES;
}

export function getRelationshipProfile(id: string | null): RelationshipProfile | null {
  if (!id) return null;
  return RELATIONSHIP_PROFILES.find((profile) => profile.id === id) ?? null;
}

/**
 * Population evidence for a relationship, or `null` when none is configured.
 * A missing entry must surface the "not provided" message — never an estimate
 * (spec §17/§40).
 */
export function getPopulationEvidence(id: RelationshipId | string | null): PopulationEvidence | null {
  if (!id) return null;
  return POPULATION_EVIDENCE.find((evidence) => evidence.relationshipId === id) ?? null;
}

export function getDiseaseContext(slug: string | null): DiseaseContext | null {
  if (!slug) return null;
  return DISEASE_CONTEXTS.find((context) => context.id === slug) ?? null;
}

export function listDiseaseContexts(): readonly DiseaseContext[] {
  return DISEASE_CONTEXTS;
}

/** Resolve a profile's reference ids to full references (spec §33). */
export function getProfileReferences(profile: RelationshipProfile): RelationshipReference[] {
  return profile.references
    .map((id) => getRelationshipReference(id))
    .filter((reference): reference is RelationshipReference => reference !== null);
}

export { getRelationshipReference };
