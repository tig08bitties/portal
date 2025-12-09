'use client';

import { useState } from 'react';

export default function WaybackSearch() {
  const [searchType, setSearchType] = useState<'magic' | 'dnd' | 'diablo2'>('magic');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchWayback = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wayback?type=${searchType}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Wayback search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-20 left-4 z-50">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl w-80">
        <h3 className="text-lg font-bold text-cyan-300 mb-3">
          🔍 Wayback Machine Search
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          Find classic Magic/D&D/Diablo 2 game code
        </p>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as any)}
          className="w-full px-3 py-2 bg-slate-800 border border-cyan-500 rounded text-white mb-2"
        >
          <option value="magic">Magic: The Gathering</option>
          <option value="dnd">Dungeons & Dragons</option>
          <option value="diablo2">Diablo 2 LOD</option>
        </select>

        <button
          onClick={searchWayback}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded disabled:opacity-50 mb-3"
        >
          {loading ? 'Searching...' : 'Search Wayback Machine'}
        </button>

        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <h4 className="font-semibold text-cyan-300 text-sm">
              Found {results.length} archived pages
            </h4>
            {results.slice(0, 5).map((result, idx) => (
              <div key={idx} className="bg-slate-800 p-2 rounded text-xs">
                <a
                  href={`https://web.archive.org/web/${result.timestamp}/${result.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline block truncate"
                >
                  {result.title}
                </a>
                <div className="text-gray-500 text-xs mt-1">
                  {result.timestamp || 'Unknown date'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
