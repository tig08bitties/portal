/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ CODER INTEGRATION FOR THEOS-LIMA ⟐                ║
   ║   Coder CLI • Workspace Management • Autonomous Operations ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class CoderIntegration {
  constructor(opts = {}) {
    this.url = opts.url || process.env.CODER_URL || 'http://127.0.0.1:3000';
    this.configPath = opts.configPath || process.env.CODER_CONFIG_PATH;
    
    // Coder GitHub Repositories
    this.repositories = {
      coder: 'https://github.com/coder/coder',
      ghosttyWeb: 'https://github.com/coder/ghostty-web',
      jetbrainsToolbox: 'https://github.com/coder/coder-jetbrains-toolbox',
      agentapi: 'https://github.com/coder/agentapi',
      aibridge: 'https://github.com/coder/aibridge',
      blink: 'https://github.com/coder/blink',
      commit: 'https://github.com/coder/coder/commit/d81d7eeb308c384a61c0094039c04acf311d4f35'
    };
  }

  // Execute coder command
  async exec(command, opts = {}) {
    try {
      const env = { ...process.env };
      
      // Set Coder URL if configured
      if (this.url) {
        env.CODER_URL = this.url;
      }

      const { stdout, stderr } = await execAsync(`coder ${command}`, {
        env,
        ...opts
      });

      return {
        success: true,
        stdout: stdout.trim(),
        stderr: stderr.trim()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stdout: error.stdout?.trim(),
        stderr: error.stderr?.trim()
      };
    }
  }

  // Check if coder CLI is installed
  async checkInstallation() {
    const result = await this.exec('--version');
    return {
      installed: result.success,
      version: result.success ? result.stdout : null,
      error: result.success ? null : result.error
    };
  }

  // Check authentication status
  async checkAuth() {
    try {
      // Try to get user info or list workspaces to verify auth
      const result = await this.exec('list');
      return {
        authenticated: result.success,
        error: result.success ? null : result.error
      };
    } catch (error) {
      return {
        authenticated: false,
        error: error.message
      };
    }
  }

  // Get current user
  async getUser() {
    // Coder doesn't have a direct "users me" command, so we'll check via workspaces
    const result = await this.exec('list');
    if (result.success) {
      return {
        success: true,
        authenticated: true
      };
    }
    return {
      success: false,
      authenticated: false,
      error: result.error
    };
  }

  // List workspaces
  async listWorkspaces(opts = {}) {
    const result = await this.exec('list');
    if (result.success) {
      // Parse workspace list from stdout
      const lines = result.stdout.split('\n').filter(line => line.trim());
      const workspaces = lines
        .slice(1) // Skip header
        .map(line => {
          const parts = line.trim().split(/\s+/);
          return {
            name: parts[0],
            template: parts[1] || '',
            status: parts[2] || '',
            lastBuilt: parts[3] || ''
          };
        })
        .filter(ws => ws.name); // Filter out empty entries

      return {
        success: true,
        workspaces,
        count: workspaces.length
      };
    }
    return {
      success: false,
      workspaces: [],
      count: 0,
      error: result.error
    };
  }

  // Create a workspace
  async createWorkspace(template, name, opts = {}) {
    const command = `create ${name} --template ${template}${opts.rich ? ' --rich' : ''}`;
    const result = await this.exec(command);
    return {
      success: result.success,
      workspace: result.success ? name : null,
      error: result.success ? null : result.error,
      output: result.stdout
    };
  }

  // Delete a workspace
  async deleteWorkspace(name, opts = {}) {
    const command = `delete ${name}${opts.force ? ' --force' : ''}`;
    const result = await this.exec(command);
    return {
      success: result.success,
      error: result.success ? null : result.error,
      output: result.stdout
    };
  }

  // Open a workspace
  async openWorkspace(name) {
    const result = await this.exec(`open ${name}`);
    return {
      success: result.success,
      error: result.success ? null : result.error,
      output: result.stdout
    };
  }

  // Ping a workspace
  async pingWorkspace(name) {
    const result = await this.exec(`ping ${name}`);
    return {
      success: result.success,
      online: result.success && !result.stdout.includes('offline'),
      error: result.success ? null : result.error,
      output: result.stdout
    };
  }

  // List templates
  async listTemplates() {
    const result = await this.exec('templates list');
    if (result.success) {
      const lines = result.stdout.split('\n').filter(line => line.trim());
      const templates = lines
        .slice(1) // Skip header
        .map(line => {
          const parts = line.trim().split(/\s+/);
          return {
            name: parts[0],
            displayName: parts[1] || '',
            description: parts.slice(2).join(' ') || ''
          };
        })
        .filter(t => t.name); // Filter out empty entries

      return {
        success: true,
        templates,
        count: templates.length
      };
    }
    return {
      success: false,
      templates: [],
      count: 0,
      error: result.error
    };
  }

  // Get workspace status
  async getWorkspaceStatus(name) {
    const result = await this.exec(`list`);
    if (result.success) {
      const lines = result.stdout.split('\n');
      const workspaceLine = lines.find(line => line.includes(name));
      if (workspaceLine) {
        const parts = workspaceLine.trim().split(/\s+/);
        return {
          success: true,
          name: parts[0],
          template: parts[1] || '',
          status: parts[2] || '',
          lastBuilt: parts[3] || ''
        };
      }
    }
    return {
      success: false,
      error: result.error || 'Workspace not found'
    };
  }

  // Test connection to Coder server
  async testConnection() {
    try {
      // Try to ping the server or list workspaces
      const auth = await this.checkAuth();
      if (auth.authenticated) {
        const workspaces = await this.listWorkspaces();
        return {
          success: true,
          authenticated: true,
          server: this.url,
          workspacesCount: workspaces.count
        };
      }
      return {
        success: false,
        authenticated: false,
        error: auth.error || 'Not authenticated'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get Coder repositories information
   */
  getRepositories() {
    return {
      repositories: this.repositories,
      main: this.repositories.coder,
      tools: {
        ghosttyWeb: this.repositories.ghosttyWeb,
        jetbrainsToolbox: this.repositories.jetbrainsToolbox,
        agentapi: this.repositories.agentapi,
        aibridge: this.repositories.aibridge,
        blink: this.repositories.blink
      },
      commit: this.repositories.commit
    };
  }

  /**
   * Get repository information
   */
  async getRepositoryInfo(repoName) {
    const repoMap = {
      'coder': this.repositories.coder,
      'ghostty-web': this.repositories.ghosttyWeb,
      'jetbrains-toolbox': this.repositories.jetbrainsToolbox,
      'agentapi': this.repositories.agentapi,
      'aibridge': this.repositories.aibridge,
      'blink': this.repositories.blink
    };

    const url = repoMap[repoName.toLowerCase()];
    if (!url) {
      return {
        success: false,
        error: `Repository ${repoName} not found`
      };
    }

    return {
      success: true,
      name: repoName,
      url: url,
      github: url
    };
  }
}
