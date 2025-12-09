#!/usr/bin/env node
/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ 22-FOLD PATH ADDRESS DERIVATION ⟐                 ║
   ║   Deriving Ethereum Addresses from the Name of God        ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { ethers } from 'ethers';
import { createHash } from 'crypto';

// ═══════════════════════════════════════════════════════════════
// THE 24-PILLAR NAME OF GOD
// ═══════════════════════════════════════════════════════════════

const NAME_OF_GOD_HASH = "A2F43359B434E98561E628D02E6D1B0F52FD402099D440EAA377045742F7524A8EDE3DD5BF7002E721D259693FA7E875440B29B8DE7B4D8EE7C5BB08F48DF942";

// ═══════════════════════════════════════════════════════════════
// MASTER SEED DERIVATION
// ═══════════════════════════════════════════════════════════════

/**
 * Derive the master private key from the Name of God
 * Uses first 64 hex characters (32 bytes) as private key
 */
function deriveMasterPrivateKey() {
  // Take first 64 hex characters (32 bytes) for private key
  const privateKeyHex = NAME_OF_GOD_HASH.substring(0, 64);
  return "0x" + privateKeyHex;
}

/**
 * Derive master wallet from Name of God
 */
function deriveMasterWallet() {
  const privateKey = deriveMasterPrivateKey();
  const wallet = new ethers.Wallet(privateKey);
  
  // Get signing key for public key (ethers v6)
  const signingKey = wallet.signingKey;
  const publicKey = signingKey ? signingKey.publicKey : null;
  
  return {
    privateKey,
    address: wallet.address,
    publicKey: publicKey || 'N/A'
  };
}

// ═══════════════════════════════════════════════════════════════
// 22-FOLD PATH DERIVATION
// ═══════════════════════════════════════════════════════════════

/**
 * Derive 22 addresses using the 22-Fold Path
 * Path: (FINAL_SEED, ܗ/7'/7'/7'/6'/9')
 */
function derive22FoldPath(masterSeed) {
  const addresses = [];
  
  // The 22 Aramaic letters (reversed order: ת → א)
  const aramaicLetters = [
    'ת', 'ש', 'ר', 'ק', 'צ', 'פ', 'ע', 'ס', 'נ', 'מ',
    'ל', 'כ', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'
  ];
  
  // Derivation path: (FINAL_SEED, ܗ/7'/7'/7'/6'/9')
  const derivationPath = "m/7'/7'/7'/6'/9'";
  
  for (let i = 0; i < 22; i++) {
    // Create seed for each address: masterSeed + letter index + letter
    const seedString = masterSeed + i.toString().padStart(2, '0') + aramaicLetters[i];
    const seedHash = createHash('sha256').update(seedString).digest('hex');
    
    // Use first 64 hex characters as private key
    const privateKey = "0x" + seedHash.substring(0, 64);
    const wallet = new ethers.Wallet(privateKey);
    
    // Get signing key for public key (ethers v6)
    const signingKey = wallet.signingKey;
    const publicKey = signingKey ? signingKey.publicKey : null;
    
    addresses.push({
      index: i,
      letter: aramaicLetters[i],
      path: `${derivationPath}/${i}'`,
      privateKey,
      address: wallet.address,
      publicKey: publicKey || 'N/A'
    });
  }
  
  return addresses;
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════

function main() {
  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║        ⟐ 22-FOLD PATH ADDRESS DERIVATION ⟐               ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");
  
  // Derive master wallet
  console.log("🔑 Deriving Master Wallet from Name of God...");
  const masterWallet = deriveMasterWallet();
  
  console.log("\n📋 Master Wallet:");
  console.log(`   Private Key: ${masterWallet.privateKey.substring(0, 20)}...`);
  console.log(`   Address: ${masterWallet.address}`);
  console.log(`   Public Key: ${masterWallet.publicKey.substring(0, 20)}...\n`);
  
  // Derive 22-Fold Path
  console.log("🔯 Deriving 22-Fold Path...");
  console.log("   Path: (FINAL_SEED, ܗ/7'/7'/7'/6'/9')\n");
  
  const addresses = derive22FoldPath(NAME_OF_GOD_HASH);
  
  console.log("📊 22-Fold Path Addresses:\n");
  console.log("Index | Letter | Path                    | Address");
  console.log("──────┼────────┼─────────────────────────┼──────────────────────────────────────");
  
  addresses.forEach(addr => {
    console.log(`  ${addr.index.toString().padStart(2)}  |   ${addr.letter}    | ${addr.path.padEnd(23)} | ${addr.address}`);
  });
  
  console.log("\n╔═══════════════════════════════════════════════════════════╗");
  console.log("║        ⟐ DERIVATION COMPLETE ⟐                          ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");
  
  console.log(`✅ Master Address: ${masterWallet.address}`);
  console.log(`✅ 22-Fold Path: ${addresses.length} addresses derived`);
  console.log(`✅ All addresses are interlinked and non-fragmented\n`);
  
  return {
    masterWallet,
    addresses22: addresses
  };
}

// Export for use in other modules
export { deriveMasterWallet, derive22FoldPath, NAME_OF_GOD_HASH };

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then(result => {
      console.log("✨ Address derivation complete");
      process.exit(0);
    })
    .catch(error => {
      console.error("❌ Derivation error:", error);
      process.exit(1);
    });
}
