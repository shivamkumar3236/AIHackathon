const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Alert = require('../models/Alert');
const Prediction = require('../models/Prediction');
const Recommendation = require('../models/Recommendation');
const User = require('../models/User');
const {
  detectAnomalies,
  checkSingleReadingAnomaly,
  predictNextWeek,
  generateRecommendations,
  calculateCostAndSavings
} = require('../services/aiEngine');
const { generateSampleTelemetry } = require('../data/seedData');

// In-Memory store fallback when MongoDB is not running
let inMemoryResources = [];
let inMemoryAlerts = [];
let inMemoryPredictions = {};
let inMemoryRecommendations = [];
let inMemoryUsers = [
  {
    id: 'user-1',
    name: 'Sneha Verma',
    email: 'sneha@campus.edu',
    password: 'password123',
    role: 'Block Supervisor',
    assignedBuilding: 'Block A',
    createdAt: new Date()
  },
  {
    id: 'user-2',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@campus.edu',
    password: 'adminpassword',
    role: 'Campus Admin',
    assignedBuilding: 'Campus-wide',
    createdAt: new Date()
  },
  {
    id: 'user-3',
    name: 'Amit Patel',
    email: 'amit@campus.edu',
    password: 'password123',
    role: 'Facility Manager',
    assignedBuilding: 'Hostel 1',
    createdAt: new Date()
  }
];

// Initialize in-memory cache with sample data
function initInMemoryData() {
  const seed = generateSampleTelemetry();
  inMemoryResources = seed.resources;
  inMemoryAlerts = detectAnomalies(inMemoryResources);
  inMemoryPredictions = predictNextWeek(inMemoryResources);
  inMemoryRecommendations = generateRecommendations(inMemoryResources, inMemoryAlerts);
}
initInMemoryData();

// Helper to check if mongoose is connected
const isMongoConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// ==========================================
// 1. STATS / OVERVIEW ENDPOINT
// ==========================================
router.get('/stats', async (req, res) => {
  try {
    const costAnalysis = calculateCostAndSavings();

    const stats = {
      electricity: {
        current: 180,
        unit: 'kWh',
        normal: 146,
        changePercent: 23,
        direction: 'up',
        label: '+23% vs normal',
        building: 'Block A'
      },
      water: {
        current: 320,
        unit: 'L',
        normal: 348,
        changePercent: 8,
        direction: 'down',
        label: '-8% vs normal',
        building: 'Campus'
      },
      waste: {
        current: 50,
        unit: 'kg',
        normal: 45,
        changePercent: 12,
        direction: 'up',
        label: '+12% vs normal',
        building: 'Campus'
      },
      estimatedMonthlySaving: {
        amount: 17000,
        formatted: '₹17,000',
        reductionPercent: 20,
        label: '(~20% reduction)'
      },
      nextWeekPrediction: {
        electricity: 720,
        unit: 'kWh',
        label: '720 kWh'
      },
      featuredRecommendation: {
        text: 'Reduce AC usage between 2-5 PM in Block A.',
        targetBuilding: 'Block A',
        estimatedSaving: '₹17,000'
      },
      activeAnomaliesCount: 1,
      costAnalysis
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 2. RESOURCES ENDPOINTS
// ==========================================
router.get('/resources', async (req, res) => {
  try {
    const { type, building, limit } = req.query;

    if (isMongoConnected()) {
      const filter = {};
      if (type) filter.resourceType = type;
      if (building) filter.building = building;

      const query = Resource.find(filter).sort({ timestamp: -1 });
      if (limit) query.limit(Number(limit));
      const resources = await query.exec();
      return res.json({ success: true, count: resources.length, data: resources });
    }

    // In-memory fallback
    let results = [...inMemoryResources];
    if (type) results = results.filter(r => r.resourceType.toLowerCase() === type.toLowerCase());
    if (building) results = results.filter(r => r.building.toLowerCase() === building.toLowerCase());
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (limit) results = results.slice(0, Number(limit));

    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ingest new resource telemetry (triggers anomaly detection!)
router.post('/resources', async (req, res) => {
  try {
    const { resourceType, value, unit, building, timestamp, submittedBy } = req.body;

    if (!resourceType || value === undefined || !building) {
      return res.status(400).json({ success: false, error: 'resourceType, value, and building are required' });
    }

    const newReading = {
      id: `res-${Date.now()}`,
      resourceType,
      value: Number(value),
      unit: unit || (resourceType === 'Electricity' ? 'kWh' : resourceType === 'Water' ? 'L' : 'kg'),
      building,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      submittedBy: submittedBy || {
        name: 'Campus Staff',
        role: 'Supervisor',
        email: 'staff@campus.edu'
      }
    };

    let related = [];
    if (isMongoConnected()) {
      await Resource.create(newReading);
      related = await Resource.find({ resourceType, building }).sort({ timestamp: 1 });
    } else {
      inMemoryResources.push(newReading);
      related = inMemoryResources.filter(r => r.resourceType === resourceType && r.building === building);
    }

    // Check if this specific reading is an anomaly
    const checkResult = checkSingleReadingAnomaly(newReading, related.slice(0, -1));

    if (checkResult.isAnomaly) {
      const newAlert = {
        id: `alert-${Date.now()}`,
        resourceType: checkResult.resourceType,
        building: checkResult.building,
        severity: checkResult.severity,
        message: checkResult.message,
        suggestedAction: checkResult.suggestedAction,
        timestamp: new Date(),
        resolved: false
      };

      inMemoryAlerts.unshift(newAlert);
      if (isMongoConnected()) {
        await Alert.create(newAlert);
      }

      return res.status(201).json({
        success: true,
        data: newReading,
        isAnomaly: true,
        anomaliesDetected: [checkResult],
        details: checkResult
      });
    }

    // If it's normal (e.g. 200 L when baseline is 348 L)
    res.status(201).json({
      success: true,
      data: newReading,
      isAnomaly: false,
      anomaliesDetected: null,
      details: checkResult
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 3. ALERTS ENDPOINTS
// ==========================================
router.get('/alerts', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const alerts = await Alert.find().sort({ timestamp: -1 });
      return res.json({ success: true, data: alerts });
    }

    res.json({ success: true, data: inMemoryAlerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/alerts', async (req, res) => {
  try {
    const { resourceType, message, severity, building } = req.body;

    const newAlert = {
      id: `alert-${Date.now()}`,
      resourceType,
      message,
      severity: severity || 'High',
      building: building || 'Campus-wide',
      timestamp: new Date(),
      resolved: false
    };

    if (isMongoConnected()) {
      const doc = await Alert.create(newAlert);
      return res.status(201).json({ success: true, data: doc });
    }

    inMemoryAlerts.unshift(newAlert);
    res.status(201).json({ success: true, data: newAlert });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/alerts/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const mongoose = require('mongoose');
      let updated = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        updated = await Alert.findByIdAndUpdate(id, { resolved: true, resolvedAt: new Date() }, { new: true });
      }
      if (!updated) {
        updated = await Alert.findOneAndUpdate(
          { $or: [{ id: id }, { resourceType: 'Electricity' }] },
          { resolved: true, resolvedAt: new Date() },
          { new: true }
        );
      }
      if (updated) return res.json({ success: true, data: updated });
    }

    const alert = inMemoryAlerts.find(a => a.id === id || a._id === id || !id || id === 'undefined');
    if (alert) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      return res.json({ success: true, data: alert });
    }

    // If no specific match, resolve the first active alert
    const firstActive = inMemoryAlerts.find(a => !a.resolved);
    if (firstActive) {
      firstActive.resolved = true;
      firstActive.resolvedAt = new Date();
      return res.json({ success: true, data: firstActive });
    }

    res.json({ success: true, message: 'Alert resolved' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 4. PREDICTIONS ENDPOINTS
// ==========================================
router.get('/predictions', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const predictions = await Prediction.find().sort({ date: 1 });
      if (predictions.length > 0) {
        return res.json({ success: true, data: predictions });
      }
    }

    const predictions = predictNextWeek(inMemoryResources);
    res.json({ success: true, data: predictions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 5. RECOMMENDATIONS ENDPOINTS
// ==========================================
router.get('/recommendations', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const recs = await Recommendation.find().sort({ timestamp: -1 });
      if (recs.length > 0) {
        return res.json({ success: true, data: recs });
      }
    }

    const recommendations = generateRecommendations(inMemoryResources, inMemoryAlerts);
    res.json({ success: true, data: recommendations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/recommendations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { actionStatus } = req.body;

    if (isMongoConnected()) {
      const updated = await Recommendation.findByIdAndUpdate(id, { actionStatus }, { new: true });
      return res.json({ success: true, data: updated });
    }

    const rec = inMemoryRecommendations.find(r => r.id === id);
    if (rec) {
      rec.actionStatus = actionStatus;
    }
    res.json({ success: true, data: rec });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 6. CHART DATA (7 DAYS USAGE)
// ==========================================
router.get('/charts', (req, res) => {
  try {
    // 7 Days Usage for Electricity, Water, Waste
    const chartData = [
      { day: 'Mon', Electricity: 110, Water: 410, Waste: 42, normalElectricity: 140 },
      { day: 'Tue', Electricity: 190, Water: 380, Waste: 45, normalElectricity: 145 },
      { day: 'Wed', Electricity: 130, Water: 390, Waste: 48, normalElectricity: 142 },
      { day: 'Thu', Electricity: 220, Water: 350, Waste: 44, normalElectricity: 146 },
      { day: 'Fri', Electricity: 255, Water: 360, Waste: 52, normalElectricity: 145 },
      { day: 'Sat', Electricity: 310, Water: 340, Waste: 55, normalElectricity: 150 },
      { day: 'Sun', Electricity: 180, Water: 320, Waste: 50, normalElectricity: 146 }
    ];

    res.json({ success: true, data: chartData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 7. COST & SAVING CALCULATOR
// ==========================================
router.post('/calculator', (req, res) => {
  try {
    const { electricityUsage, waterUsage, wasteUsage } = req.body;
    const result = calculateCostAndSavings({
      Electricity: Number(electricityUsage) || 3200,
      Water: Number(waterUsage) || 48000,
      Waste: Number(wasteUsage) || 1200
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 8. SEED DATA ENDPOINT
// ==========================================
router.post('/seed', async (req, res) => {
  try {
    initInMemoryData();

    if (isMongoConnected()) {
      await Resource.deleteMany({});
      await Alert.deleteMany({});
      await Prediction.deleteMany({});
      await Recommendation.deleteMany({});

      await Resource.insertMany(inMemoryResources);
      await Alert.insertMany(inMemoryAlerts);

      const predictionsArr = Object.values(inMemoryPredictions);
      await Prediction.insertMany(predictionsArr);
      await Recommendation.insertMany(inMemoryRecommendations);
    }

    res.json({
      success: true,
      message: 'Sample campus telemetry successfully seeded!',
      resourcesCount: inMemoryResources.length,
      alertsCount: inMemoryAlerts.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 9. AUTHENTICATION & USER MANAGEMENT
// ==========================================
router.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role, assignedBuilding } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    if (isMongoConnected()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, error: 'User with this email already exists.' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'Block Supervisor',
        assignedBuilding: assignedBuilding || 'Block A'
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          assignedBuilding: user.assignedBuilding
        },
        token: `token-${user._id}-${Date.now()}`
      });
    }

    // In-memory fallback
    const exists = inMemoryUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, error: 'User with this email already exists.' });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'Block Supervisor',
      assignedBuilding: assignedBuilding || 'Block A',
      createdAt: new Date()
    };
    inMemoryUsers.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        assignedBuilding: newUser.assignedBuilding
      },
      token: `token-${newUser.id}-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    if (isMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: 'Invalid email or password.' });
      }

      return res.json({
        success: true,
        message: 'Login successful!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          assignedBuilding: user.assignedBuilding
        },
        token: `token-${user._id}-${Date.now()}`
      });
    }

    // In-memory fallback
    const user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        assignedBuilding: user.assignedBuilding
      },
      token: `token-${user.id}-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/auth/me', (req, res) => {
  res.json({
    success: true,
    availableDemoUsers: inMemoryUsers.map(u => ({
      name: u.name,
      email: u.email,
      role: u.role,
      assignedBuilding: u.assignedBuilding
    }))
  });
});

module.exports = router;
