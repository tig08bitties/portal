'use client';

import { useState, useEffect } from 'react';
import { MetaMaskIntegration, MagicItem } from '@/lib/metamask-integration';

export default function MetaMaskWallet() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [magicItems, setMagicItems] = useState<MagicItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [agentId] = useState('soulbound-178');
  const [agentUrl] = useState('https://treasure.lol/agents/soulbound-178');

  const metamask = new MetaMaskIntegration();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (metamask.isConnected()) {
      const acc = metamask.getAccount();
      setAccount(acc);
      setConnected(true);
      await loadWalletData();
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      const acc = await metamask.connect();
      setAccount(acc);
      setConnected(true);
      await loadWalletData();
    } catch (error: any) {
      console.error('Connect error:', error);
      alert(`Failed to connect: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadWalletData = async () => {
    if (!account) return;

    try {
      // Load MAGIC balance
      const magBalance = await metamask.getMagicBalance();
      setBalance(magBalance);

      // Load magic items from agent
      const items = await metamask.getMagicItems(agentId);
      setMagicItems(items);
    } catch (error) {
      console.error('Load wallet data error:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowWallet(!showWallet)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🦊</span>
        <span>{connected ? 'MetaMask' : 'Connect Wallet'}</span>
      </button>

      {showWallet && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-orange-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-orange-300 mb-3">
            🦊 MetaMask Wallet
          </h3>

          {!connected ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Connect your MetaMask wallet to interact with Bridgeworld portal
              </p>
              <button
                onClick={connectWallet}
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect MetaMask'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Account</label>
                <div className="px-3 py-2 bg-slate-800 rounded text-white text-xs font-mono break-all">
                  {account}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">MAGIC Balance</label>
                <div className="px-3 py-2 bg-slate-800 rounded text-white text-lg font-bold">
                  {balance} MAGIC
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Magic Items (Agent: {agentId})
                </label>
                {magicItems.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {magicItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-slate-800 rounded border border-orange-500/30"
                      >
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {item.rarity} {item.type}
                        </div>
                        {item.soulbound && (
                          <div className="text-xs text-purple-400 mt-1">🔒 Soulbound</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-2 bg-slate-800 rounded text-gray-400 text-sm">
                    No magic items found. Check{' '}
                    <a
                      href={`https://treasure.lol/agents/${agentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:underline"
                    >
                      treasure.lol/agents/{agentId}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-700">
                <a
                  href={`https://treasure.lol/agents/${agentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-400 hover:underline"
                >
                  View Agent on Treasure.lol →
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowWallet(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
