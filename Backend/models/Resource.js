const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    required: true,
    enum: ['Electricity', 'Water', 'Waste'],
    index: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['kWh', 'L', 'kg']
  },
  building: {
    type: String,
    required: true,
    enum: ['Block A', 'Block B', 'Library', 'Hostel 1', 'Hostel 2', 'Cafeteria', 'Sports Complex'],
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  submittedBy: {
    name: { type: String, default: 'Automated IoT Sensor' },
    role: { type: String, default: 'System' },
    email: { type: String, default: 'iot@campus.edu' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
