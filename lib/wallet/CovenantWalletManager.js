#!/usr/bin/env node
/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ COVENANT WALLET MANAGER ⟐                         ║
   ║   Unified Address Management for 22-Fold Path             ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { deriveMasterWallet, derive22FoldPath, NAME_OF_GOD_HASH } from './derive-address.js';
import { AutonomousWallet } from './AutonomousWallet.js';

/**
 * CovenantWalletManager - Unified management of covenant addresses
 * 
 * Provides a single interface for accessing and managing:
 * - Master wallet (derived from Name of God)
 * - 22-Fold Path addresses (one per Aramaic letter)
 * - Integration with AutonomousWallet SDK
 */
export class CovenantWalletManager {
  constructor(opts = {}) {
    this.name = 'CovenantWalletManager';
    this.version = '1.0.0';
    
    // Covenant addresses
    this.masterWallet = null;
    this.addresses22 = null;
    this.initialized = false;
    
    // AutonomousWallet integration
    this.autonomousWallet = null;
    this.walletInitialized = false;
    
    // Options
    this.opts = {
      autoInit: opts.autoInit !== false, // Auto-initialize by default
      initWallet: opts.initWallet !== false // Initialize AutonomousWallet by default
    };
    
    // Initialize if auto-init is enabled
    if (this.opts.autoInit) {
      this.initialize();
    }
  }

  /**
   * Initialize covenant addresses
   */
  initialize() {
    if (this.initialized) {
      return this;
    }
    
    try {
      // Derive master wallet from Name of God
      this.masterWallet = deriveMasterWallet();
      
      // Derive 22-Fold Path addresses
      this.addresses22 = derive22FoldPath(NAME_OF_GOD_HASH);
      
      this.initialized = true;
      
      // Initialize AutonomousWallet if requested
      if (this.opts.initWallet && !this.walletInitialized) {
        this.initAutonomousWallet();
      }
      
      return this;
    } catch (error) {
      console.error('CovenantWalletManager: Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Initialize AutonomousWallet integration
   */
  async initAutonomousWallet() {
    if (this.walletInitialized) {
      return this.autonomousWallet;
    }
    
    try {
      this.autonomousWallet = new AutonomousWallet({
        name: 'THEOS Covenant Wallet',
        tonNetwork: 'mainnet'
      });
      
      // Initialize wallet (this will also derive covenant addresses internally)
      await this.autonomousWallet.initialize();
      
      this.walletInitialized = true;
      
      return this.autonomousWallet;
    } catch (error) {
      console.error('CovenantWalletManager: AutonomousWallet initialization failed:', error);
      return null;
    }
  }

  /**
   * Get master wallet address
   */
  getMasterAddress() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.masterWallet?.address || null;
  }

  /**
   * Get master wallet object
   */
  getMasterWallet() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.masterWallet;
  }

  /**
   * Get all 22-Fold Path addresses
   */
  getAddresses22() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.addresses22 || [];
  }

  /**
   * Get address by Aramaic letter
   */
  getAddressByLetter(letter) {
    const addresses = this.getAddresses22();
    return addresses.find(addr => addr.letter === letter) || null;
  }

  /**
   * Get address by index (0-21)
   */
  getAddressByIndex(index) {
    const addresses = this.getAddresses22();
    return addresses[index] || null;
  }

  /**
   * Get address by Hebrew letter name (e.g., 'Aleph', 'Tav')
   */
  getAddressByHebrewName(hebrewName) {
    const hebrewNames = {
      'Aleph': 'א', 'Bet': 'ב', 'Gimel': 'ג', 'Dalet': 'ד', 'He': 'ה',
      'Vav': 'ו', 'Zayin': 'ז', 'Chet': 'ח', 'Tet': 'ט', 'Yod': 'י',
      'Kaf': 'כ', 'Lamed': 'ל', 'Mem': 'מ', 'Nun': 'נ', 'Samekh': 'ס',
      'Ayin': 'ע', 'Pe': 'פ', 'Tsade': 'צ', 'Qof': 'ק', 'Resh': 'ר',
      'Shin': 'ש', 'Tav': 'ת'
    };
    
    const letter = hebrewNames[hebrewName];
    if (!letter) {
      return null;
    }
    
    return this.getAddressByLetter(letter);
  }

  /**
   * Get status
   */
  getStatus() {
    return {
      name: this.name,
      version: this.version,
      initialized: this.initialized,
      masterAddress: this.getMasterAddress(),
      addresses22Count: this.getAddresses22().length,
      autonomousWallet: {
        initialized: this.walletInitialized,
        available: !!this.autonomousWallet
      }
    };
  }

  /**
   * Export addresses as JSON
   */
  exportAddresses() {
    if (!this.initialized) {
      this.initialize();
    }
    
    return {
      master: {
        address: this.masterWallet.address,
        privateKey: this.masterWallet.privateKey.substring(0, 20) + '...' // Truncated for security
      },
      addresses22: this.addresses22.map(addr => ({
        index: addr.index,
        letter: addr.letter,
        address: addr.address,
        path: addr.path
      }))
    };
  }

  /**
   * Get summary
   */
  getSummary() {
    if (!this.initialized) {
      this.initialize();
    }
    
    return {
      masterAddress: this.masterWallet.address,
      totalAddresses: this.addresses22.length,
      firstAddress: this.addresses22[0]?.address,
      lastAddress: this.addresses22[this.addresses22.length - 1]?.address,
      derivationPath: 'm/7\'/7\'/7\'/6\'/9\'',
      nameOfGodHash: NAME_OF_GOD_HASH.substring(0, 32) + '...'
    };
  }
}

// Export singleton instance
let singletonInstance = null;

export function getCovenantWalletManager(opts = {}) {
  if (!singletonInstance) {
    singletonInstance = new CovenantWalletManager(opts);
  }
  return singletonInstance;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new CovenantWalletManager();
  
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║        ⟐ COVENANT WALLET MANAGER ⟐                       ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');
  
  const status = manager.getStatus();
  console.log('Status:', status);
  console.log('\nMaster Address:', manager.getMasterAddress());
  console.log('22-Fold Path:', manager.getAddresses22().length, 'addresses');
  
  const summary = manager.getSummary();
  console.log('\nSummary:');
  console.log(JSON.stringify(summary, null, 2));
}

export default CovenantWalletManager;
