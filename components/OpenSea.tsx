'use client';

import { useState, useEffect } from 'react';
import { OpenSeaIntegration, OpenSeaCollection, OpenSeaAsset } from '@/lib/opensea-integration';
import { CovenantLookingGlass } from '@/lib/covenant-glass';

export default function OpenSea() {
  const [showOpenSea, setShowOpenSea] = useState(false);
  const [searchType, setSearchType] = useState<'collection' | 'account' | 'asset'>('collection');
  const [searchValue, setSearchValue] = useState('smol-brains');
  const [collection, setCollection] = useState<OpenSeaCollection | null>(null);
  const [assets, setAssets] = useState<OpenSeaAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const opensea = new OpenSeaIntegration({
    apiKey: '62d4d2a83967477ea11810d0e9d86d5e',
    mcpToken: '042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW',
  });
  const glass = new CovenantLookingGlass();

  useEffect(() => {
    if (showOpenSea && searchType === 'collection' && searchValue === 'smol-brains' && !collection) {
      loadSmolBrains();
    }
  }, [showOpenSea]);

  const loadSmolBrains = async () => {
    setLoading(true);
    try {
      const coll = await opensea.getSmolBrainsCollection();
      const assetsData = await opensea.getSmolBrainsAssets(10);
      setCollection(coll);
      setAssets(assetsData);
    } catch (error) {
      console.error('Failed to load Smol Brains:', error);
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setCollection(null);
    setAssets([]);

    try {
      if (searchType === 'collection') {
        const coll = await opensea.getCollection(searchValue.trim());
        if (coll) {
          setCollection(coll);
          const assetsData = await opensea.getCollectionAssets(searchValue.trim(), 10);
          setAssets(assetsData);
        }
      } else if (searchType === 'account') {
        const covenantAddresses = glass.getCovenantAddresses();
        const address = searchValue.trim() || covenantAddresses[0]?.address || '';
        const assetsData = await opensea.getAccountAssets(address, 20);
        setAssets(assetsData);
      } else if (searchType === 'asset') {
        // Format: contractAddress:tokenId
        const [contract, tokenId] = searchValue.trim().split(':');
        if (contract && tokenId) {
          const asset = await opensea.getAsset(contract, tokenId);
          if (asset) {
            setAssets([asset]);
          }
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="fixed top-4 right-20 z-50">
      <button
        onClick={() => setShowOpenSea(!showOpenSea)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🌊</span>
        <span>OpenSea</span>
      </button>

      {showOpenSea && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-blue-300 mb-3">
            🌊 OpenSea
          </h3>

          <div className="mb-3 p-2 bg-blue-900/20 rounded border border-blue-500/30">
            <p className="text-xs text-blue-200">
              <strong>OpenSea:</strong> NFT marketplace. Search collections, view assets, 
              and explore the NFT ecosystem.
            </p>
          </div>

          {/* Search Type */}
          <div className="mb-3">
            <label className="text-sm text-gray-300 mb-1 block">Search Type</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-800 border border-blue-500/30 rounded text-white text-sm"
            >
              <option value="collection">Collection</option>
              <option value="account">Account</option>
              <option value="asset">Asset (contract:tokenId)</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="mb-3">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                searchType === 'collection'
                  ? 'Collection slug (e.g., smol-brains)'
                  : searchType === 'account'
                  ? 'Wallet address (0x...)'
                  : 'Contract:TokenId (e.g., 0x...:123)'
              }
              className="w-full px-3 py-2 bg-slate-800 border border-blue-500/30 rounded text-white text-sm font-mono"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={search}
            disabled={loading || !searchValue.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          {/* Quick Links */}
          <div className="mb-3 flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setSearchType('collection');
                setSearchValue('smol-brains');
                loadSmolBrains();
              }}
              className="text-xs bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded"
            >
              Smol Brains
            </button>
            <button
              onClick={() => {
                const covenantAddresses = glass.getCovenantAddresses();
                if (covenantAddresses.length > 0) {
                  setSearchType('account');
                  setSearchValue(covenantAddresses[0].address);
                  search();
                }
              }}
              className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded"
            >
              Covenant Address
            </button>
          </div>

          {/* Results */}
          {loading && (
            <div className="text-center py-4 text-gray-400">
              Searching OpenSea...
            </div>
          )}

          {!loading && collection && (
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">Collection</h4>
                <div className="text-xs space-y-1">
                  <div className="text-white font-semibold">{collection.name}</div>
                  {collection.description && (
                    <div className="text-gray-400">{collection.description}</div>
                  )}
                  {collection.stats && (
                    <div className="mt-2 space-y-1">
                      {collection.stats.floor_price !== undefined && (
                        <div className="text-gray-300">
                          <strong>Floor Price:</strong> {collection.stats.floor_price} ETH
                        </div>
                      )}
                      {collection.stats.total_volume !== undefined && (
                        <div className="text-gray-300">
                          <strong>Total Volume:</strong> {collection.stats.total_volume.toLocaleString()} ETH
                        </div>
                      )}
                      {collection.stats.num_owners !== undefined && (
                        <div className="text-gray-300">
                          <strong>Owners:</strong> {collection.stats.num_owners.toLocaleString()}
                        </div>
                      )}
                      {collection.stats.total_supply !== undefined && (
                        <div className="text-gray-300">
                          <strong>Supply:</strong> {collection.stats.total_supply.toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                  {collection.contract_address && (
                    <div className="text-gray-300 font-mono text-xs break-all mt-2">
                      <strong>Contract:</strong> {collection.contract_address}
                    </div>
                  )}
                  <a
                    href={opensea.getCollectionUrl(collection.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline block mt-2"
                  >
                    View on OpenSea →
                  </a>
                </div>
              </div>
            </div>
          )}

          {!loading && assets.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">
                  Assets ({assets.length})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {assets.map((asset, idx) => (
                    <div key={idx} className="p-2 bg-slate-700 rounded border border-blue-500/20">
                      <div className="text-xs text-white font-semibold">{asset.name}</div>
                      {asset.collection.name && (
                        <div className="text-xs text-gray-400">{asset.collection.name}</div>
                      )}
                      {asset.last_sale && (
                        <div className="text-xs text-gray-300 mt-1">
                          Last Sale: {asset.last_sale.total_price} {asset.last_sale.payment_token.symbol}
                        </div>
                      )}
                      <a
                        href={asset.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline block mt-1"
                      >
                        View NFT →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <a
              href={opensea.getBaseUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              OpenSea →
            </a>
            <a
              href={opensea.getCollectionUrl('smol-brains')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded"
            >
              Smol Brains →
            </a>
          </div>

          <button
            onClick={() => setShowOpenSea(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
