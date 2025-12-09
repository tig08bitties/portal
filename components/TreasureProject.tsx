'use client';

import { useState, useEffect } from 'react';
import { TreasureProjectIntegration, TreasureRepo } from '@/lib/treasure-project-integration';

export default function TreasureProject() {
  const [showProject, setShowProject] = useState(false);
  const [repos, setRepos] = useState<TreasureRepo[]>([]);
  const [orgInfo, setOrgInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const treasureProject = new TreasureProjectIntegration();

  useEffect(() => {
    if (showProject && repos.length === 0) {
      loadRepos();
    }
  }, [showProject]);

  const loadRepos = async () => {
    setLoading(true);
    try {
      const [reposData, orgData] = await Promise.all([
        treasureProject.getRepositories(),
        treasureProject.getOrganizationInfo(),
      ]);
      setRepos(reposData);
      setOrgInfo(orgData);
    } catch (error) {
      console.error('Failed to load repos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <button
        onClick={() => setShowProject(!showProject)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>💎</span>
        <span>Treasure</span>
      </button>

      {showProject && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-indigo-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-indigo-300 mb-3">
            💎 TreasureProject
          </h3>

          <div className="mb-3 p-2 bg-indigo-900/20 rounded border border-indigo-500/30">
            <p className="text-xs text-indigo-200">
              <strong>TreasureProject:</strong> Official TreasureDAO GitHub organization. 
              Source code for Bridgeworld, Trove, and other ecosystem projects.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-400">
              Loading repositories...
            </div>
          ) : (
            <div className="space-y-3">
              {orgInfo && (
                <div className="p-3 bg-slate-800 rounded border border-indigo-500/30">
                  <h4 className="font-semibold text-indigo-300 mb-2">Organization</h4>
                  <div className="text-xs space-y-1">
                    <div className="text-white font-semibold">{orgInfo.name || orgInfo.login}</div>
                    {orgInfo.description && (
                      <div className="text-gray-400">{orgInfo.description}</div>
                    )}
                  </div>
                </div>
              )}

              {repos.length > 0 && (
                <div className="p-3 bg-slate-800 rounded border border-indigo-500/30">
                  <h4 className="font-semibold text-indigo-300 mb-2">
                    Repositories ({repos.length})
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {repos.slice(0, 10).map((repo) => (
                      <div key={repo.name} className="p-2 bg-slate-700 rounded border border-indigo-500/20">
                        <div className="text-xs text-white font-semibold">{repo.name}</div>
                        {repo.description && (
                          <div className="text-xs text-gray-400 mt-1">{repo.description}</div>
                        )}
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          {repo.stargazers_count > 0 && (
                            <span>⭐ {repo.stargazers_count}</span>
                          )}
                          {repo.forks_count > 0 && (
                            <span>🍴 {repo.forks_count}</span>
                          )}
                          {repo.language && (
                            <span>{repo.language}</span>
                          )}
                        </div>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-400 hover:underline block mt-1"
                        >
                          View Repository →
                        </a>
                      </div>
                    ))}
                  </div>
                  {repos.length > 10 && (
                    <div className="text-xs text-gray-400 mt-2">
                      Showing 10 of {repos.length} repositories
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <a
                  href={treasureProject.getGitHubUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                >
                  GitHub →
                </a>
                <a
                  href={treasureProject.getRepositoryUrl('bridgeworld')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Bridgeworld →
                </a>
                <a
                  href={treasureProject.getRepositoryUrl('trove')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Trove →
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowProject(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
