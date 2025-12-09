'use client';

import { useState, useEffect } from 'react';
import { CovenantLookingGlass } from '@/lib/covenant-glass';
import { BlockscoutIntegration } from '@/lib/blockscout-integration';
import { ChainlistIntegration } from '@/lib/chainlist-integration';

export default function CovenantAddresses() {
  const [showAddresses, setShowAddresses] = useState(false);
  const [covenantAddresses, setCovenantAddresses] = useState<any[]>([]);
  const [addressInfo, setAddressInfo] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const glass = new CovenantLookingGlass();
  const chainlist = new ChainlistIntegration();

  useEffect(() => {
    const addresses = glass.getCovenantAddresses();
    setCovenantAddresses(addresses);
  }, []);

  const loadAddressInfo = async (address: string, chainId: string) => {
    if (addressInfo[address]) return; // Already loaded

    setLoading(true);
    try {
      const blockscout = new BlockscoutIntegration({ chainId });
      const info = await blockscout.getAddress(address);
      setAddressInfo(prev => ({ ...prev, [address]: info }));
    } catch (error) {
      console.error('Failed to load address info:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllAddresses = async () => {
    setLoading(true);
    try {
      for (const addr of covenantAddresses) {
        await loadAddressInfo(addr.address, addr.chainId);
      }
    } finally {
      setLoading(false);
    }
  };

  const getExplorerUrl = (address: string, chainId: string): string => {
    const blockscout = new BlockscoutIntegration({ chainId });
    return blockscout.getAddressUrl(address);
  };

  const getContractUrl = (address: string, chainId: string): string => {
    const blockscout = new BlockscoutIntegration({ chainId });
    return blockscout.getAddressUrl(address, 'contract');
  };

  const getChainName = (chain: string): string => {
    const chainMap: Record<string, string> = {
      'ethereum': 'Ethereum Mainnet',
      'polygon': 'Polygon (MATIC)',
      'arbitrum': 'Arbitrum',
    };
    return chainMap[chain] || chain;
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => {
          setShowAddresses(!showAddresses);
          if (!showAddresses && covenantAddresses.length > 0) {
            loadAllAddresses();
          }
        }}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>⚡</span>
        <span>Covenant</span>
      </button>

      {showAddresses && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-amber-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-amber-300 mb-3">
            ⚡ Covenant Addresses
          </h3>

          <div className="mb-3 p-2 bg-amber-900/20 rounded border-2 border-amber-500">
            <p className="text-xs text-amber-200 font-bold">
              ⚠️ OFFICIAL COVENANT ADDRESSES - SET IN STONE ⚠️
            </p>
            <p className="text-xs text-amber-300 mt-1">
              <strong>These are the ONLY official covenant addresses.</strong> All other addresses 
              are placeholders or examples for reference only. These addresses are permanent and immutable.
            </p>
          </div>

          {loading && covenantAddresses.length > 0 && (
            <div className="text-center py-2 text-gray-400 text-sm">
              Loading address information...
            </div>
          )}

          <div className="space-y-3">
            {covenantAddresses.map((addr, idx) => (
              <div key={idx} className="p-3 bg-slate-800 rounded border border-amber-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">
                        {addr.name}
                      </div>
                      <div className="text-blue-400 text-xs mt-1 font-semibold">
                        {getChainName(addr.chain)}
                      </div>
                      <div className="text-amber-400 text-xs mt-1 font-mono break-all">
                        {addr.address}
                      </div>
                    </div>
                    <div className="text-xs text-amber-300 bg-amber-900/30 px-2 py-1 rounded border border-amber-500">
                      ✓ OFFICIAL - SET IN STONE
                    </div>
                  </div>

                {addressInfo[addr.address] && (
                  <div className="mt-2 text-xs space-y-1">
                    <div className="text-gray-400">
                      Balance: {addressInfo[addr.address].balance || '0'} {addr.chain === 'polygon' ? 'MATIC' : 'ETH'}
                    </div>
                    <div className="text-gray-400">
                      Transactions: {addressInfo[addr.address].txCount || 0}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => loadAddressInfo(addr.address, addr.chainId)}
                    disabled={loading}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded disabled:opacity-50"
                  >
                    {addressInfo[addr.address] ? 'Refresh' : 'Load Info'}
                  </button>
                  <a
                    href={getExplorerUrl(addr.address, addr.chainId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded"
                  >
                    Explorer →
                  </a>
                  <a
                    href={getContractUrl(addr.address, addr.chainId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                  >
                    Contract →
                  </a>
                  <a
                    href={chainlist.getChainlistUrl(parseInt(addr.chainId))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded"
                  >
                    Chainlist →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-800 rounded border-2 border-amber-500">
            <h4 className="font-semibold text-amber-300 mb-2 text-sm">⚠️ Official Covenant Addresses - SET IN STONE</h4>
            <div className="text-xs text-gray-300 space-y-1 mb-2">
              <div className="font-bold text-amber-300">These 3 addresses are PERMANENT and IMMUTABLE:</div>
              <div>• Ethereum Mainnet: 0x3bba654a3816a228284e3e0401cff4ea6dfc5cea</div>
              <div>• Polygon (MATIC): 0x0c4e50157a6e82f5330b721544ce440cb0c6768f</div>
              <div>• Arbitrum: 0x3df07977140ad97465075129c37aec7237d74415</div>
            </div>
            <div className="text-xs text-gray-400 space-y-1 border-t border-amber-500/30 pt-2 mt-2">
              <div>• Official addresses of the covenant foundation</div>
              <div>• Used for portal governance and operations</div>
              <div>• Linked to the 22 Hebrew Path Guardians</div>
              <div>• Sacred constants: 419, 369, 1798, 687, 22</div>
              <div className="text-amber-400 font-semibold mt-1">• All other addresses are placeholders/examples only</div>
            </div>
          </div>

          <button
            onClick={() => setShowAddresses(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
