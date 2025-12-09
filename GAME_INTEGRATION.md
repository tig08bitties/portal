# 🎮 Diablo 2 LOD-Style Game Integration

## Overview

A complete Diablo 2 Lord of Destruction-style ARPG system integrated into Bridgeworld, inspired by classic Magic: The Gathering and Dungeons & Dragons mechanics found in Wayback Machine archives.

## Features

### Character System
- **7 Character Classes** mapped to Bridgeworld Legions:
  - Legion (Paladin-style)
  - Assassin (Assassin-style)
  - Ranger (Amazon-style)
  - Spellcaster (Sorceress-style)
  - Fighter (Barbarian-style)
  - Riverman (Druid-style)
  - Reaper (Necromancer-style)

### Core Mechanics (D2 LOD Style)

1. **Stats System**
   - Strength, Dexterity, Vitality, Energy
   - Life and Mana calculated from stats
   - Magic Find and Gold Find

2. **Combat System**
   - Real-time combat calculations
   - Damage based on weapon + stats
   - Monster resistances
   - Experience and gold rewards

3. **Item System**
   - Rarity levels: Normal, Magic, Rare, Set, Unique, Legendary
   - Magic properties on items
   - Equipment slots (weapon, armor, rings, etc.)
   - Socket system (for future gems/runes)

4. **Dungeon System**
   - Procedurally generated dungeons
   - Multiple areas per dungeon
   - Boss encounters
   - Difficulty levels: Normal, Nightmare, Hell, Covenant

5. **Quest System**
   - Quest objectives
   - Progress tracking
   - Rewards (XP, gold, items, MAGIC tokens)

### Integration with Bridgeworld

- **MAGIC Token**: Used as in-game currency and rewards
- **Legions**: Character classes map to Bridgeworld Legions
- **Covenant Constants**: 
  - THEOS (419) = Experience multiplier
  - EL (369) = Gold/MAGIC multiplier
  - 22 Paths = Character classes
- **Oracle Contract**: Tracks character progress on-chain

## Wayback Machine Integration

Searching Wayback Machine for:
- Magic: The Gathering game code
- Dungeons & Dragons mechanics
- Diablo 2 LOD gameplay systems

These classic game mechanics inform the Bridgeworld game design.

## How to Play

1. **Create Character**: Choose a class (Legion, Assassin, etc.)
2. **Enter Dungeon**: Generate and enter a dungeon
3. **Fight Monsters**: Combat system like D2
4. **Level Up**: Gain experience, allocate stats
5. **Loot Items**: Find magic items with properties
6. **Defeat Bosses**: Challenge dungeon bosses
7. **Earn MAGIC**: Get MAGIC token rewards

## Game Component

Access via the **⚔️ Diablo 2 LOD Game** button (bottom-left).

Features:
- Character creation and management
- Dungeon exploration
- Combat system
- Inventory management
- Quest tracking
- Combat log

## Technical Implementation

- **Game Engine**: `lib/diablo2-game.ts`
- **UI Component**: `components/Diablo2Game.tsx`
- **Wayback Search**: `components/WaybackSearch.tsx`
- **API Endpoint**: `/api/wayback` for searching archives

## Future Enhancements

- Skill trees (like D2 skill trees)
- Rune words system
- Set items
- PvP combat
- Trading system
- On-chain character storage
- NFT character minting

---

**"Like Diablo 2 LOD, but powered by MAGIC and the Covenant."**
