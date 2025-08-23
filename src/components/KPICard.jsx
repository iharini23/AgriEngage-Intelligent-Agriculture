import React from "react";
import { motion } from "framer-motion";
import classNames from "../utils/classNames";

export default function KPICard({ icon: Icon, label, value, delta, accent = "" }) {
  const isNumber = typeof delta === "number";
  const color = isNumber
    ? delta > 0
      ? "text-emerald-600"
      : delta < 0
      ? "text-rose-600"
      : "text-slate-500"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classNames(
        "rounded-2xl p-4 shadow-sm border border-slate-200 bg-white",
        accent
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
          {Icon && <Icon className="w-5 h-5 text-slate-700" />}
        </div>
      </div>

      {isNumber && (
        <p className={classNames("text-xs mt-2", color)}>
          {delta > 0 ? "+" : ""}
          {delta}% vs last period
        </p>
      )}
    </motion.div>
  );
}