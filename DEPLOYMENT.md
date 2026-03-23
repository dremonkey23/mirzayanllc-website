# Mirzayan LLC Website - Deployment Guide

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name it `mirzayanllc-website` (or `dremonkey23.github.io` for user site)
3. Set to **Public**
4. Don't initialize with README

### Step 2: Push the Code
```bash
cd mirzayanllc-website
git init
git add .
git commit -m "Initial website launch"
git branch -M main
git remote add origin https://github.com/dremonkey23/mirzayanllc-website.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Click **Save**
5. Site will be live at `https://dremonkey23.github.io/mirzayanllc-website/`

### Step 4: Custom Domain Setup (mirzayanllc.com)

#### DNS Configuration (at your domain registrar):
Add these DNS records:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | dremonkey23.github.io |

#### In GitHub Pages Settings:
1. Custom domain: `mirzayanllc.com`
2. Check **Enforce HTTPS**
3. The `CNAME` file is already included in the repo

**Note:** DNS propagation can take up to 24-48 hours.

### Step 5: Contact Form Setup (Formspree)
1. Go to https://formspree.io/ and sign up (free tier: 50 submissions/month)
2. Create a new form
3. Copy your form endpoint (e.g., `https://formspree.io/f/xAbCdEf`)
4. In `index.html`, replace `https://formspree.io/f/your-form-id` with your actual endpoint
5. Test the form

**Alternative:** The form has a mailto fallback — if Formspree isn't configured, it opens the user's email client.

## File Structure
```
mirzayanllc-website/
├── index.html          # Main single-page website
├── css/
│   └── style.css       # All styles (navy/teal theme)
├── js/
│   └── main.js         # Navigation, animations, form handling
├── images/
│   └── favicon.svg     # Browser tab icon
├── CNAME               # Custom domain config for GitHub Pages
├── .nojekyll           # Bypass Jekyll processing
└── DEPLOYMENT.md       # This file
```

## Customization Notes
- **Colors:** Edit CSS variables in `:root` at top of `style.css`
- **Content:** All content is in `index.html` — easy to find and edit
- **Testimonials:** Placeholder testimonials ready to replace with real ones
- **Form:** Update Formspree endpoint or integrate with any form backend
- **Images:** Add company photos/logos to `images/` folder and reference in HTML
