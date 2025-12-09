# 🔧 Error 522 Troubleshooting Guide

## ⚠️ **Error 522: Connection Timed Out**

**Error 522** means Cloudflare successfully connected to the origin server, but the origin server failed to respond within the timeout period.

---

## 🔍 **Common Causes**

### 1. Origin Server Not Running
- The Next.js server isn't running
- Port 3000 (or configured port) isn't accessible

### 2. Firewall Blocking
- Firewall blocking Cloudflare IPs
- Port not open

### 3. Tunnel Not Connected
- Cloudflare Tunnel not established
- Tunnel service not running

### 4. Wrong Port/Service
- Service running on different port
- Ingress configuration incorrect

---

## ✅ **Solutions**

### Solution 1: Check Tunnel Connection

```bash
# Check tunnel status
sudo systemctl status cloudflared

# View tunnel logs
sudo journalctl -u cloudflared -f

# Restart tunnel
sudo systemctl restart cloudflared
```

### Solution 2: Verify Local Service

```bash
# Check if Next.js is running
curl http://localhost:3000

# Or check the configured port
netstat -tlnp | grep -E "3000|8080"
```

### Solution 3: Update Tunnel Config

The tunnel needs to point to the correct local service:

```yaml
# ~/.cloudflared/config.yml
tunnel: bridgeworld-lol
credentials-file: /home/tig0_0bitties/.cloudflared/bridgeworld-lol.json

ingress:
  - hostname: bridgeworld.lol
    service: http://localhost:3000  # Make sure this matches your service
  - service: http_status:404
```

### Solution 4: Start Local Service

If using Next.js:

```bash
cd /home/tig0_0bitties/bridgeworld-lol
npm run start
# Or
npm run dev
```

### Solution 5: Check Firewall

```bash
# Allow Cloudflare IPs (if using firewall)
sudo ufw allow from 173.245.48.0/20
sudo ufw allow from 103.21.244.0/22
# ... (add Cloudflare IP ranges)
```

---

## 🎯 **For Cloudflare Pages (Static Site)**

If you're using **Cloudflare Pages** (static site), Error 522 shouldn't occur because Pages serves static files directly.

**Check:**
1. Is the site actually deployed to Pages?
2. Is DNS pointing to Pages or Tunnel?
3. Is Tunnel configured for a different service?

---

## 🔧 **Quick Fixes**

### Fix 1: Restart Tunnel Service
```bash
sudo systemctl restart cloudflared
```

### Fix 2: Check Tunnel Logs
```bash
sudo journalctl -u cloudflared -n 50
```

### Fix 3: Verify Service Running
```bash
# For Next.js
cd /home/tig0_0bitties/bridgeworld-lol
npm run start

# Check if running
curl http://localhost:3000
```

### Fix 4: Update Config for Static Site
If using Cloudflare Pages (static), you might not need Tunnel. Or configure Tunnel to point to Pages:

```yaml
ingress:
  - hostname: bridgeworld.lol
    service: https://bridgeworld-lol.pages.dev
  - service: http_status:404
```

---

## 📊 **Current Configuration**

### Tunnel Config
- **File**: `~/.cloudflared/config.yml`
- **Service**: `http://localhost:3000`
- **Tunnel ID**: `fd3b3280-722d-477a-a4d7-e65cf47a6fe3`

### Pages Deployment
- **URL**: https://bridgeworld-lol.pages.dev
- **Status**: Deployed (static site)

---

## 🎯 **Recommended Solution**

Since you're using **Cloudflare Pages** (static site), you have two options:

### Option 1: Use Pages Directly (No Tunnel Needed)
- DNS points directly to Pages
- No Error 522 (static files served directly)

### Option 2: Use Tunnel for Custom Domain
- Tunnel points to Pages URL
- Update config to point to `https://bridgeworld-lol.pages.dev`

---

## ✅ **Next Steps**

1. **Check if Error 522 is happening**:
   - Visit: https://bridgeworld-lol.pages.dev
   - Check browser console/network tab

2. **If using Tunnel**:
   - Verify tunnel is connected
   - Check tunnel logs
   - Update config if needed

3. **If using Pages directly**:
   - Verify DNS configuration
   - Check Pages deployment status

---

*Error 522 troubleshooting guide. Check tunnel connection and local service.* 🔧
