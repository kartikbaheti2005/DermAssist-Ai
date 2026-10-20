import { Activity, Info } from "lucide-react";
import Card from "../common/Card";

const RiskSummary = ({ predictions = [], loading }) => {
  const high = predictions.filter((item) => String(item.risk_level || "").toLowerCase() === "high").length;
  const low = predictions.filter((item) => String(item.risk_level || "").toLowerCase() === "low").length;
  const other = Math.max(0, predictions.length - high - low);
  const rows = [
    { label: "High model output", count: high, color: "bg-rose-500" },
    { label: "Low model output", count: low, color: "bg-emerald-500" },
    { label: "Other / unavailable", count: other, color: "bg-slate-400" },
  ];
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-slate-900">Screening risk summary</h2><p className="mt-1 text-sm text-slate-500">Distribution of saved model outputs</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Activity size={21} aria-hidden="true" /></span></div>
      {loading ? <div className="mt-6 h-48 animate-pulse rounded-2xl bg-slate-100" aria-label="Loading risk summary" /> : predictions.length ? <div className="mt-7 space-y-5">
        {rows.map((row) => <div key={row.label}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-slate-600">{row.label}</span><span className="font-semibold text-slate-900">{row.count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.color}`} style={{ width: `${Math.max(row.count ? 4 : 0, (row.count / predictions.length) * 100)}%` }} /></div></div>)}
        <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"><Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" /><p>These categories reflect the model’s screening output. They are not a diagnosis or a clinician’s assessment of urgency.</p></div>
      </div> : <div className="mt-6 rounded-xl bg-slate-50 px-5 py-8 text-center"><p className="font-medium text-slate-800">No screening data yet</p><p className="mt-1 text-sm text-slate-500">Risk distribution will appear after your first completed scan.</p></div>}
    </Card>
  );
};

export default RiskSummary;
