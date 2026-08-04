import { cn } from '@/lib/utils';

/** Loading placeholder block (respects reduced-motion via globals.css). */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-xl bg-muted', className)}
      {...props}
    />
  );
}
