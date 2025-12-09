/**
 * Chainlist Integration
 * Chainlist.org - EVM Chain Registry
 * URL: https://chainlist.org/
 */

export interface ChainInfo {
  chainId: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: Array<{
    name: string;
    url: string;
  }>;
  chainlistUrl: string;
}

export class ChainlistIntegration {
  private baseUrl = 'https://chainlist.org';

  /**
   * Get chain info for covenant addresses
   */
  getCovenantChains(): ChainInfo[] {
    return [
      {
        chainId: 1,
        name: 'Ethereum Mainnet',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: [
          'https://eth.blockscout.com',
          'https://rpc.ankr.com/eth',
        ],
        blockExplorers: [
          {
            name: 'Etherscan',
            url: 'https://etherscan.io',
          },
          {
            name: 'Blockscout',
            url: 'https://eth.blockscout.com',
          },
        ],
        chainlistUrl: 'https://chainlist.org/chain/1',
      },
      {
        chainId: 137,
        name: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: [
          'https://polygon-rpc.com',
          'https://rpc.ankr.com/polygon',
        ],
        blockExplorers: [
          {
            name: 'Polygonscan',
            url: 'https://polygonscan.com',
          },
        ],
        chainlistUrl: 'https://chainlist.org/chain/137',
      },
      {
        chainId: 42161,
        name: 'Arbitrum One',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: [
          'https://arb1.arbitrum.io/rpc',
          'https://arbitrum.blockscout.com',
        ],
        blockExplorers: [
          {
            name: 'Arbiscan',
            url: 'https://arbiscan.io',
          },
          {
            name: 'Blockscout',
            url: 'https://arbitrum.blockscout.com',
          },
        ],
        chainlistUrl: 'https://chainlist.org/chain/42161',
      },
    ];
  }

  /**
   * Get chain info by chain ID
   */
  getChainInfo(chainId: number): ChainInfo | null {
    return this.getCovenantChains().find(chain => chain.chainId === chainId) || null;
  }

  /**
   * Get Chainlist URL for a chain
   */
  getChainlistUrl(chainId: number): string {
    return `https://chainlist.org/chain/${chainId}`;
  }

  /**
   * Get Chainlist search URL
   */
  getSearchUrl(query: string): string {
    return `https://chainlist.org/?search=${encodeURIComponent(query)}`;
  }

  /**
   * Get Chainlist main URL
   */
  getMainUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get MetaMask add chain parameters
   */
  getMetaMaskChainParams(chainId: number): any | null {
    const chain = this.getChainInfo(chainId);
    if (!chain) return null;

    return {
      chainId: `0x${chain.chainId.toString(16)}`,
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpcUrls,
      blockExplorerUrls: chain.blockExplorers.map(exp => exp.url),
    };
  }
}
