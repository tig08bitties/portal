'use client';

import { useState, useEffect } from 'react';
import { MetaMaskToolCollection } from '@/lib/metamask-tool-collection';
import { MetaMaskIntegration } from '@/lib/metamask-integration';

export default function GuardianBots() {
  const [showBots, setShowBots] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [collectionStatus, setCollectionStatus] = useState<any>(null);
  const [guardians, setGuardians] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);

  const metamask = new MetaMaskIntegration();
  const toolCollection = new MetaMaskToolCollection();

  useEffect(() => {
    checkConnection();
    loadStatus();
  }, []);

  const checkConnection = async () => {
    if (metamask.isConnected()) {
      const acc = metamask.getAccount();
      setWalletAddress(acc);
      setConnected(true);
    }
  };

  const loadStatus = () => {
    const status = toolCollection.getStatus();
    const guardiansList = toolCollection.getGuardians();
    const toolsList = toolCollection.getTools();
    
    setCollectionStatus(status);
    setGuardians(guardiansList);
    setTools(toolsList);
  };

  const connectAndSetup = async () => {
    setLoading(true);
    try {
      // Connect MetaMask
      const account = await metamask.connect();
      setWalletAddress(account);
      setConnected(true);

      // Setup all 22 bots
      const result = await toolCollection.setupAllBots(account);
      
      // Reload status
      loadStatus();

      alert(`✅ Setup Complete!\nActivated: ${result.activated}\nCollected: ${result.collected}\nDeployed: ${result.deployed}`);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const collectAllTools = async () => {
    if (!connected) {
      alert('Please connect MetaMask first');
      return;
    }

    setLoading(true);
    try {
      const results = await toolCollection.collectAllTools();
      const successCount = results.filter(r => r.success).length;
      loadStatus();
      alert(`Collected ${successCount}/22 tools`);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowBots(!showBots)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🤖</span>
        <span>22 Guardians</span>
      </button>

      {showBots && (
        <div className="absolute bottom-full right-0 mb-2 w-[600px] max-h-[80vh] overflow-y-auto bg-slate-900 border-2 border-purple-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-purple-300 mb-3">
            🤖 22 Guardian Bots System
          </h3>

          {collectionStatus && (
            <div className="mb-4 p-3 bg-slate-800 rounded border border-purple-500/30">
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div>
                  <div className="text-gray-400">Total</div>
                  <div className="text-white font-bold">{collectionStatus.total}</div>
                </div>
                <div>
                  <div className="text-gray-400">Active</div>
                  <div className="text-green-400 font-bold">{collectionStatus.active}</div>
                </div>
                <div>
                  <div className="text-gray-400">Collected</div>
                  <div className="text-blue-400 font-bold">{collectionStatus.collected}</div>
                </div>
                <div>
                  <div className="text-gray-400">Deployed</div>
                  <div className="text-purple-400 font-bold">{collectionStatus.deployed}</div>
                </div>
              </div>
            </div>
          )}

          {!connected ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Connect MetaMask to collect tools and activate all 22 guardian bots
              </p>
              <button
                onClick={connectAndSetup}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Setting up...' : 'Connect & Setup All Bots'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                <div>Wallet: <span className="font-mono text-xs">{walletAddress?.slice(0, 10)}...{walletAddress?.slice(-8)}</span></div>
              </div>

              <button
                onClick={collectAllTools}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Collecting...' : 'Collect All Tools'}
              </button>

              <div className="mt-4 max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-purple-300 mb-2">Guardian Bots:</h4>
                <div className="space-y-2">
                  {guardians.map((guardian) => {
                    const tool = tools.find(t => t.guardianId === guardian.id);
                    return (
                      <div
                        key={guardian.id}
                        className={`p-2 rounded border text-xs ${
                          guardian.status === 'deployed'
                            ? 'bg-green-900/30 border-green-500'
                            : guardian.status === 'active'
                            ? 'bg-blue-900/30 border-blue-500'
                            : 'bg-slate-800 border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-white">
                              {guardian.id}. {guardian.name} ({guardian.hebrewName})
                            </div>
                            <div className="text-gray-400">{guardian.path}</div>
                            <div className="text-purple-300 mt-1">
                              🔧 {guardian.tool} - {guardian.function}
                            </div>
                            {tool?.collected && (
                              <div className="text-green-400 mt-1">✅ Tool Collected</div>
                            )}
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            guardian.status === 'deployed'
                              ? 'bg-green-600 text-white'
                              : guardian.status === 'active'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-600 text-gray-300'
                          }`}>
                            {guardian.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowBots(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
