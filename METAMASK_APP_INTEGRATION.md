# 🦊 MetaMask App Integration

## Overview

Integrated MetaMask Web App interface for accessing MetaMask features directly from the Bridgeworld portal.

## App URL

**MetaMask App**: https://app.metamask.io/

## Features

### Available Features
- **💼 Portfolio**: View all assets and balances
- **🔄 Swaps**: Swap tokens across chains
- **🌉 Bridge**: Cross-chain token bridging
- **💰 Staking**: Stake assets and earn rewards
- **🖼️ NFTs**: View and manage NFT collections
- **📊 Activity**: Transaction history and activity

### Integration Points
- **Wallet Connection**: Check if MetaMask is installed
- **Address Detection**: Use connected wallet address
- **Deep Linking**: Direct links to specific features
- **Download Link**: Link to MetaMask download if not installed

## Usage

### Open MetaMask App
```typescript
import { MetaMaskAppIntegration } from '@/lib/metamask-app-integration';

const metamaskApp = new MetaMaskAppIntegration();

// Open portfolio
metamaskApp.openApp('portfolio', address);

// Open swaps
metamaskApp.openApp('swaps');

// Open bridge
metamaskApp.openApp('bridge');
```

### Get Feature URLs
```typescript
const portfolioUrl = metamaskApp.getPortfolioUrl(address);
const swapsUrl = metamaskApp.getSwapsUrl();
const bridgeUrl = metamaskApp.getBridgeUrl();
```

### Check Installation
```typescript
const installed = metamaskApp.isMetaMaskInstalled();
```

## Component

Access via **🦊 MetaMask App** button (top-left).

Features:
- Quick access to MetaMask features
- Portfolio, Swaps, Bridge, Staking, NFTs, Activity
- Direct links to MetaMask app
- Installation detection
- Connected wallet address display

## Integration Points

- **Wallet**: Use connected MetaMask address
- **Portfolio**: Track assets via MetaMask app
- **Swaps**: Swap MAGIC and other tokens
- **Bridge**: Bridge tokens across chains
- **Staking**: Stake MAGIC tokens
- **NFTs**: View Bridgeworld NFTs

## URLs

- **App**: https://app.metamask.io/
- **Portfolio**: https://app.metamask.io/portfolio
- **Swaps**: https://app.metamask.io/swaps
- **Bridge**: https://app.metamask.io/bridge
- **Staking**: https://app.metamask.io/staking
- **NFTs**: https://app.metamask.io/nfts
- **Activity**: https://app.metamask.io/activity
- **Download**: https://metamask.io/download/

---

**Status**: ✅ Integrated  
**Component**: MetaMaskApp.tsx  
**SDK**: metamask-app-integration.ts  
**App**: https://app.metamask.io/
