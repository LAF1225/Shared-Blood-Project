import { PageContainer } from '@/components/layout';
import type { CommunityActivityHighlight, CommunityPhoto } from '../types';
import { CommunityActivities } from './CommunityActivities';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * The public Community page: the page header and Shared Blood's ongoing
 * activities with their photos. The fieldwork-impact framework
 * (`SharedBloodInCommunity`) is not shown publicly; it remains for the
 * dev-only preview route and the research module's sample data.
 */
export function CommunityPage({
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

        <CommunityActivities activities={activities} photos={photos} locale={locale} t={t} />
      </PageContainer>
    </div>
  );
}
