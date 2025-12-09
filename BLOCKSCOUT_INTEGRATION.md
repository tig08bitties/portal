# 🔍 Blockscout Integration

## Overview

Integrated Blockscout blockchain explorer for the Bridgeworld portal. Blockscout is an open-source blockchain explorer that provides detailed information about transactions, addresses, and tokens.

## Repository

**GitHub**: https://github.com/blockscout/blockscout

## Features

### Explorer Functions
- **Address Lookup**: Search and view address information
- **Transaction Details**: Get transaction details by hash
- **Token Information**: View token details (MAGIC token)
- **Transaction History**: View recent transactions for addresses
- **Explorer Links**: Direct links to Arbitrum explorer

### Bridgeworld Integration
- **MAGIC Token**: Quick access to MAGIC token information
- **Address Tracking**: Track portal-related addresses
- **Transaction Monitoring**: Monitor MAGIC transactions
- **Arbitrum Chain**: Integrated with Arbitrum explorer (Arbiscan)

## Usage

### Search Address
```typescript
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

const blockscout = new BlockscoutIntegration();
const addressInfo = await blockscout.getAddress('0x...');
```

### Get Transaction
```typescript
const transaction = await blockscout.getTransaction('0x...');
```

### Get MAGIC Token
```typescript
const magicToken = await blockscout.getMagicToken();
```

### Get Explorer URLs
```typescript
const txUrl = blockscout.getTransactionUrl('0x...');
const addressUrl = blockscout.getAddressUrl('0x...');
const tokenUrl = blockscout.getTokenUrl('0x...');
```

## Component

Access via **🔍 Blockscout** button (top-left).

Features:
- Search addresses, transactions, tokens
- View MAGIC token information
- Track transaction history
- Direct links to Arbitrum explorer
- Quick MAGIC token lookup

## Integration Points

- **Portal**: Track MAGIC transactions
- **Wallet**: View wallet transaction history
- **Bridge**: Monitor bridge transactions
- **Tokens**: Display MAGIC token stats

## API Endpoints

- **Transaction**: `/api?module=proxy&action=eth_getTransactionByHash`
- **Address**: `/api?module=account&action=balance`
- **Token**: `/api?module=token&action=tokeninfo`
- **Transactions**: `/api?module=account&action=txlist`

## Explorer URLs

- **Arbitrum**: https://arbiscan.io
- **Blockscout**: https://blockscout.com

---

**Status**: ✅ Integrated  
**Component**: Blockscout.tsx  
**SDK**: blockscout-integration.ts  
**Repository**: https://github.com/blockscout/blockscout
