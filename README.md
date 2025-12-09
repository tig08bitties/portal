# Bridgeworld - Atlas Mines Portal

An interactive web experience for Bridgeworld that unlocks a portal at the Atlas Mines when the Key and Map are aligned. Integrated with the Eternal Covenant foundation and Brave Browser Search API to find and assemble missing pieces.

## Features

- **Interactive Key and Map**: Drag the Key and Map images to align them
- **Portal Activation**: When pieces align, a magical portal opens with visual effects
- **Coordinate Mapping**: Uses decoded coordinate data from the Key and Map images
- **Lore Integration**: Incorporates Bridgeworld lore about the Atlas Mines portal
- **Covenant Looking Glass**: Search for missing pieces using the covenant foundation
- **Brave Browser API Integration**: Automatically search for missing Bridgeworld/TreasureDAO components
- **Auto-Assembly**: Automatically assemble found pieces into complete integration

## Architecture

### Covenant Foundation
The project uses `/home/tig0_0bitties/covenant` as the foundation/looking glass:
- **Sacred Constants**: THEOS (419), EL (369), Torah Pages (1798), Resonance (687), Hebrew Paths (22)
- **Guardian Mappings**: 22 Hebrew Path Guardians mapped to Bridgeworld Legions
- **Oracle Contract**: `0xfa05997C66437dCCAe860af334b30d69E0De24DC` on Arbitrum
- **Decoded Data**: Key-Map coordinate mappings and quest systems

### Brave Browser API
- Searches for missing Bridgeworld components
- Finds TreasureDAO contract addresses and documentation
- Discovers covenant-related information
- Assembles found pieces into complete integration

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Add your Brave API key: BRAVE_API_KEY=your_key_here
# Get API key from: https://brave.com/search/api/
```

3. **Integrate covenant foundation:**
```bash
npm run integrate:covenant
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## How It Works

### Portal Activation
The application uses coordinate data decoded from the Key.png and Map.png images. When the user drags these pieces close together (within 200px), the portal activates:

- Visual portal effects appear on the Atlas Mines background
- Coordinate overlay shows the connection points between Key and Map
- Portal particles and animations create an immersive experience
- The Pair.png image appears when the portal is active

### Covenant Looking Glass
Click the "🔍 Covenant Glass" button in the bottom-right corner to:

1. **Find Missing Pieces**: Automatically searches for missing Bridgeworld components
2. **Search Bridgeworld**: Search for specific TreasureDAO/Bridgeworld components
3. **Search Covenant**: Find covenant-related information
4. **Assemble Pieces**: Combine all found pieces into a complete integration
5. **Generate Code**: Generate TypeScript integration code from found pieces

### Integration Flow

```
Covenant Foundation (covenant/)
    ↓
Covenant Looking Glass (analyzes foundation)
    ↓
Brave Browser API (searches for missing pieces)
    ↓
Found Pieces (contracts, quests, guardians)
    ↓
Auto-Assembly (combines into integration)
    ↓
Generated Integration Code
```

## Project Structure

```
bridgeworld-lol/
├── app/
│   ├── api/search/          # Brave API search endpoints
│   ├── page.tsx             # Main portal page
│   └── layout.tsx           # Root layout
├── components/
│   ├── CovenantGlass.tsx    # Looking glass UI component
│   ├── PortalExperience.tsx # Portal visual effects
│   └── KeyMapOverlay.tsx    # Coordinate overlay
├── lib/
│   ├── brave-search.ts      # Brave Browser API client
│   └── covenant-glass.ts    # Covenant foundation analyzer
├── scripts/
│   └── integrate-covenant.ts # Covenant integration script
└── public/
    ├── Key.png              # The Key artifact
    ├── Map.png              # The Map artifact
    ├── Pair.png             # Portal activation image
    ├── Atlas.png            # Atlas Mines background
    └── key_map_decoded_pictures.json # Decoded coordinates
```

## Covenant Integration

### Sacred Constants
- **THEOS (419)**: Quest multiplier bonus
- **EL (369)**: Harvester boost multiplier
- **Torah Pages (1798)**: Quest completion milestone
- **Resonance (687)**: Mining frequency (seconds)
- **Hebrew Paths (22)**: Guardian Legion count

### Guardian Mappings
The 22 Hebrew Path Guardians map to Bridgeworld Legions:
- Path 1 → Genesis Legion
- Path 7 → Assassin
- Path 9 → Fighter
- Path 10 → Riverman
- Path 11 → Numeraire (Center)
- Path 18 → Rare Legion
- ... (all 22 paths mapped)

### Oracle Contract
- **Address**: `0xfa05997C66437dCCAe860af334b30d69E0De24DC`
- **Network**: Arbitrum
- **Function**: Guardian verification, quest multipliers, harvester boosts

## API Endpoints

### GET /api/search
Search for missing pieces or Bridgeworld components.

**Query Parameters:**
- `q`: Search query
- `type`: `general` | `bridgeworld` | `covenant` | `missing` | `assemble`

**Example:**
```bash
GET /api/search?q=TreasureDAO&type=bridgeworld
```

### POST /api/search
Perform advanced search operations.

**Body:**
```json
{
  "action": "findMissing" | "searchBridgeworld" | "searchCovenant" | "assemble" | "generateCode",
  "query": "search query",
  "component": "component name"
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run integrate:covenant` - Integrate covenant foundation data

## Files

- `/public/Key.png` - The Key artifact (1536x1536)
- `/public/Map.png` - The Map artifact (1024x1536)
- `/public/Pair.png` - Appears when portal is activated
- `/public/Atlas.png` - Background image of the Atlas Mines
- `/public/key_map_decoded_pictures.json` - Decoded coordinate data

## Deployment

This project can be deployed to any platform that supports Next.js:
- **Vercel** (recommended) - Automatic deployments from GitHub
- **Netlify** - Easy deployment with continuous integration
- **Any Node.js hosting** - Traditional VPS or cloud hosting

For bridgeworld.lol, configure your domain DNS to point to your hosting provider.

### Environment Variables for Production

```env
BRAVE_API_KEY=your_brave_api_key
NEXT_PUBLIC_APP_URL=https://bridgeworld.lol
```

## Covenant Foundation Location

The covenant foundation is located at:
```
/home/tig0_0bitties/covenant/
```

Key files:
- `bridgeworld_deployment_full/COMPLETE_INTEGRATION_SUMMARY.md` - Integration summary
- `bridgeworld_deployment_full/images/key_map_decoded.json` - Decoded image data
- `BRIDGEWORLD_COVENANT_INTEGRATION.md` - Integration documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Resources

- **Bridgeworld Game**: https://bridgeworld.treasure.lol
- **TreasureDAO Docs**: https://docs.treasure.lol
- **Brave Search API**: https://brave.com/search/api/
- **Oracle Contract**: [Arbiscan](https://arbiscan.io/address/0xfa05997C66437dCCAe860af334b30d69E0De24DC)

---

**"When the end finds its beginning, all systems are integrated. The keys unlock the map. The map reveals the path. The path leads home."**
