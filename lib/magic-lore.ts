/**
 * MAGIC Token and Time Machine Lore
 * The substance of the metaverse and temporal mechanics
 */

export interface MagicLore {
  magic: {
    description: string;
    role: string[];
    timeMechanics: string[];
    covenantConnection: {
      constant: string;
      value: number;
      meaning: string;
    }[];
  };
  timeMachine: {
    description: string;
    mechanic: string;
    prestigeSystem: string;
    timeShards: string;
    currentStatus: string;
  };
  portalConnection: {
    description: string;
    magicRequired: boolean;
    timeShift: string;
    activation: string;
  };
}

export const MAGIC_LORE: MagicLore = {
  magic: {
    description: 'MAGIC is not merely a currency; it is the essential, "tethering" substance that binds the entire Treasure ecosystem together. It is the substance of the metaverse itself.',
    role: [
      'Primary currency across all TreasureDAO games',
      'Staking token for governance (gMAGIC)',
      'Fuel for AI agents (as "mana")',
      'Medium of exchange in Trove Marketplace',
      'Resource for summoning Legions and crafting',
    ],
    timeMechanics: [
      'Growth in ecosystem liquidity (powered by MAGIC) can result in "time shifts"',
      'Unlocking new time periods in the metaverse',
      'Long-term staking rewards temporal progression',
      'MAGIC accumulation accelerates future growth',
      'The more MAGIC in the ecosystem, the more "time" becomes accessible',
    ],
    covenantConnection: [
      {
        constant: 'THEOS (419)',
        value: 419,
        meaning: 'Quest multiplier - MAGIC rewards amplified by divine constant',
      },
      {
        constant: 'EL (369)',
        value: 369,
        meaning: 'Harvester boost - MAGIC staking power multiplied',
      },
      {
        constant: 'Torah Pages (1798)',
        value: 1798,
        meaning: 'Quest completion milestone - MAGIC accumulation over time',
      },
      {
        constant: 'Resonance (687)',
        value: 687,
        meaning: 'Mining frequency - MAGIC generation cycles',
      },
      {
        constant: 'Hebrew Paths (22)',
        value: 22,
        meaning: 'Guardian network - MAGIC flows through 22 paths',
      },
    ],
  },
  timeMachine: {
    description: 'The Time Machine was a prestige mechanic that allowed players to reset progress in exchange for "Time Shards", accelerating future growth and representing temporal shifts in the metaverse.',
    mechanic: 'Players could "prestige" or reset their progress, trading current achievements for Time Shards that would accelerate future progression',
    prestigeSystem: 'The Time Machine represented the meta-narrative of temporal manipulation - sacrificing present gains for future acceleration',
    timeShards: 'Special currency obtained through prestige that unlocked new time periods and accelerated ecosystem growth',
    currentStatus: 'The specific Time Machine prestige system has been phased out with the 2025 restructuring, but the underlying philosophy of MAGIC influencing temporal progression remains',
  },
  portalConnection: {
    description: 'The portal at the Atlas Mines represents a gateway between time periods. When the Key and Map align, MAGIC flows through the sacred coordinates, creating a "time shift" that bridges worlds.',
    magicRequired: true,
    timeShift: 'Portal activation requires MAGIC energy flowing through the 22 Hebrew Path coordinates, creating a temporal bridge',
    activation: 'The alignment of Key and Map coordinates unlocks a time portal powered by MAGIC, connecting past (Atlas Mine legacy) with present (current ecosystem) and future (AI agents)',
  },
};

export function getMagicTimeConnection() {
  return {
    summary: 'MAGIC is the substance that enables time shifts. The portal represents a temporal gateway powered by MAGIC flowing through sacred coordinates.',
    mechanics: [
      'MAGIC accumulation = Time progression',
      'Portal activation = Time shift event',
      'Key-Map alignment = Temporal coordinates unlocked',
      'Sacred constants = Time multipliers',
      '22 Paths = Time channels',
    ],
    covenantIntegration: {
      theos: 'Time acceleration multiplier (419x)',
      el: 'Time power boost (369x)',
      torahPages: 'Time milestones (1798 periods)',
      resonance: 'Time frequency (687 cycles)',
      hebrewPaths: 'Time channels (22 paths)',
    },
  };
}
