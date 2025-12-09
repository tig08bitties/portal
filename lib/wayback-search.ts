/**
 * Wayback Machine Search for Magic/D&D Game Code
 * Finding classic game code to build Diablo 2 LOD-style Bridgeworld game
 */

export interface WaybackSearchResult {
  url: string;
  timestamp: string;
  title: string;
  description: string;
}

export class WaybackSearch {
  private baseUrl = 'https://web.archive.org';

  /**
   * Search Wayback Machine for Magic: The Gathering game code
   */
  async searchMagicGameCode(): Promise<WaybackSearchResult[]> {
    const searches = [
      'magic.wizards.com/gameinfo',
      'magic.wizards.com/en/articles/archive',
      'magic.wizards.com/en/content/gameplay',
      'magic.wizards.com/en/game-info',
    ];

    const results: WaybackSearchResult[] = [];

    for (const search of searches) {
      try {
        // Wayback Machine CDX API
        const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${search}&output=json&limit=10`;
        const response = await fetch(cdxUrl);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 1) {
          // Skip header row
          for (let i = 1; i < data.length; i++) {
            const entry = data[i];
            if (entry && entry.length >= 3) {
              results.push({
                url: entry[2] || search,
                timestamp: entry[1] || '',
                title: `Magic: The Gathering - ${search}`,
                description: `Archived game code from ${entry[1] || 'unknown date'}`,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error searching ${search}:`, error);
      }
    }

    return results;
  }

  /**
   * Search for D&D game code
   */
  async searchDnDGameCode(): Promise<WaybackSearchResult[]> {
    const searches = [
      'dnd.wizards.com/gameplay',
      'dnd.wizards.com/articles/archive',
      'dnd.wizards.com/en/gameplay',
    ];

    const results: WaybackSearchResult[] = [];

    for (const search of searches) {
      try {
        const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${search}&output=json&limit=10`;
        const response = await fetch(cdxUrl);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            const entry = data[i];
            if (entry && entry.length >= 3) {
              results.push({
                url: entry[2] || search,
                timestamp: entry[1] || '',
                title: `D&D Game Code - ${search}`,
                description: `Archived D&D gameplay code from ${entry[1] || 'unknown date'}`,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error searching ${search}:`, error);
      }
    }

    return results;
  }

  /**
   * Get archived content from Wayback Machine
   */
  getArchivedUrl(originalUrl: string, timestamp: string): string {
    return `${this.baseUrl}/web/${timestamp}/${originalUrl}`;
  }

  /**
   * Search for Diablo 2 LOD style game mechanics
   */
  async searchDiablo2Mechanics(): Promise<WaybackSearchResult[]> {
    const searches = [
      'diablo2.com/gameplay',
      'battle.net/diablo2',
      'classic.battle.net/diablo2',
    ];

    const results: WaybackSearchResult[] = [];

    for (const search of searches) {
      try {
        const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${search}&output=json&limit=5`;
        const response = await fetch(cdxUrl);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 1) {
          for (let i = 1; i < data.length; i++) {
            const entry = data[i];
            if (entry && entry.length >= 3) {
              results.push({
                url: entry[2] || search,
                timestamp: entry[1] || '',
                title: `Diablo 2 LOD Mechanics - ${search}`,
                description: `Classic Diablo 2 gameplay mechanics from ${entry[1] || 'unknown date'}`,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error searching ${search}:`, error);
      }
    }

    return results;
  }
}
