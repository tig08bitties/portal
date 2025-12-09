# 🦊 MetaMask SDK Integration

## Overview

Integrated MetaMask SDK for wallet connectivity and interaction with Bridgeworld portal, including access to magic items from TreasureDAO agents.

## Features

- **Wallet Connection**: Connect MetaMask wallet
- **MAGIC Balance**: Display MAGIC token balance
- **Agent Integration**: Fetch magic items from TreasureDAO agents
- **Soulbound Items**: Support for soulbound-178 agent
- **Message Signing**: Sign messages with MetaMask
- **Network Switching**: Switch between chains

## Agent Integration

### Soulbound Agent (soulbound-178)

Access magic items from: https://treasure.lol/agents/soulbound-178

The integration:
- Fetches agent data from TreasureDAO API
- Displays magic items in wallet panel
- Shows soulbound status
- Links to agent page on treasure.lol

## Usage

```typescript
import { MetaMaskIntegration } from '@/lib/metamask-integration';

const metamask = new MetaMaskIntegration();

// Connect wallet
const account = await metamask.connect();

// Get MAGIC balance
const balance = await metamask.getMagicBalance();

// Get magic items
const items = await metamask.getMagicItems('soulbound-178');

// Sign message
const signature = await metamask.signMessage('Bridgeworld Portal');
```

## Component

Access via **🦊 MetaMask Wallet** button (top-right).

Features:
- Connect/disconnect wallet
- View account address
- Display MAGIC balance
- Show magic items from agent
- Link to treasure.lol agent page

## Integration Points

- **Portal**: Connect wallet to activate portal features
- **Game**: Use MAGIC balance for in-game transactions
- **Bridge**: Bridge MAGIC tokens across chains
- **Covenant**: Sign messages for covenant verification

## Dependencies

- `@metamask/sdk`: ^0.33.1
- `@metamask/sdk-react`: React hooks (optional)

---

**Status**: ✅ Integrated  
**Component**: MetaMaskWallet.tsx  
**SDK**: metamask-integration.ts  
**Agent**: soulbound-178
