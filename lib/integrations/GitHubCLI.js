/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ GITHUB CLI INTEGRATION FOR THEOS-LIMA ⟐         ║
   ║   GitHub CLI (gh) • Autonomous Operations                 ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GitHubCLI {
  constructor(opts = {}) {
    this.token = opts.token || process.env.GITHUB_TOKEN;
    this.repositories = opts.repositories || [
      { owner: 'tig08bitties', name: 'Treasure DAO' },
      { owner: 'tig08bitties', name: 'bridgeworld.lol' }
    ];
  }

  // Execute gh command
  async exec(command, opts = {}) {
    try {
      // Set GITHUB_TOKEN if provided
      const env = { ...process.env };
      if (this.token) {
        env.GITHUB_TOKEN = this.token;
      }

      const { stdout, stderr } = await execAsync(`gh ${command}`, {
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

  // Check if gh is installed and authenticated
  async checkAuth() {
    const result = await this.exec('auth status');
    return {
      authenticated: result.success,
      output: result.stdout || result.error
    };
  }

  // Get authenticated user
  async getUser() {
    const result = await this.exec('api user');
    if (result.success) {
      try {
        return {
          success: true,
          user: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse user data'
        };
      }
    }
    return result;
  }

  // Get repository info
  async getRepo(owner, repo) {
    // URL encode repository name (handles spaces)
    const encodedRepo = encodeURIComponent(repo);
    const result = await this.exec(`api repos/${owner}/${encodedRepo}`);
    if (result.success) {
      try {
        return {
          success: true,
          repo: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse repo data'
        };
      }
    }
    return result;
  }

  // List repository issues
  async listIssues(owner, repo, opts = {}) {
    const state = opts.state || 'open';
    const limit = opts.limit || 30;
    const encodedRepo = encodeURIComponent(repo);
    const command = `api repos/${owner}/${encodedRepo}/issues?state=${state}&per_page=${limit}`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        const issues = JSON.parse(result.stdout);
        return {
          success: true,
          issues: Array.isArray(issues) ? issues : []
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse issues data'
        };
      }
    }
    return result;
  }

  // Create an issue
  async createIssue(owner, repo, title, body, opts = {}) {
    const labels = opts.labels ? `--label "${opts.labels.join('","')}"` : '';
    const encodedRepo = encodeURIComponent(repo);
    const command = `issue create --repo ${owner}/${encodedRepo} --title "${title}" --body "${body}" ${labels}`;
    const result = await this.exec(command);
    return result;
  }

  // View repository
  async viewRepo(owner, repo) {
    const result = await this.exec(`repo view ${owner}/${repo}`);
    return result;
  }

  // Clone repository
  async cloneRepo(owner, repo, path) {
    const result = await this.exec(`repo clone ${owner}/${repo} ${path || ''}`);
    return result;
  }

  // List branches
  async listBranches(owner, repo) {
    const encodedRepo = encodeURIComponent(repo);
    const result = await this.exec(`api repos/${owner}/${encodedRepo}/branches`);
    if (result.success) {
      try {
        const branches = JSON.parse(result.stdout);
        return {
          success: true,
          branches: Array.isArray(branches) ? branches : []
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse branches data'
        };
      }
    }
    return result;
  }

  // Create a branch
  async createBranch(owner, repo, branchName, fromBranch = 'main') {
    // First get SHA of source branch
    const shaResult = await this.exec(`api repos/${owner}/${repo}/git/ref/heads/${fromBranch}`);
    if (!shaResult.success) {
      return shaResult;
    }

    try {
      const refData = JSON.parse(shaResult.stdout);
      const sha = refData.object.sha;

      // Create new branch
      const createResult = await this.exec(`api repos/${owner}/${repo}/git/refs`, {
        input: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha
        })
      });

      return createResult;
    } catch (e) {
      return {
        success: false,
        error: 'Failed to create branch'
      };
    }
  }

  // Create a pull request
  async createPR(owner, repo, title, body, head, base = 'main') {
    const command = `pr create --repo ${owner}/${repo} --title "${title}" --body "${body}" --head ${head} --base ${base}`;
    const result = await this.exec(command);
    return result;
  }

  // List pull requests
  async listPRs(owner, repo, opts = {}) {
    const state = opts.state || 'open';
    const command = `pr list --repo ${owner}/${repo} --state ${state} --json number,title,state,author,createdAt`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        return {
          success: true,
          prs: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse PRs data'
        };
      }
    }
    return result;
  }

  // Get repository contents
  async getContents(owner, repo, path = '') {
    const encodedRepo = encodeURIComponent(repo);
    const encodedPath = path ? encodeURIComponent(path) : '';
    const result = await this.exec(`api repos/${owner}/${encodedRepo}/contents/${encodedPath}`);
    if (result.success) {
      try {
        return {
          success: true,
          contents: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse contents data'
        };
      }
    }
    return result;
  }

  // Read a file
  async readFile(owner, repo, path) {
    const result = await this.getContents(owner, repo, path);
    if (result.success && result.contents.content) {
      return {
        success: true,
        content: Buffer.from(result.contents.content, 'base64').toString('utf8'),
        sha: result.contents.sha
      };
    }
    return result;
  }

  // Monitor all configured repositories
  async monitorRepositories() {
    const results = [];
    
    for (const repo of this.repositories) {
      try {
        const repoInfo = await this.getRepo(repo.owner, repo.name);
        const issues = await this.listIssues(repo.owner, repo.name);
        const branches = await this.listBranches(repo.owner, repo.name);
        
        results.push({
          repository: `${repo.owner}/${repo.name}`,
          info: repoInfo.success ? repoInfo.repo : null,
        issues: issues.success && Array.isArray(issues.issues) ? {
          open: issues.issues.filter(i => i.state === 'open').length,
          total: issues.issues.length
        } : null,
          branches: branches.success && Array.isArray(branches.branches) ? branches.branches.length : null
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

  // Execute arbitrary gh command
  async command(cmd) {
    return await this.exec(cmd);
  }
}
