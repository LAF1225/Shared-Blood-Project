import type { Disease, LocalizedText } from '@/types';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PageContainer } from '@/components/layout';
import {
  SectionShell,
  InfoBlock,
  EducationalCallout,
} from '@/features/diseases/content/components/Section';
import { RelatedDiseases } from '@/features/diseases/content/components/RelatedDiseases';
import { ReferenceList } from '@/features/diseases/content/components/Lists';
import { getDiseaseBySlug } from '@/features/diseases';
import { getResourceBySlug, ResourceCard } from '@/features/learning';
import type { LearningResource } from '@/features/learning';
import type { GeneticsTool } from '../types';
import { getToolConnections } from '../data/connections';
import { InteractiveToolPlaceholder } from './InteractiveToolPlaceholder';
import { ResultInterpretation } from './ResultInterpretation';
import { EducationalNextSteps } from './EducationalNextSteps';
import { PlatformLinks } from './PlatformLinks';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Genetics tool page (spec §8). A single reusable template renders any tool from
 * structured data in the standard order — Overview → Purpose → Interactive Tool
 * → Educational Explanation → Understanding the results → Limitations → Related
 * Resources → Related Diseases → References — showing only the parts that exist.
 *
 * The interactive slot is intentionally a placeholder: this module builds the
 * framework, and the calculation logic arrives in Modules 09/10 (spec §18).
 *
 * Synchronous by design: the async route resolves the translator and passes it
 * in (same pattern as the Disease Page and Resource Page systems), which avoids
 * a nested async Server Component and its Suspense boundary.
 */
export function GeneticsToolPage({
  tool,
  locale,
  t,
  interactive,
}: {
  tool: GeneticsTool;
  locale: string;
  /** `Genetics` namespace translator. */
  t: Translator;
  /**
   * The tool's live interactive experience. When provided (e.g. the Module 09
   * calculator), it fills the §8 interactive slot; otherwise a "coming soon"
   * placeholder is shown. This keeps every tool page structurally identical
   * (spec §8) while letting individual tools ship their own interaction.
   */
  interactive?: React.ReactNode;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const pick = (text: LocalizedText) => text[l];
  const isActive = tool.status === 'active';

  const relatedResources: LearningResource[] = (tool.relatedResources ?? [])
    .map((slug) => getResourceBySlug(slug))
    .filter((item): item is LearningResource => item != null);
  const relatedDiseases: Disease[] = (tool.relatedDiseases ?? [])
    .map((slug) => getDiseaseBySlug(slug))
    .filter((item): item is Disease => item !== null);

  const hasExplanation = (tool.educationalExplanation?.length ?? 0) > 0;
  const hasLimitations = (tool.limitations?.length ?? 0) > 0;
  const hasReferences = (tool.references?.length ?? 0) > 0;

  // Curated educational cross-navigation to related active tools (Module 24 §7).
  const nextSteps = getToolConnections(tool.slug).map((connection) => ({
    href: connection.href,
    title: t(`connections.${connection.key}.title`),
    description: t(`connections.${connection.key}.description`),
  }));

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-3xl space-y-12">
        {/* Title + summary */}
        <header className="space-y-4">
          <Badge tone={isActive ? 'primary' : 'neutral'}>
            {t(isActive ? 'tools.available' : 'tools.comingSoon')}
          </Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {pick(tool.title)}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {pick(tool.summary)}
          </p>
        </header>

        {/* Overview */}
        {(tool.overview?.length ?? 0) > 0 && (
          <SectionShell id="overview" title={t('toolPage.overview')}>
            <InfoBlock paragraphs={tool.overview!.map(pick)} />
          </SectionShell>
        )}

        {/* Purpose */}
        {(tool.purpose?.length ?? 0) > 0 && (
          <SectionShell id="purpose" title={t('toolPage.purpose')}>
            <InfoBlock paragraphs={tool.purpose!.map(pick)} />
          </SectionShell>
        )}

        {/* Interactive tool slot (spec §8). A live tool fills it when provided;
            otherwise a "coming soon" placeholder holds the structure. */}
        <SectionShell id="interactive" title={t('toolPage.interactiveTool')}>
          {interactive ?? (
            <InteractiveToolPlaceholder
              title={t(isActive ? 'toolPage.interactivePendingTitle' : 'toolPage.comingSoonTitle')}
              body={t(isActive ? 'toolPage.interactivePendingBody' : 'toolPage.comingSoonBody')}
            />
          )}
        </SectionShell>

        {/* Educational explanation */}
        {hasExplanation && (
          <SectionShell id="explanation" title={t('toolPage.explanation')}>
            <div className="space-y-6">
              {tool.educationalExplanation!.map((block, index) => (
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

        {/* Understanding the results (spec §9) */}
        {tool.interpretation && (
          <SectionShell id="interpretation" title={t('toolPage.interpretation')}>
            <ResultInterpretation
              demonstratesLabel={t('toolPage.demonstrates')}
              demonstrates={pick(tool.interpretation.demonstrates)}
              resultsMeanLabel={t('toolPage.resultsMean')}
              resultsMean={pick(tool.interpretation.resultsMean)}
              resultsDoNotMeanLabel={t('toolPage.resultsDoNotMean')}
              resultsDoNotMean={pick(tool.interpretation.resultsDoNotMean)}
            />
          </SectionShell>
        )}

        {/* Limitations + medical-advice reminder (spec §9) */}
        {hasLimitations && (
          <SectionShell id="limitations" title={t('toolPage.limitations')}>
            <div className="space-y-5">
              <InfoBlock points={tool.limitations!.map(pick)} />
              <EducationalCallout title={t('callout.title')}>
                {t('callout.body')}
              </EducationalCallout>
            </div>
          </SectionShell>
        )}

        {/* Related resources */}
        {relatedResources.length > 0 && (
          <SectionShell id="related-resources" title={t('toolPage.relatedResources')}>
            <ul className="grid gap-5 sm:grid-cols-2">
              {relatedResources.map((resource) => (
                <li key={resource.id}>
                  <ResourceCard resource={resource} />
                </li>
              ))}
            </ul>
          </SectionShell>
        )}

        {/* Related diseases */}
        {relatedDiseases.length > 0 && (
          <SectionShell id="related-diseases" title={t('toolPage.relatedDiseases')}>
            <RelatedDiseases diseases={relatedDiseases} />
          </SectionShell>
        )}

        {/* References */}
        {hasReferences && (
          <SectionShell id="references" title={t('toolPage.references')}>
            <ReferenceList
              sourceLabel={t('toolPage.sourceLabel')}
              items={tool.references!.map((reference) => ({
                id: reference.id,
                title: pick(reference.title),
                publication: reference.publication ? pick(reference.publication) : undefined,
                url: reference.url,
              }))}
            />
          </SectionShell>
        )}

        {/* Curated educational next steps to related tools (Module 24 §7/§39) */}
        <EducationalNextSteps heading={t('connections.heading')} items={nextSteps} />

        {/* Navigation, never a dead end (spec §10) */}
        <nav aria-label={t('toolPage.continue')} className="space-y-4 border-t border-border pt-8">
          <Link
            href={ROUTES.genetics}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4 text-primary rtl:rotate-180" aria-hidden="true" />
            {t('toolPage.backToExplorer')}
          </Link>
          <PlatformLinks />
        </nav>
      </PageContainer>
    </div>
  );
}
