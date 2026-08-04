import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { CATEGORY_LABEL_KEY } from '../data/categories';
import { getRelatedDiseases } from '../data/diseases';
import type { Disease } from '@/types';

/**
 * Editorial condition-directory row (Module 25.5 §6). Replaces the product-card
 * grid on the Disease Library. The disease name is the primary visual anchor and
 * the row's link; category, body system, and related conditions read as quiet
 * metadata in a second column. No decorative icon container: typography carries
 * the hierarchy, so the page reads as a curated reference rather than a feature
 * grid.
 *
 * The disease name is a large, generously padded link (a comfortable tap
 * target); the related-condition links remain separate, independently focusable
 * links in the metadata column, so keyboard and pointer order stay predictable.
 */
export function DiseaseDirectoryItem({
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
    <article
      className="group relative grid grid-cols-1 gap-x-10 gap-y-3 py-7 md:grid-cols-[minmax(0,1fr)_15rem]"
      data-featured={featured ? 'true' : undefined}
    >
      <div className="min-w-0">
        {featured && (
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-kicker text-accent-strong">
            {t('featuredBadge')}
          </span>
        )}
        <h3 className="font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.7rem]">
          <Link
            href={ROUTES.disease(disease.slug)}
            className="inline-flex items-baseline gap-2 rounded-sm py-2 transition-colors duration-200 ease-out-soft hover:text-primary"
          >
            <span>{disease.name[l]}</span>
            <ArrowRight
              className="h-5 w-5 shrink-0 translate-y-1 text-primary/50 transition-transform duration-200 ease-out-soft group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </h3>
        <p className="mt-2 max-w-prose text-muted-foreground">
          {disease.summary[l]}
        </p>
      </div>

      <div className="space-y-2 text-sm md:border-s md:border-border/60 md:ps-6 md:pt-1">
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {disease.categories.slice(0, 2).map((category) => (
            <span key={category}>{t(`categories.${CATEGORY_LABEL_KEY[category]}`)}</span>
          ))}
        </p>
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground/70">
            {t('bodySystemLabel')}:
          </span>{' '}
          {disease.bodySystem[l]}
        </p>
        {related.length > 0 && (
          <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-muted-foreground">
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
      </div>
    </article>
  );
}
