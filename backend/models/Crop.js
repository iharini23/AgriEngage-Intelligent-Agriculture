const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  season: { type: String, required: true },
  demandIndex: { type: Number, default: 0 },
});

module.exports = mongoose.model("Crop", cropSchema);
