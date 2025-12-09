# 📱 Telegram Bot Integration

## Overview

Integrated Telegram bot system for command-line deployment, following the same methods as previous deployments.

## Features

- **Command-Line Deployment**: Execute deployment commands via Telegram
- **Bot System**: Multiple specialized bots for different tasks
- **Webhook Integration**: Receive commands via Telegram webhook
- **Status Monitoring**: Check deployment status via Telegram
- **MetaMask Integration**: Collect tools via Telegram commands

## Available Commands

### Deployment Commands
- `/deploy-covenant` - Deploy covenant integration
- `/deploy-build` - Build portal system
- `/deploy-cloudflare` - Deploy to Cloudflare
- `/deploy-guardians` - Deploy 22 guardian bots
- `/deploy-all` - Deploy all systems

### Utility Commands
- `/status` - Check deployment status
- `/collect-tools` - Collect MetaMask tools
- `/activate-bots` - Activate all bots

## Setup

### Environment Variables
```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### Webhook Setup
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
  -d "url=https://bridgeworld.lol/api/telegram"
```

## Usage

### Via CLI
```bash
npm run telegram:deploy /deploy-all
npm run telegram:deploy /status
npm run telegram:deploy /deploy-guardians
```

### Via Telegram
Send commands directly to your bot:
```
/deploy-all
/status
/collect-tools
```

## MetaMask SDK Integration

### Brave API Search Results
- `connect()` - Connect wallet
- `signMessage()` - Sign messages
- `sendTransaction()` - Send transactions
- `switchNetwork()` - Switch networks
- `getBalance()` - Get balance
- `request()` - JSON-RPC requests

### Seed Phrase Integration
Seed phrase: `mammal fit truth foot organ wish conduct sweet muffin ski cupboard provide seed`

Used for:
- Wallet initialization
- Tool collection
- Bot activation
- Deployment verification

## Component

Access via **📱 Telegram Bot** button (top-left).

Features:
- View all available commands
- Execute commands
- See responses
- Monitor deployment status

## API Endpoint

**POST** `/api/telegram`
- Receives webhook from Telegram
- Processes commands
- Sends responses back

## Deployment Flow

1. **Connect Telegram Bot** → Set webhook
2. **Send Command** → `/deploy-all`
3. **Bot Executes** → Runs deployment scripts
4. **Status Update** → Telegram notification
5. **Complete** → All systems deployed

---

**Status**: ✅ Integrated  
**Component**: TelegramBot.tsx  
**API**: `/api/telegram`  
**Script**: `telegram-bot-deploy.js`
