const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  resourceType: {
    type: String,
    required: true,
    enum: ['Electricity', 'Water', 'Waste']
  },
  suggestion: {
    type: String,
    required: true
  },
  potentialSaving: {
    type: String,
    required: true // e.g. "₹17,000 / month (~20% reduction)"
  },
  potentialSavingAmount: {
    type: Number,
    default: 0 // Numeric INR value for summation
  },
  impact: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'High'
  },
  building: {
    type: String,
    default: 'All Buildings'
  },
  actionStatus: {
    type: String,
    enum: ['Pending', 'Implemented', 'Dismissed'],
    default: 'Pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
