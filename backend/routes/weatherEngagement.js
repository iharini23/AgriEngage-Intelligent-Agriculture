const express = require("express");
const router = express.Router();
const Engagement = require("../models/Engagement");

// Import the weather route handler
const weatherData = {
  location: "Karnataka",
  rainfall: 182,
  temperature: 29,
  humidity: 70,
};

// Combined route: Weather + Engagement
router.get("/", async (req, res) => {
  try {
    // Fetch engagements from DB
    const engagements = await Engagement.find();

    res.json({
      weather: weatherData, // reuse existing weather object
      engagements,
    });
  } catch (err) {
    console.error("❌ Error fetching weather-engagement:", err);
    res.status(500).json({ error: "Failed to fetch weather-engagement data" });
  }
});

module.exports = router;
