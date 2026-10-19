import type { Disease, LocalizedText } from '@/types';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { ArrowLeft, Library, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageContainer } from '@/components/layout';
import {
  SectionShell,
  InfoBlock,
} from '@/features/diseases/content/components/Section';
import { RelatedDiseases } from '@/features/diseases/content/components/RelatedDiseases';
import { getDiseaseBySlug } from '@/features/diseases';
import { CATEGORY_LABEL_KEY } from '../data/categories';
import { getRelatedResources } from '../data/resources';
import type { LearningResource } from '../types';
import { ResourceCard } from './ResourceCard';
import { DownloadCard } from './DownloadCard';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Educational resource page (spec §7). A reusable template that renders any
 * resource from structured data in the standard order — summary, download,
 * educational content, practical guidance, key takeaways, related resources,
 * and related diseases — showing only the parts that exist.
 *
 * Synchronous by design: the async route resolves translators and passes them
 * in (same pattern as the Disease Page System).
 */
export function ResourcePage({
  resource,
  locale,
  t,
}: {
  resource: LearningResource;
  locale: string;
  /** `Learning` namespace translator. */
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const pick = (text: LocalizedText) => text[l];

  const relatedResources = getRelatedResources(resource.slug);
  const relatedDiseases: Disease[] = (resource.relatedDiseases ?? [])
    .map((slug) => getDiseaseBySlug(slug))
    .filter((item): item is Disease => item !== null);

  const hasContent = (resource.content?.length ?? 0) > 0;
  const hasGuidance = (resource.practicalGuidance?.length ?? 0) > 0;
  const hasTakeaways = (resource.keyTakeaways?.length ?? 0) > 0;

  const metaParts = [
    resource.version ? `${t('page.version')} ${resource.version}` : null,
    resource.publicationDate
      ? `${t('page.updated')} ${formatDate(resource.publicationDate, l)}`
      : null,
  ].filter(Boolean);

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-3xl space-y-12">
        {/* Title + summary */}
        <header className="space-y-4">
          <Badge tone="primary">
            {t(`categories.${CATEGORY_LABEL_KEY[resource.category]}`)}
          </Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {pick(resource.title)}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {pick(resource.summary)}
          </p>
          {metaParts.length > 0 && (
            <p className="text-sm text-muted-foreground">{metaParts.join(' · ')}</p>
          )}
        </header>

        {/* Download, near the top so the file is easy to find */}
        {resource.download && (
          <SectionShell id="downloads" title={t('page.downloads')}>
            <DownloadCard resource={resource} />
          </SectionShell>
        )}

        {/* Educational content */}
        {hasContent && (
          <SectionShell id="content" title={t('page.content')}>
            <div className="space-y-6">
              {resource.content!.map((block, index) => (
                <div key={index} className="space-y-2">
                  {block.heading && (
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {pick(block.heading)}
                    </h3>
                  )}
                  <InfoBlock
                    paragraphs={block.paragraphs?.map(pick)}
                    points={block.points?.map(pick)}
                  />
                </div>
              ))}
            </div>
          </SectionShell>
        )}

        {/* Practical guidance */}
        {hasGuidance && (
          <SectionShell id="guidance" title={t('page.practicalGuidance')}>
            <InfoBlock points={resource.practicalGuidance!.map(pick)} />
          </SectionShell>
        )}

        {/* Key takeaways */}
        {hasTakeaways && (
          <section aria-labelledby="takeaways-heading" id="takeaways" className="scroll-mt-28">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h2
                id="takeaways-heading"
                className="font-heading text-lg font-semibold text-foreground"
              >
                {t('page.keyTakeaways')}
              </h2>
              <ul className="mt-3 space-y-2">
                {resource.keyTakeaways!.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-foreground/90">{pick(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related resources */}
        {relatedResources.length > 0 && (
          <SectionShell id="related-resources" title={t('page.relatedResources')}>
            <ul className="grid gap-5 sm:grid-cols-2">
              {relatedResources.map((item) => (
                <li key={item.id}>
                  <ResourceCard resource={item} />
                </li>
              ))}
            </ul>
          </SectionShell>
        )}

        {/* Related diseases */}
        {relatedDiseases.length > 0 && (
          <SectionShell id="related-diseases" title={t('page.relatedDiseases')}>
            <RelatedDiseases diseases={relatedDiseases} />
          </SectionShell>
        )}

        {/* Navigation, no dead ends (spec §15) */}
        <nav aria-label={t('page.continue')} className="flex flex-wrap gap-2 border-t border-border pt-8">
          <Link
            href={ROUTES.resources}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 text-primary rtl:rotate-180" aria-hidden="true" />
            {t('page.backToCentre')}
          </Link>
          <Link
            href={ROUTES.diseases}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <Library className="h-4 w-4 text-primary" aria-hidden="true" />
            {t('page.diseaseLibrary')}
          </Link>
        </nav>
      </PageContainer>
    </div>
  );
}

function formatDate(iso: string, locale: L): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ur' ? 'ur-PK' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
