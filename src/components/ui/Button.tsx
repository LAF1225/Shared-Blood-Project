import { cloneElement, forwardRef, isValidElement } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Render styles onto the single child element (e.g. a Link) instead of a <button>. */
  asChild?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground shadow-soft hover:bg-primary-dark',
  secondary:
    'bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary-dark',
  accent: 'bg-accent-dark text-primary-foreground shadow-soft hover:bg-accent',
  outline:
    'border border-border bg-transparent text-foreground hover:border-primary/40 hover:bg-primary/5',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
};

const sizes: Record<Size, string> = {
  // min-h-11 = 44px touch target
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-base',
  lg: 'min-h-12 px-6 text-lg',
};

/**
 * Foundational button. Brand variants, accessible focus, 44px+ touch targets.
 * (Loading/async states are added by consuming modules as needed.)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', asChild = false, type = 'button', children, ...props },
    ref,
  ) => {
    const classes = cn(
      'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold',
      'transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out-soft',
      'active:scale-[0.98]',
      'disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className,
    );

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
