"use client";

import multisigs from "@/data/dao-multisigs.json";

type Multisig = {
  name: string;
  network: string;
  address: string;
  explorer: string;
};

export function MultisigList() {
  const items = multisigs as Multisig[];
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">DAO Multisigs</h3>
          <p className="text-sm text-gray-300">From Treasure dao-multisigs; grouped by network.</p>
        </div>
        <span className="text-xs text-gray-400">{items.length} entries</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((m) => (
          <div key={`${m.network}-${m.address}`} className="border border-slate-700 rounded p-3 bg-slate-900/60">
            <div className="flex items-center justify-between text-white text-sm font-semibold">
              <span>{m.name}</span>
              <span className="text-xs text-amber-300">{m.network}</span>
            </div>
            <div className="mt-1 text-xs text-gray-400 break-words">{m.address}</div>
            <div className="mt-2 text-xs">
              <a className="text-indigo-300 hover:text-indigo-200" href={m.explorer} target="_blank" rel="noreferrer">
                Open explorer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
