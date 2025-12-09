# ☁️ Cloudflare R2 Storage Setup Guide

## 📋 **What is Cloudflare R2?**

Cloudflare R2 is object storage (similar to AWS S3) that:
- ✅ **No egress fees** - Free data transfer out
- ✅ **S3-compatible API** - Works with existing S3 tools
- ✅ **Integrated with Cloudflare** - Fast CDN delivery
- ✅ **Pay for storage only** - No request fees

---

## 🚀 **Setup Steps**

### 1. Create R2 Bucket

**Via Dashboard:**
1. Go to: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/r2/cli
2. Click **Create bucket**
3. Enter bucket name: `bridgeworld-assets` (or your preferred name)
4. Choose location: **Auto** (or specific region)
5. Click **Create**

**Via Wrangler CLI:**
```bash
wrangler r2 bucket create bridgeworld-assets
```

### 2. Configure R2 in wrangler.toml

Add R2 bucket binding to `wrangler.toml`:

```toml
name = "bridgeworld"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".next"

# R2 Bucket Binding
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "bridgeworld-assets"

[env.production]
name = "bridgeworld"
compatibility_date = "2024-01-01"

[[env.production.r2_buckets]]
binding = "ASSETS"
bucket_name = "bridgeworld-assets"

[env.production.vars]
NODE_ENV = "production"
NEXT_PUBLIC_PORTAL_URL = "https://bridgeworld.lol"
CLOUDFLARE_ZONE_ID = "abdd28bf1af7e0d6d479c6ef016a05b8"
CLOUDFLARE_ACCOUNT_ID = "7e40a8af4a6129833c1cb6f5bcbfd662"
```

### 3. Create R2 API Token

1. Go to: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/r2/api-tokens
2. Click **Create API token**
3. Set permissions:
   - **Object Read & Write** (or specific permissions)
   - **Bucket**: `bridgeworld-assets`
4. Copy the token (save securely)

### 4. Add Environment Variables

**For Cloudflare Pages:**
1. Go to: Pages → bridgeworld → Settings → Environment Variables
2. Add:
   - `R2_ACCOUNT_ID`: `7e40a8af4a6129833c1cb6f5bcbfd662`
   - `R2_BUCKET_NAME`: `bridgeworld-assets`
   - `R2_ACCESS_KEY_ID`: (from API token)
   - `R2_SECRET_ACCESS_KEY`: (from API token)

**For Local Development (.env.local):**
```env
R2_ACCOUNT_ID=7e40a8af4a6129833c1cb6f5bcbfd662
R2_BUCKET_NAME=bridgeworld-assets
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
```

---

## 💻 **Usage in Next.js**

### Install AWS SDK (S3-compatible)

```bash
npm install @aws-sdk/client-s3
```

### Create R2 Client Utility

Create `lib/r2.ts`:

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  
  return await r2Client.send(command);
}

export async function getFromR2(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
  });
  
  return await r2Client.send(command);
}
```

### Use in API Route

Example: `app/api/upload/route.ts`:

```typescript
import { uploadToR2 } from "@/lib/r2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `uploads/${Date.now()}-${file.name}`;
  
  await uploadToR2(key, buffer, file.type);
  
  const url = `https://pub-${process.env.R2_ACCOUNT_ID}.r2.dev/${key}`;
  
  return NextResponse.json({ url });
}
```

---

## 🔗 **Public Access**

### Enable Public Access

1. Go to: R2 → bridgeworld-assets → Settings
2. Enable **Public Access**
3. Set **Custom Domain** (optional): `assets.bridgeworld.lol`
4. Or use public URL: `https://pub-{account-id}.r2.dev/{key}`

### Custom Domain Setup

1. Add CNAME record in DNS:
   - Name: `assets` (or `cdn`)
   - Target: `pub-{account-id}.r2.dev`
2. Configure in R2 bucket settings
3. Use: `https://assets.bridgeworld.lol/{key}`

---

## 📦 **Common Use Cases**

### 1. Store Static Assets
- Images, videos, documents
- User-generated content
- Backup files

### 2. CDN Backend
- Serve large files
- Reduce Pages bundle size
- Faster load times

### 3. File Uploads
- User avatars
- Document storage
- Media library

---

## 🔐 **Security Best Practices**

1. **Use API Tokens** (not API keys)
2. **Limit Permissions** (read-only for public assets)
3. **Use CORS** (configure allowed origins)
4. **Validate Uploads** (file type, size limits)
5. **Use Signed URLs** (for private files)

---

## 📊 **Pricing**

- **Storage**: $0.015/GB/month
- **Class A Operations** (write): $4.50/million
- **Class B Operations** (read): $0.36/million
- **Egress**: **FREE** (no charges)

---

## 🔗 **Resources**

- **R2 Dashboard**: https://dash.cloudflare.com/7e40a8af4a6129833c1cb6f5bcbfd662/r2
- **R2 Docs**: https://developers.cloudflare.com/r2/
- **S3 Compatibility**: https://developers.cloudflare.com/r2/api/s3/api/

---

*R2 setup guide for bridgeworld project.* ☁️
