# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page marketing site for "Nectar Haven" hummingbird feeders. Static site built with React 18 + TypeScript + Vite + TailwindCSS + Framer Motion. Deployed as static files to Hostinger hosting at nectarhavenfeeders.com (output of `vite build`). Requires Node.js 20.x.

## Commands

```bash
npm run dev      # Start Vite dev server (local HTTP URL with HMR)
npm run build    # Type-check (tsc) then produce production build in dist/
npm run lint     # ESLint over ts/tsx — fails on ANY warning (--max-warnings 0)
npm run preview  # Serve the production build locally
```

There is no test runner configured. `npm run build` is the closest thing to a CI gate (it fails on type errors); always run `npm run lint` before considering work done since the project treats warnings as errors.

## Architecture

The app is one scrolling page composed of full-viewport sections. `src/App.tsx` renders them in fixed order: `Navbar`, `Home`, `Benefits`, `OurProducts`, `ContactUs`, `Footer`.

**Scene structure.** Each section lives in `src/scenes/<name>/index.tsx`. Sub-components for a section live alongside its `index.tsx` (e.g. `benefits/Benefit.tsx`, `ourProducts/Product.tsx`, `navbar/Link.tsx`, `navbar/SignInModal.tsx`). Shared, cross-section components live in `src/shared/` (`ActionButton`, `HText`, `types.ts`).

**Active-section tracking — the central coupling.** Navigation, smooth scrolling, and active-link highlighting are wired together through three values that **must stay in sync** for a given section:
1. The `<section id="...">` attribute (e.g. `id="ourproducts"`).
2. The matching `SelectedPage` enum value in `src/shared/types.ts` (e.g. `OurProducts = "ourproducts"`).
3. The anchor `href="#..."` used by `react-anchor-link-smooth-scroll`.

`navbar/Link.tsx` derives the target from the display string via `page.toLowerCase().replace(/ /g, "")` — so a nav label like `"Our Products"` becomes `"ourproducts"`, which must equal both the section `id` and the enum value. When adding or renaming a section, update all of these together.

`selectedPage` state lives in `App.tsx` and flows down as props. Sections report themselves active via Framer Motion's `onViewportEnter={() => setSelectedPage(...)}`. `App.tsx` also tracks `isTopOfPage` from a scroll listener to toggle the navbar background.

**Copy / content.** All user-facing text is centralized in `src/assets/strings.json`, imported as `Strings` (e.g. `Strings.benefitsPage.Header`). Edit copy there, not inline in components. Note the JSON contains more entries than are rendered (e.g. `benefitsPage` has Benefit1–10 but only three are shown in `benefits/index.tsx`).

**Images** are imported as ES modules from `src/assets/` (e.g. `import Logo from "@/assets/Logo.png"`), which lets Vite fingerprint them. Product and benefit lists are hardcoded arrays inside their section's `index.tsx`.

**Forms.** Both forms use `react-hook-form`.
- `contactUs` posts to FormSubmit (`action="https://formsubmit.co/GOLDENTECHKSA@hotmail.com"`), which emails the submission and then redirects the visitor back to the live site (`_next` → `https://nectarhavenfeeders.com`). FormSubmit requires a one-time activation (confirm the email it sends on the first submission) before delivery works.
- `navbar/SignInModal.tsx` is **simulated auth only** — there is no backend. It fakes a network delay and accepts any valid input, then persists the email string to `localStorage` under the key `birdfeeder.user`. `Navbar` reads that key on mount to restore the "session" and shows the email's local-part as a display name.

## Conventions

- **Path alias:** `@` maps to `src/` (configured in both `vite.config.ts` and `tsconfig`). Prefer `@/...` imports over long relative paths.
- **Styling:** Tailwind utility classes only; no CSS modules. `prettier-plugin-tailwindcss` auto-sorts class lists. The theme in `tailwind.config.cjs` defines custom colors (`primary-*`, `secondary-*`, `gray-*`), background images, and **custom breakpoints** — note `md` is `1060px` (non-default), matching the `useMediaQuery("(min-width: 1060px)")` checks that switch between desktop and mobile layouts.
- **Responsive logic in JS:** components use the `useMediaQuery` hook (`src/hooks/`) for layout branches that can't be expressed with Tailwind responsive prefixes (e.g. rendering the mobile menu vs. desktop nav).
- ESLint config is the legacy `.eslintrc.cjs` format. `react-refresh/only-export-components` is enabled, so keep non-component exports out of component files.
