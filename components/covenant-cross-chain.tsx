'use client';

/**
 * Covenant Cross-Chain Transfer Component
 * Uses covenant contracts and addresses for Hyperlane transfers
 */

import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  transferLegionCrossChain,
  transferMagicCrossChain,
  transferOracleDataCrossChain,
  getAvailableChains,
} from '@/lib/hyperlane/covenant-transfers';
import { COVENANT_DATA } from '@/lib/covenant-data';

export function CovenantCrossChain() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [transferType, setTransferType] = useState<'legion' | 'magic' | 'oracle'>('legion');
  const [destinationChain, setDestinationChain] = useState<'arbitrum' | 'ethereum' | 'polygon'>('ethereum');
  const [tokenId, setTokenId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [guardianPath, setGuardianPath] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const availableChains = getAvailableChains();

  const handleTransfer = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);

    try {
      let transferResult;
      switch (transferType) {
        case 'legion':
          if (!tokenId) {
            alert('Please enter a token ID');
            return;
          }
          transferResult = await transferLegionCrossChain(
            destinationChain,
            address,
            Number(tokenId),
            1
          );
          break;

        case 'magic':
          if (!amount) {
            alert('Please enter an amount');
            return;
          }
          transferResult = await transferMagicCrossChain(
            destinationChain,
            address,
            amount
          );
          break;

        case 'oracle':
          if (!guardianPath) {
            alert('Please select a guardian path');
            return;
          }
          transferResult = await transferOracleDataCrossChain(
            destinationChain,
            Number(guardianPath)
          );
          break;
      }
      setResult(transferResult);
    } catch (error: any) {
      console.error('Transfer error:', error);
      alert(`Transfer failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Covenant Cross-Chain Transfers</h2>

      {!isConnected && (
        <div className="p-4 bg-yellow-900/50 rounded-lg">
          <p className="text-yellow-200">Connect your wallet to transfer assets</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">Transfer Type</label>
          <select
            value={transferType}
            onChange={(e) => setTransferType(e.target.value as any)}
            className="w-full p-2 bg-slate-800 text-white rounded"
          >
            <option value="legion">Legion (ERC1155)</option>
            <option value="magic">MAGIC Token</option>
            <option value="oracle">Oracle Data</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Destination Chain</label>
          <select
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value as any)}
            className="w-full p-2 bg-slate-800 text-white rounded"
          >
            {availableChains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name} (Chain ID: {chain.chainId})
                {chain.hasCovenantAddress ? ' ✓' : ''}
              </option>
            ))}
          </select>
        </div>

        {transferType === 'legion' && (
          <div>
            <label className="block text-white mb-2">Legion Token ID</label>
            <input
              type="number"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter token ID"
              className="w-full p-2 bg-slate-800 text-white rounded"
            />
          </div>
        )}

        {transferType === 'magic' && (
          <div>
            <label className="block text-white mb-2">MAGIC Amount (wei)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in wei"
              className="w-full p-2 bg-slate-800 text-white rounded"
            />
          </div>
        )}

        {transferType === 'oracle' && (
          <div>
            <label className="block text-white mb-2">Guardian Path</label>
            <select
              value={guardianPath}
              onChange={(e) => setGuardianPath(e.target.value)}
              className="w-full p-2 bg-slate-800 text-white rounded"
            >
              <option value="">Select Guardian</option>
              {COVENANT_DATA.guardians.map((guardian) => (
                <option key={guardian.path} value={guardian.path}>
                  Path {guardian.path}: {guardian.hebrew} ({guardian.hebrewLetter})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleTransfer}
          disabled={loading || !isConnected}
          className="w-full p-4 bg-blue-800 hover:bg-blue-700 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? 'Transferring...' : 'Initiate Cross-Chain Transfer'}
        </button>
      </div>

      {result && (
        <div className="p-4 bg-slate-800 rounded-lg">
          <h3 className="text-white font-bold mb-2">Transfer Result</h3>
          <pre className="text-xs text-green-200 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="p-4 bg-slate-800/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong>Covenant Router:</strong> {COVENANT_DATA.covenantAddresses.find(
            (addr) => addr.chain === 'arbitrum' && addr.official
          )?.address || COVENANT_DATA.oracle.deployer}
        </p>
        <p className="text-sm text-gray-300">
          <strong>Oracle Contract:</strong> {COVENANT_DATA.oracle.address}
        </p>
      </div>
    </div>
  );
}
