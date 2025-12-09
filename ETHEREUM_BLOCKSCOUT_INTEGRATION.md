# 🔍 Ethereum Blockscout Integration

## Overview

Enhanced Blockscout integration to support both Ethereum mainnet and Arbitrum chains.

## Explorer URLs

- **Ethereum**: https://eth.blockscout.com/
- **Arbitrum**: https://arbiscan.io/ (via Blockscout API)

## Features

### Multi-Chain Support
- **Ethereum Mainnet**: Full Blockscout explorer integration
- **Arbitrum**: Blockscout API integration
- **Chain Switching**: Switch between chains in UI
- **Unified Interface**: Same interface for all chains

### Explorer Functions
- **Address Lookup**: Search addresses on Ethereum or Arbitrum
- **Transaction Details**: Get transaction details by hash
- **Token Information**: View token details (MAGIC on Arbitrum)
- **Transaction History**: View recent transactions
- **Explorer Links**: Direct links to appropriate explorer

## Usage

### Switch Chain
```typescript
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

const blockscout = new BlockscoutIntegration({ chainId: '1' }); // Ethereum
// Or
const blockscout = new BlockscoutIntegration({ chainId: '42161' }); // Arbitrum

// Switch chain dynamically
blockscout.switchChain('1'); // Switch to Ethereum
```

### Get Available Chains
```typescript
const chains = BlockscoutIntegration.getChains();
// Returns: [{ id: '1', name: 'Ethereum', ... }, { id: '42161', name: 'Arbitrum', ... }]
```

### Get Chain Info
```typescript
const chainInfo = blockscout.getChainInfo();
// Returns current chain configuration
```

## Component

Access via **🔍 Blockscout** button (top-left).

Features:
- Select chain (Ethereum or Arbitrum)
- Search addresses, transactions, tokens
- View MAGIC token information (Arbitrum)
- Track transaction history
- Direct links to explorers

## Integration Points

- **Portal**: Track transactions on both chains
- **Wallet**: View wallet history on Ethereum/Arbitrum
- **Bridge**: Monitor bridge transactions
- **Tokens**: Display token stats on both chains

## API Endpoints

### Ethereum
- **API**: https://eth.blockscout.com/api
- **Explorer**: https://eth.blockscout.com

### Arbitrum
- **API**: https://arbiscan.io/api
- **Explorer**: https://arbiscan.io

---

**Status**: ✅ Enhanced  
**Component**: Blockscout.tsx  
**SDK**: blockscout-integration.ts  
**Ethereum Explorer**: https://eth.blockscout.com/
