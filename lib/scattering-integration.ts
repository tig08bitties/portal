/**
 * Scattering.io Integration
 * Integration with Scattering.io platform
 */

export interface ScatteringConfig {
  apiKey?: string;
  apiUrl?: string;
}

export interface ScatteringProject {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface ScatteringAsset {
  id: string;
  name: string;
  type: string;
  url: string;
  metadata?: Record<string, any>;
}

export class ScatteringIntegration {
  private apiUrl: string;
  private apiKey?: string;

  constructor(config: ScatteringConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://scattering.io';
    this.apiKey = config.apiKey;
  }

  /**
   * Get Scattering.io projects
   */
  async getProjects(): Promise<ScatteringProject[]> {
    try {
      const response = await fetch(`${this.apiUrl}/api/projects`, {
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });

      if (!response.ok) {
        throw new Error(`Scattering API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error('Scattering projects error:', error);
      return this.getMockProjects();
    }
  }

  /**
   * Get assets from Scattering
   */
  async getAssets(projectId?: string): Promise<ScatteringAsset[]> {
    try {
      const url = projectId 
        ? `${this.apiUrl}/api/projects/${projectId}/assets`
        : `${this.apiUrl}/api/assets`;
      
      const response = await fetch(url, {
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });

      if (!response.ok) {
        throw new Error(`Scattering API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.assets || [];
    } catch (error) {
      console.error('Scattering assets error:', error);
      return this.getMockAssets();
    }
  }

  /**
   * Upload asset to Scattering
   */
  async uploadAsset(file: File, projectId?: string): Promise<ScatteringAsset> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (projectId) {
        formData.append('projectId', projectId);
      }

      const response = await fetch(`${this.apiUrl}/api/assets/upload`, {
        method: 'POST',
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.asset;
    } catch (error) {
      console.error('Scattering upload error:', error);
      throw error;
    }
  }

  /**
   * Get Bridgeworld-specific integration
   */
  async getBridgeworldIntegration(): Promise<{
    projects: ScatteringProject[];
    assets: ScatteringAsset[];
  }> {
    const projects = await this.getProjects();
    const assets = await this.getAssets();
    
    return {
      projects: projects.filter(p => 
        p.name.toLowerCase().includes('bridgeworld') ||
        p.name.toLowerCase().includes('treasure') ||
        p.name.toLowerCase().includes('magic')
      ),
      assets: assets.filter(a =>
        a.name.toLowerCase().includes('portal') ||
        a.name.toLowerCase().includes('key') ||
        a.name.toLowerCase().includes('map')
      ),
    };
  }

  /**
   * Mock projects for development
   */
  private getMockProjects(): ScatteringProject[] {
    return [
      {
        id: 'bridgeworld-portal',
        name: 'Bridgeworld Portal',
        description: 'Interactive portal for Bridgeworld',
        url: 'https://scattering.io/projects/bridgeworld-portal',
      },
      {
        id: 'treasure-dao',
        name: 'TreasureDAO Integration',
        description: 'TreasureDAO ecosystem assets',
        url: 'https://scattering.io/projects/treasure-dao',
      },
    ];
  }

  /**
   * Mock assets for development
   */
  private getMockAssets(): ScatteringAsset[] {
    return [
      {
        id: 'portal-key',
        name: 'Portal Key',
        type: 'image',
        url: 'https://scattering.io/assets/portal-key',
        metadata: { type: 'key', rarity: 'legendary' },
      },
      {
        id: 'portal-map',
        name: 'Portal Map',
        type: 'image',
        url: 'https://scattering.io/assets/portal-map',
        metadata: { type: 'map', coordinates: true },
      },
    ];
  }
}
