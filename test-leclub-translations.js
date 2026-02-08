// Quick test to verify leClub translations exist in both languages
const fs = require('fs');

const frMessages = JSON.parse(fs.readFileSync('./messages/fr.json', 'utf8'));
const enMessages = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));

console.log('=== Testing leClub Translations ===\n');

// Test if leClub section exists
console.log('FR leClub exists:', !!frMessages.leClub);
console.log('EN leClub exists:', !!enMessages.leClub);

// Test specific keys
const testKeys = [
  'title',
  'diplomas',
  'diplomasIntro',
  'rules',
  'history',
  'partner',
  'intro1',
  'intro2',
  'timeline.2008.title',
  'timeline.2008.description',
  'diplomas.bpjepsBB'
];

console.log('\n=== Key Comparison ===\n');

testKeys.forEach(key => {
  const keys = key.split('.');
  let frValue = frMessages.leClub;
  let enValue = enMessages.leClub;
  
  for (const k of keys) {
    frValue = frValue?.[k];
    enValue = enValue?.[k];
  }
  
  console.log(`Key: leClub.${key}`);
  console.log(`  FR: ${frValue ? '✓' : '✗'} ${frValue ? (typeof frValue === 'string' ? `"${frValue.substring(0, 50)}..."` : '[Object]') : 'MISSING'}`);
  console.log(`  EN: ${enValue ? '✓' : '✗'} ${enValue ? (typeof enValue === 'string' ? `"${enValue.substring(0, 50)}..."` : '[Object]') : 'MISSING'}`);
  console.log('');
});

console.log('=== Test Complete ===');
