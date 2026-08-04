'use client';

import { useEffect, useState } from 'react';

/** Returns true after the component has mounted (hydration-safe rendering). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
