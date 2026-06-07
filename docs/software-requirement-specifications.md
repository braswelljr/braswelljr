# Software Requirements Specification (SRS)

## Project: Braswell Kenneth Azu Junior — Personal Portfolio Website

**Document Version:** 1.0.0
**Author:** Braswell Kenneth Azu Junior
**Website:** [braswelljr.engineer](https://braswelljr.engineer)
**Last Updated:** 2026-06-06
**Status:** Living Document

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Architecture](#3-system-architecture)
4. [Design System](#4-design-system)
5. [Technology Stack](#5-technology-stack)
6. [Page Specifications](#6-page-specifications)
7. [Component Specifications](#7-component-specifications)
8. [Data Models](#8-data-models)
9. [External Integrations](#9-external-integrations)
10. [Build, Deployment & Infrastructure](#10-build-deployment--infrastructure)
11. [Appendix: Personal Profile Reference](#11-appendix-personal-profile-reference)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) provides a comprehensive, technical reference for the design, development, and maintenance of the personal portfolio website of **Braswell Kenneth Azu Junior**. It consolidates business requirements, functional requirements, and non-functional requirements into a single authoritative document.

### 1.2 Scope

The system is a **Next.js 16 (App Router)** web application that serves as:

- A personal brand and professional portfolio website
- A technical blog platform
- A showcase of open-source projects via GitHub API integration
- A Spotify-powered "listen with me" music sharing page
- A downloadable resume portal

### 1.3 Intended Audience

- Braswell Kenneth Azu Junior (primary owner and developer)
- Future collaborators contributing to the codebase
- AI coding assistants working in this repository
- Technical reviewers evaluating the system architecture

### 1.4 Definitions

| Term          | Definition                                                        |
| ------------- | ----------------------------------------------------------------- |
| App Router    | Next.js 13+ routing paradigm using the `app/` directory           |
| RSC           | React Server Component — rendered on the server with no client JS |
| MDX           | Markdown + JSX — used for blog content                            |
| Fumadocs      | Documentation/blog framework built on Next.js                     |
| Framer Motion | JavaScript animation library (imported as `motion/react`)         |
| WCAG          | Web Content Accessibility Guidelines                              |
| CLS           | Cumulative Layout Shift — Core Web Vital metric                   |

---

## 2. Overall Description

### 2.1 Product Perspective

The portfolio is a standalone, self-contained web application deployed on Vercel. It has external dependencies on:

- GitHub GraphQL API (projects / pinned repos)
- GitHub REST API (all public repos)
- Spotify Web API (currently playing / recently played)
- Vercel Analytics (page view tracking)

### 2.2 Product Identity

| Field       | Value                                      |
| ----------- | ------------------------------------------ |
| Owner       | Braswell Kenneth Azu Junior                |
| Handle      | `braswelljr`                               |
| Domain      | braswelljr.engineer                        |
| Alternate   | braswelljr.vercel.app                      |
| Email       | braswellkenneth7@gmail.com                 |
| Phone       | +233 500 181 106 (Ghana)                   |
| WhatsApp    | https://wa.me/233500181106                 |
| LinkedIn    | linkedin.com/in/braswell-kenneth-870827192 |
| GitHub      | github.com/braswelljr                      |
| X / Twitter | x.com/braswell_jnr                         |
| Instagram   | instagram.com/braswell_jr                  |
| Figma       | figma.com/@braswelljr                      |

### 2.3 User Classes

1. **Recruiters & Hiring Managers** — skim resume, career, and project pages
2. **Clients & Startups** — evaluate project quality and contact details
3. **Developers / OSS Community** — explore projects, read blog posts, find code
4. **General Visitors** — organic search or social referral; casual exploration

---

## 3. System Architecture

### 3.1 Directory Structure

```
braswelljr/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (home)/               # Route group: main portfolio
│   │   │   ├── page.tsx          # Home / Hero page
│   │   │   ├── layout.tsx        # Home layout
│   │   │   ├── about/            # About page
│   │   │   ├── projects/         # Projects page
│   │   │   └── listen-with-me/   # Spotify page
│   │   ├── blog/                 # Fumadocs blog (separate layout)
│   │   ├── api/                  # Next.js API Route Handlers
│   │   │   └── og/               # Open Graph image generation
│   │   ├── _fonts/               # Local font files
│   │   └── layout.tsx            # Root layout (fonts, analytics, providers)
│   ├── components/               # Shared UI components
│   │   ├── ui/                   # Primitive UI components (FloatingDock, etc.)
│   │   ├── navbar.tsx            # Global navigation
│   │   ├── scroll-top.tsx        # Scroll-to-top button
│   │   ├── theme-switch.tsx      # Dark/light mode toggle
│   │   ├── icons.tsx             # Custom SVG icons
│   │   └── mdx-components.tsx    # MDX component overrides
│   ├── config/
│   │   ├── site.ts               # Site metadata (name, URL, description, links)
│   │   ├── data.ts               # Career, education, socials, other projects
│   │   ├── blog.ts               # Blog configuration
│   │   ├── spotify.ts            # Spotify API config
│   │   └── tab-direction-variants.ts
│   ├── context/                  # Zustand stores / React context
│   ├── hooks/                    # Custom React hooks (useDevice, useMedia, etc.)
│   ├── providers/                # React provider wrappers (theme, query, etc.)
│   ├── store/                    # Zustand global state
│   ├── styles/                   # Global CSS (Tailwind v4, animations, utilities)
│   │   ├── main.css              # Entry CSS: @theme tokens, @layer base, utilities
│   │   ├── fumadocs.css          # Fumadocs overrides
│   │   ├── docsearch.css         # DocSearch widget styles
│   │   ├── mdx.css               # MDX prose styles
│   │   └── mouse-pointer-glow.css
│   └── utils/                    # Utility functions (cn, etc.)
├── content/
│   └── blog/                     # MDX blog post files
├── docs/                         # Project documentation (this folder)
├── types/                        # Global TypeScript types
│   ├── types.ts                  # Career, Education, GitHubProperties, etc.
│   ├── nav.ts                    # Navigation types
│   ├── spotify.ts                # Spotify API types
│   └── unist.ts                  # MDX unist types
├── lib/                          # Shared library utilities
├── public/                       # Static assets
│   ├── images/                   # Images (profile, background beams)
│   ├── icons/                    # Favicon variants
│   └── documents/                # Resume PDF
├── next.config.ts                # Next.js configuration
├── source.config.ts              # Fumadocs source configuration
├── components.json               # shadcn/ui configuration
├── tsconfig.json                 # TypeScript configuration
└── pnpm-workspace.yaml           # pnpm workspace
```

### 3.2 Rendering Strategy

| Page              | Strategy                          | Reason                                              |
| ----------------- | --------------------------------- | --------------------------------------------------- |
| `/` (Home)        | Client Component (`'use client'`) | Requires `useState`, `useInterval` for role cycling |
| `/about`          | Server Component (default)        | Static data; no client interactivity                |
| `/projects`       | Client Component                  | Zustand store for GitHub data; toggle state         |
| `/blog/*`         | Fumadocs SSG/ISR                  | MDX content; static generation preferred            |
| `/listen-with-me` | Client or RSC hybrid              | Spotify API calls via server actions or API routes  |
| `/api/*`          | Route Handlers                    | GitHub + Spotify API proxying                       |
| `/og`             | Edge/Node Route Handler           | Dynamic OG image generation                         |

---

## 4. Design System

### 4.1 Visual Theme & Atmosphere

The portfolio exudes a **bold, energetic, and modern** aesthetic. The design language pairs volcanic coral-reds and molten amber-oranges against clean stone-white canvases (light mode) and deep charcoal/neutral-950 surfaces (dark mode). The result is a visual identity that is simultaneously professional and expressive — echoing Braswell's dual identity as engineer and creative designer.

Key atmosphere descriptors: **Vibrant · Purposeful · Kinetic · Clean · Confident**

### 4.2 Color Palette

#### Brand Colors

| Name                          | Hex       | Role                                                                 |
| ----------------------------- | --------- | -------------------------------------------------------------------- |
| Fiery Coral-Red (Primary)     | `#ff4e32` | CTAs, highlights, timeline markers, gradient endpoints, link accents |
| Warm Amber-Orange (Secondary) | `#ff9c08` | Gradient starts, hover states, accent highlights                     |

#### Primary Scale

| Token         | Hex       |
| ------------- | --------- |
| `primary-50`  | `#fff3f1` |
| `primary-100` | `#ffe3df` |
| `primary-200` | `#ffccc4` |
| `primary-300` | `#ffaa9c` |
| `primary-400` | `#ff7863` |
| `primary-500` | `#ff4e32` |
| `primary-600` | `#f03a1d` |
| `primary-700` | `#ca250b` |
| `primary-800` | `#a6230e` |
| `primary-900` | `#892313` |
| `primary-950` | `#4b0e04` |

#### Secondary Scale

| Token           | Hex       |
| --------------- | --------- |
| `secondary-50`  | `#fffbea` |
| `secondary-100` | `#fff2c5` |
| `secondary-200` | `#ffe585` |
| `secondary-300` | `#ffd246` |
| `secondary-400` | `#ffbc1b` |
| `secondary-500` | `#ff9c08` |
| `secondary-600` | `#e27100` |
| `secondary-700` | `#bb4d02` |
| `secondary-800` | `#983b08` |
| `secondary-900` | `#7c310b` |
| `secondary-950` | `#481700` |

#### Surface Colors

| Mode  | Background                | Text                    |
| ----- | ------------------------- | ----------------------- |
| Light | `stone-50` (`#fafaf9`)    | `stone-950` (`#0c0a09`) |
| Dark  | `neutral-900` (`#171717`) | White (`#ffffff`)       |

### 4.3 Typography

| Font Family            | Variable           | Usage                                        |
| ---------------------- | ------------------ | -------------------------------------------- |
| **Satoshi** (Variable) | `--font-satoshi`   | Primary sans-serif; body text, headings      |
| **Inter** (Variable)   | `--font-inter`     | Secondary sans-serif fallback; `--font-sans` |
| **Cascadia Code**      | `--font-cascadia`  | Name display, code-adjacent styled text      |
| **JetBrains Mono**     | `--font-mono`      | Code blocks, technical content               |
| **Lobster**            | `--font-serif`     | Decorative serif accent                      |
| **Abyssinca SIL**      | `--font-abyssinca` | Cultural/decorative accent                   |

**Type Scale (custom):**

- `text-xs`: `0.65rem / 0.75rem`
- `text-xsm`: `0.75rem / 1rem`
- Standard Tailwind scale for `sm` through `9xl`

### 4.4 Gradients

The signature gradient used throughout the UI:

```css
bg-linear-to-l from-secondary to-primary
/* from: #ff9c08 → to: #ff4e32 */
```

Applied via `bg-clip-text text-transparent` for gradient text effects.

### 4.5 Geometry & Borders

- **Cards:** `rounded` (slightly rounded corners) with `bg-zinc-900/20 backdrop-blur shadow-sm`
- **Buttons:** `rounded-sm` (subtly rounded) — crisp, professional edge
- **Timeline markers:** Circular SVG (`cx=4.5, cy=4.5, r=4.5`) with primary stroke
- **Global:** No heavy use of large border radii; preference for sharp, architectural shapes

### 4.6 Depth & Elevation

- **Background:** Full-viewport fixed beam pattern image (`beams-2.png`) — creates depth
- **Navbar:** Frosted glass — `bg-white/50 dark:bg-neutral-800/60` + backdrop blur
- **Cards:** Glass-morphic — `bg-zinc-900/20 backdrop-blur shadow-sm`
- **Modals / Popovers:** Heavier opacity surfaces using stone/neutral palette
- **Philosophy:** Whisper-soft, diffuse shadows; depth through transparency and blur rather than hard drop-shadows

### 4.7 Animation Tokens

```css
--animate-accordion-down: accordion-down 0.2s ease-out --animate-slide-up-fade: slide-up-fade 100ms
  ease-in forwards --animate-border-spin: border-spin 7s linear infinite --animate-wiggle: wiggle
  200ms ease-in-out infinite --animate-caret-blink: caret-blink 1.25s ease-out infinite;
```

---

## 5. Technology Stack

### 5.1 Core Framework

| Layer           | Technology           | Version |
| --------------- | -------------------- | ------- |
| Framework       | Next.js (App Router) | 16.2.7  |
| Language        | TypeScript           | ^6      |
| Runtime         | React                | ^19     |
| Node.js         | >= 24                | —       |
| Package Manager | pnpm                 | 11.5.1  |

### 5.2 Styling

| Technology                 | Version         | Role                                      |
| -------------------------- | --------------- | ----------------------------------------- |
| TailwindCSS                | ^4.3.0          | Utility-first CSS framework               |
| `@tailwindcss/postcss`     | ^4.3.0          | PostCSS integration for Tailwind v4       |
| `tailwindcss-animate`      | ^1.0.7          | Animation utilities plugin                |
| `tailwindcss-hocus`        | ^1.0.0          | `hocus:` (hover + focus) variant plugin   |
| `tw-animate-css`           | ^1.4.0          | CSS animation classes                     |
| `class-variance-authority` | ^0.7.1          | Variant-based component styling           |
| `clsx` + `tailwind-merge`  | ^2.1.1 + ^3.6.0 | Conditional + conflict-free class merging |

### 5.3 Animation

| Technology               | Version  | Role                                                |
| ------------------------ | -------- | --------------------------------------------------- |
| Framer Motion (`motion`) | ^12.40.0 | Spring physics, AnimatePresence, gesture animations |

### 5.4 UI Components

| Technology                 | Role                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| Radix UI (primitives)      | Accessible headless components (icons, slot, controllable state) |
| Base UI (`@base-ui/react`) | Low-level accessible primitives                                  |
| `radix-ui`                 | Full Radix component suite                                       |
| `lucide-react`             | Icon library (1400+ icons)                                       |
| `react-icons`              | Additional icon sets (FontAwesome, Bootstrap, etc.)              |
| `@radix-ui/react-icons`    | Radix-native icon set                                            |
| `embla-carousel-react`     | Touch-enabled carousel                                           |
| `sonner`                   | Toast notification system                                        |
| `input-otp`                | OTP input component                                              |
| `react-day-picker`         | Date picker                                                      |
| `react-phone-number-input` | Phone input with country codes                                   |
| `media-chrome`             | Media player controls                                            |

### 5.5 State Management

| Technology           | Version | Role                                                  |
| -------------------- | ------- | ----------------------------------------------------- |
| Zustand              | ^5.0.14 | Global client state (GitHub repos store)              |
| TanStack React Query | ^5      | Server state, data fetching, caching                  |
| SWR                  | ^2.4.1  | Alternative data fetching with stale-while-revalidate |

### 5.6 Blog / Content

| Technology         | Version  | Role                                                                           |
| ------------------ | -------- | ------------------------------------------------------------------------------ |
| Fumadocs Core      | ^16.9.3  | Blog framework engine                                                          |
| Fumadocs MDX       | ^15.0.10 | MDX processing and source config                                               |
| Fumadocs UI        | ^16.9.3  | Blog UI components and layout                                                  |
| Fumadocs Twoslash  | ^3.2.0   | TypeScript annotations in code blocks                                          |
| Fumadocs Docgen    | ^3.0.10  | Documentation generation                                                       |
| `@docsearch/react` | ^4.6.3   | Algolia-powered search for blog                                                |
| MDX ecosystem      | —        | `@mdx-js/react`, remark-gfm, rehype-slug, rehype-pretty-code, remark-directive |
| Shiki              | ^4.2.0   | Syntax highlighting engine                                                     |
| `reading-time`     | ^1.5.0   | Estimated read time calculation                                                |
| TipTap             | ^3.25.x  | Rich text editor (for blog authoring)                                          |

### 5.7 External APIs

| API                | SDK                              | Purpose                                    |
| ------------------ | -------------------------------- | ------------------------------------------ |
| GitHub GraphQL API | `octokit` ^5.0.5                 | Pinned repositories, stars, forks          |
| GitHub REST API    | `octokit`                        | All public repositories                    |
| Spotify Web API    | `@spotify/web-api-ts-sdk` ^1.2.0 | Currently playing / recently played tracks |

### 5.8 Utilities

| Package                    | Purpose                                                 |
| -------------------------- | ------------------------------------------------------- |
| `date-fns` ^4.4.0          | Date formatting and comparison (career/education dates) |
| `moment` ^2.30.1           | Legacy date utility (available as fallback)             |
| `lodash` ^4.18.1           | Utility functions (debounce, merge, etc.)               |
| `match-sorter` ^8.3.0      | Smart list filtering/sorting                            |
| `deepmerge` ^4.3.1         | Deep object merging                                     |
| `lru-cache` ^11.5.1        | In-memory LRU caching (GitHub API responses)            |
| `zod` ^4.4.3               | Schema validation                                       |
| `react-use` ^17.6.0        | Collection of React hooks (useInterval, useMedia, etc.) |
| `react-use-measure` ^2.1.7 | DOM element dimension tracking                          |
| `merge-refs` ^2.0.0        | Merging multiple React refs                             |
| `ky` ^2.0.2                | HTTP client (fetch wrapper)                             |
| `canvas-confetti` ^1.9.4   | Confetti animation effect                               |
| `dom-to-image` ^2.6.0      | DOM node to image export                                |

### 5.9 OG Image Generation

| Package                        | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `puppeteer-core` ^25.1.0       | Headless browser for screenshot-based OG images |
| `@sparticuz/chromium` ^149.0.0 | Chromium binary for serverless environments     |
| `sharp` ^0.34.5                | Image processing and optimization               |

### 5.10 Analytics & Monitoring

| Tool                       | Purpose                               |
| -------------------------- | ------------------------------------- |
| `@vercel/analytics` ^2.0.1 | Page views, Web Vitals, custom events |

---

## 6. Page Specifications

### 6.1 Root Layout (`src/app/layout.tsx`)

**Type:** Server Component  
**Purpose:** Injects fonts, analytics, global CSS, and provider wrappers into the document shell.

**Font Loading:**

```typescript
const Satoshi = LocalFont({ src: './_fonts/Satoshi-Variable.woff2', variable: '--font-satoshi' })
const Inter = LocalFont({ src: './_fonts/Inter[slnt,wght].ttf', variable: '--font-inter' })
const AbyssinicaSIL = LocalFont({ src: './_fonts/AbyssinicaSIL-Regular.ttf', variable: '--font-abyssinca' })
const Cascadia = LocalFont({ src: './_fonts/Cascadia.ttf', variable: '--font-cascadia' })
const JetbrainsMono = LocalFont({ src: [normal + italic], variable: '--font-mono' })
```

**Metadata:**

```typescript
{
  title: { default: 'braswelljr/braswelljr', template: '%s - braswelljr/braswelljr' },
  description: 'Personal website of Braswell Jr. A software engineer, open source contributor, and a passionate learner.',
  keywords: ['braswelljr', 'braswell', 'braswelljr.engineer', 'portfolio', 'blog', 'resume'],
  creator: 'braswelljr'
}
```

---

### 6.2 Home Page (`/`)

**Type:** Client Component  
**File:** `src/app/(home)/page.tsx`

**Key Logic:**

- `useState<number>(0)` tracks the active role index
- `useInterval(fn, 5000)` from `react-use` cycles through roles every 5 seconds
- `useDevice()` custom hook determines desktop vs. mobile to conditionally render FloatingDock
- `AnimatePresence mode="wait"` ensures the exiting animation completes before the entering one begins

**Roles Cycled:**

1. Software Engineer
2. Web Designer
3. UX / UI Designer

---

### 6.3 About Page (`/about`)

**Type:** Server Component  
**File:** `src/app/(home)/about/page.tsx`

**Data Sources:** `career` and `education` arrays from `src/config/data.ts`

**`isCurrentDate` Helper:**

```typescript
const isCurrentDate = (date: Date) =>
  isToday(date) || differenceInDays(date, new Date()) >= -1
```

Returns `"Current"` for any date within 1 day of today (handles timezone edge cases).

---

### 6.4 Projects Page (`/projects`)

**Type:** Client Component  
**File:** `src/app/(home)/projects/page.tsx`

**State:**

- `viewMorePins: boolean` — expands/collapses pinned projects (default limit: 3 desktop / 2 mobile)
- `viewMoreProjects: boolean` — expands/collapses all projects (default limit: 6 desktop / 4 mobile)

**Data Sources:**

- `useXStore()` Zustand store — hydrated from GitHub API via fetch on mount
- `OTHER_PROJECTS` array from `src/config/data.ts`

---

## 7. Component Specifications

### 7.1 Navbar (`src/components/navbar.tsx`)

- Fixed position: `fixed inset-x-0 top-0 z-4`
- Styling: `bg-white/50 dark:bg-neutral-800/60` + backdrop blur
- Height: `80px` (via `--fd-nav-height: 80px`)
- Accepts `disableOnLayouts: string[]` prop to hide on specific route prefixes (e.g., `/blog/`)

### 7.2 FloatingDock (`src/components/ui/floating-dock.tsx`)

- Desktop-only social link dock with magnification animation on hover
- Each item scales up on hover proximity (Apple Dock-style interaction)
- Items accept: `title`, `icon` (React node), `href`, `target`, `rel`
- Container classNames customizable via `classNames.container`
- On hover: `data-[motion-hover=true]:bg-linear-to-l from-secondary to-primary`

### 7.3 ThemeSwitch (`src/components/theme-switch.tsx`)

- Toggles between light and dark mode
- Persists preference via `next-themes`
- Renders in navbar

### 7.4 ScrollTop (`src/components/scroll-top.tsx`)

- Fixed position: `fixed right-5 bottom-5 z-10`
- Styling: `bg-primary! dark:text-neutral-950!`
- Hidden on blog layout pages
- Smooth scroll behavior via `scroll-smooth` on `<html>`

### 7.5 GitHub Contribution Graph

- **File:** `src/app/(home)/projects/_components/github-contribution-graph.tsx`
- **Library:** `react-github-calendar`
- Renders the GitHub contribution heatmap for username `braswelljr`

### 7.6 Other Projects (`src/app/(home)/projects/_components/other-projects.tsx`)

- Renders the `OTHER_PROJECTS` static array from `data.ts`
- Card-based layout matching the pinned/all project grid styles

---

## 8. Data Models

### 8.1 Career Entry

```typescript
type Career = {
  role: string;          // e.g., "Fullstack Software Engineer"
  type: string;          // e.g., "Full-Time", "Contract", "Freelancing", "National Service", "Intern"
  company: string;       // e.g., "Ghana School of Law"
  companyLink: string;   // URL to company website
  date: {
    from: Date;          // Start date
    to?: Date;           // End date (undefined or today = "Current")
  };
  description: string[]; // Bullet-point achievements/responsibilities
};
```

### 8.2 Education Entry

```typescript
type Education = {
  name: string;          // Degree program name
  degree: string;        // Degree type (e.g., "Bachelor of Science")
  date: {
    from: Date;
    to?: Date;
  };
  school: string;        // Institution name
  description: string[]; // Activities, achievements (currently empty)
};
```

### 8.3 Social Link

```typescript
type Social = {
  name: string;                          // Display name
  url: string;                           // Full URL
  icon: React.ComponentType<IconProps>;  // react-icons component
};
```

### 8.4 Other Project

```typescript
type OtherProject = {
  name: string;          // Project name
  homepageUrl: string;   // Live URL
  url: string;           // GitHub URL (empty string if not public)
  description: string;   // Short project description
};
```

### 8.5 GitHub Properties

```typescript
type GitHubProperties = {
  total: number;         // Total contributions
  data: Activity[];      // react-github-calendar Activity array
};
```

---

## 9. External Integrations

### 9.1 GitHub API

**Authentication:** Personal Access Token stored in `GITHUB_TOKEN` env var

**Endpoints Used:**

- GraphQL: `viewer.pinnedItems` — pinned repositories with name, description, stars, forks, primaryLanguage, homepageUrl
- REST: `GET /users/braswelljr/repos?type=public&per_page=100` — all public repositories

**Caching:** Responses cached in-memory via `lru-cache` to avoid rate limiting (60 req/hour unauthenticated, 5000/hour authenticated)

### 9.2 Spotify Web API

**Auth Flow:** Authorization Code Flow with PKCE or Client Credentials (for server-side)

**Env Variables:**

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

**Endpoints Used:**

- `GET /me/player/currently-playing` — currently playing track
- `GET /me/player/recently-played` — recently played tracks

**SDK:** `@spotify/web-api-ts-sdk`

### 9.3 Vercel Analytics

Integrated via `<Analytics />` component from `@vercel/analytics/next` in the root layout. Tracks:

- Page views
- Web Vitals (LCP, CLS, FID, FCP, TTFB)
- Custom events (resume downloads, contact clicks)

---

## 10. Build, Deployment & Infrastructure

### 10.1 Scripts

```bash
pnpm dev          # Start Next.js dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Run Prettier on all files
pnpm prepare      # Install Husky git hooks
```

### 10.2 Git Hooks (Husky + lint-staged)

**Pre-commit:** Runs lint-staged on staged `.js`, `.ts`, `.jsx`, `.tsx` files:

- ESLint with `--fix`
- Prettier formatting
- Commitlint on commit message

### 10.3 Vercel Configuration (`vercel.json`)

Deployed to Vercel with:

- Automatic preview deployments on every PR/branch push
- Production deployment on merge to `main`
- Edge Network CDN for all static assets

### 10.4 Environment Variables

```bash
# Required for production
GITHUB_TOKEN=                    # GitHub PAT for API access
SPOTIFY_CLIENT_ID=               # Spotify app client ID
SPOTIFY_CLIENT_SECRET=           # Spotify app client secret
SPOTIFY_REFRESH_TOKEN=           # Long-lived Spotify refresh token
NEXT_PUBLIC_SITE_URL=https://braswelljr.engineer
```

---

## 11. Appendix: Personal Profile Reference

### A. Biography

Braswell Kenneth Azu Junior is a Software Engineer from Ghana with over 5 years of professional experience building scalable web applications, mobile apps, and cloud-native APIs. He combines engineering rigor with strong design sensibility — equally comfortable architecting backend systems and crafting pixel-perfect, animated frontend interfaces.

He is passionate about:

- **Frontend animation** — Framer Motion, GSAP, CSS transitions
- **Developer experience** — tooling, monorepos, CI/CD automation
- **Open source** — contributing to and building open-source projects
- **Design systems** — semantic design tokens, accessible component libraries

### B. Skills Reference

**Programming Languages:**

- JavaScript / TypeScript _(Expert)_
- Go (Golang) _(Proficient)_
- Dart _(Proficient)_
- PHP _(Competent)_

**Frontend Frameworks:**

- React (Next.js, Remix, Gatsby) _(Expert)_
- Vue.js _(Proficient)_
- React Native _(Proficient)_
- Flutter _(Proficient)_

**Backend & APIs:**

- Node.js (Express, Encore) _(Proficient)_
- Go (Encore) _(Proficient)_
- PHP (Laravel) _(Competent)_
- REST, GraphQL, gRPC

**Databases:**

- PostgreSQL, MySQL _(Proficient)_
- MongoDB _(Proficient)_
- SQLite _(Competent)_
- Firebase, Supabase _(Proficient)_

**Styling & Animation:**

- TailwindCSS _(Expert)_
- SASS / PostCSS _(Proficient)_
- Framer Motion _(Proficient)_
- GSAP _(Competent)_

**State Management:**

- Zustand _(Expert)_
- React Query (TanStack) _(Proficient)_
- Redux _(Proficient)_
- Jotai _(Competent)_

**DevOps & Infrastructure:**

- Docker _(Competent)_
- AWS, GCP _(Competent)_
- GitHub Actions _(Proficient)_
- Jenkins _(Competent)_
- Vercel _(Expert)_

**Design Tools:**

- Figma _(Proficient)_

**Languages:**

- English _(Fluent)_
- French _(Elementary)_

### C. Education

| Degree                                | Institution                                       | Period              |
| ------------------------------------- | ------------------------------------------------- | ------------------- |
| B.Sc Computer Science and Engineering | University of Mines and Technology, Tarkwa, Ghana | Sep 2018 – Oct 2022 |

### D. Career Timeline

| Period              | Role                        | Company                 | Type             |
| ------------------- | --------------------------- | ----------------------- | ---------------- |
| Nov 2025 – Present  | Fullstack Software Engineer | Ghana School of Law     | Full-Time        |
| Jun 2025 – Jul 2025 | Software Engineer           | Global Tech Network LLC | Contract         |
| Mar 2024 – Jun 2025 | Frontend Software Developer | Benchfive LLC           | Part-Time        |
| Nov 2024 – Jan 2025 | Software Engineer           | SonicAI                 | Contract         |
| Jul 2023 – Nov 2024 | Software Engineer           | Infinanze Technologies  | Contract         |
| Apr 2022 – Aug 2024 | Software Engineer           | Morlan Technologies     | Freelancing      |
| Aug 2022 – Sep 2023 | Software Engineer           | Solar Taxi              | National Service |
| May 2021 – Nov 2021 | Software Engineer           | The Hive, Kumasi        | Intern           |
| Jul 2020 – Present  | Software Developer          | Freelancing             | Freelance        |
