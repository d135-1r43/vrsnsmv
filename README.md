# 🎹 VRS:NSMV

Official website for **VRS:NSMV** (Sacred and Black Neo-Classical Piano), showcasing performances, releases, and booking information.

## Technology Stack

- **Svelte 5** with new runes syntax (`$state`, `$props`, `$bindable`)
- **SvelteKit 2.49.2** with Node adapter
- **TypeScript** for type safety
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **Vite 7** as the build tool
- **pnpm** as the package manager

## Development

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start and open in browser
pnpm dev -- --open
```

The development server will start at `http://localhost:5173`

### Available Commands

```bash
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

## Features

- **Hero Section** - Full-screen logo with glitch animation
- **Performances** - Tour dates with venue info and ticket links
- **Latest Release** - Album artwork and Bandcamp player integration
- **About Section** - Project description with styled background
- **Contact** - Booking and management information
- **Responsive Design** - Mobile-first with hamburger menu (<990px)
- **Smooth Scrolling** - Navigation between sections with offset
- **Dynamic Header** - State changes on scroll (transparent → white)
- **Scroll-to-Top Button** - Appears after 500px scroll

## Build & Deployment

The application uses `@sveltejs/adapter-node` for SSR:

```bash
pnpm build
```

The production build outputs a Node.js server that can be started directly.

## Technical Notes

### Svelte 5 Patterns

- Uses new runes syntax: `$state()` for reactive state, `$props()` for props
- SSR hydration: iframe elements wrapped in `{#if browser}` blocks
- Snippets rendered with `{@render children()}` in layouts

### Tailwind CSS v4

- Custom theme defined in `layout.css` using `@theme` directive
- No `tailwind.config.js` file (Tailwind v4 configuration lives in CSS)
- Custom colors: `--color-primary: #ff5252`, `--color-dark: #13181d`
- Custom fonts loaded via `@font-face` and Adobe Typekit

## License

All rights reserved. For obvious reasons not available under a free licence. 
