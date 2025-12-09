# 🔍 Ethereum Bytecode Database Integration

## Overview

Integration of Blockscout's Ethereum Bytecode Database (EBD) microservice for cross-chain contract verification and bytecode-to-source code discovery.

## Blockscout Ethereum Bytecode Database

**Documentation**: https://docs.blockscout.com/for-developers/information-and-settings/ethereum-bytecode-database-microservice

**API Swagger**: https://app.swaggerhub.com/apis/rimrakhimov/EthereumBytecodeDatabase/v2

**GitHub**: https://github.com/blockscout/blockscout-rs/tree/main/eth-bytecode-db

## Key Features

### 1. Bytecode → Source Code Mapping

Unlike traditional approaches that require:
- Chain ID → Contract Address → Source Code

EBD uses:
- **Bytecode → Source Code**

This allows:
- Cross-chain contract verification
- Finding source code for unverified contracts
- Discovering contracts with identical bytecode across chains

### 2. Main Bytecode vs Metadata

EBD splits bytecode into two parts:
- **Main Bytecode**: Functional EVM code
- **Metadata Bytecode**: Compiler metadata, hash, etc.

Similar contract search uses only the Main bytecode, ignoring metadata differences.

### 3. Database Statistics

- **>130k verified source codes**
- **~100k unique main bytecodes**
- Cross-chain matching enabled
- Unverified contract discovery

## Integration Features

### 1. BytecodeDB Component

**Component**: `BytecodeDB.tsx`

**Location**: Fixed bottom-left corner (🔍 Bytecode DB button)

**Features**:
- Search by bytecode
- Search by contract address (with chain selection)
- Find similar contracts
- Display source code
- Show contract metadata (compiler version, optimization, etc.)
- Database statistics

### 2. BytecodeDB Integration Library

**Library**: `bytecode-db-integration.ts`

**Methods**:
- `searchByBytecode(bytecode)` - Find source code by bytecode
- `searchSimilarContracts(bytecode)` - Find contracts with similar main bytecode
- `getContractSourceFromAddress(address, chainId)` - Get source from address using EBD
- `extractMainBytecode(bytecode)` - Extract functional bytecode (exclude metadata)
- `formatBytecode(bytecode)` - Format bytecode for display
- `isValidBytecode(bytecode)` - Validate bytecode format
- `getDatabaseStats()` - Get database statistics

## Usage Examples

### Search by Bytecode

```typescript
import { BytecodeDBIntegration } from '@/lib/bytecode-db-integration';

const bytecodeDB = new BytecodeDBIntegration();
const result = await bytecodeDB.searchByBytecode('0x608060405234801561001057600080fd5b50...');

if (result) {
  console.log('Source Code:', result.sourceCode);
  console.log('Contract Name:', result.contractName);
  console.log('Compiler:', result.compilerVersion);
}
```

### Search by Address

```typescript
// Get source code for an unverified contract
const result = await bytecodeDB.getContractSourceFromAddress(
  '0xF014bFBf6785928d9531Ca460a6f75e79cc46A21',
  '1' // Ethereum Mainnet
);
```

### Find Similar Contracts

```typescript
// Find contracts with similar bytecode across chains
const similar = await bytecodeDB.searchSimilarContracts('0x608060405234801561001057600080fd5b50...');

similar.forEach(contract => {
  console.log('Contract:', contract.contractName);
  console.log('Chains:', contract.chains);
  console.log('Similarity:', contract.similarity);
});
```

## Component Features

### BytecodeDB Component

**Position**: Fixed bottom-left corner  
**Color**: Cyan theme  
**Icon**: 🔍

**Search Types**:
1. **By Bytecode**: Direct bytecode search
2. **By Address**: Get bytecode from address, then search EBD
3. **Similar Contracts**: Find contracts with similar main bytecode

**Display**:
- Source code preview
- Contract metadata
- Compiler information
- Similarity scores
- Chain information
- Database statistics

## API Integration

### Endpoints

The EBD service uses the same API as Blockscout's smart-contract-verifier:

- **Search by Bytecode**: `GET /api/v2/smart-contracts/by-bytecode/{bytecode}`
- **Similar Contracts**: `GET /api/v2/smart-contracts/similar/{mainBytecode}`
- **Verification Proxy**: Same endpoints as verifier service

### Configuration

To use EBD instead of standard verifier, set:
```
RUST_VERIFICATION_SERVICE_URL=https://eth-bytecode-db-service-url
```

## Benefits

### 1. Cross-Chain Verification

- Verify contract on one chain, use source on another
- No need to re-verify identical contracts
- Shared verification database

### 2. Unverified Contract Discovery

- Find source code for unverified contracts
- Match bytecode to verified sources
- Discover contract functionality

### 3. Similar Contract Search

- Find contracts with similar functionality
- Track contract deployments across chains
- Identify contract clones/variants

### 4. Extractor Support

- Import verified contracts from multiple explorers
- Build comprehensive database
- Support for Sourcify, Etherscan, Blockscout

## Database Growth

### Current Status
- **>130k source codes** in production database
- **~100k unique main bytecodes**
- Active on Ethereum Mainnet, Goerli, Gnosis, Optimism, and more

### Future Plans
1. Blockscout extractor (import all previously verified contracts)
2. Prioritization techniques for better matches
3. Public search page (similar to 4byte.directory)
4. Sourcify extractor (expand to ~400-500k contracts)
5. Metadata verification support

## Integration Points

### Blockscout Component

**Enhanced**:
- Can use BytecodeDB to find source for unverified contracts
- Cross-chain contract discovery
- Similar contract matching

### Covenant Addresses

**Potential Enhancement**:
- Use BytecodeDB to verify covenant contract sources
- Find similar covenant implementations
- Cross-chain covenant verification

## URLs

- **Documentation**: https://docs.blockscout.com/for-developers/information-and-settings/ethereum-bytecode-database-microservice
- **API Swagger**: https://app.swaggerhub.com/apis/rimrakhimov/EthereumBytecodeDatabase/v2
- **GitHub**: https://github.com/blockscout/blockscout-rs/tree/main/eth-bytecode-db
- **Production**: Available on all hosted Blockscout instances

## Example Contracts

### Safe Smart Account
- **Address**: 0xF014bFBf6785928d9531Ca460a6f75e79cc46A21
- **Explorer**: https://adilchain-scan.io/token/0xF014bFBf6785928d9531Ca460a6f75e79cc46A21/read-contract
- **GitHub**: https://github.com/safe-fndn/safe-smart-account

Use BytecodeDB to find source code for this contract even if it's not verified on the current chain.

## Status

✅ **Complete** - BytecodeDB integration with search functionality

---

**Component**: BytecodeDB.tsx  
**Integration**: bytecode-db-integration.ts  
**Documentation**: https://docs.blockscout.com/for-developers/information-and-settings/ethereum-bytecode-database-microservice
