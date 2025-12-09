'use client';

import { useState } from 'react';
import { TreasureBridgeIntegration } from '@/lib/treasure-bridge-integration';

export default function TreasureBridge() {
  const [showBridge, setShowBridge] = useState(false);
  const [fromChain, setFromChain] = useState('42161'); // Arbitrum
  const [toChain, setToChain] = useState('8453'); // Base
  const [token, setToken] = useState('MAGIC');

  const bridge = new TreasureBridgeIntegration();
  const supportedChains = bridge.getSupportedChains();

  const bridgeUrl = bridge.getBridgeUrl({
    fromChain,
    toChain,
    type: 'tokens',
    token,
  });

  return (
    <div className="fixed bottom-4 right-20 z-50">
      <button
        onClick={() => setShowBridge(!showBridge)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🌉</span>
        <span>Bridge</span>
      </button>

      {showBridge && (
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-slate-900 border-2 border-emerald-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-emerald-300 mb-3">
            🌉 Treasure Bridge
          </h3>

          <div className="mb-3 p-2 bg-emerald-900/20 rounded border border-emerald-500/30">
            <p className="text-xs text-emerald-200">
              <strong>Treasure Bridge:</strong> Cross-chain token bridging for MAGIC and other tokens. 
              Bridge between Arbitrum, Base, Ethereum, and Polygon.
            </p>
          </div>

          <div className="space-y-3">
            {/* From Chain */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">From Chain</label>
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-emerald-500/30 rounded text-white text-sm"
              >
                {supportedChains.map((chain) => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To Chain */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">To Chain</label>
              <select
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-emerald-500/30 rounded text-white text-sm"
              >
                {supportedChains
                  .filter((chain) => chain.id !== fromChain)
                  .map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Token */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Token</label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-emerald-500/30 rounded text-white text-sm"
              >
                <option value="MAGIC">MAGIC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>

            {/* Bridge URL */}
            <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
              <div className="text-xs text-gray-400 mb-1">Bridge URL:</div>
              <div className="text-xs text-emerald-300 font-mono break-all mb-2">
                {bridgeUrl}
              </div>
              <a
                href={bridgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm block text-center"
              >
                Open Bridge →
              </a>
            </div>

            {/* Quick Links */}
            <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
              <h4 className="font-semibold text-emerald-300 mb-2 text-sm">Quick Bridge Links</h4>
              <div className="space-y-2">
                <a
                  href={bridge.getMagicBridgeUrl('42161', '8453')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline block"
                >
                  Arbitrum → Base (MAGIC)
                </a>
                <a
                  href={bridge.getMagicBridgeUrl('42161', '1')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline block"
                >
                  Arbitrum → Ethereum (MAGIC)
                </a>
                <a
                  href={bridge.getMagicBridgeUrl('42161', '137')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline block"
                >
                  Arbitrum → Polygon (MAGIC)
                </a>
              </div>
            </div>

            {/* Supported Chains */}
            <div className="p-3 bg-slate-800 rounded border border-emerald-500/30">
              <h4 className="font-semibold text-emerald-300 mb-2 text-sm">Supported Chains</h4>
              <div className="text-xs text-gray-400 space-y-1">
                {supportedChains.map((chain) => (
                  <div key={chain.id}>
                    • {chain.name} (Chain ID: {chain.chainId})
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBridge(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
