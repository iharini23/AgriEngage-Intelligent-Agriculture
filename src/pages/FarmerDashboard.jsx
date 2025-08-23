import React from "react"; 
import Section from "../components/Section";
import EngagementLine from "../components/charts/EngagementLine";
import WeatherEngagementArea from "../components/charts/WeatherEngagementArea";
import { Sprout, CloudSun, Activity } from "lucide-react";
import { engagementTrend, weatherVsEngagement, cropDemand, COLORS } from "../data/mock";

export default function FarmerDashboard({ region, season, kpis }) {
  // Get dynamic Demand Index
  const demandIndex = parseInt(kpis.find(k => k.label === "Demand Index")?.value || 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Section title="My Engagement Trend" icon={Activity}>
        <EngagementLine data={engagementTrend} />
      </Section>

      <Section title="Recommended Crops" icon={Sprout}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cropDemand.map((c, i) => {
            // Scale crop demand dynamically based on current Demand Index
            const dynamicDemand = Math.round(c.demand * (demandIndex / 78)); // 78 is base score
            return (
              <div key={c.crop} className="rounded-xl border border-slate-200 p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{season} • {region}</p>
                    <p className="text-lg font-semibold text-slate-800">{c.crop}</p>
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
      </Section>

      <Section title="Weather ↔ Engagement" icon={CloudSun}>
        <WeatherEngagementArea data={weatherVsEngagement} />
      </Section>
    </div>
  );
}
