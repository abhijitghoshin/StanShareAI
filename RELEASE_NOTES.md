# Release notes

## 2025-12-29 — Visual & UX updates
- Added a Tailwind runtime fallback (inline minimal CSS) to mitigate client-side runtime blocking.
- Implemented a performant canvas-based particle trail (meteor/streak) animation with tunable density and speed.
- Adjusted particle spawn behavior to originate from the top and fall downwards; reduced frequency for subtlety.
- Lengthened particle streaks and normalized tail rendering for consistent, smooth trails.
- Fixed alignment of social icons (LinkedIn etc.) and improved accessibility of footer/contact section.
- Softened heading shimmer and glow to remove blinking / perceived flicker.

## Notes
- This project is served on Cloudflare Pages (production: https://www.stanshare.com). After pushing changes to `main`, Pages will automatically deploy the site.
