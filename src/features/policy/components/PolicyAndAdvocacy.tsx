import { Info } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import type { AdvocacyPriority, AdvocacyPriorityType, PolicyAdvocacyDataset, PolicyDomain } from '../types';
import { getRenderableDataset } from '../validate';
import {
  availableDomains,
  availablePriorityTypes,
  availableYears,
  filterPriorities,
  getBriefById,
  getBriefDownloads,
  getEvidenceTypesInUse,
  getFeaturedPriorities,
  getPriorityById,
  getPriorityEvidenceLinks,
  getPriorityLimitations,
  getRenderableBriefs,
  getRenderablePriorities,
  getRenderableTimeline,
} from '../resolve';
import { AdvocacyPriorityCard } from './AdvocacyPriorityCard';
import { AdvocacyPriorityDetail } from './AdvocacyPriorityDetail';
import { PolicyArchive } from './PolicyArchive';
import { PolicyBriefCard } from './PolicyBriefCard';
import { PolicyBriefPage } from './PolicyBriefPage';
import { PolicyLimitationsList } from './shared';
import { AdvocacyTimelineView, EvidenceBehind, PolicyEmptyState } from './PolicyAux';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/** The Version-1 advocacy scope areas (spec §5). */
const SCOPE_AREAS = [
  'GENETIC_HEALTH_EDUCATION',
  'CARRIER_AWARENESS',
  'GENETIC_TESTING_EDUCATION',
  'GENETIC_COUNSELLING_AWARENESS',
  'EARLY_SYMPTOM_EDUCATION',
  'CHILDCARE_WORKER_TRAINING',
  'LANGUAGE_ACCESSIBILITY',
  'COMMUNITY_HEALTH_EDUCATION',
] as const;

/**
 * "Policy & Advocacy" — the public advocacy page (Module 19, spec §68).
 * Synchronous by design: the route resolves `t` and passes it in, keeping the page
 * out of its own Suspense boundary (Module 05 pattern). A `?priority=` or `?brief=`
 * deep-link renders that detail page (spec §71/§49); otherwise it renders the §68
 * overview flow. `?domain/type/year=` drive the archive.
 *
 * With no valid dataset or no approved priorities, it renders the §112 empty states
 * (plus the disclaimer and evidence framing) — never placeholder positions.
 */
export function PolicyAndAdvocacy({
  dataset,
  locale,
  t,
  selectedPriorityId,
  selectedBriefId,
  filters,
}: {
  dataset: PolicyAdvocacyDataset | null;
  locale: string;
  t: Translator;
  selectedPriorityId?: string | null;
  selectedBriefId?: string | null;
  filters?: { domain: PolicyDomain | 'all'; priorityType: AdvocacyPriorityType | 'all'; year: string | 'all' };
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const safe = getRenderableDataset(dataset);

  if (safe && selectedPriorityId) {
    const priority = getPriorityById(safe, selectedPriorityId);
    if (priority)
      return (
        <Shell>
          <AdvocacyPriorityDetail priority={priority} dataset={safe} locale={locale} t={t} />
        </Shell>
      );
  }
  if (safe && selectedBriefId) {
    const brief = getBriefById(safe, selectedBriefId);
    if (brief)
      return (
        <Shell>
          <PolicyBriefPage brief={brief} dataset={safe} locale={locale} t={t} />
        </Shell>
      );
  }

  const priorities = safe ? getRenderablePriorities(safe) : [];
  const hasData = priorities.length > 0;
  const featured = safe ? getFeaturedPriorities(safe) : [];
  const briefs = safe ? getRenderableBriefs(safe) : [];
  const timeline = safe ? getRenderableTimeline(safe) : [];
  const evidenceTypes = safe ? getEvidenceTypesInUse(safe) : [];

  const current = filters ?? { domain: 'all' as const, priorityType: 'all' as const, year: 'all' as const };
  const filtered = filterPriorities(priorities, current);
  const options = {
    domains: availableDomains(priorities),
    priorityTypes: availablePriorityTypes(priorities),
    years: availableYears(priorities),
  };
  const requiredLimitations = safe
    ? safe.limitations.filter((lim) => lim.reviewStatus === 'APPROVED_FOR_PUBLICATION' && lim.publicDisplayRequired)
    : [];

  const evidenceLabelFor = (p: AdvocacyPriority): string => {
    if (!safe) return '';
    const types = Array.from(new Set(getPriorityEvidenceLinks(safe, p).map((link) => link.sourceType)));
    return types.map((ty) => t(`evidenceSourceTypes.${ty}`)).join(', ');
  };

  return (
    <Shell wide>
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('kicker')}</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t('title')}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
      </header>

      {/* Advocacy introduction + public disclaimer (spec §69/§111). */}
      <section aria-labelledby="intro-heading" id="overview" className="space-y-3 scroll-mt-24">
        <h2 id="intro-heading" className="font-heading text-2xl font-semibold text-foreground">{t('intro.title')}</h2>
        <p className="max-w-prose leading-relaxed text-foreground/90">{t('intro.body')}</p>
        <div className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-foreground/80">{safe ? safe.publicDisclaimer[l] : t('intro.disclaimer')}</p>
        </div>
      </section>

      {/* What Shared Blood advocates for (spec §5). */}
      <section aria-labelledby="scope-heading" className="space-y-3 scroll-mt-24">
        <h2 id="scope-heading" className="font-heading text-2xl font-semibold text-foreground">{t('scopeSection.title')}</h2>
        <p className="max-w-prose text-sm text-muted-foreground">{t('scopeSection.body')}</p>
        <ul className="flex flex-wrap gap-2">
          {SCOPE_AREAS.map((area) => (
            <li key={area} className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/90">
              {t(`domains.${area}`)}
            </li>
          ))}
        </ul>
      </section>

      {hasData ? (
        <>
          {featured.length > 0 && (
            <section aria-labelledby="featured-heading" id="featured" className="space-y-5 scroll-mt-24">
              <h2 id="featured-heading" className="font-heading text-2xl font-semibold text-foreground">{t('featured.title')}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {featured.map((p) => (
                  <AdvocacyPriorityCard
                    key={p.id}
                    priority={p}
                    evidenceTypeLabel={evidenceLabelFor(p)}
                    limitation={getPriorityLimitations(safe!, p)[0] ?? null}
                    locale={locale}
                    t={t}
                  />
                ))}
              </div>
            </section>
          )}

          <EvidenceBehind evidenceTypes={evidenceTypes} t={t} />

          <PolicyArchive
            priorities={filtered}
            evidenceLabelFor={evidenceLabelFor}
            options={options}
            current={current}
            locale={locale}
            t={t}
          />
        </>
      ) : (
        <PolicyEmptyState t={t} />
      )}

      {/* Policy & advocacy briefs (spec §68). */}
      <section aria-labelledby="briefs-heading" id="briefs" className="space-y-5 scroll-mt-24">
        <h2 id="briefs-heading" className="font-heading text-2xl font-semibold text-foreground">{t('briefs.title')}</h2>
        {briefs.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {briefs.map((b) => (
              <PolicyBriefCard key={b.id} brief={b} hasDownload={getBriefDownloads(safe!, b).length > 0} locale={locale} t={t} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
            {t('empty.briefs')}
          </p>
        )}
      </section>

      <AdvocacyTimelineView events={timeline} locale={locale} t={t} />

      {requiredLimitations.length > 0 && (
        <section id="boundaries" className="scroll-mt-24">
          <PolicyLimitationsList limitations={requiredLimitations} locale={locale} t={t} heading={t('boundaries.title')} />
        </section>
      )}
    </Shell>
  );
}

function Shell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="py-10 sm:py-14">
      <PageContainer className={wide ? 'max-w-4xl space-y-12' : 'max-w-4xl'}>{children}</PageContainer>
    </div>
  );
}
