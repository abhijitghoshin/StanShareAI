# StanShareAI

StanShareAI — a single-page marketing site demonstrating AI-driven data solutions. This repository contains the site source (static HTML/CSS/JS) and Cloudflare Pages deployment configuration.

## Latest updates
- Added a **Tailwind fallback** (inline minimal CSS) so utilities render even if the Tailwind CDN runtime is blocked.
- Implemented a **canvas-based streak particle (meteor) trail** background animation (configurable and performance-aware).
- Tuned particle frequency and behavior to be subtle and non-distracting; particles now spawn from the top and fall diagonally.
- Fixed social icon alignment (LinkedIn and others) and softened heading shimmer to avoid blinking.

## Running locally
1. Clone the repository and change into the project:

   git clone https://github.com/abhijitghoshin/StanShareAI.git
   cd StanShareAI

2. Serve the files locally (simple HTTP server):

   python3 -m http.server 8000

3. Open http://localhost:8000 in your browser to check the site.

## How to disable the particle trails (quick)
- Temporary: in the browser devtools, run: document.querySelector('.star-trail-canvas').style.display = 'none'
- Permanent: remove or comment the `<canvas class="star-trail-canvas">` element or set `.star-trail-canvas { display: none; }` in the stylesheet.

## Contributing
- Create a new branch, implement changes, and open a pull request against `main`.

---
For details, see `RELEASE_NOTES.md`.
