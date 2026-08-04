import { useTranslations } from 'next-intl';
import {
  GraduationCap,
  HeartHandshake,
  FlaskConical,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from './SectionHeading';

/**
 * Community Impact (spec §Community Impact): the three pillars of Shared Blood.
 * Each pillar links to the relevant section of the platform.
 */
export function CommunityImpact() {
  const t = useTranslations('Home.community');

  const pillars: {
    key: 'education' | 'community' | 'research';
    Icon: LucideIcon;
    href: string;
  }[] = [
    { key: 'education', Icon: GraduationCap, href: ROUTES.resources },
    // Repointed from the (now coming-soon) Hospitals placeholder to the real
    // Community page (Module 24 §24 STALE → REPOINT).
    { key: 'community', Icon: HeartHandshake, href: ROUTES.community },
    { key: 'research', Icon: FlaskConical, href: ROUTES.survey },
  ];

  return (
    <SectionContainer className="bg-surface">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {pillars.map(({ key, Icon, href }) => {
          const items = t.raw(`${key}.items`) as string[];
          return (
            <Card key={key} className="flex h-full flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                {t(`${key}.title`)}
              </h3>
              <ul className="flex-1 space-y-1.5 text-sm text-muted-foreground">
                {items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t('learnMore')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
