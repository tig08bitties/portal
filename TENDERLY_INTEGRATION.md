# 🔬 Tenderly Integration

## Overview

Integrated Tenderly blockchain debugging and monitoring platform for the Bridgeworld portal.

## Explorer URL

**Tenderly Explorer**: https://dashboard.tenderly.co/explorer

## Features

### Transaction Analysis
- **Debug Transactions**: Analyze failed transactions
- **Transaction Details**: View detailed transaction information
- **Error Analysis**: Identify transaction errors
- **Gas Analysis**: Analyze gas usage

### Contract Analysis
- **Contract Verification**: View verified contracts
- **ABI Access**: Access contract ABIs
- **Contract Monitoring**: Monitor contract activity
- **Network Support**: Ethereum and Arbitrum

### Simulation
- **Transaction Simulation**: Simulate transactions before execution
- **Gas Estimation**: Estimate gas costs
- **State Analysis**: Analyze contract state changes
- **Error Prevention**: Catch errors before execution

## Usage

### Get Transaction
```typescript
import { TenderlyIntegration } from '@/lib/tenderly-integration';

const tenderly = new TenderlyIntegration({
  apiKey: 'your-api-key',
  projectSlug: 'your-project',
  username: 'your-username',
});

const transaction = await tenderly.getTransaction('0x...', 'arbitrum');
```

### Simulate Transaction
```typescript
const simulation = await tenderly.simulateTransaction({
  from: '0x...',
  to: '0x...',
  data: '0x...',
  value: '0',
}, 'arbitrum');
```

### Get Contract
```typescript
const contract = await tenderly.getContract('0x...', 'arbitrum');
```

### Get Explorer URLs
```typescript
const txUrl = tenderly.getTransactionUrl('0x...', 'arbitrum');
const addressUrl = tenderly.getAddressUrl('0x...', 'arbitrum');
const explorerUrl = tenderly.getExplorerUrl();
```

## Component

Access via **🔬 Tenderly** button (top-right).

Features:
- Select network (Arbitrum/Ethereum)
- Search transactions or contracts
- Analyze transaction details
- View contract information
- Link to Tenderly Explorer

## Integration Points

- **Portal**: Debug portal transactions
- **Bridge**: Analyze bridge transactions
- **Contracts**: Monitor smart contracts
- **Simulation**: Test transactions before execution

## API Configuration

Set environment variables:
- `TENDERLY_API_KEY`: Your Tenderly API key
- `TENDERLY_PROJECT_SLUG`: Your project slug
- `TENDERLY_USERNAME`: Your Tenderly username

## API Endpoints

- **Transaction**: `/api/v1/account/{username}/project/{project}/transactions/{hash}`
- **Simulation**: `/api/v1/account/{username}/project/{project}/simulate`
- **Contract**: `/api/v1/account/{username}/project/{project}/contracts/{network}/{address}`

---

**Status**: ✅ Integrated  
**Component**: Tenderly.tsx  
**SDK**: tenderly-integration.ts  
**Explorer**: https://dashboard.tenderly.co/explorer
