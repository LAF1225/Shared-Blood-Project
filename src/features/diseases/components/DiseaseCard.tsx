import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CATEGORY_LABEL_KEY } from '../data/categories';
import { getRelatedDiseases } from '../data/diseases';
import type { Disease } from '@/types';

/**
 * Disease card (spec §7): name, category, short description, primary body
 * system, and a Learn More action. The whole card links to the disease page.
 * No medical detail beyond the summary is shown. A compact "Related" row
 * surfaces the related-disorders framework (spec §12).
 */
export function DiseaseCard({
  disease,
  featured = false,
}: {
  disease: Disease;
  featured?: boolean;
}) {
  const t = useTranslations('DiseaseLibrary');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';
  const related = getRelatedDiseases(disease.slug);

  return (
    <Card
      className={cardClasses(featured)}
      data-featured={featured ? 'true' : undefined}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {featured && (
          <Badge tone="primary" className="gap-1">
            <Star className="h-3 w-3" aria-hidden="true" />
            {t('featuredBadge')}
          </Badge>
        )}
        {disease.categories.slice(0, 2).map((category) => (
          <Badge key={category} tone="neutral">
            {t(`categories.${CATEGORY_LABEL_KEY[category]}`)}
          </Badge>
        ))}
      </div>

      <div className="mt-3 flex-1 space-y-2">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {disease.name[l]}
        </h3>
        <p className="text-sm text-muted-foreground">{disease.summary[l]}</p>
      </div>

      <dl className="mt-4 border-t border-border/70 pt-3 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-foreground/80">
            {t('bodySystemLabel')}:
          </dt>
          <dd className="text-muted-foreground">{disease.bodySystem[l]}</dd>
        </div>
      </dl>

      {related.length > 0 && (
        <p className="mt-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">
            {t('relatedLabel')}:
          </span>
          {related.map((item, index) => (
            <span key={item.slug}>
              <Link
                href={ROUTES.disease(item.slug)}
                className="rounded text-primary hover:underline"
              >
                {item.name[l]}
              </Link>
              {index < related.length - 1 && (
                <span aria-hidden="true" className="text-muted-foreground/50">
                  {' '}
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      )}

      <div className="mt-5">
        <Button asChild variant="ghost" size="sm" className="justify-start px-0">
          <Link href={ROUTES.disease(disease.slug)}>
            {t('learnMore')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function cardClasses(featured: boolean): string {
  const base =
    'flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover';
  return featured ? `${base} ring-1 ring-primary/20` : base;
}
