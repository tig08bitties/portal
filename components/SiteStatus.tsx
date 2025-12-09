'use client';

import { useState, useEffect } from 'react';
import { SiteStatusChecker } from '@/lib/site-status-check';
import { TreasureArchiveIntegration } from '@/lib/treasure-archive-integration';

export default function SiteStatus() {
  const [showStatus, setShowStatus] = useState(false);
  const [checking, setChecking] = useState(false);
  const [siteStatus, setSiteStatus] = useState<any>(null);
  const [archiveInfo, setArchiveInfo] = useState<any>(null);
  const [bridgeworldDevlogs, setBridgeworldDevlogs] = useState<any>(null);

  const checker = new SiteStatusChecker();
  const archive = new TreasureArchiveIntegration();

  useEffect(() => {
    if (showStatus && !siteStatus) {
      checkStatus();
    }
  }, [showStatus]);

  const checkStatus = async () => {
    setChecking(true);
    try {
      // Check bridgeworld.lol
      const status = await checker.checkSiteStatus('https://bridgeworld.lol');
      setSiteStatus(status);

      // Load archive info
      const archives = archive.getArchiveResources();
      const devlog = await archive.getDevlogInfo();
      const bridgeworldDevlogsInfo = await archive.getBridgeworldDevlogsInfo();
      setArchiveInfo({ archives, devlog });
      setBridgeworldDevlogs(bridgeworldDevlogsInfo);
    } catch (error) {
      console.error('Status check error:', error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowStatus(!showStatus)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>🌐</span>
        <span>Site Status</span>
      </button>

      {showStatus && (
        <div className="absolute bottom-full left-0 mb-2 w-96 bg-slate-900 border-2 border-green-500 rounded-lg p-4 shadow-2xl">
          <h3 className="text-xl font-bold text-green-300 mb-3">
            🌐 Site Status Check
          </h3>

          {checking ? (
            <div className="text-center py-4">
              <div className="text-gray-400">Checking site status...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {siteStatus && (
                <div className="p-3 bg-slate-800 rounded border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-white">bridgeworld.lol</div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      siteStatus.status === 'online'
                        ? 'bg-green-600 text-white'
                        : siteStatus.status === 'offline'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {siteStatus.status}
                    </div>
                  </div>
                  {siteStatus.responseTime && (
                    <div className="text-xs text-gray-400">
                      Response: {siteStatus.responseTime}ms
                    </div>
                  )}
                  {siteStatus.title && (
                    <div className="text-sm text-gray-300 mt-2">
                      {siteStatus.title}
                    </div>
                  )}
                </div>
              )}

              {bridgeworldDevlogs && (
                <div className="p-3 bg-slate-800 rounded border border-amber-500/30">
                  <h4 className="font-semibold text-amber-300 mb-2">📚 Bridgeworld Devlogs</h4>
                  <div className="text-sm text-gray-300 mb-2">
                    <div className="font-semibold">{bridgeworldDevlogs.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{bridgeworldDevlogs.description}</div>
                  </div>
                  {bridgeworldDevlogs.entries && bridgeworldDevlogs.entries.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {bridgeworldDevlogs.entries.map((entry: any, idx: number) => (
                        <div key={idx} className="text-xs p-2 bg-slate-700 rounded border border-amber-500/20">
                          <div className="text-white font-semibold">{entry.title}</div>
                          <div className="text-gray-400">{entry.date}</div>
                          {entry.highlights && entry.highlights.length > 0 && (
                            <div className="text-gray-400 mt-1">
                              {entry.highlights.slice(0, 2).join(' • ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <a
                    href={bridgeworldDevlogs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-400 hover:underline block mt-2"
                  >
                    View All Devlogs →
                  </a>
                </div>
              )}

              {archiveInfo && (
                <>
                  <div className="p-3 bg-slate-800 rounded border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">📝 Latest Devlog</h4>
                    <div className="text-sm text-gray-300 mb-2">
                      <div className="font-semibold">{archiveInfo.devlog.title}</div>
                      <div className="text-xs text-gray-400">{archiveInfo.devlog.date}</div>
                    </div>
                    {archiveInfo.devlog.highlights && archiveInfo.devlog.highlights.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {archiveInfo.devlog.highlights.slice(0, 3).join(' • ')}
                      </div>
                    )}
                    <a
                      href={archiveInfo.devlog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:underline block mt-2"
                    >
                      View Devlog →
                    </a>
                  </div>

                  <div className="p-3 bg-slate-800 rounded border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">📦 Archive Resources</h4>
                    <div className="space-y-2">
                      {archiveInfo.archives.map((arch: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <div className="text-white font-semibold">{arch.title}</div>
                          <div className="text-gray-400">{arch.description}</div>
                          <a
                            href={arch.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            Open Archive →
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={checkStatus}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
              >
                Refresh Status
              </button>
            </div>
          )}

          <button
            onClick={() => setShowStatus(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
