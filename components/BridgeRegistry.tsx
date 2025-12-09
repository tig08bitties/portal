"use client";

import registry from "@/data/bridging-registry.json";

export function BridgeRegistry() {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Bridging Token Registry</h3>
          <p className="text-sm text-gray-300">Sample from Treasure bridging-token-registry (mainnet ERC20 entries).</p>
        </div>
        <span className="text-xs text-gray-400">Hyperlane routes</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {registry.erc20.map((token) => (
          <div key={`${token.name}-${token.destTokenAddress}`} className="border border-slate-700 rounded p-3 bg-slate-900/60">
            <div className="text-white font-semibold">{token.name}</div>
            <div className="text-xs text-gray-300">Method: {token.method}</div>
            <div className="text-xs text-gray-400 mt-1">Src: {token.srcChainId}</div>
            <div className="text-xs text-gray-400">Dest: {token.destChainId}</div>
            <div className="text-xs text-gray-400 mt-1">Src token: {token.srcTokenAddress}</div>
            <div className="text-xs text-gray-400">Dest token: {token.destTokenAddress}</div>
            {token.underlyingTokenAddress && (
              <div className="text-xs text-gray-400 mt-1">Underlying: {token.underlyingTokenAddress}</div>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Collateral: {token.isCollateral ? "Yes" : "No"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
