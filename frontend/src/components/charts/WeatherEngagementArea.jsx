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
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="humidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" /> {/* Use the date from your data */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="temperature"  // matches FarmerDashboard.jsx formatted data
            stroke="#f97316"
            fillOpacity={1}
            fill="url(#temperature)"
          />
          <Area
            type="monotone"
            dataKey="humidity"  // matches FarmerDashboard.jsx formatted data
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#humidity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
