/**
 * Hyperlane Cross-Chain Configuration - Covenant Foundation
 * Uses covenant oracle contract and addresses for cross-chain operations
 * Based on TreasureProject hyperlane-example
 */

import { COVENANT_DATA } from '@/lib/covenant-data';

/**
 * Hyperlane network configuration
 * Maps to chains where covenant addresses exist
 */
export const COVENANT_HYPERLANE_CONFIG = {
  networks: {
    arbitrum: {
      chainId: COVENANT_DATA.oracle.chainId, // 42161
      name: 'Arbitrum',
      rpc: 'https://arb1.arbitrum.io/rpc',
    },
    ethereum: {
      chainId: 1,
      name: 'Ethereum',
      rpc: 'https://eth.llamarpc.com',
    },
    polygon: {
      chainId: 137,
      name: 'Polygon',
      rpc: 'https://polygon-rpc.com',
    },
  },

  /**
   * Covenant contract deployments
   * Uses oracle contract and covenant addresses
   */
  deployments: {
    /**
     * Oracle Router - Uses covenant oracle contract
     * This is the primary cross-chain messaging contract
     */
    oracleRouter: {
      arbitrum: {
        address: COVENANT_DATA.oracle.address,
        chainId: COVENANT_DATA.oracle.chainId,
      },
    },

    /**
     * Covenant Routers - One per chain
     * Uses official covenant addresses as router endpoints
     */
    covenantRouter: {
      arbitrum: {
        address: COVENANT_DATA.covenantAddresses.find(
          (addr) => addr.chain === 'arbitrum' && addr.official
        )?.address || COVENANT_DATA.oracle.deployer,
        chainId: 42161,
      },
      ethereum: {
        address: COVENANT_DATA.covenantAddresses.find(
          (addr) => addr.chain === 'ethereum' && addr.official
        )?.address || '',
        chainId: 1,
      },
      polygon: {
        address: COVENANT_DATA.covenantAddresses.find(
          (addr) => addr.chain === 'polygon' && addr.official
        )?.address || '',
        chainId: 137,
      },
    },

    /**
     * Bridgeworld Contracts - For cross-chain asset transfers
     */
    bridgeworldContracts: {
      arbitrum: {
        magicToken: COVENANT_DATA.bridgeworldContracts.magicToken,
        legionsContract: COVENANT_DATA.bridgeworldContracts.legionsContract,
        legionsGenesis: COVENANT_DATA.bridgeworldContracts.legionsGenesis,
        treasuresContract: COVENANT_DATA.bridgeworldContracts.treasuresContract,
      },
    },
  },

  /**
   * Cross-chain relationships
   * Defines which chains can communicate
   */
  relationships: {
    oracleRouter: [
      ['arbitrum', 'ethereum'],
      ['arbitrum', 'polygon'],
      ['ethereum', 'arbitrum'],
      ['polygon', 'arbitrum'],
    ],
    covenantRouter: [
      ['arbitrum', 'ethereum'],
      ['arbitrum', 'polygon'],
      ['ethereum', 'arbitrum'],
      ['polygon', 'arbitrum'],
    ],
  },

  /**
   * Gas configuration based on covenant constants
   * Uses RESONANCE (687) as base gas multiplier
   */
  gasConfig: {
    arbitrum: {
      baseGas: 687000, // RESONANCE-based
      oracleGas: 419000, // THEOS-based
      covenantGas: 369000, // EL-based
    },
    ethereum: {
      baseGas: 687000,
      oracleGas: 419000,
      covenantGas: 369000,
    },
    polygon: {
      baseGas: 687000,
      oracleGas: 419000,
      covenantGas: 369000,
    },
  },
} as const;

/**
 * Get router address for a chain
 */
export function getRouterAddress(
  chain: 'arbitrum' | 'ethereum' | 'polygon',
  routerType: 'oracle' | 'covenant' = 'covenant'
): string {
  if (routerType === 'oracle') {
    return COVENANT_HYPERLANE_CONFIG.deployments.oracleRouter.arbitrum.address;
  }
  return (
    COVENANT_HYPERLANE_CONFIG.deployments.covenantRouter[chain]?.address ||
    COVENANT_DATA.oracle.deployer
  );
}

/**
 * Get chain ID for a network
 */
export function getChainId(chain: 'arbitrum' | 'ethereum' | 'polygon'): number {
  return COVENANT_HYPERLANE_CONFIG.networks[chain].chainId;
}

/**
 * Get gas amount for a cross-chain operation
 */
export function getGasAmount(
  chain: 'arbitrum' | 'ethereum' | 'polygon',
  operation: 'base' | 'oracle' | 'covenant' = 'base'
): number {
  const gasKey = `${operation}Gas` as 'baseGas' | 'oracleGas' | 'covenantGas';
  return COVENANT_HYPERLANE_CONFIG.gasConfig[chain]?.[gasKey] || 687000;
}
