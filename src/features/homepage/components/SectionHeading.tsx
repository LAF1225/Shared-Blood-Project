import { cn } from '@/lib/utils';

/**
 * Editorial section heading: an optional kicker/eyebrow label with an accent
 * rule, a serif title, and an optional subtitle. Establishes a consistent,
 * intentional rhythm across the homepage.
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {kicker && (
        <div
          className={cn(
            'mb-3 flex items-center gap-2.5',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-kicker text-accent-strong">
            {kicker}
          </span>
        </div>
      )}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
