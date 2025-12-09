# 🌐 Cloudflare Deployment Guide for bridgeworld.lol

## 📋 Prerequisites

1. **Cloudflare Account** with bridgeworld.lol domain
2. **Wrangler CLI** installed (`npm install -g wrangler`)
3. **Cloudflare API Token** with Pages permissions
4. **Zero Trust Team** configured: `tig08bitties.cloudflareaccess.com`

## 🚀 Quick Deploy

### Option 1: Using Wrangler CLI

```bash
# Install wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=bridgeworld-lol
```

### Option 2: Using Deployment Script

```bash
# Make script executable
chmod +x cloudflare/deploy.sh

# Run deployment
./cloudflare/deploy.sh
```

### Option 3: Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository (or upload build folder)
4. Configure:
   - **Project name**: `bridgeworld-lol`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`

## 🔧 Configuration

### Domain Setup

1. **Add Custom Domain**:
   - In Cloudflare Pages dashboard
   - Go to **Custom domains**
   - Add `bridgeworld.lol`
   - Add `www.bridgeworld.lol` (optional)

2. **DNS Configuration**:
   - Ensure DNS records point to Cloudflare
   - CNAME record: `bridgeworld.lol` → `pages.dev` (automatic)

### SSL/TLS

- SSL certificates are **automatically provisioned** by Cloudflare
- Full SSL encryption enabled by default
- TLS 1.3 supported

### Zero Trust Access

For protected subdomains (oracle, monitor, api):

1. Go to [Zero Trust Dashboard](https://one.dash.cloudflare.com)
2. Navigate to **Access** → **Applications**
3. Create applications:
   - `oracle.bridgeworld.lol`
   - `monitor.bridgeworld.lol`
   - `api.bridgeworld.lol`
4. Configure access policies (see `access-policies.json`)

## 📁 Project Structure

```
bridgeworld-lol/
├── cloudflare/
│   ├── config.json          # Cloudflare configuration
│   ├── access-policies.json # Zero Trust access policies
│   ├── deploy.sh            # Deployment script
│   ├── wrangler.toml        # Wrangler configuration
│   └── DEPLOYMENT.md        # This file
├── .next/                   # Build output (generated)
└── ...
```

## 🔐 Environment Variables

Set in Cloudflare Pages dashboard:

- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_URL=https://bridgeworld.lol`
- `BRAVE_API_KEY=your_key` (optional, for search features)

## 🌍 Subdomains

### Main Portal
- **URL**: https://bridgeworld.lol
- **Status**: Public access
- **Purpose**: Interactive portal experience

### Oracle Dashboard (Protected)
- **URL**: https://oracle.bridgeworld.lol
- **Status**: Zero Trust protected
- **Access**: Email authentication (tig08bitties@att.net)

### Monitoring Suite (Protected)
- **URL**: https://monitor.bridgeworld.lol
- **Status**: Zero Trust protected
- **Access**: Email authentication

### API Endpoints (Protected)
- **URL**: https://api.bridgeworld.lol
- **Status**: Zero Trust protected
- **Access**: Email authentication + API tokens

## 📊 Monitoring

- **Analytics**: Available in Cloudflare Dashboard
- **Performance**: Automatic optimization via Cloudflare CDN
- **Security**: DDoS protection, WAF enabled
- **SSL**: Automatic certificate management

## 🔄 Continuous Deployment

### GitHub Integration

1. Connect GitHub repository to Cloudflare Pages
2. Enable **Automatic deployments**
3. Deploy on every push to `main` branch

### Manual Deployment

```bash
npm run build
wrangler pages deploy .next --project-name=bridgeworld-lol
```

## 🛠️ Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Domain Issues

- Check DNS records in Cloudflare dashboard
- Verify SSL certificate status
- Ensure domain is added to Pages project

### Access Issues

- Verify Zero Trust policies in dashboard
- Check email authentication settings
- Review access logs in Zero Trust dashboard

## 📚 Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Zero Trust Docs](https://developers.cloudflare.com/cloudflare-one/)
- [Dashboard](https://dash.cloudflare.com)

---

**Status**: ✅ Ready for deployment  
**Domain**: bridgeworld.lol  
**Team**: tig08bitties.cloudflareaccess.com
