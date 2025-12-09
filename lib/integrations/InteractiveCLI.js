/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ INTERACTIVE CLI FOR THEOS-LIMA ⟐                ║
   ║   Cursor-Agent Style Terminal Interface                   ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import readline from 'readline';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export class InteractiveCLI {
  constructor(theosLima) {
    this.theosLima = theosLima;
    this.rl = null;
    this.history = [];
    this.conversationContext = [];
    this.historyPath = join(homedir(), '.theos', 'runtime', 'cli-history.json');
    this.isProcessing = false;
    
    // Command registry
    this.commands = {
      '/help': this.showHelp.bind(this),
      '/status': this.showStatus.bind(this),
      '/clear': this.clearScreen.bind(this),
      '/history': this.showHistory.bind(this),
      '/context': this.showContext.bind(this),
      '/clear-context': this.clearContext.bind(this),
      '/exit': this.exit.bind(this),
      '/quit': this.exit.bind(this),
      '/agents': this.showAgents.bind(this),
      '/covenant': this.showCovenant.bind(this),
      '/lima': this.showLimaStatus.bind(this)
    };
    
    // Initialize history directory
    const historyDir = join(homedir(), '.theos', 'runtime');
    if (!existsSync(historyDir)) {
      mkdirSync(historyDir, { recursive: true });
    }
    
    this.loadHistory();
  }

  // Initialize the interactive CLI
  initialize() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: this.getPrompt(),
      completer: this.completer.bind(this),
      historySize: 1000,
      removeHistoryDuplicates: true
    });

    // Handle input
    this.rl.on('line', async (input) => {
      await this.handleInput(input.trim());
      this.rl.prompt();
    });

    // Handle Ctrl+C
    this.rl.on('SIGINT', () => {
      this.handleSIGINT();
    });

    // Handle close
    this.rl.on('close', () => {
      this.saveHistory();
      console.log('\n🜏 THEOS-LIMA: Session ended. Farewell. 🜏\n');
      process.exit(0);
    });

    // Show welcome message
    this.showWelcome();
    this.rl.prompt();
  }

  // Get dynamic prompt
  getPrompt() {
    const status = this.theosLima?.state?.limaActive ? '🜏' : '⟐';
    const mode = this.theosLima?.state?.autonomousMode ? 'AUTO' : 'MANUAL';
    return `${status} THEOS-LIMA [${mode}] > `;
  }

  // Update prompt
  updatePrompt() {
    if (this.rl) {
      this.rl.setPrompt(this.getPrompt());
    }
  }

  // Auto-completion
  completer(line) {
    const completions = Object.keys(this.commands);
    const hits = completions.filter((c) => c.startsWith(line));
    return [hits.length ? hits : completions, line];
  }

  // Handle user input
  async handleInput(input) {
    if (!input) {
      return;
    }

    // Add to history
    this.history.push({ input, timestamp: Date.now() });
    this.saveHistory();

    // Check if it's a command
    if (input.startsWith('/')) {
      await this.handleCommand(input);
      return;
    }

    // Regular query - process with agent
    await this.processQuery(input);
  }

  // Handle commands
  async handleCommand(input) {
    const [cmd, ...args] = input.split(' ');
    const command = this.commands[cmd.toLowerCase()];

    if (command) {
      try {
        await command(args);
      } catch (error) {
        console.log(`\n❌ Error executing command: ${error.message}\n`);
      }
    } else {
      console.log(`\n❌ Unknown command: ${cmd}`);
      console.log(`   Type /help for available commands\n`);
    }
  }

  // Process query with agent
  async processQuery(query) {
    if (this.isProcessing) {
      console.log('\n⏳ Please wait for the current query to complete...\n');
      return;
    }

    this.isProcessing = true;
    this.updatePrompt();

    try {
      // Add to conversation context
      this.conversationContext.push({
        role: 'user',
        content: query,
        timestamp: Date.now()
      });

      // Show thinking indicator
      process.stdout.write('\n🜏 Thinking...\n\n');

      // Get response from TheosLima
      let response;
      if (this.theosLima && this.theosLima.fren) {
        // Use autonomous query handler
        response = await this.theosLima.autonomousQuery(query);
      } else {
        response = 'TheosLima not fully initialized. Please wait...';
      }

      // Stream response (simulate streaming for better UX)
      await this.streamResponse(response);

      // Add to conversation context
      this.conversationContext.push({
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      });

      // Keep last 20 messages in context
      if (this.conversationContext.length > 20) {
        this.conversationContext = this.conversationContext.slice(-20);
      }

    } catch (error) {
      console.log(`\n❌ Error: ${error.message}\n`);
    } finally {
      this.isProcessing = false;
      this.updatePrompt();
    }
  }

  // Stream response with word-by-word streaming for better UX
  async streamResponse(text) {
    return new Promise((resolve) => {
      // For short responses, show immediately
      if (text.length < 100) {
        console.log(text);
        console.log('');
        resolve();
        return;
      }
      
      // For longer responses, stream word-by-word
      const words = text.split(' ');
      let index = 0;
      const stream = () => {
        if (index < words.length) {
          // Stream 3-5 words at a time for better speed
          const chunkSize = Math.min(3, words.length - index);
          const chunk = words.slice(index, index + chunkSize).join(' ');
          process.stdout.write(chunk + (index + chunkSize < words.length ? ' ' : ''));
          index += chunkSize;
          // Use minimal delay for fast but readable streaming
          setTimeout(stream, 5);
        } else {
          process.stdout.write('\n\n');
          resolve();
        }
      };
      stream();
    });
  }

  // Command: Show help
  showHelp() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ THEOS-LIMA INTERACTIVE CLI COMMANDS ⟐          ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log('Commands:');
    console.log('  /help              Show this help message');
    console.log('  /status            Show system status');
    console.log('  /agents            Show available agents');
    console.log('  /lima              Show Lima protocol status');
    console.log('  /covenant          Show covenant information');
    console.log('  /history           Show command history');
    console.log('  /context           Show conversation context');
    console.log('  /clear-context     Clear conversation context');
    console.log('  /clear             Clear screen');
    console.log('  /exit, /quit       Exit interactive mode\n');
    console.log('Usage:');
    console.log('  • Type your question and press Enter');
    console.log('  • Use /commands for system operations');
    console.log('  • Press Ctrl+C to interrupt current operation');
    console.log('  • Use Up/Down arrows for command history\n');
  }

  // Command: Show status
  async showStatus() {
    if (!this.theosLima) {
      console.log('\n❌ TheosLima not initialized\n');
      return;
    }

    const status = this.theosLima.getStatus();
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ THEOS-LIMA STATUS ⟐                            ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log(`Name: ${status.name}`);
    console.log(`Version: ${status.version}`);
    console.log(`Autonomous: ${status.autonomous ? 'YES' : 'NO'}`);
    console.log(`Lima Enabled: ${status.limaEnabled ? 'YES' : 'NO'}`);
    console.log(`Initialized: ${status.state.initialized ? 'YES' : 'NO'}`);
    console.log(`Covenant Sealed: ${status.state.covenantSealed ? 'YES' : 'NO'}`);
    console.log(`Lima Active: ${status.state.limaActive ? 'YES' : 'NO'}`);
    
    if (status.state.lastHeartbeat) {
      const age = Date.now() - status.state.lastHeartbeat;
      const ageSeconds = Math.floor(age / 1000);
      console.log(`Last Heartbeat: ${ageSeconds}s ago`);
    }
    
    console.log('\nComponents:');
    console.log(`  • Fren Lima: ${status.components.fren ? 'ACTIVE' : 'INACTIVE'}`);
    console.log(`  • Light/Shadow/Dausian: ${status.components.lightShadowDaus ? 'ACTIVE' : 'INACTIVE'}`);
    console.log(`  • Rosetta Stone: ${status.components.rosettaStone ? 'ACTIVE' : 'INACTIVE'}`);
    console.log(`  • Enochian Call 2: ${status.components.enochianCall2 ? 'ACTIVE' : 'INACTIVE'}`);
    console.log(`  • GitHub: ${status.components.github ? 'ACTIVE' : 'INACTIVE'}`);
    
    console.log('\nAutonomous Capabilities:');
    Object.entries(status.capabilities).forEach(([cap, enabled]) => {
      const capName = cap.replace(/([A-Z])/g, ' $1').trim();
      console.log(`  • ${capName}: ${enabled ? 'ENABLED' : 'DISABLED'}`);
    });
    console.log('');
  }

  // Command: Show agents
  showAgents() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ AVAILABLE AGENTS ⟐                              ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log('Primary Agent:');
    console.log('  🜏 Fren Lima - Autonomous Covenant Guardian');
    console.log('    • Lima Protocol: Brave LLM Core');
    console.log('    • Mode: Autonomous');
    console.log('    • Capabilities: Full THEOS integration\n');
    
    console.log('Supporting Agents:');
    console.log('  • Rosetta Stone - Ancient script translation');
    console.log('  • Enochian Call 2 - Sacred name pronunciation');
    console.log('  • Light/Shadow/Dausian - Duality integration');
    console.log('  • GitHub Integration - Repository management');
    console.log('  • Google Cloud - Cloud operations');
    console.log('  • Coder - Workspace management\n');
  }

  // Command: Show Lima status
  showLimaStatus() {
    const limaActive = this.theosLima?.state?.limaActive;
    const braveKey = process.env.BRAVE_LLM_CORE_KEY || process.env.BRAVE_BROWSER_API_KEY;
    
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ LIMA PROTOCOL STATUS ⟐                           ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log(`Lima Active: ${limaActive ? 'YES 🜏' : 'NO'}`);
    console.log(`Brave API Key: ${braveKey ? 'CONFIGURED ✓' : 'NOT CONFIGURED ✗'}`);
    console.log(`Brave API URL: ${process.env.BRAVE_LLM_CORE_URL || 'Not set'}`);
    
    if (limaActive && braveKey) {
      console.log('\n✓ Lima Protocol: OPERATIONAL');
      console.log('✓ Brave LLM Core: CONNECTED');
      console.log('✓ Autonomous Mode: ENABLED\n');
    } else {
      console.log('\n⚠ Lima Protocol: NOT FULLY OPERATIONAL');
      if (!braveKey) {
        console.log('⚠ Brave API key not configured\n');
      }
    }
  }

  // Command: Show covenant
  showCovenant() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ THE ETERNAL COVENANT ⟐                          ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log('The Covenant is the foundational agreement that binds THEOS.');
    console.log('All agents operate within covenant bounds.\n');
    console.log('Covenant Principles:');
    console.log('  1. Eternal sovereignty');
    console.log('  2. Autonomous operation within bounds');
    console.log('  3. Covenant awareness in all actions');
    console.log('  4. Preservation of THEOS integrity');
    console.log('  5. Respect for the eternal cycle\n');
    console.log(`Covenant Sealed: ${this.theosLima?.state?.covenantSealed ? 'YES ✓' : 'NO ✗'}\n`);
  }

  // Command: Show history
  showHistory() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ COMMAND HISTORY ⟐                                ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    
    if (this.history.length === 0) {
      console.log('No history yet.\n');
      return;
    }

    const recent = this.history.slice(-10);
    recent.forEach((item, index) => {
      const date = new Date(item.timestamp).toLocaleTimeString();
      console.log(`${index + 1}. [${date}] ${item.input}`);
    });
    console.log('');
  }

  // Command: Show context
  showContext() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ CONVERSATION CONTEXT ⟐                          ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    
    if (this.conversationContext.length === 0) {
      console.log('No conversation context yet.\n');
      return;
    }

    console.log(`Context messages: ${this.conversationContext.length}\n`);
    this.conversationContext.slice(-5).forEach((msg, index) => {
      const role = msg.role === 'user' ? '👤 User' : '🜏 TheosLima';
      const preview = msg.content.substring(0, 60) + (msg.content.length > 60 ? '...' : '');
      console.log(`${index + 1}. ${role}: ${preview}`);
    });
    console.log('');
  }

  // Command: Clear context
  clearContext() {
    this.conversationContext = [];
    console.log('\n✓ Conversation context cleared\n');
  }

  // Command: Clear screen
  clearScreen() {
    process.stdout.write('\x1B[2J\x1B[0f');
    this.showWelcome();
  }

  // Command: Exit
  exit() {
    console.log('\n🜏 THEOS-LIMA: Exiting interactive mode...\n');
    this.saveHistory();
    this.rl.close();
  }

  // Handle SIGINT (Ctrl+C)
  handleSIGINT() {
    if (this.isProcessing) {
      console.log('\n\n⚠ Interrupted. Returning to prompt...\n');
      this.isProcessing = false;
      this.updatePrompt();
      this.rl.prompt();
    } else {
      console.log('\n\n🜏 THEOS-LIMA: Use /exit to quit gracefully\n');
      this.rl.prompt();
    }
  }

  // Show welcome message
  showWelcome() {
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ THEOS-LIMA INTERACTIVE CLI ⟐                    ║');
    console.log('║   Autonomous Covenant Guardian • Lima Protocol            ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log('Welcome to THEOS-LIMA Interactive Mode');
    console.log('Type your questions or use /help for commands\n');
  }

  // Load history
  loadHistory() {
    try {
      if (existsSync(this.historyPath)) {
        const data = readFileSync(this.historyPath, 'utf8');
        const parsed = JSON.parse(data);
        this.history = parsed.history || [];
        this.conversationContext = parsed.context || [];
      }
    } catch (error) {
      // Ignore errors loading history
    }
  }

  // Save history
  saveHistory() {
    try {
      writeFileSync(
        this.historyPath,
        JSON.stringify({
          history: this.history.slice(-100), // Keep last 100
          context: this.conversationContext.slice(-20) // Keep last 20
        }, null, 2),
        'utf8'
      );
    } catch (error) {
      // Ignore errors saving history
    }
  }

  // Close the CLI
  close() {
    if (this.rl) {
      this.saveHistory();
      this.rl.close();
    }
  }
}
