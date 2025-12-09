'use client';

import { useState } from 'react';
import { TenderlyIntegration } from '@/lib/tenderly-integration';

export default function Tenderly() {
  const [showTenderly, setShowTenderly] = useState(false);
  const [searchType, setSearchType] = useState<'transaction' | 'address' | 'simulate' | 'contracts' | 'rpc' | 'wallets'>('transaction');
  const [searchValue, setSearchValue] = useState('');
  const [network, setNetwork] = useState('arbitrum');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [projectContracts, setProjectContracts] = useState<any[]>([]);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [webhookData, setWebhookData] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletLabel, setWalletLabel] = useState('');
  const [addingWallet, setAddingWallet] = useState(false);

  const tenderly = new TenderlyIntegration({
    username: 'tig0_0bitties',
    projectSlug: 'project',
    rpcUrl: 'https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb',
    nodeId: 'c11796d7-c128-4ef0-8640-e6bcf59ea03b',
    webhookId: 'ad800d90-a387-4f79-8b9a-74b6a85bc847',
  });

  const search = async () => {
    if (searchType === 'contracts') {
      setLoading(true);
      try {
        const contracts = await tenderly.getProjectContracts();
        setProjectContracts(contracts);
        setResults({ contracts });
      } catch (error: any) {
        setResults({ error: error.message });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (searchType === 'rpc') {
      setLoading(true);
      try {
        const blockNum = await tenderly.getBlockNumber();
        setBlockNumber(blockNum);
        setResults({
          rpc: {
            blockNumber: blockNum,
            rpcUrl: tenderly.getRpcUrl(),
            status: blockNum ? 'connected' : 'disconnected',
          }
        });
      } catch (error: any) {
        setResults({ error: error.message });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (searchType === 'wallets') {
      setLoading(true);
      try {
        const projectWallets = await tenderly.getProjectWallets();
        setWallets(projectWallets);
        setResults({ wallets: projectWallets });
      } catch (error: any) {
        setResults({ error: error.message });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!searchValue) return;

    setLoading(true);
    try {
      switch (searchType) {
        case 'transaction':
          const tx = await tenderly.getTransaction(searchValue, network);
          setResults({ transaction: tx });
          break;
        case 'address':
          const contract = await tenderly.getContract(searchValue, network);
          setResults({ contract });
          break;
        case 'simulate':
          // For simulation, we'd need more transaction data
          setResults({ error: 'Simulation requires full transaction data' });
          break;
      }
    } catch (error: any) {
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const loadWallets = async () => {
    setLoading(true);
    try {
      const projectWallets = await tenderly.getProjectWallets();
      setWallets(projectWallets);
      setResults({ wallets: projectWallets });
    } catch (error: any) {
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const addWallet = async () => {
    if (!walletAddress.trim()) return;

    setAddingWallet(true);
    try {
      const success = await tenderly.addWalletToProject(walletAddress.trim(), walletLabel.trim() || undefined);
      if (success) {
        setWalletAddress('');
        setWalletLabel('');
        await loadWallets();
        setResults({ success: 'Wallet added successfully' });
      } else {
        setResults({ error: 'Failed to add wallet' });
      }
    } catch (error: any) {
      setResults({ error: error.message });
    } finally {
      setAddingWallet(false);
    }
  };

  const triggerWebhook = async () => {
    if (!webhookData) return;
    
    setLoading(true);
    try {
      const data = JSON.parse(webhookData);
      const success = await tenderly.triggerWebhook(data);
      setResults({ 
        webhook: {
          success,
          data,
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error: any) {
      setResults({ error: `Invalid JSON: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 right-20 z-50">
      <button
        onClick={() => setShowTenderly(!showTenderly)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🔬</span>
        <span>Tenderly</span>
      </button>

      {showTenderly && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-teal-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-teal-300 mb-3">
            🔬 Tenderly Explorer
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Network</label>
              <select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-teal-500 rounded text-white"
              >
                <option value="arbitrum">Arbitrum</option>
                <option value="ethereum">Ethereum</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-teal-500 rounded text-white"
              >
                <option value="transaction">Transaction</option>
                <option value="address">Contract Address</option>
                <option value="contracts">Project Contracts</option>
                <option value="rpc">RPC Provider</option>
                <option value="wallets">Project Wallets</option>
                <option value="simulate">Simulate</option>
              </select>
            </div>

            {searchType !== 'contracts' && searchType !== 'rpc' && searchType !== 'wallets' && (
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  {searchType === 'transaction' ? 'Transaction Hash' : searchType === 'address' ? 'Contract Address' : 'Simulation Data'}
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchType === 'transaction' ? '0x...' : searchType === 'address' ? '0x...' : 'JSON'}
                  className="w-full px-3 py-2 bg-slate-800 border border-teal-500 rounded text-white font-mono text-sm"
                />
              </div>
            )}

            <button
              onClick={search}
              disabled={loading || (searchType !== 'contracts' && searchType !== 'rpc' && searchType !== 'wallets' && !searchValue)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Loading...' : searchType === 'contracts' ? 'Load Contracts' : searchType === 'rpc' ? 'Test RPC' : searchType === 'wallets' ? 'Load Wallets' : 'Analyze'}
            </button>

            {results && (
              <div className="mt-4 space-y-3">
                {results.error && (
                  <div className="p-3 bg-red-900/30 rounded border border-red-500 text-red-300 text-sm">
                    {results.error}
                  </div>
                )}

                {results.transaction && (
                  <div className="p-3 bg-slate-800 rounded border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">Transaction</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-gray-300 font-mono break-all">{results.transaction.hash}</div>
                      <div className="text-gray-400">From: {results.transaction.from?.slice(0, 10)}...</div>
                      <div className="text-gray-400">To: {results.transaction.to?.slice(0, 10)}...</div>
                      <div className={`text-xs ${results.transaction.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        Status: {results.transaction.status}
                      </div>
                      {results.transaction.error && (
                        <div className="text-red-400 text-xs mt-2">{results.transaction.error}</div>
                      )}
                      <a
                        href={tenderly.getTransactionUrl(results.transaction.hash, network)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:underline block mt-2"
                      >
                        View on Tenderly →
                      </a>
                    </div>
                  </div>
                )}

                {results.contract && (
                  <div className="p-3 bg-slate-800 rounded border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">Contract</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-white font-semibold">{results.contract.name}</div>
                      <div className="text-gray-300 font-mono break-all">{results.contract.address}</div>
                      <div className="text-gray-400">Network: {results.contract.network}</div>
                      {results.contract.abi && (
                        <div className="text-gray-400">ABI: Available</div>
                      )}
                      <a
                        href={tenderly.getAddressUrl(results.contract.address, network)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:underline block mt-2"
                      >
                        View on Tenderly →
                      </a>
                    </div>
                  </div>
                )}

                {results.contracts && results.contracts.length > 0 && (
                  <div className="p-3 bg-slate-800 rounded border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">Project Contracts</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {results.contracts.map((contract: any, idx: number) => (
                        <div key={idx} className="p-2 bg-slate-700 rounded border border-teal-500/20">
                          <div className="text-white font-semibold text-xs">{contract.name}</div>
                          <div className="text-gray-300 font-mono text-xs break-all">{contract.address}</div>
                          <div className="text-gray-400 text-xs">Network: {contract.network}</div>
                          {contract.abi && (
                            <div className="text-green-400 text-xs mt-1">✓ Verified</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <a
                      href={tenderly.getProjectContractsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline block mt-2 text-xs text-center"
                    >
                      View All Contracts →
                    </a>
                  </div>
                )}

                {results.rpc && (
                  <div className="p-3 bg-slate-800 rounded border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">RPC Provider</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-white">
                        <span className="text-gray-400">Status:</span>{' '}
                        <span className={results.rpc.status === 'connected' ? 'text-green-400' : 'text-red-400'}>
                          {results.rpc.status === 'connected' ? '✓ Connected' : '✗ Disconnected'}
                        </span>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Block Number:</span>{' '}
                        {results.rpc.blockNumber !== null ? results.rpc.blockNumber.toLocaleString() : 'N/A'}
                      </div>
                      <div className="text-gray-300 font-mono text-xs break-all">
                        <span className="text-gray-400">RPC URL:</span>{' '}
                        {results.rpc.rpcUrl}
                      </div>
                      <a
                        href={tenderly.getNodeIntegrationUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:underline block mt-2"
                      >
                        View Node Integration →
                      </a>
                    </div>
                  </div>
                )}

                {searchType === 'wallets' && (
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-3">Project Wallets</h4>
                      
                      {/* Add Wallet Form */}
                      <div className="mb-4 space-y-2">
                        <input
                          type="text"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          placeholder="Wallet address (0x...)"
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/30 rounded text-white text-sm font-mono"
                        />
                        <input
                          type="text"
                          value={walletLabel}
                          onChange={(e) => setWalletLabel(e.target.value)}
                          placeholder="Label (optional)"
                          className="w-full px-3 py-2 bg-slate-700 border border-purple-500/30 rounded text-white text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={addWallet}
                            disabled={addingWallet || !walletAddress.trim()}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50 text-sm"
                          >
                            {addingWallet ? 'Adding...' : 'Add Wallet'}
                          </button>
                          <button
                            onClick={loadWallets}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50 text-sm"
                          >
                            Refresh
                          </button>
                        </div>
                        <a
                          href={tenderly.getAddWalletUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:underline block"
                        >
                          Open Tenderly Dashboard →
                        </a>
                      </div>

                      {/* Wallets List */}
                      {wallets.length > 0 ? (
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400">Wallets ({wallets.length}):</div>
                          {wallets.map((wallet: any, idx: number) => (
                            <div key={idx} className="p-2 bg-slate-700 rounded border border-purple-500/20">
                              <div className="text-xs text-white font-mono break-all">{wallet.address || wallet}</div>
                              {wallet.label && (
                                <div className="text-xs text-gray-400 mt-1">Label: {wallet.label}</div>
                              )}
                              <a
                                href={tenderly.getWalletUrl(wallet.address || wallet)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-400 hover:underline block mt-1"
                              >
                                View in Tenderly →
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">
                          No wallets found. Add a wallet to start monitoring.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {results.webhook && (
                  <div className="p-3 bg-slate-800 rounded border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">Webhook Triggered</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-white">
                        <span className="text-gray-400">Status:</span>{' '}
                        <span className={results.webhook.success ? 'text-green-400' : 'text-red-400'}>
                          {results.webhook.success ? '✓ Success' : '✗ Failed'}
                        </span>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Timestamp:</span>{' '}
                        {results.webhook.timestamp}
                      </div>
                      <div className="text-gray-300 font-mono text-xs break-all mt-2 p-2 bg-slate-700 rounded">
                        {JSON.stringify(results.webhook.data, null, 2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 p-3 bg-slate-800 rounded border border-teal-500/30">
              <h4 className="font-semibold text-teal-300 mb-2 text-sm">Tenderly Node & RPC</h4>
              <div className="text-xs text-gray-400 space-y-1 mb-2">
                <div>• RPC Provider: {tenderly.getRpcUrl().split('/').pop()}</div>
                <div>• Node ID: c11796d7-c128-4ef0-8640-e6bcf59ea03b</div>
                <div>• Webhook ID: ad800d90-a387-4f79-8b9a-74b6a85bc847</div>
              </div>
              <div className="mt-2 space-y-1">
                <a
                  href={tenderly.getNodeIntegrationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  Node Integration →
                </a>
                <a
                  href={tenderly.getWalletsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:underline block"
                >
                  Wallets Dashboard →
                </a>
                <a
                  href={tenderly.getNodeExtensionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  Node Extensions Library →
                </a>
                <a
                  href={tenderly.getNodeIntegrationDocsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  Integration Docs →
                </a>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded border border-teal-500/30">
              <h4 className="font-semibold text-teal-300 mb-2 text-sm">Webhook Test</h4>
              <textarea
                value={webhookData}
                onChange={(e) => setWebhookData(e.target.value)}
                placeholder='{"exampleKey": "exampleValue"}'
                className="w-full px-3 py-2 bg-slate-700 border border-teal-500 rounded text-white font-mono text-xs mb-2"
                rows={3}
              />
              <button
                onClick={triggerWebhook}
                disabled={loading || !webhookData}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50 text-xs"
              >
                {loading ? 'Sending...' : 'Trigger Webhook'}
              </button>
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded border border-teal-500/30">
              <h4 className="font-semibold text-teal-300 mb-2 text-sm">Tenderly Explorer</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Debug transactions</div>
                <div>• Simulate transactions</div>
                <div>• Analyze contracts</div>
                <div>• Monitor smart contracts</div>
                <div>• Contract verification</div>
              </div>
              <div className="mt-2 space-y-1">
                <a
                  href={tenderly.getExplorerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  Open Tenderly Explorer →
                </a>
                <a
                  href={tenderly.getProjectContractsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  View Project Contracts →
                </a>
                <a
                  href={tenderly.getVerificationDocsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline block"
                >
                  Contract Verification Docs →
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowTenderly(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
