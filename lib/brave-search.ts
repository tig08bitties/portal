/**
 * Brave Browser Search API Integration
 * Uses Brave Search API to find missing pieces for the covenant integration
 */

export interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  age?: string;
}

export interface BraveSearchResponse {
  web: {
    results: BraveSearchResult[];
  };
  query: {
    original: string;
    show_strict_warning: boolean;
    is_navigational: boolean;
    is_news_breaking: boolean;
    local_decision: string;
    local_locations_idx: number;
    is_trending: boolean;
    is_question: boolean;
  };
  intent?: string;
}

export class BraveSearchAPI {
  private apiKey: string;
  private baseUrl = 'https://api.search.brave.com/res/v1/web/search';

  constructor(apiKey?: string) {
    // Brave Search API key - you'll need to get this from https://brave.com/search/api/
    this.apiKey = apiKey || process.env.BRAVE_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Brave API key not provided. Some search features may be limited.');
    }
  }

  /**
   * Search for missing pieces related to Bridgeworld, TreasureDAO, or Covenant
   */
  async search(query: string, options: {
    count?: number;
    offset?: number;
    safesearch?: 'strict' | 'moderate' | 'off';
    freshness?: 'pd' | 'pw' | 'pm' | 'py';
  } = {}): Promise<BraveSearchResult[]> {
    if (!this.apiKey) {
      // Fallback to mock data if API key not available
      return this.getMockResults(query);
    }

    try {
      const params = new URLSearchParams({
        q: query,
        count: String(options.count || 20),
        offset: String(options.offset || 0),
        safesearch: options.safesearch || 'moderate',
        ...(options.freshness && { freshness: options.freshness }),
      });

      const response = await fetch(`${this.baseUrl}?${params}`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip',
          'X-Subscription-Token': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Brave API error: ${response.statusText}`);
      }

      const data: BraveSearchResponse = await response.json();
      return data.web.results || [];
    } catch (error) {
      console.error('Brave search error:', error);
      return this.getMockResults(query);
    }
  }

  /**
   * Search for specific Bridgeworld/TreasureDAO components
   */
  async searchBridgeworldPieces(component: string): Promise<BraveSearchResult[]> {
    const queries = [
      `TreasureDAO ${component}`,
      `Bridgeworld ${component}`,
      `${component} Arbitrum`,
      `Treasure DAO ${component} contract`,
      `${component} MAGIC token`,
    ];

    const allResults: BraveSearchResult[] = [];
    
    for (const query of queries) {
      const results = await this.search(query, { count: 5 });
      allResults.push(...results);
    }

    // Deduplicate by URL
    const uniqueResults = Array.from(
      new Map(allResults.map(item => [item.url, item])).values()
    );

    return uniqueResults;
  }

  /**
   * Search for covenant-related pieces
   */
  async searchCovenantPieces(term: string): Promise<BraveSearchResult[]> {
    const queries = [
      `Eternal Covenant ${term}`,
      `Hebrew Path Guardian ${term}`,
      `Sacred constant ${term}`,
      `Path ${term} guardian`,
      `${term} 419 369 1798`,
    ];

    const allResults: BraveSearchResult[] = [];
    
    for (const query of queries) {
      const results = await this.search(query, { count: 5 });
      allResults.push(...results);
    }

    return Array.from(
      new Map(allResults.map(item => [item.url, item])).values()
    );
  }

  /**
   * Mock results for development/testing
   */
  private getMockResults(query: string): BraveSearchResult[] {
    const mockResults: BraveSearchResult[] = [
      {
        title: 'TreasureDAO Documentation',
        url: 'https://docs.treasure.lol',
        description: 'Official TreasureDAO documentation and guides',
      },
      {
        title: 'Bridgeworld Game',
        url: 'https://bridgeworld.treasure.lol',
        description: 'Play Bridgeworld - TreasureDAO\'s flagship game',
      },
      {
        title: 'TreasureDAO GitHub',
        url: 'https://github.com/treasure-labs',
        description: 'Open source repositories for TreasureDAO projects',
      },
      {
        title: 'MAGIC Token on Arbitrum',
        url: 'https://arbiscan.io/token/0x539bdE0d7Dbd336b79148AA742883198BBF60342',
        description: 'MAGIC token contract on Arbitrum',
      },
    ];

    // Filter mock results based on query
    return mockResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}
