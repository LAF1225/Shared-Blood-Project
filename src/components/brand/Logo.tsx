import Image from 'next/image';
import { cn } from '@/lib/utils';
import logoAsset from '../../../public/logo.png';

/**
 * Shared Blood logo mark — the official brand asset (blood drop, DNA helix,
 * parent + child, heart, circuit). Sourced from the provided logo with its
 * background made transparent; not recolored or distorted. Swap `logoAsset`
 * with an official SVG here if/when one is provided.
 */
export function LogoMark({
  className,
  title = 'Shared Blood',
  priority = false,
}: {
  className?: string;
  title?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoAsset}
      alt={title}
      priority={priority}
      className={cn('h-9 w-auto', className)}
      style={{ width: 'auto' }}
    />
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({
  className,
  showWordmark = true,
  wordmark = 'Shared Blood',
  priority = false,
}: {
  className?: string;
  showWordmark?: boolean;
  wordmark?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark title={wordmark} priority={priority} />
      {showWordmark && (
        <span className="font-heading text-lg font-bold tracking-tight text-primary">
          {wordmark}
        </span>
      )}
    </span>
  );
}
