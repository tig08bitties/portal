#!/bin/bash
# Deploy Bridgeworld Portal - Following the LORE Roadmap

echo "🔮 Following the LORE Roadmap to Deploy bridgeworld.lol..."
echo ""
echo "📖 LORE: 'The keys unlock the map. The map reveals the path.'"
echo ""

# Step 1: Integrate Covenant Foundation
echo "1️⃣ Integrating Covenant Foundation..."
npm run integrate:covenant
echo ""

# Step 2: Build Portal
echo "2️⃣ Building Portal System..."
npm run build
echo ""

# Step 3: Deploy Following LORE
echo "3️⃣ Deploying Following LORE Roadmap..."
npm run deploy:lore
echo ""

# Step 4: Deploy to Cloudflare
echo "4️⃣ Deploying to Cloudflare Pages..."
npm run deploy:cloudflare || echo "⚠️  Cloudflare deployment - check credentials"
echo ""

# Step 5: Deploy to Replit (if configured)
if [ ! -z "$REPLIT_API_TOKEN" ]; then
    echo "5️⃣ Deploying to Replit..."
    npm run deploy:replit
    echo ""
fi

echo "✨ Deployment Complete!"
echo ""
echo "🌐 Portal: https://bridgeworld.lol"
echo "📊 Status: Following LORE roadmap"
echo ""
echo "'When the end finds its beginning, the portal opens.'"
