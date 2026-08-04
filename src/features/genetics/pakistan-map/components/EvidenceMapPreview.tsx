import { useLocale, useTranslations } from 'next-intl';
import {
  MAP_VIEWBOX,
  PAKISTAN_OUTLINE_PATH,
  projectPoint,
} from '../data/geography';
import { ALL_MAP_EVIDENCE } from '../data/evidence';
import { getValidEvidence } from '../validate';
import { clusterEvidence } from '../filter';

type Locale = 'en' | 'ur';

/**
 * Lightweight homepage preview of the Evidence Map (spec §4/§17).
 *
 * Deliberately NOT the full map: a server-rendered static SVG with a handful of
 * glowing points from the SAME shared dataset (spec §3) — no mapping library, no
 * marker metadata, no interactions, and no client JS (spec §4/§46). The glowing
 * points are labelled as *documented evidence*, never "epicenters" (spec §17).
 */
const PREVIEW_CLUSTERS = clusterEvidence(getValidEvidence(ALL_MAP_EVIDENCE)).slice(0, 6);

export function EvidenceMapPreview() {
  const t = useTranslations('Home.map');
  const locale = useLocale();
  const l: Locale = locale === 'ur' ? 'ur' : 'en';

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
      className="h-auto w-full"
      role="img"
      aria-label={t('previewAlt')}
    >
      {/* Same tracing and stroke treatment as the full map, so the preview and
          the Evidence Map read as one asset at any width. */}
      <path
        d={PAKISTAN_OUTLINE_PATH}
        className="fill-primary/10 stroke-primary/50"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
      />
      {PREVIEW_CLUSTERS.map((cluster) => {
        const { x, y } = projectPoint(cluster.longitude, cluster.latitude);
        return (
          <g key={cluster.id}>
            <circle cx={x} cy={y} r={12} className="animate-pulse fill-accent-strong/20" />
            <circle cx={x} cy={y} r={5} className="fill-primary stroke-surface" strokeWidth={1.5}>
              <title>{cluster.locationName[l]}</title>
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
