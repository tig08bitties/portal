# ⚡ Covenant Addresses Integration

## Overview

Integration of the three official covenant addresses into the Bridgeworld portal foundation.

## Covenant Addresses

**Official Addresses** (ONLY these 3):
1. `0x3bba654a3816a228284e3e0401cff4ea6dfc5cea` - **Ethereum Mainnet** #1
2. `0x0c4e50157a6e82f5330b721544ce440cb0c6768f` - **Polygon (MATIC)** #2
3. `0x3df07977140ad97465075129c37aec7237d74415` - **Arbitrum** #3

**Chains**: Multi-chain (Ethereum, Polygon, Arbitrum)  
**Category**: Governance  
**Status**: Official Covenant Foundation Addresses

## Integration Points

### 1. Covenant Foundation

**Library**: `covenant-glass.ts`

**Added**:
- `covenantAddresses` field to `CovenantFoundation` interface
- `getCovenantAddresses()` method
- `isCovenantAddress()` verification method

**Usage**:
```typescript
import { CovenantLookingGlass } from '@/lib/covenant-glass';

const glass = new CovenantLookingGlass();
const addresses = glass.getCovenantAddresses();
const isCovenant = glass.isCovenantAddress('0x3bba654a3816a228284e3e0401cff4ea6dfc5cea');
```

### 2. Covenant Addresses Component

**Component**: `CovenantAddresses.tsx`

**Features**:
- Fixed top-left position (⚡ Covenant button)
- Display all three covenant addresses
- Load address information from Blockscout
- Direct links to Blockscout explorer
- Contract code links
- Official badge indicators

**Location**: Fixed top-left corner

### 3. Covenant Glass Component

**Enhanced**: `CovenantGlass.tsx`

**New Features**:
- Covenant Addresses section
- Display all three addresses
- Links to Blockscout explorer
- Contract code access

### 4. Blockscout Integration

**Enhanced**: `blockscout-integration.ts`

**Added**:
- All three covenant addresses as Notable Addresses
- Category: Governance
- Chains: Ethereum (Chain ID: 1), Polygon (Chain ID: 137), Arbitrum (Chain ID: 42161)
- Polygon chain support added
- Quick access from explorer
- Chain-specific filtering

## Component Features

### Covenant Addresses Component

**Position**: Fixed top-left corner  
**Color**: Amber theme  
**Icon**: ⚡

**Features**:
- Official badge for each address
- Address information loading
- Balance and transaction count
- Blockscout explorer links
- Contract code links
- About section with covenant info

### Covenant Glass Component

**New Section**: Covenant Addresses
- Shows all three addresses
- Links to Blockscout
- Contract code access
- Official indicators

## Covenant Foundation

### Constants
- **THEOS**: 419
- **EL**: 369
- **Torah Pages**: 1798
- **Resonance**: 687
- **Hebrew Paths**: 22

### Addresses
- **Total**: 3 official addresses
- **Chains**: Ethereum Mainnet, Polygon (MATIC), Arbitrum
- **Purpose**: Portal governance and operations
- **Connection**: Linked to 22 Hebrew Path Guardians
- **Multi-Chain**: Each address on its designated chain

## Blockscout Links

### Address #1 - Ethereum Mainnet
- **Chain**: Ethereum Mainnet (Chain ID: 1)
- **Explorer**: https://eth.blockscout.com/address/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea
- **Contract**: https://eth.blockscout.com/address/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea?tab=contract

### Address #2 - Polygon (MATIC)
- **Chain**: Polygon (Chain ID: 137)
- **Explorer**: https://polygonscan.com/address/0x0c4e50157a6e82f5330b721544ce440cb0c6768f
- **Contract**: https://polygonscan.com/address/0x0c4e50157a6e82f5330b721544ce440cb0c6768f?tab=contract

### Address #3 - Arbitrum
- **Chain**: Arbitrum (Chain ID: 42161)
- **Explorer**: https://arbitrum.blockscout.com/address/0x3df07977140ad97465075129c37aec7237d74415
- **Contract**: https://arbitrum.blockscout.com/address/0x3df07977140ad97465075129c37aec7237d74415?tab=contract

## Usage

### Access Covenant Addresses

1. Click **⚡ Covenant** button (top-left)
2. View all three official addresses
3. Click "Load Info" to fetch balance/transactions
4. Click "Blockscout →" to view on explorer
5. Click "Contract →" to view contract code

### Verify Covenant Address

```typescript
import { CovenantLookingGlass } from '@/lib/covenant-glass';

const glass = new CovenantLookingGlass();
const isCovenant = glass.isCovenantAddress('0x3bba654a3816a228284e3e0401cff4ea6dfc5cea');
// Returns: true
```

## Integration Points

### Portal Integration
- Covenant addresses accessible from main portal
- Displayed in Covenant Glass component
- Listed in Blockscout Notable Addresses
- Integrated with covenant foundation

### Blockscout Integration
- All three addresses in Notable Addresses
- Quick access from explorer
- Chain-specific filtering (Arbitrum)
- Contract code viewing support

## Status

✅ **Complete** - All three covenant addresses integrated

---

**Component**: CovenantAddresses.tsx  
**Integration**: covenant-glass.ts, blockscout-integration.ts  
**Addresses**: 
- 0x3bba654a3816a228284e3e0401cff4ea6dfc5cea
- 0x0c4e50157a6e82f5330b721544ce440cb0c6768f
- 0x3df07977140ad97465075129c37aec7237d74415
