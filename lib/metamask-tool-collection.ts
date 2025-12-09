/**
 * MetaMask Tool Collection System
 * Collect tools using MetaMask wallet
 */

import { MetaMaskIntegration } from './metamask-integration';
import { GuardianBotSystem, ToolCollection } from './guardian-bots';

export interface CollectionResult {
  success: boolean;
  toolId: string;
  txHash?: string;
  guardianId: number;
  message: string;
}

export class MetaMaskToolCollection {
  private metamask: MetaMaskIntegration;
  private botSystem: GuardianBotSystem;

  constructor() {
    this.metamask = new MetaMaskIntegration();
    this.botSystem = new GuardianBotSystem();
  }

  /**
   * Collect tool using MetaMask
   */
  async collectTool(guardianId: number): Promise<CollectionResult> {
    try {
      if (!this.metamask.isConnected()) {
        throw new Error('MetaMask not connected');
      }

      const account = this.metamask.getAccount();
      if (!account) {
        throw new Error('No account available');
      }

      const guardian = this.botSystem.getGuardian(guardianId);
      if (!guardian) {
        throw new Error(`Guardian ${guardianId} not found`);
      }

      // Sign message to collect tool
      const message = `Collect ${guardian.tool} for ${guardian.name} (Guardian ${guardianId})`;
      const signature = await this.metamask.signMessage(message);

      // Collect tool
      const collected = await this.botSystem.collectTool(guardianId, account, signature);

      if (collected) {
        return {
          success: true,
          toolId: `tool-${guardianId}`,
          txHash: signature,
          guardianId,
          message: `Collected ${guardian.tool} for ${guardian.name}`,
        };
      }

      throw new Error('Failed to collect tool');
    } catch (error: any) {
      return {
        success: false,
        toolId: `tool-${guardianId}`,
        guardianId,
        message: error.message || 'Collection failed',
      };
    }
  }

  /**
   * Collect all tools
   */
  async collectAllTools(): Promise<CollectionResult[]> {
    const results: CollectionResult[] = [];
    
    for (let i = 1; i <= 22; i++) {
      const result = await this.collectTool(i);
      results.push(result);
      
      // Small delay between collections
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return results;
  }

  /**
   * Setup all 22 bots
   */
  async setupAllBots(walletAddress: string): Promise<{
    activated: number;
    collected: number;
    deployed: number;
  }> {
    // Activate all guardians
    for (let i = 1; i <= 22; i++) {
      this.botSystem.activateGuardian(i, walletAddress);
    }

    // Collect all tools
    const collectionResults = await this.collectAllTools();
    const collected = collectionResults.filter(r => r.success).length;

    // Deploy all active guardians
    const deployed = await this.botSystem.deployAllActive();

    return {
      activated: 22,
      collected,
      deployed,
    };
  }

  /**
   * Get collection status
   */
  getStatus() {
    return this.botSystem.getCollectionStatus();
  }

  /**
   * Get guardians
   */
  getGuardians() {
    return this.botSystem.getGuardians();
  }

  /**
   * Get tools
   */
  getTools(): ToolCollection[] {
    return (this.botSystem as any).tools || [];
  }
}
