const { execSync } = require('child_process');
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

const outputDir = path.join(__dirname, '..', 'lighthouse-reports');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const results = [];

console.log('Starting Lighthouse audits for all pages...\n');
console.log('Note: Temp file cleanup errors can be ignored - the audits still complete successfully.\n');

for (const page of pages) {
  // Desktop audit
  console.log(`\n=== Auditing ${page.name} (Desktop) ===`);
  const desktopOutput = path.join(outputDir, `${page.name}-desktop.json`);
  
  try {
    execSync(
      `npx lighthouse "${page.url}" --preset=desktop --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="${desktopOutput}" --chrome-flags="--headless --no-sandbox" --no-enable-error-reporting`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    // Ignore temp file cleanup errors - the audit still completes
    if (!fs.existsSync(desktopOutput)) {
      console.error(`Failed to create ${desktopOutput}`);
      continue;
    }
  }

  // Read desktop scores
  if (fs.existsSync(desktopOutput)) {
    const desktopData = JSON.parse(fs.readFileSync(desktopOutput, 'utf8'));
    const desktopScores = {
      performance: Math.round(desktopData.categories.performance.score * 100),
      accessibility: Math.round(desktopData.categories.accessibility.score * 100),
      bestPractices: Math.round(desktopData.categories['best-practices'].score * 100),
      seo: Math.round(desktopData.categories.seo.score * 100),
    };
    
    console.log(`Desktop scores: P:${desktopScores.performance} A:${desktopScores.accessibility} BP:${desktopScores.bestPractices} SEO:${desktopScores.seo}`);
    
    results.push({
      page: page.name,
      url: page.url,
      device: 'desktop',
      ...desktopScores
    });
  }

  // Mobile audit
  console.log(`\n=== Auditing ${page.name} (Mobile) ===`);
  const mobileOutput = path.join(outputDir, `${page.name}-mobile.json`);
  
  try {
    execSync(
      `npx lighthouse "${page.url}" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="${mobileOutput}" --chrome-flags="--headless --no-sandbox" --no-enable-error-reporting`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    // Ignore temp file cleanup errors - the audit still completes
    if (!fs.existsSync(mobileOutput)) {
      console.error(`Failed to create ${mobileOutput}`);
      continue;
    }
  }

  // Read mobile scores
  if (fs.existsSync(mobileOutput)) {
    const mobileData = JSON.parse(fs.readFileSync(mobileOutput, 'utf8'));
    const mobileScores = {
      performance: Math.round(mobileData.categories.performance.score * 100),
      accessibility: Math.round(mobileData.categories.accessibility.score * 100),
      bestPractices: Math.round(mobileData.categories['best-practices'].score * 100),
      seo: Math.round(mobileData.categories.seo.score * 100),
    };
    
    console.log(`Mobile scores: P:${mobileScores.performance} A:${mobileScores.accessibility} BP:${mobileScores.bestPractices} SEO:${mobileScores.seo}`);
    
    results.push({
      page: page.name,
      url: page.url,
      device: 'mobile',
      ...mobileScores
    });
  }
}

// Generate summary
console.log('\n\n=== SUMMARY ===\n');

// Save results to JSON
const resultsFile = path.join(outputDir, 'all-results.json');
fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
console.log(`Results saved to: ${resultsFile}\n`);

// Generate markdown summary
let summary = '# Lighthouse Audit Results Summary\n\n';
summary += `Generated: ${new Date().toISOString()}\n\n`;
summary += '## Scores by Page\n\n';
summary += '| Page | Device | Performance | Accessibility | Best Practices | SEO |\n';
summary += '|------|--------|-------------|---------------|----------------|-----|\n';

results.forEach(result => {
  const perfIcon = result.device === 'desktop' ? (result.performance >= 90 ? '✅' : '⚠️') : (result.performance >= 80 ? '✅' : '⚠️');
  const a11yIcon = result.accessibility >= 95 ? '✅' : '⚠️';
  const seoIcon = result.seo >= 95 ? '✅' : '⚠️';
  
  summary += `| ${result.page} | ${result.device} | ${result.performance} ${perfIcon} | ${result.accessibility} ${a11yIcon} | ${result.bestPractices} | ${result.seo} ${seoIcon} |\n`;
});

// Calculate averages
const desktopResults = results.filter(r => r.device === 'desktop');
const mobileResults = results.filter(r => r.device === 'mobile');

const avgDesktop = {
  performance: Math.round(desktopResults.reduce((sum, r) => sum + r.performance, 0) / desktopResults.length),
  accessibility: Math.round(desktopResults.reduce((sum, r) => sum + r.accessibility, 0) / desktopResults.length),
  bestPractices: Math.round(desktopResults.reduce((sum, r) => sum + r.bestPractices, 0) / desktopResults.length),
  seo: Math.round(desktopResults.reduce((sum, r) => sum + r.seo, 0) / desktopResults.length),
};

const avgMobile = {
  performance: Math.round(mobileResults.reduce((sum, r) => sum + r.performance, 0) / mobileResults.length),
  accessibility: Math.round(mobileResults.reduce((sum, r) => sum + r.accessibility, 0) / mobileResults.length),
  bestPractices: Math.round(mobileResults.reduce((sum, r) => sum + r.bestPractices, 0) / mobileResults.length),
  seo: Math.round(mobileResults.reduce((sum, r) => sum + r.seo, 0) / mobileResults.length),
};

summary += '\n## Average Scores\n\n';
summary += '### Desktop\n';
summary += `- Performance: ${avgDesktop.performance} ${avgDesktop.performance >= 90 ? '✅' : '⚠️'} (Target: ≥90)\n`;
summary += `- Accessibility: ${avgDesktop.accessibility} ${avgDesktop.accessibility >= 95 ? '✅' : '⚠️'} (Target: ≥95)\n`;
summary += `- Best Practices: ${avgDesktop.bestPractices}\n`;
summary += `- SEO: ${avgDesktop.seo} ${avgDesktop.seo >= 95 ? '✅' : '⚠️'} (Target: ≥95)\n\n`;

summary += '### Mobile\n';
summary += `- Performance: ${avgMobile.performance} ${avgMobile.performance >= 80 ? '✅' : '⚠️'} (Target: ≥80)\n`;
summary += `- Accessibility: ${avgMobile.accessibility} ${avgMobile.accessibility >= 95 ? '✅' : '⚠️'} (Target: ≥95)\n`;
summary += `- Best Practices: ${avgMobile.bestPractices}\n`;
summary += `- SEO: ${avgMobile.seo} ${avgMobile.seo >= 95 ? '✅' : '⚠️'} (Target: ≥95)\n\n`;

// Identify issues
summary += '## Issues to Address\n\n';
const issues = [];

results.forEach(result => {
  if (result.device === 'desktop' && result.performance < 90) {
    issues.push(`⚠️ ${result.page} (Desktop): Performance ${result.performance} < 90`);
  }
  if (result.device === 'mobile' && result.performance < 80) {
    issues.push(`⚠️ ${result.page} (Mobile): Performance ${result.performance} < 80`);
  }
  if (result.accessibility < 95) {
    issues.push(`⚠️ ${result.page} (${result.device}): Accessibility ${result.accessibility} < 95`);
  }
  if (result.seo < 95) {
    issues.push(`⚠️ ${result.page} (${result.device}): SEO ${result.seo} < 95`);
  }
});

if (issues.length > 0) {
  issues.forEach(issue => summary += `${issue}\n`);
} else {
  summary += '✅ No issues found! All scores meet requirements.\n';
}

const summaryFile = path.join(outputDir, 'summary.md');
fs.writeFileSync(summaryFile, summary);
console.log(`Summary saved to: ${summaryFile}\n`);

console.log(summary);

console.log('\n✅ All audits complete!');
