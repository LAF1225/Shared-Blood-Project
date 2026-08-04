import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Foundational text input (44px height, accessible focus ring). */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'min-h-11 w-full rounded-xl border border-border bg-surface px-4 py-2',
        'text-foreground placeholder:text-muted-foreground',
        'transition-colors duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
