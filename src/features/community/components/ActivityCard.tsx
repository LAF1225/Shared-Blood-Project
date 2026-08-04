import { ArrowRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { PublicFieldActivityRecord } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * A compact activity card for the featured list and archive (spec §35/§37).
 * Links to the activity's public page via a `?activity=` deep-link (server-side,
 * no client state). Shows type, date, city, audience, and the participant-count
 * display (approximate for estimated attendance, spec §14). Never shows
 * participant names or internal notes (spec §35).
 */
export function ActivityCard({
  activity,
  locale,
  t,
}: {
  activity: PublicFieldActivityRecord;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const href = `${ROUTES.community}?activity=${encodeURIComponent(activity.id)}`;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {t(`activityTypes.${activity.activityType}`)}
      </p>
      <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
        {activity.activityTitle[l]}
      </h3>

      <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
          <dd>{activity.activityDate}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <dd>{t(`cities.${activity.cityId}`)} · {t(`locationTypes.${activity.locationType}`)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
          <dd>{activity.participantCountDisplay[l]} · {t('activity.participants')}</dd>
        </div>
      </dl>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/80">
        {activity.activitySummary[l]}
      </p>

      <a
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {t('activity.viewActivity')}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      </a>
    </article>
  );
}
