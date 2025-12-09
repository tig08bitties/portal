/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ BLOCKCHAIN WEBSOCKET INTEGRATION ⟐               ║
   ║   WebSocket + HTTP Fallback for Multi-Chain Support       ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { ethers } from 'ethers';
import axios from 'axios';

/**
 * BlockchainWebSocket - WebSocket integration for blockchain networks
 * Supports: Arbitrum, Polygon, Ethereum Mainnet
 * Features: WebSocket subscriptions, HTTP fallback, event monitoring
 */
export class BlockchainWebSocket {
  constructor(opts = {}) {
    this.name = 'BlockchainWebSocket';
    this.version = '1.0.0';
    
    // Infura configuration
    this.infuraProjectId = opts.infuraProjectId || process.env.INFURA_PROJECT_ID || '85637a17e2474ddcaba4bcb38115ba25';
    
    // Network configurations
    this.networks = {
      arbitrum: {
        name: 'Arbitrum One',
        chainId: 42161,
        wsUrl: `wss://arbitrum-mainnet.infura.io/ws/v3/${this.infuraProjectId}`,
        httpUrl: `https://arbitrum-mainnet.infura.io/v3/${this.infuraProjectId}`,
        provider: null,
        wsConnection: null,
        connected: false,
        subscriptions: new Map(),
        useWebSocket: true
      },
      polygon: {
        name: 'Polygon',
        chainId: 137,
        wsUrl: `wss://polygon-mainnet.infura.io/ws/v3/${this.infuraProjectId}`,
        httpUrl: `https://polygon-mainnet.infura.io/v3/${this.infuraProjectId}`,
        provider: null,
        wsConnection: null,
        connected: false,
        subscriptions: new Map(),
        useWebSocket: true
      },
      ethereum: {
        name: 'Ethereum Mainnet',
        chainId: 1,
        wsUrl: `wss://mainnet.infura.io/ws/v3/${this.infuraProjectId}`,
        httpUrl: `https://mainnet.infura.io/v3/${this.infuraProjectId}`,
        provider: null,
        wsConnection: null,
        connected: false,
        subscriptions: new Map(),
        useWebSocket: true
      },
      scroll: {
        name: 'Scroll Mainnet',
        chainId: 534352,
        wsUrl: `wss://scroll-mainnet.infura.io/ws/v3/${this.infuraProjectId}`,
        httpUrl: `https://scroll-mainnet.infura.io/v3/${this.infuraProjectId}`,
        provider: null,
        wsConnection: null,
        connected: false,
        subscriptions: new Map(),
        useWebSocket: true,
        repositories: [
          'https://github.com/scroll-tech/scroll-contracts',
          'https://github.com/scroll-tech/reth',
          'https://github.com/scroll-tech/gkr-backend',
          'https://github.com/scroll-tech/scroll',
          'https://github.com/scroll-tech/frontends',
          'https://github.com/scroll-tech/rollup-node',
          'https://github.com/scroll-tech/zkvm-prover'
        ]
      }
    };
    
    // WebSocket support
    this.wsSupported = false;
    this.WebSocket = null;
    
    // Event handlers
    this.eventHandlers = new Map();
    
    // Connection state
    this.connectionState = {
      websocketAvailable: false,
      httpFallback: false,
      activeConnections: 0
    };
  }

  /**
   * Initialize WebSocket support
   */
  async initWebSocket() {
    try {
      // Try native WebSocket first (browser)
      if (typeof WebSocket !== 'undefined') {
        this.WebSocket = WebSocket;
        this.wsSupported = true;
        this.connectionState.websocketAvailable = true;
        return true;
      }
      
      // Try ws module (Node.js)
      const wsModule = await import('ws');
      this.WebSocket = wsModule.default || wsModule.WebSocket;
      this.wsSupported = true;
      this.connectionState.websocketAvailable = true;
      return true;
    } catch (error) {
      console.warn('[BlockchainWebSocket] WebSocket not available, using HTTP fallback');
      this.wsSupported = false;
      this.connectionState.websocketAvailable = false;
      this.connectionState.httpFallback = true;
      return false;
    }
  }

  /**
   * Connect to a network via WebSocket
   */
  async connectWebSocket(networkName) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (!this.wsSupported || !this.WebSocket) {
      await this.initWebSocket();
    }

    if (!this.wsSupported) {
      // Fallback to HTTP
      return await this.connectHTTP(networkName);
    }

    try {
      // Close existing connection if any
      if (network.wsConnection) {
        this.disconnectWebSocket(networkName);
      }

      // Create WebSocket connection
      const ws = new this.WebSocket(network.wsUrl);
      
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`WebSocket connection timeout for ${networkName}`));
        }, 10000);

        ws.on('open', () => {
          clearTimeout(timeout);
          network.wsConnection = ws;
          network.connected = true;
          network.useWebSocket = true;
          this.connectionState.activeConnections++;
          
          console.log(`🔌 [BlockchainWebSocket] Connected to ${network.name} via WebSocket`);
          this.emit('connected', { network: networkName, type: 'websocket' });
          
          // Setup message handler
          ws.on('message', (data) => {
            this.handleWebSocketMessage(networkName, data);
          });

          // Setup error handler
          ws.on('error', (error) => {
            console.error(`[BlockchainWebSocket] ${networkName} WebSocket error:`, error.message);
            this.emit('error', { network: networkName, error });
            // Fallback to HTTP on error
            this.fallbackToHTTP(networkName);
          });

          // Setup close handler
          ws.on('close', () => {
            network.connected = false;
            network.wsConnection = null;
            this.connectionState.activeConnections--;
            console.log(`🔌 [BlockchainWebSocket] Disconnected from ${network.name}`);
            this.emit('disconnected', { network: networkName });
          });

          resolve({
            success: true,
            network: networkName,
            type: 'websocket',
            connection: ws
          });
        });

        ws.on('error', (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
    } catch (error) {
      console.warn(`[BlockchainWebSocket] WebSocket connection failed for ${networkName}, falling back to HTTP`);
      return await this.connectHTTP(networkName);
    }
  }

  /**
   * Connect to a network via HTTP (fallback)
   */
  async connectHTTP(networkName) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    try {
      // Create ethers.js provider
      network.provider = new ethers.JsonRpcProvider(network.httpUrl);
      network.connected = true;
      network.useWebSocket = false;
      this.connectionState.httpFallback = true;
      
      // Test connection
      const blockNumber = await network.provider.getBlockNumber();
      
      console.log(`🌐 [BlockchainWebSocket] Connected to ${network.name} via HTTP (block: ${blockNumber})`);
      this.emit('connected', { network: networkName, type: 'http', blockNumber });
      
      return {
        success: true,
        network: networkName,
        type: 'http',
        provider: network.provider,
        blockNumber
      };
    } catch (error) {
      return {
        success: false,
        network: networkName,
        error: error.message
      };
    }
  }

  /**
   * Fallback to HTTP when WebSocket fails
   */
  async fallbackToHTTP(networkName) {
    const network = this.networks[networkName];
    if (network && network.wsConnection) {
      network.wsConnection.close();
      network.wsConnection = null;
    }
    
    console.log(`[BlockchainWebSocket] Falling back to HTTP for ${networkName}`);
    return await this.connectHTTP(networkName);
  }

  /**
   * Disconnect WebSocket connection
   */
  disconnectWebSocket(networkName) {
    const network = this.networks[networkName];
    if (!network || !network.wsConnection) {
      return;
    }

    try {
      network.wsConnection.close();
      network.wsConnection = null;
      network.connected = false;
      network.subscriptions.clear();
      this.connectionState.activeConnections--;
      console.log(`🔌 [BlockchainWebSocket] Disconnected from ${network.name}`);
    } catch (error) {
      console.error(`[BlockchainWebSocket] Error disconnecting:`, error.message);
    }
  }

  /**
   * Handle WebSocket messages
   */
  handleWebSocketMessage(networkName, data) {
    try {
      const message = JSON.parse(data.toString());
      const network = this.networks[networkName];
      
      // Handle subscription responses
      if (message.id && network.subscriptions.has(message.id)) {
        const subscription = network.subscriptions.get(message.id);
        if (message.result) {
          subscription.subscriptionId = message.result;
          this.emit('subscription', { network: networkName, subscription });
        }
      }
      
      // Handle subscription notifications
      if (message.method === 'eth_subscription' && message.params) {
        const subscriptionId = message.params.subscription;
        const result = message.params.result;
        
        // Find subscription by ID
        for (const [id, sub] of network.subscriptions.entries()) {
          if (sub.subscriptionId === subscriptionId) {
            this.emit('data', {
              network: networkName,
              subscription: sub,
              data: result
            });
            break;
          }
        }
      }
    } catch (error) {
      console.error(`[BlockchainWebSocket] Error handling message:`, error.message);
    }
  }

  /**
   * Subscribe to new blocks
   */
  async subscribeToNewBlocks(networkName, callback) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (network.useWebSocket && network.wsConnection) {
      // WebSocket subscription
      const subscriptionId = Date.now().toString();
      const request = {
        jsonrpc: '2.0',
        id: subscriptionId,
        method: 'eth_subscribe',
        params: ['newHeads']
      };

      network.subscriptions.set(subscriptionId, {
        id: subscriptionId,
        type: 'newHeads',
        callback
      });

      network.wsConnection.send(JSON.stringify(request));
      
      return {
        success: true,
        subscriptionId,
        type: 'websocket'
      };
    } else {
      // HTTP polling fallback
      const pollInterval = setInterval(async () => {
        try {
          const blockNumber = await network.provider.getBlockNumber();
          const block = await network.provider.getBlock(blockNumber);
          
          if (callback) {
            callback({
              network: networkName,
              blockNumber: block.number,
              blockHash: block.hash,
              timestamp: block.timestamp,
              transactions: block.transactions.length
            });
          }
        } catch (error) {
          console.error(`[BlockchainWebSocket] Error polling blocks:`, error.message);
        }
      }, 12000); // Poll every 12 seconds

      const subscriptionId = `http-poll-${Date.now()}`;
      network.subscriptions.set(subscriptionId, {
        id: subscriptionId,
        type: 'newHeads',
        callback,
        pollInterval
      });

      return {
        success: true,
        subscriptionId,
        type: 'http-polling'
      };
    }
  }

  /**
   * Subscribe to pending transactions
   */
  async subscribeToPendingTransactions(networkName, callback) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (network.useWebSocket && network.wsConnection) {
      // WebSocket subscription
      const subscriptionId = Date.now().toString();
      const request = {
        jsonrpc: '2.0',
        id: subscriptionId,
        method: 'eth_subscribe',
        params: ['newPendingTransactions']
      };

      network.subscriptions.set(subscriptionId, {
        id: subscriptionId,
        type: 'newPendingTransactions',
        callback
      });

      network.wsConnection.send(JSON.stringify(request));
      
      return {
        success: true,
        subscriptionId,
        type: 'websocket'
      };
    } else {
      // HTTP polling not practical for pending transactions
      return {
        success: false,
        error: 'Pending transaction subscriptions require WebSocket connection'
      };
    }
  }

  /**
   * Subscribe to logs (events)
   */
  async subscribeToLogs(networkName, filter, callback) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (network.useWebSocket && network.wsConnection) {
      // WebSocket subscription
      const subscriptionId = Date.now().toString();
      const request = {
        jsonrpc: '2.0',
        id: subscriptionId,
        method: 'eth_subscribe',
        params: ['logs', filter]
      };

      network.subscriptions.set(subscriptionId, {
        id: subscriptionId,
        type: 'logs',
        filter,
        callback
      });

      network.wsConnection.send(JSON.stringify(request));
      
      return {
        success: true,
        subscriptionId,
        type: 'websocket'
      };
    } else {
      // HTTP polling fallback
      const pollInterval = setInterval(async () => {
        try {
          const logs = await network.provider.getLogs(filter);
          
          if (callback && logs.length > 0) {
            logs.forEach(log => callback({
              network: networkName,
              log
            }));
          }
        } catch (error) {
          console.error(`[BlockchainWebSocket] Error polling logs:`, error.message);
        }
      }, 15000); // Poll every 15 seconds

      const subscriptionId = `http-poll-logs-${Date.now()}`;
      network.subscriptions.set(subscriptionId, {
        id: subscriptionId,
        type: 'logs',
        filter,
        callback,
        pollInterval
      });

      return {
        success: true,
        subscriptionId,
        type: 'http-polling'
      };
    }
  }

  /**
   * Unsubscribe from a subscription
   */
  async unsubscribe(networkName, subscriptionId) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    const subscription = network.subscriptions.get(subscriptionId);
    if (!subscription) {
      return { success: false, error: 'Subscription not found' };
    }

    // Clear polling interval if HTTP fallback
    if (subscription.pollInterval) {
      clearInterval(subscription.pollInterval);
    }

    // Unsubscribe via WebSocket if active
    if (network.useWebSocket && network.wsConnection && subscription.subscriptionId) {
      const request = {
        jsonrpc: '2.0',
        id: Date.now().toString(),
        method: 'eth_unsubscribe',
        params: [subscription.subscriptionId]
      };
      network.wsConnection.send(JSON.stringify(request));
    }

    network.subscriptions.delete(subscriptionId);
    
    return { success: true };
  }

  /**
   * Get current block number
   */
  async getBlockNumber(networkName) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (!network.connected) {
      await this.connectHTTP(networkName);
    }

    try {
      if (network.provider) {
        const blockNumber = await network.provider.getBlockNumber();
        return {
          success: true,
          network: networkName,
          blockNumber
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
   * Get block by number
   */
  async getBlock(networkName, blockNumber) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (!network.connected) {
      await this.connectHTTP(networkName);
    }

    try {
      if (network.provider) {
        const block = await network.provider.getBlock(blockNumber);
        return {
          success: true,
          network: networkName,
          block
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
   * Get transaction receipt
   */
  async getTransactionReceipt(networkName, txHash) {
    const network = this.networks[networkName];
    if (!network) {
      throw new Error(`Unknown network: ${networkName}`);
    }

    if (!network.connected) {
      await this.connectHTTP(networkName);
    }

    try {
      if (network.provider) {
        const receipt = await network.provider.getTransactionReceipt(txHash);
        return {
          success: true,
          network: networkName,
          receipt
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
   * Initialize all networks
   */
  async initialize(opts = {}) {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ BLOCKCHAIN WEBSOCKET INITIALIZATION ⟐             ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');

    // Initialize WebSocket support
    await this.initWebSocket();

    const networksToConnect = opts.networks || ['arbitrum', 'polygon', 'ethereum', 'scroll'];
    const results = {};

    for (const networkName of networksToConnect) {
      console.log(`🔷 Connecting to ${networkName}...`);
      
      try {
        // Try WebSocket first
        const wsResult = await this.connectWebSocket(networkName);
        
        if (wsResult.success) {
          if (wsResult.type === 'websocket') {
            console.log(`   ✓ ${networkName}: WebSocket connected`);
          } else {
            console.log(`   ✓ ${networkName}: HTTP connected (WebSocket unavailable)`);
          }
        } else {
          console.log(`   ⚠ ${networkName}: Connection failed`);
        }
        
        results[networkName] = wsResult;
      } catch (error) {
        console.log(`   ❌ ${networkName}: ${error.message}`);
        results[networkName] = {
          success: false,
          error: error.message
        };
      }
    }

    console.log('');
    return {
      success: Object.values(results).some(r => r.success),
      results,
      connectionState: this.connectionState
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
          console.error(`[BlockchainWebSocket] Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Get status
   */
  getStatus() {
    const networkStatus = {};
    for (const [name, network] of Object.entries(this.networks)) {
      networkStatus[name] = {
        connected: network.connected,
        type: network.useWebSocket ? 'websocket' : 'http',
        subscriptions: network.subscriptions.size,
        chainId: network.chainId
      };
    }

    return {
      name: this.name,
      version: this.version,
      websocketSupported: this.wsSupported,
      connectionState: this.connectionState,
      networks: networkStatus
    };
  }

  /**
   * Disconnect all networks
   */
  disconnectAll() {
    for (const networkName of Object.keys(this.networks)) {
      this.disconnectWebSocket(networkName);
    }
  }
}

export default BlockchainWebSocket;
