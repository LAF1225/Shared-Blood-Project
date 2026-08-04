import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CATEGORY_LABEL_KEY } from '../data/categories';
import type { LearningResource } from '../types';

/**
 * Educational resource card. Summarises a resource and links to its page. Shows
 * the category, and a hint when a download is available (files land in
 * Module 15). No full content is shown here, only the summary. The category is
 * carried by its text badge, so no decorative icon container is used
 * (Module 25.5 §7).
 */
export function ResourceCard({ resource }: { resource: LearningResource }) {
  const t = useTranslations('Learning');
  const locale = useLocale();
  const l = locale === 'ur' ? 'ur' : 'en';

  return (
    <Card className="flex h-full flex-col transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone="neutral">{t(`categories.${CATEGORY_LABEL_KEY[resource.category]}`)}</Badge>
        {resource.download && (
          <Badge tone="primary" className="gap-1">
            <Download className="h-3 w-3" aria-hidden="true" />
            {t(`formats.${resource.download.format}`)}
          </Badge>
        )}
      </div>

      <div className="mt-3 flex-1 space-y-2">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          {resource.title[l]}
        </h3>
        <p className="text-sm text-muted-foreground">{resource.summary[l]}</p>
      </div>

      <div className="mt-5">
        <Button asChild variant="ghost" size="sm" className="justify-start px-0">
          <Link href={ROUTES.resource(resource.slug)}>
            {t('readResource')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
