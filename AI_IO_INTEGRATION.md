# 🤖 AI.io Integration

## Overview

Integrated AI.io API for AI-powered content generation in the Bridgeworld portal.

## API Key

**Token**: `io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6IjQyMDhmNTE1LWI5OTMtNGNiYS04M2MwLTQ4ZDRmODM1YmM4NCIsImV4cCI6NDkxNjc4ODE0NX0.mqEGdpHty7HBuI6QrpYVa81d3YWfF6kvxJk_QSqHifO1iPw8cLiCHw8qeQgZaQ6raGqOCdn5M6tnDSB-LY8t8g`

**API Keys Page**: https://ai.io.net/ai/api-keys

## Features

### Content Generation
- **Lore Generation**: Create portal lore and stories
- **Quest Creation**: Generate quests for players
- **Item Design**: Design magic items with descriptions
- **NPC Creation**: Create NPCs with backstories

### AI Enhancement
- **Description Enhancement**: Improve game descriptions
- **Dialogue Writing**: Generate character dialogue
- **Story Expansion**: Expand game narratives

## Usage

### Generate Portal Content
```typescript
import { AIIOIntegration } from '@/lib/ai-io-integration';

const ai = new AIIOIntegration({ apiKey: 'your-api-key' });

// Generate lore
const lore = await ai.generatePortalContent('lore', 'MAGIC and time shifts');

// Generate quest
const quest = await ai.generatePortalContent('quest', 'Collect MAGIC tokens');

// Generate item
const item = await ai.generatePortalContent('item', 'Portal Key');

// Generate NPC
const npc = await ai.generatePortalContent('npc', 'Guardian of the Portal');
```

### General AI Generation
```typescript
const response = await ai.generate('Your prompt here', {
  model: 'default',
  temperature: 0.7,
  maxTokens: 1000,
});
```

### Chat Completion
```typescript
const response = await ai.chat([
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi there!' },
]);
```

## Component

Access via **🤖 AI.io** button (top-right).

Features:
- Select content type (Lore, Quest, Item, NPC)
- Enter context or prompt
- Generate portal-specific content
- View AI responses
- Link to API keys management

## Integration Points

- **Portal**: Generate dynamic lore
- **Game**: Create quests and items
- **NPCs**: Generate character backstories
- **Story**: Enhance narrative content

## API Endpoints

- **Generate**: `/ai/api/generate`
- **Chat**: `/ai/api/chat`
- **Verify**: `/ai/api/verify`

## Token Details

- **Format**: JWT (JSON Web Token)
- **Owner**: `4208f515-b993-4cba-83c0-48d4f835bc84`
- **Expiration**: 4916788145 (Unix timestamp)

---

**Status**: ✅ Integrated  
**Component**: AIIO.tsx  
**SDK**: ai-io-integration.ts  
**API**: https://ai.io.net/ai/api
