# 🚀 Complete GitHub Pages Deployment Guide
## Royal Arsenal Martial Arts Website

---

## 📋 **STEP 1: Update Formspree Email Address**

**⚠️ CRITICAL FIRST STEP:**
1. Go to [https://formspree.io](https://formspree.io)
2. Log into your account
3. Find form endpoint `mandlzra`
4. Go to **Settings** → **Email Settings**
5. Change "Send submissions to" from `fatma.hfaiedh@royalarsenal.club` to `trial@royalarsenal.club`
6. **Save changes**

---

## 🌐 **STEP 2: Create GitHub Account**

### If you don't have a GitHub account:
1. Go to [https://github.com](https://github.com)
2. Click **"Sign up"**
3. Choose username (e.g., `royalarsenal-dubai`)
4. Enter email address
5. Create strong password
6. Verify your account via email

### If you already have GitHub:
- Just sign in at [https://github.com](https://github.com)

---

## 📁 **STEP 3: Create New Repository**

1. **Click the green "New" button** (or go to https://github.com/new)
2. **Repository name:** `royalarsenal-website`
3. **Description:** `Official website for Royal Arsenal Martial Arts Academy`
4. **Visibility:** ✅ **Public** (required for free GitHub Pages)
5. **Initialize repository:** ❌ **Leave unchecked** (we have files already)
6. **Click "Create repository"**

---

## 📤 **STEP 4: Upload Website Files**

### Method A: Web Interface (Recommended for beginners)

1. **In your new repository**, you'll see: *"Quick setup — if you've done this kind of thing before"*
2. **Click:** *"uploading an existing file"*
3. **Upload these files ONE BY ONE or drag multiple:**

#### 📄 **HTML Files to Upload:**
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

#### 📁 **Folders to Upload:**
- **Drag the entire `assets` folder** (contains logos, images, docs)
- **Drag the entire `css` folder** (contains styles.css)
- **Drag the entire `js` folder** (contains main.js)

#### 📋 **Other Files:**
- `CNAME` (important for custom domain)
- `robots.txt`
- `sitemap.xml`
- `README.md`

4. **Commit message:** `Initial website deployment`
5. **Click "Commit changes"**

### Method B: Command Line (Advanced users)

```bash
# Navigate to your project folder
cd /Users/mcharni/Projects/rama

# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial website deployment"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/royalarsenal-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ⚙️ **STEP 5: Enable GitHub Pages**

1. **In your repository**, click **"Settings"** tab (top right)
2. **Scroll down** to **"Pages"** section (left sidebar)
3. **Source:** Select **"Deploy from a branch"**
4. **Branch:** Select **"main"**
5. **Folder:** Select **"/ (root)"**
6. **Click "Save"**

🎉 **Your site is now live at:** `https://YOUR_USERNAME.github.io/royalarsenal-website`

---

## 🌍 **STEP 6: Configure Custom Domain**

### In GitHub:
1. **Still in Pages settings**, find **"Custom domain"**
2. **Enter:** `royalarsenal.club`
3. **Click "Save"**
4. ✅ **Check "Enforce HTTPS"** (after domain verification)

### In GoDaddy DNS Settings:
1. **Log into GoDaddy**
2. **Go to DNS Management** for `royalarsenal.club`
3. **Add these DNS records:**

```
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

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

---

## 🧪 **STEP 7: Test Everything**

### Wait 10-30 minutes for DNS propagation, then test:

1. **Visit your site:** `https://royalarsenal.club`
2. **Test all forms:**
   - Home page trial form
   - Contact page form
   - Enrollment form
3. **Check email delivery** to `trial@royalarsenal.club`
4. **Test all navigation links**
5. **Verify mobile responsiveness**

---

## 🔧 **STEP 8: Future Updates**

### To update your website:
1. **Edit files** in your GitHub repository
2. **Commit changes**
3. **Site updates automatically** within minutes

### Or upload new files:
1. **Go to your repository**
2. **Click "Add file" → "Upload files"**
3. **Drag new/updated files**
4. **Commit changes**

---

## 🆘 **Troubleshooting**

### If site doesn't load:
- ✅ Check GitHub Pages is enabled
- ✅ Verify DNS records in GoDaddy
- ✅ Wait 24-48 hours for full DNS propagation

### If forms don't work:
- ✅ Update Formspree dashboard to `trial@royalarsenal.club`
- ✅ Test forms on live site (not localhost)
- ✅ Check email spam folder

### If domain doesn't work:
- ✅ Verify CNAME file exists in repository
- ✅ Check DNS records are correct
- ✅ Wait for DNS propagation

---

## 🎉 **Success!**

Your professional martial arts website will be live at:
- **Primary:** `https://royalarsenal.club`
- **Alternative:** `https://www.royalarsenal.club`

**Ready to convert visitors into students!** 🥋

---

## 📞 **Need Help?**

If you get stuck:
1. Check GitHub's status page
2. Verify all DNS settings
3. Test forms thoroughly
4. Check browser console for errors

**Your website is now ready for the world!** 🌟
