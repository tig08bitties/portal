# 🔗 Tenderly Node & RPC Integration

## Overview

Complete integration of Tenderly Node Extensions, RPC Provider, and Webhook system.

## Node Configuration

**Node ID**: `c11796d7-c128-4ef0-8640-e6bcf59ea03b`  
**RPC URL**: `https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb`  
**Webhook ID**: `ad800d90-a387-4f79-8b9a-74b6a85bc847`  
**Integration URL**: https://dashboard.tenderly.co/tig0_0bitties/project/node/c11796d7-c128-4ef0-8640-e6bcf59ea03b/integrate

## Features

### 1. RPC Provider Integration

**Ethers.js Provider**:
```typescript
import { TenderlyIntegration } from '@/lib/tenderly-integration';

const tenderly = new TenderlyIntegration({
  rpcUrl: 'https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb',
});

// Get ethers provider
const provider = await tenderly.getEthersProvider();

// Get current block number
const blockNumber = await tenderly.getBlockNumber();
```

**Example Usage**:
```typescript
import { ethers } from "ethers";

const RPC_URL = "https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb"

async function executeMethod() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);
}

await executeMethod();
```

### 2. Webhook Integration

**Webhook Endpoint**: `/api/tenderly/webhook`

**Trigger Webhook**:
```bash
curl -X POST -H "Content-Type: application/json" \
  https://api.tenderly.co/api/v1/actions/ad800d90-a387-4f79-8b9a-74b6a85bc847/webhook \
  -d '{"exampleKey": "exampleValue"}'
```

**Via SDK**:
```typescript
const success = await tenderly.triggerWebhook({
  exampleKey: "exampleValue",
  timestamp: new Date().toISOString(),
});
```

**Webhook Handler**:
- Receives POST requests at `/api/tenderly/webhook`
- Processes transaction, block, and contract events
- Returns success confirmation

### 3. Node Extensions Library

**GitHub**: https://github.com/Tenderly/node-extensions-library

Create custom JSON-RPC methods with Tenderly Node Extension Library.

**Documentation**: https://docs.tenderly.co/node/integrations-chain-interaction/ethers

## Component Features

### Tenderly Component

**New Options**:
- **RPC Provider**: Test RPC connection and get block number
- **Webhook Test**: Trigger webhook with custom JSON data
- **Node Integration**: Direct links to node dashboard

**RPC Test**:
1. Select "RPC Provider" from search type
2. Click "Test RPC"
3. View connection status and current block number

**Webhook Test**:
1. Enter JSON data in webhook textarea
2. Click "Trigger Webhook"
3. View success status and response

## API Routes

### `/api/tenderly/webhook`

**POST**: Receive webhook events from Tenderly
- Handles transaction events
- Handles block events
- Handles contract events

**GET**: Returns webhook status and configuration

## Integration Points

### Portal Integration
- RPC provider for blockchain queries
- Webhook events for real-time monitoring
- Node extensions for custom methods

### Bridgeworld Integration
- Use Tenderly RPC for cross-chain queries
- Monitor bridge transactions via webhooks
- Extend node with custom bridge methods

### Game Integration
- Query game contract state via RPC
- Monitor game events via webhooks
- Custom game-specific RPC methods

## Environment Variables

```bash
TENDERLY_API_KEY=your_api_key
TENDERLY_RPC_URL=https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb
TENDERLY_NODE_ID=c11796d7-c128-4ef0-8640-e6bcf59ea03b
TENDERLY_WEBHOOK_ID=ad800d90-a387-4f79-8b9a-74b6a85bc847
TENDERLY_USERNAME=tig0_0bitties
TENDERLY_PROJECT_SLUG=project
```

## URLs

- **Node Integration**: https://dashboard.tenderly.co/tig0_0bitties/project/node/c11796d7-c128-4ef0-8640-e6bcf59ea03b/integrate
- **Node Extensions**: https://github.com/Tenderly/node-extensions-library
- **Integration Docs**: https://docs.tenderly.co/node/integrations-chain-interaction/ethers
- **RPC URL**: https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb
- **Webhook URL**: https://api.tenderly.co/api/v1/actions/ad800d90-a387-4f79-8b9a-74b6a85bc847/webhook

## Dependencies

- **ethers**: ^6.13.0 - Ethereum library for RPC provider

## Status

✅ **Complete** - RPC Provider, Webhook, and Node Extensions integrated

---

**Component**: Tenderly.tsx  
**SDK**: tenderly-integration.ts  
**API Route**: app/api/tenderly/webhook/route.ts  
**Node**: c11796d7-c128-4ef0-8640-e6bcf59ea03b
