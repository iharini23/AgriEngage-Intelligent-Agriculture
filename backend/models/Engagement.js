const mongoose = require("mongoose");

const engagementSchema = new mongoose.Schema({
  date: { type: String, required: true },
  engaged: { type: Number, default: 0 },
  newFarmers: { type: Number, default: 0 },
});

module.exports = mongoose.model("Engagement", engagementSchema);
