const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // exit if db fails
  });

// Routes
try {
  const cropRoutes = require("./routes/crops");
  const engagementRoutes = require("./routes/engagement");
  const weatherRoutes = require("./routes/weather");
  const weatherEngagementRoutes = require("./routes/weatherEngagement"); // ⬅️ NEW

  app.use("/api/crops", cropRoutes);
  app.use("/api/engagements", engagementRoutes);
  app.use("/api/weather", weatherRoutes);
  app.use("/api/weather-engagement", weatherEngagementRoutes); // ⬅️ NEW
} catch (err) {
  console.error("❌ Route loading failed:", err.message);
}

// Default route
app.get("/", (req, res) => {
  res.send("🌱 AgriEngage API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
