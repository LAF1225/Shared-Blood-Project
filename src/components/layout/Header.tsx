'use client';

import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { useNavigation } from '@/providers';
import { Navigation } from './Navigation';
import { MobileNav } from './MobileNav';
import { PageContainer } from './PageContainer';
import { Logo } from '@/components/brand/Logo';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { SearchEntry } from '@/components/search/SearchEntry';

/**
 * Global header (Module 02). Provides the brand lockup, primary navigation,
 * language switch, and a mobile menu — accessible from every page.
 */
export function Header() {
  const t = useTranslations('Common');
  const { isMobileOpen, toggleMobile } = useNavigation();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <PageContainer className="flex min-h-16 items-center justify-between gap-4">
        <Link href={ROUTES.home} aria-label={t('appName')} className="shrink-0">
          <Logo wordmark={t('appName')} priority />
        </Link>

        <div className="flex items-center gap-1">
          <Navigation />
          <SearchEntry />
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={toggleMobile}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? t('closeMenu') : t('openMenu')}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-foreground hover:bg-muted lg:hidden"
          >
            {isMobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </PageContainer>

      <div id="mobile-navigation">
        <MobileNav />
      </div>
    </header>
  );
}
