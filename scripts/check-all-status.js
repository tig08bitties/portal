#!/usr/bin/env node

/**
 * Check All Status
 * Check site status and integrate TreasureDAO devlog/archives
 */

const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

console.log('🌐 Checking All Status...\n');

const sites = [
  'https://bridgeworld.lol',
  'https://treasure-dao.notion.site/Devlog-10-June-25-2025-21d00bd423af80168a80f4e13a44e6f4',
  'https://archive.org/details/diablo-2-lords-of-destruction',
  'https://archive.org/details/matt-uelmen-diablo-ii-soundtrack-outtakes',
  'https://archive.org/download/diablo-kodi-build',
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const startTime = Date.now();
    
    const req = client.get(url, { timeout: 5000 }, (res) => {
      const responseTime = Date.now() - startTime;
      resolve({
        url,
        status: res.statusCode === 200 ? 'online' : 'error',
        statusCode: res.statusCode,
        responseTime,
      });
    });

    req.on('error', () => {
      resolve({
        url,
        status: 'offline',
        responseTime: Date.now() - startTime,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'timeout',
        responseTime: Date.now() - startTime,
      });
    });
  });
}

async function checkAllSites() {
  console.log('📊 Checking Site Status:\n');
  
  for (const site of sites) {
    const result = await checkUrl(site);
    const statusIcon = result.status === 'online' ? '✅' : result.status === 'offline' ? '❌' : '⚠️';
    
    console.log(`${statusIcon} ${site}`);
    console.log(`   Status: ${result.status}`);
    if (result.statusCode) {
      console.log(`   Code: ${result.statusCode}`);
    }
    if (result.responseTime) {
      console.log(`   Time: ${result.responseTime}ms`);
    }
    console.log('');
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

checkAllSites().then(() => {
  console.log('✨ Status check complete!\n');
  console.log('🌐 Portal: https://bridgeworld.lol');
  console.log('📝 Devlog: https://treasure-dao.notion.site/Devlog-10-June-25-2025-21d00bd423af80168a80f4e13a44e6f4');
  console.log('📦 Archives: Integrated');
});
