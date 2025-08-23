
import React from "react";
import classNames from "../utils/classNames";

export default function Section({ title, icon: Icon, children, right }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
