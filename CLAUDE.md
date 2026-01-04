# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo for the VRS:NSMV website (Sacred and Black Neo-Classical Piano project) containing two implementations:

- **`svelte/`** - Modern SvelteKit application with Svelte 5 and Tailwind CSS v4 (current/active)
- **`legacy/`** - Original static HTML/CSS/JS website with Gulp build system (archived)

**Migration Status:** ✅ Complete - All content and features migrated from legacy to Svelte app

### Svelte Application (`svelte/`)

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

### Legacy Application (`legacy/`)

Static website built with Gulp, using BrowserSync for development and vinyl-ftp for deployment.

**Key files:**
- `index.html` - Main static HTML page
- `album-single.html` - Album detail page template
- `gulpfile.js` - Build tasks (dev server, FTP deployment)
- `Dockerfile` - Nginx-based container setup
- `docker-compose.yml` - Local Docker development

## Development Commands

### Svelte (Modern Stack)

```bash
cd svelte

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

### Legacy Application

```bash
cd legacy

# Install dependencies
npm install

# Development server (BrowserSync)
gulp dev

# Deploy via FTP (uses credentials in gulpfile.js)
gulp deploy

# Docker local build
docker-compose up
```

## Build & Deployment

### Svelte Application
- Production builds output a Node.js server (via `@sveltejs/adapter-node`)
- Run `pnpm build` to create the production build
- The built application can be started with Node.js from the build output

### Legacy Application
- **Docker:** GitHub Actions workflow builds and pushes to `ghcr.io/d135-1r43/vrsnsmv:latest` on push to master
- **FTP:** Legacy deployment uses `gulp deploy` task with vinyl-ftp (credentials in gulpfile.js)
- **Local:** Docker Compose runs nginx container on port 8080

## Architecture Notes

### Svelte Application

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

### Legacy Application
- Single-page static site with smooth scrolling sections
- Sections: Hero, Performances (tour), Latest Release (album), About, Contact
- Uses Bootstrap grid, Flexslider for image carousels, Magnific Popup for modals
- Custom fonts loaded via Adobe Typekit

## Git Workflow

- Main branch: `master`
- GitHub Actions automatically builds Docker images on push to master
- Conventional commit prefixes used in history: 🌱 (seed), ✨ (feature), 👷 (build), ⬆️ (deps)

## Important Notes

- **Package Manager:** Use `pnpm` for the Svelte app, `npm` for legacy
- **FTP Credentials:** The legacy gulpfile.js contains FTP credentials - these should be moved to environment variables
- **Migration Complete:** All content, assets, and interactive features have been migrated from legacy to Svelte app
- **Performance Data:** The 4 performance entries in `PerformanceList.svelte` are hardcoded from 2022-2024 events
- **Browser Testing:** Always test in Chrome browser during development to catch hydration and rendering issues early
