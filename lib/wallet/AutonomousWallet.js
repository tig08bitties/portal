/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ AUTONOMOUS ALL-IN-ONE WALLET SDK ⟐              ║
   ║   MetaMask + TON + OpenNetwork + Obsidian + DeFi          ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { MetaMaskSDK } from '@metamask/sdk';
import axios from 'axios';

/**
 * AutonomousWallet - Unified wallet SDK merging:
 * - MetaMask SDK
 * - TON (The Open Network)
 * - OpenNetwork
 * - Obsidian Wallet
 * - ALLbridge (Cross-chain bridging)
 * - Uniswap (DEX)
 * - Chainlist (Chain metadata)
 * - Chainlink (Oracle data)
 */
export class AutonomousWallet {
  constructor(opts = {}) {
    this.name = opts.name || 'AutonomousWallet';
    this.version = '1.0.0';
    
    // MetaMask SDK
    this.metamask = null;
    this.metamaskSDK = null;
    
    // TON Integration
    this.ton = {
      provider: null,
      wallet: null,
      network: opts.tonNetwork || 'mainnet'
    };
    
    // OpenNetwork Integration
    this.openNetwork = {
      provider: null,
      connected: false
    };
    
    // Obsidian Wallet
    this.obsidian = {
      provider: null,
      connected: false
    };
    
    // DeFi Integrations
    this.allbridge = {
      api: 'https://api.allbridge.io/api/v1',
      chains: []
    };
    
    this.uniswap = {
      v3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
      v2Router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      quoter: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
    };
    
    this.chainlist = {
      api: 'https://chainid.network/chains.json',
      chains: []
    };
    
    this.chainlink = {
      priceFeeds: {},
      networks: ['ethereum', 'polygon', 'arbitrum', 'optimism', 'avalanche']
    };
    
    // Wallet state
    this.accounts = [];
    this.chainId = null;
    this.isConnected = false;
    this.activeProvider = null;
    
    // Event handlers
    this.eventHandlers = new Map();
  }

  /**
   * Initialize MetaMask SDK
   */
  async initMetaMask(opts = {}) {
    try {
      const MMSDK = new MetaMaskSDK({
        dappMetadata: {
          name: opts.appName || 'AutonomousWallet',
          url: opts.appUrl || window?.location?.origin
        },
        injectProvider: true,
        communicationLayerPreference: 'webrtc',
        ...opts
      });

      this.metamaskSDK = MMSDK;
      this.metamask = MMSDK.getProvider();
      
      if (this.metamask) {
        this.activeProvider = this.metamask;
        this.setupMetaMaskEvents();
      }
      
      return {
        success: true,
        provider: this.metamask
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Setup MetaMask event listeners
   */
  setupMetaMaskEvents() {
    if (!this.metamask) return;

    this.metamask.on('accountsChanged', (accounts) => {
      this.accounts = accounts;
      this.emit('accountsChanged', accounts);
    });

    this.metamask.on('chainChanged', (chainId) => {
      this.chainId = chainId;
      this.emit('chainChanged', chainId);
    });

    this.metamask.on('connect', (connectInfo) => {
      this.isConnected = true;
      this.emit('connect', connectInfo);
    });

    this.metamask.on('disconnect', () => {
      this.isConnected = false;
      this.emit('disconnect');
    });
  }

  /**
   * Initialize TON (The Open Network)
   */
  async initTON(opts = {}) {
    try {
      // Dynamic import for TON SDK
      const { TonClient, WalletContractV4, internal } = await import('@ton/ton');
      const { mnemonicToWalletKey } = await import('@ton/crypto');
      
      const endpoint = opts.endpoint || (this.ton.network === 'mainnet' 
        ? 'https://toncenter.com/api/v2/jsonRPC' 
        : 'https://testnet.toncenter.com/api/v2/jsonRPC');
      
      this.ton.provider = new TonClient({
        endpoint,
        apiKey: opts.apiKey || process.env.TON_API_KEY
      });
      
      return {
        success: true,
        provider: this.ton.provider,
        network: this.ton.network
      };
    } catch (error) {
      // Fallback if TON SDK not available
      return {
        success: false,
        error: error.message,
        note: 'Install @ton/ton and @ton/crypto packages for TON support'
      };
    }
  }

  /**
   * Initialize OpenNetwork
   */
  async initOpenNetwork(opts = {}) {
    try {
      // OpenNetwork uses TON blockchain
      const tonInit = await this.initTON(opts);
      
      if (tonInit.success) {
        this.openNetwork.provider = this.ton.provider;
        this.openNetwork.connected = true;
        
        return {
          success: true,
          provider: this.openNetwork.provider
        };
      }
      
      return tonInit;
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Initialize Obsidian Wallet
   */
  async initObsidian(opts = {}) {
    try {
      // Obsidian wallet integration
      // Check if Obsidian provider is available
      if (typeof window !== 'undefined' && window.obsidian) {
        this.obsidian.provider = window.obsidian;
        this.obsidian.connected = true;
        
        return {
          success: true,
          provider: this.obsidian.provider
        };
      }
      
      // Fallback: use injected provider pattern
      if (typeof window !== 'undefined' && window.ethereum) {
        this.obsidian.provider = window.ethereum;
        this.obsidian.connected = true;
        
        return {
          success: true,
          provider: this.obsidian.provider,
          note: 'Using injected provider as Obsidian fallback'
        };
      }
      
      return {
        success: false,
        error: 'Obsidian wallet not found'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Load Chainlist data
   */
  async loadChainlist() {
    try {
      const response = await axios.get(this.chainlist.api);
      this.chainlist.chains = response.data;
      
      return {
        success: true,
        chains: this.chainlist.chains.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get chain metadata from Chainlist
   */
  getChainInfo(chainId) {
    const chain = this.chainlist.chains.find(c => c.chainId === parseInt(chainId, 16));
    return chain || null;
  }

  /**
   * Initialize ALLbridge
   */
  async initALLbridge() {
    try {
      const response = await axios.get(`${this.allbridge.api}/chains`);
      this.allbridge.chains = response.data;
      
      return {
        success: true,
        chains: this.allbridge.chains.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get bridge quote from ALLbridge
   */
  async getBridgeQuote(fromChain, toChain, token, amount) {
    try {
      const response = await axios.get(`${this.allbridge.api}/quote`, {
        params: {
          fromChain,
          toChain,
          token,
          amount
        }
      });
      
      return {
        success: true,
        quote: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Initialize Chainlink price feeds
   */
  async initChainlink() {
    try {
      // Chainlink price feed addresses by network
      this.chainlink.priceFeeds = {
        ethereum: {
          ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
          BTC_USD: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c'
        },
        polygon: {
          ETH_USD: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
          BTC_USD: '0xc907E116054Ad103354f2D350FD2514433D57F6f'
        },
        arbitrum: {
          ETH_USD: '0x639Fe6ab55C92174dC7ECF6E0A2d1c9039B24491',
          BTC_USD: '0x6ce185860a4963106506C4A1A54651b71851aed3'
        }
      };
      
      return {
        success: true,
        networks: Object.keys(this.chainlink.priceFeeds).length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get Uniswap quote
   */
  async getUniswapQuote(tokenIn, tokenOut, amountIn, fee = 3000) {
    try {
      // This would use Uniswap V3 Quoter contract
      // For now, return structure
      return {
        success: true,
        tokenIn,
        tokenOut,
        amountIn,
        fee,
        note: 'Implement Uniswap V3 Quoter contract interaction'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Connect wallet
   */
  async connect(opts = {}) {
    const provider = opts.provider || this.activeProvider || this.metamask;
    
    if (!provider) {
      return {
        success: false,
        error: 'No provider available. Initialize MetaMask, TON, or Obsidian first.'
      };
    }

    try {
      if (provider.request) {
        // EIP-1193 provider (MetaMask, etc.)
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        this.accounts = accounts;
        this.isConnected = true;
        this.activeProvider = provider;
        
        const chainId = await provider.request({ method: 'eth_chainId' });
        this.chainId = chainId;
        
        return {
          success: true,
          accounts,
          chainId
        };
      } else {
        // TON or other providers
        return {
          success: false,
          error: 'Provider type not supported for connection'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect() {
    this.accounts = [];
    this.isConnected = false;
    this.activeProvider = null;
    this.emit('disconnect');
    
    return {
      success: true
    };
  }

  /**
   * Get current account
   */
  getAccount() {
    return this.accounts[0] || null;
  }

  /**
   * Switch chain
   */
  async switchChain(chainId) {
    if (!this.activeProvider || !this.activeProvider.request) {
      return {
        success: false,
        error: 'No active provider'
      };
    }

    try {
      await this.activeProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });
      
      this.chainId = chainId;
      
      return {
        success: true,
        chainId
      };
    } catch (error) {
      // If chain doesn't exist, add it
      if (error.code === 4902) {
        const chainInfo = this.getChainInfo(chainId);
        if (chainInfo) {
          return await this.addChain(chainInfo);
        }
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Add chain to wallet
   */
  async addChain(chainInfo) {
    if (!this.activeProvider || !this.activeProvider.request) {
      return {
        success: false,
        error: 'No active provider'
      };
    }

    try {
      await this.activeProvider.request({
        method: 'wallet_addEthereumChain',
        params: [chainInfo]
      });
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Send transaction
   */
  async sendTransaction(tx) {
    if (!this.activeProvider || !this.activeProvider.request) {
      return {
        success: false,
        error: 'No active provider'
      };
    }

    try {
      const txHash = await this.activeProvider.request({
        method: 'eth_sendTransaction',
        params: [tx]
      });
      
      return {
        success: true,
        txHash
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Sign message
   */
  async signMessage(message) {
    if (!this.activeProvider || !this.activeProvider.request) {
      return {
        success: false,
        error: 'No active provider'
      };
    }

    try {
      const signature = await this.activeProvider.request({
        method: 'personal_sign',
        params: [message, this.getAccount()]
      });
      
      return {
        success: true,
        signature
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Initialize all components
   */
  async initialize(opts = {}) {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ AUTONOMOUS WALLET INITIALIZATION ⟐                ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    const results = {
      metamask: await this.initMetaMask(opts.metamask),
      ton: await this.initTON(opts.ton),
      openNetwork: await this.initOpenNetwork(opts.openNetwork),
      obsidian: await this.initObsidian(opts.obsidian),
      chainlist: await this.loadChainlist(),
      allbridge: await this.initALLbridge(),
      chainlink: await this.initChainlink()
    };

    console.log('Initialization Results:');
    Object.entries(results).forEach(([key, result]) => {
      console.log(`  ${key}: ${result.success ? '✅' : '❌'} ${result.error || 'Ready'}`);
    });

    return {
      success: Object.values(results).some(r => r.success),
      results
    };
  }

  /**
   * Event emitter methods
   */
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(handler);
  }

  off(event, handler) {
    if (this.eventHandlers.has(event)) {
      const handlers = this.eventHandlers.get(event);
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event, ...args) {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event).forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Get wallet status
   */
  getStatus() {
    return {
      name: this.name,
      version: this.version,
      connected: this.isConnected,
      account: this.getAccount(),
      chainId: this.chainId,
      providers: {
        metamask: !!this.metamask,
        ton: !!this.ton.provider,
        openNetwork: this.openNetwork.connected,
        obsidian: this.obsidian.connected
      },
      defi: {
        chainlist: this.chainlist.chains.length,
        allbridge: this.allbridge.chains.length,
        chainlink: Object.keys(this.chainlink.priceFeeds).length
      }
    };
  }
}

export default AutonomousWallet;
