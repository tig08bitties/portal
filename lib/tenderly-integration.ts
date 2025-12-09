/**
 * Tenderly Integration
 * Blockchain Debugging and Monitoring Platform
 * Explorer: https://dashboard.tenderly.co/explorer
 */

export interface TenderlyConfig {
  apiKey?: string;
  apiUrl?: string;
  projectSlug?: string;
  username?: string;
  rpcUrl?: string;
  nodeId?: string;
  webhookId?: string;
}

export interface TenderlyTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: 'success' | 'failed';
  error?: string;
  logs?: Array<{
    address: string;
    topics: string[];
    data: string;
  }>;
}

export interface TenderlySimulation {
  id: string;
  status: 'success' | 'failed';
  transaction: TenderlyTransaction;
  gasUsed: string;
  logs: any[];
}

export interface TenderlyContract {
  address: string;
  name: string;
  network: string;
  abi?: any[];
}

export class TenderlyIntegration {
  private apiKey?: string;
  private apiUrl: string;
  private projectSlug: string;
  private username: string;
  private rpcUrl: string;
  private nodeId?: string;
  private webhookId?: string;

  constructor(config: TenderlyConfig = {}) {
    this.apiKey = config.apiKey || process.env.TENDERLY_API_KEY;
    this.apiUrl = config.apiUrl || 'https://api.tenderly.co/api/v1';
    // Default to user's project
    this.projectSlug = config.projectSlug || process.env.TENDERLY_PROJECT_SLUG || 'project';
    this.username = config.username || process.env.TENDERLY_USERNAME || 'tig0_0bitties';
    // Default RPC URL for user's node
    this.rpcUrl = config.rpcUrl || process.env.TENDERLY_RPC_URL || 'https://mainnet.gateway.tenderly.co/5sMIYxKwKLkxdiB0d7abNb';
    this.nodeId = config.nodeId || process.env.TENDERLY_NODE_ID || 'c11796d7-c128-4ef0-8640-e6bcf59ea03b';
    this.webhookId = config.webhookId || process.env.TENDERLY_WEBHOOK_ID || 'ad800d90-a387-4f79-8b9a-74b6a85bc847';
  }

  /**
   * Get transaction details from Tenderly
   */
  async getTransaction(txHash: string, network: string = 'arbitrum'): Promise<TenderlyTransaction | null> {
    try {
      if (!this.apiKey || !this.projectSlug || !this.username) {
        return this.getMockTransaction(txHash);
      }

      const response = await fetch(
        `${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/transactions/${txHash}`,
        {
          headers: {
            'X-Access-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Tenderly API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseTransaction(data);
    } catch (error) {
      console.error('Tenderly transaction error:', error);
      return this.getMockTransaction(txHash);
    }
  }

  /**
   * Simulate transaction
   */
  async simulateTransaction(transaction: {
    from: string;
    to: string;
    data: string;
    value?: string;
    gas?: number;
  }, network: string = 'arbitrum'): Promise<TenderlySimulation | null> {
    try {
      if (!this.apiKey || !this.projectSlug || !this.username) {
        return this.getMockSimulation(transaction);
      }

      const response = await fetch(
        `${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/simulate`,
        {
          method: 'POST',
          headers: {
            'X-Access-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            network_id: network === 'arbitrum' ? '42161' : '1',
            from: transaction.from,
            to: transaction.to,
            input: transaction.data,
            value: transaction.value || '0',
            gas: transaction.gas || 8000000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Tenderly simulation error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseSimulation(data);
    } catch (error) {
      console.error('Tenderly simulation error:', error);
      return this.getMockSimulation(transaction);
    }
  }

  /**
   * Get project contracts
   */
  async getProjectContracts(): Promise<TenderlyContract[]> {
    try {
      if (!this.apiKey) {
        return [];
      }

      const response = await fetch(
        `${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/contracts`,
        {
          headers: {
            'X-Access-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Tenderly API error: ${response.statusText}`);
      }

      const data = await response.json();
      return (data.contracts || []).map((contract: any) => ({
        address: contract.address,
        name: contract.name || 'Unknown',
        network: contract.network_id || 'unknown',
        abi: contract.abi,
      }));
    } catch (error) {
      console.error('Tenderly contracts error:', error);
      return [];
    }
  }

  /**
   * Get contract verification
   */
  async getContract(address: string, network: string = 'arbitrum'): Promise<TenderlyContract | null> {
    try {
      if (!this.apiKey || !this.projectSlug || !this.username) {
        return this.getMockContract(address, network);
      }

      const response = await fetch(
        `${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/contracts/${network}/${address}`,
        {
          headers: {
            'X-Access-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Tenderly API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        address,
        name: data.name || 'Unknown',
        network,
        abi: data.abi,
      };
    } catch (error) {
      console.error('Tenderly contract error:', error);
      return this.getMockContract(address, network);
    }
  }

  /**
   * Get explorer URL for transaction
   */
  getTransactionUrl(txHash: string, network: string = 'arbitrum'): string {
    if (this.username && this.projectSlug) {
      return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/tx/${network}/${txHash}`;
    }
    return `https://dashboard.tenderly.co/explorer?network=${network}&tx=${txHash}`;
  }

  /**
   * Get explorer URL for address
   */
  getAddressUrl(address: string, network: string = 'arbitrum'): string {
    if (this.username && this.projectSlug) {
      return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/address/${network}/${address}`;
    }
    return `https://dashboard.tenderly.co/explorer?network=${network}&address=${address}`;
  }

  /**
   * Get explorer URL
   */
  getExplorerUrl(): string {
    return 'https://dashboard.tenderly.co/explorer';
  }

  /**
   * Get project contracts URL
   */
  getProjectContractsUrl(): string {
    return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/contracts`;
  }

  /**
   * Get contract verification docs URL
   */
  getVerificationDocsUrl(): string {
    return 'https://docs.tenderly.co/contract-verification/hardhat';
  }

  /**
   * Get node integration URL
   */
  getNodeIntegrationUrl(): string {
    return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/node/${this.nodeId}/integrate`;
  }

  /**
   * Get RPC URL
   */
  getRpcUrl(): string {
    return this.rpcUrl;
  }

  /**
   * Get webhook URL
   */
  getWebhookUrl(): string {
    return `${this.apiUrl}/actions/${this.webhookId}/webhook`;
  }

  /**
   * Trigger webhook
   */
  async triggerWebhook(data: Record<string, any>): Promise<boolean> {
    try {
      const response = await fetch(this.getWebhookUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return response.ok;
    } catch (error) {
      console.error('Tenderly webhook error:', error);
      return false;
    }
  }

  /**
   * Get ethers provider for Tenderly RPC
   */
  async getEthersProvider() {
    try {
      // Dynamic import to avoid SSR issues
      if (typeof window === 'undefined') {
        return null;
      }
      const ethersModule = await import('ethers');
      // ethers v6 uses named exports
      const ethers = ethersModule.ethers || ethersModule;
      if (!ethers || !ethers.JsonRpcProvider) {
        console.error('ethers.JsonRpcProvider not available');
        return null;
      }
      return new ethers.JsonRpcProvider(this.rpcUrl);
    } catch (error) {
      console.error('Failed to create ethers provider:', error);
      return null;
    }
  }

  /**
   * Get block number using Tenderly RPC
   */
  async getBlockNumber(): Promise<number | null> {
    try {
      const provider = await this.getEthersProvider();
      if (!provider) return null;
      return await provider.getBlockNumber();
    } catch (error) {
      console.error('Tenderly RPC error:', error);
      return null;
    }
  }

  /**
   * Get node extensions library URL
   */
  getNodeExtensionsUrl(): string {
    return 'https://github.com/Tenderly/node-extensions-library';
  }

  /**
   * Get node integration docs URL
   */
  getNodeIntegrationDocsUrl(): string {
    return 'https://docs.tenderly.co/node/integrations-chain-interaction/ethers';
  }

  /**
   * Get Tenderly wallet management URL
   */
  getWalletsUrl(): string {
    return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/wallets`;
  }

  /**
   * Get add wallet URL
   */
  getAddWalletUrl(): string {
    return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/wallets/add`;
  }

  /**
   * Get wallet details URL
   */
  getWalletUrl(walletAddress: string): string {
    return `https://dashboard.tenderly.co/${this.username}/${this.projectSlug}/wallets/${walletAddress}`;
  }

  /**
   * Get project wallets API endpoint
   */
  async getProjectWallets(): Promise<any[]> {
    try {
      if (!this.apiKey) {
        console.warn('Tenderly API key not configured');
        return [];
      }

      const response = await fetch(`${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/wallets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Tenderly API error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      console.error('Failed to fetch project wallets:', error);
      return [];
    }
  }

  /**
   * Add wallet to project
   */
  async addWalletToProject(walletAddress: string, label?: string): Promise<boolean> {
    try {
      if (!this.apiKey) {
        console.warn('Tenderly API key not configured');
        return false;
      }

      const response = await fetch(`${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/wallets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': this.apiKey,
        },
        body: JSON.stringify({
          address: walletAddress,
          label: label || `Wallet ${walletAddress.slice(0, 10)}...`,
        }),
      });

      return response.ok;
    } catch (error: any) {
      console.error('Failed to add wallet:', error);
      return false;
    }
  }

  /**
   * Verify contract (Hardhat integration)
   */
  async verifyContract(contractData: {
    address: string;
    name: string;
    network: string;
    compilerVersion?: string;
    optimization?: boolean;
  }): Promise<boolean> {
    try {
      if (!this.apiKey) {
        console.warn('Tenderly API key not set');
        return false;
      }

      const response = await fetch(
        `${this.apiUrl}/account/${this.username}/project/${this.projectSlug}/contracts/${contractData.network}/${contractData.address}`,
        {
          method: 'POST',
          headers: {
            'X-Access-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: contractData.name,
            compiler_version: contractData.compilerVersion,
            optimization: contractData.optimization,
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Tenderly verification error:', error);
      return false;
    }
  }

  /**
   * Parse transaction from API response
   */
  private parseTransaction(data: any): TenderlyTransaction {
    return {
      hash: data.hash || data.transaction_hash,
      from: data.from || data.transaction?.from,
      to: data.to || data.transaction?.to,
      value: data.value || data.transaction?.value || '0',
      gasUsed: data.gas_used || data.transaction?.gas || '0',
      status: data.status === 'success' ? 'success' : 'failed',
      error: data.error,
      logs: data.logs || [],
    };
  }

  /**
   * Parse simulation from API response
   */
  private parseSimulation(data: any): TenderlySimulation {
    return {
      id: data.simulation?.id || Date.now().toString(),
      status: data.simulation?.status === 'success' ? 'success' : 'failed',
      transaction: this.parseTransaction(data.transaction || data.simulation?.transaction),
      gasUsed: data.simulation?.gas_used || '0',
      logs: data.simulation?.logs || [],
    };
  }

  /**
   * Mock transaction for development
   */
  private getMockTransaction(txHash: string): TenderlyTransaction {
    return {
      hash: txHash,
      from: '0x0000000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      value: '0',
      gasUsed: '0',
      status: 'success',
    };
  }

  /**
   * Mock simulation for development
   */
  private getMockSimulation(transaction: any): TenderlySimulation {
    return {
      id: Date.now().toString(),
      status: 'success',
      transaction: {
        hash: '0x' + Math.random().toString(16).substring(2, 66),
        from: transaction.from,
        to: transaction.to,
        value: transaction.value || '0',
        gasUsed: '0',
        status: 'success',
      },
      gasUsed: '0',
      logs: [],
    };
  }

  /**
   * Mock contract for development
   */
  private getMockContract(address: string, network: string): TenderlyContract {
    return {
      address,
      name: 'Unknown Contract',
      network,
    };
  }
}
