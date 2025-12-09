/**
 * Covenant AI Frens Integration
 * Uses covenant guardian data for AI agent interactions
 * Based on TreasureProject aifrens-sdk
 */

import { COVENANT_DATA } from '@/lib/covenant-data';
import type { Guardian } from '@/lib/covenant-data';

import { AIFrensClient } from '@treasure_project/aifrens-sdk';

/**
 * AI Agent configuration based on covenant guardians
 * Each guardian can have an associated AI agent
 */
export const COVENANT_AI_AGENTS = COVENANT_DATA.guardians.map((guardian) => ({
  agentId: `covenant-guardian-${guardian.path}`,
  guardianPath: guardian.path,
  guardian: guardian.hebrew,
  hebrewLetter: guardian.hebrewLetter,
  gematria: guardian.gematria,
  description: `AI agent representing ${guardian.hebrew} (${guardian.hebrewLetter}), Path ${guardian.path}`,
  bridgeworldMapping: guardian.bridgeworldMapping,
  questMultiplier: guardian.questMultiplier,
  harvesterBoost: guardian.harvesterBoost,
}));

/**
 * Get AI agent ID for a guardian
 */
export function getGuardianAgentId(guardianPath: number): string {
  return `covenant-guardian-${guardianPath}`;
}

/**
 * Get guardian data for AI context
 */
export function getGuardianAIContext(guardianPath: number): string {
  const guardian = COVENANT_DATA.guardians.find((g) => g.path === guardianPath);
  if (!guardian) {
    return `Guardian path ${guardianPath} not found`;
  }

  return `
Guardian Information:
- Path: ${guardian.path}
- Hebrew: ${guardian.hebrew} (${guardian.hebrewLetter})
- Gematria: ${guardian.gematria}
- Address: ${guardian.address}
- Bridgeworld Mapping: ${guardian.bridgeworldMapping}
- Quest Multiplier: ${guardian.questMultiplier}x (THEOS: ${COVENANT_DATA.constants.theos})
- Harvester Boost: ${guardian.harvesterBoost}x (EL: ${COVENANT_DATA.constants.el})
- Registered: ${guardian.isRegistered ? 'Yes' : 'No'}
`.trim();
}

/**
 * Create AI prompt for quest help
 */
export function createQuestHelpPrompt(
  questId: string,
  guardianPath?: number
): string {
  const basePrompt = `You are a Bridgeworld quest helper AI. Help the user complete quest ${questId}.`;

  if (guardianPath) {
    const context = getGuardianAIContext(guardianPath);
    return `${basePrompt}\n\n${context}\n\nProvide guidance based on this guardian's attributes.`;
  }

  return `${basePrompt}\n\nUse covenant constants:
- THEOS: ${COVENANT_DATA.constants.theos} (Quest multiplier)
- EL: ${COVENANT_DATA.constants.el} (Harvester boost)
- TORAH_PAGES: ${COVENANT_DATA.constants.torahPages} (Quest milestone)
- RESONANCE: ${COVENANT_DATA.constants.resonance} Hz (Quest frequency)`;
}

/**
 * Create AI prompt for legion strategy
 */
export function createLegionStrategyPrompt(
  legionId: string,
  guardianPath?: number
): string {
  const basePrompt = `You are a Bridgeworld strategy advisor. Provide strategy for Legion ${legionId}.`;

  if (guardianPath) {
    const guardian = COVENANT_DATA.guardians.find((g) => g.path === guardianPath);
    if (guardian) {
      return `${basePrompt}\n\nThis Legion is associated with ${guardian.hebrew} (${guardian.hebrewLetter}):
- Quest Multiplier: ${guardian.questMultiplier}x
- Harvester Boost: ${guardian.harvesterBoost}x
- Bridgeworld Mapping: ${guardian.bridgeworldMapping}

Provide optimal strategy using these multipliers.`;
    }
  }

  return basePrompt;
}

/**
 * AI Frens client wrapper (to be implemented when SDK is installed)
 */
export class CovenantAIClient {
  private client: AIFrensClient;

  constructor(account: { address: string } | any) {
    // Initialize AI Frens client with account
    // Note: AIFrensClient expects a viem account, may need adapter
    this.client = new AIFrensClient(account);
  }

  /**
   * Chat with guardian AI agent
   */
  async chatWithGuardian(
    guardianPath: number,
    message: string
  ): Promise<{ response: string; error?: string }> {
    const agentId = getGuardianAgentId(guardianPath);
    const context = getGuardianAIContext(guardianPath);

    // Use AI Frens SDK - payments handled automatically via x402
    const result = await this.client.chat({
      agentId,
      message: `${context}\n\n${message}`,
    });

    if (result.response.error) {
      return { response: '', error: result.response.error };
    }

    return {
      response: result.response.response || 'No response from AI',
    };
  }

  /**
   * Get quest help from AI
   */
  async getQuestHelp(
    questId: string,
    guardianPath?: number
  ): Promise<{ response: string; error?: string }> {
    const prompt = createQuestHelpPrompt(questId, guardianPath);

    const result = await this.client.chat({
      agentId: 'bridgeworld-quest-helper',
      message: prompt,
    });

    if (result.response.error) {
      return { response: '', error: result.response.error };
    }

    return {
      response: result.response.response || 'No response from AI',
    };
  }

  /**
   * Get legion strategy from AI
   */
  async getLegionStrategy(
    legionId: string,
    guardianPath?: number
  ): Promise<{ response: string; error?: string }> {
    const prompt = createLegionStrategyPrompt(legionId, guardianPath);

    const result = await this.client.chat({
      agentId: 'bridgeworld-strategy-advisor',
      message: prompt,
    });

    if (result.response.error) {
      return { response: '', error: result.response.error };
    }

    return {
      response: result.response.response || 'No response from AI',
    };
  }
}
