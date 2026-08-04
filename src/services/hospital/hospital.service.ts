import type { Hospital, ServiceResult } from '@/types';
import { ok } from '../http';

/** Hospital directory service — placeholder until Module 15. */
export async function getHospitals(): Promise<ServiceResult<Hospital[]>> {
  return ok<Hospital[]>([]);
}
