import type {
  InheritanceInput,
  InheritanceOutcome,
  PopulationRiskInput,
  PopulationRiskOutcome,
  ServiceResult,
} from '@/types';
import { ok } from '../http';

/**
 * Calculator services — architecture only.
 * NO probability algorithms here: business logic belongs to Modules 11 & 12.
 */
export async function computeInheritance(
  _input: InheritanceInput,
): Promise<ServiceResult<InheritanceOutcome | null>> {
  return ok<InheritanceOutcome | null>(null);
}

export async function computePopulationRisk(
  _input: PopulationRiskInput,
): Promise<ServiceResult<PopulationRiskOutcome | null>> {
  return ok<PopulationRiskOutcome | null>(null);
}
