import type { Province, ServiceResult } from '@/types';
import { ok } from '../http';

/** Pakistan disease map service — placeholder until Module 13. */
export async function getProvinces(): Promise<ServiceResult<Province[]>> {
  return ok<Province[]>([]);
}
