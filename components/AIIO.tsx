'use client';

import { useState } from 'react';
import { AIIOIntegration } from '@/lib/ai-io-integration';

const AI_IO_API_KEY = 'io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjQyMDhmNTE1LWI5OTMtNGNiYS04M2MwLTQ4ZDRmODM1YmM4NCIsImV4cCI6NDkxNjc4ODE0NX0.mqEGdpHty7HBuI6QrpYVa81d3YWfF6kvxJk_QSqHifO1iPw8cLiCHw8qeQgZaQ6raGqOCdn5M6tnDSB-LY8t8g';

export default function AIIO() {
  const [showAI, setShowAI] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<'lore' | 'quest' | 'item' | 'npc'>('lore');
  const [context, setContext] = useState('');

  const ai = new AIIOIntegration({ apiKey: AI_IO_API_KEY });

  const generateContent = async () => {
    if (!prompt && !context) return;

    setLoading(true);
    try {
      let result: string;

      if (context) {
        result = await ai.generatePortalContent(contentType, context);
      } else {
        const aiResponse = await ai.generate(prompt);
        result = aiResponse.text;
      }

      setResponse(result);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generatePortalContent = async () => {
    setLoading(true);
    try {
      const result = await ai.generatePortalContent(contentType, context || prompt);
      setResponse(result);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <button
        onClick={() => setShowAI(!showAI)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🤖</span>
        <span>AI.io</span>
      </button>

      {showAI && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-indigo-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-indigo-300 mb-3">
            🤖 AI.io Integration
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-indigo-500 rounded text-white"
              >
                <option value="lore">Lore</option>
                <option value="quest">Quest</option>
                <option value="item">Item</option>
                <option value="npc">NPC</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Context/Prompt</label>
              <textarea
                value={context || prompt}
                onChange={(e) => {
                  if (contentType !== 'lore') {
                    setContext(e.target.value);
                  } else {
                    setPrompt(e.target.value);
                  }
                }}
                placeholder="Enter context or prompt..."
                className="w-full px-3 py-2 bg-slate-800 border border-indigo-500 rounded text-white text-sm"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={generatePortalContent}
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded disabled:opacity-50 text-sm"
              >
                {loading ? 'Generating...' : 'Generate Portal Content'}
              </button>
              <button
                onClick={generateContent}
                disabled={loading || !prompt}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded disabled:opacity-50 text-sm"
              >
                {loading ? 'Generating...' : 'Generate AI'}
              </button>
            </div>

            {response && (
              <div className="mt-4 p-3 bg-slate-800 rounded border border-indigo-500/30">
                <h4 className="font-semibold text-indigo-300 mb-2">AI Response:</h4>
                <div className="text-sm text-gray-300 whitespace-pre-wrap">{response}</div>
              </div>
            )}

            <div className="mt-4 p-3 bg-slate-800 rounded border border-indigo-500/30">
              <h4 className="font-semibold text-indigo-300 mb-2 text-sm">AI.io Features</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Generate portal lore</div>
                <div>• Create quests</div>
                <div>• Design magic items</div>
                <div>• Create NPCs</div>
                <div>• Enhance game content</div>
              </div>
              <a
                href="https://ai.io.net/ai/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:underline mt-2 block"
              >
                Manage API Keys →
              </a>
            </div>
          </div>

          <button
            onClick={() => setShowAI(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
