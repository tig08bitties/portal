# 🔧 Cloudflare Pages Configuration for Next.js

## ⚠️ **404 Error Fix**

The portal shows 404 because Cloudflare Pages needs to be configured for Next.js runtime.

---

## ✅ **Solution: Configure in Cloudflare Dashboard**

### Step 1: Go to Pages Settings
1. Visit: https://dash.cloudflare.com/
2. Navigate to: **Workers & Pages** → **Pages** → **bridgeworld-lol**
3. Click: **Settings** → **Builds & deployments**

### Step 2: Configure Build Settings
Set the following:

- **Framework preset**: **Next.js**
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Root directory**: `/` (or leave empty)
- **Node version**: `18` or `20`

### Step 3: Save and Redeploy
- Click **Save**
- Trigger a new deployment or push to connected Git repo

---

## 🔄 **Alternative: Use Git Integration**

### Connect GitHub Repository
1. In Pages dashboard, click **Connect to Git**
2. Select your repository
3. Configure:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
4. Deploy automatically on push

---

## 📋 **Current Configuration**

### Build Output
- **Directory**: `.next/`
- **Type**: Next.js App Router
- **API Routes**: 4 routes (need Next.js runtime)

### Deployment
- **Method**: Manual upload via wrangler
- **Status**: Files uploaded but Pages needs Next.js runtime

---

## 🎯 **Why 404?**

Cloudflare Pages is treating `.next` as static files, but Next.js needs:
- **Runtime**: Node.js/Next.js runtime
- **Server-side**: API routes need server execution
- **Framework**: Next.js framework support

---

## ✅ **Quick Fix**

**Configure in Dashboard:**
1. Set framework to **Next.js**
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Redeploy

**Or use Git:**
- Connect GitHub repo
- Auto-deploy with Next.js preset

---

## 🔗 **Portal Links**

- **Main**: https://bridgeworld-lol.pages.dev
- **Master**: https://master.bridgeworld-lol.pages.dev
- **New Deploy**: https://11697a6c.bridgeworld-lol.pages.dev

**All showing 404 until Pages is configured for Next.js runtime.**

---

*Configure Pages for Next.js in Cloudflare Dashboard to fix 404.* 🔧
