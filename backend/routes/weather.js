const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    location: "Karnataka",
    rainfall: 182,
    temperature: 29,
    humidity: 70,
  });
});

module.exports = router;
