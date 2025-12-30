# StanShareAI

StanShareAI — a single-page marketing site demonstrating AI-driven data solutions. This repository contains the site source (static HTML/CSS/JS) and Cloudflare Pages deployment configuration.

## Latest Updates

### Animation System (December 2025)
- Implemented **pure CSS animations** for Starlink-style background with top-to-bottom star flow
- Added **data flow lines** that smoothly cascade downward continuously
- Uses pseudo-elements (`::before`, `::after`) for layered animation effects
- All animations run at 60fps with no JavaScript overhead

### Previous Updates
- Added a **Tailwind fallback** (inline minimal CSS) so utilities render even if the Tailwind CDN runtime is blocked.
- Tuned animation performance to be smooth and non-distracting.
- Fixed social icon alignment and optimized heading styling.

## Visual Features

### Starlink Background Animation
- **ID:** `#starfield`
- **Duration:** 120 seconds
- **Effect:** Stars flow continuously from top to bottom
- **Layers:** 6 star patterns + nebula gradient overlay

### Data Flow Lines
- **Class:** `.data-flow`
- **Duration:** 4 seconds per cycle
- **Effect:** Vertical lines cascade downward with staggered timing
- **Count:** 5 lines at different horizontal positions (20%, 35%, 50%, 65%, 80%)

## Running Locally

1. Clone the repository and change into the project:

   ```bash
   git clone https://github.com/abhijitghoshin/StanShareAI.git
   cd StanShareAI
   ```

2. Serve the files locally (simple HTTP server):

   ```bash
   python3 -m http.server 8000
   ```

3. Open http://localhost:8000 in your browser to check the site.

## Development

All animation code is in `index.html` within the `<style>` section. No external animation libraries are used.

See `ANIMATIONS.md` for detailed animation specifications and `ARCHITECTURE.md` for overall design documentation.

## Contributing

- Create a new branch, implement changes, and open a pull request against `main`.
- Refer to `CONTRIBUTING.md` for development guidelines.

---

For detailed release history, see `RELEASE_NOTES.md`.
