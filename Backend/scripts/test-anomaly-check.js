const { checkSingleReadingAnomaly } = require('../services/aiEngine');

console.log('Testing Single Reading Anomaly Detection:');

// Test Case 1: 200 L Water (Baseline is 348 L) -> Should NOT be an anomaly
const readingNormal = {
  resourceType: 'Water',
  building: 'Hostel 1',
  value: 200,
  unit: 'L'
};
const res1 = checkSingleReadingAnomaly(readingNormal, []);
console.log('Test 1 (200 L Water vs 348 L baseline):');
console.log(`  isAnomaly: ${res1.isAnomaly}`);
console.log(`  percentDiff: ${res1.percentDiff}%`);
console.log(`  Expected: false, Actual: ${res1.isAnomaly}`);

// Test Case 2: 600 L Water (Baseline is 348 L) -> SHOULD be an anomaly (>1.5x)
const readingSpike = {
  resourceType: 'Water',
  building: 'Hostel 1',
  value: 600,
  unit: 'L'
};
const res2 = checkSingleReadingAnomaly(readingSpike, []);
console.log('\nTest 2 (600 L Water vs 348 L baseline):');
console.log(`  isAnomaly: ${res2.isAnomaly}`);
console.log(`  percentDiff: ${res2.percentageDiff}%`);
console.log(`  severity: ${res2.severity}`);
console.log(`  Expected: true, Actual: ${res2.isAnomaly}`);
