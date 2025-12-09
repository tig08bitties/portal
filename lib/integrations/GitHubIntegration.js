/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ GITHUB INTEGRATION FOR THEOS-LIMA ⟐              ║
   ║   Autonomous GitHub Operations • Repository Management     ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import axios from 'axios';

export class GitHubIntegration {
  constructor(opts = {}) {
    this.token = opts.token || process.env.GITHUB_TOKEN;
    this.apiVersion = opts.apiVersion || '2022-11-28';
    this.baseURL = 'https://api.github.com';
    
    // Configured repositories
    this.repositories = opts.repositories || [
      { owner: 'tig08bitties', name: 'Treasure DAO' },
      { owner: 'tig08bitties', name: 'bridgeworld.lol' }
    ];
    
    // Create axios instance with default headers
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${this.token}`,
        'X-GitHub-Api-Version': this.apiVersion
      }
    });
  }

  // Test GitHub connection
  async testConnection() {
    try {
      const response = await this.client.get('/user');
      return {
        success: true,
        user: response.data.login,
        name: response.data.name,
        email: response.data.email
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get repository information
  async getRepository(owner, repo) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // List repository issues
  async listIssues(owner, repo, opts = {}) {
    try {
      const params = {
        state: opts.state || 'open',
        per_page: opts.per_page || 30
      };
      const response = await this.client.get(`/repos/${owner}/${repo}/issues`, { params });
      return {
        success: true,
        issues: response.data,
        count: response.data.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create an issue
  async createIssue(owner, repo, title, body, opts = {}) {
    try {
      const data = {
        title,
        body,
        labels: opts.labels || [],
        assignees: opts.assignees || []
      };
      const response = await this.client.post(`/repos/${owner}/${repo}/issues`, data);
      return {
        success: true,
        issue: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get repository contents
  async getContents(owner, repo, path = '') {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/contents/${path}`);
      return {
        success: true,
        contents: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create or update file
  async createOrUpdateFile(owner, repo, path, content, message, opts = {}) {
    try {
      // Get existing file SHA if updating
      let sha = null;
      if (opts.update) {
        try {
          const existing = await this.getContents(owner, repo, path);
          if (existing.success && existing.contents.sha) {
            sha = existing.contents.sha;
          }
        } catch (e) {
          // File doesn't exist, will create new
        }
      }

      const data = {
        message: message || `Update ${path}`,
        content: Buffer.from(content).toString('base64'),
        branch: opts.branch || 'main'
      };
      
      if (sha) {
        data.sha = sha;
      }

      const response = await this.client.put(`/repos/${owner}/${repo}/contents/${path}`, data);
      return {
        success: true,
        file: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // List repository branches
  async listBranches(owner, repo) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/branches`);
      return {
        success: true,
        branches: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create a branch
  async createBranch(owner, repo, branchName, fromBranch = 'main') {
    try {
      // Get SHA of source branch
      const refResponse = await this.client.get(`/repos/${owner}/${repo}/git/ref/heads/${fromBranch}`);
      const sha = refResponse.data.object.sha;

      // Create new branch
      const response = await this.client.post(`/repos/${owner}/${repo}/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha
      });
      
      return {
        success: true,
        branch: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create a pull request
  async createPullRequest(owner, repo, title, body, head, base = 'main') {
    try {
      const response = await this.client.post(`/repos/${owner}/${repo}/pulls`, {
        title,
        body,
        head,
        base
      });
      return {
        success: true,
        pullRequest: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get repository commits
  async getCommits(owner, repo, opts = {}) {
    try {
      const params = {
        per_page: opts.per_page || 30
      };
      if (opts.sha) params.sha = opts.sha;
      if (opts.path) params.path = opts.path;
      
      const response = await this.client.get(`/repos/${owner}/${repo}/commits`, { params });
      return {
        success: true,
        commits: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Autonomous repository monitoring
  async monitorRepositories() {
    const results = [];
    
    for (const repo of this.repositories) {
      try {
        const repoInfo = await this.getRepository(repo.owner, repo.name);
        const issues = await this.listIssues(repo.owner, repo.name);
        const branches = await this.listBranches(repo.owner, repo.name);
        
        results.push({
          repository: `${repo.owner}/${repo.name}`,
          info: repoInfo.success ? repoInfo.data : null,
          issues: issues.success ? {
            open: issues.issues.filter(i => i.state === 'open').length,
            total: issues.count
          } : null,
          branches: branches.success ? branches.branches.length : null
        });
      } catch (error) {
        results.push({
          repository: `${repo.owner}/${repo.name}`,
          error: error.message
        });
      }
    }
    
    return results;
  }

  // Autonomous issue management
  async manageIssues(owner, repo, action = 'monitor') {
    const issues = await this.listIssues(owner, repo);
    
    if (!issues.success) {
      return { success: false, error: issues.error };
    }

    const summary = {
      total: issues.count,
      open: issues.issues.filter(i => i.state === 'open').length,
      closed: issues.issues.filter(i => i.state === 'closed').length,
      issues: issues.issues.map(i => ({
        number: i.number,
        title: i.title,
        state: i.state,
        created_at: i.created_at,
        updated_at: i.updated_at
      }))
    };

    return {
      success: true,
      summary
    };
  }
}
