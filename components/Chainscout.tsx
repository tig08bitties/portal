'use client';

import { useState, useEffect } from 'react';
import { ChainscoutIntegration } from '@/lib/chainscout-integration';

export default function Chainscout() {
  const [showChainscout, setShowChainscout] = useState(false);
  const [repoInfo, setRepoInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const chainscout = new ChainscoutIntegration();

  useEffect(() => {
    if (showChainscout && !repoInfo) {
      loadRepoInfo();
    }
  }, [showChainscout]);

  const loadRepoInfo = async () => {
    setLoading(true);
    try {
      const info = await chainscout.getRepositoryInfo();
      setRepoInfo(info);
    } catch (error) {
      console.error('Failed to load Chainscout info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <button
        onClick={() => setShowChainscout(!showChainscout)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🔗</span>
        <span>Chainscout</span>
      </button>

      {showChainscout && (
        <div className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-blue-300 mb-3">
            🔗 Chainscout
          </h3>

          <div className="mb-3 p-2 bg-blue-900/20 rounded border border-blue-500/30">
            <p className="text-xs text-blue-200">
              <strong>Chainscout:</strong> Multi-chain explorer framework by Blockscout. 
              Build and deploy blockchain explorers for any EVM chain.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-400">
              Loading repository information...
            </div>
          ) : (
            <div className="space-y-3">
              {repoInfo && (
                <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2">Repository</h4>
                  <div className="text-xs space-y-1">
                    <div className="text-white font-semibold">{repoInfo.full_name || 'blockscout/chainscout'}</div>
                    <div className="text-gray-400">{repoInfo.description || 'Multi-chain explorer framework'}</div>
                    {repoInfo.stargazers_count !== undefined && (
                      <div className="text-gray-300">
                        ⭐ {repoInfo.stargazers_count.toLocaleString()} stars
                      </div>
                    )}
                    {repoInfo.forks_count !== undefined && (
                      <div className="text-gray-300">
                        🍴 {repoInfo.forks_count.toLocaleString()} forks
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2 text-sm">Features</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Multi-chain explorer framework</div>
                  <div>• EVM-compatible chains</div>
                  <div>• Customizable explorer UI</div>
                  <div>• Blockscout-based architecture</div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <a
                  href={chainscout.getGitHubUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  GitHub →
                </a>
                <a
                  href={chainscout.getContributingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Contributing →
                </a>
                <a
                  href={chainscout.getDocumentationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Documentation →
                </a>
                <a
                  href={chainscout.getReleasesUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                >
                  Releases →
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowChainscout(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
