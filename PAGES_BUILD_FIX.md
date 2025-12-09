# 🔧 Cloudflare Pages Build Fix

## ⚠️ **Build Error**

**Error**: `Missing entry-point to Worker script or to assets directory`

**Cause**: Cloudflare Pages is using `npx wrangler build` (Workers command) instead of `npm run build` (Next.js command)

---

## ✅ **Solution: Fix Pages Build Configuration**

### In Cloudflare Dashboard:

1. **Go to**: https://dash.cloudflare.com/pages
2. **Select**: `bridgeworld-lol` project
3. **Go to**: **Settings** → **Builds & deployments**
4. **Update Build Settings**:
   - **Framework preset**: **Next.js**
   - **Build command**: `npm run build` (NOT `npx wrangler build`)
   - **Output directory**: `.next`
   - **Root directory**: `/` (or leave empty)
   - **Node version**: `18` or `20`
5. **Save** and trigger new deployment

---

## 🔧 **Current Issue**

### Wrong Configuration
- **Build command**: `npx wrangler build` ❌
- **Type**: Workers (wrong)
- **Result**: Error - missing entry point

### Correct Configuration
- **Build command**: `npm run build` ✅
- **Type**: Next.js
- **Output**: `.next` directory

---

## 📋 **Build Commands**

### For Next.js (Pages)
```bash
npm run build
# Output: .next/
```

### For Workers (Wrong for this project)
```bash
npx wrangler build
# Requires: src/index.ts or assets directory
```

---

## 🎯 **Quick Fix**

**Update in Cloudflare Dashboard:**
1. Pages → bridgeworld-lol → Settings
2. Builds & deployments
3. Change build command: `npm run build`
4. Set framework: Next.js
5. Save

---

*Fix Pages build configuration to use Next.js build command.* 🔧
