'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface NavigationState {
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

const NavigationContext = createContext<NavigationState | null>(null);

/** Navigation UI state (e.g. mobile menu). Architecture only in Module 01. */
export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setMobileOpen] = useState(false);

  const value = useMemo<NavigationState>(
    () => ({
      isMobileOpen,
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
      toggleMobile: () => setMobileOpen((v) => !v),
    }),
    [isMobileOpen],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationState {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useNavigation must be used within a NavigationProvider');
  return ctx;
}
