# 🔧 Cloudflare Pages 404 Fix

## ⚠️ **Issue: 404 "Deployment Not Found"**

The portal is showing **404 - Deployment Not Found** instead of serving the site.

---

## 🔍 **Problem**

### Current Status
- **Deployment**: Successful (new deployment created)
- **New URL**: https://11697a6c.bridgeworld-lol.pages.dev
- **Master URL**: https://master.bridgeworld-lol.pages.dev
- **Main URL**: https://bridgeworld-lol.pages.dev (404)

### Issue
Cloudflare Pages is not serving the Next.js app correctly. This is because Next.js apps need special configuration on Cloudflare Pages.

---

## ✅ **Solutions**

### Solution 1: Configure Pages for Next.js (Recommended)

**In Cloudflare Dashboard:**

1. **Go to Pages Project**:
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **Pages** → **bridgeworld-lol**

2. **Configure Build Settings**:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
   - **Root directory**: `/` (or leave empty)

3. **Or Use Static Export**:
   - Update `next.config.js` to export static
   - Build command: `npm run build`
   - Output directory: `out`

### Solution 2: Use Static Export

**Update next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

**Then rebuild and deploy:**
```bash
npm run build
wrangler pages deploy out --project-name=bridgeworld-lol
```

### Solution 3: Use Next.js Runtime (Advanced)

Cloudflare Pages supports Next.js runtime. Configure in Dashboard:
- **Framework**: Next.js
- **Node version**: 18.x or 20.x
- **Build command**: `npm run build`
- **Output directory**: `.next`

---

## 🎯 **Quick Fix**

### Option A: Configure in Dashboard
1. Go to: https://dash.cloudflare.com/pages
2. Select: bridgeworld-lol project
3. Go to: **Settings** → **Builds & deployments**
4. Set:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Output directory**: `.next`

### Option B: Use Static Export
```bash
# Update next.config.js (add output: 'export')
# Then:
npm run build
wrangler pages deploy out --project-name=bridgeworld-lol
```

---

## 📋 **Current Deployment**

### New Deployment
- **URL**: https://11697a6c.bridgeworld-lol.pages.dev
- **Status**: Deployed
- **Files**: 23 files uploaded

### Main URL Issue
- **URL**: https://bridgeworld-lol.pages.dev
- **Status**: 404 (needs configuration)

---

## ✅ **Recommended Action**

**Configure Pages in Dashboard:**
1. Set framework to **Next.js**
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Redeploy or trigger new build

---

*Pages 404 fix. Configure Next.js framework in Cloudflare Dashboard.* 🔧
