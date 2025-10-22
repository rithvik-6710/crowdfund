const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  collectedAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', projectSchema);
