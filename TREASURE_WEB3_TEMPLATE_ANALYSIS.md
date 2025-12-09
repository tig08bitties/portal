# 🔍 TreasureProject Web3 Starter Template Analysis

## 📋 **Repository Overview**

**Repository**: https://github.com/TreasureProject/web3-starter-template  
**Stack**: React Router + Wagmi + Viem + ConnectKit + Cloudflare Workers  
**Purpose**: Web3 starter template for TreasureProject applications

---

## 🏗️ **Technology Stack**

### Core Framework
- **React Router v7** - Full-stack React framework
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling

### Web3 Stack
- **Wagmi v2.17.5** - React hooks for Ethereum
- **Viem v2.33.3** - TypeScript Ethereum library
- **ConnectKit v1.9.1** - Wallet connection UI
- **@tanstack/react-query** - Data fetching and caching

### Deployment
- **Cloudflare Workers** - Edge deployment
- **Wrangler** - Cloudflare CLI tool
- **Vite** - Build tool

---

## 📁 **Key Files & Structure**

### Web3 Configuration (`app/lib/wagmi.ts`)
```typescript
- Uses ConnectKit's getDefaultConfig
- Supports SSR (Server-Side Rendering)
- Cookie-based storage for wallet state
- Thirdweb RPC endpoints
- WalletConnect integration
```

### Chain Configuration (`app/const.ts`)
```typescript
- Mainnet: Arbitrum, Ethereum Mainnet
- Testnet: Arbitrum Sepolia
- Environment-based chain selection
```

### Web3 Provider (`app/components/web3.tsx`)
```typescript
- WagmiProvider wrapper
- QueryClientProvider for React Query
- ConnectKitProvider for wallet UI
- SSR support with initialState
```

### Cloudflare Workers (`workers/app.ts`)
- Edge runtime configuration
- React Router SSR support
- Cloudflare-specific optimizations

---

## 🔗 **Integration Opportunities**

### 1. ConnectKit Integration

**Current**: bridgeworld-lol uses MetaMask SDK directly  
**Opportunity**: Add ConnectKit for better wallet support

**Benefits**:
- ✅ Support for multiple wallets (MetaMask, WalletConnect, Coinbase, etc.)
- ✅ Better UX with ConnectKit UI
- ✅ Consistent wallet connection experience
- ✅ Built-in network switching

**Implementation**:
```typescript
// Install ConnectKit
npm install connectkit wagmi viem @tanstack/react-query

// Update wagmi config to use ConnectKit
import { ConnectKitProvider } from 'connectkit';
```

### 2. Wagmi Configuration Patterns

**Current**: Custom MetaMask integration  
**Opportunity**: Use Wagmi hooks for cleaner Web3 code

**Benefits**:
- ✅ Standardized React hooks (`useAccount`, `useBalance`, etc.)
- ✅ Better TypeScript support
- ✅ Automatic reconnection handling
- ✅ Network switching support

### 3. Chain Configuration

**Current**: Hardcoded network references  
**Opportunity**: Centralized chain configuration

**Pattern from Template**:
```typescript
// app/const.ts
export const ENABLED_CHAINS = 
  ENV.PUBLIC_ENABLE_TESTNET === 'true' ? TESTNET : MAINNET;
```

### 4. Cloudflare Workers Optimization

**Current**: Next.js on Cloudflare Pages  
**Opportunity**: Consider Workers for edge functions

**Benefits**:
- ✅ Lower latency (edge deployment)
- ✅ Better performance for API routes
- ✅ Cost-effective for high traffic

---

## 📊 **Comparison: Current vs Template**

| Feature | bridgeworld-lol (Current) | web3-starter-template |
|---------|---------------------------|----------------------|
| **Framework** | Next.js 16 | React Router 7 |
| **Web3** | MetaMask SDK | Wagmi + ConnectKit |
| **Deployment** | Cloudflare Pages | Cloudflare Workers |
| **Styling** | TailwindCSS 3 | TailwindCSS 4 |
| **State** | React hooks | React Query + Wagmi |

---

## 🚀 **Recommended Integrations**

### Option 1: Add ConnectKit (Minimal Change)

**Keep Next.js, add ConnectKit for better wallet support:**

```bash
npm install connectkit wagmi viem @tanstack/react-query
```

**Update**:
- Add ConnectKit provider to layout
- Replace MetaMask SDK with Wagmi hooks
- Keep existing Next.js structure

### Option 2: Migrate to React Router (Major Change)

**Full migration to match template:**

- Migrate from Next.js to React Router
- Use Cloudflare Workers instead of Pages
- Full Wagmi + ConnectKit integration
- More complex, but matches template exactly

### Option 3: Hybrid Approach (Recommended)

**Best of both worlds:**

- Keep Next.js for main app
- Use Wagmi + ConnectKit for Web3
- Add ConnectKit alongside MetaMask SDK
- Gradually migrate Web3 code to Wagmi

---

## 💻 **Code Examples from Template**

### Wagmi Configuration
```typescript
// app/lib/wagmi.ts
export function getConfig() {
  return createConfig(
    getDefaultConfig({
      transports: ENABLED_CHAINS.reduce((acc, chain) => {
        acc[chain.id] = http(`https://${chain.id}.rpc.thirdweb.com/${ENV.PUBLIC_THIRDWEB_KEY}`);
        return acc;
      }, {}),
      walletConnectProjectId: ENV.PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
      chains: ENABLED_CHAINS,
      appName: 'Treasure - Agent Creator',
      ssr: true,
    }),
  );
}
```

### Web3 Provider Setup
```typescript
// app/components/web3.tsx
export const Web3Provider = ({ children, initialState }) => {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
```

### Chain Configuration
```typescript
// app/const.ts
import { arbitrum, arbitrumSepolia, mainnet } from 'viem/chains';

const MAINNET = [arbitrum, mainnet] as const;
const TESTNET = [arbitrumSepolia] as const;

export const ENABLED_CHAINS =
  ENV.PUBLIC_ENABLE_TESTNET === 'true' ? TESTNET : MAINNET;
```

---

## 🎯 **Specific Integration Points**

### 1. Wallet Connection
**Template uses**: ConnectKitButton  
**Current uses**: MetaMask SDK  
**Integration**: Add ConnectKit for multi-wallet support

### 2. Chain Management
**Template uses**: Centralized chain config  
**Current uses**: Hardcoded Arbitrum references  
**Integration**: Create chain configuration file

### 3. Web3 Hooks
**Template uses**: Wagmi hooks (`useAccount`, `useBalance`, etc.)  
**Current uses**: Custom MetaMask hooks  
**Integration**: Migrate to Wagmi hooks gradually

### 4. RPC Configuration
**Template uses**: Thirdweb RPC endpoints  
**Current uses**: Direct RPC URLs  
**Integration**: Consider Thirdweb or keep current RPCs

---

## 📦 **Dependencies to Add**

If integrating ConnectKit:

```json
{
  "dependencies": {
    "connectkit": "^1.9.1",
    "wagmi": "^2.17.5",
    "viem": "^2.33.3",
    "@tanstack/react-query": "^5.83.0"
  }
}
```

---

## 🔧 **Implementation Steps**

### Phase 1: Add ConnectKit (Week 1)
1. Install dependencies
2. Create Wagmi config
3. Add ConnectKit provider
4. Replace MetaMask button with ConnectKitButton
5. Test wallet connections

### Phase 2: Migrate to Wagmi Hooks (Week 2)
1. Replace custom hooks with Wagmi hooks
2. Update components to use Wagmi
3. Test all Web3 functionality
4. Remove MetaMask SDK dependency

### Phase 3: Chain Configuration (Week 3)
1. Create chain config file
2. Update all network references
3. Add environment-based chain selection
4. Test on multiple networks

---

## 🔗 **Resources**

- **Template Repo**: https://github.com/TreasureProject/web3-starter-template
- **ConnectKit Docs**: https://docs.family.co/connectkit
- **Wagmi Docs**: https://wagmi.sh
- **Viem Docs**: https://viem.sh
- **React Router Docs**: https://reactrouter.com

---

## ✅ **Recommendation**

**For bridgeworld-lol project:**

1. **Keep Next.js** (already working well)
2. **Add ConnectKit** (better wallet support)
3. **Use Wagmi hooks** (cleaner Web3 code)
4. **Keep Cloudflare Pages** (simpler deployment)

**Benefits**:
- ✅ Better wallet support (multiple wallets)
- ✅ Cleaner Web3 code (Wagmi hooks)
- ✅ No major framework migration needed
- ✅ Gradual migration possible

---

*Analysis of TreasureProject web3-starter-template for bridgeworld-lol integration.* 🔍
