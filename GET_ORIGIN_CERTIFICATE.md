# 🔐 Get Cloudflare Origin Certificate

## ⚠️ **Current Issue**

The certificate in `~/.cloudflared/cert.pem` is a **Gateway CA certificate**, not an **Origin Certificate** required for Cloudflare Tunnel.

**Error**: `Error decoding origin cert: missing token in the certificate`

---

## 🎯 **Solution: Get Origin Certificate**

### Method 1: Via Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**:
   - Visit: https://dash.cloudflare.com/
   - Login to your account

2. **Navigate to Zero Trust**:
   - Click: **Zero Trust** (or go to: https://one.dash.cloudflare.com/)
   - Navigate to: **Networks** → **Tunnels**

3. **Create Tunnel**:
   - Click: **Create a tunnel**
   - Select: **Cloudflared**
   - Name: `bridgeworld-lol`
   - Click: **Save tunnel**

4. **Download Credentials**:
   - Cloudflare will generate a JSON credentials file
   - Download it (usually named `bridgeworld-lol.json`)
   - Also download the origin certificate (`cert.pem`)

5. **Install Files**:
   ```bash
   # Copy credentials file
   cp ~/Downloads/bridgeworld-lol.json ~/.cloudflared/
   
   # Copy origin certificate
   cp ~/Downloads/cert.pem ~/.cloudflared/cert.pem
   ```

### Method 2: Via SSL/TLS Settings

1. **Go to SSL/TLS**:
   - In Cloudflare Dashboard: **SSL/TLS** → **Origin Server**

2. **Create Origin Certificate**:
   - Click: **Create Certificate**
   - Select: **Cloudflare Tunnel** certificate type
   - Download the certificate

3. **Install**:
   ```bash
   cp ~/Downloads/cert.pem ~/.cloudflared/cert.pem
   ```

### Method 3: Via API (If you have API token)

```bash
# Set your API token
export CLOUDFLARE_API_TOKEN="your_api_token"

# Get account ID first
curl -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json"

# Create tunnel and get certificate
cloudflared tunnel create bridgeworld-lol
```

---

## ✅ **After Getting Origin Certificate**

### Step 1: Copy Certificate
```bash
# Copy the downloaded origin certificate
cp ~/Downloads/cert.pem ~/.cloudflared/cert.pem

# Verify it's an origin certificate
openssl x509 -in ~/.cloudflared/cert.pem -text -noout | grep -i "origin"
```

### Step 2: Verify Config File
```bash
# Check config file syntax
cat ~/.cloudflared/config.yml

# Should look like:
# tunnel: bridgeworld-lol
# credentials-file: /home/tig0_0bitties/.cloudflared/bridgeworld-lol.json
# 
# ingress:
#   - hostname: bridgeworld.lol
#     service: http://localhost:3000
#   - service: http_status:404
```

### Step 3: Create Tunnel
```bash
# Create tunnel (will work once origin cert is correct)
cloudflared tunnel create bridgeworld-lol
```

### Step 4: Route DNS
```bash
# Route DNS to tunnel
cloudflared tunnel route dns bridgeworld-lol bridgeworld.lol
```

### Step 5: Run Tunnel
```bash
# Run tunnel
cloudflared tunnel run bridgeworld-lol
```

---

## 🔍 **Verify Origin Certificate**

### Check Certificate Type:
```bash
openssl x509 -in ~/.cloudflared/cert.pem -text -noout | grep -E "Issuer:|Subject:"
```

**Origin Certificate should show**:
- Issuer: `Cloudflare Origin CA` or similar
- Subject: Your account/zone information

**Current Certificate shows**:
- Issuer: `Gateway CA - Cloudflare Managed G1`
- This is wrong for Tunnel

---

## 📋 **Quick Checklist**

- [ ] Get origin certificate from Cloudflare Dashboard
- [ ] Copy to `~/.cloudflared/cert.pem`
- [ ] Verify config file syntax (fixed ✅)
- [ ] Create tunnel: `cloudflared tunnel create bridgeworld-lol`
- [ ] Route DNS: `cloudflared tunnel route dns bridgeworld-lol bridgeworld.lol`
- [ ] Run tunnel: `cloudflared tunnel run bridgeworld-lol`

---

## 🎯 **Current Status**

- ✅ **WARP**: Connected
- ✅ **Cloudflared**: Installed
- ✅ **Config File**: Fixed (YAML syntax corrected)
- ⚠️ **Origin Certificate**: Need to get from Cloudflare Dashboard
- ⚠️ **Tunnel**: Waiting for origin certificate

---

*Config file fixed. Get origin certificate from Cloudflare Dashboard to proceed.* 🔐
