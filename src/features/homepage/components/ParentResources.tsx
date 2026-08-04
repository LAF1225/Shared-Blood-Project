import { useLocale, useTranslations } from 'next-intl';
import {
  BookOpen,
  Stethoscope,
  Baby,
  HandHeart,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';
import { parentResourceCategories } from '../data/homepageData';

const icons: Record<string, LucideIcon> = {
  booklets: BookOpen,
  symptoms: Stethoscope,
  growth: Baby,
  caregiver: HandHeart,
};

/**
 * Parent Resources (spec §Parent Resources): introduce practical resource
 * categories. Each links to the Parent Learning Centre.
 */
export function ParentResources() {
  const t = useTranslations('Home.resources');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <SectionContainer>
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {parentResourceCategories.map((cat) => {
          const Icon = icons[cat.id] ?? BookOpen;
          return (
            <li key={cat.id}>
              <Link
                href={cat.href}
                className="flex h-full items-center gap-3 rounded-2xl border border-border/80 bg-surface p-5 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-dark ring-1 ring-inset ring-accent/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-semibold text-foreground">{cat.label[l]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <Button asChild>
          <Link href={ROUTES.resources}>{t('cta')}</Link>
        </Button>
      </div>
    </SectionContainer>
  );
}
