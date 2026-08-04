'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

/** Foundation accordion (accessible disclosure pattern). */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left font-medium"
            >
              {item.title}
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
