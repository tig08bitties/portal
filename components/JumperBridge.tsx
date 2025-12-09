'use client';

import { useState } from 'react';
import { JumperSDK } from '@/lib/jumper-sdk';

export default function JumperBridge() {
  const [showBridge, setShowBridge] = useState(false);
  const [fromChain, setFromChain] = useState('arbitrum');
  const [toChain, setToChain] = useState('ethereum');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const jumper = new JumperSDK();

  const searchRoutes = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const quote = await jumper.getQuote(fromChain, toChain, 'MAGIC', amount);
      setRoutes([quote]);
    } catch (error) {
      console.error('Route search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <button
        onClick={() => setShowBridge(!showBridge)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🌉</span>
        <span>Jumper Bridge</span>
      </button>

      {showBridge && (
        <div className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border-2 border-green-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-green-300 mb-3">
            🌉 Jumper Exchange Bridge
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Cross-chain bridge for MAGIC tokens
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">From Chain</label>
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-green-500 rounded text-white"
              >
                <option value="arbitrum">Arbitrum</option>
                <option value="ethereum">Ethereum</option>
                <option value="base">Base</option>
                <option value="optimism">Optimism</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">To Chain</label>
              <select
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-green-500 rounded text-white"
              >
                <option value="ethereum">Ethereum</option>
                <option value="arbitrum">Arbitrum</option>
                <option value="base">Base</option>
                <option value="optimism">Optimism</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">MAGIC Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-3 py-2 bg-slate-800 border border-green-500 rounded text-white"
              />
            </div>

            <button
              onClick={searchRoutes}
              disabled={loading || !amount}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Finding Routes...' : 'Find Bridge Routes'}
            </button>

            {routes.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-green-300">Available Routes</h4>
                {routes.map((route, idx) => (
                  <div key={idx} className="bg-slate-800 p-3 rounded border border-green-500/30">
                    <div className="text-sm text-gray-300">
                      <div>Route ID: {route.routeId}</div>
                      <div>Fee: {route.fee} MAGIC</div>
                      <div>Est. Time: {route.estimatedTime}s</div>
                    </div>
                    <button className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm">
                      Bridge Now
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 p-3 bg-slate-800 rounded border border-green-500/30">
              <h4 className="font-semibold text-green-300 mb-2 text-sm">Bridgeworld Routes</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Arbitrum → Ethereum (MAGIC)</div>
                <div>• Ethereum → Arbitrum (MAGIC)</div>
                <div>• Arbitrum → Base (for 402 Pad)</div>
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
