# StanShareAI - Copilot Instructions

## Project Overview

StanShareAI is a **single-page marketing website** for an AI-driven financial data solutions company. The entire site is a single `index.html` file (47 KB) hosted on Cloudflare Pages with pure CSS animations and minimal vanilla JavaScript.

**Key characteristics:**
- No build tools, frameworks, or package managers
- No external dependencies except Tailwind CSS CDN
- Pure CSS animations (no JavaScript animation logic)
- Zero database, backend, or authentication
- Auto-deploys to production on git push to `main`

---

## Architecture at a Glance

### Three-Layer Z-Index System

The page uses fixed z-index layering for visual composition:

```
z-index: 1   → .content-wrapper (all page content: nav, sections, footer)
z-index: 0   → .data-flow (5 animated vertical lines - visual effect)
z-index: -1  → .space-bg (animated starfield background)
```

**Critical rule:** Order and z-index values must never change—visual design depends on exact layering.

### File Structure

| Component | Lines | Purpose |
|-----------|-------|---------|
| HEAD meta tags | 1-100 | SEO, Open Graph, Tailwind CDN |
| CSS animations | 201-403 | All keyframes, fallback utilities |
| Body structure | 441-456 | Z-index layers (space-bg, data-flow, content-wrapper) |
| Navigation | 457-500 | Header with 4 nav links |
| Hero section | 501-600 | Title with shimmer, CTA button |
| About section | 601-686 | Mission statement, 3-column grid |
| Team section | 687-760 | 6 team members with role-based SVG avatars |
| Solutions section | 761-799 | 4 service cards |
| Contact form | 800-875 | Email input + textarea, mailto handler |
| Footer | 876-902 | Company info, social links |
| JavaScript | 903-927 | Contact form handler only |

---

## Animation System (CSS-Only)

### Why CSS, Not JavaScript?

- **Performance:** 60 FPS on compositor thread, no layout thrashing
- **Simplicity:** No IntersectionObserver, no dynamic class toggling
- **Reliability:** No bugs from timing races or visibility checks

### Three Active Animations

#### 1. Starfield Background (.space-bg)
- **Duration:** 120 seconds (very slow, subtle)
- **Effect:** Stars flow top-to-bottom using `translateY` transform
- **Z-index:** -1 (stays behind content)
- **Position:** fixed (doesn't affect scroll)
- **Key detail:** Uses `::before` pseudo-element for star layers

#### 2. Data Flow Lines (.data-flow)
- **Count:** 5 lines at left positions: 20%, 35%, 50%, 65%, 80%
- **Duration:** 4 seconds per cycle
- **Delays:** Staggered 0.6s apart (0s, 0.6s, 1.2s, 1.8s, 2.4s)
- **Effect:** Lines appear above viewport (-100vh) and flow to middle (50vh)
- **Z-index:** 0 (behind text/images)
- **Opacity fade:** Smooth entrance/exit effect

#### 3. Hero Shimmer + Fade-in Classes
- **Shimmer:** Linear gradient moves left-to-right on hero title
- **Fade-in variants:** `.fade-in`, `.fade-in-left`, `.fade-in-right`, `.scale-in`
- **Duration:** 0.8 seconds
- **Timing:** ease-out (no `!important` for shimmer, but `!important` for fade-in classes)

### Animation Best Practices

✅ **Do:**
- Use `!important` ONLY for state-dependent animations (fade-in classes)
- Use `animation` property (never `transition`)
- Apply `animation-delay` inline for staggered effects
- Keep animations tied to fixed/absolute positioned elements
- Test in DevTools Animations tab to verify 60 FPS

❌ **Don't:**
- Add `@media` queries inside `@keyframes`
- Use JavaScript to toggle animation classes dynamically
- Mix `animation` and `transition` on same element
- Change z-index values or positioning model after deployment
- Use transform animations on relative-positioned elements without `position: relative`

---

## Responsive Design Strategy

### Mobile-First CSS

All default styles target **< 640px** (small phones). Then use `@media` breakpoints:

```css
/* Default: mobile */
.container { grid-template-columns: 1fr; padding: 1rem; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container { grid-template-columns: repeat(2, 1fr); padding: 2rem; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container { max-width: 1200px; grid-template-columns: repeat(3, 1fr); }
}
```

### Tailwind Breakpoints Used

- No prefix = default (mobile)
- `md:` = 768px (tablets)
- `lg:` = 1024px (desktops)

Example: `class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"` creates responsive grid.

---

## Form Handling (Contact Form)

### Current Implementation: Mailto

**HTML:**
```html
<form id="contactForm" onsubmit="handleContactForm(event)">
  <input type="email" id="email" required />
  <textarea id="message" required></textarea>
  <button type="submit">Send Message</button>
  <div id="confirmationMessage" class="hidden">Message sent successfully!</div>
</form>
```

**JavaScript (lines 903-927):**
```javascript
function handleContactForm(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const subject = encodeURIComponent("Website Inquiry");
  const body = encodeURIComponent(message);
  
  window.location.href = `mailto:founders@stanshare.com?subject=${subject}&body=${body}`;
  
  document.getElementById('confirmationMessage').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('confirmationMessage').classList.add('hidden');
  }, 5000);
}
```

**Key points:**
- Uses `encodeURIComponent()` for safe URL encoding (XSS prevention)
- Opens user's default email client (no backend needed)
- Shows confirmation for 5 seconds then hides
- Email destination: `founders@stanshare.com`

**Limitation:** Won't work if user has no default email client. Future alternative: Cloudflare Workers serverless function.

---

## Tailwind CSS Strategy

### Primary: CDN Runtime (Recommended)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

- Version 3.4.17
- Downloaded at page load
- Scans HTML for utility classes and generates CSS on-the-fly
- Allows dynamic class usage (e.g., JavaScript-generated classes)

### Fallback: Inline CSS (Lines 101-200)

```html
<style id="tailwind-fallback">
  /* Core utilities: typography, layout, spacing, colors */
  .text-7xl { font-size: 4.5rem; }
  .grid { display: grid; }
  /* ...etc */
</style>
```

- Ensures basic styling if CDN blocked/unavailable
- NOT complete Tailwind (too large for inline)
- Covers essential classes for layout and text

**Priority order:** CDN runtime first, then inline fallback, then custom CSS animations.

---

## External Dependencies & URLs

### Required (Must Work)

1. **Tailwind CSS CDN** - `https://cdn.tailwindcss.com` (v3.4.17)
2. **Google Fonts Preconnect** - `https://fonts.googleapis.com` and `https://fonts.gstatic.com`

### Optional (Graceful Degradation)

- Tailwind prebuilt CSS: `https://cdn.jsdelivr.net/npm/tailwindcss@3.4.17/dist/tailwind.min.css`

### None Recommended (Already No Dependencies)

- No React, Vue, Angular, Next.js
- No chart libraries, animation libraries, UI frameworks
- No Google Analytics or tracking

---

## Development & Deployment Workflow

### Local Development

```bash
# Clone repo
git clone https://github.com/abhijitghoshin/StanShareAI.git
cd my-website

# Serve locally
python3 -m http.server 8000

# Open http://localhost:8000 in browser
```

No build step needed—just edit `index.html` and refresh.

### Git Workflow

1. Create feature branch from `main`: `git checkout -b feature/description`
2. Edit `index.html` (and docs as needed)
3. Test locally: Animations, responsiveness, form submission
4. Commit with descriptive message: `git commit -m "Feature: description"`
5. Push to origin: `git push origin feature-branch`
6. Open Pull Request with summary
7. Merge to `main` when approved

### Deployment (Automatic)

```
Git push → GitHub → Cloudflare webhook → Build (< 60s) → Deploy to CDN
```

- Live at https://stanshare.com within 60-90 seconds
- No manual deployment needed
- Cloudflare handles SSL, caching, edge distribution

---

## Common Tasks & Patterns

### Adding New Section

1. **Add HTML** before closing `</div class="content-wrapper">`
2. **Add fade-in animation:** `class="fade-in"`
3. **Ensure responsive:** Use Tailwind grid/flex utilities with `md:`, `lg:` prefixes
4. **Test mobile:** View in DevTools responsive mode

Example:
```html
<section id="new-feature" class="fade-in">
  <div class="container">
    <h2 class="text-3xl md:text-5xl">New Feature</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Cards here -->
    </div>
  </div>
</section>
```

### Modifying Animations

1. **Edit @keyframes** in lines 201-403 (CSS section)
2. **Test in DevTools:** F12 → Animations tab → play/slow-motion
3. **Check performance:** No janky movement or flashing
4. **Verify z-index:** Doesn't overlap wrong layers

Example animation modification:
```css
@keyframes fall {
  from { 
    transform: translateY(0); 
  }
  to { 
    transform: translateY(33.333%);  /* Adjust this % to change distance */
  }
}
```

### Updating Team Section

Team section (lines 687-760) has 6 members with role-based SVG avatars.

**Avatar meanings:**
- CEO (Abhijit) → Crown icon (leadership)
- CTO (Chandan) → Code brackets <> (technology)
- Culture (Abantika) → Network of people (connections)
- Marketing (Sparsh) → Megaphone (communication)
- CFO (Dilip) → Bar chart (financial data)
- Co-founder (Abhishikta) → Star (excellence)

To add/remove members:
1. Duplicate a member `<div class="team-member">` block
2. Update name, role, and SVG icon
3. Keep grid responsive: `class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6"`

### Modifying Styles

- **Colors:** Edit inline color utilities in CSS (`.text-white`, `.bg-blue-500`)
- **Spacing:** Use Tailwind classes (`px-4 md:px-8`, `py-6`, `gap-4`)
- **Typography:** Use font-size classes (`.text-lg`, `.text-2xl`, `.font-bold`)
- **Fallback:** Also update inline CSS (lines 101-200) if adding new colors/sizes

---

## Code Quality & Conventions

### CSS Standards

- ✅ Use Tailwind utilities first (avoid custom CSS)
- ✅ BEM naming for custom classes (`.hero__title`, `.btn--primary`)
- ✅ Comment complex animations with "why" and "how"
- ✅ Use `!important` sparingly (only animations)
- ✅ Group properties logically (position/sizing, then display, then colors)

### JavaScript Standards

- ✅ Keep it minimal (contact form only)
- ✅ Use vanilla JavaScript (no jQuery/libraries)
- ✅ Clear variable names (`email`, `message`, not `e`, `m`)
- ✅ Validate input before use
- ✅ Use `encodeURIComponent()` for URL params (XSS prevention)

### HTML Standards

- ✅ Semantic tags (`<nav>`, `<section>`, `<footer>`)
- ✅ Proper heading hierarchy (`<h1>` once, then `<h2>`, `<h3>`)
- ✅ ARIA labels for accessibility (`aria-label`)
- ✅ Meta tags for SEO (description, keywords, Open Graph)
- ✅ Structured data (Schema.org JSON-LD in head)

### Commit Message Convention

```
[Type]: [Description]

Feature: New functionality
Fix: Bug fix or issue resolution
Docs: Documentation updates
Style: Code formatting/organization
Refactor: Code restructuring
STEP: Multi-step implementation
Hotfix: Production emergency fix
```

Examples:
- `Feature: Add testimonials section`
- `Fix: Starfield animation jank on mobile Safari`
- `Docs: Update ARCHITECTURE.md with new sections`
- `Hotfix: Contact form email encoding bug`

---

## Testing Checklist

Before committing/pushing to main:

- [ ] **Visual:** All sections visible, text readable, images scale
- [ ] **Responsive:** Test at 375px (mobile), 768px (tablet), 1024px (desktop)
- [ ] **Animations:** DevTools Animations tab shows smooth 60 FPS
- [ ] **Links:** All navigation links scroll to correct sections
- [ ] **Form:** Contact form opens email client with pre-filled subject/body
- [ ] **Accessibility:** Tab navigation works, heading hierarchy correct
- [ ] **Performance:** Lighthouse > 95 (performance)
- [ ] **Offline:** Fallback CSS renders if Tailwind CDN unavailable
- [ ] **Browsers:** Chrome, Firefox, Safari, Edge (not IE11)

---

## Key Files & Documentation

| File | Purpose |
|------|---------|
| `index.html` | Single-file entire site (930 lines) |
| `README.md` | Project overview, quick start |
| `ARCHITECTURE.md` | Technical design, file structure, components |
| `ANIMATIONS.md` | Animation system, keyframes explained |
| `CONTRIBUTING.md` | Contribution workflow, standards |
| `CODE-COMMENTS.md` | Inline comment specification |
| `DEPLOYMENT.md` | Hosting, deployment process |
| `RELEASE_NOTES.md` | Change history |
| `wrangler.jsonc` | Cloudflare Pages config |
| `.github/workflows/` | CI/CD (if exists) |

---

## Performance Targets

- **File size:** < 50 KB (currently 47 KB)
- **Load time:** < 2 seconds
- **First Contentful Paint:** < 1 second
- **Lighthouse Performance:** > 95
- **Animation FPS:** 60 FPS constant
- **Cumulative Layout Shift:** < 0.05

---

## When to Escalate/Document

1. **Major architectural changes** (new framework, backend, database) → Update ARCHITECTURE.md
2. **Animation performance issues** → Debug in DevTools, document in ANIMATIONS.md
3. **Breaking CSS changes** → Test all breakpoints, update RELEASE_NOTES.md
4. **New external dependencies** → Document in this file and README.md
5. **Security fixes** → Create hotfix branch, commit with "Hotfix:" prefix

---

## Quick Reference: Common Mistakes

❌ **Mistake:** Adding JavaScript animation triggers
✅ **Fix:** Use CSS `animation` property with `@keyframes`

❌ **Mistake:** Changing z-index values
✅ **Fix:** Keep -1, 0, 1 stack unchanged; use > 10 for modals only

❌ **Mistake:** New styles without responsive breakpoints
✅ **Fix:** Default to mobile, use `md:`, `lg:` for larger screens

❌ **Mistake:** Using external JS libraries (jQuery, GSAP, etc.)
✅ **Fix:** Write minimal vanilla JS or use CSS-only solutions

❌ **Mistake:** Forgetting to update documentation
✅ **Fix:** Edit README.md, ARCHITECTURE.md, or RELEASE_NOTES.md with code changes

---

## Contact & Questions

- **GitHub:** https://github.com/abhijitghoshin/StanShareAI
- **Email:** founders@stanshare.com
- **Live site:** https://stanshare.com

---

**Last Updated:** January 2, 2026  
**Status:** ✅ Production-Ready  
**Maintained By:** StanShare AI Team
