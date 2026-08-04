'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Foundation dropdown/select shell. Establishes the pattern and ARIA;
 * keyboard-complete listbox behavior is finalized by later modules.
 */
export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  className,
}: {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 text-left"
      >
        <span className={cn(!selected && 'text-muted-foreground')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-md"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-2 text-left hover:bg-muted"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
