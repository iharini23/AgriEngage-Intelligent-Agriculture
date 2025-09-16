const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Models
const Crop = require("./models/Crop");
const Engagement = require("./models/Engagement");

// Load env vars
dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for seeding"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Sample Crops Data
const crops = [
  { name: "Wheat", season: "Winter", demandIndex: 75 },
  { name: "Rice", season: "Summer", demandIndex: 90 },
  { name: "Maize", season: "Rainy", demandIndex: 60 },
  { name: "Sugarcane", season: "Annual", demandIndex: 85 },
];

// Sample Engagement Data (added `date`)
const engagements = [
  { engaged: 120, newFarmers: 40, season: "Winter", date: new Date("2025-01-15") },
  { engaged: 200, newFarmers: 65, season: "Summer", date: new Date("2025-04-10") },
  { engaged: 150, newFarmers: 50, season: "Rainy", date: new Date("2025-07-20") },
  { engaged: 180, newFarmers: 70, season: "Annual", date: new Date("2025-10-05") },
];

// Seeding function
const seedData = async () => {
  try {
    await Crop.deleteMany();
    await Engagement.deleteMany();

    await Crop.insertMany(crops);
    await Engagement.insertMany(engagements);

    console.log("🌱 Data seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedData();
