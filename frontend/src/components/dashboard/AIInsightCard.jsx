import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit, Info } from "lucide-react";
import Card from "../common/Card";

const AIInsightCard = ({ prediction, loading }) => {
  const confidence = Number(prediction?.confidence_score);
  const confidenceLabel = Number.isFinite(confidence) ? `${(confidence * 100).toFixed(1)}%` : null;
  const label = (prediction?.predicted_label || "").replaceAll("_", " ");
  const risk = String(prediction?.risk_level || "unavailable").toLowerCase();
  const riskClass = risk === "high" ? "bg-rose-100 text-rose-800" : risk === "low" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700";

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3"><div><h2 className="text-lg font-semibold text-slate-900">Latest AI screening</h2><p className="mt-1 text-sm text-slate-500">Most recent saved model result</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><BrainCircuit size={21} aria-hidden="true" /></span></div>
      {loading ? <div className="mt-6 h-48 animate-pulse rounded-2xl bg-slate-100" aria-label="Loading latest screening" /> : prediction ? (
        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Model output</p>
          <h3 className="mt-2 text-xl font-semibold capitalize text-slate-900">{label || "Screening result"}</h3>
          <div className="mt-4 flex flex-wrap items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${riskClass}`}>{risk} model risk</span>{confidenceLabel && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{confidenceLabel} confidence</span>}</div>
          <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" /><p>AI screening support only; this result is not a diagnosis or clinical risk assessment.</p></div>
          <Link to="/reports" className="mt-4 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">View screening history<ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      ) : (
        <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center"><BrainCircuit size={28} className="text-slate-400" aria-hidden="true" /><p className="mt-3 font-medium text-slate-800">No screening results yet</p><p className="mt-1 text-sm text-slate-500">Your latest saved result will appear here.</p><Link to="/lesion-tracker" className="mt-3 text-sm font-semibold text-blue-700 hover:underline">Start a skin screening</Link></div>
      )}
    </Card>
  );
};

export default AIInsightCard;
