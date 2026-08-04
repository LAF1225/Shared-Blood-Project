import { cn } from '@/lib/utils';

/**
 * Foundation tooltip. CSS-only hover/focus reveal; accessible label is
 * associated via the trigger's aria-describedby in consuming modules.
 */
export function Tooltip({
  content,
  children,
  className,
}: {
  content: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
