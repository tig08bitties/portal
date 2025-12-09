#!/bin/bash
# Cloudflare Pages Deployment Script for bridgeworld.lol

set -e

echo "🚀 Deploying bridgeworld.lol to Cloudflare Pages..."

# Load configuration
CONFIG_FILE="cloudflare/config.json"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Config file not found: $CONFIG_FILE"
    exit 1
fi

DOMAIN=$(jq -r '.domains.bridgeworld' "$CONFIG_FILE")
TEAM_NAME=$(jq -r '.teamName' "$CONFIG_FILE")

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   Team: $TEAM_NAME"
echo ""

# Build the project
echo "🔨 Building Next.js project..."
npm run build

# Check if build succeeded
if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "✅ Build complete"
echo ""

# Check for Cloudflare Pages CLI (wrangler)
if ! command -v wrangler &> /dev/null; then
    echo "⚠️  Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare:"
    wrangler login
fi

echo ""
echo "📤 Deploying to Cloudflare Pages..."
echo "   Project: bridgeworld-lol"
echo "   Domain: $DOMAIN"
echo ""

# Deploy using wrangler pages
wrangler pages deploy .next \
    --project-name=bridgeworld-lol \
    --branch=main \
    --compatibility-date=2025-11-15

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://bridgeworld.lol"
echo ""
echo "📊 Monitor deployment:"
echo "   https://dash.cloudflare.com/pages"
echo ""
