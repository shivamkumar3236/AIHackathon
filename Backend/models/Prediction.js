const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    required: true,
    enum: ['Electricity', 'Water', 'Waste']
  },
  predictedValue: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    enum: ['Daily', 'Next Week', 'Monthly'],
    default: 'Next Week'
  },
  confidence: {
    type: Number,
    default: 0.92
  },
  trend: {
    type: String,
    enum: ['Increasing', 'Decreasing', 'Stable'],
    default: 'Stable'
  }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);
