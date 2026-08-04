'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { isCurrentPage, resolveActiveHref } from '@/lib/nav';
import { cn } from '@/lib/utils';

/** A navigation destination with its label already resolved for the locale. */
export interface ResolvedNavItem {
  id: string;
  href: string;
  label: string;
}

/**
 * Desktop dropdown for a primary navigation group (Module 25.6 §5/§6).
 *
 * Interaction contract:
 *  - hover is an *enhancement*, never the only way in (§5). Click and keyboard
 *    activation both work, so pointer-only behaviour is not required.
 *  - a short close delay plus a contiguous hover area (the panel wrapper carries
 *    the offset as padding, not margin) means moving the pointer from the
 *    trigger into the menu never closes it prematurely (§5).
 *  - Escape closes and restores focus to the trigger; an outside pointer press
 *    closes; selecting a destination navigates normally and closes the menu.
 *
 * Semantics: a real <button> triggers the menu (it is not itself a destination)
 * and real <Link>s are the destinations, so Tab order is natural and every child
 * route is keyboard reachable. This is the disclosure-navigation pattern rather
 * than role="menu", which would impose arrow-key-only semantics on what are
 * ordinary page links.
 *
 * Implemented with local state only: no menu library, no global state (§24).
 */
const CLOSE_DELAY_MS = 150;

export function NavDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: readonly ResolvedNavItem[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname();
  const activeHref = resolveActiveHref(
    pathname,
    items.map((item) => item.href),
  );

  // Never leave a menu open across a navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Clear any pending close on unmount.
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors',
          active
            ? 'bg-primary/10 font-semibold text-primary'
            : 'text-foreground/80 hover:bg-muted hover:text-foreground',
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {/* Offset lives on the wrapper as padding so the hover area stays
          contiguous with the trigger (no dead gap that would close the menu). */}
      <div
        id={menuId}
        hidden={!open}
        className="absolute start-0 top-full z-50 pt-2"
      >
        <ul className="min-w-56 rounded-xl border border-border bg-surface p-1.5 shadow-card">
          {items.map((item) => {
            // Exactly one child is highlighted (the most specific match), and
            // aria-current="page" marks only the page actually being viewed.
            const itemActive = item.href === activeHref;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrentPage(pathname, item.href) ? 'page' : undefined}
                  className={cn(
                    'flex min-h-11 items-center whitespace-nowrap rounded-lg px-3 text-sm transition-colors',
                    itemActive
                      ? 'bg-primary/10 font-semibold text-primary'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
