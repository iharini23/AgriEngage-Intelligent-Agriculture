const express = require("express");
const Engagement = require("../models/Engagement");

const router = express.Router();

// GET all engagement data
router.get("/", async (req, res) => {
  try {
    const engagementData = await Engagement.find();
    res.json(engagementData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed sample engagement data
router.post("/seed", async (req, res) => {
  try {
    const sampleEngagement = [
      { date: "2025-09-01", engaged: 200, newFarmers: 50 },
      { date: "2025-09-02", engaged: 240, newFarmers: 70 },
      { date: "2025-09-03", engaged: 300, newFarmers: 80 },
    ];
    await Engagement.insertMany(sampleEngagement);
    res.json({ message: "Sample engagement data inserted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
