'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FOOTER_NAV, FOOTER_FUTURE_LINKS, FOOTER_GOVERNANCE_LINKS } from '@/constants/navigation';
import { PageContainer } from './PageContainer';
import { Logo } from '@/components/brand/Logo';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

/**
 * Global footer (Module 03 — Navigation System). Secondary navigation
 * (spec §7), contact, reserved legal links, the standing educational
 * disclaimer, copyright, and a language selector. Identical on every page.
 */
export function Footer() {
  const t = useTranslations();
  const nav = useTranslations('Nav');
  const footer = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <PageContainer className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Logo wordmark={t('Common.appName')} />
            <p className="max-w-xs text-sm text-muted-foreground">
              {t('Common.tagline')}
            </p>
          </div>

          <nav aria-label={nav('footerLabel')}>
            <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer('quickLinks')}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {FOOTER_NAV.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {nav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mb-3 mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer('legal')}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {/* Governance pages (Module 20), real, interactive links. */}
              {FOOTER_GOVERNANCE_LINKS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {footer(item.labelKey)}
                  </Link>
                </li>
              ))}
              {FOOTER_FUTURE_LINKS.map((item) => (
                <li key={item.id}>
                  {/* Reserved for a future module, non-interactive until its page exists. */}
                  <span
                    className="cursor-not-allowed text-muted-foreground/60"
                    title={footer('comingSoon')}
                    aria-disabled="true"
                  >
                    {footer(item.labelKey)}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer('contact')}
            </h2>
            <a
              href={`mailto:${footer('contactEmail')}`}
              className="text-sm text-primary hover:underline"
            >
              {footer('contactEmail')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="mt-10 space-y-4 border-t border-border pt-6">
          <p className="max-w-3xl text-xs text-muted-foreground">
            {t('Footer.disclaimer')}
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} {t('Common.appName')}. {t('Footer.rights')}
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
