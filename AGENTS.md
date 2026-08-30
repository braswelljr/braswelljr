# braswelljr.engineer

This file provides guidance to coding agents working in this repository. It is the
only AGENTS.md in the tree.

Personal site: a portfolio, a blog built on fumadocs MDX, and a Spotify "listen with
me" page. It is a single Next.js App Router application with no backend of its own:
route handlers under `src/app/api/` proxy GitHub and Spotify, which is where every
credential lives.

`CLAUDE.md` is a generated one-line pointer at this file (`@AGENTS.md`), written and
restored by `next dev`. Edit this file, never that one.

## Tech stack

| Layer         | Technology                                              |
| ------------- | ------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack)                      |
| Language      | TypeScript 5.9, React 19                                |
| Styling       | Tailwind CSS v4 via `@tailwindcss/postcss`              |
| Content       | fumadocs MDX, Shiki, twoslash                           |
| Data fetching | TanStack Query                                          |
| URL state     | nuqs                                                    |
| Motion        | `motion/react` (Framer Motion), GSAP for scroll set-ups |
| Editor        | TipTap (`components/ui/minimal-tiptap`)                 |
| Package man.  | pnpm, pinned via `packageManager`                       |

TypeScript is pinned to `^5.9.3` on purpose. TypeScript 7 ships the Go compiler and
no longer exposes the JavaScript compiler API, which twoslash and typescript-eslint
both require. Do not raise it.

## Commands

| Task       | Command         |
| ---------- | --------------- |
| Dev server | `pnpm dev`      |
| Build      | `pnpm build`    |
| Lint       | `pnpm lint`     |
| Autofix    | `pnpm lint:fix` |
| Format     | `pnpm format`   |

**pnpm, not npm.** The lockfile is `pnpm-lock.yaml` and `packageManager` is pinned.

A change is not done until `pnpm build` exits 0. It runs the type check, so a green
build is the real gate, not `tsc` alone.

## Repository layout

```bash
content/blog/          MDX posts. Frontmatter schema lives in source.config.ts
docs/                  Hand-written prose
lib/                   Framework-agnostic helpers (cn, rehype plugins)
types/                 Ambient and shared types
src/
  api/                 Data layer, see "API layer" below
  app/                 Routes. (home) is the portfolio group.
    api/               Route handlers. Every secret lives here, never in a component.
  components/
    ui/                Atoms and molecules. See components/README.md for the inventory.
    shared/            Organisms used across pages (navbar, search, motion, status screens)
    snippets/          Self-contained demo components used by blog posts
    toolbars/          Editor toolbars
  config/              Static config and server-side credential accessors
  hooks/               Reusable React hooks
  providers/           The provider tree (base.tsx) and theme
  store/               Zustand stores
  styles/main.css      The single stylesheet: Tailwind theme, tokens, utilities
  utils/               App-specific helpers
```

## API layer (`src/api/`)

Domain based. Every domain exposes the same three files:

```text
<domain>/services.ts   raw async functions naming concrete endpoints
<domain>/queries.ts    TanStack Query read hooks, each taking an `options` argument
<domain>/types.ts      domain types
```

Infrastructure sits beside them: `client.ts` (fetch transport, envelope unwrapping,
timeouts), `query-client.ts` (the shared `QueryClient` and the `QueryOptions` type),
`query-keys.ts` (hierarchical keys), `refresh.ts` (named staleness tiers), and
`errors/` (typed `ApiError` with `isApiError` narrowing).

- **Components call hooks. Non-React code calls services.** Nothing else calls `fetch`.
- **Secrets never reach the browser.** A `NEXT_PUBLIC_` variable is compiled into the
  client bundle, so treat it as published. The GitHub token and the Spotify refresh
  token are read server side through `src/config/`, and only route handlers touch them.
- **A route handler must not hand out a credential either.** A public endpoint that
  returns a live access token is the same leak with extra steps.
- **Staleness comes from the `refresh.ts` tiers**, not from numbers at each call site.
  GitHub allows 60 requests per hour unauthenticated, so authenticate and poll in
  minutes rather than seconds.
- **Every key is declared in `query-keys.ts`.** Never inline an array.
- TanStack Query is the only data client. Do not add SWR back.

## Rule: build the UI from atoms upward

**Components follow atomic design.** Compose small named pieces. Never assemble a
screen out of raw markup.

| Level        | Is                              | Example here                                 |
| ------------ | ------------------------------- | -------------------------------------------- |
| **Atom**     | One indivisible element         | `Button`, `Badge`, `Spinner`, `Kbd`          |
| **Molecule** | A few atoms acting as one unit  | `Frame` and its parts, `Empty`, `ViewMore`   |
| **Organism** | A distinct section of a screen  | `Contributions`, `Navbar`, `StatusScreen`    |
| **Template** | Page layout arranging organisms | `app/layout.tsx`, `(home)/projects/page.tsx` |

`components/ui/` holds atoms and molecules. `components/shared/` and route-local
`_components/` folders hold organisms. Pages under `app/` are templates: they arrange
organisms and own the data.

- **Never skip a level.** A component is classified by what it is, not by the folder it
  sits in. An "atom" with three internal elements and layout logic is a molecule.
- **Components are presentational.** Data in via props, events out via callbacks. The
  test: could it render in isolation with mock props? Fetching and mutating is the
  page's job. Nothing in `components/ui/` fetches, reads global state, or imports from
  `app/`.
- **Compose, do not add flags.** Reach for `Frame > FramePanel + FrameFooter`, not a
  fifteenth boolean prop. A variant is a new composition, not another branch. Where a
  genuine variant is needed it comes from `cva`, not from branching in JSX.
- **Everything takes `className` and merges it with `cn()`**, so a caller can always
  override. Forward refs and spread the remaining props on anything wrapping a DOM node.
- **Tokens only, never raw values.** Colour, spacing, typography and radii come from the
  tokens in `src/styles/main.css`. No `#ff4e32` and no `8px` in a component.
- **Check the component inventory first, every time.** `src/components/README.md` lists
  every component and what it exports. Read it before writing a new one, and name the
  ones you are composing. Regenerate it with `pnpm components:list`.
- **Use what exists.** If the inventory has it, compose it. If it nearly has it, compose
  it and pass a `className` rather than forking it. A hand-rolled `<table>` beside the
  existing `DataTable`, or a second empty state beside `Empty`, is the failure this rule
  exists to prevent.
- **Route-private components live in `_components/` next to the route.** Promote to
  `components/shared/` only on the second consumer.
- **Keys are derived from data** (`item.id`), never from the array index. Index keys make
  React reuse the wrong instance the moment a list is filtered, sorted, or paginated.

## Rule: the markup says what the thing is

**Write semantic HTML.** The element carries the meaning, classes carry only the
appearance. A screen reader, a search crawler and the next reader of the file all take
the structure from the tags, and a page built out of `<div>` says nothing to any of them.

- **Reach for the element that names the content.** `<button>` for an action,
  `<a>`/`<Link>` for a destination, `<ul>`/`<li>` for a list, `<table>` with `<caption>`,
  `<th scope>` and `<tbody>` for tabular data, `<dl>` for label and value pairs, `<time>`
  for a date, `<blockquote>` for a quotation. A `<div>` with `onClick` is not a button:
  it has no focus, no keyboard, and no role.
- **Landmarks and headings before ARIA.** Sections are `<section>`, `<aside>`, `<nav>`,
  `<header>`, `<footer>`, `<main>`, each with a heading or an `aria-label` when there is
  no visible one. Do not add a `role` that repeats the tag you could have used.
- **Headings describe the outline, not the type size.** One `<h1>` per page and no
  skipped levels. A heading meant to look smaller is a class on the right level, not the
  wrong level.
- **Images carry an `alt`.** Descriptive when the image says something, `alt=""` when it
  is decoration. Give a remote image `width`/`height` so the page does not shift when it
  lands, and `loading="lazy"` below the fold.
- **Emphasis is semantic.** `<strong>` and `<em>`, never `<b>` or `<i>` for weight or slant.
- **Group form controls.** Inputs have a `<label htmlFor>`, related controls sit in one
  `<form>` with an accessible name. Placeholder text is not a label.
- **Decoration is hidden.** Icons that repeat adjacent text are `aria-hidden`. An icon
  that is the only content of a control needs an `aria-label`.
- **Order matters.** DOM order is reading order. Do not reorder with CSS what should have
  been written in the order it is read.

## Styling

**Tailwind only.** No `style={{ ... }}`, no CSS-in-JS, and no stylesheet other than
`src/styles/main.css`.

The one legitimate exception is a value that does not exist at build time, such as a
colour returned by an API. The Tailwind compiler scans source text, so it cannot generate
a class for a runtime string. Pass the value as a custom property and keep the paint in
Tailwind:

```tsx
<span
  className="size-3 rounded-full bg-(--lang-color)"
  style={{ '--lang-color': repo.language.color } as React.CSSProperties}
/>
```

Anything static, including gradients, masks, animation delays and data-URI backgrounds,
belongs in an `@utility` in `main.css` or in an arbitrary-value class.

### Colour

- `primary` (`#ff4e32`, coral) and `secondary` (`#ff9c08`, amber) are the brand, both
  with full 50 to 950 scales. The signature treatment is the gradient headline:
  `bg-linear-to-l from-secondary to-primary bg-clip-text text-transparent dark:to-primary`.
- `ember-yellow`, `ember-amber`, `ember-coral`, `ember-magenta` and `ember-teal` extend
  the brand across the status screens. `ember-teal` is the single cold accent, present so
  those screens do not read as one orange wash. Use it sparingly.
- Neutrals are `neutral-*`. Dark mode is class based,
  `@custom-variant dark (&:is(.dark *))`, driven by next-themes.
- Font tokens follow a `--font-*-face` (the raw `@font-face`) to `--font-*` (the Tailwind
  token) split. Never point a token at itself: `--font-mono: var(--font-mono)` is a cycle
  that silently disables the utility.

### Rule: a dark step mirrors its light one

**When a utility has both a light and a dark class on the same colour scale, the dark
step is the light step's mirror.** The scale folds in the middle:

| light    | 50  | 100 | 200 | 300 | 400 | 500 |
| -------- | --- | --- | --- | --- | --- | --- |
| **dark** | 950 | 900 | 800 | 700 | 600 | 500 |

and the same in reverse, so `600` pairs with `400`, `900` with `100`, `950` with `50`. It
reads as one decision made twice rather than two decisions that happen to sit together,
and it keeps a surface the same distance from its background in both modes.

```tsx
// Yes
'bg-neutral-100 dark:bg-neutral-900';
'text-neutral-600 dark:text-neutral-400';

// No: the dark step is not the mirror, so the contrast shifts between modes
'bg-neutral-100 dark:bg-neutral-800';
```

This does not cover a class with no counterpart (`dark:bg-neutral-800/80` alone is a
deliberate dark-only choice), or a pair that crosses scales
(`text-neutral-950 dark:text-white` is choosing a different colour, not a different step).

Every colour needs a `dark:` counterpart. Check both themes before calling a change done.

## Motion

`motion/react`. Wrapped primitives and shared variants live in
`components/shared/motion.tsx`. Import from there rather than re-wrapping.

Emil Kowalski's animation rules ship as a skill at `.claude/skills/emilkowal-animations/`.
**Load it before writing or reviewing any animation.** The rules that bind hardest here:

- **`ease-out` by default**, using the shared `EASE_OUT` curve rather than a built-in CSS
  keyword.
- **Under 300ms for UI.** 500ms only for drawer-scale movement. Faster reads as more
  responsive.
- **Animate `transform` and `opacity` only.** Anything else risks layout on the main thread.
- **Press is `scale(0.97)`.** Never animate from `scale(0)`.
- **Every animation needs a purpose.** A frequently repeated interaction should be nearly
  instant, or not animated at all.
- **Never animate a keyboard-initiated action.**
- **Honour `prefers-reduced-motion`** through `safeVariants(variants, isReduced)` or
  `useReducedMotion()`. Decorative CSS animation gets a `data-*` hook that one media query
  can switch off wholesale, as `data-ember` does.
- **`whileInView` is only for content that is on screen when it mounts.** If an
  interaction reveals items below the fold, drive `animate` directly. Otherwise they sit
  at `opacity: 0` until the visitor happens to scroll and the interaction looks broken.

## URL state

`nuqs` is the default for anything a visitor would reasonably link to or come back to:
filters, sort, search, expanded sections, pagination.

- Parsers take `.withDefault(...)` and `.withOptions({ clearOnDefault: true })` so a
  default view stays a clean URL.
- Validate enumerations with `parseAsStringLiteral`. A bogus `?sort=` must fall back
  rather than break the page.
- Throttle free text with `throttleMs`.
- `useSearchParams`, which every nuqs hook reads, **forces a Suspense boundary or the
  build fails**. `providers/base.tsx` wraps the whole tree as a backstop, but a page that
  wants its static HTML must wrap the specific subtree that reads URL state, because React
  bails out to client rendering at the nearest boundary.

## Status screens

`app/loading.tsx`, `app/not-found.tsx`, `app/error.tsx` and `app/global-error.tsx`, built
on `components/shared/status-screen.tsx` and `ember.tsx`.

- Error boundaries are Client Components, and Next 16 names the recovery prop **`retry`**,
  not `reset`.
- Surface `error.digest`. In production the message is deliberately generic, and the digest
  is the only handle that matches the server logs.
- `global-error.tsx` replaces the root layout: it ships its own `<html>` and `<body>`, must
  import the stylesheet itself, and gets no theme provider, so it restores the `.dark`
  class with a small inline script.

## Conventions

- **No wrapper abstractions.** Call libraries directly at each call site rather than
  introducing a thin indirection module around them.
- **No em dashes** in prose or code comments. Write complete sentences.
- **Emptiness is `< 1`, not `=== 0`.** Write `items.length < 1`. It reads as "nothing
  here" rather than as an exact count, and it holds when the value is negative or comes
  from a subtraction that produced `NaN`.
- **Delete buttons are `variant="destructive"`.** Never a ghost or outline button tinted
  red with a `text-red-600!` class: the variant already carries the colour, the hover and
  the dark mode. An icon-only delete needs an `aria-label` naming what it deletes.
- Prettier runs through ESLint. Run `pnpm lint:fix` before finishing.
- Imports are sorted by `@ianvs/prettier-plugin-sort-imports`. Let it do the ordering.
- Path aliases: `@/*` to `src/*`, plus `lib/*`, `types/*`, and `@content-source/*` to
  `.source/*`.
- `.source/` is fumadocs build output. Never edit it, and it stays lint-ignored.
- Prefer deleting dead code to leaving it. An unused provider still costs a request on
  every page load.

## Important files

- `src/providers/base.tsx`: the whole provider tree and the Suspense backstop
- `src/api/index.ts`: the data layer's public surface
- `src/api/query-keys.ts`: every cache key
- `src/config/github.ts`, `src/config/spotify.ts`: server-side credential accessors
- `src/styles/main.css`: the Tailwind theme, every token, and the custom utilities
- `src/components/shared/motion.tsx`: motion-wrapped primitives and shared variants
- `src/components/README.md`: the component inventory
- `source.config.ts`: MDX pipeline, frontmatter schema, Shiki and twoslash setup

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
