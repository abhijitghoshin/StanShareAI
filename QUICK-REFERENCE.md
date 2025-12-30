# Quick Reference Guide - StanShareAI

## 🎯 Key Animation Properties

### Starlink Background (`#starfield`)
```css
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
animation: fall 120s linear infinite;
```
**Key Points:** Uses `::before` for stars, `::after` for nebula, `overflow: hidden` to clip

### Data Flow Lines (`.data-flow`)
```css
position: fixed;
width: 2px;
height: 150px;
top: -150px;
animation: flowdown 4s ease-in-out infinite;
z-index: 0;
```
**Key Points:** 5 lines at 20%, 35%, 50%, 65%, 80% left positions, 0.6s stagger delay

### Keyframe Animations
```css
@keyframes fall {
  from { transform: translateY(0); }
  to { transform: translateY(33.333%); }
}

@keyframes flowdown {
  0% { top: -150px; opacity: 0; }
  20%, 80% { opacity: 1; }
  100% { top: 100vh; opacity: 0; }
}
```

---

## 📋 File Structure

```
index.html              (main page, ~930 lines)
├── <style> section     (lines 5-700: all CSS)
└── <body> section      (lines 700+: HTML structure)

Documentation/
├── README.md           (project overview)
├── ANIMATIONS.md       (animation system details)
├── ARCHITECTURE.md     (technical design)
├── CONTRIBUTING.md     (development workflow)
├── DEPLOYMENT.md       (hosting & CI/CD)
├── QUICK-REFERENCE.md  (this file)
├── RELEASE_NOTES.md    (version history)
└── DOCUMENTATION-INDEX.md (navigation guide)
```

---

## 🚀 Common Tasks

### Update Animations
1. Edit `<style>` section in `index.html` (lines 5-700)
2. Modify `@keyframes` definitions
3. Test locally: `python3 -m http.server 8000`
4. Commit: `git add index.html && git commit -m "Update - ..." && git push`
5. Live in ~90 seconds on Cloudflare

### Add New Animation Class
```css
.new-animation {
  animation: newKeyframe 3s ease-in-out infinite;
}

@keyframes newKeyframe {
  0% { /* start state */ }
  100% { /* end state */ }
}
```

### Test Animation Performance
1. Open DevTools (F12)
2. Go to "Performance" tab
3. Record animation
4. Check FPS (target: 60fps)

---

## 🎓 Learning Resources

### For Animations
→ ANIMATIONS.md (complete guide with examples)

### For Development
→ CONTRIBUTING.md (workflow, coding standards, testing)

### For Deployment
→ DEPLOYMENT.md (hosting, CI/CD, troubleshooting)

### For Architecture
→ ARCHITECTURE.md (technical design, components)

### New to Project?
→ DOCUMENTATION-INDEX.md (navigation by role)

---

## 💡 Pro Tips

1. **Always test locally before pushing** - prevents live site issues
2. **Use feature branches** - keeps main branch clean
3. **Write descriptive commit messages** - helps with history
4. **Check animations in DevTools** - ensures 60 FPS
5. **Test on mobile** - responsive design crucial
6. **Hard refresh after deployment** - clears browser cache (Cmd+Shift+R on Mac)
7. **Use Tailwind classes** - faster than custom CSS
8. **Keep index.html well-organized** - easier to maintain
9. **Verify animations use `transform` not `top`** - better performance (with exceptions for data-flow)
10. **Check z-index layering** - stars at -1, lines at 0, content at 1+

---

## 🔐 Security Notes

- ✅ No passwords or secrets in code
- ✅ Contact form uses mailto (no data stored)
- ✅ HTTPS enforced by Cloudflare
- ✅ No tracking scripts (GDPR compliant)
- ✅ Input validation on forms
- ✅ No sensitive data in comments

---

## 📊 Animation Timing Reference

| Animation | Duration | Timing Function | Delay Pattern |
|-----------|----------|-----------------|----------------|
| Starlink Stars | 120s | linear | N/A |
| Data Flow Line 1 | 4s | ease-in-out | 0s |
| Data Flow Line 2 | 4s | ease-in-out | 0.6s |
| Data Flow Line 3 | 4s | ease-in-out | 1.2s |
| Data Flow Line 4 | 4s | ease-in-out | 1.8s |
| Data Flow Line 5 | 4s | ease-in-out | 2.4s |

---

**Last Updated:** December 30, 2025 (v1.4.0)
**Status:** ✅ Production Ready
**Live URL:** https://stanshare.com
**Repository:** https://github.com/abhijitghoshin/StanShareAI

*For detailed information, see DOCUMENTATION-INDEX.md*
