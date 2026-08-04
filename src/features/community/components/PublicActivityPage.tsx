import { ArrowLeft, BadgeCheck, CalendarDays, MapPin, Target, Users } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { getDiseaseBySlug } from '@/features/diseases/data/diseases';
import type { CommunityFieldworkDataset, PublicFieldActivityRecord } from '../types';
import {
  getActivityFieldLearnings,
  getActivityResources,
  getPublicEvidenceAssets,
  getPublicObservations,
} from '../resolve';
import { FieldLearningCard } from './FieldLearningCard';
import { EvidenceAssetList } from './EvidenceAssetList';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A public activity page (spec §35). Renders the approved public record with:
 * context, date, city/location, audience, objectives, what Shared Blood delivered,
 * resources used, topics, documented impact metrics, what we observed, what we
 * learned, and approved evidence assets. It contains NO participant names,
 * contacts, individual scores, medical/child information, unreviewed notes,
 * private correspondence, or raw attendance sheets (spec §35). Partner attribution
 * (incl. PRIDEA) is shown exactly as approved (spec §33).
 */
export function PublicActivityPage({
  activity,
  dataset,
  locale,
  t,
}: {
  activity: PublicFieldActivityRecord;
  dataset: CommunityFieldworkDataset;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const observations = getPublicObservations(dataset, activity.id);
  const learnings = getActivityFieldLearnings(dataset, activity.id);
  const evidence = getPublicEvidenceAssets(dataset, activity.id);
  const resources = getActivityResources(dataset, activity);

  return (
    <article className="space-y-8">
      <a
        href={ROUTES.community}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('activity.back')}
      </a>

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {t(`activityTypes.${activity.activityType}`)}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {activity.activityTitle[l]}
        </h1>
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Meta icon={<CalendarDays className="h-4 w-4" aria-hidden="true" />}>{activity.activityDate}</Meta>
          <Meta icon={<MapPin className="h-4 w-4" aria-hidden="true" />}>
            {t(`cities.${activity.cityId}`)} · {t(`locationTypes.${activity.locationType}`)}
          </Meta>
          <Meta icon={<Users className="h-4 w-4" aria-hidden="true" />}>
            {activity.participantCountDisplay[l]} · {t('activity.participants')}
          </Meta>
          <Meta icon={<BadgeCheck className="h-4 w-4" aria-hidden="true" />}>
            {t(`verification.${activity.verificationStatus}`)}
          </Meta>
        </dl>
      </header>

      {activity.programAssociation && (
        <p className="rounded-2xl border border-secondary/25 bg-secondary/5 p-4 text-sm leading-relaxed text-foreground/85">
          <span className="font-semibold">{t('activity.partnerAttribution')}: </span>
          {activity.programAssociation[l]}
        </p>
      )}

      <Section title={t('activity.context')}>
        <p className="text-sm leading-relaxed text-foreground/90">{activity.activitySummary[l]}</p>
      </Section>

      {activity.activityObjectives.length > 0 && (
        <Section title={t('activity.objectives')}>
          <ul className="space-y-1.5">
            {activity.activityObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{obj[l]}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t('activity.delivered')}>
        <p className="text-sm leading-relaxed text-foreground/90">{activity.activityMethodSummary[l]}</p>
      </Section>

      {/* Audience + topics */}
      <div className="grid gap-6 sm:grid-cols-2">
        {activity.targetAudienceLabels.length > 0 && (
          <Section title={t('activity.audience')}>
            <ChipList items={activity.targetAudienceLabels.map((a) => t(`audiences.${a}`))} />
          </Section>
        )}
        {activity.diseaseIds.length > 0 && (
          <Section title={t('activity.topics')}>
            <ChipList items={activity.diseaseIds.map((id) => getDiseaseBySlug(id)?.name[l] ?? id)} />
          </Section>
        )}
      </div>

      {resources.length > 0 && (
        <Section title={t('activity.resources')}>
          <ul className="space-y-1.5">
            {resources.map((r) => (
              <li key={r.id} className="text-sm text-foreground/90">
                {r.title[l]} <span className="text-muted-foreground">· {t('activity.version', { n: r.version })}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {activity.approvedImpactMetrics.length > 0 && (
        <Section title={t('activity.impactMetrics')}>
          <dl className="grid gap-3 sm:grid-cols-3">
            {activity.approvedImpactMetrics.map((m) => (
              <div key={m.metricCode} className="rounded-xl border border-border bg-surface p-4">
                <dd className="font-heading text-2xl font-semibold text-primary tabular-nums">
                  {m.isApproximate ? t('activity.approx', { n: m.value }) : m.value}
                </dd>
                <dt className="mt-1 text-xs text-muted-foreground">{t(`metricCodes.${m.metricCode}`)}</dt>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {observations.length > 0 && (
        <Section title={t('activity.observed')}>
          <ul className="space-y-2">
            {observations.map((o) => (
              <li key={o.id} className="rounded-xl border border-border bg-surface p-4 text-sm text-foreground/90">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t(`observationTypes.${o.observationType}`)}
                </p>
                <p className="mt-1 leading-relaxed">{o.observationSummary[l]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">{t('activity.observationNote')}</p>
        </Section>
      )}

      {learnings.length > 0 && (
        <Section title={t('activity.learned')}>
          <div className="grid gap-4 sm:grid-cols-2">
            {learnings.map((learning) => (
              <FieldLearningCard key={learning.id} learning={learning} locale={locale} t={t} />
            ))}
          </div>
        </Section>
      )}

      <EvidenceAssetList assets={evidence} locale={locale} t={t} />
    </article>
  );
}

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/90">
          {item}
        </li>
      ))}
    </ul>
  );
}
