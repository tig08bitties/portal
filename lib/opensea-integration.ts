/**
 * OpenSea Integration
 * NFT Marketplace API
 * URL: https://opensea.io/
 * API: https://docs.opensea.io/
 */

export interface OpenSeaConfig {
  apiKey?: string;
  mcpToken?: string;
  apiUrl?: string;
}

export interface OpenSeaCollection {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  large_image_url?: string;
  featured_image_url?: string;
  external_url?: string;
  banner_image_url?: string;
  safelist_request_status: string;
  is_nsfw: boolean;
  twitter_username?: string;
  instagram_username?: string;
  wiki_url?: string;
  discord_url?: string;
  telegram_url?: string;
  contract_address: string;
  chain: string;
  stats?: {
    floor_price?: number;
    total_volume?: number;
    total_sales?: number;
    num_owners?: number;
    total_supply?: number;
    average_price?: number;
  };
}

export interface OpenSeaAsset {
  token_id: string;
  name: string;
  description?: string;
  image_url?: string;
  image_preview_url?: string;
  image_thumbnail_url?: string;
  animation_url?: string;
  external_link?: string;
  permalink: string;
  collection: {
    name: string;
    slug: string;
  };
  owner: {
    address: string;
  };
  last_sale?: {
    total_price: string;
    payment_token: {
      symbol: string;
      decimals: number;
    };
  };
  traits?: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface OpenSeaListing {
  order_hash: string;
  protocol_address: string;
  maker: {
    address: string;
  };
  taker: {
    address: string;
  };
  current_price: string;
  payment_token: {
    symbol: string;
    decimals: number;
  };
  asset: OpenSeaAsset;
}

export class OpenSeaIntegration {
  private apiKey: string;
  private mcpToken: string;
  private apiUrl: string;
  private baseUrl = 'https://opensea.io';

  constructor(config: OpenSeaConfig = {}) {
    this.apiKey = config.apiKey || process.env.OPENSEA_API_KEY || '62d4d2a83967477ea11810d0e9d86d5e';
    this.mcpToken = config.mcpToken || process.env.OPENSEA_MCP_TOKEN || '042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW';
    this.apiUrl = config.apiUrl || 'https://api.opensea.io/api/v2';
  }

  /**
   * Get OpenSea base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get collection URL
   */
  getCollectionUrl(slug: string): string {
    return `${this.baseUrl}/collection/${slug}`;
  }

  /**
   * Get asset URL
   */
  getAssetUrl(contractAddress: string, tokenId: string): string {
    return `${this.baseUrl}/assets/ethereum/${contractAddress}/${tokenId}`;
  }

  /**
   * Get account URL
   */
  getAccountUrl(address: string): string {
    return `${this.baseUrl}/account/${address}`;
  }

  /**
   * Get collection by slug
   */
  async getCollection(slug: string): Promise<OpenSeaCollection | null> {
    try {
      const response = await fetch(`${this.apiUrl}/collection/${slug}`, {
        headers: {
          'X-API-KEY': this.apiKey,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`OpenSea API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseCollection(data);
    } catch (error: any) {
      console.error('Failed to fetch OpenSea collection:', error);
      return null;
    }
  }

  /**
   * Get assets from collection
   */
  async getCollectionAssets(
    collectionSlug: string,
    limit: number = 20
  ): Promise<OpenSeaAsset[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/collection/${collectionSlug}/nfts?limit=${limit}`,
        {
          headers: {
            'X-API-KEY': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`OpenSea API error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data.nfts) ? data.nfts.map((nft: any) => this.parseAsset(nft)) : [];
    } catch (error: any) {
      console.error('Failed to fetch collection assets:', error);
      return [];
    }
  }

  /**
   * Get asset by contract and token ID
   */
  async getAsset(contractAddress: string, tokenId: string, chain: string = 'ethereum'): Promise<OpenSeaAsset | null> {
    try {
      const response = await fetch(
        `${this.apiUrl}/chain/${chain}/contract/${contractAddress}/nfts/${tokenId}`,
        {
          headers: {
            'X-API-KEY': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`OpenSea API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseAsset(data.nft);
    } catch (error: any) {
      console.error('Failed to fetch asset:', error);
      return null;
    }
  }

  /**
   * Get account assets
   */
  async getAccountAssets(address: string, limit: number = 20): Promise<OpenSeaAsset[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/chain/ethereum/account/${address}/nfts?limit=${limit}`,
        {
          headers: {
            'X-API-KEY': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`OpenSea API error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data.nfts) ? data.nfts.map((nft: any) => this.parseAsset(nft)) : [];
    } catch (error: any) {
      console.error('Failed to fetch account assets:', error);
      return [];
    }
  }

  /**
   * Parse collection data
   */
  private parseCollection(data: any): OpenSeaCollection {
    return {
      name: data.name || data.collection?.name || '',
      slug: data.slug || data.collection?.slug || '',
      description: data.description || data.collection?.description || '',
      image_url: data.image_url || data.collection?.image_url || '',
      large_image_url: data.large_image_url || data.collection?.large_image_url,
      featured_image_url: data.featured_image_url || data.collection?.featured_image_url,
      external_url: data.external_url || data.collection?.external_url,
      banner_image_url: data.banner_image_url || data.collection?.banner_image_url,
      safelist_request_status: data.safelist_request_status || data.collection?.safelist_request_status || '',
      is_nsfw: data.is_nsfw ?? data.collection?.is_nsfw ?? false,
      twitter_username: data.twitter_username || data.collection?.twitter_username,
      instagram_username: data.instagram_username || data.collection?.instagram_username,
      wiki_url: data.wiki_url || data.collection?.wiki_url,
      discord_url: data.discord_url || data.collection?.discord_url,
      telegram_url: data.telegram_url || data.collection?.telegram_url,
      contract_address: data.primary_asset_contracts?.[0]?.address || data.collection?.primary_asset_contracts?.[0]?.address || '',
      chain: data.chain || 'ethereum',
      stats: data.stats || data.collection?.stats,
    };
  }

  /**
   * Parse asset data
   */
  private parseAsset(data: any): OpenSeaAsset {
    return {
      token_id: data.identifier || data.token_id || '',
      name: data.name || `#${data.identifier || data.token_id}`,
      description: data.description,
      image_url: data.image_url,
      image_preview_url: data.image_preview_url,
      image_thumbnail_url: data.image_thumbnail_url,
      animation_url: data.animation_url,
      external_link: data.external_link,
      permalink: data.permalink || this.getAssetUrl(data.contract || '', data.identifier || data.token_id || ''),
      collection: {
        name: data.collection || data.contract?.name || '',
        slug: data.collection_slug || '',
      },
      owner: {
        address: data.owner || data.owners?.[0] || '',
      },
      last_sale: data.last_sale,
      traits: data.traits || data.attributes,
    };
  }

  /**
   * Get Smol Brains collection
   */
  async getSmolBrainsCollection(): Promise<OpenSeaCollection | null> {
    return await this.getCollection('smol-brains');
  }

  /**
   * Get Smol Brains assets
   */
  async getSmolBrainsAssets(limit: number = 20): Promise<OpenSeaAsset[]> {
    return await this.getCollectionAssets('smol-brains', limit);
  }
}
