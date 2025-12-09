"use client";

import { useState } from "react";

const DEFAULT_ROUTER = process.env.NEXT_PUBLIC_MAGICSAP_ROUTER || "";

export function MagicSwapWidget() {
  const [router, setRouter] = useState(DEFAULT_ROUTER);
  const [tokenIn, setTokenIn] = useState("0x");
  const [tokenOut, setTokenOut] = useState("0x");
  const [amount, setAmount] = useState("1");
  const [message, setMessage] = useState("Ready");

  const simulate = () => {
    if (!router || !tokenIn || !tokenOut) {
      setMessage("Provide router, tokenIn, and tokenOut");
      return;
    }
    setMessage(`Swap simulated: ${amount} of ${tokenIn} -> ${tokenOut} via ${router}`);
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 shadow space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">MagicSwap v2 (stub)</h3>
          <p className="text-sm text-gray-300">Enter router and token addresses; call the real router once configured.</p>
        </div>
        <span className="text-xs text-gray-400">Chain: Arbitrum (override as needed)</span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <input
          value={router}
          onChange={(e) => setRouter(e.target.value)}
          placeholder="Router address"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
        />
        <input
          value={tokenIn}
          onChange={(e) => setTokenIn(e.target.value)}
          placeholder="Token In address"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
        />
        <input
          value={tokenOut}
          onChange={(e) => setTokenOut(e.target.value)}
          placeholder="Token Out address"
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={simulate}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Simulate Swap
        </button>
        <span className="text-xs text-gray-300">Set NEXT_PUBLIC_MAGICSAP_ROUTER for defaults</span>
      </div>
      <div className="text-sm text-amber-200">{message}</div>
    </div>
  );
}
