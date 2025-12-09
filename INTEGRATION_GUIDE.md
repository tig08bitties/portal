# 🔮 Covenant Looking Glass Integration Guide

## Overview

The Bridgeworld portal application uses the **Covenant Foundation** as a "looking glass" to analyze, search, and assemble missing pieces. The **Brave Browser API** is integrated to automatically search for missing Bridgeworld/TreasureDAO components.

## How It Works

### 1. Covenant Foundation (The Looking Glass)

The covenant directory (`/home/tig0_0bitties/covenant`) serves as the foundation:

```
covenant/
├── bridgeworld_deployment_full/
│   ├── COMPLETE_INTEGRATION_SUMMARY.md  # Integration status
│   ├── images/key_map_decoded.json      # Decoded coordinates
│   └── decoded_lore_integration.json     # Integration configs
├── BRIDGEWORLD_COVENANT_INTEGRATION.md  # Integration docs
└── ... (other covenant files)
```

**Key Data Extracted:**
- Sacred Constants (419, 369, 1798, 687, 22)
- Oracle Contract Address
- Guardian Mappings (22 Hebrew Paths → Bridgeworld Legions)
- Decoded Key-Map Coordinates
- Integration Status

### 2. Brave Browser API (The Search Engine)

The Brave Search API searches for missing pieces:

**Search Types:**
- **Bridgeworld Components**: Contracts, quests, guardians
- **Covenant Information**: Sacred constants, Hebrew paths
- **Missing Pieces**: Automatically identifies what's missing

**API Integration:**
```typescript
const braveSearch = new BraveSearchAPI(apiKey);
const results = await braveSearch.searchBridgeworldPieces('oracle contract');
```

### 3. Covenant Looking Glass (The Analyzer)

The `CovenantLookingGlass` class:

1. **Loads Foundation**: Reads covenant data
2. **Identifies Missing**: Compares foundation with current state
3. **Searches**: Uses Brave API to find missing pieces
4. **Assembles**: Combines found pieces into integration
5. **Generates Code**: Creates TypeScript integration code

### 4. Auto-Assembly Process

```
Foundation Analysis
    ↓
Identify Missing Pieces
    ↓
Search via Brave API
    ↓
Categorize Found Pieces
    ↓
Assemble Integration
    ↓
Generate Code
```

## Usage

### Using the UI Component

1. **Open the Looking Glass**: Click "🔍 Covenant Glass" button (bottom-right)
2. **Find Missing Pieces**: Click "Find Missing" to search automatically
3. **Search Manually**: Enter query and select search type
4. **Assemble**: Click "Assemble" to combine all found pieces
5. **Generate Code**: Click "Generate Integration Code" to download TypeScript

### Using the API

#### Find Missing Pieces
```bash
curl http://localhost:3000/api/search?type=missing
```

#### Search Bridgeworld Component
```bash
curl "http://localhost:3000/api/search?q=oracle&type=bridgeworld"
```

#### Assemble Pieces
```bash
curl http://localhost:3000/api/search?type=assemble
```

#### Generate Code
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"action": "generateCode"}'
```

### Using the Integration Script

```bash
npm run integrate:covenant
```

This script:
1. Loads covenant foundation data
2. Extracts oracle address, constants, guardians
3. Copies decoded data files
4. Creates `covenant-integration.json`
5. Updates `covenant-glass.ts` with real data

## Integration Flow

### Step 1: Foundation Analysis
```typescript
const glass = new CovenantLookingGlass();
const foundation = glass.getFoundation();
// Returns: constants, guardians, integrations, missingPieces
```

### Step 2: Search for Missing Pieces
```typescript
const pieces = await glass.findMissingPieces();
// Searches for each missing piece via Brave API
// Returns: Array of CovenantPiece objects
```

### Step 3: Assemble Pieces
```typescript
const assembly = await glass.assemblePieces(pieces);
// Combines found pieces into complete integration
// Returns: { complete, assembled, missing }
```

### Step 4: Generate Integration Code
```typescript
const code = glass.generateIntegrationCode(pieces);
// Creates TypeScript code from found pieces
// Returns: String of TypeScript code
```

## Example: Finding Oracle Contract

```typescript
// 1. Initialize
const glass = new CovenantLookingGlass(apiKey);

// 2. Search for oracle contract
const results = await glass.searchBridgeworldComponent('oracle contract');

// 3. Results contain:
// - Contract addresses
// - Documentation links
// - Integration guides

// 4. Use results to update integration
```

## Example: Complete Integration

```typescript
// 1. Find all missing pieces
const pieces = await glass.findMissingPieces();

// 2. Assemble everything
const assembly = await glass.assemblePieces(pieces);

// 3. Check if complete
if (assembly.complete) {
  console.log('✅ All pieces found!');
  
  // 4. Generate integration code
  const code = glass.generateIntegrationCode(pieces);
  
  // 5. Save code
  fs.writeFileSync('integration.ts', code);
} else {
  console.log('Missing:', assembly.missing);
}
```

## Configuration

### Environment Variables

```env
# Required for Brave API searches
BRAVE_API_KEY=your_brave_api_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Covenant Integration Config

After running `npm run integrate:covenant`, a `covenant-integration.json` file is created:

```json
{
  "foundation": {
    "theos": 419,
    "el": 369,
    "torahPages": 1798,
    "resonance": 687,
    "hebrewPaths": 22
  },
  "oracle": {
    "address": "0xfa05997C66437dCCAe860af334b30d69E0De24DC",
    "network": "arbitrum"
  },
  "guardians": [...],
  "integrations": [...],
  "decodedData": {...}
}
```

## Troubleshooting

### Brave API Not Working

If Brave API key is missing, the system falls back to mock results. To enable real searches:

1. Get API key from https://brave.com/search/api/
2. Add to `.env`: `BRAVE_API_KEY=your_key`
3. Restart dev server

### Covenant Data Not Found

If covenant directory is not accessible:

1. Check path: `/home/tig0_0bitties/covenant`
2. Verify files exist:
   - `bridgeworld_deployment_full/COMPLETE_INTEGRATION_SUMMARY.md`
   - `bridgeworld_deployment_full/images/key_map_decoded.json`
3. Run integration script: `npm run integrate:covenant`

### Missing Pieces Not Found

If searches return no results:

1. Check Brave API key is valid
2. Try different search terms
3. Check network connectivity
4. Review search results in browser console

## Advanced Usage

### Custom Search Queries

```typescript
const braveSearch = new BraveSearchAPI(apiKey);

// Search with custom options
const results = await braveSearch.search('TreasureDAO oracle', {
  count: 50,
  safesearch: 'strict',
  freshness: 'pm', // Past month
});
```

### Filtering Results

```typescript
const pieces = await glass.findMissingPieces();

// Filter by type
const contracts = pieces.filter(p => p.type === 'contract');
const quests = pieces.filter(p => p.type === 'quest');

// Filter by status
const found = pieces.filter(p => p.status === 'found');
const missing = pieces.filter(p => p.status === 'missing');
```

### Batch Processing

```typescript
const components = ['oracle', 'quest', 'harvester', 'marketplace'];

for (const component of components) {
  const results = await glass.searchBridgeworldComponent(component);
  console.log(`${component}: ${results.length} results`);
}
```

## Integration with Portal

The Covenant Glass integrates seamlessly with the portal:

1. **Portal Opens**: When Key and Map align
2. **Glass Activates**: Can search for portal-related pieces
3. **Pieces Found**: Integration code generated
4. **Complete System**: All pieces assembled

## Next Steps

1. **Get Brave API Key**: https://brave.com/search/api/
2. **Run Integration**: `npm run integrate:covenant`
3. **Start Dev Server**: `npm run dev`
4. **Use Looking Glass**: Click "🔍 Covenant Glass" button
5. **Find Missing Pieces**: Click "Find Missing"
6. **Assemble**: Click "Assemble" to combine pieces
7. **Generate Code**: Download integration code

---

**"The covenant is the foundation. The glass reveals what's missing. The search finds the pieces. The assembly completes the integration."**
