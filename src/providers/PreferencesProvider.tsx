'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface Preferences {
  reducedMotion: boolean;
  largeText: boolean;
}

interface PreferencesState extends Preferences {
  update: (patch: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  reducedMotion: false,
  largeText: false,
};

const PreferencesContext = createContext<PreferencesState | null>(null);

/** User preferences scaffolding (accessibility toggles, etc.). */
export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);

  const value = useMemo<PreferencesState>(
    () => ({
      ...prefs,
      update: (patch) => setPrefs((p) => ({ ...p, ...patch })),
    }),
    [prefs],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesState {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error('usePreferences must be used within a PreferencesProvider');
  return ctx;
}
