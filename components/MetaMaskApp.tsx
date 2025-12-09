'use client';

import { useState, useEffect } from 'react';
import { MetaMaskAppIntegration } from '@/lib/metamask-app-integration';
import { MetaMaskIntegration } from '@/lib/metamask-integration';

export default function MetaMaskApp() {
  const [showApp, setShowApp] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [installed, setInstalled] = useState(false);

  const metamaskApp = new MetaMaskAppIntegration();
  const metamask = new MetaMaskIntegration();

  useEffect(() => {
    checkConnection();
    checkInstallation();
  }, []);

  const checkConnection = async () => {
    if (metamask.isConnected()) {
      const acc = metamask.getAccount();
      setAddress(acc);
      setConnected(true);
    }
  };

  const checkInstallation = () => {
    setInstalled(metamaskApp.isMetaMaskInstalled());
  };

  const openFeature = (feature: 'portfolio' | 'swaps' | 'bridge' | 'staking' | 'nft' | 'activity') => {
    metamaskApp.openApp(feature, address || undefined);
  };

  const features = metamaskApp.getAvailableFeatures();

  return (
    <div className="fixed top-20 left-20 z-50">
      <button
        onClick={() => setShowApp(!showApp)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🦊</span>
        <span>MetaMask App</span>
      </button>

      {showApp && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900 border-2 border-orange-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-orange-300 mb-3">
            🦊 MetaMask App
          </h3>

          <div className="space-y-3">
            {!installed && (
              <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/30 mb-3">
                <div className="text-sm text-yellow-300 mb-2">MetaMask not detected</div>
                <a
                  href={metamaskApp.getDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-yellow-400 hover:underline"
                >
                  Download MetaMask →
                </a>
              </div>
            )}

            {connected && address && (
              <div className="p-2 bg-slate-800 rounded mb-3">
                <div className="text-xs text-gray-400">Connected</div>
                <div className="text-xs text-white font-mono break-all">{address.slice(0, 10)}...{address.slice(-8)}</div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {features.portfolio && (
                <button
                  onClick={() => openFeature('portfolio')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">💼 Portfolio</div>
                  <div className="text-xs text-gray-400">View assets</div>
                </button>
              )}

              {features.swaps && (
                <button
                  onClick={() => openFeature('swaps')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">🔄 Swaps</div>
                  <div className="text-xs text-gray-400">Swap tokens</div>
                </button>
              )}

              {features.bridge && (
                <button
                  onClick={() => openFeature('bridge')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">🌉 Bridge</div>
                  <div className="text-xs text-gray-400">Cross-chain</div>
                </button>
              )}

              {features.staking && (
                <button
                  onClick={() => openFeature('staking')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">💰 Staking</div>
                  <div className="text-xs text-gray-400">Stake assets</div>
                </button>
              )}

              {features.nft && (
                <button
                  onClick={() => openFeature('nft')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">🖼️ NFTs</div>
                  <div className="text-xs text-gray-400">View NFTs</div>
                </button>
              )}

              {features.activity && (
                <button
                  onClick={() => openFeature('activity')}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-orange-500/30 text-left"
                >
                  <div className="text-white font-semibold text-sm">📊 Activity</div>
                  <div className="text-xs text-gray-400">Transaction history</div>
                </button>
              )}
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2 text-sm">MetaMask App</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Portfolio tracking</div>
                <div>• Token swaps</div>
                <div>• Cross-chain bridge</div>
                <div>• Staking & rewards</div>
              </div>
              <a
                href={metamaskApp.getAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-400 hover:underline mt-2 block"
              >
                Open MetaMask App →
              </a>
            </div>
          </div>

          <button
            onClick={() => setShowApp(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
