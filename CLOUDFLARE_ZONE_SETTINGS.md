# 🔧 Cloudflare Zone Settings

## 📋 **Zone Information**

### Zone ID
```
abdd28bf1af7e0d6d479c6ef016a05b8
```

### Account ID
```
7e40a8af4a6129833c1cb6f5bcbfd662
```

---

## ⚙️ **Zone Settings**

### Always Online™
**Description**: Keep your website online for visitors when your origin server is unavailable. Cloudflare serves limited copies of web pages available from the Internet Archive's Wayback Machine.

**API Endpoints**:
- **Get**: `GET https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/always_online`
- **Change**: `PATCH https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/always_online`

**Note**: Enabling shares website information with Internet Archive.

### Development Mode
**Description**: Temporarily bypass cache to see changes to your origin server in real-time.

**API Endpoints**:
- **Get**: `GET https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/development_mode`
- **Change**: `PATCH https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/development_mode`

**Note**: 
- Can significantly increase origin server load
- Does not purge cache (files need manual purge)
- Last changed: a minute ago

---

## 🚀 **Usage**

### Enable Always Online
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/always_online" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}'
```

### Enable Development Mode
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/abdd28bf1af7e0d6d479c6ef016a05b8/settings/development_mode" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}'
```

---

## 📊 **Current Status**

### Development Mode
- **Status**: Enabled (changed a minute ago)
- **Effect**: Cache bypassed, seeing real-time changes

### Always Online
- **Status**: Check via API
- **Effect**: Serves cached pages when origin unavailable

---

## 🎯 **Recommendations**

### For Development
- ✅ **Development Mode**: Enabled (good for testing)
- ⚠️ **Note**: Disable after development to reduce load

### For Production
- ✅ **Always Online**: Enable for better uptime
- ❌ **Development Mode**: Disable (use cache)

---

*Cloudflare zone settings for bridgeworld.lol* 🔧
