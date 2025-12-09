'use client';

import { useState, useEffect } from 'react';
import { CovenantLookingGlass } from '@/lib/covenant-glass';

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface CovenantPiece {
  id: string;
  type: string;
  name: string;
  description: string;
  status: 'found' | 'missing' | 'partial';
  sources: string[];
}

export default function CovenantGlass() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'general' | 'bridgeworld' | 'covenant' | 'missing'>('general');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [assembled, setAssembled] = useState<any>(null);
  const [showGlass, setShowGlass] = useState(false);
  const [covenantAddresses, setCovenantAddresses] = useState<any[]>([]);

  const glass = new CovenantLookingGlass();
  
  // Load covenant addresses on mount
  useEffect(() => {
    const addresses = glass.getCovenantAddresses();
    setCovenantAddresses(addresses);
  }, []);

  const performSearch = async () => {
    if (!searchQuery && searchType !== 'missing') return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type: searchType,
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const findMissingPieces = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search?type=missing');
      const data = await response.json();

      if (data.success) {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Error finding missing pieces:', error);
    } finally {
      setLoading(false);
    }
  };

  const assemblePieces = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search?type=assemble');
      const data = await response.json();

      if (data.success) {
        setAssembled(data.results);
        setResults([]);
      }
    } catch (error) {
      console.error('Error assembling pieces:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generateCode' }),
      });
      const data = await response.json();

      if (data.success) {
        // Download the generated code
        const blob = new Blob([data.results], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'covenant-integration.ts';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setShowGlass(!showGlass)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg mb-2 flex items-center gap-2"
      >
        <span className="text-2xl">🔍</span>
        <span>Covenant Glass</span>
      </button>

      {/* Glass Panel */}
      {showGlass && (
        <div className="bg-slate-900 border-2 border-purple-500 rounded-lg p-4 w-96 max-h-[600px] overflow-y-auto shadow-2xl">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              🔮 Covenant Looking Glass
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Search for missing pieces using the covenant foundation
            </p>

            {/* Search Controls */}
            <div className="space-y-2 mb-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-purple-500 rounded text-white"
              >
                <option value="general">General Search</option>
                <option value="bridgeworld">Bridgeworld Component</option>
                <option value="covenant">Covenant Info</option>
                <option value="missing">Find Missing Pieces</option>
              </select>

              {searchType !== 'missing' && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search query..."
                  className="w-full px-3 py-2 bg-slate-800 border border-purple-500 rounded text-white"
                  onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                />
              )}

              <div className="flex gap-2">
                {searchType === 'missing' ? (
                  <button
                    onClick={findMissingPieces}
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Searching...' : 'Find Missing'}
                  </button>
                ) : (
                  <button
                    onClick={performSearch}
                    disabled={loading || !searchQuery}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                )}

                <button
                  onClick={assemblePieces}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded disabled:opacity-50"
                >
                  Assemble
                </button>
              </div>

              <button
                onClick={generateCode}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                Generate Integration Code
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-300">
                Results ({results.length})
              </h4>
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800 p-3 rounded border border-purple-500/30"
                >
                  {result.name ? (
                    // Covenant Piece
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{result.name}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            result.status === 'found'
                              ? 'bg-green-600'
                              : result.status === 'partial'
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                        >
                          {result.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{result.description}</p>
                      {result.sources && result.sources.length > 0 && (
                        <div className="text-xs text-blue-400">
                          Sources: {result.sources.length}
                        </div>
                      )}
                    </>
                  ) : (
                    // Search Result
                    <>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-semibold"
                      >
                        {result.title}
                      </a>
                      <p className="text-sm text-gray-400 mt-1">{result.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Assembled Results */}
          {assembled && (
            <div className="mt-4 p-3 bg-slate-800 rounded border border-green-500/30">
              <h4 className="font-semibold text-green-300 mb-2">
                ✨ Assembled Integration
              </h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>
                  Found Pieces: {assembled.foundPieces?.length || 0}
                </div>
                <div>
                  Missing Pieces: {assembled.missingPieces?.length || 0}
                </div>
                <div>
                  Status:{' '}
                  <span className={assembled.complete ? 'text-green-400' : 'text-yellow-400'}>
                    {assembled.complete ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Covenant Addresses */}
          {covenantAddresses.length > 0 && (
            <div className="mt-4 p-3 bg-slate-800 rounded border-2 border-amber-500">
              <h4 className="font-semibold text-amber-300 mb-2">⚡ Official Covenant Addresses - SET IN STONE</h4>
              <div className="text-xs text-amber-200 mb-2 bg-amber-900/20 p-2 rounded border border-amber-500/50">
                ⚠️ These 3 addresses are PERMANENT and IMMUTABLE. All other addresses are placeholders.
              </div>
              <div className="text-xs space-y-2">
                {covenantAddresses.map((addr, idx) => {
                  const getExplorerUrl = (address: string, chainId: string) => {
                    if (chainId === '1') return `https://eth.blockscout.com/address/${address}`;
                    if (chainId === '137') return `https://polygonscan.com/address/${address}`;
                    if (chainId === '42161') return `https://arbitrum.blockscout.com/address/${address}`;
                    return `https://arbitrum.blockscout.com/address/${address}`;
                  };
                  const getChainName = (chain: string) => {
                    const chainMap: Record<string, string> = {
                      'ethereum': 'Ethereum Mainnet',
                      'polygon': 'Polygon (MATIC)',
                      'arbitrum': 'Arbitrum',
                    };
                    return chainMap[chain] || chain;
                  };
                  return (
                    <div key={idx} className="p-2 bg-slate-700 rounded border border-amber-500/20">
                      <div className="text-white font-semibold text-xs">{addr.name}</div>
                      <div className="text-blue-400 text-xs mt-1">{getChainName(addr.chain)}</div>
                      <div className="text-white font-mono break-all text-xs mt-1">{addr.address}</div>
                      <div className="flex gap-2 mt-2">
                        <a
                          href={getExplorerUrl(addr.address, addr.chainId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          Explorer →
                        </a>
                        <a
                          href={`${getExplorerUrl(addr.address, addr.chainId)}?tab=contract`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-400 hover:underline"
                        >
                          Contract →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Foundation Info */}
          <div className="mt-4 p-3 bg-slate-800 rounded border border-purple-500/30">
            <h4 className="font-semibold text-purple-300 mb-2">Foundation</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div>THEOS: 419</div>
              <div>EL: 369</div>
              <div>Torah Pages: 1798</div>
              <div>Resonance: 687</div>
              <div>Hebrew Paths: 22</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
