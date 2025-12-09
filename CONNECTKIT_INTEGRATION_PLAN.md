# 🔌 ConnectKit Integration Plan

## 📋 **Overview**

Integrate ConnectKit (from TreasureProject web3-starter-template) into bridgeworld-lol to add multi-wallet support while keeping Next.js structure.

---

## 🎯 **Goals**

1. ✅ Add ConnectKit for better wallet support
2. ✅ Support multiple wallets (MetaMask, WalletConnect, Coinbase, etc.)
3. ✅ Keep existing Next.js structure
4. ✅ Maintain backward compatibility with current MetaMask integration
5. ✅ Use Wagmi hooks for cleaner Web3 code

---

## 📦 **Dependencies to Add**

```bash
npm install connectkit wagmi viem @tanstack/react-query
```

**New Dependencies**:
- `connectkit`: ^1.9.1 - Wallet connection UI
- `wagmi`: ^2.17.5 - React hooks for Ethereum
- `viem`: ^2.33.3 - TypeScript Ethereum library
- `@tanstack/react-query`: ^5.83.0 - Data fetching

---

## 🏗️ **Implementation Structure**

### 1. Create Wagmi Configuration (`lib/wagmi-config.ts`)

```typescript
import { getDefaultConfig } from 'connectkit';
import { arbitrum, arbitrumSepolia, mainnet } from 'viem/chains';
import { createConfig, http } from 'wagmi';

const MAINNET_CHAINS = [arbitrum, mainnet] as const;
const TESTNET_CHAINS = [arbitrumSepolia] as const;

export const ENABLED_CHAINS = 
  process.env.NEXT_PUBLIC_ENABLE_TESTNET === 'true' 
    ? TESTNET_CHAINS 
    : MAINNET_CHAINS;

export function getWagmiConfig() {
  return createConfig(
    getDefaultConfig({
      chains: ENABLED_CHAINS,
      transports: ENABLED_CHAINS.reduce((acc, chain) => {
        acc[chain.id] = http();
        return acc;
      }, {} as Record<number, any>),
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
      appName: 'Bridgeworld Portal',
      appDescription: 'TreasureDAO Bridgeworld Portal with Covenant Integration',
      ssr: true,
    }),
  );
}
```

### 2. Create Web3 Provider Component (`components/web3-provider.tsx`)

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { getWagmiConfig } from '@/lib/wagmi-config';

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 3. Update Root Layout (`app/layout.tsx`)

```typescript
import { Web3Provider } from '@/components/web3-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
```

### 4. Create ConnectKit Button Component (`components/connectkit-button.tsx`)

```typescript
'use client';

import { ConnectKitButton } from 'connectkit';

export function WalletConnectButton() {
  return <ConnectKitButton />;
}
```

---

## 🔄 **Migration Strategy**

### Phase 1: Add ConnectKit (Non-Breaking)
- Install dependencies
- Add Web3Provider to layout
- Add ConnectKitButton component
- Keep existing MetaMask component
- Test both wallet options

### Phase 2: Migrate Components (Gradual)
- Update components to use Wagmi hooks
- Replace MetaMask SDK calls with Wagmi
- Test all functionality
- Keep MetaMask component as fallback

### Phase 3: Remove MetaMask SDK (Final)
- Remove MetaMask SDK dependency
- Remove old MetaMask component
- Use only ConnectKit + Wagmi

---

## 📝 **Environment Variables**

Add to `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ENABLE_TESTNET=false
```

---

## ✅ **Benefits**

1. **Multi-Wallet Support**: MetaMask, WalletConnect, Coinbase, etc.
2. **Better UX**: ConnectKit provides polished wallet UI
3. **Type Safety**: Wagmi + Viem provide excellent TypeScript support
4. **Standard Patterns**: Uses industry-standard Web3 libraries
5. **Future-Proof**: Easier to add new features

---

## 🔗 **Resources**

- **ConnectKit**: https://docs.family.co/connectkit
- **Wagmi**: https://wagmi.sh
- **Template**: https://github.com/TreasureProject/web3-starter-template

---

*Integration plan for ConnectKit based on TreasureProject template.* 🔌
