import Section from "../components/Section";
import MiniHeatmap from "../components/MiniHeatmap";
import EngagementLine from "../components/charts/EngagementLine";
import CropDemandBar from "../components/charts/CropDemandBar";
import { Map, TrendingUp, LineChart as LineIcon, Bell, Sprout, Activity } from "lucide-react";
import { regionCells, cropDemand, COLORS, engagementTrend } from "../data/mock";

export default function AuthorityDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Section
          title="Region-wise Engagement Heatmap"
          icon={Map}
          right={<button className="px-3 py-1.5 rounded-xl text-xs border border-slate-200 hover:bg-slate-50">Download CSV</button>}
        >
          <MiniHeatmap cells={regionCells} />
        </Section>

        <Section title="Crop Demand Forecast" icon={TrendingUp}>
          <CropDemandBar data={cropDemand} colors={COLORS} />
        </Section>

        <Section title="Seasonal Engagement Forecast" icon={LineIcon}>
          <EngagementLine data={engagementTrend} />
        </Section>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Section title="Smart Alerts" icon={Bell}>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Engagement expected to <span className="font-medium text-emerald-700">increase</span> in select districts next month due to favorable rainfall.</li>
            <li>• High demand predicted for <span className="font-medium">Paddy</span> and <span className="font-medium">Millet</span>.</li>
            <li>• Consider promoting <span className="font-medium">drip irrigation</span> where rainfall is low.</li>
          </ul>
        </Section>

        <Section title="Best Practices" icon={Sprout}>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Rotate crops to maintain soil health and improve yield.</li>
            <li>• Use community buying to reduce input costs.</li>
            <li>• Leverage local weather windows for sowing timing.</li>
          </ul>
        </Section>

        <Section title="Data Sources (Planned)" icon={Activity}>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Weather: OpenWeather / IMD API</li>
            <li>• Market Prices: Govt Agri Market APIs</li>
            <li>• Engagement: App analytics + surveys</li>
          </ul>
        </Section>
      </div>
    </>
  );
}
