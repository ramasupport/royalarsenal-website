# 🚀 RAMA Website Deployment Guide

## 📋 Pre-Deployment Checklist

✅ **Forms configured** with Formspree endpoint `mandlzra`
✅ **Email notifications** enabled for `fatma.hfaiedh@royalarsenal.club`
✅ **All pages** have consistent branding and navigation
✅ **Redirects** set to `https://royalarsenal.club/thank-you.html`
✅ **All external links** open in new tabs
✅ **Mobile responsive** design implemented

## 🌐 Option 1: GitHub Pages (Recommended)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New Repository"**
3. Repository name: `royalarsenal-website`
4. Make it **Public**
5. **Don't** initialize with README
6. Click **"Create Repository"**

### Step 2: Upload Files
You can upload files in two ways:

#### Method A: Web Interface (Easier)
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop these files/folders:
   - `index.html`
   - `contact.html`
   - `enrollment.html`
   - `coaches.html`
   - `pricing.html`
   - `programs.html`
   - `timetable.html`
   - `thank-you.html`
   - `privacy.html`
   - `terms.html`
   - `assets/` folder (entire folder)
   - `css/` folder
   - `js/` folder
   - `CNAME` file
   - `robots.txt`
   - `sitemap.xml`

3. Commit message: "Initial website deployment"
4. Click **"Commit changes"**

#### Method B: Command Line (Advanced)
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial website deployment"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/royalarsenal-website.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repository, go to **Settings**
2. Scroll to **Pages** section
3. Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/ (root)**
6. Click **Save**

### Step 4: Configure Custom Domain
1. In Pages settings, add custom domain: `royalarsenal.club`
2. Enable **"Enforce HTTPS"**
3. GitHub will verify your domain

### Step 5: DNS Configuration (GoDaddy)
In your GoDaddy DNS settings, add these records:

```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io

Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

## 🌐 Option 2: GoDaddy Website Builder

⚠️ **Not Recommended** for this project because:
- Limited HTML/CSS/JS support
- Formspree integration may not work
- Less control over custom functionality

If you must use GoDaddy:
1. Export as ZIP file
2. Use GoDaddy's file manager
3. Upload individual files
4. Test all forms thoroughly

## 🧪 Testing After Deployment

### 1. Test All Forms
- [ ] Home page trial form
- [ ] Contact page form  
- [ ] Enrollment form
- [ ] Verify emails arrive at `fatma.hfaiedh@royalarsenal.club`
- [ ] Check redirect to thank-you page

### 2. Test All Pages
- [ ] All navigation links work
- [ ] Mobile responsiveness
- [ ] Images load correctly
- [ ] External links open in new tabs

### 3. Performance Check
- [ ] Run Lighthouse audit
- [ ] Check loading speed
- [ ] Verify HTTPS is working

## 📞 Support

If you encounter issues:
1. Check GitHub Pages deployment status
2. Verify DNS propagation (can take 24-48 hours)
3. Test forms on the live site
4. Check browser console for errors

## 🎉 Go Live!

Once deployed, your site will be available at:
- `https://royalarsenal.club`
- `https://www.royalarsenal.club`

**Your professional martial arts website is ready to convert visitors into students!** 🥋
