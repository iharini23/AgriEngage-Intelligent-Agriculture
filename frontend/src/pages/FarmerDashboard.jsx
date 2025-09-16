import React, { useEffect, useState } from "react"; 
import Section from "../components/Section";
import EngagementLine from "../components/charts/EngagementLine";
import WeatherEngagementArea from "../components/charts/WeatherEngagementArea";
import { Sprout, CloudSun, Activity } from "lucide-react";
import { COLORS } from "../data/mock";
import { getCrops, getEngagements, getWeather } from "../services/api";

export default function FarmerDashboard({ region, season, kpis }) {
  const [crops, setCrops] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [loadingEngagement, setLoadingEngagement] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const demandIndex = parseInt(kpis.find(k => k.label === "Demand Index")?.value || 0);

  // Fetch crops
  useEffect(() => {
    setLoadingCrops(true);
    getCrops()
      .then(data => setCrops(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching crops:", err))
      .finally(() => setLoadingCrops(false));
  }, []);

  // Fetch engagement data and format for chart
  useEffect(() => {
    setLoadingEngagement(true);
    getEngagements()
      .then(data => {
        if (!Array.isArray(data)) return setEngagementData([]);
        const formatted = data.map(d => ({
          week: `${new Date(d.date).toLocaleString("default", { month: "short" })} ${new Date(d.date).getDate()}`,
          engaged: Number(d.engaged) || 0,
          newFarmers: Number(d.newFarmers) || 0
        }));
        console.log("✅ Formatted Engagement Data:", formatted);
        setEngagementData(formatted);
      })
      .catch(err => console.error("Error fetching engagement:", err))
      .finally(() => setLoadingEngagement(false));
  }, []);

  // Fetch weather data and format for chart
  useEffect(() => {
    setLoadingWeather(true);
    getWeather()
      .then(data => {
        if (!Array.isArray(data)) return setWeatherData([]);
        const formatted = data.map(d => ({
          week: `${new Date(d.date).toLocaleString("default", { month: "short" })} ${new Date(d.date).getDate()}`,
          rainfall: Number(d.rainfall) || 0,
          engagement: Number(d.engagement) || 0
        }));
        console.log("✅ Formatted Weather Data:", formatted);
        setWeatherData(formatted);
      })
      .catch(err => console.warn("Error fetching weather data:", err))
      .finally(() => setLoadingWeather(false));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Engagement Trend */}
      <Section title="My Engagement Trend" icon={Activity}>
        {loadingEngagement ? (
          <p className="text-slate-500 text-center">Loading engagement data...</p>
        ) : (
          <EngagementLine data={engagementData} />
        )}
      </Section>

      {/* Recommended Crops */}
      <Section title="Recommended Crops" icon={Sprout}>
        {loadingCrops ? (
          <p className="text-slate-500 text-center">Loading crops...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {crops.map((c, i) => {
              const dynamicDemand = Math.round((c.yield || 50) * (demandIndex / 78));
              return (
                <div key={c._id} className="rounded-xl border border-slate-200 p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{season} • {region}</p>
                      <p className="text-lg font-semibold text-slate-800">{c.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Demand Index</p>
                      <p className="text-2xl font-semibold text-slate-900">{dynamicDemand}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${dynamicDemand}%`, backgroundColor: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Weather ↔ Engagement */}
      <Section title="Weather ↔ Engagement" icon={CloudSun}>
        {loadingWeather ? (
          <p className="text-slate-500 text-center">Loading weather data...</p>
        ) : weatherData.length === 0 ? (
          <p className="text-slate-500 text-center">Weather data unavailable.</p>
        ) : (
          <WeatherEngagementArea data={weatherData} />
        )}
      </Section>
    </div>
  );
}
