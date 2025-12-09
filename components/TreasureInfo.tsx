'use client';

import { useState } from 'react';
import { TREASURE_INFO, getAtlasMineInfo } from '@/lib/treasure-info';

export default function TreasureInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const atlasMineInfo = getAtlasMineInfo();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>ℹ️</span>
        <span>TreasureDAO Info</span>
      </button>

      {showInfo && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl max-h-[600px] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-300 mb-2">
              TreasureDAO Current State
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Updated post-2025 restructuring
            </p>
          </div>

          {/* Atlas Mine Status */}
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <h4 className="font-semibold text-yellow-300 mb-2">Atlas Mine (Discontinued)</h4>
            <p className="text-sm text-gray-300 mb-2">{atlasMineInfo.reason}</p>
            <div className="text-xs text-gray-400 mb-2">
              <div>Contract: <code className="bg-slate-800 px-1 rounded">{atlasMineInfo.contractAddress}</code> ({atlasMineInfo.network})</div>
              <div className="mt-1">
                Repository: <a href={atlasMineInfo.repository} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">treasure-project-contracts</a>
              </div>
              <p className="text-xs text-gray-500 mt-1 italic">{atlasMineInfo.repositoryNote}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-yellow-500/20">
              <p className="text-xs text-yellow-200 font-semibold mb-1">Replaced by:</p>
              <ul className="text-xs text-gray-300 list-disc list-inside">
                {atlasMineInfo.whatReplacedIt?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Current Products */}
          <div className="mb-4">
            <h4 className="font-semibold text-green-300 mb-2">Current Products</h4>
            <div className="space-y-2">
              {TREASURE_INFO.currentProducts.map((product) => (
                <div key={product.name} className="p-2 bg-slate-800 rounded border border-green-500/30">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline font-semibold"
                  >
                    {product.name}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Repositories */}
          <div className="mb-4">
            <h4 className="font-semibold text-purple-300 mb-2">Repositories</h4>
            <div className="space-y-1">
              {TREASURE_INFO.repositories.map((repo) => (
                <div key={repo.name} className="text-sm">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-xs text-gray-400">{repo.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contract Addresses */}
          <div>
            <h4 className="font-semibold text-cyan-300 mb-2">Contract Addresses</h4>
            <div className="space-y-1 text-xs">
              {TREASURE_INFO.contractAddresses.map((contract) => (
                <div key={contract.name} className="flex items-center justify-between p-1 bg-slate-800 rounded">
                  <span className="text-gray-300">{contract.name}:</span>
                  <code className={`px-1 rounded ${contract.status === 'deprecated' ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                    {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowInfo(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
