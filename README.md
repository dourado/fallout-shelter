# Fallout Shelter — Vault Layout Guide

Optimized visual guide for building the perfect vault in Fallout Shelter. Endgame layout, room placement, and build order from scratch to endgame.

Available in **English** and **Portuguese (BR)**.

**Live:** [fallout-shelter.vercel.app](https://fallout-shelter.vercel.app)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full vault layout with all rooms positioned |
| `/guide` | Step-by-step guide from scratch to endgame (milestones + room list) |
| `/rooms/:slug` | Individual room page (25 rooms) with instructions and vault miniature |
| `/pt-br/...` | Portuguese (BR) version of all pages above |

## Stack

Zero dependencies. HTML + CSS + vanilla JS. Deployed on Vercel.

- **~40 KiB** total code (shared/)
- **69 KiB** page weight (with fonts)
- **7-10 requests** per page

## Project Structure

```
├── index.html                  # EN layout page (vault diagram)
├── favicon.svg                 # Vault Boy favicon
├── vercel.json                 # cleanUrls: true
├── guide/
│   └── index.html              # EN guide page (milestones + room list)
├── rooms/
│   └── *.html                  # 25 EN room detail pages
├── pt-br/
│   ├── index.html              # PT layout page
│   ├── guide/
│   │   └── index.html          # PT guide page
│   └── rooms/
│       └── *.html              # 25 PT room detail pages
└── shared/
    ├── i18n.js                 # getLang() + UI string dictionary (EN/PT)
    ├── lang-detect.js          # Auto-redirect pt-BR browsers to /pt-br/
    ├── rooms.js                # Room data (EN/PT) + buildVault() renderer
    ├── room-detail.js          # Room detail page renderer
    ├── guide.js                # Guide page logic (milestones, room list)
    ├── vault.css               # Vault diagram styles
    ├── room-detail.css         # Room detail styles
    └── styles.css              # Global styles (nav, footer, fonts)
```

## i18n

- English is the default language at `/`
- Portuguese (BR) lives under `/pt-br/`
- `getLang()` picks language from URL path (`/pt-br` prefix → PT, otherwise EN)
- Room data and UI strings are shared via `rooms.js` and `i18n.js`
- First-time visitors with `pt-BR` browser language are auto-redirected
- Language toggle in page footer

## Lighthouse Scores

Tested across all 54 pages (May 2026):

| Category | Desktop | Mobile |
|----------|---------|--------|
| Accessibility | 100 | 100 |
| SEO | 100 | 100 |
| Best Practices | 100 | 96 |
| Performance | 97-100 | 89-100 |

## Development

No build step. Serve locally:

```bash
npx serve .
```

Deploy is automatic on push to `main` via Vercel.

## License

MIT
