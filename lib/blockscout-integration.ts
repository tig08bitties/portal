/**
 * Blockscout Integration
 * Blockchain Explorer API for Bridgeworld Portal
 * Repository: https://github.com/blockscout/blockscout
 */

export interface BlockscoutConfig {
  apiUrl?: string;
  chainId?: string;
  chainName?: string;
}

export interface BlockscoutChain {
  id: string;
  name: string;
  apiUrl: string;
  explorerUrl: string;
}

export interface BlockscoutTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timestamp: string;
  status: 'success' | 'failed';
  method?: string;
}

export interface BlockscoutToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  holders: number;
}

export interface BlockscoutAddress {
  address: string;
  balance: string;
  txCount: number;
  tokenCount: number;
  bytecode?: string; // Contract bytecode (if contract)
  isContract?: boolean; // Whether this is a contract address
}

export interface NotableAddress {
  address: string;
  name: string;
  description: string;
  chainId: string;
  category: 'staking' | 'token' | 'bridge' | 'governance' | 'other';
  defaultTab?: 'contract' | 'transactions' | 'tokens' | 'internal';
  contractVerified?: boolean;
}

export class BlockscoutIntegration {
  private apiUrl: string;
  private chainId: string;
  private chainName: string;
  private explorerUrl: string;

  private static chains: BlockscoutChain[] = [
    {
      id: '1',
      name: 'Ethereum',
      apiUrl: 'https://eth.blockscout.com/api',
      explorerUrl: 'https://eth.blockscout.com',
    },
    {
      id: '137',
      name: 'Polygon',
      apiUrl: 'https://polygonscan.com/api',
      explorerUrl: 'https://polygonscan.com',
    },
    {
      id: '42161',
      name: 'Arbitrum',
      apiUrl: 'https://arbitrum.blockscout.com/api',
      explorerUrl: 'https://arbitrum.blockscout.com',
    },
  ];

  constructor(config: BlockscoutConfig = {}) {
    // Default to Arbitrum Blockscout (TreasureDAO's chain)
    const defaultChain = BlockscoutIntegration.chains.find(c => c.id === '42161')!;
    this.apiUrl = config.apiUrl || defaultChain.apiUrl;
    this.chainId = config.chainId || defaultChain.id;
    this.chainName = config.chainName || defaultChain.name;
    this.explorerUrl = BlockscoutIntegration.chains.find(c => c.id === this.chainId)?.explorerUrl || defaultChain.explorerUrl;
  }

  /**
   * Get available chains
   */
  static getChains(): BlockscoutChain[] {
    return this.chains;
  }

  /**
   * Switch chain
   */
  switchChain(chainId: string): void {
    const chain = BlockscoutIntegration.chains.find(c => c.id === chainId);
    if (chain) {
      this.chainId = chain.id;
      this.chainName = chain.name;
      this.apiUrl = chain.apiUrl;
      this.explorerUrl = chain.explorerUrl;
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(txHash: string): Promise<BlockscoutTransaction | null> {
    try {
      const response = await fetch(
        `${this.apiUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=YourApiKeyToken`
      );

      if (!response.ok) {
        throw new Error(`Blockscout API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === '1' && data.result) {
        return this.parseTransaction(data.result);
      }
      return null;
    } catch (error) {
      console.error('Blockscout transaction error:', error);
      return null;
    }
  }

  /**
   * Get address information
   */
  async getAddress(address: string): Promise<BlockscoutAddress | null> {
    try {
      const balanceResponse = await fetch(
        `${this.apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`
      );
      
      const txCountResponse = await fetch(
        `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=YourApiKeyToken`
      );

      if (!balanceResponse.ok || !txCountResponse.ok) {
        throw new Error('Blockscout API error');
      }

      const balanceData = await balanceResponse.json();
      const txCountData = await txCountResponse.json();

      return {
        address,
        balance: balanceData.result || '0',
        txCount: parseInt(txCountData.result || '0', 16),
        tokenCount: 0, // Would need additional API call
      };
    } catch (error) {
      console.error('Blockscout address error:', error);
      return null;
    }
  }

  /**
   * Get MAGIC token information
   */
  async getMagicToken(): Promise<BlockscoutToken | null> {
    const MAGIC_ADDRESS = '0x539bdE0d7Dbd336b79148AA742883198BBF60342';
    
    try {
      const response = await fetch(
        `${this.apiUrl}?module=token&action=tokeninfo&contractaddress=${MAGIC_ADDRESS}&apikey=YourApiKeyToken`
      );

      if (!response.ok) {
        throw new Error('Blockscout API error');
      }

      const data = await response.json();
      if (data.status === '1' && data.result) {
        return {
          address: MAGIC_ADDRESS,
          name: data.result.name || 'MAGIC',
          symbol: data.result.symbol || 'MAGIC',
          decimals: parseInt(data.result.decimals || '18'),
          totalSupply: data.result.totalSupply || '0',
          holders: parseInt(data.result.holdersCount || '0'),
        };
      }
      return null;
    } catch (error) {
      console.error('Blockscout token error:', error);
      return this.getMockMagicToken();
    }
  }

  /**
   * Get recent transactions for an address
   */
  async getAddressTransactions(address: string, limit: number = 10): Promise<BlockscoutTransaction[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=YourApiKeyToken`
      );

      if (!response.ok) {
        throw new Error('Blockscout API error');
      }

      const data = await response.json();
      if (data.status === '1' && data.result) {
        return data.result.map((tx: any) => this.parseTransaction(tx));
      }
      return [];
    } catch (error) {
      console.error('Blockscout transactions error:', error);
      return [];
    }
  }

  /**
   * Parse transaction data
   */
  private parseTransaction(tx: any): BlockscoutTransaction {
    return {
      hash: tx.hash || tx.transactionHash,
      from: tx.from,
      to: tx.to,
      value: tx.value || '0',
      gasUsed: tx.gasUsed || '0',
      gasPrice: tx.gasPrice || '0',
      timestamp: tx.timeStamp || Date.now().toString(),
      status: tx.txreceipt_status === '1' ? 'success' : 'failed',
      method: tx.method,
    };
  }

  /**
   * Get explorer URL for transaction
   */
  getTransactionUrl(txHash: string): string {
    return `${this.explorerUrl}/tx/${txHash}`;
  }

  /**
   * Get explorer URL for address
   */
  getAddressUrl(address: string, tab?: 'contract' | 'transactions' | 'tokens' | 'internal'): string {
    const baseUrl = `${this.explorerUrl}/address/${address}`;
    return tab ? `${baseUrl}?tab=${tab}` : baseUrl;
  }

  /**
   * Get explorer URL for token
   */
  getTokenUrl(tokenAddress: string, tab?: 'contract' | 'transactions' | 'holders' | 'inventory'): string {
    const baseUrl = `${this.explorerUrl}/token/${tokenAddress}`;
    return tab ? `${baseUrl}?tab=${tab}` : baseUrl;
  }

  /**
   * Get current chain info
   */
  getChainInfo(): BlockscoutChain {
    return {
      id: this.chainId,
      name: this.chainName,
      apiUrl: this.apiUrl,
      explorerUrl: this.explorerUrl,
    };
  }

  /**
   * Get notable addresses
   */
  static getNotableAddresses(): NotableAddress[] {
    return [
      /**
       * OFFICIAL COVENANT ADDRESSES - SET IN STONE
       * These are the ONLY official covenant addresses. All other addresses
       * in this list are examples/placeholders for reference only.
       */
      {
        address: '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea',
        name: 'Covenant Address #1 (OFFICIAL)',
        description: 'Official covenant address - Ethereum Mainnet - SET IN STONE',
        chainId: '1',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
      {
        address: '0x0c4e50157a6e82f5330b721544ce440cb0c6768f',
        name: 'Covenant Address #2 (OFFICIAL)',
        description: 'Official covenant address - Polygon (MATIC) - SET IN STONE',
        chainId: '137',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
      {
        address: '0x3df07977140ad97465075129c37aec7237d74415',
        name: 'Covenant Address #3 (OFFICIAL)',
        description: 'Official covenant address - Arbitrum - SET IN STONE',
        chainId: '42161',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
      /**
       * Reference addresses below are examples/placeholders only
       */
      {
        address: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
        name: 'Ethereum 2.0 Deposit Contract',
        description: 'Official contract for ETH deposits to become validators on Ethereum 2.0 (Reference)',
        chainId: '1',
        category: 'staking',
        defaultTab: 'contract',
        contractVerified: true,
      },
      {
        address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
        name: 'MAGIC Token',
        description: 'TreasureDAO native token - substance of the metaverse (Reference)',
        chainId: '42161',
        category: 'token',
        defaultTab: 'contract',
        contractVerified: true,
      },
      {
        address: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
        name: 'Chainlink (LINK)',
        description: 'Chainlink token on Arbitrum - decentralized oracle network',
        chainId: '42161',
        category: 'token',
        defaultTab: 'contract',
        contractVerified: true,
      },
      {
        address: '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea',
        name: 'Covenant Address #1',
        description: 'Official covenant address - Ethereum Mainnet - Bridgeworld portal foundation',
        chainId: '1',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
      {
        address: '0x0c4e50157a6e82f5330b721544ce440cb0c6768f',
        name: 'Covenant Address #2',
        description: 'Official covenant address - Polygon (MATIC) - Bridgeworld portal foundation',
        chainId: '137',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
      {
        address: '0x3df07977140ad97465075129c37aec7237d74415',
        name: 'Covenant Address #3',
        description: 'Official covenant address - Arbitrum - Bridgeworld portal foundation',
        chainId: '42161',
        category: 'governance',
        defaultTab: 'contract',
        contractVerified: false,
      },
    ];
  }

  /**
   * Get notable address by address
   */
  static getNotableAddress(address: string): NotableAddress | null {
    const normalized = address.toLowerCase();
    return this.getNotableAddresses().find(na => na.address.toLowerCase() === normalized) || null;
  }

  /**
   * Mock MAGIC token for development
   */
  private getMockMagicToken(): BlockscoutToken {
    return {
      address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
      name: 'MAGIC',
      symbol: 'MAGIC',
      decimals: 18,
      totalSupply: '350000000000000000000000000',
      holders: 50000,
    };
  }
}
