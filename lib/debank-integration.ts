/**
 * DeBank Integration
 * DeFi Portfolio Tracker and Analytics
 * Profile: https://debank.com/profile/0x3bba654a3816a228284e3e0401cff4ea6dfc5cea
 */

export interface DeBankConfig {
  apiUrl?: string;
  apiKey?: string;
}

export interface DeBankToken {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  price: number;
  amount: number;
  amountUSD: number;
  logoUrl?: string;
}

export interface DeBankProtocol {
  id: string;
  name: string;
  chain: string;
  portfolioItemList: Array<{
    stats: {
      asset_usd_value: number;
      debt_usd_value: number;
    };
  }>;
}

export interface DeBankProfile {
  address: string;
  totalUsdValue: number;
  totalDebtValue: number;
  netWorth: number;
  tokenList: DeBankToken[];
  protocolList: DeBankProtocol[];
  nftList: Array<{
    id: string;
    name: string;
    chain: string;
    amount: number;
  }>;
}

export class DeBankIntegration {
  private apiUrl: string;
  private apiKey?: string;
  private defaultAddress = '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea';

  constructor(config: DeBankConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://pro-openapi.debank.com';
    this.apiKey = config.apiKey || process.env.DEBANK_API_KEY;
  }

  /**
   * Get user profile data
   */
  async getProfile(address?: string): Promise<DeBankProfile | null> {
    const targetAddress = address || this.defaultAddress;
    
    try {
      // DeBank API endpoints
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      
      if (this.apiKey) {
        headers['AccessKey'] = this.apiKey;
      }

      // Get total balance
      const balanceResponse = await fetch(
        `${this.apiUrl}/v1/user/total_balance?id=${targetAddress}`,
        { headers }
      );

      // Get token list
      const tokenResponse = await fetch(
        `${this.apiUrl}/v1/user/token_list?id=${targetAddress}&is_all=true`,
        { headers }
      );

      // Get protocol list
      const protocolResponse = await fetch(
        `${this.apiUrl}/v1/user/protocol_list?id=${targetAddress}`,
        { headers }
      );

      if (!balanceResponse.ok && !tokenResponse.ok) {
        throw new Error('DeBank API error');
      }

      const balanceData = balanceResponse.ok ? await balanceResponse.json() : { total_usd_value: 0 };
      const tokenData = tokenResponse.ok ? await tokenResponse.json() : [];
      const protocolData = protocolResponse.ok ? await protocolResponse.json() : [];

      return {
        address: targetAddress,
        totalUsdValue: balanceData.total_usd_value || 0,
        totalDebtValue: balanceData.total_debt_value || 0,
        netWorth: (balanceData.total_usd_value || 0) - (balanceData.total_debt_value || 0),
        tokenList: this.parseTokens(tokenData),
        protocolList: this.parseProtocols(protocolData),
        nftList: [],
      };
    } catch (error) {
      console.error('DeBank profile error:', error);
      return this.getMockProfile(targetAddress);
    }
  }

  /**
   * Get token list for address
   */
  async getTokenList(address?: string): Promise<DeBankToken[]> {
    const profile = await this.getProfile(address);
    return profile?.tokenList || [];
  }

  /**
   * Get MAGIC token balance
   */
  async getMagicBalance(address?: string): Promise<{
    amount: number;
    amountUSD: number;
    price: number;
  } | null> {
    const tokens = await this.getTokenList(address);
    const magicToken = tokens.find(t => 
      t.symbol.toLowerCase() === 'magic' ||
      t.id.toLowerCase().includes('magic')
    );

    if (magicToken) {
      return {
        amount: magicToken.amount,
        amountUSD: magicToken.amountUSD,
        price: magicToken.price,
      };
    }

    return null;
  }

  /**
   * Get protocol positions
   */
  async getProtocolPositions(address?: string): Promise<DeBankProtocol[]> {
    const profile = await this.getProfile(address);
    return profile?.protocolList || [];
  }

  /**
   * Parse tokens from API response
   */
  private parseTokens(data: any[]): DeBankToken[] {
    if (!Array.isArray(data)) return [];
    
    return data.map((token: any) => ({
      id: token.id || token.chain + ':' + token.address,
      chain: token.chain || 'unknown',
      name: token.name || 'Unknown',
      symbol: token.symbol || 'UNKNOWN',
      price: token.price || 0,
      amount: parseFloat(token.amount || '0'),
      amountUSD: parseFloat(token.amount || '0') * (token.price || 0),
      logoUrl: token.logo_url,
    }));
  }

  /**
   * Parse protocols from API response
   */
  private parseProtocols(data: any[]): DeBankProtocol[] {
    if (!Array.isArray(data)) return [];
    
    return data.map((protocol: any) => ({
      id: protocol.id || 'unknown',
      name: protocol.name || 'Unknown Protocol',
      chain: protocol.chain || 'unknown',
      portfolioItemList: protocol.portfolio_item_list || [],
    }));
  }

  /**
   * Get profile URL
   */
  getProfileUrl(address?: string): string {
    const targetAddress = address || this.defaultAddress;
    return `https://debank.com/profile/${targetAddress}`;
  }

  /**
   * Mock profile for development
   */
  private getMockProfile(address: string): DeBankProfile {
    return {
      address,
      totalUsdValue: 0,
      totalDebtValue: 0,
      netWorth: 0,
      tokenList: [
        {
          id: 'arbitrum:0x539bdE0d7Dbd336b79148AA742883198BBF60342',
          chain: 'arbitrum',
          name: 'MAGIC',
          symbol: 'MAGIC',
          price: 0.125,
          amount: 0,
          amountUSD: 0,
        },
      ],
      protocolList: [],
      nftList: [],
    };
  }
}
