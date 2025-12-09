'use client';

import { useState } from 'react';
import { BytecodeDBIntegration, BytecodeSearchResult, SimilarContract } from '@/lib/bytecode-db-integration';
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

export default function BytecodeDB() {
  const [showBytecodeDB, setShowBytecodeDB] = useState(false);
  const [searchType, setSearchType] = useState<'bytecode' | 'address' | 'similar'>('bytecode');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<BytecodeSearchResult | SimilarContract[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState('1');

  const bytecodeDB = new BytecodeDBIntegration();
  const blockscout = new BlockscoutIntegration({ chainId });

  const search = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setResults(null);

    try {
      if (searchType === 'bytecode') {
        const result = await bytecodeDB.searchByBytecode(searchValue);
        setResults(result);
      } else if (searchType === 'address') {
        const result = await bytecodeDB.getContractSourceFromAddress(searchValue, chainId);
        setResults(result);
      } else if (searchType === 'similar') {
        const results = await bytecodeDB.searchSimilarContracts(searchValue);
        setResults(results);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const isBytecodeResult = (result: any): result is BytecodeSearchResult => {
    return result && 'sourceCode' in result && !Array.isArray(result);
  };

  const isSimilarContracts = (result: any): result is SimilarContract[] => {
    return Array.isArray(result);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowBytecodeDB(!showBytecodeDB)}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🔍</span>
        <span>Bytecode DB</span>
      </button>

      {showBytecodeDB && (
        <div className="absolute bottom-full left-0 mb-2 w-[600px] bg-slate-900 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">
            🔍 Ethereum Bytecode Database
          </h3>

          <div className="mb-3 p-2 bg-cyan-900/20 rounded border border-cyan-500/30">
            <p className="text-xs text-cyan-200">
              <strong>Blockscout EBD:</strong> Search for contract source code by bytecode, 
              find similar contracts across chains, or discover unverified contract sources.
            </p>
          </div>

          {/* Search Type Selection */}
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => setSearchType('bytecode')}
              className={`px-3 py-1 rounded text-xs ${
                searchType === 'bytecode'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              By Bytecode
            </button>
            <button
              onClick={() => setSearchType('address')}
              className={`px-3 py-1 rounded text-xs ${
                searchType === 'address'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              By Address
            </button>
            <button
              onClick={() => setSearchType('similar')}
              className={`px-3 py-1 rounded text-xs ${
                searchType === 'similar'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Similar Contracts
            </button>
          </div>

          {/* Chain Selection (for address search) */}
          {searchType === 'address' && (
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-1 block">Chain</label>
              <select
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded text-white text-sm"
              >
                <option value="1">Ethereum Mainnet</option>
                <option value="137">Polygon</option>
                <option value="42161">Arbitrum</option>
              </select>
            </div>
          )}

          {/* Search Input */}
          <div className="mb-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                searchType === 'bytecode'
                  ? 'Enter bytecode (0x...)'
                  : searchType === 'address'
                  ? 'Enter contract address (0x...)'
                  : 'Enter bytecode to find similar contracts'
              }
              className="w-full px-3 py-2 bg-slate-800 border border-cyan-500/30 rounded text-white text-sm font-mono"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={search}
            disabled={loading || !searchValue.trim()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {loading ? 'Searching...' : 'Search Bytecode DB'}
          </button>

          {/* Results */}
          {loading && (
            <div className="text-center py-4 text-gray-400">
              Searching Ethereum Bytecode Database...
            </div>
          )}

          {!loading && results && (
            <div className="mt-4 space-y-3">
              {isBytecodeResult(results) ? (
                <div className="p-3 bg-slate-800 rounded border border-cyan-500/30">
                  <h4 className="font-semibold text-cyan-300 mb-2">Source Code Found</h4>
                  {results.contractName && (
                    <div className="text-sm text-white mb-1">
                      <strong>Contract:</strong> {results.contractName}
                    </div>
                  )}
                  {results.compilerVersion && (
                    <div className="text-xs text-gray-400 mb-1">
                      <strong>Compiler:</strong> {results.compilerVersion}
                    </div>
                  )}
                  {results.optimizationEnabled !== undefined && (
                    <div className="text-xs text-gray-400 mb-1">
                      <strong>Optimization:</strong> {results.optimizationEnabled ? 'Yes' : 'No'}
                      {results.runs && ` (${results.runs} runs)`}
                    </div>
                  )}
                  {results.sourceCode && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">Source Code:</div>
                      <pre className="bg-slate-900 p-2 rounded text-xs overflow-x-auto max-h-60 overflow-y-auto">
                        {results.sourceCode.length > 1000
                          ? `${results.sourceCode.slice(0, 1000)}... (truncated)`
                          : results.sourceCode}
                      </pre>
                    </div>
                  )}
                  {results.bytecode && (
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Bytecode:</strong>{' '}
                      <span className="font-mono">{bytecodeDB.formatBytecode(results.bytecode)}</span>
                    </div>
                  )}
                </div>
              ) : isSimilarContracts(results) ? (
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-300">
                    Similar Contracts Found: {results.length}
                  </h4>
                  {results.length > 0 ? (
                    results.slice(0, 5).map((contract, idx) => (
                      <div key={idx} className="p-3 bg-slate-800 rounded border border-cyan-500/30">
                        {contract.contractName && (
                          <div className="text-sm text-white mb-1">
                            <strong>{contract.contractName}</strong>
                          </div>
                        )}
                        {contract.similarity !== undefined && (
                          <div className="text-xs text-gray-400 mb-1">
                            Similarity: {(contract.similarity * 100).toFixed(1)}%
                          </div>
                        )}
                        {contract.chains && contract.chains.length > 0 && (
                          <div className="text-xs text-gray-400 mb-1">
                            Chains: {contract.chains.join(', ')}
                          </div>
                        )}
                        {contract.sourceCode && (
                          <div className="mt-2">
                            <div className="text-xs text-gray-400 mb-1">Source Code Preview:</div>
                            <pre className="bg-slate-900 p-2 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                              {contract.sourceCode.slice(0, 500)}...
                            </pre>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400">No similar contracts found</div>
                  )}
                </div>
              ) : null}

              {isBytecodeResult(results) && !results.sourceCode && (
                <div className="p-3 bg-slate-800 rounded border border-yellow-500/30">
                  <div className="text-sm text-yellow-300">
                    No source code found for this bytecode in the database.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Database Stats */}
          <div className="mt-4 p-3 bg-slate-800 rounded border border-cyan-500/30">
            <h4 className="font-semibold text-cyan-300 mb-2 text-sm">Database Statistics</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• &gt;130k verified source codes</div>
              <div>• ~100k unique main bytecodes</div>
              <div>• Cross-chain contract matching</div>
              <div>• Unverified contract discovery</div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <a
              href={bytecodeDB.getSwaggerUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              API Docs →
            </a>
            <a
              href={bytecodeDB.getDocumentationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
            >
              Documentation →
            </a>
            <a
              href="https://github.com/blockscout/blockscout-rs/tree/main/eth-bytecode-db"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              GitHub →
            </a>
          </div>

          <button
            onClick={() => setShowBytecodeDB(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
