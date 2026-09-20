require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-campus';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// MongoDB Connection with Graceful Fallback
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2500 // fast fallback to in-memory mode if Mongo is not running
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas / Local database');
})
.catch((err) => {
  console.log('ℹ️ MongoDB not detected or connection timed out.');
  console.log('⚡ Active in High-Performance In-Memory Simulation mode with sample dataset.');
});

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'AI-Powered Smart Campus Resource Management System',
    version: '1.0.0',
    documentation: {
      stats: '/api/stats',
      resources: '/api/resources',
      alerts: '/api/alerts',
      predictions: '/api/predictions',
      recommendations: '/api/recommendations',
      charts: '/api/charts',
      calculator: '/api/calculator',
      seed: '/api/seed (POST)'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Smart Campus Backend running on http://localhost:${PORT}`);
  console.log(`📡 REST API available at http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
