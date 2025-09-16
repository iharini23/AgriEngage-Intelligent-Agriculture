import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function EngagementLine({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-slate-500">No engagement data available.</p>;
  }

  // Map data to include a 'month' key for XAxis
  const formattedData = data.map(d => {
    const dateObj = new Date(d.date);
    const month = dateObj.toLocaleString("default", { month: "short", year: "numeric" });
    return {
      month,
      engaged: d.engaged || 0,
      newFarmers: d.newFarmers || 0,
    };
  });

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [value, name === "engaged" ? "Engaged Farmers" : "New Farmers"]}
          />
          <Legend />
          <Line type="monotone" dataKey="engaged" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="newFarmers" stroke="#0ea5e9" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
