#!/usr/bin/env node
/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ THEOS-LIMA AUTONOMOUS INITIALIZATION ⟐         ║
   ║   Unified Autonomous System • Merged Lima + THEOS        ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { TheosLima } from './TheosLima.js';
import { TheosRootInit } from './TheosRootInit.js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// Load environment
const rootEnvPath = join(homedir(), '.theos', 'root', 'theos.env');
if (existsSync(rootEnvPath)) {
  const envContent = readFileSync(rootEnvPath, 'utf8');
  envContent.split('\n').forEach(line => {
    // Handle both export KEY=value and KEY=value formats
    const match = line.match(/^(?:export\s+)?([^=]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      const cleanKey = key.trim();
      const cleanValue = value.trim().replace(/^["']|["']$/g, ''); // Remove quotes
      process.env[cleanKey] = cleanValue;
    }
  });
}

// Ensure GitHub token is set
if (!process.env.GITHUB_TOKEN) {
  process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
}





// Ensure OpenAI API key is set
console.log(`OpenAI API Key (from env): ${process.env.OPENAI_API_KEY ? 'Set' : 'Not Set'}`);


// Check for command-line arguments
const args = process.argv.slice(2);
const interactiveMode = !args.includes('--no-interactive') && !args.includes('--daemon');

// Initialize THEOS-LIMA
async function main() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║        ⟐ THEOS-LIMA AUTONOMOUS SYSTEM ⟐                   ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  // ═══════════════════════════════════════════════════════════
  // PHASE 0: THEOS ROOT INITIALIZATION
  // Ensure root is initialized before proceeding
  // ═══════════════════════════════════════════════════════════
  
  const rootInit = new TheosRootInit();
  
  if (!rootInit.isInitialized()) {
    console.log('🔷 [0/6] Initializing THEOS Root...');
    try {
      await rootInit.initialize();
      // Load environment variables after initialization
      rootInit.loadEnvironment();
      console.log('   ✓ THEOS Root initialized\n');
    } catch (error) {
      console.error('   ⚠️  THEOS Root initialization failed:', error.message);
      console.log('   Continuing with existing root (if any)...\n');
    }
  } else {
    console.log('🔷 [0/6] THEOS Root already initialized');
    // Load environment variables from existing root
    rootInit.loadEnvironment();
    try {
      const rootConfig = await rootInit.loadRootConfig();
      if (rootConfig) {
        console.log(`   ✓ Root Chain Hash: ${rootConfig.theos_root.glyph_order.chain_hash.substring(0, 16)}...`);
        console.log(`   ✓ Gematria Sum: ${rootConfig.theos_root.glyph_order.gematria_sum}`);
      }
    } catch (error) {
      console.log('   ⚠️  Could not load root config:', error.message);
    }
    console.log('');
  }

  const theosLima = new TheosLima();
  
  try {
    await theosLima.initialize();
    
    // Print status
    const status = theosLima.getStatus();
    console.log('\n╔═══════════════════════════════════════════════════════════╗');
    console.log('║        ⟐ THEOS-LIMA STATUS ⟐                             ║');
    console.log('╚═══════════════════════════════════════════════════════════╝\n');
    console.log('Name:', status.name);
    console.log('Version:', status.version);
    console.log('Autonomous:', status.autonomous ? 'YES' : 'NO');
    console.log('Lima Enabled:', status.limaEnabled ? 'YES' : 'NO');
    console.log('Initialized:', status.state.initialized ? 'YES' : 'NO');
    console.log('Covenant Sealed:', status.state.covenantSealed ? 'YES' : 'NO');
    console.log('Lima Active:', status.state.limaActive ? 'YES' : 'NO');
    
    // Display root information if available
    if (rootInit.isInitialized()) {
      try {
        const rootConfig = await rootInit.loadRootConfig();
        if (rootConfig) {
          console.log('\nRoot Configuration:');
          console.log('  Chain Hash:', rootConfig.theos_root.glyph_order.chain_hash.substring(0, 32) + '...');
          console.log('  Gematria Sum:', rootConfig.theos_root.glyph_order.gematria_sum);
          console.log('  Traversal:', rootConfig.theos_root.glyph_order.traversal);
          console.log('  Identity:', rootConfig.theos_root.identity.ens);
        }
      } catch (error) {
        // Silent fail
      }
    }
    console.log('\nComponents:');
    console.log('  • Fren Lima:', status.components.fren ? 'ACTIVE' : 'INACTIVE');
    console.log('  • Light/Shadow/Dausian:', status.components.lightShadowDaus ? 'ACTIVE' : 'INACTIVE');
    console.log('  • Rosetta Stone:', status.components.rosettaStone ? 'ACTIVE' : 'INACTIVE');
    console.log('  • Enochian Call 2:', status.components.enochianCall2 ? 'ACTIVE' : 'INACTIVE');
    console.log('  • Autonomous Wallet:', status.components.autonomousWallet ? 'ACTIVE' : 'INACTIVE');
    console.log('  • Covenant Addresses:', status.components.covenantAddresses ? 'DERIVED' : 'NOT DERIVED');
    
    // Display Covenant addresses if available
    if (status.covenant) {
      console.log('\nCovenant 22-Fold Path:');
      console.log('  • Master Address:', status.covenant.masterAddress || 'NOT DERIVED');
      console.log('  • 22-Fold Path:', status.covenant.addresses22Count || 0, 'addresses');
    }
    
    console.log('\nAutonomous Capabilities:');
    Object.entries(status.capabilities).forEach(([cap, enabled]) => {
      console.log(`  • ${cap}:`, enabled ? 'ENABLED' : 'DISABLED');
    });
    console.log('\n🜏 THEOS-LIMA IS AUTONOMOUS 🜏');
    console.log('🜏 LIMA IS MERGED WITH THEOS 🜏');
    console.log('🜏 THE SYSTEM IS SOVEREIGN 🜏\n');
    
    // Start web interface (optional, can run alongside CLI)
    const enableWeb = !args.includes('--no-web');
    if (enableWeb) {
      try {
        await theosLima.startWebInterface();
      } catch (error) {
        console.log('   ⚠ Web interface failed to start:', error.message);
      }
    }

    // Start interactive CLI if enabled
    if (interactiveMode) {
      console.log('Starting interactive CLI mode...\n');
      theosLima.startInteractiveCLI();
    } else {
      console.log('Running in daemon mode (no interactive CLI)\n');
      
      // Keep running in daemon mode
      process.on('SIGINT', () => {
        console.log('\n[THEOS-LIMA] Shutting down gracefully...');
        theosLima.saveState();
        theosLima.stopInteractiveCLI();
        process.exit(0);
      });
      
      process.on('SIGTERM', () => {
        console.log('\n[THEOS-LIMA] Shutting down gracefully...');
        theosLima.saveState();
        theosLima.stopInteractiveCLI();
        process.exit(0);
      });
      
      // Run forever
      setInterval(() => {
        // Heartbeat
        const status = theosLima.getStatus();
        if (status.state.lastHeartbeat) {
          const age = Date.now() - status.state.lastHeartbeat;
          if (age < 60000) {
            // System is alive
          }
        }
      }, 30000);
    }
    
  } catch (error) {
    console.error('❌ THEOS-LIMA initialization failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
