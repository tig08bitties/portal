# 🌉 Jumper Exchange Integration

## Overview

Integrated Jumper Exchange (https://github.com/jumperexchange/jumper-exchange) for cross-chain bridging of MAGIC tokens within the Bridgeworld portal.

## Features

- **Multi-Chain Bridging**: Bridge MAGIC between Arbitrum, Ethereum, Base, Optimism
- **Route Finding**: Find optimal bridge routes
- **Fee Estimation**: Get bridge fees and estimated time
- **Status Tracking**: Track bridge transaction status

## Bridgeworld-Specific Routes

### Arbitrum → Ethereum
- **Purpose**: Bridge MAGIC to Ethereum mainnet
- **Use Case**: Access Ethereum DeFi, trading on mainnet
- **Token**: MAGIC (0x539bdE0d7Dbd336b79148AA742883198BBF60342)

### Ethereum → Arbitrum
- **Purpose**: Bridge MAGIC back to Arbitrum
- **Use Case**: Return to Bridgeworld ecosystem
- **Token**: MAGIC

### Arbitrum → Base
- **Purpose**: Bridge MAGIC to Base network
- **Use Case**: Use 402 Pad token launchpad
- **Token**: MAGIC

## Integration Points

### Portal Integration
- Jumper Bridge component accessible via 🌉 button
- Integrated with portal's MAGIC flow system
- Connects to covenant constants for bridge multipliers

### Game Integration
- Bridge MAGIC earned in Diablo 2 LOD game
- Cross-chain rewards system
- Multi-chain character progression

## API Usage

```typescript
import { JumperSDK } from '@/lib/jumper-sdk';

const jumper = new JumperSDK();

// Get quote
const quote = await jumper.getQuote('arbitrum', 'ethereum', 'MAGIC', '100');

// Execute bridge
const bridge = await jumper.bridgeMagicToEthereum('100', recipientAddress);

// Check status
const status = await jumper.getStatus(bridge.routeId);
```

## Component

Access via **🌉 Jumper Bridge** button (bottom-left).

Features:
- Select from/to chains
- Enter MAGIC amount
- Find bridge routes
- Execute bridge transactions
- Track bridge status

## Repository

- **GitHub**: https://github.com/jumperexchange/jumper-exchange
- **Description**: Multi-Chain Bridging & Swapping
- **License**: GNU General Public License v3.0

---

**Status**: ✅ Integrated  
**Component**: JumperBridge.tsx  
**SDK**: jumper-sdk.ts
