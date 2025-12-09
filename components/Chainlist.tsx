'use client';

import { useState } from 'react';
import { ChainlistIntegration } from '@/lib/chainlist-integration';
import { CovenantLookingGlass } from '@/lib/covenant-glass';

export default function Chainlist() {
  const [showChainlist, setShowChainlist] = useState(false);
  const [addingChain, setAddingChain] = useState<string | null>(null);

  const chainlist = new ChainlistIntegration();
  const glass = new CovenantLookingGlass();
  const covenantChains = chainlist.getCovenantChains();
  const covenantAddresses = glass.getCovenantAddresses();

  const addChainToMetaMask = async (chainId: number) => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('MetaMask not detected. Please install MetaMask extension.');
      return;
    }

    setAddingChain(chainId.toString());
    try {
      const chainParams = chainlist.getMetaMaskChainParams(chainId);
      if (!chainParams) {
        throw new Error('Chain parameters not found');
      }

      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams],
      });

      alert(`Successfully added ${chainParams.chainName} to MetaMask!`);
    } catch (error: any) {
      console.error('Error adding chain:', error);
      if (error.code === 4902) {
        // Chain not added
        alert(`Failed to add chain. Please add it manually via Chainlist.org`);
      } else {
        alert(`Error: ${error.message || 'Failed to add chain'}`);
      }
    } finally {
      setAddingChain(null);
    }
  };

  const getChainForAddress = (address: string) => {
    const addr = covenantAddresses.find(a => a.address.toLowerCase() === address.toLowerCase());
    return addr ? chainlist.getChainInfo(parseInt(addr.chainId)) : null;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowChainlist(!showChainlist)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🔗</span>
        <span>Chainlist</span>
      </button>

      {showChainlist && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-indigo-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-indigo-300 mb-3">
            🔗 Chainlist Integration
          </h3>

          <div className="mb-3 p-2 bg-indigo-900/20 rounded border border-indigo-500/30">
            <p className="text-xs text-indigo-200">
              <strong>Chainlist.org:</strong> Add EVM-compatible chains to your wallet. 
              Click "Add to MetaMask" or visit Chainlist.org to add chains manually.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-indigo-300 text-sm">Covenant Chains</h4>
            {covenantChains.map((chain) => {
              const covenantAddr = covenantAddresses.find(
                addr => parseInt(addr.chainId) === chain.chainId
              );
              return (
                <div key={chain.chainId} className="p-3 bg-slate-800 rounded border border-indigo-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{chain.name}</div>
                      <div className="text-gray-400 text-xs mt-1">
                        Chain ID: {chain.chainId}
                      </div>
                      {covenantAddr && (
                        <div className="text-amber-400 text-xs mt-1 font-mono break-all">
                          {covenantAddr.address.slice(0, 10)}...{covenantAddr.address.slice(-8)}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded">
                      {chain.nativeCurrency.symbol}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 space-y-1 mb-3">
                    <div>Native: {chain.nativeCurrency.name} ({chain.nativeCurrency.symbol})</div>
                    <div>Explorer: {chain.blockExplorers[0]?.name || 'N/A'}</div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => addChainToMetaMask(chain.chainId)}
                      disabled={addingChain === chain.chainId.toString()}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      {addingChain === chain.chainId.toString() ? 'Adding...' : 'Add to MetaMask'}
                    </button>
                    <a
                      href={chain.chainlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                    >
                      Chainlist →
                    </a>
                    {covenantAddr && (
                      <a
                        href={chain.blockExplorers[0]?.url + `/address/${covenantAddr.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Explorer →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-slate-800 rounded border border-indigo-500/30">
            <h4 className="font-semibold text-indigo-300 mb-2 text-sm">About Chainlist</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Standard EVM chain registry</div>
              <div>• Add chains to MetaMask easily</div>
              <div>• Verified RPC endpoints</div>
              <div>• Multi-chain wallet support</div>
            </div>
            <a
              href={chainlist.getMainUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:underline block mt-2"
            >
              Visit Chainlist.org →
            </a>
          </div>

          <button
            onClick={() => setShowChainlist(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
