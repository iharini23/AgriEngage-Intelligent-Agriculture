
import React from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

export default function WeatherEngagementArea({ data }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="rain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="eng" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="rainfall" stroke="#0ea5e9" fillOpacity={1} fill="url(#rain)" />
          <Area type="monotone" dataKey="engagement" stroke="#10b981" fillOpacity={1} fill="url(#eng)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
