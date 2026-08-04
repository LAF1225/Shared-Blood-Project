'use client';

import { useTranslations } from 'next-intl';
import { ErrorState } from '@/components/feedback';

/** Localized route error boundary (spec §16: 500 / unknown errors). */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Errors');
  return (
    <ErrorState
      title={t('genericTitle')}
      description={t('genericBody')}
      onRetry={reset}
      retryLabel={t('retry')}
    />
  );
}
