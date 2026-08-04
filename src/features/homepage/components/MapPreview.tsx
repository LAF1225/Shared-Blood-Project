import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EvidenceMapPreview } from '@/features/genetics/pakistan-map';
import { SectionHeading } from './SectionHeading';

/**
 * Pakistan Genetic Disorder Evidence Map preview (Module 11, spec §4/§17).
 *
 * A lightweight, server-rendered preview: the Pakistan outline with a few
 * glowing points drawn from the SAME shared evidence dataset (spec §3), plus a
 * button to open the full map. It deliberately does NOT load the full map
 * library, marker metadata, or interactions (spec §4/§46). The points are framed
 * as *documented evidence*, never "epicenters" (spec §17).
 */
export function MapPreview() {
  const t = useTranslations('Home.map');

  return (
    <SectionContainer className="bg-surface">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <SectionHeading kicker={t('kicker')} title={t('title')} />
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
          <Button asChild>
            <Link href={ROUTES.map}>
              {t('exploreMap')}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Lightweight static preview from the shared dataset (spec §4/§46). */}
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-primary/5 p-4 shadow-card">
          <EvidenceMapPreview />
          <span className="absolute bottom-3 end-3">
            <Badge tone="primary">{t('previewBadge')}</Badge>
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
