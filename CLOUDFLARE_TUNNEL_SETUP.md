# 🔧 Cloudflare Tunnel Setup Guide

## ✅ **WARP Status: CONNECTED**

**Status**: ✅ **Connected**  
**Network**: ✅ **Healthy**

---

## ⚠️ **Tunnel Certificate Issue**

### Problem
```
Error decoding origin cert: missing token in the certificate
```

### Cause
The certificate in `~/.cloudflared/cert.pem` is a **Gateway CA certificate**, not an **Origin Certificate** required for Cloudflare Tunnel.

---

## 🔐 **Solution: Get Origin Certificate**

Cloudflare Tunnel requires an **Origin Certificate** from your Cloudflare account. This is different from the Gateway CA certificate.

### Step 1: Get Origin Certificate from Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**:
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Zero Trust** → **Networks** → **Tunnels**

2. **Create Origin Certificate**:
   - Click: **Create a certificate**
   - Or go to: **SSL/TLS** → **Origin Server** → **Create Certificate**
   - Select: **Cloudflare Tunnel** certificate type
   - Download the certificate

3. **Download Certificate**:
   - The certificate will be in format: `cert.pem` or `origin-cert.pem`
   - Save it to: `~/Downloads/`

### Step 2: Install Origin Certificate

```bash
# Copy origin certificate to cloudflared directory
cp ~/Downloads/origin-cert.pem ~/.cloudflared/cert.pem

# Or if it's named cert.pem
cp ~/Downloads/cert.pem ~/.cloudflared/cert.pem

# Verify
cloudflared tunnel list
```

### Alternative: Use Cloudflare API

If you have API access:

```bash
# Get origin certificate via API
curl -X GET "https://api.cloudflare.com/client/v4/certificates" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" > ~/.cloudflared/cert.pem
```

---

## 🚀 **Create Tunnel (After Certificate Setup)**

### Step 1: Create Tunnel
```bash
cloudflared tunnel create bridgeworld-lol
```

### Step 2: Configure Tunnel

Create config file: `~/.cloudflared/config.yml`

```yaml
tunnel: bridgeworld-lol
credentials-file: /home/tig0_0bitties/.cloudflared/bridgeworld-lol.json

ingress:
  - hostname: bridgeworld.lol
    service: http://localhost:3000
  - service: http_status:404
```

### Step 3: Route DNS
```bash
cloudflared tunnel route dns bridgeworld-lol bridgeworld.lol
```

### Step 4: Run Tunnel
```bash
cloudflared tunnel run bridgeworld-lol
```

---

## 📋 **Quick Setup Commands**

### After Getting Origin Certificate:

```bash
# 1. Copy origin certificate
cp ~/Downloads/origin-cert.pem ~/.cloudflared/cert.pem

# 2. Create tunnel
cloudflared tunnel create bridgeworld-lol

# 3. Configure tunnel (edit ~/.cloudflared/config.yml)
# Add ingress rules for bridgeworld.lol

# 4. Route DNS
cloudflared tunnel route dns bridgeworld-lol bridgeworld.lol

# 5. Run tunnel
cloudflared tunnel run bridgeworld-lol
```

---

## 🔍 **Verify Certificate Type**

### Check if certificate is Origin Certificate:

```bash
# Origin certificate should have:
# - Subject with your account/zone info
# - Issuer: Cloudflare Origin CA
openssl x509 -in ~/.cloudflared/cert.pem -text -noout | grep -E "Subject:|Issuer:"
```

### Current Certificate (Gateway CA):
- **Issuer**: Gateway CA - Cloudflare Managed G1
- **Type**: Gateway CA (not suitable for Tunnel)

### Required Certificate (Origin Certificate):
- **Issuer**: Cloudflare Origin CA
- **Type**: Origin Certificate (for Tunnel)

---

## ✅ **Current Status**

- ✅ **WARP**: Connected and healthy
- ✅ **Cloudflared**: Installed (v2025.11.1)
- ⚠️ **Origin Certificate**: Needs to be obtained from Cloudflare Dashboard
- ⚠️ **Tunnel**: Waiting for origin certificate

---

## 🎯 **Next Steps**

1. **Get Origin Certificate** from Cloudflare Dashboard
2. **Copy to** `~/.cloudflared/cert.pem`
3. **Create tunnel**: `cloudflared tunnel create bridgeworld-lol`
4. **Configure and run tunnel**

---

*WARP is connected. Origin certificate needed for Cloudflare Tunnel.* 🔐
