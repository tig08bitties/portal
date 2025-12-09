/**
 * Treasure Bridge Integration
 * Cross-chain token bridging for MAGIC token
 * Bridge URL: https://bridge.treasure.lol
 */

export interface BridgeConfig {
  fromChain?: string;
  toChain?: string;
  token?: string;
  type?: 'tokens' | 'nfts';
}

export interface BridgeChain {
  id: string;
  name: string;
  chainId: number;
  nativeCurrency: string;
}

export class TreasureBridgeIntegration {
  private baseUrl = 'https://bridge.treasure.lol';
  private defaultFromChain = '42161'; // Arbitrum
  private defaultToChain = '8453'; // Base
  private defaultToken = 'MAGIC';

  /**
   * Get bridge URL with parameters
   */
  getBridgeUrl(config: BridgeConfig = {}): string {
    const from = config.fromChain || this.defaultFromChain;
    const to = config.toChain || this.defaultToChain;
    const type = config.type || 'tokens';
    const token = config.token || this.defaultToken;

    return `${this.baseUrl}/?from=${from}&to=${to}&type=${type}&token=${token}`;
  }

  /**
   * Get bridge URL for MAGIC token
   */
  getMagicBridgeUrl(fromChain: string = '42161', toChain: string = '8453'): string {
    return this.getBridgeUrl({
      fromChain,
      toChain,
      type: 'tokens',
      token: 'MAGIC',
    });
  }

  /**
   * Get supported chains
   */
  getSupportedChains(): BridgeChain[] {
    return [
      { id: '1', name: 'Ethereum', chainId: 1, nativeCurrency: 'ETH' },
      { id: '42161', name: 'Arbitrum', chainId: 42161, nativeCurrency: 'ETH' },
      { id: '8453', name: 'Base', chainId: 8453, nativeCurrency: 'ETH' },
      { id: '137', name: 'Polygon', chainId: 137, nativeCurrency: 'MATIC' },
    ];
  }

  /**
   * Get bridge base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get chain name by ID
   */
  getChainName(chainId: string): string {
    const chain = this.getSupportedChains().find(c => c.id === chainId);
    return chain?.name || chainId;
  }
}
