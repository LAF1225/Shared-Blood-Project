import type { Disease, LocalizedText } from '@/types';
import { PageContainer } from '@/components/layout';
import { PageNav, type PageNavSection } from '@/components/layout';
import { CATEGORY_LABEL_KEY } from '../../data/categories';
import { getDiseaseBySlug } from '../../data/diseases';
import type { DiseaseContent, InfoSection } from '../types';
import {
  SectionShell,
  InfoBlock,
  SymptomsList,
  EmergencyAlert,
  EducationalCallout,
} from './Section';
import { DiseaseHeader, QuickFacts, type QuickFactVM } from './DiseaseHeader';
import {
  ReferenceList,
  SpecialistCards,
  ResourceCards,
  ResearchUpdates,
} from './Lists';
import { Faq } from './Faq';
import { StoriesSection, type PublicStory } from '@/features/stories';
import { CareSummary } from '@/features/care-support';
import { RelatedDiseases } from './RelatedDiseases';
import { DiseaseNavigation } from './DiseaseNavigation';
import { DiseaseGeneticsLinks, type DiseaseGeneticsLink } from './DiseaseGeneticsLinks';
import { ROUTES } from '@/constants/routes';

/**
 * Care & Support summary (Module 14 §4/§5) resolved server-side by the route and
 * passed in as pre-localized strings, so the section streams with the page.
 */
export interface CareSummaryVM {
  title: string;
  intro: string;
  domains: string[];
  ctaLabel: string;
  diseaseSlug: string;
}

type L = 'en' | 'ur';

/** Minimal translator shape (satisfied by next-intl's server `t`). */
type Translator = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

function hasInfo(section?: InfoSection): boolean {
  if (!section) return false;
  return (
    (section.paragraphs?.length ?? 0) + (section.points?.length ?? 0) > 0
  );
}

function hasItems<T>(items?: T[]): items is T[] {
  return Array.isArray(items) && items.length > 0;
}

/**
 * Disease Page System (Module 05) — the reusable rendering engine.
 *
 * Given a disease's metadata (Module 04) and optional structured content
 * (Module 06), it renders the standardized page in spec §7 order, showing only
 * the sections that have data and hiding the rest (§9). No disease-specific
 * content is hardcoded — the exact same component renders every current and
 * future disease.
 *
 * Synchronous by design: the async route resolves the translators (`t`, `cat`)
 * and passes them in. This keeps the engine out of its own Suspense boundary so
 * the page streams as a single unit.
 */
export function DiseasePage({
  disease,
  content,
  order,
  locale,
  t,
  cat,
  stories = [],
  careSummary = null,
  dnaSupported = false,
}: {
  disease: Disease;
  content: DiseaseContent | null;
  order: Disease[];
  locale: string;
  /** `DiseasePage` namespace translator. */
  t: Translator;
  /** `DiseaseLibrary` namespace translator (for category labels). */
  cat: Translator;
  /**
   * Whether the DNA Explorer has a molecular record for this disease (Module 24
   * §8). Resolved by the route via the DNA feature resolver; gates the DNA link.
   */
  dnaSupported?: boolean;
  /**
   * Publicly-resolved Stories & Perspectives for this disease (Module 12). The
   * route resolves them server-side via the Story Resolver and passes the
   * sanitized `PublicStory[]`; stories are NOT embedded in disease content (§4).
   */
  stories?: PublicStory[];
  /**
   * Care & Support summary for this disease (Module 14 §4/§5). Resolved and
   * localized by the route; null when the disease has no valid care records.
   */
  careSummary?: CareSummaryVM | null;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const pick = (text: LocalizedText) => text[l];

  // ---- Header + metadata quick facts (from Module 04 — not medical content).
  const categoryLabels = disease.categories.map((category) =>
    cat(`categories.${CATEGORY_LABEL_KEY[category]}`),
  );

  const facts: QuickFactVM[] = [
    { label: t('quickFacts.bodySystem'), value: pick(disease.bodySystem) },
    {
      label: t('quickFacts.inheritance'),
      value: pick(disease.inheritancePattern),
    },
    { label: t('quickFacts.category'), value: categoryLabels.join('، ') },
  ];
  for (const fact of content?.quickFacts ?? []) {
    const label = fact.labelKey
      ? t(`quickFacts.${fact.labelKey}`)
      : fact.label
        ? pick(fact.label)
        : '';
    facts.push({ label, value: pick(fact.value) });
  }

  const lastUpdatedIso = content?.lastUpdated ?? disease.lastUpdated;
  const lastUpdatedLabel = lastUpdatedIso
    ? `${t('lastUpdatedPrefix')}: ${formatDate(lastUpdatedIso, l)}`
    : undefined;

  // ---- Related + prev/next navigation. Resolve from this disease's own
  // `related` slugs so it works for any disease object (incl. fixtures).
  const related = disease.related
    .map((relatedSlug) => getDiseaseBySlug(relatedSlug))
    .filter((item): item is Disease => item !== null);
  const index = order.findIndex((item) => item.slug === disease.slug);
  const prev = index > 0 ? order[index - 1] : undefined;
  const next =
    index >= 0 && index < order.length - 1 ? order[index + 1] : undefined;

  // ---- Presence flags drive both the on-this-page nav and rendering (§9).
  const show = {
    emergency: hasItems(content?.emergencySymptoms),
    about: hasInfo(content?.about),
    earlySymptoms: hasItems(content?.earlySymptoms),
    hiddenSymptoms: hasItems(content?.hiddenSymptoms),
    inheritance: hasInfo(content?.inheritance),
    diagnosis: hasInfo(content?.diagnosis),
    treatment: hasInfo(content?.treatment),
    livingWith: hasInfo(content?.livingWith),
    parentGuidance: hasInfo(content?.parentGuidance),
    growthOutlook: hasInfo(content?.growthOutlook),
    specialists:
      hasItems(content?.specialists) || hasItems(content?.resources),
    faq: hasItems(content?.faq),
    research: hasItems(content?.researchUpdates),
    references: hasItems(content?.references),
    related: hasItems(related),
  };

  // Stories come from the Module 12 resolver, not disease content (spec §4).
  const showStories = stories.length > 0;

  // Care & Support summary comes from the Module 14 resolver (spec §4/§5).
  const showCare = careSummary !== null;

  // "Coming soon" is based on authored content only — related diseases are
  // derived from metadata and shouldn't suppress the notice on a sparse page.
  const { related: _related, ...authoredFlags } = show;
  const hasAnyContent = Object.values(authoredFlags).some(Boolean) || showStories || showCare;

  // Build the "on this page" list from whatever is actually rendered.
  const navSections: PageNavSection[] = [
    { id: 'quick-facts', label: t('sections.quickFacts') },
    show.emergency && { id: 'emergency', label: t('sections.emergency') },
    show.about && { id: 'about', label: t('sections.about') },
    show.earlySymptoms && {
      id: 'early-symptoms',
      label: t('sections.earlySymptoms'),
    },
    show.hiddenSymptoms && {
      id: 'hidden-symptoms',
      label: t('sections.hiddenSymptoms'),
    },
    show.inheritance && { id: 'inheritance', label: t('sections.inheritance') },
    show.diagnosis && { id: 'diagnosis', label: t('sections.diagnosis') },
    show.treatment && { id: 'treatment', label: t('sections.treatment') },
    show.livingWith && { id: 'living-with', label: t('sections.livingWith') },
    show.parentGuidance && {
      id: 'parent-guidance',
      label: t('sections.parentGuidance'),
    },
    show.growthOutlook && {
      id: 'growth-outlook',
      label: t('sections.growthOutlook'),
    },
    show.specialists && {
      id: 'specialists',
      label: t('sections.specialists'),
    },
    showCare && { id: 'care-support', label: careSummary!.title },
    showStories && { id: 'stories', label: t('sections.stories') },
    show.faq && { id: 'faq', label: t('sections.faq') },
    show.research && { id: 'research', label: t('sections.research') },
    show.references && { id: 'references', label: t('sections.references') },
    show.related && { id: 'related', label: t('sections.related') },
  ].filter((item): item is PageNavSection => Boolean(item));

  // Curated disease → genetics-tool educational links (Module 24 §8/§43). Only
  // the canonical disease id travels (via `?disease=`); EDS/LSD do NOT preselect
  // a subtype — the tool shows its subtype gate.
  const geneticsLinks: DiseaseGeneticsLink[] = [
    dnaSupported && {
      href: `${ROUTES.genetics}/dna-explorer?disease=${disease.slug}`,
      title: t('explore.dna.title'),
      description: t('explore.dna.description'),
    },
    disease.calculator?.enabled && {
      href: `${ROUTES.genetics}/inheritance-calculator?disease=${disease.slug}`,
      title: t('explore.calculator.title'),
      description: t('explore.calculator.description'),
    },
    {
      href: ROUTES.map,
      title: t('explore.map.title'),
      description: t('explore.map.description'),
    },
  ].filter(Boolean) as DiseaseGeneticsLink[];

  const info = (section?: InfoSection) => ({
    paragraphs: section?.paragraphs?.map(pick),
    points: section?.points?.map(pick),
  });
  const symptoms = (items = [] as NonNullable<DiseaseContent['earlySymptoms']>) =>
    items.map((item) => ({ text: pick(item.text), note: item.note && pick(item.note) }));

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
          <div className="min-w-0 space-y-12">
            <DiseaseHeader
              name={pick(disease.name)}
              categories={categoryLabels}
              shortDescription={pick(disease.summary)}
              lastUpdatedLabel={lastUpdatedLabel}
            />

            <QuickFacts title={t('sections.quickFacts')} facts={facts} />

            {/* When content isn't authored yet (Module 06), say so plainly. */}
            {!hasAnyContent && (
              <EducationalCallout title={t('comingSoonTitle')}>
                {t('comingSoonBody')}
              </EducationalCallout>
            )}

            {show.emergency && (
              <div id="emergency" className="scroll-mt-28">
                <EmergencyAlert
                  title={t('sections.emergency')}
                  items={symptoms(content!.emergencySymptoms)}
                />
              </div>
            )}

            {show.about && (
              <SectionShell id="about" title={t('sections.about')}>
                <InfoBlock {...info(content!.about)} />
              </SectionShell>
            )}

            {show.earlySymptoms && (
              <SectionShell
                id="early-symptoms"
                title={t('sections.earlySymptoms')}
              >
                <SymptomsList items={symptoms(content!.earlySymptoms)} />
              </SectionShell>
            )}

            {show.hiddenSymptoms && (
              <SectionShell
                id="hidden-symptoms"
                title={t('sections.hiddenSymptoms')}
              >
                <SymptomsList items={symptoms(content!.hiddenSymptoms)} />
              </SectionShell>
            )}

            {show.inheritance && (
              <SectionShell id="inheritance" title={t('sections.inheritance')}>
                <InfoBlock {...info(content!.inheritance)} />
              </SectionShell>
            )}

            {show.diagnosis && (
              <SectionShell id="diagnosis" title={t('sections.diagnosis')}>
                <InfoBlock {...info(content!.diagnosis)} />
              </SectionShell>
            )}

            {show.treatment && (
              <SectionShell id="treatment" title={t('sections.treatment')}>
                <InfoBlock {...info(content!.treatment)} />
              </SectionShell>
            )}

            {show.livingWith && (
              <SectionShell id="living-with" title={t('sections.livingWith')}>
                <InfoBlock {...info(content!.livingWith)} />
              </SectionShell>
            )}

            {show.parentGuidance && (
              <SectionShell
                id="parent-guidance"
                title={t('sections.parentGuidance')}
              >
                <InfoBlock {...info(content!.parentGuidance)} />
              </SectionShell>
            )}

            {show.growthOutlook && (
              <SectionShell
                id="growth-outlook"
                title={t('sections.growthOutlook')}
              >
                <InfoBlock {...info(content!.growthOutlook)} />
              </SectionShell>
            )}

            {show.specialists && (
              <SectionShell
                id="specialists"
                title={t('sections.specialists')}
              >
                <div className="space-y-6">
                  {hasItems(content?.specialists) && (
                    <SpecialistCards
                      items={content!.specialists!.map((item) => ({
                        id: item.id,
                        role: pick(item.role),
                        description: item.description && pick(item.description),
                      }))}
                    />
                  )}
                  {hasItems(content?.resources) && (
                    <ResourceCards
                      items={content!.resources!.map((item) => ({
                        id: item.id,
                        label: pick(item.label),
                        description: item.description && pick(item.description),
                        href: item.href,
                        external: item.external,
                      }))}
                    />
                  )}
                </div>
              </SectionShell>
            )}

            {/* Care & Support summary (Module 14), resolver-driven; links to the
                full Module 14 view. Hidden when the disease has no care records. */}
            {showCare && (
              <SectionShell id="care-support" title={careSummary!.title}>
                <CareSummary
                  intro={careSummary!.intro}
                  domains={careSummary!.domains}
                  ctaLabel={careSummary!.ctaLabel}
                  diseaseSlug={careSummary!.diseaseSlug}
                />
              </SectionShell>
            )}

            {/* Stories & Perspectives (Module 12), resolver-driven, near the
                bottom of the page (spec §4). Hidden entirely when empty (§39). */}
            {showStories && (
              <SectionShell id="stories" title={t('sections.stories')}>
                <StoriesSection stories={stories} />
              </SectionShell>
            )}

            {show.faq && (
              <SectionShell id="faq" title={t('sections.faq')}>
                <Faq
                  items={content!.faq!.map((item) => ({
                    id: item.id,
                    question: pick(item.question),
                    answer: pick(item.answer),
                  }))}
                />
              </SectionShell>
            )}

            {show.research && (
              <SectionShell id="research" title={t('sections.research')}>
                <ResearchUpdates
                  readMoreLabel={t('research.readMore')}
                  items={content!.researchUpdates!.map((item) => ({
                    id: item.id,
                    title: pick(item.title),
                    summary: item.summary && pick(item.summary),
                    date: item.date,
                    url: item.url,
                  }))}
                />
              </SectionShell>
            )}

            {show.references && (
              <SectionShell id="references" title={t('sections.references')}>
                <ReferenceList
                  sourceLabel={t('references.source')}
                  items={content!.references!.map((item) => ({
                    id: item.id,
                    title: item.title,
                    authors: item.authors,
                    publication: item.publication,
                    date: item.date,
                    url: item.url,
                  }))}
                />
              </SectionShell>
            )}

            {show.related && (
              <SectionShell id="related" title={t('sections.related')}>
                <RelatedDiseases diseases={related} />
              </SectionShell>
            )}

            <DiseaseGeneticsLinks
              heading={t('explore.heading')}
              intro={t('explore.intro')}
              items={geneticsLinks}
            />

            <div className="border-t border-border pt-8">
              <DiseaseNavigation
                prev={prev && { slug: prev.slug, name: pick(prev.name) }}
                next={next && { slug: next.slug, name: pick(next.name) }}
                labels={{
                  sectionLabel: t('sections.navigation'),
                  previous: t('nav.previous'),
                  next: t('nav.next'),
                  backToLibrary: t('nav.backToLibrary'),
                  genetics: t('nav.genetics'),
                  resources: t('nav.resources'),
                }}
              />
            </div>
          </div>

          {/* On-this-page navigation (reuses the Module 03 PageNav framework). */}
          {navSections.length > 1 && (
            <aside className="hidden xl:block">
              <div className="sticky top-24">
                <PageNav sections={navSections} title={t('onThisPage')} />
              </div>
            </aside>
          )}
        </div>
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
