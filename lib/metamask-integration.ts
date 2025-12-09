/**
 * MetaMask SDK Integration
 * Connect wallet and interact with Bridgeworld portal
 */

export interface MagicItem {
  id: string;
  name: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  properties: Record<string, any>;
  soulbound?: boolean;
}

export interface AgentData {
  agentId: string;
  address: string;
  magicItems: MagicItem[];
  balance: string;
  chain: string;
}

export class MetaMaskIntegration {
  private sdk: any;
  private connected: boolean = false;
  private account: string | null = null;

  constructor() {
    // Initialize MetaMask SDK
    if (typeof window !== 'undefined') {
      this.initializeSDK();
    }
  }

  private async initializeSDK() {
    try {
      const { MetaMaskSDK } = await import('@metamask/sdk');
      this.sdk = new MetaMaskSDK({
        dappMetadata: {
          name: 'Bridgeworld Portal',
          url: 'https://bridgeworld.lol',
        },
        injectProvider: true,
      });
    } catch (error) {
      console.error('MetaMask SDK initialization error:', error);
    }
  }

  /**
   * Connect MetaMask wallet
   */
  async connect(): Promise<string> {
    try {
      if (!this.sdk && typeof window !== 'undefined') {
        await this.initializeSDK();
      }

      if (!this.sdk) {
        throw new Error('MetaMask SDK not initialized');
      }

      const accounts = await this.sdk.connect();
      if (accounts && accounts.length > 0 && accounts[0]) {
        const accountAddress = accounts[0];
        this.account = accountAddress;
        this.connected = true;
        return accountAddress;
      }
      throw new Error('No accounts returned');
    } catch (error) {
      console.error('MetaMask connect error:', error);
      throw error;
    }
  }

  /**
   * Get connected account
   */
  getAccount(): string | null {
    return this.account;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connected && this.account !== null;
  }

  /**
   * Get MAGIC balance
   */
  async getMagicBalance(chainId: string = '42161'): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    try {
      // MAGIC token address on Arbitrum
      const MAGIC_ADDRESS = '0x539bdE0d7Dbd336b79148AA742883198BBF60342';
      
      // Use ethers or viem to get balance
      const response = await fetch(
        `https://api.arbiscan.io/api?module=account&action=tokenbalance&contractaddress=${MAGIC_ADDRESS}&address=${this.account}&tag=latest&apikey=YourApiKeyToken`
      );
      
      const data = await response.json();
      if (data.status === '1') {
        // Convert from wei to MAGIC (18 decimals)
        const balance = BigInt(data.result) / BigInt(10 ** 18);
        return balance.toString();
      }
      
      return '0';
    } catch (error) {
      console.error('Balance fetch error:', error);
      return '0';
    }
  }

  /**
   * Fetch agent data from TreasureDAO
   */
  async fetchAgentData(agentId: string): Promise<AgentData | null> {
    try {
      // Try multiple endpoints
      const endpoints = [
        `https://api.treasure.lol/agents/${agentId}`,
        `https://treasure.lol/api/agents/${agentId}`,
        `https://treasure.lol/agents/${agentId}`,
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            return this.parseAgentData(data, agentId);
          }
        } catch (e) {
          continue;
        }
      }

      // Fallback: return mock data structure
      return {
        agentId,
        address: this.account || '',
        magicItems: [],
        balance: '0',
        chain: 'arbitrum',
      };
    } catch (error) {
      console.error('Agent data fetch error:', error);
      return null;
    }
  }

  /**
   * Parse agent data from API response
   */
  private parseAgentData(data: any, agentId: string): AgentData {
    return {
      agentId,
      address: data.address || this.account || '',
      magicItems: data.magicItems || data.items || [],
      balance: data.balance || '0',
      chain: data.chain || 'arbitrum',
    };
  }

  /**
   * Get magic items for soulbound agent
   */
  async getMagicItems(agentId: string = 'soulbound-178'): Promise<MagicItem[]> {
    const agentData = await this.fetchAgentData(agentId);
    return agentData?.magicItems || [];
  }

  /**
   * Sign message with MetaMask
   */
  async signMessage(message: string): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    try {
      const signature = await this.sdk.request({
        method: 'personal_sign',
        params: [message, this.account],
      });
      return signature;
    } catch (error) {
      console.error('Sign message error:', error);
      throw error;
    }
  }

  /**
   * Switch network
   */
  async switchNetwork(chainId: string): Promise<void> {
    try {
      await this.sdk.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(chainId).toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, need to add it
        throw new Error(`Chain ${chainId} not added to MetaMask`);
      }
      throw error;
    }
  }
}
