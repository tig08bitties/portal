# ✨ Scattering.io Integration

## Overview

Integrated Scattering.io platform for asset management and project organization in the Bridgeworld portal.

## URL

**Scattering.io**: https://scattering.io/

## Features

### Asset Management
- **Project Organization**: Organize Bridgeworld assets by project
- **Asset Upload**: Upload portal assets (keys, maps, images)
- **Asset Retrieval**: Fetch assets for portal display
- **Metadata Support**: Store asset metadata (type, rarity, coordinates)

### Bridgeworld Integration
- **Portal Assets**: Key and Map assets
- **Project Filtering**: Filter projects by Bridgeworld/Treasure/MAGIC
- **Asset Filtering**: Filter assets by portal/key/map

## Usage

### Get Projects
```typescript
import { ScatteringIntegration } from '@/lib/scattering-integration';

const scattering = new ScatteringIntegration();

const projects = await scattering.getProjects();
```

### Get Assets
```typescript
const assets = await scattering.getAssets();
// Or for specific project
const projectAssets = await scattering.getAssets('bridgeworld-portal');
```

### Get Bridgeworld Integration
```typescript
const integration = await scattering.getBridgeworldIntegration();
// Returns filtered projects and assets for Bridgeworld
```

### Upload Asset
```typescript
const file = new File([...], 'portal-key.png');
const asset = await scattering.uploadAsset(file, 'bridgeworld-portal');
```

## Component

Access via **✨ Scattering** button (bottom-right).

Features:
- View Scattering projects
- Browse assets
- Filter Bridgeworld-specific content
- Link to Scattering.io platform

## Integration Points

- **Portal**: Display Scattering assets (Key, Map)
- **Projects**: Organize portal assets
- **Assets**: Manage portal images and resources
- **Metadata**: Store asset properties

## API Endpoints

- **Projects**: `/api/projects`
- **Assets**: `/api/assets`
- **Upload**: `/api/assets/upload`

---

**Status**: ✅ Integrated  
**Component**: Scattering.tsx  
**SDK**: scattering-integration.ts  
**Platform**: https://scattering.io/
