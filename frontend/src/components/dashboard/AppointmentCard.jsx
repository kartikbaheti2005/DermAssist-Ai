import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";
import Card from "../common/Card";

const AppointmentCard = ({ appointment, loading }) => {
  const date = appointment?.appointment_date ? new Date(`${appointment.appointment_date}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric" }) : null;
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div><h2 className="text-lg font-semibold text-slate-900">Upcoming appointment</h2><p className="mt-1 text-sm text-slate-500">Your next scheduled visit</p></div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><CalendarDays size={21} aria-hidden="true" /></span>
      </div>
      {loading ? <div className="mt-6 h-44 animate-pulse rounded-2xl bg-slate-100" aria-label="Loading appointment" /> : appointment ? (
        <div className="mt-6 rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700"><UserRound size={19} aria-hidden="true" /></span><div><h3 className="font-semibold text-slate-900">{appointment.doctor_name || "Dermatology appointment"}</h3><p className="text-sm text-slate-500">{appointment.doctor_specialty || "Specialty not listed"}</p></div></div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Date</p><p className="mt-1 text-sm font-semibold text-slate-800">{date}</p></div>
            <div className="rounded-xl bg-slate-50 p-3"><p className="inline-flex items-center gap-1 text-xs text-slate-500"><Clock3 size={13} aria-hidden="true" />Time</p><p className="mt-1 text-sm font-semibold text-slate-800">{appointment.appointment_time || "To be confirmed"}</p></div>
          </div>
          <p className="mt-4 text-xs capitalize text-slate-500">Status: {appointment.status || "pending"}</p>
        </div>
      ) : (
        <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center"><CalendarDays size={26} className="text-slate-400" aria-hidden="true" /><p className="mt-3 font-medium text-slate-800">No upcoming appointments</p><p className="mt-1 text-sm text-slate-500">When you book a visit, it will appear here.</p></div>
      )}
      <Link to="/appointments" className="mt-4 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">View appointments<ArrowRight size={15} aria-hidden="true" /></Link>
    </Card>
  );
};

export default AppointmentCard;
