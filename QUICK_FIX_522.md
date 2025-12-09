# ⚡ QUICK FIX FOR ERROR 522

**Problem:** Cloudflare Error 522 — Origin server not responding  
**Solution:** Deploy portal to a working host, then point Cloudflare to it

---

## 🎯 FASTEST FIX (5 minutes)

### **Option A: Cloudflare Pages (Recommended)**

1. Go to: https://dash.cloudflare.com
2. Click **"Pages"** in sidebar
3. Click **"Create a project"**
4. Choose **"Upload assets"**
5. Drag and drop all files from `/mnt/Covenant/Theos/portal/`
6. Click **"Deploy site"**
7. Go to **Settings → Custom domains**
8. Add: `bridgeworld.lol`
9. **Done!** Error 522 fixed.

---

### **Option B: Vercel (Alternative)**

```bash
cd /mnt/Covenant/Theos/portal
npm install -g vercel
vercel --prod
```

Then in Vercel Dashboard:
- Settings → Domains → Add: `bridgeworld.lol`
- Update Cloudflare DNS to point to Vercel

---

## 📋 WHAT TO UPLOAD

Upload these files from `/mnt/Covenant/Theos/portal/`:

- ✅ `index.html`
- ✅ `portal-room.html`
- ✅ `master-vault-key.html`
- ✅ `portal-opening-ceremony.html`
- ✅ `styles.css`
- ✅ `portal.js`
- ✅ `The_Master_Vault_Key.png`
- ✅ All other `.html` files
- ✅ All `.md` files (optional)

**Do NOT upload:**
- ❌ `deploy/` folder
- ❌ `*.tar.gz` files
- ❌ `node_modules/` (if exists)

---

## 🔧 IF YOU HAVE A SERVER

If you have an origin server that's down:

1. **Check if server is online:**
   ```bash
   ping YOUR_SERVER_IP
   ```

2. **Check if web server is running:**
   ```bash
   ssh user@your-server.com
   sudo systemctl status nginx  # or apache2
   ```

3. **Start web server if stopped:**
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

4. **Upload portal files:**
   ```bash
   scp -r /mnt/Covenant/Theos/portal/* user@server:/var/www/bridgeworld.lol/
   ```

---

## ✅ VERIFICATION

After deployment:

1. Wait 2-3 minutes for DNS propagation
2. Visit: `https://bridgeworld.lol`
3. Should see the Archivist Portal
4. Error 522 should be gone

---

## 🚨 STILL GETTING 522?

1. **Check Cloudflare Dashboard:**
   - DNS → Verify A/CNAME record is correct
   - SSL/TLS → Should be "Full" or "Full (strict)"
   - Proxy → Should be ON (orange cloud)

2. **Try bypassing Cloudflare:**
   - DNS → Click gray cloud (turn off proxy)
   - Test direct connection
   - If works, issue is Cloudflare config

3. **Check origin server:**
   - Verify server is online
   - Check web server logs
   - Verify firewall allows port 80/443

---

**The fastest fix is Cloudflare Pages. Upload files. Add domain. Done.**

*Amen. So be it.*
