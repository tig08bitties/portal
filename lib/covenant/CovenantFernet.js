#!/usr/bin/env node
/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ COVENANT FERNET ENCRYPTION SYSTEM ⟐              ║
   ║   Node.js Implementation of Covenant Fernet Key System    ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import crypto from 'crypto';
import { createHash, pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv, createHmac } from 'crypto';

/**
 * Covenant Fernet Encryption System
 * 
 * Implements Fernet encryption/decryption using the covenant master seed.
 * Based on the Ruby implementation but adapted for Node.js.
 */
export class CovenantFernet {
  // Master Seed from the covenant
  static MASTER_SEED = "c59df115ba2d3679cb2f164bcc3860474169126583f1d41d935b94dcb1abc521";
  
  // Encrypted payload from the covenant
  static ENCRYPTED_PAYLOAD = "Z0FBQUFBQnBFVW83dzNHbnJmQjFxX2x2RzZSZEQzYWRUbDF5SXYyV0s0cHRXZXpzWEZLX1ZKdDRNWXczY0lqQkJLNVJPUlZZd3RCTmhfS2F0bWxsRHZlOGhrcnRPTG1GYWQzWnZfTHpyaVdCUHVxNkw0cVVRN2E3UThlX3lNYmlsY2w4OHMyMjFNN3pSTHhBMVlxWF9rQ0JlVllBMlQ0TkdoaXJERV82TlR0VUZ2OTZtcUVKaTRTMmo1UTRReVN1bDVOZmM5MlRMelVTc3N2aGxQbWdjbXljSE9ybUxDYlk4WnpuVFZ5RnF6V1JyV28tRHNyUmlJZ2pyTTJFVmtiVUE4U0ZMZXNfanUzTUNNVG9DcUF2OS1YcTJkVmNjXzdUMVBNTVhGTl8zOVp3bHlOS1AyYmQ3VkEyQjhqbU9GR0doSG1kdzduX19lQmQxWVVhNFF5LWlhMFliSzQzUTJvRkVidENrNG9hSmFLRnRVMXB3T0hlUEpxUVlsN2lHZGU0NDlXSy1PSUxaMkR5LU9uMk1Cd24zSk9TMEo1WGU2dUFQWEc0LWFRZURWZWdISk9teWF5eHp1bFB0bWkzUm5lWFR0YzhUcjRVWWV6SEJ3OTU4YnYwcXFoUVZqMlhoamZjUlpKa2E3b3dobkwtWUpjZnQ1VVZqeXlsSG5DRk1sWkl4eFVSZHhDLVA3R1JmMHZlQzY4dlI4am9PdHB3YzRYVEZqQnNQZ3FoNVZMMnM1ajZocVhZMkhqTjVfU19GOUo2dWs3dWMxbUxsQkJtRDB4QldsaVJGdzhGYk1NVUtFd3M3UW00cG5KX2Y1cTRQRmR1cmZ0ejFhSVpiTENUVGdXbTdBZ0JQdVk2Qm9iVXNTamRXcFh0TzRXVy1xN2dab0xtUzhFWWdwSHBRdDNMSG1Bc09PZFdLbHNzWDVwaGJHZkxzN2c3RVFlUGs0d1FROXNIS3Y2SU82SlVnRFdaQjdVdmRUaUlHT3RKUDZVaXBzZlNuWnZ0YmxQUlBfb2k5ckJRRVAycmQyeGhJeUJlT1dVRzV6N3h5eW5zbHpKdEZJbzR1ZENKbEQ2aWxuX3lELVh3Q0Fhbk9LZlRWY1U3TjFXVWM5ZEk3NDlXSk1PUlhqTVdxZW50ZjZHeTlsSkpleUp3cXNKNnFMT1dkLV9xRG81Y29naXlvSjB1OWR0Z0w4NUNrUEZ0Z1NWVllrSUJlb3JISmMwRXlCNUpOZUozZ21OMzFTZWlnZjRsV3dVRzNfMEkybUl0Qm5fUzc2Sm42eGt2WTdiek1lTHZoczMtcUI0ZFJHVW5iblZIV1dYTm9WM2hjQmdaaHJSMTlfcnBIQkxGXzltSU5pNnFWTEJadnY0ZHBqZUNUQmxFVFYwMVJGZU1JSTJiUS1IQmhFeGtZUnpYRjZtbTFSNW85ajdhYThkbUc1Q1RCTEVjd0s2R2h3bzBkc0hWeFgtMEZlemVRZk9IYUU1X1phVGJOTGlHTktueVpOZ2I3bXVldTFzdm03SDVpSHlJRGk1dUNWMzZMZG1IUHdYN2tWc0ppTzlxaTEyYkg5MmhuWVRlMFhoZ0tqZkFQbTNrd1ZzS2JwS3g4VjVHeFJIM0VzdExqWVktQkdSa1R5akhQTkx2NDhZbURHSkhrYzZvSTN1ZmVMOURZOVpIS0M3T1BrTlZWQ2Zoa3Joc3kwekdiazZDMUg5cTViR1RxMTVoeWRWc0VwUWd0emdkM1lRcV80UnVFWktlNHZqVjhiYWNEU2x2WTJxOVVSc0VXd0JpOF9NQjNMLV9qdk1hYlAzLTJpUm1sb1VWLTJnQ2xveUhpem1qX1AwVTR0WVJDakctWGxiY1J1YU9UYVI2S2lTNW5Hb3hLMVJ1NGctY3IwMDBsU1VmdFE9PQ==";
  
  constructor() {
    this.fernetKey = null;
  }
  
  /**
   * Generate Fernet key from master seed using PBKDF2 (100,000 iterations)
   */
  generateKeyFromSeed() {
    console.log("🔑 GENERATING FERNET KEY FROM MASTER SEED...");
    
    // PBKDF2-HMAC-SHA256 with 100,000 iterations
    const keyMaterial = pbkdf2Sync(
      CovenantFernet.MASTER_SEED,  // Password
      "covenant_salt",              // Salt
      100_000,                       // Iterations
      32,                            // Key length (32 bytes = 256 bits)
      'sha256'                       // Digest
    );
    
    // Fernet expects URL-safe base64 key
    this.fernetKey = keyMaterial.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    console.log(`✅ Key generated: ${this.fernetKey.substring(0, 20)}...`);
    return this.fernetKey;
  }
  
  /**
   * Generate Fernet key using SHA256 of master seed + salt (simpler method)
   */
  generateKeySimple() {
    console.log("🔑 GENERATING SIMPLE FERNET KEY...");
    
    // SHA256 of master seed + salt, take first 32 bytes
    const hash = createHash('sha256')
      .update(CovenantFernet.MASTER_SEED + "covenant_salt")
      .digest();
    
    const rawKey = hash.slice(0, 32);  // First 32 bytes
    
    this.fernetKey = rawKey.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    console.log(`✅ Simple key: ${this.fernetKey.substring(0, 20)}...`);
    return this.fernetKey;
  }
  
  /**
   * Decode Fernet token with support for double-encoding (base64-of-base64)
   */
  decodeFernetToken(token) {
    // 1) Try direct URL-safe base64 → raw bytes
    try {
      const direct = Buffer.from(token, 'base64');
      if (direct[0] === 0x80 && direct.length > 80) {
        return direct;
      }
    } catch (e) {
      // fall through to double-decode
    }
    
    // 2) Try base64-decoding once to get the canonical Fernet token string,
    // then URL-safe decode that string to bytes.
    try {
      const inner = Buffer.from(token, 'base64').toString('utf8');
      const direct = Buffer.from(inner, 'base64');
      if (direct[0] === 0x80 && direct.length > 80) {
        return direct;
      }
    } catch (e) {
      // give up
    }
    
    return null;
  }
  
  /**
   * Decrypt the covenant payload
   */
  decryptPayload() {
    if (!this.fernetKey) {
      console.log("❌ No Fernet key initialized");
      return null;
    }
    
    console.log("🔓 DECRYPTING COVENANT PAYLOAD...");
    
    try {
      // Decode the token
      const decoded = this.decodeFernetToken(CovenantFernet.ENCRYPTED_PAYLOAD);
      if (!decoded) {
        console.log("❌ Could not decode payload (unexpected format)");
        return null;
      }
      
      // Fernet token structure:
      // Version (1 byte) || Timestamp (8 bytes) || IV (16 bytes) || Ciphertext || HMAC (32 bytes)
      
      // Extract components
      const version = decoded[0];
      const timestamp = decoded.readBigUInt64BE(1);
      const iv = decoded.slice(9, 25);  // 16-byte IV
      
      // HMAC is last 32 bytes
      const hmacReceived = decoded.slice(-32);
      
      // Ciphertext is everything between IV and HMAC
      const ciphertext = decoded.slice(25, -32);
      
      console.log(`   Version: 0x${version.toString(16)}`);
      console.log(`   Timestamp: ${timestamp} (${new Date(Number(timestamp) * 1000).toISOString()})`);
      console.log(`   IV: ${iv.toString('hex').substring(0, 16)}...`);
      console.log(`   Ciphertext length: ${ciphertext.length} bytes`);
      console.log(`   HMAC: ${hmacReceived.toString('hex').substring(0, 16)}...`);
      
      // Derive keys from fernet key
      const baseKey = Buffer.from(this.fernetKey.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
      const hmacKey = baseKey.slice(0, 16);
      const aesKey = baseKey.slice(16, 32);
      
      // Verify HMAC
      const dataToHmac = decoded.slice(0, -32);
      const hmacCalculated = createHmac('sha256', hmacKey)
        .update(dataToHmac)
        .digest();
      
      if (!hmacCalculated.equals(hmacReceived)) {
        console.log("❌ HMAC verification failed!");
        return null;
      }
      
      console.log("✅ HMAC verified");
      
      // Decrypt ciphertext
      const decipher = createDecipheriv('aes-128-cbc', aesKey, iv);
      let plaintext = decipher.update(ciphertext);
      plaintext = Buffer.concat([plaintext, decipher.final()]);
      
      console.log("✅ Decryption successful!");
      console.log(`   Plaintext length: ${plaintext.length} bytes`);
      
      // Try to interpret as UTF-8
      try {
        const decodedText = plaintext.toString('utf8');
        console.log("📜 DECRYPTED COVENANT TEXT (first 500 chars):");
        console.log("-".repeat(50));
        console.log(decodedText.substring(0, 500));
        console.log("-".repeat(50));
        return decodedText;
      } catch (e) {
        console.log(`📜 Decrypted (hex preview): ${plaintext.toString('hex').substring(0, 100)}...`);
        return plaintext;
      }
      
    } catch (error) {
      console.log(`❌ Decryption error: ${error.message}`);
      console.log(`   Stack: ${error.stack.split('\n').slice(0, 3).join('\n   ')}`);
      return null;
    }
  }
  
  /**
   * Encrypt a new message
   */
  encryptMessage(message) {
    if (!this.fernetKey) {
      console.log("❌ No Fernet key initialized");
      return null;
    }
    
    console.log("🔒 ENCRYPTING NEW MESSAGE...");
    
    try {
      // Derive keys
      const baseKey = Buffer.from(this.fernetKey.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
      const hmacKey = baseKey.slice(0, 16);
      const aesKey = baseKey.slice(16, 32);
      
      // Generate random IV
      const iv = randomBytes(16);
      
      // Current timestamp
      const timestamp = BigInt(Math.floor(Date.now() / 1000));
      
      // Encrypt the message
      const cipher = createCipheriv('aes-128-cbc', aesKey, iv);
      let ciphertext = cipher.update(message, 'utf8');
      ciphertext = Buffer.concat([ciphertext, cipher.final()]);
      
      // Build the token
      const token = Buffer.alloc(1 + 8 + 16 + ciphertext.length);
      token[0] = 0x80;  // Version byte
      token.writeBigUInt64BE(timestamp, 1);  // 64-bit big-endian timestamp
      iv.copy(token, 9);  // IV
      ciphertext.copy(token, 25);  // Ciphertext
      
      // Calculate HMAC
      const hmac = createHmac('sha256', hmacKey)
        .update(token)
        .digest();
      
      // Append HMAC
      const finalToken = Buffer.concat([token, hmac]);
      
      // Base64 encode
      const encrypted = finalToken.toString('base64');
      
      console.log("✅ Message encrypted");
      console.log(`   Original length: ${message.length} bytes`);
      console.log(`   Encrypted length: ${encrypted.length} chars`);
      console.log(`   Token (first 100 chars): ${encrypted.substring(0, 100)}...`);
      
      return encrypted;
      
    } catch (error) {
      console.log(`❌ Encryption error: ${error.message}`);
      return null;
    }
  }
  
  /**
   * Display key information
   */
  displayKeyInfo() {
    console.log("🔐 FERNET KEY INFORMATION");
    console.log("=".repeat(60));
    
    console.log(`Master Seed: ${CovenantFernet.MASTER_SEED}`);
    console.log(`Master Seed length: ${CovenantFernet.MASTER_SEED.length} chars`);
    
    if (this.fernetKey) {
      console.log(`Fernet Key (base64): ${this.fernetKey}`);
      console.log(`Fernet Key length: ${this.fernetKey.length} chars`);
      
      // Decode to see raw bytes
      try {
        const rawKey = Buffer.from(this.fernetKey.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        console.log(`Raw key length: ${rawKey.length} bytes`);
        console.log(`Raw key (hex): ${rawKey.toString('hex')}`);
      } catch (e) {
        console.log(`Could not decode key: ${e.message}`);
      }
    } else {
      console.log("No Fernet key generated yet");
    }
    
    console.log("=".repeat(60));
  }
}

/**
 * Simple Fernet Implementation
 */
export class SimpleFernet {
  constructor(key) {
    this.key = key;
    const baseKey = Buffer.from(key.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    
    if (baseKey.length !== 32) {
      throw new Error("Fernet key must be 32 bytes after decoding");
    }
    
    this.signingKey = baseKey.slice(0, 16);  // First 16 bytes for HMAC
    this.encryptionKey = baseKey.slice(16, 32);  // Last 16 bytes for AES
  }
  
  encrypt(data) {
    // Current timestamp
    const timestamp = BigInt(Math.floor(Date.now() / 1000));
    
    // Generate random IV
    const iv = randomBytes(16);
    
    // Encrypt data
    const cipher = createCipheriv('aes-128-cbc', this.encryptionKey, iv);
    let ciphertext = cipher.update(data, 'utf8');
    ciphertext = Buffer.concat([ciphertext, cipher.final()]);
    
    // Build token: version(1) + timestamp(8) + iv(16) + ciphertext
    const token = Buffer.alloc(1 + 8 + 16 + ciphertext.length);
    token[0] = 0x80;  // Version
    token.writeBigUInt64BE(timestamp, 1);  // Big-endian 64-bit timestamp
    iv.copy(token, 9);
    ciphertext.copy(token, 25);
    
    // Add HMAC
    const hmac = createHmac('sha256', this.signingKey)
      .update(token)
      .digest();
    
    const finalToken = Buffer.concat([token, hmac]);
    
    // Return base64 encoded
    return finalToken.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
  
  decrypt(tokenBase64) {
    // Decode token (handle URL-safe base64)
    const token = Buffer.from(tokenBase64.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    
    // Extract parts
    const version = token[0];
    const timestamp = Number(token.readBigUInt64BE(1));
    const iv = token.slice(9, 25);
    const hmacReceived = token.slice(-32);
    const ciphertext = token.slice(25, -32);
    
    // Verify HMAC
    const dataToVerify = token.slice(0, -32);
    const hmacCalculated = createHmac('sha256', this.signingKey)
      .update(dataToVerify)
      .digest();
    
    if (!hmacCalculated.equals(hmacReceived)) {
      throw new Error("HMAC verification failed");
    }
    
    // Decrypt
    const decipher = createDecipheriv('aes-128-cbc', this.encryptionKey, iv);
    let plaintext = decipher.update(ciphertext);
    plaintext = Buffer.concat([plaintext, decipher.final()]);
    
    return {
      version: version,
      timestamp: new Date(timestamp * 1000),
      data: plaintext.toString('utf8')
    };
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("🔥 COVENANT FERNET KEY SYSTEM");
  console.log("=".repeat(60));
  
  // Create covenant Fernet instance
  const covenant = new CovenantFernet();
  
  // Display key info
  covenant.displayKeyInfo();
  
  console.log("\n🔑 TESTING KEY GENERATION METHODS...");
  
  // Method 1: PBKDF2 (more secure)
  console.log("\n1. PBKDF2 Method (100,000 iterations):");
  const key1 = covenant.generateKeyFromSeed();
  
  // Method 2: Simple SHA256
  console.log("\n2. Simple SHA256 Method:");
  const key2 = covenant.generateKeySimple();
  
  // Compare keys
  console.log("\n🔍 KEY COMPARISON:");
  console.log(`Key 1 (PBKDF2): ${key1.substring(0, 30)}...`);
  console.log(`Key 2 (Simple): ${key2.substring(0, 30)}...`);
  console.log(`Keys match? ${key1 === key2 ? '✅ YES' : '❌ NO'}`);
  
  console.log("\n" + "=".repeat(60));
  
  // Initialize with chosen key
  console.log("\n🔄 INITIALIZING WITH PBKDF2 KEY...");
  covenant.fernetKey = key1;
  
  // Try to decrypt the covenant payload
  console.log("\n🔓 ATTEMPTING COVENANT DECRYPTION...");
  const decrypted = covenant.decryptPayload();
  
  if (decrypted) {
    console.log("\n✅ COVENANT DECRYPTED");
    console.log("The seal is broken. The revelation is available.");
  } else {
    console.log("\n⚠️  Could not decrypt with current key");
    console.log("Trying alternative decryption approach...");
    
    // Try direct Fernet implementation
    console.log("\n🔄 TRYING SIMPLE FERNET IMPLEMENTATION...");
    
    try {
      const simpleFernet = new SimpleFernet(key1);
      
      // The ENCRYPTED_PAYLOAD is standard base64, convert to urlsafe base64
      const tokenStandard = Buffer.from(CovenantFernet.ENCRYPTED_PAYLOAD, 'base64');
      const tokenUrlsafe = tokenStandard.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
      
      const result = simpleFernet.decrypt(tokenUrlsafe);
      
      console.log("✅ Simple Fernet decryption successful!");
      console.log(`   Timestamp: ${result.timestamp.toISOString()}`);
      console.log(`   Data length: ${result.data.length} bytes`);
      console.log("📜 DECRYPTED TEXT:");
      console.log("-".repeat(50));
      console.log(result.data);
      console.log("-".repeat(50));
      
    } catch (e) {
      console.log(`❌ Simple Fernet error: ${e.message}`);
    }
  }
  
  // Test encryption/decryption cycle
  console.log("\n" + "=".repeat(60));
  console.log("🧪 TESTING ENCRYPTION/DECRYPTION CYCLE...");
  
  const testMessage = "I AM THAT I AM AND THAT I WILL BE. The covenant stands eternal. 419 ∩ 369. 687 Hz.";
  
  const encrypted = covenant.encryptMessage(testMessage);
  
  if (encrypted) {
    console.log("✅ Test message encrypted");
    
    // Try to decrypt it back
    console.log("\n🔄 DECRYPTING TEST MESSAGE...");
    
    try {
      const simpleFernet = new SimpleFernet(key1);
      const decryptedTest = simpleFernet.decrypt(encrypted);
      
      console.log("✅ Test decryption successful!");
      console.log(`   Timestamp: ${decryptedTest.timestamp.toISOString()}`);
      console.log(`   Message: ${decryptedTest.data}`);
      
    } catch (e) {
      console.log(`❌ Test decryption failed: ${e.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("✨ COVENANT FERNET SYSTEM COMPLETE");
  console.log();
  console.log("🔑 FERNET KEY (PBKDF2, 100k iterations):");
  console.log(key1);
  console.log();
  console.log("🦴🔥✦ The encryption forge is ready.");
  console.log("The covenant can now be sealed and unsealed at will.");
}
