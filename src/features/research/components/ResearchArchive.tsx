import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import type { EvidenceType, ResearchDomain, ResearchFinding } from '../types';
import { FindingCard } from './FindingCard';

type Translator = (key: string, values?: Record<string, string | number>) => string;

export interface ArchiveFilters {
  domain: ResearchDomain | 'all';
  evidenceType: EvidenceType | 'all';
  year: string | 'all';
}

/**
 * Research archive with Research Domain, Evidence Type, and Year filters
 * (spec §81). Filters are pure SSR links — each option rewrites the query while
 * preserving the others (no client state). It NEVER filters by individual genetic
 * risk, family history, participant identity, or individual survey response
 * (spec §81); those inputs do not exist.
 */
export function ResearchArchive({
  findings,
  options,
  current,
  locale,
  t,
}: {
  findings: readonly ResearchFinding[];
  options: { domains: ResearchDomain[]; evidenceTypes: EvidenceType[]; years: string[] };
  current: ArchiveFilters;
  locale: string;
  t: Translator;
}) {
  const hrefFor = (patch: Partial<ArchiveFilters>): string => {
    const next = { ...current, ...patch };
    const params = new URLSearchParams();
    if (next.domain !== 'all') params.set('domain', next.domain);
    if (next.evidenceType !== 'all') params.set('evidence', next.evidenceType);
    if (next.year !== 'all') params.set('year', next.year);
    const qs = params.toString();
    return qs ? `${ROUTES.research}?${qs}#archive` : `${ROUTES.research}#archive`;
  };

  return (
    <section id="archive" aria-labelledby="archive-heading" className="space-y-5 scroll-mt-24">
      <div>
        <h2 id="archive-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('archive.title')}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t('archive.count', { count: findings.length })}</p>
      </div>

      <div className="space-y-3">
        <FilterRow
          label={t('archive.filterDomain')}
          allHref={hrefFor({ domain: 'all' })}
          allActive={current.domain === 'all'}
          allLabel={t('archive.all')}
          options={options.domains.map((d) => ({
            label: t(`domains.${d}`),
            href: hrefFor({ domain: d }),
            active: current.domain === d,
          }))}
        />
        <FilterRow
          label={t('archive.filterEvidence')}
          allHref={hrefFor({ evidenceType: 'all' })}
          allActive={current.evidenceType === 'all'}
          allLabel={t('archive.all')}
          options={options.evidenceTypes.map((e) => ({
            label: t(`evidenceTypes.${e}`),
            href: hrefFor({ evidenceType: e }),
            active: current.evidenceType === e,
          }))}
        />
        <FilterRow
          label={t('archive.filterYear')}
          allHref={hrefFor({ year: 'all' })}
          allActive={current.year === 'all'}
          allLabel={t('archive.all')}
          options={options.years.map((y) => ({
            label: y,
            href: hrefFor({ year: y }),
            active: current.year === y,
          }))}
        />
      </div>

      {findings.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {findings.map((f) => (
            <FindingCard key={f.id} finding={f} locale={locale} t={t} />
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
