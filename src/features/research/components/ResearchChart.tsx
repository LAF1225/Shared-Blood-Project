import type { ResearchVisualization } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Lightweight, accessible research visualization (spec §75/§78/§79). Renders CSS
 * bars — no heavy dashboard, animation, or geographic engine (spec §75). Every
 * chart carries altText, a data-table alternative, a methodology note, and (where
 * present) a limitation note, and NEVER encodes meaning by colour alone: each bar
 * is labelled and valued in text (spec §79). Findings remain understandable
 * without the chart (spec §79/§104). Presentational + synchronous: the page
 * resolves `t` and passes it in.
 *
 * displayValues are the rounded values; sourceValues remain unrounded upstream
 * (spec §31). SCORE_CHANGE renders a before → after pair (spec §76).
 */
export function ResearchChart({
  viz,
  locale,
  t,
}: {
  viz: ResearchVisualization;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const values = viz.displayValues;
  const max = Math.max(1, ...values);
  const isScoreChange = viz.visualizationType === 'SCORE_CHANGE';

  return (
    <figure className="space-y-3 rounded-2xl border border-border bg-surface p-5">
      <figcaption>
        <p className="font-heading font-semibold text-foreground">{viz.title[l]}</p>
        <p className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">
          {t(`vizTypes.${viz.visualizationType}`)}
        </p>
      </figcaption>

      <ul className="space-y-2">
        {viz.categories.map((cat, index) => {
          const value = values[index] ?? 0;
          const width = Math.max(2, (value / max) * 100);
          return (
            <li key={index} className="grid grid-cols-[11rem_1fr_4rem] items-center gap-2 text-sm">
              <span className="truncate text-foreground/90" title={cat[l]}>{cat[l]}</span>
              <span className="h-4 rounded bg-muted/40" aria-hidden="true">
                <span className="block h-4 rounded bg-primary/70" style={{ width: `${width}%` }} />
              </span>
              <span className="text-end tabular-nums text-foreground">
                {value}
                {viz.unit[l]}
              </span>
            </li>
          );
        })}
      </ul>

      {isScoreChange && values.length === 2 && (
        <p className="text-sm font-medium text-foreground">
          {t('chart.change', { value: Math.round((values[1] - values[0]) * 10) / 10, unit: viz.unit[l] })}
        </p>
      )}

      <p className="text-xs text-muted-foreground">{viz.methodologyNote[l]}</p>
      {viz.limitationNote && <p className="text-xs text-muted-foreground">{viz.limitationNote[l]}</p>}

      {/* Screen-reader / no-chart text alternative (spec §79). */}
      <p className="sr-only">{viz.altText[l]}</p>

      {/* Data-table alternative (spec §79). */}
      <details className="text-sm">
        <summary className="cursor-pointer text-primary">{t('chart.showTable')}</summary>
        <table className="mt-2 w-full border-collapse text-start">
          <caption className="sr-only">{viz.title[l]}</caption>
          <thead>
            <tr className="border-b border-border text-start text-xs text-muted-foreground">
              <th scope="col" className="py-1 pe-3 text-start font-medium">{viz.yAxisDefinition[l]}</th>
              <th scope="col" className="py-1 text-start font-medium">{viz.xAxisDefinition[l]}</th>
            </tr>
          </thead>
          <tbody>
            {viz.categories.map((cat, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-1 pe-3">{cat[l]}</td>
                <td className="py-1 tabular-nums">
                  {values[index]}
                  {viz.unit[l]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
