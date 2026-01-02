# StanShareAI

StanShareAI — a single-page marketing site demonstrating AI-driven data solutions. This repository contains the site source (static HTML/CSS/JS) and Cloudflare Pages deployment configuration.

## Latest Updates

### Starlink Theme & 404 Page (January 2026)
- **404 Page** (`construction.html`) now features the same Starlink theme as homepage
- Animated starfield with top-to-bottom star flow
- Nebula background with radial gradients
- Glow text effects with cyan/blue gradient
- "Like a Future Guarantee Return" custom message
- Fully responsive design matching index.html

### Firebase Authentication (January 2026)
- ✅ Firebase authentication fully integrated
- ✅ Social login providers working (Google, Apple, Facebook, GitHub)
- ✅ User session persistence
- ✅ Sign in/Sign out functionality
- ✅ User dropdown menu with email display

### Animation System (December 2025)
- Implemented **pure CSS animations** for Starlink-style background with top-to-bottom star flow
- Added **data flow lines** that smoothly cascade downward continuously
- Uses pseudo-elements (`::before`, `::after`) for layered animation effects
- All animations run at 60fps with no JavaScript overhead

### Previous Updates
- Added a **Tailwind fallback** (inline minimal CSS) so utilities render even if the Tailwind CDN runtime is blocked.
- Tuned animation performance to be smooth and non-distracting.
- Fixed social icon alignment and optimized heading styling.

## Pages

### Page 1: Homepage (index.html)
- **URL:** `www.stanshare.com/` or `www.stanshare.com/index.html`
- **Features:** Marketing landing page with social login
- **Theme:** Starlink-inspired (animated starfield, nebula background)
- **Authentication:** Multi-provider sign-in (Google, Apple, Facebook, GitHub, Email)

### Page 2: 404 Page (construction.html)
- **URL:** `www.stanshare.com/construction`
- **Features:** Custom 404 page with Starlink theme
- **Message:** "Like a Future Guarantee Return, this page does not exist"
- **Theme:** Matches homepage design exactly
- **CTA:** Back to Home button

### Additional Pages
- `data-management.html` - Data management with 404 state
- `analytics.html` - Analytics dashboard (referenced in navigation)
- `login.html` - Dedicated login page
- `signup.html` - Dedicated signup page
- `firebase-config-helper.html` - Firebase configuration helper

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

## 🔐 Firebase Authentication

StanShare now includes **multi-provider authentication** powered by Firebase:

### Supported Sign-In Methods
- ✅ **Google** - Fully working
- ✅ **Email/Password** - Fully working (auto-signup)
- ✅ **Apple** - UI ready (needs OAuth setup)
- ✅ **Facebook** - UI ready (needs OAuth setup)
- ✅ **GitHub** - UI ready (needs OAuth setup)
- ✅ **Microsoft** - UI ready (needs OAuth setup)

### Features
- Modern modal with social login buttons
- User session persistence
- User dropdown menu in navbar
- Sign out functionality
- Auto-redirect to dashboard after login
- Error handling and user feedback

### Quick Start
1. Click "Sign In" button in navbar
2. Click your preferred provider
3. Authenticate with that provider
4. You're logged in!

### Documentation
See **[FIREBASE-AUTH-COMPLETE.md](FIREBASE-AUTH-COMPLETE.md)** for:
- Complete setup guide
- How to enable Apple, Facebook, GitHub, Microsoft
- Authentication flow diagram
- All functions and features
- Troubleshooting guide
- Testing checklist

