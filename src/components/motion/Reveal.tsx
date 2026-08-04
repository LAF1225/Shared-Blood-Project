import { cn } from '@/lib/utils';

/**
 * Subtle entrance wrapper (fade + rise).
 *
 * Module 23 (§45/§47): a pure-CSS entrance animation — no animation library and
 * no client JavaScript, so this is a Server Component. Content is visible by
 * default; the animation only plays for users who allow motion (`motion-safe`),
 * and reduced-motion users see the content immediately with no transform. The
 * animation cannot leave content hidden (it ends, and fills, at opacity 1).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn('motion-safe:animate-reveal', className)}
    >
      {children}
    </div>
  );
}
