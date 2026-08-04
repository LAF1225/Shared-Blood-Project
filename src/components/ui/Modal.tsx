'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

/**
 * Foundation modal. Establishes an accessible dialog shell (role="dialog",
 * aria-modal, scrim, dismiss). Focus-trapping/animation refinements are
 * layered in by later modules.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-lg',
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && (
            <h2 className="font-heading text-xl font-semibold">{title}</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close"
            onClick={onClose}
            className="ml-auto px-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
