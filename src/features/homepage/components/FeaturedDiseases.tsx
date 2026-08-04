import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeading } from './SectionHeading';
import { featuredDiseases } from '../data/homepageData';

/**
 * Featured Disease Library (spec §Featured Disease Library): introduce the
 * four conditions in the first release. Presented as an editorial index —
 * the condition name is the anchor and the link — rather than four identical
 * icon cards (Module 25.5 §4/§7). Summaries are placeholder; real content comes
 * from the disease pages.
 */
export function FeaturedDiseases() {
  const t = useTranslations('Home.diseases');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <SectionContainer className="bg-surface">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <ul className="border-t border-border/70 divide-y divide-border/70">
        {featuredDiseases.map((disease) => (
          <li
            key={disease.id}
            className="group relative grid grid-cols-1 items-baseline gap-x-10 gap-y-1 py-6 md:grid-cols-[minmax(0,20rem)_1fr]"
          >
            <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
              <Link
                href={ROUTES.disease(disease.slug)}
                className="inline-flex items-baseline gap-2 rounded-sm transition-colors duration-200 ease-out-soft after:absolute after:inset-0 after:content-[''] hover:text-primary"
              >
                <span>{disease.name[l]}</span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 translate-y-1 text-primary/50 transition-transform duration-200 ease-out-soft group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </h3>
            <p className="max-w-prose text-sm text-muted-foreground md:text-base">
              {t('summaryPlaceholder')}
            </p>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
