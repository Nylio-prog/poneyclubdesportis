const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Test with just a few pages first
const pages = [
  { url: 'http://localhost:3000/', name: 'home-fr' },
  { url: 'http://localhost:3000/en', name: 'home-en' },
];

const desktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
};

async function runLighthouse(url, config, name, device) {
  console.log(`\nLaunching browser for ${name} (${device})...`);
  const chrome = await chromeLauncher.launch({ 
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    chromePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  
  console.log(`Running Lighthouse audit...`);
  const options = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options, config);

  await chrome.kill();
  console.log(`Browser closed.`);

  const { lhr } = runnerResult;
  const scores = {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
  };

  return {
    url,
    name,
    device,
    scores,
  };
}

async function main() {
  const results = [];

  console.log('Starting Lighthouse audits (simplified)...\n');

  for (const page of pages) {
    try {
      console.log(`\n=== Auditing ${page.name} ===`);
      
      const desktopResult = await runLighthouse(page.url, desktopConfig, page.name, 'desktop');
      results.push(desktopResult);
      console.log(`Desktop scores:`);
      console.log(`  Performance: ${desktopResult.scores.performance}`);
      console.log(`  Accessibility: ${desktopResult.scores.accessibility}`);
      console.log(`  Best Practices: ${desktopResult.scores.bestPractices}`);
      console.log(`  SEO: ${desktopResult.scores.seo}`);

      const mobileResult = await runLighthouse(page.url, mobileConfig, page.name, 'mobile');
      results.push(mobileResult);
      console.log(`Mobile scores:`);
      console.log(`  Performance: ${mobileResult.scores.performance}`);
      console.log(`  Accessibility: ${mobileResult.scores.accessibility}`);
      console.log(`  Best Practices: ${mobileResult.scores.bestPractices}`);
      console.log(`  SEO: ${mobileResult.scores.seo}`);
    } catch (error) {
      console.error(`Error auditing ${page.name}:`, error.message);
    }
  }

  console.log('\n\n=== Summary ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
