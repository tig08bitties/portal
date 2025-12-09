# 💼 DeBank Integration

## Overview

Integrated DeBank DeFi portfolio tracker and analytics platform for the Bridgeworld portal.

## Profile URL

**Default Address**: `0x3bba654a3816a228284e3e0401cff4ea6dfc5cea`  
**Profile**: https://debank.com/profile/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea

## Features

### Portfolio Tracking
- **Total Value**: Track total USD value across all chains
- **Net Worth**: Calculate net worth (assets - debt)
- **Token Balances**: View all token holdings
- **Protocol Positions**: Track DeFi protocol positions
- **NFT Holdings**: View NFT collections

### MAGIC Token Integration
- **MAGIC Balance**: Quick access to MAGIC token balance
- **MAGIC Value**: USD value of MAGIC holdings
- **Price Tracking**: Current MAGIC token price

### Multi-Chain Support
- **Arbitrum**: Primary chain for TreasureDAO
- **Ethereum**: Mainnet support
- **All Chains**: Cross-chain portfolio aggregation

## Usage

### Get Profile
```typescript
import { DeBankIntegration } from '@/lib/debank-integration';

const debank = new DeBankIntegration();
const profile = await debank.getProfile('0x...');
```

### Get MAGIC Balance
```typescript
const magicBalance = await debank.getMagicBalance('0x...');
// Returns: { amount, amountUSD, price }
```

### Get Token List
```typescript
const tokens = await debank.getTokenList('0x...');
```

### Get Protocol Positions
```typescript
const protocols = await debank.getProtocolPositions('0x...');
```

## Component

Access via **💼 DeBank** button (bottom-left).

Features:
- Enter address to track
- View portfolio summary
- Check MAGIC token balance
- See top tokens
- View DeFi protocol positions
- Link to full DeBank profile

## Integration Points

- **Wallet**: Display portfolio value
- **MAGIC Tracking**: Monitor MAGIC holdings
- **DeFi Positions**: Track protocol interactions
- **Cross-Chain**: Aggregate multi-chain assets

## API Endpoints

- **Total Balance**: `/v1/user/total_balance`
- **Token List**: `/v1/user/token_list`
- **Protocol List**: `/v1/user/protocol_list`

## API Key

Set `DEBANK_API_KEY` environment variable for full API access.

---

**Status**: ✅ Integrated  
**Component**: DeBank.tsx  
**SDK**: debank-integration.ts  
**Platform**: https://debank.com
