/**
 * Brave API Search for MetaMask SDK Functions
 * Uses seed phrase integration
 */

import { BraveSearchAPI } from './brave-search';

export interface MetaMaskSDKFunction {
  name: string;
  description: string;
  parameters: string[];
  usage: string;
  source: string;
}

export class MetaMaskSDKSearch {
  private brave: BraveSearchAPI;
  private seedPhrase = 'mammal fit truth foot organ wish conduct sweet muffin ski cupboard provide seed';

  constructor() {
    this.brave = new BraveSearchAPI();
  }

  /**
   * Search for MetaMask SDK functions
   */
  async searchMetaMaskSDK(): Promise<MetaMaskSDKFunction[]> {
    const queries = [
      'MetaMask SDK connect wallet function',
      'MetaMask SDK sign message method',
      'MetaMask SDK send transaction',
      'MetaMask SDK switch network',
      'MetaMask SDK get balance',
      'MetaMask SDK request accounts',
      'MetaMask SDK ethereum provider',
      'MetaMask SDK react hooks',
      'MetaMask SDK initialization',
      'MetaMask SDK error handling',
    ];

    const results: MetaMaskSDKFunction[] = [];

    for (const query of queries) {
      try {
        const searchResults = await this.brave.search(query);
        
        if (searchResults && searchResults.length > 0) {
          for (const result of searchResults.slice(0, 3)) {
            const functionData = this.extractFunctionData(result, query);
            if (functionData) {
              results.push(functionData);
            }
          }
        }
      } catch (error) {
        console.error(`Search error for "${query}":`, error);
      }
    }

    // Add known MetaMask SDK functions
    return this.addKnownFunctions(results);
  }

  /**
   * Extract function data from search result
   */
  private extractFunctionData(result: any, query: string): MetaMaskSDKFunction | null {
    try {
      const title = result.title || '';
      const description = result.description || '';
      
      // Extract function name from title or description
      const functionMatch = /(connect|sign|send|switch|get|request|initialize|handle)\w+/i.exec(title + ' ' + description);
      const functionName = functionMatch ? functionMatch[0] : 'unknown';

      return {
        name: functionName,
        description: description.substring(0, 200),
        parameters: this.extractParameters(description),
        usage: this.generateUsage(functionName),
        source: result.url || '',
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract parameters from description
   */
  private extractParameters(description: string): string[] {
    const params: string[] = [];
    const paramMatches = description.match(/(\w+):\s*\w+/g);
    if (paramMatches) {
      paramMatches.forEach(match => {
        const param = match.split(':')[0].trim();
        if (param && !params.includes(param)) {
          params.push(param);
        }
      });
    }
    return params;
  }

  /**
   * Generate usage example
   */
  private generateUsage(functionName: string): string {
    const usageMap: Record<string, string> = {
      connect: 'await sdk.connect()',
      sign: 'await sdk.signMessage(message, address)',
      send: 'await sdk.sendTransaction(transaction)',
      switch: 'await sdk.switchNetwork(chainId)',
      get: 'await sdk.getBalance(address)',
      request: 'await sdk.request({ method: "eth_requestAccounts" })',
      initialize: 'const sdk = new MetaMaskSDK(options)',
      handle: 'sdk.on("event", handler)',
    };

    for (const [key, usage] of Object.entries(usageMap)) {
      if (functionName.toLowerCase().includes(key)) {
        return usage;
      }
    }

    return `await sdk.${functionName}()`;
  }

  /**
   * Add known MetaMask SDK functions
   */
  private addKnownFunctions(existing: MetaMaskSDKFunction[]): MetaMaskSDKFunction[] {
    const known: MetaMaskSDKFunction[] = [
      {
        name: 'connect',
        description: 'Connect to MetaMask wallet and request account access',
        parameters: ['options'],
        usage: 'const accounts = await sdk.connect()',
        source: 'MetaMask SDK Documentation',
      },
      {
        name: 'signMessage',
        description: 'Sign a message using MetaMask',
        parameters: ['message', 'address'],
        usage: 'const signature = await sdk.signMessage(message, address)',
        source: 'MetaMask SDK Documentation',
      },
      {
        name: 'sendTransaction',
        description: 'Send a transaction through MetaMask',
        parameters: ['transaction'],
        usage: 'const txHash = await sdk.sendTransaction(transaction)',
        source: 'MetaMask SDK Documentation',
      },
      {
        name: 'switchNetwork',
        description: 'Switch to a different network',
        parameters: ['chainId'],
        usage: 'await sdk.switchNetwork(chainId)',
        source: 'MetaMask SDK Documentation',
      },
      {
        name: 'getBalance',
        description: 'Get ETH balance for an address',
        parameters: ['address'],
        usage: 'const balance = await sdk.getBalance(address)',
        source: 'MetaMask SDK Documentation',
      },
      {
        name: 'request',
        description: 'Make a JSON-RPC request to MetaMask',
        parameters: ['method', 'params'],
        usage: 'await sdk.request({ method: "eth_requestAccounts" })',
        source: 'MetaMask SDK Documentation',
      },
    ];

    // Merge and deduplicate
    const merged = [...existing, ...known];
    const unique = merged.filter((func, index, self) =>
      index === self.findIndex(f => f.name === func.name)
    );

    return unique;
  }

  /**
   * Get integration code based on seed phrase
   */
  getIntegrationCode(): string {
    return `
// MetaMask SDK Integration with Seed Phrase
// Seed: ${this.seedPhrase}

import { MetaMaskSDK } from '@metamask/sdk';

const options = {
  dappMetadata: {
    name: 'Bridgeworld Portal',
    url: 'https://bridgeworld.lol',
  },
  injectProvider: true,
  // Seed phrase integration
  communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network',
};

const sdk = new MetaMaskSDK(options);

// Connect wallet
export async function connectWallet() {
  const accounts = await sdk.connect();
  return accounts[0];
}

// Sign message
export async function signMessage(message: string, address: string) {
  return await sdk.signMessage(message, address);
}

// Send transaction
export async function sendTransaction(transaction: any) {
  return await sdk.sendTransaction(transaction);
}

// Switch network
export async function switchNetwork(chainId: string) {
  return await sdk.switchNetwork(chainId);
}
`;
  }
}
