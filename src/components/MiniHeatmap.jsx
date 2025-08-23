import classNames from "../utils/classNames";

export default function MiniHeatmap({ cells }) {
  const bg = (v) => {
    if (v >= 80) return "bg-emerald-500";
    if (v >= 70) return "bg-emerald-400";
    if (v >= 60) return "bg-yellow-400";
    return "bg-rose-400";
  };
  return (
    <div className="grid grid-cols-3 gap-3">
      {cells.map((c) => (
        <div key={c.name} className="rounded-xl border border-slate-200 p-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">{c.name}</span>
            <span className={classNames("text-xs font-medium px-2 py-0.5 rounded-md text-white", bg(c.engagement))}>
              {c.engagement}%
            </span>
          </div>
          <div className={classNames("mt-3 h-2 rounded-full", bg(c.engagement))} />
        </div>
      ))}
    </div>
  );
}
