const express = require("express");
const Crop = require("../models/Crop");

const router = express.Router();

// GET all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed sample crops
router.post("/seed", async (req, res) => {
  try {
    const sampleCrops = [
      { name: "Rice", season: "Summer", demandIndex: 80 },
      { name: "Wheat", season: "Winter", demandIndex: 70 },
      { name: "Maize", season: "Monsoon", demandIndex: 65 },
    ];
    await Crop.insertMany(sampleCrops);
    res.json({ message: "Sample crops inserted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
