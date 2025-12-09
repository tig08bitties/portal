/**
 * Site Status Check via Brave API
 * Check if bridgeworld.lol is working
 */

import { BraveSearchAPI } from './brave-search';

export interface SiteStatus {
  url: string;
  status: 'online' | 'offline' | 'unknown';
  lastChecked: Date;
  responseTime?: number;
  title?: string;
  description?: string;
}

export class SiteStatusChecker {
  private brave: BraveSearchAPI;

  constructor() {
    this.brave = new BraveSearchAPI();
  }

  /**
   * Check site status via Brave search
   */
  async checkSiteStatus(url: string): Promise<SiteStatus> {
    const startTime = Date.now();
    
    try {
      // Search for the site
      const searchResults = await this.brave.search(`site:${url}`);
      
      // Also try direct fetch
      let directStatus = 'unknown';
      let responseTime: number | undefined;
      
      try {
        const fetchStart = Date.now();
        const response = await fetch(url, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(5000)
        });
        responseTime = Date.now() - fetchStart;
        directStatus = response.ok ? 'online' : 'offline';
      } catch (error) {
        directStatus = 'offline';
      }

      // Find site in search results
      const siteResult = searchResults.find(r => r.url.includes(url.replace('https://', '').replace('http://', '')));
      
      return {
        url,
        status: directStatus === 'online' ? 'online' : (siteResult ? 'online' : 'offline'),
        lastChecked: new Date(),
        responseTime,
        title: siteResult?.title,
        description: siteResult?.description,
      };
    } catch (error) {
      return {
        url,
        status: 'unknown',
        lastChecked: new Date(),
      };
    }
  }

  /**
   * Check multiple sites
   */
  async checkMultipleSites(urls: string[]): Promise<SiteStatus[]> {
    const results: SiteStatus[] = [];
    
    for (const url of urls) {
      const status = await this.checkSiteStatus(url);
      results.push(status);
      // Small delay between checks
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return results;
  }
}
