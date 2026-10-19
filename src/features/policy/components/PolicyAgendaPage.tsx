import { ArrowRight, Check, Info, ShieldCheck } from 'lucide-react';
import type { LocalizedText } from '@/types';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { PageContainer } from '@/components/layout';
import { SectionShell, InfoBlock } from '@/features/diseases/content/components/Section';
import type { PolicyBrief } from '../types';

type Translator = (key: string, values?: Record<string, string | number>) => string;

const LEARN_MORE = [
  { href: ROUTES.disease('beta-thalassemia'), labelKey: 'learnMore.betaThalassemia' },
  { href: ROUTES.geneticTesting, labelKey: 'learnMore.geneticTesting' },
  { href: ROUTES.resource('understanding-inherited-disorders'), labelKey: 'learnMore.inherited' },
] as const;

/**
 * The public policy page: Shared Blood's current policy brief, rendered in a
 * fixed order (summary, figures, current laws and their gaps, the proposal,
 * safeguards). Synchronous by design: the route resolves `t` and passes it in.
 */
export function PolicyAgendaPage({
  brief,
  locale,
  t,
}: {
  brief: PolicyBrief;
  locale: string;
  /** `Policy` namespace translator. */
  t: Translator;
}) {
  const l = locale === 'ur' ? 'ur' : 'en';
  const pick = (text: LocalizedText) => text[l];

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="max-w-4xl space-y-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t('kicker')}</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('subtitle')}</p>
          <p className="text-sm text-muted-foreground">{t('briefLabel', { code: brief.code })}</p>
        </header>

        <SectionShell id="summary" title={t('sections.summary')}>
          <InfoBlock paragraphs={brief.summary.map(pick)} />
        </SectionShell>

        <SectionShell id="figures" title={t('sections.figures')}>
          <div className="space-y-5">
            <p className="leading-relaxed text-foreground/90">{pick(brief.figuresIntro)}</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              {brief.figures.map((figure, index) => (
                // Value is shown first visually; the label stays the <dt> for
                // assistive technology.
                <div key={index} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
                  <dt className="order-2 mt-1 text-sm leading-relaxed text-foreground/85">{pick(figure.label)}</dt>
                  <dd className="order-1 font-heading text-3xl font-semibold text-primary">{pick(figure.value)}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm leading-relaxed text-muted-foreground">{pick(brief.figuresNote)}</p>
          </div>
        </SectionShell>

        <SectionShell id="laws" title={t('sections.laws')}>
          <div className="space-y-6">
            <p className="leading-relaxed text-foreground/90">{pick(brief.lawsIntro)}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {brief.laws.map((law, index) => (
                <li key={index} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{pick(law.region)}</p>
                  {/* Official English titles: isolate their direction, keep the card's alignment. */}
                  <p className="mt-1 font-medium text-foreground">
                    <bdi>{pick(law.name)}</bdi>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pick(law.summary)}</p>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <h3 className="font-heading text-lg font-semibold text-foreground">{t('sections.gaps')}</h3>
              <ul className="grid gap-4 md:grid-cols-3">
                {brief.gaps.map((gap, index) => (
                  <li key={index} className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
                    <p className="font-medium text-foreground">{pick(gap.title)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">{pick(gap.body)}</p>
                  </li>
                ))}
              </ul>
              <p className="leading-relaxed text-foreground/90">{pick(brief.gapsConclusion)}</p>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="proposal" title={t('sections.proposal')}>
          <div className="space-y-5">
            <p className="leading-relaxed text-foreground/90">{pick(brief.proposalIntro)}</p>
            <ol className="space-y-4">
              {brief.measures.map((measure, index) => (
                <li key={index} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{pick(measure.title)}</h3>
                    <p className="mt-1 leading-relaxed text-foreground/85">{pick(measure.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SectionShell>

        <section aria-labelledby="safeguards-heading" id="safeguards" className="scroll-mt-28">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2
              id="safeguards-heading"
              className="flex items-center gap-2 font-heading text-xl font-semibold text-foreground"
            >
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              {t('sections.safeguards')}
            </h2>
            <ul className="mt-3 space-y-2">
              {brief.safeguards.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-foreground/90">{pick(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">{t('disclaimer')}</p>
        </div>

        <nav aria-label={t('sections.learnMore')} className="space-y-3 border-t border-border pt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('sections.learnMore')}</h2>
          <div className="flex flex-wrap gap-2">
            {LEARN_MORE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {t(item.labelKey)}
                <ArrowRight className="h-4 w-4 text-primary rtl:rotate-180" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      </PageContainer>
    </div>
  );
}
