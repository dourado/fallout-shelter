# Fallout Shelter — Vault Layout Guide

Guia visual otimizado para construir o vault perfeito em Fallout Shelter. Layout de endgame, posicionamento de cada sala, build order do zero ao endgame.

**Live:** [fallout-shelter.vercel.app](https://fallout-shelter.vercel.app)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Layout completo do vault comWaiting for Perf2 to be ready so we can complete the deployment. todas as salas posicionadas |
| `/guia` | Guia passo a passo do zero ao endgame (milestones + room list) |
| `/rooms/:slug` | Pagina individual de cada sala (25 salas) com instrucoes e vault miniatura |

## Stack

Zero dependencies. HTML + CSS + vanilla JS. Deployed on Vercel.

- **~34 KiB** de codigo total (shared/)
- **69 KiB** page weight (com fonts)
- **7-10 requests** por pagina

## Project Structure

```
├── index.html                  # Layout page (vault diagram)
├── favicon.svg                 # Vault Boy silhouette favicon
├── vercel.json                 # cleanUrls: true
├── guia/
│   └── index.html              # Guide page (milestones + room list)
├── rooms/
│   └── *.html                  # 25 individual room detail pages
└── shared/
    ├── rooms.js                # Room data + buildVault() renderer
    ├── room-detail.js          # Room detail page renderer
    ├── vault.css               # Vault diagram styles
    ├── room-detail.css         # Room detail styles
    └── styles.css              # Global styles (nav, body, fonts)
```

## Lighthouse Scores

Tested across all 27 pages (May 2026):

| Category | Desktop | Mobile |
|----------|---------|--------|
| Accessibility | 100 | 100 |
| SEO | 100 | 100 |
| Best Practices | 100 | 96 |
| Performance | 97-100 | 89-100 |

## Development

No build step. Open `index.html` in a browser or serve locally:

```bash
npx serve .
```

Deploy is automatic on push to `main` via Vercel.

## License

MIT
