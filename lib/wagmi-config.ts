/**
 * Wagmi Configuration
 * Based on TreasureProject web3-starter-template
 * https://github.com/TreasureProject/web3-starter-template
 */

import { getDefaultConfig } from 'connectkit';
import { arbitrum, arbitrumSepolia, mainnet } from 'viem/chains';
import { createConfig, http, type Transport } from 'wagmi';

const MAINNET_CHAINS = [arbitrum, mainnet] as const;
const TESTNET_CHAINS = [arbitrumSepolia] as const;

export const ENABLED_CHAINS =
  process.env.NEXT_PUBLIC_ENABLE_TESTNET === 'true'
    ? TESTNET_CHAINS
    : MAINNET_CHAINS;

export function getWagmiConfig() {
  return createConfig(
    getDefaultConfig({
      chains: ENABLED_CHAINS,
      transports: ENABLED_CHAINS.reduce<{
        [key in (typeof ENABLED_CHAINS)[number]['id']]: Transport;
      }>((acc, chain) => {
        acc[chain.id] = http();
        return acc;
      }, {} as any),
      walletConnectProjectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
      appName: 'Bridgeworld Portal',
      appDescription:
        'TreasureDAO Bridgeworld Portal with Eternal Covenant Integration',
      ssr: true,
    }),
  );
}
