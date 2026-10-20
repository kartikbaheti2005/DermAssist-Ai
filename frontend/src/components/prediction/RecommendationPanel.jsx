import { CalendarDays, Info, ShieldCheck, UserRoundSearch } from "lucide-react";
import { Link } from "react-router-dom";
const RecommendationPanel = ({ recommendations, riskLevel, assessment, recommendationLoading = false }) => {
  const doctors = recommendations?.doctors || [];
  const specialty = recommendations?.recommended_specialty;
  const highRisk = String(riskLevel || "").toLowerCase() === "high";
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="next-steps-title">
      <div className="flex items-center gap-3"><ShieldCheck size={26} className="text-blue-600" aria-hidden="true" /><div><h2 id="next-steps-title" className="text-xl font-bold text-slate-900">Next steps</h2><p className="text-sm text-slate-500">Guidance from the deterministic screening risk engine</p></div></div>
      <div className="mt-6 rounded-2xl border border-slate-200 p-4">
        <div className="flex items-start gap-3"><CalendarDays size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" /><div><h3 className="font-semibold text-slate-800">Recommended action</h3><p className="mt-1 text-sm leading-6 text-slate-600">{assessment?.recommended_action || "Discuss symptoms or concerns with a qualified clinician."}</p>{assessment?.follow_up && <p className="mt-3 text-sm leading-6 text-slate-600">{assessment.follow_up}</p>}</div></div>
        {highRisk && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-5 text-amber-900">The model returned a high-risk screening output. This does not establish a diagnosis or clinical urgency.</p>}
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 p-4">
        <div className="flex items-start gap-3"><UserRoundSearch size={20} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" /><div className="min-w-0"><h3 className="font-semibold text-slate-800">{specialty ? `Suggested specialty: ${specialty}` : "Find a dermatologist"}</h3>{doctors.length > 0 ? <ul className="mt-2 space-y-2">{doctors.slice(0, 3).map((doctor) => <li key={doctor.doctor_id} className="text-sm text-slate-600">{doctor.doctor_name}{doctor.city ? ` · ${doctor.city}` : ""}</li>)}</ul> : <p className="mt-1 text-sm leading-5 text-slate-500">{recommendationLoading ? "Loading available specialist suggestions…" : "Browse specialists and appointment options."}</p>}</div></div>
        <Link to="/doctors" className="mt-4 inline-flex rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Explore doctors</Link>
      </div>
      <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500"><Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" /><p>Risk labels and next-step suggestions are decision support only; a clinician must determine diagnosis and urgency.</p></div>
    </section>
  );
};
export default RecommendationPanel;
