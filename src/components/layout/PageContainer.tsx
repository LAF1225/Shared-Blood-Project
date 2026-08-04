import { cn } from '@/lib/utils';

/** Consistent max-width horizontal container with responsive gutters. */
export function PageContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
