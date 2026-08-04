import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Alert } from '@/components/ui/Alert';
import { SectionHeading } from './SectionHeading';

/**
 * Project introduction (spec §Project Introduction): concise explanation,
 * objectives, and the educational disclaimer. No medical advice.
 */
export function ProjectIntroduction() {
  const t = useTranslations('Home.intro');
  const objectives = t.raw('objectives') as string[];

  return (
    <SectionContainer>
      <SectionHeading kicker={t('kicker')} title={t('title')} />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <p className="text-lg leading-relaxed text-foreground/90 ltr:first-letter:float-left ltr:first-letter:mr-3 ltr:first-letter:mt-1 ltr:first-letter:font-heading ltr:first-letter:text-6xl ltr:first-letter:font-semibold ltr:first-letter:leading-[0.8] ltr:first-letter:text-primary">
          {t('paragraph')}
        </p>
        <div>
          <h3 className="mb-4 font-heading text-xl font-semibold tracking-tight text-foreground">
            {t('objectivesTitle')}
          </h3>
          <ul className="space-y-2">
            {objectives.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <Alert tone="info">{t('disclaimer')}</Alert>
      </div>
    </SectionContainer>
  );
}
