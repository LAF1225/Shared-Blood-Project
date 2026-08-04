'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

/** Foundation tabs with ARIA roles. Styling refined by consuming modules. */
export function Tabs({
  items,
  className,
}: {
  items: TabItem[];
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id);
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-2 border-b border-border">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={active === item.id}
            onClick={() => setActive(item.id)}
            className={cn(
              'min-h-11 cursor-pointer px-4 text-sm font-medium transition-colors',
              active === item.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4">
        {items.find((i) => i.id === active)?.content}
      </div>
    </div>
  );
}
