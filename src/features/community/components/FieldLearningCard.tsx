import { Eye, Lightbulb, Wrench } from 'lucide-react';
import type { FieldLearningRecord } from '../types';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * "What We Learned in the Field" card (spec §44). Renders an approved field
 * learning as What we noticed → Why it mattered → What we changed. Only approved,
 * publicly-displayable learnings reach this component (resolved upstream), and any
 * learning that changed medical content has already passed scientific review
 * (spec §24). Content is documented from real learnings — never marketing copy.
 */
export function FieldLearningCard({
  learning,
  locale,
  t,
}: {
  learning: FieldLearningRecord;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';

  return (
    <article className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {t(`projectAreas.${learning.projectAreaAffected}`)}
        </p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{learning.title[l]}</h3>
      </div>

      <Step icon={<Eye className="h-4 w-4 text-secondary" aria-hidden="true" />} label={t('learnings.noticed')}>
        {learning.whatWeNoticed[l]}
      </Step>
      <Step icon={<Lightbulb className="h-4 w-4 text-primary" aria-hidden="true" />} label={t('learnings.mattered')}>
        {learning.whyItMattered[l]}
      </Step>
      <Step icon={<Wrench className="h-4 w-4 text-accent-strong" aria-hidden="true" />} label={t('learnings.changed')}>
        {learning.whatWeChanged[l]}
      </Step>
    </article>
  );
}

function Step({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
