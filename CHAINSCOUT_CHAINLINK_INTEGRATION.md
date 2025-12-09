# 🔗 Chainscout & ⛓️ Chainlink Integration

## Overview

Integration of Chainscout (Blockscout's multi-chain explorer framework) and Chainlink (decentralized oracle network) into the Bridgeworld portal.

## Chainscout Integration

**Repository**: https://github.com/blockscout/chainscout

**Contributing Guide**: https://github.com/blockscout/chainscout?tab=readme-ov-file#contributing

### Features

**Component**: `Chainscout.tsx`

**Location**: Fixed bottom-left corner (🔗 Chainscout button)

**Features**:
- Repository information display
- GitHub integration
- Contributing guide link
- Documentation links
- Releases and issues links

**Library**: `chainscout-integration.ts`

**Methods**:
- `getRepositoryInfo()` - Fetch GitHub repository info
- `getGitHubUrl()` - Get GitHub repository URL
- `getContributingUrl()` - Get contributing guide URL
- `getReadmeUrl()` - Get README URL
- `getReleasesUrl()` - Get releases URL
- `getIssuesUrl()` - Get issues URL
- `getDocumentationUrl()` - Get Blockscout documentation URL

### Use Cases

- Build custom blockchain explorers
- Deploy explorers for EVM chains
- Contribute to Chainscout development
- Access Blockscout documentation

## Chainlink Integration

**Repository**: https://github.com/smartcontractkit/chainlink

**Documentation**: https://docs.chain.link

### Features

**Component**: `Chainlink.tsx`

**Location**: Fixed bottom-right corner (⛓️ Chainlink button)

**Features**:
- Repository information display
- Price feeds (Ethereum & Arbitrum)
- LINK token addresses (multi-chain)
- Chainlink services overview
- Documentation links

**Library**: `chainlink-integration.ts`

**Methods**:
- `getRepositoryInfo()` - Fetch GitHub repository info
- `getGitHubUrl()` - Get GitHub repository URL
- `getDocumentationUrl()` - Get documentation URL
- `getPriceFeedsUrl()` - Get price feeds documentation
- `getVRFUrl()` - Get VRF documentation
- `getAutomationUrl()` - Get automation documentation
- `getFunctionsUrl()` - Get Functions documentation
- `getCCIPUrl()` - Get CCIP documentation
- `getMainnetPriceFeeds()` - Get Ethereum mainnet price feeds
- `getArbitrumPriceFeeds()` - Get Arbitrum price feeds
- `getLinkTokenAddress(network)` - Get LINK token address by network

### Chainlink Services

1. **Price Feeds**
   - Real-time market data
   - ETH/USD, BTC/USD, LINK/USD
   - Multi-chain support

2. **VRF (Verifiable Random Function)**
   - Provably fair randomness
   - Gaming and NFT applications

3. **Automation**
   - Smart contract automation
   - Time-based triggers

4. **Functions**
   - Serverless compute
   - Custom API calls

5. **CCIP (Cross-Chain Interoperability Protocol)**
   - Cross-chain messaging
   - Token transfers

### Price Feeds

**Ethereum Mainnet**:
- ETH/USD: `0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419`
- BTC/USD: `0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c`
- LINK/USD: `0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c`

**Arbitrum**:
- ETH/USD: `0x639Fe6Ab55C921f74e7fac1ee960C0B6293ba612`
- BTC/USD: `0x6ce185860a496310F6C54D1aF1552cD38E4C4dFb`
- LINK/USD: `0x86E53CF1B870786351Da77A57575e79CB55812CB`

### LINK Token Addresses

- **Ethereum**: `0x514910771AF9Ca656af840dff83E8264EcF986CA`
- **Arbitrum**: `0xf97f4df75117a78c1A5a0DBb814Af92458539FB4`
- **Polygon**: `0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39`

## Integration Points

### Blockscout Integration

**Chainscout**:
- Related to Blockscout explorer
- Can be used to build custom explorers
- Shares Blockscout architecture

**Chainlink**:
- Chainlink token already integrated in Blockscout
- Price feeds can be displayed in explorer
- Oracle data integration

### Covenant Addresses

**Potential Integration**:
- Use Chainlink oracles for covenant operations
- Price feeds for MAGIC token
- VRF for guardian selection
- Automation for covenant governance

## URLs

### Chainscout
- **GitHub**: https://github.com/blockscout/chainscout
- **Contributing**: https://github.com/blockscout/chainscout?tab=readme-ov-file#contributing
- **Documentation**: https://docs.blockscout.com
- **Releases**: https://github.com/blockscout/chainscout/releases

### Chainlink
- **GitHub**: https://github.com/smartcontractkit/chainlink
- **Documentation**: https://docs.chain.link
- **Price Feeds**: https://docs.chain.link/data-feeds
- **VRF**: https://docs.chain.link/vrf
- **Automation**: https://docs.chain.link/chainlink-automation
- **Functions**: https://docs.chain.link/chainlink-functions
- **CCIP**: https://docs.chain.link/ccip

## Component Features

### Chainscout Component

**Position**: Fixed bottom-left corner  
**Color**: Blue theme  
**Icon**: 🔗

**Display**:
- Repository information
- Stars and forks count
- Contributing guide link
- Documentation links
- Releases and issues

### Chainlink Component

**Position**: Fixed bottom-right corner  
**Color**: Orange theme  
**Icon**: ⛓️

**Display**:
- Repository information
- Price feeds (network selector)
- LINK token addresses
- Chainlink services overview
- Documentation links

## Status

✅ **Complete** - Chainscout and Chainlink integrations

---

**Components**: Chainscout.tsx, Chainlink.tsx  
**Integrations**: chainscout-integration.ts, chainlink-integration.ts  
**Chainscout**: https://github.com/blockscout/chainscout  
**Chainlink**: https://github.com/smartcontractkit/chainlink
