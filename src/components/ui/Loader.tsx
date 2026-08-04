import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Accessible spinner with a screen-reader label. */
export function Loader({
  label = 'Loading',
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" className={cn('inline-flex items-center gap-2', className)}>
      <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
