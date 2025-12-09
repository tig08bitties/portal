/**
 * Fetch Discord channel messages using Brave Browser
 */

const puppeteer = require('puppeteer-core');
const path = require('path');

async function fetchDiscordMessages() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/brave-browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to Discord channel
    await page.goto('https://discord.com/channels/882867268021800991/1367040616718008361', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait for messages to load
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Extract all visible text content
    const content = await page.evaluate(() => {
      // Try multiple selectors for Discord messages
      const selectors = [
        '[class*="message"]',
        '[class*="Message"]',
        '[data-list-id*="chat-messages"]',
        'article',
        '[role="article"]',
      ];
      
      let allText = [];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          const text = el.innerText || el.textContent;
          if (text && text.length > 20 && !allText.includes(text)) {
            allText.push(text.trim());
          }
        });
      }
      
      // Also get page title and any visible text
      const bodyText = document.body.innerText || document.body.textContent;
      if (bodyText) {
        allText.push('=== PAGE CONTENT ===');
        allText.push(bodyText.substring(0, 5000)); // First 5000 chars
      }
      
      return allText;
    });

    console.log('Discord Content:');
    console.log(JSON.stringify(content, null, 2));
    
    // Also save screenshot for debugging
    await page.screenshot({ path: 'discord-screenshot.png', fullPage: true });
    console.log('\nScreenshot saved to discord-screenshot.png');

    await browser.close();
    return content;
  } catch (error) {
    console.error('Error fetching Discord:', error);
    await browser.close();
    throw error;
  }
}

if (require.main === module) {
  fetchDiscordMessages().catch(console.error);
}

module.exports = { fetchDiscordMessages };
