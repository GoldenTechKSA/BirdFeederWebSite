# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page marketing site for "Nectar Haven" hummingbird feeders, live at nectarhavenfeeders.com. Static site built with React 18 + TypeScript + Vite 6 + TailwindCSS + Framer Motion. There is no backend: purchases go through a Stripe Payment Link, the contact form posts to FormSubmit, and sign-in is simulated. Use Node.js 20.x (what CI pins).

## Commands

```bash
npm run dev      # Start Vite dev server (local HTTP URL with HMR)
npm run build    # Type-check (tsc) then produce production build in dist/
npm run lint     # ESLint over ts/tsx — fails on ANY warning (--max-warnings 0)
npm run preview  # Serve the production build locally
```

There is no test runner configured. Always run `npm run lint` and `npm run build` before considering work done: both are gates in the deploy pipeline, and the project treats lint warnings as errors.

## Deployment

Every push to `main` (i.e. every merged PR) deploys to production. `.github/workflows/deploy.yml` runs `npm ci` → `npm run lint` → `npm run build`, then rsyncs `dist/` with `--delete` to `/var/www/nectarhavenfeeders.com/` on the Hostinger VPS, where Apache2 serves it over HTTPS (Let's Encrypt). A lint or type error fails the deploy.

- `deploy/README.md` — first-time setup (deploy keypair, DNS, certbot, the `VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` GitHub secrets).
- `deploy/vps-setup.sh` — one-time VPS provisioning (creates the per-site `nectarhaven` user and document root).
- `deploy/nectarhaven.conf` — Apache VirtualHost. The SPA fallback is **deliberately disabled**: the earlier `mod_rewrite` version rewrote every request (including `/assets/*.js`) to `index.html` and broke module scripts. The site has no client-side routes, so no fallback is needed; if routing is ever added, use `FallbackResource /index.html` inside `<Directory>` as the comment in that file explains.

## Architecture

The app is one scrolling page. `src/App.tsx` renders, in fixed order: the overlays `PurchaseBanner`, `ScrollProgressBar`, `Hummingbird`, then `Navbar`, `Home`, `Benefits`, `OurProducts`, `ContactUs`, `Footer`.

**Scene structure.** Each section lives in `src/scenes/<name>/index.tsx`. Sub-components for a section live alongside its `index.tsx` (e.g. `benefits/Benefit.tsx`, `ourProducts/Product.tsx`, `navbar/Link.tsx`, `navbar/SignInModal.tsx`). Shared, cross-section code lives in `src/shared/`:

- `ActionButton` — primary CTA. By default smooth-scrolls to `#contactus`; pass `href` to navigate to an external URL instead (used for Stripe checkout). `variant` is `"solid"` or `"ghost"`.
- `HText`, `GradientText`, `BrandMark`, `SectionDivider`, `decor/Botanical` — typography, logo and decorative pieces.
- `Reveal` — scroll-into-view wrapper; use it instead of repeating `initial` / `whileInView` / `viewport` blocks.
- `motion.ts` — shared easing, duration and stagger tokens, reveal variants (`fadeUp`, `fadeIn`, `scaleIn`, `slideInLeft`, `slideInRight`, `staggerContainer`) and `useReducedMotionVariants`.
- `Hummingbird` (+ `hummingbirdPath.ts`) — decorative bird that drifts down the page with scroll; desktop only (`hidden md:block`).
- `ScrollProgressBar` — reading-progress bar pinned to the top.
- `PurchaseBanner` — post-checkout confirmation (see Purchase flow).
- `types.ts` — `SelectedPage`, `BenefitType`, `ClassType` (the product shape; the name is a leftover from the original template).

**Active-section tracking — the central coupling.** Navigation, smooth scrolling, and active-link highlighting are wired together through three values that **must stay in sync** for a given section:
1. The `<section id="...">` attribute (e.g. `id="ourproducts"`).
2. The matching `SelectedPage` enum value in `src/shared/types.ts` (e.g. `OurProducts = "ourproducts"`).
3. The anchor `href="#..."` used by `react-anchor-link-smooth-scroll`.

`navbar/Link.tsx` derives the target from the display string via `page.toLowerCase().replace(/ /g, "")` — so a nav label like `"Our Products"` becomes `"ourproducts"`, which must equal both the section `id` and the enum value. The footer's quick links hardcode the same `#...` hrefs. When adding or renaming a section, update all of these together.

`selectedPage` state lives in `App.tsx` and flows down as props. Sections report themselves active via Framer Motion's `onViewportEnter={() => setSelectedPage(...)}`. `App.tsx` also tracks `isTopOfPage` from a scroll listener to toggle the navbar background.

**Copy / content.** All user-facing text is centralized in `src/assets/strings.json`, imported as `Strings` (e.g. `Strings.benefitsPage.Header`). Edit copy there, not inline in components. Top-level groups: `homePage`, `productsPage`, `contactUsPage`, `buyNowPage`, `benefitsPage`, `navBarSection`, `signInPage`, `checkout`, plus `footerSection`. The JSON contains more entries than are rendered (e.g. `benefitsPage` has Benefit1–10 but `benefits/index.tsx` shows six).

**Products** are data-driven: `ourProducts/index.tsx` maps `Strings.productsPage.items` (name, tag, description) onto an `images` array **by index**. Adding or reordering a product means changing both the JSON array and the image array so they stay aligned.

**Images** are imported as ES modules from `src/assets/` so Vite fingerprints them, organized by purpose: `hero/`, `products/` (`feeder-01.webp` … `feeder-06.webp`), `graphics/`, `logo/`. Prefer WebP. Favicons, app icons and `og-image.png` live in `public/` and are referenced from `index.html`.

**Purchase flow.** The hero "Buy Now" button is an `ActionButton` with `href={Strings.checkout.paymentLink}` — a Stripe Payment Link, so checkout happens entirely on Stripe. Stripe's after-payment redirect must point to `https://nectarhavenfeeders.com/?purchase=success`; `PurchaseBanner` detects that query param, shows the thank-you message (`Strings.checkout.successTitle` / `successMessage`), and strips the param from the URL so a refresh doesn't re-trigger it. To change the product or price, change the Payment Link in Stripe and update `checkout.paymentLink`.

**Forms.** Both forms use `react-hook-form`.
- `contactUs` posts to FormSubmit (`action="https://formsubmit.co/GOLDENTECHKSA@hotmail.com"`), which emails the submission and then redirects the visitor back to the live site (`_next` → `https://nectarhavenfeeders.com`). FormSubmit requires a one-time activation (confirm the email it sends on the first submission) before delivery works.
- `navbar/SignInModal.tsx` is **simulated auth only** — there is no backend. It fakes a network delay and accepts any valid input, then persists the email string to `localStorage` under the key `birdfeeder.user`. `Navbar` reads that key on mount to restore the "session" and shows the email's local-part as a display name.

## Conventions

- **Path alias:** `@` maps to `src/` (configured in both `vite.config.ts` and `tsconfig`). Prefer `@/...` imports over long relative paths.
- **Styling:** Tailwind utility classes only; no CSS modules. `prettier-plugin-tailwindcss` auto-sorts class lists. A few custom utilities (`rounded-blob`, `text-iridescent`, `noise-overlay`) are defined in `src/index.css`.
- **Theme** (`tailwind.config.cjs`): colors are `cream`, `bone`, `ink` (surfaces and text), `botanical-*` (green, brand primary), `nectar-*` (amber accent) and `iris-*` (gradient stops). The old `primary-*` / `secondary-*` / `gray-*` template colors no longer exist. Also defined: fonts (`font-serif` Playfair Display, `font-sans` Inter, `font-mono` JetBrains Mono, loaded from Google Fonts via the `@import` at the top of `src/index.css`), radii `rounded-organic` / `rounded-organic-lg`, shadows `shadow-soft` / `lift` / `nectar` / `glow`, backgrounds `bg-iridescent` / `bg-iridescent-mesh`, and animations `animate-iris-shift` / `animate-float-slow`.
- **Breakpoints are custom:** `xs` 480px, `sm` 768px, `md` **1060px** (non-default), matching the `useMediaQuery("(min-width: 1060px)")` check in the navbar that switches between desktop nav and mobile menu.
- **Motion:** build animations from the tokens and variants in `src/shared/motion.ts`, and respect `prefers-reduced-motion` — wrap variants in `useReducedMotionVariants`, or use `Reveal`, which does it for you. Purely decorative motion (`Hummingbird`, `ScrollProgressBar`) renders nothing when reduced motion is on.
- ESLint config is the legacy `.eslintrc.cjs` format. `react-refresh/only-export-components` is enabled, so keep non-component exports out of component files (which is why `motion.ts` and `hummingbirdPath.ts` are separate modules).
