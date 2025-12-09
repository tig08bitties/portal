# 💼 Tenderly Wallets Integration

## Overview

Integration of Tenderly wallet management for monitoring and tracking wallets in your Tenderly project.

## Tenderly Wallet Management

**Dashboard URL**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets

**Add Wallet URL**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets/add

## Features

### 1. Wallet Management

**Component**: `Tenderly.tsx`

**Features**:
- View all project wallets
- Add wallets to project
- Wallet labels/names
- Direct links to Tenderly dashboard
- Wallet monitoring

**Location**: Tenderly component - "Project Wallets" search type

### 2. Tenderly Integration Library

**Library**: `tenderly-integration.ts`

**New Methods**:
- `getWalletsUrl()` - Get wallets dashboard URL
- `getAddWalletUrl()` - Get add wallet URL
- `getWalletUrl(walletAddress)` - Get specific wallet URL
- `getProjectWallets()` - Fetch all project wallets
- `addWalletToProject(walletAddress, label?)` - Add wallet to project

## Usage

### View Project Wallets

1. Open Tenderly component
2. Select "Project Wallets" from search type dropdown
3. Click "Search" or "Refresh"
4. View all wallets in your project

### Add Wallet to Project

**Via Component**:
1. Select "Project Wallets" search type
2. Enter wallet address (0x...)
3. Optionally enter a label/name
4. Click "Add Wallet"
5. Wallet is added to your Tenderly project

**Via Dashboard**:
1. Click "Open Tenderly Dashboard →" link
2. Or visit: https://dashboard.tenderly.co/tig0_0bitties/project/wallets/add
3. Add wallet through Tenderly UI

### Monitor Wallet

1. View wallet in Tenderly component
2. Click "View in Tenderly →" link
3. Monitor transactions, balance, and activity

## Integration Points

### Covenant Addresses

**Potential Integration**:
- Add covenant addresses to Tenderly for monitoring
- Track covenant address activity
- Monitor multi-chain covenant operations

### MetaMask Wallet

**Potential Integration**:
- Add connected MetaMask wallet to Tenderly
- Monitor wallet transactions
- Track DeFi activity

## API Integration

### Get Project Wallets

```typescript
import { TenderlyIntegration } from '@/lib/tenderly-integration';

const tenderly = new TenderlyIntegration();
const wallets = await tenderly.getProjectWallets();
```

### Add Wallet

```typescript
const success = await tenderly.addWalletToProject(
  '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea',
  'Covenant Address #1'
);
```

## URLs

- **Wallets Dashboard**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets
- **Add Wallet**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets/add
- **Wallet Details**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets/{address}

## Component Features

### Project Wallets Section

**Features**:
- Add wallet form (address + label)
- Wallets list display
- Refresh button
- Direct dashboard links
- Wallet detail links

**Display**:
- Wallet address
- Wallet label (if set)
- Link to Tenderly dashboard
- Count of wallets

## Use Cases

### 1. Monitor Covenant Addresses

Add the 3 official covenant addresses to Tenderly:
- Ethereum: `0x3bba654a3816a228284e3e0401cff4ea6dfc5cea`
- Polygon: `0x0c4e50157a6e82f5330b721544ce440cb0c6768f`
- Arbitrum: `0x3df07977140ad97465075129c37aec7237d74415`

### 2. Track MetaMask Wallet

Add connected MetaMask wallet for transaction monitoring.

### 3. Monitor DeFi Positions

Add DeFi protocol addresses for position tracking.

## Status

✅ **Complete** - Tenderly wallet management integration

---

**Component**: Tenderly.tsx  
**Integration**: tenderly-integration.ts  
**Dashboard**: https://dashboard.tenderly.co/tig0_0bitties/project/wallets
