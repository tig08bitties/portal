# 🌉 Treasure Bridge, 💎 TreasureProject & 🛒 Magic Eden Integration

## Overview

Integration of Treasure Bridge (cross-chain token bridging), TreasureProject GitHub organization, and Magic Eden NFT marketplace (Smol Brains collection) into the Bridgeworld portal.

## Treasure Bridge Integration

**Bridge URL**: https://bridge.treasure.lol

**Example**: https://bridge.treasure.lol/?from=42161&to=8453&type=tokens&token=MAGIC

### Features

**Component**: `TreasureBridge.tsx`

**Location**: Fixed bottom-right corner (🌉 Bridge button)

**Features**:
- Chain selection (From/To)
- Token selection (MAGIC, ETH)
- Bridge URL generation
- Quick bridge links
- Supported chains display

**Library**: `treasure-bridge-integration.ts`

**Methods**:
- `getBridgeUrl(config)` - Generate bridge URL with parameters
- `getMagicBridgeUrl(fromChain, toChain)` - Get MAGIC bridge URL
- `getSupportedChains()` - Get list of supported chains
- `getBaseUrl()` - Get bridge base URL
- `getChainName(chainId)` - Get chain name by ID

### Supported Chains

- **Ethereum** (Chain ID: 1)
- **Arbitrum** (Chain ID: 42161)
- **Base** (Chain ID: 8453)
- **Polygon** (Chain ID: 137)

### Quick Bridge Links

- Arbitrum → Base (MAGIC)
- Arbitrum → Ethereum (MAGIC)
- Arbitrum → Polygon (MAGIC)

## TreasureProject GitHub Integration

**GitHub**: https://github.com/TreasureProject

### Features

**Component**: `TreasureProject.tsx`

**Location**: Fixed top-right corner (💎 Treasure button)

**Features**:
- Organization information
- Repository list
- Repository details (stars, forks, language)
- Direct links to repositories
- GitHub organization link

**Library**: `treasure-project-integration.ts`

**Methods**:
- `getGitHubUrl()` - Get GitHub organization URL
- `getRepositories()` - Fetch all repositories
- `getOrganizationInfo()` - Fetch organization info
- `getRepositoryUrl(repoName)` - Get repository URL

### Key Repositories

- **bridgeworld** - Bridgeworld game contracts and frontend
- **trove** - Trove marketplace
- Other ecosystem repositories

## Magic Eden Integration

**Collection URL**: https://magiceden.us/collections/ethereum/smol-brains

**Contract**: `0x6325439389E0797Ab35752B4F43a14C004f22A9c`

### Features

**Component**: `MagicEden.tsx`

**Location**: Fixed top-left corner (🛒 Magic Eden button)

**Features**:
- Smol Brains collection information
- Collection stats (floor price, volume, owners, items)
- Contract address display
- Links to Magic Eden, Blockscout, OpenSea

**Library**: `magic-eden-integration.ts`

**Methods**:
- `getSmolBrainsUrl()` - Get collection URL
- `getSmolBrainsCollection()` - Fetch collection info
- `getMarketplaceUrl()` - Get Magic Eden marketplace URL
- `getContractAddress()` - Get contract address
- `getBlockscoutUrl()` - Get Blockscout contract URL
- `getOpenSeaUrl()` - Get OpenSea collection URL

### Smol Brains Collection

- **Name**: Smol Brains
- **Symbol**: SMOLE
- **Chain**: Ethereum
- **Description**: Original Smolverse collection on Ethereum. Part of the TreasureDAO ecosystem.
- **Contract**: `0x6325439389E0797Ab35752B4F43a14C004f22A9c`

### Collection Features

- Used in Smolworld game
- Compatible with AI agents
- Part of TreasureDAO ecosystem
- Original Smolverse collection

## Integration Points

### Treasure Bridge

**Covenant Addresses**:
- Bridge MAGIC tokens between covenant addresses on different chains
- Multi-chain covenant operations

**MetaMask Wallet**:
- Bridge MAGIC tokens from connected wallet
- Cross-chain token transfers

### TreasureProject

**Blockscout Integration**:
- View contract code from GitHub
- Link repositories to verified contracts

**Covenant Addresses**:
- Bridgeworld contracts may be in TreasureProject repos
- Link to source code for covenant contracts

### Magic Eden

**Smol Brains**:
- Part of TreasureDAO ecosystem
- Used in Smolworld game
- Compatible with AI agents
- Can be used with soulbound-178 agent

**Blockscout Integration**:
- View Smol Brains contract on Blockscout
- Check contract verification

## Component Features

### TreasureBridge Component

**Position**: Fixed bottom-right corner  
**Color**: Emerald theme  
**Icon**: 🌉

**Display**:
- Chain selection dropdowns
- Token selection
- Generated bridge URL
- Quick bridge links
- Supported chains list

### TreasureProject Component

**Position**: Fixed top-right corner  
**Color**: Indigo theme  
**Icon**: 💎

**Display**:
- Organization information
- Repository list with details
- Stars and forks count
- Programming language
- Direct repository links

### MagicEden Component

**Position**: Fixed top-left corner  
**Color**: Pink theme  
**Icon**: 🛒

**Display**:
- Collection information
- Collection stats
- Contract address
- Links to marketplaces
- About Smol Brains

## URLs

### Treasure Bridge
- **Bridge**: https://bridge.treasure.lol
- **MAGIC Bridge (Arbitrum → Base)**: https://bridge.treasure.lol/?from=42161&to=8453&type=tokens&token=MAGIC

### TreasureProject
- **GitHub**: https://github.com/TreasureProject
- **Bridgeworld**: https://github.com/TreasureProject/bridgeworld
- **Trove**: https://github.com/TreasureProject/trove

### Magic Eden
- **Smol Brains**: https://magiceden.us/collections/ethereum/smol-brains
- **Marketplace**: https://magiceden.us
- **Blockscout**: https://eth.blockscout.com/address/0x6325439389E0797Ab35752B4F43a14C004f22A9c?tab=contract
- **OpenSea**: https://opensea.io/collection/smol-brains

## Status

✅ **Complete** - Treasure Bridge, TreasureProject, and Magic Eden integrations

---

**Components**: TreasureBridge.tsx, TreasureProject.tsx, MagicEden.tsx  
**Integrations**: treasure-bridge-integration.ts, treasure-project-integration.ts, magic-eden-integration.ts  
**Bridge**: https://bridge.treasure.lol  
**GitHub**: https://github.com/TreasureProject  
**Magic Eden**: https://magiceden.us/collections/ethereum/smol-brains
