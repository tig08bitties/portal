# ✅ Verify Cloudflare Pages Build Settings

## 📋 **Checklist for Correct Configuration**

### 1. Project Settings
- [ ] **Project name**: `bridgeworld`
- [ ] **Production branch**: `master` ✅

### 2. Build Settings
- [ ] **Framework preset**: `Next.js` ✅
- [ ] **Build command**: `npm run build` (NOT `npx @cloudflare/next-on-pages@1`)
- [ ] **Build output directory**: `.next` (NOT `/` or `.vercel/output/static`)

### 3. Environment Variables
- [ ] `NODE_ENV`: `production`
- [ ] `NEXT_PUBLIC_PORTAL_URL`: `https://bridgeworld.lol`
- [ ] `CLOUDFLARE_ZONE_ID`: `abdd28bf1af7e0d6d479c6ef016a05b8`
- [ ] `CLOUDFLARE_ACCOUNT_ID`: `7e40a8af4a6129833c1cb6f5bcbfd662`

---

## 🔍 **How to Verify Settings**

### In Cloudflare Dashboard:

1. **Go to**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld
2. **Click**: **Settings** (gear icon)
3. **Go to**: **Builds & deployments** section
4. **Check**:
   - Build command should be: `npm run build`
   - Output directory should be: `.next`
   - Framework should be: `Next.js`
   - Production branch should be: `master`

---

## ✅ **Correct Configuration**

```
Project: bridgeworld
Production Branch: master

Framework Preset: Next.js
Build Command: npm run build
Build Output Directory: .next

Environment Variables:
  NODE_ENV=production
  NEXT_PUBLIC_PORTAL_URL=https://bridgeworld.lol
  CLOUDFLARE_ZONE_ID=abdd28bf1af7e0d6d479c6ef016a05b8
  CLOUDFLARE_ACCOUNT_ID=7e40a8af4a6129833c1cb6f5bcbfd662
```

---

## 🚀 **After Updating Settings**

1. **Save** all changes
2. **Go to**: **Deployments** tab
3. **Click**: **Create deployment**
4. **Select**: Branch `master`
5. **Click**: **Deploy**
6. **Monitor**: Build logs for success

---

## 📊 **Expected Build Log (After Fix)**

```
Cloning repository...
HEAD is now at [latest commit hash]
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

- **Project Dashboard**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld
- **Settings**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld/settings
- **Deployments**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/pages/view/bridgeworld/deployments

---

*Verify build settings are correct before deploying.* ✅
