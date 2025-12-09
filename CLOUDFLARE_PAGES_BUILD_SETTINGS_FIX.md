# 🔧 Cloudflare Pages Build Settings Fix

## ⚠️ **Current Issue**

Your Cloudflare Pages build settings are **incorrect**:

**Current (Wrong):**
- Build command: `npx @cloudflare/next-on-pages@1` ❌
- Build output directory: `/` and `.vercel/output/static` ❌

**Should Be:**
- Build command: `npm run build` ✅
- Build output directory: `.next` ✅

---

## ✅ **Correct Build Settings**

### Update in Cloudflare Dashboard

1. **Go to**: https://dash.cloudflare.com/pages → bridgeworld → Settings → Builds & deployments

2. **Update Build Command**:
   - **Current**: `npx @cloudflare/next-on-pages@1`
   - **Change to**: `npm run build`
   - Click **Save**

3. **Update Build Output Directory**:
   - **Current**: `/` and `.vercel/output/static`
   - **Change to**: `.next`
   - Remove the other directories
   - Click **Save**

4. **Framework Preset**:
   - Should be: **Next.js** ✅ (already correct)

5. **Production Branch**:
   - Should be: **master** ✅ (already correct)

---

## 📋 **Complete Correct Configuration**

```
Project name: bridgeworld
Production branch: master ✅

Framework preset: Next.js ✅

Build command: npm run build ✅

Build output directory: .next ✅
```

---

## 🔍 **Why This Matters**

### Wrong Build Command (`npx @cloudflare/next-on-pages@1`)
- ❌ Uses Vercel-style adapter
- ❌ Expects different output structure
- ❌ Not compatible with standard Next.js build
- ❌ Causes build failures

### Correct Build Command (`npm run build`)
- ✅ Uses standard Next.js build process
- ✅ Outputs to `.next` directory
- ✅ Compatible with Cloudflare Pages
- ✅ Works with your current setup

---

## 🚀 **After Updating**

1. **Save** the changes
2. **Trigger new deployment**:
   - Go to **Deployments** tab
   - Click **Create deployment**
   - Select branch: `master`
   - Click **Deploy`

3. **Verify build**:
   - Check build logs
   - Should see: `npm run build`
   - Should see: `✓ Compiled successfully`
   - Should see: `Output: .next`

---

## 📊 **Expected Build Log**

After fixing build settings, you should see:

```
Installing project dependencies: npm clean-install
Executing user command: npm run build
> bridgeworld-lol@0.1.0 build
> next build
✓ Compiled successfully
Running TypeScript ...
✓ TypeScript check passed
Generating static pages...
✓ Build complete
Output directory: .next
```

---

## 🔗 **Quick Links**

- **Cloudflare Pages Settings**: https://dash.cloudflare.com/pages → bridgeworld → Settings
- **Builds & deployments**: Settings → Builds & deployments
- **Project**: bridgeworld

---

*Fix: Update build command to `npm run build` and output directory to `.next`.* 🔧
