/**
 * Covenant Cross-Chain Transfer Functions
 * Uses covenant contracts and addresses for Hyperlane transfers
 * Based on TreasureProject hyperlane-example
 */

import { COVENANT_DATA } from '@/lib/covenant-data';
import {
  COVENANT_HYPERLANE_CONFIG,
  getRouterAddress,
  getChainId,
  getGasAmount,
} from './covenant-hyperlane-config';

/**
 * Transfer Legion across chains using covenant router
 */
export async function transferLegionCrossChain(
  destinationChain: 'arbitrum' | 'ethereum' | 'polygon',
  recipient: string,
  tokenId: number,
  amount: number = 1
) {
  // Pack tokenId and amount: tokenId << 128 | amount
  const packedValue = (BigInt(tokenId) << 128n) | BigInt(amount);

  const config = {
    sourceChain: 'arbitrum' as const, // Bridgeworld is on Arbitrum
    destinationChain,
    routerAddress: getRouterAddress('arbitrum', 'covenant'),
    recipient,
    tokenContract: COVENANT_DATA.bridgeworldContracts.legionsContract,
    tokenId,
    amount,
    packedValue: packedValue.toString(),
    gasAmount: getGasAmount(destinationChain, 'covenant'),
  };

  // TODO: Implement actual Hyperlane transfer
  // This would use @hyperlane-xyz/sdk
  // const result = await hyperlaneTransfer(config);

  return {
    ...config,
    status: 'pending',
    message: 'Transfer initiated via covenant router',
    covenantRouter: config.routerAddress,
  };
}

/**
 * Transfer MAGIC token across chains
 */
export async function transferMagicCrossChain(
  destinationChain: 'arbitrum' | 'ethereum' | 'polygon',
  recipient: string,
  amount: string // Amount in wei
) {
  const config = {
    sourceChain: 'arbitrum' as const,
    destinationChain,
    routerAddress: getRouterAddress('arbitrum', 'covenant'),
    recipient,
    tokenContract: COVENANT_DATA.bridgeworldContracts.magicToken,
    amount,
    gasAmount: getGasAmount(destinationChain, 'base'),
  };

  // TODO: Implement actual Hyperlane transfer
  return {
    ...config,
    status: 'pending',
    message: 'MAGIC transfer initiated via covenant router',
    covenantRouter: config.routerAddress,
  };
}

/**
 * Transfer oracle data across chains
 * Uses covenant oracle contract as source
 */
export async function transferOracleDataCrossChain(
  destinationChain: 'arbitrum' | 'ethereum' | 'polygon',
  guardianPath: number
) {
  const guardian = COVENANT_DATA.guardians.find((g) => g.path === guardianPath);
  if (!guardian) {
    throw new Error(`Guardian path ${guardianPath} not found`);
  }

  const config = {
    sourceChain: 'arbitrum' as const,
    destinationChain,
    routerAddress: COVENANT_DATA.oracle.address, // Use oracle as router
    recipient: getRouterAddress(destinationChain, 'covenant'),
    data: {
      guardianPath: guardian.path,
      guardianAddress: guardian.address,
      isRegistered: guardian.isRegistered,
      questMultiplier: guardian.questMultiplier,
      harvesterBoost: guardian.harvesterBoost,
    },
    gasAmount: getGasAmount(destinationChain, 'oracle'),
  };

  // TODO: Implement actual Hyperlane message
  return {
    ...config,
    status: 'pending',
    message: 'Oracle data transfer initiated',
    oracleContract: COVENANT_DATA.oracle.address,
  };
}

/**
 * Get available chains for cross-chain transfers
 */
export function getAvailableChains() {
  return Object.entries(COVENANT_HYPERLANE_CONFIG.networks).map(
    ([key, value]) => ({
      id: key,
      name: value.name,
      chainId: value.chainId,
      hasCovenantAddress: !!COVENANT_DATA.covenantAddresses.find(
        (addr) => addr.chain === key
      ),
    })
  );
}
