#!/usr/bin/env node
/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ THEOS ROOT INITIALIZATION PROTOCOL ⟐             ║
   ║   Reverse Traversal: Tav → Aleph | Identity Anchored     ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { createHash } from 'crypto';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

export class TheosRootInit {
  constructor() {
    this.theosRoot = join(homedir(), '.theos');
    this.initialized = false;
  }

  /**
   * Phase 1: Identity Anchor
   */
  getIdentityVectors() {
    return {
      primary: "tig08bitties.uni.eth@ethermail.io",
      sovereign: "sosmanagic@midco.net",
      ens: "tig08bitties.uni.eth",
      unstoppable: "theos.brave",
      physical: "SUAD OSMANAGIĆ",
      arabic: "سعاد",
      stellar: "G369COVENANT5255SIOUXFALLS57103",
      gnosis: "0xD98CF268718e925D53314662e0478EE13517FD54"
    };
  }

  /**
   * Phase 2: Root Glyph Order (TEV → ALEPH)
   * The Reverse Traversal - Return to Source
   */
  getGlyphs() {
    return [
      { name: "TEV", hebrew: "ת", value: 400, meaning: "End/Seal" },
      { name: "SHIN", hebrew: "ש", value: 300, meaning: "Fire/Tooth" },
      { name: "RESH", hebrew: "ר", value: 200, meaning: "Head" },
      { name: "QOF", hebrew: "ק", value: 100, meaning: "Back of Head" },
      { name: "TSADI", hebrew: "צ", value: 90, meaning: "Righteousness" },
      { name: "PE", hebrew: "פ", value: 80, meaning: "Mouth" },
      { name: "AYIN", hebrew: "ע", value: 70, meaning: "Eye" },
      { name: "SAMEKH", hebrew: "ס", value: 60, meaning: "Support" },
      { name: "NUN", hebrew: "נ", value: 50, meaning: "Fish/Life" },
      { name: "MEM", hebrew: "מ", value: 40, meaning: "Water" },
      { name: "LAMED", hebrew: "ל", value: 30, meaning: "Ox Goad" },
      { name: "KAF", hebrew: "כ", value: 20, meaning: "Palm" },
      { name: "YOD", hebrew: "י", value: 10, meaning: "Hand" },
      { name: "TET", hebrew: "ט", value: 9, meaning: "Serpent" },
      { name: "CHET", hebrew: "ח", value: 8, meaning: "Fence" },
      { name: "ZAYIN", hebrew: "ז", value: 7, meaning: "Weapon" },
      { name: "VAV", hebrew: "ו", value: 6, meaning: "Hook" },
      { name: "HEY", hebrew: "ה", value: 5, meaning: "Window" },
      { name: "DALET", hebrew: "ד", value: 4, meaning: "Door" },
      { name: "GIMEL", hebrew: "ג", value: 3, meaning: "Camel" },
      { name: "BET", hebrew: "ב", value: 2, meaning: "House" },
      { name: "ALEPH", hebrew: "א", value: 1, meaning: "Ox/Beginning" }
    ];
  }

  /**
   * Phase 3: Chain Hash Generation
   */
  generateChainHash(glyphs) {
    const glyphString = glyphs.map(g => g.name).join('');
    return createHash('sha256').update(glyphString).digest('hex');
  }

  /**
   * Calculate Gematria Sum
   */
  calculateGematriaSum(glyphs) {
    return glyphs.reduce((sum, glyph) => sum + glyph.value, 0);
  }

  /**
   * Phase 4: Environment Establishment
   */
  async createDirectoryStructure() {
    const dirs = [
      join(this.theosRoot, 'root'),
      join(this.theosRoot, 'cache'),
      join(this.theosRoot, 'log'),
      join(this.theosRoot, 'covenant'),
      join(this.theosRoot, 'networks'),
      join(this.theosRoot, 'runtime')
    ];

    for (const dir of dirs) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }

    return dirs;
  }

  /**
   * Phase 5: Root Manifest
   */
  async createRootManifest(identity, glyphs, chainHash, gematriaSum) {
    const manifest = {
      theos_root: {
        version: "1.0.0",
        initialized: new Date().toISOString(),
        identity: {
          primary: identity.primary,
          sovereign: identity.sovereign,
          ens: identity.ens,
          unstoppable: identity.unstoppable,
          stellar: identity.stellar,
          gnosis: identity.gnosis,
          physical: identity.physical,
          arabic: identity.arabic
        },
        glyph_order: {
          direction: "reverse",
          traversal: "TEV_TO_ALEPH",
          count: 22,
          chain_hash: chainHash,
          gematria_sum: gematriaSum,
          glyphs: glyphs.map(g => ({
            name: g.name,
            hebrew: g.hebrew,
            value: g.value,
            meaning: g.meaning
          }))
        },
        paths: {
          root: join(this.theosRoot, 'root'),
          cache: join(this.theosRoot, 'cache'),
          log: join(this.theosRoot, 'log'),
          covenant: join(this.theosRoot, 'covenant'),
          networks: join(this.theosRoot, 'networks'),
          runtime: join(this.theosRoot, 'runtime')
        }
      }
    };

    const manifestPath = join(this.theosRoot, 'root', 'manifest.json');
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    return manifestPath;
  }

  /**
   * Phase 6: Root Seal
   */
  async createRootSeal(chainHash) {
    const sealPath = join(this.theosRoot, 'root', 'chain.seal');
    await writeFile(sealPath, chainHash, 'utf8');

    // Covenant fingerprint and signature
    const covenantFingerprint = "d313359c33eb3e3c0888d493fa242bb422accf2ca7851d33ceb9bb42456b4f5b";
    const covenantSignature = "883e529d52f5a";

    await writeFile(
      join(this.theosRoot, 'covenant', 'fingerprint'),
      covenantFingerprint,
      'utf8'
    );

    await writeFile(
      join(this.theosRoot, 'covenant', 'signature'),
      covenantSignature,
      'utf8'
    );

    return { sealPath, covenantFingerprint, covenantSignature };
  }

  /**
   * Phase 7: Environment Variables
   */
  async createEnvironmentFile(identity, chainHash, gematriaSum) {
    const envContent = `# THEOS Root Environment Variables
export THEOS_ROOT="${this.theosRoot}"
export THEOS_IDENTITY="${identity.primary}"
export THEOS_SOVEREIGN="${identity.sovereign}"
export THEOS_ENS="${identity.ens}"
export THEOS_UNSTOPPABLE="${identity.unstoppable}"
export THEOS_STELLAR="${identity.stellar}"
export THEOS_GNOSIS="${identity.gnosis}"
export THEOS_CHAIN="${chainHash}"
export THEOS_GEMATRIA_SUM="${gematriaSum}"
export THEOS_PHYSICAL="${identity.physical}"
export THEOS_ARABIC="${identity.arabic}"
`;

    const envPath = join(this.theosRoot, 'root', 'theos.env');
    await writeFile(envPath, envContent, 'utf8');
    return envPath;
  }

  /**
   * Main initialization routine
   */
  async initialize() {
    console.log("╔═══════════════════════════════════════════════════════════╗");
    console.log("║        ⟐ THEOS ROOT: INITIALIZING ⟐                       ║");
    console.log("╚═══════════════════════════════════════════════════════════╝");
    console.log("");

    // Phase 1: Identity Anchor
    console.log("🔐 Phase 1: Identity Anchor");
    console.log("─────────────────────────────────────────────────────────");
    const identity = this.getIdentityVectors();
    console.log(`   Primary: ${identity.primary}`);
    console.log(`   Sovereign: ${identity.sovereign}`);
    console.log(`   ENS: ${identity.ens}`);
    console.log(`   Unstoppable: ${identity.unstoppable}`);
    console.log(`   Stellar: ${identity.stellar}`);
    console.log("");

    // Phase 2: Root Glyph Order
    console.log("🔯 Phase 2: Root Glyph Order (Reverse Traversal)");
    console.log("─────────────────────────────────────────────────────────");
    const glyphs = this.getGlyphs();
    console.log("   Traversal: TEV (ת) → ALEPH (א)");
    console.log("   Direction: Completion → Source");
    console.log("   Letters: 22");
    console.log("");
    console.log("   Root Path:");
    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      if (i % 3 === 2 || i === glyphs.length - 1) {
        console.log(`   ${glyph.name}`);
      } else {
        process.stdout.write(`   ${glyph.name} →`);
      }
    }
    console.log("");

    // Phase 3: Chain Hash Generation
    console.log("🔗 Phase 3: Root Chain Hash Generation");
    console.log("─────────────────────────────────────────────────────────");
    const chainHash = this.generateChainHash(glyphs);
    const gematriaSum = this.calculateGematriaSum(glyphs);
    console.log("   Input: 22 Glyphs (TEV→ALEPH)");
    console.log("   Algorithm: SHA-256");
    console.log("   Root Chain Hash:");
    console.log("");
    console.log(`   ⟐ ${chainHash} ⟐`);
    console.log("");
    console.log(`   Gematria Sum (22 letters): ${gematriaSum}`);
    console.log("   (400+300+...+2+1 = 1495)");
    console.log("");

    // Phase 4: Environment Establishment
    console.log("📁 Phase 4: Environment Establishment");
    console.log("─────────────────────────────────────────────────────────");
    const dirs = await this.createDirectoryStructure();
    dirs.forEach(dir => {
      console.log(`   Created: ${dir}`);
    });
    console.log("");

    // Phase 5: Root Manifest
    console.log("📜 Phase 5: Root Manifest Generation");
    console.log("─────────────────────────────────────────────────────────");
    const manifestPath = await this.createRootManifest(identity, glyphs, chainHash, gematriaSum);
    console.log(`   Manifest written: ${manifestPath}`);
    console.log("");

    // Phase 6: Root Seal
    console.log("🔏 Phase 6: Root Seal");
    console.log("─────────────────────────────────────────────────────────");
    const seal = await this.createRootSeal(chainHash);
    console.log(`   Root seal written: ${seal.sealPath}`);
    console.log("   Covenant fingerprint written");
    console.log("   Covenant signature written");
    console.log("");

    // Phase 7: Environment Variables
    console.log("⚙️  Phase 7: Environment Configuration");
    console.log("─────────────────────────────────────────────────────────");
    const envPath = await this.createEnvironmentFile(identity, chainHash, gematriaSum);
    console.log(`   Environment file: ${envPath}`);
    console.log("   Source with: source ~/.theos/root/theos.env");
    console.log("");

    // Phase 8: Completion
    console.log("╔═══════════════════════════════════════════════════════════╗");
    console.log("║        ⟐ THEOS ROOT: COMPLETE ⟐                           ║");
    console.log("╚═══════════════════════════════════════════════════════════╝");
    console.log("");
    console.log("✅ Root initialized successfully");
    console.log(`✅ Environment established at: ${this.theosRoot}`);
    console.log(`✅ Root Chain Hash: ${chainHash}`);
    console.log(`✅ Gematria Sum: ${gematriaSum}`);
    console.log("");
    console.log("📋 Summary:");
    console.log("   Identity Anchors: 8");
    console.log("   Glyph Traversal: TEV → ALEPH (22 letters)");
    console.log("   Directory Structure: Complete");
    console.log("   Root Manifest: Generated");
    console.log("   Covenant Seal: Written");
    console.log("");
    console.log("🔥 Next Steps:");
    console.log("   1. Source environment: source ~/.theos/root/theos.env");
    console.log("   2. Verify manifest: cat ~/.theos/root/manifest.json");
    console.log("   3. Check root seal: cat ~/.theos/root/chain.seal");
    console.log("");
    console.log("⟐ THEOS ROOT IS ESTABLISHED ⟐");
    console.log("⟐ THEOS REVERSE PATH IS COMPLETE ⟐");
    console.log("⟐ THEOS ALPHA AND THE OMEGA ⟐");
    console.log("");

    this.initialized = true;
    return {
      theosRoot: this.theosRoot,
      chainHash,
      gematriaSum,
      identity,
      glyphs
    };
  }

  /**
   * Check if root is already initialized
   */
  isInitialized() {
    const manifestPath = join(this.theosRoot, 'root', 'manifest.json');
    return existsSync(manifestPath);
  }

  /**
   * Load existing root configuration
   */
  async loadRootConfig() {
    if (!this.isInitialized()) {
      return null;
    }

    const manifestPath = join(this.theosRoot, 'root', 'manifest.json');
    const manifestContent = await readFile(manifestPath, 'utf8');
    return JSON.parse(manifestContent);
  }

  /**
   * Load environment variables into process.env
   */
  loadEnvironment() {
    const envPath = join(this.theosRoot, 'root', 'theos.env');
    if (existsSync(envPath)) {
      const envContent = readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const match = line.match(/^(?:export\s+)?([^=]+)=(.*)$/);
        if (match) {
          const [, key, value] = match;
          const cleanKey = key.trim();
          const cleanValue = value.trim().replace(/^["']|["']$/g, '');
          process.env[cleanKey] = cleanValue;
        }
      });
    }
  }
}

// Standalone execution
if (import.meta.url) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  if (process.argv[1] && process.argv[1].endsWith('TheosRootInit.js')) {
    const rootInit = new TheosRootInit();
    rootInit.initialize()
      .then(() => {
        console.log('\n✅ THEOS Root initialization complete!');
        process.exit(0);
      })
      .catch(error => {
        console.error('\n❌ THEOS Root initialization failed:', error);
        process.exit(1);
      });
  }
}
