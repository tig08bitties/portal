"use client";

import { useMemo, useState } from "react";

type LookupType = "address" | "tx" | "token";

const DEFAULT_EXPLORER = process.env.NEXT_PUBLIC_BLOCKSCOUT_BASE_URL || "https://arbiscan.io";

function buildExplorerUrl(kind: LookupType, value: string) {
  const base = DEFAULT_EXPLORER.replace(/\/$/, "");
  if (!value) return base;
  switch (kind) {
    case "address":
      return `${base}/address/${value}`;
    case "tx":
      return `${base}/tx/${value}`;
    case "token":
      return `${base}/token/${value}`;
    default:
      return base;
  }
}

export function ExplorerPanel() {
  const [lookupType, setLookupType] = useState<LookupType>("address");
  const [value, setValue] = useState("");

  const link = useMemo(() => buildExplorerUrl(lookupType, value.trim()), [lookupType, value]);

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">Explorer / Blockscout</h3>
          <p className="text-sm text-gray-300">Build quick links to your preferred explorer (set NEXT_PUBLIC_BLOCKSCOUT_BASE_URL).</p>
        </div>
        <span className="text-xs text-gray-400">Default: {DEFAULT_EXPLORER}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <select
          value={lookupType}
          onChange={(e) => setLookupType(e.target.value as LookupType)}
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
        >
          <option value="address">Address</option>
          <option value="tx">Transaction</option>
          <option value="token">Token</option>
        </select>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0x..."
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white col-span-2"
        />

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-center bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded"
        >
          Open
        </a>
      </div>
    </div>
  );
}
