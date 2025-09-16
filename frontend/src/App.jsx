import React, { useMemo, useState, useEffect } from "react";
import { Leaf, Gauge, Users, Sprout, CloudSun } from "lucide-react";
import KPICard from "./components/KPICard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import classNames from "./utils/classNames";
import { seasons, regions } from "./data/mock";

export default function App() {
  const [tab, setTab] = useState("farmer");
  const [region, setRegion] = useState(regions[0]);
  const [season, setSeason] = useState(seasons[0]);

  // 👇 NEW: Crops fetched from backend
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/crops")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  // ✅ KPIs dynamically update based on region & season
  const kpis = useMemo(() => {
    let engagementScore = 78;
    let activeFarmers = 2340;
    let avgYield = 21.4;
    let rainfall = 182;

    // Region-based adjustments
    switch (region) {
      case "Tamil Nadu":
        engagementScore += 5;
        rainfall += 20;
        break;
      case "Karnataka":
        engagementScore += 3;
        avgYield += 2;
        break;
      case "Telangana":
        engagementScore += 4;
        activeFarmers += 200;
        break;
      case "Andhra Pradesh":
        engagementScore += 2;
        rainfall -= 15;
        break;
      case "Kerala":
        engagementScore += 6;
        rainfall += 30;
        break;
      default:
        break;
    }

    // Season-based adjustments
    switch (season) {
      case "Kharif":
        engagementScore += 3;
        break;
      case "Rabi":
        engagementScore += 5;
        avgYield += 1;
        break;
      case "Zaid":
        engagementScore -= 2;
        break;
      default:
        break;
    }

    return [
      { icon: Gauge, label: "Demand Index", value: engagementScore.toString(), delta: 6 },
      { icon: Users, label: "Active Farmers", value: activeFarmers.toString(), delta: 12 },
      { icon: Sprout, label: "Avg. Yield (q/acre)", value: avgYield.toFixed(1), delta: 3 },
      { icon: CloudSun, label: "Rainfall (mm)", value: rainfall.toString(), delta: -4 },
    ];
  }, [region, season]);

  return (
    <div className="min-h-screen w-screen bg-slate-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              AgriEngage – Forecasting Farmer Engagement
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={classNames(
                "px-3 py-1.5 rounded-xl text-sm border",
                tab === "farmer"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-200"
              )}
              onClick={() => setTab("farmer")}
            >
              Farmer View
            </button>
            <button
              className={classNames(
                "px-3 py-1.5 rounded-xl text-sm border",
                tab === "authority"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-200"
              )}
              onClick={() => setTab("authority")}
            >
              Authority View
            </button>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="w-full px-6 mt-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex flex-1 flex-wrap gap-3">
            <select
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              {seasons.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <main className="w-full px-6 py-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <KPICard key={k.label} icon={k.icon} label={k.label} value={k.value} delta={k.delta} />
          ))}
        </section>

        {/* Views */}
        {tab === "farmer" ? (
          <div className="mt-6">
            <FarmerDashboard region={region} season={season} kpis={kpis} />
          </div>
        ) : (
          <div className="mt-6">
            <AuthorityDashboard />
          </div>
        )}

        {/* Footer */}
        <footer className="pb-12 pt-6 text-center text-xs text-slate-500">
          Built with React + Tailwind + Recharts • Connected to Express + MongoDB (MERN)
        </footer>
      </main>
    </div>
  );
}
