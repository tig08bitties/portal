# 🪙 Token Contract Integration

## Overview

Enhanced Blockscout integration to support token contract viewing with tab parameters, including Chainlink (LINK) token.

## Token Contracts

### Chainlink (LINK) Token

**Address**: `0xf97f4df75117a78c1A5a0DBb814Af92458539FB4`  
**Chain**: Arbitrum (Chain ID: 42161)  
**Category**: Token  
**Contract Code URL**: https://arbitrum.blockscout.com/token/0xf97f4df75117a78c1A5a0DBb814Af92458539FB4?tab=contract

### MAGIC Token

**Address**: `0x539bdE0d7Dbd336b79148AA742883198BBF60342`  
**Chain**: Arbitrum (Chain ID: 42161)  
**Category**: Token  
**Contract Code URL**: https://arbitrum.blockscout.com/address/0x539bdE0d7Dbd336b79148AA742883198BBF60342?tab=contract

## Features

### Token Contract Tab Support

**Enhanced Method**: `getTokenUrl()`

**Tab Parameters**:
- `?tab=contract` - View token contract code
- `?tab=transactions` - View token transactions
- `?tab=holders` - View token holders
- `?tab=inventory` - View token inventory

### Notable Tokens

**Added Tokens**:
- Chainlink (LINK) - Decentralized oracle network token
- MAGIC Token - TreasureDAO native token

**Features**:
- Verified contract indicators
- Direct contract code links
- Quick access from Notable Addresses
- Token search support

## Integration Points

### Token Search Results

**Enhanced Display**:
- Shows token name dynamically
- Contract code link for verified tokens
- Dual links: Explorer and Contract Code
- Auto-detection of notable tokens

### Notable Addresses

**Chainlink Token**:
- Added to Notable Addresses list
- Verified contract badge
- Contract code quick access
- Chain-specific filtering

### Explorer Links

**New Links**:
- Chainlink (LINK) Contract → Direct link to contract code
- MAGIC Token Contract → Direct link to contract code

## Usage

### View Token Contract

```typescript
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

const blockscout = new BlockscoutIntegration({ chainId: '42161' });

// Get token URL with contract tab
const linkContractUrl = blockscout.getTokenUrl(
  '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  'contract'
);
```

### Search Token

1. Select "Token" search type
2. Enter token address or symbol
3. View token information
4. Click "Contract Code →" for verified tokens

## Component Features

### Token Results Panel

- **Dynamic Title**: Shows token name
- **Token Info**: Name, symbol, supply, holders
- **Contract Code Link**: For verified tokens
- **Explorer Link**: Standard token page

### Notable Addresses

- **Chainlink Token**: Listed in Notable Addresses
- **Verified Badge**: Shows verification status
- **Quick Access**: Direct contract code link
- **Chain Filtering**: Shows on Arbitrum chain

## URLs

- **Chainlink Contract**: https://arbitrum.blockscout.com/token/0xf97f4df75117a78c1A5a0DBb814Af92458539FB4?tab=contract
- **MAGIC Token Contract**: https://arbitrum.blockscout.com/address/0x539bdE0d7Dbd336b79148AA742883198BBF60342?tab=contract
- **Arbitrum Blockscout**: https://arbitrum.blockscout.com/

## Future Enhancements

- Add more notable tokens (USDC, WETH, etc.)
- Token price tracking
- Token holder analysis
- Token transfer history
- Token metadata display

## Status

✅ **Complete** - Token contract viewing with tab parameters integrated

---

**Component**: Blockscout.tsx  
**Integration**: blockscout-integration.ts  
**Chainlink Token**: 0xf97f4df75117a78c1A5a0DBb814Af92458539FB4
