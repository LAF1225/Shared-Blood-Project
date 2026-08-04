import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { ActivityType, FieldworkCity, PublicFieldActivityRecord } from '../types';
import { ActivityCard } from './ActivityCard';

type Translator = (key: string, values?: Record<string, string | number>) => string;

export interface ArchiveFilters {
  type: ActivityType | 'all';
  city: FieldworkCity | 'all';
  year: string | 'all';
}

/**
 * Activity archive with Type / City / Year filters (spec §37). Filters are pure
 * SSR links — each option is an anchor that rewrites the `?type/city/year=` query
 * while preserving the others (no client state, no hydration). It NEVER filters
 * by participant medical condition, marriage history, genetic risk, or knowledge
 * score (spec §37); those inputs do not exist. Featured status does not affect
 * ordering here (spec §37).
 */
export function ActivityArchive({
  activities,
  options,
  current,
  locale,
  t,
}: {
  activities: readonly PublicFieldActivityRecord[];
  options: { types: ActivityType[]; cities: FieldworkCity[]; years: string[] };
  current: ArchiveFilters;
  locale: string;
  t: Translator;
}) {
  const hrefFor = (patch: Partial<ArchiveFilters>): string => {
    const next = { ...current, ...patch };
    const params = new URLSearchParams();
    if (next.type !== 'all') params.set('type', next.type);
    if (next.city !== 'all') params.set('city', next.city);
    if (next.year !== 'all') params.set('year', next.year);
    const qs = params.toString();
    return qs ? `${ROUTES.community}?${qs}#archive` : `${ROUTES.community}#archive`;
  };

  return (
    <section id="archive" aria-labelledby="archive-heading" className="space-y-5 scroll-mt-24">
      <div>
        <h2 id="archive-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('archive.title')}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('archive.count', { count: activities.length })}</p>
      </div>

      <div className="space-y-3">
        <FilterRow
          label={t('archive.filterType')}
          allHref={hrefFor({ type: 'all' })}
          allActive={current.type === 'all'}
          allLabel={t('archive.all')}
          options={options.types.map((type) => ({
            label: t(`activityTypes.${type}`),
            href: hrefFor({ type }),
            active: current.type === type,
          }))}
        />
        <FilterRow
          label={t('archive.filterCity')}
          allHref={hrefFor({ city: 'all' })}
          allActive={current.city === 'all'}
          allLabel={t('archive.all')}
          options={options.cities.map((city) => ({
            label: t(`cities.${city}`),
            href: hrefFor({ city }),
            active: current.city === city,
          }))}
        />
        <FilterRow
          label={t('archive.filterYear')}
          allHref={hrefFor({ year: 'all' })}
          allActive={current.year === 'all'}
          allLabel={t('archive.all')}
          options={options.years.map((year) => ({
            label: year,
            href: hrefFor({ year }),
            active: current.year === year,
          }))}
        />
      </div>

      {activities.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} locale={locale} t={t} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
          {t('archive.empty')}
        </p>
      )}
    </section>
  );
}

function FilterRow({
  label,
  allHref,
  allActive,
  allLabel,
  options,
}: {
  label: string;
  allHref: string;
  allActive: boolean;
  allLabel: string;
  options: { label: string; href: string; active: boolean }[];
}) {
  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3 py-1 text-sm transition-colors',
      active
        ? 'border-primary bg-primary/10 font-medium text-primary'
        : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
    );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}:</span>
      <a href={allHref} className={chip(allActive)} aria-current={allActive ? 'true' : undefined}>
        {allLabel}
      </a>
      {options.map((opt) => (
        <a key={opt.href} href={opt.href} className={chip(opt.active)} aria-current={opt.active ? 'true' : undefined}>
          {opt.label}
        </a>
      ))}
    </div>
  );
}
