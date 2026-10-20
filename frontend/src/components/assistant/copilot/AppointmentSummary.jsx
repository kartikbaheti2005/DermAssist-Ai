import { CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const AppointmentSummary = ({ nextAppointment = {} }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-4 flex items-center gap-2"><CalendarDays size={19} className="text-blue-700" aria-hidden="true" /><h3 className="text-sm font-semibold text-slate-900">Upcoming appointment</h3></div>
    <dl className="space-y-3 text-sm">{[["Doctor", nextAppointment.doctor], ["Specialty", nextAppointment.specialization], ["Date", nextAppointment.date], ["Time", nextAppointment.time], ["Status", nextAppointment.status]].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3"><dt className="text-slate-500">{label}</dt><dd className="max-w-[60%] break-words text-right font-medium capitalize text-slate-800">{value || "—"}</dd></div>)}</dl>
    <Link to="/appointments" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">View appointments<ChevronRight size={16} aria-hidden="true" /></Link>
  </section>
);
export default AppointmentSummary;
