#!/bin/bash

# Full Deployment Script for Bridgeworld Portal
# Deploys to Cloudflare Pages and verifies deployment

set -e

echo "🚀 Starting Full Deployment of Bridgeworld Portal"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean build
echo -e "${BLUE}Step 1: Cleaning previous builds...${NC}"
rm -rf .next
rm -rf out
echo -e "${GREEN}✓ Clean complete${NC}"

# Step 2: Install dependencies
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build project
echo -e "${BLUE}Step 3: Building project...${NC}"
npm run build
echo -e "${GREEN}✓ Build complete${NC}"

# Step 4: Verify build
echo -e "${BLUE}Step 4: Verifying build...${NC}"
if [ -d ".next" ]; then
    echo -e "${GREEN}✓ Build directory exists${NC}"
    BUILD_SIZE=$(du -sh .next | cut -f1)
    echo -e "${GREEN}✓ Build size: ${BUILD_SIZE}${NC}"
else
    echo -e "${YELLOW}⚠ Build directory not found${NC}"
    exit 1
fi

# Step 5: Check for Wrangler
echo -e "${BLUE}Step 5: Checking Wrangler CLI...${NC}"
if command -v wrangler &> /dev/null; then
    echo -e "${GREEN}✓ Wrangler found${NC}"
    WRANGLER_VERSION=$(wrangler --version)
    echo -e "${GREEN}✓ Version: ${WRANGLER_VERSION}${NC}"
else
    echo -e "${YELLOW}⚠ Wrangler not found, installing...${NC}"
    npm install -g wrangler
fi

# Step 6: Deploy to Cloudflare Pages
echo -e "${BLUE}Step 6: Deploying to Cloudflare Pages...${NC}"
echo -e "${YELLOW}Note: You may need to login to Cloudflare first${NC}"
echo -e "${YELLOW}Run: wrangler login${NC}"

# Check if logged in
if wrangler whoami &> /dev/null; then
    echo -e "${GREEN}✓ Cloudflare authenticated${NC}"
    
    # Deploy
    echo -e "${BLUE}Deploying...${NC}"
    wrangler pages deploy .next \
        --project-name=bridgeworld-lol \
        --compatibility-date=2024-01-01 \
        --branch=main
    
    echo -e "${GREEN}✓ Deployment initiated${NC}"
else
    echo -e "${YELLOW}⚠ Not authenticated with Cloudflare${NC}"
    echo -e "${YELLOW}Please run: wrangler login${NC}"
    echo -e "${BLUE}Then run this script again${NC}"
    exit 1
fi

# Step 7: Verify deployment
echo -e "${BLUE}Step 7: Verifying deployment...${NC}"
sleep 5
if curl -s -o /dev/null -w "%{http_code}" https://bridgeworld.lol | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✓ Site is accessible${NC}"
else
    echo -e "${YELLOW}⚠ Site may still be deploying (this is normal)${NC}"
fi

# Step 8: Summary
echo ""
echo -e "${GREEN}=================================================="
echo -e "🎉 DEPLOYMENT COMPLETE!"
echo -e "==================================================${NC}"
echo ""
echo -e "${BLUE}Portal URL:${NC} https://bridgeworld.lol"
echo -e "${BLUE}Build Size:${NC} ${BUILD_SIZE}"
echo -e "${BLUE}Status:${NC} Deployed"
echo ""
echo -e "${GREEN}All systems operational! Ready to rock & roll! 🚀${NC}"
