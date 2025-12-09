/**
 * Diablo 2 LOD-Style Game System for Bridgeworld
 * Inspired by classic ARPG mechanics from Magic/D&D/D2
 */

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  stats: CharacterStats;
  skills: Skill[];
  equipment: Equipment;
  inventory: Item[];
  quests: Quest[];
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  life: number;
  mana: number;
  magicFind: number;
  goldFind: number;
}

export type CharacterClass = 
  | 'Legion'      // Like Paladin
  | 'Assassin'    // Like Assassin
  | 'Ranger'      // Like Amazon
  | 'Spellcaster' // Like Sorceress
  | 'Fighter'     // Like Barbarian
  | 'Riverman'    // Like Druid
  | 'Reaper';     // Like Necromancer

export interface Skill {
  id: string;
  name: string;
  tree: SkillTree;
  level: number;
  maxLevel: number;
  description: string;
  manaCost: number;
  cooldown: number;
}

export type SkillTree = 'Combat' | 'Magic' | 'Passive' | 'Covenant';

export interface Equipment {
  weapon?: Item;
  armor?: Item;
  helmet?: Item;
  boots?: Item;
  gloves?: Item;
  belt?: Item;
  ring1?: Item;
  ring2?: Item;
  amulet?: Item;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  level: number;
  stats: ItemStats;
  sockets?: number;
  socketed?: Item[];
  magicProperties: MagicProperty[];
}

export type ItemType = 
  | 'weapon' | 'armor' | 'helmet' | 'boots' | 'gloves' 
  | 'belt' | 'ring' | 'amulet' | 'potion' | 'rune' | 'gem';

export type ItemRarity = 
  | 'normal' | 'magic' | 'rare' | 'set' | 'unique' | 'legendary';

export interface ItemStats {
  damage?: { min: number; max: number };
  defense?: number;
  durability?: { current: number; max: number };
  requirements?: {
    level?: number;
    strength?: number;
    dexterity?: number;
  };
}

export interface MagicProperty {
  type: string;
  value: number;
  description: string;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  status: 'available' | 'active' | 'completed';
}

export interface QuestObjective {
  id: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

export interface QuestReward {
  type: 'experience' | 'gold' | 'item' | 'skill' | 'magic';
  amount?: number;
  item?: Item;
}

export interface Dungeon {
  id: string;
  name: string;
  level: number;
  difficulty: Difficulty;
  areas: Area[];
  boss?: Boss;
  rewards: DungeonRewards;
}

export type Difficulty = 'normal' | 'nightmare' | 'hell' | 'covenant';

export interface Area {
  id: string;
  name: string;
  level: number;
  monsters: Monster[];
  waypoints: Waypoint[];
  quests: string[];
}

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  level: number;
  health: number;
  maxHealth: number;
  damage: { min: number; max: number };
  defense: number;
  resistances: Resistances;
  drops: Drop[];
  experience: number;
  gold: number;
}

export type MonsterType = 
  | 'demon' | 'undead' | 'beast' | 'elemental' | 'guardian' | 'boss';

export interface Resistances {
  fire: number;
  cold: number;
  lightning: number;
  poison: number;
  magic: number;
}

export interface Drop {
  item?: Item;
  gold?: number;
  experience?: number;
  chance: number;
}

export interface Waypoint {
  id: string;
  name: string;
  unlocked: boolean;
}

export interface Boss extends Monster {
  phases: BossPhase[];
  specialAbilities: string[];
  guaranteedDrops: Item[];
}

export interface BossPhase {
  healthThreshold: number;
  abilities: string[];
  behavior: string;
}

export interface DungeonRewards {
  experience: number;
  gold: number;
  items: Item[];
  magic: number; // MAGIC token reward
}

/**
 * Diablo 2 LOD-Style Game Engine
 */
export class BridgeworldGame {
  private characters: Map<string, Character> = new Map();
  private dungeons: Map<string, Dungeon> = new Map();
  private currentDungeon: Dungeon | null = null;

  /**
   * Create a new character (like creating a new character in D2)
   */
  createCharacter(name: string, characterClass: CharacterClass): Character {
    const baseStats = this.getBaseStats(characterClass);
    
    const character: Character = {
      id: `char_${Date.now()}`,
      name,
      class: characterClass,
      level: 1,
      experience: 0,
      stats: {
        ...baseStats,
        life: baseStats.vitality * 2 + 20,
        mana: baseStats.energy * 2 + 10,
        magicFind: 0,
        goldFind: 0,
      },
      skills: [],
      equipment: {},
      inventory: [],
      quests: [],
    };

    this.characters.set(character.id, character);
    return character;
  }

  /**
   * Enter a dungeon (like entering Act areas in D2)
   */
  enterDungeon(characterId: string, dungeonId: string): boolean {
    const character = this.characters.get(characterId);
    const dungeon = this.dungeons.get(dungeonId);

    if (!character || !dungeon) return false;

    // Check level requirement
    if (character.level < dungeon.level) {
      return false;
    }

    this.currentDungeon = dungeon;
    return true;
  }

  /**
   * Combat system (like D2 combat)
   */
  combat(characterId: string, monsterId: string): CombatResult {
    const character = this.characters.get(characterId);
    if (!character || !this.currentDungeon) {
      throw new Error('Character or dungeon not found');
    }

    const area = this.currentDungeon.areas[0]; // Simplified
    const monster = area.monsters.find(m => m.id === monsterId);
    if (!monster) {
      throw new Error('Monster not found');
    }

    // D2-style combat calculation
    const characterDamage = this.calculateDamage(character);
    const monsterDamage = this.calculateMonsterDamage(monster);

    // Apply damage
    monster.health -= characterDamage;
    character.stats.life -= monsterDamage;

    const result: CombatResult = {
      characterDamage,
      monsterDamage,
      monsterKilled: monster.health <= 0,
      characterDied: character.stats.life <= 0,
    };

    if (result.monsterKilled) {
      // Award experience and drops
      character.experience += monster.experience;
      this.checkLevelUp(character);
      this.dropItems(character, monster);
    }

    return result;
  }

  /**
   * Skill system (like D2 skill trees)
   */
  learnSkill(characterId: string, skillId: string): boolean {
    const character = this.characters.get(characterId);
    if (!character) return false;

    // Check if skill already learned
    const existingSkill = character.skills.find(s => s.id === skillId);
    if (existingSkill) {
      if (existingSkill.level >= existingSkill.maxLevel) return false;
      existingSkill.level++;
      return true;
    }

    // Add new skill (simplified - would need skill definitions)
    return true;
  }

  /**
   * Item system (like D2 items with magic properties)
   */
  equipItem(characterId: string, item: Item, slot: keyof Equipment): boolean {
    const character = this.characters.get(characterId);
    if (!character) return false;

    // Check requirements
    if (item.stats.requirements) {
      if (item.stats.requirements.level && character.level < item.stats.requirements.level) {
        return false;
      }
      if (item.stats.requirements.strength && character.stats.strength < item.stats.requirements.strength) {
        return false;
      }
      if (item.stats.requirements.dexterity && character.stats.dexterity < item.stats.requirements.dexterity) {
        return false;
      }
    }

    // Unequip current item if any
    const currentItem = character.equipment[slot];
    if (currentItem) {
      character.inventory.push(currentItem);
    }

    // Equip new item
    character.equipment[slot] = item;
    this.updateCharacterStats(character);

    return true;
  }

  /**
   * Quest system (like D2 quests)
   */
  startQuest(characterId: string, questId: string): boolean {
    const character = this.characters.get(characterId);
    if (!character) return false;

    const quest = character.quests.find(q => q.id === questId);
    if (!quest || quest.status !== 'available') return false;

    quest.status = 'active';
    return true;
  }

  /**
   * Generate dungeon (like D2 random maps)
   */
  generateDungeon(level: number, difficulty: Difficulty): Dungeon {
    const dungeon: Dungeon = {
      id: `dungeon_${Date.now()}`,
      name: this.generateDungeonName(level),
      level,
      difficulty,
      areas: this.generateAreas(level, difficulty),
      boss: this.generateBoss(level, difficulty),
      rewards: {
        experience: level * 1000,
        gold: level * 500,
        items: [],
        magic: level * 10, // MAGIC token reward
      },
    };

    this.dungeons.set(dungeon.id, dungeon);
    return dungeon;
  }

  // Helper methods
  private getBaseStats(characterClass: CharacterClass): Omit<CharacterStats, 'life' | 'mana' | 'magicFind' | 'goldFind'> {
    const baseStats: Record<CharacterClass, Omit<CharacterStats, 'life' | 'mana' | 'magicFind' | 'goldFind'>> = {
      'Legion': { strength: 25, dexterity: 20, vitality: 25, energy: 15 },
      'Assassin': { strength: 20, dexterity: 25, vitality: 20, energy: 25 },
      'Ranger': { strength: 20, dexterity: 25, vitality: 20, energy: 15 },
      'Spellcaster': { strength: 10, dexterity: 25, vitality: 10, energy: 35 },
      'Fighter': { strength: 30, dexterity: 20, vitality: 25, energy: 10 },
      'Riverman': { strength: 15, dexterity: 20, vitality: 25, energy: 20 },
      'Reaper': { strength: 15, dexterity: 25, vitality: 15, energy: 25 },
    };
    return baseStats[characterClass];
  }

  private calculateDamage(character: Character): number {
    const weapon = character.equipment.weapon;
    const baseDamage = weapon?.stats.damage 
      ? (weapon.stats.damage.min + weapon.stats.damage.max) / 2
      : 10;
    
    const strengthBonus = character.stats.strength * 0.1;
    return Math.floor(baseDamage * (1 + strengthBonus));
  }

  private calculateMonsterDamage(monster: Monster): number {
    return Math.floor((monster.damage.min + monster.damage.max) / 2);
  }

  private checkLevelUp(character: Character): void {
    const expNeeded = this.getExperienceForLevel(character.level + 1);
    if (character.experience >= expNeeded) {
      character.level++;
      this.levelUpStats(character);
    }
  }

  private getExperienceForLevel(level: number): number {
    // D2-style exponential experience curve
    return Math.floor(1000 * Math.pow(1.5, level - 1));
  }

  private levelUpStats(character: Character): void {
    // +5 stat points per level (like D2)
    const statPoints = 5;
    // Simplified - would allow player to allocate
    character.stats.strength += 1;
    character.stats.dexterity += 1;
    character.stats.vitality += 2;
    character.stats.energy += 1;
    
    // Update life/mana
    character.stats.life = character.stats.vitality * 2 + 20;
    character.stats.mana = character.stats.energy * 2 + 10;
  }

  private dropItems(character: Character, monster: Monster): void {
    // Magic Find affects drop rates
    const magicFindMultiplier = 1 + (character.stats.magicFind / 100);
    
    for (const drop of monster.drops) {
      const roll = Math.random() * 100;
      if (roll < drop.chance * magicFindMultiplier) {
        if (drop.item) {
          character.inventory.push(drop.item);
        }
        if (drop.gold) {
          // Add gold to character (would need gold property)
        }
      }
    }
  }

  private updateCharacterStats(character: Character): void {
    // Recalculate stats based on equipment
    let bonusLife = 0;
    let bonusMana = 0;
    let bonusStrength = 0;
    let bonusDexterity = 0;

    Object.values(character.equipment).forEach((item: Item | undefined) => {
      if (!item) return;
      item.magicProperties.forEach((prop: MagicProperty) => {
        if (prop.type === 'life') bonusLife += prop.value;
        if (prop.type === 'mana') bonusMana += prop.value;
        if (prop.type === 'strength') bonusStrength += prop.value;
        if (prop.type === 'dexterity') bonusDexterity += prop.value;
      });
    });

    character.stats.life += bonusLife;
    character.stats.mana += bonusMana;
    character.stats.strength += bonusStrength;
    character.stats.dexterity += bonusDexterity;
  }

  private generateDungeonName(level: number): string {
    const names = [
      'Atlas Mines',
      'Ivory Tower',
      'Guardian Sanctum',
      'Covenant Depths',
      'MAGIC Forge',
      'Time Portal',
      'Sacred Path',
    ];
    return names[level % names.length] || `Dungeon Level ${level}`;
  }

  private generateAreas(level: number, difficulty: Difficulty): Area[] {
    // Generate 3-5 areas per dungeon
    const areaCount = 3 + Math.floor(Math.random() * 3);
    const areas: Area[] = [];

    for (let i = 0; i < areaCount; i++) {
      areas.push({
        id: `area_${level}_${i}`,
        name: `Area ${i + 1}`,
        level,
        monsters: this.generateMonsters(level, difficulty),
        waypoints: [],
        quests: [],
      });
    }

    return areas;
  }

  private generateMonsters(level: number, difficulty: Difficulty): Monster[] {
    const count = 5 + Math.floor(Math.random() * 10);
    const monsters: Monster[] = [];

    for (let i = 0; i < count; i++) {
      monsters.push({
        id: `monster_${level}_${i}`,
        name: `Guardian ${i + 1}`,
        type: 'guardian',
        level,
        health: level * 100,
        maxHealth: level * 100,
        damage: { min: level * 10, max: level * 20 },
        defense: level * 5,
        resistances: {
          fire: 0,
          cold: 0,
          lightning: 0,
          poison: 0,
          magic: 0,
        },
        drops: [
          { item: this.generateRandomItem(level), chance: 10 },
          { gold: level * 50, chance: 50 },
          { experience: level * 100, chance: 100 },
        ],
        experience: level * 100,
        gold: level * 50,
      });
    }

    return monsters;
  }

  private generateBoss(level: number, difficulty: Difficulty): Boss {
    return {
      id: `boss_${level}`,
      name: `Boss Level ${level}`,
      type: 'boss',
      level: level + 5,
      health: level * 1000,
      maxHealth: level * 1000,
      damage: { min: level * 50, max: level * 100 },
      defense: level * 20,
      resistances: {
        fire: 50,
        cold: 50,
        lightning: 50,
        poison: 50,
        magic: 50,
      },
      drops: [
        { item: this.generateRandomItem(level, 'unique'), chance: 100 },
        { gold: level * 1000, chance: 100 },
        { experience: level * 5000, chance: 100 },
      ],
      experience: level * 5000,
      gold: level * 1000,
      phases: [
        { healthThreshold: 0.5, abilities: ['Enrage'], behavior: 'Aggressive' },
      ],
      specialAbilities: ['Teleport', 'Summon Minions'],
      guaranteedDrops: [this.generateRandomItem(level, 'unique')],
    };
  }

  private generateRandomItem(level: number, rarity: ItemRarity = 'magic'): Item {
    const itemTypes: ItemType[] = ['weapon', 'armor', 'helmet', 'boots', 'gloves', 'ring', 'amulet'];
    const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];

    return {
      id: `item_${Date.now()}_${Math.random()}`,
      name: `${rarity} ${type}`,
      type,
      rarity,
      level,
      stats: {
        damage: type === 'weapon' ? { min: level * 5, max: level * 10 } : undefined,
        defense: type !== 'weapon' ? level * 10 : undefined,
        durability: { current: 100, max: 100 },
        requirements: {
          level,
          strength: level * 5,
          dexterity: level * 3,
        },
      },
      magicProperties: this.generateMagicProperties(level, rarity),
    };
  }

  private generateMagicProperties(level: number, rarity: ItemRarity): MagicProperty[] {
    const properties: MagicProperty[] = [];
    const propertyCount = rarity === 'unique' ? 6 : rarity === 'rare' ? 4 : 2;

    const propertyTypes = [
      { type: 'strength', description: '+{value} to Strength' },
      { type: 'dexterity', description: '+{value} to Dexterity' },
      { type: 'life', description: '+{value} to Life' },
      { type: 'mana', description: '+{value} to Mana' },
      { type: 'magicFind', description: '+{value}% Magic Find' },
      { type: 'goldFind', description: '+{value}% Gold Find' },
    ];

    for (let i = 0; i < propertyCount; i++) {
      const propType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const value = level * (1 + Math.floor(Math.random() * 5));
      properties.push({
        type: propType.type,
        value,
        description: propType.description.replace('{value}', value.toString()),
      });
    }

    return properties;
  }
}

interface CombatResult {
  characterDamage: number;
  monsterDamage: number;
  monsterKilled: boolean;
  characterDied: boolean;
}
