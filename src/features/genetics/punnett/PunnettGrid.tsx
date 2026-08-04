import type { OutcomeKind, VizCell } from '../calculator/strategy';

/**
 * Inheritance combination grid (Module 09 §22 · Module 22 §24/§25/§46).
 *
 * A plain HTML/CSS 2×2 genotype matrix — no charting library. It renders the
 * exact `grid` produced by the canonical engine, so it can never diverge from
 * the probabilities (Module 22 §22/§25 "cells must not calculate new
 * probabilities"; there is one inheritance truth source).
 *
 * Accessibility (§46): a real <table> with header cells for each parent's
 * alleles; every cell states its genotype and outcome in text (never colour
 * alone); and a screen-reader text equivalent summarises all four combinations.
 */
export function PunnettGrid({
  grid,
  outcomeLabels,
  toneClass,
  parentOneLabel,
  parentTwoLabel,
  caption,
  textEquivalentLabel,
}: {
  grid: VizCell[];
  outcomeLabels: Partial<Record<OutcomeKind, string>>;
  toneClass: Partial<Record<OutcomeKind, string>>;
  parentOneLabel: string;
  parentTwoLabel: string;
  caption: string;
  textEquivalentLabel: string;
}) {
  // Grid order is [oneA×twoA, oneA×twoB, oneB×twoA, oneB×twoB].
  const parentOneAlleles = [grid[0].fromParentOne, grid[2].fromParentOne];
  const parentTwoAlleles = [grid[0].fromParentTwo, grid[1].fromParentTwo];
  const cellAt = (row: number, col: number) => grid[row * 2 + col];

  return (
    <figure className="space-y-3">
      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>

      <table className="w-full max-w-md border-separate border-spacing-1 text-center">
        <thead>
          <tr>
            <td className="w-16" aria-hidden="true" />
            <th
              scope="colgroup"
              colSpan={2}
              className="pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {parentTwoLabel}
            </th>
          </tr>
          <tr>
            <td aria-hidden="true" />
            {parentTwoAlleles.map((allele, index) => (
              <th
                key={index}
                scope="col"
                className="tnum rounded-lg bg-muted py-2 font-heading text-base font-semibold text-foreground"
              >
                {allele}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parentOneAlleles.map((rowAllele, row) => (
            <tr key={row}>
              {row === 0 && (
                <th
                  scope="rowgroup"
                  rowSpan={2}
                  className="w-16 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-muted-foreground rtl:rotate-0"
                >
                  {parentOneLabel}
                </th>
              )}
              {parentTwoAlleles.map((_, col) => {
                const cell = cellAt(row, col);
                return (
                  <td
                    key={col}
                    className={`rounded-lg border p-2 ${toneClass[cell.outcome] ?? ''}`}
                  >
                    <span className="block font-heading text-lg font-semibold text-foreground">
                      {cell.genotype}
                    </span>
                    <span className="block text-xs font-medium">
                      {outcomeLabels[cell.outcome]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Screen-reader text equivalent (§46). */}
      <p className="sr-only">
        {textEquivalentLabel}:{' '}
        {grid
          .map((cell) => `${cell.genotype} ${outcomeLabels[cell.outcome]}`)
          .join(', ')}
        .
      </p>
    </figure>
  );
}
