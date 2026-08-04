import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Foundation pagination control (accessible nav landmark). */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-2', className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-border disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="px-2 text-sm text-muted-foreground">
        {page} / {pageCount}
      </span>
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-border disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
