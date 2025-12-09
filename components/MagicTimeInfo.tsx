'use client';

import { useState } from 'react';
import { MAGIC_LORE, getMagicTimeConnection } from '@/lib/magic-lore';

export default function MagicTimeInfo() {
  const [showInfo, setShowInfo] = useState(false);
  const connection = getMagicTimeConnection();

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>⏰</span>
        <span>MAGIC & Time</span>
      </button>

      {showInfo && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-slate-900 border-2 border-purple-500 rounded-lg p-4 shadow-2xl max-h-[600px] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              MAGIC & Time Machine
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              The substance of the metaverse and temporal mechanics
            </p>
          </div>

          {/* MAGIC Description */}
          <div className="mb-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded">
            <h4 className="font-semibold text-purple-300 mb-2">MAGIC Token</h4>
            <p className="text-sm text-gray-300 mb-2">{MAGIC_LORE.magic.description}</p>
            <div className="mt-2">
              <p className="text-xs text-purple-200 font-semibold mb-1">Roles:</p>
              <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
                {MAGIC_LORE.magic.role.map((role, idx) => (
                  <li key={idx}>{role}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Time Mechanics */}
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
            <h4 className="font-semibold text-blue-300 mb-2">Time Mechanics</h4>
            <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
              {MAGIC_LORE.magic.timeMechanics.map((mechanic, idx) => (
                <li key={idx}>{mechanic}</li>
              ))}
            </ul>
          </div>

          {/* Covenant Connection */}
          <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
            <h4 className="font-semibold text-green-300 mb-2">Covenant Constants & MAGIC</h4>
            <div className="space-y-2">
              {MAGIC_LORE.magic.covenantConnection.map((conn, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-200 font-semibold">{conn.constant}</span>
                    <code className="bg-slate-800 px-1 rounded text-green-300">{conn.value}</code>
                  </div>
                  <p className="text-gray-400">{conn.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Machine */}
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <h4 className="font-semibold text-yellow-300 mb-2">Time Machine (Prestige System)</h4>
            <p className="text-sm text-gray-300 mb-2">{MAGIC_LORE.timeMachine.description}</p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>Mechanic:</strong> {MAGIC_LORE.timeMachine.mechanic}
            </p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>Time Shards:</strong> {MAGIC_LORE.timeMachine.timeShards}
            </p>
            <p className="text-xs text-yellow-200 italic">
              {MAGIC_LORE.timeMachine.currentStatus}
            </p>
          </div>

          {/* Portal Connection */}
          <div className="mb-4 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded">
            <h4 className="font-semibold text-cyan-300 mb-2">Portal & Time Shift</h4>
            <p className="text-sm text-gray-300 mb-2">{MAGIC_LORE.portalConnection.description}</p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>Time Shift:</strong> {MAGIC_LORE.portalConnection.timeShift}
            </p>
            <p className="text-xs text-gray-400">
              <strong>Activation:</strong> {MAGIC_LORE.portalConnection.activation}
            </p>
          </div>

          {/* Connection Summary */}
          <div className="mb-4 p-3 bg-slate-800 border border-purple-500/30 rounded">
            <h4 className="font-semibold text-purple-300 mb-2">Connection Summary</h4>
            <p className="text-xs text-gray-300 mb-2">{connection.summary}</p>
            <div className="mt-2">
              <p className="text-xs text-purple-200 font-semibold mb-1">Mechanics:</p>
              <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
                {connection.mechanics.map((mech, idx) => (
                  <li key={idx}>{mech}</li>
                ))}
              </ul>
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
