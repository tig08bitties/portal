# 🚀 ARCHIVIST PORTAL — Full Deployment Guide

**Complete deployment instructions for bridgeworld.lol**

---

## 📦 Pre-Deployment Checklist

- [x] All portal files created
- [x] Two-vault architecture integrated
- [x] Gate opening scene complete
- [x] Portal room rendered
- [x] Vault interiors created
- [x] Canonical lore documented
- [ ] Oracle address updated (if deployed)
- [ ] DNS configured
- [ ] SSL certificate ready

---

## 🌐 Deployment Options

### **Option 1: IPFS (Decentralized) — Recommended**

**Pros:** Truly decentralized, immutable, no server required  
**Cons:** Requires IPFS node or gateway

#### Steps:

1. **Install IPFS:**
   ```bash
   npm install -g ipfs
   # Or: https://docs.ipfs.io/install/
   ```

2. **Start IPFS:**
   ```bash
   ipfs init
   ipfs daemon
   ```

3. **Deploy:**
   ```bash
   cd portal/
   ipfs add -r .
   # Note the root CID (Qm...)
   ```

4. **Pin (optional but recommended):**
   ```bash
   ipfs pin add <CID>
   # Or use Pinata/Infura for permanent pinning
   ```

5. **Access:**
   - `https://ipfs.io/ipfs/<CID>/index.html`
   - `https://gateway.pinata.cloud/ipfs/<CID>/index.html`
   - `https://cloudflare-ipfs.com/ipfs/<CID>/index.html`

6. **DNS (Optional):**
   - Use ENS/IPNS for dynamic updates
   - Or point subdomain to IPFS gateway

---

### **Option 2: GitHub Pages**

**Pros:** Free, easy, automatic HTTPS  
**Cons:** Requires GitHub account

#### Steps:

1. **Create Repository:**
   ```bash
   git init
   git remote add origin https://github.com/yourusername/bridgeworld-portal.git
   ```

2. **Copy Portal Files:**
   ```bash
   cp -r portal/* .
   ```

3. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Deploy Archivist Portal"
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: `main` branch
   - Folder: `/` (root)

5. **Custom Domain (Optional):**
   - Settings → Pages → Custom domain
   - Add: `bridgeworld.lol`
   - Update DNS records as shown

6. **Access:**
   - `https://yourusername.github.io/bridgeworld-portal/`
   - Or: `https://bridgeworld.lol` (if custom domain configured)

---

### **Option 3: Vercel**

**Pros:** Fast, automatic HTTPS, easy deployment  
**Cons:** Requires Vercel account

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd portal/
   vercel --prod
   ```

3. **Configure Domain:**
   - Vercel Dashboard → Project → Settings → Domains
   - Add: `bridgeworld.lol`
   - Update DNS as shown

4. **Access:**
   - `https://your-project.vercel.app`
   - Or: `https://bridgeworld.lol` (if domain configured)

---

### **Option 4: Netlify**

**Pros:** Free, easy, automatic HTTPS  
**Cons:** Requires Netlify account

#### Steps:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd portal/
   netlify deploy --prod
   ```

3. **Configure Domain:**
   - Netlify Dashboard → Site settings → Domain management
   - Add: `bridgeworld.lol`
   - Update DNS as shown

---

### **Option 5: Traditional Web Hosting**

**Pros:** Full control, custom server  
**Cons:** Requires server management

#### Steps:

1. **Upload Files:**
   ```bash
   scp -r portal/ user@your-server.com:/var/www/bridgeworld.lol/
   ```

2. **Configure Web Server:**

   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name bridgeworld.lol;
       root /var/www/bridgeworld.lol;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   **Apache:**
   ```apache
   <VirtualHost *:80>
       ServerName bridgeworld.lol
       DocumentRoot /var/www/bridgeworld.lol
       DirectoryIndex index.html
   </VirtualHost>
   ```

3. **Enable HTTPS:**
   ```bash
   # Using Let's Encrypt
   certbot --nginx -d bridgeworld.lol
   # Or
   certbot --apache -d bridgeworld.lol
   ```

4. **Update DNS:**
   - A Record: `bridgeworld.lol` → Your server IP
   - Or CNAME: `bridgeworld.lol` → Your server hostname

---

## 🔧 Post-Deployment Configuration

### **1. Update Oracle Address**

If `TheosFinalOracle` is deployed, update `portal.js`:

```javascript
const ORACLE_ADDRESS = '0x...'; // Your deployed Oracle address
```

### **2. Verify All Links**

- [ ] Safe links point to correct network
- [ ] Arbiscan links work
- [ ] Stellar explorer links work
- [ ] Arweave links work
- [ ] Internal navigation works

### **3. Test Mobile Responsiveness**

- [ ] Portal loads on mobile
- [ ] Navigation works on touch
- [ ] Animations perform well
- [ ] Text is readable

### **4. Enable HTTPS**

- [ ] SSL certificate installed
- [ ] HTTP redirects to HTTPS
- [ ] Mixed content warnings resolved

### **5. Monitor Performance**

- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] CSS/JS minified (optional)
- [ ] CDN configured (optional)

---

## 📋 DNS Configuration

### **For bridgeworld.lol:**

**Option A: A Record (IP Address)**
```
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600
```

**Option B: CNAME (Hostname)**
```
Type: CNAME
Name: @
Value: your-server.com
TTL: 3600
```

**Option C: Subdomain**
```
Type: CNAME
Name: www
Value: your-deployment-hostname
TTL: 3600
```

---

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] SSL certificate valid
- [ ] No private keys in code
- [ ] No sensitive data exposed
- [ ] CORS configured (if needed)
- [ ] Security headers set (optional)

---

## 📊 Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| **Portal Files** | ✅ Ready | All files created |
| **Two-Vault Architecture** | ✅ Complete | Integrated |
| **Gate Opening** | ✅ Complete | Interactive scene |
| **Portal Room** | ✅ Complete | Opened space |
| **Vault Interiors** | ✅ Complete | Gate vault ready |
| **Canonical Lore** | ✅ Complete | Documented |
| **Deployment Scripts** | ✅ Ready | All methods |
| **DNS** | ⏳ Pending | Configure after deployment |
| **HTTPS** | ⏳ Pending | Enable after deployment |

---

## 🚀 Quick Deploy Commands

### **IPFS:**
```bash
cd portal/
ipfs add -r -Q .
```

### **GitHub Pages:**
```bash
cp -r portal/* .
git add . && git commit -m "Deploy" && git push
```

### **Vercel:**
```bash
cd portal/ && vercel --prod
```

### **Traditional:**
```bash
scp -r portal/ user@server:/var/www/bridgeworld.lol/
```

---

## 📞 Support

If you encounter issues:

1. Check deployment logs
2. Verify DNS propagation (use `dig bridgeworld.lol`)
3. Test HTTPS certificate (use SSL Labs)
4. Verify file permissions on server
5. Check web server error logs

---

## ✅ Final Checklist

Before going live:

- [ ] All files uploaded
- [ ] DNS configured
- [ ] HTTPS enabled
- [ ] Oracle address updated (if applicable)
- [ ] All links tested
- [ ] Mobile tested
- [ ] Performance verified
- [ ] Security checked

---

**The Archivist Portal is ready for full deployment.**

**Choose your method. Execute the deployment. Point bridgeworld.lol to your deployment.**

**The Portal will open.**

*Amen. So be it.*
