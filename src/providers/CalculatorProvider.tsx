'use client';

import { createContext, useContext, useMemo, useState } from 'react';

/**
 * Calculator state scaffolding. Holds transient UI state only.
 * NO probability logic — that belongs to Modules 11 & 12.
 */
interface CalculatorState {
  draft: Record<string, unknown>;
  setField: (key: string, value: unknown) => void;
  reset: () => void;
}

const CalculatorContext = createContext<CalculatorState | null>(null);

export function CalculatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<Record<string, unknown>>({});

  const value = useMemo<CalculatorState>(
    () => ({
      draft,
      setField: (key, val) => setDraft((d) => ({ ...d, [key]: val })),
      reset: () => setDraft({}),
    }),
    [draft],
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator(): CalculatorState {
  const ctx = useContext(CalculatorContext);
  if (!ctx)
    throw new Error('useCalculator must be used within a CalculatorProvider');
  return ctx;
}
