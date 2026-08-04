import type { LocalizedText } from './common';

/** Hospital directory entry (placeholder shape — finalized in Module 15). */
export interface Hospital {
  id: string;
  name: LocalizedText;
  provinceId?: string;
  city?: string;
  specialties?: string[];
  contact?: string;
}
