import { HeartPulse } from "lucide-react";
const HealthSnapshot = ({ healthSnapshot = {} }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-4 flex items-center gap-2"><HeartPulse className="text-blue-700" size={19} aria-hidden="true" /><h3 className="text-sm font-semibold text-slate-900">Health record</h3></div>
    <dl className="space-y-3 text-sm">{[["BMI", healthSnapshot.bmi], ["Blood group", healthSnapshot.bloodGroup], ["Allergies", healthSnapshot.allergies], ["Medications", healthSnapshot.medications]].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3"><dt className="text-slate-500">{label}</dt><dd className="max-w-[60%] break-words text-right font-medium text-slate-800">{value || "Not listed"}</dd></div>)}</dl>
  </section>
);
export default HealthSnapshot;
