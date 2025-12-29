# GitHub and Cloudflare Deployment Guide

## Step 1: Push to GitHub

### Create GitHub Repository
1. Go to https://github.com/new
2. Name your repository (e.g., "my-website")
3. **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

### Connect Local Repository to GitHub
Run these commands in your terminal:

```bash
cd ~/my-website

# Add your GitHub repository as remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push your code
git branch -M main
git push -u origin main
```

**Example:**
If your GitHub username is `johndoe` and repository is `my-website`:
```bash
git remote add origin https://github.com/johndoe/my-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Cloudflare Pages

### Method A: Connect via Cloudflare Dashboard (Recommended)

1. **Sign in to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Create account or log in

2. **Create Pages Project**
   - Click "Workers & Pages" in sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Connect to Git"

3. **Connect GitHub**
   - Click "Connect GitHub"
   - Authorize Cloudflare to access your repos
   - Select your repository (`my-website`)

4. **Configure Build**
   - **Project name**: my-website (or your preferred name)
   - **Production branch**: main
   - **Framework preset**: None
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
   - Click "Save and Deploy"

5. **Wait for Deployment**
   - First deployment takes 1-2 minutes
   - You'll get a URL like: `my-website-xxx.pages.dev`

### Method B: Using Wrangler CLI (Alternative)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy your site
cd ~/my-website
wrangler pages deploy . --project-name=my-website
```

## Step 3: Connect Custom Domain to Cloudflare

### Option A: Domain Already on Cloudflare

1. In your Pages project, click "Custom domains"
2. Click "Set up a custom domain"
3. Enter your domain (e.g., `example.com` or `www.example.com`)
4. Click "Continue"
5. Cloudflare will automatically configure DNS
6. Wait 2-5 minutes for propagation

### Option B: Domain NOT on Cloudflare

#### Transfer DNS to Cloudflare (Recommended)

1. **Add Site to Cloudflare**
   - Go to Cloudflare dashboard
   - Click "Add a site"
   - Enter your domain
   - Choose Free plan
   - Click "Continue"

2. **Update Nameservers**
   - Cloudflare will show you 2 nameservers
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS/Nameserver settings
   - Replace existing nameservers with Cloudflare's
   - Save changes

3. **Wait for Propagation**
   - Can take 24-48 hours
   - Cloudflare will email when complete

4. **Connect Domain to Pages**
   - Follow "Option A" steps above

#### Using CNAME (Without Transferring DNS)

1. In Cloudflare Pages project, click "Custom domains"
2. Click "Set up a custom domain"
3. Enter subdomain (e.g., `www.example.com`)
4. Cloudflare shows CNAME record to add
5. Go to your domain's DNS provider
6. Add CNAME record:
   - **Name**: `www` (or your subdomain)
   - **Value**: `my-website-xxx.pages.dev`
7. Wait 5-60 minutes for propagation

## Step 4: Enable HTTPS

Cloudflare Pages automatically provides:
- ✅ Free SSL/TLS certificate
- ✅ HTTPS enabled by default
- ✅ HTTP to HTTPS redirect

No configuration needed!

## Step 5: Automatic Deployments

Every time you push to GitHub:
```bash
cd ~/my-website
git add .
git commit -m "Update website"
git push
```

Cloudflare automatically:
1. Detects the push
2. Deploys new version
3. Updates your site (30-60 seconds)

## Quick Reference Commands

```bash
# Check Git status
git status

# Add and commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push

# View remote URL
git remote -v

# Open website in browser
open index.html
```

## Troubleshooting

### Can't push to GitHub
```bash
# Check remote URL
git remote -v

# If wrong, update it
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### Need to authenticate
```bash
# Use GitHub CLI
brew install gh
gh auth login

# Or create Personal Access Token
# GitHub → Settings → Developer settings → Personal access tokens
# Use token as password when pushing
```

### Cloudflare deployment fails
- Ensure all files (HTML, CSS, JS) are in root directory
- Check build output directory is set to `/`
- Verify no build command is specified

### Custom domain not working
- Wait 5-60 minutes after DNS changes
- Check DNS records are correct
- Use https://dnschecker.org to verify propagation

## Your Project Location

```
~/my-website/
├── index.html
├── styles.css
├── script.js
├── .gitignore
└── .git/
```

## Next Steps

1. ✅ Git repository initialized
2. ⏳ Push to GitHub (follow Step 1)
3. ⏳ Deploy to Cloudflare (follow Step 2)
4. ⏳ Connect custom domain (follow Step 3)

Need help? Feel free to ask!
