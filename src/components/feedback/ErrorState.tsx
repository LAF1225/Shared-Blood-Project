import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Reusable error presentation (spec §16 framework).
 * Always offers a recovery path (retry / navigate away).
 */
export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = 'Try again',
  action,
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
      <div className="flex gap-3">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}
