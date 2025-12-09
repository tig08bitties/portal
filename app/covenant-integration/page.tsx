'use client';

/**
 * Covenant Integration Page
 * Complete integration of x402 payments, Hyperlane cross-chain, and AI Frens
 * All built on covenant foundation
 */

import { CovenantPayments } from '@/components/covenant-payments';
import { CovenantCrossChain } from '@/components/covenant-cross-chain';
import { CovenantAIHelper } from '@/components/covenant-ai-helper';
import { CovenantAnalytics } from '@/components/covenant-analytics';
import { WalletConnectButton } from '@/components/connectkit-button';

export default function CovenantIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Covenant Foundation Integration
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            x402 Payments • Hyperlane Cross-Chain • AI Frens
          </p>
          <div className="flex justify-center">
            <WalletConnectButton />
          </div>
        </div>

        {/* Integration Sections */}
        <div className="space-y-8">
          {/* Analytics Dashboard */}
          <section>
            <CovenantAnalytics />
          </section>

          {/* Payment Integration */}
          <section>
            <CovenantPayments />
          </section>

          {/* Cross-Chain Integration */}
          <section>
            <CovenantCrossChain />
          </section>

          {/* AI Integration */}
          <section>
            <CovenantAIHelper />
          </section>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-slate-800/50 rounded-lg">
          <h3 className="text-white font-bold mb-4">Integration Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="text-green-400 font-bold">✅ Completed</h4>
              <ul className="text-gray-300 mt-2 space-y-1">
                <li>• Covenant x402 payment configuration</li>
                <li>• Covenant Hyperlane cross-chain setup</li>
                <li>• Payment-protected API routes</li>
                <li>• Cross-chain transfer components</li>
                <li>• AI Frens integration structure</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="text-yellow-400 font-bold">⏳ Pending Installation</h4>
              <ul className="text-gray-300 mt-2 space-y-1">
                <li>• x402 packages (x402-next, x402-fetch)</li>
                <li>• @swader/x402facilitators</li>
                <li>• @hyperlane-xyz/sdk</li>
                <li>• @treasure_project/aifrens-sdk</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-bold">📋 Next Steps</h4>
              <ul className="text-gray-300 mt-2 space-y-1">
                <li>1. Install dependencies</li>
                <li>2. Configure environment variables</li>
                <li>3. Enable payment middleware</li>
                <li>4. Test cross-chain transfers</li>
                <li>5. Activate AI features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
