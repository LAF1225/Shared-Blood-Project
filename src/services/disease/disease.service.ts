import type { Disease, ServiceResult } from '@/types';
import { ok } from '../http';

/** Disease data service — placeholder until Modules 05–09 supply content. */
export async function getDiseases(): Promise<ServiceResult<Disease[]>> {
  return ok<Disease[]>([]);
}

export async function getDiseaseBySlug(
  _slug: string,
): Promise<ServiceResult<Disease | null>> {
  return ok<Disease | null>(null);
}
