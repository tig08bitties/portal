"use client";

import { useState } from "react";

type TreasureData = {
  network: string;
  status: string;
  notes: string;
};

const SAMPLE_DATA: TreasureData[] = [
  {
    network: "treasure",
    status: "online",
    notes: "Sample pulled from Treasure node placeholder; configure NEXT_PUBLIC_TREASURE_NODE_API for live data.",
  },
  {
    network: "arb1",
    status: "online",
    notes: "Bridgeworld endpoints ready for integration.",
  },
];

export function TreasureDataPanel() {
  const [api] = useState(process.env.NEXT_PUBLIC_TREASURE_NODE_API || "(not set)");

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Treasure Data (TDK/Node)</h3>
          <p className="text-sm text-gray-300">Stub pointing to Treasure Node; wire real endpoints when available.</p>
        </div>
        <span className="text-xs text-gray-400">API: {api}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {SAMPLE_DATA.map((row) => (
          <div key={row.network} className="border border-slate-700 rounded p-3 bg-slate-900/60">
            <div className="flex items-center justify-between text-white text-sm font-semibold">
              <span>{row.network}</span>
              <span className={row.status === "online" ? "text-emerald-300 text-xs" : "text-orange-300 text-xs"}>{row.status}</span>
            </div>
            <div className="mt-1 text-xs text-gray-400">{row.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
