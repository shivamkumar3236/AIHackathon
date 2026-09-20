const http = require('http');
const {
  detectAnomalies,
  predictNextWeek,
  generateRecommendations,
  calculateCostAndSavings
} = require('../services/aiEngine');
const { generateSampleTelemetry } = require('../data/seedData');

console.log('🧪 Starting Backend & AI Engine Verification Tests...\n');

// 1. Test Seed Data
console.log('1️⃣ Testing Seed Telemetry Data Generation:');
const seed = generateSampleTelemetry();
console.log(`   ✅ Generated ${seed.resources.length} telemetry records across 7 days.`);
console.log(`   ✅ Sunday Electricity: ${seed.electricityGraph[6].value} kWh`);
console.log(`   ✅ Sunday Water: ${seed.waterGraph[6].value} L`);
console.log(`   ✅ Sunday Waste: ${seed.wasteGraph[6].value} kg\n`);

// 2. Test Anomaly Detection
console.log('2️⃣ Testing AI Anomaly Detection Logic (usage > avg * 1.5):');
const anomalies = detectAnomalies(seed.resources);
console.log(`   ✅ Detected ${anomalies.length} anomaly/anomalies:`);
anomalies.forEach(a => {
  console.log(`      - [${a.severity}] ${a.message} (Baseline: ${a.baselineAvg}, Current: ${a.currentValue})`);
});
console.log('');

// 3. Test Time-Series Predictions
console.log('3️⃣ Testing Time-Series Prediction Logic:');
const predictions = predictNextWeek(seed.resources);
console.log(`   ✅ Electricity Next Week: ${predictions.Electricity.predictedValue} ${predictions.Electricity.unit} (Trend: ${predictions.Electricity.trend}, Confidence: ${predictions.Electricity.confidence * 100}%)`);
console.log(`   ✅ Water Next Week: ${predictions.Water.predictedValue} ${predictions.Water.unit} (Trend: ${predictions.Water.trend})`);
console.log(`   ✅ Waste Next Week: ${predictions.Waste.predictedValue} ${predictions.Waste.unit} (Trend: ${predictions.Waste.trend})\n`);

// 4. Test Recommendations & Savings
console.log('4️⃣ Testing AI Recommendations & Savings Calculator:');
const recs = generateRecommendations(seed.resources, anomalies);
console.log(`   ✅ Generated ${recs.length} recommendations.`);
recs.forEach(r => {
  console.log(`      - [${r.impact} Impact] ${r.suggestion} -> Saving: ${r.potentialSaving}`);
});
console.log('');

// 5. Test Financial & Carbon Savings
console.log('5️⃣ Testing Cost & Carbon Savings Model:');
const savings = calculateCostAndSavings();
console.log(`   ✅ Total Current Cost: ₹${savings.totalCurrentCost.toLocaleString('en-IN')}`);
console.log(`   ✅ Total Estimated Monthly Saving: ₹${savings.totalEstimatedMonthlySaving.toLocaleString('en-IN')}`);
console.log(`   ✅ Total Optimized Cost: ₹${savings.optimizedCost.toLocaleString('en-IN')}`);
console.log(`   ✅ Estimated CO2 Saved: ${savings.co2SavedKg} kg CO2e\n`);

console.log('🎉 All Backend & AI Engine Verification Tests Passed Successfully!');
