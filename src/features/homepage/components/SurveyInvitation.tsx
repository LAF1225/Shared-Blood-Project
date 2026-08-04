import { useTranslations } from 'next-intl';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { PageContainer } from '@/components/layout/PageContainer';

/**
 * Survey Invitation (spec §Survey Invitation): encourage participation and
 * link to the Survey Portal. The survey itself is NOT embedded here.
 */
export function SurveyInvitation() {
  const t = useTranslations('Home.survey');

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <PageContainer>
        <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-card sm:p-14">
          {/* Decorative dotted wash. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgb(232 131 107 / 0.5) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15">
            <ClipboardList className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="relative flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-kicker text-primary-foreground/90">
              {t('kicker')}
            </span>
          </div>
          <h2 className="relative max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="relative max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            {t('explanation')}
          </p>
          <p className="relative max-w-2xl text-primary-foreground/80">
            {t('importance')}
          </p>
          <Link
            href={ROUTES.survey}
            className="relative mt-2 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-lg bg-background px-6 font-semibold text-primary shadow-soft transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {t('cta')}
            <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
