# ⭐ Ethereum 2.0 Deposit Contract Integration

## Overview

Integration of notable Ethereum addresses, including the Ethereum 2.0 Deposit Contract, into the Blockscout explorer.

## Notable Addresses

### Ethereum 2.0 Deposit Contract

**Address**: `0x00000000219ab540356cBB839Cbe05303d7705Fa`  
**Chain**: Ethereum Mainnet (Chain ID: 1)  
**Category**: Staking  
**Description**: Official contract for ETH deposits to become validators on Ethereum 2.0

**Blockscout URL**: https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa  
**Contract Code URL**: https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa?tab=contract

### MAGIC Token

**Address**: `0x539bdE0d7Dbd336b79148AA742883198BBF60342`  
**Chain**: Arbitrum (Chain ID: 42161)  
**Category**: Token  
**Description**: TreasureDAO native token - substance of the metaverse

## Features

### Notable Addresses Section

**Component**: `Blockscout.tsx`

**Features**:
- Display notable addresses filtered by current chain
- Quick access buttons to view addresses
- Direct links to Blockscout explorer
- Category-based organization

**Location**: Blockscout Explorer panel

### Integration Methods

**Library**: `blockscout-integration.ts`

**New Methods**:
- `getNotableAddresses()` - Get all notable addresses
- `getNotableAddress(address)` - Get notable address by address

## Usage

### View Notable Address

```typescript
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

// Get all notable addresses
const notable = BlockscoutIntegration.getNotableAddresses();

// Get specific address
const depositContract = BlockscoutIntegration.getNotableAddress(
  '0x00000000219ab540356cBB839Cbe05303d7705Fa'
);
```

### Component Integration

The Blockscout component automatically:
- Loads notable addresses on mount
- Filters by current chain
- Provides quick access buttons
- Shows direct explorer links

## Ethereum 2.0 Deposit Contract

### Purpose

The Ethereum 2.0 Deposit Contract is the official contract where users deposit ETH to become validators on Ethereum's Proof-of-Stake network.

### Key Information

- **Total Deposits**: Over 32 million ETH
- **Validators**: Thousands of active validators
- **Minimum Stake**: 32 ETH per validator
- **Network**: Ethereum Mainnet

### Integration Points

- **Blockscout Explorer**: Direct link to contract page
- **Notable Addresses**: Quick access from explorer
- **Chain Selection**: Automatically switches to Ethereum when selected

## Component Features

### Notable Addresses Panel

- **Title**: ⭐ Notable Addresses
- **Filtering**: Shows addresses for current chain
- **Quick View**: Click to load address in search
- **Direct Links**: Links to Blockscout explorer
- **Chain Hint**: Shows message when no addresses for current chain

### Explorer Links

- **Ethereum Explorer**: Main Blockscout page
- **Ethereum 2.0 Deposit Contract**: Direct link to contract
- **Arbitrum Explorer**: Arbitrum Blockscout page
- **GitHub**: Blockscout repository

## Future Enhancements

- Add more notable addresses (Uniswap, Aave, etc.)
- Support for multiple chains
- Address favorites/bookmarks
- Transaction history for notable addresses
- Balance tracking
- Event monitoring

## Contract Code Viewing

### Tab Support

The integration now supports Blockscout tab parameters:
- `?tab=contract` - View contract code
- `?tab=transactions` - View transactions
- `?tab=tokens` - View tokens
- `?tab=internal` - View internal transactions

### Contract Code Access

**Ethereum 2.0 Deposit Contract Code**:  
https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa?tab=contract

**Features**:
- Direct link to contract code tab
- Verified contract indicator
- Quick access from Notable Addresses
- Contract code link in address results

## URLs

- **Ethereum Blockscout**: https://eth.blockscout.com/
- **Ethereum 2.0 Deposit Contract**: https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa
- **Contract Code**: https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa?tab=contract
- **Arbitrum Explorer**: https://arbitrum.blockscout.com/
- **MAGIC Token Contract**: https://arbitrum.blockscout.com/address/0x539bdE0d7Dbd336b79148AA742883198BBF60342?tab=contract
- **Blockscout GitHub**: https://github.com/blockscout/blockscout

## Status

✅ **Complete** - Ethereum 2.0 Deposit Contract and notable addresses integrated

---

**Component**: Blockscout.tsx  
**Integration**: blockscout-integration.ts  
**Address**: 0x00000000219ab540356cBB839Cbe05303d7705Fa
