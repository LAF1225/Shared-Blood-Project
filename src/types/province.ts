import type { LocalizedText } from './common';

/** Province/region type for the Pakistan Disease Map (finalized in Module 13). */
export interface Province {
  id: string;
  name: LocalizedText;
  /** SVG path id used by the interactive map. */
  svgId?: string;
}
