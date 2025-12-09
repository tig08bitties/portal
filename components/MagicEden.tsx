'use client';

import { useState, useEffect } from 'react';
import { MagicEdenIntegration, MagicEdenCollection } from '@/lib/magic-eden-integration';
import { OpenSeaIntegration } from '@/lib/opensea-integration';

export default function MagicEden() {
  const [showMagicEden, setShowMagicEden] = useState(false);
  const [collection, setCollection] = useState<MagicEdenCollection | null>(null);
  const [loading, setLoading] = useState(false);

  const magicEden = new MagicEdenIntegration();
  const opensea = new OpenSeaIntegration({
    apiKey: '62d4d2a83967477ea11810d0e9d86d5e',
    mcpToken: '042sla6RYQkfK2elP481KNU411YQckRtQGieh9mGpDQQVCoW',
  });

  useEffect(() => {
    if (showMagicEden && !collection) {
      loadCollection();
    }
  }, [showMagicEden]);

  const loadCollection = async () => {
    setLoading(true);
    try {
      const data = await magicEden.getSmolBrainsCollection();
      setCollection(data);
    } catch (error) {
      console.error('Failed to load collection:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 left-20 z-50">
      <button
        onClick={() => setShowMagicEden(!showMagicEden)}
        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🛒</span>
        <span>Magic Eden</span>
      </button>

      {showMagicEden && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-pink-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-pink-300 mb-3">
            🛒 Magic Eden - Smol Brains
          </h3>

          <div className="mb-3 p-2 bg-pink-900/20 rounded border border-pink-500/30">
            <p className="text-xs text-pink-200">
              <strong>Magic Eden:</strong> NFT marketplace. Smol Brains collection is part of 
              the TreasureDAO ecosystem and Smolverse.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-400">
              Loading collection information...
            </div>
          ) : (
            <div className="space-y-3">
              {collection && (
                <>
                  {/* Collection Info */}
                  <div className="p-3 bg-slate-800 rounded border border-pink-500/30">
                    <h4 className="font-semibold text-pink-300 mb-2">Collection</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-white font-semibold">{collection.name}</div>
                      <div className="text-gray-400">{collection.description}</div>
                      <div className="text-gray-300 mt-2">
                        <strong>Symbol:</strong> {collection.symbol}
                      </div>
                      <div className="text-gray-300">
                        <strong>Chain:</strong> {collection.chain}
                      </div>
                      {collection.floorPrice && (
                        <div className="text-gray-300">
                          <strong>Floor Price:</strong> {collection.floorPrice}
                        </div>
                      )}
                      {collection.volume && (
                        <div className="text-gray-300">
                          <strong>Volume:</strong> {collection.volume}
                        </div>
                      )}
                      {collection.owners && (
                        <div className="text-gray-300">
                          <strong>Owners:</strong> {collection.owners.toLocaleString()}
                        </div>
                      )}
                      {collection.items && (
                        <div className="text-gray-300">
                          <strong>Items:</strong> {collection.items.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contract Address */}
                  <div className="p-3 bg-slate-800 rounded border border-pink-500/30">
                    <h4 className="font-semibold text-pink-300 mb-2 text-sm">Contract</h4>
                    <div className="text-xs text-gray-300 font-mono break-all">
                      {collection.contractAddress}
                    </div>
                  </div>
                </>
              )}

              {/* Links */}
              <div className="flex gap-2 flex-wrap">
                <a
                  href={magicEden.getSmolBrainsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded"
                >
                  View Collection →
                </a>
                <a
                  href={magicEden.getMarketplaceUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Magic Eden →
                </a>
                {collection && (
                  <a
                    href={magicEden.getBlockscoutUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Blockscout →
                  </a>
                )}
                {collection && (
                  <a
                    href={opensea.getCollectionUrl('smol-brains')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    OpenSea →
                  </a>
                )}
              </div>

              {/* About Smol Brains */}
              <div className="p-3 bg-slate-800 rounded border border-pink-500/30">
                <h4 className="font-semibold text-pink-300 mb-2 text-sm">About Smol Brains</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Original Smolverse collection</div>
                  <div>• Part of TreasureDAO ecosystem</div>
                  <div>• Used in Smolworld game</div>
                  <div>• Compatible with AI agents</div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowMagicEden(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
