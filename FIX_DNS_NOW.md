# 🔧 FIX YOUR CLOUDFLARE DNS — IMMEDIATE ACTION

**Current Problem:**
- ❌ A record `bridgeworld.lol` → `12.75.36.15` (old server, not responding)
- ❌ CNAME `tig08bitties` → `github.io` (wrong format, should be root domain)

**Solution:** Delete A record, fix CNAME to point root domain to GitHub Pages

---

## ⚡ IMMEDIATE FIX (2 minutes)

### **Step 1: Delete the Old A Record**

1. **Cloudflare Dashboard → DNS → Records**
2. **Find:** `A` record for `bridgeworld.lol` → `12.75.36.15`
3. **Click:** Edit (three dots)
4. **Click:** Delete
5. **Confirm:** Delete

**This is causing Error 522!** The old server at `12.75.36.15` is not responding.

---

### **Step 2: Fix the CNAME Record**

1. **Find:** `CNAME` record for `tig08bitties` → `github.io`
2. **Click:** Edit
3. **Change:**
   - **Name:** `@` (or `bridgeworld.lol`)
   - **Target:** `tig08bitties.github.io` (NOT just `github.io`)
   - **Proxy:** ON (orange cloud)
   - **TTL:** Auto
4. **Click:** Save

**OR** if you want to keep the subdomain:
- Delete the `tig08bitties` CNAME
- Add new CNAME:
  - **Name:** `@`
  - **Target:** `tig08bitties.github.io`
  - **Proxy:** ON

---

### **Step 3: Verify SSL/TLS**

1. **Cloudflare Dashboard → SSL/TLS → Overview**
2. **Encryption mode:** Should be `Full` (NOT "Flexible")
3. **If not:** Change to `Full` and Save

---

## ✅ CORRECT DNS CONFIGURATION

After fixes, you should have:

```
Type: CNAME
Name: @ (or bridgeworld.lol)
Target: tig08bitties.github.io
Proxy: ON (orange cloud)
TTL: Auto
```

**NO A record for `bridgeworld.lol` pointing to `12.75.36.15`**

---

## 📋 WHAT TO DO NOW

1. **Delete:** A record `bridgeworld.lol` → `12.75.36.15`
2. **Update:** CNAME `tig08bitties` → Change to `@` → `tig08bitties.github.io`
3. **Verify:** SSL/TLS is "Full"
4. **Wait:** 5-10 minutes
5. **Test:** `https://bridgeworld.lol`

---

## 🚨 IF YOU HAVE MULTIPLE REPOS

If your GitHub Pages site is at a specific repo path (like `tig08bitties.github.io/bridgeworld-portal/`), you may need:

**Option A: Root domain to repo root:**
```
CNAME: @ → tig08bitties.github.io
```

**Option B: If repo is in subfolder:**
- Make sure GitHub Pages is set to publish from `/root` or `/docs`
- Or use the full path in Cloudflare (not recommended)

---

## 🔍 VERIFICATION

After changes:

```bash
# Check DNS
dig bridgeworld.lol +short
# Should show: tig08bitties.github.io or Cloudflare IPs

# Check GitHub Pages
curl -I https://tig08bitties.github.io/
# Should return: HTTP/2 200
```

---

## ✅ EXPECTED RESULT

- ✅ Error 522 gone
- ✅ `https://bridgeworld.lol` loads
- ✅ Portal visible
- ✅ All pages work

---

**The A record pointing to `12.75.36.15` is the problem. Delete it and fix the CNAME. Error 522 will be resolved.**

*Amen. So be it.*
