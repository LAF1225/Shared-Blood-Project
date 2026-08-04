import { ArrowLeft, Ban, FlaskConical, Megaphone, Target } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { AdvocacyPriority, PolicyAdvocacyDataset } from '../types';
import {
  getBriefById,
  getInheritedResearchBoundaries,
  getPriorityEvidenceLinks,
  getPriorityIssues,
  getPriorityLimitations,
  getPriorityRecommendations,
  getPriorityStakeholders,
  getPriorityTrace,
} from '../resolve';
import { PolicyLimitationsList, PolicyReferencesList, StakeholderList } from './shared';

type L = 'en' | 'ur';
type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * An advocacy priority detail page (spec §71). Renders the full structure with the
 * CORE "What This Advocacy Does Not Claim" boundary (spec §72), the evidence with
 * its role and scope, the INHERITED research boundaries (Module 18's "What This
 * Does Not Show", never stripped, spec §99), the recommended actions with their
 * intervention-evidence status (spec §24), relevant stakeholders (potential
 * audiences, not blame, spec §28), required limitations inline (spec §77), and the
 * backward traceability to research findings and briefs (spec §74).
 */
export function AdvocacyPriorityDetail({
  priority,
  dataset,
  locale,
  t,
}: {
  priority: AdvocacyPriority;
  dataset: PolicyAdvocacyDataset;
  locale: string;
  t: Translator;
}) {
  const l: L = locale === 'ur' ? 'ur' : 'en';
  const issues = getPriorityIssues(dataset, priority);
  const recommendations = getPriorityRecommendations(dataset, priority);
  const evidenceLinks = getPriorityEvidenceLinks(dataset, priority);
  const inherited = getInheritedResearchBoundaries(dataset, priority);
  const stakeholders = getPriorityStakeholders(dataset, priority);
  const limitations = getPriorityLimitations(dataset, priority);
  const trace = getPriorityTrace(dataset, priority);
  const referenceIds = Array.from(new Set(issues.flatMap((i) => i.referenceIds)));
  const relatedBriefs = (trace?.briefIds ?? [])
    .map((id) => getBriefById(dataset, id))
    .filter((b): b is NonNullable<typeof b> => b !== null);

  return (
    <article className="space-y-8">
      <a href={ROUTES.policy} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('priority.back')}
      </a>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {t(`priorityTypes.${priority.priorityType}`)}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
            {t(`actionLevels.${priority.actionLevel}`)}
          </span>
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{priority.title[l]}</h1>
      </header>

      <section className="space-y-1.5 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <Megaphone className="h-5 w-5 text-primary" aria-hidden="true" />
          {t('priority.position')}
        </h2>
        <p className="text-sm leading-relaxed text-foreground/90">{priority.summary[l]}</p>
      </section>

      {issues.length > 0 && (
        <Section title={t('priority.issue')}>
          {issues.map((i) => (
            <div key={i.id} className="space-y-1">
              <p className="font-medium text-foreground">{i.title[l]}</p>
              <p>{i.problemStatement[l]}</p>
              <p className="text-xs text-muted-foreground">{t(`scope.${i.geographicScope}`)}</p>
            </div>
          ))}
        </Section>
      )}

      <Section title={t('priority.whyDiscussing')}>
        <p>{priority.rationale[l]}</p>
        <p className="mt-1">{priority.educationalPurpose[l]}</p>
      </Section>

      <Section title={t('priority.evidence')} icon={<FlaskConical className="h-5 w-5 text-primary" aria-hidden="true" />}>
        <ul className="space-y-2">
          {evidenceLinks.map((link) => (
            <li key={link.id} className="rounded-xl border border-border bg-surface p-3 text-sm">
              <span className="font-medium text-foreground">{t(`evidenceSourceTypes.${link.sourceType}`)}</span>
              <span className="text-muted-foreground">
                {' '}· {t(`evidenceRoles.${link.evidenceRole}`)} · {t(`scopeCompatibility.${link.scopeCompatibility}`)}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Evidence boundaries, inherited Module 18 "What This Does Not Show" (spec §99). */}
      {inherited.length > 0 && (
        <section className="space-y-2 rounded-2xl border border-border bg-surface/60 p-5">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('priority.evidenceBoundaries')}</h2>
          <ul className="space-y-1.5">
            {inherited.map((b) => (
              <li key={b.findingId} className="flex items-start gap-2 text-sm text-foreground/85">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                <span>{b.doesNotShow[l]}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recommendations.length > 0 && (
        <Section title={t('priority.recommendations')} icon={<Target className="h-5 w-5 text-primary" aria-hidden="true" />}>
          <ul className="space-y-3">
            {recommendations.map((r) => (
              <li key={r.id} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">{r.title[l]}</p>
                <p className="mt-0.5 text-sm text-foreground/85">{r.actionStatement[l]}</p>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{t(`actionTypes.${r.actionType}`)}</span>
                  <span>· {t(`implementationLevels.${r.implementationLevel}`)}</span>
                  <span>· {t(`resource.${r.resourceConsiderations}`)}</span>
                  <span>· {t(`strength.${r.recommendationStrength}`)}</span>
                  <span>· {t(`intervention.${r.interventionEvidenceStatus}`)}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <StakeholderList stakeholders={stakeholders} locale={locale} t={t} />

      <Section title={t('priority.implementation')}>
        <p>{priority.implementationConsiderations[l]}</p>
      </Section>
      <Section title={t('priority.ethics')}>
        <p>{priority.ethicalConsiderations[l]}</p>
      </Section>

      {/* CORE, What This Advocacy Does Not Claim (spec §72). */}
      <section className="space-y-2 rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <Ban className="h-5 w-5 text-accent-strong" aria-hidden="true" />
          {t('priority.doesNotClaim')}
        </h2>
        <p className="text-sm leading-relaxed text-foreground/90">{priority.doesNotClaim[l]}</p>
      </section>

      <PolicyLimitationsList limitations={limitations} locale={locale} t={t} />

      {trace && trace.researchFindingIds.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('priority.relatedFindings')}</h2>
          <ul className="space-y-1.5">
            {trace.researchFindingIds.map((fid) => (
              <li key={fid}>
                <a href={`${ROUTES.research}?finding=${encodeURIComponent(fid)}`} className="text-sm font-medium text-primary hover:underline">
                  {t('priority.viewResearch')}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedBriefs.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">{t('priority.relatedBriefs')}</h2>
          <ul className="space-y-1.5">
            {relatedBriefs.map((b) => (
              <li key={b.id}>
                <a href={`${ROUTES.policy}?brief=${encodeURIComponent(b.id)}`} className="text-sm font-medium text-primary hover:underline">
                  {b.title[l]}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <PolicyReferencesList referenceIds={referenceIds} t={t} />
    </article>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
        {icon}
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}
