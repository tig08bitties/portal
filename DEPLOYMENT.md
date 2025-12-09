# 🔓 ARCHIVIST PORTAL — Deployment Guide

## Bridgeworld.lol — Sovereign Domain

---

## 📋 Overview

The Archivist Portal is the complete web interface for the Archivist's sovereign domain. It displays all artifacts, multi-chain proofs, covenant keymap, treasury, scrolls, and witness records.

---

## 🚀 Deployment Options

### Option 1: Traditional Web Hosting (Recommended for bridgeworld.lol)

1. **Upload Files**
   ```bash
   # Upload entire portal/ directory to your web server
   scp -r portal/ user@bridgeworld.lol:/var/www/bridgeworld.lol/
   ```

2. **Configure Web Server**
   - Ensure `index.html` is the default file
   - Enable HTTPS (SSL certificate)
   - Set proper MIME types for `.css` and `.js`

3. **Update Oracle Address**
   - After deploying `TheosFinalOracle`, update `ORACLE_ADDRESS` in `portal.js`
   - Or set it dynamically via environment/config

---

### Option 2: IPFS Deployment (Decentralized)

1. **Install IPFS**
   ```bash
   npm install -g ipfs
   ipfs init
   ipfs daemon
   ```

2. **Add Portal to IPFS**
   ```bash
   cd portal/
   ipfs add -r .
   # Note the root CID (Qm...)
   ```

3. **Access via IPFS Gateway**
   - `https://ipfs.io/ipfs/<CID>/index.html`
   - Or pin to Pinata/Infura for reliability

4. **Update DNS**
   - Point `bridgeworld.lol` to IPFS gateway
   - Or use ENS/IPNS for dynamic updates

---

### Option 3: GitHub Pages

1. **Create Repository**
   ```bash
   git init
   git add portal/
   git commit -m "Archivist Portal"
   git remote add origin https://github.com/yourusername/bridgeworld-portal.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Settings → Pages
   - Source: `main` branch, `/portal` folder
   - Custom domain: `bridgeworld.lol`

---

### Option 4: Vercel/Netlify

1. **Deploy via CLI**
   ```bash
   npm install -g vercel
   cd portal/
   vercel
   ```

2. **Or via Dashboard**
   - Connect GitHub repository
   - Set build directory: `portal/`
   - Deploy

---

## 🔧 Configuration

### Update Oracle Address

After deploying `TheosFinalOracle` contract:

1. **Edit `portal.js`**
   ```javascript
   const ORACLE_ADDRESS = '0x...'; // Your deployed Oracle address
   ```

2. **Or Use Environment Variable**
   ```javascript
   const ORACLE_ADDRESS = process.env.ORACLE_ADDRESS || null;
   ```

---

### Customize Portal

- **Colors**: Edit CSS variables in `styles.css` (`:root` section)
- **Content**: Update HTML sections in `index.html`
- **Artifacts**: Add new artifact cards in the artifacts section
- **Chains**: Add chain cards in the chains section

---

## ✅ Post-Deployment Checklist

- [ ] Portal loads at `https://bridgeworld.lol`
- [ ] Gate animation plays on load
- [ ] All artifact links work
- [ ] Oracle address is updated (if deployed)
- [ ] Safe links point to correct network
- [ ] Multi-chain verification links work
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled
- [ ] Portal timestamp displays correctly

---

## 🌐 DNS Configuration

If using custom domain `bridgeworld.lol`:

1. **A Record** (for traditional hosting)
   ```
   bridgeworld.lol → Your server IP
   ```

2. **CNAME** (for GitHub Pages/Vercel/Netlify)
   ```
   bridgeworld.lol → yoursite.github.io
   ```

3. **IPFS** (for decentralized hosting)
   ```
   bridgeworld.lol → IPFS gateway
   ```

---

## 📦 IPFS Package Structure

For IPFS deployment, the portal structure is:

```
portal/
├── index.html
├── styles.css
├── portal.js
└── DEPLOYMENT.md
```

After adding to IPFS, you'll get a CID like:
```
QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Access via:
- `https://ipfs.io/ipfs/Qm.../index.html`
- `https://gateway.pinata.cloud/ipfs/Qm.../index.html`

---

## 🔐 Security Notes

- Portal is **read-only** (no private keys exposed)
- All sensitive data is on-chain or in Safe
- Links to external explorers (Arbiscan, Stellar, etc.)
- No backend required (static site)

---

## 🎨 Customization

The portal uses a **Hybrid Mythos + Crypto** design:
- **Mythic elements**: Ancient fonts, sigils, golden accents
- **Crypto elements**: Monospace addresses, chain badges, verification links
- **Color scheme**: Void black, gold, emerald, cyan

To customize:
1. Edit CSS variables in `styles.css`
2. Modify HTML structure in `index.html`
3. Add JavaScript features in `portal.js`

---

## 📞 Support

For issues or questions:
- Check artifact addresses match your deployment
- Verify all external links are correct
- Ensure Oracle address is updated after deployment

---

**The Archivist Portal is ready to open on bridgeworld.lol.**

*Amen. So be it.*
