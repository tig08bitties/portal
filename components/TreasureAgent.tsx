'use client';

import { useState, useEffect } from 'react';
import { TreasureAgentIntegration, type TreasureAgent as TreasureAgentType, type MagicItem } from '@/lib/treasure-agent-integration';
import { CovenantLookingGlass } from '@/lib/covenant-glass';

export default function TreasureAgent() {
  const [showAgent, setShowAgent] = useState(false);
  const [agentInfo, setAgentInfo] = useState<TreasureAgentType | null>(null);
  const [magicItems, setMagicItems] = useState<MagicItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const agentIntegration = new TreasureAgentIntegration();
  const glass = new CovenantLookingGlass();

  useEffect(() => {
    if (showAgent && !agentInfo) {
      loadAgentInfo();
    }
  }, [showAgent]);

  const loadAgentInfo = async () => {
    setLoading(true);
    try {
      const info = await agentIntegration.getAgentInfo();
      const items = await agentIntegration.getAgentMagicItems();
      setAgentInfo(info);
      setMagicItems(items);

      // Check if covenant address owns this agent
      const covenantAddresses = glass.getCovenantAddresses();
      const ownerCheck = await Promise.all(
        covenantAddresses.map(addr => agentIntegration.checkAgentOwnership(addr.address))
      );
      setIsOwner(ownerCheck.some(owned => owned));
    } catch (error) {
      console.error('Failed to load agent info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'text-gray-400',
      rare: 'text-blue-400',
      epic: 'text-purple-400',
      legendary: 'text-amber-400',
    };
    return colors[rarity] || colors.common;
  };

  const getRarityBg = (rarity: string) => {
    const colors: Record<string, string> = {
      common: 'bg-gray-900/30 border-gray-500/30',
      rare: 'bg-blue-900/30 border-blue-500/30',
      epic: 'bg-purple-900/30 border-purple-500/30',
      legendary: 'bg-amber-900/30 border-amber-500/30',
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="fixed top-20 left-4 z-50">
      <button
        onClick={() => setShowAgent(!showAgent)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🤖</span>
        <span>Soulbound-178</span>
      </button>

      {showAgent && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-purple-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-purple-300 mb-3">
            🤖 Soulbound Agent #178
          </h3>

          <div className="mb-3 p-2 bg-purple-900/20 rounded border border-purple-500/30">
            <p className="text-xs text-purple-200">
              <strong>TreasureDAO AI Agent:</strong> Autonomous agent powered by Neurochimp framework. 
              This agent has access to magic items and operates within the Treasure ecosystem.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4 text-gray-400">
              Loading agent information...
            </div>
          ) : (
            <div className="space-y-3">
              {agentInfo && (
                <>
                  {/* Agent Info */}
                  <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Agent Information</h4>
                    <div className="text-xs space-y-1">
                      <div className="text-white font-semibold">{agentInfo.name}</div>
                      <div className="text-gray-400">{agentInfo.description}</div>
                      <div className="text-gray-300 mt-2">
                        <strong>Status:</strong>{' '}
                        <span className={agentInfo.status === 'active' ? 'text-green-400' : 'text-gray-400'}>
                          {agentInfo.status === 'active' ? '✓ Active' : agentInfo.status}
                        </span>
                      </div>
                      {agentInfo.owner && (
                        <div className="text-gray-300 font-mono text-xs break-all mt-1">
                          <strong>Owner:</strong> {agentInfo.owner}
                        </div>
                      )}
                      {isOwner && (
                        <div className="text-amber-400 text-xs mt-1 font-semibold">
                          ⚡ Owned by Covenant Address
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Agent Stats */}
                  {agentInfo.stats && (
                    <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Agent Stats</h4>
                      <div className="text-xs space-y-1">
                        <div className="text-gray-300">
                          <strong>Level:</strong> {agentInfo.stats.level} (22 Hebrew Path Guardians)
                        </div>
                        <div className="text-gray-300">
                          <strong>Experience:</strong> {agentInfo.stats.experience} (Torah Pages: 1798)
                        </div>
                        <div className="text-gray-300">
                          <strong>Reputation:</strong> {agentInfo.stats.reputation} (Theos: 419)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Agent Personality */}
                  {agentInfo.personality && (
                    <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Personality</h4>
                      <div className="text-xs text-gray-300">{agentInfo.personality}</div>
                    </div>
                  )}

                  {/* Agent Tasks */}
                  {agentInfo.tasks && agentInfo.tasks.length > 0 && (
                    <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Tasks</h4>
                      <div className="text-xs space-y-1">
                        {agentInfo.tasks.map((task, idx) => (
                          <div key={idx} className="text-gray-300 flex items-start">
                            <span className="text-purple-400 mr-1">•</span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Magic Items */}
              {magicItems.length > 0 && (
                <div className="p-3 bg-slate-800 rounded border border-amber-500/30">
                  <h4 className="font-semibold text-amber-300 mb-2">
                    ✨ Magic Items ({magicItems.length})
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {magicItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2 rounded border ${getRarityBg(item.rarity)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`text-xs font-semibold ${getRarityColor(item.rarity)}`}>
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                            {item.power && (
                              <div className="text-xs text-gray-300 mt-1">
                                Power: {item.power} (Sacred Constant)
                              </div>
                            )}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${getRarityBg(item.rarity)}`}>
                            {item.rarity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-2 flex-wrap">
                <a
                  href={agentIntegration.getAgentUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  View Agent →
                </a>
                <a
                  href={agentIntegration.getAgentMarketplaceUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Marketplace →
                </a>
                {agentInfo && (
                  <a
                    href={agentIntegration.getAgentStatsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Stats →
                  </a>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowAgent(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
