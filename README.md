# EcoFood (Frontend)

EcoFood is a frontend-only food ordering UI built with React + Vite. It showcases a modern menu browsing experience with category filtering, cart interactions, and a simple place-order flow.

## Live Demo

- https://nabilkhan-01.github.io/EcoFood/

## Highlights

- Category-based menu filtering
- Cart with `+ / −` quantity controls and remove action
- Place Order page with delivery form + order summary
- Per-item descriptions + dynamic star ratings
- Accessibility improvements (keyboard navigation + better ARIA labels)
- Optimized hero image formats (AVIF/WebP with PNG fallback)

## Tech Stack

- React 18
- React Router
- Vite
- CSS (component-level styles)

## Getting Started

### Install

```bash
npm install
```

### Run (Dev)

```bash
npm run dev
```

### Build (Production)

```bash
npm run build
```

### Preview (Production build locally)

```bash
npm run preview
```

## Useful Scripts

- `npm run lint` – run ESLint
- `npm run optimize:images` – generate `public/header_img.webp` and `public/header_img.avif`

## Deployment (GitHub Pages)

This repo is configured for GitHub Pages with Vite base path `/EcoFood/`.

```bash
npm run deploy
```

## Resume-ready bullets (example)

- Built a responsive React (Vite) food-ordering SPA with category filtering and cart state management using Context.
- Implemented a checkout UI with order summary + form validation, dynamic star ratings, accessibility enhancements, and AVIF/WebP hero image optimization.
