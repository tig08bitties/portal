'use client';

import { useState, useEffect } from 'react';
import { DeBankIntegration } from '@/lib/debank-integration';

const DEFAULT_ADDRESS = '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea';

export default function DeBank() {
  const [showDeBank, setShowDeBank] = useState(false);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [magicBalance, setMagicBalance] = useState<any>(null);

  const debank = new DeBankIntegration();

  useEffect(() => {
    if (showDeBank && !profile) {
      loadProfile();
    }
  }, [showDeBank]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const profileData = await debank.getProfile(address);
      setProfile(profileData);

      // Load MAGIC balance
      const magic = await debank.getMagicBalance(address);
      setMagicBalance(magic);
    } catch (error) {
      console.error('DeBank load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <button
        onClick={() => setShowDeBank(!showDeBank)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>💼</span>
        <span>DeBank</span>
      </button>

      {showDeBank && (
        <div className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border-2 border-emerald-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-emerald-300 mb-3">
            💼 DeBank Portfolio
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 bg-slate-800 border border-emerald-500 rounded text-white font-mono text-sm"
              />
            </div>

            <button
              onClick={loadProfile}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load Portfolio'}
            </button>

            {loading ? (
              <div className="text-center py-4">
                <div className="text-gray-400">Loading DeBank data...</div>
              </div>
            ) : profile && (
              <div className="space-y-4">
                {/* Portfolio Summary */}
                <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-300 mb-2">Portfolio Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value:</span>
                      <span className="text-white font-semibold">${profile.totalUsdValue.toLocaleString()}</span>
                    </div>
                    {profile.totalDebtValue > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Debt:</span>
                        <span className="text-red-400">${profile.totalDebtValue.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-700 pt-1 mt-1">
                      <span className="text-gray-400">Net Worth:</span>
                      <span className="text-emerald-400 font-bold">${profile.netWorth.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* MAGIC Balance */}
                {magicBalance && (
                  <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">MAGIC Token</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white">{magicBalance.amount.toLocaleString()} MAGIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Value:</span>
                        <span className="text-purple-400">${magicBalance.amountUSD.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-gray-300">${magicBalance.price}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Token List */}
                {profile.tokenList && profile.tokenList.length > 0 && (
                  <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
                    <h4 className="font-semibold text-emerald-300 mb-2">Top Tokens</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {profile.tokenList.slice(0, 5).map((token: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div>
                            <div className="text-white font-semibold">{token.symbol}</div>
                            <div className="text-gray-400">{token.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">${token.amountUSD.toLocaleString()}</div>
                            <div className="text-gray-400">{token.amount.toFixed(4)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Protocol Positions */}
                {profile.protocolList && profile.protocolList.length > 0 && (
                  <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
                    <h4 className="font-semibold text-emerald-300 mb-2">DeFi Protocols</h4>
                    <div className="space-y-2">
                      {profile.protocolList.slice(0, 3).map((protocol: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <div className="text-white font-semibold">{protocol.name}</div>
                          <div className="text-gray-400">{protocol.chain}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DeBank Link */}
                <div className="mt-4 p-3 bg-slate-800 rounded border border-emerald-500/30">
                  <a
                    href={debank.getProfileUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline text-sm block text-center"
                  >
                    View Full Profile on DeBank →
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowDeBank(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
