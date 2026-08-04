'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  MAP_VIEWBOX,
  PAKISTAN_OUTLINE_PATH,
  PROVINCE_ANCHORS,
  projectPoint,
} from '../data/geography';
import { PROVINCE_OPTIONS } from '../data/evidence';
import type { EvidenceCluster } from '../types';

type Locale = 'en' | 'ur';

/**
 * Pakistan Evidence Map — a lightweight, accessible SVG silhouette with evidence
 * markers (spec §12/§46/§47). No mapping library; the outline and markers share
 * one projection. RTL never mirrors the geography (spec §44) — only the marker
 * SIZE (never colour alone) hints at how many evidence records sit at a location,
 * and that meaning is stated explicitly in the legend (spec §16/§45).
 *
 * A marker is NOT a prevalence hotspot: its glow/size encodes evidence-record
 * count only (spec §16). Every marker also has a text equivalent (aria-label)
 * and a fully equivalent Evidence List is rendered alongside (spec §34/§45).
 */
export function PakistanMap({
  clusters,
  selectedClusterId,
  onSelect,
}: {
  clusters: EvidenceCluster[];
  selectedClusterId: string | null;
  onSelect: (clusterId: string) => void;
}) {
  const t = useTranslations('PakistanMap');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="h-auto w-full rounded-2xl border border-border bg-surface"
        role="img"
        aria-label={t('map.ariaLabel')}
      >
        <title>{t('map.title')}</title>
        <desc>{t('map.description')}</desc>

        {/*
          National silhouette, simplified educational asset (spec §46).
          `non-scaling-stroke` holds the border at a constant visual weight from
          320px to 1440px+, and geometric precision keeps the denser tracing
          cleanly anti-aliased instead of speed-optimised.
        */}
        <path
          d={PAKISTAN_OUTLINE_PATH}
          className="fill-primary/5 stroke-primary/50"
          strokeWidth={1.25}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          shapeRendering="geometricPrecision"
        />

        {/* Non-interactive province/territory labels (spec §13). */}
        {PROVINCE_OPTIONS.map((province) => {
          const anchor = PROVINCE_ANCHORS[province.id];
          return (
            <text
              key={province.id}
              x={anchor.x}
              y={anchor.y}
              textAnchor="middle"
              className="pointer-events-none select-none fill-muted-foreground/70 text-[10px]"
            >
              {province.name[l]}
            </text>
          );
        })}

        {/* Evidence markers, one per cluster (spec §12/§15). */}
        {clusters.map((cluster) => {
          const { x, y } = projectPoint(cluster.longitude, cluster.latitude);
          const count = cluster.records.length;
          const radius = 6 + Math.min(count - 1, 6) * 1.4;
          const selected = cluster.id === selectedClusterId;
          const label = t('map.markerLabel', { location: cluster.locationName[l], count });
          return (
            <g
              key={cluster.id}
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-pressed={selected}
              className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-foreground"
              onClick={() => onSelect(cluster.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(cluster.id);
                }
              }}
            >
              {/* Soft glow, evidence-record count only, never risk (spec §16). */}
              <circle cx={x} cy={y} r={radius + 5} className="fill-accent-strong/15" />
              <circle
                cx={x}
                cy={y}
                r={radius}
                className={cn(
                  'transition-colors',
                  selected
                    ? 'fill-accent-strong stroke-foreground'
                    : 'fill-primary stroke-surface hover:fill-accent-strong',
                )}
                strokeWidth={2}
              />
              {count > 1 && (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none fill-primary-foreground text-[10px] font-semibold"
                >
                  {count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        {t('map.caption')}
      </figcaption>
    </figure>
  );
}
