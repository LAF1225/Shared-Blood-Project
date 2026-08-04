import type { Config } from 'tailwindcss';

/**
 * Shared Blood — design tokens (Module 01: Foundation).
 *
 * Colors are exposed as space-separated RGB channels in CSS variables
 * (see src/app/globals.css) so Tailwind can apply opacity modifiers,
 * and so future theme/dark-mode infrastructure can swap values at runtime.
 * Palette is derived from the official Shared Blood logo.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)', // Deep Teal
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)', // Soft Emerald
          dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
          foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)', // Warm Coral
          dark: 'rgb(var(--color-accent-dark) / <alpha-value>)',
          strong: 'rgb(var(--color-accent-strong) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
        },
        // Surfaces
        background: 'rgb(var(--color-background) / <alpha-value>)', // Soft Ivory
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)', // Dark Slate
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        // Semantic status
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
      },
      fontFamily: {
        // Editorial serif for headings/display; humanist sans for body & UI.
        heading: ['var(--font-newsreader)', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        urdu: ['var(--font-noto-urdu)', 'var(--font-source-sans)', 'serif'],
      },
      fontSize: {
        // Editorial display size: fluid, tight leading + tracking.
        display: ['clamp(2.5rem, 5vw + 1rem, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        kicker: '0.14em',
      },
      borderRadius: {
        // Refined, editorial radii — crisper than a typical rounded template.
        lg: '0.625rem', // 10px
        xl: '0.875rem', // 14px
        '2xl': '1rem', // 16px
        '3xl': '1.25rem', // 20px
      },
      boxShadow: {
        // Soft, teal-tinted elevation (avoids generic grey drop shadows).
        card: '0 1px 2px rgb(24 84 96 / 0.04), 0 6px 20px rgb(24 84 96 / 0.06)',
        'card-hover': '0 2px 6px rgb(24 84 96 / 0.07), 0 16px 34px rgb(24 84 96 / 0.11)',
        soft: '0 1px 2px rgb(38 50 56 / 0.06)',
      },
      maxWidth: {
        content: '72rem', // consistent desktop container width
        prose: '38rem', // editorial reading measure (~65ch)
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        // Subtle entrance (fade + rise). Module 23: replaces framer-motion.
        reveal: {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
