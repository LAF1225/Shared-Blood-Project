import type { ServiceResult } from '@/types';

/**
 * Thin API abstraction layer (Module 01 framework only).
 * Centralizes future fetch logic so features never call the network directly.
 * Real endpoints and the Supabase client arrive in Module 20.
 */
export async function apiGet<T>(
  _path: string,
  fallback: T,
): Promise<ServiceResult<T>> {
  // Placeholder: returns provided fallback data until the backend exists.
  return { data: fallback, error: null };
}

export function ok<T>(data: T): ServiceResult<T> {
  return { data, error: null };
}
