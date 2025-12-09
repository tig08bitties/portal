# 🔧 Bridgeworld2 Project Setup Guide

## 📋 **Project Overview**

You have **two** Cloudflare Pages projects:

1. **bridgeworld** - Main project (working ✅)
   - Domain: `bridgeworld.pages.dev`
   - Status: Successfully building and deploying
   - Latest commit: `3879355`

2. **bridgeworld2** - New/secondary project
   - Domain: `bridgeworld2.pages.dev`
   - Status: Needs configuration
   - Created: Recently (37 seconds ago)

---

## 🔍 **Current Status**

### bridgeworld2 Project
- ✅ **Created**: Yes
- ⚠️ **Git Integration**: Connected (needs verification)
- ⚠️ **Build Settings**: Need to verify/configure
- ⚠️ **Deployments**: Check status

---

## 🚀 **Setup Steps for bridgeworld2**

### Option 1: Mirror bridgeworld Configuration

If `bridgeworld2` should have the same configuration as `bridgeworld`:

1. **Go to**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld2/settings

2. **Configure Build Settings**:
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build` (or `npx next build`)
   - **Build output directory**: `.next`
   - **Production branch**: `master`

3. **Verify Git Integration**:
   - **Repository**: Should be `tig08bitties/bridgeworld-lol`
   - **Branch**: Should be `master`
   - **Auto-deploy**: Enable if desired

4. **Environment Variables** (if needed):
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_PORTAL_URL`: (set appropriate URL)
   - `CLOUDFLARE_ZONE_ID`: (if needed)
   - `CLOUDFLARE_ACCOUNT_ID`: (if needed)

### Option 2: Different Configuration

If `bridgeworld2` should have different settings:
- Specify what's different
- Configure accordingly
- Deploy separately

---

## 📊 **Recommended Configuration**

### Build Settings:
```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Production branch: master
```

### Git Integration:
```
Repository: tig08bitties/bridgeworld-lol
Branch: master (or specific branch)
Auto-deploy: Yes (optional)
```

---

## 🔗 **Quick Links**

- **bridgeworld2 Dashboard**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld2
- **Settings**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld2/settings
- **Deployments**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld2/deployments

---

## ❓ **Questions**

1. **What is bridgeworld2 for?**
   - Staging environment?
   - Different branch?
   - Separate deployment?

2. **Should it use the same codebase?**
   - Same repository?
   - Same branch?
   - Different configuration?

3. **What's the purpose?**
   - Testing?
   - Production backup?
   - Different features?

---

*Setup guide for bridgeworld2 project.* 🔧
