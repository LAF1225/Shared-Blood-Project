'use client';

import { useTranslations } from 'next-intl';

/**
 * Map legend (spec §32). Explains the evidence marker, cluster, selected marker,
 * and — explicitly — that markers represent documented evidence records, NOT
 * confirmed disease prevalence hotspots (spec §32). Text-based so it never
 * relies on colour alone (spec §45).
 */
export function MapLegend() {
  const t = useTranslations('PakistanMap');

  const items: { key: string; swatch: React.ReactNode }[] = [
    {
      key: 'marker',
      swatch: <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-accent-strong/15" />,
    },
    {
      key: 'cluster',
      swatch: (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground ring-4 ring-accent-strong/15">
          3
        </span>
      ),
    },
    {
      key: 'selected',
      swatch: <span className="h-3 w-3 rounded-full bg-accent-strong ring-2 ring-foreground" />,
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">{t('legend.title')}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.key} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex w-5 shrink-0 justify-center" aria-hidden="true">
              {item.swatch}
            </span>
            <span>
              <span className="font-medium text-foreground">{t(`legend.${item.key}.label`)}</span>
              {', '}
              {t(`legend.${item.key}.desc`)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-border pt-3 text-xs font-medium text-foreground">
        {t('legend.disclaimer')}
      </p>
    </div>
  );
}
