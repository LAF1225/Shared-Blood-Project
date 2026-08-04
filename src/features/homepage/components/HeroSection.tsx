import { useTranslations } from 'next-intl';
import { ArrowRight, Dna } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { PageContainer } from '@/components/layout/PageContainer';
import { LogoMark } from '@/components/brand/Logo';

/**
 * Hero (spec §Hero): orientation only — what Shared Blood is, why it exists,
 * and what visitors can do. Establishes purpose, trust, and clarity.
 */
export function HeroSection() {
  const t = useTranslations('Home.hero');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.06] via-background to-background">
      {/* Faint editorial backdrop wash. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <PageContainer className="flex flex-col items-center gap-7 py-20 text-center sm:py-28">
        <LogoMark className="h-16 w-auto" priority />

        <div className="flex items-center gap-2.5">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
            {t('kicker')}
          </span>
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
        </div>

        <h1 className="max-w-4xl text-balance font-heading text-display font-semibold text-foreground">
          {t('heading')}
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t('mission')}
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={ROUTES.diseases}>
              {t('primaryCta')}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={ROUTES.genetics}>
              <Dna className="h-5 w-5" aria-hidden="true" />
              {t('secondaryCta')}
            </Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
