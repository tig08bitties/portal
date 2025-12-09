# 🔧 FIXING ERROR 522 — GitHub Pages + Cloudflare

**Problem:** Moved pages to GitHub, but Cloudflare Error 522 persists  
**Solution:** Update Cloudflare DNS to point to GitHub Pages correctly

---

## 🎯 THE ISSUE

If you deployed to GitHub Pages, Cloudflare is still trying to reach your old origin server. You need to:

1. **Point Cloudflare DNS to GitHub Pages**
2. **Configure Cloudflare SSL/TLS correctly**
3. **Verify GitHub Pages custom domain is set**

---

## ✅ STEP-BY-STEP FIX

### **Step 1: Get Your GitHub Pages URL**

Your GitHub Pages URL should be:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Or if you set a custom domain in GitHub:
```
https://bridgeworld.lol
```

**Find it:**
- Go to your GitHub repository
- Settings → Pages
- Check "Custom domain" or "Your site is published at"

---

### **Step 2: Update Cloudflare DNS**

1. **Go to Cloudflare Dashboard:**
   - https://dash.cloudflare.com
   - Select `bridgeworld.lol`

2. **Go to DNS → Records**

3. **Update/Create Records:**

   **Option A: If GitHub Pages has custom domain enabled:**
   ```
   Type: CNAME
   Name: @ (or bridgeworld)
   Target: YOUR_USERNAME.github.io
   Proxy: ON (orange cloud)
   TTL: Auto
   ```

   **Option B: If using subdomain:**
   ```
   Type: CNAME
   Name: www
   Target: YOUR_USERNAME.github.io
   Proxy: ON (orange cloud)
   TTL: Auto
   ```

4. **Remove old A records** (if they point to old server IP)

5. **Save changes**

---

### **Step 3: Configure Cloudflare SSL/TLS**

1. **Go to SSL/TLS → Overview**
2. **Set encryption mode to: "Full"** (not "Flexible")
   - This is critical for GitHub Pages
3. **Save**

---

### **Step 4: Configure GitHub Pages Custom Domain**

1. **Go to GitHub Repository**
2. **Settings → Pages**
3. **Custom domain:** Enter `bridgeworld.lol`
4. **Check "Enforce HTTPS"** (if available)
5. **Save**

   GitHub will create a `CNAME` file in your repo automatically.

---

### **Step 5: Wait for Propagation**

- DNS changes: 5-30 minutes
- GitHub Pages: 1-10 minutes
- Cloudflare cache: Clear cache if needed

---

## 🔍 VERIFICATION

### **Check DNS:**
```bash
dig bridgeworld.lol +short
# Should show: YOUR_USERNAME.github.io or Cloudflare IPs
```

### **Check GitHub Pages:**
```bash
curl -I https://YOUR_USERNAME.github.io/REPO_NAME/
# Should return: HTTP/2 200
```

### **Check Cloudflare:**
- Dashboard → DNS → Verify records
- SSL/TLS → Should be "Full"
- Speed → Check for blocking rules

---

## 🚨 COMMON ISSUES

### **Issue 1: Still Getting 522**

**Fix:**
1. **Turn OFF Cloudflare proxy temporarily:**
   - DNS → Click gray cloud (disable proxy)
   - Test direct: `http://YOUR_USERNAME.github.io/REPO_NAME/`
   - If works, issue is Cloudflare config

2. **Check SSL/TLS mode:**
   - Must be "Full" (not "Flexible")
   - GitHub Pages requires HTTPS

3. **Clear Cloudflare cache:**
   - Caching → Purge Everything

### **Issue 2: GitHub Pages Not Responding**

**Fix:**
1. **Check GitHub Pages is enabled:**
   - Repository → Settings → Pages
   - Source should be set (main branch, /root or /docs)

2. **Check repository is public** (or you have GitHub Pro)

3. **Verify `index.html` exists** in root or docs folder

### **Issue 3: DNS Not Propagating**

**Fix:**
1. **Wait 10-30 minutes** (DNS can be slow)

2. **Check from different location:**
   ```bash
   dig @8.8.8.8 bridgeworld.lol
   dig @1.1.1.1 bridgeworld.lol
   ```

3. **Verify Cloudflare nameservers** are set at domain registrar

---

## 📋 QUICK CHECKLIST

- [ ] GitHub Pages is enabled and working
- [ ] Custom domain set in GitHub: `bridgeworld.lol`
- [ ] Cloudflare DNS: CNAME pointing to `YOUR_USERNAME.github.io`
- [ ] Cloudflare proxy: ON (orange cloud)
- [ ] Cloudflare SSL/TLS: "Full" mode
- [ ] Old A records removed (if any)
- [ ] Wait 10-30 minutes for propagation
- [ ] Test: `https://bridgeworld.lol`

---

## ⚡ FASTEST FIX

If you just want it working NOW:

1. **Cloudflare Dashboard → DNS:**
   ```
   Delete all A records
   Add CNAME: @ → YOUR_USERNAME.github.io (proxy ON)
   ```

2. **Cloudflare Dashboard → SSL/TLS:**
   ```
   Encryption mode: Full
   ```

3. **GitHub Repository → Settings → Pages:**
   ```
   Custom domain: bridgeworld.lol
   ```

4. **Wait 10 minutes**

5. **Test:** `https://bridgeworld.lol`

---

## 🔗 USEFUL LINKS

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Cloudflare DNS Docs:** https://developers.cloudflare.com/dns/
- **Cloudflare SSL/TLS:** https://developers.cloudflare.com/ssl/

---

**Once DNS is correctly pointing to GitHub Pages, Error 522 will be resolved.**

*Amen. So be it.*
