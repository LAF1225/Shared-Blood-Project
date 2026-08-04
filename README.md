# Shared Blood

> Understanding Genetics. Supporting Families. Building Healthier Futures.

Bilingual (English / Urdu) educational platform improving awareness of inherited
genetic disorders in Pakistan. **Educational only** — not a diagnostic or
medical decision-making tool.

## Status

**Module 01 — Foundation.** This is the technical/architectural foundation only.
No feature pages, business logic, calculators, maps, or backend exist yet — those
arrive in later modules per their specifications.

## Tech Stack

- **Next.js** (App Router) · **React** · **TypeScript**
- **Tailwind CSS** (design tokens) · **Framer Motion** (future animation)
- **next-intl** (English / Urdu, locale-aware routing, RTL)
- **Recharts** (future charts) · SVG-based interactive maps (future)
- **Supabase** backend + **Vercel** deployment (future — Module 20/21)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Architecture

```
src/
  app/[locale]/      Localized routing, root layout, error/loading/404
  components/        Shared UI (ui/), layout/, feedback/
  features/          Feature-based modules (populated by later specs)
  providers/         App-wide state (theme, nav, preferences, calculator, survey)
  services/          Feature-organized API layer (placeholder data)
  hooks/  lib/  utils/  types/  constants/  i18n/
messages/            en.json · ur.json (UI chrome only for now)
tests/               unit · integration · component · e2e (foundation)
```

Design tokens (logo-derived): Deep Teal · Soft Emerald · Warm Coral · Soft Ivory ·
Dark Slate. Targets WCAG AA, keyboard/screen-reader support, and reduced-motion.
