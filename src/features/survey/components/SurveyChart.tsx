import { cn } from '@/lib/utils';
import { SUPPRESSED, type ChartData } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Lightweight, accessible survey chart (spec §46/§47). Renders horizontal CSS
 * bars — no 3D, animation, particle, or geographic engine. Every chart provides
 * a title, description, a text/data-table alternative, and a visible response
 * count. It NEVER encodes meaning by colour alone (each bar is labelled and
 * valued in text). Suppressed cells (spec §42) render as "not shown" with NO
 * recoverable number — the SUPPRESSED sentinel is never printed as a value.
 *
 * Presentational and synchronous: the page resolves `t` and passes it in.
 */
export function SurveyChart({
  chart,
  locale,
  t,
}: {
  chart: ChartData;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const visible = chart.data
    .map((d) => d.value)
    .filter((v): v is number => v !== SUPPRESSED);
  const max = Math.max(1, ...visible);

  return (
    <figure className="space-y-3 rounded-2xl border border-border bg-surface p-5">
      <figcaption>
        <p className="font-heading font-semibold text-foreground">{chart.title[l]}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{chart.description[l]}</p>
      </figcaption>

      <ul className="space-y-2" aria-hidden="false">
        {chart.data.map((row, index) => {
          const suppressed = row.value === SUPPRESSED;
          const value = suppressed ? 0 : (row.value as number);
          const width = suppressed ? 0 : Math.max(2, (value / max) * 100);
          return (
            <li key={index} className="grid grid-cols-[10rem_1fr_4rem] items-center gap-2 text-sm">
              <span className="truncate text-foreground/90" title={row.label[l]}>{row.label[l]}</span>
              <span className="h-4 rounded bg-muted/40" aria-hidden="true">
                {!suppressed && (
                  <span
                    className="block h-4 rounded bg-primary/70"
                    style={{ width: `${width}%` }}
                  />
                )}
              </span>
              <span className={cn('text-end tabular-nums', suppressed ? 'text-muted-foreground' : 'text-foreground')}>
                {suppressed ? t('chart.suppressed') : `${value}${chart.unit[l]}`}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{t('chart.basedOn', { count: chart.validResponseCount })}</span>
        <span>{chart.sourceLabel[l]}</span>
      </div>

      {chart.limitationNote && (
        <p className="text-xs text-muted-foreground">{chart.limitationNote[l]}</p>
      )}

      {/* Data-table alternative (spec §47). */}
      <details className="text-sm">
        <summary className="cursor-pointer text-primary">{t('chart.showTable')}</summary>
        <table className="mt-2 w-full border-collapse text-start">
          <caption className="sr-only">{chart.title[l]}</caption>
          <thead>
            <tr className="border-b border-border text-start text-xs text-muted-foreground">
              <th scope="col" className="py-1 pe-3 text-start font-medium">{t('chart.category')}</th>
              <th scope="col" className="py-1 text-start font-medium">{t('chart.value')}</th>
            </tr>
          </thead>
          <tbody>
            {chart.data.map((row, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-1 pe-3">{row.label[l]}</td>
                <td className="py-1 tabular-nums">
                  {row.value === SUPPRESSED ? t('chart.suppressed') : `${row.value}${chart.unit[l]}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
