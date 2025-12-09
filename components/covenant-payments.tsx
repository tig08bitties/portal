'use client';

/**
 * Covenant Payment Component
 * Uses covenant addresses for x402 payments
 */

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchOracleQuery, fetchCovenantData, getPaymentInfo } from '@/lib/payments/covenant-x402-client';
import { COVENANT_DATA } from '@/lib/covenant-data';

export function CovenantPayments() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedResource, setSelectedResource] = useState<string>('');

  const handlePayment = async (resource: string) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);
    setSelectedResource(resource);

    try {
      let data;
      switch (resource) {
        case 'oracle':
          data = await fetchOracleQuery(undefined, undefined, { address });
          break;
        case 'covenant':
          data = await fetchCovenantData('all', undefined, { address });
          break;
        case 'guardians':
          data = await fetchCovenantData('guardians', undefined, { address });
          break;
        default:
          data = await fetchCovenantData('constants', undefined, { address });
      }
      setResult(data);
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const paymentInfo = selectedResource
    ? getPaymentInfo(`/api/${selectedResource}`)
    : null;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-900 to-slate-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Covenant Payments</h2>

      {!isConnected && (
        <div className="p-4 bg-yellow-900/50 rounded-lg">
          <p className="text-yellow-200">Connect your wallet to make payments</p>
        </div>
      )}

      {paymentInfo && (
        <div className="p-4 bg-blue-900/50 rounded-lg">
          <p className="text-sm text-blue-200">
            Payment Recipient: {paymentInfo.recipient}
          </p>
          <p className="text-sm text-blue-200">
            Amount: {paymentInfo.amount}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handlePayment('oracle')}
          disabled={loading || !isConnected}
          className="p-4 bg-purple-800 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
        >
          Query Oracle ($0.000687)
        </button>

        <button
          onClick={() => handlePayment('covenant')}
          disabled={loading || !isConnected}
          className="p-4 bg-purple-800 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
        >
          Get Covenant Data ($0.001798)
        </button>

        <button
          onClick={() => handlePayment('guardians')}
          disabled={loading || !isConnected}
          className="p-4 bg-purple-800 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
        >
          Get Guardians ($0.001798)
        </button>

        <button
          onClick={() => handlePayment('constants')}
          disabled={loading || !isConnected}
          className="p-4 bg-purple-800 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
        >
          Get Constants ($0.001798)
        </button>
      </div>

      {loading && (
        <div className="text-center text-white">
          <p>Processing payment...</p>
        </div>
      )}

      {result && (
        <div className="p-4 bg-slate-800 rounded-lg">
          <pre className="text-xs text-green-200 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
