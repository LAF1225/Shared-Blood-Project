import { cn } from '@/lib/utils';
import type { OutcomeKind, SupportedCalculation } from '../calculator/strategy';
import { OUTCOME_TONE } from './presentation';
import { PunnettGrid } from './PunnettGrid';

/**
 * Shared Punnett Square renderer (Module 22 §22–§26). The SINGLE renderer used
 * by all three surfaces — the Inheritance Calculator, the Relationship Explorer
 * educational scenarios, and the standalone Punnett route.
 *
 * It is a pure visualization of a canonical `SupportedCalculation`: it never
 * calculates probability itself (§22/§25). The grid frequencies and the outcome
 * summary both derive from the same engine result, so they can never diverge.
 *
 * Presentational (no client state) so it renders inside client tools or server
 * pages alike. It provides BOTH a visual grid and an accessible, non-visual
 * outcome summary built from the same canonical result (§46).
 */
export function PunnettSquare({
  calculation,
  outcomeLabel,
  outcomeExplanation,
  summaryHeading,
  showSummary = true,
  parentOneLabel,
  parentTwoLabel,
  caption,
  textEquivalentLabel,
}: {
  calculation: SupportedCalculation;
  /** Resolve a localized label for an outcome kind. */
  outcomeLabel: (kind: OutcomeKind) => string;
  /** Optional localized explanation per outcome kind. */
  outcomeExplanation?: (kind: OutcomeKind) => string;
  /** Heading for the outcome summary (required when `showSummary`). */
  summaryHeading?: string;
  /**
   * Show the outcome-frequency summary above the grid. The Inheritance
   * Calculator sets this false because it renders its own probability display
   * (§29); the relationship/standalone scenarios keep it (§46).
   */
  showSummary?: boolean;
  parentOneLabel: string;
  parentTwoLabel: string;
  caption: string;
  textEquivalentLabel: string;
}) {
  const outcomeLabels: Partial<Record<OutcomeKind, string>> = {};
  const toneClass: Partial<Record<OutcomeKind, string>> = {};
  for (const { kind } of calculation.outcomes) {
    outcomeLabels[kind] = outcomeLabel(kind);
    toneClass[kind] = OUTCOME_TONE[kind].tone;
  }

  return (
    <div className="space-y-6">
      {/* Accessible outcome summary, the same canonical result, non-visual (§46) */}
      {showSummary && (
      <div>
        <h4 className="mb-3 font-heading text-base font-semibold text-foreground">
          {summaryHeading}
        </h4>
        <ul className={cn('grid gap-3', calculation.outcomes.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
          {calculation.outcomes.map(({ kind, percent }) => (
            <li key={kind} className={cn('rounded-2xl border p-4', OUTCOME_TONE[kind].tone)}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading font-semibold text-foreground">
                  {outcomeLabel(kind)}
                </span>
                <span className="tnum font-heading text-2xl font-semibold text-foreground">
                  {percent}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div className={cn('h-full rounded-full', OUTCOME_TONE[kind].bar)} style={{ width: `${percent}%` }} />
              </div>
              {outcomeExplanation && (
                <p className="mt-2 text-sm text-muted-foreground">{outcomeExplanation(kind)}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      )}

      {/* Visual grid, the same canonical cells (§24/§25) */}
      <PunnettGrid
        grid={calculation.grid}
        outcomeLabels={outcomeLabels}
        toneClass={toneClass}
        parentOneLabel={parentOneLabel}
        parentTwoLabel={parentTwoLabel}
        caption={caption}
        textEquivalentLabel={textEquivalentLabel}
      />
    </div>
  );
}
