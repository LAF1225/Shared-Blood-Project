import { useTranslations } from 'next-intl';
import { Calculator, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';

/**
 * Genetics Explorer preview (spec §Genetics Explorer): introduce the two
 * educational tools only. NO calculations happen on the homepage.
 */
export function GeneticsExplorerPreview() {
  const t = useTranslations('Home.genetics');

  const tools = [
    { key: 'tool1', Icon: Calculator },
    { key: 'tool2', Icon: Users },
  ] as const;

  return (
    <SectionContainer>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {tools.map(({ key, Icon }) => (
          <Card key={key} className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary ring-1 ring-inset ring-secondary/15">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                {t(`${key}Title`)}
              </h3>
              <p className="text-sm text-muted-foreground">{t(`${key}Desc`)}</p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href={ROUTES.genetics}>{t('openCalculator')}</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
