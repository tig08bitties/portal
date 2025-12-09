/**
 * Chainlink Integration
 * Chainlink - Decentralized Oracle Network
 * Repository: https://github.com/smartcontractkit/chainlink
 */

export interface ChainlinkConfig {
  apiUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
}

export interface ChainlinkOracle {
  address: string;
  network: string;
  name: string;
  description: string;
}

export interface ChainlinkPriceFeed {
  pair: string;
  address: string;
  network: string;
  decimals: number;
}

export class ChainlinkIntegration {
  private apiUrl: string;
  private githubUrl: string;
  private docsUrl: string;
  private repoUrl = 'https://github.com/smartcontractkit/chainlink';
  private docsBaseUrl = 'https://docs.chain.link';

  constructor(config: ChainlinkConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://api.github.com/repos/smartcontractkit/chainlink';
    this.githubUrl = config.githubUrl || 'https://github.com/smartcontractkit/chainlink';
    this.docsUrl = config.docsUrl || this.docsBaseUrl;
  }

  /**
   * Get Chainlink repository information
   */
  async getRepositoryInfo(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error('Failed to fetch Chainlink repo info:', error);
      return {
        name: 'chainlink',
        full_name: 'smartcontractkit/chainlink',
        description: 'Chainlink is a blockchain abstraction layer that enables universally connected smart contracts',
        html_url: this.repoUrl,
        stargazers_count: 0,
        forks_count: 0,
      };
    }
  }

  /**
   * Get Chainlink GitHub URL
   */
  getGitHubUrl(): string {
    return this.githubUrl;
  }

  /**
   * Get Chainlink documentation URL
   */
  getDocumentationUrl(): string {
    return this.docsUrl;
  }

  /**
   * Get Chainlink price feeds documentation
   */
  getPriceFeedsUrl(): string {
    return `${this.docsUrl}/data-feeds`;
  }

  /**
   * Get Chainlink VRF documentation
   */
  getVRFUrl(): string {
    return `${this.docsUrl}/vrf`;
  }

  /**
   * Get Chainlink Automation documentation
   */
  getAutomationUrl(): string {
    return `${this.docsUrl}/chainlink-automation`;
  }

  /**
   * Get Chainlink Functions documentation
   */
  getFunctionsUrl(): string {
    return `${this.docsUrl}/chainlink-functions`;
  }

  /**
   * Get Chainlink CCIP documentation
   */
  getCCIPUrl(): string {
    return `${this.docsUrl}/ccip`;
  }

  /**
   * Get Chainlink repository releases URL
   */
  getReleasesUrl(): string {
    return `${this.githubUrl}/releases`;
  }

  /**
   * Get Chainlink repository issues URL
   */
  getIssuesUrl(): string {
    return `${this.githubUrl}/issues`;
  }

  /**
   * Get Chainlink mainnet price feeds
   */
  getMainnetPriceFeeds(): ChainlinkPriceFeed[] {
    return [
      {
        pair: 'ETH/USD',
        address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        network: 'ethereum',
        decimals: 8,
      },
      {
        pair: 'BTC/USD',
        address: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
        network: 'ethereum',
        decimals: 8,
      },
      {
        pair: 'LINK/USD',
        address: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
        network: 'ethereum',
        decimals: 8,
      },
    ];
  }

  /**
   * Get Chainlink Arbitrum price feeds
   */
  getArbitrumPriceFeeds(): ChainlinkPriceFeed[] {
    return [
      {
        pair: 'ETH/USD',
        address: '0x639Fe6Ab55C921f74e7fac1ee960C0B6293ba612',
        network: 'arbitrum',
        decimals: 8,
      },
      {
        pair: 'BTC/USD',
        address: '0x6ce185860a496310F6C54D1aF1552cD38E4C4dFb',
        network: 'arbitrum',
        decimals: 8,
      },
      {
        pair: 'LINK/USD',
        address: '0x86E53CF1B870786351Da77A57575e79CB55812CB',
        network: 'arbitrum',
        decimals: 8,
      },
    ];
  }

  /**
   * Get Chainlink LINK token address
   */
  getLinkTokenAddress(network: string = 'ethereum'): string {
    const addresses: Record<string, string> = {
      ethereum: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      arbitrum: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
      polygon: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    };
    return addresses[network] || addresses.ethereum;
  }
}
