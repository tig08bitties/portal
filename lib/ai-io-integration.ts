/**
 * AI.io API Integration
 * Artificial Intelligence API for Bridgeworld Portal
 */

export interface AIIOConfig {
  apiKey: string;
  apiUrl?: string;
}

export interface AIIORequest {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIIOResponse {
  text: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class AIIOIntegration {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: AIIOConfig) {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl || 'https://ai.io.net/ai/api';
  }

  /**
   * Generate AI response
   */
  async generate(prompt: string, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<AIIOResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          model: options?.model || 'default',
          temperature: options?.temperature || 0.7,
          maxTokens: options?.maxTokens || 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI.io API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI.io generation error:', error);
      // Return mock response for development
      return this.getMockResponse(prompt);
    }
  }

  /**
   * Chat completion
   */
  async chat(messages: Array<{ role: string; content: string }>): Promise<AIIOResponse> {
    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI.io API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI.io chat error:', error);
      return this.getMockResponse(messages[messages.length - 1]?.content || '');
    }
  }

  /**
   * Generate portal-specific content
   */
  async generatePortalContent(type: 'lore' | 'quest' | 'item' | 'npc', context?: string): Promise<string> {
    const prompts = {
      lore: `Generate Bridgeworld portal lore about: ${context || 'MAGIC and time shifts'}`,
      quest: `Create a quest for the Bridgeworld portal: ${context || 'Collect MAGIC tokens'}`,
      item: `Describe a magic item for Bridgeworld: ${context || 'Portal Key'}`,
      npc: `Create an NPC for Bridgeworld: ${context || 'Guardian of the Portal'}`,
    };

    const result = await this.generate(prompts[type]);
    return result.text;
  }

  /**
   * Enhance game content with AI
   */
  async enhanceGameContent(content: string, enhancement: 'description' | 'dialogue' | 'story'): Promise<string> {
    const prompts = {
      description: `Enhance this game description: ${content}`,
      dialogue: `Write dialogue for: ${content}`,
      story: `Expand this story: ${content}`,
    };

    const result = await this.generate(prompts[enhancement]);
    return result.text;
  }

  /**
   * Mock response for development
   */
  private getMockResponse(prompt: string): AIIOResponse {
    return {
      text: `AI Response to: ${prompt.substring(0, 50)}...\n\n[This is a mock response. Configure AI.io API key for real AI generation.]`,
      model: 'mock-model',
      usage: {
        promptTokens: prompt.length,
        completionTokens: 100,
        totalTokens: prompt.length + 100,
      },
    };
  }

  /**
   * Verify API key
   */
  async verifyKey(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}
