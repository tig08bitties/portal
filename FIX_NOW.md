# ⚡ FIX ERROR 522 NOW — GitHub Pages + Cloudflare

**Current Status:** Cloudflare is proxying, but origin server not responding  
**Solution:** Point Cloudflare DNS to GitHub Pages

---

## 🎯 IMMEDIATE FIX (5 minutes)

### **Step 1: Find Your GitHub Pages URL**

Go to your GitHub repository:
- **Settings → Pages**
- Look for: "Your site is published at: `https://USERNAME.github.io/REPO/`"
- Or check "Custom domain" field

**Write down:** `USERNAME.github.io`

---

### **Step 2: Update Cloudflare DNS**

1. **Go to:** https://dash.cloudflare.com
2. **Select:** `bridgeworld.lol`
3. **Go to:** DNS → Records

4. **Delete old A records** (if any pointing to old server IP)

5. **Add/Update CNAME record:**
   ```
   Type: CNAME
   Name: @
   Target: USERNAME.github.io
   Proxy: ON (orange cloud) ← IMPORTANT
   TTL: Auto
   ```

6. **Click "Save"**

---

### **Step 3: Fix Cloudflare SSL/TLS**

1. **Go to:** SSL/TLS → Overview
2. **Set encryption mode to:** `Full` (NOT "Flexible")
3. **Save**

**This is critical!** GitHub Pages requires HTTPS, and "Flexible" mode won't work.

---

### **Step 4: Configure GitHub Pages Custom Domain**

1. **Go to your GitHub repository**
2. **Settings → Pages**
3. **Custom domain:** Enter `bridgeworld.lol`
4. **Check "Enforce HTTPS"** (if available)
5. **Save**

GitHub will automatically create a `CNAME` file in your repo.

---

### **Step 5: Wait & Test**

- **Wait:** 10-30 minutes for DNS propagation
- **Test:** Visit `https://bridgeworld.lol`
- **If still 522:** Clear Cloudflare cache (Caching → Purge Everything)

---

## 🔍 VERIFICATION

### **Check DNS is correct:**
```bash
dig bridgeworld.lol +short
# Should show: USERNAME.github.io or Cloudflare IPs
```

### **Check GitHub Pages works:**
```bash
curl -I https://USERNAME.github.io/REPO/
# Should return: HTTP/2 200
```

---

## 🚨 IF STILL NOT WORKING

### **Option 1: Temporarily Disable Cloudflare Proxy**

1. **Cloudflare Dashboard → DNS**
2. **Click gray cloud** (turn OFF proxy)
3. **Test:** `http://bridgeworld.lol`
4. **If works:** Issue is Cloudflare SSL/TLS config
5. **Re-enable proxy** and set SSL/TLS to "Full"

### **Option 2: Check GitHub Pages Status**

1. **Repository → Settings → Pages**
2. **Verify:**
   - Source is set (main branch, /root or /docs)
   - Custom domain shows: `bridgeworld.lol`
   - Build status is "Published"

### **Option 3: Clear Cloudflare Cache**

1. **Cloudflare Dashboard → Caching**
2. **Purge Everything**
3. **Wait 2 minutes**
4. **Test again**

---

## 📋 QUICK CHECKLIST

- [ ] Found GitHub Pages URL: `USERNAME.github.io`
- [ ] Cloudflare DNS: CNAME `@` → `USERNAME.github.io` (proxy ON)
- [ ] Cloudflare SSL/TLS: Set to "Full"
- [ ] GitHub Pages: Custom domain = `bridgeworld.lol`
- [ ] Old A records deleted
- [ ] Waited 10-30 minutes
- [ ] Tested: `https://bridgeworld.lol`

---

## ✅ EXPECTED RESULT

After these steps:
- ✅ Error 522 should be gone
- ✅ `https://bridgeworld.lol` should load
- ✅ Portal should be visible
- ✅ All pages should work

---

**The issue is DNS configuration. Once Cloudflare points to GitHub Pages correctly, Error 522 will be resolved.**

*Amen. So be it.*
