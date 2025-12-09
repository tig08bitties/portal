#!/usr/bin/env node
/**
 * Covenant Integration Script
 * Pulls foundation data from /covenant directory and integrates with bridgeworld-lol
 */

const fs = require('fs');
const path = require('path');

const COVENANT_DIR = '/home/tig0_0bitties/covenant';
const PROJECT_DIR = '/home/tig0_0bitties/bridgeworld-lol';

async function loadCovenantData() {
  const data = {
    constants: {
      theos: 419,
      el: 369,
      torahPages: 1798,
      resonance: 687,
      hebrewPaths: 22,
    },
    guardians: [],
    integrations: [],
  };

  try {
    // Load integration summary
    const summaryPath = path.join(
      COVENANT_DIR,
      'bridgeworld_deployment_full',
      'COMPLETE_INTEGRATION_SUMMARY.md'
    );
    if (fs.existsSync(summaryPath)) {
      const summary = fs.readFileSync(summaryPath, 'utf-8');
      
      // Extract oracle address
      const oracleMatch = summary.match(/Oracle Contract.*?`([^`]+)`/);
      if (oracleMatch) {
        data.oracleAddress = oracleMatch[1];
      }
    }

    // Load decoded key-map data
    const decodedPath = path.join(
      COVENANT_DIR,
      'bridgeworld_deployment_full',
      'images',
      'key_map_decoded.json'
    );
    if (fs.existsSync(decodedPath)) {
      data.decodedData = JSON.parse(fs.readFileSync(decodedPath, 'utf-8'));
    }

    // Also try the Pictures directory
    const picturesDecodedPath = path.join(
      '/home/tig0_0bitties/Pictures',
      'key_map_decoded_pictures.json'
    );
    if (fs.existsSync(picturesDecodedPath)) {
      data.decodedData = JSON.parse(fs.readFileSync(picturesDecodedPath, 'utf-8'));
    }

    // Load integration configs
    const integrationPath = path.join(
      COVENANT_DIR,
      'bridgeworld_deployment_full',
      'decoded_lore_integration.json'
    );
    if (fs.existsSync(integrationPath)) {
      const integration = JSON.parse(fs.readFileSync(integrationPath, 'utf-8'));
      data.integrations = Object.keys(integration);
    }

    console.log('✅ Loaded covenant foundation data');
  } catch (error) {
    console.error('Error loading covenant data:', error.message);
  }

  return data;
}

async function integrateCovenantData(data) {
  // Create integration config file
  const integrationConfig = {
    foundation: data.constants,
    oracle: {
      address: data.oracleAddress || '0xfa05997C66437dCCAe860af334b30d69E0De24DC',
      network: 'arbitrum',
    },
    guardians: data.guardians,
    integrations: data.integrations,
    decodedData: data.decodedData,
    timestamp: new Date().toISOString(),
  };

  const configPath = path.join(PROJECT_DIR, 'covenant-integration.json');
  fs.writeFileSync(configPath, JSON.stringify(integrationConfig, null, 2));
  console.log('✅ Created covenant integration config');

  // Update the covenant-glass.ts with real data
  const glassPath = path.join(PROJECT_DIR, 'lib', 'covenant-glass.ts');
  if (fs.existsSync(glassPath)) {
    let glassContent = fs.readFileSync(glassPath, 'utf-8');
    
    // Update oracle address if found
    if (data.oracleAddress) {
      glassContent = glassContent.replace(
        /oracleAddress: '0x[^']+'/,
        `oracleAddress: '${data.oracleAddress}'`
      );
    }

    fs.writeFileSync(glassPath, glassContent);
    console.log('✅ Updated covenant glass with real data');
  }

  return integrationConfig;
}

async function copyCovenantAssets() {
  const assetsToCopy = [
    {
      from: path.join(COVENANT_DIR, 'bridgeworld_deployment_full', 'images', 'key_map_decoded.json'),
      to: path.join(PROJECT_DIR, 'public', 'covenant-key-map.json'),
    },
    {
      from: path.join('/home/tig0_0bitties/Pictures', 'key_map_decoded_pictures.json'),
      to: path.join(PROJECT_DIR, 'public', 'key_map_decoded_pictures.json'),
    },
  ];

  for (const asset of assetsToCopy) {
    if (fs.existsSync(asset.from)) {
      // Ensure destination directory exists
      const destDir = path.dirname(asset.to);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(asset.from, asset.to);
      console.log(`✅ Copied ${path.basename(asset.from)}`);
    }
  }
}

async function main() {
  console.log('🔮 Starting Covenant Integration...\n');

  try {
    // Load covenant foundation
    const covenantData = await loadCovenantData();

    // Integrate data
    const integration = await integrateCovenantData(covenantData);

    // Copy assets
    await copyCovenantAssets();

    console.log('\n✨ Covenant Integration Complete!');
    console.log('\nIntegration Summary:');
    console.log(`- Oracle Address: ${integration.oracle.address}`);
    console.log(`- Constants: THEOS=${integration.foundation.theos}, EL=${integration.foundation.el}`);
    console.log(`- Integrations: ${integration.integrations.length} systems`);
    console.log(`- Config saved to: covenant-integration.json`);

  } catch (error) {
    console.error('❌ Integration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { loadCovenantData, integrateCovenantData };
