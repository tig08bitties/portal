# 🚀 Cloudflare Pages Deployment Instructions

## ✅ Build Status: SUCCESS

The project has been successfully built and is ready for deployment.

---

## 📋 Deployment Options

### Option 1: Cloudflare Dashboard (Easiest)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages** → **Pages**

2. **Create New Project**
   - Click: **Create a project**
   - Select: **Upload assets** (for manual upload)
   - Project name: `bridgeworld-lol`

3. **Upload Build**
   - Upload the `.next` directory
   - Or connect Git repository for auto-deploy

4. **Configure Domain**
   - Go to: **Custom domains**
   - Add: `bridgeworld.lol`
   - Configure DNS (CNAME to `bridgeworld-lol.pages.dev`)

5. **Set Environment Variables**
   - Go to: **Settings** → **Environment Variables**
   - Add all required API keys

---

### Option 2: Wrangler CLI (After Project Creation)

**Prerequisites:**
- Cloudflare Pages project must exist (create via dashboard first)
- Authenticated with `wrangler login`

**Deploy:**
```bash
cd /home/tig0_0bitties/bridgeworld-lol
npm run deploy:cloudflare
```

---

### Option 3: GitHub Actions (Auto-deploy)

**Setup:**
1. Push code to GitHub repository
2. Add Cloudflare secrets to GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to `main` branch
4. GitHub Actions will auto-deploy

**Workflow file:** `.github/workflows/deploy.yml`

---

## 🔐 Required Environment Variables

Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:

```env
OPENSEA_API_KEY=62d4d2a83967477ea11810d0e9d86d5e
OPENSEA_MCP_TOKEN=042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW
TENDERLY_USERNAME=tig0_0bitties
TENDERLY_PROJECT_SLUG=project
TENDERLY_RPC_URL=https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb
TENDERLY_NODE_ID=c11796d7-c128-4ef0-8640-e6bcf59ea03b
TENDERLY_WEBHOOK_ID=ad800d90-a387-4f79-8b9a-74b6a85bc847
AIIO_API_TOKEN=io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjQyMDhmNTE1LWI5OTMtNGNiYS04M2MwLTQ4ZDRmODM1YmM4NCIsImV4cCI6NDkxNjc4ODE0NX0.mqEGdpHty7HBuI6QrpYVa81d3YWfF6kvxJk_QSqHifO1iPw8cLiCHw8qeQgZaQ6raGqOCdn5M6tnDSB-LY8t8g
BRAVE_API_KEY=your_brave_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

---

## 🌐 Domain Configuration

### DNS Setup

1. **In Cloudflare DNS Settings:**
   - Type: CNAME
   - Name: `@` (or `bridgeworld`)
   - Target: `bridgeworld-lol.pages.dev`
   - Proxy: ✅ Enabled (orange cloud)
   - TTL: Auto

2. **SSL/TLS Settings:**
   - Mode: **Full** or **Full (strict)**

---

## ✅ Current Status

- ✅ **Build**: Successful
- ✅ **Routes**: All generated (6 routes)
- ✅ **Wrangler**: Installed (v4.47.0)
- ✅ **Git**: Initialized
- ⚠️ **Cloudflare Project**: Needs creation via dashboard
- ⚠️ **Authentication**: Required for CLI deployment

---

## 🎯 Quick Start

### Via Dashboard (Recommended):

1. Go to: https://dash.cloudflare.com/
2. Workers & Pages → Pages → Create a project
3. Upload `.next` directory
4. Add domain `bridgeworld.lol`
5. Set environment variables
6. Deploy!

### Via CLI:

1. Create project via dashboard first
2. Authenticate: `wrangler login`
3. Deploy: `npm run deploy:cloudflare`

---

## 🔥 **READY FOR DEPLOYMENT!** 🔥

**Build**: ✅ **SUCCESS**  
**Status**: ✅ **READY**  
**Next**: Create Cloudflare Pages project and deploy!

---

*The Bridgeworld portal is fully built and ready for production deployment!* 🚀
