import { PageContainer } from '@/components/layout';
import type {
  ActivityType,
  CommunityActivityHighlight,
  CommunityFieldworkDataset,
  CommunityImpactFinding,
  CommunityPhoto,
  FieldworkCity,
} from '../types';
import { getRenderableDataset } from '../validate';
import {
  availableActivityTypes,
  availableCities,
  availableYears,
  filterActivities,
  getFeaturedActivities,
  getPublicActivityById,
  getPublicPartners,
  getRenderableFieldLearnings,
  getRenderableFindings,
  resolvePublicActivities,
} from '../resolve';
import { ImpactSummaryCards } from './ImpactSummaryCards';
import { ActivityCard } from './ActivityCard';
import { ActivityArchive } from './ActivityArchive';
import { FieldLearningCard } from './FieldLearningCard';
import { CommunityFindingCard } from './CommunityFindingCard';
import { CommunityMethodology } from './CommunityMethodology';
import { CommunityEmptyState } from './CommunityEmptyState';
import { PartnerList } from './PartnerList';
import { PublicActivityPage } from './PublicActivityPage';
import { CommunityActivities } from './CommunityActivities';

type Translator = (key: string, values?: Record<string, string | number>) => string;

const FIELDWORK_SCOPES = [
  'CHILDCARE_WORKER_EDUCATION',
  'ORPHANAGE_OUTREACH',
  'LEARNING_BOOKLET_DISTRIBUTION',
  'GENETIC_AWARENESS_SESSION',
  'INHERITANCE_EDUCATION',
  'CARRIER_AWARENESS_SESSION',
  'GENETIC_TESTING_AWARENESS',
  'COMMUNITY_INFORMATION_CAMPAIGN',
  'PARTNER_SUPPORTED_OUTREACH',
] as const;

/**
 * "Shared Blood in the Community" — the public community impact page (Module 17,
 * spec §36). Synchronous by design: the route resolves the translator `t` and
 * passes it in, keeping the page out of its own Suspense boundary (Module 05
 * pattern). When a valid `?activity=` deep-link is present it renders that
 * activity's public page (spec §35); otherwise it renders the §36 overview flow.
 *
 * With no valid dataset or no approved completed activities, it renders the §48
 * empty state (plus methodology) — never planned activities as completed impact,
 * never invented counts.
 */
export function SharedBloodInCommunity({
  dataset,
  findings,
  locale,
  t,
  selectedActivityId,
  filters,
  highlights = [],
  photos = [],
}: {
  dataset: CommunityFieldworkDataset | null;
  findings: readonly CommunityImpactFinding[];
  /** Ongoing activity highlights and their photos, shown after the intro. */
  highlights?: readonly CommunityActivityHighlight[];
  photos?: readonly CommunityPhoto[];
  locale: string;
  t: Translator;
  selectedActivityId?: string | null;
  filters?: { type: ActivityType | 'all'; city: FieldworkCity | 'all'; year: string | 'all' };
}) {
  const safeDataset = getRenderableDataset(dataset);

  // Activity deep-link (spec §35/§47) — fully server-rendered, no client state.
  if (safeDataset && selectedActivityId) {
    const activity = getPublicActivityById(safeDataset, selectedActivityId);
    if (activity) {
      return (
        <div className="py-10 sm:py-14">
          <PageContainer className="max-w-4xl">
            <PublicActivityPage activity={activity} dataset={safeDataset} locale={locale} t={t} />
          </PageContainer>
        </div>
      );
    }
  }

  const activities = safeDataset ? resolvePublicActivities(safeDataset) : [];
  const hasData = activities.length > 0;
  const featured = getFeaturedActivities(activities);
  const learnings = safeDataset ? getRenderableFieldLearnings(safeDataset) : [];
  const approvedFindings = getRenderableFindings(findings);
  const partners = safeDataset ? getPublicPartners(safeDataset) : [];

  const current = filters ?? { type: 'all' as const, city: 'all' as const, year: 'all' as const };
  const filtered = filterActivities(activities, current);
  const options = {
    types: availableActivityTypes(activities),
    cities: availableCities(activities),
    years: availableYears(activities),
  };

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('kicker')}</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
        </header>

        {/* Community work introduction + positioning (spec §4/§5/§16). */}
        <section aria-labelledby="intro-heading" id="overview" className="space-y-3 scroll-mt-24">
          <h2 id="intro-heading" className="font-heading text-2xl font-semibold text-foreground">
            {t('intro.title')}
          </h2>
          <p className="max-w-prose leading-relaxed text-foreground/90">{t('intro.body')}</p>
          <p className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground/80">
            {t('intro.positioning')}
          </p>
        </section>

        <CommunityActivities activities={highlights} photos={photos} locale={locale} t={t} />

        {safeDataset && <ImpactSummaryCards summary={safeDataset.impactSummary} t={t} />}

        {/* Current fieldwork focus (spec §6/§36). */}
        <section aria-labelledby="focus-heading" className="space-y-3 scroll-mt-24">
          <h2 id="focus-heading" className="font-heading text-2xl font-semibold text-foreground">
            {t('focus.title')}
          </h2>
          <p className="max-w-prose text-sm text-muted-foreground">{t('focus.body')}</p>
          <ul className="flex flex-wrap gap-2">
            {FIELDWORK_SCOPES.map((scope) => (
              <li
                key={scope}
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/90"
              >
                {t(`scopes.${scope}`)}
              </li>
            ))}
          </ul>
        </section>

        {hasData ? (
          <>
            {/* Featured activities (spec §37). */}
            {featured.length > 0 && (
              <section aria-labelledby="featured-heading" className="space-y-5 scroll-mt-24">
                <h2 id="featured-heading" className="font-heading text-2xl font-semibold text-foreground">
                  {t('featured.title')}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {featured.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} locale={locale} t={t} />
                  ))}
                </div>
              </section>
            )}

            {/* Key findings (spec §43). */}
            {approvedFindings.length > 0 && (
              <section aria-labelledby="findings-heading" id="key-findings" className="space-y-5 scroll-mt-24">
                <h2 id="findings-heading" className="font-heading text-2xl font-semibold text-foreground">
                  {t('findings.title')}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {approvedFindings.map((finding) => (
                    <CommunityFindingCard key={finding.id} finding={finding} locale={locale} t={t} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <CommunityEmptyState t={t} />
        )}

        {/* Childcare-worker education + learning booklet framing (spec §7/§8). */}
        <section aria-labelledby="childcare-heading" className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-border bg-surface p-6">
            <h2 id="childcare-heading" className="font-heading text-xl font-semibold text-foreground">
              {t('childcare.title')}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{t('childcare.body')}</p>
            <p className="text-sm font-medium text-primary">{t('childcare.boundary')}</p>
          </div>
          <div className="space-y-2 rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground">{t('booklet.title')}</h2>
            <p className="text-sm leading-relaxed text-foreground/90">{t('booklet.body')}</p>
          </div>
        </section>

        {/* What we learned in the field (spec §44). */}
        {learnings.length > 0 && (
          <section aria-labelledby="learnings-heading" id="learnings" className="space-y-5 scroll-mt-24">
            <div>
              <h2 id="learnings-heading" className="font-heading text-2xl font-semibold text-foreground">
                {t('learnings.title')}
              </h2>
              <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('changed.narrative')}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {learnings.map((learning) => (
                <FieldLearningCard key={learning.id} learning={learning} locale={locale} t={t} />
              ))}
            </div>
          </section>
        )}

        {/* Activity archive with filters (spec §37). */}
        {hasData && (
          <ActivityArchive
            activities={filtered}
            options={options}
            current={current}
            locale={locale}
            t={t}
          />
        )}

        <PartnerList partners={partners} locale={locale} t={t} />

        <CommunityMethodology dataset={safeDataset} locale={locale} t={t} />
      </PageContainer>
    </div>
  );
}
