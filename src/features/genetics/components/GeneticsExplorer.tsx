'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PageContainer } from '@/components/layout';
import { EducationalCallout } from '@/features/diseases/content/components/Section';
import { getGeneticsTools } from '../data/tools';
import { ConceptGrid } from './ConceptGrid';
import { ToolCard } from './ToolCard';
import { LearningPathNav } from './LearningPathNav';
import { PlatformLinks } from './PlatformLinks';

/**
 * Genetics Explorer homepage (Module 08, spec §4). The entry point to every
 * genetics tool. Composes the shared educational components (spec §11) in a
 * clear order: introduction → genetics basics → tools → suggested learning path
 * → links back into the wider platform.
 *
 * A framework only: it organises and links tools but implements no calculation
 * logic (spec §18). New tools appear automatically from the data registry.
 */
export function GeneticsExplorer() {
  const t = useTranslations('Genetics');
  const tools = useMemo(() => getGeneticsTools(), []);

  return (
    <div className="py-12 sm:py-16">
      <PageContainer className="space-y-14 sm:space-y-16">
        {/* 1. Introduction */}
        <header className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
              {t('kicker')}
            </span>
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </header>

        {/* Educational-tools disclaimer (spec §9) */}
        <EducationalCallout title={t('callout.title')}>
          {t('callout.body')}
        </EducationalCallout>

        {/* 2. Educational introduction, genetics basics (spec §5) */}
        <section id="intro" aria-labelledby="genetics-intro-heading" className="scroll-mt-28">
          <div className="mb-6 max-w-2xl">
            <h2
              id="genetics-intro-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('intro.heading')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('intro.subtitle')}</p>
          </div>
          <ConceptGrid />
        </section>

        {/* 3. Available tools (spec §6) */}
        <section id="tools" aria-labelledby="genetics-tools-heading" className="scroll-mt-28">
          <div className="mb-6 max-w-2xl">
            <h2
              id="genetics-tools-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('tools.heading')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('tools.subtitle')}</p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.id}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Suggested learning path (spec §7) */}
        <section aria-labelledby="genetics-pathway-heading">
          <div className="mb-6 max-w-2xl">
            <h2
              id="genetics-pathway-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('pathway.heading')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('pathway.subtitle')}</p>
          </div>
          <LearningPathNav />
        </section>

        {/* 5. Continue across the platform (spec §10) */}
        <section aria-labelledby="genetics-platform-heading">
          <div className="mb-6 max-w-2xl">
            <h2
              id="genetics-platform-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              {t('platform.heading')}
            </h2>
            <p className="mt-2 text-muted-foreground">{t('platform.subtitle')}</p>
          </div>
          <PlatformLinks />
        </section>
      </PageContainer>
    </div>
  );
}
