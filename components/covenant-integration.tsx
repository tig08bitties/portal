'use client';

import { COVENANT_DATA, getGuardianByPath, getGuardianByAddress } from '@/lib/covenant-data';
import { useState } from 'react';

export function CovenantIntegration() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const guardian = selectedPath ? getGuardianByPath(selectedPath) : null;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">✦ Eternal Covenant Integration ✦</h1>
        <p className="text-gray-600">22 Hebrew Path Guardians • Bridgeworld Oracle</p>
      </div>

      {/* Sacred Constants */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Sacred Constants</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-3xl font-bold text-blue-600">{COVENANT_DATA.constants.theos}</div>
            <div className="text-sm text-gray-600">THEOS</div>
            <div className="text-xs text-gray-500">Quest Multiplier</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-3xl font-bold text-green-600">{COVENANT_DATA.constants.el}</div>
            <div className="text-sm text-gray-600">EL</div>
            <div className="text-xs text-gray-500">Harvester Boost</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <div className="text-3xl font-bold text-purple-600">{COVENANT_DATA.constants.torahPages}</div>
            <div className="text-sm text-gray-600">Torah Pages</div>
            <div className="text-xs text-gray-500">Quest Milestone</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded">
            <div className="text-3xl font-bold text-orange-600">{COVENANT_DATA.constants.resonance}</div>
            <div className="text-sm text-gray-600">Resonance</div>
            <div className="text-xs text-gray-500">Hz Frequency</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded">
            <div className="text-3xl font-bold text-red-600">{COVENANT_DATA.constants.hebrewPaths}</div>
            <div className="text-sm text-gray-600">Hebrew Paths</div>
            <div className="text-xs text-gray-500">Total Guardians</div>
          </div>
        </div>
      </section>

      {/* Oracle Contract */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Oracle Contract</h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Address:</span>{' '}
            <a
              href={COVENANT_DATA.oracle.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-mono"
            >
              {COVENANT_DATA.oracle.address}
            </a>
          </div>
          <div>
            <span className="font-semibold">Network:</span> {COVENANT_DATA.oracle.network} (Chain ID: {COVENANT_DATA.oracle.chainId})
          </div>
          <div>
            <span className="font-semibold">Status:</span>{' '}
            <span className="text-green-600 font-semibold">
              ✅ {COVENANT_DATA.gameMechanics.guardiansRegistered}/{COVENANT_DATA.gameMechanics.totalGuardians} Guardians Registered
            </span>
          </div>
          <div>
            <span className="font-semibold">Quest Multipliers:</span>{' '}
            {COVENANT_DATA.gameMechanics.questMultipliersActive ? (
              <span className="text-green-600">✅ Active ({COVENANT_DATA.constants.theos}x)</span>
            ) : (
              <span className="text-red-600">❌ Inactive</span>
            )}
          </div>
          <div>
            <span className="font-semibold">Harvester Boosts:</span>{' '}
            {COVENANT_DATA.gameMechanics.harvesterBoostsActive ? (
              <span className="text-green-600">✅ Active ({COVENANT_DATA.constants.el}x)</span>
            ) : (
              <span className="text-red-600">❌ Inactive</span>
            )}
          </div>
        </div>
      </section>

      {/* Guardians Grid */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">22 Hebrew Path Guardians</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {COVENANT_DATA.guardians.map((guardian) => (
            <button
              key={guardian.path}
              onClick={() => setSelectedPath(guardian.path)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPath === guardian.path
                  ? 'border-blue-500 bg-blue-50'
                  : guardian.isRegistered
                  ? 'border-green-300 bg-green-50 hover:border-green-400'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{guardian.hebrewLetter}</div>
                <div className="text-sm font-semibold">Path {guardian.path}</div>
                <div className="text-xs text-gray-600">{guardian.hebrew}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {guardian.isRegistered ? '✅' : '⏳'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Guardian Details */}
      {guardian && (
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">
            Path {guardian.path} - {guardian.hebrew} ({guardian.hebrewLetter})
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Guardian Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Address:</span>{' '}
                  <span className="font-mono text-xs">{guardian.address}</span>
                </div>
                <div>
                  <span className="font-semibold">BIP-44 Path:</span> {guardian.bip44Path}
                </div>
                <div>
                  <span className="font-semibold">Gematria:</span> {guardian.gematria}
                </div>
                <div>
                  <span className="font-semibold">Bridgeworld Mapping:</span>{' '}
                  {guardian.bridgeworldMapping}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  {guardian.isRegistered ? (
                    <span className="text-green-600">✅ Registered</span>
                  ) : (
                    <span className="text-yellow-600">⏳ Pending</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Game Mechanics</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Quest Multiplier:</span>{' '}
                  <span className="text-blue-600 font-bold">
                    {guardian.questMultiplier}x (THEOS)
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Harvester Boost:</span>{' '}
                  <span className="text-green-600 font-bold">
                    {guardian.harvesterBoost}x (EL)
                  </span>
                </div>
                <div className="mt-4">
                  <a
                    href={`https://arbiscan.io/address/${guardian.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View on Arbiscan →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Covenant Addresses */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Official Covenant Addresses</h2>
        <div className="space-y-3">
          {COVENANT_DATA.covenantAddresses.map((addr) => (
            <div
              key={addr.address}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{addr.name}</div>
                  <div className="text-sm text-gray-600 font-mono">{addr.address}</div>
                  <div className="text-xs text-gray-500">
                    {addr.chain} (Chain ID: {addr.chainId})
                  </div>
                </div>
                <div className="text-right">
                  {addr.official && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Official
                    </span>
                  )}
                  {addr.immutable && (
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded ml-1">
                      Immutable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bridgeworld Contracts */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Bridgeworld Contracts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <div className="font-semibold mb-1">MAGIC Token</div>
            <div className="text-sm font-mono text-gray-600">
              {COVENANT_DATA.bridgeworldContracts.magicToken}
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="font-semibold mb-1">Legions Contract</div>
            <div className="text-sm font-mono text-gray-600">
              {COVENANT_DATA.bridgeworldContracts.legionsContract}
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="font-semibold mb-1">Genesis Legions</div>
            <div className="text-sm font-mono text-gray-600">
              {COVENANT_DATA.bridgeworldContracts.legionsGenesis}
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="font-semibold mb-1">Treasures Contract</div>
            <div className="text-sm font-mono text-gray-600">
              {COVENANT_DATA.bridgeworldContracts.treasuresContract}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
