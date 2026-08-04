import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Vitest configuration. Mirrors the `@/*` path alias from tsconfig so the pure
 * engine + metadata modules can be tested in isolation (Module 09 v2 §38).
 * Tests run in the default node environment — no DOM, no React.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
