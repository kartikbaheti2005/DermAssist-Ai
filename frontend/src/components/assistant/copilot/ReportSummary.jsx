import { ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
const ReportSummary = ({ latestReport = {} }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-4 flex items-center gap-2"><FileText size={19} className="text-blue-700" aria-hidden="true" /><h3 className="text-sm font-semibold text-slate-900">Latest screening report</h3></div>
    <dl className="space-y-3 text-sm">
      <div className="flex items-center justify-between gap-3"><dt className="text-slate-500">Source</dt><dd className="text-right font-medium text-slate-800">{latestReport.id || "None available"}</dd></div>
      <div className="flex items-center justify-between gap-3"><dt className="text-slate-500">Updated</dt><dd className="text-right font-medium text-slate-800">{latestReport.generatedOn || "—"}</dd></div>
      <div className="flex items-center justify-between gap-3"><dt className="text-slate-500">Status</dt><dd className="font-medium text-slate-800">{latestReport.status || "—"}</dd></div>
    </dl>
    <Link to="/reports" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">View report history<ChevronRight size={16} aria-hidden="true" /></Link>
  </section>
);
export default ReportSummary;
