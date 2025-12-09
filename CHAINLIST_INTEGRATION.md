# 🔗 Chainlist Integration

## Overview

Integration of Chainlist.org for easy addition of EVM-compatible chains to MetaMask wallets, supporting the multi-chain covenant addresses.

## Chainlist.org

**URL**: https://chainlist.org/

**Purpose**: Standard EVM chain registry for adding chains to MetaMask and other EVM-compatible wallets.

## Supported Chains

### Covenant Chains

1. **Ethereum Mainnet** (Chain ID: 1)
   - Native: ETH
   - Explorer: Etherscan, Blockscout
   - Chainlist: https://chainlist.org/chain/1

2. **Polygon Mainnet** (Chain ID: 137)
   - Native: MATIC
   - Explorer: Polygonscan
   - Chainlist: https://chainlist.org/chain/137

3. **Arbitrum One** (Chain ID: 42161)
   - Native: ETH
   - Explorer: Arbiscan, Blockscout
   - Chainlist: https://chainlist.org/chain/42161

## Features

### 1. Chainlist Component

**Component**: `Chainlist.tsx`

**Features**:
- Display all covenant chains
- "Add to MetaMask" button for each chain
- Direct links to Chainlist.org
- Chain information display
- Covenant address preview

**Location**: Fixed top-right corner (🔗 Chainlist button)

### 2. Chainlist Integration Library

**Library**: `chainlist-integration.ts`

**Methods**:
- `getCovenantChains()` - Get all covenant chain info
- `getChainInfo(chainId)` - Get specific chain info
- `getChainlistUrl(chainId)` - Get Chainlist URL
- `getMetaMaskChainParams(chainId)` - Get MetaMask add chain parameters

### 3. MetaMask Integration

**Add Chain to MetaMask**:
- One-click chain addition
- Automatic RPC configuration
- Block explorer setup
- Native currency configuration

## Usage

### Add Chain to MetaMask

1. Click **🔗 Chainlist** button (top-right)
2. Select a chain (Ethereum, Polygon, Arbitrum)
3. Click "Add to MetaMask"
4. Approve the chain addition in MetaMask
5. Chain is now available in your wallet

### Manual Chain Addition

1. Click "Chainlist →" link
2. Search for the chain on Chainlist.org
3. Click "Add to MetaMask" on Chainlist
4. Approve in MetaMask

## Integration Points

### Covenant Addresses Component

**Enhanced**:
- Added Chainlist link for each covenant address
- Quick access to add chain for address's network
- Chain-specific Chainlist URLs

### Chainlist Component

**Features**:
- Shows all three covenant chains
- Displays covenant address for each chain
- Add to MetaMask functionality
- Direct Chainlist.org links
- Explorer links

## Chain Information

### Ethereum Mainnet
- **Chain ID**: 1
- **Native Currency**: ETH
- **RPC**: https://eth.blockscout.com
- **Explorer**: https://eth.blockscout.com
- **Covenant Address**: 0x3bba654a3816a228284e3e0401cff4ea6dfc5cea

### Polygon Mainnet
- **Chain ID**: 137
- **Native Currency**: MATIC
- **RPC**: https://polygon-rpc.com
- **Explorer**: https://polygonscan.com
- **Covenant Address**: 0x0c4e50157a6e82f5330b721544ce440cb0c6768f

### Arbitrum One
- **Chain ID**: 42161
- **Native Currency**: ETH
- **RPC**: https://arb1.arbitrum.io/rpc
- **Explorer**: https://arbitrum.blockscout.com
- **Covenant Address**: 0x3df07977140ad97465075129c37aec7237d74415

## Component Features

### Chainlist Component

**Position**: Fixed top-right corner  
**Color**: Indigo theme  
**Icon**: 🔗

**Features**:
- Chain information display
- Add to MetaMask buttons
- Chainlist.org links
- Covenant address preview
- Explorer links
- About section

### Covenant Addresses Integration

**New Feature**:
- Chainlist link for each address
- Quick access to add chain
- Chain-specific Chainlist URLs

## URLs

- **Chainlist.org**: https://chainlist.org/
- **Ethereum**: https://chainlist.org/chain/1
- **Polygon**: https://chainlist.org/chain/137
- **Arbitrum**: https://chainlist.org/chain/42161

## MetaMask Integration

### Add Chain Parameters

Each chain includes:
- Chain ID (hex format)
- Chain name
- Native currency (name, symbol, decimals)
- RPC URLs
- Block explorer URLs

### Usage Example

```typescript
import { ChainlistIntegration } from '@/lib/chainlist-integration';

const chainlist = new ChainlistIntegration();
const params = chainlist.getMetaMaskChainParams(42161);

// Add to MetaMask
await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [params],
});
```

## Status

✅ **Complete** - Chainlist integration with MetaMask support

---

**Component**: Chainlist.tsx  
**Integration**: chainlist-integration.ts  
**URL**: https://chainlist.org/
