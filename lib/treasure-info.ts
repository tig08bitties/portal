/**
 * TreasureDAO Current State Information
 * Updated to reflect post-2025 restructuring
 */

export interface TreasureDAOInfo {
  currentProducts: {
    name: string;
    url: string;
    description: string;
    status: 'active' | 'discontinued';
  }[];
  discontinued: {
    name: string;
    reason: string;
    replacement?: string;
  }[];
  repositories: {
    name: string;
    url: string;
    description: string;
  }[];
  contractAddresses: {
    name: string;
    address: string;
    network: string;
    status: 'active' | 'deprecated';
  }[];
}

export const TREASURE_INFO: TreasureDAOInfo = {
  currentProducts: [
    {
      name: 'Trove Marketplace',
      url: 'https://trove.treasure.lol',
      description: 'The main hub for buying and selling NFTs within the ecosystem',
      status: 'active',
    },
    {
      name: 'Bridgeworld',
      url: 'https://bridgeworld.treasure.lol',
      description: 'The flagship game with new competitive element called "Canopy"',
      status: 'active',
    },
    {
      name: 'Smolworld',
      url: 'https://treasure.lol',
      description: 'A simulation game featuring AI agents',
      status: 'active',
    },
    {
      name: 'AI Agent Technology',
      url: 'https://treasure.lol',
      description: 'Marketplace and framework for creating and trading AI agents powered by Neurochimp',
      status: 'active',
    },
  ],
  discontinued: [
    {
      name: 'Atlas Mine',
      reason: 'Phased out in 2025 due to financial restructuring and unsustainable burn rate',
      replacement: 'Replaced by game-first growth model focusing on Trove, Bridgeworld (Canopy), Smolworld, and AI agents',
    },
    {
      name: 'Treasure Chain',
      reason: 'Shut down May 30, 2025 due to high infrastructure costs ($450k/year)',
      replacement: 'Focus shifted to Arbitrum and Base networks',
    },
    {
      name: 'Third-Party Game Publishing',
      reason: 'Unscalable business model',
      replacement: 'Focus on core products and AI agent technology',
    },
  ],
  repositories: [
    {
      name: 'TreasureProject',
      url: 'https://github.com/TreasureProject',
      description: 'Main GitHub organization for TreasureDAO',
    },
    {
      name: 'treasure-project-contracts',
      url: 'https://github.com/TreasureProject/treasure-project-contracts',
      description: 'Smart contracts including Atlas Mine (deprecated) - Contains Atlas Mine contract code',
    },
    {
      name: 'treasure-marketplace-contracts',
      url: 'https://github.com/TreasureProject/treasure-marketplace-contracts',
      description: 'Trove marketplace smart contracts',
    },
    {
      name: 'treasure-docs',
      url: 'https://github.com/TreasureProject/treasure-docs',
      description: 'TreasureDAO documentation',
    },
    {
      name: 'legiondex',
      url: 'https://github.com/TreasureProject/legiondex',
      description: 'Legion information and tools',
    },
    {
      name: 'magicswap',
      url: 'https://github.com/TreasureProject/magicswap',
      description: 'MAGIC token swap contracts',
    },
  ],
  contractAddresses: [
    {
      name: 'MAGIC Token',
      address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
      network: 'Arbitrum',
      status: 'active',
    },
    {
      name: 'Legions Contract',
      address: '0x658365026D06F00965B5bb570727100E821e6508',
      network: 'Arbitrum',
      status: 'active',
    },
    {
      name: 'Atlas Mine (Deprecated)',
      address: '0x0a537d647B714cC023680d9c55598C72b810B2e8',
      network: 'Arbitrum',
      status: 'deprecated',
    },
    {
      name: 'Trove Marketplace',
      address: '0xEBba467eCB6b21239178033189CeAE27CA12EaDf',
      network: 'Arbitrum',
      status: 'active',
    },
  ],
};

export function getAtlasMineInfo() {
  return {
    status: 'discontinued',
    reason: 'Phased out in April 2025 due to financial restructuring and unsustainable burn rate ($8.3M/year)',
    contractAddress: '0x0a537d647B714cC023680d9c55598C72b810B2e8',
    network: 'Arbitrum',
    repository: 'https://github.com/TreasureProject/treasure-project-contracts',
    repositoryNote: 'The Atlas Mine contract code is available in the treasure-project-contracts repository. The contract is deprecated but the code remains for historical reference.',
    replacement: 'Focus shifted to Trove Marketplace, Bridgeworld (Canopy), Smolworld, and AI Agent Technology',
    officialLinks: {
      main: 'https://treasure.lol',
      marketplace: 'https://trove.treasure.lol',
      bridgeworld: 'https://bridgeworld.treasure.lol',
      github: 'https://github.com/TreasureProject',
    },
    whatReplacedIt: [
      'Trove Marketplace - NFT trading hub',
      'Bridgeworld Canopy - New competitive element',
      'Smolworld - AI agent simulation game',
      'AI Agent Technology - Neurochimp-powered agents',
    ],
  };
}
