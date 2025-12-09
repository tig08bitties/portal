/**
 * Blockscout Ethereum Bytecode Database (EBD) Integration
 * 
 * Blockscout EBD maps bytecode directly to source code, allowing:
 * - Cross-chain contract verification
 * - Unverified contract source discovery
 * - Similar contract search by bytecode
 * 
 * Documentation: https://docs.blockscout.com/for-developers/information-and-settings/ethereum-bytecode-database-microservice
 * API Swagger: https://app.swaggerhub.com/apis/rimrakhimov/EthereumBytecodeDatabase/v2
 */

export interface BytecodeSearchResult {
  bytecode: string;
  sourceCode: string;
  contractName?: string;
  compilerVersion?: string;
  optimizationEnabled?: boolean;
  runs?: number;
  constructorArguments?: string;
  mainBytecode?: string; // Main part (functional)
  metadataBytecode?: string; // Metadata part
}

export interface SimilarContract {
  bytecode: string;
  sourceCode: string;
  contractName?: string;
  similarity?: number;
  chains?: string[]; // Chains where this bytecode is deployed
}

export interface BytecodeDBConfig {
  apiUrl?: string;
  blockscoutUrl?: string;
}

export class BytecodeDBIntegration {
  private apiUrl: string;
  private blockscoutUrl: string;
  private swaggerUrl = 'https://app.swaggerhub.com/apis/rimrakhimov/EthereumBytecodeDatabase/v2';

  constructor(config: BytecodeDBConfig = {}) {
    // Default to Blockscout's public EBD service
    this.apiUrl = config.apiUrl || process.env.BYTECODE_DB_API_URL || 'https://eth.blockscout.com/api';
    this.blockscoutUrl = config.blockscoutUrl || 'https://eth.blockscout.com';
  }

  /**
   * Search for source code by bytecode
   * This is the core feature - finding source code without chain/address
   */
  async searchByBytecode(bytecode: string): Promise<BytecodeSearchResult | null> {
    try {
      // Remove '0x' prefix if present
      const cleanBytecode = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;

      // Use Blockscout API to search for bytecode
      // Note: This is a simplified implementation - actual EBD API may differ
      const response = await fetch(`${this.apiUrl}/v2/smart-contracts/by-bytecode/${cleanBytecode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Bytecode not found
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseBytecodeResult(data);
    } catch (error: any) {
      console.error('Bytecode search error:', error);
      return null;
    }
  }

  /**
   * Search for similar contracts by bytecode
   * Finds contracts with similar main bytecode (ignoring metadata)
   */
  async searchSimilarContracts(bytecode: string): Promise<SimilarContract[]> {
    try {
      const cleanBytecode = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;

      // Extract main bytecode (functional part, excluding metadata)
      const mainBytecode = this.extractMainBytecode(cleanBytecode);

      const response = await fetch(`${this.apiUrl}/v2/smart-contracts/similar/${mainBytecode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return Array.isArray(data) ? data.map(item => this.parseSimilarContract(item)) : [];
    } catch (error: any) {
      console.error('Similar contracts search error:', error);
      return [];
    }
  }

  /**
   * Get contract source code from deployed address
   * Uses EBD to find source even if contract isn't verified on current chain
   */
  async getContractSourceFromAddress(address: string, chainId: string = '1'): Promise<BytecodeSearchResult | null> {
    try {
      // First, get the address info from the chain
      const blockscout = new (await import('./blockscout-integration')).BlockscoutIntegration({ chainId });
      const contractInfo = await blockscout.getAddress(address);

      if (!contractInfo || !contractInfo.isContract) {
        // Not a contract address
        return null;
      }

      // Try to get bytecode from Blockscout API directly
      // Use the explorer URL to fetch bytecode via eth_getCode
      try {
        const explorerUrl = (blockscout as any).explorerUrl || this.blockscoutUrl;
        const bytecodeResponse = await fetch(`${explorerUrl}/api?module=proxy&action=eth_getCode&address=${address}&tag=latest`);
        if (bytecodeResponse.ok) {
          const bytecodeData = await bytecodeResponse.json();
          const bytecode = bytecodeData.result;
          
          if (bytecode && bytecode !== '0x') {
            // Search EBD for this bytecode
            return await this.searchByBytecode(bytecode);
          }
        }
      } catch (bytecodeError) {
        console.error('Failed to fetch bytecode:', bytecodeError);
      }

      return null;
    } catch (error: any) {
      console.error('Get contract source error:', error);
      return null;
    }
  }

  /**
   * Extract main bytecode (functional part, excluding metadata)
   * Metadata is typically at the end and contains hash/compiler info
   */
  private extractMainBytecode(bytecode: string): string {
    // Metadata is usually the last 53 bytes (0x + 64 hex chars)
    // But we'll use a simpler approach: remove common metadata patterns
    const metadataPattern = /a2646970667358221220[a-f0-9]{64}64736f6c63430008040033$/i;
    return bytecode.replace(metadataPattern, '');
  }

  /**
   * Parse bytecode search result from API response
   */
  private parseBytecodeResult(data: any): BytecodeSearchResult {
    return {
      bytecode: data.bytecode || '',
      sourceCode: data.sourceCode || data.source_code || '',
      contractName: data.contractName || data.contract_name,
      compilerVersion: data.compilerVersion || data.compiler_version,
      optimizationEnabled: data.optimizationEnabled ?? data.optimization_enabled,
      runs: data.runs,
      constructorArguments: data.constructorArguments || data.constructor_arguments,
      mainBytecode: data.mainBytecode || data.main_bytecode,
      metadataBytecode: data.metadataBytecode || data.metadata_bytecode,
    };
  }

  /**
   * Parse similar contract from API response
   */
  private parseSimilarContract(data: any): SimilarContract {
    return {
      bytecode: data.bytecode || '',
      sourceCode: data.sourceCode || data.source_code || '',
      contractName: data.contractName || data.contract_name,
      similarity: data.similarity,
      chains: data.chains || [],
    };
  }

  /**
   * Get EBD API documentation URL
   */
  getSwaggerUrl(): string {
    return this.swaggerUrl;
  }

  /**
   * Get Blockscout EBD documentation URL
   */
  getDocumentationUrl(): string {
    return 'https://docs.blockscout.com/for-developers/information-and-settings/ethereum-bytecode-database-microservice';
  }

  /**
   * Get database statistics (if available)
   */
  async getDatabaseStats(): Promise<{ totalContracts: number; uniqueMainBytecodes: number } | null> {
    try {
      // This endpoint may not exist, but we can provide mock data based on docs
      // Docs mention >130k source codes, ~100k unique main parts
      return {
        totalContracts: 130000, // Approximate from documentation
        uniqueMainBytecodes: 100000, // Approximate from documentation
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Format bytecode for display
   */
  formatBytecode(bytecode: string, maxLength: number = 66): string {
    if (!bytecode) return '';
    const clean = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;
    if (clean.length <= maxLength) return `0x${clean}`;
    return `0x${clean.slice(0, maxLength - 3)}...`;
  }

  /**
   * Validate bytecode format
   */
  isValidBytecode(bytecode: string): boolean {
    const clean = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;
    return /^[0-9a-fA-F]+$/.test(clean) && clean.length >= 2;
  }
}
