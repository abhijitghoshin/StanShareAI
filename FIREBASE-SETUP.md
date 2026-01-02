# Firebase Authentication Setup Guide

This guide explains how to set up Firebase authentication for StanShareAI login pages.

## Prerequisites

- Google account
- Firebase project (create at https://console.firebase.google.com)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: `StanShareAI`
4. Accept the terms and click "Create project"
5. Wait for project creation to complete

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Under "Sign-in method", enable:
   - **Google** (Required)
   - **Email/Password** (Required)

### Enable Google Sign-In

1. Click on **Google**
2. Toggle **Enable** to ON
3. Select your project from the dropdown
4. Click **Save**

### Enable Email/Password

1. Click on **Email/Password**
2. Toggle **Enable** to ON
3. Make sure "Email enumeration protection" is enabled
4. Click **Save**

## Step 3: Configure OAuth Consent Screen

For Google Sign-In to work in production:

1. Go to **Google Cloud Console** (linked from Firebase)
2. Navigate to **APIs & Services > OAuth consent screen**
3. Choose **External** user type
4. Fill in the required information:
   - **App name**: StanShareAI
   - **User support email**: your-email@example.com
   - **Developer contact**: your-email@example.com
5. Click **Save and continue**
6. Add scopes: `email`, `profile`, `openid`
7. Click **Save and continue**
8. Under Test users, add your Gmail accounts
9. Click **Save and continue**

## Step 4: Create Web App

1. In Firebase Console, click the **Settings icon** (gear) > **Project settings**
2. Click **Your apps** section
3. Click **Add app** > **Web**
4. Enter app name: `StanShare Web`
5. Check "Also set up Firebase Hosting"
6. Click **Register app**
7. Copy the Firebase configuration

## Step 5: Update Configuration

Update the Firebase config in `login.html` and `signup.html`:

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

Get these values from Firebase Console:
- Go to **Project settings** > **General**
- Scroll to "Your apps" section
- Copy the config from the web app

## Step 6: Configure Authorized Domains

1. In Firebase Console, go to **Authentication**
2. Click the **Settings** tab
3. Under "Authorized domains", add:
   - `stanshare.com`
   - `www.stanshare.com`
   - `localhost` (for development)
   - `127.0.0.1` (for development)

## Step 7: Set Up Email Verification

1. Go to **Authentication > Templates**
2. Configure **Email verification**:
   - **Subject**: Verify your StanShareAI email
   - **Custom domain**: (optional) Use custom email domain
3. Click **Save**

## Step 8: Security Rules

Set up Firestore security rules (if using Firestore):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.uid != null;
    }
    
    // Public data
    match /public/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Step 9: Set Up Password Reset Email

1. Go to **Authentication > Templates**
2. Configure **Password reset**:
   - **Subject**: Reset your StanShareAI password
   - **Custom action URL**: `https://www.stanshare.com/reset-password`
3. Click **Save**

## Step 10: Configure reCAPTCHA (Optional but Recommended)

1. Go to **Authentication > reCAPTCHA Enterprise**
2. Click **Enable** for Web
3. This helps prevent brute force attacks

## Testing

### Test Google Sign-In (Development)

1. Open `login.html` in browser
2. Click "Sign in with Google"
3. Select your test Google account
4. You should be redirected to dashboard

### Test Email/Password Sign-Up

1. Open `signup.html`
2. Fill in the form with test credentials
3. Password must meet requirements
4. Check your email for verification link
5. Click verification link
6. Return to sign in

### Test Email/Password Sign-In

1. Open `login.html`
2. Enter email and password
3. You should be redirected to dashboard

## Environment Variables

For production, use environment variables instead of hardcoding Firebase config:

```javascript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
```

Set these in your deployment environment (Cloudflare Pages, Vercel, etc.)

## Troubleshooting

### "auth/popup-blocked-by-browser"
- Allow pop-ups for stanshare.com in browser settings

### "auth/invalid-api-key"
- Verify Firebase config is correct
- Check API key is enabled in Google Cloud Console

### "auth/operation-not-allowed"
- Enable the authentication method in Firebase Console
- Wait a few minutes for changes to propagate

### "auth/email-already-in-use"
- User already has an account with this email
- Direct them to login page or password reset

### Google Sign-In not working in production
- Add domain to Authorized domains list
- Verify OAuth consent screen is configured
- Check Google Cloud project settings

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase JS SDK Docs](https://firebase.google.com/docs/reference/js/auth.html)
- [Firebase Security Best Practices](https://firebase.google.com/docs/projects/best-practices)
- [Firebase Console](https://console.firebase.google.com)
- [Google Cloud Console](https://console.cloud.google.com)

## Support

For issues with authentication, check:
1. Firebase Console > Authentication > Sign-in method (enabled?)
2. Firebase Console > Settings > Authorized domains
3. Browser console for error messages
4. Firebase documentation for specific error codes
