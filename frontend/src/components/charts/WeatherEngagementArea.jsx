import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function WeatherEngagementArea({ data }) {
  return (
    <div className="h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 16, right: 16, left: 16, bottom: 32 }}
        >
          <defs>
            <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis with rotated labels for mobile */}
          <XAxis
            dataKey="week"
            tick={{ fontSize: 10 }}
            angle={-30}
            textAnchor="end"
          />

          {/* Two Y-axes */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#0ea5e9"
            tick={{ fontSize: 12 }}
            label={{
              value: "Rainfall (mm)",
              angle: -90,
              position: "insideLeft",
              offset: 0,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#f97316"
            tick={{ fontSize: 12 }}
            label={{
              value: "Engagement",
              angle: 90,
              position: "insideRight",
              offset: 0,
            }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ fontSize: 12, padding: 6 }}
            formatter={(value, name) =>
              name === "rainfall"
                ? [`${value} mm`, "Rainfall"]
                : [value, "Engagement"]
            }
          />

          {/* Legend */}
          <Legend verticalAlign="top" align="center" wrapperStyle={{ top: 0 }} />

          {/* Areas with smooth curves, animation, and hover */}
          <Area
            yAxisId="left"
            type="natural"
            dataKey="rainfall"
            stroke="#0ea5e9"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#rainfallGradient)"
            animationDuration={1500}
            animationEasing="ease-in-out"
            activeDot={{ r: 6, stroke: "#0ea5e9", strokeWidth: 2 }}
          />
          <Area
            yAxisId="right"
            type="natural"
            dataKey="engagement"
            stroke="#f97316"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#engagementGradient)"
            animationDuration={1500}
            animationEasing="ease-in-out"
            activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
