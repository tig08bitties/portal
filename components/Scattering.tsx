'use client';

import { useState, useEffect } from 'react';
import { ScatteringIntegration } from '@/lib/scattering-integration';

export default function Scattering() {
  const [showScattering, setShowScattering] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const scattering = new ScatteringIntegration();

  useEffect(() => {
    if (showScattering) {
      loadScatteringData();
    }
  }, [showScattering]);

  const loadScatteringData = async () => {
    setLoading(true);
    try {
      const integration = await scattering.getBridgeworldIntegration();
      setProjects(integration.projects);
      setAssets(integration.assets);
    } catch (error) {
      console.error('Scattering load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={() => setShowScattering(!showScattering)}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>✨</span>
        <span>Scattering</span>
      </button>

      {showScattering && (
        <div className="absolute bottom-full right-0 mb-2 w-96 bg-slate-900 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">
            ✨ Scattering.io Integration
          </h3>

          {loading ? (
            <div className="text-center py-4">
              <div className="text-gray-400">Loading Scattering data...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-cyan-300 mb-2">Projects</h4>
                {projects.length > 0 ? (
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-3 bg-slate-800 rounded border border-cyan-500/30"
                      >
                        <div className="text-white font-semibold">{project.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{project.description}</div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:underline mt-1 block"
                        >
                          View Project →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No projects found</div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-cyan-300 mb-2">Assets</h4>
                {assets.length > 0 ? (
                  <div className="space-y-2">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="p-3 bg-slate-800 rounded border border-cyan-500/30"
                      >
                        <div className="text-white font-semibold">{asset.name}</div>
                        <div className="text-xs text-gray-400 mt-1">Type: {asset.type}</div>
                        {asset.metadata && (
                          <div className="text-xs text-gray-500 mt-1">
                            {JSON.stringify(asset.metadata)}
                          </div>
                        )}
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:underline mt-1 block"
                        >
                          View Asset →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No assets found</div>
                )}
              </div>

              <div className="mt-4 p-3 bg-slate-800 rounded border border-cyan-500/30">
                <h4 className="font-semibold text-cyan-300 mb-2 text-sm">Scattering.io</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Asset management platform</div>
                  <div>• Project organization</div>
                  <div>• Bridgeworld integration</div>
                </div>
                <a
                  href="https://scattering.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline mt-2 block"
                >
                  Visit Scattering.io →
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowScattering(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
