# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is the VRS:NSMV website (Sacred and Black Neo-Classical Piano project) built with modern web technologies.

### Svelte Application

A modern SvelteKit application using:
- **Svelte 5** (latest) with new runes syntax (`$state`, `$props`, `$bindable`)
- **SvelteKit 2.49.2** with Node adapter (`@sveltejs/adapter-node`)
- **TypeScript** for type safety
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Vite 7** as the build tool
- **pnpm** as the package manager

**Key files:**
- `src/routes/+page.svelte` - Main page with all sections (Hero, Performances, Album, About, Contact)
- `src/routes/+layout.svelte` - Root layout with ScrollToTop component
- `src/routes/layout.css` - Tailwind v4 theme with custom colors and fonts
- `src/app.html` - HTML template with SEO meta tags and Adobe Typekit
- `svelte.config.js` - SvelteKit configuration with Node adapter
- `vite.config.ts` - Vite config with Tailwind v4 integration

**Component Structure:**
- `src/lib/components/Header.svelte` - Navigation header with scroll-based state switching
- `src/lib/components/MobileMenu.svelte` - Hamburger menu for mobile devices (<990px)
- `src/lib/components/ScrollToTop.svelte` - Fixed scroll-to-top button (appears after 500px scroll)
- `src/lib/components/PerformanceList.svelte` - Tour dates listing (4 hardcoded events)
- `src/lib/components/AlbumInfo.svelte` - Album artwork, Bandcamp player, and metadata
- `src/lib/components/ContactCard.svelte` - Booking contact information
- `src/lib/components/Footer.svelte` - Copyright and address footer

**Utilities:**
- `src/lib/utils/smoothScroll.ts` - Smooth scroll helper for navigation links

**Content Sections:**
1. **Hero** (`#wrapper`) - Full-screen VRS:NSMV logo with glitch animation on hero-logo.jpg background
2. **Performances** (`#tour`) - List of 4 tour dates (2022-2024) with venue info and ticket links
3. **Latest Release** (`#album`) - Vade Retro album artwork, Bandcamp player, and metadata
4. **About** (`#about`) - "Sacred and Black Neo-Classical Piano" description with background overlay
5. **Contact** (`#contact`) - Booking & Management contact card (Markus Herhoffer)
6. **Footer** - Copyright and address information

## Development Commands

```bash

# Install dependencies
pnpm install

# Development server
pnpm dev
pnpm dev -- --open  # Open in browser

# Type checking
pnpm check
pnpm check:watch

# Linting & Formatting
pnpm lint           # Check with Prettier and ESLint
pnpm format         # Auto-format with Prettier

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Build & Deployment

- Production builds output a Node.js server (via `@sveltejs/adapter-node`)
- Run `pnpm build` to create the production build
- The built application can be started with Node.js from the build output

## Architecture Notes

**Svelte 5 Patterns:**
- Uses new runes syntax: `$state()` for reactive state, `$props()` for component props, `$bindable()` for two-way bindings
- Example: `let visible = $state(false);` instead of `let visible = false;`
- Snippets rendered with `{@render children()}` in layouts

**Styling with Tailwind CSS v4:**
- Custom theme defined in `layout.css` using `@theme` directive
- Custom colors: `--color-primary: #ff5252`, `--color-dark: #13181d`
- Custom fonts: pragmatapro-fraktur (headings), Open Sans (body), Source Code Pro (mono)
- Icon fonts: fontello and Socicon loaded via `@font-face` in layout.css
- No `tailwind.config.js` file (Tailwind v4 uses `@theme` in CSS instead)

**Interactive Features:**
- Smooth scroll navigation between sections with offset (-60px for header)
- Header state changes at 500px scroll: transparent → white background
- Scroll-to-top button appears at 500px scroll
- Mobile hamburger menu with slide-down animation (<990px breakpoint)
- Menu auto-closes on navigation link click

**SSR Considerations:**
- AlbumInfo iframe wrapped in `{#if browser}` to prevent hydration errors
- Import `browser` from `$app/environment` for client-only rendering
- This pattern needed because Svelte 5 SSR cannot hydrate iframe elements

**Asset Management:**
- Static assets in `static/` directory (images, fonts, favicons)
- Images copied from legacy without optimization (4MB+ hero image preserved)
- Adobe Typekit loaded via `<link>` in `app.html`

**Technical Stack:**
- File-based routing via SvelteKit (`src/routes/`)
- Node adapter for SSR (`@sveltejs/adapter-node`)
- TypeScript with strict checking enabled
- ESLint with Svelte plugin and Prettier integration
- Hot module reloading via Vite dev server

## Git Workflow

- Main branch: `master`
- GitHub Actions automatically builds Docker images on push to master
- Conventional commit prefixes used in history: 🌱 (seed), ✨ (feature), 👷 (build), ⬆️ (deps)

## Important Notes

- **Package Manager:** Use `pnpm` for dependency management
- **Performance Data:** The 4 performance entries in `PerformanceList.svelte` are hardcoded from 2022-2024 events
- **Browser Testing:** Always test in Chrome browser during development to catch hydration and rendering issues early
