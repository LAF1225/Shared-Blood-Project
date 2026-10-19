import type { LocalizedText } from '@/types';

/**
 * Shared Blood's public policy agenda. One brief is published at a time; its
 * text lives in `data/ntspr.ts` and the page renders it in this order.
 */

/** A headline figure shown as a stat tile. */
export interface PolicyFigure {
  value: LocalizedText;
  label: LocalizedText;
}

/** An existing law or bill and why it has not been enough on its own. */
export interface PolicyLaw {
  region: LocalizedText;
  name: LocalizedText;
  summary: LocalizedText;
}

/** A titled point: a gap in current legislation or a proposed measure. */
export interface PolicyPoint {
  title: LocalizedText;
  body: LocalizedText;
}

export interface PolicyBrief {
  /** Short code used in the page header, e.g. "NTSPR". */
  code: string;
  summary: LocalizedText[];
  figuresIntro: LocalizedText;
  figures: PolicyFigure[];
  figuresNote: LocalizedText;
  lawsIntro: LocalizedText;
  laws: PolicyLaw[];
  gaps: PolicyPoint[];
  gapsConclusion: LocalizedText;
  proposalIntro: LocalizedText;
  measures: PolicyPoint[];
  safeguards: LocalizedText[];
}
