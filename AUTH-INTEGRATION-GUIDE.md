# StanShare Website - Firebase Authentication Integration Guide

## Quick Start

You have two ready-to-use authentication components:

### 1. **auth-button.html** - Embed in Your Website
A self-contained authentication module that adds a "Sign In / Sign Up" button to your existing website.

**Where to add it:** After the "Solutions" link in your navigation menu

### 2. **construction.html** - Post-Login Page
A professional "under construction" page that displays after users sign in.

---

## Integration Steps

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Under **Your apps**, find your web app
5. Copy the Firebase config object

### Step 2: Add Firebase SDK to Your Website Header

Add this to the `<head>` section of your main website:

```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js"></script>
```

### Step 3: Add Auth Button to Navigation

Copy the entire content of `auth-button.html` into your website's HTML where you want the login button to appear (after "Solutions" link).

**Important:** Update the Firebase config in the script section:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",          // From Firebase Console
    authDomain: "YOUR_AUTH_DOMAIN",  // e.g., myproject.firebaseapp.com
    projectId: "YOUR_PROJECT_ID",    // e.g., my-project-12345
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 4: Set Up Post-Login Page (Optional)

If you want to redirect users after login:

1. Host `construction.html` at `/construction` or `/dashboard`
2. Update the redirect URL in `auth-button.html`:
   ```javascript
   // Change this line in showSuccessAndRedirect():
   window.location.href = '/construction.html';
   ```

Or keep the current behavior (shows welcome alert with account info).

---

## What's Included

### auth-button.html Features
✅ Google Sign-In button  
✅ Email/Password authentication  
✅ User account menu (when logged in)  
✅ Clean, responsive modal dialog  
✅ Error handling  
✅ Auto sign-out button  
✅ Remember me option  

### construction.html Features
✅ Professional under-construction design  
✅ Shows user's email  
✅ Feature preview cards  
✅ Sign-out functionality  
✅ Mobile responsive  
✅ Requires Firebase authentication  

---

## Firebase Configuration Checklist

Before deploying, ensure:

- [ ] Google Sign-In is enabled in Firebase Authentication
- [ ] Email/Password auth is enabled in Firebase Authentication
- [ ] Your domain is added to authorized domains:
  - Go to **Authentication > Settings**
  - Add your domain to the authorized domains list
  - Include `localhost` for local testing
- [ ] Firebase credentials are updated in both HTML files
- [ ] OAuth consent screen is configured (for Google Sign-In)

---

## Testing Locally

1. **Test with Google Sign-In:**
   - Open the page in your browser
   - Click "Sign In / Sign Up"
   - Click "Sign in with Google"
   - You should see the welcome alert

2. **Test with Email/Password:**
   - Click "Use email instead"
   - Enter any email and password
   - First-time users will auto-register
   - Subsequent logins will require the same password

3. **Test User Menu:**
   - After signing in, you should see "Account" button
   - Click it to see dropdown with Sign Out option

---

## Customization Options

### Change Button Text
In `auth-button.html`, find:
```html
<button id="authButton" class="auth-button" onclick="openAuthModal()">
    Sign In / Sign Up
</button>
```

### Change Button Color
Modify the CSS:
```css
.auth-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Modal Title
In `auth-button.html`, find:
```html
<h2 style="...">Welcome</h2>
<p style="...">Sign in to access StanShare</p>
```

### Redirect After Login
In `showSuccessAndRedirect()` function:
```javascript
// Instead of alert, use:
window.location.href = '/construction.html';
```

---

## File Structure

```
/tmp/StanShareAI/
├── auth-button.html          # Embed this in your website
├── construction.html         # Post-login page
├── FIREBASE-SETUP.md         # Setup documentation
├── FIREBASE-SETUP-QUICK.md   # Quick reference
├── login.html                # Full login page (optional)
├── signup.html               # Full signup page (optional)
└── dashboard.html            # Dashboard template (optional)
```

---

## Troubleshooting

### "Sign in with Google" button doesn't work
- Check that Google Sign-In is enabled in Firebase Console
- Verify your domain is in the authorized domains list
- Check browser console (F12) for error messages

### Email signup creates new account every time
- This is intentional! First login creates account, second login uses existing
- If you want strict password rules, configure them in Firebase

### User menu doesn't appear after signing in
- Clear browser cache
- Check Firebase config is correct
- Open browser console to see error messages

### Modal doesn't open
- Check Firebase SDK is loaded
- Verify JavaScript has no errors (F12 console)
- Ensure `firebaseConfig` is defined

---

## Next Steps

1. ✅ Get your Firebase credentials
2. ✅ Update the Firebase config in both HTML files
3. ✅ Copy `auth-button.html` content into your website
4. ✅ Test Google Sign-In and Email signup
5. ✅ Deploy to your production domain
6. ✅ Add your domain to Firebase authorized domains

---

## Support

For Firebase issues: https://firebase.google.com/docs/auth  
For Google Sign-In: https://firebase.google.com/docs/auth/web/google-signin  
For troubleshooting: Check browser console (F12) for detailed error messages

---

**Last Updated:** January 2, 2026  
**Status:** ✅ Ready for Production
