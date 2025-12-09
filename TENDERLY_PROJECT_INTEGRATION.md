# 🔬 Tenderly Project Integration

## Overview

Enhanced Tenderly integration with project-specific contract verification and management.

## Project Details

**Username**: `tig0_0bitties`  
**Project**: `project`  
**Contracts URL**: https://dashboard.tenderly.co/tig0_0bitties/project/contracts?perPage=100

## Contract Verification

**Documentation**: https://docs.tenderly.co/contract-verification/hardhat

### Hardhat Integration
- **Verification**: Verify contracts via Hardhat plugin
- **ABI Access**: Access verified contract ABIs
- **Source Code**: View verified source code
- **Network Support**: Ethereum and Arbitrum

## Features

### Project Contracts
- **List Contracts**: View all project contracts
- **Contract Details**: View contract information
- **Verification Status**: Check if contracts are verified
- **Network Filtering**: Filter by network

### Contract Verification
- **Hardhat Plugin**: Use Tenderly Hardhat plugin
- **API Verification**: Verify via Tenderly API
- **Automatic Verification**: Auto-verify on deployment
- **Source Code**: Upload source code for verification

## Usage

### Get Project Contracts
```typescript
import { TenderlyIntegration } from '@/lib/tenderly-integration';

const tenderly = new TenderlyIntegration({
  username: 'tig0_0bitties',
  projectSlug: 'project',
});

const contracts = await tenderly.getProjectContracts();
```

### Verify Contract
```typescript
const verified = await tenderly.verifyContract({
  address: '0x...',
  name: 'MyContract',
  network: 'arbitrum',
  compilerVersion: '0.8.20',
  optimization: true,
});
```

### Get Project URLs
```typescript
const contractsUrl = tenderly.getProjectContractsUrl();
const docsUrl = tenderly.getVerificationDocsUrl();
```

## Component

Access via **🔬 Tenderly** button (top-right).

Features:
- View project contracts
- Search transactions
- Analyze contracts
- Link to project dashboard
- Access verification docs

## Hardhat Configuration

### Install Plugin
```bash
npm install --save-dev @tenderly/hardhat-tenderly
```

### Configure hardhat.config.js
```javascript
require("@tenderly/hardhat-tenderly");

module.exports = {
  tenderly: {
    username: "tig0_0bitties",
    project: "project",
    privateVerification: true,
  },
};
```

### Verify Contract
```bash
npx hardhat tenderly:verify ContractName=0x...
```

## Integration Points

- **Portal**: Verify portal contracts
- **Bridge**: Verify bridge contracts
- **Game**: Verify game contracts
- **Covenant**: Verify covenant contracts

## URLs

- **Explorer**: https://dashboard.tenderly.co/explorer
- **Project Contracts**: https://dashboard.tenderly.co/tig0_0bitties/project/contracts
- **Verification Docs**: https://docs.tenderly.co/contract-verification/hardhat

---

**Status**: ✅ Enhanced  
**Component**: Tenderly.tsx  
**SDK**: tenderly-integration.ts  
**Project**: tig0_0bitties/project
