'use client';

import { createContext, useContext, useMemo, useState } from 'react';

/** Survey state scaffolding (in-progress answers). Logic arrives in Module 14. */
interface SurveyState {
  answers: Record<string, unknown>;
  setAnswer: (questionId: string, value: unknown) => void;
  reset: () => void;
}

const SurveyContext = createContext<SurveyState | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const value = useMemo<SurveyState>(
    () => ({
      answers,
      setAnswer: (id, val) => setAnswers((a) => ({ ...a, [id]: val })),
      reset: () => setAnswers({}),
    }),
    [answers],
  );

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
}

export function useSurvey(): SurveyState {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurvey must be used within a SurveyProvider');
  return ctx;
}
