# Quick Reference Guide

**StanShare AI Website Documentation** | Fast lookup for common tasks

---

## 🚀 Deployment

### Push Changes to Production
```bash
git add index.html
git commit -m "Feature: description here"
git push origin main
# Wait 60-90 seconds → live at https://stanshare.com
```

### Check Deployment Status
1. Cloudflare Dashboard: https://dash.cloudflare.com
2. Pages → StanShareAI → Deployments
3. View build logs if deployment fails

### Rollback to Previous Version
```bash
git revert HEAD
git push origin main
```

---

## 📝 Adding Content

### Add New Section
```html
<!-- Add this template to index.html -->
<section id="my-section" class="fade-in">
  <div class="container px-4 md:px-8">
    <h2 class="text-3xl md:text-4xl font-bold">Section Title</h2>
    <!-- Content here -->
  </div>
</section>
```

### Update Navigation Link
Add to nav bar (around line 470):
```html
<a href="#my-section">Section Name</a>
```

### Update Team Member
Template at lines 687-760:
```html
<div class="team-member fade-in-left">
  <div class="team-avatar">
    <svg width="60" height="60" viewBox="0 0 60 60">
      <!-- SVG icon -->
    </svg>
  </div>
  <h3 class="team-name">Name</h3>
  <p class="team-role">Title</p>
</div>
```

---

## 🎨 Animations

### Available Animation Classes
```css
.fade-in           /* Opacity + translateY */
.fade-in-left      /* Opacity + translateX from left */
.fade-in-right     /* Opacity + translateX from right */
.scale-in          /* Opacity + scale */
```

### Add Animation to Element
```html
<div class="fade-in">Content appears with animation</div>
```

### View Animations in Browser
1. Open DevTools: F12
2. Go to Animations tab
3. Play animations frame-by-frame
4. Adjust timing if needed

---

## 🧪 Testing

### Before Pushing to Main
1. Test locally: `open index.html`
2. DevTools: F12 → Console (no errors?)
3. Animations: F12 → Animations tab (60 FPS?)
4. Mobile: DevTools → Responsive Design Mode
5. Contact form: Fill & test submission

### Responsive Breakpoints
- **Mobile:** 320px - 640px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Lighthouse Check
```
Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+
```

---

## 🔧 Debugging

### Animation Not Playing?
1. Check element has animation class
2. DevTools → Elements → Check computed styles
3. Verify no conflicting CSS
4. Check z-index layering

### Styling Not Applying?
1. Check specificity (might be overridden)
2. DevTools → Computed tab shows applied styles
3. Add `!important` if necessary (rare)

### JavaScript Error?
1. F12 → Console tab
2. Error message shows line number
3. Check handleContactForm() exists (contact form)

### Layout Looks Wrong?
1. Hard refresh: Cmd+Shift+R or Ctrl+Shift+R
2. Clear cache: F12 → Application → Clear site data
3. Check responsive breakpoint correct

---

## 📊 Performance

### Current Metrics
- Load time: < 2 seconds ✅
- Lighthouse: 98/100 ✅
- File size: 47 KB ✅
- No external assets (except Tailwind CDN) ✅

### After Changes
1. Check Lighthouse score still 95+
2. Verify animations still 60 FPS
3. Check page load time < 2 seconds
4. Test on mobile device

---

## 🌐 Responsive Design

### Mobile-First Approach
- Write default styles for mobile
- Use `@media (min-width: 768px)` for tablet+
- Use `@media (min-width: 1024px)` for desktop

### Tailwind Responsive Syntax
```html
<!-- Classes apply at different breakpoints -->
<div class="text-lg md:text-2xl lg:text-3xl">
  Text size: small on mobile, medium on tablet, large on desktop
</div>

<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  1 column on mobile, 2 on tablet, 3 on desktop
</div>
```

---

## 🎯 Common Tasks

### Change Email Address
Find line ~920 in JavaScript:
```javascript
window.location.href = `mailto:founders@stanshare.com?...`
// Change to your email
```

### Update Company Address
Find footer section (lines 800+):
```html
<!-- Update address text here -->
```

### Change Colors
Use Tailwind classes:
```html
<div class="bg-blue-600 text-white">...</div>
<!-- Change bg-blue-600 to desired color -->
```

### Add New Social Link
In footer, add:
```html
<a href="https://your-platform.com" target="_blank">
  <!-- SVG icon here -->
</a>
```

---

## 📚 Documentation

### Finding Answers
- **Project overview** → README.md
- **Architecture details** → ARCHITECTURE.md
- **Animation system** → ANIMATIONS.md
- **How to contribute** → CONTRIBUTING.md
- **Deployment** → DEPLOYMENT.md
- **Code comments** → CODE-COMMENTS.md
- **Documentation index** → DOCUMENTATION-INDEX.md

### Quick Answers
| Question | Document | Section |
|----------|----------|---------|
| How do I add a feature? | CONTRIBUTING.md | Common Tasks |
| How do animations work? | ANIMATIONS.md | Overview |
| Where is X in the code? | ARCHITECTURE.md | File Structure |
| How do I deploy? | DEPLOYMENT.md | Deployment Process |
| What's the tech stack? | README.md | Tech Stack |
| How do I set up locally? | README.md | Getting Started |

---

## ⚡ Git Commands

### Create Feature Branch
```bash
git checkout -b feature/my-feature
```

### Check Changes
```bash
git status           # See what changed
git diff            # See detailed changes
git diff --staged   # See staged changes
```

### Commit & Push
```bash
git add index.html
git commit -m "Feature: Add new section"
git push origin feature/my-feature
```

### Switch Branches
```bash
git checkout main              # Switch to main
git checkout feature/my-feature # Switch to your feature
```

### View Commit History
```bash
git log --oneline          # Last 10 commits
git log --oneline -5       # Last 5 commits
git show e0b088f           # View specific commit
```

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| https://stanshare.com | Live website |
| https://github.com/abhijitghoshin/StanShareAI | Repository |
| https://dash.cloudflare.com | Deployment dashboard |
| https://cdn.tailwindcss.com | Tailwind CSS CDN |

---

## 👥 Team Contacts

| Role | Contact |
|------|---------|
| Founder & CEO | Abhijit Ghosh |
| Head of Technology | Chandan Gupta |
| General Inquiries | founders@stanshare.com |
| Website Questions | Slack #website channel |

---

## ✅ Pre-Push Checklist

Before running `git push origin main`:

- [ ] Code tested locally
- [ ] No console errors (F12 → Console)
- [ ] Responsive design works (DevTools)
- [ ] Animations run smoothly (DevTools → Animations)
- [ ] Contact form tested
- [ ] All links work
- [ ] Commit message is descriptive
- [ ] Ready for public release

---

## 📱 Browser Support

| Browser | Min Version | Support |
|---------|-------------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| iOS Safari | 14+ | ✅ Full |
| Chrome Android | 6+ | ✅ Full |

---

## 🆘 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Site not updating | Hard refresh (Cmd+Shift+R) |
| Animation not playing | Check DevTools Animations tab |
| Form not submitting | Check email validation, DevTools Console |
| Layout broken | Check responsive breakpoint |
| Deployment failed | Check Cloudflare Build Logs |
| Colors look wrong | Check browser cache, hard refresh |

---

## 📋 File Locations (Key Lines)

| Section | Lines | File |
|---------|-------|------|
| Head & Meta | 1-100 | index.html |
| CSS Animations | 201-403 | index.html |
| Navigation | 457-500 | index.html |
| Hero Section | 501-600 | index.html |
| Team Section | 687-760 | index.html |
| Contact Form | 800-875 | index.html |
| JavaScript | 903-927 | index.html |

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
6. **Hard refresh after deployment** - clears browser cache
7. **Use Tailwind classes** - faster than custom CSS
8. **Keep index.html well-organized** - easier to maintain

---

## 🔐 Security Notes

- ✅ No passwords or secrets in code
- ✅ Contact form uses mailto (no data stored)
- ✅ HTTPS enforced by Cloudflare
- ✅ No tracking scripts (GDPR compliant)
- ✅ Input validation on forms
- ✅ No sensitive data in comments

---

**Last Updated:** December 29, 2025
**Status:** ✅ Production Ready
**Live URL:** https://stanshare.com
**Repository:** https://github.com/abhijitghoshin/StanShareAI

*For detailed information, see DOCUMENTATION-INDEX.md*
