/**
 * Chainscout Integration
 * Blockscout Chainscout - Multi-chain explorer framework
 * Repository: https://github.com/blockscout/chainscout
 */

export interface ChainscoutConfig {
  apiUrl?: string;
  githubUrl?: string;
}

export interface ChainscoutChain {
  id: string;
  name: string;
  network: string;
  rpcUrl: string;
  explorerUrl: string;
}

export class ChainscoutIntegration {
  private apiUrl: string;
  private githubUrl: string;
  private repoUrl = 'https://github.com/blockscout/chainscout';
  private contributingUrl = 'https://github.com/blockscout/chainscout?tab=readme-ov-file#contributing';

  constructor(config: ChainscoutConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://api.github.com/repos/blockscout/chainscout';
    this.githubUrl = config.githubUrl || 'https://github.com/blockscout/chainscout';
  }

  /**
   * Get Chainscout repository information
   */
  async getRepositoryInfo(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error('Failed to fetch Chainscout repo info:', error);
      return {
        name: 'chainscout',
        full_name: 'blockscout/chainscout',
        description: 'Multi-chain explorer framework',
        html_url: this.repoUrl,
        stargazers_count: 0,
        forks_count: 0,
      };
    }
  }

  /**
   * Get Chainscout GitHub URL
   */
  getGitHubUrl(): string {
    return this.githubUrl;
  }

  /**
   * Get contributing guide URL
   */
  getContributingUrl(): string {
    return this.contributingUrl;
  }

  /**
   * Get repository README URL
   */
  getReadmeUrl(): string {
    return `${this.githubUrl}#readme`;
  }

  /**
   * Get repository releases URL
   */
  getReleasesUrl(): string {
    return `${this.githubUrl}/releases`;
  }

  /**
   * Get repository issues URL
   */
  getIssuesUrl(): string {
    return `${this.githubUrl}/issues`;
  }

  /**
   * Get repository documentation URL
   */
  getDocumentationUrl(): string {
    return 'https://docs.blockscout.com';
  }
}
