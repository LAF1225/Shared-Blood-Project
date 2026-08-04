import { useLocale, useTranslations } from 'next-intl';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeading } from './SectionHeading';
import { awarenessStats } from '../data/homepageData';

/**
 * Awareness statistics (spec §Awareness Statistics): educational figures.
 * Values are placeholder/configurable — no hardcoded metrics. Pending values
 * render as "—" until future modules supply configurable data sources.
 */
export function AwarenessStatistics() {
  const t = useTranslations('Home.stats');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <SectionContainer>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />
      <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {awarenessStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-2xl border border-border/80 bg-surface p-7 text-center shadow-card"
          >
            <dt className="sr-only">{stat.label[l]}</dt>
            <dd>
              <span className="tnum block font-heading text-5xl font-semibold tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">
                {stat.label[l]}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </SectionContainer>
  );
}
