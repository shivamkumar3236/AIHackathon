const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Campus Admin', 'Facility Manager', 'Block Supervisor', 'Energy Auditor', 'Student/Resident'],
    default: 'Block Supervisor'
  },
  assignedBuilding: {
    type: String,
    enum: ['Campus-wide', 'Block A', 'Block B', 'Library', 'Hostel 1', 'Hostel 2', 'Cafeteria', 'Sports Complex'],
    default: 'Block A'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
