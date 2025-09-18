import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Named exports
export const getCrops = async () => {
  try {
    const res = await API.get("/crops");
    return res.data;
  } catch (err) {
    console.error("Error fetching crops:", err.response?.data || err.message);
    throw err;
  }
};

export const getEngagements = async () => {
  try {
    const res = await API.get("/engagements");
    return res.data;
  } catch (err) {
    console.error("Error fetching engagements:", err.response?.data || err.message);
    throw err;
  }
};

export const getWeather = async () => {
  try {
    const res = await API.get("/weather");
    return res.data;
  } catch (err) {
    console.error("Error fetching weather data:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ NEW: fetch weather ↔ engagement data
export const getWeatherEngagement = async () => {
  try {
    const res = await API.get("/weather-engagement");
    return res.data;
  } catch (err) {
    console.error(
      "Error fetching weather-engagement data:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export default API;
