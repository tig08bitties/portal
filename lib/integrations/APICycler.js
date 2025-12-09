/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ API CYCLER FOR THEOS-LIMA ⟐                      ║
   ║   Ngrok Integration • API Rotation • Bridgeworld.lol       ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GitHubCLI } from './GitHubCLI.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class APICycler {
  constructor(opts = {}) {
    this.githubCLI = opts.githubCLI || null;
    this.ngrokPath = opts.ngrokPath || join(__dirname, '..', 'ngrok');
    this.bridgeworldRepo = {
      owner: 'tig08bitties',
      name: 'bridgeworld.lol'
    };
    
    // API endpoints to cycle through
    this.apiEndpoints = [];
    this.currentIndex = 0;
    this.cycleInterval = opts.cycleInterval || 300000; // 5 minutes
    this.cycleTimer = null;
    
    // Ngrok tunnels
    this.ngrokTunnels = [];
    this.ngrokConfig = null;
  }

  // Initialize API cycler
  async initialize() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ INITIALIZING API CYCLER ⟐                       ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    // Load ngrok configuration
    await this.loadNgrokConfig();
    
    // Load API endpoints from bridgeworld.lol repository (LIVE)
    await this.loadEndpointsFromRepo();
    
    // Connect ngrok API cycler
    await this.connectNgrokAPI();
    
    // Start cycling
    this.startCycling();
    
    console.log('   ✓ API Cycler initialized');
    console.log(`   ✓ Endpoints loaded: ${this.apiEndpoints.length}`);
    console.log(`   ✓ Ngrok tunnels: ${this.ngrokTunnels.length}`);
    console.log(`   ✓ Cycle interval: ${this.cycleInterval / 1000}s\n`);
  }

  // Load ngrok configuration
  async loadNgrokConfig() {
    try {
      // Check for ngrok config file
      const configPath = join(this.ngrokPath, 'ngrok.yml');
      if (existsSync(configPath)) {
        this.ngrokConfig = readFileSync(configPath, 'utf8');
        console.log('   ✓ Ngrok config loaded');
      } else {
        console.log('   ⚠ Ngrok config not found, using defaults');
      }
    } catch (error) {
      console.log('   ⚠ Could not load ngrok config:', error.message);
    }
  }

  // Load API endpoints from bridgeworld.lol repository
  async loadEndpointsFromRepo() {
    if (!this.githubCLI) {
      console.log('   ⚠ GitHub CLI not available, using default endpoints');
      this.apiEndpoints = this.getDefaultEndpoints();
      return;
    }

    try {
      // Try to get API configuration from repository
      // First check local file, then try repository
      const localConfigPath = join(__dirname, 'api-config.json');
      if (existsSync(localConfigPath)) {
        try {
          const localConfig = JSON.parse(readFileSync(localConfigPath, 'utf8'));
          if (localConfig.endpoints && Array.isArray(localConfig.endpoints)) {
            this.apiEndpoints = localConfig.endpoints;
            console.log(`   ✓ Loaded ${this.apiEndpoints.length} endpoints from local config`);
            return;
          }
        } catch (e) {
          console.log('   ⚠ Failed to parse local config, trying repository');
        }
      }

      const apiConfig = await this.githubCLI.readFile(
        this.bridgeworldRepo.owner,
        this.bridgeworldRepo.name,
        'api-config.json'
      );

      if (apiConfig.success) {
        try {
          const config = JSON.parse(apiConfig.content);
          if (config.endpoints && Array.isArray(config.endpoints)) {
            this.apiEndpoints = config.endpoints;
            console.log(`   ✓ Loaded ${this.apiEndpoints.length} endpoints from bridgeworld.lol`);
            return;
          }
        } catch (e) {
          console.log('   ⚠ Failed to parse API config, using defaults');
        }
      }

      // Try alternative locations
      const altPaths = [
        'config/api-endpoints.json',
        'src/config/endpoints.json',
        'api/endpoints.json',
        '.theos/api-endpoints.json'
      ];

      for (const path of altPaths) {
        const result = await this.githubCLI.readFile(
          this.bridgeworldRepo.owner,
          this.bridgeworldRepo.name,
          path
        );
        
        if (result.success) {
          try {
            const config = JSON.parse(result.content);
            if (config.endpoints && Array.isArray(config.endpoints)) {
              this.apiEndpoints = config.endpoints;
              console.log(`   ✓ Loaded endpoints from ${path}`);
              return;
            }
          } catch (e) {
            continue;
          }
        }
      }

      // Fallback to default endpoints
      console.log('   ⚠ API config not found in repo, using defaults');
      this.apiEndpoints = this.getDefaultEndpoints();
    } catch (error) {
      console.log('   ⚠ Error loading endpoints from repo:', error.message);
      this.apiEndpoints = this.getDefaultEndpoints();
    }
  }

  // Get default API endpoints
  getDefaultEndpoints() {
    return [
      {
        name: 'Brave LLM Core',
        url: 'https://api.brave.com/v1/chat/completions',
        type: 'llm',
        priority: 1
      },
      {
        name: 'OpenAI API',
        url: 'https://api.openai.com/v1/chat/completions',
        type: 'llm',
        priority: 2
      },
      {
        name: 'Ngrok Tunnel 1',
        url: 'http://localhost:4040',
        type: 'tunnel',
        priority: 3
      },
      {
        name: 'Ngrok Tunnel 2',
        url: 'http://localhost:4041',
        type: 'tunnel',
        priority: 4
      }
    ];
  }

  // Get current API endpoint
  getCurrentEndpoint() {
    if (this.apiEndpoints.length === 0) {
      return null;
    }
    return this.apiEndpoints[this.currentIndex];
  }

  // Cycle to next endpoint
  cycleNext() {
    if (this.apiEndpoints.length === 0) {
      return null;
    }
    
    this.currentIndex = (this.currentIndex + 1) % this.apiEndpoints.length;
    const endpoint = this.getCurrentEndpoint();
    
    console.log(`[API CYCLER] Switched to: ${endpoint.name} (${endpoint.url})`);
    return endpoint;
  }

  // Start automatic cycling
  startCycling() {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
    }
    
    this.cycleTimer = setInterval(() => {
      this.cycleNext();
    }, this.cycleInterval);
  }

  // Stop cycling
  stopCycling() {
    if (this.cycleTimer) {
      clearInterval(this.cycleTimer);
      this.cycleTimer = null;
    }
  }

  // Get all endpoints
  getAllEndpoints() {
    return this.apiEndpoints;
  }

  // Add endpoint
  addEndpoint(endpoint) {
    this.apiEndpoints.push(endpoint);
  }

  // Remove endpoint
  removeEndpoint(index) {
    if (index >= 0 && index < this.apiEndpoints.length) {
      this.apiEndpoints.splice(index, 1);
      if (this.currentIndex >= this.apiEndpoints.length) {
        this.currentIndex = 0;
      }
    }
  }

  // Connect to ngrok API
  async connectNgrokAPI() {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      const axios = (await import('axios')).default;

      // Check if ngrok is running
      const ngrokApiUrl = 'http://127.0.0.1:4040/api';
      
      try {
        const tunnelsResponse = await axios.get(`${ngrokApiUrl}/tunnels`, { timeout: 2000 });
        
        if (tunnelsResponse.data && tunnelsResponse.data.tunnels) {
          const activeTunnels = tunnelsResponse.data.tunnels.map(tunnel => ({
            name: tunnel.name || tunnel.public_url,
            url: tunnel.public_url,
            localUrl: tunnel.config?.addr,
            protocol: tunnel.proto,
            active: true
          }));
          
          // Add active tunnels to endpoints
          activeTunnels.forEach(tunnel => {
            const endpoint = {
              name: `Ngrok: ${tunnel.name}`,
              url: tunnel.url,
              localUrl: tunnel.localUrl,
              type: 'tunnel',
              protocol: tunnel.protocol,
              priority: 5 + this.ngrokTunnels.length,
              enabled: true
            };
            
            this.ngrokTunnels.push(endpoint);
            this.addEndpoint(endpoint);
          });
          
          console.log(`   ✓ Connected to ngrok API: ${activeTunnels.length} active tunnels`);
        }
      } catch (apiError) {
        // Ngrok API not available
        console.log('   ⚠ Ngrok API not accessible (ngrok may not be running)');
      }
    } catch (error) {
      console.error('   ⚠ Error connecting to ngrok API:', error.message);
    }
  }

  // Get ngrok tunnels
  async getNgrokTunnels() {
    return this.ngrokTunnels;
  }

  // Create ngrok tunnel endpoint
  async createNgrokEndpoint(port, subdomain = null) {
    const endpoint = {
      name: `Ngrok Tunnel (${port})`,
      url: `http://localhost:${port}`,
      type: 'tunnel',
      port,
      subdomain,
      priority: 5 + this.ngrokTunnels.length
    };
    
    this.ngrokTunnels.push(endpoint);
    this.addEndpoint(endpoint);
    
    return endpoint;
  }

  // Get status
  getStatus() {
    return {
      currentIndex: this.currentIndex,
      currentEndpoint: this.getCurrentEndpoint(),
      totalEndpoints: this.apiEndpoints.length,
      cycling: !!this.cycleTimer,
      cycleInterval: this.cycleInterval,
      ngrokTunnels: this.ngrokTunnels.length
    };
  }
}
