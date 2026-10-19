import { BookOpen, MapPin, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import type { CommunityActivityHighlight, CommunityPhoto } from '../types';
import { PhotoSlideshow } from './PhotoSlideshow';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Ongoing community work: a photo slideshow followed by one card per activity.
 * Qualitative only (no dates, counts or impact), so it can sit alongside the
 * reviewed fieldwork dataset without pre-empting it.
 */
export function CommunityActivities({
  activities,
  photos,
  locale,
  t,
}: {
  activities: readonly CommunityActivityHighlight[];
  photos: readonly CommunityPhoto[];
  locale: string;
  /** `Community` namespace translator. */
  t: Translator;
}) {
  const l = locale === 'ur' ? 'ur' : 'en';
  if (activities.length === 0) return null;

  return (
    <section aria-labelledby="activities-heading" id="activities" className="space-y-6 scroll-mt-24">
      <div>
        <h2 id="activities-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('ongoing.title')}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">{t('ongoing.body')}</p>
      </div>

      {photos.length > 0 && (
        <PhotoSlideshow
          rtl={l === 'ur'}
          slides={photos.map((p) => ({
            src: p.src,
            width: p.width,
            height: p.height,
            alt: p.alt[l],
            caption: p.caption[l],
          }))}
          labels={{
            region: t('ongoing.gallery'),
            previous: t('ongoing.previous'),
            next: t('ongoing.next'),
            // Keep the ICU placeholders as literal text; the client fills them per slide.
            goTo: t('ongoing.goTo', { n: '{n}' }),
            position: t('ongoing.position', { current: '{current}', total: '{total}' }),
          }}
        />
      )}

      <ul className="grid gap-5 sm:grid-cols-2">
        {activities.map((activity) => (
          <li key={activity.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
            <span className="w-fit rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-semibold text-secondary-dark">
              {t('ongoing.badge')}
            </span>
            <h3 className="font-heading text-lg font-semibold text-foreground">{activity.title[l]}</h3>
            <p className="text-sm leading-relaxed text-foreground/85">{activity.summary[l]}</p>
            <dl className="mt-auto space-y-1.5 border-t border-border pt-3 text-sm">
              <div className="flex items-start gap-2">
                <dt>
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="sr-only">{t('ongoing.place')}</span>
                </dt>
                <dd className="text-foreground/85">{activity.place[l]}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt>
                  <Users className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="sr-only">{t('ongoing.audience')}</span>
                </dt>
                <dd className="text-foreground/85">{activity.audience[l]}</dd>
              </div>
            </dl>
            {activity.resourceSlug && (
              <Link
                href={ROUTES.resource(activity.resourceSlug)}
                className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {t('ongoing.resourceLink')}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
