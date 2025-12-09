'use client';

import { useState, useEffect } from 'react';
import { TreasureArchiveIntegration } from '@/lib/treasure-archive-integration';

export default function BridgeworldDevlogs() {
  const [showDevlogs, setShowDevlogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devlogsInfo, setDevlogsInfo] = useState<any>(null);

  const archive = new TreasureArchiveIntegration();

  useEffect(() => {
    if (showDevlogs && !devlogsInfo) {
      loadDevlogs();
    }
  }, [showDevlogs]);

  const loadDevlogs = async () => {
    setLoading(true);
    try {
      const info = await archive.getBridgeworldDevlogsInfo();
      setDevlogsInfo(info);
    } catch (error) {
      console.error('Failed to load devlogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDevlogs(!showDevlogs)}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>📚</span>
        <span>Devlogs</span>
      </button>

      {showDevlogs && (
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-slate-900 border-2 border-amber-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-amber-300 mb-3">
            📚 Bridgeworld Devlogs
          </h3>

          {loading ? (
            <div className="text-center py-4">
              <div className="text-gray-400">Loading devlogs...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {devlogsInfo && (
                <>
                  <div className="p-3 bg-slate-800 rounded border border-amber-500/30">
                    <div className="text-sm text-gray-300 mb-2">
                      <div className="font-semibold text-white">{devlogsInfo.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{devlogsInfo.description}</div>
                    </div>
                    <a
                      href={devlogsInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-400 hover:underline block mt-2"
                    >
                      Open Devlogs Page →
                    </a>
                  </div>

                  {devlogsInfo.entries && devlogsInfo.entries.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-300 text-sm">Recent Entries</h4>
                      {devlogsInfo.entries.map((entry: any, idx: number) => (
                        <div key={idx} className="p-3 bg-slate-800 rounded border border-amber-500/20">
                          <div className="text-white font-semibold text-sm">{entry.title}</div>
                          <div className="text-gray-400 text-xs mt-1">{entry.date}</div>
                          {entry.highlights && entry.highlights.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {entry.highlights.map((highlight: string, hIdx: number) => (
                                <div key={hIdx} className="text-xs text-gray-300 flex items-start">
                                  <span className="text-amber-400 mr-1">•</span>
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {entry.url && (
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-amber-400 hover:underline block mt-2"
                            >
                              Read More →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="p-3 bg-slate-800 rounded border border-amber-500/30">
                <h4 className="font-semibold text-amber-300 mb-2 text-sm">About Bridgeworld Devlogs</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Development updates and roadmap</div>
                  <div>• Feature announcements</div>
                  <div>• Game mechanics explanations</div>
                  <div>• Community insights</div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowDevlogs(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
