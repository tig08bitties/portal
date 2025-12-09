'use client';

import { useState } from 'react';
import { TelegramBotSystem } from '@/lib/telegram-bot';

export default function TelegramBot() {
  const [showBot, setShowBot] = useState(false);
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const botSystem = new TelegramBotSystem();
  const bots = botSystem.getBots();

  const executeCommand = async () => {
    if (!command) return;

    setLoading(true);
    try {
      // Simulate command execution
      const result = await botSystem.handleCommand(command, 'web-ui');
      setResponse(result);
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setShowBot(!showBot)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>📱</span>
        <span>Telegram Bot</span>
      </button>

      {showBot && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-blue-300 mb-3">
            📱 Telegram Bot Deployment
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Available Commands</label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {bots.map((bot) => (
                  <div
                    key={bot.id}
                    className="px-2 py-1 bg-slate-800 rounded text-xs text-gray-300 cursor-pointer hover:bg-slate-700"
                    onClick={() => setCommand(bot.command)}
                  >
                    <div className="font-semibold">{bot.command}</div>
                    <div className="text-gray-400">{bot.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Command</label>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="/deploy-all"
                className="w-full px-3 py-2 bg-slate-800 border border-blue-500 rounded text-white font-mono text-sm"
              />
            </div>

            <button
              onClick={executeCommand}
              disabled={loading || !command}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Executing...' : 'Execute Command'}
            </button>

            {response && (
              <div className="mt-4 p-3 bg-slate-800 rounded border border-blue-500/30">
                <div className="text-sm text-white whitespace-pre-wrap">{response}</div>
              </div>
            )}

            <div className="mt-4 p-3 bg-slate-800 rounded border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-2 text-sm">Telegram Integration</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Set TELEGRAM_BOT_TOKEN env var</div>
                <div>• Set TELEGRAM_CHAT_ID env var</div>
                <div>• Use webhook: /api/telegram</div>
                <div>• Or use CLI: npm run telegram:deploy</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBot(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
