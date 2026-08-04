import { ShieldCheck } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import { ROUTES } from '@/constants/routes';
import { GOVERNANCE_PRINCIPLES, APPROVED_NOTICE } from '../data/config';
import type { GovernancePageContent } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Renders an approved public governance page — Privacy, Research Ethics, or
 * Research Governance (spec §32). Synchronous server component: the route resolves
 * the translator `t` and passes it in. Content is understandable without hover,
 * colour meaning, audio, or animation (spec §35). The standing approved notice
 * (spec §106) renders where enabled.
 */
export function GovernancePage({
  page,
  locale,
  t,
}: {
  page: GovernancePageContent;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-3xl space-y-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{page.kicker[l]}</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {page.title[l]}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{page.subtitle[l]}</p>
          <p className="max-w-prose leading-relaxed text-foreground/90">{page.intro[l]}</p>
        </header>

        {page.showNotice && (
          <aside className="flex gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-foreground/80">{APPROVED_NOTICE[l]}</p>
          </aside>
        )}

        <div className="space-y-8">
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="space-y-2 scroll-mt-24">
              <h2 id={`${section.id}-heading`} className="font-heading text-xl font-semibold text-foreground">
                {section.heading[l]}
              </h2>
              {section.body.map((para, index) => (
                <p key={index} className="max-w-prose text-sm leading-relaxed text-foreground/90">
                  {para[l]}
                </p>
              ))}
            </section>
          ))}
        </div>

        {page.showPrinciples && (
          <section aria-labelledby="principles-heading" className="space-y-4">
            <h2 id="principles-heading" className="font-heading text-2xl font-semibold text-foreground">
              {t('principlesTitle')}
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {GOVERNANCE_PRINCIPLES.map((p) => (
                <div key={p.id} className="rounded-2xl border border-border bg-surface p-5">
                  <dt className="font-heading font-semibold text-foreground">{p.title[l]}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/85">{p.description[l]}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Cross-links between the governance pages (spec §32). */}
        <nav aria-label={t('relatedTitle')} className="flex flex-wrap gap-3 border-t border-border pt-6 text-sm">
          <span className="font-medium text-muted-foreground">{t('relatedTitle')}:</span>
          <a href={ROUTES.privacy} className="text-primary hover:underline">{t('links.privacy')}</a>
          <a href={ROUTES.researchEthics} className="text-primary hover:underline">{t('links.ethics')}</a>
          <a href={ROUTES.researchGovernance} className="text-primary hover:underline">{t('links.governance')}</a>
        </nav>
      </PageContainer>
    </div>
  );
}
