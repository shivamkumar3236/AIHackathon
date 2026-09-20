const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    required: true,
    enum: ['Electricity', 'Water', 'Waste']
  },
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'High'
  },
  building: {
    type: String,
    default: 'Campus-wide'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
