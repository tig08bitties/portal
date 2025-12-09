'use client';

/**
 * Covenant Analytics Dashboard
 * Tracks covenant-based transactions and payments
 */

import { useQuery } from '@tanstack/react-query';
import { COVENANT_DATA } from '@/lib/covenant-data';
import { COVENANT_PAYMENT_CONFIG } from '@/lib/payments/covenant-x402-config';

export function CovenantAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['covenant-analytics'],
    queryFn: async () => {
      // TODO: Fetch real analytics data from API
      // For now, return mock data based on covenant constants
      return {
        totalPayments: COVENANT_DATA.constants.hebrewPaths * 100, // 22 * 100
        totalVolume: `$${(COVENANT_DATA.constants.torahPages / 1000).toFixed(3)}`, // Based on TORAH_PAGES
        oracleQueries: COVENANT_DATA.constants.resonance, // 687
        guardianAccess: COVENANT_DATA.guardians.filter((g) => g.isRegistered).length,
        crossChainTransfers: COVENANT_DATA.constants.el, // 369
        dailyStats: [
          {
            date: '2025-11-10',
            payments: COVENANT_DATA.constants.theos, // 419
            volume: `$${(COVENANT_DATA.constants.theos / 10000).toFixed(4)}`,
            oracleQueries: COVENANT_DATA.constants.resonance,
          },
          {
            date: '2025-11-11',
            payments: COVENANT_DATA.constants.el, // 369
            volume: `$${(COVENANT_DATA.constants.el / 10000).toFixed(4)}`,
            oracleQueries: COVENANT_DATA.constants.resonance,
          },
          {
            date: '2025-11-12',
            payments: COVENANT_DATA.constants.torahPages / 10, // 179
            volume: `$${(COVENANT_DATA.constants.torahPages / 100000).toFixed(4)}`,
            oracleQueries: COVENANT_DATA.constants.resonance,
          },
        ],
        guardianStats: COVENANT_DATA.guardians.map((guardian) => ({
          path: guardian.path,
          hebrew: guardian.hebrew,
          accessCount: guardian.gematria * 10,
          paymentsReceived: guardian.questMultiplier || 0,
        })),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-lg">
        <p className="text-white">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Covenant Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-900/50 rounded-lg">
          <h3 className="text-sm text-blue-200">Total Payments</h3>
          <p className="text-2xl font-bold text-white">{analytics?.totalPayments}</p>
        </div>

        <div className="p-4 bg-green-900/50 rounded-lg">
          <h3 className="text-sm text-green-200">Total Volume</h3>
          <p className="text-2xl font-bold text-white">{analytics?.totalVolume}</p>
        </div>

        <div className="p-4 bg-purple-900/50 rounded-lg">
          <h3 className="text-sm text-purple-200">Oracle Queries</h3>
          <p className="text-2xl font-bold text-white">{analytics?.oracleQueries}</p>
        </div>

        <div className="p-4 bg-orange-900/50 rounded-lg">
          <h3 className="text-sm text-orange-200">Cross-Chain Transfers</h3>
          <p className="text-2xl font-bold text-white">{analytics?.crossChainTransfers}</p>
        </div>
      </div>

      {/* Payment Recipients */}
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-white font-bold mb-2">Payment Recipients</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Primary (Arbitrum)</span>
            <span className="text-green-200 font-mono text-xs">
              {COVENANT_PAYMENT_CONFIG.primaryRecipient.slice(0, 10)}...
            </span>
          </div>
          {COVENANT_DATA.covenantAddresses.map((addr) => (
            <div key={addr.address} className="flex justify-between text-sm">
              <span className="text-gray-300">{addr.name}</span>
              <span className="text-green-200 font-mono text-xs">
                {addr.address.slice(0, 10)}...
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Guardian Stats */}
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-white font-bold mb-2">Guardian Access Stats</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {analytics?.guardianStats.map((stat) => (
            <div key={stat.path} className="flex justify-between text-sm">
              <span className="text-gray-300">
                Path {stat.path}: {stat.hebrew}
              </span>
              <span className="text-blue-200">{stat.accessCount} accesses</span>
            </div>
          ))}
        </div>
      </div>

      {/* Covenant Constants Reference */}
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-white font-bold mb-2">Covenant Constants</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-300">THEOS:</span>
            <span className="text-white ml-2">{COVENANT_DATA.constants.theos}</span>
          </div>
          <div>
            <span className="text-gray-300">EL:</span>
            <span className="text-white ml-2">{COVENANT_DATA.constants.el}</span>
          </div>
          <div>
            <span className="text-gray-300">TORAH_PAGES:</span>
            <span className="text-white ml-2">{COVENANT_DATA.constants.torahPages}</span>
          </div>
          <div>
            <span className="text-gray-300">RESONANCE:</span>
            <span className="text-white ml-2">{COVENANT_DATA.constants.resonance} Hz</span>
          </div>
          <div>
            <span className="text-gray-300">HEBREW_PATHS:</span>
            <span className="text-white ml-2">{COVENANT_DATA.constants.hebrewPaths}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
