'use client';

import { createContext, useCallback, useContext, useState } from 'react';

/**
 * Page-level playback coordinator (Module 12 §45). Ensures only one story plays
 * at a time: starting story B pauses story A. It is intentionally lightweight —
 * no global/persistent player and no cross-page state (spec §44/§46/§62).
 */
interface PlaybackContextValue {
  activeId: string | null;
  /** A player calls this when it starts; others observe and pause themselves. */
  requestPlay: (id: string) => void;
  /** A player calls this when it stops, clearing itself if it was active. */
  notifyStopped: (id: string) => void;
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null);

export function PlaybackCoordinatorProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const requestPlay = useCallback((id: string) => setActiveId(id), []);
  const notifyStopped = useCallback(
    (id: string) => setActiveId((current) => (current === id ? null : current)),
    [],
  );

  return (
    <PlaybackContext.Provider value={{ activeId, requestPlay, notifyStopped }}>
      {children}
    </PlaybackContext.Provider>
  );
}

/** Returns the coordinator, or a no-op fallback when used outside a provider. */
export function usePlaybackCoordinator(): PlaybackContextValue {
  return (
    useContext(PlaybackContext) ?? {
      activeId: null,
      requestPlay: () => {},
      notifyStopped: () => {},
    }
  );
}
