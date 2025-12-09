'use client';

/**
 * Covenant AI Helper Component
 * Uses covenant guardian data for AI agent interactions
 */

import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  CovenantAIClient,
  COVENANT_AI_AGENTS,
  getGuardianAgentId,
} from '@/lib/ai/covenant-ai-frens';
import { COVENANT_DATA } from '@/lib/covenant-data';

export function CovenantAIHelper() {
  const { address, isConnected } = useAccount();
  const [aiClient] = useState(() => {
    if (typeof window !== 'undefined' && address) {
      return new CovenantAIClient({ address });
    }
    return null;
  });

  const [mode, setMode] = useState<'quest' | 'legion' | 'guardian'>('quest');
  const [guardianPath, setGuardianPath] = useState<number>(1);
  const [questId, setQuestId] = useState<string>('');
  const [legionId, setLegionId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  const handleAIRequest = async () => {
    if (!aiClient || !isConnected) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      let result;
      switch (mode) {
        case 'quest':
          if (!questId) {
            alert('Please enter a quest ID');
            return;
          }
          result = await aiClient.getQuestHelp(questId, guardianPath);
          break;

        case 'legion':
          if (!legionId) {
            alert('Please enter a Legion ID');
            return;
          }
          result = await aiClient.getLegionStrategy(legionId, guardianPath);
          break;

        case 'guardian':
          if (!message) {
            alert('Please enter a message');
            return;
          }
          result = await aiClient.chatWithGuardian(guardianPath, message);
          break;
      }

      if (result.error) {
        setResponse(`Error: ${result.error}`);
      } else {
        setResponse(result.response);
      }
    } catch (error: any) {
      console.error('AI request error:', error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedGuardian = COVENANT_DATA.guardians.find(
    (g) => g.path === guardianPath
  );

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-900 to-slate-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Covenant AI Helper</h2>

      {!isConnected && (
        <div className="p-4 bg-yellow-900/50 rounded-lg">
          <p className="text-yellow-200">Connect your wallet to use AI features</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">AI Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="w-full p-2 bg-slate-800 text-white rounded"
          >
            <option value="quest">Quest Helper</option>
            <option value="legion">Legion Strategy</option>
            <option value="guardian">Guardian Chat</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Guardian Path</label>
          <select
            value={guardianPath}
            onChange={(e) => setGuardianPath(Number(e.target.value))}
            className="w-full p-2 bg-slate-800 text-white rounded"
          >
            {COVENANT_DATA.guardians.map((guardian) => (
              <option key={guardian.path} value={guardian.path}>
                Path {guardian.path}: {guardian.hebrew} ({guardian.hebrewLetter})
              </option>
            ))}
          </select>
        </div>

        {selectedGuardian && (
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>{selectedGuardian.hebrew}</strong> ({selectedGuardian.hebrewLetter})
            </p>
            <p className="text-sm text-gray-300">
              Quest Multiplier: {selectedGuardian.questMultiplier}x | Harvester Boost: {selectedGuardian.harvesterBoost}x
            </p>
            <p className="text-sm text-gray-300">
              Agent ID: {getGuardianAgentId(guardianPath)}
            </p>
          </div>
        )}

        {mode === 'quest' && (
          <div>
            <label className="block text-white mb-2">Quest ID</label>
            <input
              type="text"
              value={questId}
              onChange={(e) => setQuestId(e.target.value)}
              placeholder="Enter quest ID"
              className="w-full p-2 bg-slate-800 text-white rounded"
            />
          </div>
        )}

        {mode === 'legion' && (
          <div>
            <label className="block text-white mb-2">Legion ID</label>
            <input
              type="text"
              value={legionId}
              onChange={(e) => setLegionId(e.target.value)}
              placeholder="Enter Legion ID"
              className="w-full p-2 bg-slate-800 text-white rounded"
            />
          </div>
        )}

        {mode === 'guardian' && (
          <div>
            <label className="block text-white mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask the guardian AI..."
              rows={4}
              className="w-full p-2 bg-slate-800 text-white rounded"
            />
          </div>
        )}

        <button
          onClick={handleAIRequest}
          disabled={loading || !isConnected}
          className="w-full p-4 bg-green-800 hover:bg-green-700 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? 'Asking AI...' : 'Ask AI Helper'}
        </button>
      </div>

      {response && (
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-white font-bold mb-2">AI Response</h3>
          <pre className="text-sm text-green-200 whitespace-pre-wrap">
            {response}
          </pre>
        </div>
      )}

      <div className="p-4 bg-slate-800/50 rounded-lg">
        <p className="text-xs text-gray-400">
          <strong>Note:</strong> AI Frens SDK integration pending. Currently showing mock responses.
          Install @treasure_project/aifrens-sdk to enable full AI functionality.
        </p>
      </div>
    </div>
  );
}
