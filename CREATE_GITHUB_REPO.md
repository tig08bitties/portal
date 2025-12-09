# 🔧 CREATE GITHUB REPOSITORY — Quick Guide

**Error:** Repository not found  
**Solution:** Create the repository on GitHub first, then deploy

---

## 🎯 OPTION 1: Create Repository on GitHub (Recommended)

### **Step 1: Create Repository**

1. **Go to:** https://github.com/new
2. **Repository name:** `bridgeworld-portal` (or any name you prefer)
3. **Visibility:** Public (required for free GitHub Pages)
4. **DO NOT:**
   - ❌ Initialize with README
   - ❌ Add .gitignore
   - ❌ Add license
5. **Click:** "Create repository"

### **Step 2: Get Repository URL**

After creating, GitHub will show you the repository URL:
```
https://github.com/tig08bitties/bridgeworld-portal.git
```

**Copy this URL.**

### **Step 3: Update Git Remote**

```bash
cd /mnt/Covenant/Theos/portal

# Remove old remote (if exists)
git remote remove origin 2>/dev/null || true

# Add correct remote
git remote add origin https://github.com/tig08bitties/bridgeworld-portal.git

# Verify
git remote -v
```

### **Step 4: Push Files**

```bash
# Push to GitHub
git push -u origin main
```

---

## 🎯 OPTION 2: Use Existing Repository

If you already have a repository:

1. **Go to:** https://github.com/tig08bitties
2. **Find your repository** (might have a different name)
3. **Copy the repository URL**
4. **Update remote:**

```bash
cd /mnt/Covenant/Theos/portal
git remote set-url origin https://github.com/tig08bitties/YOUR-REPO-NAME.git
git push -u origin main
```

---

## 🎯 OPTION 3: Upload via GitHub Web Interface (No Git Needed)

If you prefer not to use git:

1. **Create repository on GitHub:**
   - https://github.com/new
   - Name: `bridgeworld-portal`
   - Public
   - Don't initialize with anything
   - Create

2. **Upload files:**
   - Go to repository
   - Click "Add file" → "Upload files"
   - Drag and drop all files from `/mnt/Covenant/Theos/portal/`:
     - `index.html`
     - `portal-room.html`
     - `master-vault-key.html`
     - `portal-opening-ceremony.html`
     - `styles.css`
     - `portal.js`
     - `The_Master_Vault_Key.png`
     - All other `.html`, `.js`, `.json` files
   - Commit: "Deploy Archivist Portal"

3. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: `main` branch
   - Folder: `/` (root)
   - Custom domain: `bridgeworld.lol`
   - Save

---

## 📋 QUICK COMMANDS

**After creating repository on GitHub:**

```bash
cd /mnt/Covenant/Theos/portal

# Update remote URL (replace with your actual repo URL)
git remote set-url origin https://github.com/tig08bitties/bridgeworld-portal.git

# Verify remote
git remote -v

# Push files
git push -u origin main
```

---

## ✅ VERIFICATION

After pushing:

1. **Go to repository on GitHub**
2. **Verify files are there:**
   - Should see `index.html`
   - Should see all portal files
3. **Settings → Pages:**
   - Enable Pages
   - Source: `main`, folder: `/`
   - Custom domain: `bridgeworld.lol`
4. **Wait 2-3 minutes**
5. **Test:** `https://tig08bitties.github.io/bridgeworld-portal/`
6. **Test:** `https://bridgeworld.lol` (after DNS propagates)

---

**Create the repository first, then push the files. It will work!**

*Amen. So be it.*
