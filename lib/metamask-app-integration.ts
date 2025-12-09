/**
 * MetaMask App Integration
 * MetaMask Web App Interface
 * URL: https://app.metamask.io/
 */

export interface MetaMaskAppConfig {
  appUrl?: string;
  deepLink?: boolean;
}

export interface MetaMaskAppFeatures {
  portfolio: boolean;
  swaps: boolean;
  bridge: boolean;
  staking: boolean;
  nft: boolean;
  activity: boolean;
}

export class MetaMaskAppIntegration {
  private appUrl: string;

  constructor(config: MetaMaskAppConfig = {}) {
    this.appUrl = config.appUrl || 'https://app.metamask.io';
  }

  /**
   * Get MetaMask app URL
   */
  getAppUrl(): string {
    return this.appUrl;
  }

  /**
   * Get portfolio URL
   */
  getPortfolioUrl(address?: string): string {
    if (address) {
      return `${this.appUrl}/portfolio?address=${address}`;
    }
    return `${this.appUrl}/portfolio`;
  }

  /**
   * Get swaps URL
   */
  getSwapsUrl(): string {
    return `${this.appUrl}/swaps`;
  }

  /**
   * Get bridge URL
   */
  getBridgeUrl(): string {
    return `${this.appUrl}/bridge`;
  }

  /**
   * Get staking URL
   */
  getStakingUrl(): string {
    return `${this.appUrl}/staking`;
  }

  /**
   * Get NFT URL
   */
  getNftUrl(address?: string): string {
    if (address) {
      return `${this.appUrl}/nfts?address=${address}`;
    }
    return `${this.appUrl}/nfts`;
  }

  /**
   * Get activity URL
   */
  getActivityUrl(address?: string): string {
    if (address) {
      return `${this.appUrl}/activity?address=${address}`;
    }
    return `${this.appUrl}/activity`;
  }

  /**
   * Open MetaMask app in new window
   */
  openApp(feature?: 'portfolio' | 'swaps' | 'bridge' | 'staking' | 'nft' | 'activity', address?: string): void {
    let url = this.appUrl;
    
    switch (feature) {
      case 'portfolio':
        url = this.getPortfolioUrl(address);
        break;
      case 'swaps':
        url = this.getSwapsUrl();
        break;
      case 'bridge':
        url = this.getBridgeUrl();
        break;
      case 'staking':
        url = this.getStakingUrl();
        break;
      case 'nft':
        url = this.getNftUrl(address);
        break;
      case 'activity':
        url = this.getActivityUrl(address);
        break;
    }

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Get available features
   */
  getAvailableFeatures(): MetaMaskAppFeatures {
    return {
      portfolio: true,
      swaps: true,
      bridge: true,
      staking: true,
      nft: true,
      activity: true,
    };
  }

  /**
   * Check if MetaMask extension is installed
   */
  isMetaMaskInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    return typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask;
  }

  /**
   * Get MetaMask download URL
   */
  getDownloadUrl(): string {
    return 'https://metamask.io/download/';
  }
}
