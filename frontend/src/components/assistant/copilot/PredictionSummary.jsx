import { BrainCircuit } from "lucide-react";
const PredictionSummary = ({ latestPrediction = {} }) => {
  const risk = String(latestPrediction.risk || "Unavailable");
  const normalized = risk.toLowerCase();
  const style = normalized === "high" ? "bg-rose-100 text-rose-800" : normalized === "low" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700";
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2"><BrainCircuit className="text-blue-700" size={19} aria-hidden="true" /><h3 className="text-sm font-semibold text-slate-900">Latest screening</h3></div>
      <dl className="space-y-3 text-sm">
        <div className="flex items-start justify-between gap-3"><dt className="text-slate-500">Model output</dt><dd className="max-w-[60%] text-right font-medium capitalize text-slate-800">{latestPrediction.disease || "No screening yet"}</dd></div>
        <div className="flex items-center justify-between"><dt className="text-slate-500">Confidence</dt><dd className="font-medium text-slate-800">{latestPrediction.confidence || "Unavailable"}</dd></div>
        <div className="flex items-center justify-between gap-3"><dt className="text-slate-500">Screening risk</dt><dd className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${style}`}>{risk}</dd></div>
        <div className="flex items-start justify-between gap-3"><dt className="text-slate-500">Model version</dt><dd className="max-w-[60%] break-words text-right font-medium text-slate-800">{latestPrediction.model || "Unavailable"}</dd></div>
      </dl>
      <p className="mt-3 text-xs leading-5 text-slate-500">This is a screening output, not a diagnosis.</p>
    </section>
  );
};
export default PredictionSummary;
