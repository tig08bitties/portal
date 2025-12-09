'use client';

import { useState, useEffect } from 'react';
import { ChainlinkIntegration } from '@/lib/chainlink-integration';

export default function Chainlink() {
  const [showChainlink, setShowChainlink] = useState(false);
  const [repoInfo, setRepoInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<'ethereum' | 'arbitrum'>('ethereum');

  const chainlink = new ChainlinkIntegration();

  useEffect(() => {
    if (showChainlink && !repoInfo) {
      loadRepoInfo();
    }
  }, [showChainlink]);

  const loadRepoInfo = async () => {
    setLoading(true);
    try {
      const info = await chainlink.getRepositoryInfo();
      setRepoInfo(info);
    } catch (error) {
      console.error('Failed to load Chainlink info:', error);
    } finally {
      setLoading(false);
    }
  };

  const priceFeeds = selectedNetwork === 'ethereum' 
    ? chainlink.getMainnetPriceFeeds() 
    : chainlink.getArbitrumPriceFeeds();

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setShowChainlink(!showChainlink)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>⛓️</span>
        <span>Chainlink</span>
      </button>

      {showChainlink && (
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-slate-900 border-2 border-orange-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-orange-300 mb-3">
            ⛓️ Chainlink
          </h3>

          <div className="mb-3 p-2 bg-orange-900/20 rounded border border-orange-500/30">
            <p className="text-xs text-orange-200">
              <strong>Chainlink:</strong> Decentralized Oracle Network connecting smart contracts 
              to real-world data, APIs, and payments.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-400">
              Loading repository information...
            </div>
          ) : (
            <div className="space-y-3">
              {repoInfo && (
                <div className="p-3 bg-slate-800 rounded border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 mb-2">Repository</h4>
                  <div className="text-xs space-y-1">
                    <div className="text-white font-semibold">{repoInfo.full_name || 'smartcontractkit/chainlink'}</div>
                    <div className="text-gray-400">{repoInfo.description || 'Chainlink is a blockchain abstraction layer'}</div>
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

              {/* Price Feeds */}
              <div className="p-3 bg-slate-800 rounded border border-orange-500/30">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm">Price Feeds</h4>
                <div className="mb-2">
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value as any)}
                    className="w-full px-2 py-1 bg-slate-700 border border-orange-500/30 rounded text-white text-xs"
                  >
                    <option value="ethereum">Ethereum Mainnet</option>
                    <option value="arbitrum">Arbitrum</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {priceFeeds.map((feed, idx) => (
                    <div key={idx} className="p-2 bg-slate-700 rounded border border-orange-500/20">
                      <div className="text-xs text-white font-semibold">{feed.pair}</div>
                      <div className="text-xs text-gray-300 font-mono break-all mt-1">{feed.address}</div>
                      <div className="text-xs text-gray-400 mt-1">Decimals: {feed.decimals}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LINK Token */}
              <div className="p-3 bg-slate-800 rounded border border-orange-500/30">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm">LINK Token</h4>
                <div className="text-xs space-y-1">
                  <div className="text-gray-300">
                    <strong>Ethereum:</strong>{' '}
                    <span className="font-mono">{chainlink.getLinkTokenAddress('ethereum')}</span>
                  </div>
                  <div className="text-gray-300">
                    <strong>Arbitrum:</strong>{' '}
                    <span className="font-mono break-all">{chainlink.getLinkTokenAddress('arbitrum')}</span>
                  </div>
                  <div className="text-gray-300">
                    <strong>Polygon:</strong>{' '}
                    <span className="font-mono break-all">{chainlink.getLinkTokenAddress('polygon')}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="p-3 bg-slate-800 rounded border border-orange-500/30">
                <h4 className="font-semibold text-orange-300 mb-2 text-sm">Chainlink Services</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Price Feeds - Real-time market data</div>
                  <div>• VRF - Verifiable Random Function</div>
                  <div>• Automation - Smart contract automation</div>
                  <div>• Functions - Serverless compute</div>
                  <div>• CCIP - Cross-chain interoperability</div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <a
                  href={chainlink.getGitHubUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded"
                >
                  GitHub →
                </a>
                <a
                  href={chainlink.getDocumentationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Documentation →
                </a>
                <a
                  href={chainlink.getPriceFeedsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Price Feeds →
                </a>
                <a
                  href={chainlink.getVRFUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  VRF →
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowChainlink(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
