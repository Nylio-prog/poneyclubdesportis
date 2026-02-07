const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const pages = [
  { url: 'http://localhost:3000/', name: 'home-fr' },
  { url: 'http://localhost:3000/en', name: 'home-en' },
  { url: 'http://localhost:3000/le-club', name: 'le-club-fr' },
  { url: 'http://localhost:3000/en/le-club', name: 'le-club-en' },
  { url: 'http://localhost:3000/photos', name: 'photos-fr' },
  { url: 'http://localhost:3000/en/photos', name: 'photos-en' },
  { url: 'http://localhost:3000/cavalerie', name: 'cavalerie-fr' },
  { url: 'http://localhost:3000/en/cavalerie', name: 'cavalerie-en' },
  { url: 'http://localhost:3000/actualites', name: 'actualites-fr' },
  { url: 'http://localhost:3000/en/actualites', name: 'actualites-en' },
  { url: 'http://localhost:3000/cours', name: 'cours-fr' },
  { url: 'http://localhost:3000/en/cours', name: 'cours-en' },
  { url: 'http://localhost:3000/pensions', name: 'pensions-fr' },
  { url: 'http://localhost:3000/en/pensions', name: 'pensions-en' },
  { url: 'http://localhost:3000/contact', name: 'contact-fr' },
  { url: 'http://localhost:3000/en/contact', name: 'contact-en' },
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
    emulatedUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
  const chrome = await chromeLauncher.launch({ 
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
    chromePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options, config);

  await chrome.kill();

  const { lhr } = runnerResult;
  const scores = {
    performance: lhr.categories.performance.score * 100,
    accessibility: lhr.categories.accessibility.score * 100,
    bestPractices: lhr.categories['best-practices'].score * 100,
    seo: lhr.categories.seo.score * 100,
  };

  return {
    url,
    name,
    device,
    scores,
    audits: lhr.audits,
  };
}

async function main() {
  const results = [];
  const outputDir = path.join(__dirname, '..', 'lighthouse-reports');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting Lighthouse audits...\n');

  for (const page of pages) {
    console.log(`Auditing ${page.name} (Desktop)...`);
    const desktopResult = await runLighthouse(page.url, desktopConfig, page.name, 'desktop');
    results.push(desktopResult);
    console.log(`  Performance: ${desktopResult.scores.performance.toFixed(0)}`);
    console.log(`  Accessibility: ${desktopResult.scores.accessibility.toFixed(0)}`);
    console.log(`  Best Practices: ${desktopResult.scores.bestPractices.toFixed(0)}`);
    console.log(`  SEO: ${desktopResult.scores.seo.toFixed(0)}\n`);

    console.log(`Auditing ${page.name} (Mobile)...`);
    const mobileResult = await runLighthouse(page.url, mobileConfig, page.name, 'mobile');
    results.push(mobileResult);
    console.log(`  Performance: ${mobileResult.scores.performance.toFixed(0)}`);
    console.log(`  Accessibility: ${mobileResult.scores.accessibility.toFixed(0)}`);
    console.log(`  Best Practices: ${mobileResult.scores.bestPractices.toFixed(0)}`);
    console.log(`  SEO: ${mobileResult.scores.seo.toFixed(0)}\n`);
  }

  // Save detailed results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsFile = path.join(outputDir, `lighthouse-results-${timestamp}.json`);
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

  // Generate summary report
  const summary = generateSummary(results);
  const summaryFile = path.join(outputDir, `lighthouse-summary-${timestamp}.md`);
  fs.writeFileSync(summaryFile, summary);

  console.log(`\nResults saved to ${outputDir}`);
  console.log(`Summary: ${summaryFile}`);
}

function generateSummary(results) {
  let summary = '# Lighthouse Audit Summary\n\n';
  summary += `Generated: ${new Date().toISOString()}\n\n`;

  // Group by page
  const pageGroups = {};
  results.forEach(result => {
    if (!pageGroups[result.name]) {
      pageGroups[result.name] = {};
    }
    pageGroups[result.name][result.device] = result;
  });

  summary += '## Scores by Page\n\n';
  summary += '| Page | Device | Performance | Accessibility | Best Practices | SEO |\n';
  summary += '|------|--------|-------------|---------------|----------------|-----|\n';

  Object.keys(pageGroups).forEach(pageName => {
    const page = pageGroups[pageName];
    ['desktop', 'mobile'].forEach(device => {
      if (page[device]) {
        const scores = page[device].scores;
        summary += `| ${pageName} | ${device} | ${scores.performance.toFixed(0)} | ${scores.accessibility.toFixed(0)} | ${scores.bestPractices.toFixed(0)} | ${scores.seo.toFixed(0)} |\n`;
      }
    });
  });

  summary += '\n## Average Scores\n\n';
  const avgScores = {
    desktop: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, count: 0 },
    mobile: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0, count: 0 },
  };

  results.forEach(result => {
    const device = result.device;
    avgScores[device].performance += result.scores.performance;
    avgScores[device].accessibility += result.scores.accessibility;
    avgScores[device].bestPractices += result.scores.bestPractices;
    avgScores[device].seo += result.scores.seo;
    avgScores[device].count++;
  });

  ['desktop', 'mobile'].forEach(device => {
    const avg = avgScores[device];
    if (avg.count > 0) {
      summary += `\n### ${device.charAt(0).toUpperCase() + device.slice(1)}\n`;
      summary += `- Performance: ${(avg.performance / avg.count).toFixed(1)}\n`;
      summary += `- Accessibility: ${(avg.accessibility / avg.count).toFixed(1)}\n`;
      summary += `- Best Practices: ${(avg.bestPractices / avg.count).toFixed(1)}\n`;
      summary += `- SEO: ${(avg.seo / avg.count).toFixed(1)}\n`;
    }
  });

  // Identify issues
  summary += '\n## Issues to Address\n\n';
  const issues = new Set();

  results.forEach(result => {
    if (result.scores.performance < 90 && result.device === 'desktop') {
      issues.add(`⚠️ ${result.name} (Desktop): Performance score ${result.scores.performance.toFixed(0)} is below 90`);
    }
    if (result.scores.performance < 80 && result.device === 'mobile') {
      issues.add(`⚠️ ${result.name} (Mobile): Performance score ${result.scores.performance.toFixed(0)} is below 80`);
    }
    if (result.scores.accessibility < 95) {
      issues.add(`⚠️ ${result.name} (${result.device}): Accessibility score ${result.scores.accessibility.toFixed(0)} is below 95`);
    }
    if (result.scores.seo < 95) {
      issues.add(`⚠️ ${result.name} (${result.device}): SEO score ${result.scores.seo.toFixed(0)} is below 95`);
    }
  });

  if (issues.size > 0) {
    Array.from(issues).forEach(issue => {
      summary += `${issue}\n`;
    });
  } else {
    summary += 'No issues found! All scores meet the requirements.\n';
  }

  return summary;
}

main().catch(console.error);
