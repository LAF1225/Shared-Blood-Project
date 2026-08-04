import { useTranslations } from 'next-intl';
import { ArrowRight, Dna, Map, BookOpen, ClipboardList } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

/**
 * Related resources (spec §6 layout). Cross-navigation so the Disease Library
 * is never a dead end — points users to the other learning areas of the
 * platform. Destinations are placeholder routes until their modules land.
 */
export function RelatedResources() {
  const t = useTranslations('DiseaseLibrary');

  const resources = [
    {
      id: 'genetics',
      href: ROUTES.genetics,
      icon: Dna,
      title: t('resourceGenetics'),
      desc: t('resourceGeneticsDesc'),
    },
    {
      id: 'map',
      href: ROUTES.map,
      icon: Map,
      title: t('resourceMap'),
      desc: t('resourceMapDesc'),
    },
    {
      id: 'resources',
      href: ROUTES.resources,
      icon: BookOpen,
      title: t('resourceResources'),
      desc: t('resourceResourcesDesc'),
    },
    {
      id: 'survey',
      href: ROUTES.survey,
      icon: ClipboardList,
      title: t('resourceSurvey'),
      desc: t('resourceSurveyDesc'),
    },
  ];

  return (
    <section aria-labelledby="related-resources-heading">
      <div className="mb-6">
        <h2
          id="related-resources-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          {t('relatedResourcesTitle')}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t('relatedResourcesSubtitle')}
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <li key={resource.id}>
            <Link
              href={resource.href}
              className={cn(
                'group flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-5',
                'transition-colors hover:border-primary/40 hover:bg-primary/5',
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <resource.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-1 font-heading font-semibold text-foreground">
                {resource.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {resource.desc}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary">
                {t('learnMore')}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
