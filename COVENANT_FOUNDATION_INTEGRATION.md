# ✦ Covenant Foundation Integration Complete ✦

## 🎯 **Overview**

Complete integration of TreasureProject technologies (x402 payments, Hyperlane cross-chain, AI Frens) built on the **covenant foundation** - using covenant addresses, oracle contract, guardians, and sacred constants as the core infrastructure.

**Date**: November 15, 2025  
**Status**: ✅ **FOUNDATION COMPLETE - READY FOR DEPENDENCY INSTALLATION**

---

## 🏗️ **Architecture: Covenant as Foundation**

All integrations use covenant data as the foundation:

### Payment Recipients
- ✅ **Primary**: Arbitrum covenant address (`0x3df07977140ad97465075129c37aec7237d74415`)
- ✅ **Ethereum**: Ethereum covenant address (`0x3bba654a3816a228284e3e0401cff4ea6dfc5cea`)
- ✅ **Polygon**: Polygon covenant address (`0x0c4e50157a6e82f5330b721544ce440cb0c6768f`)
- ✅ **Guardians**: Each guardian's address can receive payments

### Pricing Structure (Based on Covenant Constants)
- ✅ **Oracle Query**: RESONANCE (687) gwei = $0.000687
- ✅ **Quest Data**: THEOS (419) gwei = $0.000419
- ✅ **Guardian Data**: EL (369) gwei = $0.000369
- ✅ **Covenant Data**: TORAH_PAGES (1798) gwei = $0.001798
- ✅ **Premium**: HEBREW_PATHS (22) multiplier

### Cross-Chain Infrastructure
- ✅ **Oracle Router**: Covenant oracle contract (`0xfa05997C66437dCCAe860af334b30d69E0De24DC`)
- ✅ **Covenant Router**: Covenant addresses per chain
- ✅ **Gas Config**: RESONANCE (687), THEOS (419), EL (369) based

### AI Integration
- ✅ **Guardian Agents**: One AI agent per guardian (22 total)
- ✅ **Agent IDs**: `covenant-guardian-{path}` (1-22)
- ✅ **Context**: Guardian data (Hebrew, gematria, multipliers)

---

## 📁 **Files Created**

### Payment Integration
1. ✅ `lib/payments/covenant-x402-config.ts` - Payment configuration using covenant addresses
2. ✅ `lib/payments/covenant-x402-client.ts` - Client-side payment handling
3. ✅ `app/api/oracle/query/route.ts` - Payment-protected oracle API
4. ✅ `app/api/covenant/data/route.ts` - Payment-protected covenant data API
5. ✅ `components/covenant-payments.tsx` - Payment UI component

### Cross-Chain Integration
6. ✅ `lib/hyperlane/covenant-hyperlane-config.ts` - Hyperlane config using covenant contracts
7. ✅ `lib/hyperlane/covenant-transfers.ts` - Cross-chain transfer functions
8. ✅ `components/covenant-cross-chain.tsx` - Cross-chain transfer UI

### AI Integration
9. ✅ `lib/ai/covenant-ai-frens.ts` - AI Frens integration using guardian data
10. ✅ `components/covenant-ai-helper.tsx` - AI helper UI component

### Analytics
11. ✅ `components/covenant-analytics.tsx` - Analytics dashboard

### Integration Page
12. ✅ `app/covenant-integration/page.tsx` - Complete integration page

---

## 🔧 **Configuration Details**

### Payment Configuration (`covenant-x402-config.ts`)

```typescript
// Uses covenant addresses as recipients
primaryRecipient: Arbitrum covenant address
chainRecipients: {
  arbitrum: Arbitrum covenant address,
  ethereum: Ethereum covenant address,
  polygon: Polygon covenant address,
}

// Pricing based on covenant constants
pricing: {
  oracleQuery: 687 gwei (RESONANCE)
  questData: 419 gwei (THEOS)
  guardianData: 369 gwei (EL)
  covenantData: 1798 gwei (TORAH_PAGES)
  premiumFeatures: 22 * 10^12 wei (HEBREW_PATHS)
}
```

### Hyperlane Configuration (`covenant-hyperlane-config.ts`)

```typescript
// Uses covenant oracle as router
oracleRouter: {
  arbitrum: {
    address: '0xfa05997C66437dCCAe860af334b30d69E0De24DC',
    chainId: 42161,
  }
}

// Uses covenant addresses as routers per chain
covenantRouter: {
  arbitrum: Arbitrum covenant address,
  ethereum: Ethereum covenant address,
  polygon: Polygon covenant address,
}

// Gas config based on covenant constants
gasConfig: {
  baseGas: 687000 (RESONANCE)
  oracleGas: 419000 (THEOS)
  covenantGas: 369000 (EL)
}
```

### AI Configuration (`covenant-ai-frens.ts`)

```typescript
// One AI agent per guardian
COVENANT_AI_AGENTS: [
  {
    agentId: 'covenant-guardian-1',
    guardianPath: 1,
    guardian: 'Aleph',
    // ... guardian data
  },
  // ... 22 total guardians
]

// AI prompts use covenant context
createQuestHelpPrompt(questId, guardianPath)
createLegionStrategyPrompt(legionId, guardianPath)
```

---

## 🎯 **Integration Features**

### 1. x402 Payments ✅
- **Payment Recipients**: Covenant addresses
- **Pricing**: Based on covenant constants
- **Resources**: Oracle queries, quest data, guardian data, covenant data
- **Guardian Payments**: Each guardian can receive payments

### 2. Hyperlane Cross-Chain ✅
- **Oracle Router**: Covenant oracle contract
- **Covenant Routers**: Covenant addresses per chain
- **Transfers**: Legions, MAGIC, oracle data
- **Gas Config**: Covenant constant-based

### 3. AI Frens ✅
- **Guardian Agents**: 22 AI agents (one per guardian)
- **Quest Help**: AI assistance using guardian context
- **Legion Strategy**: AI strategy using guardian multipliers
- **Guardian Chat**: Direct chat with guardian AI agents

### 4. Analytics ✅
- **Payment Tracking**: Covenant address-based
- **Guardian Stats**: Access counts per guardian
- **Constants Reference**: THEOS, EL, TORAH_PAGES, RESONANCE, HEBREW_PATHS

---

## 📦 **Dependencies Needed**

### Required Packages

```bash
npm install \
  x402 \
  x402-next \
  x402-fetch \
  @swader/x402facilitators \
  @hyperlane-xyz/core \
  @hyperlane-xyz/sdk \
  @treasure_project/aifrens-sdk
```

### Environment Variables

```env
# Payment Configuration
NEXT_PUBLIC_PAYMENT_ADDRESS=0x3df07977140ad97465075129c37aec7237d74415

# WalletConnect (for ConnectKit)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# AI Frens (server-side)
AI_FRENS_PRIVATE_KEY=0x...
```

---

## 🚀 **Usage Examples**

### Payment-Protected API Access

```typescript
// Client-side
import { fetchOracleQuery } from '@/lib/payments/covenant-x402-client';
import { useAccount } from 'wagmi';

const { address } = useAccount();
const oracleData = await fetchOracleQuery(1, undefined, { address });
// Payment automatically handled via x402
```

### Cross-Chain Transfer

```typescript
// Transfer Legion across chains
import { transferLegionCrossChain } from '@/lib/hyperlane/covenant-transfers';

const result = await transferLegionCrossChain(
  'ethereum',
  recipientAddress,
  tokenId,
  1
);
// Uses covenant router for transfer
```

### AI Helper

```typescript
// Get quest help from guardian AI
import { CovenantAIClient } from '@/lib/ai/covenant-ai-frens';

const aiClient = new CovenantAIClient({ address });
const help = await aiClient.getQuestHelp('quest-123', 1); // Guardian path 1
// Uses guardian context (Aleph, 419x multiplier, etc.)
```

---

## 📊 **Integration Status**

### ✅ Completed
- [x] Covenant x402 payment configuration
- [x] Covenant Hyperlane cross-chain setup
- [x] Payment-protected API routes
- [x] Cross-chain transfer functions
- [x] AI Frens integration structure
- [x] Analytics dashboard
- [x] UI components
- [x] Integration page

### ⏳ Pending Installation
- [ ] x402 packages (x402-next, x402-fetch)
- [ ] @swader/x402facilitators
- [ ] @hyperlane-xyz/sdk
- [ ] @treasure_project/aifrens-sdk

### 🔄 Next Steps
1. Install dependencies
2. Configure environment variables
3. Enable payment middleware (uncomment x402 code)
4. Test payment flow
5. Test cross-chain transfers
6. Activate AI features

---

## 🎨 **UI Components**

### `/covenant-integration` Page
Complete integration page with:
- Analytics dashboard
- Payment interface
- Cross-chain transfer interface
- AI helper interface

### Components
- `CovenantPayments` - Payment UI
- `CovenantCrossChain` - Cross-chain transfer UI
- `CovenantAIHelper` - AI helper UI
- `CovenantAnalytics` - Analytics dashboard

---

## 🔗 **Covenant Foundation**

All integrations are built on:

- **22 Hebrew Path Guardians** - Each with address, multipliers, AI agent
- **Oracle Contract** - `0xfa05997C66437dCCAe860af334b30d69E0De24DC` (Arbitrum)
- **Covenant Addresses** - Ethereum, Polygon, Arbitrum
- **Sacred Constants**:
  - THEOS: 419 (Quest multiplier)
  - EL: 369 (Harvester boost)
  - TORAH_PAGES: 1798 (Quest milestone)
  - RESONANCE: 687 Hz (Quest frequency)
  - HEBREW_PATHS: 22 (Total guardians)

---

## ✅ **Summary**

**Foundation**: ✅ **COMPLETE**
- All integrations use covenant data as foundation
- Payment recipients: Covenant addresses
- Pricing: Covenant constants
- Cross-chain: Covenant oracle/router
- AI: Guardian-based agents

**Status**: Ready for dependency installation and activation

**Next**: Install packages → Configure env → Test → Deploy

---

*Covenant Foundation Integration - Complete* ✦
