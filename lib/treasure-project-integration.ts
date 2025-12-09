/**
 * TreasureProject GitHub Integration
 * Official TreasureDAO GitHub organization
 * Repository: https://github.com/TreasureProject
 */

export interface TreasureRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
}

export class TreasureProjectIntegration {
  private githubUrl = 'https://github.com/TreasureProject';
  private apiUrl = 'https://api.github.com/orgs/TreasureProject';

  /**
   * Get TreasureProject GitHub URL
   */
  getGitHubUrl(): string {
    return this.githubUrl;
  }

  /**
   * Get organization repositories
   */
  async getRepositories(): Promise<TreasureRepo[]> {
    try {
      const response = await fetch(`${this.apiUrl}/repos?per_page=100`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const repos = await response.json();
      return repos.map((repo: any) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        language: repo.language,
      }));
    } catch (error: any) {
      console.error('Failed to fetch TreasureProject repos:', error);
      return this.getDefaultRepos();
    }
  }

  /**
   * Get default repositories (fallback)
   */
  private getDefaultRepos(): TreasureRepo[] {
    return [
      {
        name: 'bridgeworld',
        full_name: 'TreasureProject/bridgeworld',
        description: 'Bridgeworld game contracts and frontend',
        html_url: `${this.githubUrl}/bridgeworld`,
        stargazers_count: 0,
        forks_count: 0,
      },
      {
        name: 'trove',
        full_name: 'TreasureProject/trove',
        description: 'Trove marketplace',
        html_url: `${this.githubUrl}/trove`,
        stargazers_count: 0,
        forks_count: 0,
      },
    ];
  }

  /**
   * Get organization info
   */
  async getOrganizationInfo(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error('Failed to fetch org info:', error);
      return {
        login: 'TreasureProject',
        name: 'Treasure Project',
        description: 'TreasureDAO official GitHub organization',
        html_url: this.githubUrl,
      };
    }
  }

  /**
   * Get repository URL
   */
  getRepositoryUrl(repoName: string): string {
    return `${this.githubUrl}/${repoName}`;
  }
}
