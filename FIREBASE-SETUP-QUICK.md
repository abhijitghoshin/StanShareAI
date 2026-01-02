# Firebase Project Setup - Step by Step

## ✅ Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: **`StanShareAI`**
4. Click **Continue**
5. Select or create a Google Cloud project (recommended: use default)
6. Accept terms and click **Create project**
7. Wait for project to initialize (1-2 minutes)

---

## ✅ Step 2: Enable Authentication

Once your project is created:

1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"** or **"Sign-in method"**
3. You'll see the Sign-in method tab

### Enable Google Sign-In:
1. Click on **"Google"** in the list
2. Toggle **"Enable"** to ON
3. Select your project email (should be auto-selected)
4. Click **"Save"**

### Enable Email/Password:
1. Click on **"Email/Password"**
2. Toggle **"Enable"** to ON
3. Keep "Email enumeration protection" enabled
4. Click **"Save"**

---

## ✅ Step 3: Get Firebase Configuration

1. Click the **Settings icon** (⚙️) in top-left
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Web"** icon (</>) to add web app
5. Enter app name: **`StanShare Web`**
6. Check **"Also set up Firebase Hosting"** (optional)
7. Click **"Register app"**

### Copy Configuration:
You'll see a code block like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "stanshareai-xxxx.firebaseapp.com",
  projectId: "stanshareai-xxxx",
  storageBucket: "stanshareai-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

**Copy this entire config** - you'll need it soon!

---

## ✅ Step 4: Configure OAuth Consent Screen

To enable Google Sign-In in production:

1. From Firebase Console, click **Settings** (⚙️) > **Project settings**
2. Click **"Google Cloud Console"** link at bottom
3. In new tab, go to **"APIs & Services"** > **"OAuth consent screen"**
4. Select **"External"** user type
5. Click **"Create"**

### Fill in the form:
- **App name:** StanShareAI
- **User support email:** your-email@gmail.com
- **Developer contact:** your-email@gmail.com
- Click **"Save and continue"**

### Add scopes:
- Click **"Add or remove scopes"**
- Search for and select:
  - `email`
  - `profile`
  - `openid`
- Click **"Update"** > **"Save and continue"**

### Add test users:
- Under "Test users", click **"Add users"**
- Add your Gmail address(es)
- Click **"Save and continue"**

---

## ✅ Step 5: Update Your Login Pages

Now paste your Firebase config into your HTML files:

### For **login.html**:
Open the file and find this section:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Replace with your actual config from Step 3.

### For **signup.html**:
Do the same - find and replace the firebaseConfig object.

### For **dashboard.html**:
Do the same - find and replace the firebaseConfig object.

---

## ✅ Step 6: Add Authorized Domains

Back in Firebase Console:

1. Go to **Authentication**
2. Click **Settings** tab (gear icon)
3. Scroll to **"Authorized domains"**
4. Click **"Add domain"**
5. Add these domains:
   - `stanshare.com`
   - `www.stanshare.com`
   - `localhost` (for testing)
   - `127.0.0.1` (for testing)

Click **Add** for each one.

---

## ✅ Step 7: Test Locally

1. Copy your files to local directory or use a local server:
   ```bash
   # Start simple Python server
   python3 -m http.server 8000
   # Or using Node
   npx http-server
   ```

2. Open **http://localhost:8000/login.html**
3. Click **"Sign in with Google"**
4. Select your test Gmail account
5. Should be redirected to dashboard.html

---

## ✅ Step 8: Configure Email Templates (Optional)

In Firebase Console:

1. Go to **Authentication** > **Templates**
2. Configure these email templates:

### Email Verification:
- **Subject:** `Verify your StanShareAI email`
- Keep custom domain empty for now
- Click **Save**

### Password Reset:
- **Subject:** `Reset your StanShareAI password`
- **Custom action URL:** `https://www.stanshare.com/reset-password`
- Click **Save**

---

## ✅ Step 9: Enable reCAPTCHA (Recommended)

For security, enable reCAPTCHA:

1. In Firebase, go to **Authentication**
2. Click **reCAPTCHA Enterprise**
3. Click **Enable**
4. Select **Web** for your web app
5. Click **Create assessment**

---

## 📋 Quick Reference

**Firebase Console URL:**
https://console.firebase.google.com

**Your Project Dashboard:**
https://console.firebase.google.com/project/YOUR_PROJECT_ID/overview

**Copy your config from:**
Project Settings > Your Apps > Web App

**Get your credentials from:**
Authentication > Sign-in method

---

## 🧪 Testing Checklist

- [ ] Firebase project created
- [ ] Google Sign-In enabled
- [ ] Email/Password enabled
- [ ] Firebase config copied to HTML files
- [ ] Authorized domains added
- [ ] Tested Google Sign-In locally
- [ ] Tested email signup locally
- [ ] Email verification working
- [ ] Dashboard loads after login

---

## 🆘 Troubleshooting

### "auth/invalid-api-key"
- Check API key is correct in config
- Make sure domain is added to Authorized domains

### "auth/popup-blocked-by-browser"
- Allow pop-ups for localhost in browser
- Google Sign-In requires pop-up window

### Google Sign-In button not working
- Check Internet connection
- Check Firebase config is correct
- Check browser console for errors

### "auth/unauthorized-domain"
- Add domain to Authorized domains in Firebase
- Wait a few minutes for changes to propagate

---

## 📚 Next Steps

1. ✅ Finish Firebase setup (above)
2. Create password reset page (`reset-password.html`)
3. Create onboarding page (`onboarding.html`)
4. Add Firestore database (optional)
5. Set up user profiles
6. Deploy to production

---

## 🔗 Helpful Links

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase JS SDK](https://firebase.google.com/docs/reference/js/auth.html)
- [Google Cloud Console](https://console.cloud.google.com)

**Questions?** Check the browser console (F12) for error messages!
