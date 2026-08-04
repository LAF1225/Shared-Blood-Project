import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/feedback';

/** Localized 404 (spec §16). Provides a clear route home (no dead ends). */
export default function NotFound() {
  const t = useTranslations('Errors');
  return (
    <ErrorState
      title={t('notFoundTitle')}
      description={t('notFoundBody')}
      action={
        <Button asChild variant="outline">
          <Link href={ROUTES.home}>{t('backHome')}</Link>
        </Button>
      }
    />
  );
}
