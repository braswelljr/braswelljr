# Non-Functional Requirements Document (NFRD)

## Project: Braswell Kenneth Azu Junior — Personal Portfolio Website

**Version:** 1.0.0
**Author:** Braswell Kenneth Azu Junior
**Website:** [braswelljr.engineer](https://braswelljr.engineer)
**Last Updated:** 2026-06-06

---

## 1. Overview

This document specifies the non-functional requirements (NFRs) — the quality attributes that govern *how* the portfolio website performs, behaves, and feels, beyond its functional features. These requirements are critical to delivering a high-end, professional, and accessible experience.

---

## 2. Performance

### 2.1 Core Web Vitals Targets

| Metric | Target | Tool |
|--------|--------|------|
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse / Chrome DevTools |
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Interaction to Next Paint (INP) | < 200ms | Chrome DevTools |
| Time to First Byte (TTFB) | < 600ms | Vercel Analytics |

### 2.2 Lighthouse Scores

| Category | Minimum Score |
|----------|--------------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

### 2.3 Asset Optimization

- All images use Next.js `<Image>` component for automatic WebP conversion, lazy loading, and responsive sizing
- The profile image (`/images/braswelljr.png`) uses `loading="eager"` and explicit `width`/`height` to prevent layout shift
- Background image (`/images/beams-2.png`) is loaded eagerly as a fixed full-screen asset
- Fonts are loaded via `next/font/local` with `woff2` and `ttf` files — eliminating external font render-blocking
- JavaScript bundles are code-split by route via Next.js App Router's automatic chunking

### 2.4 Caching Strategy

- Static pages (home, about, projects) are statically generated at build time where possible
- GitHub API responses are cached with LRU cache (`lru-cache`) to avoid rate limiting
- Spotify API uses token refresh with short-lived cache TTLs
- Vercel Edge Network provides global CDN caching for all static assets

---

## 3. Accessibility (A11y)

### 3.1 Standards Compliance

- The site must meet **WCAG 2.1 Level AA** compliance
- `eslint-plugin-jsx-a11y` is integrated in the ESLint config to catch accessibility issues at dev time

### 3.2 Keyboard Navigation

- All interactive elements (links, buttons, form inputs) must be focusable and operable via keyboard alone
- Visible focus indicators must be present on all focusable elements (no `outline: none` without replacement)
- Tab order must be logical and match the visual reading order

### 3.3 Screen Reader Support

- All images must have meaningful `alt` text (decorative images use `alt=""`)
- SVG icons used standalone must have `aria-label` or `title` elements
- Timeline `<dl>/<dt>/<dd>` structures use `<span className="sr-only">` for screen reader labels
- Interactive role transitions on the home page: the live region must be announced accessibly

### 3.4 Color Contrast

- All body text must meet a minimum **4.5:1** contrast ratio against its background
- Large text and UI components must meet **3:1** contrast ratio
- Primary color `#ff4e32` on white `#fafaf9` (stone-50) meets the required contrast thresholds
- Dark mode colors are tested independently for equivalent contrast ratios

### 3.5 Reduced Motion

- All animations and transitions must check for `prefers-reduced-motion: reduce`
- When reduced motion is preferred: animations are disabled or replaced with instant transitions
- Framer Motion's `useReducedMotion` hook is used to conditionally apply spring animations

### 3.6 Semantic HTML

- Pages use semantic landmarks: `<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<h1>`–`<h6>` in correct hierarchy
- Heading levels do not skip (e.g., h1 → h2 → h3, never h1 → h3)
- Lists of social links, projects, and career entries use `<ul>`/`<ol>` where semantically appropriate

---

## 4. Responsiveness & Device Compatibility

### 4.1 Supported Devices

| Device Class | Screen Width | Behavior |
|--------------|-------------|----------|
| Small Mobile | 320px (xxs) | Full layout reflow; stacked sections |
| Mobile | 375px–424px | Compact layout; mobile social icons (non-floating) |
| Large Mobile | 425px–639px | Comfortable spacing; readable typography |
| Tablet | 640px–1023px | 2-column project grids; enhanced spacing |
| Desktop | 1024px–1279px | 3-column grids; FloatingDock social links; timeline labels |
| Large Desktop | 1280px–1535px | Full-width layouts with max-width constraints |
| Ultrawide | 1920px+ (3xl–5xl) | Capped container widths; no layout breaks |

### 4.2 Touch & Pointer

- All interactive elements have a minimum touch target of **44×44px** (WCAG 2.5.5)
- `-webkit-tap-highlight-color: rgba(0 0 0 / 0)` is set globally to suppress default tap highlights
- Hover-only interactions (FloatingDock, link underlines) have equivalent non-hover behaviors on touch devices

### 4.3 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 110+ |
| Firefox | 110+ |
| Safari | 16.4+ |
| Edge | 110+ |
| Mobile Safari (iOS) | 16.4+ |
| Chrome for Android | 110+ |

---

## 5. Animation & Motion Design

### 5.1 Animation Principles

- Animations must be **purposeful** — every motion conveys meaning (entrance, emphasis, state change)
- Animations must be **performant** — use CSS `transform` and `opacity` (GPU-composited) over layout-triggering properties
- Spring physics are preferred over linear/ease curves for natural, organic motion feel
- Average animation duration: 200–500ms; no animation exceeds 1.5s without good reason

### 5.2 Animation Catalogue

| Animation | Implementation | Trigger |
|-----------|---------------|---------|
| Role text cycling | Framer Motion `AnimatePresence` with `y` + `opacity` spring | 5-second interval |
| Social link hover (desktop) | FloatingDock scale + position transform | Hover |
| Page element entrances | `slide-up-fade` CSS keyframe (20px → 0, opacity 0 → 1) | Page load |
| Link underlines | CSS `background-size` transition on hover | Hover |
| Playlist card | CSS `perspective`, `skew`, conic-gradient `spin` pseudo-element | Hover / Focus |
| Scroll-to-top button | Animated entrance/exit | Scroll threshold |
| Accordion / Collapsible | CSS height transition via `--radix-accordion-content-height` | Click |
| Wiggle | `rotate(-15deg) → rotate(15deg)` at 200ms | Trigger state |
| Border spin | `rotate(-360deg)` infinite at 7s | Always |

### 5.3 Reduced Motion Override

All Framer Motion animations use `useReducedMotion()`. When `prefers-reduced-motion: reduce` is detected:
- Spring transitions are replaced with `duration: 0` or instant state changes
- CSS animations (`@keyframes`) are disabled via:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

---

## 6. SEO & Discoverability

| Requirement | Implementation |
|-------------|---------------|
| Page titles | `title.default` and `title.template` via Next.js Metadata API |
| Meta description | Populated from `siteConfig.description` |
| Keywords | `['braswelljr', 'braswell', 'braswelljr.engineer', 'portfolio', 'blog', 'resume']` |
| Author metadata | Set via `authors` and `creator` in root layout metadata |
| Canonical URL | `https://braswelljr.engineer` |
| Open Graph images | Dynamically generated at `/og` route using Puppeteer/`@sparticuz/chromium` |
| Favicon | `/favicon.ico` + `/icons/icon.png` (shortcut + Apple touch icon) |
| Web App Manifest | `/manifest.json` for PWA-like installability |
| Sitemap | Generated by Next.js or manually maintained |
| Robots | Default Next.js robots.txt allowing full crawling |

---

## 7. Security

| Requirement | Detail |
|-------------|--------|
| External links | All external links use `target="_blank" rel="noopener noreferrer"` |
| Environment variables | API keys (GitHub token, Spotify credentials) stored in `.env.local`, never committed |
| `.env.example` | A sanitized example file documents required env vars without exposing secrets |
| No XSS vectors | MDX content is rendered via trusted fumadocs pipeline; no raw HTML injection from user input |
| HTTPS | Enforced by Vercel on all production traffic |
| Content Security Policy | Configurable via `next.config.ts` headers |

---

## 8. Maintainability & Developer Experience

| Requirement | Detail |
|-------------|--------|
| TypeScript | Strict TypeScript (`typescript: ^6`) across all source files |
| Linting | ESLint with `next`, `jsx-a11y`, `react`, `react-hooks`, `prettier` plugins |
| Formatting | Prettier with `prettier-plugin-tailwindcss` for Tailwind class sorting |
| Git hooks | Husky + lint-staged runs lint + format on staged files pre-commit |
| Commit linting | Commitlint enforces conventional commit message format |
| Package manager | pnpm (v11.5.1) with workspace support |
| Node requirement | Node.js ≥ 24 |
| Testing | Vitest + React Testing Library for unit/integration tests |

---

## 9. Scalability

- The site is statically deployable with incremental adoption of SSR where needed (e.g., API routes)
- Blog content uses file-based MDX — adding a new post requires only adding a new `.mdx` file
- Career and project data are maintained in a centralized `src/config/data.ts` file for easy updates
- The `OTHER_PROJECTS` array in `data.ts` is extendable without touching any page components

---

## 10. Internationalisation (i18n)

- The site is currently English-only
- Content is authored in English; no i18n routing is implemented
- Braswell speaks: English (Fluent), French (Elementary) — French translation is a future consideration
- The `<html lang="en">` attribute is correctly set in the root layout

---

## 11. Uptime & Reliability

- Deployed on **Vercel** — SLA ≥ 99.9% uptime guaranteed by platform
- Zero-downtime deployments via Vercel's preview → production promotion workflow
- GitHub Actions CI pipeline runs lint and build checks on all PRs before merge
