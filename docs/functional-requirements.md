# Functional Requirements Document (FRD)

## Project: Braswell Kenneth Azu Junior — Personal Portfolio Website

**Version:** 1.0.0
**Author:** Braswell Kenneth Azu Junior
**Website:** [braswelljr.engineer](https://braswelljr.engineer)
**Last Updated:** 2026-06-06

---

## 1. Overview

This document specifies the functional requirements for each page, component, and feature of the portfolio website. Requirements are organized by module and marked with unique identifiers for traceability.

---

## 2. Site-Wide / Global Features

### 2.1 Navigation (Navbar)

| ID | Requirement |
|----|-------------|
| NAV-01 | A fixed top navigation bar is present on all non-blog pages |
| NAV-02 | Navigation links route to: Home (`/`), About (`/about`), Projects (`/projects`), Blog (`/blog`), Listen With Me (`/listen-with-me`) |
| NAV-03 | The navbar applies a frosted glass effect: `bg-white/50 dark:bg-neutral-800/60` with backdrop blur |
| NAV-04 | Navigation is hidden/disabled on blog layout sub-pages (`/blog/*`) |
| NAV-05 | Navigation is fully keyboard accessible with visible focus indicators |
| NAV-06 | On mobile, a collapsible menu or mobile-friendly navigation variant is provided |

### 2.2 Theme Switching

| ID | Requirement |
|----|-------------|
| THM-01 | A dark/light mode toggle is accessible from the navbar |
| THM-02 | Theme preference persists via `next-themes` across page reloads |
| THM-03 | The default theme respects the user's OS-level `prefers-color-scheme` preference |
| THM-04 | All pages and components must render correctly in both light and dark modes |

### 2.3 Background

| ID | Requirement |
|----|-------------|
| BG-01 | A full-viewport fixed background image (`/images/beams-2.png`) is rendered behind all page content |
| BG-02 | The background is layered below main content (z-index 0) and remains static during scroll |

### 2.4 Scroll-to-Top Button

| ID | Requirement |
|----|-------------|
| SCR-01 | A scroll-to-top button appears at the bottom-right of the viewport when the user scrolls down |
| SCR-02 | Clicking it smoothly scrolls the page back to the top |
| SCR-03 | The button is hidden on blog layout pages (`/blog/*`) |
| SCR-04 | The button uses `bg-primary` styling with dark mode text override |

### 2.5 Analytics

| ID | Requirement |
|----|-------------|
| ANA-01 | Vercel Analytics is integrated site-wide for page view and event tracking |

---

## 3. Home Page (`/`)

| ID | Requirement |
|----|-------------|
| HOM-01 | The home page centers a hero section vertically and horizontally in the viewport |
| HOM-02 | A profile image (`/images/braswelljr.png`) is displayed prominently |
| HOM-03 | The name "Braswell Kenneth Azu Jr." is displayed with `font-cascadia font-bold` styling |
| HOM-04 | An animated role cycling component cycles through: `Software Engineer`, `Web Designer`, `UX / UI Designer` on a 5-second interval |
| HOM-05 | Role transitions use Framer Motion `AnimatePresence` with spring physics: `y: 20 → 0`, `opacity: 0 → 1`, spring stiffness `260`, damping `20` |
| HOM-06 | Role text displays a gradient: `bg-linear-to-l from-secondary to-primary` clipped to text |
| HOM-07 | On desktop: a FloatingDock component displays social links with hover animation |
| HOM-08 | On mobile/tablet: social links display as a horizontal icon row |
| HOM-09 | Social links include: LinkedIn, GitHub, Instagram, X (Twitter), Figma |
| HOM-10 | A mailto link to `braswellkenneth7@gmail.com` is displayed with gradient text and animated underline |
| HOM-11 | The page is entirely client-rendered (`'use client'`) to support interactive animations |

---

## 4. About Page (`/about`)

| ID | Requirement |
|----|-------------|
| ABT-01 | The page displays a professional bio paragraph introducing Braswell Jr. |
| ABT-02 | The name "Braswell Kenneth Azu Junior" in the bio is highlighted with `text-primary` |
| ABT-03 | A "Download Resume" button links to `/documents/Braswell-Kenneth-Azu-Junior-Resume.pdf` with `download` attribute |
| ABT-04 | A **Career** section displays all work history as a vertical timeline |
| ABT-05 | Each career entry shows: role title, employment type (in parentheses), company name, date range, and description bullet points |
| ABT-06 | The timeline uses a vertical line (`bg-primary`) with circle SVG markers at each entry |
| ABT-07 | Date ranges use `date-fns` `format()` for human-readable formatting (e.g., "Nov 2025 - Current") |
| ABT-08 | If `job.date.to` equals today (within 1 day), display "Current" instead of a date |
| ABT-09 | An **Education** section displays academic history in the same timeline style |
| ABT-10 | Education entry shows: degree name, degree type, institution, and date range |
| ABT-11 | Current career entry: Fullstack Software Engineer at Ghana School of Law (Nov 2025 – Current) |
| ABT-12 | B.Sc Computer Science and Engineering — University of Mines and Technology, Ghana (Sep 2018 – Oct 2022) |

### Career Entries (in reverse chronological order)

| Company | Role | Type | Period |
|---------|------|------|--------|
| Ghana School of Law | Fullstack Software Engineer | Full-Time | Nov 2025 – Current |
| Global Tech Network LLC | Software Engineer | Contract | Jun 2025 – Jul 2025 |
| Benchfive LLC | Frontend Software Developer | Part-Time | Mar 2024 – Jun 2025 |
| SonicAI | Software Engineer | Contract | Nov 2024 – Jan 2025 |
| Infinanze Technologies | Software Engineer | Contract | Jul 2023 – Nov 2024 |
| Morlan Technologies | Software Engineer | Freelancing | Apr 2022 – Aug 2024 |
| Solar Taxi | Software Engineer | National Service | Aug 2022 – Sep 2023 |
| The Hive, Kumasi | Software Engineer | Intern | May 2021 – Nov 2021 |
| Freelancing | Software Developer | Freelance | Jul 2020 – Present |

---

## 5. Projects Page (`/projects`)

| ID | Requirement |
|----|-------------|
| PRJ-01 | Page heading: "Work, Hobby and Open Source" with `from-secondary to-primary` gradient |
| PRJ-02 | A written introduction paragraph explains Braswell's passion for building and open source |
| PRJ-03 | A **GitHub Contribution Graph** is displayed, powered by `react-github-calendar` |
| PRJ-04 | A **Starred Projects** section shows GitHub pinned repositories fetched via the GitHub API |
| PRJ-05 | Each pinned project card displays: name, stars count, forks count, description (3-line clamp), primary language (color dot + name), and a "Visit" link |
| PRJ-06 | On desktop: pinned projects display in a 3-column grid; on mobile: 2-column grid |
| PRJ-07 | A "View More / View Less" toggle controls the visible count of pinned projects |
| PRJ-08 | An **All Projects** section shows all public GitHub repositories (excluding pinned ones) |
| PRJ-09 | Each project card shows: name, stars, forks, description (2-line clamp), and "Visit" link |
| PRJ-10 | An **Other Projects** section shows non-GitHub projects from the static `OTHER_PROJECTS` config |
| PRJ-11 | Project cards use `bg-zinc-900/20 shadow-sm backdrop-blur` for glass-morphic styling |
| PRJ-12 | "Visit" buttons open project URLs in a new tab with `rel="noopener noreferrer"` |

### Other Projects (Static)

| Project | URL | Description |
|---------|-----|-------------|
| Glam Beauty Studio (Manager) | manager-aeshglam.vercel.app | Beauty studio management app |
| Carbazza | carbazza.vercel.app | Car enthusiast platform |
| Colored | colored.vercel.app | Personalized color palette tool |
| OZ Moview | oz-seven.vercel.app | Movie review platform (TMDB API) |
| TheseuxX | theseusx.vercel.app | Real estate platform |
| Yomyom | yomyom.vercel.app | Express delivery app |

---

## 6. Blog (`/blog`)

| ID | Requirement |
|----|-------------|
| BLG-01 | The blog is powered by **Fumadocs MDX** (fumadocs-core, fumadocs-mdx, fumadocs-ui) |
| BLG-02 | Blog content is stored as `.mdx` files in the `content/blog/` directory |
| BLG-03 | The blog layout disables the global Navbar and ScrollTop button |
| BLG-04 | Blog posts support: syntax highlighting (Shiki/rehype-pretty-code), Mermaid diagrams, table of contents, code import, GFM tables, and custom MDX components |
| BLG-05 | A search feature is provided via `@docsearch/react` for blog content discovery |
| BLG-06 | Reading time is calculated and displayed per post via the `reading-time` package |
| BLG-07 | Blog post URLs follow the pattern `/blog/[slug]` |
| BLG-08 | Blog supports Twoslash TypeScript annotations via `fumadocs-twoslash` |

---

## 7. Listen With Me (`/listen-with-me`)

| ID | Requirement |
|----|-------------|
| LST-01 | Page integrates with the **Spotify Web API** (`@spotify/web-api-ts-sdk`) to display currently playing or recently played tracks |
| LST-02 | Playlist cards use a special CSS animation (`playlist-card`) with conic-gradient spin on hover |
| LST-03 | The feature reflects Braswell's personality and interests beyond pure engineering |

---

## 8. API Routes (`/api`)

| ID | Requirement |
|----|-------------|
| API-01 | A GitHub API route fetches pinned repositories and all public repos for the Projects page |
| API-02 | A Spotify API route handles OAuth token refresh and now-playing/recently-played data |
| API-03 | An OG (Open Graph) image generation route exists at `/og` for dynamic social sharing previews |
| API-04 | API routes use Next.js Route Handlers (App Router) |

---

## 9. Contact & Social Links

| Platform | Handle / URL |
|----------|--------------|
| Email | braswellkenneth7@gmail.com |
| Phone / WhatsApp | +233 500 181 106 |
| Portfolio | https://braswelljr.engineer |
| LinkedIn | https://www.linkedin.com/in/braswell-kenneth-870827192/ |
| GitHub | https://github.com/braswelljr |
| X (Twitter) | https://x.com/braswell_jnr |
| Instagram | https://www.instagram.com/braswell_jr/ |
| Figma | https://www.figma.com/@braswelljr |

---

## 10. Animation Requirements

| ID | Requirement |
|----|-------------|
| ANM-01 | Role cycling on the home page uses `AnimatePresence` with spring physics (`stiffness: 260, damping: 20`) |
| ANM-02 | FloatingDock social links use hover-driven scale and position animations |
| ANM-03 | Page transitions and element entrances use `slide-up-fade` keyframe animations (defined in CSS `@keyframes`) |
| ANM-04 | Playlist cards use `perspective-[50px]`, `hover:-skew-x-3`, and a `conic-gradient spin` pseudo-element animation |
| ANM-05 | The `link-underline` utility provides animated underline-on-hover for links |
| ANM-06 | All animations must respect `prefers-reduced-motion` media query |
| ANM-07 | Accordion/collapsible animations use CSS custom properties for height transitions |
| ANM-08 | The scroll-to-top button entrance/exit is animated |

---

## 11. Responsive Breakpoints

| Breakpoint | Value | Tailwind Token |
|------------|-------|----------------|
| xxs | 320px | `--breakpoint-xxs` |
| xs | 375px | `--breakpoint-xs` |
| xsm | 425px | `--breakpoint-xsm` |
| sm | 640px | (Tailwind default) |
| md | 768px | (Tailwind default) |
| lg | 1024px | (Tailwind default) |
| xl | 1280px | (Tailwind default) |
| 2xl | 1536px | (Tailwind default) |
| 3xl | 1920px | `--breakpoint-3xl` |
| 4xl | 2560px | `--breakpoint-4xl` |
| 5xl | 3840px | `--breakpoint-5xl` |
