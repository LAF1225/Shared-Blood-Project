import { HelpCircle, Sprout, Wrench } from 'lucide-react';
import type { ResearchProjectLearning, ResearchQuestion } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Current research questions (spec §23/§24). A question does not imply an answer —
 * its status is shown honestly (proposed / active / analysis / answered /
 * inconclusive), and no question is forced into a positive finding.
 */
export function ResearchQuestionsList({
  questions,
  locale,
  t,
}: {
  questions: readonly ResearchQuestion[];
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (questions.length === 0) return null;

  return (
    <section aria-labelledby="questions-heading" className="space-y-3 scroll-mt-24">
      <h2 id="questions-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('questions.title')}
      </h2>
      <ul className="space-y-2">
        {questions.map((q) => (
          <li key={q.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm text-foreground/90">{q.question[l]}</p>
            <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {t(`questionStatus.${q.status}`)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * "How Research Changed Shared Blood" (spec §58/§59/§60). Renders approved project
 * learnings — real, reviewed project decisions, not public-health outcomes. No
 * automatic research-to-product mutation is implied.
 */
export function ProjectLearningsList({
  learnings,
  locale,
  t,
}: {
  learnings: readonly ResearchProjectLearning[];
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  if (learnings.length === 0) return null;

  return (
    <section id="how-research-changed" aria-labelledby="learnings-heading" className="space-y-4 scroll-mt-24">
      <h2 id="learnings-heading" className="flex items-center gap-2 font-heading text-2xl font-semibold text-foreground">
        <Wrench className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('learnings.title')}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {learnings.map((learning) => (
          <article key={learning.id} className="space-y-2 rounded-2xl border border-border bg-surface p-5">
            <h3 className="font-heading font-semibold text-foreground">{learning.title[l]}</h3>
            <p className="text-sm leading-relaxed text-foreground/85">{learning.summary[l]}</p>
            <p className="text-xs text-muted-foreground">
              {t('learnings.change')}: {learning.recommendedChange[l]} ·{' '}
              {t(`implementation.${learning.implementationStatus}`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Empty state (spec §110). Shown when no approved findings exist. Never creates
 * placeholder findings — this is the correct output until real, approved research
 * has been produced from approved Module 16/17 sources.
 */
export function ResearchEmptyState({ t }: { t: Translator }) {
  return (
    <section
      aria-labelledby="research-pending-heading"
      className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center"
    >
      <Sprout className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
      <h2 id="research-pending-heading" className="mt-3 font-heading text-xl font-semibold text-foreground">
        {t('empty.findingsTitle')}
      </h2>
      <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {t('empty.findingsBody')}
      </p>
    </section>
  );
}
