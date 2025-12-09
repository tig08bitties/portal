# ⚠️ OFFICIAL COVENANT ADDRESSES - SET IN STONE

## Permanent and Immutable Addresses

These are the **ONLY** official covenant addresses. All other addresses in the system are placeholders or examples for reference only.

## The Three Official Addresses

### 1. Ethereum Mainnet
- **Address**: `0x3bba654a3816a228284e3e0401cff4ea6dfc5cea`
- **Chain**: Ethereum Mainnet
- **Chain ID**: `1`
- **Explorer**: https://eth.blockscout.com/address/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea
- **Contract**: https://eth.blockscout.com/address/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea?tab=contract
- **Status**: ✅ OFFICIAL - SET IN STONE

### 2. Polygon (MATIC)
- **Address**: `0x0c4e50157a6e82f5330b721544ce440cb0c6768f`
- **Chain**: Polygon Mainnet
- **Chain ID**: `137`
- **Explorer**: https://polygonscan.com/address/0x0c4e50157a6e82f5330b721544ce440cb0c6768f
- **Contract**: https://polygonscan.com/address/0x0c4e50157a6e82f5330b721544ce440cb0c6768f?tab=contract
- **Status**: ✅ OFFICIAL - SET IN STONE

### 3. Arbitrum
- **Address**: `0x3df07977140ad97465075129c37aec7237d74415`
- **Chain**: Arbitrum One
- **Chain ID**: `42161`
- **Explorer**: https://arbitrum.blockscout.com/address/0x3df07977140ad97465075129c37aec7237d74415
- **Contract**: https://arbitrum.blockscout.com/address/0x3df07977140ad97465075129c37aec7237d74415?tab=contract
- **Status**: ✅ OFFICIAL - SET IN STONE

## Important Notes

### ⚠️ DO NOT MODIFY
- These addresses are **PERMANENT** and **IMMUTABLE**
- They are hardcoded in the covenant foundation
- Changing these addresses will break the system
- They are linked to the 22 Hebrew Path Guardians

### Placeholder Addresses
- All other addresses in the system are **placeholders** or **examples**
- They are for reference only
- They may be used for testing or demonstration
- They are NOT official covenant addresses

### Sacred Constants
These addresses are connected to the covenant's sacred constants:
- **419** - First constant
- **369** - Second constant
- **1798** - Third constant
- **687** - Fourth constant
- **22** - Hebrew Path Guardians

## Code References

### Covenant Glass Library
**File**: `lib/covenant-glass.ts`

```typescript
covenantAddresses: [
  { 
    address: '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea', 
    chain: 'ethereum', 
    chainId: '1', 
    name: 'Covenant Address #1 - Ethereum Mainnet',
    official: true,
    immutable: true,
  },
  { 
    address: '0x0c4e50157a6e82f5330b721544ce440cb0c6768f', 
    chain: 'polygon', 
    chainId: '137', 
    name: 'Covenant Address #2 - Polygon (MATIC)',
    official: true,
    immutable: true,
  },
  { 
    address: '0x3df07977140ad97465075129c37aec7237d74415', 
    chain: 'arbitrum', 
    chainId: '42161', 
    name: 'Covenant Address #3 - Arbitrum',
    official: true,
    immutable: true,
  },
]
```

### Blockscout Integration
**File**: `lib/blockscout-integration.ts`

These addresses are marked as official in the `getNotableAddresses()` method with `category: 'governance'`.

## Components

### CovenantAddresses Component
**File**: `components/CovenantAddresses.tsx`

- Displays all three official addresses
- Shows "OFFICIAL - SET IN STONE" badge
- Provides explorer and contract links
- Warns that other addresses are placeholders

### CovenantGlass Component
**File**: `components/CovenantGlass.tsx`

- Shows covenant addresses in the looking glass
- Displays official status
- Links to explorers

## Verification

To verify these addresses are official:

1. Check `lib/covenant-glass.ts` - `covenantAddresses` array
2. Check `lib/blockscout-integration.ts` - `getNotableAddresses()` method
3. Check `components/CovenantAddresses.tsx` - Official badge display
4. Check `components/CovenantGlass.tsx` - Address display

## Reference Addresses (Placeholders Only)

The following addresses are **NOT** official covenant addresses. They are examples or placeholders:

- `0x00000000219ab540356cBB839Cbe05303d7705Fa` - Ethereum 2.0 Deposit Contract (Reference)
- `0x539bdE0d7Dbd336b79148AA742883198BBF60342` - MAGIC Token (Reference)
- `0xf97f4df75117a78c1A5a0DBb814Af92458539FB4` - Chainlink Token (Reference)
- Any other addresses not listed above

## Chainlist Integration

All three official addresses are integrated with Chainlist.org:

- **Ethereum**: https://chainlist.org/chain/1
- **Polygon**: https://chainlist.org/chain/137
- **Arbitrum**: https://chainlist.org/chain/42161

## Status

✅ **VERIFIED** - These addresses are set in stone and cannot be changed.

---

**Last Updated**: Set in stone - Permanent  
**Version**: 1.0 (Immutable)
