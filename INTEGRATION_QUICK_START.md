# 🚀 Integration Quick Start Guide

## 📋 **Overview**

Quick implementation guides for integrating TreasureProject technologies into bridgeworld-lol.

---

## 1. ⚡ x402 Payment Integration (5 minutes)

### Step 1: Install Dependencies

```bash
npm install x402 x402-next x402-fetch @swader/x402facilitators
```

### Step 2: Create Payment Configuration

**File**: `lib/payments/x402-config.ts`

```typescript
import { auto } from '@swader/x402facilitators';

export const PAYMENT_CONFIG = {
  recipient: process.env.NEXT_PUBLIC_PAYMENT_ADDRESS || '0x...',
  facilitator: auto, // Auto-load-balanced facilitator
  resources: {
    '/api/quest-data': '$0.01',
    '/api/oracle-query': '$0.05',
    '/api/premium-legions': '$0.10',
    '/api/covenant-data': '$0.02',
  },
} as const;
```

### Step 3: Create Payment-Protected API Route

**File**: `app/api/quest-data/route.ts`

```typescript
import { paymentMiddleware } from 'x402-next';
import { PAYMENT_CONFIG } from '@/lib/payments/x402-config';

// Wrap your handler with payment middleware
export const GET = paymentMiddleware(
  PAYMENT_CONFIG.recipient,
  { '/api/quest-data': PAYMENT_CONFIG.resources['/api/quest-data'] },
  PAYMENT_CONFIG.facilitator
)(async (req) => {
  // Your existing quest data logic
  const questData = await getQuestData();
  
  return Response.json(questData);
});
```

### Step 4: Client-Side Payment Handling

**File**: `lib/payments/x402-client.ts`

```typescript
import { x402Fetch } from 'x402-fetch';
import { useAccount } from 'wagmi';

export async function fetchQuestData(questId: string) {
  const { address } = useAccount();
  
  if (!address) {
    throw new Error('Wallet not connected');
  }

  const response = await x402Fetch(`/api/quest-data?questId=${questId}`, {
    account: { address }, // Wagmi account
  });

  return response.json();
}
```

### Step 5: Use in Component

```typescript
'use client';

import { fetchQuestData } from '@/lib/payments/x402-client';

export function QuestComponent({ questId }: { questId: string }) {
  const [data, setData] = useState(null);

  const loadQuest = async () => {
    try {
      const questData = await fetchQuestData(questId);
      setData(questData);
    } catch (error) {
      console.error('Payment or fetch error:', error);
    }
  };

  return (
    <div>
      <button onClick={loadQuest}>Load Quest Data ($0.01)</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

---

## 2. 🌉 Hyperlane Cross-Chain Integration (10 minutes)

### Step 1: Install Dependencies

```bash
npm install @hyperlane-xyz/core @hyperlane-xyz/sdk
```

### Step 2: Create Hyperlane Configuration

**File**: `lib/hyperlane/config.ts`

```typescript
export const HYPERLANE_CONFIG = {
  networks: {
    arbitrum: {
      chainId: 42161,
      name: 'Arbitrum',
    },
    ethereum: {
      chainId: 1,
      name: 'Ethereum',
    },
    treasure: {
      chainId: 61166,
      name: 'Treasure',
    },
  },
  deployments: {
    bridgeworldRouter: {
      arbitrum: {
        address: '0x...', // Your router address
      },
      ethereum: {
        address: '0x...',
      },
    },
  },
} as const;
```

### Step 3: Create Transfer Functions

**File**: `lib/hyperlane/transfers.ts`

```typescript
import { HYPERLANE_CONFIG } from './config';

export async function transferLegion(
  destinationChain: number,
  recipient: string,
  tokenId: number,
  amount: number = 1
) {
  // Pack tokenId and amount: tokenId << 128 | amount
  const packedValue = (BigInt(tokenId) << 128n) | BigInt(amount);

  // Use Hyperlane SDK to transfer
  // Implementation depends on your router setup
  return {
    destinationChain,
    recipient,
    packedValue: packedValue.toString(),
  };
}

export async function transferMagic(
  destinationChain: number,
  recipient: string,
  amount: string
) {
  // ERC20 transfer via Hyperlane
  return {
    destinationChain,
    recipient,
    amount,
  };
}
```

### Step 4: Create Cross-Chain UI Component

**File**: `components/cross-chain-transfer.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { transferLegion } from '@/lib/hyperlane/transfers';

export function CrossChainTransfer({ tokenId }: { tokenId: number }) {
  const { address } = useAccount();
  const [destinationChain, setDestinationChain] = useState(1); // Ethereum
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!address) return;

    setLoading(true);
    try {
      const result = await transferLegion(
        destinationChain,
        address,
        tokenId
      );
      console.log('Transfer initiated:', result);
      // Show success message
    } catch (error) {
      console.error('Transfer failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <select
        value={destinationChain}
        onChange={(e) => setDestinationChain(Number(e.target.value))}
      >
        <option value={1}>Ethereum</option>
        <option value={42161}>Arbitrum</option>
        <option value={61166}>Treasure</option>
      </select>
      <button
        onClick={handleTransfer}
        disabled={loading || !address}
      >
        {loading ? 'Transferring...' : 'Transfer Legion'}
      </button>
    </div>
  );
}
```

---

## 3. 🤖 AI Frens Integration (15 minutes)

### Step 1: Install Dependencies

```bash
npm install @treasure_project/aifrens-sdk
```

### Step 2: Create AI Client

**File**: `lib/ai/frens-client.ts`

```typescript
import { AIFrensClient } from '@treasure_project/aifrens-sdk';
import { useAccount } from 'wagmi';
import { privateKeyToAccount } from 'viem/accounts';

// For server-side usage
export function createAIClient(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return new AIFrensClient(account);
}

// For client-side usage (with Wagmi)
export function useAIClient() {
  const { address, connector } = useAccount();
  
  // Get account from connector
  // Implementation depends on your wallet setup
  return {
    chat: async (agentId: string, message: string) => {
      // Use AI Frens SDK
      // Payment handled automatically via x402
    },
  };
}
```

### Step 3: Create AI Quest Helper Component

**File**: `components/ai-quest-helper.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAIClient } from '@/lib/ai/frens-client';

export function AIQuestHelper({ questId }: { questId: string }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const aiClient = useAIClient();

  const askAI = async () => {
    setLoading(true);
    try {
      const result = await aiClient.chat(
        'bridgeworld-quest-helper',
        `Quest ${questId}: ${message}`
      );
      setResponse(result.response.response || result.response.error);
    } catch (error) {
      setResponse(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AI about this quest..."
      />
      <button onClick={askAI} disabled={loading}>
        {loading ? 'Asking AI...' : 'Ask AI Helper'}
      </button>
      {response && (
        <div className="p-4 bg-gray-100 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
```

---

## 4. 📊 Analytics Dashboard (20 minutes)

### Step 1: Install Dependencies

```bash
npm install @tanstack/react-query recharts
```

### Step 2: Create Analytics API Route

**File**: `app/api/analytics/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch analytics data
  const analytics = {
    totalPayments: 1250,
    totalVolume: '$125.00',
    questCompletions: 890,
    crossChainTransfers: 45,
    dailyStats: [
      { date: '2025-11-10', payments: 120, volume: '$12.00' },
      { date: '2025-11-11', payments: 150, volume: '$15.00' },
      { date: '2025-11-12', payments: 180, volume: '$18.00' },
    ],
  };

  return NextResponse.json(analytics);
}
```

### Step 3: Create Analytics Component

**File**: `components/analytics-dashboard.tsx`

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function AnalyticsDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await fetch('/api/analytics');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <h3>Total Payments</h3>
          <p className="text-2xl font-bold">{data?.totalPayments}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3>Total Volume</h3>
          <p className="text-2xl font-bold">{data?.totalVolume}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <h3>Quest Completions</h3>
          <p className="text-2xl font-bold">{data?.questCompletions}</p>
        </div>
        <div className="p-4 bg-orange-100 rounded">
          <h3>Cross-Chain Transfers</h3>
          <p className="text-2xl font-bold">{data?.crossChainTransfers}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data?.dailyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="payments" stroke="#8884d8" />
            <Line type="monotone" dataKey="volume" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

## 5. 🔧 Environment Variables

**File**: `.env.local`

```env
# Payment Configuration
NEXT_PUBLIC_PAYMENT_ADDRESS=0xYourPaymentAddress

# Hyperlane Configuration
NEXT_PUBLIC_HYPERLANE_ROUTER_ARBITRUM=0x...
NEXT_PUBLIC_HYPERLANE_ROUTER_ETHEREUM=0x...

# AI Frens (server-side only)
AI_FRENS_PRIVATE_KEY=0x...

# WalletConnect (for ConnectKit)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

---

## ✅ **Integration Checklist**

### x402 Payments
- [ ] Install x402 packages
- [ ] Create payment config
- [ ] Add payment middleware to API routes
- [ ] Create client-side payment handler
- [ ] Test payment flow

### Hyperlane Cross-Chain
- [ ] Install Hyperlane packages
- [ ] Configure networks
- [ ] Create transfer functions
- [ ] Add UI components
- [ ] Test cross-chain transfers

### AI Frens
- [ ] Install AI Frens SDK
- [ ] Create AI client
- [ ] Add AI components
- [ ] Test AI interactions

### Analytics
- [ ] Install chart libraries
- [ ] Create analytics API
- [ ] Build dashboard components
- [ ] Add data visualization

---

## 🎯 **Next Steps**

1. **Start with x402 Payments** - Easiest integration, immediate value
2. **Add Cross-Chain Support** - Enhances user experience
3. **Integrate AI Features** - Differentiates your platform
4. **Build Analytics** - Provides insights

---

*Quick start guide for TreasureProject integrations.* 🚀
