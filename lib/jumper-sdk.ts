/**
 * Jumper Exchange SDK Integration
 * Multi-chain bridging and swapping for Bridgeworld
 * Repository: https://github.com/jumperexchange/jumper-exchange
 */

export interface JumperConfig {
  apiKey?: string;
  apiUrl?: string;
}

export interface BridgeQuote {
  fromChain: string;
  toChain: string;
  token: string;
  amount: string;
  estimatedTime: number;
  fee: {
    amount: string;
    token: string;
  };
  routeId: string;
}

export interface BridgeTransaction {
  routeId: string;
  txHash: string;
  status: 'pending' | 'completed' | 'failed';
  fromChain: string;
  toChain: string;
  token: string;
  amount: string;
}

export class JumperSDK {
  private apiUrl: string;
  private apiKey?: string;

  constructor(config: JumperConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://api.jumper.exchange';
    this.apiKey = config.apiKey;
  }

  /**
   * Get quote for bridging tokens
   */
  async getQuote(
    fromChain: string,
    toChain: string,
    token: string,
    amount: string
  ): Promise<BridgeQuote> {
    try {
      const response = await fetch(
        `${this.apiUrl}/v1/quote?fromChain=${fromChain}&toChain=${toChain}&token=${token}&amount=${amount}`,
        {
          headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
        }
      );

      if (!response.ok) {
        throw new Error(`Jumper API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Jumper quote error:', error);
      // Return mock quote for development
      return this.getMockQuote(fromChain, toChain, token, amount);
    }
  }

  /**
   * Execute bridge transaction
   */
  async bridge(
    fromChain: string,
    toChain: string,
    token: string,
    amount: string,
    recipient: string
  ): Promise<BridgeTransaction> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/bridge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        },
        body: JSON.stringify({
          fromChain,
          toChain,
          token,
          amount,
          recipient,
        }),
      });

      if (!response.ok) {
        throw new Error(`Bridge failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        routeId: data.routeId,
        txHash: data.txHash,
        status: 'pending',
        fromChain,
        toChain,
        token,
        amount,
      };
    } catch (error) {
      console.error('Bridge error:', error);
      throw error;
    }
  }

  /**
   * Get bridge status
   */
  async getStatus(routeId: string): Promise<BridgeTransaction> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/status/${routeId}`, {
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Status check error:', error);
      return {
        routeId,
        txHash: '',
        status: 'pending',
        fromChain: '',
        toChain: '',
        token: '',
        amount: '',
      };
    }
  }

  /**
   * Get supported chains
   */
  async getSupportedChains(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/chains`);
      const data = await response.json();
      return data.chains || [];
    } catch (error) {
      // Return default chains
      return ['ethereum', 'arbitrum', 'base', 'optimism', 'polygon'];
    }
  }

  /**
   * Get supported tokens for a chain
   */
  async getSupportedTokens(chain: string): Promise<Array<{ address: string; symbol: string; decimals: number }>> {
    try {
      const response = await fetch(`${this.apiUrl}/v1/tokens?chain=${chain}`);
      const data = await response.json();
      return data.tokens || [];
    } catch (error) {
      // Return MAGIC token as default
      return [
        {
          address: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
          symbol: 'MAGIC',
          decimals: 18,
        },
      ];
    }
  }

  /**
   * Mock quote for development
   */
  private getMockQuote(
    fromChain: string,
    toChain: string,
    token: string,
    amount: string
  ): BridgeQuote {
    return {
      fromChain,
      toChain,
      token,
      amount,
      estimatedTime: 300, // 5 minutes
      fee: {
        amount: '0.1',
        token: 'MAGIC',
      },
      routeId: `route_${Date.now()}`,
    };
  }

  /**
   * Bridgeworld-specific bridge helpers
   */
  async bridgeMagicToEthereum(amount: string, recipient: string): Promise<BridgeTransaction> {
    return this.bridge(
      'arbitrum',
      'ethereum',
      '0x539bdE0d7Dbd336b79148AA742883198BBF60342', // MAGIC
      amount,
      recipient
    );
  }

  async bridgeMagicToBase(amount: string, recipient: string): Promise<BridgeTransaction> {
    return this.bridge(
      'arbitrum',
      'base',
      'MAGIC',
      amount,
      recipient
    );
  }
}
