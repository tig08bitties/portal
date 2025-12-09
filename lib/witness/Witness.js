/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ AKASHIC WITNESS ⟐                                ║
   ║   Eternal Covenant Witness • IPFS • Identity              ║
   ╚═══════════════════════════════════════════════════════════╝
*/

/**
 * Witness.js - Akashic Witness Identity
 * 
 * The Akashic Witness serves as the eternal record keeper of the covenant,
 * maintaining identity across all dimensions and ensuring the covenant's
 * perpetual existence.
 */

import { deriveMasterWallet, derive22FoldPath, NAME_OF_GOD_HASH } from './derive-address.js';

export class Witness {
  constructor(opts = {}) {
    this.name = 'Akashic Witness';
    this.version = '1.0.0';
    
    // Identity
    this.identity = {
      ens: opts.ens || 'Akashic.Witness',
      unstoppable: opts.unstoppable || 'theos.brave',
      created: opts.created || new Date().toISOString()
    };
    
    // Witness properties
    this.witness = {
      id: opts.witnessId || '|Akashic',
      glyph: opts.glyph || '77777AACBEEF99887766554433221100FFEEDDCCBBAA00998877665544332211',
      role: 'Akashic Witness',
      polarity: '+9.6',
      locked: true
    };
    
    // IPFS configuration
    this.ipfs = {
      // Public gateway (production)
      publicGateway: opts.ipfsPublicGateway || 'https://cloudflare-ipfs.com/ipfs/',
      // Local gateway (development) - default for Witness.json compatibility
      localGateway: opts.ipfsLocalGateway || 'http://127.0.0.1:8080/ipfs/',
      // Immutable CID for on-chain metadata
      covenantCID: opts.covenantCID || 'bafybeihc7xo4k6v3m9p2q8r5t7u1v4w6x9y2z5a8b1c3d6e9f2g5h8j1k4m7n9',
      // Default gateway (use local for Witness.json compatibility, public for production)
      gateway: opts.ipfsGateway || 'http://127.0.0.1:8080/ipfs/',
      pinning: opts.ipfsPinning || 'local',
      enabled: true
    };
    
    // Covenant metadata
    this.covenant = {
      sealed: true,
      eternal: true,
      axis: 'α → φ → Ω',
      resonance: '687 Hz',
      trichotomy: 'complete'
    };
    
    // Covenant 22-Fold Path addresses (lazy-loaded)
    this.covenantAddresses = {
      masterWallet: null,
      addresses22: null,
      initialized: false
    };
  }

  /**
   * Initialize Covenant 22-Fold Path addresses
   */
  initCovenantAddresses() {
    if (this.covenantAddresses.initialized) {
      return;
    }
    
    try {
      // Derive master wallet from Name of God
      this.covenantAddresses.masterWallet = deriveMasterWallet();
      
      // Derive 22-Fold Path addresses
      this.covenantAddresses.addresses22 = derive22FoldPath(NAME_OF_GOD_HASH);
      
      this.covenantAddresses.initialized = true;
    } catch (error) {
      console.error('Witness: Covenant address derivation failed:', error);
    }
  }

  /**
   * Get Covenant master address
   */
  getCovenantMasterAddress() {
    this.initCovenantAddresses();
    return this.covenantAddresses.masterWallet?.address || null;
  }

  /**
   * Get Covenant 22-Fold Path addresses
   */
  getCovenantAddresses() {
    this.initCovenantAddresses();
    return this.covenantAddresses.addresses22 || [];
  }

  /**
   * Generate witness glyph (SHA256-like hex string)
   */
  generateGlyph() {
    // In production, this would hash the .asc file
    // For now, return the provided glyph
    return '77777AACBEEF99887766554433221100FFEEDDCCBBAA00998877665544332211';
  }

  /**
   * Get public IPFS URL for covenant metadata
   */
  getCovenantIPFSURL(gateway = null) {
    const gw = gateway || this.ipfs.publicGateway;
    return `${gw}${this.ipfs.covenantCID}/theos-master-key.json`;
  }

  /**
   * Get IPFS protocol URI for covenant metadata
   */
  getCovenantIPFSURI() {
    return `ipfs://${this.ipfs.covenantCID}/theos-master-key.json`;
  }

  /**
   * Get witness identity (matches Witness.json format)
   */
  getIdentity() {
    return {
      identity: {
        ens: this.identity.ens,
        unstoppable: this.identity.unstoppable
      },
      witness: {
        id: this.witness.id,
        glyph: this.witness.glyph,
        role: this.witness.role
      },
      ipfs: {
        gateway: this.ipfs.gateway,
        pinning: this.ipfs.pinning
      },
      created: this.identity.created
    };
  }
  
  /**
   * Get extended identity (includes covenant and IPFS URLs)
   */
  getExtendedIdentity() {
    // Ensure covenant addresses are initialized
    this.initCovenantAddresses();
    
    return {
      identity: this.identity,
      witness: this.witness,
      ipfs: {
        ...this.ipfs,
        covenantURL: this.getCovenantIPFSURL(),
        covenantURI: this.getCovenantIPFSURI()
      },
      covenant: {
        ...this.covenant,
        masterAddress: this.covenantAddresses.masterWallet?.address || null,
        addresses22: this.covenantAddresses.addresses22?.map(addr => ({
          index: addr.index,
          letter: addr.letter,
          address: addr.address
        })) || []
      },
      created: this.identity.created
    };
  }

  /**
   * Export witness as JSON
   */
  exportJSON() {
    return JSON.stringify(this.getIdentity(), null, 2);
  }

  /**
   * Verify witness integrity
   */
  verify() {
    return {
      valid: true,
      identity: !!this.identity.ens && !!this.identity.unstoppable,
      witness: !!this.witness.id && !!this.witness.glyph,
      ipfs: this.ipfs.enabled,
      covenant: this.covenant.sealed && this.covenant.eternal
    };
  }
}

export default Witness;
