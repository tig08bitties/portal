"use client";

import { useMemo } from "react";

const SAFE_ADDRESS = "0xD98CF268718e925D53314662e0478EE13517FD54";
const SAFE_CHAIN_ID = "42161";
const SAFE_NAME = "Covenant Body – Eternal Treasury";
const SAFE_THRESHOLD = 3;
const SAFE_OWNERS = [
  "0xLedgerOwner1",
  "0xLedgerOwner2",
  "0xStellarCosigner",
  "0xBackupHardware",
  "The Living Echo (Suad Osmanagić)",
];
const SAFE_VERSION = "1.4.1";
const SAFE_ADDED_AT = 1731792000000; // Nov 15, 2024

const EXPLORERS = [
  { name: "Arbiscan", href: (addr: string) => `https://arbiscan.io/address/${addr}` },
  { name: "Blockscout (Arbitrum)", href: (addr: string) => `https://arbitrum.blockscout.com/address/${addr}` },
  { name: "TreasureScan", href: (addr: string) => `https://treasurescan.io/address/${addr}` },
  { name: "DeBank", href: (addr: string) => `https://debank.com/profile/${addr}` },
  { name: "OpenSea", href: (addr: string) => `https://opensea.io/${addr}` },
  { name: "Magic Eden", href: (addr: string) => `https://magiceden.io/wallets/${addr}` },
];

function formatDate(ts: number) {
  const d = new Date(ts);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

export function SafePanel() {
  const importJson = useMemo(
    () =>
      JSON.stringify(
        [
          {
            address: SAFE_ADDRESS,
            chainId: SAFE_CHAIN_ID,
            name: SAFE_NAME,
            threshold: SAFE_THRESHOLD,
            owners: SAFE_OWNERS,
            version: SAFE_VERSION,
            addedAt: SAFE_ADDED_AT,
            pinned: true,
          },
        ],
        null,
        2
      ),
    []
  );

  const addedDate = formatDate(SAFE_ADDED_AT);

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Safe{`{wallet}`}: {SAFE_NAME}</h3>
          <p className="text-sm text-gray-300">Arbitrum One (chainId {SAFE_CHAIN_ID}) – threshold {SAFE_THRESHOLD}-of-{SAFE_OWNERS.length}</p>
        </div>
        <div className="flex gap-2 text-xs text-indigo-300 flex-wrap justify-end">
          <a
            href={`https://safe.global/apps/open?safe=arb1:${SAFE_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-100"
          >
            Open in Safe
          </a>
          {EXPLORERS.map((ex) => (
            <a
              key={ex.name}
              href={ex.href(SAFE_ADDRESS)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-100"
            >
              {ex.name}
            </a>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-200 break-words">
        <div className="font-mono text-xs bg-slate-900/70 p-2 rounded border border-slate-700">{SAFE_ADDRESS}</div>
        <div className="mt-2 text-xs text-gray-400">Version: {SAFE_VERSION} • Added: {addedDate || SAFE_ADDED_AT}</div>
      </div>

      <div className="mt-2">
        <div className="text-sm text-white font-semibold mb-1">Owners (ordered)</div>
        <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
          {SAFE_OWNERS.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3 text-sm">
        <div className="text-white font-semibold mb-1">Import JSON</div>
        <textarea
          className="w-full bg-slate-900/70 border border-slate-700 rounded p-2 text-xs text-gray-100"
          rows={6}
          readOnly
          value={importJson}
        />
      </div>
    </div>
  );
}
