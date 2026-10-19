import { ExternalLink } from 'lucide-react';
import type { SurveyFormInfo } from '../data/form';

type Translator = (key: string, values?: Record<string, string | number>) => string;

/**
 * Invitation to the live survey: what it is, the facts a participant should
 * know before starting, the topics it covers, and a link that opens the
 * Google Form in a new tab. The form is never embedded.
 */
export function TakeTheSurvey({
  form,
  locale,
  t,
}: {
  form: SurveyFormInfo;
  locale: string;
  /** `Survey` namespace translator. */
  t: Translator;
}) {
  const l = locale === 'ur' ? 'ur' : 'en';
  const facts = [
    t('take.facts.questions', { count: form.questionCount }),
    t('take.facts.anonymous'),
    form.languages.length === 1 && form.languages[0] === 'en' ? t('take.facts.englishOnly') : t('take.facts.bilingual'),
    t('take.facts.googleForms'),
  ];

  return (
    <section aria-labelledby="take-heading" id="take-part" className="space-y-5 scroll-mt-24">
      <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 id="take-heading" className="font-heading text-2xl font-semibold text-foreground">
          {t('take.title')}
        </h2>
        <p className="max-w-prose leading-relaxed text-foreground/90">{t('take.body')}</p>
        <ul className="flex flex-wrap gap-2" aria-label={t('take.factsLabel')}>
          {facts.map((fact) => (
            <li key={fact} className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground/90">
              {fact}
            </li>
          ))}
        </ul>
        <a
          href={form.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
        >
          {t('take.cta')}
          <span className="sr-only">{t('take.opensInNewTab')}</span>
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>

      <div className="space-y-3">
        <h3 className="font-heading text-lg font-semibold text-foreground">{t('take.topicsTitle')}</h3>
        <ul className="grid gap-4 sm:grid-cols-2">
          {form.topics.map((topic) => (
            <li key={topic.title.en} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-medium text-foreground">{topic.title[l]}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{topic.detail[l]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
