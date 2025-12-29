# StanShareAI Website - Complete Documentation

**Project Name:** StanShareAI Website  
**Domain:** stanshare.com  
**GitHub:** https://github.com/abhijitghoshin/StanShareAI  
**Live URL:** https://stanshareai.pages.dev  
**Date:** December 29, 2025

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Requirements](#system-requirements)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Deployment Guide](#deployment-guide)
7. [Maintenance & Updates](#maintenance--updates)
8. [Troubleshooting](#troubleshooting)
9. [Code Reference](#code-reference)

---

## Project Overview

### Description
StanShareAI is a professional single-page website showcasing AI and Machine Learning solutions for the financial services and data ecosystem. The website features a modern, minimalist black-themed design with smooth animations and responsive layout.

### Key Features
- Modern responsive design
- Smooth scroll animations
- Contact form with email integration
- Professional navigation with hover effects
- Mobile-friendly layout
- Glass-morphism UI effects
- Animated background with stars

### Brand Information
- **Company:** StanShareAI
- **Legal Entity:** RED NEURONAL ARTIFICAL TECHNOLOGY LLP
- **Address:** A-82, Indiabulls Centrum Park, Sec-103, Dualatabad, Gurgaon, Haryana, India
- **Contact:** founders@stanshare.com

---

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Custom CSS** - Animations and custom styling
- **Vanilla JavaScript** - Form handling and interactions
- **Google Fonts** - Inter font family

### Hosting & Deployment
- **GitHub** - Version control and code repository
- **Cloudflare Pages** - Static site hosting and CDN
- **Cloudflare DNS** - Domain management

### Development Tools
- **Git** - Version control
- **GitHub CLI (gh)** - GitHub authentication
- **Wrangler CLI** - Cloudflare deployment
- **VS Code** - Code editor

---

## System Requirements

### Prerequisites
- macOS, Linux, or Windows
- Node.js v16 or higher (for npm)
- Git installed
- GitHub account
- Cloudflare account (free tier sufficient)
- Domain name (stanshare.com)

### Required Software
```bash
# Homebrew (macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git
brew install git

# GitHub CLI
brew install gh

# Node.js & npm
brew install node

# Wrangler CLI
npm install -g wrangler
```

---

## Installation & Setup

### Step 1: Clone Repository

```bash
# Clone from GitHub
git clone https://github.com/abhijitghoshin/StanShareAI.git
cd StanShareAI

# Or create new project
mkdir ~/my-website
cd ~/my-website
git init
```

### Step 2: Authenticate with GitHub

```bash
# Install GitHub CLI
brew install gh

# Login to GitHub
gh auth login --web

# Follow browser prompts to authenticate
```

### Step 3: Authenticate with Cloudflare

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Follow browser prompts to authenticate
```

### Step 4: Deploy Website

```bash
# Deploy to Cloudflare Pages
wrangler pages deploy . --project-name=stanshareai

# Note the deployment URL provided
```

---

## Project Structure

```
~/my-website/
├── index.html              # Main HTML file (single-page website)
├── .gitignore             # Git ignore file
├── DEPLOYMENT.md          # Deployment instructions
├── PROJECT_DOCUMENTATION.md # This file
└── .git/                  # Git repository data
```

### File Descriptions

**index.html**
- Complete single-page website
- Includes all HTML, CSS (inline), and JavaScript
- Self-contained with CDN dependencies
- Size: ~16KB

**.gitignore**
- Excludes system files (.DS_Store)
- Excludes editor files (.vscode/, .idea/)
- Excludes environment files (.env)
- Excludes logs (*.log)

---

## Deployment Guide

### GitHub Setup

#### Create Repository
1. Go to https://github.com/new
2. Repository name: `StanShareAI`
3. Visibility: Public
4. Do NOT initialize with README
5. Click "Create repository"

#### Push Code
```bash
cd ~/my-website

# Add remote
git remote add origin https://github.com/abhijitghoshin/StanShareAI.git

# Commit and push
git add .
git commit -m "Initial commit: StanShareAI website"
git push -u origin main
```

### Cloudflare Pages Setup

#### Method 1: CLI Deployment (Used)
```bash
# Ensure you're logged in
wrangler whoami

# Deploy
wrangler pages deploy . --project-name=stanshareai

# Output will show:
# - Deployment URL: https://[hash].stanshareai.pages.dev
# - Production URL: https://stanshareai.pages.dev
```

#### Method 2: Dashboard Deployment
1. Go to https://dash.cloudflare.com
2. Navigate to "Workers & Pages"
3. Click "Create application"
4. Select "Pages" tab
5. Click "Connect to Git"
6. Select repository: `abhijitghoshin/StanShareAI`
7. Configure build:
   - Production branch: `main`
   - Build command: (leave empty)
   - Build output directory: `/`
8. Click "Save and Deploy"

### Custom Domain Setup

#### Add Domain to Cloudflare Pages
1. Go to https://dash.cloudflare.com/pages/view/stanshareai
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter: `stanshare.com`
5. Click "Continue"
6. Cloudflare configures DNS automatically
7. Wait 5-60 minutes for propagation

#### DNS Configuration
If domain is already on Cloudflare:
- Automatic DNS configuration
- CNAME record added automatically

If domain is NOT on Cloudflare:
1. Go to domain registrar
2. Update nameservers to Cloudflare's
3. Or add CNAME record:
   - Name: `@` or `stanshare.com`
   - Value: `stanshareai.pages.dev`

---

## Maintenance & Updates

### Making Changes

```bash
# Navigate to project
cd ~/my-website

# Edit index.html in VS Code
open -a "Visual Studio Code" index.html

# Make your changes and save

# Commit changes
git add .
git commit -m "Description of changes"
git push

# Changes auto-deploy in 30-60 seconds
```

### Update Workflow

1. **Edit files locally**
2. **Test locally** (open index.html in browser)
3. **Commit to Git**
4. **Push to GitHub**
5. **Cloudflare auto-deploys** (if connected to Git)
6. **Or manual deploy:** `wrangler pages deploy . --project-name=stanshareai`

### Monitoring

#### Check Deployment Status
```bash
# List projects
wrangler pages project list

# View deployments
wrangler pages deployment list --project-name=stanshareai
```

#### Check Git Status
```bash
cd ~/my-website
git status
git log --oneline -5
```

---

## Troubleshooting

### Common Issues

#### Issue: Can't push to GitHub
```bash
# Check remote URL
git remote -v

# Update if wrong
git remote set-url origin https://github.com/abhijitghoshin/StanShareAI.git

# Re-authenticate
gh auth login
```

#### Issue: Cloudflare deployment fails
```bash
# Check authentication
wrangler whoami

# Re-login
wrangler login

# Try deploy again
wrangler pages deploy . --project-name=stanshareai --commit-dirty=true
```

#### Issue: Custom domain not working
- Wait 5-60 minutes for DNS propagation
- Check DNS: https://dnschecker.org
- Verify domain is added in Cloudflare dashboard
- Ensure nameservers point to Cloudflare

#### Issue: Website not updating
```bash
# Verify push succeeded
git log -1

# Check GitHub has latest code
# Visit: https://github.com/abhijitghoshin/StanShareAI

# Manual deploy to force update
wrangler pages deploy . --project-name=stanshareai
```

### Getting Help

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Docs:** https://docs.github.com
- **Wrangler Docs:** https://developers.cloudflare.com/workers/wrangler/

---

## Code Reference

### Essential Commands

```bash
# ============================================
# GIT COMMANDS
# ============================================

# Check status
git status

# Add files
git add .
git add filename.html

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# View history
git log --oneline

# Create branch
git checkout -b branch-name

# Switch branch
git checkout main

# ============================================
# GITHUB CLI COMMANDS
# ============================================

# Login
gh auth login

# Check status
gh auth status

# Create repository
gh repo create REPO_NAME --public --source=. --remote=origin --push

# View repository
gh repo view --web

# ============================================
# CLOUDFLARE WRANGLER COMMANDS
# ============================================

# Login
wrangler login

# Check auth
wrangler whoami

# List projects
wrangler pages project list

# Deploy
wrangler pages deploy . --project-name=stanshareai

# List deployments
wrangler pages deployment list --project-name=stanshareai

# ============================================
# PROJECT COMMANDS
# ============================================

# Open in VS Code
open -a "Visual Studio Code" .

# Open index.html in browser
open index.html

# View file
cat index.html

# Check file size
ls -lh
```

### Project URLs

```bash
# GitHub Repository
https://github.com/abhijitghoshin/StanShareAI

# Cloudflare Pages
https://stanshareai.pages.dev

# Custom Domain
https://stanshare.com

# Cloudflare Dashboard
https://dash.cloudflare.com/pages/view/stanshareai

# GitHub Repo Settings
https://github.com/abhijitghoshin/StanShareAI/settings
```

---

## Website Features Documentation

### Sections

1. **Navigation Header**
   - Fixed position on scroll
   - Glass-morphism effect
   - Hover animations on links
   - Smooth scroll to sections

2. **Hero Section**
   - Animated starfield background
   - Fade-in title animation
   - Call-to-action button
   - Floating geometric shapes

3. **About Section**
   - Company description
   - Three feature cards with icons
   - Hover lift effects
   - Glass-morphism cards

4. **Contact Section**
   - Email and message form
   - Opens mailto: link on submit
   - Form validation
   - Success message display

5. **Footer**
   - Company information
   - Address with Google Earth link
   - Social media links
   - Copyright notice

### Design Specifications

**Colors:**
- Background: #000000 (Black)
- Text: #ffffff (White)
- Secondary Text: #b8b8b8 (Light Gray)
- Accents: White with opacity variations

**Typography:**
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

**Animations:**
- Float animation: 6s infinite
- Pulse animation: 3s infinite
- Slide-in: 0.8s on load
- Hover transitions: 0.3s

---

## Contact Information

### Team
- **Founder & CEO:** Abhijit Ghosh
- **Email:** founders@stanshare.com

### Support
- **Technical Issues:** Check GitHub Issues
- **Business Inquiries:** founders@stanshare.com

---

## Version History

### Version 1.0 (December 29, 2025)
- Initial website launch
- Single-page design
- GitHub integration
- Cloudflare Pages deployment
- Custom domain setup (stanshare.com)

---

## License & Copyright

© 2024 StanShare - a brand of RED NEURONAL ARTIFICAL TECHNOLOGY LLP  
All rights reserved.

---

## Converting This Document to PDF

### Option 1: Using Pandoc (Command Line)
```bash
# Install pandoc
brew install pandoc

# Convert to PDF
pandoc PROJECT_DOCUMENTATION.md -o PROJECT_DOCUMENTATION.pdf

# With custom styling
pandoc PROJECT_DOCUMENTATION.md -o PROJECT_DOCUMENTATION.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in
```

### Option 2: Using VS Code
1. Install "Markdown PDF" extension
2. Open this file in VS Code
3. Right-click → "Markdown PDF: Export (pdf)"

### Option 3: Using Online Tools
1. Copy this markdown content
2. Visit: https://www.markdowntopdf.com
3. Paste and download PDF

### Option 4: Using macOS Preview
1. Open this file in any markdown viewer
2. Print (Cmd + P)
3. Save as PDF

---

**End of Documentation**
