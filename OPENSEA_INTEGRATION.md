# 🌊 OpenSea Integration

## Overview

Integration of OpenSea NFT marketplace API with MCP token and API key for accessing NFT collections, assets, and marketplace data.

## OpenSea API

**URL**: https://opensea.io/

**API Documentation**: https://docs.opensea.io/

**API Key**: `62d4d2a83967477ea11810d0e9d86d5e`

**MCP Token**: `042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW`

## Features

### 1. OpenSea Component

**Component**: `OpenSea.tsx`

**Location**: Fixed top-right corner (🌊 OpenSea button)

**Features**:
- Collection search
- Account asset search
- Asset search (contract:tokenId)
- Collection information display
- Asset listing display
- Quick links (Smol Brains, Covenant Address)
- Direct OpenSea links

### 2. OpenSea Integration Library

**Library**: `opensea-integration.ts`

**Methods**:
- `getCollection(slug)` - Get collection by slug
- `getCollectionAssets(slug, limit)` - Get assets from collection
- `getAsset(contractAddress, tokenId, chain)` - Get asset by contract and token ID
- `getAccountAssets(address, limit)` - Get account NFTs
- `getSmolBrainsCollection()` - Get Smol Brains collection
- `getSmolBrainsAssets(limit)` - Get Smol Brains assets
- `getCollectionUrl(slug)` - Get collection URL
- `getAssetUrl(contractAddress, tokenId)` - Get asset URL
- `getAccountUrl(address)` - Get account URL

## Usage

### Search Collection

1. Select "Collection" search type
2. Enter collection slug (e.g., `smol-brains`)
3. Click "Search"
4. View collection info and assets

### Search Account

1. Select "Account" search type
2. Enter wallet address (0x...)
3. Click "Search"
4. View account NFTs

### Search Asset

1. Select "Asset" search type
2. Enter `contractAddress:tokenId` (e.g., `0x...:123`)
3. Click "Search"
4. View asset details

### Quick Links

- **Smol Brains**: Load Smol Brains collection
- **Covenant Address**: Search covenant address NFTs

## Integration Points

### Magic Eden Component

**Enhanced**:
- Added OpenSea integration
- Links to OpenSea Smol Brains collection
- Cross-marketplace support

### Covenant Addresses

**Integration**:
- Search covenant addresses on OpenSea
- View NFTs owned by covenant addresses
- Track covenant NFT holdings

### Smol Brains

**Connection**:
- View Smol Brains on OpenSea
- Compare with Magic Eden listings
- Access both marketplaces

## API Endpoints

### Collection

```
GET /api/v2/collection/{slug}
```

### Collection Assets

```
GET /api/v2/collection/{slug}/nfts?limit={limit}
```

### Asset

```
GET /api/v2/chain/{chain}/contract/{contractAddress}/nfts/{tokenId}
```

### Account Assets

```
GET /api/v2/chain/{chain}/account/{address}/nfts?limit={limit}
```

## Component Features

### OpenSea Component

**Position**: Fixed top-right corner  
**Color**: Blue theme  
**Icon**: 🌊

**Search Types**:
- Collection (by slug)
- Account (by address)
- Asset (by contract:tokenId)

**Display**:
- Collection information
- Collection stats (floor price, volume, owners, supply)
- Asset listings
- Asset details
- Last sale information
- Direct OpenSea links

## URLs

- **OpenSea**: https://opensea.io/
- **Smol Brains**: https://opensea.io/collection/smol-brains
- **API**: https://api.opensea.io/api/v2

## Status

✅ **Complete** - OpenSea API integration with collection, account, and asset search

---

**Component**: OpenSea.tsx  
**Integration**: opensea-integration.ts  
**API Key**: `62d4d2a83967477ea11810d0e9d86d5e`  
**MCP Token**: `042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW`  
**URL**: https://opensea.io/
