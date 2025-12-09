'use client';

import { useState, useEffect } from 'react';
import { BlockscoutIntegration } from '@/lib/blockscout-integration';

// Make getChains accessible
const getChains = () => BlockscoutIntegration.getChains();
const getNotableAddresses = () => BlockscoutIntegration.getNotableAddresses();

export default function Blockscout() {
  const [showExplorer, setShowExplorer] = useState(false);
  const [searchType, setSearchType] = useState<'address' | 'transaction' | 'token'>('address');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [magicToken, setMagicToken] = useState<any>(null);
  const [chainId, setChainId] = useState('42161'); // Default to Arbitrum
  const [notableAddresses, setNotableAddresses] = useState<any[]>([]);

  const blockscout = new BlockscoutIntegration({ chainId });
  const availableChains = getChains();

  // Load notable addresses
  useEffect(() => {
    const notable = getNotableAddresses();
    setNotableAddresses(notable);
  }, []);

  const search = async () => {
    if (!searchValue) return;

    setLoading(true);
    try {
      switch (searchType) {
        case 'address':
          const addressInfo = await blockscout.getAddress(searchValue);
          const transactions = await blockscout.getAddressTransactions(searchValue, 5);
          setResults({ address: addressInfo, transactions });
          break;
        case 'transaction':
          const tx = await blockscout.getTransaction(searchValue);
          setResults({ transaction: tx });
          break;
        case 'token':
          if (searchValue.toLowerCase() === 'magic' || searchValue === '0x539bdE0d7Dbd336b79148AA742883198BBF60342') {
            const magic = await blockscout.getMagicToken();
            setResults({ token: magic });
            setMagicToken(magic);
          } else {
            setResults({ error: 'Only MAGIC token supported' });
          }
          break;
      }
    } catch (error: any) {
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loadMagicToken = async () => {
    setLoading(true);
    try {
      const magic = await blockscout.getMagicToken();
      setMagicToken(magic);
      setResults({ token: magic });
    } catch (error) {
      console.error('Magic token error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 left-4 z-50">
      <button
        onClick={() => setShowExplorer(!showExplorer)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🔍</span>
        <span>Blockscout</span>
      </button>

      {showExplorer && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-blue-300 mb-3">
            🔍 Blockscout Explorer
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Chain</label>
              <select
                value={chainId}
                onChange={(e) => {
                  setChainId(e.target.value);
                  blockscout.switchChain(e.target.value);
                }}
                className="w-full px-3 py-2 bg-slate-800 border border-blue-500 rounded text-white"
              >
                {availableChains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-400 mt-1">
                Select chain to view covenant addresses
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-blue-500 rounded text-white"
              >
                <option value="address">Address</option>
                <option value="transaction">Transaction</option>
                <option value="token">Token</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                {searchType === 'address' ? 'Address' : searchType === 'transaction' ? 'Transaction Hash' : 'Token (MAGIC)'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'address' ? '0x...' : searchType === 'transaction' ? '0x...' : 'MAGIC'}
                className="w-full px-3 py-2 bg-slate-800 border border-blue-500 rounded text-white font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={search}
                disabled={loading || !searchValue}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
              {searchType === 'token' && (
                <button
                  onClick={loadMagicToken}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50"
                >
                  MAGIC
                </button>
              )}
            </div>

            {results && (
              <div className="mt-4 space-y-3">
                {results.error && (
                  <div className="p-3 bg-red-900/30 rounded border border-red-500 text-red-300 text-sm">
                    {results.error}
                  </div>
                )}

                {results.address && (
                  <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Address</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-gray-300 font-mono break-all">{results.address.address}</div>
                      <div className="text-gray-400">Balance: {results.address.balance}</div>
                      <div className="text-gray-400">Transactions: {results.address.txCount}</div>
                      {(() => {
                        const notable = BlockscoutIntegration.getNotableAddress(results.address.address);
                        const isContract = notable?.contractVerified;
                        return (
                          <div className="flex gap-2 mt-2">
                            <a
                              href={blockscout.getAddressUrl(results.address.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              View on Explorer →
                            </a>
                            {isContract && (
                              <a
                                href={blockscout.getAddressUrl(results.address.address, 'contract')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                              >
                                Contract Code →
                              </a>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {results.transaction && (
                  <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Transaction</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-gray-300 font-mono break-all">{results.transaction.hash}</div>
                      <div className="text-gray-400">From: {results.transaction.from.slice(0, 10)}...</div>
                      <div className="text-gray-400">To: {results.transaction.to?.slice(0, 10)}...</div>
                      <div className={`text-xs ${results.transaction.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        Status: {results.transaction.status}
                      </div>
                      <a
                        href={blockscout.getTransactionUrl(results.transaction.hash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline block mt-2"
                      >
                        View on Explorer →
                      </a>
                    </div>
                  </div>
                )}

                {(results.token || magicToken) && (
                  <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">{(results.token || magicToken).name}</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-gray-300">Name: {(results.token || magicToken).name}</div>
                      <div className="text-gray-300">Symbol: {(results.token || magicToken).symbol}</div>
                      <div className="text-gray-400">Total Supply: {(results.token || magicToken).totalSupply}</div>
                      <div className="text-gray-400">Holders: {(results.token || magicToken).holders}</div>
                      {(() => {
                        const notable = BlockscoutIntegration.getNotableAddress((results.token || magicToken).address);
                        const isVerified = notable?.contractVerified;
                        return (
                          <div className="flex gap-2 mt-2">
                            <a
                              href={blockscout.getTokenUrl((results.token || magicToken).address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:underline"
                            >
                              View on Explorer →
                            </a>
                            {isVerified && (
                              <a
                                href={blockscout.getTokenUrl((results.token || magicToken).address, 'contract')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                              >
                                Contract Code →
                              </a>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {results.transactions && results.transactions.length > 0 && (
                  <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Recent Transactions</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {results.transactions.map((tx: any, idx: number) => (
                        <div key={idx} className="text-xs border-b border-slate-700 pb-2">
                          <div className="text-gray-300 font-mono break-all">{tx.hash.slice(0, 20)}...</div>
                          <div className={`text-xs ${tx.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {notableAddresses.length > 0 && (
              <div className="mt-4 p-3 bg-slate-800 rounded border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-2 text-sm">⭐ Notable Addresses</h4>
                <div className="space-y-2">
                  {notableAddresses
                    .filter(addr => addr.chainId === chainId)
                    .map((addr, idx) => (
                      <div key={idx} className="p-2 bg-slate-700 rounded border border-green-500/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-white font-semibold text-xs">{addr.name}</div>
                            <div className="text-gray-400 text-xs mt-1">{addr.description}</div>
                            <div className="text-gray-300 font-mono text-xs break-all mt-1">{addr.address}</div>
                            {addr.contractVerified && (
                              <div className="text-green-400 text-xs mt-1">✓ Verified Contract</div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              setSearchType('address');
                              setSearchValue(addr.address);
                              setChainId(addr.chainId);
                              blockscout.switchChain(addr.chainId);
                            }}
                            className="text-xs text-green-400 hover:underline"
                          >
                            View →
                          </button>
                          {addr.contractVerified && (
                            <a
                              href={blockscout.getAddressUrl(addr.address, addr.defaultTab || 'contract')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:underline"
                            >
                              Contract Code →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                {notableAddresses.filter(addr => addr.chainId === chainId).length === 0 && (
                  <div className="text-xs text-gray-400">
                    {chainId === '1' 
                      ? 'Switch to Polygon or Arbitrum to view other covenant addresses'
                      : chainId === '137'
                      ? 'Switch to Ethereum or Arbitrum to view other covenant addresses'
                      : 'Switch to Ethereum or Polygon to view other covenant addresses'}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 p-3 bg-slate-800 rounded border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-2 text-sm">Blockscout Explorer</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Search addresses, transactions, tokens</div>
                <div>• View MAGIC token info</div>
                <div>• View token contract code</div>
                <div>• Track transaction history</div>
                <div>• Multi-chain support (Ethereum, Polygon, Arbitrum)</div>
                <div>• Notable addresses quick access</div>
              </div>
              <div className="mt-2 space-y-1">
                <a
                  href="https://eth.blockscout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline block"
                >
                  Ethereum Explorer →
                </a>
                <a
                  href="https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa?tab=contract"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-400 hover:underline block"
                >
                  Ethereum 2.0 Deposit Contract →
                </a>
                <a
                  href="https://eth.blockscout.com/address/0x00000000219ab540356cBB839Cbe05303d7705Fa?tab=contract"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-300 hover:underline block ml-2"
                >
                  View Contract Code →
                </a>
                <a
                  href="https://arbitrum.blockscout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline block"
                >
                  Arbitrum Explorer →
                </a>
                <a
                  href="https://arbitrum.blockscout.com/address/0x539bdE0d7Dbd336b79148AA742883198BBF60342?tab=contract"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:underline block"
                >
                  MAGIC Token Contract →
                </a>
                <a
                  href="https://arbitrum.blockscout.com/token/0xf97f4df75117a78c1A5a0DBb814Af92458539FB4?tab=contract"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline block"
                >
                  Chainlink (LINK) Contract →
                </a>
                <a
                  href="https://github.com/blockscout/blockscout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline block"
                >
                  Blockscout GitHub →
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowExplorer(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
